import FormulaireParam from "@/components/settings/FormulaireParam.components";
import { Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "@/types/IOutletContext.types";

const PagePrincipale = () => {
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
            Page principale
          </Typography>
        </Grid>
        <Grid size={12} paddingBottom={2}>
          <Typography variant="body1" component="p">
            Bienvenue sur la page principale de l'application. Ici, vous pouvez
            accéder à divers outils linguistiques.
          </Typography>
        </Grid>
        <Grid size={12}>
          <FormulaireParam />
        </Grid>
      </Grid>
    </div>
  );
};

export default PagePrincipale;
