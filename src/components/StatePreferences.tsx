import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import {
  getStatePrefs,
  updateStatePref,
  deleteStatePref,
  addStatePref,
} from '../services/api';
import { toast } from 'react-toastify';

interface StatePref {
  id: number;
  state: string;
  is_deleted: boolean;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const StatePreferences: React.FC = () => {
  const [statePrefs, setStatePrefs] = useState<StatePref[]>([]);
  const [newState, setNewState] = useState<string | null>('');
  const [editStateId, setEditStateId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [stateToDelete, setStateToDelete] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchStatePrefs();
  }, []);

  const fetchStatePrefs = async () => {
    try {
      const response = await getStatePrefs();
      setStatePrefs(response.data.map((item: {
        is_deleted: any; id: number; state: string
      }) => ({
        id: item.id,
        state: item.state,
        is_deleted: item.is_deleted,
      })));
    } catch (error) {
      console.error('Error fetching state preferences:', error);
    }
  };

  const handleAddOrUpdateState = async () => {
    if (!newState?.trim()) {
      if (!toast.isActive('empty-state-toast')) {
        toast.error('Please provide a State', { toastId: 'empty-state-toast' });
      }
      return;
    }
    try {
      if (editStateId) {
        await updateStatePref(editStateId.toString(), { state: newState!, admin_user_id: adminUserID });
        notify('Successfully updated');
      } else {
        if (newState) {
          await addStatePref({ state: newState });
          notify('State Added Successfully');
        } else {
          notifyDelete('Please submit all required fields');
        }
      }
      setNewState('');
      setEditStateId(null);
      setShowPopup(false);
      fetchStatePrefs(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating state:', error);
    }
  };

  const handleDeleteState = async (id: number) => {
    try {
      await deleteStatePref(id.toString());
      notifyDelete('Successfully Deleted');
      fetchStatePrefs(); // Refresh the list
    } catch (error) {
      console.error('Error deleting state:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setStateToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (stateToDelete !== null) {
      await handleDeleteState(stateToDelete);
      setStateToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: StatePref) => {
    setEditStateId(value.id);
    setNewState(value.state);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditStateId(null);
    setNewState('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<StatePref>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'state', headerName: 'State', sortable: true },
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
          data={statePrefs}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="State Preferences"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateState}
          EditId={editStateId}
          valueOne={newState}
          setValueOne={setNewState}
          labelOne="State"
          addMsg="Add State"
          editMsg="Edit State"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this state?"
          setValueTwo={() => { }}
          valueTwo={null}
          setValueThree={() => { }}
          valueThree={null}
          setValueFour={() => { }}
          valueFour={null}
          labelTwo=""
          LabelThree=""
          LabelFour=""
        />
      </div>

    </Container>
  );
};

export default StatePreferences;
