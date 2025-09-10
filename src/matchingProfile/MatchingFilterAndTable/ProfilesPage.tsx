// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { UserMatchingProfilesFilter } from './UserMatchingProfilesFilter';
// import { UserMatchingProfilesTable } from './UserMatchingProfilesTable';
 
// interface ProfilesPageProps {
//     profileType: 'matching' | 'suggested';
//     No_Image_Available:any;
//     Name:string;
// }
 
// export const ProfilesPage = ({ profileType,No_Image_Available,Name }: ProfilesPageProps) => {
//     const location = useLocation();
//     const query = new URLSearchParams(location.search);
//     const profileID = query.get('profileId');
   
//     const [showTable, setShowTable] = useState(false);
//     const [filters, setFilters] = useState<any>(null);
//     const [loading, setLoading] = useState(false);
 
//     const handleFilterSubmit = (filterData: any) => {
//         setFilters(filterData);
//         setShowTable(true);
//     };
 
//     const handleBack = () => {
//         setShowTable(false);
//         setFilters(null);
//     };
 
//     return (
//         <div>
//             {!showTable ? (
//                 <UserMatchingProfilesFilter
//                     profileID={profileID}
//                     onFilterSubmit={handleFilterSubmit}
//                     loading={loading}
//                     profileType={profileType}
//                     Name={Name}
//                 />
//             ) : (
//                 <UserMatchingProfilesTable
//                     profileID={profileID}
//                     filters={filters}
//                     onBack={handleBack}
//                     No_Image_Available={No_Image_Available}
//                     profileType={profileType}
//                 />
//             )}
//         </div>
//     );
// };


// src/components/ProfilesPage.tsx

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserMatchingProfilesFilter } from './UserMatchingProfilesFilter';

interface ProfilesPageProps {
    profileType: 'matching' | 'suggested';
    No_Image_Available: any;
    Name: string;
}

export const ProfilesPage = ({ profileType, No_Image_Available, Name }: ProfilesPageProps) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const profileID = query.get('profileId');
    const [loading, setLoading] = useState(false);

    /**
     * Handles the filter submission by creating a URL with query parameters
     * and opening it in a new tab.
     */
    const handleFilterSubmit = (filterData: any) => {
        const queryParams = new URLSearchParams();
        
        if (profileID) {
            queryParams.append('profileId', profileID);
        }

        // Add all filter data to the query parameters
        for (const key in filterData) {
            if (Object.prototype.hasOwnProperty.call(filterData, key) && filterData[key]) {
                queryParams.append(key, filterData[key]);
            }
        }
        
        // Also pass the profileType to the results page
        queryParams.append('profileType', profileType);
        queryParams.append('name', Name);


        // Construct the new URL and open it in a new tab
        const newUrl = `/MatchingProfileresults?${queryParams.toString()}`;
        window.open(newUrl, '_blank');
    };

    return (
        <div>
            <UserMatchingProfilesFilter
                profileID={profileID}
                onFilterSubmit={handleFilterSubmit}
                loading={loading}
                profileType={profileType}
                Name={Name}
            />
        </div>
    );
};
 