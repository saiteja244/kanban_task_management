import React, { useState } from "react";
import { ReactComponent as EllipsisIcon } from "../../assets/svgs/icon-vertical-ellipsis.svg";
import SubTask from "../SubTask/SubTask";
import Status from "../Status/Status";
import {
  findParentColumnData,
  findNestedObject,
  modifyNestedObject,
} from "../../utils/helpers";
import { UseBoardContext } from "../../context/BoardContext";
import { UseModalContext } from "../../context/ModalContext";

const TaskDetail = () => {
  const { boardData, setBoardData } = UseBoardContext();
  const [modalData, setModalData] = UseModalContext();

  const {
    modalContent: { title, description, subtasks, status, id, columnName },
  } = modalData;

  const parentColumnData = findParentColumnData(
    boardData.activeBoard,
    columnName
  );

  const [taskInfo, setTaskInfo] = useState({
    parentColumnId: parentColumnData.columnID,
    status: status || parentColumnData.columnStatus,
    id: id,
    title: title,
    description: description,
    subtasks: subtasks,
    options: boardData.activeBoard.columns.reduce((arr, column) => {
      if (!arr.includes(column.name)) {
        arr.push(column.name);
      }
      return arr;
    }, []),
    statusActive: false,
  });

  const handleCheckboxChange = (taskID) => {
    const subtaskToModify = findNestedObject(boardData.boardCollection, taskID);

    setTaskInfo((prevData) => {
      const updatedObject = modifyNestedObject(prevData, taskID, undefined, {
        isCompleted: !subtaskToModify.isCompleted,
      });

      return updatedObject;
    });

    setBoardData((prevData) => {
      const updatedObject = modifyNestedObject(
        prevData.boardCollection,
        taskID,
        undefined,
        {
          isCompleted: !subtaskToModify.isCompleted,
        }
      );

      const updatedActiveBoard = modifyNestedObject(
        prevData.activeBoard,
        taskID,
        undefined,
        { isCompleted: !subtaskToModify.isCompleted }
      );

      return {
        ...prevData,
        activeBoard: updatedActiveBoard,
        boardCollection: updatedObject,
      };
    });
  };

  return (
    <aside className="modal pr-7 pl-7 pb-5 pt-5">
      <div className="modal-header">
        <h5 className="pr-2">{taskInfo.title}</h5>
        <EllipsisIcon />
      </div>
      <div className="modal-content">
        <p>{taskInfo.description ? taskInfo.description : "No Description"}</p>
      </div>
      <div className="subtask-list">
        <h5>
          Subtasks (
          {taskInfo.subtasks.filter((task) => task.isCompleted).length} of{" "}
          {subtasks.length} )
        </h5>
        {taskInfo.subtasks &&
          taskInfo.subtasks.map((subtask) => {
            const { id, title, isCompleted } = subtask;
            return (
              <SubTask
                key={id}
                id={id}
                taskDescription={title}
                isCompleted={isCompleted}
                handleCheckboxChange={handleCheckboxChange}
              />
            );
          })}
      </div>
      <div>
        <Status options={taskInfo.options} activeStatus={taskInfo.status} />
      </div>
    </aside>
  );
};

export default TaskDetail;
