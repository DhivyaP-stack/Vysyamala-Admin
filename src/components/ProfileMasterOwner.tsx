
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { notify, notifyDelete } from './TostNotification';
import TablePopUp from './TablePopUp';

import Reuse from './Basic/Reuse';
import { addProfileOwner, deleteProfileOwner, getProfileOwner, updateProfileOwner } from '../services/api';

interface Mode {
  mode: number;
  mode_name: string;
  is_deleted: boolean;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const ModesTable: React.FC = () => {
  const [modes, setModes] = useState<Mode[]>([]);
  const [newModeName, setNewModeName] = useState<string>('');
  const [editModeId, setEditModeId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [modeToDelete, setModeToDelete] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchModes();
  }, []);

  const fetchModes = async () => {
    try {
      const response = await getProfileOwner();
      setModes(response.data);
    } catch (error) {
      console.error('Error fetching modes:', error);
    }
  };

  const notifyUser = (message: string, success: boolean) => {
    if (success) {
      notify(message);
    } else {
      notifyDelete(message);
    }
  };

  const handleAddOrUpdateMode = async () => {
    try {
      if (editModeId) {
        await updateProfileOwner(editModeId.toString(), { mode_name: newModeName.trim(), admin_user_id: adminUserID });
        notifyUser('Successfully updated', true);
      } else {
        if (newModeName && newModeName.trim()) {
          await addProfileOwner({ mode_name: newModeName.trim() , admin_user_id: adminUserID});
          notifyUser('Mode Added Successfully', true);
        } else {
          notifyUser('Please provide the mode name', false);
          return; // Early return to prevent further execution
        }
      }

      setNewModeName('');
      setEditModeId(null);
      setShowPopup(false);
      fetchModes(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating mode:', error);
      notifyUser('An error occurred while saving the mode', false);
    }
  };

  const handleDeleteMode = async (id: number) => {
    try {
      await deleteProfileOwner(id.toString());
      notifyUser('Successfully Deleted', true);
      fetchModes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting mode:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setModeToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (modeToDelete !== null) {
      await handleDeleteMode(modeToDelete);
      setModeToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: Mode) => {
    setEditModeId(value.mode);
    setNewModeName(value.mode_name);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditModeId(null);
    setNewModeName('');
    setShowPopup(false);
    setDeleteConfirmation(false); // Reset delete confirmation
  };

  const columns: ColumnConfig<Mode>[] = [
    { field: 'mode', headerName: 'ID', sortable: true },
    { field: 'mode_name', headerName: 'Mode Name', sortable: true },
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
          data={modes}
          columns={columns}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="mode"
          title="On behalf of"
          handleSearchChange={() => { }}
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateMode}
          EditId={editModeId}
          valueOne={newModeName}
          setValueOne={setNewModeName}
          valueTwo={null}
          setValueTwo={() => { }}
          labelOne="On behalf of"
          labelTwo=""
          addMsg="Add Mode"
          editMsg="Edit Mode"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this mode?"
          setValueThree={() => { }}
          valueThree={null}
          setValueFour={() => { }}
          valueFour={null}
          LabelThree=""
          LabelFour=""
        />
      </div>

    </Container>
  );
};

export default ModesTable;
