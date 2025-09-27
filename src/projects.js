import { Task } from "./tasks";

export class Project {
  constructor(name) {
    this.name = name;
  }

  tasks = [];

  createTask(name, description, dueDate, priority) {
    const task = new Task(name, description, dueDate, priority);
    this.tasks.push(task);
  }
}
