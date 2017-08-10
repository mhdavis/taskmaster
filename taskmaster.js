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
          "Change Sub-Task Status",
          "Export Tasklist as Text File",
          "Import Tasklist from Text File"
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
        case "Export Tasklist as Text File":
          exportAsTxtFile(myTasklist, "myTasklist.txt");
        case "Import Tasklist from Text File":
          importTxtFile("myTasklist.txt");
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
    console.log(tasklist[i].display + "\n");
    if (tasklist[i].subTasks !== null && Array.isArray(tasklist[i].subTasks)) {
      for (let j=0; j < tasklist[i].subTasks.length; j++) {
        console.log("    " + tasklist[i].subTasks[j].display  + "\n");
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
  let removeTaskSelections = generateOptions(tasklist, "message");
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
  let addSubTaskSelections = generateOptions(tasklist, "message");

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

function removeSubTask(tasklist) {
  let rstFiltered = tasklist.filter(function (obj) {
    return Array.isArray(obj.subTasks);
  });

  let rstSelections = generateOptions(rstFiltered, "message");

  inquirer.prompt([
    {
      name: "parent_task",
      type: "list",
      choices: rstSelections,
      message: "Select a parent task:"
    }
  ]).then(function (answers) {
    for (let i=0; i < rstFiltered.length; i++) {
      if (rstFiltered[i].message === answers.parent_task) {

        let stDeletions = generateOptions(rstFiltered[i].subTasks, "message");

        inquirer.prompt([
          {
            name: "subtask_for_deletion",
            type: "list",
            choices: stDeletions,
            message: "Select Subtask for deletion:"
          }
        ]).then(function(inner_answers) {
          for (let j=0; j < tasklist[i].subTasks.length; j++) {
            if (tasklist[i].subTasks[j].message === inner_answers.subtask_for_deletion) {
              tasklist[i].subTasks.splice(j, 1);
            }
          }
          promptContinue();
        });
      }
    }
  });
}

function changeTask(tasklist) {
  let changeTaskSelections = generateOptions(tasklist, "display");

  inquirer.prompt([
    {
      name: "task_for_status_change",
      type: "list",
      choices: changeTaskSelections,
      message: "Mark task as complete/incomplete:"
    }
  ]).then(function (answers) {
    for (let i=0; i < tasklist.length; i++) {
      if (tasklist[i].display === answers.task_for_status_change) {
        tasklist[i].toggleStatus();
      }
    }
    promptContinue();
  });
}

function changeSubTask(tasklist) {
  let cstFiltered = tasklist.filter(function (obj) {
      return Array.isArray(obj.subTasks);
  });

  let cstSelections = generateOptions(cstFiltered, "message");

  inquirer.prompt([
    {
      name: "parent_task",
      type: "list",
      choices: cstSelections,
      message: "select a parent task:"
    }
  ]).then(function (answers) {
    for (let i=0; i < cstFiltered.length; i++) {
      if (cstFiltered[i].message === answers.parent_task) {

        let stToggles = generateOptions(cstFiltered[i].subTasks, "display");

        inquirer.prompt([
          {
            name: "subtask_for_status_change",
            type: "list",
            choices: stToggles,
            message: "Mark subtask as complete/incomplete"
          }
        ]).then(function (inner_answers) {
          for (let j=0; j < tasklist[i].subTasks.length; j++) {
            if (tasklist[i].subTasks[j].display === inner_answers.subtask_for_status_change) {
              tasklist[i].subTasks[j].toggleStatus();
              console.log(tasklist[i].subTasks[j].status);
            }
          }
          promptContinue();
        });
      }
    }
  });
}

function exportAsTxtFile(tasklist, filename) {
  fs.writeFile(filename, "", "utf8", (err) => {if (err) throw err});
  fs.writeFile(filename ,
  "+----------+\n" +
  "| TASKLIST |\n" +
  "+----------+\n" +
  "\n",
  "utf8", (err) => {if (err) throw err;});

  let str = '';


  for (let i=0; i < tasklist.length; i++) {
    if (tasklist[i].status) {
      str += "[X] - " + tasklist[i].message + "\n";
    } else {
      str += tasklist[i].display + "\n";
    }
    if (Array.isArray(tasklist[i].subTasks)) {
      for (let j=0; j < tasklist[i].subTasks.length; j++) {
        if (tasklist[i].subTasks[j].status) {
          str += "     [X] - " + tasklist[i].subTasks[j].message + "\n";
        } else {
          str += "     " + tasklist[i].subTasks[j].display + "\n";
        }
      }
    }
  }

  fs.appendFile(filename, str, "utf8", function (err) {
    if (err) throw err;
  });
  promptContinue();
}

function importTxtFile(filename) {
    myTasklist = [];
    fs.readFile(filename, 'utf8', function (err, data) {
      if (err) {
        console.log(
          "\nError: The file specified does NOT match the format\n" +
          "interpreted by Taskmaster\n"
      );
    } else {
      let dataArr = data.split("\n");
      let dataSliced = dataArr.slice(4, dataArr.length-1);
      console.log(dataSliced);
      console.log("=======================");
      let temp = {};
      for (let i=0; i < dataSliced.length; i++) {
        if (dataSliced[i].startsWith("[ ]")) {
          let taskMsgIncomplete = dataSliced[i].slice(5, dataSliced[i].length);
          console.log(taskMsgIncomplete);
        } else if (dataSliced[i].startsWith("[X]")) {
          let taskMsgComplete = dataSliced[i].slice(5, dataSliced[i].length);
          console.log(taskMsgComplete);
        }
        // Stuck: having trouble figuring out the best way to parse text file
      }

    }

    });
}

function generateOptions (arr, prop) {
  let filtered = arr.filter(function (obj) {
    return obj.hasOwnProperty(prop);
  });

  let selections = [];
  for (let i=0; i < filtered.length; i++) {
    selections.push(filtered[i][prop]);
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
