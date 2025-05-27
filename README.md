
# Front-end Apae Eventos

Projeto Fatec Itapira 2025


## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app 
- Antes de iniciar o projeto é preciso configurar o grandle para subir o apk no emulador android;

- Inicie o emulador android pelo Device Manager

   ```bash
   npx expo run:android
   ```


## Build Grandle

1. Acessar o firebase e baixar o google-services.json;
2. Arquivo do Gradle no nível raiz (nível do projeto) (android/build.gradle.kts):
```bash
plugins {
  // ...

  // Add the dependency for the Google services Gradle plugin
  id("com.google.gms.google-services") version "4.4.2" apply false

}
```
Arquivo do Gradle do módulo (nível do app) (android/app/build.gradle.kts):
```bash
plugins {
  id("com.android.application")

  // Add the Google services Gradle plugin
  id("com.google.gms.google-services")

  ...
  }

dependencies {
  // Import the Firebase BoM
  implementation(platform("com.google.firebase:firebase-bom:33.14.0"))


  // TODO: Add the dependencies for Firebase products you want to use
  // When using the BoM, don't specify versions in Firebase dependencies
  // https://firebase.google.com/docs/android/setup#available-libraries
}
```
4. android/app -> coloque o arquivo google-services.json
5. android/local.settings -> defina o caminho do SDK android:
sdk.dir=

