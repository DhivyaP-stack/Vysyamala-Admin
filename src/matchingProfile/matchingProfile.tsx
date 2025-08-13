import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { TablePagination, Typography } from '@mui/material';
import axios from 'axios';
import No_Image_Available from '../images/No_Image_Available .jpg';
import { useLocation } from 'react-router-dom';
import { matchingProfileApi } from '../services/api';
import { MdVerified } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { annualIncomeApi, educationalPrefApi, fetchGetHighestEducation, fetchMaritalStatuses, fetchStateStatus, getProfession } from '../action';
import { useQuery } from '@tanstack/react-query';
import {  GetHighestEducation } from '../components/new_profile/EditFormComponents/EducationalDetails';
import { ProfessionPref } from '../components/new_profile/profile_form_components/EducationalDetails';
import { EduPref } from '../components/new_profile/profile_form_components/Partner_preference';
interface ProfileImage {
  [key: string]: string;
}
interface AnnualIncome {
  income_id: number;
  income_description: string;
}
export interface State {
  state_id: string;
  state_name: string;
}
export interface ProfileType {
  profile_id: string;
  profile_name: string;
  profile_img: ProfileImage;
  profile_age: number;
  profile_gender: 'male' | 'female';
  height: string;
  weight: number | null;
  degree: string;
  star: string;
  profession: string;
  location: string;
  photo_protection: number;
  matching_score: number;
  wish_list: number;
  verified: number;
}

