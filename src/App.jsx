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

  // function to conditionally render the task barr
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

// ---------------------------------------- Form Logic ------------------------------------------>
  // State to toggle addTask form
  const [taskFormShown, setTaskFormShown] = useState(false);
  const toggleTaskForm = () => {
    return setTaskFormShown(!taskFormShown);
  };
  // function to add an addition subtask inputs to addTask form
  const addSubtask = () => {
    return setSubtasksForms((prevForm) => {
      return [...prevForm, <SubtaskInput handleDelete={deleteSubtask} />];
    });
  };
  // function to delete a subtask input from addTask form
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
  // array of subtask input components to be rendered in add task form
  const [subtasksForm, setSubtasksForms] = useState([
    <SubtaskInput handleDelete={deleteSubtask} />,
  ]);

  // function to prevent default behaviour of form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //---- Logic to handle form inputs of addTask form---->
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  return (
    // ------------------------------------------- JSX ----------------------------------------->
    <div>
      <div className={taskFormShown ? "dim" : "light"}>
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
              return (
                <Link key={index} to={`/${board.name}`}>
                  <button
                    onClick={() => {
                      updateCurrentIndex(index);
                    }}
                    className="board-button mt-5"
                  >
                    <div className=" ml-25 flex items-center">
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
      {/* ------------------------------------------- Add Task Form ----------------------------------------->*/}
      <form
        onSubmit={handleSubmit}
        className={
          taskFormShown
            ? "show absolute add-task-menu flex-col items-center"
            : " hide absolute add-task-menu flex-col items-center"
        }
      >
        <div id="addTaskMenu" className="w-416 flex-col">
          <h2 className="mt-20">Add New Task</h2>
          <p>Title</p>
          <input
            className="h-40"
            type="text"
            placeholder="e.g. Take coffee break"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
          />
          <p className="mt-20">Description</p>
          <textarea
            className="p-112"
            type="text"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
          />
          <div className="">
            <p className="mt-20">Subtasks</p>
            {subtasksForm}
            <button className="h-40 w-416 text-purple" onClick={addSubtask}>+ Add New Subtask</button>
          </div>
          <div>
            <p className="mt-20">Status</p>
            <select onChange={()=>setStatus(e.target.value)} value={status}>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
          <button  type="submit" className="mt-20 mb-15 h-40 text-white background-purple">
            Create Task
          </button>
          <p>{title}</p>
          <p>{description}</p>
          <p>{status}</p>
        </div>
      </form>
    </div>
  );
}
