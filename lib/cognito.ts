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
 * 🔐 Cadastro de novo usuário (opcionalmente com role)
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

  if (telefone) {
    attributes.push(
      new CognitoUserAttribute({ Name: "phone_number", Value: telefone })
    );
  }

  if (role) {
    attributes.push(
      new CognitoUserAttribute({ Name: "custom:role", Value: role })
    );
  }

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributes, [], (err, result) => {
      if (err) {
        console.error("❌ Erro ao registrar usuário:", err);
        reject(err);
      } else {
        console.log("✅ Usuário registrado:", result?.user?.getUsername());
        resolve(result);
      }
    });
  });
}

/**
 * 📨 Confirmação de cadastro via código de e-mail
 */
export function confirmSignUp(email: string, code: string) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err?: Error, result?: any) => {
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
        onSuccess: (session: CognitoUserSession) => {
          console.log("✅ Login bem-sucedido:", email);
          resolve({ session, user });
        },
        onFailure: (err) => {
          console.error("❌ Erro no login:", err);
          reject(err);
        },
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

    user.getSession((err?: Error, session?: CognitoUserSession | null) => {
      if (err || !session) return reject(err || "Sessão inválida.");

      user.getUserAttributes(
        (attrErr?: Error, attributes?: CognitoUserAttribute[]) => {
          if (attrErr) return reject(attrErr);

          const role =
            attributes?.find((a) => a.Name === "custom:role")?.Value ||
            "default";
          resolve(role);
        }
      );
    });
  });
}

/**
 * 🚪 Logout
 */
export function signOut(email: string) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  user.signOut();
  console.log("🚪 Logout realizado:", email);
}

/**
 * 👤 Sessão atual
 */
export function getCurrentUserSession(): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (!user) return reject("Nenhum usuário autenticado.");

    user.getSession((err?: Error, session?: CognitoUserSession | null) => {
      if (err) reject(err);
      else if (session) resolve(session);
      else reject("Sessão inválida.");
    });
  });
}

/**
 * 🧩 Token ID JWT (usado no backend Express)
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
 * 🔍 Retorna todos os atributos Cognito do usuário logado
 */
export function getCurrentUserAttributes(): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (!user) return reject("Nenhum usuário autenticado.");

    user.getSession((err?: Error, session?: CognitoUserSession | null) => {
      if (err || !session) return reject(err || "Sessão inválida.");

      user.getUserAttributes(
        (attrErr?: Error, attributes?: CognitoUserAttribute[]) => {
          if (attrErr) return reject(attrErr);

          const result: Record<string, string> = {};
          attributes?.forEach((a) => {
            result[a.Name] = a.Value;
          });
          resolve(result);
        }
      );
    });
  });
}
