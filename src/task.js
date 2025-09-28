export class Task {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
    this.id = crypto.randomUUID();
  }

  changeDone() {
    if (this.done) {
      this.done = false;
    } else {
      this.done = true;
    }
  }
  changeName(newName) {
    this.name = newName;
  }
  changeDescription(newDescription) {
    this.description = newDescription;
  }
  changeDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }
  changePriority(newPriority) {
    this.priority = newPriority;
  }
}
