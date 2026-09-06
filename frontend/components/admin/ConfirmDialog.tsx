'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title = 'Confirm deletion',
  message = 'This action cannot be undone. Are you sure?',
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await onConfirm();
    } finally {
      setConfirming(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-sm leading-relaxed text-slate-600">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={confirming}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={confirming}
          className="bg-red-600 hover:bg-red-700"
        >
          {confirming ? 'Deleting…' : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
}