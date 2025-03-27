import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutePage } from "./utils/RoutePage";
import { Theme } from "@radix-ui/themes";
import ThemeSetter from "./components/ThemeSetter";
import QueryClientContextProvider from "./lib/QueryClientContextProvider";
import { Bounce, ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import StoreProvider from "./lib/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <QueryClientContextProvider>
        <AuthProvider>
          <Theme>
            <Router>
              <RoutePage />
            </Router>
          </Theme>
          <ThemeSetter />
          <ToastContainer
            position="top-center"
            pauseOnHover
            hideProgressBar
            transition={Bounce}
            closeButton={false}
            closeOnClick
            autoClose={5000}
          />
        </AuthProvider>
      </QueryClientContextProvider>
    </StoreProvider>
  );
}

export default App;
