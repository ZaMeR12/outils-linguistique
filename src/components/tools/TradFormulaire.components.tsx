import { OllamaContext } from "@/contexts/Ollama.context";
import { RoleMessageOllama } from "@/models/Ollama.models";
import {
  correspondanceLangues,
  genererContexteTraduction,
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

const TradFormulaire = () => {
  const {
    ollamaErreur,
    ollamaEstChargeOutil,
    genererReponseOllama,
    reponseOllama,
    arreterReponseOllama,
    traductionModele,
    viderReponseOllama,
  } = useContext(OllamaContext);

  const [langueOrigine, setLangueOrigine] =
    useLocalStorage<LangueTraducteurEng>(
      "langueOrigine",
      LangueTraducteurEng.FR_CA
    );

  const [langueTrad, setLangueTrad] = useLocalStorage<LangueTraducteurEng>(
    "langueTrad",
    LangueTraducteurEng.EN_US
  );

  const [texteATraduire, setTexteATraduire] = useLocalStorage<string>(
    "texteATraduire",
    ""
  );

  const [traduction, setTraduction] = useLocalStorage<string>("traduction", "");

  /**
   * Gère le changement de la langue source sélectionnée.
   * @author ZaMeR12
   * @param event L'événement de changement provenant de l'élément select.
   */
  const onChangeLangueOrigine = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nouvelleLangue = event.target.value as LangueTraducteurEng;

    if (nouvelleLangue !== langueOrigine) {
      if (langueTrad === nouvelleLangue) {
        setLangueTrad(langueOrigine);
      }
      setLangueOrigine(nouvelleLangue);
    }
  };

  /**
   * Gère le changement de la langue cible sélectionnée.
   * @author ZaMeR12
   * @param event L'événement de changement provenant de l'élément select.
   */
  const onChangeLangueTrad = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nouvelleLangue = event.target.value as LangueTraducteurEng;

    if (nouvelleLangue !== langueTrad) {
      if (langueOrigine === nouvelleLangue) {
        setLangueOrigine(langueTrad);
      }
      setLangueTrad(nouvelleLangue);
    }
  };

  /**
   * Gère le changement du texte à traduire.
   * @author ZaMeR12
   * @param event L'événement de changement provenant de l'élément input.
   */
  const onChangeTexteATraduire = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTexteATraduire(event.target.value);
  };

  /**
   * Gère le clic sur le bouton "Nettoyer" pour réinitialiser les champs de saisie.
   * @author ZaMeR12
   */
  const onClickNettoyer = () => {
    setTexteATraduire("");
    setTraduction("");
    viderReponseOllama();
  };

  /**
   * Gère le clic sur le bouton "Traduire" pour lancer la traduction du texte.
   * Cette fonction crée un message de l'utilisateur avec le texte à traduire,
   * génère un contexte système pour la traduction, et appelle la fonction
   * `genererReponseOllama` pour obtenir la traduction.
   * Si le texte à traduire est vide, aucune action n'est effectuée.
   * @author ZaMeR12
   */
  const onClickTraduire = async () => {
    if (texteATraduire.trim() !== "") {
      const texteTradMessage: Message = {
        role: RoleMessageOllama.USER,
        content: texteATraduire,
      };

      const contexteSysteme = genererContexteTraduction(
        langueOrigine,
        langueTrad,
        texteATraduire
      );

      const messages: Message[] = [contexteSysteme, texteTradMessage];
      await genererReponseOllama(traductionModele, messages);
    }
  };

  useEffect(() => {
    console.log("Réponse d'Ollama trad:", reponseOllama);
    if (reponseOllama && reponseOllama !== traduction) {
      setTraduction(reponseOllama);
    }
  }, [reponseOllama, setTraduction, traduction]);

  return (
    <Card elevation={5} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid size={6} sx={{ borderRight: "1px solid #000", paddingRight: 1 }}>
          <TextField
            fullWidth
            label="Langue d'origine"
            variant="outlined"
            disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
            select
            value={langueOrigine}
            sx={{ paddingBottom: 2 }}
            onChange={onChangeLangueOrigine}
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
          <TextField
            fullWidth
            label="Texte à traduire"
            variant="outlined"
            error={!!ollamaErreur}
            helperText={ollamaErreur}
            disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
            multiline
            required
            rows={4}
            value={texteATraduire}
            onChange={onChangeTexteATraduire}
            placeholder="Entrez le texte à traduire ici..."
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
            label="Langue de traduction"
            variant="outlined"
            disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
            select
            value={langueTrad}
            sx={{ paddingBottom: 2 }}
            onChange={onChangeLangueTrad}
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
          <TextField
            fullWidth
            label="Traduction"
            variant="outlined"
            error={!!ollamaErreur}
            helperText={ollamaErreur}
            disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
            multiline
            rows={4}
            placeholder="La traduction apparaîtra ici..."
            value={traduction}
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
            onClick={onClickTraduire}
          >
            Traduire
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
export default TradFormulaire;
