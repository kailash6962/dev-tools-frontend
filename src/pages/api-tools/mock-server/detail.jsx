import { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import ControlledAccordions from 'components/@extended/ControlledAccordions';
import RequestForm from 'components/Forms/RequestForm';
import { EditIcon } from 'components/Icons';
import { useLocation } from 'react-router-dom';

export default function Form({update}) {
  const location = useLocation();

  const [requestChange, setrequestChange] = useState(0);
  const [mockserverId, setmockserverId] = useState(update?location.state.id:false);
  const handleRequestChange = () => {
    setrequestChange(requestChange+1);
  };

  return (
    <MainCard title="Request Data" secondary={<RequestForm btnContent={'Add Request'} mockserverId={mockserverId} handleRequestChange={handleRequestChange}/>}>
      <ControlledAccordions 
      mockserverId={mockserverId} 
      requestChange={requestChange}
      requestForm={<RequestForm btnContent={<EditIcon />} mockserverId={mockserverId} handleRequestChange={handleRequestChange}/>}
      /> 
    </MainCard>
  );
}
