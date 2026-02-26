import chalk from 'chalk';
import { saveTraineeData, loadTraineeData, loadCourseData } from './storage.js';

// find index of trainee
function findTraineeIndex(trainees, id) {
  return trainees.findIndex(t => t.id === id);
}
// find trainee
function findTrainee(trainees, id) {
  return trainees.find(t => t.id === id);
}
// capitalize 1st letter
function normalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}

export function addTrainee(firstName, lastName) {
  const trainees = loadTraineeData() || [];

  // Generate a unique random ID between 0-99999
  const generateUniqueId = () => {
    let id;
    do {
        id = Math.floor(Math.random() * 100000); 
    } while (trainees.some(t => t.id === id));
    return id;
  };

  // Create new trainee object with normalized names
  const id = generateUniqueId();
  const newTrainee = {
    id,
    firstName: normalize(firstName),
    lastName: normalize(lastName),
  };
  trainees.push(newTrainee);  // add new trainee at the end.
  saveTraineeData(trainees);
  return `CREATED: ${id} ${newTrainee.firstName} ${newTrainee.lastName}`;
}

function updateTrainee(traineeID, firstName, lastName) {
  // Load existing trainees from storage
  const trainees = loadTraineeData() || [];
  
  // Find the trainee by ID
  const idx = findTraineeIndex(trainees, traineeID);
  if (idx === -1) throw new Error(`ERROR: Trainee with ID ${traineeID} not found`);
  
  // Update Name if provided
  if (firstName) trainees[idx].firstName = normalize(firstName);
  if (lastName) trainees[idx].lastName = normalize(lastName);
  
  // Save updated data to storage
  saveTraineeData(trainees);
  
  // Return success message
  return `UPDATED: ${trainees[idx].id} ${trainees[idx].firstName} ${trainees[idx].lastName}`;
}

function deleteTrainee(traineeID) {
  const trainees = loadTraineeData() || [];
  const idx = findTraineeIndex(trainees, traineeID);
  if (idx === -1) throw new Error(`ERROR: Trainee with ID ${traineeID} not found`);
  
  // Remove trainee from array and save
  const deleted = trainees.splice(idx, 1)[0]; // 1 trainee to be removed
  saveTraineeData(trainees);
  return `DELETED: ${deleted.id} ${deleted.firstName} ${deleted.lastName}`;
}

function fetchTrainee(traineeID) {
  // Find trainee by ID
  const trainee = findTrainee(loadTraineeData() || [], traineeID);
  if (!trainee) throw new Error(`ERROR: Trainee with ID ${traineeID} not found`);

  // Get trainee's courses
  const getTraineeCourses = () => {
    const courses = loadCourseData() || [];
    const traineeCourses = courses
      .filter(course => (course.participants || []).includes(traineeID)) //Only keep courses where trainee is enrolled
      .map(course => course.name); // Transform array of course objects into array of course names
    return traineeCourses.length ? traineeCourses.join(', ') : 'None';
  };
  
  // Return trainee info with their courses
  return `${trainee.id} ${trainee.firstName} ${trainee.lastName}\nCourses: ${getTraineeCourses()}`;
}

function fetchAllTrainees() {
  const trainees = loadTraineeData() || [];
  
  // Handle empty list case
  if (trainees.length === 0) {
    return 'Trainees:\n\nTotal: 0';
  }
  
  // Format trainees as ID FirstName LastName, one per line
  const list = trainees.map(t => `${t.id} ${t.firstName} ${t.lastName}`).join('\n');
  return `Trainees:\n${list}\n\nTotal: ${trainees.length}`;
}

export function handleTraineeCommand(subcommand, args) {
    // Read the subcommand and call the appropriate function with the arguments
    // decide on the basis of subcommand which function to call (e.g. ADD -> addTrainee)
    // pass args as parameters/arguments in the function ( e.g. addTrainee(...args) )
    // Route to appropriate function based on subcommand
    try {
        switch (subcommand) {
            case 'ADD':
                if (args.length < 2) {
                throw new Error('ERROR: Must provide first and last name');
                }
                const addResult = addTrainee(args[0], args[1]);
                console.log(chalk.green(addResult));
                break;

            case 'UPDATE':
                if (args.length < 2) {
                throw new Error('ERROR: UPDATE requires traineeID and at least firstName or lastName');
                }
                const updateId = parseInt(args[0], 10);
                const updateFirstName = args[1] || null;
                const updateLastName = args[2] || null;
                const updateResult = updateTrainee(updateId, updateFirstName, updateLastName);
                console.log(chalk.green(updateResult));
                break;

            case 'DELETE':
                if (args.length < 1) {
                throw new Error('ERROR: DELETE requires traineeID');
                }
                const deleteId = parseInt(args[0], 10); //parses a string and returns an integer
                const deleteResult = deleteTrainee(deleteId);
                console.log(chalk.green(deleteResult));
                break;

            case 'GET':
                if (args.length < 1) {
                throw new Error('ERROR: FETCH requires traineeID');
                }
                const fetchId = parseInt(args[0], 10);
                const fetchResult = fetchTrainee(fetchId);
                console.log(chalk.green(fetchResult));
                break;

            case 'GETALL':
                const allResult = fetchAllTrainees();
                console.log(chalk.green(allResult));
                break;

            default:
                throw new Error(`ERROR: Unknown trainee subcommand '${subcommand}'`);
        }
    } catch (err) {
        console.log(chalk.red(err.message));
    }
}