import { Project } from "./project";
import { Task } from "./task";
import { projectManager } from "./projectManager";

export const domManager = (function () {
  const projectContainer = document.querySelector(".project-container");

  const mainBody = document.querySelector(".main");

  const newProjectBtn = document.querySelector(".add-project-button");
  const addProjectFormContainer = document.querySelector("#project-form");
  const submitProjectBtn = document.querySelector("#submit-project");
  const addProjectForm = document.forms["add-project"];

  const addTaskForm = document.forms["add-task"];
  const addTaskFormContainer = document.querySelector("#task-form");
  const submitTaskBtn = document.querySelector("#submit-task");

  function addEventListeners() {
    newProjectBtn.addEventListener("click", toggleNewProjectForm);
    submitProjectBtn.addEventListener("click", addProject);
    submitTaskBtn.addEventListener("click", addTask);
  }

  function toggleNewProjectForm() {
    if (addProjectFormContainer.style.display === "flex") {
      addProjectFormContainer.style.display = "none";
    } else {
      addProjectFormContainer.style.display = "flex";
    }
  }
  function addProject() {
    const name = addProjectForm.name.value;
    projectManager.createProject(name);
    toggleNewProjectForm();
    displayProjects();
    addProjectForm.reset();
  }
  function toggleNewTaskForm() {
    if (addTaskFormContainer.style.display === "flex") {
      addTaskFormContainer.style.display = "none";
    } else {
      addTaskFormContainer.style.display = "flex";
    }
  }
  function addTask() {
    const project = projectManager.findActiveProject();

    const name = addTaskForm.name.value;
    const description = addTaskForm.description.value;
    const dueDate = addTaskForm.dueDate.value;
    const priority = addTaskForm.priority.value;

    project.createTask(name, description, dueDate, priority);
    displayTasks(project);
    toggleNewTaskForm();
    addTaskForm.reset();
  }

  function displayProjects() {
    clearProjects();

    projectManager.projects.forEach((project) => {
      const projectCard = document.createElement("div");
      const projectTitle = document.createElement("p");
      const taskCount = document.createElement("p");

      projectCard.classList.add("project-card");
      projectTitle.classList.add("project-name");
      taskCount.classList.add("task-count");

      projectCard.addEventListener("click", () => displayTasks(project));

      projectTitle.textContent = project.name;
      taskCount.textContent = 0;

      projectCard.append(projectTitle, taskCount);

      projectContainer.append(projectCard);
    });
  }
  function updateTaskCount() {
    const taskCounts = document.querySelectorAll(".task-count");
    for (let i = 0; i < taskCounts.length; i++) {
      const element = taskCounts[i];
      element.textContent = projectManager.projects[i].tasks.length;
    }
  }

  function displayTasks(project) {
    clearContent();

    setActive(project);
    updateTaskCount();

    const title = document.createElement("h1");
    title.textContent = project.name;

    const tasks = createTasks(project);
    const addTaskBtn = createAddTaskButton();

    mainBody.append(title, tasks, addTaskBtn);
    console.log(project.tasks);
  }

  function createAddTaskButton() {
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("add-task");
    addTaskButton.textContent = "add task";
    addTaskButton.addEventListener("click", toggleNewTaskForm);
    return addTaskButton;
  }

  function setActive(project) {
    projectManager.projects.forEach((project) => {
      project.active = false;
    });
    project.active = true;
  }

  function createTasks(project) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("body");

    project.tasks.forEach((task) => {
      const taskCard = document.createElement("div");

      const taskContent = document.createElement("div");
      taskContent.classList.add("task-content");
      const taskTitle = document.createElement("h2");
      const taskDescription = document.createElement("p");
      const dueDate = document.createElement("p");
      const taskPriority = document.createElement("div");

      const editButton = document.createElement("div");
      const deleteButton = document.createElement("button");

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";

      taskTitle.textContent = task.name;
      taskDescription.textContent = task.description;
      dueDate.textContent = task.dueDate;
      taskPriority.textContent = task.priority;

      taskCard.setAttribute("data-id", task.id);

      deleteButton.setAttribute("data-id", task.id);
      deleteButton.textContent = "cc";
      deleteButton.addEventListener("click", () => {
        deleteTask(task.id);
        console.log("delete");
        displayTasks(projectManager.findActiveProject());
      });

      editButton.setAttribute("data-id", task.id);
      

      taskContent.append(taskTitle, taskDescription, dueDate, deleteButton);
      taskCard.append(checkBox, taskPriority, taskContent);
      taskCard.classList.add("task");
      taskContainer.append(taskCard);
    });
    return taskContainer;
  }

  function deleteTask(taskId) {
    const project = projectManager.findActiveProject();

    let taskToDelete = null;
    project.tasks.forEach((task) => {
      if (task.id == taskId) {
        taskToDelete = task.id;
      }
    });
    project.deleteTask(taskToDelete);
  }

  function clearContent() {
    mainBody.innerHTML = "";
  }
  function clearProjects() {
    projectContainer.innerHTML = "";
  }

  addEventListeners();

  return { displayProjects, displayTasks };
})();
