import { useEffect, useState } from "react";
import apiService from "../Api/ApiService";
import { Box } from "@mui/material";

interface Theatre {
    theaterId: number;
    theaterName: string;
    location: string;
    capacity: number;
    ticketPrice: number;
    movieId: number;
}

interface Showtime {
    showtimeId: number;
    movieId: number;
    theaterId: number;
    showTime: string;
    showDate: string;
}

const ScreenTime = () => {
    const [theater, setTheater] = useState<Theatre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showtimes, setShowTimes] = useState<Showtime[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await apiService.get(`/filmipass/theater/Bhopal`);
                setTheater(response);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchShowtimes = async () => {
            try {
                const response = await apiService.get(`/filmipass/showtime/theater/1`);
                setShowTimes(response);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching showtimes.");
            } finally {
                setLoading(false);
            }
        };

        fetchShowtimes();
    }, []);

    const handleShowTimes = (theatreId: number, showtime: string) => {
        console.log("clicked", theatreId, showtime);
    };

    return (
        <div>
            {theater.map((theatre) => (
                console.log("theatre.theatreId", theatre.theaterId),
                <Box
                    key={theatre.theaterId}
                    sx={{
                        backgroundColor: "white",
                        marginTop: "14px",
                        height: "150px",
                        border: "2px solid black",
                    }}
                    gap={2}
                >
                    <Box
                        sx={{
                            fontWeight: 700,
                            fontSize: "22px",
                            backgroundColor: "pink",
                        }}
                    >
                        {theatre.theaterName}
                    </Box>
                    <Box sx={{ display: "flex" }}>
                    
                        {showtimes.filter((showtime)=> showtime.theaterId == theatre.theaterId).map((times) => (
                            
                            
                            
                            <Box
                                key={times.showtimeId}
                                sx={{
                                    border: "1px solid blue",
                                    width: "100px",
                                    height: "40px",
                                    marginRight: "4px",
                                    "&:hover": { backgroundColor: "#83cffa" },
                                }}
                                onClick={() =>
                                    handleShowTimes(theatre.theaterId, times.showTime)
                                }
                            >
                                <Box
                                    sx={{
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        padding: "8px 12px",
                                    }}
                                >
                                    {times.showTime}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            ))}
        </div>
    );
};

export default ScreenTime;
