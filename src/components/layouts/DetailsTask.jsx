import { useDetailsTaskQuery } from "../../api/taskApiSclice";
import React from "react";

const DetailsTask = ({ id }) => {
  // console.log("ID", id);
  const { data: taskData, isLoading, isError } = useDetailsTaskQuery(id);

  console.log(taskData);

  return (
    <>
      <div className="p-4 border rounded">
        <h2 className="text-lg font-bold">
          Task: {taskData?.title.toUpperCase()}
        </h2>
        <p
          className={
            taskData?.checked
              ? "font-bold text-green-500"
              : "font-bold text-red-500"
          }>
          {taskData?.checked ? "✅ Done" : "❌ Not Done"}
        </p>
      </div>
    </>
  );
};

export default DetailsTask;
