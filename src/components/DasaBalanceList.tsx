

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Reuse from './Basic/Reuse';
import Notification, { notify, notifyDelete } from './TostNotification';
import { dasaBalanCeApi } from '../services/api';


interface DasaBalance {
  id: number;
  balance: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const DasaBalanceList: React.FC = () => {
  const [dasaBalances, setDasaBalances] = useState<DasaBalance[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newDasaBalance, setNewDasaBalance] = useState('');
  const [editDasaBalanceId, setEditDasaBalanceId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [balanceToDelete, setBalanceToDelete] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchDasaBalances();
  }, []);

  const fetchDasaBalances = async () => {
    try {
      const response = await axios.get(`${dasaBalanCeApi}`);
      setDasaBalances(response.data);
    } catch (error) {
      console.error('Error fetching dasa balances:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      let response = await axios.delete(` ${dasaBalanCeApi}${id}/`, {
        data: { admin_user_id: adminUserID }
      });
      if (response.status >= 200 || response.status <= 201) {
        notifyDelete('Successfully Deleted');
        fetchDasaBalances();
      }
      fetchDasaBalances();
    } catch (error) {
      console.error('Error deleting dasa balance:', error);
    }
  };

  const handleAddOrUpdateDasaBalance = async () => {
    const balanceData = { balance: newDasaBalance ,  admin_user_id: adminUserID,};

    if (editDasaBalanceId) {
      let response = await axios.put(` ${dasaBalanCeApi}${editDasaBalanceId}/`, balanceData);
      if (response.status >= 200 || response.status <= 201) {
        notify('Successfully updated');
      }
    } else {
      let response = await axios.post(`${dasaBalanCeApi}`, balanceData);
      if (response.status >= 200 || response.status <= 201) {
        notify('Successfully updated');
      }
    }
    setNewDasaBalance('');
    setEditDasaBalanceId(null);
    setShowPopup(false);
    fetchDasaBalances();
  };

  const handleEdit = (item: DasaBalance) => {
    setEditDasaBalanceId(item.id);
    setNewDasaBalance(item.balance);
    setShowPopup(true);
  };

  const handleDeleteConfirm = (id: number) => {
    setBalanceToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (balanceToDelete !== null) {
      await handleDelete(balanceToDelete);
      setBalanceToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleSearchChange = (query: string) => {
    // This is handled within Reuse, so you don't need to do anything here
  };

  const columns: ColumnConfig<DasaBalance>[] = [
    { field: 'balance', headerName: 'Dasa Balance', sortable: true },
  ];

  return (
    <Container style={{ backgroundColor: 'white', padding: '20px' }}>


      <Reuse
        data={dasaBalances}
        columns={columns}
        handleSearchChange={handleSearchChange}
        handleEdit={handleEdit}
        handleDelete={(id) => handleDeleteConfirm(Number(id))}
        setShowPopup={setShowPopup}
        idField="id"
        title="Dasa Balance"
      />

      {/* <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
        <DialogTitle>{editDasaBalanceId ? 'Edit Dasa Balance' : 'Add Dasa Balance'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Dasa Balance"
            value={newDasaBalance}
            onChange={(e) => setNewDasaBalance(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPopup(false)}>Cancel</Button>
          <Button onClick={handleAddOrUpdateDasaBalance} disabled={!newDasaBalance.trim()}>
            {editDasaBalanceId ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog> */}
      {showPopup && (
        <Dialog
          open={showPopup}
          onClose={() => setShowPopup(false)}
          maxWidth="sm"
          sx={{ background: '#f5f0ef ' }}
        >
          <Box>
            <DialogTitle
              style={{
                color: 'red',
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: '20px',
                fontSize: '50px',
              }}
            >
              {editDasaBalanceId ? 'Edit Rasi' : 'Add Rasi'}
            </DialogTitle>
          </Box>
          <DialogContent style={{ padding: '50px 50px' }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Dasa Balance"
                  value={newDasaBalance}
                  onChange={(e) => setNewDasaBalance(e.target.value)}
                  fullWidth
                />
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions style={{ marginRight: '43px' }}>
            <Button
              style={{
                background: '#FFFDFF',
                color: 'red',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: 'red',
                color: 'white',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
              }}
              onClick={handleAddOrUpdateDasaBalance} disabled={!newDasaBalance.trim()}
            >
              {editDasaBalanceId ? 'Update' : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* <Dialog open={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this Dasa Balance?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}

      {deleteConfirmation && (
        <Dialog
          open={deleteConfirmation}
          onClose={() => setDeleteConfirmation(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this Rasi?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Notification />
    </Container>
  );
};

export default DasaBalanceList;

