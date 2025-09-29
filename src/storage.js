import { projectManager } from "./projectManager";

export const storage = (function () {
  function save() {
    projectManager.projects.forEach((project) => {
      localStorage.setItem("projects", JSON.stringify(projectManager.projects));
      localStorage.setItem(project.name, JSON.stringify(project.tasks));
    });
  }

  function load() {
    const storedProjects = localStorage.getItem("projects");

    const projects = storedProjects ? JSON.parse(storedProjects) : [];

    projectManager.loadProjects(projects);
  }

  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  return { save, load, storageAvailable };
})();
