import arrowDown from "../assets/icon-chevron-down.svg";
import arrowUp from "../assets/icon-chevron-up.svg";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
export default function TaskList(columnsProp, addColumn) {
  // state for task list visability
  const [visable, setVisable] = useState(true);
  // managing refs for gsap animations
  // refs for arrow svg rotation
  const [imageRefs, setImageRefs] = useState([
    useRef(null),
    useRef(null),
    useRef(null),
  ]);
  // refs for list slide up/down
  const [listRefs, setListRefs] = useState([
    useRef(null),
    useRef(null),
    useRef(null),
  ]);
  // function to toggle visability of task lists and rotate arrow svg
  const toggleList = (index) => {
    return (
      // sets visable state to opposite of current state
      setVisable(!visable),
      visable
        ? (gsap.to(imageRefs[index].current, {
            rotation: 180,
            duration: 0.5,
          }),
          gsap.to(listRefs[index].current, {
            y: -20,
            opacity: 0,
            duration: 0.5,
          }))
        : (gsap.to(imageRefs[index].current, {
            rotation: 0,
            duration: 0.5,
          }),
          gsap.to(listRefs[index].current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
          }))
    );
  };
  //  rendering a task list for each column in data.boards.columns
  // automatically populated with data from data.boards.columns
  return columnsProp.columnsProp.map((column, index) => {
    return (
      <div className="flex-col" key={index}>
        <div className="flex items-center ml-15 mt-20 w-280">
          <img
            // applies a ref from an array of refs using current index of mapped list
            ref={imageRefs[index]}
            // toggles visability of task list and rotates arrow svg. Index is passed to function to target correct ref
            onClick={() => toggleList(index)}
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
        {/* applies a ref from an listRefs array using current index */}
        <div ref={listRefs[index]}>
          {column.tasks.map((task, index) => {
            return (
              <div key={index} className="ml-15">
                <div className="task-card border-radius-sm background-white mt-20 ">
                  <div className="ml-15 py-15">
                    <h4>{task.title}</h4>
                    <p className="text-grey">
                      {
                        // produces the number of completed tasks
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
