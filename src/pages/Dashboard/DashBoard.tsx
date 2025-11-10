import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import { CgProfile } from 'react-icons/cg';
import { ImProfile } from 'react-icons/im';
import { CiImageOff } from 'react-icons/ci';
import { RiAccountPinCircleFill, RiAdminLine, RiPassPendingFill } from 'react-icons/ri';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface DashboardData {
  new_profiles: number;
  approved_profiles: number;
  pending_profiles: number;
  photo_request_count: number;
  hidden_profiles_count: number;
  quick_upload_count: number;
  paidprofiles_count: number;
  prospect_profiles: number;
  featured_profiles: number;
  deletedprofiles: number;
}

const DashBoard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://app.vysyamala.com/api/dashboard_counts/');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Link to="/NewlyRegistered">
          <CardDataStats
            title="New Profiles"
            total={dashboardData?.new_profiles.toString() || '0'}
            rate=""
          >
            <CgProfile className="text-blue-700 " />
          </CardDataStats>
        </Link>

        <Link to="/ApprovedProfilee">
          <CardDataStats
            title="Approved Profiles"
            total={dashboardData?.approved_profiles.toString() || '0'}
            rate=""
          >
            <ImProfile className="text-blue-700 " />
          </CardDataStats>
        </Link>

        <Link to="/PhotoRequestProfiles">
          <CardDataStats
            title="Photo request count"
            total={dashboardData?.photo_request_count.toString() || '0'}
            rate=""
          >
            <CiImageOff className="text-blue-700 " />
          </CardDataStats>
        </Link>

        <Link to="/HiddenProfilesProfiles">
          <CardDataStats
            title="Hidden Profiles"
            total={dashboardData?.hidden_profiles_count.toString() || '0'}
            rate=""
          >
            <RiAccountPinCircleFill className="text-blue-700 " />
          </CardDataStats>
        </Link>

        <Link to="/QuickUploadProfiles">
          <CardDataStats 
            title="Quick Upload" 
            total={dashboardData?.quick_upload_count.toString() || '0'}
            rate=""
          >
            <FaCloudUploadAlt className="text-blue-700 " />
          </CardDataStats>
        </Link>

        <Link to="/PendingProfiles">
          <CardDataStats 
            title="Pending Profile" 
            total={dashboardData?.pending_profiles.toString() || '0'}
            rate=""
          >
            <RiPassPendingFill className="text-blue-700 " />
          </CardDataStats>
        </Link>

        <Link to="/PaidProfileProfiles">
          <CardDataStats 
            title="Paid Profile" 
            total={dashboardData?.paidprofiles_count.toString() || '0'}
            rate=""
          >
            <RiAdminLine className="text-blue-700 " />
          </CardDataStats>
        </Link>

        <Link to="/ProspectProfilesProfiles">
          <CardDataStats 
            title="Prospect Profile" 
            total={dashboardData?.prospect_profiles.toString() || '0'}
            rate=""
          >
            <CgProfile className="text-blue-700 " />
          </CardDataStats>
        </Link>

        <CardDataStats 
          title="Featured Profile" 
          total={dashboardData?.featured_profiles.toString() || '0'}
          rate=""
        >
          <CgProfile className="text-blue-700 " />
        </CardDataStats>

        <Link to="/DeletedProfilesProfiles">
          <CardDataStats 
            title="Deleted Profile" 
            total={dashboardData?.deletedprofiles.toString() || '0'}
            rate=""
          >
            <CgProfile className="text-blue-700 " />
          </CardDataStats>
        </Link>
      </div>
    </>
  );
};

export default DashBoard;
