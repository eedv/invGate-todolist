import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "../types/Todo";
import { FilterControl, FilterControlProps } from "./FilterControl";
import { TodoItemForm } from "./TodoItemForm";
import { useParams } from "react-router-dom";
import { useTodoContext } from "../useTodoContext";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { UpdateListModal } from "./UpdateListModal";
import { DeleteListModal } from "./DeleteListModal";

export function TodoList() {
  const { listId } = useParams();
  const { lists, addTodo } = useTodoContext();
  const [showDeletModal, deleteModal] = useDisclosure();
  const [showUpdateModal, updateModal] = useDisclosure();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] =
    useState<FilterControlProps["value"]>("incomplete");

  const list = lists.find((l) => l.id === Number(listId));

  if (!list) return <Text>La lista seleccionada no existe</Text>;

  const handleCreateItem = (itemValues: Todo) => {
    addTodo(list.id, itemValues.title);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value as FilterControlProps["value"]);
  };

  const filteredList = list.todos
    .filter((item) => {
      return (
        (filter === "completed" && item.completed) ||
        (filter === "incomplete" && !item.completed) ||
        filter === "all"
      );
    })
    .map((item) => <TodoItem key={item.id} todoItem={item} listId={list.id} />);

  return (
    <Stack>
      <Group justify="space-between" preventGrowOverflow={false}>
        <Title order={3} lineClamp={1}>
          {list.name}
        </Title>
        <Group wrap="nowrap">
          <Button
            onClick={updateModal.open}
            leftSection={<IconEdit size={20} />}
          >
            Editar lista
          </Button>
          <Button
            onClick={deleteModal.open}
            color="red"
            leftSection={<IconTrash size={20} />}
          >
            Eliminar lista
          </Button>
        </Group>
      </Group>
      <Group>
        <Button onClick={handleShowForm} disabled={showForm}>
          Agregar tarea
        </Button>
        <FilterControl onChange={handleFilterChange} value={filter} />
      </Group>
      {filteredList}
      {showForm && (
        <TodoItemForm
          onSubmit={handleCreateItem}
          onCancel={handleHideForm}
          submitText="Crear"
        />
      )}
      <DeleteListModal
        opened={showDeletModal}
        onClose={deleteModal.close}
        todoList={list}
      />
      <UpdateListModal
        opened={showUpdateModal}
        onClose={updateModal.close}
        todoList={list}
      />
    </Stack>
  );
}
