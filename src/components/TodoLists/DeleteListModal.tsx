import { TodoList } from "../../types/TodoList";
import { ConfirmModal } from "../ConfirmModal";
import { useTodoListStore } from "../../store/useTodoListStore";

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
  const { deleteList } = useTodoListStore();
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
