export default function TaskList(columnsProp) {
  return columnsProp.columnsProp.map((column, index) => {
    return (
      <div key={index}>
        <div className="flex items-center ml-15">
          <div className="dot">O</div>
          <h3>
            {" "}
            {column.name}{" "}
            <span>
              {"("}
              {column.tasks.length}
              {")"}
            </span>
          </h3>
        </div>
        <div>
          {column.tasks.map((task, index) => {
            return (
              <div className="ml-15">
                <div key={index} className="task-card border-radius-sm  mb-15">
                  <h4>{task.title}</h4>
                  <p>
                    {
                      task.subtasks.filter(
                        (subtask) => subtask.isCompleted === true
                      ).length
                    }{" "}
                    of {task.subtasks.length} subtasks
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
}
