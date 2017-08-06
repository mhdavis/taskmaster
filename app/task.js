function Task (message, subTasks) {
  this.message = message;
  this.subTasks = subTasks;
  this.status = false;
}

Task.prototype.formattedTaskMessage = function () {
  if (this.status) {
    return `[X] - ${this.message}\n`;
  }
  return `[ ] - ${this.message}\n`;
}

Task.prototype.toggleStatus = function () {
  if (this.status) {
    return this.status = false;
  }
  return this.status = true;
}

module.exports = Task;
