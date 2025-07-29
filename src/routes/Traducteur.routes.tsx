import TradFormulaire from "@/components/tools/TradFormulaire.components";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "@/types/IOutletContext.types";

interface ITraducteurProps {}

const Traducteur = (props: ITraducteurProps) => {
  const { appBarTopHeight } = useOutletContext<IOutletContext>();
  return (
    <div
      style={{
        overflowY: "auto", // Permet le défilement vertical
        height: `calc(100vh - ${appBarTopHeight}px)`, // Ajuste la hauteur pour éviter le dépassement
        maxHeight: `calc(100vh - ${appBarTopHeight}px)`, // Limite la hauteur maximale
        overflowX: "hidden", // Désactive le défilement horizontal
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          padding: 3,
        }}
      >
        <Grid size={12} textAlign={"center"}>
          <Typography variant="h4" component="h4">
            Traducteur
          </Typography>
        </Grid>
        <Grid size={12} paddingBottom={2}>
          <Typography variant="body1" component="p">
            Cette page est dédiée à la traduction de textes.
          </Typography>
        </Grid>
        <Grid size={12}>
          <TradFormulaire />
        </Grid>
      </Grid>
    </div>
  );
};
export default Traducteur;
