import { AppBar, Toolbar, Typography } from "@mui/material";

import { forwardRef } from "react";
interface IAppBarTopProps {}

/**
 * Composant de la barre d'application supérieure.
 * @author ZaMeR_12
 * @param props Les propriétés du composant.
 */
export const AppBarTop = forwardRef<HTMLDivElement, IAppBarTopProps>(
  (_props, ref) => {
    return (
      <AppBar ref={ref} position="static">
        <Toolbar>
          <img
            src="icon-512.png"
            alt="Logo de l'application"
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Outils linguistiques
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
);
