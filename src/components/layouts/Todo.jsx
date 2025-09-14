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
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../../api/taskApiSclice";
import { Checkbox } from "../ui/checkbox";

const Todo = () => {
  // const [checked, setChecked] = useState(false);
  const { data, isLoading, isError, isFetching } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (id, checked) => {
    console.log({ id, checked });
    try {
      await updateTask({ id, checked }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
                <TableCell className="font-medium">{task.id}</TableCell>
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
