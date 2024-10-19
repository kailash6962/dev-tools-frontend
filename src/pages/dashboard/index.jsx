import { useEffect, useState } from 'react';
import { useNavigate,useOutletContext } from 'react-router-dom';
// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import OrdersTable from './OrdersTable';
import Table from 'components/Table';
import {fetcherPost} from 'utils/axios';
import {sumColumn} from 'utils/common';
// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {

  const { showSnackbar } = useOutletContext();

  const [rows,setrows] = useState([]);
  const [datacounts,setdatacounts] = useState({
    mockServerCount:0,
    mockServerReqCount:0,
    projectCount:0,
    totalHitCount:0,
  });

  const rowsheader = [
    { id: 'id', label: 'ID' },
    { id: 'project_name', label: 'Project Name' },
    { id: 'server_name', label: 'Server' },
    { id: 'request_name', label: 'Request Name' },
    { id: 'request_count', label: 'Request Count' },
    { id: 'url_slug', label: 'Url Slug' },
  ];

  function getData(){
    fetcherPost("dashboard",{})
    .then(data => {
      if(data.status=="success")
      {
        console.log("📢[:20]: data: ", data);
        let logData = data.data.requestLogs;
        setrows(logData);
        setdatacounts({
          mockServerCount:data.data.mockServerCount,
          mockServerReqCount:data.data.mockServerReqCount,
          projectCount:data.data.projectCount,
          totalHitCount:sumColumn(logData,'request_count'),
        });
      }
    })
    .catch(e => {
      showSnackbar(e.error,"error");
    });
  }
  useEffect(() => {
    getData();
  },[]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Projects" count={datacounts.projectCount}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Mock Servers" count={datacounts.mockServerCount}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Mock Requests" count={datacounts.mockServerReqCount}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Hit Counts" count={datacounts.totalHitCount}/>
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {/* <OrdersTable /> */}
          <Table headers={rowsheader} data={rows}/>
        </MainCard>
      </Grid>
    </Grid>
  );
}
