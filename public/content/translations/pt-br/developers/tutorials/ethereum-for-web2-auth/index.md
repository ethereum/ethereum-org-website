---
title: "Usando Ethereum para autenticação web2"
description: "Depois de ler este tutorial, um desenvolvedor poderá integrar o login do Ethereum (web3) com o login SAML, um padrão usado na web2 para fornecer single sign-on e outros serviços relacionados. Isso permite que o acesso aos recursos da web2 seja autenticado por meio de assinaturas do Ethereum, com os atributos do usuário provenientes de atestados."
author: Ori Pomerantz
  Ori Pomerantz
tags: [ "web2", "autenticação", "eas" ]
skill: beginner
lang: pt-br
published: 2025-04-30
---

## Introdução

[SAML](https://www.onelogin.com/learn/saml) é um padrão usado na web2 para permitir que um [provedor de identidade (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) forneça informações do usuário para [provedores de serviço (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)).

Neste tutorial, você aprenderá como integrar assinaturas do Ethereum com SAML para permitir que os usuários usem suas carteiras Ethereum para se autenticarem em serviços da web2 que ainda não suportam o Ethereum nativamente.

Observe que este tutorial foi escrito para dois públicos distintos:

- Pessoas do Ethereum que entendem o Ethereum e precisam aprender sobre SAML
- Pessoas da Web2 que entendem de SAML e autenticação da web2 e precisam aprender sobre Ethereum

Como resultado, ele conterá muito material introdutório que você já conhece. Sinta-se à vontade para pulá-lo.

### SAML para pessoas do Ethereum

SAML é um protocolo centralizado. Um provedor de serviço (SP) só aceita afirmações (como \"este é o meu usuário João, ele deve ter permissões para fazer A, B e C\") de um provedor de identidade (IdP) se tiver uma relação de confiança preexistente com ele, ou com a [autoridade certificadora](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) que assinou o certificado daquele IdP.

Por exemplo, o SP pode ser uma agência de viagens que presta serviços de viagens a empresas, e o IdP pode ser o site interno de uma empresa. Quando os funcionários precisam reservar uma viagem de negócios, a agência de viagens os envia para autenticação pela empresa antes de permitir que eles realmente reservem a viagem.

![Passo a passo do processo SAML](./fig-01-saml.png)

Esta é a forma como as três entidades, o navegador, o SP e o IdP, negociam o acesso. O SP não precisa saber nada sobre o usuário que está usando o navegador com antecedência, apenas confiar no IdP.

### Ethereum para pessoas do SAML

Ethereum é um sistema descentralizado.

![Logon do Ethereum](./fig-02-eth-logon.png)

Os usuários possuem uma chave privada (geralmente mantida em uma extensão do navegador). A partir da chave privada, você pode derivar uma chave pública e, a partir dela, um endereço de 20 bytes. Quando os usuários precisam fazer login em um sistema, eles são solicitados a assinar uma mensagem com um nonce (um valor de uso único). O servidor pode verificar se a assinatura foi criada por esse endereço.

![Obtendo dados extras de atestados](./fig-03-eas-data.png)

A assinatura verifica apenas o endereço do Ethereum. Para obter outros atributos do usuário, você normalmente usa [atestados](https://attest.org/). Um atestado normalmente tem estes campos:

- **Atestador**, o endereço que fez o atestado
- **Destinatário**, o endereço ao qual o atestado se aplica
- **Dados**, os dados que estão sendo atestados, como nome, permissões, etc.
- **Esquema**, o ID do esquema usado para interpretar os dados.

Devido à natureza descentralizada do Ethereum, qualquer usuário pode fazer atestados. A identidade do atestador é importante para identificar quais atestados consideramos confiáveis.

## Configuração

O primeiro passo é ter um SP SAML e um IdP SAML comunicando-se entre si.

1. Baixe o software. O software de exemplo para este artigo está [no github](https://github.com/qbzzt/250420-saml-ethereum). Diferentes estágios são armazenados em diferentes branches, para este estágio você quer `saml-only`

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

4. Acesse o SP na URL [http://localhost:3000/](http://localhost:3000/) e clique no botão para ser redirecionado para o IdP (porta 3001).

5. Forneça ao IdP seu endereço de e-mail e clique em **Login no provedor de serviços**. Veja que você é redirecionado de volta para o provedor de serviços (porta 3000) e que ele o reconhece pelo seu endereço de e-mail.

### Explicação detalhada

Isto é o que acontece, passo a passo:

![Logon SAML normal sem Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Este arquivo contém a configuração tanto para o Provedor de Identidade quanto para o Provedor de Serviços. Normalmente, essas duas seriam entidades diferentes, mas aqui podemos compartilhar código para simplificar.

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

Por convenção, em SAML, o `entityID` é a URL onde os metadados da entidade estão disponíveis. Esses metadados correspondem aos dados públicos aqui, exceto que estão em formato XML.

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

A definição mais importante para nossos propósitos é o `assertionConsumerServer`. Isso significa que para afirmar algo (por exemplo, \"o usuário que lhe envia esta informação é somebody@example.com\") para o provedor de serviços, precisamos usar [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) para a URL `http://localhost:3000/sp/assertion`.

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

Os dados públicos do provedor de identidade são semelhantes. Ele especifica que, para fazer login de um usuário, você envia um POST para `http://localhost:3001/idp/login` e para fazer logout de um usuário, você envia um POST para `http://localhost:3001/idp/logout`.

#### src/sp.mts

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

A biblioteca `samlify` espera ter um pacote que valide se o XML está correto, assinado com a chave pública esperada, etc. Usamos [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) para essa finalidade.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Um [`Router`](https://expressjs.com/en/5x/api.html#router) do [`express`](https://expressjs.com/) é um "mini site" que pode ser montado dentro de um site. Nesse caso, nós o usamos para agrupar todas as definições do provedor de serviços.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

A representação do próprio provedor de serviços de si mesmo são todos os dados públicos e a chave privada que ele usa para assinar informações.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Os dados públicos contêm tudo o que o provedor de serviços precisa saber sobre o provedor de identidade.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Para permitir a interoperabilidade com outros componentes SAML, os provedores de serviços e de identidade devem ter seus dados públicos (chamados de metadados) disponíveis em formato XML em `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Esta é a página acessada pelo navegador para se identificar. A afirmação inclui o identificador do usuário (aqui usamos o endereço de e-mail) e pode incluir atributos adicionais. Este é o manipulador para a etapa 7 no diagrama de sequência acima.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
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

Crie uma solicitação de login quando o navegador tentar obter esta página. Este é o manipulador para a etapa 1 no diagrama de sequência acima.

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

Esta página envia o formulário (veja abaixo) automaticamente. Dessa forma, o usuário não precisa fazer nada para ser redirecionado. Esta é a etapa 2 no diagrama de sequência acima.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Poste para `loginRequest.entityEndpoint` (a URL do ponto de extremidade do provedor de identidade).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

O nome da entrada é `loginRequest.type` (`SAMLRequest`). O conteúdo para esse campo é `loginRequest.context`, que é novamente XML codificado em base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Este middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) lê o corpo da [requisição HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Por padrão, o express o ignora, porque a maioria das requisições não o exige. Nós precisamos dele porque o POST usa o corpo.

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
           Clique aqui para fazer logon
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

#### src/idp.mts

Este é o provedor de identidade. É muito semelhante ao provedor de serviços, as explicações abaixo são para as partes que são diferentes.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

Precisamos ler e entender a solicitação XML que recebemos do provedor de serviços.

```typescript
const getLoginPage = requestId => `
```

Esta função cria a página com o formulário enviado automaticamente que é retornado na etapa 4 do diagrama de sequência acima.

```typescript
<html>
  <head>
    <title>Página de login</title>
  </head>
  <body>
    <h2>Página de login</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Endereço de e-mail: <input name="email" />
      <br />
      <button type="Submit">
        Fazer login no provedor de serviços
      </button>
```

Há dois campos que enviamos ao provedor de serviços:

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

Este é o manipulador para a etapa 5 no diagrama de sequência acima. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) cria a resposta de login.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

O público é o provedor de serviços.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Informações extraídas da solicitação. O único parâmetro que nos interessa na solicitação é o requestId, que permite ao provedor de serviços corresponder as solicitações e suas respostas.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

Precisamos que o `signingKey` tenha os dados para assinar a resposta. O provedor de serviços não confia em solicitações não assinadas.

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

Novamente, use um formulário enviado automaticamente. Esta é a etapa 6 do diagrama de sequência acima.

```typescript

// Ponto de extremidade do IdP para solicitações de login
idpRouter.post(`/login`,
```

Este é o ponto de extremidade que recebe uma solicitação de login do provedor de serviços. Este é o manipulador da etapa 3 do diagrama de sequência acima.

```typescript
  async (req, res) => {
    try {
      // Workaround because I couldn't get parseLoginRequest to work.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Deveríamos ser capazes de usar [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) para ler o ID da solicitação de autenticação. No entanto, não consegui fazê-lo funcionar e não valia a pena gastar muito tempo nisso, então eu apenas uso um [analisador de XML de propósito geral](https://www.npmjs.com/package/fast-xml-parser). A informação que precisamos é o atributo `ID` dentro da tag `<samlp:AuthnRequest>`, que está no nível superior do XML.

## Usando assinaturas do Ethereum

Agora que podemos enviar uma identidade de usuário para o provedor de serviços, o próximo passo é obter a identidade do usuário de uma maneira confiável. O Viem nos permite apenas solicitar à carteira o endereço do usuário, mas isso significa solicitar a informação ao navegador. Nós não controlamos o navegador, então não podemos confiar automaticamente na resposta que recebemos dele.

Em vez disso, o IdP enviará ao navegador uma string para assinar. Se a carteira no navegador assinar esta string, significa que é realmente aquele endereço (ou seja, ele conhece a chave privada que corresponde ao endereço).

Para ver isso em ação, pare o IdP e o SP existentes e execute estes comandos:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Em seguida, acesse [o SP](http://localhost:3000) e siga as instruções.

Note que, neste momento, não sabemos como obter o endereço de e-mail a partir do endereço do Ethereum, então, em vez disso, relatamos `<endereço do ethereum>@bad.email.address` para o SP.

### Explicação detalhada

As alterações estão nas etapas 4-5 no diagrama anterior.

![SAML com uma assinatura do Ethereum](./fig-05-saml-w-signature.png)

O único arquivo que alteramos foi `idp.mts`. Aqui estão as partes alteradas.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Precisamos dessas duas bibliotecas adicionais. Usamos [`uuid`](https://www.npmjs.com/package/uuid) para criar o valor [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). O valor em si não importa, apenas o fato de ser usado uma única vez.

A biblioteca [`viem`](https://viem.sh/) nos permite usar definições do Ethereum. Aqui precisamos dela para verificar se a assinatura é realmente válida.

```typescript
const loginPrompt = "Para acessar o provedor de serviços, assine este nonce: "
```

A carteira pede permissão ao usuário para assinar a mensagem. Uma mensagem que é apenas um nonce pode confundir os usuários, por isso incluímos esta solicitação.

```typescript
// Manter requestIDs aqui
let nonces = {}
```

Precisamos das informações da solicitação para poder respondê-la. Poderíamos enviá-lo com a solicitação (etapa 4) e recebê-lo de volta (etapa 5). No entanto, não podemos confiar nas informações que obtemos do navegador, que está sob o controle de um usuário potencialmente hostil. Portanto, é melhor armazená-lo aqui, com o nonce como chave.

Observe que estamos fazendo isso aqui como uma variável para simplificar. No entanto, isso tem várias desvantagens:

- Estamos vulneráveis a um ataque de negação de serviço. Um usuário mal-intencionado pode tentar fazer login várias vezes, enchendo nossa memória.
- Se o processo do IdP precisar ser reiniciado, perdemos os valores existentes.
- Não podemos balancear a carga entre vários processos, porque cada um teria sua própria variável.

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
          alert("Por favor, instale a MetaMask ou uma carteira compatível e depois recarregue")
      }
```

Só podemos trabalhar se houver uma carteira no navegador.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Solicite a lista de contas da carteira (`window.ethereum`). Suponha que haja pelo menos uma e armazene apenas a primeira.

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

Peça ao usuário para assinar uma mensagem. Como todo este HTML está em uma [string de modelo](https://viem.sh/docs/clients/wallet), podemos usar variáveis definidas no processo idp. Esta é a etapa 4.5 no diagrama de sequência.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Redirecionar para `/idp/signature/<nonce>/<address>/<signature>`. Esta é a etapa 5 no diagrama de sequência.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

A assinatura é enviada de volta pelo navegador, que é potencialmente mal-intencionado (não há nada para impedi-lo de simplesmente abrir `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` no navegador). Portanto, é importante verificar se o processo IdP lida corretamente com assinaturas inválidas.

```typescript
    </script>
  </head>
  <body>
    <h2>Por favor, assine</h2>
    <button onClick="window.goodSignature()">
      Enviar uma assinatura boa (válida)
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Enviar uma assinatura ruim (inválida)
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

Este é o manipulador para a etapa 5 no diagrama de sequência.

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

Como há muitas maneiras pelas quais a assinatura pode ser inválida, envolvemos isso em um `try... bloco `catch` para capturar quaisquer erros lançados.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Use [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) para implementar a etapa 5.5 no diagrama de sequência.

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

Não temos o endereço de e-mail real (o obteremos na próxima seção), então, por enquanto, retornamos o endereço do Ethereum e o marcamos claramente como não sendo um endereço de e-mail.

```typescript
// Ponto de extremidade do IdP para solicitações de login
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Solução alternativa porque não consegui fazer o parseLoginRequest funcionar.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Em vez de `getLoginPage`, agora use `getSignaturePage` no manipulador da etapa 3.

## Obtendo o endereço de e-mail

O próximo passo é obter o endereço de e-mail, o identificador solicitado pelo provedor de serviços. Para fazer isso, usamos o [Ethereum Attestation Service (EAS)](https://attest.org/).

A maneira mais fácil de obter atestados é usar a [API GraphQL](https://docs.attest.org/docs/developer-tools/api). Usamos esta consulta:

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

Este [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) inclui apenas um endereço de e-mail. Esta consulta solicita atestados deste esquema. O sujeito do atestado é chamado de `destinatário`. É sempre um endereço do Ethereum.

Aviso: a maneira como estamos obtendo os atestados aqui tem dois problemas de segurança.

- Estamos indo para o ponto de extremidade da API, `https://optimism.easscan.org/graphql`, que é um componente centralizado. Podemos obter o atributo `id` e, em seguida, fazer uma pesquisa na cadeia para verificar se um atestado é real, mas o ponto de extremidade da API ainda pode censurar atestados ao não nos informar sobre eles.

  Este problema não é impossível de resolver, poderíamos executar nosso próprio ponto de extremidade GraphQL e obter os atestados dos registros da cadeia, mas isso é excessivo para nossos propósitos.

- Nós não olhamos para a identidade do atestador. Qualquer um pode nos fornecer informações falsas. Em uma implementação do mundo real, teríamos um conjunto de atestadores confiáveis e olharíamos apenas para seus atestados.

Para ver isso em ação, pare o IdP e o SP existentes e execute estes comandos:

```sh
git checkout email-address
pnpm install
pnpm start
```

Em seguida, forneça seu endereço de e-mail. Você tem duas maneiras de fazer isso:

- Importe uma carteira usando uma chave privada e use a chave privada de teste `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Adicione um atestado para seu próprio endereço de e-mail:

  1. Navegue até [o esquema no explorador de atestados](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Clique em **Atestar com Esquema**.

  3. Insira seu endereço Ethereum como destinatário, seu endereço de e-mail como endereço de e-mail e selecione **Onchain**. Em seguida, clique em **Fazer Atestado**.

  4. Aprove a transação na sua carteira. Você precisará de um pouco de ETH na [Blockchain da Optimism](https://app.optimism.io/bridge/deposit) para pagar pelo gás.

De qualquer forma, depois de fazer isso, navegue até [http://localhost:3000](http://localhost:3000) e siga as instruções. Se você importou a chave privada de teste, o e-mail que você recebe é `test_addr_0@example.com`. Se você usou seu próprio endereço, deve ser o que você atestou.

### Explicação detalhada

![Obtendo do endereço Ethereum para o e-mail](./fig-06-saml-sig-n-email.png)

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

Existe [um endpoint separado para cada cadeia de blocos](https://docs.attest.org/docs/developer-tools/api).

```typescript
Crie um novo cliente `GraphQLClient` que podemos usar para consultar o ponto de extremidade.
```

Para entendê-lo, precisamos do esquema.

```typescript
Uma função para ir de um endereço Ethereum para um endereço de e-mail.
```

Esta é uma consulta GraphQL.         attestations(

```typescript
Estamos procurando por atestados.
```

```
    where: { 
      recipient: { equals: "${getAddress(ethAddr)}" }
      schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
    }
```

```typescript
Os atestados que queremos são aqueles em nosso esquema, onde o destinatário é `getAddress(ethAddr)`.
```

A função [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) garante que nosso endereço tenha o [checksum](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) correto.

```typescript
      atestações(
```

Isto é necessário porque GraphQL diferencia maiúsculas e minúsculas.

```typescript
"0xBAD060A7", "0xBad060A7", and "0xbad060a7" são valores diferentes.
```

```
    take: 1 Independentemente de quantos atestados encontrarmos, queremos apenas o primeiro.       ) {
    data
    id
    attester
  }
}` Os campos que queremos receber.
```

```typescript
`attester`: O endereço que enviou o atestado.
```

Normalmente, isso é usado para decidir se confia no atestado ou não.

```typescript
`id`: O ID do atestado.
```

Você pode usar este valor para [ler o atestado on-chain](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) para verificar se a informação da consulta GraphQL está correta.

- `data`: Os dados do esquema (neste caso, o endereço de e-mail).   const queryResult = await graphqlClient.request(query)if (queryResult.attestations.length == 0)
  return "no_address@available.is"
- Se não houver atestado, retorne um valor que seja obviamente incorreto, mas que pareça válido para o provedor de serviços.   const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
  }
- Se houver um valor, use `decodeData` para decodificar os dados.

```typescript
Não precisamos dos metadados que ele fornece, apenas do valor em si.
```

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

```typescript
Use a nova função para obter o endereço de e-mail.
```

E a descentralização? Nesta configuração, os usuários não podem fingir ser alguém que não são, desde que confiemos em atestadores confiáveis para o mapeamento do endereço Ethereum para o endereço de e-mail.

```typescript
No entanto, nosso provedor de identidade ainda é um componente centralizado.
```

Quem tiver a chave privada do provedor de identidade pode enviar informações falsas para o provedor de serviços.

## Pode haver uma solução usando [computação multipartidária (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

Espero escrever sobre isso em um futuro tutorial. Adoção de um padrão de logon, como assinaturas Ethereum, enfrenta um problema de ovo e galinha. Os provedores de serviços querem atrair o mercado mais amplo possível.

Os usuários querem poder acessar serviços sem ter que se preocupar em suportar seu padrão de logon. A criação de adaptadores, como um IdP do Ethereum, pode nos ajudar a superar esse obstáculo.

## Conclusão

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/). [Veja aqui mais do meu trabalho](https://cryptodocguy.pro/). Os usuários têm uma chave privada (normalmente mantida em uma extensão de navegador).
Criar adaptadores, como um IdP da Ethereum, pode nos ajudar a superar este obstáculo.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
