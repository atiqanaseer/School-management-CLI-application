export function parseCommand(userInput) {
  // TODO: Implement the logic to parse the user input and return an object with the command, subcommand, and arguments
  // Sanitize
  const sanitized = userInput.trim().replace(/\s+/g, ' ');

  // Handle QUIT commands (case sensitive)
  if (sanitized === 'QUIT' || sanitized === 'q') {
    return {
      command: 'QUIT',
      subcommand: null,
      args: []
    };
  }
  // split into array
    const parts = sanitized.split(' ');

    // error handeling
  if (parts.length < 3) {
    throw new Error('Invalid command format. Use: COMMAND SUBCOMMAND [PARAMETER1] [PARAMETER2] ...');
  }
  //  case sensitivity
  const command = parts[0].toUpperCase();
  const subcommand = parts[1].toUpperCase();
  const args = parts.slice(2).map(arg => 
    arg.charAt(0).toUpperCase() + arg.slice(1).toLowerCase()
  );
  
  // extract array data to create an object with the command, subcommand, and arguments
  
  // return the object
  return {
    command,
    subcommand,
    args
  };
}
