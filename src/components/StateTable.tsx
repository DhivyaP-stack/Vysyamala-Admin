


import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import { addState, deleteState, getStates, updateState } from '../services/api';
interface State {
  id: number;        // or string, depending on your API response
  name: string;
  is_active?: boolean; // Optional field if applicable
}
interface ColumnConfig<T> {
  field: keyof T; // The field must be a key of the generic type T
  headerName: string;
  sortable?: boolean;
  type?: string; // Optional, for different data types
}

const StateTable: React.FC = () => {
  const [state, setState] = useState<State[]>([]);
  const [newStates, setNewStates] = useState<string | null>('');
  const [editStatesId, setEditStatesId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [StatesToDelete, setStatesToDelete] = useState<number | null>(null);
  const toastId = React.useRef<string | number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await getStates();
      setState(response.data);
    } catch (error) {
      console.error('Error fetching States:', error);
    }
  };

  const handleAddOrUpdateStates = async () => {
    try {
      if (editStatesId) {
        await updateState(editStatesId.toString(), { name: newStates!, admin_user_id: adminUserID });
        if (toastId.current === null || !toast.isActive(toastId.current)) {
          toastId.current = toast.success('Successfully updated');
        }
      } else {
        await addState({ name: newStates, admin_user_id: adminUserID });
        if (toastId.current === null || !toast.isActive(toastId.current)) {
          toastId.current = toast.success('States Added Successfully');
        }
      }
      setNewStates('');
      setEditStatesId(null);
      setShowPopup(false);
      fetchStates(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating States:', error);
    }
  };

  const handleDeleteStates = async (id: number) => {
    try {
      await deleteState(id.toString());
      if (toastId.current === null || !toast.isActive(toastId.current)) {
        toastId.current = toast.error('Successfully Deleted');
      }
      fetchStates(); // Refresh the list
    } catch (error) {
      console.error('Error deleting States:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setStatesToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (StatesToDelete !== null) {
      await handleDeleteStates(StatesToDelete);
      setStatesToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: State) => {
    setEditStatesId(value.id);
    setNewStates(value.name);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditStatesId(null);
    setNewStates('');
    setShowPopup(false);
  };
  const columns: ColumnConfig<State>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'States Name', sortable: true },
    { field: 'is_active', headerName: 'Active', sortable: true, type: 'boolean' },
  ];


  return (
    <Container style={{ backgroundColor: 'white', padding: '20px', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <Reuse
          data={state}
          columns={columns}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="States" handleSearchChange={function (_query: string): void {
            throw new Error('Function not implemented.');
          }} />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateStates}
          EditId={editStatesId}
          valueOne={newStates}
          setValueOne={setNewStates}
          labelOne="States Name"
          addMsg="Add States"
          editMsg="Edit States"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this States?" setValueTwo={function (_value: string): void {
            throw new Error('Function not implemented.');
          }} setValueThree={function (_value: string): void {
            throw new Error('Function not implemented.');
          }} setValueFour={function (_value: string): void {
            throw new Error('Function not implemented.');
          }} valueFour={null} labelTwo={''} LabelThree={''} LabelFour={''} />
      </div>

    </Container>
  );
};

export default StateTable;
