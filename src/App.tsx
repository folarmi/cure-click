import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutePage } from "./utils/RoutePage";
import { Theme } from "@radix-ui/themes";
import { Provider } from "react-redux";
import { store } from "./lib/store";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <Theme>
        <Router>
          <RoutePage />
        </Router>
      </Theme>
    </Provider>
  );
}

export default App;
