import { describe, expect, test, beforeEach, vi } from 'vitest';
import { saveCourseData, loadCourseData, loadTraineeData } from '../src/storage.js';
import { handleCourseCommand } from '../src/courseCommands.js';

// Mock storage functions
vi.mock('../src/storage.js');

describe('Course Commands', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('addCourse', () => {
    test('should add a new course with valid parameters', () => {
      loadCourseData.mockReturnValue([]);
      
      handleCourseCommand('ADD', ['JavaScript Basics', '2026-03-01']);
      
      expect(saveCourseData).toHaveBeenCalled();
    });
  });

  describe('updateCourse', () => {
    test('should update course with valid parameters', () => {
      const courses = [
        { id: 1, name: 'Old Name', startDate: '2026-03-01', participants: [] }
      ];
      loadCourseData.mockReturnValue(courses);
      
      handleCourseCommand('UPDATE', ['1', 'New Name', '2026-04-01']);
      
      expect(saveCourseData).toHaveBeenCalled();
    });
  });

  describe('deleteCourse', () => {
    test('should delete a course successfully', () => {
      const courses = [
        { id: 1, name: 'JavaScript', startDate: '2026-03-01', participants: [] }
      ];
      loadCourseData.mockReturnValue(courses);
      
      handleCourseCommand('DELETE', ['1']);
      
      expect(saveCourseData).toHaveBeenCalled();
    });
  });

  describe('joinCourse', () => {
    test('should add trainee to course successfully', () => {
      const courses = [
        { id: 1, name: 'JavaScript', startDate: '2026-03-01', participants: [] }
      ];
      const trainees = [
        { id: 101, firstName: 'John', lastName: 'Doe' }
      ];
      loadCourseData.mockReturnValue(courses);
      loadTraineeData.mockReturnValue(trainees);
      
      handleCourseCommand('JOIN', ['1', '101']);
      
      expect(saveCourseData).toHaveBeenCalled();
    });
  });

  describe('leaveCourse', () => {
    test('should remove trainee from course successfully', () => {
      const courses = [
        { id: 1, name: 'JavaScript', startDate: '2026-03-01', participants: [101] }
      ];
      const trainees = [
        { id: 101, firstName: 'John', lastName: 'Doe' }
      ];
      loadCourseData.mockReturnValue(courses);
      loadTraineeData.mockReturnValue(trainees);
      
      handleCourseCommand('LEAVE', ['1', '101']);
      
      expect(saveCourseData).toHaveBeenCalled();
    });
  });

  describe('getCourse', () => {
    test('should return course details with participants', () => {
      const courses = [
        { id: 1, name: 'JavaScript', startDate: '2026-03-01', participants: [101] }
      ];
      const trainees = [
        { id: 101, firstName: 'John', lastName: 'Doe' }
      ];
      loadCourseData.mockReturnValue(courses);
      loadTraineeData.mockReturnValue(trainees);
      
      handleCourseCommand('GET', ['1']);
      
      // Should display course info
    });
  });

  describe('getAllCourses', () => {
    test('should display all courses sorted by start date', () => {
      const courses = [
        { id: 2, name: 'React', startDate: '2026-04-01', participants: [101] },
        { id: 1, name: 'JavaScript', startDate: '2026-03-01', participants: [] }
      ];
      loadCourseData.mockReturnValue(courses);
      
      handleCourseCommand('GETALL', []);
      
      // Should display sorted courses
    });
  });
});
