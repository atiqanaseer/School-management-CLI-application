import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/courses.json';

export function loadTraineeData() {
  // Use the fs module to read the trainees.json file and return the data as a JavaScript object
  try {
    const rawData = fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf8');
    return JSON.parse(rawData);
  }  
  catch (err) {
    if (err.code === 'ENOENT') { // File doesn't exist
    return [];
    }
    throw err;
  }
}

export function saveTraineeData(traineeData) {
  // Use the fs module to write the updated trainee data back to the trainees.json file 
  try {
    const jsonData = JSON.stringify(traineeData, null, 2);
    fs.writeFileSync(TRAINEE_DATA_FILE_PATH, jsonData, 'utf8');
  } catch (err) {
    throw err;
  }
}

export function loadCourseData() {
  try {
    const rawData = fs.readFileSync(COURSE_DATA_FILE_PATH, 'utf8');
    return JSON.parse(rawData);
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

export function saveCourseData(courseData) {
  try {
    const jsonData = JSON.stringify(courseData, null, 2);
    fs.writeFileSync(COURSE_DATA_FILE_PATH, jsonData, 'utf8');
  } catch (err) {
    throw err;
  }
}