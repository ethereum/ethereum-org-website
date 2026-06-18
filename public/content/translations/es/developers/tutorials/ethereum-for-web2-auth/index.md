---
title: "Uso de Ethereum para la autenticación Web2"
description: "Después de leer este tutorial, un desarrollador podrá integrar el inicio de sesión de Ethereum (Web3) con el inicio de sesión SAML, un estándar utilizado en Web2 para proporcionar inicio de sesión único y otros servicios relacionados. Esto permite que el acceso a los recursos Web2 se autentique mediante firmas de Ethereum, y los atributos del usuario provengan de atestaciones."
author: Ori Pomerantz
tags: ["web2", "autenticación", "eas"]
skill: beginner
breadcrumb: "Ethereum para autenticación Web2"
lang: es
published: 2025-04-30
---

## Introducción {#introduction}

[SAML](https://www.onelogin.com/learn/saml) es un estándar utilizado en Web2 para permitir que un [proveedor de identidad (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) proporcione información de usuario a los [proveedores de servicios (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML)).

En este tutorial aprenderá a integrar las firmas de Ethereum con SAML para permitir a los usuarios usar sus billeteras de Ethereum para autenticarse en servicios Web2 que aún no son compatibles con Ethereum de forma nativa.

Tenga en cuenta que este tutorial está escrito para dos públicos distintos:

- Personas de Ethereum que entienden Ethereum y necesitan aprender SAML
- Personas de Web2 que entienden SAML y la autenticación Web2 y necesitan aprender Ethereum

Como resultado, contendrá mucho material introductorio que probablemente ya conozca. Siéntase libre de omitirlo.

### SAML para personas de Ethereum {#saml-for-ethereum-people}

SAML es un protocolo centralizado. Un proveedor de servicios (SP) solo acepta aserciones (como "este es mi usuario John, debería tener permisos para hacer A, B y C") de un proveedor de identidad (IdP) si tiene una relación de confianza preexistente con él, o con la [autoridad de certificación](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) que firmó el certificado de ese IdP.

Por ejemplo, el SP puede ser una agencia de viajes que proporciona servicios de viaje a empresas, y el IdP puede ser el sitio web interno de una empresa. Cuando los empleados necesitan reservar viajes de negocios, la agencia de viajes los envía para que la empresa los autentique antes de permitirles reservar el viaje.

![Step by step SAML process](./fig-01-saml.png)

Esta es la forma en que las tres entidades, el navegador, el SP y el IdP, negocian el acceso. El SP no necesita saber nada de antemano sobre el usuario que utiliza el navegador, solo confiar en el IdP.

### Ethereum para personas de SAML {#ethereum-for-saml-people}

Ethereum es un sistema descentralizado. 

![Ethereum logon](./fig-02-eth-logon.png)

Los usuarios tienen una clave privada (generalmente guardada en una extensión del navegador). A partir de la clave privada se puede derivar una clave pública, y de ella una dirección de 20 bytes. Cuando los usuarios necesitan iniciar sesión en un sistema, se les pide que firmen un mensaje con un nonce (un valor de un solo uso). El servidor puede verificar que la firma fue creada por esa dirección.

![Getting extra data from attestations](./fig-03-eas-data.png)

La firma solo verifica la dirección de Ethereum. Para obtener otros atributos del usuario, normalmente se utilizan [atestaciones](https://attest.org/). Una atestación suele tener estos campos:

- **Atestador** (Attestor), la dirección que realizó la atestación
- **Destinatario** (Recipient), la dirección a la que se aplica la atestación
- **Datos** (Data), los datos que se atestan, como el nombre, los permisos, etc.
- **Esquema** (Schema), el ID del esquema utilizado para interpretar los datos.

Debido a la naturaleza descentralizada de Ethereum, cualquier usuario puede realizar atestaciones. La identidad del atestador es importante para identificar qué atestaciones consideramos fiables.

## Configuración {#setup}

El primer paso es tener un SP de SAML y un IdP de SAML comunicándose entre sí.

1. Descargue el software. El software de muestra para este artículo está [en GitHub](https://github.com/qbzzt/250420-saml-ethereum). Las diferentes etapas se almacenan en diferentes ramas; para esta etapa, necesita `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Cree claves con certificados autofirmados. Esto significa que la clave es su propia autoridad de certificación y debe importarse manualmente al proveedor de servicios. Consulte [la documentación de OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) para obtener más información. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Inicie los servidores (tanto el SP como el IdP)

    ```sh
    pnpm start
    ```

4. Navegue hasta el SP en la URL [http://localhost:3000/](http://localhost:3000/) y haga clic en el botón para ser redirigido al IdP (puerto 3001).

5. Proporcione al IdP su dirección de correo electrónico y haga clic en **Login to the service provider** (Iniciar sesión en el proveedor de servicios). Verá que se le redirige de vuelta al proveedor de servicios (puerto 3000) y que este lo reconoce por su dirección de correo electrónico.

### Explicación detallada {#detailed-explanation}

Esto es lo que sucede, paso a paso:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Este archivo contiene la configuración tanto para el proveedor de identidad como para el proveedor de servicios. Normalmente, estas dos serían entidades diferentes, pero aquí podemos compartir código por simplicidad.

```typescript
const fs = await import("fs")

const protocol="http"
```

Por ahora solo estamos probando, así que está bien usar HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Lea las claves públicas, que normalmente están disponibles para ambos componentes (y en las que se confía directamente o están firmadas por una autoridad de certificación de confianza).

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

Las URL de ambos componentes.

```typescript
export const spPublicData = {
```

Los datos públicos del proveedor de servicios.

```typescript
    entityID: `${spUrl}/metadata`,
```

Por convención, en SAML el `entityID` es la URL donde están disponibles los metadatos de la entidad. Estos metadatos corresponden a los datos públicos aquí, excepto que están en formato XML.

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

La definición más importante para nuestros propósitos es el `assertionConsumerServer`. Significa que para realizar una aserción (por ejemplo, "el usuario que le envía esta información es somebody@example.com") al proveedor de servicios, necesitamos usar [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) a la URL `http://localhost:3000/sp/assertion`.

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

Los datos públicos del proveedor de identidad son similares. Especifican que para iniciar la sesión de un usuario se hace un POST a `http://localhost:3001/idp/login` y para cerrar la sesión de un usuario se hace un POST a `http://localhost:3001/idp/logout`.

#### src/sp.mts {#srcspmts}

Este es el código que implementa un proveedor de servicios.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Usamos la biblioteca [`samlify`](https://www.npmjs.com/package/samlify) para implementar SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

La biblioteca `samlify` espera tener un paquete que valide que el XML es correcto, que está firmado con la clave pública esperada, etc. Usamos [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) para este propósito.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Un [`Router`](https://expressjs.com/en/5x/api.html#router) de [`express`](https://expressjs.com/) es un "minisitio web" que se puede montar dentro de un sitio web. En este caso, lo usamos para agrupar todas las definiciones del proveedor de servicios.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

La propia representación del proveedor de servicios de sí mismo son todos los datos públicos y la clave privada que utiliza para firmar la información.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Los datos públicos contienen todo lo que el proveedor de servicios necesita saber sobre el proveedor de identidad.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Para permitir la interoperabilidad con otros componentes de SAML, los proveedores de servicios y de identidad deben tener sus datos públicos (llamados metadatos) disponibles en formato XML en `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Esta es la página a la que accede el navegador para identificarse. La aserción incluye el identificador de usuario (aquí usamos la dirección de correo electrónico) y puede incluir atributos adicionales. Este es el manejador para el paso 7 en el diagrama de secuencia anterior.

```typescript
  async (req, res) => {
    // console.log(`Respuesta SAML:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Puede usar el comando comentado para ver los datos XML proporcionados en la aserción. Está [codificado en base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Analice la solicitud de inicio de sesión del servidor de identidad.

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

Envíe una respuesta HTML, solo para mostrarle al usuario que recibimos el inicio de sesión.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Informe al usuario en caso de fallo.

```typescript
spRouter.get('/login',
```

Cree una solicitud de inicio de sesión cuando el navegador intente obtener esta página. Este es el manejador para el paso 1 en el diagrama de secuencia anterior.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Obtenga la información para enviar (POST) una solicitud de inicio de sesión.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Esta página envía el formulario (ver a continuación) automáticamente. De esta manera, el usuario no tiene que hacer nada para ser redirigido. Este es el paso 2 en el diagrama de secuencia anterior.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Envíe un POST a `loginRequest.entityEndpoint` (la URL del punto de conexión del proveedor de identidad).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

El nombre de entrada es `loginRequest.type` (`SAMLRequest`). El contenido de ese campo es `loginRequest.context`, que vuelve a ser XML codificado en base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Este middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) lee el cuerpo de la [solicitud HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Por defecto, express lo ignora, porque la mayoría de las solicitudes no lo requieren. Lo necesitamos porque POST sí usa el cuerpo.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Monte el enrutador en el directorio del proveedor de servicios (`/sp`).

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

Si un navegador intenta obtener el directorio raíz, proporciónale un enlace a la página de inicio de sesión.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Escuche el `spPort` con esta aplicación express.

#### src/idp.mts {#srcidpmts}

Este es el proveedor de identidad. Es muy similar al proveedor de servicios; las explicaciones a continuación son para las partes que son diferentes.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preservar atributos
    attributeNamePrefix: "@_", // Prefijo para atributos
  }
)
```

Necesitamos leer y entender la solicitud XML que recibimos del proveedor de servicios.

```typescript
const getLoginPage = requestId => `
```

Esta función crea la página con el formulario enviado automáticamente que se devuelve en el paso 4 del diagrama de secuencia anterior.

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

Hay dos campos que enviamos al proveedor de servicios:

1. El `requestId` al que estamos respondiendo.
2. El identificador de usuario (por ahora usamos la dirección de correo electrónico que proporciona el usuario).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Este es el manejador para el paso 5 del diagrama de secuencia anterior. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) crea la respuesta de inicio de sesión. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

La audiencia es el proveedor de servicios.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Información extraída de la solicitud. El único parámetro que nos importa en la solicitud es el requestId, que permite al proveedor de servicios emparejar las solicitudes y sus respuestas.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Asegurar la firma
```

Necesitamos `signingKey` para tener los datos para firmar la respuesta. El proveedor de servicios no confía en las solicitudes sin firmar.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Este es el campo con la información del usuario que enviamos de vuelta al proveedor de servicios.

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

Nuevamente, use un formulario enviado automáticamente. Este es el paso 6 del diagrama de secuencia anterior.

```typescript

// Endpoint del IdP para solicitudes de inicio de sesión
idpRouter.post(`/login`,
```

Este es el punto de conexión que recibe una solicitud de inicio de sesión del proveedor de servicios. Este es el manejador del paso 3 del diagrama de secuencia anterior.

```typescript
  async (req, res) => {
    try {
      // Solución alternativa porque no pude hacer que parseLoginRequest funcionara.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Deberíamos poder usar [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) para leer el ID de la solicitud de autenticación. Sin embargo, no pude hacerlo funcionar y no valía la pena dedicarle mucho tiempo, así que simplemente uso un [analizador XML de propósito general](https://www.npmjs.com/package/fast-xml-parser). La información que necesitamos es el atributo `ID` dentro de la etiqueta `<samlp:AuthnRequest>`, que se encuentra en el nivel superior del XML.

## Uso de firmas de Ethereum {#using-ethereum-signatures}

Ahora que podemos enviar una identidad de usuario al proveedor de servicios, el siguiente paso es obtener la identidad del usuario de manera confiable. Viem nos permite simplemente pedirle a la billetera la dirección del usuario, pero esto significa pedirle la información al navegador. No controlamos el navegador, por lo que no podemos confiar automáticamente en la respuesta que obtenemos de él.

En su lugar, el IdP enviará al navegador una cadena para firmar. Si la billetera en el navegador firma esta cadena, significa que realmente es esa dirección (es decir, conoce la clave privada que corresponde a la dirección).

Para ver esto en acción, detenga el IdP y el SP existentes y ejecute estos comandos:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Luego navegue [hasta el SP](http://localhost:3000) y siga las instrucciones.

Tenga en cuenta que en este punto no sabemos cómo obtener la dirección de correo electrónico a partir de la dirección de Ethereum, por lo que en su lugar reportamos `<ethereum address>@bad.email.address` al SP.

### Explicación detallada {#detailed-explanation-2}

Los cambios están en los pasos 4-5 del diagrama anterior.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

El único archivo que cambiamos es `idp.mts`. Aquí están las partes modificadas.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Necesitamos estas dos bibliotecas adicionales. Usamos [`uuid`](https://www.npmjs.com/package/uuid) para crear el valor [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). El valor en sí no importa, solo el hecho de que se usa una sola vez.

La biblioteca [`viem`](https://viem.sh/) nos permite usar definiciones de Ethereum. Aquí la necesitamos para verificar que la firma es efectivamente válida.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

La billetera le pide permiso al usuario para firmar el mensaje. Un mensaje que es solo un nonce podría confundir a los usuarios, por lo que incluimos este aviso.

```typescript
// Mantener los requestIDs aquí
let nonces = {}
```

Necesitamos la información de la solicitud para poder responder a ella. Podríamos enviarla con la solicitud (paso 4) y recibirla de vuelta (paso 5). Sin embargo, no podemos confiar en la información que obtenemos del navegador, que está bajo el control de un usuario potencialmente hostil. Así que es mejor almacenarla aquí, con el nonce como clave.

Tenga en cuenta que lo estamos haciendo aquí como una variable en aras de la simplicidad. Sin embargo, esto tiene varias desventajas:

- Somos vulnerables a un ataque de denegación de servicio. Un usuario malintencionado podría intentar iniciar sesión varias veces, llenando nuestra memoria.
- Si el proceso del IdP necesita reiniciarse, perdemos los valores existentes.
- No podemos equilibrar la carga entre múltiples procesos, porque cada uno tendría su propia variable.

En un sistema de producción usaríamos una base de datos e implementaríamos algún tipo de mecanismo de caducidad.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Cree un nonce y almacene el `requestId` para uso futuro.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Este JavaScript se ejecuta automáticamente cuando se carga la página.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Necesitamos varias funciones de `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Solo podemos funcionar si hay una billetera en el navegador.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Solicite la lista de cuentas de la billetera (`window.ethereum`). Asuma que hay al menos una y almacene solo la primera. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Cree un [cliente de billetera](https://viem.sh/docs/clients/wallet) para interactuar con la billetera del navegador.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Pídale al usuario que firme un mensaje. Debido a que todo este HTML está en una [cadena de plantilla](https://viem.sh/docs/clients/wallet), podemos usar variables definidas en el proceso del IdP. Este es el paso 4.5 en el diagrama de secuencia.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Redirija a `/idp/signature/<nonce>/<address>/<signature>`. Este es el paso 5 en el diagrama de secuencia.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

La firma es enviada de vuelta por el navegador, que es potencialmente malicioso (no hay nada que le impida simplemente abrir `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` en el navegador). Por lo tanto, es importante verificar que el proceso del IdP maneje correctamente las firmas incorrectas.

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

El resto es solo HTML estándar.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Este es el manejador para el paso 5 en el diagrama de secuencia.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Obtenga el ID de la solicitud y elimine el nonce de `nonces` para asegurarse de que no se pueda reutilizar.

```typescript
  try {
```

Debido a que hay tantas formas en que la firma puede ser inválida, envolvemos esto en un bloque `try ... catch` para atrapar cualquier error arrojado.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Use [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) para implementar el paso 5.5 en el diagrama de secuencia.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

El resto del manejador es equivalente a lo que hemos hecho en el manejador `/loginSubmitted` anteriormente, excepto por un pequeño cambio.

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

No tenemos la dirección de correo electrónico real (la obtendremos en la siguiente sección), así que por ahora devolvemos la dirección de Ethereum y la marcamos claramente como no siendo una dirección de correo electrónico.


```typescript
// Endpoint del IdP para solicitudes de inicio de sesión
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Solución alternativa porque no pude hacer que parseLoginRequest funcionara.
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

En lugar de `getLoginPage`, ahora use `getSignaturePage` en el manejador del paso 3.

## Obtención de la dirección de correo electrónico {#getting-the-email-address}

El siguiente paso es obtener la dirección de correo electrónico, el identificador solicitado por el proveedor de servicios. Para hacer eso, usamos el [Servicio de Atestación de Ethereum (EAS)](https://attest.org/).

La forma más fácil de obtener atestaciones es usar la [API de GraphQL](https://docs.attest.org/docs/developer-tools/api). Usamos esta consulta:

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

Este [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) incluye solo una dirección de correo electrónico. Esta consulta pide atestaciones de este esquema. El sujeto de la atestación se llama `recipient`. Siempre es una dirección de Ethereum.

Advertencia: La forma en que estamos obteniendo atestaciones aquí tiene dos problemas de seguridad.

- Vamos al punto de conexión de la API, `https://optimism.easscan.org/graphql`, que es un componente centralizado. Podemos obtener el atributo `id` y luego hacer una búsqueda en cadena para verificar que una atestación es real, pero el punto de conexión de la API aún puede censurar las atestaciones al no informarnos sobre ellas. 

  Este problema no es imposible de resolver, podríamos ejecutar nuestro propio punto de conexión de GraphQL y obtener las atestaciones de los registros de la cadena, pero eso es excesivo para nuestros propósitos.

- No nos fijamos en la identidad del atestador. Cualquiera puede proporcionarnos información falsa. En una implementación en el mundo real, tendríamos un conjunto de atestadores de confianza y solo miraríamos sus atestaciones.

Para ver esto en acción, detenga el IdP y el SP existentes y ejecute estos comandos:

```sh
git checkout email-address
pnpm install
pnpm start
```

Luego proporcione su dirección de correo electrónico. Tiene dos formas de hacerlo:

- Importe una billetera usando una clave privada y use la clave privada de prueba `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Agregue una atestación para su propia dirección de correo electrónico:

  1. Navegue hasta [el esquema en el explorador de atestaciones](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Haga clic en **Attest with Schema** (Atestar con esquema).

  3. Ingrese su dirección de Ethereum como destinatario (recipient), su dirección de correo electrónico como email address, y seleccione **Onchain** (En cadena). Luego haga clic en **Make Attestation** (Realizar atestación).

  4. Apruebe la transacción en su billetera. Necesitará algo de ETH en [la cadena de bloques de Optimism](https://app.optimism.io/bridge/deposit) para pagar el gas.

De cualquier manera, después de hacer esto, navegue a [http://localhost:3000](http://localhost:3000) y siga las instrucciones. Si importó la clave privada de prueba, el correo electrónico que recibe es `test_addr_0@example.com`. Si usó su propia dirección, debería ser lo que haya atestado.

### Explicación detallada {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Los nuevos pasos son la comunicación de GraphQL, pasos 5.6 y 5.7.

Nuevamente, aquí están las partes modificadas de `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Importe las bibliotecas que necesitamos.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Hay [un punto de conexión separado para cada cadena de bloques](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Cree un nuevo cliente `GraphQLClient` que podamos usar para consultar el punto de conexión.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL solo nos da un objeto de datos opaco con bytes. Para entenderlo necesitamos el esquema. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Una función para pasar de una dirección de Ethereum a una dirección de correo electrónico.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Esta es una consulta de GraphQL.

```typescript
      attestations(
```

Estamos buscando atestaciones.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Las atestaciones que queremos son aquellas en nuestro esquema, donde el destinatario es `getAddress(ethAddr)`. La función [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) se asegura de que nuestra dirección tenga la [suma de comprobación](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) correcta. Esto es necesario porque GraphQL distingue entre mayúsculas y minúsculas. "0xBAD060A7", "0xBad060A7" y "0xbad060a7" son valores diferentes.

```typescript
        take: 1
```

Independientemente de cuántas atestaciones encontremos, solo queremos la primera.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Los campos que queremos recibir.

- `attester`: La dirección que envió la atestación. Normalmente, esto se usa para decidir si confiar en la atestación o no.
- `id`: El ID de la atestación. Puede usar este valor para [leer la atestación en cadena](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) y verificar que la información de la consulta de GraphQL sea correcta.
- `data`: Los datos del esquema (en este caso, la dirección de correo electrónico).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Si no hay atestación, devuelva un valor que sea obviamente incorrecto, pero que parezca válido para el proveedor de servicios.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Si hay un valor, use `decodeData` para decodificar los datos. No necesitamos los metadatos que proporciona, solo el valor en sí.

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

Use la nueva función para obtener la dirección de correo electrónico.

## ¿Qué pasa con la descentralización? {#what-about-decentralization}

En esta configuración, los usuarios no pueden fingir ser alguien que no son, siempre y cuando dependamos de atestadores confiables para el mapeo de la dirección de Ethereum a la dirección de correo electrónico. Sin embargo, nuestro proveedor de identidad sigue siendo un componente centralizado. Quien tenga la clave privada del proveedor de identidad puede enviar información falsa al proveedor de servicios.

Puede haber una solución utilizando la [computación multiparte (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Espero escribir sobre ello en un futuro tutorial.

## Conclusión {#conclusion}

La adopción de un estándar de inicio de sesión, como las firmas de Ethereum, se enfrenta al problema del huevo y la gallina. Los proveedores de servicios quieren atraer al mercado más amplio posible. Los usuarios quieren poder acceder a los servicios sin tener que preocuparse por la compatibilidad con su estándar de inicio de sesión.
La creación de adaptadores, como un IdP de Ethereum, puede ayudarnos a superar este obstáculo.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).