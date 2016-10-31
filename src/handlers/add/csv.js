import parseCsv from 'csv-parse/lib/sync';
import readline from 'readline-sync';
import fs from 'fs';
import path from 'path';
import readYaml from 'read-yaml';
import yaml from 'write-yaml';

const readCsv = (file, options) => {
    if (!file) {
        console.error('ERROR: You need to give me a file name for goodness sakes');
        process.exit(1);
    }

    if (!fs.existsSync(path.join(process.cwd(), file))) {
        console.error('ERROR: I cannot process data that does not exist can I? Come on you dope');
        process.exit(1);
    }

    if (options.overwrite) {
        console.log('WARNING: What? You don\'t like your current list? is nothing good enough?');
        const answer = readline.question('Hackaserve: Are you absolutely sure you want to do this? Type yes or anything else for no');
        if (answer.toLowerCase() !== 'yes') {
            console.log('Hackaserve: god... make up your mind already... Shutting down');
            process.exit(0);
        }

    }

    const records = parseCsv(fs.readFileSync(path.join(process.cwd(), file), { encoding: 'UTF-8' }));
    if (!records.length) {
        console.error('ERROR: I cannot read this data, I am only capable of reading csv files like adam,058457,adam@studentstudios.co');
        console.error('ERROR: It may also be the case that you are not using UTF-8 encoding, I cannot read ASCII');
        console.error('ERROR: Or you might just have an empty CSV, in which case you are an idiot');
        process.exit(1);
    }
    console.log('HackaServe: We need to determine how this CSV mmaps to our yaml');
    console.log('HackaServe: We are going to show you the first record and you need to indicate if -');
    console.log('HackaServe: it is a name, in which case type "name"');
    console.log('HackaServe: it is a telephone number, in which case type "telephone"');
    console.log('HackaServe: it is an email, in which case type "email"');
    console.log('HackaServe: it is a boolean indicating they belong to certain group, in which case type "group"');
    console.warn('WARNING: Any response that does NOT correspond to these 4 values will cause that column of your CSV to be ignored');

    const answers = ['name', 'telephone', 'email'];

    const record = records[0];
    const map = {
        name: -1,
        email: -1,
        telephone: -1,
        groups: {}
    }
    record.forEach((column, index) => {
        const answer = readline.question(`Information ${column} - What is this information?`);
        if (answers.includes(answer)) {
            `Information ${column} is a ${answer}`
            map[answer] = index;
        } else if (answer === 'group') {
            const groupNameAnswer = readline.question('Ok, this column is a group, so what are these group of attendees called?');
            map.groups[groupNameAnswer] = index;
        }
    });

    const attendees = records.map(attendee => {
        const groups = Object.keys(map.groups)
            .filter(groupIndex => (attendee[map.groups[groupIndex]].toLowerCase() === 'true'));
        return {
            name: map.name !== -1 ? attendee[map.name] : null,
            email: map.email !== -1 ? attendee[map.email] : null,
            telephone: map.telephone !== -1 ? attendee[map.telephone] : null,
            group: [...groups, 'attendee'],
        }
    });

    if (!fs.existsSync(path.join(process.cwd(), 'attendees.yml')) || options.overwrite) {
        console.warn('WARNING: No attendees.yml exist, I\'ll generate it because I\'ve got nothing better to do');
        console.log('INFO: If you have not added attendees yet, then this is normal. If you have, you have probably renamed or deleted the yml');
        yaml.sync('attendees.yml', attendees);
    } else {
        const prevAttendees = readYaml.sync('attendees.yml');
        yaml.sync('attendees.yml', [...attendees, ...prevAttendees]);
    }
}

export default readCsv;
