// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConteneurPrincipal } from "./components/ConteneurPrincipal.component";
import PagePrincipale from "./routes/PagePrincipale.routes";
import OllamaProvider from "./contexts/Ollama.context.tsx";

function App() {
  return (
    <BrowserRouter>
      <OllamaProvider>
        <Routes>
          <Route path="/" element={<ConteneurPrincipal />}>
            <Route index element={<PagePrincipale />} />
            {/* <Route path="dadams" element={<DouglasAdams />} />
          <Route path="oscard" element={<OrsonScottCard />} />
          <Route path="livre/:id" element={<Livre />} /> */}
          </Route>
        </Routes>
      </OllamaProvider>
    </BrowserRouter>
  );
}

export default App;
