import { TodoList } from "../types/TodoList";
import { useTodoContext } from "../useTodoContext";
import { ConfirmModal } from "./ConfirmModal";

export interface DeleteListModalProps {
  opened: boolean;
  onClose: VoidFunction;
  todoList: TodoList;
}

export function DeleteListModal({
  opened,
  onClose,
  todoList,
}: DeleteListModalProps) {
  const { deleteList } = useTodoContext();
  const handleDeletList = () => {
    deleteList(todoList.id);
    onClose();
  };
  return (
    <ConfirmModal
      title="Eliminar lista?"
      opened={opened}
      onClose={onClose}
      onConfirm={handleDeletList}
    />
  );
}
