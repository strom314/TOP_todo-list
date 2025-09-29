import { Project } from "./project";

export const projectManager = (function () {
  let projects = [];

  function createProject(name) {
    const project = new Project(name);
    projects.push(project);
  }

  function findProjectIndex(projectName) {
    let index = -1;
    this.projects.forEach((project) => {
      if (task.name === projectName) {
        index = this.tasks.indexOf(task);
      }
    });
    return index;
  }

  function findActiveProject() {
    let activeProject = null;
    projects.forEach((project) => {
      if (project.active) {
        activeProject = project;
      }
    });
    return activeProject;
  }

  function loadProjects(newProjects) {
    projects.length = 0;
    projects.push(...newProjects);
  }

  return {
    projects,
    createProject,
    findProjectIndex,
    findActiveProject,
    loadProjects,
  };
})();
