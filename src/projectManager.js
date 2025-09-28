import { Project } from "./project";

export const projectManager = (function () {
  const projects = [];

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

  return { projects, createProject };
})();
