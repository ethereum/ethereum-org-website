---
title: "Patrocinio de tarifas de gas: Cómo cubrir los costos de transacción para sus usuarios"
description: "Es fácil crear una clave privada y una dirección; es solo cuestión de ejecutar el software adecuado. Pero hay muchos lugares en el mundo donde conseguir el ETH para enviar transacciones es mucho más difícil. En este tutorial aprenderá cómo cubrir los costos de gas en cadena para ejecutar datos estructurados fuera de la cadena firmados por el usuario en su contrato inteligente. Usted hace que el usuario firme una estructura que contiene la información de la transacción, que luego su código fuera de la cadena envía a la cadena de bloques como una transacción."
author: Ori Pomerantz
tags: ["sin gas", "Solidity", "eip-712", "metatransacciones"]
skill: intermediate
breadcrumb: Patrocinio de gas
lang: es
published: 2026-02-27
---

## Introducción {#introduction}

Si queremos que Ethereum sirva a [mil millones de personas más](https://blog.ethereum.org/category/next-billion), necesitamos eliminar la fricción y hacerlo lo más fácil de usar posible. Una fuente de esta fricción es la necesidad de ETH para pagar las tarifas de gas.

Si tiene una aplicación descentralizada (dapp) que gana dinero de los usuarios, podría tener sentido permitir que los usuarios envíen transacciones a través de su servidor y pagar usted mismo las tarifas de transacción. Debido a que los usuarios aún firman un [mensaje de autorización EIP-712](https://eips.ethereum.org/EIPS/eip-712) en sus billeteras, conservan las garantías de integridad de Ethereum. La disponibilidad depende del servidor que retransmite las transacciones, por lo que es más limitada. Sin embargo, puede configurar las cosas para que los usuarios también puedan acceder al contrato inteligente directamente (si consiguen ETH), y permitir que otros configuren sus propios servidores si desean patrocinar transacciones.

La técnica de este tutorial solo funciona cuando usted controla el contrato inteligente. Existen otras técnicas, incluida la [abstracción de cuentas](https://eips.ethereum.org/EIPS/eip-4337), que le permiten patrocinar transacciones a otros contratos inteligentes, las cuales espero cubrir en un futuro tutorial.

Nota: Este _no_ es código de nivel de producción. Es vulnerable a ataques significativos y carece de características importantes. Obtenga más información en la [sección de vulnerabilidades de esta guía](#vulnerabilities).

### Requisitos previos {#prerequisites}

Para entender este tutorial, ya debe estar familiarizado con:

- Solidity
- JavaScript
- React y WAGMI. Si no está familiarizado con estas herramientas de interfaz de usuario, [tenemos un tutorial para ello](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## La aplicación de muestra {#sample-app}

La aplicación de muestra aquí es una variante del contrato `Greeter` de Hardhat. Puede verla [en GitHub](https://github.com/qbzzt/260301-gasless). El contrato inteligente ya está implementado en [Sepolia](https://sepolia.dev/), en la dirección [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

Para verla en acción, siga estos pasos.

1. Clone el repositorio e instale el software necesario.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. Edite `.env` para configurar `PRIVATE_KEY` con una billetera que tenga ETH en Sepolia. Si necesita ETH de Sepolia, [use un faucet](/developers/docs/networks/#sepolia). Idealmente, esta clave privada debería ser diferente de la que tiene en la billetera de su navegador.

3. Inicie el servidor.

   ```sh
   npm run dev
   ```

4. Navegue a la aplicación en la URL [`http://localhost:5173`](http://localhost:5173).

5. Haga clic en **Connect with Injected** para conectarse a una billetera. Apruebe en la billetera y apruebe el cambio a Sepolia si es necesario.

6. Escriba un nuevo saludo y haga clic en **Update greeting via sponsor**.

7. Firme el mensaje.

8. Espere unos 12 segundos (el tiempo de bloque en Sepolia). Mientras espera, puede mirar la URL en la consola del servidor para ver la transacción.

9. Vea que el saludo cambió y que el valor de la dirección de la última actualización ahora es la dirección de la billetera de su navegador.

Para entender cómo funciona esto, necesitamos ver cómo se crea el mensaje en la interfaz de usuario, cómo lo retransmite el servidor y cómo lo procesa el contrato inteligente.

### La interfaz de usuario {#ui-changes}

La interfaz de usuario se basa en [WAGMI](https://wagmi.sh/); puede leer sobre ello [en este tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Así es como firmamos el mensaje:

```js
const signGreeting = useCallback(
```

El hook de React [`useCallback`](https://react.dev/reference/react/useCallback) nos permite mejorar el rendimiento al reutilizar la misma función cuando se vuelve a dibujar el componente.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

Si no hay una cuenta, genere un error. Esto nunca debería suceder porque el botón de la interfaz de usuario que inicia el proceso que llama a `signGreeting` está deshabilitado en ese caso. Sin embargo, futuros programadores podrían eliminar esa protección, por lo que es una buena idea verificar esta condición aquí también.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Parámetros para el [separador de dominio](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Este valor es constante, por lo que en una implementación mejor optimizada, podríamos calcularlo una vez en lugar de recalcularlo cada vez que se llama a la función.

- `name` es un nombre legible por el usuario, como el nombre de la aplicación descentralizada (dapp) para la que estamos produciendo firmas.
- `version` es la versión. Las diferentes versiones no son compatibles.
- `chainId` es la cadena que estamos usando, tal como la proporciona [WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` es la dirección del contrato que verificará esta firma. No queremos que la misma firma se aplique a múltiples contratos, en caso de que haya varios contratos `Greeter` y queramos que tengan diferentes saludos.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

El tipo de datos que firmamos. Aquí, tenemos un solo parámetro, `greeting`, pero los sistemas de la vida real suelen tener más.

```js
        const message = { greeting }
```

El mensaje real que queremos firmar y enviar. `greeting` es tanto el nombre del campo como el nombre de la variable que lo llena.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Obtener realmente la firma. Esta función es asíncrona porque los usuarios tardan mucho tiempo (desde la perspectiva de una computadora) en firmar datos.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

La función devuelve un único valor hexadecimal. Aquí lo dividimos en campos.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Si alguna de estas variables cambia, cree una nueva instancia de la función. Los parámetros `account` y `chainId` pueden ser cambiados por el usuario en la billetera. `contractAddr` es una función del Id de la cadena. `signTypedDataAsync` no debería cambiar, pero lo importamos de [un hook](https://wagmi.sh/react/api/hooks/useSignTypedData), por lo que no podemos estar seguros, y es mejor agregarlo aquí.

Ahora que el nuevo saludo está firmado, necesitamos enviarlo al servidor.

```js
  const sponsoredGreeting = async () => {
    try {
```

Esta función toma una firma y la envía al servidor.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Enviar a la ruta `/server/sponsor` en el servidor del que venimos.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Use `POST` para enviar la información codificada en JSON.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Muestre la respuesta. En un sistema de producción también mostraríamos la respuesta al usuario.

### El servidor {#server}

Me gusta usar [Vite](https://vite.dev/) como mi front-end. Sirve automáticamente las bibliotecas de React y actualiza el navegador cuando cambia el código del front-end. Sin embargo, Vite no incluye herramientas de backend.

La solución está en [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Dejar que Vite se encargue de todo lo demás
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

Primero registramos un manejador para las solicitudes que manejamos nosotros mismos (`POST` a `/server/sponsor`). Luego creamos y usamos un servidor Vite para manejar todas las demás URL.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

Esta es solo una llamada estándar a la cadena de bloques con [viem](https://viem.sh/).

### El contrato inteligente {#smart-contract}

Finalmente, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) necesita verificar la firma.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

El constructor crea el [separador de dominio](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), de manera similar al código de la interfaz de usuario anterior. La ejecución en la cadena de bloques es mucho más costosa, por lo que solo lo calculamos una vez.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

Esta es la estructura que se firma. Aquí tenemos solo un campo.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

Este es el [identificador de estructura](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). Se calcula cada vez en la interfaz de usuario.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Esta función recibe una solicitud firmada y actualiza el saludo.

```solidity
        // Calcular el resumen EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

Cree el resumen (digest) de acuerdo con [EIP 712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // Recuperar el firmante
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Use [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) para obtener la dirección del firmante. Tenga en cuenta que una firma incorrecta aún puede resultar en una dirección válida, solo que aleatoria.

```solidity
        // Aplicar el saludo como si el firmante lo hubiera llamado
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Actualice el saludo.

## Vulnerabilidades {#vulnerabilities}

Este _no_ es código de nivel de producción. Es vulnerable a ataques significativos y carece de características importantes. Aquí hay algunas, junto con cómo resolverlas.

Para ver algunos de estos ataques, haga clic en los botones bajo el encabezado _Attacks_ y vea qué sucede. Para el botón **Invalid signature**, verifique la consola del servidor para ver la respuesta de la transacción.

### Denegación de servicio en el servidor {#dos-on-server}

El ataque más fácil es un ataque de [denegación de servicio](https://en.wikipedia.org/wiki/Denial-of-service_attack) en el servidor. El servidor recibe solicitudes de cualquier parte de Internet y, en función de esas solicitudes, envía transacciones. No hay absolutamente nada que impida a un atacante emitir un montón de firmas, válidas o inválidas. Cada una causará una transacción. Eventualmente, el servidor se quedará sin ETH para pagar el gas.

Una solución a este problema es limitar la tasa a una transacción por bloque. Si el propósito es mostrar saludos a [cuentas de propiedad externa](/developers/docs/accounts/#key-differences), de todos modos no importa cuál sea el saludo en el medio del bloque.

Otra solución es realizar un seguimiento de las direcciones y solo permitir firmas de clientes válidos.

### Firmas de saludo incorrectas {#wrong-greeting-sigs}

Cuando hace clic en **Signature for wrong greeting**, envía una firma válida para una dirección específica (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) y un saludo (`Hello`). Pero lo envía con un saludo diferente. Esto confunde a `ecrecover`, que cambia el saludo pero tiene la dirección incorrecta.

Para resolver este problema, agregue la dirección a la [estructura firmada](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). De esta manera, la dirección aleatoria de `ecrecover` no coincidirá con la dirección en la firma, y el contrato inteligente rechazará el mensaje.

### Ataques de repetición {#replay-attack}

Cuando hace clic en **Replay attack**, envía la misma firma "Soy 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e, y me gustaría que el saludo fuera `Hello`", pero con el saludo correcto. Como resultado, el contrato inteligente cree que la dirección (que no es la suya) volvió a cambiar el saludo a `Hello`. La información para hacer esto está disponible públicamente en la [información de la transacción](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

Si esto es un problema, una solución es agregar un [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Tenga un [mapeo](https://docs.soliditylang.org/en/latest/types.html#mapping-types) entre direcciones y números, y agregue un campo nonce a la firma. Si el campo nonce coincide con el mapeo para la dirección, acepte la firma e incremente el mapeo para la próxima vez. Si no es así, rechace la transacción.

Otra solución es agregar una marca de tiempo a los datos firmados y aceptar la firma como válida solo durante unos segundos después de esa marca de tiempo. Esto es más simple y económico, pero corremos el riesgo de ataques de repetición dentro de la ventana de tiempo, y el fallo de transacciones legítimas si se excede la ventana de tiempo.

## Otras características faltantes {#other-missing-features}

Hay características adicionales que agregaríamos en un entorno de producción.

### Acceso desde otros servidores {#other-servers}

Actualmente, permitimos que cualquier dirección envíe un `sponsorSetGreeting`. Esto puede ser exactamente lo que queremos, en aras de la descentralización. O tal vez queramos asegurarnos de que las transacciones patrocinadas pasen por _nuestro_ servidor, en cuyo caso verificaríamos `msg.sender` en el contrato inteligente.

De cualquier manera, esta debería ser una decisión de diseño consciente, no solo el resultado de no pensar en el problema.

### Manejo de errores {#error-handling}

Un usuario envía un saludo. Tal vez se actualice en el siguiente bloque. Tal vez no. Los errores son invisibles. En un sistema de producción, el usuario debería poder distinguir entre estos casos:

- El nuevo saludo aún no se ha enviado
- El nuevo saludo se ha enviado y está en proceso
- El nuevo saludo ha sido rechazado

## Conclusión

Llegados a este punto, debería ser capaz de crear una experiencia sin gas para los usuarios de su aplicación descentralizada (dapp), a costa de cierta centralización.

Sin embargo, esto solo funciona con contratos inteligentes que admiten ERC-712. Para transferir un token ERC-20, por ejemplo, es necesario que la transacción sea firmada por el propietario en lugar de solo un mensaje. La solución más simple es que los activos no sean propiedad de la dirección EOA, sino de un contrato separado (una forma simple de [abstracción de cuentas](/roadmap/account-abstraction/)). Puede leer más al respecto [en el siguiente tutorial](/developers/tutorials/gasless-token).

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).
