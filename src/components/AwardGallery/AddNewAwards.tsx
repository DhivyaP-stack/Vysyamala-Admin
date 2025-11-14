import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField, Button, Select, MenuItem, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { notify } from '../TostNotification';

interface IFormInput {
  name: string;
  editorData: string; // CKEditor data
  status: string;
  image: FileList | null;
}

const AddAward: React.FC = () => {
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
  const navigate = useNavigate();
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  // Cleanup URL.createObjectURL when component unmounts or a new image is selected
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // Handle CKEditor content change
  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();

    // Clean up any <p> tags
    const cleanData = stripHtmlTags(data);

    setEditorData(cleanData);
    setValue('editorData', cleanData); // Register CKEditor data in react-hook-form
    trigger('editorData'); // Manually trigger validation for the CKEditor field
  };

  // Strip <p> tags from the CKEditor output
  const stripHtmlTags = (html: string) => {
    return html.replace(/<\/?p[^>]*>/g, ''); // Remove <p> and </p> tags
  };

  const onSubmit = async (data: IFormInput) => {
    const formData = new FormData();
    formData.append('name', data.name); // Award Name
    formData.append('description', data.editorData); // CKEditor Description
    formData.append('status', data.status); // Status
    formData.append('admin_user_id', adminUserID ?? ""); // Status

    if (image) {
      formData.append('image', image); // Image file
    }

    try {
      setLoading(true);

      // Sending form data to the API
      const response = await axios.post(
        ' https://app.vysyamala.com/api/awards/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200 || response.status <= 299) {
        console.log('Award added successfully:', response.data);
        notify('Award added successfully');
        reset(); // Reset the form after successful submission
        setImageUrl(null); // Reset the image preview
        setEditorData(''); // Clear the CKEditor content
        navigate('/AwardsTable'); // Navigate to Awards table
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response);
        alert(`Failed to submit form: ${error.response.data.message}`);
      } else {
        console.error('Error submitting form:', error);
        alert('Failed to submit form');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-4">Adding New Award</h2>

      <div className="mb-4">
        {/* Award Name Field */}
        <TextField
          label="Award Name"
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
            data={editorData}
            onChange={handleEditorChange}
            config={{
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
                'selectAll',
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
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                '|',
                'mediaEmbed',
                '|',
                'timestamp',
                '|',
                'findAndReplace',
                'sourceEditing',
              ],
              heading: {
                options: [
                  {
                    model: 'paragraph',
                    title: 'Normal',
                    class: 'ck-heading_paragraph',
                  },
                  {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1',
                  },
                  {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2',
                  },
                  {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3',
                  },
                  {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4',
                  },
                  {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5',
                  },
                  {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6',
                  },
                ],
              },
              ckfinder: {
                uploadUrl: ' https://app.vysyamala.com/api/upload-image/', // Update this URL as needed
              },
            }}
          />
        </div>
        {/* Display validation error for CKEditor only if it's empty during submission */}
        {/* {(!editorData && errors.editorData) && (
          <p className="text-red-500 text-sm">
            {errors.editorData.message || 'Description is required'}
          </p>
        )} */}
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
          </div>
        )}
        <Input
          type="file"
          {...register('image', {
            required: 'Image is required',
            validate: {
              size: (files) =>
                (files && files[0]?.size <= 5000000) ||
                'Image size must be less than 5MB', // Max 5MB
              type: (files) =>
                (files &&
                  ['image/jpeg', 'image/png'].includes(files[0]?.type)) ||
                'Only JPG/PNG files are allowed',
            },
          })}
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
        {/* Display validation error for image only if it's empty during submission */}
        {!image && errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
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
        {loading ? 'Submitting...' : 'Submit'}
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

export default AddAward;
