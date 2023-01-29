import { useState, useEffect } from "react";
import data from "./data.json";
import { Route, Routes, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import logoDark from "./assets/logo-dark.svg";
import logoLight from "./assets/logo-light.svg";
import settingsIcon from "./assets/icon-vertical-ellipsis.svg";
import crossSvg from "./assets/icon-cross.svg";
import addTask from "./assets/icon-board.svg";
import SubtaskInput from "./components/SubtaskInput";
export default function App() {
  // ------------------------------------------- Add/Delete Task Boards Logic ----------------------------------------->
  // Data from JSON file (Taskboards)
  const [taskBoards, setTaskBoards] = useState(data.boards);
  console.log(taskBoards);
  // current index of rendered task board
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);

  // function to conditionally render the task bar
  // addes a new board to taskBoards array
  // Todo: create interface to add new board dynamically
  function addBoard() {
    return setTaskBoards([
      ...taskBoards,
      {
        name: "New Board",
        columns: [
          {
            name: "Todo",
            tasks: [
              {
                title: "Task 1",
                status: "Todo",
                subtasks: [
                  {
                    title: "Subtask 1",
                    isCompleted: true,
                  },
                ],
              },
            ],
          },
          {
            name: "Doing",
            tasks: [
              {
                title: "Task 2",
                status: "Doing",
                subtasks: [
                  {
                    title: "Subtask 1",
                    isCompleted: true,
                  },
                ],
              },
            ],
          },
          {
            name: "Done",
            tasks: [
              {
                title: "Task 3",
                status: "Done",
                subtasks: [
                  {
                    title: "Subtask 1",
                    isCompleted: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  }
  // deletes a board from taskBoards array
  const deleteBoard = () => {
    setTaskBoards(taskBoards.filter((board) => board !== taskBoards[index]));
  };
  // updates the current index of the taskBoards array
  const updateCurrentIndex = (index) => {
    setCurrentIndex(index), console.log(index);
  };

  // add a new column to the current board
  const addColumn = () => {
    return setTaskBoards((prevBoards) => [
      ...prevBoards.map((board, index) => {
        if (index == currentIndex) {
          return {
            ...board,
            columns: [
              ...board.columns,
              {
                name: "New Column",
                tasks: [
                  {
                    title: "Task 1",
                    status: "Todo",
                    subtasks: [
                      {
                        title: "Subtask 1",
                        isCompleted: true,
                      },
                    ],
                  },
                ],
              },
            ],
          };
        }
        return board;
      }),
    ]);
  };

  // ------------------------------------------- Add Task Form ----------------------------------------->
  // add a new task to the current board
  const addTask = () => {
    return setTaskBoards(
      (prevTaskBoards) => [
        ...prevTaskBoards.map((board, index) => {
          if (index == currentIndex) {
            return {
              ...board,
              columns: [
                ...board.columns.map((column, index) => {
                  if (index == 0) {
                    return {
                      ...column,
                      tasks: [
                        // TODO: Tasks not updating but correctly returning the previous state.
                        // ...column.tasks.map((task, index) => {
                        // if (index == 3) {
                        // return [
                        ...column.tasks,

                        {
                          title: "New Task",
                          description: "This is a new task",
                          status: "New",
                          subtasks: [
                            {
                              title: "Sign up page",
                              isCompleted: true,
                            },
                            {
                              title: "Sign in page",
                              isCompleted: false,
                            },
                            {
                              title: "Welcome page",
                              isCompleted: false,
                            },
                          ],
                        },
                        // ]
                        // }
                        // return { ...task };
                        // }),
                      ],
                    };
                  }
                  // if index is not the current index, return the column
                  return { ...column };
                }),
              ],
            };
          }
          return { ...board };
        }),
      ],
      console.log(taskBoards)
    );
  };
  // State to toggle add task form
  const [taskFormShown, setTaskFormShown] = useState(false);
  const toggleTaskForm = () => {
    return setTaskFormShown(!taskFormShown);
  };
  // function to add addition subtask input to add task form
  const addSubtask = () => {
    return setSubtasksForms((prevForm) => {
      return [...prevForm, <SubtaskInput handleDelete={deleteSubtask} />];
    });
  };
  // function to delete a subtask input from task form
  const deleteSubtask = () => {
    return setSubtasksForms((prevForm) => {
      return [
        ...prevForm.filter((form, index) => {
          if (index !== prevForm.length - 1) {
            return form;
          }
        }),
      ];
    });
  };
  // array of subtask components to be rendered in add task form
  const [subtasksForm, setSubtasksForms] = useState([
    <SubtaskInput handleDelete={deleteSubtask} />,
  ]);

  // function to prevent default behaviour of form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="">
      {/* TitleBar Section */}
      <div className="flex h-97">
        <div className="flex items-center border-bottom">
          <div className="w-300">
            <div className="flex justify-center">
              <img src={logoDark}></img>
            </div>
          </div>
        </div>
        <div className="flex w-100 justify-between items-center border-left border-bottom">
          <h1 className="ml-25">{taskBoards[currentIndex].name}</h1>
          <div>
            <button
              type="button"
              onClick={toggleTaskForm}
              className="task-button background-purple text-white mr-20 "
            >
              + Add New Task
            </button>
            <img className="mr-25" src={settingsIcon} />
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="absolute add-task-menu flex-col items-center"
      >
        <div id="addTaskMenu" className="w-416 flex-col">
          <h2 className="mt-20">Add New Task</h2>
          <p>Title</p>
          <input
            className="h-40"
            type="text"
            placeholder="e.g. Take coffee break"
          />
          <p className="mt-20">Description</p>
          <textarea
            className="p-112"
            type="text"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          />
          <div className="">
            <p className="mt-20">Subtasks</p>
            {subtasksForm}
            <button onClick={addSubtask}>+ Add New Subtask</button>
          </div>
          <div>
            <p className="mt-20">Status</p>
            <select>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
          <button type="submit" className="mt-20">
            Create Task
          </button>
        </div>
      </form>
      <div className="flex">
        {/* Task Boards Section */}
        <div className="w-300">
          <p>
            ALL BOARDS {"("}
            {taskBoards.length}
            {")"}
          </p>
          {/* Displays Each Task Board from taskBoards array wrapped
           with a Link to render the Task Board with React Router*/}
          {taskBoards.map((board, index) => {
            // function changeSvgColor() {
            //   if (svgColor === "grey") return setSvgColor("white");
            //   if (svgColor === "white") return setSvgColor("grey");
            // }
            return (
              <Link key={index} to={`/${board.name}`}>
                <button
                  // onMouseEnter={changeSvgColor}
                  // onMouseLeave={changeSvgColor}
                  onClick={() => {
                    updateCurrentIndex(index);
                  }}
                  className="board-button mt-5"
                >
                  <div className=" ml-25 flex items-center">
                    {/* <img className="mr-15" src={boardImagePurple} /> */}
                    {/* {svgColor == "grey" ? (
                      <img className="mr-15" src={boardImageGrey} />
                    ) : (
                      <img className="mr-15" src={boardImageWhite} />
                    )} */}
                    {board.name}
                  </div>
                </button>
              </Link>

              // <button
              //   onClick={() => {
              //     deleteBoard(index), console.log(index);
              //   }}
              // >
              //   Delete Board
              // </button>
            );
          })}

          <button
            // onMouseEnter={changeSvgColor}
            // onMouseLeave={changeSvgColor}
            className="board-button "
            onClick={addBoard}
          >
            <div>
              {/* <img className="mr-15" src={boardImagePurple} /> */}
              {/* {svgColor == "grey" ? (
                <img className="mr-15" src={boardImageGrey} />
              ) : (
                <img className="mr-15" src={boardImageWhite} />
              )} */}
              Add Board
            </div>
          </button>
        </div>
        {/* Task Lists Section */}
        <div className="flex background-dark-white task-column-container">
          <Routes>
            {/* Creates task lists for each Task Board */}
            {taskBoards.map((board, index) => {
              return (
                <Route
                  key={index}
                  path={`${board.name}`}
                  element={
                    <TaskList
                      columnsProp={board.columns}
                      // addColumn={addColumn}
                    />
                  }
                />
              );
            })}
          </Routes>
          <button
            onClick={addColumn}
            className="background-light-grey new-column-button"
          >
            <h2 className="text-grey ">+ New Column</h2>
          </button>
        </div>
      </div>
    </div>
  );
}

/* <input id="newArrayItem" type={"text"}></input>
{console.log(newArrayItem)}
<button onClick={getInput}>Submit</button>
{array.map((fruit) => {
  return (
    <Link to={fruit}>
      <h1>{fruit}</h1>
    </Link>
  );
})}
<Link to="/">
  <button>HELLO I'M A BUTTON</button>
</Link>
<img src={addTask} />

<Link to="/route2">
  <button>HELLO I'M A BUTTON AS WELL</button>
</Link>
<button onClick={deleteItem}>
  I'M A BUTTON THAT DELETES AN ITEM IN THE ARRAY
</button>
<nav>
  <ul>
    {data.boards.map((boards) => {
      return <li>{boards.name}</li>;
    })}
  </ul>
</nav>
{console.log(data.boards)}
<Routes>
  <Route path="/" element={<Route1 />} />
  <Route path="/route2" element={<Route2 />} />
  {array.map((fruit) => {
    return <Route path={fruit} element={<h2>{fruit}</h2>} />;
  })}
</Routes> */

// Todo Tasks (Rough Draft)
// function TodoTasks(data) {
//   const [task, setTask] = data.map((task) => {
//     if (data.status == todo) {
//       return (
//         <div>
//           <h2>{task.h2}</h2>
//           <p>{task.p}</p>
//         </div>
//       );
//     }
//   });
//   return (
//     <div>
//       <h3>Todo</h3>
//       {task}
//     </div>
//   );
// }
// TaskBar (RoughDraft)
// function TaskBar(){
//   return (

//   )
// }
// TaskBoard Component (Rough Draft)
// function TaskBoard(){
//   return (
//     <div>
//       <TaskBar/>
//       <TodoTasks/>
//       <DoingTasks/>
//       <DoneTasks/>
//       <NewTask/>
//     </div>
//   )
// }
// TitleBar Component(Rough Draft)
// function TitleBar() {
//   return (
//     <div>
//       <div>
//         <Logo></Logo>
//       </div>
//       <div>
//         <Title />
//         <div>
//           <Button />
//           <Settings />
//         </div>
//       </div>
//     </div>
//   );
// }
