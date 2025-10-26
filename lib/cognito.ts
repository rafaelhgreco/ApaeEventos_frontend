import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import Constants from "expo-constants";

const { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } = Constants.manifest.extra;

// Configuração do Pool
const poolData = {
  UserPoolId: COGNITO_USER_POOL_ID,
  ClientId: COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

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
        reject(err);
      } else {
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
        resolve({ session, user });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

// 🔓 LOGOUT
export function signOut(email: string) {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  user.signOut();
}

console.log("UserPool:", COGNITO_USER_POOL_ID);
console.log("ClientId:", COGNITO_CLIENT_ID);
