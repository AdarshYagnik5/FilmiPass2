import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { common } from "@mui/material/colors";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",
    resources: {
      en: {
        translation: {
          greeting: "Hello",
          location: "Location",
          movie: {
            searchMovies: "Search Movies",
            addMovie: "Add Movie",
            title: "Title",
            genre: "Genre",
            language: "Language",
            releaseDate: "Release Date",
            rating: "Rating",
            book: "Book",
            delete: "Delete",
            noMoviesFound: "No movies found",
            deleteConfirmationHeading: "Delete Movie",
            deleteConfirmationText:
              "Are you sure you want to delete the movie?",
            confirmDelete: "Confirm Delete",
          },
          form: {
            title: "Title",
            genre: "Genre",
            language: "Language",
            duration: "Duration (in minutes)",
            releaseDate: "Release Date",
            description: "Description",
            location: "Location",
            theater: "Theater",
            addMovie: "Add Movie",
          },
          error: {
            titleRequired: "Title is required",
            genreRequired: "Genre is required",
            languageRequired: "Language is required",
            invalidDuration: "Duration must be a positive number",
            invalidReleaseDate: "Invalid release date",
            releaseDateRequired: "Release date is required",
            locationRequired: "Location is required",
            theaterRequired: "Theater is required",
            fetchingTheaters: "Error fetching theaters",
            addingMovie: "Error adding movie",
          },
          success: {
            movieAdded: "Movie added successfully!",
          },
          locations: {
            bhopal: "Bhopal",
            indore: "Indore",
            hyderabad: "Hyderabad",
          },
          screen: {
            selectUrSeats: "Select your seats",
            selectedSeats: "Selected Seats",
            noSeatsSelected: "No seats selected",
            bookSeats: "Book Seats",
          },
          confirmBooking: {
            thankYou: "Thank You for Booking Your Tickets!",
            theaterDetails: "Theater Details",
            name: "Name",
            location: "Location",
            ticketPrice: "Ticket Price",
            showDetails: "Show Details",
            showtime: "Showtime",
            seatNumbers: "Seat Numbers",
            noSeatsSelected: "No seats selected",
            confirmationMessage:
              "Your booking has been confirmed successfully!",
          },
          common: {
            notAvailable: "N/A",
          },
        },
      },
      hi: {
        translation: {
          greeting: "नमस्ते",
          location: "जगह",
          movie: {
            searchMovies: "फिल्में खोजें",
            addMovie: "फिल्म जोड़ें",
            title: "शीर्षक",
            genre: "शैली",
            language: "भाषा",
            releaseDate: "रिलीज की तारीख",
            rating: "रेटिंग",
            book: "बुक करें",
            delete: "हटाएं",
            noMoviesFound: "कोई फिल्म नहीं मिली",
            deleteConfirmationHeading: "फिल्म हटाएं",
            deleteConfirmationText: "क्या आप वाकई फिल्म हटाना चाहते हैं?",
            confirmDelete: "पुष्टि हटाएं",
          },
          form: {
            title: "शीर्षक",
            genre: "शैली",
            language: "भाषा",
            duration: "अवधि (मिनटों में)",
            releaseDate: "रिलीज की तारीख",
            description: "विवरण",
            location: "जगह",
            theater: "सिनेमा घर",
            addMovie: "फिल्म जोड़ें",
          },
          error: {
            titleRequired: "शीर्षक आवश्यक है",
            genreRequired: "शैली आवश्यक है",
            languageRequired: "भाषा आवश्यक है",
            invalidDuration: "अवधि सकारात्मक संख्या होनी चाहिए",
            invalidReleaseDate: "अमान्य रिलीज की तारीख",
            releaseDateRequired: "रिलीज की तारीख आवश्यक है",
            locationRequired: "स्थान आवश्यक है",
            theaterRequired: "सिनेमा घर आवश्यक है",
            fetchingTheaters: "सिनेमा घर लाने में त्रुटि",
            addingMovie: "फिल्म जोड़ने में त्रुटि",
          },
          success: {
            movieAdded: "फिल्म सफलतापूर्वक जोड़ी गई!",
          },
          locations: {
            bhopal: "भोपाल",
            indore: "इंदौर",
            hyderabad: "हैदराबाद",
          },
          screen: {
            selectUrSeats: "अपनी सीटें चुनें",
            selectedSeats: "चयनित सीटें",
            noSeatsSelected: "कोई सीट नहीं चुनी गई",
            bookSeats: "सीटें बुक करें",
          },
            confirmBooking: {
              thankYou: "आपके टिकट बुक करने के लिए धन्यवाद!",
              theaterDetails: "सिनेमा घर विवरण",
              name: "नाम",
              location: "स्थान",
              ticketPrice: "टिकट मूल्य",
              showDetails: "शो विवरण",
              showtime: "शो का समय",
              seatNumbers: "सीट नंबर",
              noSeatsSelected: "कोई सीट नहीं चुनी गई",
              confirmationMessage: "आपकी बुकिंग सफलतापूर्वक पुष्टि हो गई है!"
            },
            common: {
              notAvailable: "उपलब्ध नहीं"
            }
          
          
        },
      },
      fr: {
        translation: {
          greeting: "Bonjour",
          location: "Lieu",
          movie: {
            searchMovies: "Rechercher des films",
            addMovie: "Ajouter un film",
            title: "Titre",
            genre: "Genre",
            language: "Langue",
            releaseDate: "Date de sortie",
            rating: "Note",
            book: "Réserver",
            delete: "Supprimer",
            noMoviesFound: "Aucun film trouvé",
            deleteConfirmationHeading: "Supprimer le film",
            deleteConfirmationText:
              "Êtes-vous sûr de vouloir supprimer ce film ?",
            confirmDelete: "Confirmer la suppression",
          },
          form: {
            title: "Titre",
            genre: "Genre",
            language: "Langue",
            duration: "Durée (en minutes)",
            releaseDate: "Date de sortie",
            description: "Description",
            location: "Lieu",
            theater: "Cinéma",
            addMovie: "Ajouter un film",
          },
          error: {
            titleRequired: "Le titre est requis.",
            genreRequired: "Le genre est requis.",
            languageRequired: "La langue est requise.",
            invalidDuration: "La durée doit être un nombre positif.",
            invalidReleaseDate: "Date de sortie invalide.",
            releaseDateRequired: "La date de sortie est requise.",
            locationRequired: "Le lieu est requis.",
            theaterRequired: "Le cinéma est requis.",
            fetchingTheaters: "Erreur lors de la récupération des cinémas.",
            addingMovie: "Erreur lors de l'ajout du film.",
          },
          success: {
            movieAdded: "Film ajouté avec succès.",
          },
          locations: {
            bhopal: "Bhopal",
            indore: "Indore",
            hyderabad: "Hyderabad",
          },
          screen: {
            selectUrSeats: "Sélectionnez vos sièges",
            selectedSeats: "Sièges sélectionnés",
            noSeatsSelected: "Aucun siège sélectionné",
            bookSeats: "Réserver des sièges",
          },
          confirmBooking:{
            thankYou: "Merci d'avoir réservé vos billets !",
            theaterDetails: "Détails du cinéma",
            name: "Nom",
            location: "Lieu",
            ticketPrice: "Prix du billet",
            showDetails: "Détails du spectacle",
            showtime: "Heure de la séance",
            seatNumbers: "Numéros de siège",
            noSeatsSelected: "Aucun siège sélectionné",
            confirmationMessage: "Votre réservation a été confirmée avec succès !"
          },
          common:{
            notAvailable: "N/A"
          }
        },
      },
    },
  });

export default i18n;
