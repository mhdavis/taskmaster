function Task (message, subTasks, status) {
  this.message = message;
  this.subTasks = subTasks;
  this.status = status || false;
  this.formattedDisplay = function () {
    if (this.status) {
      this.display = `[X] - ${this.message}`.green;
    } else {
      this.display = `[ ] - ${this.message}`;
    }
  };
  this.formattedDisplay();
}

Task.prototype.toggleStatus = function () {
  this.status = !this.status;
  this.formattedDisplay();
  if (Array.isArray(this.subTasks)) {
    for (let i=0; i < this.subTasks.length ;i++) {
      this.subTasks[i].status = this.status;
      this.subTasks[i].formattedDisplay();
    }
  }
  // if subtasks is an Array
  // if all subtasks status are true
  // mark parent status as complete
};

module.exports = Task;
