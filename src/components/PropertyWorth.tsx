
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import { getProperties, updateProperty, deleteProperty, addProperty } from '../services/api';

interface Property {
  id: number;
  property: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const PropertyTable: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [newProperty, setNewProperty] = useState<string | null>('');
  const [editPropertyId, setEditPropertyId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toastId = React.useRef<string | number | null>(null); // Change to null

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await getProperties();
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleAddOrUpdateProperty = async () => {
    if (isSubmitting || !newProperty?.trim()) {
      if (toastId.current === null || !toast.isActive(toastId.current)) {
        toastId.current = toast.error('Please provide Property Name'); // Prevent multiple error toasts
      }
      return;
    }

    try {
      setIsSubmitting(true); // Prevent multiple submits
      if (editPropertyId) {
        await updateProperty(editPropertyId.toString(), { property: newProperty! });
        if (toastId.current === null || !toast.isActive(toastId.current)) {
          toastId.current = toast.success('Successfully updated'); // Only show one toast at a time
        }
      } else {
        if (newProperty) {
          await addProperty({ property: newProperty });
          if (toastId.current === null || !toast.isActive(toastId.current)) {
            toastId.current = toast.success('Property Added Successfully');
          }
        }
      }

      setNewProperty('');
      setEditPropertyId(null);
      setShowPopup(false);
      fetchProperties(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating property:', error);
    } finally {
      setIsSubmitting(false); // Allow new submissions after completion
    }
  };

  const handleDeleteProperty = async (id: number) => {
    try {
      await deleteProperty(id.toString());
      if (toastId.current === null || !toast.isActive(toastId.current)) {
        toastId.current = toast.error('Successfully Deleted');
      }
      fetchProperties(); // Refresh the list
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setPropertyToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (propertyToDelete !== null) {
      await handleDeleteProperty(propertyToDelete);
      setPropertyToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: Property) => {
    setEditPropertyId(value.id);
    setNewProperty(value.property);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditPropertyId(null);
    setNewProperty('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<Property>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'property', headerName: 'Property', sortable: true },
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
          data={properties}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Properties"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateProperty}
          EditId={editPropertyId}
          valueOne={newProperty}
          setValueOne={setNewProperty}
          valueTwo={null}
          setValueTwo={() => {}}
          labelOne="Property Name"
          labelTwo=""
          addMsg="Add Property"
          editMsg="Edit Property"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this property?"
          setValueThree={() => {}}
          valueThree={null}
          setValueFour={() => {}}
          valueFour={null}
          LabelThree=""
          LabelFour=""
        />
      </div>
     
    </Container>
  );
};

export default PropertyTable;
