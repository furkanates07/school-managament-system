class StudentManager {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }

  createStudentTable() {
    const allStudentsDiv = document.querySelector(".all-students");

    // Clear the content of the 'all-courses' div before appending the table
    allStudentsDiv.innerHTML = "";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create table header
    const headerRow = document.createElement("tr");
    ["ID", "Name", "Gender", "Courses", "Overall GPA"].forEach((headerText) => {
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(headerText));
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table body
    this.students.forEach((student) => {
      const row = document.createElement("tr");

      // Add data cells
      ["id", "name", "gender"].forEach((key) => {
        const cell = document.createElement("td");
        cell.appendChild(document.createTextNode(student[key]));
        row.appendChild(cell);
      });

      // Add courses cell
      const coursesCell = document.createElement("td");
      const coursesList = document.createElement("ul");

      student.courses.forEach((course) => {
        const courseInfo = this.courses.find((c) => c.id === course.course_id);
        if (courseInfo) {
          const courseItem = document.createElement("li");
          courseItem.appendChild(
            document.createTextNode(
              `${courseInfo.course_name}, Midterm Score: ${course.midterm_score}, Final Score: ${course.final_score}`
            )
          );
          coursesList.appendChild(courseItem);
        }
      });

      coursesCell.appendChild(coursesList);
      row.appendChild(coursesCell);

      // Calculate Overall GPA
      const overallGPACell = document.createElement("td");
      overallGPACell.appendChild(
        document.createTextNode(this.calculateOverallGPA(student.courses))
      );
      row.appendChild(overallGPACell);

      tbody.appendChild(row);
    });

    // Append the header and body to the table
    table.appendChild(thead);
    table.appendChild(tbody);

    // Append the table to the 'screen' section
    allStudentsDiv.appendChild(table);

    // Add the 'active' class to the 'all-courses' div
    allStudentsDiv.classList.add("active");
  }

  calculateOverallGPA(courses) {
    const totalCourses = courses.length;
    let totalWeightedPoints = 0;
    let totalWeight = 0;

    courses.forEach((course) => {
      const courseInfo = this.courses.find((c) => c.id === course.course_id);

      if (courseInfo) {
        // Assuming midterm contributes 40% and final contributes 60%
        const weightedMidterm = (course.midterm_score / 100) * 0.4 * 4.0; // Map percentage to GPA
        const weightedFinal = (course.final_score / 100) * 0.6 * 4.0; // Map percentage to GPA

        totalWeightedPoints += weightedMidterm + weightedFinal;
        totalWeight += 1; // Assuming equal weight for each course
      }
    });

    if (totalWeight === 0) {
      return "N/A"; // To avoid division by zero if no valid courses
    }

    const overallGPA = totalWeightedPoints / totalWeight;

    // Round the GPA to two decimal places
    return overallGPA.toFixed(2);
  }

  createStudentID(){
    const studentId = this.students.length + Math.floor(Math.random() * 500);

    if (this.students.find((s) => s.id === studentId)) {
      // If the ID already exists, recursively call the function again
      return this.createStudentID();
    }

    return studentId;
  }

  addStudent(name, gender) {
    // Validate inputs
    if (!name || !gender) {
      alert("Please enter both student name and gender.");
      return;
    }
  
    // Validate gender
    if (gender !== "Male" && gender !== "Female") {
      alert("Invalid gender. Please enter either 'Male' or 'Female'.");
      return;
    }
  
    // Generate a unique ID for the new student
    const newStudentId = this.createStudentID();
  
    // Create a new student object
    const newStudent = {
      id: newStudentId,
      name: name,
      gender: gender,
      courses: [], // Initialize with an empty array of courses
    };
  
    // Add the new student to the array
    this.students.push(newStudent);
    console.log(`Student with Name ${name} added successfully.`);
  
    // Update the displayed table with the new student
    this.createStudentTable();
  }
  

  deleteStudent(id, name) {
    // Find the index of the student by ID and name
    const index = this.students.findIndex(
      (student) => student.id === id && student.name === name
    );
  
    if (index !== -1) {
      // Remove the student from the array
      this.students.splice(index, 1);
      console.log(
        `Student with ID ${id} and name "${name}" deleted successfully.`
      );
    } else {
      // Display an alert if the student is not found
      console.error(`Student with ID ${id} and name "${name}" not found.`);
      alert(`Student with ID ${id} and name "${name}" not found.`);
      return;
    }
  
    // Update the displayed table after deleting the student
    this.createStudentTable();
  }

  deleteCourseFromStudent(studentID, courseID) {
    // Find the student by ID
    const student = this.students.find((s) => s.id === studentID);

    if (!student) {
      console.error(`Student with ID ${studentID} not found.`);
      alert(`Student with ID ${studentID} not found.`);
      return;
    }

    // Check if the student is enrolled in the specified course
    const courseIndex = student.courses.findIndex((course) => course.course_id === courseID);

    if (courseIndex !== -1) {
      // Remove the course from the student's courses array
      student.courses.splice(courseIndex, 1);
      console.log(`Course with ID ${courseID} deleted successfully for Student ${studentID}.`);
    } else {
      console.error(`Student with ID ${studentID} is not enrolled in Course ${courseID}.`);
      alert(`Student with ID ${studentID} is not enrolled in Course ${courseID}.`);
    }

    // Update the displayed table after deleting the course
    this.createStudentTable();
  }

  getStudentCoursesAndGPATable(id, name) {
    // Find the student by ID and name
    const student = this.students.find(
      (s) => s.id === id && s.name === name
    );
  
    if (!student) {
      // Display an alert if the student is not found
      console.error(`Student with ID ${id} and name "${name}" not found.`);
      alert(`Student with ID ${id} and name "${name}" not found.`);
      return;
    }
  
    // Clear the content of the 'all-students' div before appending the new table
    const allStudentsDiv = document.querySelector(".all-students");
    allStudentsDiv.innerHTML = "";
  
    // Create a new table for the student's courses and GPA
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
  
    // Create table header
    const headerRow = document.createElement("tr");
    [
      "Course ID",
      "Course Name",
      "Midterm Score",
      "Final Score",
      "GPA (40% Midterm, 60% Final)",
    ].forEach((headerText) => {
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(headerText));
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
  
    // Create table body
    student.courses.forEach((course) => {
      const row = document.createElement("tr");
  
      // Add course ID cell
      const courseIDCell = document.createElement("td");
      courseIDCell.appendChild(document.createTextNode(course.course_id));
      row.appendChild(courseIDCell);
  
      // Add course name cell
      const courseInfo = this.courses.find((c) => c.id === course.course_id);
      const courseNameCell = document.createElement("td");
      courseNameCell.appendChild(
        document.createTextNode(courseInfo ? courseInfo.course_name : "N/A")
      );
      row.appendChild(courseNameCell);
  
      // Add midterm score cell
      const midtermScoreCell = document.createElement("td");
      midtermScoreCell.appendChild(document.createTextNode(course.midterm_score));
      row.appendChild(midtermScoreCell);
  
      // Add final score cell
      const finalScoreCell = document.createElement("td");
      finalScoreCell.appendChild(document.createTextNode(course.final_score));
      row.appendChild(finalScoreCell);
  
      // Calculate GPA based on 40% Midterm and 60% Final
      const weightedMidterm = course.midterm_score * 0.4; // Map percentage to GPA
      const weightedFinal = course.final_score * 0.6; // Map percentage to GPA
      const overallGPA = (weightedMidterm + weightedFinal).toFixed(2);
  
      // Add GPA cell
      const gpaCell = document.createElement("td");
      gpaCell.appendChild(document.createTextNode(overallGPA));
      row.appendChild(gpaCell);
  
      tbody.appendChild(row);
    });
  
    // Append the header and body to the table
    table.appendChild(thead);
    table.appendChild(tbody);
  
    // Append the table to the 'all-students' div
    allStudentsDiv.appendChild(table);
  
    // Add the 'active' class to the 'all-students' div
    allStudentsDiv.classList.add("active");
  }
  

  addOrUpdateCourseToStudent(courseId, studentId, midtermScore, finalScore) {
    // Find the student by ID
    const student = this.students.find((s) => s.id === studentId);
  
    if (!student) {
      console.error(`Student with ID "${studentId}" not found.`);
      alert(`Student with ID "${studentId}" not found.`);
      return;
    }
  
    // Check if the course ID exists in the courses array
    const courseInfo = this.courses.find((c) => c.id === courseId);
  
    if (!courseInfo) {
      console.error(`Course with ID ${courseId} not found.`);
      alert(`Course with ID ${courseId} not found.`);
      return;
    }

    const course = new CourseManager(this.courses, this.students);
    course.addStudenttoCourse(courseId, studentId);
  
    // Check if midterm and final scores are valid
    if (midtermScore > 100 || finalScore > 100 || midtermScore < 0 || finalScore < 0) {
      alert("Midterm and final scores must be between 0 and 100.");
      return;
    }
  
    // Check if the student is already enrolled in the course
    const enrolledCourseIndex = student.courses.findIndex((course) => course.course_id === courseId);
  
    if (enrolledCourseIndex !== -1) {
      // If the student is already enrolled, update the existing course
      student.courses[enrolledCourseIndex].midterm_score = midtermScore;
      student.courses[enrolledCourseIndex].final_score = finalScore;
      console.log(`Course information updated for Student ${studentId} in Course ${courseId}.`);
    } else {
      // If not enrolled, add the new course to the student's courses array
      const newCourse = {
        course_id: courseId,
        midterm_score: midtermScore,
        final_score: finalScore,
      };
  
      student.courses.push(newCourse);
      console.log(`Student ${studentId} enrolled in Course ${courseId} successfully.`);
    }
  
    // Update the displayed table with the new/updated course information
    this.createStudentTable();
  }

calculateWeightedAverage(courseId, studentId) {
  // Find the student by ID
  const student = this.students.find((s) => s.id === studentId);

  if (!student) {
    console.error(`Student with ID ${studentId} not found.`);
    return null;
  }

  // Find the course within the student's courses
  const course = student.courses.find((c) => c.course_id === courseId);

  if (!course) {
    console.error(`Course with ID ${courseId} not found for Student ${student.name}.`);
    return null;
  }

  // Assuming midterm contributes 40% and final contributes 60%
  const weightedMidterm = (course.midterm_score / 100) * 0.4;
  const weightedFinal = (course.final_score / 100) * 0.6;

  // Calculate the weighted average
  const weightedAverage = (weightedMidterm + weightedFinal) * 100; // Multiply by 100 to get percentage

  return weightedAverage.toFixed(2);
}

}