// import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ConteneurPrincipal } from "./components/ConteneurPrincipal.component";
import PagePrincipale from "./routes/PagePrincipale.routes";
import OllamaProvider from "./contexts/Ollama.context.tsx";
import Traducteur from "./routes/Traducteur.routes.tsx";
import Resume from "./routes/Resume.routes.tsx";
import Reformuler from "./routes/Reformuler.routes.tsx";

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
          </Route>
        </Routes>
      </OllamaProvider>
    </HashRouter>
  );
}

export default App;
