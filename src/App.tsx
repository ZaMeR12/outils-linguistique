// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConteneurPrincipal } from "./components/ConteneurPrincipal.component";
import PagePrincipale from "./routes/PagePrincipale.routes";
import OllamaProvider from "./contexts/Ollama.context.tsx";
import Traducteur from "./routes/Traducteur.routes.tsx";

function App() {
  return (
    <BrowserRouter>
      <OllamaProvider>
        <Routes>
          <Route path="/" element={<ConteneurPrincipal />}>
            <Route index element={<PagePrincipale />} />
            <Route path="traducteur" element={<Traducteur />} />
            <Route path="resume" element={<div>Résumé de texte</div>} />
            <Route path="reformulation" element={<div>Reformulation</div>} />
          </Route>
        </Routes>
      </OllamaProvider>
    </BrowserRouter>
  );
}

export default App;
