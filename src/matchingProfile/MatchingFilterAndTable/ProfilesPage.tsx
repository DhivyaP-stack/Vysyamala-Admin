import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserMatchingProfilesFilter } from './UserMatchingProfilesFilter';
import { UserMatchingProfilesTable } from './UserMatchingProfilesTable';
 
interface ProfilesPageProps {
    profileType: 'matching' | 'suggested';
    No_Image_Available:any;
    Name:string;
}
 
export const ProfilesPage = ({ profileType,No_Image_Available,Name }: ProfilesPageProps) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const profileID = query.get('profileId');
   
    const [showTable, setShowTable] = useState(false);
    const [filters, setFilters] = useState<any>(null);
    const [loading, setLoading] = useState(false);
 
    const handleFilterSubmit = (filterData: any) => {
        setFilters(filterData);
        setShowTable(true);
    };
 
    const handleBack = () => {
        setShowTable(false);
        setFilters(null);
    };
 
    return (
        <div>
            {!showTable ? (
                <UserMatchingProfilesFilter
                    profileID={profileID}
                    onFilterSubmit={handleFilterSubmit}
                    loading={loading}
                    profileType={profileType}
                    Name={Name}
                />
            ) : (
                <UserMatchingProfilesTable
                    profileID={profileID}
                    filters={filters}
                    onBack={handleBack}
                    No_Image_Available={No_Image_Available}
                    profileType={profileType}
                />
            )}
        </div>
    );
};
 