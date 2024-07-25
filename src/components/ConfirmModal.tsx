import { Button, Group, Modal, Stack } from "@mantine/core";

export interface ConfirmModalProps {
  opened: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  confirmLabel?: string;
  title: string;
}

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  confirmLabel = "Confirmar",
  title,
}: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <Stack>
        <Group gap="md" justify="end" mt="md">
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="red" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
