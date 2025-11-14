

import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import { getCountries, updateCountry, deleteCountry, addCountry } from '../services/api';
interface Country {
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

const CountryTable: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCountry, setNewCountry] = useState<string | null>('');
  const [editCountryId, setEditCountryId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [countryToDelete, setCountryToDelete] = useState<number | null>(null);
  const toastId = React.useRef<string | number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleAddOrUpdateCountry = async () => {


    try {

      if (editCountryId) {
        await updateCountry(editCountryId.toString(), { name: newCountry!, admin_user_id: adminUserID });
        if (toastId.current === null || !toast.isActive(toastId.current)) {
          toastId.current = toast.success('Successfully updated');
        }
      } else {
        await addCountry({ name: newCountry, admin_user_id: adminUserID });
        if (toastId.current === null || !toast.isActive(toastId.current)) {
          toastId.current = toast.success('Country Added Successfully');
        }
      }

      setNewCountry('');
      setEditCountryId(null);
      setShowPopup(false);
      fetchCountries(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating country:', error);
    }
  };

  const handleDeleteCountry = async (id: number) => {
    try {
      await deleteCountry(id.toString());
      if (toastId.current === null || !toast.isActive(toastId.current)) {
        toastId.current = toast.error('Successfully Deleted');
      }
      fetchCountries(); // Refresh the list
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setCountryToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (countryToDelete !== null) {
      await handleDeleteCountry(countryToDelete);
      setCountryToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: Country) => {
    setEditCountryId(value.id);
    setNewCountry(value.name);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditCountryId(null);
    setNewCountry('');
    setShowPopup(false);
  };
  const columns: ColumnConfig<Country>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'name', headerName: 'Country Name', sortable: true },
    { field: 'is_active', headerName: 'Active', sortable: true, type: 'boolean' },
  ];


  return (
    <Container style={{ backgroundColor: 'white', padding: '20px', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <Reuse
          data={countries}
          columns={columns}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Countries" handleSearchChange={function (_query: string): void {
            throw new Error('Function not implemented.');
          }} />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateCountry}
          EditId={editCountryId}
          valueOne={newCountry}
          setValueOne={setNewCountry}
          labelOne="Country Name"
          addMsg="Add Country"
          editMsg="Edit Country"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this country?" setValueTwo={function (_value: string): void {
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

export default CountryTable;
