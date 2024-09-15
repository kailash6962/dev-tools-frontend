// project import
import MainCard from 'components/MainCard';
import Table from 'components/Table';
import {fetcherPost} from 'utils/axios';
import Grid from '@mui/material/Grid';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Form() {

  const actualData = [
    { tracking_no: 12345, name: 'Product A', totalOrder: 100, status: 1, totalAmount: 5000 },
    { tracking_no: 67890, name: 'Product B', totalOrder: 200, status: 0, totalAmount: 10000 },
    // more data
  ];

  const userHeaders = [
    { id: 'id', label: 'User ID', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: 'role', label: 'Role', align: 'right' }
  ];
  
  const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com',status: 1, role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com',status: 0, role: 'User' },
    // more data
  ];

  fetcherPost('project-read',{})
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  return (
    <Grid item xs={12} md={7} lg={8}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Table headers={userHeaders}  data={userData}/>
        </MainCard>
      </Grid>
  );
}
