import { Button, Group, Modal, Stack } from "@mantine/core";

export interface ConfirmModalProps {
  opened: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
  confirmLabel?: string;
}

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  confirmLabel = "Confirmar",
}: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Crear lista">
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
