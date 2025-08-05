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
  LangueTraducteurEng,
} from "../../../utils/ContexteSysteme";
import { useNavigate } from "react-router-dom";

interface SynthCarteProps {
  id: number;
}

interface SyntheseBd {
  id: number;
  texte_original: string;
  texte_synthetise: string;
  langue_origine: string;
  date_synthese: string;
  modele: string;
}

/**
 * Composant pour afficher les détails d'une synthèse.
 * @param param0 - Les propriétés du composant, incluant l'ID de la synthèse.
 * @author ZaMeR12
 * @description Ce composant récupère les détails d'une synthèse à partir de la base de données
 * et les affiche dans une carte. Il inclut le texte original, le texte synthétisé, la langue de la synthèse,
 * la date de la synthèse et le modèle utilisé. Il permet également de supprimer la synthèse en question.
 * @returns {JSX.Element}
 */
const SynthCarte = ({ id }: SynthCarteProps) => {
  const [synthese, setSynthese] = useState<SyntheseBd | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const chercherSynthese = async () => {
      try {
        const response = await window.ipcRenderer.invoke(
          "get-synth-par-id",
          id
        );
        setSynthese(response as SyntheseBd);
      } catch (error) {
        console.error("Erreur lors de la récupération de la synthèse:", error);
      }
    };

    if (id) {
      chercherSynthese();
    }
  }, [id]);

  return (
    <Card elevation={5} sx={{ padding: 2 }}>
      <CardHeader title={`Détails de la synthèse (ID: ${id})`} />
      <CardContent>
        {synthese ? (
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Texte original:</strong> {synthese.texte_original}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Texte synthétisé:</strong> {synthese.texte_synthetise}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Langue de la synthèse:</strong>{" "}
                {
                  correspondanceLangues[
                    synthese.langue_origine as LangueTraducteurEng
                  ]
                }
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Date de la synthèse:</strong>{" "}
                {new Date(synthese.date_synthese).toLocaleString()}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Modèle Utilisé:</strong> {synthese.modele}
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
                  await window.ipcRenderer.send("sup-synth", { id });
                  navigate("/historique");
                }}
              >
                Supprimer
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" component="p">
            Aucune synthèse trouvée pour cet ID.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SynthCarte;
