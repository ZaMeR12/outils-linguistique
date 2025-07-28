import { AppBar, Toolbar, Typography } from "@mui/material";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

import { forwardRef } from "react";
interface IAppBarTopProps {}

/**
 * Composant de la barre d'application supérieure.
 * @author ZaMeR_12
 * @param props Les propriétés du composant.
 */
export const AppBarTop = forwardRef<HTMLDivElement, IAppBarTopProps>(
  (props, ref) => {
    return (
      <AppBar ref={ref} position="static">
        <Toolbar>
          <HomeRepairServiceIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Outils linguistiques
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
);
