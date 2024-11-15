const taskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");
const taskList = document.getElementById("taskList");

taskBtn.addEventListener("click", () => {
  const task = taskInput.value;
  const deadline = new Date(deadlineInput.value);

  const formattedDeadline = `${deadline
    .getDate()
    .toString()
    .padStart(2, "0")}/${(deadline.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${deadline.getFullYear()} ${deadline.toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  )}`;

  const taskItem = document.createElement("li");
  taskItem.innerHTML = `${task} - <span class="deadline">${formattedDeadline}</span>`;
  taskList.appendChild(taskItem);

  taskInput.value = "";
  deadlineInput.value = "";
});
