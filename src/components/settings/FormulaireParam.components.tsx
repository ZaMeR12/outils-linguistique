import { OllamaContext } from "@/contexts/Ollama.context";
import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import isURL from "validator/lib/isURL";

interface IFormulaireParamProps {}

const FormulaireParam = (props: IFormulaireParamProps) => {
  const {
    ollamaUrl,
    setOllamaUrl,
    modeles,
    traductionModele,
    setTraductionModele,
    resumeModele,
    setResumeModele,
    reformulationModele,
    setReformulationModele,
  } = useContext(OllamaContext);

  const [url, setUrl] = useState<string>(ollamaUrl.toString());

  const [erreurUrl, setErreurUrl] = useState<string>("");

  const onChangeOllamaUrl = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nouvUrl = event.target.value;
    if (isURL(nouvUrl)) {
      setErreurUrl("");
      setUrl(nouvUrl);
      setOllamaUrl(new URL(nouvUrl));
    } else {
      setErreurUrl("URL invalide");
      setUrl(nouvUrl);
    }
  };

  return (
    <Card elevation={5} sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h4" component="h4">
          Paramètres
        </Typography>
        <Typography variant="body2" color="text.secondary" component="p">
          Ici, vous pouvez configurer les paramètres de l'application.
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h5" component="h5">
          Source du service d'IA.
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          marginBottom={3}
        >
          La température indique la créativité de la réponse générée. Une valeur
          plus élevée (par exemple, 0.9) rendra les réponses plus variées et
          imprévisibles. Généralement, une température de 0.7 est un bon
          compromis entre créativité et cohérence.
        </Typography>
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              variant="outlined"
              label="URL du service"
              fullWidth
              value={url}
              error={erreurUrl !== ""}
              helperText={erreurUrl}
              onChange={onChangeOllamaUrl}
            />
          </Grid>
          <Grid size={12}>
            <></>
          </Grid>
          <Grid size={4}>
            <TextField
              variant="outlined"
              label="Modèle de traduction"
              fullWidth
              select
              margin="normal"
              value={traductionModele.nom}
              onChange={(e) => {
                const choisi = modeles.find((m) => m.nom === e.target.value);
                if (choisi) setTraductionModele(choisi);
              }}
            >
              {modeles.map((modele) => (
                <MenuItem key={modele.nom} value={modele.nom}>
                  {modele.nom}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="outlined"
              label="Température"
              fullWidth
              type="number"
              slotProps={{
                input: { inputProps: { min: 0.1, max: 1, step: 0.1 } },
              }}
              value={traductionModele.temperature}
              onChange={(e) =>
                setTraductionModele({
                  ...traductionModele,
                  temperature: Number(e.target.value),
                })
              }
              onBlur={(e) => {
                const value = Math.min(
                  Math.max(Number(e.target.value), 0.1),
                  1
                );
                setTraductionModele({
                  ...traductionModele,
                  temperature: value,
                });
              }}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              variant="outlined"
              label="Modèle de résumé de texte"
              fullWidth
              select
              margin="normal"
              value={resumeModele.nom}
              onChange={(e) => {
                const choisi = modeles.find((m) => m.nom === e.target.value);
                if (choisi) setResumeModele(choisi);
              }}
            >
              {modeles.map((modele) => (
                <MenuItem key={modele.nom} value={modele.nom}>
                  {modele.nom}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="outlined"
              label="Température"
              fullWidth
              type="number"
              slotProps={{
                input: { inputProps: { min: 0.1, max: 1, step: 0.1 } },
              }}
              value={resumeModele.temperature}
              onChange={(e) =>
                setResumeModele({
                  ...resumeModele,
                  temperature: Number(e.target.value),
                })
              }
              onBlur={(e) => {
                const value = Math.min(
                  Math.max(Number(e.target.value), 0.1),
                  1
                );
                setResumeModele({
                  ...resumeModele,
                  temperature: value,
                });
              }}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              variant="outlined"
              label="Modèle de reformulation de texte"
              fullWidth
              select
              margin="normal"
              value={reformulationModele.nom}
              onChange={(e) => {
                const choisi = modeles.find((m) => m.nom === e.target.value);
                if (choisi) setReformulationModele(choisi);
              }}
            >
              {modeles.map((modele) => (
                <MenuItem key={modele.nom} value={modele.nom}>
                  {modele.nom}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="outlined"
              label="Température"
              fullWidth
              type="number"
              slotProps={{
                input: { inputProps: { min: 0.1, max: 1, step: 0.1 } },
              }}
              value={reformulationModele.temperature}
              onChange={(e) =>
                setReformulationModele({
                  ...reformulationModele,
                  temperature: Number(e.target.value),
                })
              }
              onBlur={(e) => {
                const value = Math.min(
                  Math.max(Number(e.target.value), 0.1),
                  1
                );
                setReformulationModele({
                  ...reformulationModele,
                  temperature: value,
                });
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FormulaireParam;
