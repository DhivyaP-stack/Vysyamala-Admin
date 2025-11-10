import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { z } from 'zod';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Select,
    MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Notification, { notify, notifyDelete } from '../TostNotification';
import './Toolbars.css';

interface Page {
    id: number;
    page_name: string;
    status: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    content: string;
}

const contentSchema = z.object({
    pageName: z.string().nonempty('Page Name is required'),
    metaTitle: z.string().nonempty('Meta Title is required'),
    metaDescription: z.string().nonempty('Meta Description is required'),
    metaKeywords: z.string().nonempty('Meta Keywords are required'),
    editorData: z.string().min(1, 'Content cannot be empty'),
    status: z.string().nonempty('Status is required'),
});

const CsmManagementComponent: React.FC = () => {
    const [pages, setPages] = useState<Page[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentPageId, setCurrentPageId] = useState<number | null>(null);
    const [editorData, setEditorData] = useState<string>('<p></p>');
    const [pageName, setPageName] = useState<string>('');
    const [status, setStatus] = useState<string>('active');
    const [metaTitle, setMetaTitle] = useState<string>('');
    const [metaDescription, setMetaDescription] = useState<string>('');
    const [metaKeywords, setMetaKeywords] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const response = await axios.get<Page[]>(' https://app.vysyamala.com/api/page-list/');
            setPages(response.data);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    const handleSave = async () => {
        setErrors({});
        const formData = {
            pageName,
            status,
            editorData,
            metaTitle,
            metaDescription,
            metaKeywords,
        };
        const validation = contentSchema.safeParse(formData);

        if (!validation.success) {
            const newErrors = validation.error.errors.reduce((acc, error) => {
                acc[error.path[0]] = error.message;
                return acc;
            }, {} as Record<string, string>);
            setErrors(newErrors);
            return;
        }

        try {
            if (isEditing && currentPageId !== null) {
                await axios.put(` https://app.vysyamala.com/api/page/${currentPageId}/`, {
                    page_name: formData.pageName,
                    meta_title: formData.metaTitle,
                    meta_description: formData.metaDescription,
                    meta_keywords: formData.metaKeywords,
                    status: formData.status,
                    content: formData.editorData,
                });
                notify('Successfully Updated');
            } else {
                await axios.post(' https://app.vysyamala.com/api/page/', {
                    page_name: formData.pageName,
                    meta_title: formData.metaTitle,
                    meta_description: formData.metaDescription,
                    meta_keywords: formData.metaKeywords,
                    status: formData.status,
                    content: formData.editorData,
                });
                notify('Successfully Added');
            }
            resetForm();
            fetchPages();
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    const handleEdit = (id: number) => {
        const pageToEdit = pages.find((page) => page.id === id);
        if (pageToEdit) {
            setCurrentPageId(id);
            setPageName(pageToEdit.page_name);
            setMetaTitle(pageToEdit.meta_title);
            setMetaDescription(pageToEdit.meta_description);
            setMetaKeywords(pageToEdit.meta_keywords);
            setEditorData(pageToEdit.content);
            setStatus(pageToEdit.status);
            setIsEditing(true);
        }
    };

    const handleDelete = async (id: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this page?');

        if (isConfirmed) {
            try {
                await axios.delete(` https://app.vysyamala.com/api/page/delete/${id}/`);
                notifyDelete('Successfully Deleted');
                setPages(pages.filter((page) => page.id !== id));
            } catch (error) {
                console.error('There was an error deleting the page!', error);
            }
        }
    };

    const resetForm = () => {
        setPageName('');
        setMetaTitle('');
        setMetaDescription('');
        setMetaKeywords('');
        setEditorData('<p></p>');
        setStatus('active');
        setIsEditing(false);
        setCurrentPageId(null);
        setErrors({});
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">CSM Page Management</h2>

            {!isEditing && (
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setIsEditing(true)}
                    style={{ float: 'right', marginBottom: '10px' }}
                >
                    Add New Page
                </Button>
            )}

            {isEditing ? (
                <div className="editor-container">
                    <div className="flex space-x-4 mb-4">
                        <TextField
                            label="Page Name"
                            value={pageName}
                            onChange={(e) => setPageName(e.target.value)}
                            fullWidth
                            error={!!errors.pageName}
                            helperText={errors.pageName}
                        />
                        <TextField
                            label="Meta Title"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            fullWidth
                            error={!!errors.metaTitle}
                            helperText={errors.metaTitle}
                        />
                    </div>

                    <div className="flex space-x-4 mb-4">
                        <TextField
                            label="Meta Description"
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            fullWidth
                            error={!!errors.metaDescription}
                            helperText={errors.metaDescription}
                        />
                        <TextField
                            label="Meta Keywords"
                            value={metaKeywords}
                            onChange={(e) => setMetaKeywords(e.target.value)}
                            fullWidth
                            error={!!errors.metaKeywords}
                            helperText={errors.metaKeywords}
                        />
                    </div>

                    <div className="mb-4">
                        <CKEditor
                            editor={ClassicEditor}
                            data={editorData}
                            onChange={(_, editor) => setEditorData(editor.getData())}
                            config={{
                                toolbar: [
                                    'heading', '|',
                                    'alignment', '|',
                                    'bold', 'italic', 'underline', 'link', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'bulletedList', 'numberedList', 'blockQuote', 'selectAll', '|',
                                    'fontSize', '|',
                                    'undo', 'redo', '|',
                                    'alignLeft', 'alignCenter', 'alignRight',
                                    'strikethrough', '|',
                                    'imageUpload', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                                    'mediaEmbed', '|',
                                    'timestamp', '|',
                                    'findAndReplace', 'sourceEditing',
                                ],
                                heading: {
                                    options: [
                                        { model: 'paragraph', title: 'Normal', class: 'ck-heading_paragraph' },
                                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
                                    ],
                                },
                                ckfinder: {
                                    uploadUrl: ' https://app.vysyamala.com/api/upload_image',
                                },
                            }}
                        />
                    </div>

                    <Select
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as string)}
                        fullWidth
                        error={!!errors.status}
                        displayEmpty
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
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
                                <TableCell>Page Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Meta Title</TableCell>
                                <TableCell>Meta Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pages.map((page) => (
                                <TableRow key={page.id}>
                                    <TableCell>{page.page_name}</TableCell>
                                    <TableCell>{page.status}</TableCell>
                                    <TableCell>{page.meta_title}</TableCell>
                                    <TableCell>{page.meta_description}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            onClick={() => handleEdit(page.id)}
                                            style={{ marginRight: '10px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(page.id)}
                                        >
                                            Delete
                                        </Button>
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

export default CsmManagementComponent;
