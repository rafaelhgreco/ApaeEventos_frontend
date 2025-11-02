import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
} from "amazon-cognito-identity-js";
import Constants from "expo-constants";

const { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } = Constants.manifest.extra;

// 🧩 Configuração do User Pool
const poolData = {
    UserPoolId: COGNITO_USER_POOL_ID,
    ClientId: COGNITO_CLIENT_ID,
};

export const userPool = new CognitoUserPool(poolData);

/**
 * 🔐 REGISTRO de usuário (público ou administrativo)
 */
export function signUp(
    nome: string,
    email: string,
    password: string,
    telefone?: string,
    role?: string
): Promise<any> {
    const attributeList = [
        new CognitoUserAttribute({ Name: "name", Value: nome }),
        new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    // 🔢 Telefone obrigatório no schema do Cognito
    if (telefone) {
        attributeList.push(
            new CognitoUserAttribute({ Name: "phone_number", Value: telefone })
        );
    } else {
        console.warn(
            "⚠️ Telefone ausente — phone_number é obrigatório no Cognito!"
        );
    }

    // 👥 Atributo customizado (opcional)
    if (role) {
        attributeList.push(
            new CognitoUserAttribute({ Name: "custom:role", Value: role })
        );
    }

    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributeList, [], (err, result) => {
            if (err) {
                console.error("❌ Erro ao registrar usuário:", err);
                reject(err);
            } else {
                console.log(
                    "✅ Usuário registrado com sucesso:",
                    result?.user?.getUsername()
                );
                resolve(result);
            }
        });
    });
}

/**
 * ✅ Confirmação do código enviado por e-mail
 */
export function confirmSignUp(email: string, code: string): Promise<string> {
    const user = new CognitoUser({ Username: email, Pool: userPool });

    return new Promise((resolve, reject) => {
        user.confirmRegistration(code, true, (err, result) => {
            if (err) {
                console.error("❌ Erro ao confirmar cadastro:", err);
                reject(err);
            } else {
                console.log("✅ Cadastro confirmado com sucesso:", result);
                resolve(result);
            }
        });
    });
}

/**
 * 🔐 Login de usuário
 */
export function signIn(
    email: string,
    password: string
): Promise<{ session: any; user: CognitoUser }> {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
    });

    return new Promise((resolve, reject) => {
        user.authenticateUser(authDetails, {
            onSuccess: (session) => {
                console.log("✅ Login bem-sucedido para:", email);
                resolve({ session, user });
            },
            onFailure: (err) => {
                console.error("❌ Erro no login:", err);
                reject(err);
            },
        });
    });
}

/**
 * 🧠 Obtém a role (custom:role) do usuário logado
 */
export function getUserRole(): Promise<string> {
    return new Promise((resolve, reject) => {
        const user = userPool.getCurrentUser();
        if (!user) {
            reject("Nenhum usuário autenticado.");
            return;
        }

        user.getSession((err: any) => {
            if (err) {
                reject(err);
                return;
            }

            user.getUserAttributes((attrErr, attributes) => {
                if (attrErr) {
                    reject(attrErr);
                } else {
                    const roleAttr = attributes?.find(
                        (a) => a.Name === "custom:role"
                    )?.Value;
                    resolve(roleAttr || "default");
                }
            });
        });
    });
}

/**
 * 🔓 Logout manual
 */
export function signOut(email: string) {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    user.signOut();
    console.log("🚪 Logout realizado para:", email);
}

/**
 * 👤 Sessão atual
 */
export function getCurrentUserSession(): Promise<CognitoUserSession> {
    return new Promise((resolve, reject) => {
        const user = userPool.getCurrentUser();
        if (!user) {
            reject("Nenhum usuário autenticado.");
            return;
        }

        user.getSession((err: any, session: CognitoUserSession | null) => {
            if (err) {
                console.error("❌ Erro ao obter sessão:", err);
                reject(err);
            } else if (session) {
                resolve(session);
            } else {
                reject("Sessão inválida.");
            }
        });
    });
}

/**
 * 🔑 Obtém o ID Token JWT (recomendado para APIs)
 */
export async function getIdToken(): Promise<string> {
    try {
        const session = await getCurrentUserSession();
        return session.getIdToken().getJwtToken();
    } catch (error) {
        console.error("❌ Erro ao obter ID Token:", error);
        throw error;
    }
}

/**
 * 🔑 Obtém o Access Token JWT
 */
export async function getAccessToken(): Promise<string> {
    try {
        const session = await getCurrentUserSession();
        return session.getAccessToken().getJwtToken();
    } catch (error) {
        console.error("❌ Erro ao obter Access Token:", error);
        throw error;
    }
}

/**
 * 🧠 Retorna todos os atributos do usuário autenticado
 */
export function getCurrentUserAttributes(): Promise<Record<string, string>> {
    return new Promise((resolve, reject) => {
        const user = userPool.getCurrentUser();
        if (!user) {
            reject("Nenhum usuário autenticado.");
            return;
        }

        user.getSession((err: any) => {
            if (err) {
                reject(err);
            } else {
                user.getUserAttributes((attrErr, attributes) => {
                    if (attrErr) {
                        reject(attrErr);
                    } else {
                        const result: Record<string, string> = {};
                        attributes?.forEach((a) => {
                            result[a.Name] = a.Value;
                        });
                        resolve(result);
                    }
                });
            }
        });
    });
}
