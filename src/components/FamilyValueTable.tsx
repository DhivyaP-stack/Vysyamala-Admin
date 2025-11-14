
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container } from '@mui/material';
// import Notification, { notify, notifyDelete } from './TostNotification';
// import Reuse from './Basic/Reuse';
// import TablePopUp from './TablePopUp';
// import {
//   getFamilyValues,
//   addFamilyValue,
//   updateFamilyValue,
//   deleteFamilyValue
// } from '../services/api';

// interface FamilyValue {
//   id: number;
//   FamilyValue: string;
// }

// interface ColumnConfig<T> {
//   field: keyof T;
//   headerName: string;
//   sortable: boolean;
// }

// const FamilyValueTable: React.FC = () => {
//   const [familyValues, setFamilyValues] = useState<FamilyValue[]>([]);
//   const [newFamilyValue, setNewFamilyValue] = useState<string | null>('');
//   const [editFamilyValueId, setEditFamilyValueId] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showPopup, setShowPopup] = useState(false);
//   const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
//   const [familyValueToDelete, setFamilyValueToDelete] = useState<number | null>(null);

//   // Fetch family values when component mounts
//   useEffect(() => {
//     fetchFamilyValues();
//   }, []);

//   const fetchFamilyValues = async () => {
//     try {
//       const response = await getFamilyValues();
//       setFamilyValues(response.data.map((item: { FamilyValueid: any; FamilyValue: any; }) => ({
//         id: item.FamilyValueid,  // Map the correct ID field
//         FamilyValue: item.FamilyValue  // Ensure correct field name
//       })));
//     } catch (error) {
//       console.error('Error fetching family values:', error);
//     }
//   };

//   // Add or update a family value
//   const handleAddOrUpdateFamilyValue = async () => {
//     try {
//       if (editFamilyValueId) {
//         // Update the family value
//         await updateFamilyValue(editFamilyValueId.toString(), { FamilyValue: newFamilyValue });
//         notify('Successfully updated');
//       } else {
//         if (newFamilyValue) {
//           // Add a new family value
//           await addFamilyValue({ FamilyValue: newFamilyValue });
//           notify('Family Value Added Successfully');
//         } else {
//           notifyDelete('Please submit all required fields');
//         }
//       }
//       setNewFamilyValue('');
//       setEditFamilyValueId(null);
//       setShowPopup(false);
//       fetchFamilyValues();  // Refresh the list
//     } catch (error) {
//       console.error('Error adding/updating family value:', error);
//     }
//   };

//   // Delete a family value
//   const handleDeleteFamilyValue = async (id: number) => {
//     try {
//       await deleteFamilyValue(id.toString());
//       notifyDelete('Successfully Deleted');
//       fetchFamilyValues();  // Refresh the list
//     } catch (error) {
//       console.error('Error deleting family value:', error);
//     }
//   };

//   // Set the family value to be deleted and show confirmation
//   const handleDeleteType = (id: number) => {
//     setFamilyValueToDelete(id)
// ;
//     setDeleteConfirmation(true);
//   };

//   // Confirm and delete the selected family value
//   const confirmDeleteType = async () => {
//     if (familyValueToDelete !== null) {
//       await handleDeleteFamilyValue(familyValueToDelete);
//       setFamilyValueToDelete(null);
//       setDeleteConfirmation(false);
//     }
//   };

//   // Handle editing a family value
//   const handleEditType = (value: FamilyValue) => {
//     setEditFamilyValueId(value.id);
//     setNewFamilyValue(value.FamilyValue);
//     setShowPopup(true);
//   };

//   // Clear form values
//   const clearValues = () => {
//     setEditFamilyValueId(null);
//     setNewFamilyValue('');
//     setShowPopup(false);
//   };

//   // Define the columns for the table
//   const columns: ColumnConfig<FamilyValue>[] = [
//     { field: 'id', headerName: 'ID', sortable: true },
//     { field: 'FamilyValue', headerName: 'Family Value', sortable: true }
//   ];

