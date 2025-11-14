
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import {
  getComplexion,
  updateComplexions,
  deleteComplexions,
  addComplection,
} from '../services/api';

interface Complexion {
  id: number;
  complexion_desc: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const ComplectionTable: React.FC = () => {
  const [complexions, setComplexions] = useState<Complexion[]>([]);
  const [newComplexion, setNewComplexion] = useState<string | null>('');
  const [editComplexionId, setEditComplexionId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [complexionToDelete, setComplexionToDelete] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchComplexions();
  }, []);

  const fetchComplexions = async () => {
    try {
      const response = await getComplexion();
      setComplexions(response.data.map((item: { complexion_id: number; complexion_desc: string }) => ({
        id: item.complexion_id,
        complexion_desc: item.complexion_desc,
      })));
    } catch (error) {
      console.error('Error fetching complexions:', error);
    }
  };

  const handleAddOrUpdateComplexion = async () => {
    try {
      if (editComplexionId) {
        await updateComplexions(editComplexionId.toString(), { complexion_desc: newComplexion!, admin_user_id: adminUserID });
        notify('Successfully updated');
      } else {
        if (newComplexion) {
          await addComplection({ complexion_desc: newComplexion });
          notify('Complexion Added Successfully');
        } else {
          notifyDelete('Please submit all required fields');
        }
      }
      setNewComplexion('');
      setEditComplexionId(null);
      setShowPopup(false);
      fetchComplexions(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating complexion:', error);
    }
  };

  const handleDeleteComplexion = async (id: number) => {
    try {
      await deleteComplexions(id.toString());
      notifyDelete('Successfully Deleted');
      fetchComplexions(); // Refresh the list
    } catch (error) {
      console.error('Error deleting complexion:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setComplexionToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (complexionToDelete !== null) {
      await handleDeleteComplexion(complexionToDelete);
      setComplexionToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: Complexion) => {
    setEditComplexionId(value.id);
    setNewComplexion(value.complexion_desc);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditComplexionId(null);
    setNewComplexion('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<Complexion>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'complexion_desc', headerName: 'Complexion', sortable: true },
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
          data={complexions}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Complexion"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateComplexion}
          EditId={editComplexionId}
          valueOne={newComplexion}
          setValueOne={setNewComplexion}
          labelOne="Complexion"
          addMsg="Add Complexion"
          editMsg="Edit Complexion"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this complexion?"
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

export default ComplectionTable;
