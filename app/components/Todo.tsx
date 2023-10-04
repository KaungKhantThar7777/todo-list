"use client";
import React, { useState } from "react";
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import Icon from "./Icon";
import { Prisma } from "@prisma/client";
import { toggleTodo } from "../actions";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import { TodoForm } from "../types";

type Props = {
  todo: Prisma.TodoCreateInput;
};

const initialState = {
  message: null,
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

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  return (
    <li className="flex justify-between gap-2 last-of-type:border-none border-b border-gray-400 p-4">
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
            console.log({ values });
          })}
        >
          <input className="px-2 py-1 border rounded-sm" {...register("content")} />
        </form>
      ) : (
        <p onClick={toggleEditing} className={twMerge("flex-1 ml-1 transition", todo.done && "line-through")}>
          {todo.content}
        </p>
      )}
      <button>
        <Icon className="text-red-500 " size={18} name={"trash-2"} />
      </button>

      <p aria-live="polite" className="sr-only" role="status">
        {toggleState?.message}
      </p>
    </li>
  );
};

export default Todo;
