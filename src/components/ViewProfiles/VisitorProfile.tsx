// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { visitorProfileApi } from "../../services/api";
// import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
// import { Table } from "ckeditor5";
// import { MdVerified } from "react-icons/md";
// import { GoUnverified } from "react-icons/go";
// import { Label } from "@mui/icons-material";

// // Define the shape of an individual visitor profile
// interface VisitorProfile {
//   visited_profileid: string;
//   visited_profile_name: string;
//   visited_Profile_img: string;
//   visited_profile_age: number;
//   visited_verified: number;
//   visited_height: string;
//   visited_star: string;
//   visited_profession: string;
//   visited_city: string;
//   visited_degree: string;
//   visited_match_score: number;
//   visited_views: number;
//   visited_lastvisit: string;
//   visited_userstatus: string;
//   visited_horoscope: string;
//   visited_profile_wishlist: number;
// }

// // Define the shape of the data object returned from the API
// interface VisitorProfileData {
//   profiles: VisitorProfile[];
//   page: number;
//   per_page: number;
//   total_pages: number;
//   total_records: number;
//   all_profile_ids: { [key: string]: string };
// }

// // Define the API response type
// interface ApiResponse {
//   Status: number;
//   message: string;
//   data: VisitorProfileData;
//   viewed_profile_count: number;
// }

// const columns =[
//   {id:"visited_profileid" ,Label:"profileid"}
// ]
// const VisitorProfile: React.FC = () => {
//   const [visitorProfiles, setVisitorProfiles] = useState<VisitorProfileData | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const profileId = queryParams.get("profileId");

//   useEffect(() => {
//     const getVisitor = async () => {
//       if (!profileId) {
//         setError("No profile ID provided");
//         return;
//       }
//       try {
//         const response = await axios.post<ApiResponse>(
//           visitorProfileApi,
//           { profile_id: profileId },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const data = response.data;
//         console.log("Response data:", data);
//         if (data.Status === 1) {
//           setVisitorProfiles(data.data);
//         } else {
//           setError("Failed to fetch profiles");
//         }
//       } catch (err: any) {
//         console.error("Error fetching visitor profiles:", err);
//         setError(err.message || "An error occurred");
//       }
//     };

//     getVisitor();
//   }, [profileId]);

//   // Log profile IDs when data is available
//   useEffect(() => {
//     if (visitorProfiles && visitorProfiles.profiles) {
//       const i = visitorProfiles.profiles.map((i) => i.visited_profileid)
//       console.log(
//         "Profile IDs:",
//        i
//       );
//     }
//   }, [visitorProfiles]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//   <div>
//        {visitorProfiles? (
//          <>
//            <Typography
//              sx={{
//                marginBottom: '20px',
//                color: 'black',
//                fontSize: '1.5rem',
//                fontWeight: 'bold',
//              }}
//            >
//             {columns.map((column) => (
//             <div> Viewed Profiles for Profile ID {column.id}</div>
//             ))}
//            </Typography>
          
//            {/* <TableContainer sx={{ border: '1px solid #E0E0E0' }} component={Paper}>
//              <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                <TableHead style={{ padding: '17px' }}>
//                  <TableRow>
//                    {columns.map((column) => (
//                      <TableCell
//                        sx={{
//                          background: '#FFF9C9',
//                          color: '#ee3448',
//                          fontWeight: 'bold',
//                          fontSize: '1rem',
//                          whiteSpace: 'nowrap',
//                        }}
//                        key={column.id}
//                      >
//                        {column.label}
//                      </TableCell>
//                    ))}
//                  </TableRow>
//                </TableHead>
 
//                <TableBody>
//                  {visitorProfiles?.map((row) => (
//                    <TableRow
//                      key={row.visited_profileid}
//                      sx={{
//                        '&:last-child td, &:last-child th': { border: 0 },
//                        whiteSpace: 'nowrap',
//                      }}
//                    >
//                      <TableCell>
//                        <img
//                          className="rounded-full"
//                          src={row.visited_Profile_img || 'No_Image_Available'}
//                          alt="Profile"
//                          width={80}
//                        />
//                      </TableCell>
//                      <TableCell>{row.visited_profileid}</TableCell>
//                      <TableCell>{row.visited_profile_name}</TableCell>
//                      <TableCell>{row.visited_profile_age}</TableCell>
//                      <TableCell>
//                        {row.visited_verified === 1 ? (
//                          <MdVerified className="text-green-600" />
//                        ) : (
//                          <GoUnverified className="text-red-600" />
//                        )}
//                      </TableCell>
//                      <TableCell>{row.visited_height}</TableCell>
                   
//                    </TableRow>
//                  ))}
//                </TableBody>
//              </Table>
//            </TableContainer>
//            */}
//          </>
//        ) : (
//          <Typography
//            sx={{
//              marginBottom: '20px',
//              color: 'black',
//              fontSize: '1.5rem',
//              fontWeight: 'bold',
//            }}
//          >
//            No Viewed Data
//          </Typography>
//        )}
//      </div>
//   )
// };

// export default VisitorProfile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { visitorProfileApi } from "../../services/api";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";

