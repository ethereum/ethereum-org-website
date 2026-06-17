---
title: Usando o Ethereum para autenticação na Web2
description: Após ler este tutorial, um desenvolvedor será capaz de integrar o login do Ethereum (web3) com o login SAML, um padrão usado na Web2 para fornecer logon único (single sign-on) e outros serviços relacionados. Isso permite que o acesso a recursos da Web2 seja autenticado por meio de assinaturas do Ethereum, com os atributos do usuário provenientes de atestações.
author: Ori Pomerantz
tags: ["web2", "autenticação", "eas"]
skill: beginner
breadcrumb: Ethereum para autenticação na Web2
lang: pt-br
published: 2025-04-30
---

## Introdução {#introduction}

[SAML](https://www.onelogin.com/learn/saml) é um padrão usado na Web2 para permitir que um [provedor de identidade (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) forneça informações de usuário para [provedores de serviços (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML).

Neste tutorial, você aprenderá como integrar assinaturas do Ethereum com SAML para permitir que os usuários usem suas carteiras Ethereum para se autenticarem em serviços da Web2 que ainda não suportam o Ethereum nativamente.

Observe que este tutorial foi escrito para dois públicos distintos:

- Pessoas do Ethereum que entendem de Ethereum e precisam aprender SAML
- Pessoas da Web2 que entendem de SAML e autenticação na Web2 e precisam aprender Ethereum

Como resultado, ele conterá muito material introdutório que você já conhece. Sinta-se à vontade para pulá-lo.

### SAML para pessoas do Ethereum {#saml-for-ethereum-people}

SAML é um protocolo centralizado. Um provedor de serviços (SP) só aceita asserções (como "este é meu usuário John, ele deve ter permissões para fazer A, B e C") de um provedor de identidade (IdP) se tiver uma relação de confiança pré-existente com ele ou com a [autoridade de certificação](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) que assinou o certificado desse IdP.

Por exemplo, o SP pode ser uma agência de viagens que fornece serviços de viagens para empresas, e o IdP pode ser o site interno de uma empresa. Quando os funcionários precisam reservar viagens de negócios, a agência de viagens os envia para autenticação pela empresa antes de permitir que eles realmente reservem a viagem.

![Step by step SAML process](./fig-01-saml.png)

Esta é a maneira como as três entidades, o navegador, o SP e o IdP, negociam o acesso. O SP não precisa saber nada sobre o usuário que está usando o navegador com antecedência, apenas confiar no IdP.

### Ethereum para pessoas de SAML {#ethereum-for-saml-people}

O Ethereum é um sistema descentralizado. 

![Ethereum logon](./fig-02-eth-logon.png)

Os usuários têm uma chave privada (normalmente mantida em uma extensão de navegador). A partir da chave privada, você pode derivar uma chave pública e, a partir dela, um endereço de 20 bytes. Quando os usuários precisam fazer login em um sistema, é solicitado que assinem uma mensagem com um nonce (um valor de uso único). O servidor pode verificar se a assinatura foi criada por esse endereço.

![Getting extra data from attestations](./fig-03-eas-data.png)

A assinatura verifica apenas o endereço Ethereum. Para obter outros atributos do usuário, você normalmente usa [atestações](https://attest.org/). Uma atestação normalmente tem estes campos:

- **Atestador (Attestor)**, o endereço que fez a atestação
- **Destinatário (Recipient)**, o endereço ao qual a atestação se aplica
- **Dados (Data)**, os dados sendo atestados, como nome, permissões, etc.
- **Esquema (Schema)**, o ID do esquema usado para interpretar os dados.

Devido à natureza descentralizada do Ethereum, qualquer usuário pode fazer atestações. A identidade do atestador é importante para identificar quais atestações consideramos confiáveis.

## Configuração {#setup}

O primeiro passo é ter um SP SAML e um IdP SAML se comunicando entre si.

1. Baixe o software. O software de exemplo para este artigo está [no GitHub](https://github.com/qbzzt/250420-saml-ethereum). Diferentes estágios são armazenados em diferentes branches; para este estágio, você vai querer a `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Crie chaves com certificados autoassinados. Isso significa que a chave é sua própria autoridade de certificação e precisa ser importada manualmente para o provedor de serviços. Consulte [a documentação do OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) para obter mais informações. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Inicie os servidores (tanto o SP quanto o IdP)

    ```sh
    pnpm start
    ```

4. Navegue até o SP na URL [http://localhost:3000/](http://localhost:3000/) e clique no botão para ser redirecionado ao IdP (porta 3001).

5. Forneça ao IdP o seu endereço de e-mail e clique em **Login to the service provider**. Veja que você é redirecionado de volta ao provedor de serviços (porta 3000) e que ele o reconhece pelo seu endereço de e-mail.

### Explicação detalhada {#detailed-explanation}

Isto é o que acontece, passo a passo:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Este arquivo contém a configuração tanto para o Provedor de Identidade quanto para o Provedor de Serviços. Normalmente, essas duas seriam entidades diferentes, mas aqui podemos compartilhar o código por simplicidade.

```typescript
const fs = await import("fs")

const protocol="http"
```

Por enquanto estamos apenas testando, então não há problema em usar HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Leia as chaves públicas, que normalmente estão disponíveis para ambos os componentes (e são confiáveis diretamente ou assinadas por uma autoridade de certificação confiável).

```typescript
export const spPort = 3000
export const spHostname = "localhost"
export const spDir = "sp"

export const idpPort = 3001
export const idpHostname = "localhost"
export const idpDir = "idp"

export const spUrl = `${protocol}://${spHostname}:${spPort}/${spDir}`
export const idpUrl = `${protocol}://${idpHostname}:${idpPort}/${idpDir}`
```

As URLs para ambos os componentes.

```typescript
export const spPublicData = {
```

Os dados públicos para o provedor de serviços.

```typescript
    entityID: `${spUrl}/metadata`,
```

Por convenção, no SAML o `entityID` é a URL onde os metadados da entidade estão disponíveis. Esses metadados correspondem aos dados públicos aqui, exceto que estão no formato XML.

```typescript
    wantAssertionsSigned: true,
    authnRequestsSigned: false,
    signingCert: spCert,
    allowCreate: true,
    assertionConsumerService: [{
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        Location: `${spUrl}/assertion`,
    }]
  }
```

A definição mais importante para nossos propósitos é o `assertionConsumerServer`. Isso significa que para fazer uma asserção de algo (por exemplo, "o usuário que lhe envia esta informação é alguem@exemplo.com") para o provedor de serviços, precisamos usar o [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) para a URL `http://localhost:3000/sp/assertion`.

```typescript
export const idpPublicData = {
    entityID: `${idpUrl}/metadata`,
    signingCert: idpCert,
    wantAuthnRequestsSigned: false,
    singleSignOnService: [{
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/login`
    }],
    singleLogoutService: [{
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/logout`
    }],
  }
```

Os dados públicos para o provedor de identidade são semelhantes. Eles especificam que para fazer o login de um usuário você faz um POST para `http://localhost:3001/idp/login` e para fazer o logout de um usuário você faz um POST para `http://localhost:3001/idp/logout`.

#### src/sp.mts {#srcspmts}

Este é o código que implementa um provedor de serviços.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Usamos a biblioteca [`samlify`](https://www.npmjs.com/package/samlify) para implementar o SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

A biblioteca `samlify` espera ter um pacote para validar se o XML está correto, assinado com a chave pública esperada, etc. Usamos o [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) para esse propósito.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Um [`Router`](https://expressjs.com/en/5x/api.html#router) do [`express`](https://expressjs.com/) é um "mini site" que pode ser montado dentro de um site. Neste caso, nós o usamos para agrupar todas as definições do provedor de serviços.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

A própria representação do provedor de serviços de si mesmo são todos os dados públicos e a chave privada que ele usa para assinar informações.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Os dados públicos contêm tudo o que o provedor de serviços precisa saber sobre o provedor de identidade.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Para permitir a interoperabilidade com outros componentes SAML, os provedores de serviços e de identidade devem ter seus dados públicos (chamados de metadados) disponíveis no formato XML em `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Esta é a página acessada pelo navegador para se identificar. A asserção inclui o identificador do usuário (aqui usamos o endereço de e-mail) e pode incluir atributos adicionais. Este é o manipulador (handler) para o passo 7 no diagrama de sequência acima.

```typescript
  async (req, res) => {
    // console.log(`Resposta SAML:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Você pode usar o comando comentado para ver os dados XML fornecidos na asserção. Ele é [codificado em base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Analise a solicitação de login do servidor de identidade.

```typescript
      res.send(`
        <html>
          <body>
            <h2>Hello ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

Envie uma resposta HTML, apenas para mostrar ao usuário que recebemos o login.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Informe o usuário em caso de falha.

```typescript
spRouter.get('/login',
```

Crie uma solicitação de login quando o navegador tentar obter esta página. Este é o manipulador para o passo 1 no diagrama de sequência acima.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Obtenha as informações para postar uma solicitação de login.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Esta página envia o formulário (veja abaixo) automaticamente. Dessa forma, o usuário não precisa fazer nada para ser redirecionado. Este é o passo 2 no diagrama de sequência acima.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Faça um POST para `loginRequest.entityEndpoint` (a URL do endpoint do provedor de identidade).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

O nome da entrada é `loginRequest.type` (`SAMLRequest`). O conteúdo para esse campo é `loginRequest.context`, que é novamente um XML codificado em base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Este middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) lê o corpo da [solicitação HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Por padrão, o express o ignora, porque a maioria das solicitações não exige isso. Nós precisamos dele porque o POST usa o corpo.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Monte o roteador no diretório do provedor de serviços (`/sp`).

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           Click here to log on
        </button>
      </body>
    </html>
  `)
})
```

Se um navegador tentar obter o diretório raiz, forneça a ele um link para a página de login.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Escute a `spPort` com este aplicativo express.

#### src/idp.mts {#srcidpmts}

Este é o provedor de identidade. Ele é muito semelhante ao provedor de serviços; as explicações abaixo são para as partes que são diferentes.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preservar atributos
    attributeNamePrefix: "@_", // Prefixo para atributos
  }
)
```

Precisamos ler e entender a solicitação XML que recebemos do provedor de serviços.

```typescript
const getLoginPage = requestId => `
```

Esta função cria a página com o formulário enviado automaticamente que é retornado no passo 4 do diagrama de sequência acima.

```typescript
<html>
  <head>
    <title>Login page</title>
  </head>
  <body>
    <h2>Login page</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Email address: <input name="email" />
      <br />
      <button type="Submit">
        Login to the service provider
      </button>
```

Existem dois campos que enviamos ao provedor de serviços:

1. O `requestId` ao qual estamos respondendo.
2. O identificador do usuário (usamos o endereço de e-mail que o usuário fornece por enquanto).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Este é o manipulador para o passo 5 do diagrama de sequência acima. O [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) cria a resposta de login. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

O público (audience) é o provedor de serviços.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Informações extraídas da solicitação. O único parâmetro com o qual nos importamos na solicitação é o requestId, que permite ao provedor de serviços corresponder as solicitações e suas respostas.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Garantir assinatura
```

Precisamos do `signingKey` para ter os dados para assinar a resposta. O provedor de serviços não confia em solicitações não assinadas.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Este é o campo com as informações do usuário que enviamos de volta ao provedor de serviços.

```typescript      
    }
  );

  res.send(`
    <html>
      <body>
        <script>
          window.onload = function () { document.forms[0].submit(); }
        </script>
        
        <form method="post" action="${loginResponse.entityEndpoint}">
          <input type="hidden" name="${loginResponse.type}" value="${loginResponse.context}" />
        </form>
      </body>
    </html>
  `)
})
```

Novamente, use um formulário enviado automaticamente. Este é o passo 6 do diagrama de sequência acima.

```typescript

// Endpoint do IdP para requisições de login
idpRouter.post(`/login`,
```

Este é o endpoint que recebe uma solicitação de login do provedor de serviços. Este é o manipulador do passo 3 do diagrama de sequência acima.

```typescript
  async (req, res) => {
    try {
      // Solução de contorno porque não consegui fazer o parseLoginRequest funcionar.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Deveríamos ser capazes de usar o [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) para ler o ID da solicitação de autenticação. No entanto, não consegui fazê-lo funcionar e não valia a pena gastar muito tempo nisso, então eu apenas uso um [analisador XML de uso geral](https://www.npmjs.com/package/fast-xml-parser). A informação que precisamos é o atributo `ID` dentro da tag `<samlp:AuthnRequest>`, que está no nível superior do XML.

## Usando assinaturas do Ethereum {#using-ethereum-signatures}

Agora que podemos enviar uma identidade de usuário para o provedor de serviços, o próximo passo é obter a identidade do usuário de maneira confiável. O Viem nos permite apenas pedir à carteira o endereço do usuário, mas isso significa pedir a informação ao navegador. Nós não controlamos o navegador, então não podemos confiar automaticamente na resposta que obtemos dele.

Em vez disso, o IdP enviará ao navegador uma string para assinar. Se a carteira no navegador assinar essa string, isso significa que ela realmente é aquele endereço (ou seja, ela conhece a chave privada que corresponde ao endereço).

Para ver isso em ação, pare o IdP e o SP existentes e execute estes comandos:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Em seguida, navegue [até o SP](http://localhost:3000) e siga as instruções.

Observe que, neste ponto, não sabemos como obter o endereço de e-mail a partir do endereço Ethereum, então, em vez disso, relatamos `<ethereum address>@bad.email.address` ao SP.

### Explicação detalhada {#detailed-explanation-2}

As alterações estão nos passos 4-5 do diagrama anterior.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

O único arquivo que alteramos é o `idp.mts`. Aqui estão as partes alteradas.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Precisamos destas duas bibliotecas adicionais. Usamos o [`uuid`](https://www.npmjs.com/package/uuid) para criar o valor do [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). O valor em si não importa, apenas o fato de que ele é usado apenas uma vez.

A biblioteca [`viem`](https://viem.sh/) nos permite usar definições do Ethereum. Aqui precisamos dela para verificar se a assinatura é de fato válida.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

A carteira pede permissão ao usuário para assinar a mensagem. Uma mensagem que é apenas um nonce pode confundir os usuários, então incluímos este prompt.

```typescript
// Manter requestIDs aqui
let nonces = {}
```

Precisamos das informações da solicitação para podermos responder a ela. Poderíamos enviá-las com a solicitação (passo 4) e recebê-las de volta (passo 5). No entanto, não podemos confiar nas informações que obtemos do navegador, que está sob o controle de um usuário potencialmente hostil. Portanto, é melhor armazená-las aqui, com o nonce como chave.

Observe que estamos fazendo isso aqui como uma variável por uma questão de simplicidade. No entanto, isso tem várias desvantagens:

- Estamos vulneráveis a um ataque de negação de serviço (denial of service). Um usuário mal-intencionado poderia tentar fazer login várias vezes, enchendo nossa memória.
- Se o processo do IdP precisar ser reiniciado, perdemos os valores existentes.
- Não podemos fazer balanceamento de carga em vários processos, porque cada um teria sua própria variável.

Em um sistema de produção, usaríamos um banco de dados e implementaríamos algum tipo de mecanismo de expiração.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Crie um nonce e armazene o `requestId` para uso futuro.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Este JavaScript é executado automaticamente quando a página é carregada.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Precisamos de várias funções do `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Só podemos trabalhar se houver uma carteira no navegador.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Solicite a lista de contas da carteira (`window.ethereum`). Assuma que há pelo menos uma e armazene apenas a primeira. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Crie um [cliente de carteira](https://viem.sh/docs/clients/wallet) para interagir com a carteira do navegador.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Peça ao usuário para assinar uma mensagem. Como todo este HTML está em uma [template string](https://viem.sh/docs/clients/wallet), podemos usar variáveis definidas no processo do idp. Este é o passo 4.5 no diagrama de sequência.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Redirecione para `/idp/signature/<nonce>/<address>/<signature>`. Este é o passo 5 no diagrama de sequência.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

A assinatura é enviada de volta pelo navegador, que é potencialmente malicioso (não há nada que o impeça de apenas abrir `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` no navegador). Portanto, é importante verificar se o processo do IdP lida com assinaturas incorretas corretamente.

```typescript
    </script>
  </head>
  <body>
    <h2>Please sign</h2>
    <button onClick="window.goodSignature()">
      Submit a good (valid) signature
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Submit a bad (invalid) signature
    </button>
  </body>
</html>  
`
}
```

O resto é apenas HTML padrão.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Este é o manipulador para o passo 5 no diagrama de sequência.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Obtenha o ID da solicitação e exclua o nonce de `nonces` para garantir que ele não possa ser reutilizado.

```typescript
  try {
```

Como há muitas maneiras pelas quais a assinatura pode ser inválida, nós envolvemos isso em um bloco `try ... catch` para capturar quaisquer erros lançados.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Use [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) para implementar o passo 5.5 no diagrama de sequência.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

O restante do manipulador é equivalente ao que fizemos no manipulador `/loginSubmitted` anteriormente, exceto por uma pequena alteração.

```typescript
  const loginResponse = await idp.createLoginResponse(
      .
      .
      .
    {
      email: req.params.account + "@bad.email.address"
    }
  );
```

Não temos o endereço de e-mail real (vamos obtê-lo na próxima seção), então, por enquanto, retornamos o endereço Ethereum e o marcamos claramente como não sendo um endereço de e-mail.


```typescript
// Endpoint do IdP para requisições de login
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Solução de contorno porque não consegui fazer o parseLoginRequest funcionar.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Em vez de `getLoginPage`, agora use `getSignaturePage` no manipulador do passo 3.

## Obtendo o endereço de e-mail {#getting-the-email-address}

O próximo passo é obter o endereço de e-mail, o identificador solicitado pelo provedor de serviços. Para fazer isso, usamos o [Ethereum Attestation Service (EAS)](https://attest.org/).

A maneira mais fácil de obter atestações é usar a [API GraphQL](https://docs.attest.org/docs/developer-tools/api). Usamos esta consulta:

```
query GetAttestationsByRecipient {
  attestations(
    where: { 
      recipient: { equals: "${getAddress(ethAddr)}" }
      schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
    }
    take: 1
  ) { 
    data
    id
    attester
  }
}
```

Este [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) inclui apenas um endereço de e-mail. Esta consulta pede atestações deste esquema. O sujeito da atestação é chamado de `recipient`. É sempre um endereço Ethereum.

Aviso: A maneira como estamos obtendo atestações aqui tem dois problemas de segurança.

- Estamos indo para o endpoint da API, `https://optimism.easscan.org/graphql`, que é um componente centralizado. Podemos obter o atributo `id` e, em seguida, fazer uma busca onchain para verificar se uma atestação é real, mas o endpoint da API ainda pode censurar atestações ao não nos informar sobre elas. 

  Este problema não é impossível de resolver, poderíamos executar nosso próprio endpoint GraphQL e obter as atestações dos logs da cadeia, mas isso é excessivo para nossos propósitos.

- Não olhamos para a identidade do atestador. Qualquer um pode nos fornecer informações falsas. Em uma implementação no mundo real, teríamos um conjunto de atestadores confiáveis e olharíamos apenas para as atestações deles.

Para ver isso em ação, pare o IdP e o SP existentes e execute estes comandos:

```sh
git checkout email-address
pnpm install
pnpm start
```

Em seguida, forneça seu endereço de e-mail. Você tem duas maneiras de fazer isso:

- Importe uma carteira usando uma chave privada e use a chave privada de teste `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Adicione uma atestação para o seu próprio endereço de e-mail:

  1. Navegue até [o esquema no explorador de atestações](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Clique em **Attest with Schema**.

  3. Insira seu endereço Ethereum como o destinatário, seu endereço de e-mail como email address e selecione **Onchain**. Em seguida, clique em **Make Attestation**.

  4. Aprove a transação na sua carteira. Você precisará de algum ETH na [blockchain Optimism](https://app.optimism.io/bridge/deposit) para pagar pelo gás.

De qualquer forma, depois de fazer isso, navegue até [http://localhost:3000](http://localhost:3000) e siga as instruções. Se você importou a chave privada de teste, o e-mail que você recebe é `test_addr_0@example.com`. Se você usou seu próprio endereço, deve ser o que você atestou.

### Explicação detalhada {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Os novos passos são a comunicação GraphQL, passos 5.6 e 5.7.

Novamente, aqui estão as partes alteradas de `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Importe as bibliotecas que precisamos.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Existe [um endpoint separado para cada blockchain](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Crie um novo cliente `GraphQLClient` que podemos usar para consultar o endpoint.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

O GraphQL nos fornece apenas um objeto de dados opaco com bytes. Para entendê-lo, precisamos do esquema. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Uma função para obter um endereço de e-mail a partir de um endereço Ethereum.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Esta é uma consulta GraphQL.

```typescript
      attestations(
```

Estamos procurando por atestações.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

As atestações que queremos são aquelas em nosso esquema, onde o destinatário é `getAddress(ethAddr)`. A função [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) garante que nosso endereço tenha o [checksum](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) correto. Isso é necessário porque o GraphQL diferencia maiúsculas de minúsculas (case-significant). "0xBAD060A7", "0xBad060A7" e "0xbad060a7" são valores diferentes.

```typescript
        take: 1
```

Independentemente de quantas atestações encontrarmos, queremos apenas a primeira.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Os campos que queremos receber.

- `attester`: O endereço que enviou a atestação. Normalmente, isso é usado para decidir se deve confiar na atestação ou não.
- `id`: O ID da atestação. Você pode usar esse valor para [ler a atestação onchain](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) para verificar se a informação da consulta GraphQL está correta.
- `data`: Os dados do esquema (neste caso, o endereço de e-mail).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Se não houver atestação, retorne um valor que seja obviamente incorreto, mas que pareça válido para o provedor de serviços.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Se houver um valor, use `decodeData` para decodificar os dados. Não precisamos dos metadados que ele fornece, apenas do valor em si.

```typescript
  const loginResponse = await idp.createLoginResponse(
    sp, 
    {
      .
      .
      .
    },
    "post",
    {
      email: await ethereumAddressToEmail(req.params.account)
    }
  );
```

Use a nova função para obter o endereço de e-mail.

## E quanto à descentralização? {#what-about-decentralization}

Nesta configuração, os usuários não podem fingir ser alguém que não são, desde que confiemos em atestadores confiáveis para o mapeamento do endereço Ethereum para o endereço de e-mail. No entanto, nosso provedor de identidade ainda é um componente centralizado. Quem tiver a chave privada do provedor de identidade pode enviar informações falsas ao provedor de serviços.

Pode haver uma solução usando [computação multipartidária (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Espero escrever sobre isso em um tutorial futuro.

## Conclusão {#conclusion}

A adoção de um padrão de login, como assinaturas do Ethereum, enfrenta o problema do ovo e da galinha. Os provedores de serviços querem atrair o mercado mais amplo possível. Os usuários querem poder acessar serviços sem ter que se preocupar em suportar seu padrão de login.
A criação de adaptadores, como um IdP do Ethereum, pode nos ajudar a superar esse obstáculo.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).