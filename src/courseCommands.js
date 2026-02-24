import { saveCourseData, loadCourseData } from './storage.js';
// get course input from index.js and using function in command-parser.js
// get existing courses information from storage.js
// get trainee information from storage.js
// 


function addCourse(courseName , startDate) {
  // add new course with unique ID of a random number between 0 and 99999 which doesnt repeat again.
  // add start date with ISO8601 date format: yyyy-MM-dd
  // errors handeling: Missing parameters → `ERROR: Must provide course name and start date`
  // errors handeling: Invalid date → `ERROR: Invalid start date. Must be in yyyy-MM-dd format`
  // 
}
function updateCourse(courseID, courseName , startDate) {
  // Update a course name and start date.
  // error handeling: - Invalid ID → `ERROR: Course with ID <ID> does not exist`
  // error handeling: Missing parameters → `ERROR: Must provide ID, name and start date.`
  // output should be UPDATED: <ID> <name> <startDate>
}

function deleteCourse(courseID) {
  // delete a course
  // output:  DELETED: <ID> <name>
  // error handeling: Invalid ID → ERROR: Course with ID <ID> does not exist

}

function joinCourse(courseID, traineeID) {
  // Add the trainee to the course's list of participants.
  // output: <traineeName> Joined <courseName>
  // Errors:
   /* Missing parameters → `ERROR: Must provide course ID and trainee ID`
- Invalid course ID → `ERROR: Course with ID <ID> does not exist`
- Invalid trainee ID → `ERROR: Trainee with ID <ID> does not exist`
- Trainee has already joined the course → `ERROR: The Trainee has already joined this course`
- Course has reached maximum participants (20) → `ERROR: The course is full.`
- Trainee has reached maximum course enrolments (5) → `ERROR: A trainee is not allowed to join more than 5 courses.` */
}

function leaveCourse(courseID, traineeID) {
  // Remove the trainee from the list of participants of the course
  // output: <traineeName> Left <courseName>
  //errors: 
/*  Missing parameters → `ERROR: Must provide course ID and trainee ID`
- Invalid course ID → `ERROR: Course with ID <ID> does not exist`
- Invalid trainee ID → `ERROR: Trainee with ID <ID> does not exist`
- Trainee didn’t join the course → `ERROR: The Trainee did not join the course`
  } */
}

function getCourse(courseID) {
  // Show information about a specific course. Display the list of all participants including the trainee ID, first name and last name.
  // Invalid ID → ERROR: Course with ID <ID> does not exist
}

function getAllCourses() {
  // Display all courses sorted by start date, with the number of participants. At the end show the total number of courses.
  // If the course reached maximum participants, show a FULL label at the end of the line.
}

export function handleCourseCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
}