// src/page/ContactPage.js
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Box } from '@mui/material';

import QnaTop10 from '../components/ContactPage/QnaTop10';
import InquiryForm from '../components/ContactPage/InquiryForm';
import Notice from '../components/ContactPage/Notice';
import PopUp from '../components/ContactPage/PopUp'; // Updated import
import CircularButton from '../components/ContactPage/CircularButton';
import Sidebar from '../components/ContactPage/Sidebar';
import ServicesSection from '../components/ContactPage/ServiceSection';
import ContactSection from '../components/ContactPage/ContactSection';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff', // Inner box background
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  boxShadow: theme.shadows[3],
  borderRadius: '10px',
}));

const OuterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginLeft: 250, // Make room for the sidebar
  borderRadius: '10px',
  marginRight: 250,
}));

const ContactPage = () => {
  const [showPopUp, setShowPopUp] = useState(false); // Updated state

  const togglePopUp = () => {
    setShowPopUp(!showPopUp); // Updated toggle function
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <OuterContainer sx={{ width: '85%', margin: 'auto', marginTop: 5, marginBottom: 5 }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
          <Grid item xs={12} id="faq">
            <Item>
              <QnaTop10 />
            </Item>
          </Grid>
          <Grid item xs={12} id="inquiry">
            <Item>
              <InquiryForm />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Notice />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <ServicesSection />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <ContactSection />
            </Item>
          </Grid>
        </Grid>
        <CircularButton onClick={togglePopUp} />
        {showPopUp && <PopUp closePopup={togglePopUp} />}
      </OuterContainer>
    </Box>
  );
};

export default ContactPage;
