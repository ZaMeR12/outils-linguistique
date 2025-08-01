import { Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "@/models/Outlet.models";
import SynthFormulaire from "@/components/tools/SynthFormulaire.components";

const Resume = () => {
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
            Synthétiseur de texte
          </Typography>
        </Grid>
        <Grid size={12} paddingBottom={2}>
          <Typography variant="body1" component="p">
            Cette page est dédiée à la synthèse de textes.
          </Typography>
        </Grid>
        <Grid size={12}>
          <SynthFormulaire />
        </Grid>
      </Grid>
    </div>
  );
};
export default Resume;
