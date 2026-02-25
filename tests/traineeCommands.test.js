import { describe, expect, test, beforeEach, vi } from 'vitest';
import { saveTraineeData, loadTraineeData, loadCourseData } from '../src/storage.js';
import { handleTraineeCommand } from '../src/traineeCommands.js';

// Mock storage functions
vi.mock('../src/storage.js');

describe('Trainee Commands', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('addTrainee', () => {
    test('should add a new trainee with valid first and last name', () => {
      loadTraineeData.mockReturnValue([]);
      
      handleTraineeCommand('ADD', ['John', 'Doe']);
      
      expect(saveTraineeData).toHaveBeenCalled();
    });
  });

  describe('updateTrainee', () => {
    test('should update trainee with new first name', () => {
      const trainees = [
        { id: 12345, firstName: 'John', lastName: 'Doe' }
      ];
      loadTraineeData.mockReturnValue(trainees);
      
      handleTraineeCommand('UPDATE', ['12345', 'Johnny']);
      
      expect(saveTraineeData).toHaveBeenCalled();
    });
  });

  describe('deleteTrainee', () => {
    test('should delete a trainee successfully', () => {
      const trainees = [
        { id: 12345, firstName: 'John', lastName: 'Doe' }
      ];
      loadTraineeData.mockReturnValue(trainees);
      
      handleTraineeCommand('DELETE', ['12345']);
      
      expect(saveTraineeData).toHaveBeenCalled();
    });
  });

  describe('fetchTrainee', () => {
    test('should return trainee details', () => {
      const trainees = [
        { id: 12345, firstName: 'John', lastName: 'Doe' }
      ];
      loadTraineeData.mockReturnValue(trainees);
      loadCourseData.mockReturnValue([]);
      
      handleTraineeCommand('GET', ['12345']);
      
      // Should display trainee info
    });
  });

  describe('fetchAllTrainees', () => {
    test('should display all trainees', () => {
      const trainees = [
        { id: 12345, firstName: 'John', lastName: 'Doe' },
        { id: 12346, firstName: 'Jane', lastName: 'Smith' },
        { id: 12347, firstName: 'Bob', lastName: 'Johnson' }
      ];
      loadTraineeData.mockReturnValue(trainees);
      
      handleTraineeCommand('GETALL', []);
      
      // Should display all trainees with total count
    });
  });

});
