# Documentação dos Testes Automatizados (E2E)

Esta documentação descreve as suítes de testes automatizados implementadas no projeto utilizando o framework **Maestro**.

## 📋 Casos de Teste: Cadastro de Conta

| Identificador do caso de uso | Nome do caso de uso              | Descrição                                                                                     |
| :--------------------------- | :------------------------------- | :-------------------------------------------------------------------------------------------- |
| **UC-02.1**                  | **Caso 1: Campos vazios**        | Tentar criar conta sem preencher nenhum campo obrigatório.                                    |
| **UC-02.2**                  | **Caso 2: Sem Email**            | Tentar criar conta preenchendo nome e senha, mas deixando o email vazio.                      |
| **UC-02.3**                  | **Caso 3: Senha Fraca**          | Tentar criar conta com uma senha curta (menos de 6 caracteres).                               |
| **UC-02.4**                  | **Caso 4: Cadastro com Sucesso** | Preencher todos os dados corretamente (Happy Path) e verificar o redirecionamento para login. |

```mermaid
flowchart LR
    Start([Tela Cadastro]) --> Form[Preencher Form]
    Form --> Submit{Validar?}
    Submit -->|Erro/Vazio| Alert[Alerta de Erro]
    Alert --> Retry[Corrigir Dados]
    Submit -->|Sucesso| Created[Conta Criada]
    Created --> Login[Redirecionar p/ Login]

    classDef success fill:#90EE90,stroke:#2E7D32,stroke-width:2px
    classDef error fill:#FFB6C1,stroke:#C62828,stroke-width:2px
    class Created,Login success
    class Alert error
```

## 📋 Casos de Teste: Fluxo de Compra

| Identificador do caso de uso | Nome do caso de uso           | Descrição                                                                                                           |
| :--------------------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **UC-04.1**                  | **Seleção de Evento**         | Logar, selecionar um evento na lista e iniciar o processo de compra.                                                |
| **UC-04.2**                  | **Cancelamento de Pagamento** | Prosseguir para o pagamento, abrir o checkout (Stripe) e cancelar a operação, verificando o alerta de cancelamento. |

```mermaid
flowchart LR
    Start([Home]) --> Select[Selecionar Evento]
    Select --> Details[Detalhes Evento]
    Details --> Buy[Comprar Ingressos]
    Buy --> Payment[Tela Pagamento]
    Payment --> Stripe[Checkout Stripe]
    Stripe -->|Cancelar| Alert[Alerta Cancelado]
    Alert --> Payment

    classDef process fill:#4FC3F7,stroke:#0288D1,stroke-width:2px
    classDef warning fill:#FFB6C1,stroke:#C62828,stroke-width:2px
    class Select,Details,Buy,Payment,Stripe process
    class Alert warning
```

## 📋 Casos de Teste: Criação de Evento (Admin)

| Identificador do caso de uso | Nome do caso de uso       | Descrição                                                                                       |
| :--------------------------- | :------------------------ | :---------------------------------------------------------------------------------------------- |
| **UC-03.1**                  | **Acesso Administrativo** | Realizar login com credenciais de administrador e validar acesso ao painel de gestão.           |
| **UC-03.2**                  | **Cadastro de Evento**    | Preencher formulário de novo evento (Nome, Local, Capacidade, Preço) e submeter.                |
| **UC-03.3**                  | **Validação de Sucesso**  | Verificar mensagem de sucesso após cadastro e retorno automático para a lista de gerenciamento. |

```mermaid
flowchart LR
    Start([Login Admin]) --> Dashboard[Painel Gestão]
    Dashboard --> Create[Botão Cadastrar]
    Create --> Form[Preencher Dados]
    Form --> Submit{Salvar}
    Submit -->|Sucesso| Alert[Alerta Sucesso]
    Alert --> Dashboard

    classDef admin fill:#FFD54F,stroke:#F57F17,stroke-width:2px
    classDef action fill:#FFF176,stroke:#FBC02D,stroke-width:2px
    class Start,Dashboard,Alert admin
    class Create,Form,Submit action
```
