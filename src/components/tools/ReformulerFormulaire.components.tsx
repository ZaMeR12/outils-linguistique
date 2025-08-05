import { OllamaContext } from "@/contexts/Ollama.context";
import { RoleMessageOllama } from "@/models/Ollama.models";
import {
  correspondanceLangues,
  correspondanceStyles,
  genererContexteReformulation,
  LangueTraducteurEng,
  StyleEcritureEng,
} from "@/utils/ContexteSysteme";
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  Grid,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Message } from "ollama/browser";
import { useCallback, useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const ReformulerFormulaire = () => {
  const {
    ollamaErreur,
    ollamaEstChargeOutil,
    genererReponseOllama,
    reponseOllama,
    arreterReponseOllama,
    reformulationModele,
    viderReponseOllama,
  } = useContext(OllamaContext);

  const [insertionEffectuee, setInsertionEffectuee] = useState<boolean>(true);

  const [langueReformuler, setLangueReformuler] =
    useLocalStorage<LangueTraducteurEng>(
      "langueReformuler",
      LangueTraducteurEng.FR_CA
    );

  const [texteInitial, setTexteInitial] = useLocalStorage<string>(
    "texteInitialReformuler",
    ""
  );

  const [reformuler, setReformuler] = useLocalStorage<string>(
    "texteReformuler",
    ""
  );

  const [styleEcriture, setStyleEcriture] = useLocalStorage<StyleEcritureEng>(
    "styleEcritureReformuler",
    StyleEcritureEng.AUCUNE
  );

  const [limiteMots, setLimiteMots] = useLocalStorage<number>(
    "limiteMotsReformuler",
    0
  );

  const onChangeLangueReformuler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLangueReformuler(event.target.value as LangueTraducteurEng);
  };

  const onChangeTexteInitial = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTexteInitial(event.target.value);
  };

  const onChangeStyleEcriture = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStyleEcriture(event.target.value as StyleEcritureEng);
  };

  /**
   * Gère le clic sur le bouton "Nettoyer" pour réinitialiser les champs de saisie.
   * @author ZaMeR12
   */
  const onClickNettoyer = () => {
    setTexteInitial("");
    setReformuler("");
    viderReponseOllama();
  };

  const ajouterReformulationDansHistorique = useCallback(
    (texteReformule: string) => {
      window.ipcRenderer.send("ajout-reform", {
        texteOriginal: texteInitial,
        texteReformule: texteReformule,
        langueOrigine: langueReformuler,
        style: styleEcriture,
        limiteMots: limiteMots,
        dateReformulation: new Date().toISOString(),
        modele: reformulationModele.nom,
      });
    },
    [
      texteInitial,
      langueReformuler,
      styleEcriture,
      limiteMots,
      reformulationModele.nom,
    ]
  );

  useEffect(() => {
    if (reponseOllama && reponseOllama !== reformuler) {
      setReformuler(reponseOllama);
    }

    if (!insertionEffectuee) {
      ajouterReformulationDansHistorique(reponseOllama);
      setInsertionEffectuee(true);
    }
  }, [
    reponseOllama,
    reformuler,
    setReformuler,
    insertionEffectuee,
    ajouterReformulationDansHistorique,
  ]);

  const onClickReformuler = async () => {
    if (texteInitial.trim() !== "") {
      if (limiteMots > 0 || styleEcriture !== StyleEcritureEng.AUCUNE) {
        setInsertionEffectuee(true);
        const texteInitialMessage: Message = {
          role: RoleMessageOllama.USER,
          content: texteInitial,
        };

        const contexteSysteme = genererContexteReformulation(
          texteInitial,
          langueReformuler,
          limiteMots === 0 ? undefined : limiteMots,
          styleEcriture === StyleEcritureEng.AUCUNE ? undefined : styleEcriture
        );

        const messages: Message[] = [contexteSysteme, texteInitialMessage];

        await genererReponseOllama(reformulationModele, messages);
        setInsertionEffectuee(false);
      }
    }
  };

  return (
    <Card elevation={5} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {limiteMots == 0 && styleEcriture == StyleEcritureEng.AUCUNE ? (
          <Grid size={12}>
            <Alert severity="warning">
              <AlertTitle>Avertissement</AlertTitle>
              <Typography variant="body2" component="p">
                Vous devez au moins définir une limite de mots ou un style
                d'écriture pour la reformulation.
              </Typography>
            </Alert>
          </Grid>
        ) : (
          <></>
        )}
        <Grid size={12} container justifyContent={"flex-start"}>
          <Grid size={4}>
            <TextField
              fullWidth
              label="Langue de la reformulation"
              variant="outlined"
              disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
              select
              value={langueReformuler}
              sx={{ paddingBottom: 2 }}
              onChange={onChangeLangueReformuler}
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
          <Grid size={4}>
            <TextField
              fullWidth
              label="Style d'écriture"
              variant="outlined"
              disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
              select
              value={styleEcriture}
              sx={{ paddingBottom: 2 }}
              onChange={onChangeStyleEcriture}
            >
              {(Array.isArray(StyleEcritureEng)
                ? StyleEcritureEng
                : Object.values(StyleEcritureEng)
              ).map((style: string) => (
                <MenuItem key={style} value={style}>
                  {correspondanceStyles[style as StyleEcritureEng]}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={4}>
            <TextField
              variant="outlined"
              label="Limite de mots"
              fullWidth
              type="number"
              disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
              slotProps={{
                input: { inputProps: { min: 0, step: 1 } },
              }}
              helperText="0 pour aucune limite de mots"
              value={limiteMots}
              onChange={(e) => setLimiteMots(Number(e.target.value))}
            />
          </Grid>
        </Grid>
        <Grid size={6} sx={{ borderRight: "1px solid #000", paddingRight: 1 }}>
          <TextField
            fullWidth
            label="Texte à reformuler"
            variant="outlined"
            error={!!ollamaErreur}
            helperText={ollamaErreur}
            disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
            multiline
            required
            rows={15}
            value={texteInitial}
            onChange={onChangeTexteInitial}
            placeholder="Entrez le texte à reformuler ici..."
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
            label="Reformulation"
            variant="outlined"
            error={!!ollamaErreur}
            helperText={ollamaErreur}
            disabled={!ollamaEstChargeOutil || ollamaErreur !== ""}
            multiline
            rows={15}
            placeholder="La reformulation apparaîtra ici..."
            value={reformuler}
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
            onClick={onClickReformuler}
          >
            Reformuler
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

export default ReformulerFormulaire;
