"use strict";

class Task {
  constructor(title, desc, priority, category, duedate, completed) {
    this.title = title;
    this.desc = desc;
    this.priority = priority;
    this.category = category;
    this.duedate = duedate;
    this.completed = completed;
  }
}



function saveTasksToLocalStorage(taskList) {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("taskList");
  if (storedTasks) {
    taskList = JSON.parse(storedTasks);
  }
}

const taskDisplay = document.querySelector(".task-display");

function renderTasks(taskList) {
  taskDisplay.innerHTML = ""; 
  taskList.forEach((task, index) => {
    const taskEmoji =
      task.category === "Work"
        ? '<svg xmlns="http://www.w3.org/2000/svg"                 width="32"  height="32"   fill="#333333"   viewBox="0 0 256 256"> <path d="M224,48H32A16,16,0,0,0,16,64V88a16,16,0,0,0,16,16v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V104a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM208,192H48V104H208ZM224,88H32V64H224V88ZM96,136a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,136Z"></path> </svg>'
        : task.category === "Personal"
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#333333" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#333333" viewBox="0 0 256 256"><path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24ZM120,40h48v72L148.79,97.6a8,8,0,0,0-9.6,0L120,112Zm80,144H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40h32v88a8,8,0,0,0,12.8,6.4L144,114l27.21,20.4A8,8,0,0,0,176,136a8,8,0,0,0,8-8V40h16Z"></path></svg>';

    const taskColor =
      task.category === "Work"
        ? "#feb896"
        : task.category === "Personal"
        ? "#ffadb9"
        : "#58d0e8";
    const checkboxClass = task.completed
      ? "task-checkbox completed"
      : "task-checkbox incomplete";
    
      const taskDate = new Date(task.duedate)
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      let urgency = '';
      if (((taskDate-currentDate) / (1000 * 60 * 60 * 24))<3){
        urgency = 'urgent-task';
      }
      else if (((taskDate-currentDate) / (1000 * 60 * 60 * 24))<5){
        urgency = 'semi-urgent-task';
      }
      else {
        urgency = 'non-urgent-task';
      }
    const taskHtml = `
      <div class="task task-${
        index + 1
      }" style="background-color: ${taskColor}">
        <p class="category-emoji">${taskEmoji}</p>
        <p class="task-title">${task.title}</p>
        <p class="task-priority">${task.priority}</p>
        <p class="task-duedate ${urgency}">${task.duedate}</p>
        <div class="task-desc hidden">${task.desc}</div>
        <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="#333333"
              viewBox="0 0 256 256"
              class="${checkboxClass} cursor-hover"
            >
              <path
                d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
              ></path>
            </svg>
            <svg class='task-edit cursor-hover' xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#333333" viewBox="0 0 256 256"><path d="M201.54,54.46A104,104,0,0,0,54.46,201.54,104,104,0,0,0,201.54,54.46ZM88,192a16,16,0,0,1,32,0v23.59a88,88,0,0,1-32-9.22Zm48,0a16,16,0,0,1,32,0v14.37a88,88,0,0,1-32,9.22Zm-28.73-56h41.46l11.58,25.1A31.93,31.93,0,0,0,128,170.87a31.93,31.93,0,0,0-32.31-9.77Zm7.39-16L128,91.09,141.34,120Zm75.56,70.23c-2,2-4.08,3.87-6.22,5.64V176a7.91,7.91,0,0,0-.74-3.35l-48-104a8,8,0,0,0-14.52,0l-48,104A7.91,7.91,0,0,0,72,176v19.87c-2.14-1.77-4.22-3.64-6.22-5.64a88,88,0,1,1,124.44,0Z"></path></svg>
         <svg class='task-show-desc cursor-hover' xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#333333" viewBox="0 0 256 256"><path d="M201.54,54.46A104,104,0,0,0,54.46,201.54,104,104,0,0,0,201.54,54.46ZM190.23,190.23a88,88,0,1,1,0-124.46A88.11,88.11,0,0,1,190.23,190.23ZM165.66,82.34a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L128,108.69l26.34-26.35A8,8,0,0,1,165.66,82.34Zm0,56a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L128,164.69l26.34-26.35A8,8,0,0,1,165.66,138.34Z"></path></svg>
         <svg class='task-delete-btn cursor-hover' xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#333333" viewBox="0 0 256 256"><path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
            </div>
    `;
    taskDisplay.insertAdjacentHTML("beforeend", taskHtml);
  });
}

