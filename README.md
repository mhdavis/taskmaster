# Taskmaster

## Introduction
Taskmaster is a simple tasklist creation / maintenance application that runs in the terminal and allows the user to generate, modify, import and export tasklist

## Tasklist Structure
An example Tasklist is provided Here:

```
+----------+
| TASKLIST |
+----------+

[ ] - Make PB&J Sandwich
     [X] - Apply Peanut Butter to bread slice
     [ ] - Apply Jelly to bread slice
     [ ] - Put Bread slices together
[X] - Wash the Car
[ ] - Do the Laundry
```

It is broken down as follows:

**Task (or Parent Task)** - The main task to be accomplished, the Parent Task
can either exist by itself (ex. `Wash The Car`) or contain several Sub-Tasks
(ex. `Make PB&J Sandwich`). Tasks can be marked as either complete `[X]` or
incomplete `[ ]`. Upon Parent Task completion, all Sub-Tasks are marked as
complete `[X]` (This is default behavior).

**Sub-Task (or Child Task)** - Sub-Tasks are stepping stones and required to
be completed in order to complete the Parent Task.

**Future Improvements:**

**_Sub-Task Levels_** - In this current time, Children tasks may only exist one level down from their parent tasks. Future versions Taskmaster are being worked on in order
to allow the user to go _n_ levels down, allowing for Sub-Tasks to contain
Sub-Tasks themselves, etc.

**_Sub-Task Completion_** - Currently, When all Sub-Tasks are completed in a Parent Task, the Parent Task will **NOT** be marked as completed. In order to mark a Parent Task as complete, the user must select the `Change Task Status` method.


## Available Features
1. [Display Tasklist](#display-tasklist)
2. [Add Task](#add-task)
3. [Remove Task](#remove-task)
4. [Add Sub-Task](#add-sub-task)
5. [Remove Sub-Task](#remove-sub-task)
6. [Change Task Status](#change-task-status)
7. [Change Sub-Task Status](#change-sub-task-status)
8. [Export Tasklist as Text File](#export-tasklist)
9. [Import Tasklist from Text File](#import-tasklist)
