import {
  Button,
  Group,
  Paper,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { Todo } from "../../types/Todo";
import { getErrorMessage } from "../../utils/getErrorMessages";
import { useEffect } from "react";

export interface TodoItemFormProps {
  onSubmit: (todoItem: Todo) => void;
  onCancel: VoidFunction;
  submitText: string;
  defaultValues?: Todo;
}

const defaultItem = {
  id: "1",
  todo_listId: "1",
  completed: false,
  title: "nombre",
  description: "",
};

export function TodoItemForm({
  onSubmit,
  onCancel,
  submitText,
  defaultValues = defaultItem,
}: TodoItemFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Paper shadow="sm" p="lg" radius="lg">
      <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("title", { required: true, minLength: 3 })}
          label="Nombre de la tarea"
          required
          error={errors.title && getErrorMessage(errors.title)}
        />
        <Textarea
          {...register("description", { maxLength: 256 })}
          label="Descripción"
          error={errors.description && getErrorMessage(errors.description)}
        />
        <Group justify="end">
          <Button onClick={onCancel} variant="outline">
            Cancelar
          </Button>
          <Button type="submit">{submitText}</Button>
        </Group>
      </Stack>
    </Paper>
  );
}
