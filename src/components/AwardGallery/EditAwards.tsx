import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField, Button, Select, MenuItem, Input } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../TostNotification';

interface IFormInput {
  name: string;
  editorData: string; // CKEditor data
  status: string;
  image: FileList | null;
}

const EditAward: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm<IFormInput>({
    mode: 'onSubmit',
    defaultValues: {
      editorData: '', // Empty initial value for CKEditor
    },
  });

  const [editorData, setEditorData] = useState<string>(''); // CKEditor state
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams(); // Award ID from route params
  const navigate = useNavigate();
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');
  // Fetch the existing award data based on ID
  useEffect(() => {
    const fetchAward = async () => {
      try {
        const response = await axios.get(
          ` https://app.vysyamala.com/api/awards/${id}/`,
        );
        const { name, description, status, image } = response.data;

        setValue('name', name);
        setEditorData(description); // Pre-fill CKEditor
        setValue('status', status.toString()); // Convert status to string for Select field
        setImageUrl(image); // Pre-fill image URL
      } catch (error) {
        console.error('Failed to fetch award:', error);
      }
    };

    fetchAward();
  }, [id, setValue]);

  const stripHtmlTags = (html: string) => {
    return html.replace(/<\/?p[^>]*>/g, ''); // Remove <p> and </p> tags
  };

  // Handle CKEditor content change
  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    const cleanData = stripHtmlTags(data);
    setEditorData(cleanData);
    setValue('editorData', cleanData); // Register CKEditor data in react-hook-form
    trigger('editorData'); // Manually trigger validation for the CKEditor field
  };

  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    formData.append('name', data.name); // Award Name
    formData.append('description', data.editorData); // CKEditor Description
    formData.append('status', data.status); // Status
    formData.append('admin_user_id', adminUserID ?? ""); // Status

    if (image) {
      formData.append('image', image); // Image file (if updated)
    }

    try {
      setLoading(true);

      // Sending form data to the edit API
      const response = await axios.put(
        ` https://app.vysyamala.com/api/awards/edit/${id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        // Successfully updated
        console.log('Award updated successfully:', response.data);
        notify('Award updated successfully');
        reset(); // Reset the form after successful submission
        setImageUrl(null); // Reset the image preview
        setEditorData(''); // Clear CKEditor content
        navigate('/AwardsTable');
      }
    } catch (error) {
      console.error('Error updating award:', error);
      alert('Failed to update award');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-4 mb-4">
        {/* Award Name Field */}
        {/* <TextField
          label="Award Name"
          fullWidth
          {...register('name', { required: 'Award Name is required' })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        /> */}
        <TextField
          label="Award Name"
          placeholder="Enter award name" // Add placeholder here
          fullWidth
          {...register('name', { required: 'Award Name is required' })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
        />
      </div>

      <div className="mb-4">
        {/* CKEditor for Description */}
        <div className="custom-editor-container">
          <CKEditor
            editor={ClassicEditor}
            data={editorData} // Pre-filled CKEditor data
            onChange={handleEditorChange}
            config={{
              placeholder: 'Enter award description...', // Set placeholder here
              toolbar: [
                'heading',
                '|',
                'alignment',
                '|',
                'bold',
                'italic',
                'underline',
                'link',
                'fontFamily',
                'fontColor',
                'fontBackgroundColor',
                'bulletedList',
                'numberedList',
                'blockQuote',
                '|',
                'fontSize',
                '|',
                'undo',
                'redo',
                '|',
                'alignLeft',
                'alignCenter',
                'alignRight',
                'strikethrough',
                '|',
                'imageUpload',
                'insertTable',
                '|',
                'mediaEmbed',
                'findAndReplace',
                'sourceEditing',
              ],
              ckfinder: {
                uploadUrl: ' https://app.vysyamala.com/api/upload-image/', // Update as necessary
              },
            }}
          />
        </div>
        {/* Display validation error for CKEditor */}
        {errors.editorData && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}
      </div>

      <div className="mb-4">
        {/* Image Upload Field */}
        {imageUrl && (
          <div style={{ marginBottom: '10px' }}>
            <img
              src={imageUrl}
              alt="Selected"
              style={{ maxWidth: '50%', height: 'auto' }}
            />
            <p className="text-gray-600 text-sm">{imageUrl}</p>
          </div>
        )}
        <Input
          type="file"
          {...register('image')}
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

      <div className="mb-4">
        {/* Status Field */}
        <Select
          defaultValue="1"
          {...register('status', { required: 'Status is required' })}
          fullWidth
          error={!!errors.status}
        >
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">Inactive</MenuItem>
        </Select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate('/AwardsTable')}
        style={{ marginLeft: '10px' }}
      >
        Cancel
      </Button>
    </form>
  );
};

export default EditAward;
