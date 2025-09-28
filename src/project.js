import { Task } from "./task";

export class Project {
  constructor(name) {
    this.name = name;
  }

  tasks = [];
  active = false;

  createTask(name, description, dueDate, priority) {
    const task = new Task(name, description, dueDate, priority);
    this.tasks.push(task);
  }

  rename(newName) {
    this.name = newName;
  }

  deleteTask(taskId) {
    const index = this.findTaskIndex(taskId);
    this.tasks.splice(index, 1); //removes the found element
  }

  editTask(taskId, name, description, dueDate, priority) {
    const task = this.tasks[this.findTaskIndex(taskId)];
    task.name = name;
    task.changeName(name);
    task.changeDescription(description);
    task.changeDueDate(dueDate);
    task.changePriority(priority);
  }

  findTaskIndex(taskId) {
    let index = -1;
    this.tasks.forEach((task) => {
      if (task.id === taskId) {
        index = this.tasks.indexOf(task);
      }
    });
    return index;
  }
}
