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
    const index = this.findTaskIndex(taskName);
    this.tasks.splice(index, 1); //removes the found element
  }

  editTask(taskName, name, description, dueDate, priority) {
    const task = this.tasks[this.findTaskIndex(taskName)];
    task.name = name;
    task.changeName(name);
    task.changeDescription(description);
    task.changeDueDate(dueDate);
    task.changePriority(priority);
  }

  findTaskIndex(taskName) {
    let index = -1;
    this.tasks.forEach((task) => {
      if (task.name === taskName) {
        index = this.tasks.indexOf(task);
      }
    });
    return index;
  }
}
