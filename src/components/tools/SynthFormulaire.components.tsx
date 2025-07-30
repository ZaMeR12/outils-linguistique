import { OllamaContext } from "@/contexts/Ollama.context";
import { RoleMessageOllama } from "@/models/Ollama.models";
import {
  correspondanceLangues,
  genererContexteResume,
  LangueTraducteurEng,
} from "@/utils/ContexteSyteme";
import {
  Button,
  Card,
  Grid,
  LinearProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { Message } from "ollama/browser";
import { useContext, useEffect } from "react";
import useLocalStorage from "use-local-storage";

const SynthFormulaire = () => {
  const {
    ollamaErreur,
    ollamaEstChargeOutil,
    genererReponseOllama,
    reponseOllama,
    arreterReponseOllama,
    resumeModele,
    viderReponseOllama,
  } = useContext(OllamaContext);

  const [langueResume, setLangueResume] = useLocalStorage<LangueTraducteurEng>(
    "langueResume",
    LangueTraducteurEng.FR_CA
  );

  const [texteInitial, setTexteInitial] = useLocalStorage<string>(
    "texteInitialResume",
    ""
  );

  const [resume, setResume] = useLocalStorage<string>("texteResume", "");

  /**
   * Gère le changement de la langue source sélectionnée.
   * @author ZaMeR12
   * @param event L'événement de changement provenant de l'élément select.
   */
  const onChangeLangueResume = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLangueResume(event.target.value as LangueTraducteurEng);
  };

  /**
   * Gère le changement du texte initial à résumer.
   * @author ZaMeR12
   * @param event L'événement de changement provenant de l'élément input.
   */
  const onChangeTexteInitial = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTexteInitial(event.target.value);
  };

  /**
   * Gère le clic sur le bouton "Nettoyer" pour réinitialiser les champs de saisie.
   * @author ZaMeR12
   */
  const onClickNettoyer = () => {
    setTexteInitial("");
    setResume("");
    viderReponseOllama();
  };

  const onClickResume = async () => {
    if (texteInitial.trim() !== "") {
      const texteInitialMessage: Message = {
        role: RoleMessageOllama.USER,
        content: texteInitial,
      };

      const contexteSysteme = genererContexteResume(texteInitial, langueResume);

      const messages: Message[] = [contexteSysteme, texteInitialMessage];
      await genererReponseOllama(resumeModele, messages);
    }
  };

  useEffect(() => {
    if (reponseOllama && reponseOllama !== resume) {
      setResume(reponseOllama);
    }
  }, [reponseOllama, resume, setResume]);

  return (
    <Card elevation={5} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid size={12} container justifyContent={"flex-start"}>
          <Grid size={3}>
            <TextField
              fullWidth
              label="Langue du résumé"
              variant="outlined"
              disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
              select
              value={langueResume}
              sx={{ paddingBottom: 2 }}
              onChange={onChangeLangueResume}
            >
              {(Array.isArray(LangueTraducteurEng)
                ? LangueTraducteurEng
                : Object.values(LangueTraducteurEng)
              ).map((langue: string) => (
                <MenuItem key={langue} value={langue}>
                  {correspondanceLangues[langue as LangueTraducteurEng]}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid size={6} sx={{ borderRight: "1px solid #000", paddingRight: 1 }}>
          <TextField
            fullWidth
            label="Texte à résumer"
            variant="outlined"
            error={!!ollamaErreur}
            helperText={ollamaErreur}
            disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
            multiline
            required
            rows={15}
            value={texteInitial}
            onChange={onChangeTexteInitial}
            placeholder="Entrez le texte à résumer ici..."
            slotProps={{
              input: {
                inputProps: {
                  style: { resize: "vertical" },
                },
              },
            }}
          />
        </Grid>
        <Grid size={6} sx={{ borderLeft: "1px solid #000", paddingLeft: 1 }}>
          <TextField
            fullWidth
            label="Synthèse"
            variant="outlined"
            error={!!ollamaErreur}
            helperText={ollamaErreur}
            disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
            multiline
            rows={15}
            placeholder="La synthèse apparaîtra ici..."
            value={resume}
            slotProps={{
              input: {
                inputProps: {
                  style: { resize: "vertical" },
                  readOnly: true,
                },
              },
            }}
          />
        </Grid>
        {!ollamaEstChargeOutil ? (
          <Grid size={12} padding={2} textAlign="center">
            <LinearProgress color="secondary" />
          </Grid>
        ) : (
          <></>
        )}
        <Grid size={4}>
          <Button
            variant="contained"
            color="primary"
            disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
            onClick={onClickResume}
          >
            Synthétiser
          </Button>
        </Grid>
        <Grid size={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="warning"
            disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
            onClick={onClickNettoyer}
          >
            Nettoyer
          </Button>
        </Grid>
        <Grid size={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="error"
            disabled={ollamaEstChargeOutil}
            onClick={() => arreterReponseOllama()}
          >
            Arrêter la réponse
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
export default SynthFormulaire;
