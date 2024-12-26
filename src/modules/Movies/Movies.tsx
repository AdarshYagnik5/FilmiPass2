/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import apiService from "../Api/ApiService";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Popup from "../../components/Popup/Popup";
import Button from "../../components/Button/Button";
import AddMovieForm from "./AddMovie";

// Define the Movie interface
interface Movie {
    movieId: number;
    title: string;
    genre: string;
    releaseDate: string;
    rating: number;
    language: string;
}

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [AddMoviePopup, setMovieOpenPopup] = useState(false);
    const navigate = useNavigate();
    const [deleteId, setDeleteId] = useState<number>();
    const [refreshScreen, setRefreshScreen] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await apiService.get("/filmipass/movies");
                setMovies(response);  
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [refreshScreen]); 

    console.log("Movies", movies, refreshScreen)

    const handleBookMovie = () => {
        navigate('/Screen-time');
        setMovieOpenPopup(true);
    };

    const handleAddMovie = () => {
        setMovieOpenPopup(true);
    };

    const handleDeleteMovie = (movieId: number) => {
        setOpenPopup(true);
        setDeleteId(movieId);
    };

    const handleConfirmDelete = async () => {
        try {
            if (deleteId) {
                const response = await apiService.delete(`/filmipass/movies/delete/${deleteId}`);
                console.log("Movie deleted successfully:", response);
                setRefreshScreen(prev => !prev);  
                handleClosePopup();
            }
        } catch (error) {
            console.error("Failed to delete movie:", error);
            setRefreshScreen(prev => !prev);  
            handleClosePopup();
        }
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setMovieOpenPopup(false);
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

   

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: 'end', marginTop: '10px' }}>
                <Button size="small" onClick={handleAddMovie} variant="primary" text={"Add Movie"} />
            </Box>
            <Grid container spacing={3} padding={3}>
                {movies?.map((movie) => (
                    <Grid item xs={12} sm={6} md={2} key={movie.movieId}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                alt={movie.title}
                                height="140"
                                width="100"
                                image={"https://static.vecteezy.com/system/resources/previews/029/920/404/non_2x/cartoon-poster-on-welcome-text-with-hand-holding-placard-for-banner-design-banner-billboard-design-stock-illustration-vector.jpg"}
                                style={{ backgroundColor: "white" }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Genre: {movie.genre}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    Language: {movie.language}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={handleBookMovie} text={"Book"} />
                                <Button size="small" onClick={() => handleDeleteMovie(movie.movieId)} text={"Delete"} />
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Popup open={openPopup} onClose={handleClosePopup} showButton={true} heading={"Delete Movie"} submitText={"Confirm Delete"} text="Are You Sure You want to Delete the Movie" handleSubmit={handleConfirmDelete} />
            <Popup open={AddMoviePopup} onClose={handleClosePopup} heading={"Add Movie"} >
                <AddMovieForm handleClosePopup={handleClosePopup} refreshScreen={refreshScreen} setRefreshScreen={setRefreshScreen}/>
            </Popup>
        </Box>
    );
};

export default Movies;
