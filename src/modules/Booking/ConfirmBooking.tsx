import React from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";

const ConfirmBooking = () => {
    const location = useLocation();
    const { seatNumber, showtime, theaters } = location.state || {};

    // Extract theater details
    const theater = theaters?.[0] || {};
    const { theaterName, location: theaterLocation, ticketPrice } = theater;

    return (
        <Box sx={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card sx={{ width: "80%", maxWidth: "600px", boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Thank You for Booking Your Tickets!
                    </Typography>
                    <Divider sx={{ marginY: "15px" }} />

                    {/* Booking Details */}
                    <Box sx={{ marginBottom: "20px" }}>
                        <Typography variant="h6" gutterBottom>
                            Theater Details
                        </Typography>
                        <Typography>
                            <strong>Name:</strong> {theaterName || "N/A"}
                        </Typography>
                        <Typography>
                            <strong>Location:</strong> {theaterLocation || "N/A"}
                        </Typography>
                        <Typography>
                            <strong>Ticket Price:</strong> ₹{ticketPrice*seatNumber.length || "N/A"}
                        </Typography>
                    </Box>

                    <Divider sx={{ marginY: "15px" }} />

                    <Box sx={{ marginBottom: "20px" }}>
                        <Typography variant="h6" gutterBottom>
                            Show Details
                        </Typography>
                        <Typography>
                            <strong>Showtime:</strong> {showtime || "N/A"}
                        </Typography>
                        <Typography>
                            <strong>Seat Numbers:</strong> {seatNumber?.length > 0 ? seatNumber.join(", ") : "No seats selected"}
                        </Typography>
                    </Box>

                    <Divider sx={{ marginY: "15px" }} />
                    
                    {/* Confirmation Message */}
                    <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px", color: "green" }}>
                        Your booking has been confirmed successfully!
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ConfirmBooking;
