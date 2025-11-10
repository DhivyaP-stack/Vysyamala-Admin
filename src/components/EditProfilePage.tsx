import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/EditProfilePage.css';
import RasiGrid from './HoroDetails/RasiGrid';
import AmsamGrid from './HoroDetails/AmsamGrid';

const EditProfilePage: React.FC = () => {
  const { ContentId } = useParams<{ ContentId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const refreshData = location.state?.refreshData;
  const [profile, setProfile] = useState<any | null>(null);
  const [familyDetails, setFamilyDetails] = useState<any | null>(null);
  const [educationDetails, setEducationDetails] = useState<any | null>(null);
  const [partnerPreferences, setPartnerPreferences] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onRasiContentsChange = (newContent: React.SetStateAction<never[]>) => {
    setRasiContent(newContent);
  };

  const onAmsamContentsChange = (newContent: React.SetStateAction<never[]>) => {
    setAmsamContent(newContent);
  };

  const [rasiContent, setRasiContent] = useState([]);
  const [amsamContent, setAmsamContent] = useState([])

  const profileFields = [
    'ProfileId',
    'Gender',
    'Mobile_no',
    'EmailId',
    'Profile_marital_status',
    'Profile_dob',
    'Profile_complexion',
    'Profile_address',
    'Profile_country',
    'Profile_state',
    'Profile_city',
    'Profile_pincode',
  ];

  const familyFields = [
    'father_name',
    'father_occupation',
    'mother_name',
    'mother_occupation',
    'family_name',
    'about_self',
    'hobbies',
    'blood_group',
    'Pysically_changed',
    'property_details',
    'property_worth',
    'suya_gothram',
    'uncle_gothram',
    'ancestor_origin',
    'about_family',
  ];

  const educationFields = [
    'highest_education',
    'ug_degeree',
    'about_edu',
    'anual_income',
    'actual_income',
    'work_country',
    'work_state',
    'work_pincode',
    'career_plans',
  ];

  const partnerPrefFields = [
    'pref_age_differences',
    'pref_height_from',
    'pref_education',
    'pref_profession',
    'pref_chevvai',
    'pref_anual_income',
    'pref_ragukethu',
    'pref_marital_status',
    'pref_foreign_intrest',
  ];



  const [occupations, setOccupations] = useState<Occupation[]>([]);

    const [complexionOptions, setComplexionOptions] = useState<ComplexionOption[]>([]);

  useEffect(() => {
    if (!ContentId) {
      console.error('ContentId is undefined');
      setError('ContentId is undefined');
      setLoading(false);
      return;
    }

    console.log('Fetching profile for ContentId:', ContentId);

    const fetchDetails = async () => {
      try {
        const profileResponse = await axios.get(`https://app.vysyamala.com/api/logindetails/${ContentId}/`);
        setProfile(profileResponse.data);

        const profileId = profileResponse.data.ProfileId;
        if (profileId) {
          const familyResponse = await axios.get(`https://app.vysyamala.com/api/profile-familydetails/${profileId}/`);
          setFamilyDetails(familyResponse.data);

          const educationResponse = await axios.get(`https://app.vysyamala.com/api/profile-edudetails/${profileId}/`);
          setEducationDetails(educationResponse.data);

          const partnerPrefResponse = await axios.get(`https://app.vysyamala.com/api/profile-partner-pref/${profileId}/`);
          setPartnerPreferences(partnerPrefResponse.data);
        } else {
          setError('ProfileId is missing from profile data');
        }
      } catch (error) {
        setError('Error fetching profile, family, education, or partner preferences data');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [ContentId]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFamilyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFamilyDetails({ ...familyDetails, [name]: value });
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducationDetails({ ...educationDetails, [name]: value });
  };

  const handlePartnerPrefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPartnerPreferences({ ...partnerPreferences, [name]: value });
  };


  useEffect(() => {
    const fetchOccupations = async () => {
      try {
        const response = await axios.post(` https://app.vysyamala.com/auth/Get_Parent_Occupation/`);
        const options = Object.values(response.data) as Occupation[];
        setOccupations(options);
      } catch (error) {
        console.error("Error fetching marital status options:", error);
      }
    };
    fetchOccupations();
  }, []);

  useEffect(() => {
    const fetchComplexionStatus = async () => {
      try {
        const response = await axios.post(" https://app.vysyamala.com/auth/Get_Complexion/");
        const options = Object.values(response.data) as ComplexionOption[];
        setComplexionOptions(options);
      } catch (error) {
        console.error("Error fetching complexion options:", error);
      }
    };
    fetchComplexionStatus();
  }, []);

  const handleChange = async () => {
    try {
      await axios.put(`https://app.vysyamala.com/api/logindetails/${ContentId}/`, profile);

      if (profile?.ProfileId) {
        await axios.put(`https://app.vysyamala.com/api/profile-familydetails/${profile.ProfileId}/`, familyDetails);
        await axios.put(`https://app.vysyamala.com/api/profile-edudetails/${profile.ProfileId}/`, educationDetails);
        await axios.put(`https://app.vysyamala.com/api/profile-partner-pref/${profile.ProfileId}/`, partnerPreferences);
      }

      if (refreshData) {
        refreshData();
      }
      navigate('/admin'); // Redirect back to admin page after saving
    } catch (error) {
      setError('Error saving profile, family, education, or partner preferences data');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://app.vysyamala.com/api/logindetails/${ContentId}/`);

      if (profile?.ProfileId) {
        await axios.delete(`https://app.vysyamala.com/api/profile-familydetails/${profile.ProfileId}/`);
        await axios.delete(`https://app.vysyamala.com/api/profile-edudetails/${profile.ProfileId}/`);
        await axios.delete(`https://app.vysyamala.com/api/profile-partner-pref/${profile.ProfileId}/`);
      }

      if (refreshData) {
        refreshData();
      }
      navigate('/admin'); // Redirect back to admin page after deleting
    } catch (error) {
      setError('Error deleting profile, family, education, or partner preferences data');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  function handleInputChange(_e: React.ChangeEvent<HTMLSelectElement>, _arg1: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="edit-profile-page ">
      <h2>Edit Profile</h2>
      <div className="w-full">
        <label className="block text-black font-medium mb-1 	">Status</label>
        <select
          name="Profile_country"
          className="outline-none w-full px-4 py-2 border border-black rounded w-48"
          onChange={(e) => handleInputChange(e, 'basicDetails')}
        >
          <option value="">New</option>
          <option value="">Approved</option>
          <option value="">Pending</option>
          <option value="">Hide</option>
          <option value="">Delete</option>
        </select>
      </div>

      <div className="form-container">
        <div className="form-container">
          <div className="form-group" key="ProfileId">
            <label htmlFor="ProfileId">ProfileId</label>
            <input
              id="ProfileId"
              name="ProfileId"
              type="text"
              value={profile.ProfileId || ''}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group" key="Gender">
            <label htmlFor="Gender">Gender</label>
            <input
              id="Gender"
              name="Gender"
              type="text"
              value={profile.Gender || ''}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group" key="Mobile_no">
            <label htmlFor="Mobile_no">Mobile_no</label>
            <input
              id="Mobile_no"
              name="Mobile_no"
              type="text"
              value={profile.Mobile_no || ''}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group" key="EmailId">
            <label htmlFor="EmailId">EmailId</label>
            <input
              id="EmailId"
              name="EmailId"
              type="text"
              value={profile.EmailId || ''}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group" key="Profile_complexion">
            <label htmlFor="Profile_complexion">Profile marital status</label>
            <select
              id="Profile_marital_status"
              name="Profile_marital_status"
              type="text"
              value={profile.Profile_marital_status || ''}
              onChange={handleProfileChange}
              className="form-control"
            >
              <option value="">Select Complexion</option>
              <option value="Widowed">Widowed</option>
              <option value="Divorced">Divorced</option>
              <option value="Separated">Separated</option>
              <option value="Marriage">Marriage</option>
              <option value="Single">Single</option>
            </select>
          </div>

          <div className="form-group" key="Profile_dob">
            <label htmlFor="Profile_dob">Profile_dob</label>
            <input
              id="Profile_dob"
              name="Profile_dob"
              type="text"
              value={profile.Profile_dob || ''}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group" key="Profile_complexion">
            <label htmlFor="Profile_complexion">Profile Complexion</label>
            <select
              id="Profile_complexion"
              name="Profile_complexion"
              className="form-control"
              value={profile.Profile_complexion || ''}
              onChange={handleProfileChange}
              >
              <option value="" selected disabled>
                Select your complexion
              </option>
              {complexionOptions.map((option) => (
                <option
                  key={option.complexion_id}
                  value={option.complexion_id}
                >
                  {option.complexion_description}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" key="Profile_address">
            <label htmlFor="Profile_address">Profile_address</label>
            <input
              id="Profile_address"
              name="Profile_address"
              type="text"
              value={profile.Profile_address || ''}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group" key="Profile_country">
            <label htmlFor="Profile_country">Profile_country</label>
            <input
              id="Profile_country"
              name="Profile_country"
              type="text"
              value={profile.Profile_country || ''}
              onChange={handleProfileChange}
            />
          </div>


          <div className="form-group" key="Profile_state">
            <label htmlFor="Profile_state">Profile_state</label>
            <input
              id="Profile_state"
              name="Profile_state"
              type="text"
              value={profile.Profile_state || ''}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group" key="Profile_city">
            <label htmlFor="Profile_city">Profile_city</label>
            <input
              id="Profile_city"
              name="Profile_city"
              type="text"
              value={profile.Profile_city || ''}
              onChange={handleProfileChange}
            />
          </div>
          <div className="form-group" key="Profile_pincode">
            <label htmlFor="Profile_pincode">Profile_pincode</label>
            <input
              id="Profile_pincode"
              name="Profile_pincode"
              type="text"
              value={profile.Profile_pincode || ''}
              onChange={handleProfileChange}
            />
          </div>
        </div>



        <div className="form-container">
          <div className="form-group" key="father_name">
            <label htmlFor="father_name">Father's Name</label>
            <input
              id="father_name"
              name="father_name"
              type="text"
              value={familyDetails.father_name || ''}
              onChange={handleFamilyChange}
            />
          </div>

          <div className="form-group" key="Profile_complexion">
            <label htmlFor="Profile_complexion">Father's Occupation</label>
            <select
              id="father_occupation"
              name="father_occupation"
              type="text"
              className="form-control"
              value={familyDetails.father_occupation || ''}
              onChange={handleFamilyChange}
            >
              <option value="" disabled selected>
                -- Select Occupation --
              </option>
              {occupations.map((occupation) => (
                <option key={occupation.occupation_id} value={occupation.occupation_description}>
                  {occupation.occupation_description}
                </option>
              ))}
            </select>
          </div>


          <div className="form-group" key="mother_name">
            <label htmlFor="mother_name">Mother's Name</label>
            <input
              id="mother_name"
              name="mother_name"
              type="text"
              value={familyDetails.mother_name || ''}
              onChange={handleFamilyChange}
            />
          </div>




          <div className="form-group" key="Profile_complexion">
            <label htmlFor="Profile_complexion">Mother's Occupation</label>
            <select
              id="mother_occupation"
              name="mother_occupation"
              type="text"
              value={familyDetails.mother_occupation || ''}
              onChange={handleFamilyChange}
              className="form-control"
            >
              <option value="" disabled selected>
                -- Select Occupation --
              </option>
              {occupations.map((occupation) => (
                <option key={occupation.occupation_id} value={occupation.occupation_description}>
                  {occupation.occupation_description}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" key="family_name">
            <label htmlFor="family_name">Family Name</label>
            <input
              id="family_name"
              name="family_name"
              type="text"
              value={familyDetails.family_name || ''}
              onChange={handleFamilyChange}
            />
          </div>
          <div className="form-group" key="about_self">
            <label htmlFor="about_self">About Self</label>
            <input
              id="about_self"
              name="about_self"
              type="text"
              value={familyDetails.about_self || ''}
              onChange={handleFamilyChange}
            />
          </div>
          <div className="form-group" key="hobbies">
            <label htmlFor="hobbies">Hobbies</label>
            <input
              id="hobbies"
              name="hobbies"
              type="text"
              value={familyDetails.hobbies || ''}
              onChange={handleFamilyChange}
            />
          </div>
          <div className="form-group" key="blood_group">
            <label htmlFor="blood_group">Blood Group</label>
            <input
              id="blood_group"
              name="blood_group"
              type="text"
              value={familyDetails.blood_group || ''}
              onChange={handleFamilyChange}
            />
          </div>
          <div className="form-group" key="Pysically_changed">
            <label htmlFor="Pysically_changed">Physically Changed</label>
            <input
              id="Pysically_changed"
              name="Pysically_changed"
              type="text"
              value={familyDetails.Pysically_changed || ''}
              onChange={handleFamilyChange}
            />
          </div>
          <div className="form-group" key="property_details">
            <label htmlFor="property_details">Property Details</label>
            <input
              id="property_details"
              name="property_details"
              type="text"
              value={familyDetails.property_details || ''}
              onChange={handleFamilyChange}
            />
          </div>
          <div className="form-group" key="property_worth">
            <label htmlFor="property_worth">Property Worth</label>
            <input
              id="property_worth"
              name="property_worth"
              type="text"
              value={familyDetails.property_worth || ''}
              onChange={handleFamilyChange}
            />
          </div>
          <div className="form-group" key="suya_gothram">
            <label htmlFor="suya_gothram">Suya Gothram</label>
            <input
              id="suya_gothram"
              name="suya_gothram"
              type="text"
              value={familyDetails.suya_gothram || ''}
              onChange={handleFamilyChange}
            />
          </div>
          <div className="form-group" key="uncle_gothram">
            <label htmlFor="uncle_gothram">Uncle Gothram</label>
            <input
              id="uncle_gothram"
              name="uncle_gothram"
              type="text"
              value={familyDetails.uncle_gothram || ''}
              onChange={handleFamilyChange}
            />
          </div>
          <div className="form-group" key="ancestor_origin">
            <label htmlFor="ancestor_origin">Ancestor Origin</label>
            <input
              id="ancestor_origin"
              name="ancestor_origin"
              type="text"
              value={familyDetails.ancestor_origin || ''}
              onChange={handleFamilyChange}
            />
          </div>
          <div className="form-group" key="about_family">
            <label htmlFor="about_family">About Family</label>
            <input
              id="about_family"
              name="about_family"
              type="text"
              value={familyDetails.about_family || ''}
              onChange={handleFamilyChange}
            />
          </div>
        </div>

        <div className="form-container">
          <div className="form-group" key="highest_education">
            <label htmlFor="highest_education">Highest Education</label>
            <input
              id="highest_education"
              name="highest_education"
              type="text"
              value={educationDetails.highest_education || ''}
              onChange={handleEducationChange}
            />
          </div>
          <div className="form-group" key="ug_degree">
            <label htmlFor="ug_degree">UG Degree</label>
            <input
              id="ug_degree"
              name="ug_degree"
              type="text"
              value={educationDetails.ug_degree || ''}
              onChange={handleEducationChange}
            />
          </div>
          <div className="form-group" key="about_edu">
            <label htmlFor="about_edu">About Education</label>
            <input
              id="about_edu"
              name="about_edu"
              type="text"
              value={educationDetails.about_edu || ''}
              onChange={handleEducationChange}
            />
          </div>
          <div className="form-group" key="annual_income">
            <label htmlFor="annual_income">Annual Income</label>
            <input
              id="annual_income"
              name="annual_income"
              type="text"
              value={educationDetails.annual_income || ''}
              onChange={handleEducationChange}
            />
          </div>
          <div className="form-group" key="actual_income">
            <label htmlFor="actual_income">Actual Income</label>
            <input
              id="actual_income"
              name="actual_income"
              type="text"
              value={educationDetails.actual_income || ''}
              onChange={handleEducationChange}
            />
          </div>
          <div className="form-group" key="work_country">
            <label htmlFor="work_country">Work Country</label>
            <input
              id="work_country"
              name="work_country"
              type="text"
              value={educationDetails.work_country || ''}
              onChange={handleEducationChange}
            />
          </div>
          <div className="form-group" key="work_state">
            <label htmlFor="work_state">Work State</label>
            <input
              id="work_state"
              name="work_state"
              type="text"
              value={educationDetails.work_state || ''}
              onChange={handleEducationChange}
            />
          </div>
          <div className="form-group" key="work_pincode">
            <label htmlFor="work_pincode">Work Pincode</label>
            <input
              id="work_pincode"
              name="work_pincode"
              type="text"
              value={educationDetails.work_pincode || ''}
              onChange={handleEducationChange}
            />
          </div>
          <div className="form-group" key="career_plans">
            <label htmlFor="career_plans">Career Plans</label>
            <input
              id="career_plans"
              name="career_plans"
              type="text"
              value={educationDetails.career_plans || ''}
              onChange={handleEducationChange}
            />
          </div>
        </div>
        {/* //rasigrid */}
        <div>
          <div>
            <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
              Rasi Grid
            </h4>
            <RasiGrid
              centerLabel={'Rasi'}
              onRasiContentsChange={onRasiContentsChange} />
          </div><br /><div>
            <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
              Amsam Grid
            </h4>
            <AmsamGrid
              centerLabel={'Amsam'}
              onAmsamContentsChange={onAmsamContentsChange} />
          </div>
        </div>
      </div>
      <div className="button">
        <button onClick={handleChange} className="btn btn-primary">Save</button>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        <button onClick={() => navigate('/admin')} className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  );
};

export default EditProfilePage;
