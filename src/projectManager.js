import { Project } from "./project";

export const projectManager = (function () {
  const projects = [];

  function createProject(name) {
    const project = new Project(name);
    projects.push(project);
  }

  return { projects, createProject };
})();
