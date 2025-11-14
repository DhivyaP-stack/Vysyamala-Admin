import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';
import Reuse from './Basic/Reuse';
import { notify, notifyDelete } from './TostNotification';
import TablePopUp from './TablePopUp';
import { fetchRasi } from '../services/api';

interface Rasi {
  id: number;
  name: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const RasiTable: React.FC = () => {
  const [rasis, setRasis] = useState<Rasi[]>([]);
  const [newRasi, setNewRasi] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [editRasiId, setEditRasiId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [rasiToDelete, setRasiToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchRasis();
  }, []);

  const fetchRasis = async () => {
    const response = await axios.get(`${fetchRasi}`);
    setRasis(response.data);
  };

  const addOrUpdateRasi = async () => {
    const rasiData = { name: newRasi, admin_user_id: adminUserID, };
    let response;

    if (editRasiId) {
      response = await axios.put(` ${fetchRasi}${editRasiId}/`, rasiData);
      if (response.status >= 200 && response.status <= 201) {
        notify('Successfully updated');
      }
    } else {
      response = await axios.post(`${fetchRasi}`, rasiData);
      if (response.status >= 200 && response.status <= 201) {
        notify('Successfully added');
      } else {
        notifyDelete('Failed to add Rasi');
      }
    }

    setNewRasi('');
    setShowPopup(false);
    setEditRasiId(null);
    fetchRasis();
  };

  const handleEditRasi = (rasi: Rasi) => {
    setEditRasiId(rasi.id);
    setNewRasi(rasi.name);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditRasiId(null);
    setNewRasi('');
    setShowPopup(false);
  };

  const handleDeleteRasi = (id: number) => {
    setRasiToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteRasi = async () => {
    if (rasiToDelete !== null) {
      const response = await axios.delete(`${fetchRasi}${rasiToDelete}/`, {
      data: { admin_user_id: adminUserID }
    });
      if (response.status >= 200 && response.status <= 299) {
        notifyDelete('Successfully Deleted');
      }
      setRasiToDelete(null);
      setDeleteConfirmation(false);
      fetchRasis();
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredRasis = rasis.filter((rasi) =>
    rasi.name.toLowerCase().includes(searchQuery),
  );

  const columns: ColumnConfig<Rasi>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'Rasi', sortable: true },
  ];

  return (
    <Container
      style={{
        backgroundColor: 'white',
        padding: '20px',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <Reuse
          data={filteredRasis}
          columns={columns}
          handleSearchChange={handleSearchChange}
          handleEdit={handleEditRasi}
          handleDelete={(id) => handleDeleteRasi(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Rasi"
        />

        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={addOrUpdateRasi}
          EditId={editRasiId}
          valueOne={newRasi}
          setValueOne={setNewRasi}
          labelOne="Birth Rasi"
          addMsg="Add Rasi"
          editMsg="Edit Rasi"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteRasi}
          deletLabel="Are you sure you want to delete this Rasi?"
          setValueTwo={function (_value: string): void {
            throw new Error('Function not implemented.');
          }}
          setValueThree={function (_value: string): void {
            throw new Error('Function not implemented.');
          }}
          setValueFour={function (_value: string): void {
            throw new Error('Function not implemented.');
          }}
          valueFour={null}
          labelTwo={''}
          LabelThree={''}
          LabelFour={''}
        />
      </div>
    </Container>
  );
};

export default RasiTable;
