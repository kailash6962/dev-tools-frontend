// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import {fetcher} from 'utils/axios';
import Grid from '@mui/material/Grid';

import InputAdornment from '@mui/material/InputAdornment';

import InputLabel from '@mui/material/InputLabel';

import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

import FormHelperText from '@mui/material/FormHelperText';

import Stack from '@mui/material/Stack';
import * as Yup from 'yup';
import { Formik } from 'formik';
// ==============================|| SAMPLE PAGE ||============================== //

export default function Form() {

  fetcher()
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  const handleFormSubmit = async (values) => {
    try{
      let response = await axios.post(import.meta.env.VITE_APP_API_URL+'register',values)
      if(response.data.status=="success"){
        navigate('/otpverify', { state: { email: values.email } });
      }
    }catch (e){
      console.log("📢[:77]: e.response.data.data.errors.otp: ", e.response);

      if(e.response.data.data.error){
        setpageerror(e.response.data.data.error);
      }
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const formFields = [
    { name: 'fullname', label: 'Full Name', type: 'text', onChange: handleChange },
    { name: 'student_name', label: 'Student Name', type: 'text', onChange: handleChange },
    { name: 'email', label: 'Email', type: 'text', onChange: handleChange },
    { name: 'mobile', label: 'Mobile', type: 'text', onChange: handleChange },
    { name: 'address1', label: 'Address Line 1', type: 'text', onChange: handleChange },
    { name: 'address2', label: 'Address Line 2', type: 'text', onChange: handleChange },
    { name: 'city', label: 'City', type: 'text', onChange: handleChange },
    { name: 'pincode', label: 'Pincode', type: 'text', onChange: handleChange },
  ];
  return (
    <MainCard title="Project Form">
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          company: '',
          designation: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().max(255).required('First Name is required'),
          last_name: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Grid container spacing={3}>
            {formFields.map((field) => (
              <Grid item xs={6} md={field.width || 12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
            ))}
              </Grid>
              )}
      </Formik>
    </MainCard>
  
  );
}
