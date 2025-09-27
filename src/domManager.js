import { Project } from "./project";
import { Task } from "./task";
import { projectManager } from "./projectManager";

export const domManager = (function () {
  const projectContainer = document.querySelector(".project-container");

  function displayProjects() {
    projectManager.projects.forEach((project) => {
      const projectCard = document.createElement("div");
      const projectTitle = document.createElement("p");
      const taskCount = document.createElement("p");

      projectCard.classList.add("project-card");
      projectTitle.classList.add("project-title");
      taskCount.classList.add("task-count");

      projectTitle.textContent = project.name;
      taskCount.textContent = project.tasks.length;

      projectCard.append(projectTitle, taskCount);

      projectContainer.append(projectCard);
    });
  }

  return { displayProjects };
})();
