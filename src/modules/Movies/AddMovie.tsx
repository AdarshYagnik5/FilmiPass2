/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { TextField } from "../../components/TextField";
import apiService from "../Api/ApiService";
import { Toast } from "../../components/Toast";

interface AddMovieFormProps {
  handleClosePopup: () => void;
  setRefreshScreen: (value: boolean) => void;
  refreshScreen: boolean;
}

const AddMovieForm = ({ handleClosePopup, refreshScreen, setRefreshScreen }: AddMovieFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    language: "",
    duration: 0,
    releaseDate: "",
    description: "",
    location: "",
    theaterId: 0,
  });

  const [errors, setErrors] = useState({
    title: "",
    genre: "",
    language: "",
    duration: "",
    releaseDate: "",
    location: "",
    theaterId: "",
  });

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"error" | "success" | "warning">("success");
  const [showToast, setShowToast] = useState<boolean>(false);

  const [theaters, setTheaters] = useState<any[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeLocation = async (event: SelectChangeEvent) => {
    const selectedLocation = event.target.value;
    setFormData({ ...formData, location: selectedLocation, theaterId: 0 });

    try {
        const response = await apiService.get(`/filmipass/theater/${selectedLocation}`);
       

        setTheaters(response);
    } catch (error) {
        console.error('Error fetching theaters:', error);
        setTheaters([]);
    }
};

  const handleChangeTheater = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      theaterId: Number(value),
    }));
  };

  const validateFields = useCallback(() => {
    const newErrors = {
      title: formData.title.trim() ? "" : "Title is required",
      genre: formData.genre.trim() ? "" : "Genre is required",
      language: formData.language.trim() ? "" : "Language is required",
      duration: formData.duration > 0 ? "" : "Duration must be a valid number",
      releaseDate: formData.releaseDate.trim()
        ? !isNaN(Date.parse(formData.releaseDate))
          ? ""
          : "Invalid release date"
        : "Release Date is required",
      location: formData.location.trim() ? "" : "Location is required",
      theaterId: formData.theaterId > 0 ? "" : "Theater is required",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const isValid = validateFields();

      if (isValid) {
        try {
          const response = await apiService.post("/filmipass/movies/add", formData);

          if (response) {
            handleClosePopup();
            setRefreshScreen(!refreshScreen);
            setShowToast(true);
            setMessage("Movie added successfully");
            setMessageType("success");
            setFormData({
              title: "",
              genre: "",
              language: "",
              duration: 0,
              releaseDate: "",
              description: "",
              location: "",
              theaterId: 0,
            });
          }
        } catch (error) {
          console.error("Error adding movie:", error);
          handleClosePopup();
          setRefreshScreen(!refreshScreen);
          setShowToast(true);
          setMessage("Error in adding movie");
          setMessageType("error");
          setFormData({
            title: "",
            genre: "",
            language: "",
            duration: 0,
            releaseDate: "",
            description: "",
            location: "",
            theaterId: 0,
          });
        }
      }
    },
    [formData, handleClosePopup, refreshScreen, setRefreshScreen, validateFields]
  );

  console.log("Theaters:", theaters);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ padding: "0px 10px" }}>
        <Grid item xs={6} sm={6}>
          <TextField
            id="title"
            label="Title"
            name="title"
            value={formData.title}
            handleChange={handleChange}
            error={!!errors.title}
            errorMsg={errors.title}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="genre"
            label="Genre"
            name="genre"
            value={formData.genre}
            handleChange={handleChange}
            error={!!errors.genre}
            errorMsg={errors.genre}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="language"
            label="Language"
            name="language"
            value={formData.language}
            handleChange={handleChange}
            error={!!errors.language}
            errorMsg={errors.language}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="duration"
            label="Duration (in minutes)"
            name="duration"
            value={formData.duration}
            handleChange={handleChange}
            error={!!errors.duration}
            errorMsg={errors.duration}
            required
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="releaseDate"
            label="Release Date"
            name="releaseDate"
            value={formData.releaseDate}
            handleChange={handleChange}
            error={!!errors.releaseDate}
            errorMsg={errors.releaseDate}
            required
            type="date"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            id="location"
            value={formData.location}
            onChange={handleChangeLocation}
            required
            fullWidth
          >
            <MenuItem value="Bhopal">Bhopal</MenuItem>
            <MenuItem value="Indore">Indore</MenuItem>
            <MenuItem value="Hyderabad">Hyderabad</MenuItem>
          </Select>
          {errors.location && <span style={{ color: "red" }}>{errors.location}</span>}
         
        </Grid>
        <Grid item xs={12} sm={6}>
                    <InputLabel id="theater-label">Theater</InputLabel>
                    <Select
                        labelId="theater-label"
                        id="theater"
                        value={formData.theaterId.toString()}
                        onChange={handleChangeTheater}
                        disabled={!theaters.length}
                        required
                        fullWidth
                    >
                        {theaters.map((theater) => (
                            <MenuItem key={theater.theaterId} value={theater.theaterId}>
                                {theater.theaterName}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.theaterId && <span className="error">{errors.theaterId}</span>}
                </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            label="Description"
            name="description"
            value={formData.description}
            handleChange={handleChange}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Movie
          </Button>
        </Grid>
      </Grid>
      {showToast && (
        <Toast
          open={showToast}
          type={messageType}
          title={message}
          onClose={() => setShowToast(false)}
        />
      )}
    </form>
  );
};

export default AddMovieForm;
