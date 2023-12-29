const courseManager = new CourseManager(COURSES, STUDENTS);
const studentManager = new StudentManager(STUDENTS, COURSES);

var coursesButton = document.getElementById("coursesButton");
var studentsButton = document.getElementById("studentsButton");

function handleCoursesButtonClick() {
  var screenSection = document.getElementById("screen");

  // Create a div to hold the active courses page content
  var coursesActiveDiv = document.createElement("div");
  coursesActiveDiv.className = "courses-active";

  // Set the inner HTML for the coursesActiveDiv with various course-related options
  coursesActiveDiv.innerHTML = `
            <div class="coursespage-options">
                <!-- Course Selection Options -->
                <div class="course-options">
                    <h2>Course Selection</h2>
                    <label for="courseSelect">Course:</label>
                    <select class="courseSelect" id="deletecourseopt"></select>
                    <div class="courses-btns">
                        <button id="courseanalysis-btn">Get Analysis</button>
                        <button id="coursedeletecourse-btn">Delete Course</button>
                    </div>

                    <!-- Analysis Options -->
                    <h2>Get Grades</h2>
                    <label for="courseSelect">Course:</label>
                    <select class="courseSelect" id="courseanalysis"></select>
                    <div class="courses-btns">
                        <button id="scale10-btn">10 Pt Scale</button>
                        <button id="scale7-btn">7 Pt Scale</button>
                    </div>
                    <br>
                </div>

                <!-- Add Course Options -->
                <div class="course-options">
                    <h2>Add Course</h2>
                    <label for="courseName">Course Name:</label>
                    <input type="text" id="courseName" placeholder="Enter Course name">
                    <label for="instructorName">Instructor Name:</label>
                    <input type="text" id="instructorName" placeholder="Enter Instructor name">
                    <div class="courses-btns">
                        <button id="courseaddcourse-btn">Add Course</button>
                    </div>
                </div>
            
                <!-- Delete Student Options -->
                <div class="student-options">
                    <h2>Delete Student from Course</h2>
                    <label for="courseSelect">Select Course:</label>
                    <select class="courseSelect" id="coursetodeletestu"></select>
                    <label for="studentId">Student ID:</label>
                    <input type="text" id="studentId" placeholder="Enter student ID">
                    <div class="courses-btns">
                        <button id="coursedeletestudent-btn">Delete Student</button>
                    </div>
                </div>
                <br>
            </div>
            
            <!-- Container for displaying course-related information -->
            <div class="all-courses"></div>
    `;

  // Clear the screen section and append the coursesActiveDiv
  screenSection.innerHTML = "";
  screenSection.appendChild(coursesActiveDiv);

  // Populate the course dropdown and create the initial course table
  courseManager.populateCourseDropdown();
  courseManager.createCourseTable();

  // Event handling for various buttons
  var buttons = document.querySelectorAll(".coursespage-options button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.id === "courseanalysis-btn") {
        // Handle Get Analysis button click
        var selectedValue = parseInt(document.getElementById("deletecourseopt").value);
        courseManager.createPassFailTable(selectedValue);
        console.log("Analysis button clicked");

      } else if (button.id === "courseaddcourse-btn") {
        // Handle Add Course button click
        var courseName = document.getElementById("courseName").value;
        var instructorName = document.getElementById("instructorName").value;
        courseManager.addCourse(courseName, instructorName);
        console.log("Course added:", courseName, instructorName);

      } else if (button.id === "coursedeletestudent-btn") {
        // Handle Delete Student button click
        var selectedValue = parseInt(document.getElementById("coursetodeletestu").value);
        var studentId = parseInt(document.getElementById("studentId").value);
        courseManager.deleteStudentFromCourse(selectedValue, studentId);

      } else if (button.id === "coursedeletecourse-btn") {
        // Handle Delete Course button click
        var selectedValue = parseInt(document.getElementById("deletecourseopt").value);
        courseManager.deleteCourseById(selectedValue);
        console.log(selectedValue);

      } else if (button.id === "scale10-btn") {
        // Handle 10 Pt Scale button click
        var selectedCourse = parseInt(document.getElementById("courseanalysis").value);
        courseManager.calculateLetterGradesForCourse(selectedCourse, 10);
        console.log("Scale 10 button clicked for course:", selectedCourse);

      } else if (button.id === "scale7-btn") {
        // Handle 7 Pt Scale button click
        var selectedCourse = parseInt(document.getElementById("courseanalysis").value);
        courseManager.calculateLetterGradesForCourse(selectedCourse, 7);
        console.log("Scale 7 button clicked for course:", selectedCourse);
      }
      // Add more conditions as needed based on your buttons
    });
  });
}

// Add an event listener for the Courses button
coursesButton.addEventListener("click", handleCoursesButtonClick);


