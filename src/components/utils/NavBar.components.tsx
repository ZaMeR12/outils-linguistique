import { OllamaContext } from "@/contexts/Ollama.context";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { forwardRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    const { ollamaEstChargeNav, ollamaErreur, viderReponseOllama } =
      useContext(OllamaContext);

    const location = useLocation();
    const navigate = useNavigate();

    /**
     * Gère la navigation vers une nouvelle page.
     * Vide la réponse d'Ollama avant de naviguer.
     * @author ZaMeR_12
     * @param chemin Le chemin vers lequel naviguer.
     */
    const handleNavigation = (chemin: string) => {
      viderReponseOllama();
      navigate(chemin);
    };

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
        <ListItemButton
          component="a"
          selected={location.pathname === "/"}
          onClick={() => handleNavigation("/")}
        >
          <ListItemText primary="Page principale" />
        </ListItemButton>

        <ListItemButton
          component="a"
          selected={location.pathname === "/traducteur"}
          onClick={() => {
            handleNavigation("/traducteur");
          }}
          disabled={!ollamaEstChargeNav || ollamaErreur !== ""}
        >
          <ListItemText primary="Traducteur" />
        </ListItemButton>
        <ListItemButton
          component="a"
          selected={location.pathname === "/resume"}
          onClick={() => {
            handleNavigation("/resume");
          }}
          disabled={!ollamaEstChargeNav || ollamaErreur !== ""}
        >
          <ListItemText primary="Synthèse de texte" />
        </ListItemButton>
        {/* <ListItemButton
          component="a"
          selected={location.pathname === "/reformulation"}
          onClick={() => {
            handleNavigation("/reformulation");
          }}
          disabled={!ollamaEstChargeNav || ollamaErreur !== ""}
        >
          <ListItemText primary="Reformulation" />
        </ListItemButton> */}
      </List>
    );
  }
);
