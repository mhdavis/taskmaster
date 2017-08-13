const fs = require("fs");
const readline = require("readline");
const Task = require("./app/Task.js");

let banana = importTxtFile("myTasklist.txt");

function importTxtFile(filename) {

  let importFilePromise = new Promise(function (resolve, reject) {

    let taskArray = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(filename)
    });

    rl.on('line', function(line) {
      if (line.startsWith("[ ]")) {

        let splt = line.split("[ ] - ");
        let task = new Task(splt[1], null);
        taskArray.push(task);

      } else if (line.startsWith("[X]")) {

        let splt = line.split("[X] - ");
        let task = new Task(splt[1], null, true);
        taskArray.push(task);

      } else if (/\s{3,}\[\s\]/.test(line)) {

        let splt = line.split("[ ] - ");
        let subtask = new Task(splt[1], null);
        if (taskArray[taskArray.length-1].subTasks === null) {
          taskArray[taskArray.length-1].subTasks = [];
        }
        taskArray[taskArray.length-1].subTasks.push(subtask);

      } else if (/\s{3,}\[\w\]/.test(line)) {

        let splt = line.split("[X] - ");
        let subtask = new Task(splt[1], null, true);
        if (taskArray[taskArray.length-1].subTasks === null) {
          taskArray[taskArray.length-1].subTasks = [];
        }
        taskArray[taskArray.length-1].subTasks.push(subtask);
      }

    });

    rl.on('close', function () {
      if (taskArray.length >0) {
        resolve(taskArray);
      } else {
        reject("Could Not Read File");
      }
    });

  });

  importFilePromise.then(function(res) {
    myTaskList = res;
  }).catch(function (err) {
    console.log(err);
  });

}
