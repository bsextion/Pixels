import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //BrowserRouter is used to enable routing in the application
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
