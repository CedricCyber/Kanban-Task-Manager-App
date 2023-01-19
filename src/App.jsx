import { useState, useEffect } from "react";
import data from "./data.json";
import { Route, Routes, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import logoDark from "./assets/logo-dark.svg";
import AddColumn from "./components/AddColumn";
import logoLight from "./assets/logo-light.svg";
import settingsIcon from "./assets/icon-vertical-ellipsis.svg";
import boardImageGrey from "./assets/icon-board.svg";
import boardImageWhite from "./assets/icon-board-white.svg";
import addTask from "./assets/icon-board.svg";
import Route2 from "./components/Route2"; // Todo pass function as props to button in titlebar component to add task
import { gsap } from "gsap";

export default function App() {
  // ---------------------------------- State & Functions (to be passed as props to prevent ) ---------------------------------- //

  // Data from JSON file (Taskboards)
  const [taskBoards, setTaskBoards] = useState(data.boards);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const newArrayItem = document.getElementById("newArrayItem");

  // const [array, setArray] = useState(["apple", "orange", "bananna"]);
  // console.log(array);
  // function deleteItem() {
  //   return setArray(array.filter((a) => a !== "apple")), console.log(array);
  // }
  // function getInput() {
  //   return console.log(newArrayItem.value);
  // }

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
        ],
      },
    ]);
  }
  // function to delete a board from taskBoards array
  const deleteBoard = () => {
    setTaskBoards(taskBoards.filter((board) => board !== taskBoards[index]));
  };
  // function to update the current index of the taskBoards array
  const updateCurrentIndex = (index) => {
    setCurrentIndex(index), console.log(index);
  };
  // state and function to toggle the color for conditional rendering of svg for board link buttons
  // const [svgColor, setSvgColor] = useState("grey");
  // function changeSvgColor() {
  //   if (svgColor === "grey") return setSvgColor("white");
  //   if (svgColor === "white") return setSvgColor("grey");
  // }
  // visable state for toggling task lists visability with arrow svg
  // const [visable, setVisable] = useState(true);
  // Refs for gsap animations (image:arrow svg rotate, list:slide column up/down)
  // const imageRef = useRef(null);
  // const listRef = useRef(null);
  // function to toggle visability of task lists and rotate arrow svg
  // function toggleList() {
  //   return (
  //     setVisable(!visable),
  //     visable
  //       ? (gsap.to(imageRef.current, { rotation: 180, duration: 0.5 }),
  //         gsap.to(listRef.current, { y: -20, opacity: 0, duration: 0.5 }))
  //       : (gsap.to(imageRef.current, { rotation: 0, duration: 0.5 }),
  //         gsap.to(listRef.current, { y: 0, opacity: 1, duration: 0.5 }))
  //   );
  // }
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
            <button className="task-button background-purple text-white mr-20 ">
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
            // const [svgColor, setSvgColor] = useState("grey");
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
                  className="board-button"
                >
                  <div className=" ml-25 flex items-center">
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
                  element={<TaskList columnsProp={board.columns} />}
                />
              );
            })}
          </Routes>
          <AddColumn />
        </div>
      </div>
    </div>
  );
}

{
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
}

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
