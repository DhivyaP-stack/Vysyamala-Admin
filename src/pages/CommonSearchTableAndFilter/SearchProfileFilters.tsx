import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotifyError } from '../../common/Toast/ToastMessage';
import {
  userAnnualIncome,
  userCity,
  userComplexion,
  userEducation,
  userFamilyStatus,
  userMaritalStatus,
  userProfession,
  userState,
  userMembership,
} from '../../api/apiConfig';
import { getBirthStars } from '../../services/api';
import { getEditProfileViewStatus } from '../../action';
import { Button, CircularProgress } from '@mui/material';

// Interfaces (same as before)
interface AnnualIncome {
  income_id: number;
  income_description: string;
}

interface Profession {
  Profes_Pref_id: number;
  Profes_name: string;
}

interface MaritalStatus {
  marital_sts_id: number;
  marital_sts_name: string;
}

interface HighestEducation {
  education_id: number;
  education_description: string;
}

interface State {
  State_Pref_id: number;
  State_name: string;
}

interface City {
  id: number;
  district: string;
}

interface Complexion {
  complexion_id: number;
  complexion_description: string;
}

interface Membership {
  id: number;
  plan_name: string;
  plan_price: string;
}

interface FamilyStatus {
  family_status_id: number;
  family_status_name: string;
  family_status_description: string;
}

interface ProfileStatus {
  status_code: number;
  status_name: string;
}


interface SearchProfileFiltersProps {
  onFilterSubmit: (filters: any) => void;
  loading: boolean;
}

