import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { frFR } from "@mui/x-data-grid/locales";
import {
  correspondanceLangues,
  LangueTraducteurEng,
} from "@/utils/ContexteSysteme";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type SynthLigne = {
  id: number;
  texte_original: string;
  texte_synthetise: string;
  langue_origine: string;
  date_synthese: string;
  modele: string; // Ajout de la propriété pour le modèle
};

/**
 * Composant pour afficher le tableau des synthèses.
 * Permet de visualiser les synthèses effectuées, avec la possibilité de supprimer une synthèse.
 * @author ZaMeR12
 * @returns {JSX.Element}
 */
const TabSynth = () => {
  const navigate = useNavigate();

  const [lignes, setLignes] = useState<SynthLigne[]>([]);
  const [paginationModele, setPaginationModele] = useState({
    page: 0,
    pageSize: 5,
  });
  const [compteurLigne, setCompteurLigne] = useState(0);

  /** Supprime une synthèse de la base de données par son ID.
   * @author ZaMeR12
   * @param id  L'ID de la synthèse à supprimer.
   */
  const supprimerSynthese = async (id: number) => {
    await window.ipcRenderer.send("sup-synth", { id });
    setLignes((prevLignes) => prevLignes.filter((ligne) => ligne.id !== id));
    setCompteurLigne((prevCount) => prevCount - 1);
  };

  const colonnes: GridColDef[] = [
    { field: "texte_original", headerName: "Texte Original", flex: 1 },
    { field: "texte_synthetise", headerName: "Texte Synthetisé", flex: 1 },
    {
      field: "langue_origine",
      headerName: "Langue synthèse",
      flex: 1,
      renderCell: (params) => {
        const langue = params.value as string;
        return correspondanceLangues[langue as LangueTraducteurEng] || langue;
      },
    },
    { field: "modele", headerName: "Modèle", flex: 1 }, // Ajout de la colonne pour le modèle
    {
      field: "date_synthese",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        const date = params.value as Date;
        return date.toLocaleString(); // Afficher en format localisé
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <IconButton
            aria-label="supprimer"
            onClick={() => supprimerSynthese(id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const onRowDoubleClick = (params: GridRowParams) => {
    const row = params.row as SynthLigne;
    navigate(`/historique/resume/${row.id}`, {
      state: { row },
    });
  };

  useEffect(() => {
    const chercherDonnees = async () => {
      const { page, pageSize } = paginationModele;
      const donnees = await window.ipcRenderer.invoke("get-synths", {
        page,
        taille: pageSize,
      });
      const total = await window.ipcRenderer.invoke("get-nombre-synths");

      // Convertir date_traduction en type Date
      const donneesConverties = donnees.map((ligne: SynthLigne) => ({
        ...ligne,
        date_synthese: new Date(ligne.date_synthese),
      }));

      setLignes(donneesConverties as SynthLigne[]);
      setCompteurLigne(total);
    };
    chercherDonnees();
  }, [paginationModele]);

  return (
    <div style={{ maxHeight: 600, width: "100%" }}>
      <DataGrid
        rows={lignes}
        columns={colonnes}
        pagination
        paginationModel={paginationModele}
        onPaginationModelChange={setPaginationModele}
        pageSizeOptions={[5, 10, 20]}
        rowCount={compteurLigne}
        paginationMode="server"
        onRowDoubleClick={onRowDoubleClick}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        sx={{ maxHeight: 600 }}
      />
    </div>
  );
};

export default TabSynth;
