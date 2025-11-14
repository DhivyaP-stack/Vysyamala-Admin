

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { z } from 'zod';
import './Toolbars.css'; // Import your custom CSS file for styling
import { useNavigate } from 'react-router-dom';
import Notification, { notify } from '../TostNotification';

// Zod schema for form validation
const contentSchema = z.object({
  pageName: z.string().nonempty('Page Name is required'),
  metaTitle: z.string().nonempty('Meta Title is required'),
  metaDescription: z.string().nonempty('Meta Description is required'),
  metaKeywords: z.string().nonempty('Meta Keywords is required'),
  editorData: z.string().min(1, 'Content cannot be empty'),
  status: z.string().nonempty('Status is required'),
});

const CKEditorComponent: React.FC = () => {
  const [editorData, setEditorData] = useState<string>('<p></p>');
  const [pageName, setPageName] = useState<string>('');
  const [status, setStatus] = useState<string>('active'); // Defaulting to 'active'
  const [metaTitle, setMetaTitle] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [metaKeywords, setMetaKeywords] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  const handleEditorReady = (_editor: any) => {
    // You can use the editor instance here if needed
  };

  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
    setErrors((prevErrors) => ({ ...prevErrors, editorData: '' }));
  };

  const handlePageNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, pageName: '' }));
  };

  const handleMetaTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMetaTitle(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, metaTitle: '' }));
  };

  const handleMetaDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMetaDescription(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, metaDescription: '' }));
  };

  const handleMetaKeywordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMetaKeywords(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, metaKeywords: '' }));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, status: '' }));
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
      const response = await axios.post(' https://app.vysyamala.com/api/page/', {
        page_name: formData.pageName,
        meta_title: formData.metaTitle,
        meta_description: formData.metaDescription,
        meta_keywords: formData.metaKeywords,
        status: formData.status,
        content: formData.editorData,
        admin_user_id: adminUserID
      }, {
        headers: {
          'Content-Type': 'application/json'
        }

      });

      const result = response.data.data;
      if (response.status >= 200 || response.status <= 299) {
        notify('Successfully Added');

      }
      console.log("api response:", result)
      //alert('Content saved successfully!');
      setEditorData('<p></p>');
      setPageName('');
      setMetaTitle('');
      setMetaDescription('');
      setMetaKeywords('');
      setStatus('active'); // Reset to 'active'
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content.');
    }
    navigate("/CsmDataTable")
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">CSM Page</h2>
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="pageName" className="block mb-2">Page Name</label>
          <input
            type="text"
            id="pageName"
            value={pageName}
            onChange={handlePageNameChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm"
          />
          {errors.pageName && <p className="text-red-500 text-sm">{errors.pageName}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="metaTitle" className="block mb-2">Meta Title</label>
          <input
            type="text"
            id="metaTitle"
            value={metaTitle}
            onChange={handleMetaTitleChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm"
          />
          {errors.metaTitle && <p className="text-red-500 text-sm">{errors.metaTitle}</p>}
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="metaDescription" className="block mb-2">Meta Description</label>
          <input
            type="text"
            id="metaDescription"
            value={metaDescription}
            onChange={handleMetaDescriptionChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm"
          />
          {errors.metaDescription && <p className="text-red-500 text-sm">{errors.metaDescription}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="metaKeywords" className="block mb-2">Meta Keywords</label>
          <input
            type="text"
            id="metaKeywords"
            value={metaKeywords}
            onChange={handleMetaKeywordsChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm"
          />
          {errors.metaKeywords && <p className="text-red-500 text-sm">{errors.metaKeywords}</p>}
        </div>
      </div>

      <div className="mb-4">
        <div className="custom-editor-container">
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorChange}
            onReady={handleEditorReady}
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
                'findAndReplace', 'sourceEditing'
              ],
              heading: {
                options: [
                  { model: 'paragraph', title: 'Normal', class: 'ck-heading_paragraph' },
                  { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                  { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                  { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                  { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                  { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                  { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                ]
              },
              ckfinder: {
                uploadUrl: ' https://app.vysyamala.com/api/upload-image/' // Update this URL as needed
              },
            }}
          />
        </div>
        {errors.editorData && <p className="text-red-500 text-sm">{errors.editorData}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block mb-2">Status</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="px-3 py-2 border border-gray-300 rounded-md w-full text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Save
      </button>
      <Notification />
    </div>
  );
};

export default CKEditorComponent;
