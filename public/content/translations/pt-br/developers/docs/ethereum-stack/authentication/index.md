---
title: Autenticação no Ethereum
description: Aprenda como a autenticação de usuários funciona em aplicativos Ethereum — sem senhas, apenas carteiras e assinaturas.
lang: pt-br
---

Se você vem do desenvolvimento web tradicional, está acostumado com login por nome de usuário/senha, fluxos OAuth e cookies de sessão. A autenticação no Ethereum funciona de maneira diferente — e, de muitas formas, mais simples.

No Ethereum, um usuário prova sua identidade **assinando uma mensagem com sua carteira**. Nenhuma senha para armazenar. Nenhum banco de dados de credenciais para vazar. Apenas criptografia.

## Como é diferente da Web2? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Nome de usuário + senha               | Endereço da carteira + assinatura                       |
| Servidor armazena credenciais         | Usuário detém a chave privada                           |
| Sessões gerenciadas por cookies / JWT | Sessões começam com uma assinatura de carteira offchain |
| "Entrar com o Google"             | "Entrar com o Ethereum"                          |
| Fluxos de redefinição de senha              | Recuperação por frase semente                             |

A mudança fundamental: na Web2, um servidor centralizado autentica você. No Ethereum, **você autentica a si mesmo** provando que controla um endereço específico — e qualquer pessoa pode verificá-lo de forma independente.

## Pré-requisitos {#prerequisites}

Certifique-se de que você entende:

- [Contas Ethereum e como elas funcionam](/developers/docs/accounts/)
- [O que é uma carteira e como conectar uma](/wallets/)
- [Noções básicas de criptografia de chave pública e privada](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Como funciona a autenticação baseada em carteira {#how-wallet-auth-works}

O fluxo principal é simples:

1. **Seu aplicativo descentralizado (dapp) pede ao usuário para conectar sua carteira** (via MetaMask, Rainbow, WalletConnect, etc.)
2. **A carteira compartilha o endereço Ethereum do usuário** - este é o seu identificador público
3. **Seu dapp gera uma mensagem única** (um nonce ou desafio)
4. **O usuário assina a mensagem** com sua chave privada (ocorre dentro da carteira)
5. **Seu backend verifica a assinatura** em relação ao endereço reivindicado
6. **Se for válida, o usuário é autenticado**

Nenhuma senha foi digitada, armazenada ou transmitida.

## Entrar com o Ethereum (EIP-4361) {#sign-in-with-ethereum}

A [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) define um formato de mensagem padrão para login no Ethereum, comumente chamado de **SIWE** (Sign-In with Ethereum). Ela substitui a assinatura de mensagens ad-hoc por um padrão estruturado e seguro.

Uma mensagem SIWE se parece com isto:

```yaml
example.com wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

Principais recursos do SIWE:

- **Vinculação de domínio** - a mensagem inclui o domínio, prevenindo phishing
- **ID da cadeia (Chain ID)** - especifica para qual rede a assinatura é válida
- **Nonce** - previne ataques de repetição (replay attacks)
- **Expiração** - carimbo de data/hora (timestamp) opcional que limita a janela de validade
- **Recursos** - URIs opcionais para acesso com escopo

### Bibliotecas SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Implementação oficial em TypeScript pela Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Implementação em Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Implementação em Go

### Exemplo: login no lado do cliente com siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Obtenha um nonce do seu backend
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Crie e assine a mensagem SIWE
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to My Dapp',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce,
  })

  const signature = await signer.signMessage(message.prepareMessage())

  // 3. Envie para o backend para verificação
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Exemplo: verificação no lado do servidor (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Emita um nonce e armazene-o na sessão para que /verify possa verificá-lo mais tarde
app.get('/api/auth/nonce', (req, res) => {
  req.session.nonce = generateNonce()
  res.json({ nonce: req.session.nonce })
})

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    })

    if (success) {
      // data.address é o endereço Ethereum verificado
      // Crie uma sessão ou JWT para o usuário
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Bibliotecas de conexão de carteira {#wallet-connection-libraries}

Antes de autenticar, você precisa que o usuário conecte sua carteira. Estas bibliotecas facilitam isso:

- **[RainbowKit](https://www.rainbowkit.com/)** - Componente React pronto para uso com uma bela interface de usuário
- **[ConnectKit](https://docs.family.co/connectkit)** - Modal de conexão de carteira pronto para integração (drop-in)
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - Conexão de carteira multicadeia com SIWE integrado
- **[Wagmi](https://wagmi.sh)** - Biblioteca de React Hooks com `useAccount`, `useConnect`

## Verificando assinaturas manualmente {#verifying-manually}

Se você preferir não usar o SIWE, pode verificar as assinaturas diretamente:

```ts
import { verifyMessage } from 'ethers'

// A mensagem que o usuário assinou
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Recupere o endereço do signatário a partir da assinatura
const recoveredAddress = verifyMessage(message, signature)

// Compare com o endereço reivindicado
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Autenticação bem-sucedida
}
```

### Notas importantes de segurança {#security-notes}

- **Sempre use um nonce** - previne ataques de repetição onde uma assinatura antiga é reutilizada
- **Inclua o domínio** - impede que as assinaturas sejam válidas em sites diferentes
- **Verifique a expiração** - as assinaturas devem ter uma janela de validade limitada
- **Use SIWE (EIP-4361) quando possível** - ele lida com tudo isso para você
- **Nunca exponha chaves privadas** - a assinatura ocorre dentro da carteira; seu aplicativo vê apenas o resultado

## Gerenciamento de sessão {#session-management}

Uma vez autenticado, você ainda precisa de sessões — assim como na Web2. Padrões comuns:

- **Tokens JWT** - emita um JWT após verificar a assinatura, use para solicitações de API
- **Sessões no lado do servidor** - armazene o endereço verificado em um cookie de sessão
- **SIWE com recursos** - defina tokens de acesso com escopo vinculados a URIs específicos

A principal diferença da Web2: o endereço Ethereum do usuário é sua identidade persistente. Eles podem usá-lo em qualquer dapp sem criar uma nova conta.

## Identidade descentralizada {#decentralized-identity}

A autenticação no Ethereum faz parte de um movimento mais amplo em direção à **identidade autossuficiente (self-sovereign identity)**. Padrões e projetos neste espaço incluem:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - Nomes legíveis por humanos (ex., `vitalik.eth`) que resolvem para endereços
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - Atestações onchain sobre identidade e credenciais
- **[W3C Decentralized Identifiers (DIDs)](https://www.w3.org/TR/did-core/)** - Padrão global para identidade descentralizada verificável
- **[Ceramic Network](https://ceramic.network/)** - Fluxos de dados descentralizados vinculados a uma identidade descentralizada (DID)

## Leitura adicional {#further-reading}

- [EIP-4361: Entrar com o Ethereum](https://eips.ethereum.org/EIPS/eip-4361)
- [Documentação do SIWE](https://docs.login.xyz/)
- [Entrar com o Ethereum no Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Documentação de autenticação do Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Documentação do ENS](https://docs.ens.domains/)

## Tópicos relacionados {#related-topics}

- [Contas Ethereum](/developers/docs/accounts/)
- [Bibliotecas de API JavaScript](/developers/docs/apis/javascript/)
- [Bibliotecas de API de backend](/developers/docs/apis/backend/)
- [Carteiras](/wallets/)