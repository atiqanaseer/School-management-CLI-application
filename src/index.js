import { parseCommand } from "./command-parser.js";
import { handleTraineeCommand } from "./traineeCommands.js";
import { handleCourseCommand } from "./courseCommands.js";
import promptSync from 'prompt-sync';
const prompt = promptSync();

// This is the entry point of your application. 

// Intro to the program and instructions...
console.log('Welcome.. how to use this program...\n');

// Ask user for input, parse the command, and call the appropriate function from courseCommands.js or traineeCommands.js based on the command.
const userInput = prompt('Enter Command: ');
const parsedCommand = parseCommand(userInput);

if(parsedCommand != null) {
    if(parsedCommand.command === 'TRAINEE') {
        handleTraineeCommand(parsedCommand.subcommand, parsedCommand.args);
    } else if(parsedCommand.command === 'COURSE') {
        handleCourseCommand(parsedCommand.subcommand, parsedCommand.args);
    }
}
