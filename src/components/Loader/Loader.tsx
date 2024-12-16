import { Box, CircularProgress, Typography } from "@mui/material";

export default function CircularLoader() {
    return (
      <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center', width:'100%', flexDirection:'column',gap:'4px' }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
        
      </Box>
    );
  }