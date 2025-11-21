// lib/cognito.ts
// eslint-disable-next-line import/no-unresolved
import { EXPO_PUBLIC_COGNITO_CLIENT_ID, EXPO_PUBLIC_COGNITO_USER_POOL_ID } from '@env';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

import { emitAuthChanged } from '@/lib/authEvents';

const poolData = {
  UserPoolId: EXPO_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: EXPO_PUBLIC_COGNITO_CLIENT_ID!,
};

export const userPool = new CognitoUserPool(poolData);

/* ======================================================
   🧑 Cadastro
====================================================== */
export function signUp(
  nome: string,
  email: string,
  password: string,
  telefone?: string,
  role?: string,
) {
  const attributes: CognitoUserAttribute[] = [
    new CognitoUserAttribute({ Name: 'name', Value: nome }),
    new CognitoUserAttribute({ Name: 'email', Value: email }),
  ];

  if (telefone) {
    attributes.push(new CognitoUserAttribute({ Name: 'phone_number', Value: telefone }));
  }

  if (role) {
    attributes.push(new CognitoUserAttribute({ Name: 'custom:role', Value: role }));
  }

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributes, [], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

/* ======================================================
   📧 Confirmar cadastro
====================================================== */
export function confirmSignUp(email: string, code: string) {
  const user = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err: Error | undefined, result?: unknown) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

/* ======================================================
   🔑 Login
====================================================== */
export function signIn(email: string, password: string) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  return new Promise<{ session: CognitoUserSession; user: CognitoUser }>((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (session: CognitoUserSession) => {
        emitAuthChanged();
        resolve({ session, user });
      },
      onFailure: (err: Error) => reject(err),
    });
  });
}

/* ======================================================
   🧠 Role (custom:role)
====================================================== */
export function getUserRole(): Promise<string> {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (!user) return reject('Nenhum usuário autenticado.');

    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session) return reject(err || 'Sessão inválida.');

      user.getUserAttributes((attrErr: Error | undefined, attributes?: CognitoUserAttribute[]) => {
        if (attrErr) return reject(attrErr);

        const role = attributes?.find((a) => a.Name === 'custom:role')?.Value || 'default';

        resolve(role);
      });
    });
  });
}

/* ======================================================
   🙋‍♂️ Nome (atributo "name")
====================================================== */
export function getUserName(): Promise<string | null> {
  return new Promise((resolve) => {
    const user = userPool.getCurrentUser();
    if (!user) return resolve(null);

    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session) return resolve(null);

      user.getUserAttributes((attrErr: Error | undefined, attributes?: CognitoUserAttribute[]) => {
        if (attrErr || !attributes) return resolve(null);

        const name = attributes.find((a) => a.Name === 'name')?.Value || null;

        resolve(name);
      });
    });
  });
}

/* ======================================================
   🚪 Logout
====================================================== */
export function signOut(email: string) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  user.signOut();
  emitAuthChanged();
}

/* ======================================================
   🔐 Sessão atual
====================================================== */
export function getCurrentUserSession(): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (!user) return reject('Nenhum usuário autenticado.');

    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session) reject(err || 'Sessão inválida.');
      else resolve(session);
    });
  });
}

/* ======================================================
   🔑 Tokens
====================================================== */
export async function getIdToken(): Promise<string> {
  const session = await getCurrentUserSession();
  return session.getIdToken().getJwtToken();
}

export async function getAccessToken(): Promise<string> {
  const session = await getCurrentUserSession();
  return session.getAccessToken().getJwtToken();
}

/* ======================================================
   📧 E-mail do usuário
====================================================== */
export const getCurrentUserEmail = async (): Promise<string | null> => {
  try {
    const user = userPool.getCurrentUser();
    if (!user) return null;

    return new Promise((resolve) => {
      user.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session) return resolve(null);

        const idToken = session.getIdToken().decodePayload();
        resolve(idToken.email || null);
      });
    });
  } catch {
    return null;
  }
};
