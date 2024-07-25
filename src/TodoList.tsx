import { Button, Group, Stack, Text } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { TodoItem } from "./TodoItem";
import { Todo } from "./types/Todo";
import { FilterControl, FilterControlProps } from "./FilterControl";
import { TodoItemForm } from "./TodoItemForm";
import { useParams } from "react-router-dom";
import { useTodoContext } from "./useTodoContext";

export function TodoList() {
  const { listId } = useParams();
  const { lists, addTodo, toggleTodo } = useTodoContext();
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

  const handleStatusChange =
    (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
      toggleTodo(list.id, id);
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
    .map((item) => (
      <TodoItem
        key={item.id}
        todoItem={item}
        onChange={handleStatusChange(item.id)}
      />
    ));

  return (
    <Stack>
      <Group>
        <Button onClick={handleShowForm} disabled={showForm}>
          Agregar
        </Button>
        <FilterControl onChange={handleFilterChange} value={filter} />
      </Group>
      {filteredList}
      {showForm && (
        <TodoItemForm onSubmit={handleCreateItem} onCancel={handleHideForm} />
      )}
    </Stack>
  );
}
