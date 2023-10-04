"use client";
import React, { useState } from "react";
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import Icon from "./Icon";
import { Prisma } from "@prisma/client";
import { deleteTodo, toggleTodo, updateTodo } from "../actions";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import { TodoForm } from "../types";

type Props = {
  todo: Prisma.TodoCreateInput;
};

const initialState = {
  message: null,
};

const RemoveButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit">
      <Icon className="text-red-500 " size={18} name={pending ? "loader" : "trash-2"} />
    </button>
  );
};
const Todo = ({ todo }: Props) => {
  const formProps = useForm<TodoForm>({
    defaultValues: {
      content: todo.content,
    },
  });
  const { register, handleSubmit } = formProps;
  const [isEditing, setIsEditing] = useState(false);
  const [toggleState, toggleAction] = useFormState(toggleTodo, initialState);
  const [updateState, updateAction] = useFormState(updateTodo, initialState);
  const [deleteState, deleteAction] = useFormState(deleteTodo, initialState);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  return (
    <li className="shadow-md rounded-lg flex items-center justify-between gap-2 p-4">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => {
          toggleAction({
            id: todo.id,
            done: e.target.checked,
          });
        }}
      />
      {isEditing ? (
        <form
          className="flex-1 ml-1 transition"
          onSubmit={handleSubmit(async (values) => {
            await updateAction({
              id: todo.id,
              content: values.content,
            });
            toggleEditing();
          })}
        >
          <input className="px-2 py-1 border rounded-sm" {...register("content")} />
        </form>
      ) : (
        <p onClick={toggleEditing} className={twMerge("flex-1 ml-1 transition", todo.done && "line-through")}>
          {todo.content}
        </p>
      )}

      <form className="flex items-center" action={deleteAction}>
        <input name="id" type="hidden" defaultValue={todo.id} />
        <RemoveButton />
      </form>

      <p aria-live="polite" className="sr-only" role="status">
        {toggleState?.message}
      </p>

      <p aria-live="polite" className="sr-only" role="status">
        {updateState?.message}
      </p>

      <p aria-live="polite" className="sr-only" role="status">
        {deleteState?.message}
      </p>
    </li>
  );
};

export default Todo;
