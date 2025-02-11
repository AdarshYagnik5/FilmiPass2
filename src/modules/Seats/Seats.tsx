import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import apiService from "../Api/ApiService";
import { useTranslation } from "react-i18next";

const Seats = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { theaterId, showtime, theaters, Theater, movieTitle, showDate } = location.state || {};
    console.log("ggggggggg",showtime, theaterId, Theater, movieTitle, showDate,location);
    const capacity = theaters?.[0]?.capacity || 0; // Total capacity

    // Fixed number of columns
    const columns = 10;

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [filledSeats, setFilledSeats] = useState<string[]>([]);

    const todayDate = new Date();
    const formattedDate = todayDate.toISOString().split('T')[0];
    console.log("today date", formattedDate);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const res = await apiService.get(`/filmipass/bookings/filled-seats/${movieTitle}/${Theater.theaterName}/${Theater.location}/${formattedDate}/${showtime}`);
                setFilledSeats(res);
                console.log(res);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchSeats();
    }, [])

    const handleSeatSelection = (seatNumber: number) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatNumber)) {
                return prevSelectedSeats.filter((seat) => seat !== seatNumber);
            } else {
                return [...prevSelectedSeats, seatNumber];
            }
        });
    };

    const handleConfirmSeats = async (seatNumber: number[]) => {
        try {
            const res = await apiService.post("/filmipass/bookings/create", {
                movieName: movieTitle,
                showtime: showtime,
                theaterName: Theater.theaterName,
                numberOfSeats: seatNumber.length,
                totalPrice: Theater.ticketPrice * seatNumber.length,
                bookingTime: new Date(),
                seatNumbers: seatNumber.join(","),
                city: Theater.location, // Check if this is valid
                showTime: showtime,
                showDate: formattedDate,
            });

            console.log(res);
            navigate('/confirm-seats', { state: { seatNumber, showtime, theaters } });
        }
        catch (err) {
            console.log(err);
        }

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
                <h3>{t("screen.selectUrSeats")}</h3>
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
                                        disabled={filledSeats.includes(String(seatNumber))}
                                        style={{ color: filledSeats.includes(String(seatNumber)) ? "red" : "green" }}
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
                <h4>{t("screen.selectedSeats")}:</h4>
                <p>{selectedSeats.length > 0 ? selectedSeats.join(", ") : `${t("screen.noSeatsSelected")}`}</p>
            </Box>
            <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                <Button
                    css={{ width: "200px" }}
                    variant="primary"
                    size="small"
                    fullWidth
                    onClick={() => handleConfirmSeats(selectedSeats)}
                    text={t("screen.bookSeats")}
                />
            </Box>
        </div>
    );
};

export default Seats;
