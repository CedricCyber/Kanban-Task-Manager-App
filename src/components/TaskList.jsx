import arrowDown from "../assets/icon-chevron-down.svg";
import arrowUp from "../assets/icon-chevron-up.svg";
export default function TaskList(columnsProp) {
  return columnsProp.columnsProp.map((column, index) => {
    return (
      <div className="flex-col" key={index}>
        <div className="flex items-center ml-15 mt-5 ">
          <img className="mr-5 p-5" src={arrowDown} />
          <h3 className="text-grey">
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
                <div
                  key={index}
                  className="task-card border-radius-sm background-white mt-5 "
                >
                  <div className="ml-15 py-15">
                    <h4>{task.title}</h4>
                    <p className="text-grey">
                      {
                        task.subtasks.filter(
                          (subtask) => subtask.isCompleted === true
                        ).length
                      }{" "}
                      of {task.subtasks.length} subtasks
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
}
