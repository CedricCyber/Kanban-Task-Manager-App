export default function TaskList(columnsProp) {
  return columnsProp.columnsProp.map((column, index) => {
    return (
      <div key={index}>
        {console.log(handleClick)}
        <div>
          <button onClick={handleClick}>Delete Board</button>

          <div className="dot">O</div>
          <h1>
            {column.name}{" "}
            <span>
              {"("}
              {column.tasks.length}
              {")"}
            </span>
          </h1>
        </div>
        ;
        <div>
          {column.tasks.map((task, index) => {
            return (
              <div key={index}>
                <h2>{task.title}</h2>
                <p>
                  {
                    task.subtasks.filter(
                      (subtask) => subtask.isCompleted === true
                    ).length
                  }{" "}
                  of {task.subtasks.length} subtasks
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
}