let taskList = [];
loadTasksFromLocalStorage();
renderTasks(taskList);

const topQuote = document.querySelector(".top-quote");
const editPopUp = document.querySelector(".section-edit-window");
const editPopUpOL = document.querySelector(".section-edit-overlay");
const createTask = document.querySelector(".create-btn");
const categoryMenu = document.querySelector(".category-menu");
const priorityMenu = document.querySelector(".priority-menu");
const progressBar = document.querySelector(".progress-done");

let taskDesc = document.querySelector(".choose-desc");
let taskPriority = document.querySelector(".choose-priority");
let taskTitle = document.querySelector(".choose-title");
let taskDate = document.querySelector(".choose-date");
let taskCategory = document.querySelector(".choose-category");
let pLi = [
  document.querySelector(".pli-1"),
  document.querySelector(".pli-2"),
  document.querySelector(".pli-3"),
];
let cLi = [
  document.querySelector(".cli-1"),
  document.querySelector(".cli-2"),
  document.querySelector(".cli-3"),
];
let categoryText = document.querySelector(".category-text");
let priorityText = document.querySelector(".priority-text");

function updateProgressBar() {
  let x = 0;
  for (let task of taskList) {
    if (task.completed === true) x++;
  }
  progressBar.style.width = `${(100 * x) / taskList.length}%`;
}

function toggleEditPopup() {
  editPopUp.classList.toggle("hidden");
  editPopUpOL.classList.toggle("hidden");
}

//TOGGLING THE DROPDOWN MENU FOR CATEGORY
taskCategory.addEventListener("click", function () {
  if (categoryMenu.classList.contains("hidden")) {
    categoryMenu.classList.remove("hidden");
  } else {
    categoryMenu.classList.add("hidden");
  }
  cLi.forEach(function (el) {
    el.addEventListener("click", function () {
      categoryText.textContent = el.textContent;
      document.querySelector(".category-icon").classList.add("hidden");
    });
  });
});

// TOGGLING THE DROPDOWN MENU FOR PRIORITY
taskPriority.addEventListener("click", function () {
  if (priorityMenu.classList.contains("hidden")) {
    priorityMenu.classList.remove("hidden");
  } else {
    priorityMenu.classList.add("hidden");
  }
  pLi.forEach(function (el) {
    el.addEventListener("click", function () {
      priorityText.textContent = el.textContent;
      document.querySelector(".priority-icon").classList.add("hidden");
    });
  });
});

//CREATING A NEW TASK
createTask.addEventListener("click", function () {
if (!taskTitle.value||!taskDesc.value||!priorityText.textContent||!categoryText.textContent||!taskDate.value) {
  alert("FILL ALL FIELDS TO CREATE A TASK!");
}
else{
  let currentTask = new Task(
    taskTitle.value,
    taskDesc.value,
    priorityText.textContent,
    categoryText.textContent,
    taskDate.value,
    false
  );

  //COLOR-CODING THE TASKS ACCORDING TO THEIR CATEGORIES
  let taskColor, taskEmoji;
  if (currentTask.category === "Work") {
    taskColor = "#feb896";
    taskEmoji =
      '<svg xmlns="http://www.w3.org/2000/svg"                 width="32"  height="32"   fill="#333333"   viewBox="0 0 256 256"> <path d="M224,48H32A16,16,0,0,0,16,64V88a16,16,0,0,0,16,16v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V104a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM208,192H48V104H208ZM224,88H32V64H224V88ZM96,136a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,136Z"></path> </svg>';
  } else if (currentTask.category === "Personal") {
    taskColor = "#ffadb9";
    taskEmoji =
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>';
  } else {
    taskColor = "#58d0e8";
    taskEmoji =
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24ZM120,40h48v72L148.79,97.6a8,8,0,0,0-9.6,0L120,112Zm80,144H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40h32v88a8,8,0,0,0,12.8,6.4L144,114l27.21,20.4A8,8,0,0,0,176,136a8,8,0,0,0,8-8V40h16Z"></path></svg>';
  }

  taskList.push(currentTask); // Add task to taskList
  saveTasksToLocalStorage(taskList); // Save updated list to local storage
  renderTasks(taskList); // Render tasks
  document.querySelector(`.task-${taskList.length}`).style.backgroundColor =
    taskColor;
  categoryText.textContent = "Category";
  document.querySelector(".category-icon").classList.remove("hidden");
  priorityText.textContent = "Priority";
  document.querySelector(".priority-icon").classList.remove("hidden");
}
});

