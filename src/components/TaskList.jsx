import arrowDown from "../assets/icon-chevron-down.svg";
import arrowUp from "../assets/icon-chevron-up.svg";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
export default function TaskList(columnsProp) {
  const [visable, setVisable] = useState(true);
  const imageRefs = useRef([]);
  const listRefs = useRef([]);

  for (let i = 0; i < columnsProp.columnsProp.length; i++) {
    imageRefs.current.push(useRef(null));
    listRefs.current.push(useRef(null));
  }
  const toggleList = (index) => {
    return (
      setVisable(!visable),
      visable
        ? (gsap.to(imageRefs.current[index].current, {
            rotation: 180,
            duration: 0.5,
          }),
          gsap.to(listRefs.current[index].current, {
            y: -20,
            opacity: 0,
            duration: 0.5,
          }))
        : (gsap.to(imageRefs.current[index].current, {
            rotation: 0,
            duration: 0.5,
          }),
          gsap.to(listRefs.current[index].current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
          }))
    );
  };
  console.log(imageRefs.current[0].current);
  console.log(listRefs.current[0]);
  return columnsProp.columnsProp.map((column, index) => {
    console.log(imageRefs.current[index].current);
    return (
      <div className="flex-col" key={index}>
        <div className="flex items-center ml-15 mt-5 w-280">
          <img
            ref={imageRefs.current[index]}
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
        <div ref={listRefs.current[index]}>
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
