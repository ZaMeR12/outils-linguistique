// import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ConteneurPrincipal } from "./components/ConteneurPrincipal.component";
import PagePrincipale from "./routes/PagePrincipale.routes";
import OllamaProvider from "./contexts/Ollama.context.tsx";
import Traducteur from "./routes/Traducteur.routes.tsx";
import Resume from "./routes/Resume.routes.tsx";
import Reformuler from "./routes/Reformuler.routes.tsx";
import Historique from "./routes/historique/Principal.historique.routes.tsx";
import TradDetails from "./routes/historique/TradDetails.historique.routes.tsx";
import SynthDetails from "./routes/historique/SynthDetails.historique.routes.tsx";
import ReformDetails from "./routes/historique/ReformDetails.historique.routes.tsx";
import { Typography } from "@mui/material";

function App() {
  return (
    <HashRouter>
      <OllamaProvider>
        <Routes>
          <Route path="/" element={<ConteneurPrincipal />}>
            <Route index element={<PagePrincipale />} />
            <Route path="traducteur" element={<Traducteur />} />
            <Route path="resume" element={<Resume />} />
            <Route path="reformulation" element={<Reformuler />} />
            <Route path="historique" element={<Historique />} />
            <Route path="historique/traduction/:id" element={<TradDetails />} />
            <Route path="historique/resume/:id" element={<SynthDetails />} />
            <Route
              path="historique/reformulation/:id"
              element={<ReformDetails />}
            />
            <Route
              path="*"
              element={
                <Typography variant="h6" component="h6">
                  Erreur 404 : Page non trouvée
                </Typography>
              }
            />
          </Route>
        </Routes>
      </OllamaProvider>
    </HashRouter>
  );
}

export default App;
