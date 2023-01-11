import { useState } from "react";
import data from "../../Travel-Blog/React-Travel-Blog/src/data";
import "./App.css";

// Todo pass function as props to button in titlebar component to add task
// Todo Tasks (Rough Draft)
function TodoTasks(data) {
  const [task, setTask] = data.map((task) => {
    if (data.status == todo) {
      return (
        <div>
          <h2>{task.h2}</h2>
          <p>{task.p}</p>
        </div>
      );
    }
  });
  return (
    <div>
      <h3>Todo</h3>
      {task}
    </div>
  );
}
// TaskBar (RoughDraft)
function TaskBar(){
  return (

  )
}
// TaskBoard Component (Rough Draft)
function TaskBoard(){
  return (
    <div>
      <TaskBar/>
      <TodoTasks/>
      <DoingTasks/>
      <DoneTasks/>
      <NewTask/>
    </div>
  )
}
// TitleBar Component(Rough Draft)
function TitleBar() {
  return (
    <div>
      <div>
        <Logo></Logo>
      </div>
      <div>
        <Title />
        <div>
          <Button />
          <Settings />
        </div>
      </div>
    </div>
  );
}

function App() {
  // function to conditionally render the task bar

  return (
    <div className="App">
      <TitleBar />
      <TaskBoard />
    </div>
  );
}

export default App;
