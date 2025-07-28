import { List, ListItemButton, ListItemText } from "@mui/material";
import { forwardRef } from "react";

interface INavBarProps {
  appBarTopHeight: number; // Hauteur de l'AppBarTop
}
/**
 * Composant de la barre de navigation.
 * @author ZaMeR_12
 * @param props Les propriétés du composant.
 * @returns Un élément JSX représentant la barre de navigation.
 */
export const NavBar = forwardRef<HTMLUListElement, INavBarProps>(
  (props, ref) => {
    return (
      <List
        ref={ref}
        sx={{
          backgroundColor: "#cecece5d",
          overflowY: "auto", // Permet le défilement vertical
          height: `calc(100vh - ${props.appBarTopHeight}px)`, // Ajuste la hauteur pour éviter le dépassement
          maxHeight: `calc(100vh - ${props.appBarTopHeight}px)`, // Limite la hauteur maximale
          overflowX: "hidden", // Désactive le défilement horizontal
          margin: 0,
          padding: 0,
          borderRight: "1px solid #000",
        }}
      >
        <ListItemButton component="a" selected>
          <ListItemText primary="Page principale" />
        </ListItemButton>
        <ListItemButton component="a">
          <ListItemText primary="Traducteur" />
        </ListItemButton>
        <ListItemButton component="a">
          <ListItemText primary="Résumé de texte" />
        </ListItemButton>
        <ListItemButton component="a">
          <ListItemText primary="Reformulation" />
        </ListItemButton>
      </List>
    );
  }
);
