import React from 'react';
import { Button, Card, CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface DeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationProps> = ({ open, onClose, onConfirm, itemName }) => {
  return (
    <Card sx={{ maxWidth: 100 }}>
    <CardActionArea>
    <Dialog open={open} onClose={onClose}  sx={{ '& .MuiDialog-paper': { minWidth: '500px', maxWidth: '600px' } }} >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText >
          Are you sure you want to delete <strong>{itemName}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </CardActionArea>
    </Card>
  );
};

export default DeleteConfirmationDialog;
