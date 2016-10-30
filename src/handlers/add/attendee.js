import readYaml from 'read-yaml';
import yaml from 'write-yaml';
import fs from 'fs';
import path from 'path';

const addAttendee = (name, options) => {
    console.log('HackaServe: Adding your message to your hackathon.yml');
    if (!name) {
        console.error('ERROR: No name provided. You\'re about as helpful as a fork is for eating yoghurt');
        process.exit(1);
    }
    
    const attendee = {
        name,
        telephone: options.telephone ? options.telephone : null,
        email: options.email ? options.email : null,
        groups: options.groups ? ['attendee', ...groups] : ['attendee'],
    }

    if (!fs.existsSync(path.join(process.cwd(), 'attendees.yml'))) {
        console.warn('WARNING: No attendees.yml exist, I\'ll generate it because I\'ve got nothing better to do');
        console.log('INFO: If you have not added attendees yet, then this is normal. If you have, you have probably renamed or deleted the yml');
        yaml.sync('attendees.yml', [attendee]);
    } else {
        const attendees = readYaml.sync('attendees.yml');
        yaml.sync('attendees.yml', [...attendees, attendee]);
    }

    console.log('Finished adding attendee to attendee.yml');
}

export default addAttendee;