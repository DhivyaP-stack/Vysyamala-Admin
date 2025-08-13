import React from 'react';
import ProbsProfiletable from '../ProbsProfileTable';



const HiddenProfilesProfiles: React.FC = () => {
  return <ProbsProfiletable pageNameValue={3} heading={'Hidden Profiles'} />; // Pass the pageNameValue prop here
};

export default HiddenProfilesProfiles;
