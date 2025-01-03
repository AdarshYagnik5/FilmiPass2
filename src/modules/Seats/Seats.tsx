import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const Seats = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { theaterId, showtime, theaters } = location.state || {};
    console.log(showtime, theaterId, theaters);
    const capacity = theaters?.[0]?.capacity || 0; // Total capacity

    // Fixed number of columns
    const columns = 5;

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    // Handle checkbox click
    const handleSeatSelection = (seatNumber: number) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatNumber)) {
                // Deselect the seat
                return prevSelectedSeats.filter((seat) => seat !== seatNumber);
            } else {
                // Select the seat
                return [...prevSelectedSeats, seatNumber];
            }
        });
    };

    const handleConfirmSeats = (seatNumber: number[]) => {
        navigate('/confirm-seats', { state: { seatNumber, showtime, theaters } });
    }

    return (
        <div>
            <Box
                sx={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginLeft: "45px",
                }}
            >
                <img
                    src="https://img.freepik.com/free-vector/empty-stage-with-cinema-screen-cartoon-vector_107791-16802.jpg"
                    alt="Theater Screen"
                    style={{ width: "100%", height: "300px" }}
                />
            </Box>
            <Box sx={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>Select Your Seats</h3>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${columns}, 60px)`,
                        gap: "10px",
                    }}
                >
                    {Array.from({ length: capacity }, (_, index) => {
                        const seatNumber = index + 1;
                        return (
                            <FormControlLabel
                                key={seatNumber}
                                control={
                                    <Checkbox
                                        checked={selectedSeats.includes(seatNumber)}
                                        onChange={() => handleSeatSelection(seatNumber)}
                                    />
                                }
                                label={`S${seatNumber}`}
                                sx={{
                                    margin: 0,
                                    width: "60px",
                                    textAlign: "center",
                                }}
                            />
                        );
                    })}
                </div>
            </Box>
            <Box sx={{ marginTop: "20px", textAlign: "center" }}>
                <h4>Selected Seats:</h4>
                <p>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "No seats selected"}</p>
            </Box>
            <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                <Button
                    css={{ width: "200px" }}
                    variant="primary"
                    size="small"
                    fullWidth
                    onClick={() => handleConfirmSeats(selectedSeats)}
                    text="Book Seats"
                />
            </Box>
        </div>
    );
};

export default Seats;
