import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { z } from 'zod';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem, IconButton, Input } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Notification, { notify, notifyDelete } from '../components/TostNotification';
import { awadrDelete, awardEdit, awardList } from '../services/api';

interface Award {
    id: number;
    name: string;
    description: string;
    status: number;
    image: string; // Image URL
}

const contentSchema = z.object({
    name: z.string().min(1, 'Award Name is required'),
    description: z.string().min(1, 'Description is required'),
    status: z.string().min(1, 'Status is required'),
    image: z.instanceof(File).optional(),
});

const AwardManagement: React.FC = () => {
    const [awards, setAwards] = useState<Award[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentAwardId, setCurrentAwardId] = useState<number | null>(null);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('<p></p>');
    const [status, setStatus] = useState<number>(1);
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null); // To store the image URL
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            const response = await axios.get<Award[]>(`${awardList}`);
            setAwards(response.data);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    const handleSave = async () => {
        setErrors({});
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('status', status.toString());

        // Append new image only if one is selected, otherwise keep the old one
        if (image) {
            formData.append('image', image);
        } else if (imageUrl) {
            formData.append('image_url', imageUrl); // Send the old image URL to keep it if not changed
        }

        // Validate form data before making API request
        const validation = contentSchema.safeParse({
            name,
            description,
            status: status.toString(),
            image,
        });

        if (!validation.success) {
            const newErrors = validation.error.errors.reduce((acc, error) => {
                acc[error.path[0]] = error.message;
                return acc;
            }, {} as Record<string, string>);
            setErrors(newErrors);
            return;
        }

        try {
            if (isEditing && currentAwardId !== null) {
                // Update existing award
                const response = await axios.put(` ${awardEdit}${currentAwardId}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (response.status === 200) {
                    notify('Successfully Updated');
                } else {
                    console.error('Error updating award:', response.data);
                    notify('Failed to update the award.');
                }
            } else {
                // Create new award
                const response = await axios.post(`${awards}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (response.status === 201) {
                    notify('Successfully Added');
                } else {
                    console.error('Error adding award:', response.data);
                    notify('Failed to add the award.');
                }
            }
            resetForm();
            fetchAwards();
        } catch (error) {
            console.error('Error saving content:', error);
            notify('Error occurred during save operation.');
        }
    };

    const handleEdit = (id: number) => {
        const awardToEdit = awards.find((award) => award.id === id);
        if (awardToEdit) {
            setCurrentAwardId(id);
            setName(awardToEdit.name);
            setDescription(awardToEdit.description);
            setStatus(awardToEdit.status);
            setImageUrl(`${awardToEdit.image}`); // Set the image URL to existing award image
            setIsEditing(true);
        }
    };

    const handleDelete = async (id: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this award?');
        if (isConfirmed) {
            try {
                await axios.delete(` ${awadrDelete}${id}/`, {
      data: { admin_user_id }
    });
                notifyDelete('Successfully Deleted');
                setAwards(awards.filter((award) => award.id !== id));
            } catch (error) {
                console.error('There was an error deleting the award!', error);
            }
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('<p></p>');
        setStatus(1);
        setImage(null);
        setImageUrl(null);
        setIsEditing(false);
        setCurrentAwardId(null);
        setErrors({});
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Award Management</h2>
            {!isEditing && (
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => setIsEditing(true)}
                    style={{ float: 'right', marginBottom: '10px' }}
                >
                    Add New Award
                </Button>
            )}
            {isEditing ? (
                <div className="editor-container">
                    <div className="flex space-x-4 mb-4">
                        <TextField
                            label="Award Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </div>
                    <div className="mb-4">
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onChange={(_, editor) => setDescription(editor.getData())}
                        />
                    </div>
                    <div className="mb-4">
                        {imageUrl && (
                            <div style={{ marginBottom: '10px' }}>
                                <img src={imageUrl} alt="Current Award" style={{ maxWidth: '50%', height: 'auto' }} />
                                <p>
                                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                                        {imageUrl}
                                    </a>
                                </p>
                            </div>
                        )}
                        <Input
                            type="file"
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement;
                                if (target.files && target.files[0]) {
                                    setImage(target.files[0]);
                                    setImageUrl(URL.createObjectURL(target.files[0]));
                                }
                            }}
                            fullWidth
                            disableUnderline
                        />
                    </div>
                    <Select
                        value={status.toString()}
                        onChange={(e) => setStatus(parseInt(e.target.value))}
                        fullWidth
                        error={!!errors.status}
                    >
                        <MenuItem value="1">Active</MenuItem>
                        <MenuItem value="0">Inactive</MenuItem>
                    </Select>
                    <div className="mt-4">
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            {isEditing ? 'Update' : 'Save'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={resetForm}
                            style={{ marginLeft: '10px' }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Award Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {awards.map((award) => (
                                <TableRow key={award.id}>
                                    <TableCell>{award.name}</TableCell>
                                    <TableCell>{award.status === 1 ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell>
                                        <div dangerouslySetInnerHTML={{ __html: award.description }} />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(award.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(award.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Notification />
        </div>
    );
};

export default AwardManagement;
