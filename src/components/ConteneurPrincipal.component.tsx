import { Grid } from "@mui/material";
import { AppBarTop } from "./utils/AppBarTop.components";
import { NavBar } from "./utils/NavBar.components";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { Outlet } from "react-router-dom";

interface IConteneurPrincipalProps {}

/**
 * Composant de conteneur principal des autres composants de l'application.
 * @author ZaMeR_12
 * @param props Les propriétés du composant.
 * @returns Un élément JSX représentant le conteneur principal.
 */
export const ConteneurPrincipal = (
  props: IConteneurPrincipalProps
): JSX.Element => {
  const appBarTopRef = useRef<HTMLDivElement>(null); // Référence pour la barre d'application supérieure
  // État pour stocker la hauteur de l'élément AppBarTop
  const [appBarTopHeight, setAppBarTopHeight] = useState<number | null>(null);

  const navBarRef = useRef<HTMLUListElement>(null); // Référence pour la barre de navigation
  // État pour stocker la largeur de l'élément NavBar
  const [navBarWidth, setNavBarWidth] = useState<number | null>(null);

  useEffect(() => {
    if (appBarTopRef.current) {
      // Obtenir la hauteur de l'élément en px
      const height = appBarTopRef.current.getBoundingClientRect().height;
      setAppBarTopHeight(height);
      console.log("Hauteur de l'AppBarTop:", height);
    }
  }, []);

  // Début du code généré.
  // Source: GitHub. (2025). GitHub Copilot (version juillet 2025) [Modèle de génération de code]. https://resources.github.com/copilot-for-business/
  useEffect(() => {
    const miseAJourNavBarWidth = () => {
      if (navBarRef.current) {
        const width = navBarRef.current.getBoundingClientRect().width;
        setNavBarWidth(width);
        console.log("Largeur de la NavBar mise à jour:", width);
      }
    };

    // Ajouter un écouteur pour le redimensionnement de la fenêtre
    window.addEventListener("resize", miseAJourNavBarWidth);

    // Appeler la fonction une première fois pour initialiser la largeur
    miseAJourNavBarWidth();

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      window.removeEventListener("resize", miseAJourNavBarWidth);
    };
  }, []);
  // Fin du code généré.
  // Source: GitHub. (2025). GitHub Copilot (version juillet 2025) [Modèle de génération de code]. https://resources.github.com/copilot-for-business/

  return (
    <Grid container margin={0} padding={0}>
      <Grid size={12}>
        <AppBarTop ref={appBarTopRef} />
      </Grid>
      <Grid size={2}>
        <NavBar
          ref={navBarRef}
          appBarTopHeight={_.isNull(appBarTopHeight) ? 0 : appBarTopHeight}
        />
      </Grid>
      <Grid size={10}>
        <Outlet
          context={{
            appBarTopHeight: _.isNull(appBarTopHeight) ? 0 : appBarTopHeight,
            navBarWidth: _.isNull(navBarWidth) ? 0 : navBarWidth,
          }}
        />
      </Grid>
    </Grid>
  );
};
