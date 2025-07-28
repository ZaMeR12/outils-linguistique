import TradFormulaire from "@/components/tools/TradFormulaire.components";
import { OllamaContext } from "@/contexts/Ollama.context";
import { Grid, Typography } from "@mui/material";
import { useContext } from "react";

interface ITraducteurProps {}

const Traducteur = (props: ITraducteurProps) => {
  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid size={12} textAlign={"center"}>
        <Typography variant="h4" component="h4">
          Traducteur
        </Typography>
      </Grid>
      <Grid size={12} paddingBottom={2}>
        <Typography variant="body1" component="p">
          Cette page est dédiée à la traduction de textes.
        </Typography>
      </Grid>
      <Grid size={12}>
        <TradFormulaire />
      </Grid>
    </Grid>
  );
};
export default Traducteur;
