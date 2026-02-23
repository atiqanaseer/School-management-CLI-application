import { saveTraineeData, loadTraineeData } from './storage.js';

function addTrainee(firstName, lastName) {
  // TODO: Implement the logic

}

function updateTrainee(traineeID, firstName, lastName) {
  // TODO: Implement the logic
}

function deleteTrainee(traineeID) {
  // TODO: Implement the logic
}

function fetchTrainee(traineeID) {
  // TODO: Implement the logic
}

function fetchAllTrainees() {
  // TODO: Implement the logic
}

export function handleTraineeCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
  // decide on the basis of subcommand which function to call (e.g. ADD -> addTrainee)
  // pass args as parameters/arguments in the function ( e.g. addTrainee(...args) )
}