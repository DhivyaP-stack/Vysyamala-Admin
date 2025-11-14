import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { notify, notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import { getAnnualIncomes, updateAnnualIncome, deleteAnnualIncome, addAnnualIncome } from '../services/api';

interface AnnualIncome {
  id: number;
  income: string;
  income_amount: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}

const AnnualIncomeTable: React.FC = () => {
  const [annualIncomes, setAnnualIncomes] = useState<AnnualIncome[]>([]);
  const [newIncome, setNewIncome] = useState<string | null>('');
  const [newIncomeAmount, setNewIncomeAmount] = useState<string | null>('');
  const [editIncomeId, setEditIncomeId] = useState<number | null>(null);
  const [_searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [incomeToDelete, setIncomeToDelete] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchAnnualIncomes();
  }, []);

  const fetchAnnualIncomes = async () => {
    try {
      const response = await getAnnualIncomes();
      setAnnualIncomes(response.data);
    } catch (error) {
      console.error('Error fetching annual incomes:', error);
    }
  };

  const handleAddOrUpdateIncome = async () => {
    try {
      if (editIncomeId) {
        await updateAnnualIncome(editIncomeId.toString(), { income: newIncome!, income_amount: newIncomeAmount!, admin_user_id: adminUserID });
        notify('Successfully updated');
      } else {
        if (newIncome && newIncomeAmount) {
          await addAnnualIncome({ income: newIncome, income_amount: newIncomeAmount, admin_user_id: adminUserID });
          notify('Income Added Successfully');
        }
      }
      setNewIncome('');
      setNewIncomeAmount('');
      setEditIncomeId(null);
      setShowPopup(false);
      fetchAnnualIncomes(); // Refresh the list
    } catch (error) {
      console.error('Error adding/updating income:', error);
    }
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      await deleteAnnualIncome(id.toString());
      notifyDelete('Successfully Deleted');
      fetchAnnualIncomes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const handleDeleteType = (id: number) => {
    setIncomeToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteType = async () => {
    if (incomeToDelete !== null) {
      await handleDeleteIncome(incomeToDelete);
      setIncomeToDelete(null);
      setDeleteConfirmation(false);
    }
  };

  const handleEditType = (value: AnnualIncome) => {
    setEditIncomeId(value.id);
    setNewIncome(value.income);
    setNewIncomeAmount(value.income_amount);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditIncomeId(null);
    setNewIncome('');
    setNewIncomeAmount('');
    setShowPopup(false);
  };

  const columns: ColumnConfig<AnnualIncome>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'income', headerName: 'Income Description', sortable: true },
    { field: 'income_amount', headerName: 'Income Amount', sortable: true },
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
          data={annualIncomes}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditType}
          handleDelete={(id) => handleDeleteType(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="Annual Incomes"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateIncome}
          EditId={editIncomeId}
          valueOne={newIncome}
          setValueOne={setNewIncome}
          valueTwo={newIncomeAmount}
          setValueTwo={setNewIncomeAmount}
          labelOne="Income Description"
          labelTwo="Income Amount"
          addMsg="Add Income"
          editMsg="Edit Income"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteType}
          deletLabel="Are you sure you want to delete this income?"
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

export default AnnualIncomeTable;
