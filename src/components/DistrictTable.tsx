

import React, { useEffect, useState } from 'react';
import { Container, Select, MenuItem, FormControl, InputLabel, } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reuse from './Basic/Reuse'; // Assuming this is the reusable table component
import TablePopUpDropDown from './TablePopupDropDown';
import { addDistrict, deleteDistrict, getDistricts, getStates, updateDistrict } from '../services/api';


interface District {
  state: number;
  id: number;
  name: string;
  is_active?: boolean;
  // ... other fields
  actions?: string;  // Custom field to represent actions
}

interface State {
  id: number;
  name: string;
}

interface ColumnConfig<T> {
  field: keyof T | 'actions';  // Allow 'actions' as a valid field
  headerName: string;
  sortable?: boolean;
}

const DistrictTable: React.FC = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [newDistrictName, setNewDistrictName] = useState<string>('');
  const [newStateId, setNewStateId] = useState<number | null>(null);
  const [editDistrictId, setEditDistrictId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [StatesToDelete, setStatesToDelete] = useState<number | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchDistricts();
    fetchStates();
  }, []);

  useEffect(() => {
    // Filter districts based on selected state
    if (newStateId) {
      const filtered = districts.filter((district) => district.state === newStateId);
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts(districts); // If no state is selected, show all districts
    }
  }, [newStateId, districts]);

  const fetchDistricts = async () => {
    try {
      const response = await getDistricts();
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching Districts:', error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await getStates();
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching States:', error);
    }
  };

  const handleAddOrUpdateDistricts = async () => {
    try {
      const formData = {
        name: newDistrictName,
        state: newStateId, // Include state in both add and update
        admin_user_id: adminUserID
      };

      if (editDistrictId) {
        await updateDistrict(editDistrictId.toString(), formData);
        toast.success('Successfully updated');
      } else {
        await addDistrict(formData);
        toast.success('District Added Successfully');
      }

      // Reset form
      setNewDistrictName('');
      setNewStateId(null);
      setEditDistrictId(null);
      setShowPopup(false);
      fetchDistricts(); // Refresh the district list
    } catch (error) {
      console.error('Error adding/updating Districts:', error);
      toast.error('Error occurred while adding/updating Districts');
    }
  };


  const handleDeleteDistricts = async (id: number) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(`Are you sure you want to delete this district?`);

    if (confirmDelete) {
      try {
        await deleteDistrict(id.toString());
        toast.success('Successfully Deleted');
        fetchDistricts(); // Refresh the district list
      } catch (error) {
        console.error('Error deleting District:', error);
        toast.error('Error occurred while deleting District');
      }
    } else {
      // Optionally, you can show a cancellation message
      toast.info('Deletion canceled');
    }
  };


  const handleEditType = (value: District) => {
    setEditDistrictId(value.id);
    setNewDistrictName(value.name);
    setNewStateId(value.state);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditDistrictId(null);
    setNewDistrictName('');
    setNewStateId(null);
    setShowPopup(false);
  };


  const confirmDeleteType = async () => {
    if (StatesToDelete !== null) {
      await handleDeleteDistricts(StatesToDelete);
      setStatesToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const columns: ColumnConfig<District>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'Name', sortable: true },
    { field: 'is_active', headerName: 'Active' }  // Custom actions column
  ];

  return (
    <Container style={{ backgroundColor: 'white', padding: '20px', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        {/* State Dropdown to filter districts */}


        <Reuse
          states={states}
          newStateId={newStateId}
          setNewStateId={setNewStateId}
          data={filteredDistricts} // Display filtered districts
          columns={columns}
          handleEdit={handleEditType}
          handleDelete={handleDeleteDistricts}
          setShowPopup={setShowPopup}
          idField="id"
          title="Districts"
          handleSearchChange={(_query) => { /* handle search if needed */ }}
        />

        <TablePopUpDropDown
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateDistricts}
          EditId={editDistrictId}
          valueOne={newDistrictName}
          setValueOne={setNewDistrictName}
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          labelOne="District Name"
          valueTwo={newStateId ? newStateId.toString() : ''}
          setValueTwo={(value) => setNewStateId(Number(value))}
          deletLabel="Are you sure you want to delete this state?"
          labelTwo="State"
          states={states}
          addMsg="Add District"
          editMsg="Edit District"
        />
      </div>
    </Container>
  );
};

export default DistrictTable;
