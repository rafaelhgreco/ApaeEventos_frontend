# Maestro E2E Testing - ApaeEventos

## 🎯 Por que Maestro?

Maestro é muito mais simples que Detox:

-   ✅ **Zero configuração nativa** - Não precisa modificar código Android/iOS
-   ✅ **Instalação simples** - Um único comando
-   ✅ **Sintaxe YAML intuitiva** - Fácil de ler e escrever
-   ✅ **Funciona com qualquer app** - React Native, Flutter, nativo, etc.
-   ✅ **Não desinstala o app** - Mantém o estado entre testes
-   ✅ **Debugging visual** - Veja o teste sendo executado em tempo real

## 📦 Instalação

O Maestro já foi instalado! Se precisar reinstalar:

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

Adicione ao PATH (já feito, mas para referência):

```bash
export PATH="$PATH":"$HOME/.maestro/bin"
```

## 🚀 Como Usar

### 1. Certifique-se de que o app está rodando no emulador

```bash
# Verifique se o emulador está ativo
adb devices

# Se o app não estiver instalado, instale:
npm run android
```

### 2. Execute um teste específico

```bash
maestro test .maestro/basic_navigation.yaml
```

### 3. Execute todos os testes

```bash
maestro test .maestro/
```

### 4. Execute com Maestro Studio (interface visual)

```bash
maestro studio
```

Isso abre uma interface onde você pode:

-   Ver o estado atual do app
-   Criar testes interativamente
-   Debug testes existentes

## 📝 Estrutura dos Testes

Os testes ficam em `.maestro/` com arquivos YAML.

### Exemplo Básico:

```yaml
appId: com.anonymous.apaeeventos
---
- launchApp
- assertVisible: "Bem-vindo"
- tapOn: "Botão de Login"
- inputText: "email@example.com"
- tapOn: "Entrar"
- assertVisible: "Dashboard"
```

### Comandos Disponíveis:

```yaml
# Navegação e Ações
- launchApp # Abre o app
- tapOn: "Texto do Botão" # Toca em elemento por texto
- tapOn: # Toca em elemento por ID
      id: "botao-login"
- swipe: # Desliza
      direction: UP
- scroll # Rola a tela
- pressKey: Enter # Pressiona tecla

# Input
- inputText: "texto aqui" # Digita texto
- eraseText # Apaga texto

# Validações
- assertVisible: "Texto" # Verifica se está visível
- assertNotVisible: "Texto" # Verifica se NÃO está visível
- assertTrue: ${output.text == "OK"} # Validação condicional

# Espera
- waitForAnimationToEnd # Aguarda animação
- extendedWaitUntil: # Aguarda condição
      visible: "Elemento"
      timeout: 10000

# Controle de Fluxo
- runFlow: # Executa outro fluxo
      file: outro_teste.yaml
- repeat: # Repete ações
      times: 3
      commands:
          - tapOn: "Botão"
```

## 🧪 Exemplos de Testes

### Teste de Login

Crie `.maestro/login_flow.yaml`:

```yaml
appId: com.anonymous.apaeeventos
---
- launchApp
- tapOn: "Login"
- inputText: "usuario@example.com"
- tapOn: "Senha"
- inputText: "senha123"
- tapOn: "Entrar"
- assertVisible: "Bem-vindo"
```

### Teste de Navegação

Crie `.maestro/navigation_flow.yaml`:

```yaml
appId: com.anonymous.apaeeventos
---
- launchApp
- tapOn: "Eventos"
- assertVisible: "Lista de Eventos"
- tapOn: "Meus Ingressos"
- assertVisible: "Seus Ingressos"
- tapOn: "Perfil"
- assertVisible: "Configurações"
```

### Teste de Formulário

Crie `.maestro/create_event.yaml`:

```yaml
appId: com.anonymous.apaeeventos
---
- launchApp
- tapOn: "Novo Evento"
- inputText: "Show de Rock"
- tapOn: "Data"
- tapOn: "15" # Seleciona dia 15
- tapOn: "OK"
- tapOn: "Local"
- inputText: "Arena Central"
- tapOn: "Criar"
- assertVisible: "Evento criado com sucesso"
```

## 🔍 Debug e Inspeção

### Ver hierarquia de elementos:

```bash
maestro hierarchy
```

### Tirar screenshot:

```bash
maestro test .maestro/teste.yaml --screenshot
```

### Executar em modo verbose:

```bash
maestro test .maestro/teste.yaml --debug-output
```

## 📱 Testando em Múltiplos Dispositivos

### Android:

```bash
# Lista dispositivos
adb devices

# Executa em dispositivo específico
maestro --device emulator-5554 test .maestro/
```

### iOS:

```bash
# Lista simuladores
xcrun simctl list devices

# Executa em simulador específico
maestro --device "iPhone 15" test .maestro/
```

## 🎨 Melhores Práticas

### 1. Use IDs de teste quando possível

No seu código React Native:

```jsx
<TouchableOpacity testID="botao-login">
    <Text>Login</Text>
</TouchableOpacity>
```

No teste Maestro:

```yaml
- tapOn:
      id: "botao-login"
```

### 2. Crie fluxos reutilizáveis

```yaml
# .maestro/flows/login.yaml
appId: com.anonymous.apaeeventos
---
- launchApp
- tapOn: "Login"
- inputText: "${email}"
- tapOn: "Senha"
- inputText: "${password}"
- tapOn: "Entrar"
```

Use em outros testes:

```yaml
- runFlow:
      file: flows/login.yaml
      env:
          email: "teste@example.com"
          password: "senha123"
```

### 3. Use variáveis de ambiente

Crie `.maestro/.env`:

```
TEST_EMAIL=teste@example.com
TEST_PASSWORD=senha123
API_URL=http://localhost:3000
```

Use nos testes:

```yaml
- inputText: "${TEST_EMAIL}"
```

## 🚨 Troubleshooting

### Maestro não encontra o app:

```bash
# Verifique o appId correto
adb shell pm list packages | grep apae
```

### Elemento não encontrado:

Use `maestro studio` para inspecionar os elementos disponíveis.

### Teste muito lento:

Adicione `waitForAnimationToEnd: false` para pular animações.

## 📚 Recursos

-   [Documentação Maestro](https://maestro.mobile.dev/)
-   [Exemplos de Testes](https://github.com/mobile-dev-inc/maestro/tree/main/maestro-test)
-   [Comunidade Maestro](https://discord.gg/YptbC5jKh7)

## 🎯 Próximos Passos

1. ✅ Maestro instalado
2. ✅ Estrutura de testes criada
3. 📝 Adicione `testID` nos seus componentes React Native
4. 🧪 Crie testes para os fluxos principais do app
5. 🔄 Configure CI/CD para rodar os testes automaticamente
