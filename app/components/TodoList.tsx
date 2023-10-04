import { Prisma } from "@prisma/client";
import React from "react";
import Todo from "./Todo";

type Props = {
  todos: Prisma.TodoCreateInput[];
};
const TodoList = ({ todos }: Props) => {
  return (
    <ol className="mt-4 flex flex-col ">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ol>
  );
};

export default TodoList;
