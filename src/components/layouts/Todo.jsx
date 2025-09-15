import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MdDeleteForever } from "react-icons/md";

import { Checkbox } from "../ui/checkbox";

const Todo = ({
  data,
  isLoading,
  isDeleting,
  handleDeleteTask,
  handleDeleteAll,
  handleUpdateTask,
  handleTaskDetail,
}) => {
  return (
    <>
      {isLoading || isDeleting ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <Table className="overflow-scroll">
          {data?.length === 0 && (
            <TableCaption className="h-10">
              <h1 style={{ textAlign: "center", color: "red" }}>
                No Task Found
              </h1>
            </TableCaption>
          )}

          <TableHeader className="">
            <TableRow className="">
              <TableHead> </TableHead>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Todos</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((task) => (
              <TableRow
                key={task.id}
                className={task.checked ? "line-through" : ""}>
                <TableCell>
                  <Checkbox
                    checked={task.checked}
                    onCheckedChange={(checked) =>
                      handleUpdateTask(task.id, checked)
                    }
                  />
                </TableCell>
                <TableCell
                  className="font-medium text-blue-600 cursor-pointer"
                  onClick={() => handleTaskDetail(task.id)}>
                  {task.id}
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell className="text-right ">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-2xl text-red-600 cursor-pointer hover:text-red-800">
                    <MdDeleteForever />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default Todo;
