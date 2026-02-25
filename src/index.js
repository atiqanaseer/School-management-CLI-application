import { parseCommand } from "./command-parser.js";
import { handleTraineeCommand } from "./traineeCommands.js";
import { handleCourseCommand } from "./courseCommands.js";
import chalk from 'chalk';
import promptSync from 'prompt-sync';
const prompt = promptSync();

// This is the entry point of your application. 

// Intro to the program and instructions...
console.log(chalk.blue.bold('=========================================='));
console.log(chalk.blue.bold('     School Management CLI Application      '));
console.log(chalk.blue.bold('==========================================\n'));

console.log(chalk.yellow.bold('TRAINEE COMMANDS:'));
console.log(chalk.gray('  TRAINEE ADD <firstName> <lastName>        - Add a new trainee'));
console.log(chalk.gray('  TRAINEE UPDATE <id> <firstName> [lastName] - Update trainee info'));
console.log(chalk.gray('  TRAINEE DELETE <id>                        - Delete a trainee'));
console.log(chalk.gray('  TRAINEE GET <id>                           - Get trainee details'));
console.log(chalk.gray('  TRAINEE GETALL                             - List all trainees\n'));

console.log(chalk.cyan.bold('COURSE COMMANDS:'));
console.log(chalk.gray('  COURSE ADD <name> <startDate>             - Add a new course (YYYY-MM-DD)'));
console.log(chalk.gray('  COURSE UPDATE <id> <name> <startDate>     - Update course info'));
console.log(chalk.gray('  COURSE DELETE <id>                         - Delete a course'));
console.log(chalk.gray('  COURSE JOIN <courseId> <traineeId>        - Add trainee to course'));
console.log(chalk.gray('  COURSE LEAVE <courseId> <traineeId>       - Remove trainee from course'));
console.log(chalk.gray('  COURSE GET <id>                            - Get course details'));
console.log(chalk.gray('  COURSE GETALL                              - List all courses\n'));

console.log(chalk.green('Start entering commands below:\n'));

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
