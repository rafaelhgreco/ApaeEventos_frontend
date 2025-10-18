import { useEffect } from "react";
import "text-encoding-polyfill";
import { apiClient } from "../src/infrastructure/api";

const App = () => {
    useEffect(() => {
        apiClient
            .get("/events")
            .then((response) => console.log("Eventos:", response.data))
            .catch((error) => console.error("Erro:", error));
    }, []);
};

export default App;
