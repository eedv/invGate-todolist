import "@mantine/core/styles.css";
import { AppShell, Burger, Group, NavLink, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, NavLink as NavLinkRouter } from "react-router-dom";

export function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={1}>Todo List</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavLink component={NavLinkRouter} to="lists/1" label="lista 1" />
        <NavLink component={NavLinkRouter} to="lists/2" label="lista 2" />
        <NavLink component={NavLinkRouter} to="lists/3" label="lista 3" />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
