import { Checkbox, Group, Paper, Title } from "@mantine/core";
import { TodoItem as TodoItemType } from "./types/TodoItem";
import { ChangeEvent } from "react";

export interface TodoItemProps {
  todoItem: TodoItemType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function TodoItem({ todoItem, onChange }: TodoItemProps) {
  return (
    <Paper shadow="sm" p="xl" radius="lg">
      <Group wrap="nowrap">
        <Checkbox checked={todoItem.completed} size="md" onChange={onChange} />
        <Title order={3} lineClamp={2}>
          {todoItem.title}
        </Title>
      </Group>
    </Paper>
  );
}
