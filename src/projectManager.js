import { Project } from "./project";

const projectManager = (function () {
  const projects = [];

  function createProject(name) {
    const project = new Project(name);
    projects.push(project);
  }
})();
