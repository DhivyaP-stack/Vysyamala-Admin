import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { notify } from '../TostNotification';
import { successStoryEdit, successStoryList } from '../../services/api';
import { hasPermission } from '../utils/auth';

// Define the Zod schema for validation
const schema = z.object({
  coupleName: z
    .string()
    .min(1, 'Couple name is required')
    .regex(/^[A-Za-z\s]+$/, 'Couple name must only contain letters and spaces'),
  dateOfMarriage: z.string().nonempty('Date of Marriage is required'),
  details: z.string().nonempty('Details are required'),
  photo: z.instanceof(File).optional(),
});

// Infer the types from the schema
type FormValues = z.infer<typeof schema>;

interface SuccessStoryData {
  couple_name: string;
  photo?: string; // URL of the photo
  date_of_marriage: string;
  details: string;
}

const EditSuccessStory: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null); // URL for the photo preview
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null); // Selected file for upload
  const [buttonText, setButtonText] = useState('Update');
  const { id } = useParams<{ id: string }>(); // Get the id from the URL
  const navigate = useNavigate();
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      coupleName: '',
      dateOfMarriage: '',
      details: '',
      photo: undefined,
    },
  });

  useEffect(() => {
    const fetchSuccessStory = async () => {
      try {
        const response = await axios.get<SuccessStoryData>(
          ` ${successStoryList}${id}/`,
        );
        const data = response.data;
        setValue('coupleName', data.couple_name);
        setValue('dateOfMarriage', data.date_of_marriage);
        setValue('details', data.details);
        if (data.photo) {
          setPhotoUrl(data.photo); // Store the existing photo URL
        }
      } catch (error) {
        console.error('Error fetching success story:', error);
      }
    };

    fetchSuccessStory();
  }, [id, setValue]);

  const onSubmit = async (formData: FormValues) => {
    setButtonText('Updating...');
    const { coupleName, dateOfMarriage, details } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('couple_name', coupleName);
    formDataToSend.append('date_of_marriage', dateOfMarriage);
    formDataToSend.append('details', details);
    formDataToSend.append('admin_user_id', adminUserID ?? ""); // Status

    if (selectedPhoto) {
      formDataToSend.append('photo', selectedPhoto);
    } else if (photoUrl) {
      // Fetch the existing photo as a binary file and append it to the formData
      try {
        const response = await axios.get(photoUrl, { responseType: 'blob' });
        const photoBlob = response.data as Blob;
        formDataToSend.append(
          'photo',
          new File([photoBlob], 'existing_photo.jpg'),
        ); // Append the binary file

        if (response.status >= 200 || response.status <= 299) {
          notify('Successfully Updated');
        }
      } catch (error) {
        console.error('Error fetching photo as binary:', error);
        // Handle error (show a notification to the user)
        return;
      }
    }

    try {
      const response = await axios.put(
        ` ${successStoryEdit}${id}/`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        navigate('/SuccessStories');
      }
    } catch (error) {
      console.error('Error updating success story:', error);
      // Handle error (show a notification to the user)
    }
  };

  return (
    <Paper style={{ padding: '80px', marginTop: '20px' }}>
      <h2 className="text-4xl font-bold underline mb-4">Edit Success Story</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="coupleName"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Couple Name"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!errors.coupleName}
                  helperText={errors.coupleName?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="photo"
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <Button variant="outlined" component="label">
                    Upload New Photo
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedPhoto(e.target.files[0]);
                          onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </Button>
                  {selectedPhoto && (
                    <div style={{ marginTop: '10px' }}>
                      <img
                        src={URL.createObjectURL(selectedPhoto)}
                        alt="Preview"
                        style={{
                          width: '100px',
                          height: 'auto',
                          marginTop: '10px',
                        }}
                      />
                    </div>
                  )}
                  {!selectedPhoto && photoUrl && (
                    <div style={{ marginTop: '10px' }}>
                      <img
                        src={photoUrl}
                        alt="Existing Photo"
                        style={{
                          width: '200px',
                          height: 'auto',
                          marginTop: '10px',
                        }}
                      />
                    </div>
                  )}
                  {errors.photo && (
                    <p style={{ color: 'red' }}>{errors.photo.message}</p>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="dateOfMarriage"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Date of Marriage"
                  variant="outlined"
                  type="date"
                  fullWidth
                  {...field}
                  error={!!errors.dateOfMarriage}
                  helperText={errors.dateOfMarriage?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="details"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Details"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  {...field}
                  error={!!errors.details}
                  helperText={errors.details?.message}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button variant="contained" color="primary" type="submit">
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditSuccessStory;
