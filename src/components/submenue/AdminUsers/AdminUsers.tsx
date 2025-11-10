

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
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
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Notification, { notify } from '../../TostNotification'; // Import Notification and notify

const adminUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  role_id: z.string().nonempty('Role is required'),
});

type AdminUserFormValues = z.infer<typeof adminUserSchema>;

const AdminUserForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<AdminUserFormValues>({
    resolver: zodResolver(adminUserSchema),
  });

  const [roles, setRoles] = useState<{ id: number; role_name: string }[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(' https://app.vysyamala.com/api/admin-users/roles/');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data: AdminUserFormValues) => {
    try {
      const response = await axios.post(' https://app.vysyamala.com/api/admin-user/add/', data);
      if (response.status >= 200 && response.status <= 201) {
        notify('Admin User Successfully Added');  // Trigger notification
      }
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    navigate('/AdminList');
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="lg">
      <Box mt={1}>
        <Typography variant="h4" gutterBottom>
          Admin User Form
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
                  defaultValue=""
                  label="Role"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id.toString()}>
                      {role.role_name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role_id && <Typography color="error">{errors.role_id.message}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}  // Toggle between 'text' and 'password'
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
        <Notification />  {/* Ensure Notification component is rendered */}
      </Box>
    </Container>
  );
};

export default AdminUserForm;
