import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Table,
  Button,
  IconButton,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";

// Interface for comment templates
interface AdminCommentTemplate {
  id: number;
  title: string;
  content: string;
}

// Predefined comment templates
const adminCommentTemplates: AdminCommentTemplate[] = [
  { id: 1, title: "Thanks for choosing Vys Assist!", content: "Thanks for choosing Vys Assist! We will call you shortly. Your profile has been shared with VF** through WhatsApp and email. We have also informed the VF** parent** about you. Waiting for their reply." },
  { id: 2, title: "Interested – Awaiting Astrologer", content: "They have shown some interest in your profile and would like to check with their astrologer before proceeding. Please allow them some time to reply." },
  { id: 3, title: "Astrologer Approved", content: "The astrologer has given a positive response. They are very much interested in your profile, so we have shared your photo through WhatsApp." },
  { id: 4, title: "Need More Time", content: "They’ve requested a little more time to discuss and get back to us. We’ll keep you updated once we receive their reply." },
  { id: 5, title: "Astrologer Not Matching", content: "The astrologer has mentioned that the match is not suitable. Don’t worry — we’ll explore another set of compatible profiles for you soon." },
  { id: 6, title: "Not Interested", content: "The customer is not interested in your profile.  don’t worry — we’ll share another set of suitable profiles with you shortly." },
  { id: 7, title: "Ask Photo", content: "Kindly share your recent photo to proceed further with your profile coordination." },
  { id: 8, title: "Ask Reference Number", content: "Please provide your Relation or friend Reference Number.The customer would like to enquire more about you and your background before proceeding." },
  { id: 9, title: "Ask About Your Status", content: "The customer would like to know more about your family background, profession, and property details. I’ll be giving you a call shortly to discuss and update them accordingly." },
  { id: 10, title: "Others", content: "" },
];

interface VysAssistPopupProps {
  vysassistId: string | null;
  onClose: () => void;
}

const VysAssistPopup: React.FC<VysAssistPopupProps> = ({ vysassistId, onClose }) => {
  const ownerId = localStorage.getItem("id") || sessionStorage.getItem("id");
  const firstName = localStorage.getItem("first_name") || sessionStorage.getItem("first_name");

  const [followUpData, setFollowUpData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [adminComments, setAdminComments] = useState<AdminCommentTemplate[]>([]);
  const adminUserID = sessionStorage.getItem("id") || localStorage.getItem("id");

  // ✨ State to track ONLY the dropdown selection
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState("");

  const [formData, setFormData] = useState({
    assist_id: vysassistId || "",
    owner_id: ownerId || "",
    owner_name: firstName || "",
    admin_comments: "", // This will store the title (template or custom)
    comments: "",       // This will store the content
    admin_user_id: adminUserID || "",
  });

  const [message, setMessage] = useState("");

  const fetchFollowups = async () => {
    if (!vysassistId) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://app.vysyamala.com/api/Vysfollowups/?assist_id=${vysassistId}`
      );
      setFollowUpData(response.data.followups || response.data || []);
    } catch (error) {
      console.error("Error fetching FollowupData:", error);
      setFollowUpData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (vysassistId) {
      setFormData((prev) => ({ ...prev, assist_id: vysassistId }));
      fetchFollowups();
    }
  }, [vysassistId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for the Admin Comments dropdown
  const handleCommandChange = (event: SelectChangeEvent<string>) => {
    const selectedTitle = event.target.value;
    setSelectedTemplateTitle(selectedTitle); // Track the selection separately

    const selectedTemplate = adminComments.find(
      (comment) => comment.title === selectedTitle
    );

    setFormData((prev) => ({
      ...prev,
      // If "Others" is selected, clear admin_comments to allow custom input. Otherwise, use the template title.
      admin_comments: selectedTitle === "Others" ? "" : selectedTitle,
      comments: selectedTemplate ? selectedTemplate.content : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://app.vysyamala.com/api/Vysfollowups/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("Follow-up submitted successfully!");
      setFormData({
        assist_id: vysassistId || "",
        owner_id: ownerId || "",
        owner_name: firstName || "",
        admin_comments: "",
        comments: "",
      });
      setSelectedTemplateTitle(""); // Reset dropdown tracker
      setShowForm(false);
      fetchFollowups();
    } catch (error) {
      console.error("Error submitting follow-up:", error);
      setMessage("Failed to submit follow-up.");
    }
  };

  const formDate = (isoString: string) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric", month: "short", day: "2-digit",
      hour: "numeric", minute: "numeric", second: "numeric", hour12: true,
    });
  };

  useEffect(() => {
    setAdminComments(adminCommentTemplates);
  }, []);

  return (
    <Dialog open={!!vysassistId} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Vysassist Follow-Up Comment
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 40, top: 8, fontSize: 44, color: "red" }}
        >
          ×
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {!showForm && (
          <Button variant="contained" color="primary" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
            Add Follow-Up Comment
          </Button>
        )}

        {showForm && (
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, p: 2, boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Submit Follow-Up Comment
            </Typography>

            {/* ✨ 1. Changed to horizontal layout */}
            <Box display={"flex"} flexDirection={"row"} gap={2} alignItems={"flex-start"} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Admin Command</InputLabel>
                <Select
                  value={selectedTemplateTitle}
                  onChange={handleCommandChange}
                  label="Admin Command"
                >
                  {adminComments.map((comment) => (
                    <MenuItem key={comment.id} value={comment.title}>
                      {comment.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedTemplateTitle === "Others" && (
                <TextField
                  fullWidth
                  label="Custom Admin Comment"
                  name="admin_comments"
                  value={formData.admin_comments}
                  onChange={handleChange}
                  required
                />
              )}

              {/* ✨ 2. Removed multiline and rows to make it a single-line field */}
              <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                required
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ ...formData, admin_comments: "", comments: "" });
                  setSelectedTemplateTitle("");
                }}
              >
                Cancel
              </Button>
            </Box>

            {message && (
              <Typography color={message.includes("successfully") ? "green" : "red"} sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </Box>
        )}
        {/* Table remains the same */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#FFF9C9" }}>
                <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>S.No</TableCell>
                <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>Assist ID</TableCell>
                <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>Owner Name</TableCell>
                <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>Admin Comments</TableCell>
                <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>Comments</TableCell>
                <TableCell sx={{ color: "#DC2635", fontWeight: "bold" }}>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">Loading...</TableCell>
                </TableRow>
              ) : followUpData.length > 0 ? (
                followUpData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.assist_id}</TableCell>
                    <TableCell>{row.owner_name}</TableCell>
                    <TableCell>{row.admin_comments}</TableCell>
                    <TableCell>{row.comments}</TableCell>
                    <TableCell>{formDate(row.update_at)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No follow-ups available.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default VysAssistPopup;