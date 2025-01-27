# Protasker - Task Manager Application

Protasker is a feature-rich task management application designed to help you organize and track your tasks efficiently. With an intuitive interface, it allows you to create, edit, filter, and sort your tasks based on various criteria. 

## Features

### 1. **Dark Mode**
   - Toggle between light and dark mode to suit your preferences for better user experience and visibility.

### 2. **Task Filter**
   - Filter your tasks based on their status: **Completed**, **Pending**, or **Overdue**.

### 3. **Date Highlighting**
   - Dates are automatically highlighted based on how close they are to today, helping you keep track of upcoming deadlines.

### 4. **Inspirational Quote**
   - A random inspirational quote is displayed each time you refresh the page, providing motivation as you go through your tasks.

### 5. **Task Editing & Deletion**
   - Edit your tasks anytime to update their details like title, description, due date, category, and priority.
   - Delete tasks you no longer need with a simple click.

### 6. **Checkbox Functionality**
   - Mark tasks as completed by clicking on a checkbox, and visually track your progress.

### 7. **Sorting**
   - Sort tasks by **Category**, **Priority**, or **Due Date** to quickly organize them according to your needs.

### 8. **Show Task Description**
   - Reveal or hide the description of each task with a **Show Description** button, allowing for more compact task views.

### 9. **Dynamic Progress Bar**
   - The progress bar dynamically updates as you mark tasks as completed with the checkbox.

### 10. **Local Storage**
   - Your tasks are saved in **Local Storage**, so your tasks persist across page refreshes, ensuring they stay with you.

---

## How to Use

1. **Task Creation**: 
   - Fill in the fields like *Title*, *Category*, *Priority*, *Due Date*, and *Description*.
   - Select the category and priority from the dropdowns, then click the **Create** button to add a task.

2. **Mark Tasks as Completed**:
   - Click the checkbox next to a task to mark it as completed. The progress bar will update dynamically.

3. **Edit Tasks**:
   - Click on a task to edit its details, including title, description, due date, category, and priority.
   - Save changes by clicking the **Done** button.

4. **Delete Tasks**:
   - Delete tasks you no longer need by using the delete option in the task edit menu.

5. **Filter and Sort**:
   - Use the **Filter** and **Sort** options to organize tasks based on their status or priority.
   - The filter includes options for **Completed**, **Pending**, or **Overdue** tasks, while you can sort tasks by **Category**, **Priority**, or **Due Date**.

6. **Toggle Dark Mode**:
   - Switch between light and dark mode for a personalized interface.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/protasker.git
   ```

2. **Open the index.html file** in your browser.

---

## Technologies Used

- **HTML5**: Markup language for building the structure of the page.
- **CSS3**: Styling the page, including dark mode and other UI elements.
- **JavaScript**: Handling interactivity, such as adding, editing, deleting tasks, managing local storage, and toggling dark mode.
- **Local Storage**: Saving tasks in the browser's local storage to ensure they persist across page reloads.

---

## Challenges

1. **Making the edit functionality work** - The edit functionality was a tricky one as I was first putting it inside the createTasks() function and that was adding multiple event listeners which made the website work in weird and unexpected ways

2. **Sorting the tasks** - Sorting the tasks without mutating the original array was a problem for me as I had to make sure the taskList array's indexes did not change as that would affect all other functionalities. I solved this by creating a new array and making the renderTasks() and saveToLocalStorage() functions take arrays as parameters instead of using the global variable taskList inside them.

---

## License

Made By Anushka Krishan-IIT Indore 2025

---
