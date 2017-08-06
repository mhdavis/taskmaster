function task (message, subTasks) {
  this.message = message;
  this.subTasks = subTasks;
  this.status = false;
  this.formatTask = function () {
    if (this.status) {
      return `[X] - ${this.message}\n`;
    }
    return `[ ] - ${this.message}\n`;
  },
  this.toggleStatus = function () {
    if (this.status) {
      return this.status = false;
    }
    return this.status = true;
  }
}
