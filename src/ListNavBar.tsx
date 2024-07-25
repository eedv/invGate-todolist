import {
  ActionIcon,
  AppShellSection,
  Group,
  NavLink,
  ScrollArea,
  Title,
} from "@mantine/core";
import { NavLink as NavLinkRouter } from "react-router-dom";
import { useTodoContext } from "./useTodoContext";
import { IconPlus } from "@tabler/icons-react";

export function ListNavBar() {
  const { lists, addList } = useTodoContext();

  const handleCreateList = () => {
    addList(`Nueva lista ${lists.length + 1}`);
  };

  return (
    <>
      <AppShellSection mb="sm" p="sm">
        <Group justify="space-between">
          <Title order={4}>Mis listas</Title>
          <ActionIcon
            onClick={handleCreateList}
            variant="light"
            size="lg"
            aria-label="add-list"
          >
            <IconPlus />
          </ActionIcon>
        </Group>
      </AppShellSection>
      <AppShellSection component={ScrollArea}>
        {lists.map((list) => (
          <NavLink
            key={list.id}
            component={NavLinkRouter}
            to={`lists/${list.id}`}
            label={list.name}
          />
        ))}
      </AppShellSection>
    </>
  );
}
