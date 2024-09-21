import { useState, useEffect } from 'react';

// project import
import MainCard from 'components/MainCard';
import {fetcherPost} from 'utils/axios';
import Grid from '@mui/material/Grid';


import InputLabel from '@mui/material/InputLabel';

import OutlinedInput from '@mui/material/OutlinedInput';
import AnimateButton from 'components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

import FormHelperText from '@mui/material/FormHelperText';

import Stack from '@mui/material/Stack';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useOutletContext, useLocation } from 'react-router-dom';
// ==============================|| SAMPLE PAGE ||============================== //

export default function Form({update}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useOutletContext();

  const pageProps = {
    readSlug:'project-read',
    updateSlug:'project-update',
    formLink:"/project-create",
    title:"Project",
  }
  const [formvalues, setformvalues] = useState({
    project_name: 'Sample Project',
    stack: '',
    description: '',
  });

  const formSchema = Yup.object().shape({
    project_name: Yup.string().max(255).required('First Name is required'),
    stack: Yup.string().max(255).required('Last Name is required'),
    description: Yup.string().max(255).required('Last Name is required'),
  });
  const formFields = [
    { name: 'project_name', label: 'Project Name', type: 'text' },
    { name: 'stack', label: 'Stack', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
  ];

  const handleFormSubmit = async (values) => {
    try{
      let response = await fetcherPost(pageProps[update?"updateSlug":"formLink"],values)
      if(response.status=="success"){
        navigate('/project-list');
      }
    }catch (e){
      showSnackbar(e.error,"error");
    }
  };

  function getData(){
    if(!location.state)
      return showSnackbar("Error fetch Id from state","error");
    fetcherPost(pageProps.readSlug,{id:location.state.id})
    .then(data => {
      if(data.status=="success")
        setformvalues(data.data.data[0]);
    })
    .catch(e => {
      showSnackbar(e.error,"error");
    });
  }
  useEffect(() => {
    if(update)
    getData();
  },[]);

  return (
    <>
    <MainCard title="Project Form">
      <Formik
        initialValues={formvalues}
        enableReinitialize={true}  
        validationSchema={formSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {formFields.map((field) => (
              <Grid key={"grid"+field.name} item xs={12} md={field.width || 12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched[field.name] && errors[field.name])}
                    id={field.name}
                    type={field.text}
                    value={values[field.name]}
                    name={field.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    inputProps={{}}
                  />
                </Stack>
                {touched[field.name] && errors[field.name] && (
                  <FormHelperText error id={`helper-text-${field.name}`}>
                    {errors[field.name]}
                  </FormHelperText>
                )}
              </Grid>
            ))}
            <Grid item xs={6} md={2}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </AnimateButton>
              </Grid>
              </Grid>
              </form>
              )}
      </Formik>
    </MainCard>
    </>
  );
}
