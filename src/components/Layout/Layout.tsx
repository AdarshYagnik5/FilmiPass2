import { Stack, Grid, Box } from "@mui/material";
import Header from "../Header/Header";
// import Sidebar from "../Sidebar/Sidebar";
import { Container } from "./Layout.styled";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Container>
      <div >
        <Stack direction={'column'}>
          <Header />
          <Grid container flexWrap="nowrap" sx={{paddingRight:'90px' , overflow:'auto'}}>
            <Grid width={'100%'}  >
              <Box >
                <Outlet />
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </div>
    </Container>
  );
}

export default Layout;
