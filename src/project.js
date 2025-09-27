import { Task } from "./task";

export class Project {
  constructor(name) {
    this.name = name;
  }

  tasks = [];

  createTask(name, description, dueDate, priority) {
    const task = new Task(name, description, dueDate, priority);
    this.tasks.push(task);
  }

  rename(newName) {
    this.name = newName;
  }

  deleteTask(taskName) {
    this.tasks.forEach((task) => {
      if (task.name === taskName) {
        this.tasks.splice(this.findTaskIndex(), 1); //removes the found element
      }
    });
  }

  editTask(taskName, name, description, dueDate, priority) {
    const task = this.findTaskIndex(taskName);
    task.changeName(name);
    task.changeDescription(description);
    task.changeDueDate(dueDate);
    task.changePriority(priority);
  }

  findTaskIndex(taskName) {
    this.tasks.forEach((task) => {
      if (task.name === taskName) {
        return this.tasks.indexOf(task);
      }
    });
  }
}
