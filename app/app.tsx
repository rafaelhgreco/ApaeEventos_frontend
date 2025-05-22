import React, { useEffect } from "react";
import "text-encoding-polyfill";
import apiClient from "../mocks/api_client";
import AppNavigator from "../routes/app_navigator";

const App = () => {
    useEffect(() => {
        // Exemplo de chamada
        apiClient
            .get("/events")
            .then((response) => console.log("Eventos:", response.data))
            .catch((error) => console.error("Erro:", error));
    }, []);

    return <AppNavigator />;
};

export default App;
