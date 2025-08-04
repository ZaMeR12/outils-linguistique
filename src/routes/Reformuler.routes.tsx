import ReformulerFormulaire from "@/components/tools/ReformulerFormulaire.components";
import { OllamaContext } from "@/contexts/Ollama.context";
import { IOutletContext } from "@/models/Outlet.models";
import { Alert, AlertTitle, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";

const Reformuler = () => {
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
            Reformulation de texte
          </Typography>
        </Grid>
        <Grid size={12} paddingBottom={2}>
          <Typography variant="body1" component="p">
            Cette page est dédiée à la reformulation de textes. Vous pouvez
            saisir un texte et obtenir une version reformulée en un nombre de
            mots spécifié. Vous pouvez également choisir de reformuler le texte
            en utilisant un style d'écriture spécifique.
          </Typography>
        </Grid>
        <Grid size={12}>
          <ReformulerFormulaire />
        </Grid>
      </Grid>
    </div>
  );
};

export default Reformuler;
