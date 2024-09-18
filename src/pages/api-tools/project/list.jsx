// project import
import React from 'react';
import MainCard from 'components/MainCard';
import Table from 'components/Table';
import {fetcherPost} from 'utils/axios';
import Grid from '@mui/material/Grid';
import PageTitle from 'components/common/PageTitle';
import { useEffect, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

export default function List() {

  const [rows,setrows] = useState([]);
  const rowsheader = [
    { id: 'id', label: 'ID' },
    { id: 'project_name', label: 'Name' },
    { id: 'stack', label: 'Stack' },
    { id: 'description', label: 'Description' },
    { id: 'is_active', label: 'Status' },
    { id: 'created_at', label: 'Created at', align: 'left',date:true },
    // { id: 'users', label: 'Users', align: 'left' },
  ];
  useEffect(() => {
    fetcherPost('project-read',{})
    .then(data => {
      if(data.status=="success")
        setrows(data.data.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  },[]);
  

  return (
    <>

      <Grid item xs={12} md={7} lg={8}>

        <MainCard sx={{ mt: 2 }} content={false}>
        <PageTitle title="Project" link={"/project-create"}/>

          <Table headers={rowsheader} data={rows}/>
        </MainCard>
      </Grid>
  </>
  );
}
