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

interface TradCarteProps {
  id: number;
}

interface TraductionBd {
  id: number;
  texte_original: string;
  texte_traduit: string;
  langue_origine: string;
  langue_cible: string;
  date_traduction: string;
  modele: string;
}

/**
 * Composant pour afficher les détails d'une traduction.
 * @param param0 - Les propriétés du composant, incluant l'ID de la traduction.
 * @returns {JSX.Element}
 */
const TradCarte = ({ id }: TradCarteProps) => {
  const [traduction, setTraduction] = useState<TraductionBd | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const chercherTraduction = async () => {
      try {
        const response = await window.ipcRenderer.invoke("get-trad-par-id", id);
        setTraduction(response as TraductionBd);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la traduction:",
          error
        );
      }
    };

    if (id) {
      chercherTraduction();
    }
  }, [id]);

  return (
    <Card elevation={5} sx={{ padding: 2 }}>
      <CardHeader title={`Détails de la traduction (ID: ${id})`} />
      <CardContent>
        {traduction ? (
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Texte Original:</strong> {traduction.texte_original}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Texte Traduit:</strong> {traduction.texte_traduit}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Langue Origine:</strong>{" "}
                {
                  correspondanceLangues[
                    traduction.langue_origine as LangueTraducteurEng
                  ]
                }
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Langue Cible:</strong>{" "}
                {
                  correspondanceLangues[
                    traduction.langue_cible as LangueTraducteurEng
                  ]
                }
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Date de Traduction:</strong>{" "}
                {new Date(traduction.date_traduction).toLocaleString()}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="body1" component="p">
                <strong>Modèle Utilisé:</strong> {traduction.modele}
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
                  await window.ipcRenderer.send("sup-trad", { id });
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

export default TradCarte;