const columns = [
  { id: 'profile_img', label: 'Image' },
  { id: 'profile_id', label: 'Profile ID' },
  { id: 'profile_name', label: 'Name' },
  { id: 'profile_age', label: 'Age' },
  { id: 'profile_gender', label: 'Gender' },
  { id: 'height', label: 'Height' },
  { id: 'weight', label: 'Weight' },
  { id: 'degree', label: 'Degree' },
  { id: 'profession', label: 'Profession' },
  { id: 'location', label: 'Location' },
  { id: 'star', label: 'Star' },
  { id: 'matching_score', label: 'Matching Score' },
  { id: 'verified', label: 'Verified' },
];
interface MaritalStatusOption {
  marital_sts_id: string;
  marital_sts_name: string;
}
export default function MatchingProfile() {

  const [profileData, setProfileData] = useState<ProfileType[]>([]);

  const [page, setPage] = useState<number>(0); // Zero-based page index for MUI
  const [rowsPerPage, setRowsPerPage] = useState<number>(10); // Rows per page
  const [totalRecords, setTotalRecords] = useState<number>(0); // Total record count
  const [maritialStatus, setMaritialStatus] = useState<MaritalStatusOption[]>(
    [],
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get('profileId');
  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>(
    [],
  );
  const { data: profession } = useQuery({
    queryKey: ['profession'],
    queryFn: getProfession,
  });
  const { data: State } = useQuery({
    queryKey: ['State'],
    queryFn: () => fetchStateStatus("1"),

  });

  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  // Fetch profiles from the server
  const getProfileListMatch = async (
    id: string | null,
    pageNumber: number,
    perPage: number,
  ) => {
    try {
      const response = await axios.post(`${matchingProfileApi}`, {
        profile_id: id,
        page_number: pageNumber + 1, // Backend expects 1-based page index
        per_page: perPage,
      });

      const data = response.data.profiles as ProfileType[];
      setProfileData(data);
      setTotalRecords(response.data.total_count); // Update total records for pagination
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  // Fetch profile list when profileId or page/filter changes
  useEffect(() => {
    getProfileListMatch(profileId, page, rowsPerPage);
  }, [profileId, page, rowsPerPage]);

  // Handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page to the first page when rows per page changes
  };
  const { data: MaritalStatuses } = useQuery({
    queryKey: ['MaritalStatuses'],
    queryFn: fetchMaritalStatuses,
  });

  const { data: GetHighestEducation } = useQuery<GetHighestEducation[]>({
    queryKey: ['GetHighestEducation'],
    queryFn: fetchGetHighestEducation,
  });
  const handleAnnualIncomeChange = (id: string, isChecked: boolean) => {
    setSelectedAnnualIncomes((prev) =>
      isChecked ? [...prev, id] : prev.filter((incId) => incId !== id),
    );
  };
  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState<
  string[]
>([]);
  const handleMaritalStatusChange = (id: string, isChecked: boolean) => {
    setSelectedMaritalStatuses((prev) =>
      isChecked ? [...prev, id] : prev.filter((statusId) => statusId !== id),
    );
  };
  useEffect(() => {
    const fetchAnnualIncome = async () => {
      try {
        const response = await axios.post(
          `${annualIncomeApi}`,
        );
        const options = Object.values(response.data) as AnnualIncome[];
        setAnnualIncome(options);
      } catch (error) {
        console.error('Error fetching Annual Income options:', error);
      }
    };
    fetchAnnualIncome();
  }, []);
  const [selectedProfessions, setSelectedProfessions] = useState<number[]>([]);

  // Function to handle the change of checkboxes
  const handleProfessionChange = (professionId: number) => {
    setSelectedProfessions((prevSelected) => {
      // Check if the profession is already selected
      if (prevSelected.includes(professionId)) {
        // If already selected, remove it from the array
        return prevSelected.filter((id) => id !== professionId);
      } else {
        // If not selected, add it to the array
        return [...prevSelected, professionId];
      }
    });
  };
  const [eduPref, setEduPref] = useState<EduPref[]>([]);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const handleEducationChange = (id: string, isChecked: boolean) => {
    setSelectedEducations((prev) =>
      isChecked ? [...prev, id] : prev.filter((eduId) => eduId !== id),
    );
  };

  useEffect(() => {
    const fetchEduPref = async () => {
      try {
        const response = await axios.post(
          `${educationalPrefApi}`,
        );
        const options = Object.values(response.data) as EduPref[];
        console.log(options);
        setEduPref(options);
      } catch (error) {
        console.error('Error fetching Edu Pref options:', error);
      }
    };
    fetchEduPref();
  }, []);
  return (
    <div>
   
      {profileData ? (
        <>

          <Typography
            sx={{
              marginBottom: '20px',
              color: 'black',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            Matching Profile Lists For Profile Id {profileId}
          </Typography>
          <div>
            <div className="container mx-auto p-4 ">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {/* Age Difference */}
    <div className="flex flex-col">
      <label className="text-[18px] text-black font-semibold mb-2">
        Age Difference
      </label>
      <input
        onKeyDown={(e) => {
          const allowedKeys = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+',
            'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete',
          ];
          const inputValue = (e.target as HTMLInputElement).value;
          if (!allowedKeys.includes(e.key) || (inputValue.length >= 2 && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key))) {
            e.preventDefault();
          }
        }}
        className="w-full px-4 py-2 border border-black rounded"
      />
    </div>

    {/* Height from */}
    <div className="flex flex-col">
      <label className="text-[18px] text-black font-semibold mb-2">
        Height from
      </label>
      <input className="w-full px-4 py-2 border border-black rounded" />
    </div>

    {/* Sarpa Dhosham */}
    <div className="flex flex-col">
      <label className="text-[18px] text-black font-semibold mb-2">
        Sarpa Dhosham
      </label>
      <select className="w-full outline-none px-4 py-2.5 border border-black rounded">
        <option value="" disabled>-- Select Sarpa Dhosham --</option>
        <option value="Unknown">Unknown</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    {/* Chevvai Dhosam */}
    <div className="flex flex-col">
      <label className="text-[18px] text-black font-semibold mb-2">
        Chevvai Dhosam
      </label>
      <select className="w-full outline-none px-4 py-2.5 border border-black rounded">
        <option value="" disabled>-- Select Chevvai Dhosam --</option>
        <option value="Unknown">Unknown</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    {/* State Selection */}
    <div className="flex flex-col">
      <label className="text-[18px] text-black font-semibold mb-2">
        State
      </label>
      <select className="w-full outline-none px-4 py-2.5 border border-black rounded">
        <option value="" disabled>-- Select State --</option>
        {State?.map((option: State) => (
          <option key={option.state_id} value={option.state_id}>
            {option.state_name}
          </option>
        ))}
      </select>
    </div>
  </div>
</div>

        {/* <div className=" flex gap-2">
         <div className='flex gap-2'>
         <div className='flex gap-2'>
         <div className="w-1/4 flex flex-col ">
            <label  className="text-[18px] text-black font-semibold mb-2">
              Age Difference
            </label>
            <input
              onKeyDown={(e) => {
                const allowedKeys = [
                  '0',
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  '+',
                  'Backspace',
                  'Tab',
                  'ArrowLeft',
                  'ArrowRight',
                  'Delete',
                ];

                // Get the current value of the input field
                const inputValue = (e.target as HTMLInputElement).value;

                // If the key pressed is not allowed or if the length of the input is already 2, prevent it
                if (
                  !allowedKeys.includes(e.key) ||
                  (inputValue.length >= 2 &&
                    ![
                      'Backspace',
                      'Tab',
                      'ArrowLeft',
                      'ArrowRight',
                      'Delete',
                    ].includes(e.key))
                ) {
                  e.preventDefault();
                }
              }}
              className=" px-4 py-2 border border-black rounded"
            />
          </div>
          <div className="w-1/4">
            <div className="flex flex-col">
              <label  className="text-[18px] text-black font-semibold mb-2">
                Height from
              </label>
              <input className=" px-4 py-2 border border-black rounded" />
            </div>
          </div>
          <div className="w-1/4">
                <label
                  htmlFor="ragu_dosham"
                  className="text-[18px] text-black font-semibold mb-2"
                >
                  Sarpa Dhosham 
                </label>
                <select
                  id="ragu_dosham"
                
                  className="outline-none w-full px-4 py-2.5 mt-1.5 border border-black rounded"
                  defaultValue="" // Ensure that this sets the initial value to the placeholder
                >
                  <option value="" disabled>
                    -- Select Sarpa Dhosham --
                  </option>
                  <option value="Unknown">Unknown</option> 
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
         </div>

            <div className='flex gap-2'>
            <div className="w-1/4">
                <label
                  htmlFor="ragu_dosham"
                  className="text-[18px] text-black font-semibold mb-2"
                >
                  Chevvai Dhosam  
                </label>
                <select
                  id="ragu_dosham"
                
                  className="outline-none w-full px-4 py-2.5 mt-1.5 border border-black rounded"
                  defaultValue="" // Ensure that this sets the initial value to the placeholder
                >
                  <option value="" disabled>
                    -- Select Chevvai Dhosam --
                  </option>
                  <option value="Unknown">Unknown</option> 
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="w-1/4">
                <label  className="text-[18px] text-black font-semibold mb-2">
                  State 
                  
                </label>
                <select
                className="outline-none w-full px-4 py-2.5 mt-1.5 border border-black rounded"
            
                >
                  <option value="" selected disabled>
                    -- Select State --
                  </option>
                  {State?.map((option: State) => (
                    <option key={option.state_id} value={option.state_id}>
                      {option.state_name}
                    </option>
                  ))}
                </select>
              
              </div>
            </div>
         </div>
        </div> */}
        <div>
        <div className='mt-2'>
              <label className="text-[18px] text-black font-semibold mb-2">
                Education
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {eduPref.map((option) => (
                  <div key={option.Edu_Pref_id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`education-${option.Edu_Pref_id}`}
                      value={option.Edu_Pref_id.toString()}
                      checked={selectedEducations.includes(
                        option.Edu_Pref_id.toString(),
                      )}
                      onChange={(e) =>
                        handleEducationChange(
                          option.Edu_Pref_id.toString(),
                          e.target.checked,
                        )
                      }
                    />
                    <label
                      htmlFor={`education-${option.Edu_Pref_id}`}
                      className="pl-1"
                    >
                      {option.Edu_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
        <div className='mt-5 '>
              <h5 className="text-[18px] text-black font-semibold mb-2">
                Marital Status
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {MaritalStatuses?.map((status: any) => (
                  <div key={status.marital_sts_id}>
                    <input
                      type="checkbox"
                      id={`maritalStatus-${status.marital_sts_id}`}
                      value={status.marital_sts_id.toString()}
                      checked={selectedMaritalStatuses.includes(
                        status.marital_sts_id.toString(),
                      )}
                      onChange={(e) =>
                        handleMaritalStatusChange(
                          status.marital_sts_id.toString(),
                          e.target.checked,
                        )
                      }
                    />
                    <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>
                      {status.marital_sts_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
        </div>
        <div className=' mt-5 flex gap-2'>
        <div className="w-full">
              <h5 className="text-[18px] text-black font-semibold mb-2">
                Profession
              </h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {profession?.map((profession: ProfessionPref) => (
                  <div key={profession.Profes_Pref_id}>
                    <input
                      type="checkbox"
                      id={`profession-${profession.Profes_Pref_id}`}
                      // {...register('professionPreference')} // Assuming you're using react-hook-form
                      value={profession.Profes_name}
                      checked={selectedProfessions.includes(
                        profession.Profes_Pref_id,
                      )}
                      onChange={() =>
                        handleProfessionChange(profession.Profes_Pref_id)
                      }
                      
                    />
                    <label
                      htmlFor={`profession-${profession.Profes_Pref_id}`}
                      className="pl-1"
                    >
                      {profession.Profes_name}
                    </label>
                  </div>
                ))}
              </div>
              {/* {errors.professionPreference && (
                  <span className="text-red-500">
                    {errors.professionPreference.message}
                  </span>
                )} */}
            </div>

      
        </div>
        <div className='mt-5 mb-10'>
        <label className="text-[18px] text-black font-semibold mb-2">
                Annual Income
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {annualIncome.map((option) => (
                  <div
                    key={option.income_id}
                    className="mb-2 flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={`annualIncome-${option.income_id}`}
                      value={option.income_id.toString()}
                      checked={selectedAnnualIncomes.includes(
                        option.income_id.toString(),
                      )}
                      onChange={(e) =>
                        handleAnnualIncomeChange(
                          option.income_id.toString(),
                          e.target.checked,
                        )
                      }
                    />
                    <label
                      htmlFor={`annualIncome-${option.income_id}`}
                      className="pl-1"
                    >
                      {option.income_description}
                    </label>
                  </div>
                ))}
              </div>
        </div>

      </div>
      <Paper className="w-full">
          <TableContainer
            sx={{ border: '1px solid #E0E0E0' }}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ background: '#FFF9C9', padding: '17px' }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{
                        borderBottom: '1px solid #E0E0E0',

                        color: '#ee3448',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                      }}
                      key={column.id}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  {/* <TableCell>Action</TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {profileData?.map((row) => (
                  <TableRow
                    key={row.profile_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      {row.profile_img &&
                      Object.values(row.profile_img).length > 0 ? (
                        <img
                          className="rounded-full"
                          src={Object.values(row.profile_img)[0]}
                          alt="Profile"
                          width={80}
                        />
                      ) : (
                        <img
                          className="rounded-full"
                          src={No_Image_Available}
                          alt="Profile"
                          width={80}
                        />
                      )}
                    </TableCell>
                    <TableCell>{row.profile_id}</TableCell>
                    <TableCell>{row.profile_name}</TableCell>
                    <TableCell>{row.profile_age}</TableCell>
                    <TableCell>{row.profile_gender}</TableCell>
                    <TableCell>{row.height}</TableCell>
                    <TableCell>{row.weight || 'N/A'}</TableCell>
                    <TableCell>{row.degree}</TableCell>
                    <TableCell>{row.profession}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.star}</TableCell>
                    <TableCell>{row.matching_score}</TableCell>
                    <TableCell>
                      {row.verified === 0 ? (
                        <MdVerified className="text-green-600" />
                      ) : (
                        <GoUnverified className="text-red-600" />
                      )}
                    </TableCell>
                    {/* <TableCell>
                  <Button
                    onClick={() =>
                      navigate(`/editProfile?profileId=${row.profile_id}`)
                    }
                  >
                    Edit
                  </Button>
                  <Button>Delete</Button>
                </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography
          sx={{
            marginBottom: '20px',
            color: 'black',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          No Matching Data
        </Typography>
      )}
    </div>
  );
}
