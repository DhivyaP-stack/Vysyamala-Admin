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
} from "@mui/material";
import { useState } from "react";

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
}

const columns = [
    // { id: "select", label: "Select" },
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
    { id: "status", label: "Status" },
    { id: "score", label: "Score" },
    { id: "action_score", label: "Action" },
];

// Example static data
const staticProfiles: UserMatchingProfilesProps[] = [
    {
        profile_id: "P1001",
        profile_name: "Arun Kumar",
        profile_img: "https://via.placeholder.com/50",
        profile_age: 28,
        degree: "B.Tech",
        profession: "Software Engineer",
        company_name: "Infosys",
        designation: "Developer",
        anual_income: "8 LPA",
        state: "Tamil Nadu",
        city: "Chennai",
        family_status: "Middle Class",
        father_occupation: "Business",
        star: "Ashwini",
        suya_gothram: "Kashyapa",
        chevvai: "No",
        raguketu: "Yes",
        dateofjoin: "2024-05-12",
        action_score: {
            score: 85,
            actions: [{ action: "Profile Viewed", datetime: "2024-06-01T12:30:00" }],
        },
        status: "Active",
        work_place: "IT Park",
        mode: "Online",
    },
    {
        profile_id: "P1002",
        profile_name: "Priya Sharma",
        profile_img: "https://via.placeholder.com/50",
        profile_age: 25,
        degree: "MBA",
        profession: "HR Manager",
        company_name: "Wipro",
        designation: "Manager",
        anual_income: "12 LPA",
        state: "Karnataka",
        city: "Bangalore",
        family_status: "Upper Middle Class",
        father_occupation: "Retired",
        star: "Rohini",
        suya_gothram: "Bharadvaja",
        chevvai: "Yes",
        raguketu: "No",
        dateofjoin: "2024-07-20",
        action_score: {
            score: 92,
            actions: [{ action: "Sent Email", datetime: "2024-08-05T09:15:00" }],
        },
        status: "Inactive",
        work_place: "Corporate Office",
        mode: "Offline",
    },
];

export const ProfileVisibilityTable = () => {
    const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

    const handleCheckboxChange = (profileId: string) => {
        setSelectedProfiles((prev) =>
            prev.includes(profileId)
                ? prev.filter((id) => id !== profileId)
                : [...prev, profileId]
        );
    };

    return (

        <div className="container mx-auto p-4">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl text-left font-bold text-red-600">Vysyamala Profile Visibility</h2>
                </div>
            </div>

            <Paper className="w-full">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead style={{ background: "#FFF9C9" }}>
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedProfiles.length === staticProfiles.length && staticProfiles.length > 0}
                                        indeterminate={
                                            selectedProfiles.length > 0 &&
                                            selectedProfiles.length < staticProfiles.length
                                        }
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                // Select all
                                                setSelectedProfiles(staticProfiles.map((row) => row.profile_id));
                                            } else {
                                                // Deselect all
                                                setSelectedProfiles([]);
                                            }
                                        }}
                                    />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        sx={{
                                            fontWeight: "bold",
                                            color: "#ee3448",
                                            fontSize: "0.95rem",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {staticProfiles.map((row) => (
                                <TableRow key={row.profile_id}>
                                    {/* Select */}
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedProfiles.includes(row.profile_id)}
                                            onChange={() => handleCheckboxChange(row.profile_id)}
                                        />
                                    </TableCell>

                                    {/* Image */}
                                    <TableCell>
                                        <Avatar src={row.profile_img} alt={row.profile_name} />
                                    </TableCell>

                                    <TableCell>{row.profile_id}</TableCell>
                                    <TableCell>{row.work_place}</TableCell>
                                    <TableCell>{row.mode}</TableCell>
                                    <TableCell>{row.profile_name}</TableCell>
                                    <TableCell>{row.profile_age}</TableCell>
                                    <TableCell>{row.star}</TableCell>
                                    <TableCell>{row.degree}</TableCell>
                                    <TableCell>{row.profession}</TableCell>
                                    <TableCell>{row.company_name}</TableCell>
                                    <TableCell>{row.designation}</TableCell>
                                    <TableCell>{row.anual_income}</TableCell>
                                    <TableCell>{row.state}</TableCell>
                                    <TableCell>{row.city}</TableCell>
                                    <TableCell>{row.family_status}</TableCell>
                                    <TableCell>{row.father_occupation}</TableCell>
                                    <TableCell>{row.suya_gothram}</TableCell>
                                    <TableCell>{row.chevvai}</TableCell>
                                    <TableCell>{row.raguketu}</TableCell>
                                    <TableCell>
                                        {new Date(row.dateofjoin).toLocaleDateString("en-GB")}
                                    </TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.action_score.score}</TableCell>
                                    <TableCell>
                                        <span style={{ cursor: "pointer", color: "#007bff" }}>
                                            Profile Viewed
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};