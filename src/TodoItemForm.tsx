import {
  Button,
  Group,
  Paper,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { FieldError, FieldErrors, useForm } from "react-hook-form";
import { TodoItem } from "./types/TodoItem";

export interface TodoItemFormProps {
  onSubmit: (todoItem: TodoItem) => void;
  onCancel: VoidFunction;
}

export function TodoItemForm({ onSubmit, onCancel }: TodoItemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 1,
      completed: false,
      title: "nombre",
      description: "",
    },
  });

  const getErrorMessage = (error: FieldError) => {
    if (error.type === "minLength") {
      return "El campo debe tener al menos 3 caracteres";
    }
    if (error.type === "required") {
      return "El campo no puede estar en blanco";
    }
    if (error.type === "required") {
      return "El campo supera los 256 caracteres permitidos";
    }
  };
  console.log(errors);
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
          <Button type="submit">Crear</Button>
        </Group>
      </Stack>
    </Paper>
  );
}
