import chalk from 'chalk';
import { saveTraineeData, loadTraineeData, loadCourseData } from './storage.js';

function findTraineeIndex(trainees, id) {
  return trainees.findIndex(t => t.id === id);
}
function findTrainee(trainees, id) {
  return trainees.find(t => t.id === id);
}
function normalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}
function getTraineeCourses(traineeID) {
  const courses = loadCourseData() || [];
  const traineeCourses = courses
    .filter(course => (course.participants || []).includes(traineeID))
    .map(course => course.name);
  return traineeCourses.length ? traineeCourses.join(', ') : 'None';
}

export function addTrainee(firstName, lastName) {
  const trainees = loadTraineeData() || [];

  const generateUniqueId = () => {
    let id;
    do {
        id = Math.floor(Math.random() * 100000);
    } while (trainees.some(t => t.id === id));
    return id;
  };

  const id = generateUniqueId();
  const newTrainee = {
    id,
    firstName: normalize(firstName),
    lastName: normalize(lastName),
  };
  trainees.push(newTrainee);
  saveTraineeData(trainees);
  return `CREATED: ${id} ${newTrainee.firstName} ${newTrainee.lastName}`;
}

function updateTrainee(traineeID, firstName, lastName) {
  const trainees = loadTraineeData() || [];
  const idx = findTraineeIndex(trainees, traineeID);
  if (idx === -1) throw new Error(`ERROR: Trainee with ID ${traineeID} not found`);
  if (firstName) trainees[idx].firstName = normalize(firstName);
  if (lastName) trainees[idx].lastName = normalize(lastName);
  trainees[idx].fullName = `${trainees[idx].firstName} ${trainees[idx].lastName}`;
  saveTraineeData(trainees);
  return `UPDATED: ${trainees[idx].id} ${trainees[idx].firstName} ${trainees[idx].lastName}`;
}

function deleteTrainee(traineeID) {
  const trainees = loadTraineeData() || [];
  const idx = findTraineeIndex(trainees, traineeID);
  if (idx === -1) throw new Error(`ERROR: Trainee with ID ${traineeID} not found`);
  const deleted = trainees.splice(idx, 1)[0];
  saveTraineeData(trainees);
  return `DELETED: ${deleted.id} ${deleted.firstName} ${deleted.lastName}`;
}

function fetchTrainee(traineeID) {
  const trainee = findTrainee(loadTraineeData() || [], traineeID);
  if (!trainee) throw new Error(`ERROR: Trainee with ID ${traineeID} not found`);
  return `${trainee.id} ${trainee.firstName} ${trainee.lastName}\nCourses: ${getTraineeCourses(traineeID)}`;
}

function fetchAllTrainees() {
  const trainees = loadTraineeData() || [];
  if (trainees.length === 0) {
    return 'Trainees:\n\nTotal: 0';
  }
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
                const deleteId = parseInt(args[0], 10);
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