taskDisplay.addEventListener("click", function (event) {
  //CHECKBOX BUTTON FUNCTIONALITY
  if (event.target.closest(".task-checkbox")) {
    const checkbox = event.target;

    const taskIndex = Array.from(taskDisplay.children).indexOf(
      checkbox.parentElement
    );

    if (checkbox.classList.contains("completed")) {
      taskList[taskIndex].completed = false;
      checkbox.classList.remove("completed");
      checkbox.classList.add("incomplete");
    } else {
      taskList[taskIndex].completed = true;
      checkbox.classList.remove("incomplete");
      checkbox.classList.add("completed");
    }
    saveTasksToLocalStorage(taskList);
    updateProgressBar();
  }
  //DELETE BUTTON FUNCTIONALITY
  else if (event.target.classList.contains("task-delete-btn")) {
    const taskElement = event.target;

    const taskIndex = Array.from(taskDisplay.children).indexOf(
      taskElement.parentElement
    );

  
    taskList.splice(taskIndex, 1);
    taskElement.parentElement.remove();
    reindexTasks(taskList, Array.from(taskDisplay.children));
    saveTasksToLocalStorage(taskList);
    renderTasks(taskList);
  
  }
  //SHOW DESCRIPTION FUNCTIONALITY
  else if (event.target.closest(".task-show-desc")) {
    const taskElement = event.target;
    const taskIndex = Array.from(taskDisplay.children).indexOf(
      taskElement.parentElement
    );
  
    document
      .querySelector(`.task-${taskIndex + 1} .task-desc`)
      .classList.toggle("hidden");
  }
  //EDIT BUTTON FUNCTIONALITY

  if (event.target.closest(".task-edit")) {
    const taskElement = event.target.closest(".task");
   
    const taskIndex = Array.from(taskDisplay.children).indexOf(
      taskElement.closest(".task")
    );

     // Show the edit popup
    const editPopup = document.querySelector(".section-edit-window");
    const overlay = document.querySelector(".section-edit-overlay");
    editPopup.classList.remove("hidden");
    overlay.classList.remove("hidden");

    // Put current values in edit fields
    document.querySelector(".title-edit").value = taskList[taskIndex].title;
    document.querySelector(".desc-edit").value = taskList[taskIndex].desc;
        document.querySelector(".category-edit").value = taskList[taskIndex].category;
    document.querySelector(".priority-edit").value = taskList[taskIndex].priority;

    // Handle the 'Done' button functionality
    document.querySelector(".edit-done-btn").onclick = function () {
      // Collect edited values
      const updatedTitle = document.querySelector(".title-edit").value;
      const updatedDesc = document.querySelector(".desc-edit").value;
      const updatedDate = document.querySelector(".date-edit").value;
      const updatedCategory = document.querySelector(".category-edit").value;
      const updatedPriority = document.querySelector(".priority-edit").value;

      // Update the task element with new values
      taskList[taskIndex].title = updatedTitle;
      taskList[taskIndex].desc = updatedDesc;
      if(updatedDate) {taskList[taskIndex].duedate = updatedDate;}
      taskList[taskIndex].category = updatedCategory;
      taskList[taskIndex].priority = updatedPriority;
      saveTasksToLocalStorage(taskList);
      renderTasks(taskList);
      // Close the edit popup
      editPopup.classList.add("hidden");
      overlay.classList.add("hidden");
    };

    // Handle closing the popup when clicking outside or on close button
    document.querySelector(".close-popup").onclick = function () {
      editPopup.classList.add("hidden");
      overlay.classList.add("hidden");
    };
    overlay.onclick = function () {
      editPopup.classList.add("hidden");
      overlay.classList.add("hidden");
    };
  }


});

