import chalk from 'chalk';
import { saveCourseData, loadCourseData, loadTraineeData } from './storage.js';

const requireParam = (val, msg) => {
  if (val === undefined || val === null || val === '') {
    throw new Error(msg);
  }
};

// Date validation (yyyy-MM-dd)
const isValidDate = s => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return false;
  const [y, m, day] = s.split('-').map(Number);
  return d.getUTCFullYear() === y && d.getUTCMonth() + 1 === m && d.getUTCDate() === day;
};

// find item or index by ID
const findById = (arr, id) => arr.find(x => x.id === id);
const findIdxById = (arr, id) => arr.findIndex(x => x.id === id);

// combine a trainee's first and last name into a single full name string
const traineeName = t => `${t.firstName} ${t.lastName}`.trim();

// get course by ID or throw error
const requireCourse = (courses, id) => {
  const course = findById(courses, id);
  if (!course) throw new Error(`ERROR: Course with ID ${id} does not exist`);
  return course;
};

// get trainee by ID or throw error
const requireTrainee = (trainees, id) => {
  const trainee = findById(trainees, id);
  if (!trainee) throw new Error(`ERROR: Trainee with ID ${id} does not exist`);
  return trainee;
};

function addCourse(courseName, startDate) {
  requireParam(courseName, 'ERROR: Must provide course name and start date');
  requireParam(startDate, 'ERROR: Must provide course name and start date');
  if (!isValidDate(startDate)) {
    throw new Error('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
  }

  const courses = loadCourseData() || [];

  // generate unique ID between 0 and 99999
  const generateUniqueId = items => {
    let id;
    do {
      id = Math.floor(Math.random() * 100000);
    } while (items.some(item => item.id === id));
    return id;
  };

  const id = generateUniqueId(courses);

  const newCourse = { 
    id, 
    name: courseName, 
    startDate, 
    participants: [] 
  };

  courses.push(newCourse);
  saveCourseData(courses);
  return `CREATED: ${id} ${newCourse.name} ${newCourse.startDate}`;
}

function updateCourse(courseID, courseName, startDate) {
  courseID = parseInt(courseID, 10);
  requireParam(courseID, 'ERROR: Must provide ID, name and start date.');
  requireParam(courseName, 'ERROR: Must provide ID, name and start date.');
  requireParam(startDate, 'ERROR: Must provide ID, name and start date.');
  if (!isValidDate(startDate)) {
    throw new Error('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
  }

  const courses = loadCourseData() || [];
  const idx = findIdxById(courses, courseID);
  if (idx === -1) throw new Error(`ERROR: Course with ID ${courseID} does not exist`);

  courses[idx].name = courseName;
  courses[idx].startDate = startDate;
  saveCourseData(courses);

  return `UPDATED: ${courses[idx].id} ${courses[idx].name} ${courses[idx].startDate}`;
}

function deleteCourse(courseID) {
  courseID = parseInt(courseID, 10);
  requireParam(courseID, 'ERROR: Must provide course ID');
  const courses = loadCourseData() || [];
  const idx = findIdxById(courses, courseID);
  if (idx === -1) throw new Error(`ERROR: Course with ID ${courseID} does not exist`);

  const deleted = courses.splice(idx, 1)[0];
  saveCourseData(courses);
  return `DELETED: ${deleted.id} ${deleted.name}`;
}

function joinCourse(courseID, traineeID) {
  courseID = parseInt(courseID, 10);
  traineeID = parseInt(traineeID, 10);
  requireParam(courseID, 'ERROR: Must provide course ID and trainee ID');
  requireParam(traineeID, 'ERROR: Must provide course ID and trainee ID');

  const courses = loadCourseData() || [];
  const trainees = loadTraineeData() || [];

  const course = requireCourse(courses, courseID);
  const trainee = requireTrainee(trainees, traineeID);

  course.participants ||= [];
  if (course.participants.includes(traineeID)) {
    throw new Error('ERROR: The Trainee has already joined this course');
  }
  if (course.participants.length >= 20) {
    throw new Error('ERROR: The course is full.');
  }

  const enrolments = courses.filter(c => (c.participants || []).includes(traineeID)).length;
  if (enrolments >= 5) {
    throw new Error('ERROR: A trainee is not allowed to join more than 5 courses.');
  }

  course.participants.push(traineeID);
  saveCourseData(courses);
  return `${traineeName(trainee)} Joined ${course.name}`;
}

function leaveCourse(courseID, traineeID) {
  courseID = parseInt(courseID, 10);
  traineeID = parseInt(traineeID, 10);  requireParam(courseID, 'ERROR: Must provide course ID and trainee ID');
  requireParam(traineeID, 'ERROR: Must provide course ID and trainee ID');

  const courses = loadCourseData() || [];
  const trainees = loadTraineeData() || [];

  const course = requireCourse(courses, courseID);
  const trainee = requireTrainee(trainees, traineeID);

  const idx = (course.participants || []).indexOf(traineeID);
  if (idx === -1) throw new Error('ERROR: The Trainee did not join the course');

  course.participants.splice(idx, 1);
  saveCourseData(courses);
  return `${traineeName(trainee)} Left ${course.name}`;
}

function getCourse(courseID) {
  courseID = parseInt(courseID, 10);
  requireParam(courseID, 'ERROR: Must provide course ID');

  const courses = loadCourseData() || [];
  const trainees = loadTraineeData() || [];

  const course = requireCourse(courses, courseID);
  const participants = (course.participants || [])
    .map(pid => findById(trainees, pid))
    .filter(Boolean)
    .map(t => `${t.id} ${t.firstName} ${t.lastName}`);

  const header = `${course.id} ${course.name} ${course.startDate}`;
  const count = participants.length;
  const list = participants.map(p => `- ${p}`).join('\n');
  return `${header}\nParticipants (${count}):${count ? `\n${list}` : ''}`;
}

function getAllCourses() {
  const courses = (loadCourseData() || []).slice().sort((a, b) => a.startDate.localeCompare(b.startDate));
  if (courses.length === 0) return 'Courses:\n\nTotal: 0';

  const list = courses.map(c => {
    const count = (c.participants || []).length;
    const full = count >= 20 ? ' FULL' : '';
    return `${c.id} ${c.name} ${c.startDate} ${count}${full}`;
  }).join('\n');

  return `Courses:\n${list}\n\nTotal: ${courses.length}`;
}

export function handleCourseCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
  // Route to appropriate function based on subcommand
  try {
    switch (subcommand) {
      case 'ADD': {
        // last arg is date, the rest is course name
        const dateArg = args[args.length - 1];
        const nameArg = args.slice(0, -1).join(' ');
        const result = addCourse(nameArg, dateArg);
        console.log(chalk.green(result));
        break;
      }
      case 'UPDATE': {
        // first arg is ID, last arg is date, middle is course name
        const updateId = args[0];
        const updateDate = args[args.length - 1];
        const updateName = args.slice(1, -1).join(' ');
        const result = updateCourse(updateId, updateName, updateDate);
        console.log(chalk.green(result));
        break;
      }
      case 'DELETE': {
        const result = deleteCourse(args[0]);
        console.log(chalk.green(result));
        break;
      }
      case 'JOIN': {
        const result = joinCourse(args[0], args[1]);
        console.log(chalk.green(result));
        break;
      }
      case 'LEAVE': {
        const result = leaveCourse(args[0], args[1]);
        console.log(chalk.green(result));
        break;
      }
      case 'GET': {
        const result = getCourse(args[0]);
        console.log(chalk.green(result));
        break;
      }
      case 'GETALL': {
        const result = getAllCourses();
        console.log(chalk.green(result));
        break;
      }
      default:
        throw new Error(`ERROR: Unknown course subcommand '${subcommand}'`);
    }
  } catch (err) {
    console.log(chalk.red(err.message));
  }
}