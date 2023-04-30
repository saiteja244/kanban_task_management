import React, { useState } from "react";
import { ReactComponent as EllipsisIcon } from "../../assets/svgs/icon-vertical-ellipsis.svg";
import SubTask from "../SubTask/SubTask";
import {
  findParentColumnId,
  findNestedObject,
  modifyNestedObject,
} from "../../utils/helpers";
import { UseBoardContext } from "../../context/BoardContext";
import { UseModalContext } from "../../context/ModalContext";

const TaskDetail = () => {
  const { boardData, setBoardData } = UseBoardContext();
  const [modalData, setModalData] = UseModalContext();
  console.log(boardData);

  const {
    modalContent: { title, description, subtasks, status, id },
  } = modalData;

  const [taskInfo, setTaskInfo] = useState({
    parentColumnId: findParentColumnId(boardData.activeBoard, status),
    status: status,
    id: id,
    title: title,
    description: description,
    subtasks: subtasks,
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
    </aside>
  );
};

export default TaskDetail;
