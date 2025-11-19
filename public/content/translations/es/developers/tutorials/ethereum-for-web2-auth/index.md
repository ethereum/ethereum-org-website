---
title: Uso de Ethereum para autenticación web2
description: Después de leer este tutorial, un desarrollador será capaz de integrar el inicio de sesión con Ethereum (web3) con el inicio de sesión SAML, un estándar utilizado en web2 para proporcionar inicio de sesión único (SSO) y otros servicios relacionados. Esto permite que el acceso a los recursos de web2 sea autenticado mediante firmas de Ethereum, con los atributos del usuario procedentes de atestaciones.
author: Ori Pomerantz
tags: [ "web2", "autenticación", "eas" ]
skill: principiante
lang: es
published: 2025-04-30
---

## Introducción

[SAML](https://www.onelogin.com/learn/saml) es un estándar utilizado en web2 que permite a un [proveedor de identidad (IdP)](https://es.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) proporcionar información de usuario a [proveedores de servicios (SP)](https://es.wikipedia.org/wiki/Service_provider_\(SAML\)).

En este tutorial aprenderá cómo integrar firmas de Ethereum con SAML para permitir a los usuarios utilizar sus wallets de Ethereum para autenticarse en servicios web2 que aún no soportan Ethereum de forma nativa.

Tenga en cuenta que este tutorial está escrito para dos públicos separados:

- Personas del entorno Ethereum que entienden Ethereum y necesitan aprender sobre SAML
- Personas de web2 que entienden SAML y autenticación web2 y necesitan aprender sobre Ethereum

Como resultado, va a contener mucho material introductorio que usted ya conoce. Si lo desea, puede saltarse esas partes.

### SAML para personas de Ethereum

SAML es un protocolo centralizado. Un proveedor de servicios (SP) solo acepta aseveraciones (como "este es mi usuario John, debe tener permisos para hacer A, B y C") de un proveedor de identidad (IdP) si existe una relación de confianza previa ya sea con él, o con la [autoridad de certificación](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) que firmó el certificado de ese IdP.

Por ejemplo, el SP puede ser una agencia de viajes que proporciona servicios de viaje a empresas y el IdP puede ser el sitio web interno de una empresa. Cuando los empleados necesitan reservar viajes de negocios, la agencia de viajes los redirige para autenticarse con la empresa antes de permitirles reservar el viaje.

![Proceso SAML paso a paso](./fig-01-saml.png)

Así es como las tres entidades, el navegador, el SP y el IdP, negocian el acceso. El SP no necesita saber nada sobre el usuario que utiliza el navegador de antemano, solo debe confiar en el IdP.

### Ethereum para personas de SAML

Ethereum es un sistema descentralizado.

![Inicio de sesión con Ethereum](./fig-02-eth-logon.png)

Los usuarios poseen una clave privada (normalmente guardada en una extensión del navegador). A partir de la clave privada se puede derivar una clave pública, y de esta una dirección de 20 bytes. Cuando los usuarios necesitan iniciar sesión en un sistema, se les solicita firmar un mensaje con un nonce (un valor de un solo uso). El servidor puede verificar que la firma fue creada por esa dirección.

![Obteniendo datos extra de atestaciones](./fig-03-eas-data.png)

La firma solo verifica la dirección de Ethereum. Para obtener otros atributos del usuario, normalmente se utilizan [atestaciones](https://attest.org/). Una atestación normalmente tiene estos campos:

- **Atestador**, la dirección que realizó la atestación
- **Destinatario**, la dirección a la que se aplica la atestación
- **Datos**, los datos que se atestiguan, como nombre, permisos, etc.
- **Esquema**, el ID del esquema empleado para interpretar los datos.

Debido a la naturaleza descentralizada de Ethereum, cualquier usuario puede realizar atestaciones. La identidad del atestador es importante para identificar qué atestaciones consideramos confiables.

## Configuración

El primer paso es disponer de un SP SAML y un IdP SAML que se comuniquen entre sí.

1. Descargue el software. El software de ejemplo para este artículo está [en github](https://github.com/qbzzt/250420-saml-ethereum). Las distintas etapas están almacenadas en diferentes ramas; para esta etapa debe usar `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Cree claves con certificados autofirmados. Esto significa que la clave es su propia autoridad de certificación y debe importarse manualmente en el proveedor de servicios. Consulte [la documentación de OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) para más información.

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Inicie los servidores (tanto SP como IdP)

    ```sh
    pnpm start
    ```

4. Navegue al SP en la URL [http://localhost:3000/](http://localhost:3000/) y haga clic en el botón para ser redirigido al IdP (puerto 3001).

5. Proporcione al IdP su dirección de correo electrónico y haga clic en **Iniciar sesión en el proveedor de servicios**. Verá que es redirigido de vuelta al proveedor de servicios (puerto 3000) y que este lo reconoce por su dirección de correo electrónico.

### Explicación detallada

Esto es lo que sucede, paso a paso:

![Inicio de sesión SAML normal sin Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Este archivo contiene la configuración tanto para el Proveedor de Identidad como para el Proveedor de Servicios. Normalmente serían dos entidades diferentes, pero aquí podemos compartir el código por simplicidad.

```typescript
const fs = await import("fs")

const protocol="http"
```

Por ahora solo estamos probando, así que está bien usar HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Lea las claves públicas, que normalmente están disponibles para ambos componentes (y se confía en ellas directamente, o son firmadas por una autoridad de certificación confiable).

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

Los datos públicos para el proveedor de servicios.

```typescript
    entityID: `${spUrl}/metadata`,
```

Por convención, en SAML el `entityID` es la URL donde la metadata de la entidad está disponible. Estos metadatos corresponden a los datos públicos aquí, excepto que están en formato XML.

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

La definición más importante para nuestros propósitos es `assertionConsumerServer`. Significa que para hacer una afirmación (por ejemplo, "el usuario que le envía esta información es somebody@example.com") al proveedor de servicios necesitamos usar [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) a la URL `http://localhost:3000/sp/assertion`.

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

Los datos públicos para el proveedor de identidad son similares. Especifica que, para iniciar sesión, debe hacer POST a `http://localhost:3001/idp/login` y para cerrar sesión debe hacer POST a `http://localhost:3001/idp/logout`.

#### src/sp.mts

Este es el código que implementa un proveedor de servicios.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Utilizamos la biblioteca [`samlify`](https://www.npmjs.com/package/samlify) para implementar SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

La biblioteca `samlify` espera tener un paquete que valide que el XML es correcto, firmado con la clave pública esperada, etc. Usamos [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) para este propósito.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Un [`Router`](https://expressjs.com/en/5x/api.html#router) de [`express`](https://expressjs.com/) es un "mini sitio web" que puede montarse dentro de un sitio web. En este caso, lo usamos para agrupar todas las definiciones del proveedor de servicios.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

La propia representación del proveedor de servicios consiste en todos los datos públicos y la clave privada que utiliza para firmar información.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Los datos públicos contienen todo lo que el proveedor de servicios necesita saber sobre el proveedor de identidad.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Para facilitar la interoperabilidad con otros componentes SAML, los proveedores de servicios e identidad deben tener sus datos públicos (llamados metadatos) disponibles en formato XML en `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Esta es la página a la que accede el navegador para identificarse. La afirmación incluye el identificador del usuario (aquí usamos dirección de correo electrónico), y puede incluir atributos adicionales. Este es el manejador para el paso 7 en el diagrama de secuencia anterior.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Puede usar el comando comentado para ver los datos XML proveídos en la afirmación. Está [codificado en base64](https://es.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Analice la solicitud de inicio de sesión desde el servidor de identidad.

```typescript
      res.send(`
        <html>
          <body>
            <h2>Hola ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

Envíe una respuesta HTML, solo para mostrar al usuario que se recibió el inicio de sesión.

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

Cree una solicitud de inicio de sesión cuando el navegador intente acceder a esta página. Este es el manejador para el paso 1 en el diagrama de secuencia anterior.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Obtenga la información para enviar una solicitud de inicio de sesión.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Esta página envía el formulario automáticamente (ver abajo). Así, el usuario no tiene que hacer nada para ser redirigido. Este es el paso 2 en el diagrama de secuencia anterior.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Realiza un POST a `loginRequest.entityEndpoint` (la URL del endpoint del proveedor de identidad).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

El nombre del input es `loginRequest.type` (`SAMLRequest`). El contenido de ese campo es `loginRequest.context`, que es nuevamente XML codificado en base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Este middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) lee el cuerpo de la [solicitud HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Por defecto, express lo ignora porque la mayoría de las solicitudes no lo requieren. Lo necesitamos porque POST sí utiliza el cuerpo.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Monte el router en el directorio del proveedor de servicios (`/sp`).

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           Haga clic aquí para iniciar sesión
        </button>
      </body>
    </html>
  `)
})
```

Si un navegador intenta acceder al directorio raíz, proporcione un enlace a la página de inicio de sesión.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Escuche en el `spPort` con esta aplicación express.

#### src/idp.mts

Este es el proveedor de identidad. Es muy similar al proveedor de servicios; las explicaciones a continuación son para las partes que difieren.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Preserve attributes
    attributeNamePrefix: "@_", // Prefix for attributes
  }
)
```

Necesitamos leer y comprender la solicitud XML que recibimos del proveedor de servicios.

```typescript
const getLoginPage = requestId => `
```

Esta función crea la página con el formulario enviado automáticamente que se devuelve en el paso 4 del diagrama de secuencia anterior.

```typescript
<html>
  <head>
    <title>Página de inicio de sesión</title>
  </head>
  <body>
    <h2>Página de inicio de sesión</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Dirección de correo electrónico: <input name="email" />
      <br />
      <button type="Submit">
        Iniciar sesión en el proveedor de servicios
      </button>
```

Hay dos campos que enviamos al proveedor de servicios:

1. El `requestId` al que respondemos.
2. El identificador del usuario (por ahora, la dirección de correo electrónico que indica el usuario).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse,
```

Este es el manejador para el paso 5 en el diagrama de secuencia anterior. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) crea la respuesta de inicio de sesión.

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

Información extraída de la solicitud. El único parámetro que nos importa en la solicitud es el requestId, que permite al proveedor de servicios emparejar solicitudes y sus respuestas.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Ensure signing
```

Necesitamos que `signingKey` tenga los datos para firmar la respuesta. El proveedor de servicios no confía en solicitudes no firmadas.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Este es el campo con la información del usuario que devolvemos al proveedor de servicios.

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

Nuevamente, use un formulario que se envía automáticamente. Este es el paso 6 del diagrama de secuencia anterior.

```typescript

// Punto final de IdP para solicitudes de inicio de sesión
idpRouter.post(`/login`,
```

Este es el punto final que recibe una solicitud de inicio de sesión del proveedor de servicios. Este es el manejador del paso 3 del diagrama de secuencia anterior.

```typescript
  async (req, res) => {
    try {
      // Solución alternativa porque no pude hacer funcionar parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Deberíamos poder usar [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) para leer el ID de la solicitud de autenticación. Sin embargo, no pude lograr que funcionara y no valía la pena invertir mucho tiempo en ello, así que utilizo un [analizador XML de propósito general](https://www.npmjs.com/package/fast-xml-parser). La información que necesitamos es el atributo `ID` dentro de la etiqueta `<samlp:AuthnRequest>`, que se encuentra al nivel superior del XML.

## Usando firmas de Ethereum

Ahora que podemos enviar una identidad de usuario al proveedor de servicios, el siguiente paso es obtener la identidad del usuario de manera confiable. Viem nos permite simplemente solicitar la dirección del usuario a la billetera, pero esto implica pedirle esa información al navegador. No controlamos el navegador, por lo que no podemos confiar automáticamente en la respuesta que recibimos de él.

En su lugar, el IdP va a enviar al navegador una cadena para que la firme. Si la billetera en el navegador firma esta cadena, significa que realmente es esa dirección (es decir, conoce la clave privada que corresponde a la dirección).

Para ver esto en funcionamiento, detén el IdP y SP existentes y ejecuta estos comandos:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Luego navegue [al SP](http://localhost:3000) y siga las instrucciones.

Tenga en cuenta que en este punto no sabemos cómo obtener la dirección de correo electrónico a partir de la dirección de Ethereum, por lo que en su lugar reportamos `<ethereum address>@bad.email.address` al SP.

### Explicación detallada

Los cambios se encuentran en los pasos 4 y 5 del diagrama anterior.

![SAML con una firma de Ethereum](./fig-05-saml-w-signature.png)

El único archivo que cambiamos es `idp.mts`. Aquí están las partes que cambiaron.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Necesitamos estas dos librerías adicionales. Usamos [`uuid`](https://www.npmjs.com/package/uuid) para crear el valor [nonce](https://es.wikipedia.org/wiki/Nonce_\(criptograf%C3%ADa\)). El valor en sí no importa, solo el hecho de que solo se utilice una vez.

La librería [`viem`](https://viem.sh/) nos permite usar definiciones de Ethereum. Aquí la necesitamos para verificar que la firma sea realmente válida.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

La billetera le pide permiso al usuario para firmar el mensaje. Un mensaje que solo es un nonce podría confundir a los usuarios, por eso incluimos este mensaje.

```typescript
// Mantener los requestIDs aquí
let nonces = {}
```

Necesitamos la información de la solicitud para poder responderla. Podríamos enviarla con la solicitud (paso 4), y recibirla de vuelta (paso 5). Sin embargo, no podemos confiar en la información que recibimos del navegador, que está bajo el control de un usuario potencialmente hostil. Por lo tanto, es mejor almacenarla aquí, usando el nonce como clave.

Tenga en cuenta que aquí lo hacemos como una variable por simplicidad. Sin embargo, esto tiene varias desventajas:

- Somos vulnerables a un ataque de denegación de servicio. Un usuario malicioso podría intentar iniciar sesión múltiples veces, llenando nuestra memoria.
- Si el proceso IdP necesita reiniciarse, se perderían los valores existentes.
- No podemos balancear carga entre varios procesos, porque cada uno tendría su propia variable.

En un sistema de producción usaríamos una base de datos e implementaríamos algún mecanismo de expiración.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Cree un nonce y guarde el `requestId` para su uso futuro.

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

Solo podemos trabajar si hay una billetera en el navegador.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Solicite la lista de cuentas a la billetera (`window.ethereum`). Suponga que hay al menos una, y solo guarde la primera.

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

Solicite al usuario que firme un mensaje. Debido a que todo este HTML está en una [plantilla de texto](https://viem.sh/docs/clients/wallet), podemos usar variables definidas en el proceso idp. Este es el paso 4.5 en el diagrama de secuencia.

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

La firma es enviada de vuelta por el navegador, que puede ser potencialmente malicioso (nada impide que usted simplemente abra `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` en el navegador). Por lo tanto, es importante verificar que el proceso IdP maneje correctamente las firmas incorrectas.

```typescript
    </script>
  </head>
  <body>
    <h2>Por favor firme</h2>
    <button onClick="window.goodSignature()">
      Enviar una firma buena (válida)
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Enviar una firma mala (inválida)
    </button>
  </body>
</html>  
`
}
```

El resto es simplemente HTML estándar.

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

Obtenga el ID de la solicitud y borre el nonce de `nonces` para asegurarse de que no pueda reutilizarse.

```typescript
  try {
```

Como hay muchas maneras en que la firma puede ser inválida, envolvemos esto en un bloque `try ... catch` para capturar cualquier error lanzado.

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

El resto del manejador es equivalente a lo que hicimos en el manejador `/loginSubmitted` previamente, salvo por un pequeño cambio.

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

No tenemos la dirección de correo electrónico real (la obtendremos en la siguiente sección), así que por ahora devolvemos la dirección de Ethereum y la marcamos claramente como que no es una dirección de correo válida.

```typescript
// Punto final de IdP para solicitudes de inicio de sesión
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Solución alternativa porque no pude hacer funcionar parseLoginRequest.
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

## Obteniendo la dirección de correo electrónico

El siguiente paso es obtener la dirección de correo electrónico, el identificador solicitado por el proveedor de servicios. Para ello, usamos el [Ethereum Attestation Service (EAS)](https://attest.org/).

La manera más sencilla de obtener atestaciones es usar la [API GraphQL](https://docs.attest.org/docs/developer-tools/api). Usamos esta consulta:

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

Este [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) incluye solo una dirección de correo electrónico. Esta consulta solicita las atestaciones de este esquema. El sujeto de la atestación se llama `recipient`. Siempre es una dirección de Ethereum.

Advertencia: la forma en que estamos obteniendo atestaciones aquí tiene dos problemas de seguridad.

- Estamos accediendo al punto final de la API, `https://optimism.easscan.org/graphql`, que es un componente centralizado. Podemos obtener el atributo `id` y luego hacer una consulta on-chain para comprobar que la atestación es real, pero el punto final de la API aún puede censurar atestaciones al no informarnos sobre ellas.

  Este problema no es imposible de resolver, podríamos ejecutar nuestro propio punto final GraphQL y obtener las atestaciones de los registros de la cadena, pero eso es excesivo para nuestros fines.

- No revisamos la identidad del attester. Cualquiera puede enviarnos información falsa. En una implementación real, tendríamos un conjunto de attesters de confianza y solo consideraríamos sus atestaciones.

Para ver esto en funcionamiento, detén el IdP y SP existentes y ejecuta estos comandos:

```sh
git checkout email-address
pnpm install
pnpm start
```

Luego proporcione su dirección de correo electrónico. Tiene dos maneras de hacerlo:

- Importe una billetera usando una clave privada y use la clave privada de prueba `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Agregue una atestación para su propia dirección de correo electrónico:

  1. Vaya al [esquema en el explorador de atestaciones](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Haga clic en **Attest with Schema**.

  3. Ingrese su dirección de Ethereum como receptor, su correo electrónico como dirección de correo, y seleccione **Onchain**. Luego haga clic en **Make Attestation**.

  4. Acepte la transacción en su billetera. Necesitará algo de ETH en [la cadena de bloques Optimism](https://app.optimism.io/bridge/deposit) para pagar el gas.

De cualquier manera, después de hacer esto, navegue a [http://localhost:3000](http://localhost:3000) y siga las instrucciones. Si importó la clave privada de prueba, el correo que recibirá es `test_addr_0@example.com`. Si usó su propia dirección, debería ser la que usted haya atestiguado.

### Explicación detallada

![Obteniendo de la dirección de Ethereum al correo electrónico](./fig-06-saml-sig-n-email.png)

Los nuevos pasos son la comunicación GraphQL, pasos 5.6 y 5.7.

Nuevamente, aquí están las partes modificadas de `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Importe las librerías que necesitamos.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Hay [un punto final separado para cada blockchain](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Cree un nuevo cliente `GraphQLClient` que podamos usar para consultar el punto final.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL solo nos da un objeto de datos opaco con bytes. Para interpretarlo necesitamos el esquema.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Una función para obtener una dirección de correo electrónico a partir de una dirección de Ethereum.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Esta es una consulta GraphQL.

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

Las atestaciones que queremos son las de nuestro esquema, donde el receptor es `getAddress(ethAddr)`. La función [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) se asegura de que nuestra dirección tenga la [suma de comprobación](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md) correcta. Esto es necesario ya que en GraphQL se diferencia entre mayúsculas y minúsculas. "0xBAD060A7", "0xBad060A7" y "0xbad060a7" son valores diferentes.

```typescript
        take: 1
```

Sin importar cuántas atestaciones encontremos, solo queremos la primera.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Los campos que deseamos recibir.

- `attester`: La dirección que envió la atestación. Normalmente esto se utiliza para decidir si confiar o no en la atestación.
- `id`: El ID de la atestación. Puede usar este valor para [leer la atestación en la cadena](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) y verificar que la información en la consulta de GraphQL sea correcta.
- `data`: Los datos del esquema (en este caso, la dirección de correo electrónico).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Si no hay ninguna atestación, devuelva un valor obviamente incorrecto, pero que parecería válido para el proveedor de servicios.

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

## ¿Qué hay de la descentralización?

En esta configuración, los usuarios no pueden hacerse pasar por alguien que no son, siempre y cuando confiemos en atestadores de confianza para el mapeo de la dirección de Ethereum a la dirección de correo electrónico. Sin embargo, nuestro proveedor de identidad sigue siendo un componente centralizado. Quien tenga la clave privada del proveedor de identidad puede enviar información falsa al proveedor de servicios.

Puede haber una solución usando [cómputo multipartito seguro (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Espero poder escribir sobre esto en un futuro tutorial.

## Conclusión

La adopción de un estándar de inicio de sesión, como las firmas de Ethereum, enfrenta el problema del huevo y la gallina. Los proveedores de servicios quieren captar el mercado más amplio posible. Los usuarios quieren poder acceder a los servicios sin tener que preocuparse por si se admite su estándar de inicio de sesión.
Crear adaptadores, como un IdP de Ethereum, puede ayudarnos a superar este obstáculo.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).
