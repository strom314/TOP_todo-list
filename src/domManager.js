import { Project } from "./project";
import { Task } from "./task";
import { projectManager } from "./projectManager";

export const domManager = (function () {
  const projectContainer = document.querySelector(".project-container");
  const content = document.querySelector(".body");

  const newProjectBtn = document.querySelector(".add-project-button");
  const addProjectFormContainer = document.querySelector("#project-form");
  const submitProjectBtn = document.querySelector("#submit-project");
  const addProjectForm = document.forms["add-project"];

  newProjectBtn.addEventListener("click", toggleNewProjectForm);
  submitProjectBtn.addEventListener("click", addProject);

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

    project.tasks.forEach((task) => {
      const taskCard = document.createElement("div");
      const taskTitle = document.createElement("h2");
      const taskDescription = document.createElement("p");
      const taskPriority = document.createElement("div");
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";

      taskTitle.textContent = task.name;
      taskDescription.textContent = task.description;
      taskPriority.textContent = task.priority;

      taskCard.append(taskTitle, taskDescription, taskPriority, checkBox);
      content.append(taskCard);
    });
  }

  function clearContent() {
    content.innerHTML = "";
  }
  function clearProjects() {
    projectContainer.innerHTML = "";
  }

  return { displayProjects, displayTasks };
})();
