#!/usr/bin/env node

import program from 'commander';
import init from './handlers/init';
import send from './handlers/send';
import addMessage from './handlers/add/message';
import addAttendee from './handlers/add/attendee';
import addFromCsv from './handlers/add/csv';

const list = (val) => {
  return val.split(',');
}

program
    .version('0.0.1');

program
    .command('init [name]')
    .description('initialise a new hackathon')
    .option('-x, --example_yml', 'generate example yaml that shows how to add attendees')
    .option('-tk, --twilio_key <key>', 'A twilio key is required in order to send text messages')
    .option('-ti, --twilio_id <id>', 'A twilio id is required in order to send text messages')
    .option('-tn, --twilio_number <number>', 'A twilio telephone number is required in order to send text messages')
    .action(init);

program
    .command('send [message_name]')
    .description('Send message to attendees')
    .option('-g, --groups <groups>', 'All the groups to send a message to', list)
    .option('-l, --limit <limit>', `Set the max number of attendees to send to
        - when run multiple times, this command WILL NOT send to the same attendee twice`, parseInt)
    .action(send);

program
    .command('add-message [name]')
    .description('Add a new messsage with a given name')
    .option('-b, --body <text>', 'The text to send when you call the send command')
    .action(addMessage);

program
    .command('add-attendee [name]')
    .description('Add a new attendee with a given name')
    .option('-e, --email <email>', 'The email for the attendee you are adding')
    .option('-t, --telephone <telephone>', 'The SMS number for the attendee you are adding')
    .option('-g, --groups <groups>', 'The groups to which you are adding your attendee (automatically added to attendee group)', list)
    .action(addAttendee);

program
    .command('add-attendees-from-csv [csvfilename]')
    .description('Add multiple attendees using a csv')
    .option('-o, --overwrite', 'Causes your attendees.yml to be overwritten with the data from the CSV')
    .action(addFromCsv);

program
    .command('*')
    .description('Catch all for commands that simply don\'t exist')
    .action(() => {
        console.log('ERROR: No command provided. Read the help below and try again dum-dum')
        program.help();
    });

program.parse(process.argv);

if (!program.args.length) program.help();
