import program from 'commander';
import init from './handlers/init';
import send from './handlers/send';

program
    .version('0.0.1')
    .command('init [name]')
    .description('initialise a new hackathon')
    .option("-x, --example_yml", "generate example yaml that shows how to add attendees")
    .option("-t, --twilio_key <key>", "A twilio key is required in order to send text messages")
    .action(init);

program
    .version('0.0.1')
    .command('send [message_name]')
    .description('initialise a new hackathon')
    .option("-x, --example_yml", "generate example yaml that shows how to add attendees")
    .option("-t, --twilio_key <key>", "A twilio key is required in order to send text messages")
    .action(send);

program.parse(process.argv);

if (!program.args.length) program.help();
