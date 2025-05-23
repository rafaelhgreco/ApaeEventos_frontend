// src/config/env.ts
type Environment = {
    API_BASE_URL: string;
};

// Configurações para desenvolvimento
export const env: Environment = {
    API_BASE_URL: "http://localhost:3000/api",
};

// Configurações para produção
// const production: Environment = {
//     API_BASE_URL: "https://api.seuapp.com/v1",
// };

// // Seleção automática do ambiente
// const getEnv = (): Environment => {
//     if (__DEV__) {
//         return development;
//     }
//     return production;
// };

// export const env = getEnv();
