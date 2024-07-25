import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "../utils/getErrorMessages";

export interface CreateListModalProps {
  opened: boolean;
  onClose: VoidFunction;
  onCreate: ({ name }: { name: string }) => void;
}

export function CreateListModal({
  opened,
  onClose,
  onCreate,
}: CreateListModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Nueva lista",
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Crear lista">
      <Stack component="form" onSubmit={handleSubmit(onCreate)}>
        <TextInput
          {...register("name", { required: true, minLength: 3 })}
          label="Nombre"
          data-autofocus
          error={errors.name && getErrorMessage(errors.name)}
        />
        <Group gap="md" justify="end" mt="md">
          <Button type="button" variant="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Crear</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
