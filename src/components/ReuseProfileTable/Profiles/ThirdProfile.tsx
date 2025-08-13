import React from 'react';
import ProbsProfiletable from '../ProbsProfileTable';



const PaidProfileProfiles: React.FC = () => {
  return <ProbsProfiletable pageNameValue={1} heading={'Paid Profiles'} plan_ids={'1,2,3,14,15,11,12,13'} />; // Pass the pageNameValue prop here
};

export default PaidProfileProfiles;
  