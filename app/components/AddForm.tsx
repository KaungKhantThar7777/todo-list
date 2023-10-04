"use client";
import React from "react";
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { createTodo } from "../actions";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { TodoForm } from "../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFormSchema } from "../schema";

const initialState = {
  message: null,
};

const SubmitButton = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <button
      disabled={isSubmitting}
      aria-disabled={isSubmitting}
      className="bg-blue-700 text-white px-4 py-2 rounded-md mt-2   transition-all disabled:text-black disabled:bg-slate-400"
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};

const AddForm = () => {
  const formProps = useForm<TodoForm>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(addFormSchema),
  });
  const { register, handleSubmit, reset } = formProps;
  const [state, formAction] = useFormState(createTodo, initialState);

  return (
    <FormProvider {...formProps}>
      <form
        onSubmit={handleSubmit(async (data) => {
          await formAction(data);
          reset();
        })}
      >
        <fieldset className="flex flex-col ">
          <label className="font-bold text-3xl mb-1" htmlFor="content">
            Add a todo
          </label>

          <input className="px-4 py-2 border rounded-sm" id="content" {...register("content")} />
        </fieldset>
        <SubmitButton />

        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </FormProvider>
  );
};

export default AddForm;
