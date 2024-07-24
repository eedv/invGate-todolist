import { Button, Group, Stack } from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { TodoItem } from "./TodoItem";
import { TodoItem as TodoItemType } from "./types/TodoItem";
import { FilterControl, FilterControlProps } from "./FilterControl";
import { TodoItemForm } from "./TodoItemForm";

export function TodoList() {
  const [showForm, setShowForm] = useState(false);
  const [itemList, setItemList] = useState<TodoItemType[]>([]);
  const [filter, setFilter] =
    useState<FilterControlProps["value"]>("incomplete");

  const handleCreateItem = (itemValues: TodoItemType) => {
    setItemList((oldList) => [
      ...oldList,
      {
        ...itemValues,
        id: oldList.length + 1,
      },
    ]);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  const handleStatusChange =
    (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setItemList((oldList) => {
        return oldList.map((item) =>
          item.id === id ? { ...item, completed: e.target.checked } : item
        );
      });
    };

  const handleFilterChange = (value: string) => {
    setFilter(value as FilterControlProps["value"]);
  };

  const filteredList = itemList
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
