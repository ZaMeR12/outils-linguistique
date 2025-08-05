import { Alert, AlertTitle, Grid, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "@/models/Outlet.models";
import SynthFormulaire from "@/components/tools/SynthFormulaire.components";
import { useContext } from "react";
import { OllamaContext } from "@/contexts/Ollama.context";

/**
 * Page de résumé de texte.
 * Affiche les informations de base et permet à l'utilisateur de saisir un texte à synthétiser.
 * @author ZaMeR12
 * @returns Le contenu de la page de résumé.
 */
const Resume = () => {
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
