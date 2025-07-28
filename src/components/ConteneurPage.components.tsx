import { Paper } from "@mui/material";
import { useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

interface IOutletContext {
  appBarTopHeight: number;
  navBarWidth: number;
}

const ConteneurPage = () => {
  const {
    appBarTopHeight,
    // navBarWidth
  } = useOutletContext<IOutletContext>();

  return (
    <Paper
      elevation={3}
      sx={{
        overflowY: "auto", // Permet le défilement vertical
        height: `calc(100vh - ${appBarTopHeight}px)`, // Ajuste la hauteur pour éviter le dépassement
        maxHeight: `calc(100vh - ${appBarTopHeight}px)`, // Limite la hauteur maximale
        overflowX: "hidden", // Désactive le défilement horizontal
        margin: 0,
        padding: 0,
      }}
    >
      <Outlet />
    </Paper>
  );
};

export default ConteneurPage;
