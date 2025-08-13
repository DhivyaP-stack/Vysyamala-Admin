import React from 'react';
import ProbsProfiletable from '../ProbsProfileTable';


const ProspectProfilesProfiles: React.FC = () => {
  return <ProbsProfiletable pageNameValue={1} heading={'Prospect Profiles'} plan_ids={'8'} />; // Pass the pageNameValue prop here
};

export default ProspectProfilesProfiles;
