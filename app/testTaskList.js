const Task = require("./Task.js");

let arr = [];

let subTasksArr =[];

subTasksArr.push(new Task("Apply Peanut Butter to bread slice", null));
subTasksArr.push(new Task("Apply Jelly to bread slice", null));
subTasksArr.push(new Task("Put Bread slices together", null));

arr.push(new Task("Make PB&J Sandwich", subTasksArr));
arr.push(new Task("Wash the Car", null, true));
arr.push(new Task("Do the Laundry", null));

module.exports = arr;
