import { Box, Grid } from "@mui/material";
import { LoginTitle, StyledTypographyAck } from "../Login/Login.styled";
import { TextField } from "../../components/TextField";
import Button from "../../components/Button/Button";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginLogo } from "../../components/Icon/CustomIcons";

interface signUp {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    enable: boolean;
}

const SignUp = () => {
    const [userDetails, setUserDetails] = useState<signUp>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        enable: true
    });
    const navigate = useNavigate();
    console.log("userDtails",userDetails)

 
    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });

            if (response.ok) {
                navigate("/auth/login");
            }
        } catch (error) {
            console.error("Sign-up failed:", error);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'firstName') {
            setUserDetails(prevDetails => ({ ...prevDetails, firstName: e.target.value }));
        }
        if (e.target.name === 'lastName') {
            setUserDetails(prevDetails => ({ ...prevDetails, lastName: e.target.value }));
        }
        if (e.target.name === 'email') {
            setUserDetails(prevDetails => ({ ...prevDetails, email: e.target.value }));
        }
        if (e.target.name === 'phoneNumber') {
            setUserDetails(prevDetails => ({ ...prevDetails, phoneNumber: e.target.value }));
        }
        if (e.target.name === 'password') {
            setUserDetails(prevDetails => ({ ...prevDetails, password: e.target.value }));
        }
    }
    
    const handleLoginSubmit = useCallback(() => {
        navigate('/login');
    }, [navigate]);


    return (
        <Box sx={{ backgroundColor: '#ffffff', height: '88vh', padding: '54px' , width:"104%"}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', boxShadow:'0px 4px 6px rgba(160, 231, 255, 0.6)' }}>
                <Box sx={{  width: "50%" }}>
                <LoginLogo />
                </Box>
                <Box sx={{  width: "50%", padding: '100px' }}>
                    <Grid container rowSpacing={2} justifyContent={'center'}>
                        <Grid item xs={10}>
                            <LoginTitle>Sign Up</LoginTitle>
                        </Grid>
                        <Grid item xs={10} gap={2} sx={{ display: 'flex' }}>
                            <TextField
                                id={'firstName'}
                                name="firstName"
                                label="First Name"
                                placeholder="Enter first name"
                                required={true}
                                value={userDetails?.firstName}
                                handleChange={handleChange}
                                gap={'5px'}
                                style={{ height: '40px' }}
                            />
                            <TextField
                                id={'lastName'}
                                name="lastName"
                                label="Last Name"
                                placeholder="Enter Last Name"
                                required={true}
                                value={userDetails?.lastName}
                                handleChange={handleChange}
                                gap={'5px'}
                                style={{ height: '40px' }}
                            />
                        </Grid>
                        <Grid item xs={10} gap={2} sx={{ display: 'flex' }}>
                            <TextField
                                id={'email'}
                                name="email"
                                label="Email Address"
                                placeholder="Enter Email Address"
                                required={true}
                                value={userDetails?.email}
                                handleChange={handleChange}
                                gap={'5px'}
                                style={{ height: '40px' }}
                            />
                            <TextField
                                id={'phoneNumber'}
                                name="phoneNumber"
                                label="Mobile Number"
                                placeholder="Enter Mobile Number"
                                required={true}
                                value={userDetails?.phoneNumber}
                                handleChange={handleChange}
                                gap={'5px'}
                                style={{ height: '40px' }}
                            />
                        </Grid>
                        <Grid item xs={10} gap={2} sx={{ display: 'flex' }}>
                            <TextField
                                id={'password'}
                                name="password"
                                label="Password"
                                placeholder="Enter Password"
                                required={true}
                                value={userDetails?.password}
                                handleChange={handleChange}
                                gap={'5px'}
                                style={{ height: '40px' }}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Button
                                css={{ width: '100%', height: '40px' }}
                                variant="primary"
                                size="small"
                                fullWidth
                                onClick={handleSubmit}
                                text={'Sign Up'}
                            />
                        </Grid>
                        <Grid item xs={10} sx={{ marginTop: '40px' }}>
                            <StyledTypographyAck>Already on FilmiPass ?</StyledTypographyAck>
                            <StyledTypographyAck sx={{ color: 'blue', cursor: 'pointer' }} onClick={handleLoginSubmit}>Login</StyledTypographyAck>
                        </Grid>


                    </Grid>
                </Box>
            </Box>
           
        </Box>
    );
}
export default SignUp