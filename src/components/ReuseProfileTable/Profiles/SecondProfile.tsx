import React from 'react';
import ProbsProfiletable from '../ProbsProfileTable';



const PendingProfiles: React.FC = () => {
  return <ProbsProfiletable   pageNameValue={2} heading={'Pending Profiles'} plan_ids={''} />; // Pass the pageNameValue prop here
};

export default PendingProfiles;
