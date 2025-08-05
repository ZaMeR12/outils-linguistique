import { Card, CardContent, Grid, MenuItem, TextField } from "@mui/material";
import TabTrad from "./tableau/TabTrad.components";
import useLocalStorage from "use-local-storage";
import TabSynth from "./tableau/TabSynth.components";
import TabReform from "./tableau/TabReform.components";

/**
 * Composant pour afficher le tableau de l'historique.
 * Permet de visualiser les interactions effectuées avec les outils de traitement de texte.
 * @author ZaMeR12
 * @returns {JSX.Element}
 */
const TableauHistorique = () => {
  const [outil, setOutils] = useLocalStorage<string>(
    "outilHistorique",
    "traduction"
  );

  const onChangeOutils = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nouvelleValeur = event.target.value;
    setOutils(nouvelleValeur);
  };

  return (
    <Card elevation={5} sx={{ padding: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={3}>
            <TextField
              fullWidth
              label="Outil"
              variant="outlined"
              select
              value={outil}
              sx={{ paddingBottom: 2 }}
              onChange={onChangeOutils}
            >
              <MenuItem value={"traduction"}>Traduction</MenuItem>
              <MenuItem value={"resume"}>Synthèse</MenuItem>
              <MenuItem value={"reformulation"}>Reformulation</MenuItem>
            </TextField>
          </Grid>
          <Grid size={12}>
            {outil === "traduction" && <TabTrad />}
            {outil === "resume" && <TabSynth />}
            {outil === "reformulation" && <TabReform />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TableauHistorique;
