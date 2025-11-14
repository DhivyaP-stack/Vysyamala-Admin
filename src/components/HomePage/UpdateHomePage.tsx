import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { notify, notifyDelete } from '../TostNotification';
import { apiAxios } from '../../api/apiUrl';

interface FormData {
  why_vysyamala: string;
  image: FileList | null;
  youtube_links: string;
  vysyamala_apps: string;
}

const EditHomepageForm: React.FC = () => {
  // The 'id' from useParams is not used in the API URL, but kept for context
  const { id } = useParams<{ id: string }>();

  const { control, handleSubmit, setValue } = useForm<FormData>();
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Use the correct API endpoint to fetch the data list
        const response = await apiAxios.get(`api/home_page_list/`);

        // 2. Access the first item in the nested 'data' array
        if (response.data && response.data.data && response.data.data.length > 0) {
          const homepageData = response.data.data[0];
          const { why_vysyamala, youtube_links, vysyamala_apps, image } = homepageData;

          setValue('why_vysyamala', why_vysyamala);
          setValue('youtube_links', youtube_links);
          setValue('vysyamala_apps', vysyamala_apps);

          // Set the existing image if the API provides it
          if (image) {
            setExistingImage(image);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        notify("Error occurred while fetching data.");
      }
    };

    fetchData();
  }, [setValue]); // 'id' is removed as it's not used in the GET request


  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('why_vysyamala', data.why_vysyamala);
    formData.append('youtube_links', data.youtube_links);
    formData.append('vysyamala_apps', data.vysyamala_apps);
    formData.append('admin_user_id', adminUserID ?? "");
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    try {
      // Ensure this PUT endpoint is correct for updating the entry with id=1
      const response = await apiAxios.put(`api/home_page_list/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        notify("Homepage updated successfully");
      } else {
        notifyDelete("Update failed. Please try again.");
      }
    } catch (error) {
      console.error('Error updating entry:', error);
      notifyDelete("Error occurred. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '100%', maxWidth: 1500, mx: 'auto', mt: 4, padding: 2, borderRadius: 2, boxShadow: 2 }}
    >
      <Typography sx={{ color: "black" }} variant="h6" gutterBottom>
        Homepage
      </Typography>

      {/* Why Vysyamala (CKEditor) */}
      <Controller
        name="why_vysyamala"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Why Vysyamala</Typography>
            <CKEditor
              editor={ClassicEditor}
              data={field.value || ""}
              config={{
                ckfinder: {
                  uploadUrl: 'https://app.vysyamala.com/api/upload-image/',
                },
                toolbar: [
                  'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                  'insertTable', 'blockQuote', 'undo', 'redo', 'imageUpload', 'mediaEmbed'
                ],
                image: {
                  toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                field.onChange(data);
              }}
            />
          </Box>
        )}
      />

      {/* This section for the image is kept, but the list API you provided does not include an 'image' field. */}
      {existingImage && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Existing Image:</Typography>
          <img src={existingImage} alt="Existing" width="100%" style={{ borderRadius: '4px', marginTop: '8px' }} />
        </Box>
      )}

      {/* YouTube Link */}
      <Controller
        name="youtube_links"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="YouTube Link"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
        )}
      />

      {/* Vysyamala Apps Description */}
      <Controller
        name="vysyamala_apps"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Vysyamala Apps"
            fullWidth
            multiline
            rows={2}
            margin="normal"
            variant="outlined"
          />
        )}
      />

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Update Entry
      </Button>
    </Box>
  );
};

export default EditHomepageForm;