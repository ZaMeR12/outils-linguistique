import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { frFR } from "@mui/x-data-grid/locales";
import {
  correspondanceLangues,
  correspondanceStyles,
  LangueTraducteurEng,
  StyleEcritureEng,
} from "@/utils/ContexteSysteme";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type ReformLigne = {
  id: number;
  texte_original: string;
  texte_reformule: string;
  langue_origine: string;
  style: string;
  limite_mots: number;
  date_reformulation: string;
  modele: string;
};

/**
 * Composant pour afficher le tableau des reformulations.
 * Permet de visualiser les reformulations effectuées, avec la possibilité de supprimer une reformulation.
 * @author ZaMeR12
 * @returns {JSX.Element}
 */
const TabReform = () => {
  const navigate = useNavigate();

  const [lignes, setLignes] = useState<ReformLigne[]>([]);
  const [paginationModele, setPaginationModele] = useState({
    page: 0,
    pageSize: 5,
  });
  const [compteurLigne, setCompteurLigne] = useState(0);

  /** Supprime une reformulation de la base de données par son ID.
   * @author ZaMeR12
   * @param id  L'ID de la reformulation à supprimer.
   */
  const supprimerReformulation = async (id: number) => {
    await window.ipcRenderer.send("sup-reform", { id });
    setLignes((prevLignes) => prevLignes.filter((ligne) => ligne.id !== id));
    setCompteurLigne((prevCount) => prevCount - 1);
  };

  const colonnes: GridColDef[] = [
    { field: "texte_original", headerName: "Texte original", flex: 1 },
    { field: "texte_reformule", headerName: "Texte reformulé", flex: 1 },
    {
      field: "langue_origine",
      headerName: "Langue de la reformulation",
      flex: 1,
      renderCell: (params) => {
        const langue = params.value as string;
        return correspondanceLangues[langue as LangueTraducteurEng] || langue;
      },
    },
    {
      field: "style",
      headerName: "Style d'écriture",
      flex: 1,
      renderCell: (params) => {
        const style = params.value as string;
        return correspondanceStyles[style as StyleEcritureEng] || style;
      },
    },
    {
      field: "limite_mots",
      headerName: "Limite de mots",
      flex: 1,
      renderCell: (params) => {
        const limites = params.value as number;
        return limites > 0 ? String(limites) : "Aucune limite";
      },
    },
    { field: "modele", headerName: "Modèle", flex: 1 }, // Ajout de la colonne pour le modèle
    {
      field: "date_reformulation",
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
            onClick={() => supprimerReformulation(id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const onRowDoubleClick = (params: GridRowParams) => {
    const row = params.row as ReformLigne;
    navigate(`/historique/reformulation/${row.id}`, {
      state: { row },
    });
  };

  useEffect(() => {
    const chercherDonnees = async () => {
      const { page, pageSize } = paginationModele;
      const donnees = await window.ipcRenderer.invoke("get-reforms", {
        page,
        taille: pageSize,
      });
      const total = await window.ipcRenderer.invoke("get-nombre-reforms");

      // Convertir date_reformulation en type Date
      const donneesConverties = donnees.map((ligne: ReformLigne) => ({
        ...ligne,
        date_reformulation: new Date(ligne.date_reformulation),
      }));

      setLignes(donneesConverties as ReformLigne[]);
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

export default TabReform;
