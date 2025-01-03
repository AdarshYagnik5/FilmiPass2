/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import apiService from "../Api/ApiService";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface Theatre {
    theaterId: number;
    theaterName: string;
    location: string;
    capacity: number;
    ticketPrice: number;
    movieId: number;
    showtimes: Showtime[]; // Include showtimes in the Theatre interface
}

interface Showtime {
    showtimeId: number;
    showDate: string;
    showTime: string;
}

const ScreenTime = () => {
    const [theaters, setTheaters] = useState<Theatre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const statelocation = useLocation();
    const navigate = useNavigate();
    const { location } = statelocation.state || {};

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await apiService.get(`/filmipass/theater/${location}`);
                setTheaters(response); 
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleShowTimes = (theaterId: number, showtime: string) => {
        console.log("Clicked:", theaterId, showtime);
        navigate('/seats', { state: { theaterId, showtime, theaters } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {theaters.map((theater) => (
                <Box
                    key={theater.theaterId}
                    sx={{
                        backgroundColor: "white",
                        marginTop: "14px",
                        height: "150px",
                        border: "2px solid black",
                        padding: "10px",
                    }}
                >
                    <Box
                        sx={{
                            fontWeight: 700,
                            fontSize: "22px",
                            backgroundColor: "pink",
                            padding: "10px",
                        }}
                    >
                        {theater.theaterName}
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                        {theater.showtimes.length > 0 ? (
                            theater.showtimes.map((times) => (
                                <Box
                                    key={times.showtimeId}
                                    sx={{
                                        border: "1px solid blue",
                                        width: "100px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        "&:hover": { backgroundColor: "#83cffa" },
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleShowTimes(theater.theaterId, times.showTime)
                                    }
                                >
                                    {times.showTime}
                                </Box>
                            ))
                        ) : (
                            <Box>No showtimes available</Box>
                        )}
                    </Box>
                </Box>
            ))}
        </div>
    );
};

export default ScreenTime;
