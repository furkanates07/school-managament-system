class CourseManager {
  constructor(courses, students) {
    // Constructor to initialize courses and students arrays
    this.courses = courses;
    this.students = students;
  }

  createCourseTable() {
    // Method to create and display a table of courses
    const allCoursesDiv = document.querySelector(".all-courses");

    // Clear the content of the 'all-courses' div before appending the table
    allCoursesDiv.innerHTML = "";

    // Create table, thead, and tbody elements
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create table header
    const headerRow = document.createElement("tr");
    ["ID", "Course Name", "Instructor Name"].forEach((headerText) => {
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(headerText));
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table body
    this.courses.forEach((course) => {
      const row = document.createElement("tr");
      ["id", "course_name", "instructor_name"].forEach((key) => {
        const cell = document.createElement("td");
        cell.appendChild(document.createTextNode(course[key]));
        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });

    // Append the header and body to the table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append the table to the 'all-courses' div
    allCoursesDiv.appendChild(table);

    // Add the 'active' class to the 'all-courses' div
    allCoursesDiv.classList.add("active");
  }

  populateCourseDropdown() {
    // Method to populate course dropdown options
    var courseSelect = document.querySelectorAll(".courseSelect");
    console.log(courseSelect);

    // Clear existing options
    courseSelect.forEach((select) => {
      select.innerHTML = "";
    });

    courseSelect.forEach((select) => {
      // Clear existing options
      select.innerHTML = "";

      // Create a default option
      var defaultOption = document.createElement("option");
      defaultOption.text = "Select a course";
      defaultOption.setAttribute("selected", true);
      defaultOption.setAttribute("disabled", true);
      select.add(defaultOption);

      // Populate options from the courses array
      this.courses.forEach((course) => {
        var option = document.createElement("option");
        option.value = course.id; // Use a unique identifier for the value
        option.text = course.course_name;
        select.add(option);
      });
    });
  }

  deleteCourseById(courseId) {
    // Method to delete a course by ID
    const index = this.courses.findIndex((course) => course.id === courseId);

    if (index !== -1) {
      // Remove the course from the courses array
      this.courses.splice(index, 1);
      console.log(`Course with ID ${courseId} deleted successfully.`);

      // Remove the course from the COURSES array
      const globalIndex = COURSES.findIndex((course) => course.id === courseId);
      if (globalIndex !== -1) {
        COURSES.splice(globalIndex, 1);
      }
    } else {
      console.error(`Course with ID ${courseId} not found.`);
    }

    this.createCourseTable();
    this.populateCourseDropdown();
  }

  createCourseID() {
    // Method to create a new student ID
    const newId = this.courses.length + Math.floor(Math.random() * 500);

    if (this.courses.find((course) => course.id === newId)) {
      // If the ID already exists, call the method again to generate a new ID
      return this.createCourseID();
    }

    return newId;
  }

  addCourse(courseName, instructorName) {
    // Method to add a new course
    // Check if the course with the same name already exists
    const existingCourse = this.courses.find(
      (course) => course.course_name === courseName
    );

    if (existingCourse) {
      console.error(`Course "${courseName}" already exists.`);
    } else {
      // Generate a unique ID (replace this with your logic to generate IDs)
      const newId = this.createCourseID();

      // Create a new course object
      const newCourse = {
        id: newId,
        course_name: courseName,
        instructor_name: instructorName,
        student_ids: [],
      };

      // Add the new course to the courses array
      this.courses.push(newCourse);

      console.log(`Course "${courseName}" added successfully.`);
    }

    // Update the course table and dropdown
    this.createCourseTable();
    this.populateCourseDropdown();
  }

  deleteStudentFromCourse(courseId, studentId) {
    // Method to delete a student from a course
    // Find the course by ID
    const course = this.courses.find((c) => c.id === courseId);

    if (!course) {
      console.error(`Course with ID ${courseId} not found.`);
      return;
    }

    // Check if the student ID exists in the course's student_ids array
    const studentIndex = course.student_ids.indexOf(studentId);

    if (studentIndex !== -1) {
      // Remove the student ID from the array
      course.student_ids.splice(studentIndex, 1);
      console.log(
        `Student with ID ${studentId} removed from Course ${courseId}.`
      );
      const student = new StudentManager(this.students, this.courses);
      student.deleteCourseFromStudent(studentId, courseId);
    } else {
      // Display an alert if the student ID is not found
      console.error(
        `Student with ID ${studentId} not found in Course ${courseId}.`
      );
      alert(`Student with ID ${studentId} not found in Course ${courseId}.`);
      return;
    }

    // Update the course table and dropdown
    this.createCourseTable();
    this.populateCourseDropdown();
  }

  addStudenttoCourse(courseId, studentId) {
    // Find the course by ID
    const course = this.courses.find((c) => c.id === courseId);

    if (!course) {
      console.error(`Course with ID ${courseId} not found.`);
      return;
    }

    // Check if the student ID is already in the course's student_ids array
    if (course.student_ids.includes(studentId)) {
      console.log(
        `Student with ID ${studentId} is already in Course ${courseId}.`
      );
      return;
    }

    // Add the student ID to the course's student_ids array
    course.student_ids.push(studentId);

    console.log(`Student with ID ${studentId} added to Course ${courseId}.`);
  }

  calculateLetterGradesForCourse(courseId, scale) {
    // Method to calculate and display letter grades for a course
    const course = this.courses.find((c) => c.id === courseId);

    if (!course) {
      console.error(`Course with ID ${courseId} not found.`);
      return;
    }

    console.log(`Course: ${course.course_name}`);
    console.log(`Scale: ${scale}-Point Scale`);

    const allCoursesDiv = document.querySelector(".all-courses");

    // Clear the content of the 'all-grades' div before appending the table
    allCoursesDiv.innerHTML = "";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create table header
    const headerRow = document.createElement("tr");
    ["Student ID", "Average", "Grade"].forEach((headerText) => {
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(headerText));
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const sortedRows = course.student_ids
      .map((studentId) => {
        const student = new StudentManager(this.students, this.courses);
        const average = parseInt(
          student.calculateWeightedAverage(courseId, studentId)
        );
        const grade = this.calculateLetterGrade(average, scale);

        return { studentId, average, grade };
      })
      .sort((a, b) => {
        // Custom sorting function to sort by letter grades
        const gradeOrder = { A: 1, B: 2, C: 3, D: 4, F: 5 };
        return gradeOrder[a.grade] - gradeOrder[b.grade];
      });

    // Create table body
    sortedRows.forEach((student) => {
      const row = document.createElement("tr");

      // Add student ID cell
      const studentIDCell = document.createElement("td");
      studentIDCell.appendChild(document.createTextNode(student.studentId));
      row.appendChild(studentIDCell);

      // Add average cell
      const averageCell = document.createElement("td");
      averageCell.appendChild(document.createTextNode(student.average));
      row.appendChild(averageCell);

      // Add grade cell
      const gradeCell = document.createElement("td");
      gradeCell.appendChild(document.createTextNode(student.grade));
      row.appendChild(gradeCell);

      tbody.appendChild(row);
    });

    // Append the header and body to the table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append the table to the 'all-grades' div
    allCoursesDiv.appendChild(table);

    // Add the 'active' class to the 'all-grades' div
    allCoursesDiv.classList.add("active");
  }

  calculateLetterGrade(score, scale) {
    // Method to calculate letter grade based on a scale
    if (scale === 7) {
      if (score >= 93) {
        return "A";
      } else if (score >= 85) {
        return "B";
      } else if (score >= 77) {
        return "C";
      } else if (score >= 70) {
        return "D";
      } else {
        return "F";
      }
    } else if (scale === 10) {
      if (score >= 90) {
        return "A";
      } else if (score >= 80) {
        return "B";
      } else if (score >= 70) {
        return "C";
      } else if (score >= 60) {
        return "D";
      } else {
        return "F";
      }
    } else {
      return "Invalid scale";
    }
  }

  createPassFailTable(courseId) {
    // Method to create and display a table of pass/fail counts for a course
    const course = this.courses.find((c) => c.id === courseId);

    if (!course) {
      console.error(`Course with ID ${courseId} not found.`);
      return;
    }

    console.log(`Course: ${course.course_name}`);

    const allCoursesDiv = document.querySelector(".all-courses");

    // Clear the content of the 'all-courses' div before appending the table
    allCoursesDiv.innerHTML = "";

    // Create the table and its components
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create table header
    const headerRow = document.createElement("tr");
    [
      "Course ID",
      "Course Name",
      "Pass (10 Scale)",
      "Fail (10 Scale)",
      "Pass (7 Scale)",
      "Fail (7 Scale)",
      "Mean Score (100 Scale)",
    ].forEach((headerText) => {
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(headerText));
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table body
    const passFailRow = document.createElement("tr");

    // Add Course ID cell
    const courseIdCell = document.createElement("td");
    courseIdCell.appendChild(document.createTextNode(course.id));
    passFailRow.appendChild(courseIdCell);

    // Add Course Name cell
    const courseNameCell = document.createElement("td");
    courseNameCell.appendChild(document.createTextNode(course.course_name));
    passFailRow.appendChild(courseNameCell);

    // Calculate and add Pass/Fail counts for 10 Scale
    const passFailCounts10 = this.calculatePassFailCounts(courseId, 10);
    ["pass_10", "fail_10"].forEach((countKey) => {
      const countCell = document.createElement("td");
      countCell.appendChild(
        document.createTextNode(passFailCounts10[countKey])
      );
      passFailRow.appendChild(countCell);
    });

    // Calculate and add Pass/Fail counts for 7 Scale
    const passFailCounts7 = this.calculatePassFailCounts(courseId, 7);
    ["pass_7", "fail_7"].forEach((countKey) => {
      const countCell = document.createElement("td");
      countCell.appendChild(document.createTextNode(passFailCounts7[countKey]));
      passFailRow.appendChild(countCell);
    });

    // Calculate and add Mean Score (100 Scale)
    const meanScore = this.calculateMeanScore(
      passFailCounts10,
      passFailCounts7,
      100
    );
    const meanScoreCell = document.createElement("td");
    meanScoreCell.appendChild(document.createTextNode(meanScore));
    passFailRow.appendChild(meanScoreCell);

    tbody.appendChild(passFailRow);

    // Append the header and body to the table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append the table to the 'all-courses' div
    allCoursesDiv.appendChild(table);

    // Add the 'active' class to the 'all-courses' div
    allCoursesDiv.classList.add("active");
  }

  calculateMeanScore(passFailCounts10, passFailCounts7, scale) {
    // Calculate the mean score based on pass/fail counts and the specified scale
    const totalStudents =
      passFailCounts10.pass_10 +
      passFailCounts10.fail_10 +
      passFailCounts7.pass_7 +
      passFailCounts7.fail_7;

    const totalScore =
      passFailCounts10.pass_10 * 10 + passFailCounts7.pass_7 * 7;
    const meanScore = (totalScore / totalStudents) * (scale / 10);

    return meanScore.toFixed(2); // Assuming you want to display the mean score with two decimal places
  }

  calculatePassFailCounts(courseId, scale) {
    const passFailCounts = { pass_10: 0, fail_10: 0, pass_7: 0, fail_7: 0 };

    const course = this.courses.find((c) => c.id === courseId);

    if (!course) {
      console.error(`Course with ID ${courseId} not found.`);
      return passFailCounts;
    }

    // Iterate through student IDs to calculate pass/fail counts
    course.student_ids.forEach((studentId) => {
      // Create a new StudentManager instance
      const student = new StudentManager(this.students, this.courses);

      // Calculate weighted average for the student in the given course
      const average = parseInt(
        student.calculateWeightedAverage(courseId, studentId)
      );

      // Calculate letter grade based on the given scale
      const grade = this.calculateLetterGrade(average, scale);

      // Update pass/fail counts based on the calculated grade
      if (scale === 10) {
        passFailCounts[grade === "F" ? "fail_10" : "pass_10"]++;
      } else if (scale === 7) {
        passFailCounts[grade === "F" ? "fail_7" : "pass_7"]++;
      }
    });

    return passFailCounts;
  }
}
