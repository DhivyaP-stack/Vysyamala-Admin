import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Container,
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Notification, { notify } from '../../TostNotification';

const EditAdminUserSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  role_id: z.string().nonempty('Role is required'),
});

type EditAdminUserFormValues = z.infer<typeof EditAdminUserSchema>;

const EditAdminUserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState<{ id: number; role_name: string }[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<EditAdminUserFormValues>({
    resolver: zodResolver(EditAdminUserSchema),
  });

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(`http://192.168.1.11:8000/auth/admin-users/${id}/`);
  //       const userData = response.data;
  //       setValue('username', userData.username);
  //       setValue('email', userData.email);
  //       setValue('password', userData.password);
  //       setValue('first_name', userData.first_name);
  //       setValue('last_name', userData.last_name);
  //       setValue('role_id', userData.role_id);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   const fetchRoles = async () => {
  //     try {
  //       const response = await axios.get('http://192.168.1.11:8000/auth/admin-users/roles/');
  //       setRoles(response.data);
  //     } catch (error) {
  //       console.error('Error fetching roles:', error);
  //     }
  //   };

  //   fetchUser();
  //   fetchRoles();
  // }, [id, setValue]);

  useEffect(() => {
    if (!id) {
      console.error('Error: ID not provided');
      console.log('ID:', id); // Log the ID when it's undefined
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          ` https://app.vysyamala.com/api/admin-users/`,
        );
        const users = response.data;
        console.log('Fetched Users:', users);
        const userData = users.find(
          (user: { id: number }) => user.id == parseInt(id),
        );

        if (userData) {
          setValue('username', userData.username);
          setValue('email', userData.email);
          setValue('first_name', userData.first_name);
          setValue('last_name', userData.last_name);
          setValue('role_id', userData.role_id.toString());
          setValue('password', userData.password);
        } else {
          console.error('User not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          ' https://app.vysyamala.com/api/admin-users/roles/',
        );
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchUser();
    fetchRoles();
  }, [id, setValue]);

  const onSubmit = async (data: EditAdminUserFormValues) => {
    try {
      let response = await axios.put(
        ` https://app.vysyamala.com/api/admin-user/edit/${id}/`,
        data,
      );
      if (response.status >= 200 || response.status <= 299) {
        notify('Successfully Updated');
      }
      navigate('/AdminList');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <Container maxWidth="lg">
      <Box mt={1}>
        <Typography variant="h4" gutterBottom>
          Edit Admin User
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                margin="normal"
                {...register('first_name')}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                {...register('last_name')}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" error={!!errors.role_id}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role_id"
                  {...register('role_id')}
                  value={watch('role_id') || ''}
                  label="Role"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id.toString()}>
                      {role.role_name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role_id && (
                  <Typography color="error">
                    {errors.role_id.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete="new-password"  
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Box mt={1}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ height: '50px', fontSize: '16px', mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </form>
        <Notification />
      </Box>
    </Container>
  );
};

export default EditAdminUserForm;
