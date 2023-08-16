{
  let tasks = [];

  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
      },
    ];
    renderTasks();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.splice(0, taskIndex), ...tasks.splice(taskIndex + 1)];
    renderTasks();
  };

  const toggleAllTasksDone = () => {};

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
  
    renderTasks();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="list__item js-task">
          <button class="list__button  list__item--toggleDone js-done ">
           ${task.done ? "✔" : ""}
          </button>
          <span class="list__content ${
            task.done ? "list__content--done" : ""
          }">${task.content}</span>
         <button class="list__button list__button--remove js-remove">
          🗑
         </button>
      </li>
   `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
    bindEvents();
  };

  const bindButtonsEvents = () => {};

  const renderButtons = () => {};

  const render = () => {
    bindEvents();
    renderTasks();
    renderButtons();
    bindButtonsEvents();
    toggleAllTasksDone();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };
  init();
}
