import {
  EXPO_PUBLIC_COGNITO_CLIENT_ID,
  EXPO_PUBLIC_COGNITO_USER_POOL_ID,
// eslint-disable-next-line import/no-unresolved
} from "@env";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

// ⚙️ Configuração do User Pool
const poolData = {
  UserPoolId: EXPO_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: EXPO_PUBLIC_COGNITO_CLIENT_ID!,
};

export const userPool = new CognitoUserPool(poolData);

/**
 * 🔐 Cadastro de novo usuário
 */
export function signUp(
  nome: string,
  email: string,
  password: string,
  telefone?: string,
  role?: string
) {
  const attributes = [
    new CognitoUserAttribute({ Name: "name", Value: nome }),
    new CognitoUserAttribute({ Name: "email", Value: email }),
  ];

  if (telefone)
    attributes.push(
      new CognitoUserAttribute({ Name: "phone_number", Value: telefone })
    );
  if (role)
    attributes.push(
      new CognitoUserAttribute({ Name: "custom:role", Value: role })
    );

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributes, [], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

/**
 * 📨 Confirmação de cadastro via código
 */
export function confirmSignUp(email: string, code: string) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err?: Error, result?: unknown) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

/**
 * 🔑 Login de usuário
 */
export function signIn(email: string, password: string) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise<{ session: CognitoUserSession; user: CognitoUser }>(
    (resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (session: CognitoUserSession) => resolve({ session, user }),
        onFailure: (err: Error) => reject(err),
      });
    }
  );
}

/**
 * 🧠 Obtém a role (custom:role) do usuário logado
 */
export function getUserRole(): Promise<string> {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (!user) return reject("Nenhum usuário autenticado.");

    user.getSession(
      (err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session) return reject(err || "Sessão inválida.");

        user.getUserAttributes(
          (attrErr: Error | undefined, attributes?: CognitoUserAttribute[]) => {
            if (attrErr) return reject(attrErr);
            const role =
              attributes?.find((a) => a.Name === "custom:role")?.Value ||
              "default";
            resolve(role);
          }
        );
      }
    );
  });
}

/**
 * 🚪 Logout
 */
export function signOut(email: string) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  user.signOut();
}

/**
 * 👤 Sessão atual
 */
export function getCurrentUserSession(): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (!user) return reject("Nenhum usuário autenticado.");

    user.getSession(
      (err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session) reject(err || "Sessão inválida.");
        else resolve(session);
      }
    );
  });
}

/**
 * 🧩 Token ID JWT
 */
export async function getIdToken(): Promise<string> {
  const session = await getCurrentUserSession();
  return session.getIdToken().getJwtToken();
}

/**
 * 🧩 Access Token JWT
 */
export async function getAccessToken(): Promise<string> {
  const session = await getCurrentUserSession();
  return session.getAccessToken().getJwtToken();
}

/**
 * 📧 Retorna o e-mail do usuário autenticado
 */
export const getCurrentUserEmail = async (): Promise<string | null> => {
  try {
    const user = userPool.getCurrentUser();
    if (!user) return null;

    return new Promise((resolve, reject) => {
      user.getSession(
        (err: Error | null, session: CognitoUserSession | null) => {
          if (err || !session) return resolve(null);
          const idToken = session.getIdToken().decodePayload();
          resolve(idToken.email || null);
        }
      );
    });
  } catch (error) {
    console.error("❌ Erro ao obter e-mail do usuário:", error);
    return null;
  }
};
