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


//@stack-overflow http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffleArray = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}