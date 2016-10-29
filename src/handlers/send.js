import readYaml from 'read-yaml';

const send = (messageName, options) => {
    if (!messageName) {
        console.error('ERROR: Moron. No message name was provided. Try again if you have to.');
        process.exit(1);
    }
    const hackathonConfig = readYaml.sync('hackathon.yml');
    const { messages } = hackathonConfig;
    const matchedMessages = messages.filter(value => (
        value.name === messageName
    ));
    if (matchedMessages.length > 1) {
        console.warn('WARNING: You have messages with the same name, normally only the first will be sent');
        console.log('SUGGESTION: Do not use the same name for messages');
        console.log('SARCASM: Try being creative.');
    }
    const message = matchedMessages[0];
    console.log('HackaServe: The following message will be sent');
    console.log(message.text);
};

export default send;
