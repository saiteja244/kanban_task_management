import React from "react";

const Tooltip = ({ val, handleEdit, handleDelete }) => {
  return (
    <div className="tooltip-container">
      <button type="button" className="tooltip-btn">
        Edit {val}
      </button>
      <button type="button" className="tooltip-btn">
        Delete {val}
      </button>
    </div>
  );
};

export default Tooltip;
