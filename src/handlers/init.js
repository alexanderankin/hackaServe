import fs from 'fs';
import path from 'path';
import yaml from 'write-yaml';

const handler = (name, options) => {
    if (fs.existsSync(path.join(process.cwd(), name))) {
        console.error('ERROR: Directory already exists, why do I even bother...');
        process.exit(1);
    }
    console.log("HackaServe: Creating a new directory...");
    fs.mkdirSync(path.join(process.cwd(), name));
    const info = {
        name,
        description: '',
        twilio_account_id: options.twilio_id || null,
        twilio_api_key: options.twilio_key || null,
        twilio_phone_number: options.twilio_number || null,
        messages: [{
            name: 'first_message',
            text: 'HackKings: Lunch is now served in room K1.42',
            group: 'all',
            type: 'once'
        }],
    }
    yaml.sync(path.join(name, 'hackathon.yml'), info);
    if (options.example_yml) {
        const userInfo = [{
            name: 'Adam Green',
            telephone: 'YEEE...NO',
            email: 'YEEE...NO',
            groups: [
                'attendee',
                'fussy',
            ]
        }]
        yaml.sync(path.join(name, 'attendees.yml'), userInfo);
    }
    console.log(`HackaServe: Process complete, type "$ cd ./${name}" to use your hackathon`);
};

export default handler;
