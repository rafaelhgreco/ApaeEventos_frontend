import storage from "@react-native-firebase/storage";

/**
 * Sobe uma imagem pro Firebase Storage e retorna a URL pública
 * @param localPath Caminho local da imagem (ex: file://...)
 * @param fileName Nome do arquivo no Storage
 */
export const uploadBanner = async (
  localPath: string,
  fileName: string
): Promise<string> => {
  const ref = storage().ref(`banners/${fileName}`);
  await ref.putFile(localPath);
  const url = await ref.getDownloadURL();
  return url;
};
