import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { EndIconContainer, Headerstyle } from './Header.styled';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

export interface HeaderProps {
  profileImageUrl?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  }

  return (
    <Box sx={{ padding: '0px' }}>
      <Headerstyle elevation={7}>
        <Toolbar sx={{ paddingLeft: '0px' }}>
          <Box sx={{ paddingLeft: '0px', marginLeft:"-15px", display:"flex"}}>
          <Box>
                Filmi pass
              </Box>
          </Box>
          <EndIconContainer>
            <Box sx={{marginTop:'-10'}}>
          {currentUrl === '/settings' ? (
              <Box>
                Filmi pass
              </Box>
            ) : (

             <Box>
                Filmi pass
              </Box>
            )}
            </Box>
            <Box>
              <Button text={'Logout'} onClick={handleLogout}></Button>
            </Box>
          </EndIconContainer>
        </Toolbar>
      </Headerstyle>
    </Box>
  );
};

export default Header;
