import { Box, Grid } from "@mui/material";
import { LoginTitle, StyledTypographyAck } from "../Login/Login.styled";
import { TextField } from "../../components/TextField";
import Button from "../../components/Button/Button";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../Api/ApiService";
import { Toast } from "../../components/Toast";
import { useTranslation } from "react-i18next";

interface signUp {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  enable: boolean;
}

const SignUp = () => {
  const { t } = useTranslation();
  const [userDetails, setUserDetails] = useState<signUp>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    enable: true,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"error" | "success" | "warning">("success");
  const [showToast, setShowToast] = useState<boolean>(false);

  const validateFields = () => {
    const newErrors = {
      firstName: userDetails.firstName.trim() ? "" : t("signUp.firstNameRequired"),
      lastName: userDetails.lastName.trim() ? "" : t("signUp.lastNameRequired"),
      email: userDetails.email.trim()
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)
          ? ""
          : t("signUp.emailInvalid")
        : t("signUp.emailRequired"),
      phoneNumber: userDetails.phoneNumber.trim()
        ? /^\d{10}$/.test(userDetails.phoneNumber)
          ? ""
          : t("signUp.phoneNumberInvalid")
        : t("signUp.phoneNumberRequired"),
      password: userDetails.password.trim() ? "" : t("signUp.passwordRequired"),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      const response = await apiService.post("/auth/create-user", userDetails, true);
      if (response) {
        navigate("/login");
        setMessage(t("signUp.signUpSuccess"));
        setMessageType("success");
        setShowToast(true);
      } else {
        setMessage(t("signUp.signUpFailed"));
        setMessageType("error");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Sign-up failed:", error);
      setMessage(t("signUp.signUpFailed"));
      setMessageType("error");
      setShowToast(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleLoginSubmit = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <Box sx={{ backgroundColor: "#ffffff", height: "93vh", padding: "24px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          boxShadow: "0px 4px 6px rgba(160, 231, 255, 0.6)",
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
              <LoginTitle>{t("signUp.title")}</LoginTitle>
            </Grid>
            <Grid item xs={10} gap={2} sx={{ display: "flex" }}>
              <TextField
                id={"firstName"}
                name="firstName"
                label={t("signUp.firstName")}
                placeholder={t("signUp.firstNamePlaceholder")}
                required={true}
                value={userDetails?.firstName}
                handleChange={handleChange}
                error={!!errors.firstName}
                errorMsg={errors.firstName}
              />
              <TextField
                id={"lastName"}
                name="lastName"
                label={t("signUp.lastName")}
                placeholder={t("signUp.lastNamePlaceholder")}
                required={true}
                value={userDetails?.lastName}
                handleChange={handleChange}
                error={!!errors.lastName}
                errorMsg={errors.lastName}
              />
            </Grid>
            <Grid item xs={10} gap={2} sx={{ display: "flex" }}>
              <TextField
                id={"email"}
                name="email"
                label={t("signUp.email")}
                placeholder={t("signUp.emailPlaceholder")}
                required={true}
                value={userDetails?.email}
                handleChange={handleChange}
                error={!!errors.email}
                errorMsg={errors.email}
              />
              <TextField
                id={"phoneNumber"}
                name="phoneNumber"
                label={t("signUp.phoneNumber")}
                placeholder={t("signUp.phoneNumberPlaceholder")}
                required={true}
                value={userDetails?.phoneNumber}
                handleChange={handleChange}
                error={!!errors.phoneNumber}
                errorMsg={errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={10} gap={2} sx={{ display: "flex" }}>
              <TextField
                id={"password"}
                name="password"
                label={t("signUp.password")}
                placeholder={t("signUp.passwordPlaceholder")}
                required={true}
                value={userDetails?.password}
                handleChange={handleChange}
                error={!!errors.password}
                errorMsg={errors.password}
              />
            </Grid>
            <Grid item xs={10}>
              <Button
                css={{ width: "100%", height: "40px" }}
                variant="primary"
                size="small"
                fullWidth
                onClick={handleSubmit}
                text={t("signUp.submitButton")}
              />
            </Grid>
            <Grid item xs={10} sx={{ marginTop: "40px" }}>
              <StyledTypographyAck>{t("signUp.alreadyHaveAccount")}</StyledTypographyAck>
              <StyledTypographyAck
                sx={{ color: "blue", cursor: "pointer" }}
                onClick={handleLoginSubmit}
              >
                {t("signUp.login")}
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

export default SignUp;
