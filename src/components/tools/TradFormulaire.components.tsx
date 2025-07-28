import { OllamaContext } from "@/contexts/Ollama.context";
import {
  correspondanceLangues,
  LangueTraducteurEng,
} from "@/utils/ContexteSyteme";
import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import { useContext, useState } from "react";
import useLocalStorage from "use-local-storage";

interface ITradFormulaireProps {}

const TradFormulaire = (props: ITradFormulaireProps) => {
  const { ollamaErreur, ollamaEstCharge } = useContext(OllamaContext);

  const [langueOrigine, setLangueOrigine] =
    useLocalStorage<LangueTraducteurEng>(
      "langueOrigine",
      LangueTraducteurEng.FR_CA
    );

  const [langueTrad, setLangueTrad] = useLocalStorage<LangueTraducteurEng>(
    "langueTrad",
    LangueTraducteurEng.EN_US
  );

  const onChangeLangueOrigine = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLangueOrigine(event.target.value as LangueTraducteurEng);
  };

  const onChangeLangueTrad = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLangueTrad(event.target.value as LangueTraducteurEng);
  };

  return (
    <Card elevation={5} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid size={6} sx={{ borderRight: "1px solid #000", paddingRight: 1 }}>
          <TextField
            fullWidth
            label="Langue d'origine"
            variant="outlined"
            disabled={!ollamaEstCharge || ollamaErreur !== ""}
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
            disabled={!ollamaEstCharge || ollamaErreur !== ""}
            multiline
            required
            rows={4}
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
            label="Langue d'origine"
            variant="outlined"
            disabled={!ollamaEstCharge || ollamaErreur !== ""}
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
            disabled={!ollamaEstCharge || ollamaErreur !== ""}
            multiline
            rows={4}
            placeholder="La traduction apparaîtra ici..."
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
        <Grid size={3}>
          <Button
            variant="contained"
            color="primary"
            disabled={!ollamaEstCharge || ollamaErreur !== ""}
          >
            Traduire
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
export default TradFormulaire;
