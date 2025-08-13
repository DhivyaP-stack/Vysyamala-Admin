
import React, { useEffect, useState, useMemo } from 'react';
import {
   Container
} from '@mui/material';
import  { notify, notifyDelete } from './TostNotification';
import { addParentsOccupation, deleteParentsOccupation, getParentsOccupations, updateParentsOccupation } from '../services/api';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp'; // Assuming you have a reusable popup component

interface ParentsOccupation {
  id: string;
  occupation: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const ParentsOccupationTable: React.FC = () => {
  const [parentsOccupations, setParentsOccupations] = useState<ParentsOccupation[]>([]);
  const [newOccupation, setNewOccupation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [editOccupationId, setEditOccupationId] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [occupationToDelete, setOccupationToDelete] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    fetchParentsOccupations();
  }, []);

  const fetchParentsOccupations = async () => {
    try {
      const response = await getParentsOccupations();
      setParentsOccupations(response.data);
    } catch (error) {
      console.error('Error fetching parents occupations:', error);
    }
  };

  const addOrUpdateOccupation = async () => {
    const occupationData = { occupation: newOccupation };

    try {
      if (editOccupationId) {
        const response = await updateParentsOccupation(editOccupationId, occupationData);
        if (response.status >= 200 && response.status <= 299) {
          notify('Successfully updated');
          fetchParentsOccupations();
        }
      } else {
        const response = await addParentsOccupation(occupationData);
        if (response.status >= 200 && response.status <= 299) {
          notify('Successfully added');
          fetchParentsOccupations();
        }
      }

      setNewOccupation('');
      setShowPopup(false);
      setEditOccupationId(null);
    } catch (error) {
      console.error('Error adding/updating occupation:', error);
    }
  };

  const handleEditOccupation = (occupation: ParentsOccupation) => {
    setEditOccupationId(occupation.id);
    setNewOccupation(occupation.occupation);
    setShowPopup(true);
  };

  const handleDeleteOccupation = (id: string) => {
    setOccupationToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteOccupation = async () => {
    if (occupationToDelete) {
      try {
        const response = await deleteParentsOccupation(occupationToDelete);
        if (response.status >= 200 && response.status <= 299) {
          notifyDelete('Successfully Deleted');
          fetchParentsOccupations();
        }
        setOccupationToDelete(null);
        setDeleteConfirmation(false);
      } catch (error) {
        console.error('Error deleting occupation:', error);
      }
    }
  };

  const columns: ColumnConfig<ParentsOccupation>[] = useMemo(() => [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'occupation', headerName: 'Occupation', sortable: true },
  ], []);

  const filteredOccupations = parentsOccupations.filter((occupation) =>
    occupation.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const clearValues = () => {
    setEditOccupationId(null);
    setNewOccupation('');
    setShowPopup(false);
  }
  return (
    <Container style={{ backgroundColor: 'white', padding: '20px' }}>
      <Reuse
        data={filteredOccupations}
        columns={columns}
        handleSearchChange={setSearchQuery}
        handleEdit={handleEditOccupation}
        handleDelete={(id) => handleDeleteOccupation(String(id))}
        setShowPopup={setShowPopup}
        idField="id"
        title="Parents Occupations"
      />

      <TablePopUp
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        clearValues={clearValues}
        handleAddOrUpdate={addOrUpdateOccupation}
        EditId={editOccupationId ? Number(editOccupationId) : null}
        valueOne={newOccupation}
        setValueOne={setNewOccupation}
        labelOne="Occupation"
        addMsg="Add Occupation"
        editMsg="Edit Occupation"
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        deletFun={confirmDeleteOccupation}
        deletLabel="Are you sure you want to delete this occupation?" setValueTwo={function (_value: string): void {
          throw new Error('Function not implemented.');
        } } setValueThree={function (_value: string): void {
          throw new Error('Function not implemented.');
        } } setValueFour={function (_value: string): void {
          throw new Error('Function not implemented.');
        } } valueFour={null} labelTwo={''} LabelThree={''} LabelFour={''} valueTwo={null} valueThree={null}      />

    
    </Container>
  );
};

export default ParentsOccupationTable;
