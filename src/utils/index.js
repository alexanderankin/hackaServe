import fs from 'fs';
import path from 'path';

export const getMessagesByName = (messages, name) => {
    const matchedMessages = messages.filter(value => (
        value.name === name
    ));
    if (matchedMessages.length > 1) {
        console.warn('WARNING: You have messages with the same name, normally only the first will be sent');
        console.log('SUGGESTION: Do not use the same name for messages');
        console.log('SARCASM: Try being creative.');
    }
    return matchedMessages;
}

export const logMessageEvents = (messageName, log) => {
    fs.openSync(path.join(process.cwd(), `${messageName}.log`), 'a');
    fs.appendFileSync(path.join(process.cwd(), `${messageName}.log`), `${log}\n`);
}

export const currentDateTimeString = () => {
    const currentdate = new Date(); 
    return currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
}