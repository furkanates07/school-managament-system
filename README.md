# Student Management System

The Student Management System is a web-based application for managing student and course information. It provides functionality to add, delete, and analyze student and course data. The system is built using HTML, CSS, and JavaScript and is designed for easy integration and usage.

## Features

- Add and delete students with gender information
- Enroll students in courses with midterm and final scores
- View pass/fail statistics for courses
- Calculate letter grades based on different scales (10-point, 7-point)
- Delete students from courses and delete entire courses
- Responsive and user-friendly interface

## Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Safari, etc.)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/furkanates07/student-management-system.git

## Overview

This project implements a student and course management system using JavaScript. It consists of two main classes: `CourseManager` and `StudentManager`. These classes handle the management of courses and students, respectively.

### CourseManager Class

#### Methods

- **`createCourseTable()`**
  - Creates and displays an HTML table of courses.

- **`populateCourseDropdown()`**
  - Populates course dropdown options in the user interface.

- **`deleteCourseById(courseId)`**
  - Deletes a course by its ID and updates the displayed table and dropdown.

- **`addCourse(courseName, instructorName)`**
  - Adds a new course to the system and updates the course table and dropdown.

- **`deleteStudentFromCourse(courseId, studentId)`**
  - Deletes a student from a specific course and updates the course table and dropdown.

- **`calculateLetterGradesForCourse(courseId, scale)`**
  - Calculates and displays letter grades for students in a specific course.

- **`calculateLetterGrade(score, scale)`**
  - Calculates the letter grade based on the provided score and scale.

- **`createPassFailTable(courseId)`**
  - Creates and displays a table of pass/fail counts for a specific course.

- **`calculateMeanScore(passFailCounts10, passFailCounts7, scale)`**
  - Calculates the mean score based on pass/fail counts and the specified scale.

- **`calculatePassFailCounts(courseId, scale)`**
  - Calculates pass/fail counts for a specific course based on the given scale.

### StudentManager Class

#### Methods

- **`createStudentTable()`**
  - Creates and displays an HTML table of students, including their courses and overall GPA.

- **`calculateOverallGPA(courses)`**
  - Calculates the overall GPA for a student based on their courses.

- **`addStudent(name, gender)`**
  - Adds a new student to the system and updates the student table.

- **`deleteStudent(id, name)`**
  - Deletes a student by their ID and name, updating the student table.

- **`getStudentCoursesAndGPATable(id, name)`**
  - Displays a table showing the courses and GPA for a specific student.

- **`addOrUpdateCourseToStudent(courseId, studentId, midtermScore, finalScore)`**
  - Adds or updates course information for a student and updates the student table.

- **`calculateWeightedAverage(courseId, studentId)`**
  - Calculates the weighted average for a student in a specific course.

## Usage

To use the system, instantiate both `CourseManager` and `StudentManager` classes and call their methods to perform various operations. Ensure that the necessary HTML elements are present for displaying the tables and dropdowns.

Feel free to customize and extend the functionality based on your requirements.

[![image](https://i.hizliresim.com/o8u7bze.jpg)](https://hizliresim.com/o8u7bze)

[![image](https://i.hizliresim.com/g28bf3o.jpg)](https://hizliresim.com/g28bf3o)

[![image](https://i.hizliresim.com/ic72ha7.jpg)](https://hizliresim.com/ic72ha7)