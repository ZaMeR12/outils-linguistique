import FormulaireParam from "@/components/settings/FormulaireParam.components";
import { Alert, AlertTitle, Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "@/models/Outlet.models";
import { useContext } from "react";
import { OllamaContext } from "@/contexts/Ollama.context";

const PagePrincipale = () => {
  const { appBarTopHeight } = useOutletContext<IOutletContext>();
  const { ollamaEstChargeOutil, ollamaErreur } = useContext(OllamaContext);
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
        <Grid size={12}>
          {!ollamaEstChargeOutil && ollamaErreur === "" ? (
            <Alert severity="info" sx={{ margin: 2 }}>
              {" "}
              <AlertTitle>Information</AlertTitle>
              Ollama est en cours de chargement. Veuillez patienter...
            </Alert>
          ) : null}
          {ollamaErreur !== "" ? (
            <Alert severity="error" sx={{ margin: 2 }}>
              {ollamaErreur}
            </Alert>
          ) : (
            <></>
          )}
        </Grid>
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