const SearchProfileFilters = ({ onFilterSubmit, loading }: SearchProfileFiltersProps) => {
  const navigate = useNavigate();

  // State declarations for filters
  const [profileID, setProfileID] = useState<string>('');
  const [profileName, setProfileName] = useState<string>('');
  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  const [profession, setProfession] = useState<Profession[]>([]);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
  const [highestEducation, setHighestEducation] = useState<HighestEducation[]>([]);
  const [state, setState] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [complexion, setComplexion] = useState<Complexion[]>([]);
  const [membership, setMembership] = useState<Membership[]>([]);
  const [familyStatus, setFamilyStatus] = useState<FamilyStatus[]>([]);
  const [selectedComplexions, setSelectedComplexions] = useState<String[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<String[]>([]);
  const [heightFrom, setHeightFrom] = useState<string>('');
  const [ageFrom, setAgeFrom] = useState<string>('');
  const [ageDifference, setAgeDifference] = useState<string>('');
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [heightTo, setHeightTo] = useState<string>('');
  const [ageTo, setAgeTo] = useState<string>('');
  const [sarpaDhosam, setSarpaDhosam] = useState<string>('');
  const [chevvaiDhosam, setChevvaiDhosam] = useState<string>('');
  const [minAnnualIncome, setMinAnnualIncome] = useState<string>('');
  const [maxAnnualIncome, setMaxAnnualIncome] = useState<string>('');
  const [foreignInterest, setForeignInterest] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedMembership, setSelectedMenbership] = useState<String[]>([]);
  const [hasphotos, setHasPhotos] = useState<string>('');
  const [birthStars, setBirthStars] = useState<any[]>([]);
  const [selectedBirthStars, setSelectedBirthStars] = useState<String[]>([]);
  const [fatherAlive, setFatherAlive] = useState<string>('');
  const [motherAlive, setMotherAlive] = useState<string>('');
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<String[]>([]);
  const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<String[]>([]);
  const [profileStatuses, setProfileStatuses] = useState<ProfileStatus[]>([]);
  const [mobileNo, setMobileNo] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [selectedProfileStatus, setSelectedProfileStatus] = useState<string>('');

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const annualIncomeData = await userAnnualIncome();
        const professionData = await userProfession();
        const maritalStatusData = await userMaritalStatus();
        const educationData = await userEducation();
        const stateData = await userState();
        const cityData = await userCity();
        const complexionData = await userComplexion();
        const membershipData = await userMembership();
        const familyStatusData = await userFamilyStatus();
        const birthStarsData = await getBirthStars();
        const statusData = await getEditProfileViewStatus();

        setAnnualIncome(Object.values(annualIncomeData));
        setProfession(Object.values(professionData));
        setMaritalStatus(Object.values(maritalStatusData));
        setHighestEducation(Object.values(educationData));
        setState(Object.values(stateData));
        setCities(Object.values(cityData));
        setComplexion(Object.values(complexionData));
        setMembership(membershipData.data);
        setFamilyStatus(Object.values(familyStatusData));
        setBirthStars(birthStarsData);
        setProfileStatuses(statusData);
      } catch (error: any) {
        NotifyError(error.message);
      }
    };

    fetchSearchData();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate age inputs
    // if (!ageFrom || ageFrom.trim() === '') {
    //   NotifyError("Age from cannot be empty");
    //   return;
    // }

    // if (!ageTo || ageTo.trim() === '') {
    //   NotifyError("Age to cannot be empty");
    //   return;
    // }

    const ageFromNum = Number(ageFrom);
    const ageToNum = Number(ageTo);

    if (isNaN(ageFromNum)) {
      NotifyError("Age from must be a valid number");
      return;
    }

    if (isNaN(ageToNum)) {
      NotifyError("Age to must be a valid number");
      return;
    }

    if (ageFromNum > ageToNum) {
      NotifyError("Age from cannot be greater than age to");
      return;
    }

    // if (ageFromNum < 18 ) {
    //   NotifyError("Age From must be not less than 18 ");
    //   return;
    // }

    //   if ( ageToNum > 100) {
    //   NotifyError("Age to must be not greater than 100");
    //   return;
    // }

    // Validate height inputs
    if (heightFrom && isNaN(Number(heightFrom))) {
      NotifyError("Height from must be a valid number");
      return;
    }

    if (heightTo && isNaN(Number(heightTo))) {
      NotifyError("Height to must be a valid number");
      return;
    }

    if (heightFrom && heightTo && Number(heightFrom) > Number(heightTo)) {
      NotifyError("Height from cannot be greater than height to");
      return;
    }

    // Prepare filter data
    const filters = {
      profileID,
      profileName,
      selectedComplexions,
      selectedEducation,
      heightFrom,
      heightTo,
      minAnnualIncome,
      maxAnnualIncome,
      foreignInterest,
      selectedState,
      selectedCity,
      selectedMembership,
      hasphotos,
      selectedBirthStars: selectedBirthStars.join(","),
      ageDifference,
      selectedProfessions,
      ageFrom,
      ageTo,
      sarpaDhosam,
      chevvaiDhosam,
      fatherAlive,
      motherAlive,
      selectedMaritalStatus,
      selectedFamilyStatus,
      mobileNo,
      dob,
      selectedProfileStatus,
    };

    // Pass filters to parent component
    onFilterSubmit(filters);
  };

  const handleEducationChange = (EducationID: String) => {
    setSelectedEducation(prev =>
      prev.includes(EducationID)
        ? prev.filter(id => id !== EducationID)
        : [...prev, EducationID]
    );
  };

  const handleComplexionChange = (complexionId: String) => {
    setSelectedComplexions(prev =>
      prev.includes(complexionId)
        ? prev.filter(id => id !== complexionId)
        : [...prev, complexionId]
    );
  };

  const handleMembershipChange = (MembershipID: String) => {
    setSelectedMenbership(prev =>
      prev.includes(MembershipID)
        ? prev.filter(id => id !== MembershipID)
        : [...prev, MembershipID]
    );
  };

  const handleBirthStarChange = (starId: String) => {
    setSelectedBirthStars(prev =>
      prev.includes(starId)
        ? prev.filter(id => id !== starId)
        : [...prev, starId]
    );
  };

  const handleProfessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedProfessions((prev) => {
      if (isChecked) {
        return prev.includes(value) ? prev : [...prev, value];
      } else {
        return prev.filter((id) => id !== value);
      }
    });
  };

  const handleMaritalStatusChange = (statusId: String) => {
    setSelectedMaritalStatus(prev =>
      prev.includes(statusId)
        ? prev.filter(id => id !== statusId)
        : [...prev, statusId]
    );
  };

  const handleFamilyStatusChange = (statusId: String) => {
    setSelectedFamilyStatus(prev =>
      prev.includes(statusId)
        ? prev.filter(id => id !== statusId)
        : [...prev, statusId]
    );
  };

  return (
    <form id="filter-form" onSubmit={handleSubmit}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-6 text-black">Search Profile</h1>
          {/* <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-sm px-3 py-2 focus-within:outline-none disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Filter Matching Records'}
          </button> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            form="filter-form" // Add this to associate with the form
            sx={{
              minWidth: '200px',
              height: '40px'
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Filter Matching Records'}
          </Button>
        </div>

        {/* Filter Form */}
        {/* <form onSubmit={handleSubmit}> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {/* Profile ID */}
          <div className="flex flex-col">
            <label className="text-[18px] text-black font-semibold mb-2">
              Profile ID
            </label>
            <input
              type="text"
              placeholder="Enter Profile ID"
              value={profileID}
              className="w-full px-4 py-2 border border-black rounded"
              onChange={(e) => setProfileID(e.target.value)}
            />
          </div>

          {/* Profile Name */}
          <div className="flex flex-col">
            <label className="text-[18px] text-black font-semibold mb-2">
              Profile Name
            </label>
            <input
              type="text"
              value={profileName}
              placeholder="Enter Profile Name"
              className="w-full px-4 py-2 border border-black rounded"
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex flex-col">
              <label className="text-[18px] text-black font-semibold mb-2">
                Age from
              </label>
              <input
                // value={ageFrom}

                placeholder='Enter AgeFrom'
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) >= 18 && Number(value) <= 100)) {
                    setAgeFrom(value)
                  }
                }}
                className="w-full px-4 py-2 border border-black rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[18px] text-black font-semibold mb-2">
                Age To
              </label>
              <input
                // value={ageTo}

                placeholder='Enter AgeTo'
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (Number(value) >= 18 && Number(value) <= 100)) {
                    setAgeTo(value)
                  }
                }}
                className="w-full px-4 py-2 border border-black rounded"
              />
            </div>
          </div>

          {/* Height Range */}
          <div className="flex items-center space-x-5">
            <div className="flex flex-col">
              <label className="text-[18px] text-black font-semibold mb-2">
                Height from
              </label>
              <input
                value={heightFrom}
                placeholder='Enter HeightFrom'
                onChange={(e) => setHeightFrom(e.target.value)}
                className="w-full px-4 py-2 border border-black rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[18px] text-black font-semibold mb-2">
                Height To
              </label>
              <input
                placeholder='Enter HeightTo'
                value={heightTo}
                onChange={(e) => setHeightTo(e.target.value)}
                className="w-full px-4 py-2 border border-black rounded"
              />
            </div>
          </div>

          {/* Sarpa Dhosham */}
          <div className="flex flex-col">
            <label className="text-[18px] text-black font-semibold mb-2">
              Sarpa Dhosham
            </label>
            <select
              className="w-full outline-none px-4 py-2.5 border border-black rounded"
              value={sarpaDhosam}
              onChange={(e) => setSarpaDhosam(e.target.value)}
            >
              <option value="" disabled>-- Select Sarpa Dhosham --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Chevvai Dhosam */}
          <div className="flex flex-col">
            <label className="text-[18px] text-black font-semibold mb-2">
              Chevvai Dhosam
            </label>
            <select
              className="w-full outline-none px-4 py-2.5 border border-black rounded"
              value={chevvaiDhosam}
              onChange={(e) => setChevvaiDhosam(e.target.value)}
            >
              <option value="" disabled>-- Select Chevvai Dhosam --</option>

              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Father Alive */}
          <div className="flex flex-col">
            <label className="text-[18px] text-black font-semibold mb-2">
              Father Alive
            </label>
            <select
              className="w-full outline-none px-4 py-2.5 border border-black rounded"
              value={fatherAlive}
              onChange={(e) => setFatherAlive(e.target.value)}
            >
              <option value="" disabled>-- Select Father Status --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Mother Alive */}
          <div className="flex flex-col">
            <label className="text-[18px] text-black font-semibold mb-2">
              Mother Alive
            </label>
            <select
              className="w-full outline-none px-4 py-2.5 border border-black rounded"
              value={motherAlive}
              onChange={(e) => setMotherAlive(e.target.value)}
            >
              <option value="" disabled>-- Select Mother Status --</option>
              {/* <option value="">Unknown</option> */}
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Matching Stars */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">Birth Stars</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {birthStars.map((star) => (
              <div key={star.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`birthStar-${star.id}`}
                  value={star.id.toString()}
                  className="mr-2"
                  checked={selectedBirthStars.includes(star.id.toString())}
                  onChange={() => handleBirthStarChange(star.id.toString())}
                />
                <label htmlFor={`birthStar-${star.id}`} className="text-sm">
                  {star.star}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Highest Education */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">Education</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {highestEducation.map((education) => (
              <div key={education.education_id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`highestEducation-${education.education_id}`}
                  value={education.education_id.toString()}
                  className="mr-2"
                  checked={selectedEducation.includes(education.education_id.toString())}
                  onChange={() => handleEducationChange(education.education_id.toString())}
                />
                <label htmlFor={`highestEducation-${education.education_id}`} className="text-sm">
                  {education.education_description}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Profession */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">Profession</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {profession.map((prof) => (
              <div key={prof.Profes_Pref_id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`profession-${prof.Profes_Pref_id}`}
                  value={prof.Profes_Pref_id.toString()}
                  checked={selectedProfessions.includes(prof.Profes_Pref_id.toString())}
                  onChange={handleProfessionChange}
                  className="mr-2"
                />
                <label htmlFor={`profession-${prof.Profes_Pref_id}`} className="text-sm">
                  {prof.Profes_name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Marital Status */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">Marital Status</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {maritalStatus.map((status) => (
              <div key={status.marital_sts_id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`maritalStatus-${status.marital_sts_id}`}
                  value={status.marital_sts_id.toString()}
                  className="mr-2"
                  checked={selectedMaritalStatus.includes(status.marital_sts_id.toString())}
                  onChange={() => handleMaritalStatusChange(status.marital_sts_id.toString())}
                />
                <label htmlFor={`maritalStatus-${status.marital_sts_id}`} className="text-sm">
                  {status.marital_sts_name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Family Status */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">Family Status</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {familyStatus.map((status) => (
              <div key={status.family_status_id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`familyStatus-${status.family_status_id}`}
                  value={status.family_status_id.toString()}
                  className="mr-2"
                  checked={selectedFamilyStatus.includes(status.family_status_id.toString())}
                  onChange={() => handleFamilyStatusChange(status.family_status_id.toString())}
                />
                <label htmlFor={`familyStatus-${status.family_status_id}`} className="text-sm">
                  {status.family_status_name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Complexion */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">Complexion</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {complexion.map((complex) => (
              <div key={complex.complexion_id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`complexion-${complex.complexion_id}`}
                  value={complex.complexion_id.toString()}
                  className="mr-2"
                  checked={selectedComplexions.includes(complex.complexion_id.toString())}
                  onChange={() => handleComplexionChange(complex.complexion_id.toString())}
                />
                <label htmlFor={`complexion-${complex.complexion_id}`} className="text-sm">
                  {complex.complexion_description}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Annual Income */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">Annual Income</h2>
          </div>
          <div className="flex items-center space-x-5">
            <div>
              <select
                name="minAnnualIncome"
                id="minAnnualIncome"
                value={minAnnualIncome}
                onChange={(e) => setMinAnnualIncome(e.target.value)}
                className="w-72 outline-none px-4 py-2.5 border border-black rounded"
              >
                <option value="">Select Min Annual Income</option>
                {annualIncome.map((option) => (
                  <option key={option.income_id} value={option.income_id}>
                    {option.income_description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="maxAnnualIncome"
                id="maxAnnualIncome"
                value={maxAnnualIncome}
                onChange={(e) => setMaxAnnualIncome(e.target.value)}
                className="w-72 outline-none px-4 py-2.5 border border-black rounded"
              >
                <option value="">Select Max Annual Income</option>
                {annualIncome.map((option) => (
                  <option key={option.income_id} value={option.income_id}>
                    {option.income_description}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* State & City */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">State and City</h2>
          </div>
          <div className="flex items-center space-x-5">
            <div>
              <select
                name="selectedState"
                id="selectedState"
                className="w-72 outline-none px-4 py-2.5 border border-black rounded"
                value={selectedState || ""}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {state.map((option) => (
                  <option key={option.State_Pref_id} value={option.State_Pref_id}>
                    {option.State_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="selectedCity"
                id="selectedCity"
                value={selectedCity || ""}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-72 outline-none px-4 py-2.5 border border-black rounded"
              >
                <option value="">Select City</option>
                {cities.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Membership */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">Membership</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {membership.map((plan) => (
              <div key={plan.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`plan-${plan.id}`}
                  value={plan.id.toString()}
                  className="mr-2"
                  checked={selectedMembership.includes(plan.id.toString())}
                  onChange={() => handleMembershipChange(plan.id.toString())}
                />
                <label htmlFor={`plan-${plan.id}`} className="text-sm">
                  {plan.plan_name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sarpa Dhosam */}
          <div className="flex flex-col">
            <label className="text-[18px] text-black font-semibold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-72 outline-none px-4 py-2.5 border border-black rounded"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* Chevvai Dhosam */}
          <div className="flex flex-col ">
            <label className="text-[18px] text-black font-semibold mb-2">
              Mobile No
            </label>
            <input
              type="tel"
              className="w-72 outline-none px-4 py-2.5 border border-black rounded"
              value={mobileNo}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, ""); // ✅ keep only numbers
                setMobileNo(onlyNums);
              }}
              placeholder="Enter Mobile Number"
              maxLength={10} // optional: restrict to 10 digits
            />
          </div>

          {/* Father Alive */}
          <div className="flex flex-col">
            <label className="text-[18px] text-black font-semibold mb-2">
              Profile Status
            </label>
            <select
              className="w-72 outline-none px-4 py-2.5 border border-black rounded"
              value={selectedProfileStatus}
              onChange={(e) => setSelectedProfileStatus(e.target.value)}
            >
              <option value="">Select Profile Status </option>
              {profileStatuses.map((status) => (
                <option key={status.status_code} value={status.status_code}>
                  {status.status_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Foreign Interest */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">Foreign Interest</h2>
          </div>
          <select
            name="foreignInterest"
            id="foreignInterest"
            className="w-full outline-none px-4 py-2.5 border border-black rounded"
            value={foreignInterest}
            onChange={(e) => setForeignInterest(e.target.value)}
          >
            <option value="">Select Option</option>
            <option value="Both">Both</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Has Photo */}
        <div className="py-4">
          <div className="w-fit text-start">
            <h2 className="text-lg text-black font-semibold mb-2">Has Photo</h2>
          </div>
          <select
            name="hasphotos"
            id="hasphotos"
            value={hasphotos}
            onChange={(e) => setHasPhotos(e.target.value)}
            className="w-full outline-none px-4 py-2.5 border border-black rounded"
          >
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* <div className="mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 text-white rounded-sm px-3 py-2 focus-within:outline-none disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Filter Matching Records'}
          </button>
        </div> */}

      </div >
    </form >
  );
};

export default SearchProfileFilters;