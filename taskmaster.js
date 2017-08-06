const inquirer = require("inquirer");
const colors = require("colors");
const fs = require("fs");
const Task = require("./app/Task.js");

let tasklist = require("./app/testTaskList.js");

startApp();

function startApp() {
    inquirer.prompt([
      {
        name: "method",
        type: "list",
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

function displayTasklist() {
  console.log(
    "\n" +
    "+----------+\n" +
    "| TASKLIST |\n" +
    "+----------+\n"
  );

  for (let i=0; i < tasklist.length; i++) {
    console.log(tasklist[i].formattedTaskMessage());
      if (tasklist[i].subTasks !== null && Array.isArray(tasklist[i].subTasks)) {
        for (let j=0; j < tasklist[i].subTasks.length; j++) {
          console.log("    " + tasklist[i].subTasks[j].formattedTaskMessage());
        }
      }
  }
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