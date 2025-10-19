# Front-end Apae Eventos

Projeto Fatec Itapira 2025

## Get started

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app

-   Antes de iniciar o projeto é preciso configurar o grandle para subir o apk no emulador android;

-   Inicie o emulador android pelo Device Manager

    ```bash
    npx expo run:android

    npx react-native start --reset-cache
    ```

### 5. Gerar o APK ou AAB

#### Para gerar APK (instalação direta):

```bash
cd android
./gradlew assembleRelease
```

O APK será gerado em: `android/app/build/outputs/apk/release/app-release.apk`

#### Para gerar AAB (Google Play Store):

```bash
cd android
./gradlew bundleRelease
```

O AAB será gerado em: `android/app/build/outputs/bundle/release/app-release.aab`

---

### 6. Instalar APK no dispositivo (opcional)

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

---

## Scripts úteis para package.json

Adicione ao seu `package.json` para facilitar os builds:

```json
{
    "scripts": {
        "android": "expo run:android",
        "android:build": "cd android && ./gradlew assembleRelease",
        "android:bundle": "cd android && ./gradlew bundleRelease",
        "android:clean": "cd android && ./gradlew clean",
        "android:install": "adb install android/app/build/outputs/apk/release/app-release.apk"
    }
}
```

Agora você pode executar:

```bash
npm run android:build   # Gera APK
npm run android:bundle  # Gera AAB
npm run android:clean   # Limpa build anterior
npm run android:install # Instala APK no dispositivo
```

---

## Troubleshooting

### Erro: "SDK location not found"

Crie o arquivo `android/local.properties` com:

```properties
sdk.dir=/caminho/para/seu/Android/sdk
```

No Linux/Mac geralmente é: `/Users/seu-usuario/Library/Android/sdk`  
No Windows geralmente é: `C:\\Users\\seu-usuario\\AppData\\Local\\Android\\Sdk`

### Erro: "Java version incompatible"

Verifique sua versão do Java:

```bash
java -version
```

Se necessário, instale o Java 17:

```bash
# Linux (Ubuntu/Debian)
sudo apt install openjdk-17-jdk

# macOS (Homebrew)
brew install openjdk@17

# Windows
# Baixe do site oficial da Oracle ou use o Adoptium
```

### Limpar cache e rebuild

```bash
cd android
./gradlew clean
cd ..
rm -rf android/app/build
npm run android:build
```

---

## Arquivos importantes para .gitignore

Adicione ao seu `.gitignore`:

```gitignore
# Keystore
*.keystore
*.jks

# Gradle properties com senhas
android/gradle.properties

# Builds
android/app/build/
android/.gradle/
```

---

## Checklist Final

-   [ ] Java 17+ instalado
-   [ ] `npx expo prebuild` executado
-   [ ] Keystore gerado e guardado em local seguro
-   [ ] `gradle.properties` configurado
-   [ ] `build.gradle` configurado com signingConfigs
-   [ ] APK/AAB gerado com sucesso
-   [ ] Keystore e senhas **não** commitados no Git

---
