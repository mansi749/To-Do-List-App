document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todoForm");
  const todoInput = document.getElementById("todoInput");
  const todoDate = document.getElementById("todoDate");
  const todoList = document.getElementById("todoList");

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = todoInput.value;
    const taskDate = todoDate.value;

    if (taskText && taskDate) {
      addTask(taskText, taskDate);
      todoInput.value = "";
      todoDate.value = "";
    }
  });

  function addTask(taskText, taskDate) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${taskText} - ${taskDate}</span>
      <input type="checkbox" class="markComplete">
      <button class="deleteBtn">Delete</button>
    `;
    todoList.appendChild(li);
    addListeners(li);
  }

  function addListeners(item) {
    const checkbox = item.querySelector(".markComplete");
    const deleteBtn = item.querySelector(".deleteBtn");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        item.classList.add("completed");
      } else {
        item.classList.remove("completed");
      }
    });

    deleteBtn.addEventListener("click", () => {
      todoList.removeChild(item);
    });
  }
});