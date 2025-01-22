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
import { Box, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Popup from "../../components/Popup/Popup";
import Button from "../../components/Button/Button";
import AddMovieForm from "./AddMovie";
import { useTranslation } from "react-i18next";

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
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [AddMoviePopup, setMovieOpenPopup] = useState(false);
    const navigate = useNavigate();
    const [deleteId, setDeleteId] = useState<number>();
    const [refreshScreen, setRefreshScreen] = useState(false);
    const [location, setLocation] = useState("Hyderabad");

    const { t } = useTranslation();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await apiService.get(`/filmipass/movies/loc/${location}`);
                setMovies(response);
                setFilteredMovies(response); // Initialize filtered movies
            } catch (err: any) {
                setError(err.message || t("movie.errorFetchingMovies"));
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [location, refreshScreen, t]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter movies by title
        setFilteredMovies(
            movies.filter((movie) =>
                movie.title.toLowerCase().includes(query)
            )
        );
    };

    const handleBookMovie = (movieTitle: string, movieId: number) => {
        navigate('/Screen-time', { state: { location, movieTitle, movieId } });
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
                console.log(t("movie.deleteSuccess"), response);
                setRefreshScreen((prev) => !prev);
                handleClosePopup();
            }
        } catch (error) {
            console.error(t("movie.deleteError"), error);
            setRefreshScreen((prev) => !prev);
            handleClosePopup();
        }
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setMovieOpenPopup(false);
    };

    const handleChangeLoc = (event: SelectChangeEvent) => {
        setLocation(event.target.value as string);
    };

    if (loading) return <Typography>{t("movie.loading")}</Typography>;
    if (error) return <Typography>{t("movie.error", { error })}</Typography>;

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    marginLeft: '23px',
                    justifyContent: 'space-between',
                    border: '2px solid purple',
                    width: '100%',
                    marginTop: '10px',
                    padding: '10px',
                }}
            >
                <Box>
                    <InputLabel id="demo-simple-select-label">{t("location")}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={location}
                        label={t("location")}
                        onChange={handleChangeLoc}
                    >
                        <MenuItem value={"Bhopal"}>{t("locations.bhopal")}</MenuItem>
                        <MenuItem value={"Indore"}>{t("locations.indore")}</MenuItem>
                        <MenuItem value={"Hyderabad"}>{t("locations.hyderabad")}</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ alignItems: 'center' }}>
                    <InputLabel id="demo-simple-select-label">{t("movie.searchMovies")}</InputLabel>
                    <TextField
                        placeholder={t("movie.searchMovies")}
                        value={searchQuery}
                        onChange={handleSearch}
                        variant="outlined"
                        size="small"
                        sx={{ marginRight: '10px', width: '400px' }}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: 'center' }}>
                    <Button size="small" onClick={handleAddMovie} variant="primary" text={t("movie.addMovie")} />
                </Box>
            </Box>
            <Grid container spacing={3} padding={3}>
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <Grid item xs={12} sm={6} md={2} key={movie.movieId}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt={movie.title}
                                    height="140"
                                    image={
                                        "https://static.vecteezy.com/system/resources/previews/029/920/404/non_2x/cartoon-poster-on-welcome-text-with-hand-holding-placard-for-banner-design-banner-billboard-design-stock-illustration-vector.jpg"
                                    }
                                    style={{ backgroundColor: "white" }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {movie.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {t("movie.genre")}: {movie.genre}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {t("movie.releaseDate")}: {new Date(movie.releaseDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {t("movie.language")}: {movie.language}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleBookMovie(movie.title, movie.movieId)} text={t("movie.book")} />
                                    <Button size="small" onClick={() => handleDeleteMovie(movie.movieId)} text={t("movie.delete")} />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>{t("movie.noMoviesFound")}</Typography>
                )}
            </Grid>

            <Popup
                open={openPopup}
                onClose={handleClosePopup}
                showButton={true}
                heading={t("movie.deleteConfirmationHeading")}
                submitText={t("movie.confirmDelete")}
                text={t("movie.deleteConfirmationText")}
                handleSubmit={handleConfirmDelete}
            />
            <Popup
                open={AddMoviePopup}
                onClose={handleClosePopup}
                heading={t("movie.addMovie")}
            >
                <AddMovieForm
                    handleClosePopup={handleClosePopup}
                    refreshScreen={refreshScreen}
                    setRefreshScreen={setRefreshScreen}
                />
            </Popup>
        </Box>
    );
};

export default Movies;
