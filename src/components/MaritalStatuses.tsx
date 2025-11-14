
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import { getMaritalStatuses, updateMaritalStatus, deleteMaritalStatus, addMaritalStatus } from '../services/api';
interface MaritalStatus {
  StatusId: number;
  MaritalStatus: string;
  is_deleted: boolean;
}
interface ColumnConfig<T> {
  field: keyof T; // This ensures field must be a key of T
  headerName: string;
  sortable: boolean;
}

const MaritalStatusTable: React.FC = () => {
  const [statuses, setStatuses] = useState<MaritalStatus[]>([]);
  const [newStatus, setNewStatus] = useState<string | null>('');
  const [editStatusId, setEditStatusId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [statusToDelete, setStatusToDelete] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toastId = React.useRef<string | number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      const response = await getMaritalStatuses();
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching marital statuses:', error);
    }
  };

  const handleAddOrUpdateStatus = async () => {
    if (isSubmitting || !newStatus?.trim()) {
      if (toastId.current === null || !toast.isActive(toastId.current)) {
        toastId.current = toast.error('Please provide Marital Status'); // Prevent multiple error toasts
      }
      return;
    }

    try {
      setIsSubmitting(true);
      if (editStatusId) {
        await updateMaritalStatus(editStatusId.toString(), { MaritalStatus: newStatus!, admin_user_id: adminUserID });
        if (toastId.current === null || !toast.isActive(toastId.current)) {
          toastId.current = toast.success('Successfully updated');
        }
      } else {
        if (newStatus) {
          await addMaritalStatus({ MaritalStatus: newStatus, admin_user_id: adminUserID });
          if (toastId.current === null || !toast.isActive(toastId.current)) {
            toastId.current = toast.success('Marital Status Added Successfully');
          }
        }
      }

      setNewStatus('');
      setEditStatusId(null);
      setShowPopup(false);
      fetchStatuses(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating marital status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStatus = async (id: number) => {
    try {
      await deleteMaritalStatus(id.toString());
      if (toastId.current === null || !toast.isActive(toastId.current)) {
        toastId.current = toast.error('Successfully Deleted');
      }
      fetchStatuses(); // Refresh the list
    } catch (error) {
      console.error('Error deleting marital status:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setStatusToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (statusToDelete !== null) {
      await handleDeleteStatus(statusToDelete);
      setStatusToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: MaritalStatus) => {
    setEditStatusId(value.StatusId);
    setNewStatus(value.MaritalStatus);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditStatusId(null);
    setNewStatus('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<MaritalStatus>[] = [
    { field: 'StatusId', headerName: 'ID', sortable: true },
    { field: 'MaritalStatus', headerName: 'Marital Status', sortable: true },
  ];


  return (
    <Container style={{ backgroundColor: 'white', padding: '20px', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <Reuse
          data={statuses}
          columns={columns}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="StatusId"
          title="Marital Statuses" handleSearchChange={function (_query: string): void {
            throw new Error('Function not implemented.');
          }} />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateStatus}
          EditId={editStatusId}
          valueOne={newStatus}
          setValueOne={setNewStatus}
          labelOne="Marital Status"
          addMsg="Add Marital Status"
          editMsg="Edit Marital Status"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this marital status?" setValueTwo={function (_value: string): void {
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

export default MaritalStatusTable;
