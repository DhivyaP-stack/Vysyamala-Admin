import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface DataHistoryItem {
    profile_id: string;
    date_time: string;
    status_name: string;
    others: string | null;
    plan_name: string | null;
}

interface DataHistoryProps {
    open: boolean;
    onClose: () => void;
    profileId?: string; // Add profileId prop to pass the profile ID
}

export const DataHistoryPopup: React.FC<DataHistoryProps> = ({ open, onClose, profileId }) => {
    const [data, setData] = useState<DataHistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch data when the dialog opens or profileId changes
    useEffect(() => {
        if (open && profileId) {
            fetchDataHistory();
        }
    }, [open, profileId]);

    const fetchDataHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://app.vysyamala.com/api/data-history/`,
                {
                    params: {
                        profile_id: profileId
                    }
                }
            );
            setData(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch data history");
            console.error("Error fetching data history:", err);
        } finally {
            setLoading(false);
        }
    };

    // Format date to be more readable
    // const formatDateTime = (dateTimeString: string) => {
    //     try {
    //         const date = new Date(dateTimeString);
    //         return date.toLocaleString('en-US', {
    //             year: 'numeric',
    //             month: '2-digit',
    //             day: '2-digit',
    //             hour: '2-digit',
    //             minute: '2-digit',
    //             second: '2-digit',
    //             hour12: true
    //         });
    //     } catch {
    //         return dateTimeString; // Return original if parsing fails
    //     }
    // };
    const formatDate = (dateTimeString: string) => {
        try {
            const date = new Date(dateTimeString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        } catch {
            return dateTimeString; // Return original if parsing fails
        }
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
            <DialogTitle>
                <Box sx={{ display: "flex", justifyContent: "start", alignItems: "start", marginBottom: "1px" }}>
                    Data History
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        background: "white",
                        color: "#d50000"
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider sx={{ borderWidth: "1px" }} />
            <DialogContent>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                ) : data.length === 0 ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
                        <Typography>No data history found</Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead style={{ background: '#FFF9C9', whiteSpace: "nowrap" }}>
                                <TableRow>
                                    <TableCell className="!text-red-600 !text-base !text-md text-nowrap font-bold">Date</TableCell>
                                    <TableCell className="!text-red-600 !text-base !text-md text-nowrap font-bold">Owner</TableCell>
                                    {/* <TableCell className="!text-red-600 !text-base !text-md text-nowrap font-bold">Profile ID</TableCell> */}
                                    <TableCell className="!text-red-600 !text-base !text-md text-nowrap font-bold">Profile Status</TableCell>
                                    <TableCell className="!text-red-600 !text-base !text-md text-nowrap font-bold">Plan Name</TableCell>
                                    {/* <TableCell className="!text-red-600 !text-base !text-md text-nowrap font-bold">Reason</TableCell> */}
                                    <TableCell className="!text-red-600 !text-base !text-md text-nowrap font-bold">Others</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{formatDate(item.date_time)}</TableCell>
                                        <TableCell>N/A</TableCell>
                                        <TableCell>{item.status_name}</TableCell>
                                        <TableCell>{item.plan_name || "N/A"}</TableCell>
                                        <TableCell>{item.others || "N/A"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
        </Dialog>
    );
};