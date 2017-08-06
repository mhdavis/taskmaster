const inquirer = require("inquirer");
const colors = require("colors");
const fs = require("fs");
const Task = require("./app/task.js");

let tasklist = [];

function startApp() {
    inquirer.prompt([
      {
        name: "method",
        input: "list",
        choices: [
          "Display Tasklist",
          "Add Task",
          "Remove Task",
          "Add Sub-Task",
          "Remove Sub-Task",
          "Change Task Status",
          "Change Sub-Task Status"
        ],
        message: "OPTIONS:"
      }
    ]).then(function (answers) {
      switch (answers.method) {
        case "Display Tasklist":
          displayTasklist();
          break;
        case "Add Task":
          addTask();
          break;
        case "Remove Task":
          removeTask();
          break;
        case "Add Sub-Task":
          addSubTask();
          break;
        case "Remove Sub-Task":
          removeSubTask();
          break;
        case "Change Task Status":
          changeTask();
          break;
        case "Change Sub-Task Status":
          changeSubTask();
          break;
      }
    });
}

function addTask() {
  inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: "Enter task:"
    }
  ]).then(function (answers) {
    let task = new Task(answers.task, []);
    tasklist.push(task);
    console.log(task);
  });
}