function handleStudentsButtonClick() {
    // Get the screen section element
    var screenSection = document.getElementById("screen");
  
    // Create a div to hold the active students page content
    var studentsActiveDiv = document.createElement("div");
    studentsActiveDiv.className = "students-active";
  
    // Set the inner HTML for the studentsActiveDiv with various student-related options
    studentsActiveDiv.innerHTML = `
              <div class="studentspage-options">
                  <!-- Add Student Options -->
                  <div class="student-options">
                      <h2>Add Student</h2>
                      <label for="studentNametoadd">Name:</label>
                      <input type="text" id="studentNametoadd" placeholder="Enter Student name">
                      <label for="gender">Gender:</label>
                      <input type="text" id="gender" placeholder="Male/Female">
                      <div class="students-btns">
                          <button id="addStudent-btn">Add Student</button>
                      </div>
                      <br>
                  </div>
  
                  <!-- Add Student to Course Options -->
                  <div class="student-options">
                      <h2>Add Student to Course</h2>
                      <label for="courseSelect">Course:</label>
                      <select class="courseSelect" id="coursetoaddstudent"></select>
                      <label for="studentIDtoAddwithScores">ID:</label>
                      <input type="text" id="studentIDtoAddwithScores" placeholder="Enter student name">
                      <label for="midtermScore">Midterm Score:</label>
                      <input type="number" id="midtermScore" placeholder="Enter midterm score">
                      <label for="finalScore">Final Score:</label>
                      <input type="number" id="finalScore" placeholder="Enter final score">
                      <div class="courses-btns">
                          <button id="courseaddstudent-btn">Add/Update Student</button>
                      </div>
                      <br>
                  </div>
  
                  <!-- Enroll Student in Course Options -->
                  <div class="student-options">
                      <h2>Enroll Student in Course</h2>
                      <label for="studentID">ID:</label>
                      <input type="text" id="studentID" placeholder="Enter Student ID">
                      <label for="studentNametoGetandDelete">Name:</label>
                      <input type="text" id="studentNametoGetandDelete" placeholder="Enter Student name">
                      <div class="students-btns">
                          <button id="deleteStudent-btn">Delete Student</button>
                          <button id="getCourses-btn">Get Courses</button>
                      </div>
                      <br>
                  </div>
              </div> 
  
              <!-- Container for displaying student-related information -->
              <div class="all-students"></div>
      `;
  
    // Clear the screen section and append the studentsActiveDiv
    screenSection.innerHTML = "";
    screenSection.appendChild(studentsActiveDiv);
  
    // Create the initial student table and populate the course dropdown
    studentManager.createStudentTable();
    courseManager.populateCourseDropdown();
    //studentManager.getStudentCoursesAndGPATable(39,"Student39");
    //studentManager.deleteStudent(9,"Student9");
  
    // Event handling for various buttons
    var addStudentButton = document.getElementById("addStudent-btn");
    var deleteStudentButton = document.getElementById("deleteStudent-btn");
    var getStudentCoursesButton = document.getElementById("getCourses-btn");
    var addStudentwithScores = document.getElementById("courseaddstudent-btn");
  
    addStudentButton.addEventListener("click", function () {
      // Handle Add Student button click
      var studentNametoAdd = document.getElementById("studentNametoadd").value;
      var gender = document.getElementById("gender").value;
      studentManager.addStudent(studentNametoAdd, gender);
      console.log("Add Student button clicked");
    });
  
    deleteStudentButton.addEventListener("click", function () {
      // Handle Delete Student button click
      var studentId = parseInt(document.getElementById("studentID").value);
      var studentNametoDelete = document.getElementById("studentNametoGetandDelete").value;
      console.log(studentId, studentNametoDelete);
      studentManager.deleteStudent(studentId, studentNametoDelete);
      console.log("Delete Student button clicked");
    });
  
    getStudentCoursesButton.addEventListener("click", function () {
      // Handle Get Courses button click
      var studentId = parseInt(document.getElementById("studentID").value);
      var studentNametoGet = document.getElementById("studentNametoGetandDelete").value;
      console.log(studentId, studentNametoGet);
      studentManager.getStudentCoursesAndGPATable(studentId, studentNametoGet);
      console.log("Get Courses button clicked");
    });
  
    addStudentwithScores.addEventListener("click", function () {
      // Handle Add/Update Student button click with scores
      var courseId = parseInt(document.getElementById("coursetoaddstudent").value);
      var studentName = parseInt(document.getElementById("studentIDtoAddwithScores").value);
      var midtermScore = parseInt(document.getElementById("midtermScore").value);
      var finalScore = parseInt(document.getElementById("finalScore").value);
  
      if (!courseId || !studentName || isNaN(midtermScore) || isNaN(finalScore)) {
        alert("Please enter valid values for all fields.");
        return;
      }
      console.log(courseId, studentName, midtermScore, finalScore);
      studentManager.addOrUpdateCourseToStudent(courseId, studentName, midtermScore, finalScore);
    });
  }
  
  // Add an event listener for the Students button
  studentsButton.addEventListener("click", handleStudentsButtonClick);
  