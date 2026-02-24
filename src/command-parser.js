export function parseCommand(userInput) {
  // TODO: Implement the logic to parse the user input and return an object with the command, subcommand, and arguments

  // sanitize
  const sanitizedUserInput = userInput.trim().replace(/\s+/g, ' ');

  // handle QUIT commands (case sensitive)
  if (sanitizedUserInput === 'QUIT' || sanitizedUserInput === 'q') {
    console.log("Quitting the program.");
    return null;
  }

  // split into array
  const inputParts = sanitizedUserInput.split(' ');

  // error handeling
  if (inputParts.length < 2) {
    console.error(
      "\n❌ Invalid command format.\n" +
      "Usage: <COMMAND> <SUB_COMMAND> <PARAMETER1> <PARAMETER2> ...\n"
    );
    return null; // Return null so the program exits without error
  }

  //  case sensitivity
  const command = inputParts[0].toUpperCase();
  const subcommand = inputParts[1].toUpperCase();
  const args = inputParts.slice(2);
  
  // return the object
  return {
    command,
    subcommand,
    args
  };
}
