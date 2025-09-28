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
    if (addProjectFormContainer.style.display === "flex") {
      addProjectFormContainer.style.display = "none";
    } else {
      addProjectFormContainer.style.display = "flex";
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
    addTaskForm.reset();
  }

  function displayProjects() {
    clearProjects();

    projectManager.projects.forEach((project) => {
      const projectCard = document.createElement("div");
      const projectTitle = document.createElement("p");
      const taskCount = document.createElement("p");

      projectCard.classList.add("project-card");
      projectTitle.classList.add("project-title");
      taskCount.classList.add("task-count");

      projectCard.addEventListener("click", () => displayTasks(project));

      projectTitle.textContent = project.name;
      taskCount.textContent = project.tasks.length;

      projectCard.append(projectTitle, taskCount);

      projectContainer.append(projectCard);
    });
  }

  function displayTasks(project) {
    clearContent();

    projectManager.projects.forEach((project) => {
      project.active = false;
    });
    project.active = true;

    const title = document.createElement("h1");
    title.textContent = project.name;

    const tasks = createTasks(project);

    // const addTaskButton = document.createElement("button");
    // addTaskButton.classList.add("add-task");
    // addTaskButton.textContent = "add task";

    // mainBody.append(addTaskButton);

    // addTaskButton.addEventListener("click", toggleNewTaskForm);

    mainBody.append(title, tasks);
    console.log(project.tasks);
  }

  function createTasks(project) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("body");

    project.tasks.forEach((task) => {
      const taskCard = document.createElement("div");
      const taskTitle = document.createElement("h2");
      const taskDescription = document.createElement("p");
      const dueDate = document.createElement("p");
      const taskPriority = document.createElement("div");
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";

      taskTitle.textContent = task.name;
      taskDescription.textContent = task.description;
      dueDate.textContent = task.dueDate;
      taskPriority.textContent = task.priority;

      taskCard.append(
        taskTitle,
        taskDescription,
        dueDate,
        taskPriority,
        checkBox
      );
      taskContainer.append(taskCard);
    });
    return taskContainer;
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
