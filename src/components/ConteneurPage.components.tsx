import { Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

interface IConteneurPageProps {
  appBarTopHeight: number;
  navBarWidth: number;
}

/**
 * Conteneur principal de l'application.
 * Ce composant enveloppe les pages de l'application et gère la mise en page.
 * @author ZaMeR12
 * @param props Les propriétés du conteneur.
 * @returns Le conteneur de la page.
 */
const ConteneurPage = (props: IConteneurPageProps) => {
  return (
    <Paper
      elevation={5}
      sx={{
        overflowY: "hidden", // Permet le défilement vertical
        height: `calc(100vh - ${props.appBarTopHeight}px)`, // Ajuste la hauteur pour éviter le dépassement
        maxHeight: `calc(100vh - ${props.appBarTopHeight}px)`, // Limite la hauteur maximale
        overflowX: "hidden", // Désactive le défilement horizontal
        margin: 0,
        padding: 0,
      }}
    >
      <Outlet
        context={{
          appBarTopHeight: props.appBarTopHeight,
          navBarWidth: props.navBarWidth,
        }}
      />
    </Paper>
  );
};

export default ConteneurPage;
