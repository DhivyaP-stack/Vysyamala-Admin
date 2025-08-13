

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import  { notify } from '../TostNotification';

interface FormData {
  why_vysyamala: string;
  image: FileList | null;
  youtube_links: string;
  vysyamala_apps: string;
}

const EditHomepageForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
 
  const { control, handleSubmit, setValue } = useForm<FormData>();
  const [existingImage, setExistingImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(` https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/homepage-list/${1}/`);
        const { why_vysyamala, youtube_links, vysyamala_apps, image } = response.data;
        setValue('why_vysyamala', why_vysyamala);
        setValue('youtube_links', youtube_links);
        setValue('vysyamala_apps', vysyamala_apps);
        setExistingImage(image);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, setValue]);

  // const onSubmit = async (data: FormData) => {
  //   const formData = new FormData();
  //   formData.append('why_vysyamala', data.why_vysyamala);
  //   formData.append('youtube_links', data.youtube_links);
  //   formData.append('vysyamala_apps', data.vysyamala_apps);
  //   if (data.image && data.image[0]) {
  //     formData.append('image', data.image[0]);
  //   }

  //   try {
  //     const response = await axios.put(` https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/homepage/edit/${1}/`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log('Successfully updated entry:', response.data);
  //    if(response.data === 200){
  //     notify("Updated Successfully")
  //    }
  //   } catch (error) {
  //     console.error('Error updating entry:', error);
  //   }
  // };
  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append('why_vysyamala', data.why_vysyamala);
    formData.append('youtube_links', data.youtube_links);
    formData.append('vysyamala_apps', data.vysyamala_apps);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }
  
    try {
      const response = await axios.put(` https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/homepage/edit/${1}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        notify("Updated Successfully");
      } else {
        notify("Update failed. Please try again.");
      }
    } catch (error) {
      console.error('Error updating entry:', error);
      notify("Error occurred. Please try again.");
    }
  };
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '100%', maxWidth: 1500, mx: 'auto', mt: 4, padding: 2, borderRadius: 2, boxShadow: 2 }}
    >
      <Typography sx={{color:"black"}} variant="h6" gutterBottom>
        Homepage
      </Typography>

      {/* Why Vysyamala (CKEditor with Image Upload Support) */}
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
                  uploadUrl: ' https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/upload-image/', // Your server endpoint for image upload
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
