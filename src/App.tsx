import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutePage } from "./utils/RoutePage";
import { Theme } from "@radix-ui/themes";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Theme>
      <Router>
        <RoutePage />
      </Router>
    </Theme>
  );
}

export default App;
