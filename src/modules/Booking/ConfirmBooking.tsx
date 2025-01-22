import React from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ConfirmBooking = () => {
    const location = useLocation();
    const { seatNumber, showtime, theaters } = location.state || {};
    const { t } = useTranslation();

    // Extract theater details
    const theater = theaters?.[0] || {};
    const { theaterName, location: theaterLocation, ticketPrice } = theater;

    return (
        <Box sx={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card sx={{ width: "80%", maxWidth: "600px", boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        {t("confirmBooking.thankYou")}
                    </Typography>
                    <Divider sx={{ marginY: "15px" }} />

                    {/* Booking Details */}
                    <Box sx={{ marginBottom: "20px" }}>
                        <Typography variant="h6" gutterBottom>
                            {t("confirmBooking.theaterDetails")}
                        </Typography>
                        <Typography>
                            <strong>{t("confirmBooking.name")}:</strong> {theaterName || t("common.notAvailable")}
                        </Typography>
                        <Typography>
                            <strong>{t("confirmBooking.location")}:</strong> {theaterLocation || t("common.notAvailable")}
                        </Typography>
                        <Typography>
                            <strong>{t("confirmBooking.ticketPrice")}:</strong> ₹{ticketPrice * seatNumber?.length || t("common.notAvailable")}
                        </Typography>
                    </Box>

                    <Divider sx={{ marginY: "15px" }} />

                    <Box sx={{ marginBottom: "20px" }}>
                        <Typography variant="h6" gutterBottom>
                            {t("confirmBooking.showDetails")}
                        </Typography>
                        <Typography>
                            <strong>{t("confirmBooking.showtime")}:</strong> {showtime || t("common.notAvailable")}
                        </Typography>
                        <Typography>
                            <strong>{t("confirmBooking.seatNumbers")}:</strong> {seatNumber?.length > 0 ? seatNumber.join(", ") : t("confirmBooking.noSeatsSelected")}
                        </Typography>
                    </Box>

                    <Divider sx={{ marginY: "15px" }} />

                    {/* Confirmation Message */}
                    <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px", color: "green" }}>
                        {t("confirmBooking.confirmationMessage")}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ConfirmBooking;