function reindexTasks(list, taskElements) {
  taskElements.forEach((taskElement, index) => {
    if (index < list.length) {
      const task = list[index];
      taskElement.querySelector(".task-title").textContent = task.title;
      taskElement.querySelector(".task-desc").textContent = task.desc;
      taskElement.querySelector(".task-duedate").textContent = task.duedate;
      let newEmoji, newColor;
      if (task.category === "Work") {
        newColor = "#feb896";
        newEmoji =
          '<svg xmlns="http://www.w3.org/2000/svg"                 width="32"  height="32"   fill="#333333"   viewBox="0 0 256 256"> <path d="M224,48H32A16,16,0,0,0,16,64V88a16,16,0,0,0,16,16v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V104a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM208,192H48V104H208ZM224,88H32V64H224V88ZM96,136a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,136Z"></path> </svg>';
      } else if (task.category === "Personal") {
        newColor = "#ffadb9";
        newEmoji =
          '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#333333" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>';
      } else {
        newColor = "#58d0e8";
        newEmoji =
          '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#333333" viewBox="0 0 256 256"><path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24ZM120,40h48v72L148.79,97.6a8,8,0,0,0-9.6,0L120,112Zm80,144H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40h32v88a8,8,0,0,0,12.8,6.4L144,114l27.21,20.4A8,8,0,0,0,176,136a8,8,0,0,0,8-8V40h16Z"></path></svg>';
      }
      taskElement.querySelector(".category-emoji").innerHTML = newEmoji;
      taskElement.style.backgroundColor = newColor;
      taskElement.querySelector(".task-priority").textContent = task.priority;
      taskElement.className = `task task-${index + 1}`;
    }
  });
}

const sortMenu = document.querySelector(".sort-menu");

sortMenu.addEventListener("click", function (event) {
  if (event.target === document.querySelector(".sort-heading-1")) {
    document.querySelector(".category-sort-options").classList.toggle("hidden");
  } else if (event.target === document.querySelector(".sort-heading-2")) {
    document.querySelector(".priority-sort-options").classList.toggle("hidden");
  } else if (event.target === document.querySelector(".sort-heading-3")) {
    document.querySelector(".duedate-sort-options").classList.toggle("hidden");
  }
});

const categorySortMenu = document.querySelector(".category-sort-options");
const prioritySortMenu = document.querySelector(".priority-sort-options");
const duedateSortMenu = document.querySelector(".duedate-sort-options");

//CATEGORY SORT FUNCTIONALITY
categorySortMenu.addEventListener("click", function (event) {
 
  //SORT BY WORK CATEGORY
  if (event.target.classList.contains("category-sort-option-1")) {
    let sortedTasks = [...taskList];
   
    sortedTasks.sort(function (a, b) {
      if (a.category === "Work" && b.category != "Work") {
        return -1;
      } else if (a.category !== "Work" && b.category === "Work") {
        return 1;
      } else {
        return 0;
      }
    });
    
    renderTasks(sortedTasks);
  }
  //SORT BY PERSONAL CATEGORY
  else if (event.target.classList.contains("category-sort-option-2")) {
    let sortedTasks = [...taskList];
   
    sortedTasks.sort(function (a, b) {
      if (a.category === "Personal" && b.category != "Personal") {
        return -1;
      } else if (a.category !== "Personal" && b.category === "Personal") {
        return 1;
      } else {
        return 0;
      }
    });
    
    renderTasks(sortedTasks);
  }
  //SORT BY STUDY CATEGORY
  else if (event.target.classList.contains("category-sort-option-3")) {
    let sortedTasks = [...taskList];
   
    sortedTasks.sort(function (a, b) {
      if (a.category === "Study" && b.category != "Study") {
        return -1;
      } else if (a.category !== "Study" && b.category === "Study") {
        return 1;
      } else {
        return 0;
      }
    });
   
    renderTasks(sortedTasks);
  }
});

//PRIORITY SORT FUNCTIONALITY

