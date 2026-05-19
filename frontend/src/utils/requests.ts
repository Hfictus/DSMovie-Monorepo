//Variável de ambiente customizada, para implantar no Netlify: VITE_BACKEND_URL

// Variável de ambiente customizada que será configurada no servidor para apontar para o Backend.
export const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";