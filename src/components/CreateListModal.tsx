import { Modal } from "@mantine/core";
import { TodoListForm } from "./TodoListForm";

export interface CreateListModalProps {
  opened: boolean;
  onClose: VoidFunction;
  onCreate: ({ name }: { name: string }) => void;
  defaultValues?: { name: string };
}

export function CreateListModal({
  opened,
  onClose,
  onCreate,
}: CreateListModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Crear lista">
      <TodoListForm onCancel={onClose} onSubmit={onCreate} submitText="Crear" />
    </Modal>
  );
}
