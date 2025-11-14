import React, { useState, useEffect, useMemo } from 'react';
import { Container } from '@mui/material';

import axios from 'axios';
import Reuse from './Basic/Reuse';
import { notify, notifyDelete } from './TostNotification';
import TablePopUp from './TablePopUp';
import { lagnamApi } from '../services/api';

interface Lagnam {
  id: number;
  name: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const LagnamList: React.FC = () => {
  const [lagnams, setLagnams] = useState<Lagnam[]>([]);
  const [newLagnam, setNewLagnam] = useState('');
  const [_searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [editLagnamId, setEditLagnamId] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [lagnamToDelete, setLagnamToDelete] = useState<number | null>(null);
  const [, setShowSuccessPopup] = useState(false);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchLagnams();
  }, []);

  const fetchLagnams = async () => {
    const response = await axios.get(`${lagnamApi}`);
    setLagnams(response.data);
  };

  const addOrUpdateLagnam = async () => {
    const lagnamData = { name: newLagnam, admin_user_id: adminUserID, };
    if (!newLagnam?.trim()) {
      notifyDelete('Please provide a Lagnam');
      return;
    }
    if (editLagnamId) {
      let response = await axios.put(
        ` ${lagnamApi}${editLagnamId}/`,
        lagnamData,
      );
      if (response.status >= 200 || response.status <= 201) {
        notify('Successfully updated');
      }
    } else {
      let response = await axios.post(` ${lagnamApi}`, lagnamData);
      if (response.status >= 200 && response.status <= 201) {
        notify('Successfully updated');
      }
    }
    setNewLagnam('');
    setShowPopup(false);
    setEditLagnamId(null);
    fetchLagnams();
    setShowSuccessPopup(true);
  };

  const handleEditLagnam = (lagnam: Lagnam) => {
    setEditLagnamId(lagnam.id);
    setNewLagnam(lagnam.name);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditLagnamId(null);
    setNewLagnam('');

    setShowPopup(false);
  };

  const handleDeleteLagnam = (id: number) => {
    setLagnamToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteLagnam = async () => {
    if (lagnamToDelete !== null) {
      let response = await axios.delete(`${lagnamApi}${lagnamToDelete}/`, {
        data: { admin_user_id: adminUserID }
      });
      if (response.status >= 200 || response.status <= 201) {
        notifyDelete('Successfully Deleted');
      }
      setLagnamToDelete(null);
      setDeleteConfirmation(false);
      fetchLagnams();
    }
  };

  // const cancelDeleteLagnam = () => {
  //   setLagnamToDelete(null);
  //   setDeleteConfirmation(false);
  // };

  const columns: ColumnConfig<Lagnam>[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        sortable: true,
      },
      {
        field: 'name',
        headerName: 'Lagnam',
        sortable: true,
      },
    ],
    [],
  );

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
          data={lagnams}
          columns={columns}
          handleSearchChange={setSearchQuery}
          handleEdit={handleEditLagnam}
          handleDelete={(id) => handleDeleteLagnam(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Lagnam/Didi List"
        />

        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={addOrUpdateLagnam}
          EditId={editLagnamId}
          valueOne={newLagnam}
          setValueOne={setNewLagnam}
          labelOne={'Lagnam'}
          addMsg="Add Lagnam"
          editMsg="Edit Lagnam"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteLagnam}
          deletLabel="Are you sure you want to delete this Lagnam?"
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

export default LagnamList;
