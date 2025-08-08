import React from "react";

const EditData = ({ data }) => {
  return (
    <div>
      {data.data.name}
      <button>Edit</button>
    </div>
  );
};

export default EditData;
