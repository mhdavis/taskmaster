function task (message, subTasks) {
  this.message = message;
  this.subTasks = subTasks;
  this.status = false;
  this.toggleStatus = function () {
    if (this.status) {
      return this.status = false
    }
    return this.status = true;
  }
}
