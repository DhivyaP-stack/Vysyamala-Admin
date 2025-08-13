import React from 'react';
import ProbsProfiletable from '../ProbsProfileTable';



const DeletedProfilesProfiles: React.FC = () => {
  return <ProbsProfiletable pageNameValue={4} heading={'Deleted Profiles'} plan_ids={''} />; // Pass the pageNameValue prop here
};

export default DeletedProfilesProfiles;
