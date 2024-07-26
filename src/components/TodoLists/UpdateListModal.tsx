import { Modal } from "@mantine/core";
import { TodoListForm } from "./TodoListForm";
import { TodoList } from "../../types/TodoList";
import { useTodoContext } from "../../useTodoContext";

export interface UpdateListModalProps {
  opened: boolean;
  onClose: VoidFunction;
  todoList: TodoList;
}

export function UpdateListModal({
  opened,
  onClose,
  todoList,
}: UpdateListModalProps) {
  const { updateList } = useTodoContext();
  const handleUpdateList = ({ name }: { name: string }) => {
    updateList(todoList.id, name);
    onClose();
  };
  return (
    <Modal opened={opened} onClose={onClose} title="Actualizar lista">
      <TodoListForm
        onCancel={onClose}
        onSubmit={handleUpdateList}
        submitText="Actualizar"
        defaultValues={todoList}
      />
    </Modal>
  );
}
