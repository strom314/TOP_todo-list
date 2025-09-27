export class Task {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
  }

  changeDone() {
    if (this.done) {
      this.done = false;
    } else {
      this.done = true;
    }
  }
}
