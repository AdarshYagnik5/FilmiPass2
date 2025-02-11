/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import apiService from "../Api/ApiService";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Showtime {
    showtimeId: number;
    showDate: string;
    showTime: string;
    movieId: number;
}

interface Theatre {
    theaterId: number;
    theaterName: string;
    location: string;
    capacity: number;
    ticketPrice: number;
    showtimes: Showtime[];
}

const ScreenTime = () => {
    const [theaters, setTheaters] = useState<Theatre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const statelocation = useLocation();
    const navigate = useNavigate();
    const { location, movieTitle, movieId } = statelocation.state || {};
    
    const { t } = useTranslation();

    useEffect(() => {
        if (!location) return;

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
    }, [location]);

    const handleShowTimes = (theaterId: number, showtime: string, showDate: string) => {
        const Theater = theaters.find((theater) => theater.theaterId === theaterId);
        navigate('/seats', { state: { Theater, theaterId, showtime, theaters, movieTitle, showDate ,location} });
    };

    if (!location || !movieId) {
        return <div>Invalid data. Please go back and select a movie again.</div>;
    }

    if (loading) {
        return <div>Loading theaters...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    const filteredTheaters = theaters.filter((theater) =>
        theater.showtimes.some((showtime) => showtime.movieId === movieId)
    );

    console.log(filteredTheaters);

    return (
        <div>
            {filteredTheaters.map((theater) => (
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
                        {theater.showtimes
                            .filter((showtime) => showtime.movieId === movieId)
                            .map(({ showtimeId, showTime, showDate }) => (
                                <Box
                                    key={showtimeId}
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
                                    onClick={() => handleShowTimes(theater.theaterId, showTime, showDate)}
                                >
                                    {showTime}
                                </Box>
                            ))}
                    </Box>
                </Box>
            ))}
            {filteredTheaters.length === 0 && <Box sx={{fontSize:'20px', fontWeight:500}}>{t("screen.noShowtimes")}</Box>}
        </div>
    );
};

export default ScreenTime;
