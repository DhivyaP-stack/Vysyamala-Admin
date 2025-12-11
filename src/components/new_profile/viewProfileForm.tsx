// import { useQuery } from '@tanstack/react-query';
// import { fetchEditProfileDetails, getProfileListMatch } from '../../action'; //api function
// import ViewBasicDetails from './viewProfileComponents/ViewBasicDetails';
// import ViewEducationalDetails from './viewProfileComponents/ViewEducationalDetails';
// import ViewFamilyDetailsForm from './viewProfileComponents/viewFamilyDetails';
// import ViewHoroDetails from './viewProfileComponents/ViewHoroDetails';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ViewPartnerSettings from './viewProfileComponents/ViewPartnerSettings';
// import ViewUpLoadImages from './viewProfileComponents/ViewUploadImage';
// import { useEffect, useState } from 'react';
// import { downloadProfilePdf } from '../../services/api';

// const ViewProfileForm: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const profileId = queryParams.get('profileId');

//   const { data: profile } = useQuery({
//     queryKey: ['profile'],
//     queryFn: () => fetchEditProfileDetails(profileId),
//     enabled: !!profileId,
//   });
//   const [gender, setGennder] = useState<string>('');
//   const [birthStarId, setBirthStar] = useState<string>('');

//   useEffect(() => {
//     getProfileListMatch(profileId);
//   }, []);

//   const handlePrintProfile = () => {
//     if (profileId) {
//       downloadProfilePdf(profileId);
//     } else {
//       console.error('Profile ID is not available');
//     }
//   };

//   return (
//     <div>
//       <div className='flex space-x-4'>
//         <button
//           onClick={() => navigate(`/matchingProfiles?profileId=${profileId}`)}
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Matching Profiles
//         </button>
//         <button
//           onClick={handlePrintProfile}
//           type="button"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Print Profiles
//         </button>
//       </div>
//       <ViewBasicDetails setGennder={setGennder} profile={profile} />
//       <ViewFamilyDetailsForm profile={profile} />
//       <ViewEducationalDetails profile={profile} />
//       <ViewHoroDetails setBirthStar={setBirthStar} profile={profile} />
//       <ViewPartnerSettings
//         gender={gender}
//         birthStarId={birthStarId}
//         profile={profile}
//       />
//       <ViewUpLoadImages />
//       {/* <ViewAddonPackage profile={profile} /> */}
//     </div>
//   );
// };

// export default ViewProfileForm;

import { useQuery } from '@tanstack/react-query';
import { fetchEditProfileDetails, getProfileListMatch } from '../../action'; //api function
import ViewBasicDetails from './viewProfileComponents/ViewBasicDetails';
import ViewEducationalDetails from './viewProfileComponents/ViewEducationalDetails';
import ViewFamilyDetailsForm from './viewProfileComponents/viewFamilyDetails';
import ViewHoroDetails from './viewProfileComponents/ViewHoroDetails';
import { useLocation, useNavigate } from 'react-router-dom';
import ViewPartnerSettings from './viewProfileComponents/ViewPartnerSettings';
import ViewUpLoadImages from './viewProfileComponents/ViewUploadImage';
import { useEffect, useRef, useState } from 'react';
import { downloadProfilePdf } from '../../services/api';
import ViewProfileButton from '../../matchingProfile/ViewProfileButton';
import ViewSuggestedProfile from './viewProfileComponents/ViewSuggestedProfile';
import ViewProfileView from './viewProfileComponents/ViewProfileView';
import ViewProfile from './viewProfileComponents/ViewProfile';
import { ViewProfileVisibility } from './viewProfileComponents/ViewProfileVisibility';
import { hasPermission } from '../utils/auth';



const ViewProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get('profileId');

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchEditProfileDetails(profileId),
    enabled: !!profileId,
  });
  console.log(profile)
  const [gender, setGennder] = useState<string>('');
  const [birthStarId, setBirthStar] = useState<string>('');
  const [isViewDetais, setViewDetail] = useState(true);
  const [isViewDetai, setViewDetails] = useState(true);
  const viewProfileViewRef = useRef<HTMLDivElement | null>(null)
  // useEffect(() => {
  //   getProfileListMatch(profileId);
  // }, []);

  const handlePrintProfile = () => {
    if (profileId) {
      downloadProfilePdf(profileId);
    } else {
      console.error('Profile ID is not available');
    }
  };


  // useEffect(()=>{
  //   if(viewProfileViewRef.current){
  //     viewProfileViewRef.current.scrollIntoView({beh})
  //   }
  // },[])
  useEffect(() => {
    if (viewProfileViewRef.current) {
      viewProfileViewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className=" p-5 mb-10 max-md:p-0">

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 p-4 gap-4"> */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-4 gap-4">

        <ViewProfileButton
          type="submit"
          label="Matching Profiles"
          path="matchingProfiles"
          profileId={profileId ?? ''}
           
        />

        <button
          onClick={handlePrintProfile}
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Print Profiles
        </button>

        <ViewProfileButton
          type="submit"
          label=" ViewedProfiles"
          path="ViewedProfilesById"
          profileId={profileId ?? ''}
        />

        <ViewProfileButton
          type="submit"
          label="Get Photo Request "
          path="GetPhotoRequestProfile"
          profileId={profileId ?? ''}
        />

        <ViewProfileButton
          type="submit"
          label="vysassist"
          path="VysaAssist"
          profileId={profileId ?? ''}
        />

        <ViewProfileButton
          type="submit"
          label="Personal Notes"
          path="PersonalNotes"
          profileId={profileId ?? ''}
        />
        <ViewProfileButton
          type="submit"
          label="Express Interest "
          path="ExpressInterestProfiles"
          profileId={profileId ?? ''}
        />

        <button
          onClick={() => navigate(`/LoginDetails `)}
          className={`bg-blue-500 text-white px-4 py-2 rounded `}
        >
          LoginDetails
        </button>
        <ViewProfileButton
          type="submit"
          label="Profile Sent To"
          path="ProfileSentTo"
          profileId={profileId ?? ''}
        />
       
       <ViewProfileButton
          type="submit"
          label="Visitor Profile"
          path="VisitorProfilesById"
          profileId={profileId ?? ''}
        />
      </div> */}

      {/* <div className='flex justify-end'>
        <button className={`bg-blue-500 text-white px-4 py-2 rounded al `} onClick={() =>
          navigate(`/editProfile?profileId=${profileId}`)
        }>To edit this form</button>
      </div> */}
      <div className="sticky left-0 top-[65px] w-full bg-transparent z-50 px-5 py-4">
        <div className='container flex justify-between'>
          <button
            className="  text-orange-500 text-title-md">
            {profileId}
          </button>
          {hasPermission('edit_profile_admin') && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition-colors"
              onClick={() => navigate(`/editProfile?profileId=${profileId}`)}
            >
              To edit this form
            </button>
          )}
        </div>
      </div>
      <div className='mt-6'>
        <div ref={viewProfileViewRef}>
          <ViewProfile isViewDetai={isViewDetai} setViewDetails={setViewDetails} profile={profile} />
        </div>
        {/* <ViewProfileView isViewDetais={isViewDetais} setViewDetail={setViewDetail} profile={profile}  />  */}
        <ViewBasicDetails setGennder={setGennder} profile={profile} />
        <ViewFamilyDetailsForm profile={profile} />
        <ViewEducationalDetails profile={profile} />
        <ViewHoroDetails setBirthStar={setBirthStar} profile={profile} />
        <ViewPartnerSettings gender={gender} birthStarId={birthStarId} profile={profile} />
        <ViewSuggestedProfile gender={gender} birthStarId={birthStarId} profile={profile} />
        <ViewProfileVisibility profile={profile} />
        {/* <ViewUpLoadImages /> */}
        {/* <ViewAddonPackage profile={profile} /> */}
      </div>

    </div>

  );
};

export default ViewProfileForm;
