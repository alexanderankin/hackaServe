import readYaml from 'read-yaml';
import yaml from 'write-yaml';
import fs from 'fs';
import path from 'path';

const addMessage = (name, options) => {
    console.log('HackaServe: Adding your message to your hackathon.yml');
    if (!name) {
        console.error('ERROR: No name provided. You\'re about as helpful as a fork is for eating yoghurt');
        process.exit(1);
    }

    if (!fs.existsSync(path.join(process.cwd(), 'hackathon.yml'))) {
        console.error('ERROR: No No No. Where is your hackathon.yml. Just stop, actually work out where the hell you\'re doing this and try again');
        process.exit(1);
    }
    const hackathon = readYaml.sync('hackathon.yml');

    const message = {
        name,
        text: options.body ? options.body : null,
        group: 'all',
        type: 'once',
    }

    const newHackathonFile = {
        ...hackathon,
        messages: hackathon.messages ? [
            message,
            ...hackathon.messages,
        ] : [messageName],
    }

    yaml.sync('hackathon.yml', newHackathonFile);
    console.log('HackaServe: Your message has been successfully added to your hackathon.yml - No need to thank me');
    console.log('KIDDING: Nah, I\'m just programmed to say that');
}

export default addMessage;