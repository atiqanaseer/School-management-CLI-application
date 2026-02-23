import { parseCommand } from "./command-parser.js";
import promptSync from 'prompt-sync';
const prompt = promptSync();

const name = prompt(' ');
// This is the entry point of your application. 
// Ask user for input, parse the command, and call the appropriate function from courseCommands.js or traineeCommands.js based on the command.

console.log('Hello world');
