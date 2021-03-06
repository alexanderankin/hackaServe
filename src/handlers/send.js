import yaml from 'write-yaml';
import readYaml from 'read-yaml';
import twilio from 'twilio';
import fs from 'fs';
import path from 'path';
import ProgressBar from 'progress';

import { getMessagesByName, logMessageEvents, currentDateTimeString, shuffleArray } from 'src/utils';

const shouldSend = (attendee, groups, messageName) => {
    if (attendee.received && attendee.received.includes(messageName)) return false;
    if (groups) {
        if (groups instanceof Array) {
            let groupMatched = false;
            groups.forEach((group) => {
                if (attendee.groups && attendee.groups.includes(group)) groupMatched = true;
            });
            return groupMatched;
        } else if (typeof groups === 'string') {
            if (attendee.groups && attendee.groups.includes(groups)) return true;
            else false;
        }
    } else {
        return true;
    }
}

const send = (messageName, options) => {
    if (!messageName) {
        console.error('ERROR: Moron. No message name was provided. Try again if you have to.');
        process.exit(1);
    }

    if (!fs.existsSync(path.join(process.cwd(), 'hackathon.yml'))) {
        console.error('ERROR: This ain\'t not got no hackathon.yml file in it. What you playing at, I can\'t run in this directory');
        process.exit(1);
    }

    if (!fs.existsSync(path.join(process.cwd(), 'attendees.yml'))) {
        console.error('ERROR: No attendees.yml. Do you even know what this command does? Type "$ hackaserve --help" you div');
        process.exit(1);
    }
    
    const hackathonConfig = readYaml.sync('hackathon.yml');
    const { messages, twilio_api_key, twilio_account_id, twilio_phone_number } = hackathonConfig;
    
    if (!(twilio_api_key && twilio_account_id && twilio_phone_number)) {
        console.error('ERROR: Hackathon.yml is either missing "twilio_api_key", "twilio_account_id", "twilio_phone_number"');
        process.exit(1);
    }
    
    const message = getMessagesByName(messages, messageName)[0];
    
    console.log('HackaServe: The following message will be sent');
    console.log(`Message: ${message.text}`);

    const client = twilio(twilio_account_id, twilio_api_key);
    const attendeesList = shuffleArray(readYaml.sync('attendees.yml'));

    const bar = new ProgressBar('Sending [:bar] :current/:total', {
        total: options.limit ? options.limit : attendeesList.length,
    })

    let sent = 0;

    const updatedAttendees = attendeesList.map(attendee => {
        if (shouldSend(attendee, options.groups, messageName)) {
            if (!options.limit || (options.limit && options.limit > sent)) {
                client.sendMessage({
                    to: attendee.telephone,
                    from: twilio_phone_number,
                    body: message.text,
                }, (err, responseData) => {
                    if (err) {
                        logMessageEvents(messageName, `[${currentDateTimeString()}]: ${attendee.name} - ${attendee.telephone} - ${err.message}`);
                    } else {
                        logMessageEvents(messageName, `[${currentDateTimeString()}]: ${attendee.name} - ${attendee.telephone} - Message sent`)
                    }
                    bar.tick();
                });
                sent += 1;
                return {
                    ...attendee,
                    received: attendee.received ? [
                        messageName,
                        ...attendee.received,
                    ] : [messageName],
                };
            } else {
                return { ...attendee };
            }
        } else {
            return {
                ...attendee,
            };
        }
    });
    yaml.sync('attendees.yml', updatedAttendees);
    console.log('All messages sent');
    if (options.limit > sent) {
        console.warn('WARNING: you set a limit higher than the number of attendees I could send to. If you were expecting this, please ignore this message');
    }
};

export default send;
