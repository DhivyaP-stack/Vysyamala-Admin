
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';

import { BirthStarApi } from '../services/api';
import Notification, { notifyDelete } from './TostNotification';
import Reuse from './Basic/Reuse';
import TablePopUp from './TablePopUp';
import { toast } from 'react-toastify';

interface BirthStar {
  id: number;
  star: string;
  tamil_series: string;
  telugu_series: string;
  kannada_series: string;
}

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable: boolean;
}
const BirthStarList: React.FC = () => {
  const [birthStars, setBirthStars] = useState<BirthStar[]>([]);
  const [newBirthStar, setNewBirthStar] = useState<string | null>('');
  const [tamilSeries, setTamilSeries] = useState<string | null>('');
  const [teluguSeries, setTeluguSeries] = useState<string | null>('');
  const [kannadaSeries, setKannadaSeries] = useState<string | null>('');
  const [editStarId, setEditStarId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showPopup, setShowPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [starToDelete, setStarToDelete] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  const valDis = Boolean(
    tamilSeries && teluguSeries && kannadaSeries && newBirthStar,
  );

  useEffect(() => {
    fetchBirthStars();
  }, []);

  const fetchBirthStars = async () => {
    try {
      const response = await axios.get(BirthStarApi);
      setBirthStars(response.data);
    } catch (error) {
      console.error('Error fetching birth stars:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${BirthStarApi}${id}/`, {
        data: { admin_user_id: adminUserID }
      });
      if (response.status >= 200 || response.status <= 201) {
        notifyDelete('Successfully Deleted');
        fetchBirthStars();
      }
    } catch (error) {
      console.error('Error deleting birth star:', error);
    }
  };

  const handleDeleteStar = (id: number) => {
    setStarToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteStar = async () => {
    if (starToDelete !== null) {
      await handleDelete(starToDelete);
      setStarToDelete(null);
      setDeleteConfirmation(false);
      fetchBirthStars();
    }
  };
  const addData = {
    star: newBirthStar,
    tamil_series: tamilSeries,
    telugu_series: teluguSeries,
    kannada_series: kannadaSeries,
    admin_user_id: adminUserID,
  };


  const handleAddOrUpdateBirthStar = async () => {
    const starData = addData;
    try {
      let response;
      if (editStarId) {
        response = await axios.put(`${BirthStarApi}${editStarId}/`, starData);
        if (response.status === 200) {
          toast.success('Successfully updated', {
            toastId: 'updateSuccess',
          });
        }
      } else {
        if (valDis) {
          response = await axios.post(BirthStarApi, starData);
          if (response.status === 200 || response.status <= 299) {
            toast.success('Birth Star Added Successfully', {
              toastId: 'addSuccess',
            });
          }
        }
      }

      setNewBirthStar(null);
      setTamilSeries(null);
      setTeluguSeries(null);
      setKannadaSeries(null);
      setEditStarId(null);
      setShowPopup(false);
      fetchBirthStars();
    } catch (error) {
      console.error('Error adding/updating birth star:', error);
    }
  };

  const handleEditStar = (star: BirthStar) => {
    setEditStarId(star.id);
    setNewBirthStar(star.star);
    setTamilSeries(star.tamil_series);
    setTeluguSeries(star.telugu_series);
    setKannadaSeries(star.kannada_series);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditStarId(null);
    setNewBirthStar(null);
    setTamilSeries(null);
    setTeluguSeries(null);
    setKannadaSeries(null);
    setShowPopup(false);
  };

  const columns: ColumnConfig<BirthStar>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'star', headerName: 'Star', sortable: true },
    { field: 'tamil_series', headerName: 'Tamil Series', sortable: true },
    { field: 'telugu_series', headerName: 'Telugu Series', sortable: true },
    { field: 'kannada_series', headerName: 'Kannada Series', sortable: true },
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
          data={birthStars}
          columns={columns}
          handleSearchChange={(query) => setSearchQuery(query)}
          handleEdit={handleEditStar}
          handleDelete={(id) => handleDeleteStar(Number(id))}
          setShowPopup={setShowPopup}
          idField="id"
          title="BirthStar"
        />
        <TablePopUp
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateBirthStar}
          EditId={editStarId}
          valueOne={newBirthStar}
          setValueOne={setNewBirthStar}
          valueTwo={tamilSeries}
          setValueTwo={setTamilSeries}
          valueThree={teluguSeries}
          setValueThree={setTeluguSeries}
          setValueFour={setKannadaSeries}
          valueFour={kannadaSeries}
          labelOne={'Birth Star'}
          labelTwo={'Tamil Series'}
          LabelThree={'Telugu Series'}
          LabelFour={'Kannada Series'}
          addMsg="Add Birth Star"
          editMsg="Edit Birth Star"
          deleteConfirmation={deleteConfirmation}
          setDeleteConfirmation={setDeleteConfirmation}
          deletFun={confirmDeleteStar}
          deletLabel="Are you sure you want to delete this birth star?"
        />
      </div>
      <Notification />
    </Container>
  );
};

export default BirthStarList;
