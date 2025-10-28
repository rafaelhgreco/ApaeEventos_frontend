import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import Constants from "expo-constants";

const { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } = Constants.manifest.extra;

// 🧩 Configuração do Pool
const poolData = {
  UserPoolId: COGNITO_USER_POOL_ID,
  ClientId: COGNITO_CLIENT_ID,
};

export const userPool = new CognitoUserPool(poolData);

// 🔐 REGISTRO de usuário (para tela pública ou admin)
export function signUp(
  nome: string,
  email: string,
  password: string,
  telefone?: string
): Promise<any> {
  const attributeList = [
    new CognitoUserAttribute({ Name: "name", Value: nome }),
    new CognitoUserAttribute({ Name: "email", Value: email }),
  ];

  if (telefone) {
    attributeList.push(
      new CognitoUserAttribute({ Name: "phone_number", Value: telefone })
    );
  }

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.error("Erro ao registrar usuário:", err);
        reject(err);
      } else {
        console.log(
          "Usuário registrado com sucesso:",
          result?.user?.getUsername()
        );
        resolve(result);
      }
    });
  });
}

// ✅ CONFIRMAÇÃO de cadastro (verifica o código enviado por e-mail)
export function confirmSignUp(email: string, code: string): Promise<string> {
  const user = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.error("Erro ao confirmar cadastro:", err);
        reject(err);
      } else {
        console.log("Cadastro confirmado com sucesso:", result);
        resolve(result);
      }
    });
  });
}

// 🔐 LOGIN de usuário
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
        console.log("Login bem-sucedido para:", email);
        resolve({ session, user });
      },
      onFailure: (err) => {
        console.error("Erro no login:", err);
        reject(err);
      },
    });
  });
}

// 🔓 LOGOUT
export function signOut(email: string) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  user.signOut();
  console.log("Logout realizado para:", email);
}

// 👤 Verifica se há um usuário logado atualmente
export function getCurrentUserSession(): Promise<any> {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (!user) {
      reject("Nenhum usuário autenticado.");
      return;
    }

    user.getSession((err: any, session: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  });
}

// Debug opcional
console.log("✅ Cognito UserPool configurado:");
console.log("UserPoolId:", COGNITO_USER_POOL_ID);
console.log("ClientId:", COGNITO_CLIENT_ID);
