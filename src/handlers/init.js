import fs from 'fs';
import path from 'path';
import yaml from 'write-yaml';

const handler = (name, options) => {
    if (fs.existsSync(path.join(process.cwd(), name))) {
        console.log('Directory already exists, terminating...');
        process.exit(1);
    }
    console.log("Creating a new directory...");
    fs.mkdirSync(path.join(process.cwd(), name));
    const info = {
        name,
        description: '',
        twilio_api_key: options.twilio_key,
        messages: [{
            name: 'first_message',
            text: 'Your first message here',
            sendtime: Date.now(),
            group: 'all'
        }],
    }
    yaml.sync(path.join(name, 'hackathon.yml'), info);
    if (options.example_yml) {
        const userInfo = [{
            name: 'Adam Green',
            telephone: '07545771492',
            email: 'adie9@btinternet.com',
            groups: [
                'attendee',
                'gluten-intolerant',
            ]
        }]
        yaml.sync(path.join(name, 'attendees.yml'), userInfo);
    }
};

export default handler;
