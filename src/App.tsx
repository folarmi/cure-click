import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutePage } from "./utils/RoutePage";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import ThemeSetter from "./components/ThemeSetter";

function App() {
  return (
    <Provider store={store}>
      <ThemeSetter userType="patient" />
      <Theme>
        <Router>
          <RoutePage />
        </Router>
      </Theme>
      {/* </ThemeSetter> */}
    </Provider>
  );
}

export default App;
