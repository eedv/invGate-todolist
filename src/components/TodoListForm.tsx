import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "../utils/getErrorMessages";

export interface CreateListModalProps {
  onCancel: VoidFunction;
  onSubmit: ({ name }: { name: string }) => void;
  defaultValues?: { name: string };
  submitText: string;
}

export function TodoListForm({
  onCancel,
  onSubmit,
  defaultValues = { name: "Nueva lista" },
  submitText,
}: CreateListModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("name", { required: true, minLength: 3 })}
        label="Nombre"
        data-autofocus
        error={errors.name && getErrorMessage(errors.name)}
      />
      <Group gap="md" justify="end" mt="md">
        <Button type="button" variant="light" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{submitText}</Button>
      </Group>
    </Stack>
  );
}
