import {
  ActionIcon,
  Checkbox,
  Group,
  Paper,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Todo } from "../../types/Todo";
import { ConfirmModal } from "../ConfirmModal";
import { useTodoContext } from "../../provider/useTodoContext";
import { TodoItemForm } from "./TodoItemForm";

export interface TodoItemProps {
  todoItem: Todo;
  listId: string;
}

export function TodoItem({ todoItem, listId }: TodoItemProps) {
  const { deleteTodo, updateTodo, toggleTodo } = useTodoContext();
  const [showDeleteConfirm, deleteModal] = useDisclosure();
  const [showUpdateForm, updateForm] = useDisclosure();

  const handleUpdate = (todo: Todo) => {
    updateTodo(listId, todo);
    updateForm.close();
  };

  const handleDelete = () => {
    deleteTodo(listId, todoItem.id);
    deleteModal.close();
  };

  if (showUpdateForm) {
    return (
      <TodoItemForm
        submitText="Actualizar"
        onCancel={updateForm.close}
        defaultValues={todoItem}
        onSubmit={handleUpdate}
      />
    );
  }

  return (
    <Paper shadow="sm" p="md" radius="lg">
      <Group wrap="nowrap" justify="space-between">
        <Group>
          <Tooltip
            label={
              todoItem.completed
                ? "Marcar como incompleta"
                : "Marcar como completa"
            }
          >
            <Checkbox
              checked={todoItem.completed}
              size="md"
              onChange={() => toggleTodo(listId, todoItem)}
            />
          </Tooltip>

          <Title order={3} lineClamp={2}>
            {todoItem.title}
          </Title>
        </Group>
        <Group>
          <ActionIcon variant="subtle" onClick={updateForm.open}>
            <IconEdit style={{ width: 24, height: 24 }} />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={deleteModal.open}>
            <IconTrash color="red" style={{ width: 24, height: 24 }} />
          </ActionIcon>
          <ConfirmModal
            opened={showDeleteConfirm}
            onClose={deleteModal.close}
            onConfirm={handleDelete}
            confirmLabel="Eliminar"
            title="Eliminar tarea?"
          />
        </Group>
      </Group>
    </Paper>
  );
}
