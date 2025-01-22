import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { EndIconContainer, Headerstyle } from './Header.styled';
import {  useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import LanguageSelector from '../Language/LanguageSelector';

export interface HeaderProps {
  profileImageUrl?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <Box sx={{ padding: '0px', backgroundColor: '#0046ffc7' }}>
      <Headerstyle elevation={7} sx={{ backgroundColor: '#0046ffc7' }}>
        <Toolbar sx={{ paddingLeft: '0px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{fontWeight: 800, fontSize: '25px', color: 'white'}}>
              Filmi Pass
            </Box>
          </Box>
          <EndIconContainer>
            <Box sx={{ color :'white ' ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <LanguageSelector/>
            </Box>
            <Box >
              <Button text={'Logout'} onClick={handleLogout} css={{fontWeight:700, color:'white'}}></Button>
            </Box>
          </EndIconContainer>
        </Toolbar>
      </Headerstyle>
    </Box>
  );
};

export default Header;
