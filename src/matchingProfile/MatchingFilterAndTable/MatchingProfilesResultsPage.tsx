// src/components/MatchingProfilesResultsPage.tsx (New File)

import { useLocation } from 'react-router-dom';
import { UserMatchingProfilesTable } from './UserMatchingProfilesTable';
import { Typography } from '@mui/material';

// Assume you have a path to your placeholder image
const No_Image_Available = "/path/to/your/No_Image_Available.png";

export const MatchingProfilesResultsPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const profileID = query.get('profileId');
    const profileType = query.get('profileType') as 'matching' | 'suggested' | null;

    // Reconstruct the filters object from the URL query parameters
    const filters: { [key: string]: any } = {};
    query.forEach((value, key) => {
        filters[key] = value;
    });

    if (!profileID || !profileType) {
        return (
            <div style={{ padding: '20px' }}>
                <Typography variant="h6" color="error">
                    Error: Profile ID or Profile Type is missing. Please go back and try again.
                </Typography>
            </div>
        );
    }

    return (
        <div>
            <UserMatchingProfilesTable
                profileID={profileID}
                filters={filters}
                // The onBack function can now simply close the tab
                onBack={() => window.close()}
                No_Image_Available={No_Image_Available}
                profileType={profileType}
            />
        </div>
    );
};