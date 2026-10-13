---
title: Autenticación en Ethereum
description: "Aprenda cómo funciona la autenticación de usuarios en las aplicaciones de Ethereum: sin contraseñas, solo billeteras y firmas."
lang: es
---

Si viene del desarrollo web tradicional, estará acostumbrado al inicio de sesión con nombre de usuario y contraseña, a los flujos de OAuth y a las cookies de sesión. La autenticación en Ethereum funciona de manera diferente y, en muchos sentidos, de forma más sencilla.

En Ethereum, un usuario demuestra su identidad al **firmar un mensaje con su billetera**. No hay contraseñas que almacenar. No hay bases de datos de credenciales que se puedan filtrar. Solo criptografía.

## ¿En qué se diferencia de la Web2? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Nombre de usuario + contraseña    | Dirección de la billetera + firma                |
| El servidor almacena credenciales | El usuario posee la clave privada                |
| Sesiones gestionadas por cookies / JWT | Las sesiones comienzan con una firma de billetera fuera de la cadena |
| "Iniciar sesión con Google"       | "Iniciar sesión con Ethereum"                    |
| Flujos de restablecimiento de contraseña | Recuperación con frase semilla                   |

El cambio fundamental: en la Web2, un servidor centralizado lo autentica. En Ethereum, **usted se autentica a sí mismo** demostrando que controla una dirección específica, y cualquiera puede verificarlo de forma independiente.

## Requisitos previos {#prerequisites}

Asegúrese de comprender:

- [Las cuentas de Ethereum y cómo funcionan](/developers/docs/accounts/)
- [Qué es una billetera y cómo conectarla](/wallets/)
- [Conceptos básicos de criptografía de clave pública y privada](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Cómo funciona la autenticación basada en billeteras {#how-wallet-auth-works}

El flujo principal es sencillo:

1. **Su aplicación descentralizada (dapp) le pide al usuario que conecte su billetera** (a través de MetaMask, Rainbow, WalletConnect, etc.)
2. **La billetera comparte la dirección de Ethereum del usuario**: este es su identificador público
3. **Su dapp genera un mensaje único** (un nonce o desafío)
4. **El usuario firma el mensaje** con su clave privada (ocurre dentro de la billetera)
5. **Su backend verifica la firma** con la dirección reclamada
6. **Si es válida, el usuario queda autenticado**

Nunca se escribió, almacenó ni transmitió ninguna contraseña.

## Iniciar sesión con Ethereum (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) define un formato de mensaje estándar para el inicio de sesión en Ethereum, comúnmente llamado **SIWE** (Sign-In with Ethereum). Reemplaza la firma de mensajes ad-hoc con un estándar estructurado y seguro.

Un mensaje SIWE se ve así:

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

Características clave de SIWE:

- **Vinculación de dominio**: el mensaje incluye el dominio, lo que previene el phishing
- **ID de la cadena**: especifica para qué red es válida la firma
- **Nonce**: previene los ataques de repetición
- **Caducidad**: marca de tiempo opcional que limita la ventana de validez
- **Recursos**: URI opcionales para acceso con alcance limitado

### Bibliotecas SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)**: implementación oficial en TypeScript por Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)**: implementación en Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)**: implementación en Go

### Ejemplo: inicio de sesión del lado del cliente con siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Obtener un nonce de tu backend
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Crear y firmar el mensaje SIWE
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

  // 3. Enviar al backend para su verificación
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Ejemplo: verificación del lado del servidor (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Emitir un nonce y guardarlo en la sesión para que /verify pueda comprobarlo más tarde
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
      // data.address es la dirección de Ethereum verificada
      // Crear una sesión o JWT para el usuario
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Bibliotecas de conexión de billeteras {#wallet-connection-libraries}

Antes de autenticar, necesita que el usuario conecte su billetera. Estas bibliotecas lo facilitan:

- **[RainbowKit](https://www.rainbowkit.com/)**: componente de React listo para usar con una hermosa interfaz de usuario
- **[ConnectKit](https://docs.family.co/connectkit)**: modal de conexión de billetera listo para integrar
- **[AppKit (WalletConnect)](https://reown.com/appkit)**: conexión de billetera multicadena con SIWE integrado
- **[Wagmi](https://wagmi.sh)**: biblioteca de React Hooks con `useAccount`, `useConnect`

## Verificación manual de firmas {#verifying-manually}

Si prefiere no usar SIWE, puede verificar las firmas directamente:

```ts
import { verifyMessage } from 'ethers'

// El mensaje que el usuario firmó
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Recuperar la dirección del firmante a partir de la firma
const recoveredAddress = verifyMessage(message, signature)

// Comparar con la dirección reclamada
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Autenticación exitosa
}
```

### Notas importantes de seguridad {#security-notes}

- **Use siempre un nonce**: previene los ataques de repetición en los que se reutiliza una firma antigua
- **Incluya el dominio**: evita que las firmas sean válidas en diferentes sitios
- **Compruebe la caducidad**: las firmas deben tener una ventana de validez limitada
- **Use SIWE (EIP-4361) cuando sea posible**: se encarga de todo lo anterior por usted
- **Nunca exponga las claves privadas**: la firma ocurre dentro de la billetera; su aplicación solo ve el resultado

## Gestión de sesiones {#session-management}

Una vez autenticado, seguirá necesitando sesiones, al igual que en la Web2. Patrones comunes:

- **Tokens JWT**: emita un JWT después de verificar la firma, utilícelo para solicitudes a la API
- **Sesiones del lado del servidor**: almacene la dirección verificada en una cookie de sesión
- **SIWE con recursos**: defina tokens de acceso con alcance limitado vinculados a URI específicos

La diferencia clave con la Web2: la dirección de Ethereum del usuario es su identidad persistente. Pueden usarla en cualquier dapp sin crear una cuenta nueva.

## Identidad descentralizada {#decentralized-identity}

La autenticación de Ethereum es parte de un movimiento más amplio hacia la **identidad autosoberana**. Los estándares y proyectos en este espacio incluyen:

- **[Ethereum Name Service (ENS)](https://ens.domains/)**: nombres legibles por humanos (por ejemplo, `vitalik.eth`) que se resuelven en direcciones
- **[Ethereum Attestation Service (EAS)](https://attest.org/)**: atestaciones en cadena sobre identidad y credenciales
- **[Identificadores descentralizados (DID) del W3C](https://www.w3.org/TR/did-core/)**: estándar global para la identidad descentralizada verificable
- **[Ceramic Network](https://ceramic.network/)**: flujos de datos descentralizados vinculados a un DID

## Lecturas adicionales {#further-reading}

- [EIP-4361: Iniciar sesión con Ethereum](https://eips.ethereum.org/EIPS/eip-4361)
- [Documentación de SIWE](https://docs.login.xyz/)
- [Iniciar sesión con Ethereum en Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Documentación de autenticación de Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Documentación de ENS](https://docs.ens.domains/)

## Temas relacionados {#related-topics}

- [Cuentas de Ethereum](/developers/docs/accounts/)
- [Bibliotecas de API de JavaScript](/developers/docs/apis/javascript/)
- [Bibliotecas de API de backend](/developers/docs/apis/backend/)
- [Billeteras](/wallets/)