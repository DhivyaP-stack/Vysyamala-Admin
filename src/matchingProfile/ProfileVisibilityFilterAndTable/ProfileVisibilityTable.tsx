import {
    Avatar,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ActionScore {
    score: number;
    actions: { action: string; datetime: string }[];
}

interface UserMatchingProfilesProps {
    profile_id: string;
    profile_name: string;
    profile_img: string;
    profile_age: number;
    degree: string;
    profession: string;
    city: string;
    state: string;
    anual_income: string;
    family_status: string;
    company_name: string;
    designation: string;
    father_occupation: string;
    star: string;
    suya_gothram: string;
    chevvai: string;
    raguketu: string;
    dateofjoin: string;
    action_score: ActionScore;
    status?: string;
    work_place?: string;
    mode?: string;
    matching_score: string;
}

const columns = [
    { id: "select", label: "Select" },
    { id: "profile_img", label: "Image" },
    { id: "profile_id", label: "Profile ID" },
    { id: "work_place", label: "Work Place" },
    { id: "mode", label: "Mode" },
    { id: "profile_name", label: "Name" },
    { id: "profile_age", label: "Age" },
    { id: "star", label: "Star" },
    { id: "degree", label: "Degree" },
    { id: "profession", label: "Profession" },
    { id: "company_name", label: "Company / Business" },
    { id: "designation", label: "Designation / Nature" },
    { id: "anual_income", label: "Annual Income" },
    { id: "state", label: "State" },
    { id: "city", label: "City" },
    { id: "family_status", label: "Family Status" },
    { id: "father_occupation", label: "Father Business" },
    { id: "suya_gothram", label: "Suya Gothram" },
    { id: "chevvai", label: "Admin Chevvai" },
    { id: "raguketu", label: "Admin Raghu/Kethu" },
    { id: "dateofjoin", label: "Reg Date" },
    // { id: "status", label: "Status" },
    { id: "matching_score", label: "Matching Score" },
    // { id: "action_score", label: "Action" },
];

export const ProfileVisibilityTable = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
    const [profiles, setProfiles] = useState<UserMatchingProfilesProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get filter parameters from URL
    const profileID = searchParams.get('profileId');
    const selectedEducation = searchParams.get('selectedEducation')?.split(',') || [];
    const selectedFieldsOfStudy = searchParams.get('selectedFieldsOfStudy')?.split(',') || [];
    const selectedProfessions = searchParams.get('selectedProfessions')?.split(',') || [];
    const selectedDegrees = searchParams.get('selectedDegrees')?.split(',') || [];
    const heightFrom = searchParams.get('heightFrom') || '';
    const heightTo = searchParams.get('heightTo') || '';
    const minAnnualIncome = searchParams.get('minAnnualIncome') || '';
    const maxAnnualIncome = searchParams.get('maxAnnualIncome') || '';
    const foreignInterest = searchParams.get('foreignInterest') || '';
    const chevvaiDhosam = searchParams.get('chevvaiDhosam') || '';
    const ageFrom = searchParams.get('ageFrom') || '';
    const ageTo = searchParams.get('ageTo') || '';
    const ragukethu = searchParams.get('ragukethu') || '';
    const selectedFamilyStatus = searchParams.get('selectedFamilyStatus')?.split(',') || [];


    useEffect(() => {
        const fetchVisibilityProfiles = async () => {
            if (!profileID) {
                setError("Profile ID is required");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Construct the request body
                const requestBody = {
                    profile_id: profileID,
                    per_page: 50,
                    order_by: "profile_id",
                    search_profession: selectedProfessions.join(','),
                    age_from: ageFrom,
                    age_to: ageTo,
                    education: selectedEducation.join(','),
                    foreign_intrest: foreignInterest,
                    profession: selectedProfessions.join(','),
                    height_from: heightFrom,
                    height_to: heightTo,
                    min_anual_income: minAnnualIncome,
                    max_anual_income: maxAnnualIncome,
                    ragu: ragukethu,
                    chev: chevvaiDhosam,
                    family_status: selectedFamilyStatus.join(','),
                    field_of_study: selectedFieldsOfStudy.join(','),
                    degree: selectedDegrees.join(','),
                    marital_status: ""
                };

                console.log("Request Body:", requestBody);

                const response = await fetch(
                    'https://app.vysyamala.com/api/Get_visibility_list_match/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response:", data);

                // Check different possible response structures
                if (data.success && data.data) {
                    setProfiles(data.data);
                } else if (data.profiles) {
                    setProfiles(data.profiles);
                } else if (Array.isArray(data)) {
                    setProfiles(data);
                } else {
                    console.warn("Unexpected API response structure:", data);
                    setProfiles([]);
                }
            } catch (err: any) {
                setError(err.message || "Failed to fetch profile visibility data");
                console.error("Error fetching visibility profiles:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVisibilityProfiles();
    }, [searchParams, profileID]);

    const handleCheckboxChange = (profileId: string) => {
        setSelectedProfiles((prev) =>
            prev.includes(profileId)
                ? prev.filter((id) => id !== profileId)
                : [...prev, profileId]
        );
    };

    const handleSelectAll = () => {
        if (selectedProfiles.length === profiles.length && profiles.length > 0) {
            setSelectedProfiles([]);
        } else {
            setSelectedProfiles(profiles.map((row) => row.profile_id));
        }
    };

    if (loading) {
        return (
            <Box className="container mx-auto p-4 flex justify-center items-center h-64">
                <CircularProgress />
                <Typography className="ml-4">Loading profile visibility data...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="container mx-auto p-4">
                <Typography color="error" className="text-center">
                    Error: {error}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className="mt-4"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </Box>
        );
    }

    return (
        <Box className="container mx-auto p-4">
            <Box className="mb-4 flex justify-between items-center">
                <Box>
                    <h2 className="text-left text-xl font-bold text-red-600">
                        Vysyamala Profile Visibility
                    </h2>
                    <Typography variant="body2" className="text-gray-600">
                        Profile ID: {profileID} | Results: {profiles.length}
                    </Typography>
                </Box>
            </Box>

            {profiles.length === 0 ? (
                <Paper className="p-8 text-center">
                    <Typography variant="h6" color="textSecondary">
                        No profiles found matching your visibility criteria
                    </Typography>
                </Paper>
            ) : (
                <Paper className="w-full overflow-auto">
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead style={{ background: "#FFF9C9" }}>
                                <TableRow>
                                    {/* <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedProfiles.length === profiles.length && profiles.length > 0}
                                            indeterminate={
                                                selectedProfiles.length > 0 &&
                                                selectedProfiles.length < profiles.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell> */}
                                    {columns.slice(1).map((column) => (
                                        <TableCell
                                            key={column.id}
                                            sx={{
                                                borderBottom: "1px solid #E0E0E0",
                                                color: "#ee3448",
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                whiteSpace: "nowrap",
                                                backgroundColor: "#FFF8B3",
                                                position: column.id === "profile_id" ? "sticky" : "static",
                                                left: column.id === "profile_id" ? 0 : "auto", // 👈 always stick at left
                                                zIndex: column.id === "profile_id" ? 2 : 1,
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {profiles.map((row) => (
                                    <TableRow key={row.profile_id}>
                                        {/* Select */}
                                        {/* <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedProfiles.includes(row.profile_id)}
                                                onChange={() => handleCheckboxChange(row.profile_id)}
                                            />
                                        </TableCell> */}

                                        {/* Image */}
                                        <TableCell>
                                            <Avatar src={row.profile_img} alt={row.profile_name} />
                                        </TableCell>

                                        <TableCell onClick={() =>
                                            navigate(
                                                `/viewProfile?profileId=${row.profile_id}`,
                                            )
                                        }
                                            sx={{
                                                position: "sticky",
                                                left: 0, // 👈 always stick at far left
                                                background: "#fff",
                                                color: "blue",
                                                cursor: "pointer",
                                                textDecoration: "none",
                                                "&:hover": { textDecoration: "underline" },
                                            }}>{row.profile_id}</TableCell>
                                        <TableCell>{row.work_place || "N/A"}</TableCell>
                                        <TableCell>{row.mode || "N/A"}</TableCell>
                                        <TableCell>{row.profile_name}</TableCell>
                                        <TableCell>{row.profile_age}</TableCell>
                                        <TableCell>{row.star}</TableCell>
                                        <TableCell>{row.degree}</TableCell>
                                        <TableCell>{row.profession}</TableCell>
                                        <TableCell>{row.company_name || "N/A"}</TableCell>
                                        <TableCell>{row.designation || "N/A"}</TableCell>
                                        <TableCell>{row.anual_income}</TableCell>
                                        <TableCell>{row.state}</TableCell>
                                        <TableCell>{row.city}</TableCell>
                                        <TableCell>{row.family_status || "N/A"}</TableCell>
                                        <TableCell>{row.father_occupation || "N/A"}</TableCell>
                                        <TableCell>{row.suya_gothram}</TableCell>
                                        <TableCell>{row.chevvai}</TableCell>
                                        <TableCell>{row.raguketu}</TableCell>
                                        <TableCell>
                                            {new Date(row.dateofjoin).toLocaleDateString("en-GB")}
                                        </TableCell>
                                        {/* <TableCell>{row.status || "N/A"}</TableCell>
                                        <TableCell>{row.action_score?.score || "N/A"}</TableCell> */}
                                        <TableCell>
                                            {row.matching_score}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}
        </Box>
    );
};