prioritySortMenu.addEventListener("click", function (event) {
 
  //SORT BY LOW PRIORITY
  if (event.target.classList.contains("priority-sort-option-1")) {
    let sortedTasks = [...taskList];
   
    sortedTasks.sort(function (a, b) {
      if (a.priority === "Low" && b.priority != "Low") {
        return -1;
      } else if (a.priority !== "Low" && b.priority === "Low") {
        return 1;
      } else {
        return 0;
      }
    });
  
    renderTasks(sortedTasks);
  }
  //SORT BY MEDIUM PRIORITY
  else if (event.target.classList.contains("priority-sort-option-2")) {
    let sortedTasks = [...taskList];
  
    sortedTasks.sort(function (a, b) {
      if (a.priority === "Medium" && b.priority != "Medium") {
        return -1;
      } else if (a.priority !== "Medium" && b.priority === "Medium") {
        return 1;
      } else {
        return 0;
      }
    });
    renderTasks(sortedTasks);
  }
  //SORT BY HIGH PRIORITY
  else if (event.target.classList.contains("priority-sort-option-3")) {
    let sortedTasks = [...taskList];
       sortedTasks.sort(function (a, b) {
      if (a.priority === "High" && b.priority != "High") {
        return -1;
      } else if (a.priority !== "High" && b.priority === "High") {
        return 1;
      } else {
        return 0;
      }
    });
    renderTasks(sortedTasks);
  }
});

//DUEDATE SORT FUNCTIONALITY

duedateSortMenu.addEventListener("click", function (event) {
  //SORT BY EARLIEST DUE DATE FIRST
  if (event.target.classList.contains("duedate-sort-option-1")) {
    let sortedTasks = [...taskList];
    
    sortedTasks.sort(function (a, b) {
      if (a.duedate < b.duedate) {
        return -1;
      } else if (a.duedate > b.duedate) {
        return 1;
      } else {
        return 0;
      }
    });
        renderTasks(sortedTasks);
  }
  //SORT BY MEDIUM PRIORITY
  else if (event.target.classList.contains("duedate-sort-option-2")) {
    let sortedTasks = [...taskList];
        sortedTasks.sort(function (a, b) {
      if (a.duedate > b.duedate) {
        return -1;
      } else if (a.duedate < b.duedate) {
        return 1;
      } else {
        return 0;
      }
    });
  
    renderTasks(sortedTasks);
  }

});


//FILTER BY FUNCTIONALITY
const filterMenu = document.querySelector(".filter-menu");
filterMenu.addEventListener('click', function(event){
  let filteredTasks = [];
  
  //COMPLETED TASKS
  if (event.target.closest(".option-1")){
    filteredTasks = [...taskList];
    filteredTasks = taskList.filter(function (task) {
      return task.completed === true;
    });
    if (filteredTasks==[]) {
      document.querySelector(".nothing-here").classList.remove('hidden');
    }
    renderTasks(filteredTasks);
  }

  //PENDING TASKS
  else if (event.target.closest(".option-2")){
    filteredTasks = [...taskList];
    filteredTasks = taskList.filter(function (task) {
      return task.completed === false;
    });
    if (filteredTasks== []) {
      document.querySelector(".nothing-here").classList.remove('hidden');
    }
    renderTasks(filteredTasks);
  }

  //OVERDUE TASKS
  else if (event.target.closest(".option-3")){
    const currentDate = new Date();
    filteredTasks = [...taskList];
    filteredTasks = taskList.filter(function (task) {
      const taskDate = new Date(task.duedate);
      return (taskDate - currentDate) < 0 && task.completed === false;
    });
    if (filteredTasks==[]) {
      document.querySelector(".nothing-here").classList.remove('hidden');
    }
    renderTasks(filteredTasks);
  }
});




//INSPIRATIONAL QUOTE IN THE HEADER
const inspirationalQuotes = [
  "Dream big. Start small. Act now.",
  "Progress, not perfection.",
  "One step at a time.",
  "Every moment counts.",
  "Make it happen today.",
  "Focus. Finish. Flourish.",
  "Small steps lead to big results.",
  "Done is better than perfect.",
  "Keep moving forward.",
  "Your future starts now.",
];
const i = Math.trunc(Math.random() * 9) + 1;

topQuote.textContent = inspirationalQuotes[i];

//TOGGLE DARK MODE FUNCTIONALITY
const modeBtn = document.querySelector(".dark-mode-toggle");
modeBtn.addEventListener("click", function (event) {

  if (event.target.classList.contains("light-mode-icon")) {
    document.querySelector("body").classList.toggle("dark-mode");
  } else if (event.target.classList.contains("dark-mode-icon")) {
    document.querySelector("body").classList.toggle("dark-mode");
  }
});

window.addEventListener('scroll', function(){
  let wScroll = this.window.scrollY;

  modeBtn.style.scrollBehavior='smooth';
  modeBtn.style.bottom = `${(-1*wScroll) + 10}px`;

});
