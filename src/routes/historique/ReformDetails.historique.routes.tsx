import { useNavigate, useOutletContext } from "react-router-dom";
import { IOutletContext } from "@/models/Outlet.models";
import { Grid, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReformCarte from "@/components/historique/details/ReformCarte.components";

/**
 * Composant pour afficher les détails d'une reformulation.
 * @author ZaMeR12
 * @returns {JSX.Element}
 */
const ReformDetails = () => {
  const { appBarTopHeight } = useOutletContext<IOutletContext>();
  const { id } = useParams();

  const navigate = useNavigate();

  return (
    <div
      style={{
        overflowY: "auto", // Permet le défilement vertical
        height: `calc(100vh - ${appBarTopHeight}px)`, // Ajuste la hauteur pour éviter le dépassement
        maxHeight: `calc(100vh - ${appBarTopHeight}px)`, // Limite la hauteur maximale
        overflowX: "hidden", // Désactive le défilement horizontal
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          padding: 3,
        }}
      >
        <Grid size={1}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/historique")}
          >
            Retour
          </Button>
        </Grid>
        <Grid size={12} textAlign={"center"}>
          <Typography variant="h4" component="h4">
            Détails de la reformulation
          </Typography>
        </Grid>
        <Grid size={12} paddingBottom={2}>
          <Typography variant="body1" component="p">
            Voici les détails de la reformulation. Pour voir l'historique de vos
            interactions avec l'application, retournez à la page précédente.
          </Typography>
        </Grid>
        <Grid size={12}>
          <ReformCarte id={id ? parseInt(id) : 0} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ReformDetails;