//   return (
//     <Container
//       style={{
//         backgroundColor: 'white',
//         padding: '20px',
//         width: '100%',
//         maxWidth: '100vw',
//         boxSizing: 'border-box',
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: 'white',
//           padding: '20px',
//           borderRadius: '8px',
//         }}
//       >
//         <Reuse
//           data={familyValues}
//           columns={columns}
//           handleSearchChange={(query) => setSearchQuery(query)}
//           handleEdit={handleEditType}
//           handleDelete={(id)=> handleDeleteType(Number(id))}
//           setShowPopup={setShowPopup}
//           idField="id"
//           title="Family Value List"
//         />
//         <TablePopUp
//           setShowPopup={setShowPopup}
//           showPopup={showPopup}
//           clearValues={clearValues}
//           handleAddOrUpdate={handleAddOrUpdateFamilyValue}
//           EditId={editFamilyValueId}
//           valueOne={newFamilyValue}
//           setValueOne={setNewFamilyValue}
//           labelOne={'Family Value'}
//           addMsg="Add Family Value"
//           editMsg="Edit Family Value"
//           deleteConfirmation={deleteConfirmation}
//           setDeleteConfirmation={setDeleteConfirmation}
//           deletFun={confirmDeleteType}
//           deletLabel="Are you sure you want to delete this family value?"
//           setValueTwo={() => {}}
//           valueTwo={null}
//           setValueThree={() => {}}
//           valueThree={null}
//           setValueFour={() => {}}
//           valueFour={null}
//           labelTwo={''}
//           LabelThree={''}
//           LabelFour={''}
//         />
//       </div>
//       <Notification />
//     </Container>
//   );
// };

// export default FamilyValueTable;





import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';
import  { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import {
  getFamilyValues,
  addFamilyValue,
  updateFamilyValue,
  deleteFamilyValue
} from '../services/api';

interface FamilyValue {
  id: number;
  FamilyValue: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const FamilyValueTable: React.FC = () => {
  const [familyValues, setFamilyValues] = useState<FamilyValue[]>([]);
  const [newFamilyValue, setNewFamilyValue] = useState<string | null>('');
  const [editFamilyValueId, setEditFamilyValueId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [familyValueToDelete, setFamilyValueToDelete] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  // Fetch family values when component mounts
  useEffect(() => {
    fetchFamilyValues();
  }, []);

  const fetchFamilyValues = async () => {
    try {
      const response = await getFamilyValues();
      setFamilyValues(response.data.map((item: { FamilyValueid: any; FamilyValue: any; }) => ({
        id: item.FamilyValueid,  // Map the correct ID field
        FamilyValue: item.FamilyValue  // Ensure correct field name
      })));
    } catch (error) {
      console.error('Error fetching family values:', error);
    }
  };

  // Add or update a family value
  const handleAddOrUpdateFamilyValue = async () => {
    if(!newFamilyValue?.trim()){
      notifyDelete("Please provide Family Value ")
    }else{
    try {
      if (editFamilyValueId) {
        // Update the family value
        await updateFamilyValue(editFamilyValueId.toString(), { FamilyValue: newFamilyValue, admin_user_id: adminUserID  });
        notify('Successfully updated');
      } else {
        if (newFamilyValue) {
          // Add a new family value
          await addFamilyValue({ FamilyValue: newFamilyValue,admin_user_id: adminUserID });
          notify('Family Value Added Successfully');
        } else {
          notifyDelete('Please submit all required fields');
        }
      }
      setNewFamilyValue('');
      setEditFamilyValueId(null);
      setShowPopup(false);
      fetchFamilyValues();  // Refresh the list
    } catch (error) {
      console.error('Error adding/updating family value:', error);
    }
  }
  };

  // Delete a family value
  const handleDeleteFamilyValue = async (id: number) => {
    try {
      await deleteFamilyValue(id.toString());
      notifyDelete('Successfully Deleted');
      fetchFamilyValues();  // Refresh the list
    } catch (error) {
      console.error('Error deleting family value:', error);
    }
  };

  // Set the family value to be deleted and show confirmation
  const handleDeleteType = (id: number) => {
    setFamilyValueToDelete(id);
    setDeleteConfirmation(true);
  };

  // Confirm and delete the selected family value
  const confirmDeleteType = async () => {
    if (familyValueToDelete !== null) {
      await handleDeleteFamilyValue(familyValueToDelete);
      setFamilyValueToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  // Handle editing a family value
  const handleEditType = (value: FamilyValue) => {
    setEditFamilyValueId(value.id);
    setNewFamilyValue(value.FamilyValue);
    setShowPopup(true);
  };

  // Clear form values
  const clearValues = () => {
    setEditFamilyValueId(null);
    setNewFamilyValue('');
    setShowPopup(false);
  };

  // Define the columns for the table
  const columns: ColumnConfig<FamilyValue>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'FamilyValue', headerName: 'Family Value', sortable: true }
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
          data={familyValues}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Family Value List"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateFamilyValue}
          EditId={editFamilyValueId}
          valueOne={newFamilyValue}
          setValueOne={setNewFamilyValue}
          labelOne={'Family Value'}
          addMsg="Add Family Value"
          editMsg="Edit Family Value"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this family value?"
          setValueTwo={() => {}}
          valueTwo={null}
          setValueThree={() => {}}
          valueThree={null}
          setValueFour={() => {}}
          valueFour={null}
          labelTwo={''}
          LabelThree={''}
          LabelFour={''}
        />
      </div>
     
    </Container>
  );
};

export default FamilyValueTable;
