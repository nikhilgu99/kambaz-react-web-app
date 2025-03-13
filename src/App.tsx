import store from "./Kambaz/store";
import { Provider } from "react-redux";
import Labs from "./Labs";
import Kambaz from "./Kambaz";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kambaz" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App
