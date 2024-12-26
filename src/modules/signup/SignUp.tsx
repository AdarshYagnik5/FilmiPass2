import { Box, Grid } from "@mui/material";
import { LoginTitle, StyledTypographyAck } from "../Login/Login.styled";
import { TextField } from "../../components/TextField";
import Button from "../../components/Button/Button";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../Api/ApiService";
import { LoginLogo } from "../../components/Icon/CustomIcons";
import { Toast } from "../../components/Toast";

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
      firstName: userDetails.firstName.trim() ? "" : "First Name is required",
      lastName: userDetails.lastName.trim() ? "" : "Last Name is required",
      email: userDetails.email.trim()
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)
          ? ""
          : "Invalid Email Address"
        : "Email is required",
      phoneNumber: userDetails.phoneNumber.trim()
        ? /^\d{10}$/.test(userDetails.phoneNumber)
          ? ""
          : "Invalid Mobile Number"
        : "Mobile Number is required",
      password: userDetails.password.trim() ? "" : "Password is required",
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
        setMessage("Sign up successfully");
        setMessageType("success");
        setShowToast(true);
      } else {
        setMessage("Sign-up Failed");
        setMessageType("error");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Sign-up failed:", error);
      setMessage("Sign-up Failed");
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
    <Box sx={{ backgroundColor: "#ffffff", height: "88vh", padding: "54px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          boxShadow: "0px 4px 6px rgba(160, 231, 255, 0.6)",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <LoginLogo />
        </Box>
        <Box sx={{ width: "50%", padding: "100px" }}>
          <Grid container rowSpacing={2} justifyContent={"center"}>
            <Grid item xs={10}>
              <LoginTitle>Sign Up</LoginTitle>
            </Grid>
            <Grid item xs={10} gap={2} sx={{ display: "flex" }}>
              <TextField
                id={"firstName"}
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
                required={true}
                value={userDetails?.firstName}
                handleChange={handleChange}
                error={!!errors.firstName}
                errorMsg={errors.firstName}
              />
              <TextField
                id={"lastName"}
                name="lastName"
                label="Last Name"
                placeholder="Enter Last Name"
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
                label="Email Address"
                placeholder="Enter Email Address"
                required={true}
                value={userDetails?.email}
                handleChange={handleChange}
                error={!!errors.email}
                errorMsg={errors.email}
              />
              <TextField
                id={"phoneNumber"}
                name="phoneNumber"
                label="Mobile Number"
                placeholder="Enter Mobile Number"
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
                label="Password"
                placeholder="Enter Password"
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
                text={"Sign Up"}
              />
            </Grid>
            <Grid item xs={10} sx={{ marginTop: "40px" }}>
              <StyledTypographyAck>Already on FilmiPass ?</StyledTypographyAck>
              <StyledTypographyAck
                sx={{ color: "blue", cursor: "pointer" }}
                onClick={handleLoginSubmit}
              >
                Login
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
