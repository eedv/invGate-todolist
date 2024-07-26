import { Button, Group, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { TodoItem } from "../TodoItems/TodoItem";
import { Todo } from "../../types/Todo";
import { FilterControl, FilterControlProps } from "../FilterControl";
import { TodoItemForm } from "../TodoItems/TodoItemForm";
import { useParams } from "react-router-dom";
import { useTodoStore } from "../../store/useTodoStore";
import { ListHeader } from "./ListHeader";

export function TodoList() {
  const { listId } = useParams();
  const { todosByListId, fetchTodos, addTodo, error } = useTodoStore();

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] =
    useState<FilterControlProps["value"]>("incomplete");

  const todos = listId ? todosByListId[listId] : null;

  useEffect(() => {
    if (listId && !todos) {
      fetchTodos(listId);
    }
  }, [listId, fetchTodos, todos]);

  if (error)
    return (
      <Text c="red" fw="bold">
        {error}
      </Text>
    );
  if (!listId) return <Text>La lista seleccionada no existe</Text>;

  const handleCreateItem = (todo: Todo) => {
    if (listId) {
      addTodo(listId, todo);
    }
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

  const filteredList = todos
    ?.filter((item) => {
      return (
        (filter === "completed" && item.completed) ||
        (filter === "incomplete" && !item.completed) ||
        filter === "all"
      );
    })
    .map((item) => (
      <TodoItem key={item.id} todoItem={item} listId={item.todo_listId} />
    ));

  return (
    <Stack>
      <ListHeader listId={listId} />
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
    </Stack>
  );
}
