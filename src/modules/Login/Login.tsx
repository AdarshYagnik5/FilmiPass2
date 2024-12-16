import { Box, Checkbox, Grid } from "@mui/material";
import { LoginTitle, StyledBox, StyledLink, StyledTypographyAck, StyledTypographyRememberMe } from "./Login.styled";
import { TextField } from "../../components/TextField";
import { LoginLogo } from "../../components/Icon/CustomIcons";
import Button from "../../components/Button/Button";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async () => {
       

    };

    const handleSignUpSubmit = useCallback(() => {
        navigate('/sign-up');
    }, [navigate]);


    return (
        <Box sx={{ backgroundColor: '#ffffff', height: '88vh', padding: '54px' , width:"109%"}}>
            <Box sx={{ display: 'flex', backgroundColor: '#ffffff' ,flexDirection: 'row', height: '100%', boxShadow:'0px 4px 6px rgba(160, 231, 255, 0.6)' }}>
                <Box sx={{ width: "50%" }}>
                    <LoginLogo />
                </Box>
                <Box sx={{ width: "50%", padding: '100px' }}>
                    <Grid container rowSpacing={2} justifyContent={'center'}>
                        <Grid item xs={10}>
                            <LoginTitle>Login</LoginTitle>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                id={'username'}
                                name="username"
                                label="Username"
                                placeholder="Enter username"
                                required={true}
                                value={username}
                                handleChange={handleChange}
                                gap={'5px'}
                                style={{ height: '40px' }}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                id={'password'}
                                name="password"
                                label="Password"
                                placeholder="Enter password"
                                required={true}
                                value={password}
                                handleChange={handleChange}                                
                                textAlign={'left'}
                                gap={'5px'}
                                style={{ height: '40px' }}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <StyledBox>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Checkbox
                                        name="chkBxRememberMe"
                                        disabled={false}
                                        size="medium"
                                        onChange={(checked) => {
                                            console.log('checked ', checked);
                                        }}
                                    />
                                    <StyledTypographyRememberMe>Remember Me</StyledTypographyRememberMe>
                                </Box>
                                <StyledLink component="button" underline="none" variant="body2"
                                >
                                    Reset Password
                                </StyledLink>
                            </StyledBox>
                        </Grid>
                        <Grid item xs={10} display={'flex'} justifyContent={'center'} width={'100%'}>
                            <Button
                                css={{ width: '100%' }}
                                variant="primary"
                                size="small"
                                fullWidth
                                onClick={handleSubmit}
                                text={'Login'}
                            />
                        </Grid>
                        
                        <Grid item xs={10}>
                            <StyledTypographyAck>Acknowledgments, Licensing and Certification</StyledTypographyAck>
                        </Grid>

                        <Grid item xs={10} sx={{ marginTop: '40px' }}>
                            <StyledTypographyAck>Don't have an account yet ?</StyledTypographyAck>
                            <StyledTypographyAck sx={{ color: 'blue', cursor: 'pointer' }} onClick={handleSignUpSubmit}>Create an account</StyledTypographyAck>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
           
        </Box>
    );
}

export default Login;