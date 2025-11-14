import React, { useEffect, useState } from 'react';
import {
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reuse from './Basic/Reuse'; // Assuming this is the reusable table component
import TablePopUpDropDown from './TablePopupDropDown';
import {
  getStates,
  getDistricts,
  getCities,
  addCity,
  updateCity,
  deleteCity,
  getCitiess,
} from '../services/api'; // Update with city API calls

interface City {
  id: number;
  city_name: string;
  state: number;
  district: number;
  is_deleted?: boolean;
  actions: string;
}

interface State {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  state: number;
}

interface ColumnConfig<T> {
  field: keyof T | 'actions'; // Allow 'actions' as a valid field
  headerName: string;
  sortable?: boolean;
}

const CityTable: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [newCityName, setNewCityName] = useState<string>('');
  const [newStateId, setNewStateId] = useState<number | null>(null);
  const [newDistrictId, setNewDistrictId] = useState<number | null>(null);
  const [editCityId, setEditCityId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    fetchCities();
    fetchStates();
    fetchDistricts();
  }, []);

  useEffect(() => {
    // Filter cities based on selected state and district
    if (newStateId && newDistrictId) {
      getCitiess(newDistrictId).then((response) =>
        setFilteredCities(response.data),
      );
    } else {
      setFilteredCities(cities); // If no district is selected, show all cities
    }
  }, [newStateId, newDistrictId, cities]);

  const fetchCities = async () => {
    try {
      const response = await getCities();
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await getStates();
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchDistricts = async () => {
    try {
      const response = await getDistricts();
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const handleAddOrUpdateCity = async () => {
    try {
      const formData = {
        city_name: newCityName,
        district: newDistrictId,
        admin_user_id: adminUserID,
      };

      if (editCityId) {
        await updateCity(editCityId.toString(), formData);
        toast.success('Successfully updated');
      } else {
        await addCity(formData);
        toast.success('City added successfully');
      }

      // Reset form
      setNewCityName('');
      setNewStateId(null);
      setNewDistrictId(null);
      setEditCityId(null);
      setShowPopup(false);
      fetchCities(); // Refresh the city list
    } catch (error) {
      console.error('Error adding/updating city:', error);
      toast.error('Error occurred while adding/updating city');
    }
  };

  const handleDeleteCity = async (id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this city?',
    );

    if (confirmDelete) {
      try {
        await deleteCity(id.toString());
        toast.success('Successfully deleted');
        fetchCities(); // Refresh the city list
      } catch (error) {
        console.error('Error deleting city:', error);
        toast.error('Error occurred while deleting city');
      }
    } else {
      toast.info('Deletion canceled');
    }
  };

  const handleEditCity = (city: City) => {
    setEditCityId(city.id);
    setNewCityName(city.city_name);
    setNewStateId(city.state);
    setNewDistrictId(city.district);
    setShowPopup(true);
  };

  const clearValues = () => {
    setEditCityId(null);
    setNewCityName('');
    setNewStateId(null);
    setNewDistrictId(null);
    setShowPopup(false);
  };

  // const columns: ColumnConfig<City>[] = [
  //   { field: 'id', headerName: 'ID', sortable: true },
  //   { field: 'city_name', headerName: 'City Name', sortable: true },
  //   { field: 'is_deleted', headerName: 'Active' }, // Custom actions column
  // ];
  const columns: ColumnConfig<City>[] = [
    { field: 'id', headerName: 'ID', sortable: true },
    { field: 'city_name', headerName: 'City Name', sortable: true },
    { field: 'is_deleted', headerName: 'Active' },
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
        {/* State Dropdown to filter cities */}


        <Reuse
          districts={districts}
          states={states}
          newStateId={newStateId}
          setNewStateId={setNewStateId}
          newDistrictId={newDistrictId}
          setNewDistrictId={setNewDistrictId}
          data={filteredCities}
          columns={columns}
          handleEdit={handleEditCity}
          handleDelete={handleDeleteCity}
          setShowPopup={setShowPopup}
          idField="id"
          title="Cities"
          handleSearchChange={(_query) => {
            /* handle search if needed */
          }}
        />

        <TablePopUpDropDown
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          clearValues={clearValues}
          handleAddOrUpdate={handleAddOrUpdateCity}
          EditId={editCityId}
          valueOne={newCityName}
          setValueOne={setNewCityName}
          labelOne="City Name"
          valueTwo={newDistrictId ? newDistrictId.toString() : ''}
          setValueTwo={(value) => setNewDistrictId(Number(value))}
          //   valueThree={newDistrictId ? newDistrictId.toString() : ''}
          //   setValueThree={(value) => setNewDistrictId(Number(value))}
          labelTwo="districts"
          //   labelThree="District"
          states={districts}
          // districts={districts.filter(district => district.state === newStateId)}
          addMsg="Add City"
          editMsg="Edit City"
          deletLabel={''}
          deleteConfirmation={false}
          setDeleteConfirmation={function (_show: boolean): void {
            throw new Error('Function not implemented.');
          }}
          deletFun={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </Container>
  );
};

export default CityTable;
