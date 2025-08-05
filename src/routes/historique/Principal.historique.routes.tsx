import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "@/models/Outlet.models";
import TableauHistorique from "@/components/historique/TableauHistorique.components";
import { Grid, Typography } from "@mui/material";

const Historique = () => {
  const { appBarTopHeight } = useOutletContext<IOutletContext>();

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
        <Grid size={12} textAlign={"center"}>
          <Typography variant="h4" component="h4">
            Historique
          </Typography>
        </Grid>
        <Grid size={12} paddingBottom={2}>
          <Typography variant="body1" component="p">
            Voici l'historique de vos interactions avec l'application. Pour voir
            les détails d'une interaction spécifique double cliquez sur la ligne
            correspondante.
          </Typography>
        </Grid>
        <Grid size={12}>
          <TableauHistorique />
        </Grid>
      </Grid>
    </div>
  );
};

export default Historique;
