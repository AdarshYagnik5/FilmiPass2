import { Box, Checkbox, Grid, IconButton } from "@mui/material";
import { 
    LoginTitle, 
    StyledBox, 
    StyledLink, 
    StyledTypographyAck, 
    StyledTypographyRememberMe 
} from "./Login.styled";
import { TextField } from "../../components/TextField";
import Button from "../../components/Button/Button";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../Api/ApiService";
import { Toast } from "../../components/Toast";
import { useTranslation } from "react-i18next";

const Login = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState({ email: "", password: "" });
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<"error" | "success" | "warning">("success");
    const [showToast, setShowToast] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    const validateField = (field: string, value: string): string => {
        if (field === "email") {
            if (!value.trim()) return t("login.emailRequired");
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("login.invalidEmail");
        }
        if (field === "password") {
            if (!value.trim()) return t("login.passwordRequired");
            if (value.length < 5) return t("login.passwordMinLength");
        }
        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
            setError((prev) => ({ ...prev, email: validateField("email", value) }));
        }
        if (name === "password") {
            setPassword(value);
            setError((prev) => ({ ...prev, password: validateField("password", value) }));
        }
    };

    const handleSubmit = async () => {
        const emailError = validateField("email", email);
        const passwordError = validateField("password", password);

        if (emailError || passwordError) {
            setError({ email: emailError, password: passwordError });
            return;
        }

        try {
            const data = { email, password };
            const response = await apiService.post("/auth/login", data, true);

            if (response) {
                localStorage.setItem("token", response.jwtToken);
                setShowToast(true);
                setMessage(t("login.successMessage"));
                setMessageType("success");
                navigate("/movies");
            } else {
                setShowToast(true);
                setMessage(t("login.errorMessage"));
                setMessageType("error");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setShowToast(true);
            setMessage(t("login.errorMessage"));
            setMessageType("error");
        } finally {
            setShowToast(true);
        }
    };

    const handleSignUpSubmit = useCallback(() => {
        navigate("/sign-up");
    }, [navigate]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ backgroundColor: "#ffffff", height: "93vh", padding: "24px" }}>
            <Box
                sx={{
                    display: "flex",
                    backgroundColor: "#ffffff",
                    flexDirection: "row",
                    height: "100%",
                    boxShadow: "0px 4px 6px rgba(160, 231, 255, 0.6)"
                }}
            >
                <Box sx={{ width: "50%" }}>
                <img
                    src="https://cdn.pixabay.com/photo/2012/04/24/21/37/masks-40963_640.png"
                    alt="Theater Screen"
                    style={{ width: "100%", height: "600px", marginTop: "60px" }}
                />
                </Box>
                <Box sx={{ width: "50%", padding: "100px" }}>
                    <Grid container rowSpacing={2} justifyContent={"center"}>
                        <Grid item xs={10}>
                            <LoginTitle>{t("login.title")}</LoginTitle>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                id="email"
                                name="email"
                                label={t("login.username")}
                                placeholder={t("login.usernamePlaceholder")}
                                required
                                value={email}
                                handleChange={handleChange}
                                gap="5px"
                                style={{ height: "40px" }}
                                error={!!error.email}
                                errorMsg={error.email}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                id="password"
                                name="password"
                                label={t("login.password")}
                                placeholder={t("login.passwordPlaceholder")}
                                required
                                value={password}
                                handleChange={handleChange}
                                textAlign="left"
                                gap="5px"
                                style={{ height: "40px" }}
                                error={!!error.password}
                                errorMsg={error.password}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        disableRipple
                                    >
                                        {showPassword ? <Box sx={{fontSize:"16px"}}>{t("login.hidePassword")}</Box> : <Box sx={{fontSize:"16px"}}>{t("login.showPassword")}</Box>}
                                    </IconButton>
                                }
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <StyledBox>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Checkbox
                                        name="chkBxRememberMe"
                                        disabled={false}
                                        size="medium"
                                    />
                                    <StyledTypographyRememberMe>{t("login.rememberMe")}</StyledTypographyRememberMe>
                                </Box>
                                <StyledLink component="button" underline="none" variant="body2">
                                    {t("login.resetPassword")}
                                </StyledLink>
                            </StyledBox>
                        </Grid>
                        <Grid item xs={10} display={"flex"} justifyContent={"center"} width={"100%"}>
                            <Button
                                css={{ width: "100%" }}
                                variant="primary"
                                size="small"
                                fullWidth
                                onClick={handleSubmit}
                                text={t("login.loginButton")}
                            />
                        </Grid>

                        <Grid item xs={10}>
                            <StyledTypographyAck>
                                {t("login.acknowledgments")}
                            </StyledTypographyAck>
                        </Grid>

                        <Grid item xs={10} sx={{ marginTop: "40px" }}>
                            <StyledTypographyAck>{t("login.noAccount")}</StyledTypographyAck>
                            <StyledTypographyAck
                                sx={{ color: "blue", cursor: "pointer" }}
                                onClick={handleSignUpSubmit}
                            >
                                {t("login.createAccount")}
                            </StyledTypographyAck>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {showToast && (
                <Toast
                    open={showToast}
                    type={messageType}
                    title={message}
                    onClose={() => setShowToast(false)}
                />
            )}
        </Box>
    );
};

export default Login;
