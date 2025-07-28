import FormulaireParam from "@/components/settings/FormulaireParam.components";
import { Grid, Typography } from "@mui/material";

const PagePrincipale = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
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
  );
};

export default PagePrincipale;
