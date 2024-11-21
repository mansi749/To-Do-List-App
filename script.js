document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todoForm");
  const todoInput = document.getElementById("todoInput");
  const todoDate = document.getElementById("todoDate");
  const todoList = document.getElementById("todoList");

  let tasks = [];

  // Add task to the list
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = todoInput.value;
    const taskDate = todoDate.value;
    const task = {
      text: taskText,
      date: taskDate,
      completed: false,
    };

    tasks.push(task);
    renderTasks();
    todoInput.value = "";
    todoDate.value = "";
  });

  // Render tasks to the UI
  function renderTasks(filter = 'All') {
    todoList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
      if (filter === 'All') return true;
      return filter === 'Completed' ? task.completed : !task.completed;
    });

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">
          ${task.text} - ${task.date}
        </span>
        <input type="checkbox" ${task.completed ? 'checked' : ''} class="markComplete">
        <button class="deleteBtn">Delete</button>
      `;
      todoList.appendChild(li);

      // Mark as completed
      li.querySelector(".markComplete").addEventListener("change", () => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
      });

      // Delete task
      li.querySelector(".deleteBtn").addEventListener("click", () => {
        tasks.splice(index, 1);
        renderTasks();
      });
    });
  }

  // Filters
  document.getElementById("filterAll").addEventListener("click", () => {
    renderTasks('All');
  });

  document.getElementById("filterPending").addEventListener("click", () => {
    renderTasks('Pending');
  });

  document.getElementById("filterCompleted").addEventListener("click", () => {
    renderTasks('Completed');
  });

  // Initial render
  renderTasks();
});
