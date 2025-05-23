import React, { useEffect } from "react";
import "text-encoding-polyfill";
import AppNavigator from "../routes/app_navigator";
import { apiClient } from "../src/infrastructure/api";

const App = () => {
    useEffect(() => {
        apiClient
            .get("/events")
            .then((response) => console.log("Eventos:", response.data))
            .catch((error) => console.error("Erro:", error));
    }, []);

    return <AppNavigator />;
};

export default App;
