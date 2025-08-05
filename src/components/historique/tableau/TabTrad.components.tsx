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

type TradLigne = {
  id: number;
  texte_original: string;
  texte_traduit: string;
  langue_origine: string;
  langue_cible: string;
  date_traduction: string;
  modele: string; // Ajout de la propriété pour le modèle
};

/**
 * Composant pour afficher le tableau des traductions.
 * Permet de visualiser les traductions effectuées, avec la possibilité de supprimer une traduction.
 * @author ZaMeR12
 * @returns {JSX.Element}
 */
const TabTrad = () => {
  const navigate = useNavigate();

  const [lignes, setLignes] = useState<TradLigne[]>([]);
  const [paginationModele, setPaginationModele] = useState({
    page: 0,
    pageSize: 5,
  });
  const [compteurLigne, setCompteurLigne] = useState(0);

  /** Supprime une traduction de la base de données par son ID.
   * @author ZaMeR12
   * @param id  L'ID de la traduction à supprimer.
   */
  const supprimerTraduction = async (id: number) => {
    await window.ipcRenderer.send("sup-trad", { id });
    setLignes((prevLignes) => prevLignes.filter((ligne) => ligne.id !== id));
    setCompteurLigne((prevCount) => prevCount - 1);
  };

  const colonnes: GridColDef[] = [
    { field: "texte_original", headerName: "Texte Original", flex: 1 },
    { field: "texte_traduit", headerName: "Texte Traduit", flex: 1 },
    {
      field: "langue_origine",
      headerName: "Langue Origine",
      flex: 1,
      renderCell: (params) => {
        const langue = params.value as string;
        return correspondanceLangues[langue as LangueTraducteurEng] || langue;
      },
    },
    {
      field: "langue_cible",
      headerName: "Langue Cible",
      flex: 1,
      renderCell: (params) => {
        const langue = params.value as string;
        return correspondanceLangues[langue as LangueTraducteurEng] || langue;
      },
    },
    { field: "modele", headerName: "Modèle", flex: 1 }, // Ajout de la colonne pour le modèle
    {
      field: "date_traduction",
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
            onClick={() => supprimerTraduction(id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const onRowDoubleClick = (params: GridRowParams) => {
    const row = params.row as TradLigne;
    navigate(`/historique/traduction/${row.id}`, {
      state: { row },
    });
  };

  useEffect(() => {
    const chercherDonnees = async () => {
      const { page, pageSize } = paginationModele;
      const donnees = await window.ipcRenderer.invoke("get-trads", {
        page,
        taille: pageSize,
      });
      const total = await window.ipcRenderer.invoke("get-nombre-trads");

      // Convertir date_traduction en type Date
      const donneesConverties = donnees.map((ligne: TradLigne) => ({
        ...ligne,
        date_traduction: new Date(ligne.date_traduction),
      }));

      setLignes(donneesConverties as TradLigne[]);
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

export default TabTrad;
