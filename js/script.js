{
  let tasks = [];

  let hideDoneTasks = false;

  const form = document.querySelector(".js-form");

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
      },
    ];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
    render();
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
      <li class="list__item ${
        hideDoneTasks && task.done ? "tasksList__item--hidden" : ""
      } js-task">
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
  };

  const bindButtonsEvents = () => {
    const hideDoneButton = document.querySelector(".js-hideDoneButton");
    const markAllTasksDoneButton = document.querySelector(
      ".js-markAllTasksDoneButton"
    );

    if (hideDoneButton) {
      hideDoneButton.addEventListener("click", () => {
        hideDoneTasks = !hideDoneTasks;
        render();
      });
    }

    if (markAllTasksDoneButton) {
      markAllTasksDoneButton.addEventListener("click", () => {
        toggleAllTasksDone();
      });
    }
  };

  const renderButtons = () => {
    const headerButtons = document.querySelector(".js-headerButtons");

    if (tasks.length === 0) {
      headerButtons.innerHTML = "";
    } else {
       headerButtons.innerHTML = `
    <button class="tile__button js-hideDoneButton"> 
     ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
    </button> 
    <button class="tile__button js-markAllTasksDoneButton" ${
      tasks.every(({ done }) => done) ? "disabled" : ""
    }>
    Ukończ wszystkie
    </button>
    `;
    }
    bindButtonsEvents();
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent === "") {
      newTaskElement.focus();
      return;
    } else {
      addNewTask(newTaskContent);
      form.reset();
      newTaskElement.focus();
    }
  };

  const init = () => {
    render();

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
