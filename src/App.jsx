import { useState, useEffect } from "react";
import data from "./data.json";
import { Route, Routes, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import addTask from "./assets/icon-board.svg";
import Route2 from "./components/Route2"; // Todo pass function as props to button in titlebar component to add task
export default function App() {
  const [taskBoards, setTaskBoards] = useState(data.boards);

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
  const deleteBoard = () => {
    alert("delete board");
  };
  return (
    <div className="App">
      <div>
        {taskBoards.map((board, index) => {
          return (
            <Link key={index} to={`/${board.name}`}>
              <button>Render {board.name}</button>
            </Link>
          );
        })}
        <button onClick={addBoard}>Add Board</button>
        <Routes>
          {taskBoards.map((board, index) => {
            return (
              <Route
                key={index}
                path={`${board.name}`}
                element={
                  <TaskList
                    handleClick={deleteBoard}
                    columnsProp={board.columns}
                  />
                }
              />
            );
          })}
        </Routes>
        ;{/* <TaskList columnsProp={taskBoards[0].columns} /> */}
      </div>
      ;
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