// Define the shape of an individual visitor profile
interface VisitorProfile {
  visited_profileid: string;
  visited_profile_name: string;
  visited_Profile_img: string;
  visited_profile_age: number;
  visited_verified: number;
  visited_height: string;
  visited_star: string;
  visited_profession: string;
  visited_city: string;
  visited_degree: string;
  visited_match_score: number;
  visited_views: number;
  visited_lastvisit: string;
  visited_userstatus: string;
  visited_horoscope: string;
  visited_profile_wishlist: number;
}

// Define the shape of the data object returned from the API
interface VisitorProfileData {
  profiles: VisitorProfile[];
  page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  all_profile_ids: { [key: string]: string };
}

// Define the API response type
interface ApiResponse {
  Status: number;
  message: string;
  data: VisitorProfileData;
  viewed_profile_count: number;
}

// const columns = [
//   { id: "visited_Profile_img", label: "Image" },
//   { id: "visited_profileid", label: "Profile ID" },
//   { id: "visited_profile_name", label: "Name" },
//   { id: "visited_profile_age", label: "Age" },
//   { id: "visited_verified", label: "Verified" },
//   { id: "visited_height", label: "Height" },
// ];

const columns = [
  { id: "visited_Profile_img", label: "Image" },
  { id: "visited_profileid", label: "Profile ID" },
  { id: "visited_profile_name", label: "Name" },
  { id: "visited_profile_age", label: "Age" },
  { id: "visited_verified", label: "Verified" },
  { id: "visited_height", label: "Height" },
  { id: "visited_star", label: "Star" },
  { id: "visited_profession", label: "Profession" },
  { id: "visited_city", label: "City" },
  { id: "visited_degree", label: "Degree" },
  { id: "visited_match_score", label: "Matching Score" },
  { id: "visited_views", label: "Views" },
  { id: "visited_lastvisit", label: "Last Visit" },
  { id: "visited_userstatus", label: "User Status" },
];

const VisitorProfile: React.FC = () => {
  const [visitorProfiles, setVisitorProfiles] = useState<VisitorProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get("profileId");

  const getVisitor = async () => {
    if (!profileId) {
      setError("No profile ID provided");
      return;
    }
    try {
      // Send pagination parameters along with the profile_id.
      const response = await axios.post<ApiResponse>(
        visitorProfileApi,
        {
          profile_id: profileId,
          page_number: page + 1, // API pages often start at 1
          per_page: rowsPerPage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log("Response data:", data);
      if (data.Status === 1) {
        setVisitorProfiles(data.data);
      } else {
        setError("Failed to fetch profiles");
      }
    } catch (err: any) {
      console.error("Error fetching visitor profiles:", err);
      setError(err.message || "An error occurred");
    }
  };

  // Refetch data when profileId, page, or rowsPerPage changes.
  useEffect(() => {
    getVisitor();
  }, [profileId, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'fromDate') {
      setFromDate(value);
    } else if (name === 'toDate') {
      setToDate(value);
    }
  };
  return (
    <div>
      {visitorProfiles ? (
        <>
          <Typography
            sx={{
              marginBottom: "20px",
              color: "black",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Verified Profiles for Profile ID {profileId}
          </Typography>
                   <Box sx={{display:"flex" ,gap:"5px",marginBottom:"10px"}}>
                   <TextField
                      label="From Date"
                      type="date"
                      name="fromDate"
                      value={fromDate}
                      onChange={handleDateChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="To Date"
                      type="date"
                      name="toDate"
                      value={toDate}
                      onChange={handleDateChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    <Button
                      variant="contained"
                     // onClick={ClearDate}
                      sx={{ textTransform: 'none'}}
                    >
                      Reset Date
                    </Button>
                   </Box>
          <TableContainer sx={{ border: "1px solid #E0E0E0" }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="visitor profiles table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        background: "#FFF9C9",
                        color: "#ee3448",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {visitorProfiles.profiles.map((row) => (
                  <TableRow
                    key={row.visited_profileid}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      whiteSpace: "nowrap",
                    }}
                  >
                    <TableCell>
                      <img
                        className="rounded-full"
                        src={row.visited_Profile_img || "No_Image_Available"}
                        alt={row.visited_profile_name}
                        width={80}
                      />
                    </TableCell>
                    <TableCell>{row.visited_profileid}</TableCell>
                    <TableCell>{row.visited_profile_name}</TableCell>
                    <TableCell>{row.visited_profile_age}</TableCell>
                    <TableCell>
                      {row.visited_verified === 1 ? (
                        <MdVerified className="text-green-600" />
                      ) : (
                        <GoUnverified className="text-red-600" />
                      )}
                    </TableCell>
                    <TableCell>{row.visited_height}</TableCell>
                    <TableCell>{row.visited_star}</TableCell>
                    <TableCell>{row.visited_profession}</TableCell>
                    <TableCell>{row.visited_city}</TableCell>
                    <TableCell>{row.visited_degree}</TableCell>
                    <TableCell>{row.visited_match_score}</TableCell>
                    <TableCell>{row.visited_views}</TableCell>
                    <TableCell>{row.visited_lastvisit}</TableCell>
                    <TableCell>{row.visited_userstatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={visitorProfiles.total_records}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography
          sx={{
            marginBottom: "20px",
            color: "black",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          No Viewed Data
        </Typography>
      )}
    </div>
  );
};

export default VisitorProfile;

