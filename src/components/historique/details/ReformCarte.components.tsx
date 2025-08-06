import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  correspondanceLangues,
  correspondanceStyles,
  LangueTraducteurEng,
  StyleEcritureEng,
} from "../../../utils/ContexteSysteme";
import { useNavigate } from "react-router-dom";

interface ReformCarteProps {
  id: number;
}

interface ReformulationBd {
  id: number;
  texte_original: string;
  texte_reformule: string;
  langue_reformule: string;
  style: string;
  limite_mots: number;
  date_reformulation: string;
  modele: string;
}

/**
 * Composant pour afficher les détails d'une reformulation.
 * @param param0 - Les propriétés du composant, incluant l'ID de la reformulation.
 * @returns {JSX.Element}
 */
const ReformCarte = ({ id }: ReformCarteProps) => {
  const [reformulation, setReformulation] = useState<ReformulationBd | null>(
    null
  );
  const navigate = useNavigate();
  useEffect(() => {
    const chercherReformulation = async () => {
      try {
        const response = await window.ipcRenderer.invoke(
          "get-reform-par-id",
          id
        );
        setReformulation(response as ReformulationBd);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la reformulation:",
          error
        );
      }
    };

    if (id) {
      chercherReformulation();
    }
  }, [id]);

  return (
    <Card elevation={5} sx={{ padding: 2 }}>
      <CardHeader title={`Détails de la reformulation (ID: ${id})`} />
      <CardContent>
        {reformulation ? (
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Texte original:</strong> {reformulation.texte_original}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Texte reformulé:</strong>{" "}
                {reformulation.texte_reformule}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Langue de la reformulation:</strong>{" "}
                {
                  correspondanceLangues[
                    reformulation.langue_reformule as LangueTraducteurEng
                  ]
                }
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Style d'écriture:</strong>{" "}
                {correspondanceStyles[reformulation.style as StyleEcritureEng]}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Limite de mots:</strong>{" "}
                {reformulation.limite_mots > 0
                  ? String(reformulation.limite_mots)
                  : "Aucune limite"}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Date de reformulation:</strong>{" "}
                {new Date(reformulation.date_reformulation).toLocaleString()}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Modèle Utilisé:</strong> {reformulation.modele}
              </Typography>
            </Grid>
            <Grid
              size={12}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  await window.ipcRenderer.send("sup-reform", { id });
                  navigate("/historique");
                }}
              >
                Supprimer
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" component="p">
            Aucune traduction trouvée pour cet ID.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ReformCarte;
