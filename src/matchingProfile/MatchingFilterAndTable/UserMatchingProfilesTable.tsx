import { useState, useEffect } from 'react';
import {
    Box, Button, Checkbox, CircularProgress, IconButton, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField,
    Typography, Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { GoUnverified } from 'react-icons/go';
import { NotifyError, NotifySuccess } from '../../common/Toast/ToastMessage';
import { MatchingEmailProfile, MatchingPrintProfile, MatchingWhatsappProfile, userMatchingProfiles, userMatchingProfilesFilterListMatch, userMatchingProfilesPrintProfile, userMatchingProfilesSendEmail, userMatchingProfilesWhatsapp } from '../../api/apiConfig';

interface ActionScore {
    score: number;
    actions: any[];
}


interface UserMatchingProfilesProps {
    profile_id: string;
    profile_name: string;
    profile_img: string;
    profile_age: number;
    plan: string;
    family_status: string;
    degree: string;
    anual_income: string;
    star: string;
    profession: string;
    city: string;
    state: string;
    work_place: string;
    designation: string;
    company_name: string;
    father_occupation: string;
    suya_gothram: string;
    chevvai: string;
    raguketu: string;
    photo_protection: number;
    matching_score: number;
    wish_list: number;
    verified: number;
    action_score: ActionScore;
    dateofjoin: string;
}

const columns = [
    { id: "select", label: "Select" },
    { id: 'profile_img', label: 'Image' },
    { id: 'profile_id', label: 'Profile ID' },
    { id: 'work_place', label: 'Work Place' },
    { id: 'profile_name', label: 'Name' },
    { id: 'profile_age', label: 'Age' },
    { id: 'star', label: 'Star' },
    { id: 'degree', label: 'Degree' },
    { id: 'profession', label: 'Profession' },
    { id: 'company_name', label: 'Company Name /Buisness Name' },
    { id: 'designation', label: 'Designation /Nature of Buisness' },
    { id: 'anual_income', label: 'Annual Income' },
    { id: 'state', label: 'State' },
    { id: 'city', label: 'City' },
    { id: 'family_status', label: 'Family Status' },
    { id: 'father_occupation', label: 'Father Business' },
    { id: 'suya_gothram', label: 'Suya Gothram' },
    { id: 'chevvai', label: 'Admin Chevvai' },
    { id: 'raguketu', label: 'Admin Raghu/Kethu' },
    { id: 'dateofjoin', label: 'Registration Date' },
    { id: 'action_score', label: 'Action Score' },
];


interface UserMatchingProfilesTableProps {
    profileID: string | null;
    filters: any;
    onBack: () => void;
    No_Image_Available: any;
    profileType: 'matching' | 'suggested';
}

export const UserMatchingProfilesTable = ({ profileID, filters, onBack, No_Image_Available, profileType }: UserMatchingProfilesTableProps) => {
    const navigate = useNavigate();
    const [matchingData, setMatchingData] = useState<UserMatchingProfilesProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<string>("");
    const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
    const [printFormat, setPrintFormat] = useState<string>("");
    const [isPrintProfile, setIsPrintProfile] = useState<boolean>(false);
    const [whatsappFormat, setWhatsappFormat] = useState<string>("");
    const [iswhatsappProfile, setIsWhatsappProfile] = useState<boolean>(false);
    const [goToPageInput, setGoToPageInput] = useState<string>('');
    const roleId = sessionStorage.getItem('role_id');

    // Tooltip function
    const formatActionsForTooltip = (actions: any[]) => {
        if (!actions || actions.length === 0) {
            return "No actions recorded";
        }

        return (
            <div>
                {actions.map((action, index) => {
                    const date = new Date(action.datetime);
                    const formattedDate = date.toLocaleDateString();

                    return (
                        <div key={index}>
                            <strong>{action.action}</strong> – {formattedDate}
                        </div>
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        const fetchMatchingData = async () => {
            if (!profileID) return;
            setLoading(true);
            try {
                let data;
                if (filters) {
                    // Use filtered data with profileType
                    data = await userMatchingProfilesFilterListMatch(
                        String(profileID),
                        currentPage + 1,
                        itemsPerPage,
                        filters.selectedComplexions,
                        filters.selectedEducation,
                        filters.selectedFieldsOfStudy, // Add this
                        filters.selectedDegrees, // Add this
                        filters.heightFrom,
                        filters.heightTo,
                        filters.minAnnualIncome,
                        filters.maxAnnualIncome,
                        filters.foreignInterest,
                        filters.selectedState,
                        filters.selectedCity,
                        filters.selectedMembership,
                        filters.hasphotos,
                        filters.destRasiIds,
                        filters.ageDifference,
                        filters.sarpaDhosham,
                        filters.chevvaiDhosam,
                        filters.selectedProfessions,
                        filters.motherLive,
                        filters.fatherLive,
                        filters.selectedMaritalStatus,
                        filters.selectedFamilyStatus,
                        filters.sentInWhatsapp,
                        filters.prefPoruthamStarRasi,
                        filters.fromDateOfJoin,
                        filters.toDateOfJoin,
                        profileType // Pass the profileType here
                    );
                } else {
                    // You might need to create separate functions for default data
                    // For now, using the same function with empty filters
                    data = await userMatchingProfilesFilterListMatch(
                        String(profileID),
                        currentPage + 1,
                        itemsPerPage,
                        "", "", "", "", 0, 0, 0, 0, "", 0, 0, 0, "", 0, 0, "", "", "", "", "", "", "", "", "", "", "", profileType
                    );
                }

                setMatchingData(data.profiles || []);
                setTotalItems(data.total_count || 0);
            } catch (error: any) {
                NotifyError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatchingData();
    }, [profileID, currentPage, itemsPerPage, filters, profileType]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const handleCheckboxChange = (profileId: string) => {
        setSelectedProfiles((prevSelected) => {
            const isSelected = prevSelected.includes(profileId);
            return isSelected
                ? prevSelected.filter((id) => id !== profileId)
                : [...prevSelected, profileId];
        });
    };

    const handleSelectAll = () => {
        setSelectedProfiles((prevSelected) => {
            if (prevSelected.length === matchingData.length) {
                return [];
            } else {
                return matchingData.map((profile) => profile.profile_id);
            }
        });
    };

    const handleSendEmail = async () => {
        if (selectedProfiles.length === 0) {
            NotifyError("Please select at least one profile to send email");
            return;
        }
        if (!selectedFormat) {
            NotifyError("Please select an email format");
            return;
        }
        try {
            setIsSendingEmail(true);
            const response = await MatchingEmailProfile(
                printFormat,
                selectedProfiles.join(","),  // ✅ comma separated
                String(profileID),
            );

            console.log("Email sent successfully:", response);
            NotifySuccess("Email sent successfully!");
        } catch (error: any) {
            console.error("Failed to send email:", error);
            NotifyError(error.message || "Failed to send email");
        } finally {
            setIsSendingEmail(false);
        }
    };

    const handlePrintProfile = async () => {
        if (selectedProfiles.length === 0) {
            NotifyError("Please select at least one profile to print profile");
            return;
        }
        if (!printFormat) {
            NotifyError("Please select an Print format");
            return;
        }
        try {
            setIsPrintProfile(true);
            const response = await MatchingPrintProfile(
                printFormat,
                selectedProfiles.join(","),  // ✅ comma separated
                String(profileID),
            );

            if (response instanceof Blob) {
                const url = window.URL.createObjectURL(response);
                const a = document.createElement('a');
                a.href = url;
                a.download = `profile_${profileID}_print.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                NotifySuccess("Profile download started successfully!");
            } else {
                console.warn("Unexpected response format:", response);
                NotifySuccess("Profile Printed successfully!");
            }
        } catch (error: any) {
            console.error("Failed to Print Profile:", error);
            NotifyError(error.message || "Failed to Print Profile");
        } finally {
            setIsPrintProfile(false);
        }
    };

    const handleProfileWhatsapp = async () => {
        if (selectedProfiles.length === 0) {
            NotifyError("Please select at least one profile to print profile");
            return;
        }
        if (!whatsappFormat) {
            NotifyError("Please select an Whatsapp format");
            return;
        }
        try {
            setIsWhatsappProfile(true);
            const response = await MatchingWhatsappProfile(
                printFormat,
                selectedProfiles.join(","),  // ✅ comma separated
                String(profileID),
            );


            if (response instanceof Blob) {
                const url = window.URL.createObjectURL(response);
                const a = document.createElement('a');
                a.href = url;
                a.download = `profile_${profileID}_print.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                NotifySuccess("Profile Viewed successfully!");
            }
        } catch (error: any) {
            console.error("Failed to Viewed Profile:", error);
            NotifyError(error.message || "Failed to View Profile");
        } finally {
            setIsWhatsappProfile(false);
        }
    };

    const handleGoToPage = () => {
        const pageNumber = parseInt(goToPageInput, 10);
        if (!isNaN(pageNumber)) {
            const lastPage = Math.ceil(totalItems / itemsPerPage) - 1;
            const newPage = Math.max(0, Math.min(pageNumber - 1, lastPage));
            setCurrentPage(newPage);
            setGoToPageInput('');
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* <Button
                variant="contained"
                onClick={onBack}
                sx={{ mb: 2 }}
            >
                Back to Filters
            </Button> */}

            <div className="flex items-center justify-end space-x-10">
                {/* Print Profile */}
                <div>
                    <div>
                        <p className="text-sm text-black font-semibold">Print Profile</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <div>
                                <select
                                    name="printFormat"
                                    id="printFormat"
                                    value={printFormat}
                                    onChange={(e) => setPrintFormat(e.target.value)}
                                    disabled={isPrintProfile}
                                    className="text-sm border-[1px] border-black rounded-md px-2 py-0.5 focus-within:outline-none"
                                >
                                    <option value="">Choose Format</option>
                                    {/* <option value="fullprofile">Full Profile</option>
                                    <option value="withoutaddress">Without Address</option>
                                    <option value="shortprofile">Short Profile</option>
                                    <option value="p4">Intimation</option> */}
                                    <option value="match_full_profile">Full Profile</option>
                                    <option value="match_full_profile_black">Full profile black</option>
                                    <option value="match_compatability_color">Color</option>
                                    <option value="match_compatability_black">Black</option>
                                    <option value="match_compatability_without_horo">Without Horoscope</option>
                                    <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
                                    {/* <option value="match_profile_action">Action</option> */}
                                </select>
                            </div>
                            <div>
                                <button
                                    onClick={handlePrintProfile}
                                    disabled={isPrintProfile}
                                    className={`bg-amber-500 text-white rounded-md px-3 py-0.5 ${isPrintProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isPrintProfile ? 'Moving to Print...' : 'Move to print'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Whatsapp */}
                <div>
                    <div>
                        <p className="text-sm text-black font-semibold">Whatsapp</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <div>
                                <select
                                    name="whatsappFormat"
                                    id="whatsappFormat"
                                    value={whatsappFormat}
                                    onChange={(e) => setWhatsappFormat(e.target.value)}
                                    disabled={iswhatsappProfile}
                                    className="text-sm border-[1px] border-black rounded-md px-2 py-1 focus-within:outline-none"
                                >
                                    <option value="">Choose Format</option>
                                    {/* <option value="fullprofile">Full Profile</option>
                                    <option value="withoutaddress">Without Address</option>
                                    <option value="shortprofile">Short Profile</option>
                                    <option value="w5">Intimation</option> */}
                                    <option value="match_full_profile">Full Profile</option>
                                    <option value="match_full_profile_black">Full profile black</option>
                                    <option value="match_compatability_color">Color</option>
                                    <option value="match_compatability_black">Black</option>
                                    <option value="match_compatability_without_horo">Without Horoscope</option>
                                    <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
                                    {/* <option value="match_profile_action">Action</option> */}
                                </select>
                            </div>
                            <div>
                                <button
                                    onClick={handleProfileWhatsapp}
                                    disabled={iswhatsappProfile}
                                    className={`bg-green-500 text-white rounded-md px-3 py-0.5 ${iswhatsappProfile ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {iswhatsappProfile ? 'Viewing...' : 'View'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div>
                    <div>
                        <p className="text-sm text-black font-semibold">Send Email</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <div>
                                <select
                                    name="selectedFormat"
                                    id="selectedFormat"
                                    value={selectedFormat}
                                    onChange={(e) => setSelectedFormat(e.target.value)}
                                    disabled={isSendingEmail}
                                    className="text-sm border-[1px] border-black rounded-md px-2 py-1 focus-within:outline-none"
                                >
                                    <option value="">Choose Format</option>
                                    {/* <option value="fullprofile">Full Profile</option>
                                    <option value="withoutaddress">Without Address</option>
                                    <option value="shortprofile">Short Profile</option>
                                    <option value="w5">Intimation</option> */}
                                    <option value="match_full_profile">Full Profile</option>
                                    <option value="match_full_profile_black">Full profile black</option>
                                    <option value="match_compatability_color">Color</option>
                                    <option value="match_compatability_black">Black</option>
                                    <option value="match_compatability_without_horo">Without Horoscope</option>
                                    <option value="match_compatability_without_horo_black">Without Horoscope Black</option>
                                    {/* <option value="match_profile_action">Action</option> */}
                                </select>
                            </div>
                            <div>
                                <button
                                    onClick={handleSendEmail}
                                    disabled={isSendingEmail}
                                    className={`bg-blue-500 text-white rounded-md px-3 py-0.5 ${isSendingEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSendingEmail ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-4">
                <Paper className="w-full">
                    <TableContainer sx={{ border: '1px solid #E0E0E0' }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead style={{ background: '#FFF9C9', padding: '17px' }}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            sx={{
                                                borderBottom: "1px solid #E0E0E0",
                                                color: "#ee3448",
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {column.id === "select" ? (
                                                <Checkbox
                                                    color="primary"
                                                    checked={selectedProfiles.length === matchingData.length}
                                                    indeterminate={
                                                        selectedProfiles.length > 0 &&
                                                        selectedProfiles.length < matchingData.length
                                                    }
                                                    onChange={handleSelectAll}
                                                />
                                            ) : (
                                                column.label
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {matchingData && matchingData.length > 0 ? (
                                    matchingData.map((row) => (
                                        <TableRow
                                            key={row.profile_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    color="primary"
                                                    checked={selectedProfiles.includes(row.profile_id)}
                                                    onChange={() => handleCheckboxChange(row.profile_id)}
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <img
                                                    className="rounded-full"
                                                    src={row.profile_img || No_Image_Available}
                                                    alt="Profile"
                                                    width={50}
                                                    height={50}
                                                    onError={(e) => (e.currentTarget.src = No_Image_Available)}
                                                />
                                            </TableCell>
                                            <TableCell
                                                onClick={() =>
                                                    navigate(
                                                        `/viewProfile?profileId=${row.profile_id}`,
                                                    )
                                                }
                                                sx={{
                                                    color: 'blue',
                                                    cursor: 'pointer',
                                                    textDecoration: 'none',
                                                    '&:hover': { textDecoration: 'underline' }
                                                }}
                                            >
                                                {row.profile_id}
                                            </TableCell>
                                            <TableCell>{row.work_place}</TableCell>
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
                                            <TableCell>{row.dateofjoin ? new Date(row.dateofjoin).toLocaleDateString() : "-"}</TableCell>
                                            {/* <TableCell>{row.action_score?.score ?? "-"}</TableCell> */}
                                            <TableCell>
                                                <Tooltip
                                                    title={
                                                        <div style={{ whiteSpace: 'pre-line' }}>
                                                            {formatActionsForTooltip(row.action_score?.actions || [])}
                                                        </div>
                                                    }
                                                    arrow
                                                    placement="top"
                                                >
                                                    <span>{row.action_score?.score ?? "-"}</span>
                                                </Tooltip>
                                            </TableCell>
                                            {/* <TableCell>
                                                {row.verified === 0 ? (
                                                    <MdVerified className="text-green-600" />
                                                ) : (
                                                    <GoUnverified className="text-red-600" />
                                                )}
                                            </TableCell> */}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} sx={{ textAlign: 'center' }}>
                                            No Matching Records found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>

            {Math.ceil(totalItems / itemsPerPage) > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">
                        Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, totalItems)} of {totalItems} records
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Typography variant="body2">Go to page:</Typography>
                            <TextField
                                size="small"
                                type="number"
                                value={goToPageInput}
                                onChange={(e) => setGoToPageInput(e.target.value)}
                                inputProps={{
                                    min: 1,
                                    max: Math.ceil(totalItems / itemsPerPage),
                                }}
                                style={{ width: '80px' }}
                                onKeyPress={(e) => e.key === 'Enter' && handleGoToPage()}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleGoToPage}
                                disabled={!goToPageInput}
                            >
                                Go
                            </Button>
                        </div>

                        <IconButton
                            onClick={() => setCurrentPage(0)}
                            disabled={currentPage === 0}
                            aria-label="first page"
                        >
                            {"<<"}
                        </IconButton>

                        <IconButton
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                            disabled={currentPage === 0}
                            aria-label="previous page"
                        >
                            {"<"}
                        </IconButton>

                        {(() => {
                            const totalPages = Math.ceil(totalItems / itemsPerPage);
                            const maxVisiblePages = 5;
                            let startPage, endPage;

                            if (totalPages <= maxVisiblePages) {
                                startPage = 0;
                                endPage = totalPages - 1;
                            } else {
                                const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
                                const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

                                if (currentPage < maxPagesBeforeCurrent) {
                                    startPage = 0;
                                    endPage = maxVisiblePages - 1;
                                } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
                                    startPage = totalPages - maxVisiblePages;
                                    endPage = totalPages - 1;
                                } else {
                                    startPage = currentPage - maxPagesBeforeCurrent;
                                    endPage = currentPage + maxPagesAfterCurrent;
                                }
                            }

                            const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

                            return (
                                <div className="flex">
                                    {pages.map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "contained" : "text"}
                                            onClick={() => setCurrentPage(page)}
                                            style={{
                                                minWidth: '32px',
                                                height: '32px',
                                                margin: '0 2px',
                                                backgroundColor: currentPage === page ? '#1976d2' : 'transparent',
                                                color: currentPage === page ? '#fff' : '#000',
                                            }}
                                        >
                                            {page + 1}
                                        </Button>
                                    ))}
                                </div>
                            );
                        })()}

                        <IconButton
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalItems / itemsPerPage) - 1))}
                            disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
                            aria-label="next page"
                        >
                            {">"}
                        </IconButton>

                        <IconButton
                            onClick={() => setCurrentPage(Math.ceil(totalItems / itemsPerPage) - 1)}
                            disabled={currentPage >= Math.ceil(totalItems / itemsPerPage) - 1}
                            aria-label="last page"
                        >
                            {">>"}
                        </IconButton>
                    </div>
                </div>
            )}
        </div>
    );
};