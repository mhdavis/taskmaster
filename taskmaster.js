const inquirer = require("inquirer");
const colors = require("colors");
const fs = require("fs");
const Task = require("./app/Task.js");

let myTasklist = require("./app/testTaskList.js");

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
          displayTasklist(myTasklist);
          break;
        case "Add Task":
          addTask(myTasklist);
          break;
        case "Remove Task":
          removeTask(myTasklist);
          break;
        case "Add Sub-Task":
          addSubTask(myTasklist);
          break;
        case "Remove Sub-Task":
          removeSubTask(myTasklist);
          break;
        case "Change Task Status":
          changeTask(myTasklist);
          break;
        case "Change Sub-Task Status":
          changeSubTask(myTasklist);
          break;
      }
    });
}

function displayTasklist(tasklist) {
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
  console.log('');
  promptContinue();
}

function addTask(tasklist) {
  inquirer.prompt([
    {
      name: "task_to_add",
      type: "input",
      message: "Enter a task:"
    }
  ]).then(function (answers) {
    let task = new Task(answers.task_to_add, null);
    tasklist.push(task);
    promptContinue();
  });
}

function removeTask(tasklist) {
  let removeTaskSelections = generateOptions(tasklist);

  inquirer.prompt([
    {
      name: "task_to_delete",
      type: "list",
      choices: removeTaskSelections,
      message: "Select which task to delete:"
    }
  ]).then(function (answers) {
    for (let i=0; i < tasklist.length; i++) {
      if (tasklist[i].message === answers.task_to_delete) {
        tasklist.splice(i, 1);
      }
    }
    promptContinue();
  });

}

function addSubTask(tasklist) {
  let addSubTaskSelections = generateOptions(tasklist);

  inquirer.prompt([
    {
      name: "selection",
      type: "list",
      choices: addSubTaskSelections,
      message: "Select which parent task you'd like to add to:"
    },
    {
      name: "subtask_to_add",
      type: "input",
      message: "Enter a subtask:"
    }
  ]).then(function (answers) {
    for(let i=0; i < tasklist.length; i++) {
      if (tasklist[i].message === answers.selection) {
        if (tasklist[i].subTasks === null) {
          tasklist[i].subTasks = [];
          let subTask = new Task(answers.subtask_to_add, null);
          tasklist[i].subTasks.push(subTask);
        } else if (Array.isArray(tasklist[i].subTasks)) {
          let subTask = new Task(answers.subtask_to_add, null);
          tasklist[i].subTasks.push(subTask);
        }
      }
    }
    promptContinue();
  });
}

function generateOptions(arr) {
  let selections = [];
  for (let i=0; i < arr.length; i++) {
    if (arr[i].hasOwnProperty("message")) {
      selections.push(arr[i].message);
    }
  }
  return selections;
}

function promptContinue() {
  inquirer.prompt([
    {
      name: "continue",
      type: "confirm",
      message: "Return to Options?"
    }
  ]).then(function (answers) {
    if (answers.continue) {
      startApp();
    }
  });
}
