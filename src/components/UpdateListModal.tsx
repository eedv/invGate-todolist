import { Modal } from "@mantine/core";
import { TodoListForm } from "./TodoListForm";
import { TodoList } from "../types/TodoList";

export interface UpdateListModalProps {
  opened: boolean;
  onClose: VoidFunction;
  onUpdate: ({ name }: { name: string }) => void;
  defaultValues?: { name: string };
  todoList: TodoList;
}

export function UpdateListModal({
  opened,
  onClose,
  onUpdate,
  todoList,
}: UpdateListModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Actualizar lista">
      <TodoListForm
        onCancel={onClose}
        onSubmit={onUpdate}
        submitText="Actualizar"
        defaultValues={todoList}
      />
    </Modal>
  );
}
