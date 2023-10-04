import { Prisma } from "@prisma/client";
import React from "react";

type Props = {
  todos: Prisma.TodoCreateInput[];
};
const TodoList = ({ todos }: Props) => {
  return (
    <ol className="mt-4">
      {todos.map(({ id, content, createdAt, done, updatedAt }) => (
        <li key={id}>{content}</li>
      ))}
    </ol>
  );
};

export default TodoList;
