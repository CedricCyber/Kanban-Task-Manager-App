import arrowDown from "../assets/icon-chevron-down.svg";
import arrowUp from "../assets/icon-chevron-up.svg";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
export default function TaskList(columnsProp) {
  return columnsProp.columnsProp.map((column, index) => {
    const [visable, setVisable] = useState(true);
    const imageRef = useRef(null);
    const listRef = useRef(null);
    function toggleList() {
      return (
        setVisable(!visable),
        visable
          ? (gsap.to(imageRef.current, { rotation: 180, duration: 0.5 }),
            gsap.to(listRef.current, { y: -20, opacity: 0, duration: 0.5 }))
          : (gsap.to(imageRef.current, { rotation: 0, duration: 0.5 }),
            gsap.to(listRef.current, { y: 0, opacity: 1, duration: 0.5 }))
      );
    }

    return (
      <div className="flex-col" key={index}>
        <div className="flex items-center ml-15 mt-5 w-280">
          <img
            ref={imageRef}
            onClick={toggleList}
            className="mr-5 p-5"
            src={arrowDown}
          />

          <h3 className="text-grey">
            {column.name}{" "}
            <span>
              {"("}
              {column.tasks.length}
              {")"}
            </span>
          </h3>
        </div>
        <div ref={listRef}>
          {column.tasks.map((task, index) => {
            return (
              <div key={index} className="ml-15">
                <div className="task-card border-radius-sm background-white mt-5 ">
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
