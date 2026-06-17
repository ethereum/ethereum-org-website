---
title: "Algunos trucos utilizados por los tokens fraudulentos y cómo detectarlos"
description: En este tutorial analizamos un token fraudulento para ver algunos de los trucos que utilizan los estafadores, cómo los implementan y cómo podemos detectarlos.
author: Ori Pomerantz
tags: ["estafa", "solidity", "erc-20", "javascript", "typescript"]
skill: intermediate
breadcrumb: Trucos de tokens fraudulentos
published: 2023-09-15
lang: es
---

En este tutorial analizamos [un token fraudulento](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) para ver algunos de los trucos que utilizan los estafadores y cómo los implementan. Al final del tutorial, tendrá una visión más completa de los contratos de tokens ERC-20, sus capacidades y por qué es necesario el escepticismo. Luego, analizamos los eventos emitidos por ese token fraudulento y vemos cómo podemos identificar automáticamente que no es legítimo.

## Tokens fraudulentos: qué son, por qué la gente los crea y cómo evitarlos {#scam-tokens}

Uno de los usos más comunes de Ethereum es que un grupo cree un token negociable, en cierto sentido, su propia moneda. Sin embargo, dondequiera que haya casos de uso legítimos que aporten valor, también hay delincuentes que intentan robar ese valor para sí mismos.

Puede leer más sobre este tema [en otras partes de ethereum.org](/guides/how-to-id-scam-tokens/) desde la perspectiva del usuario. Este tutorial se centra en analizar un token fraudulento para ver cómo se hace y cómo se puede detectar.

### ¿Cómo sé que wARB es una estafa? {#warb-scam}

El token que analizamos es [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), que pretende ser equivalente al [token ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) legítimo.

La forma más fácil de saber cuál es el token legítimo es observar a la organización de origen, [Arbitrum](https://arbitrum.foundation/). Las direcciones legítimas se especifican [en su documentación](https://docs.arbitrum.foundation/deployment-addresses#token).

### ¿Por qué está disponible el código fuente? {#why-source}

Normalmente esperaríamos que las personas que intentan estafar a otras sean reservadas y, de hecho, muchos tokens fraudulentos no tienen su código disponible (por ejemplo, [este](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) y [este](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Sin embargo, los tokens legítimos suelen publicar su código fuente, por lo que, para parecer legítimos, los autores de los tokens fraudulentos a veces hacen lo mismo. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) es uno de esos tokens con código fuente disponible, lo que facilita su comprensión.

Si bien los implementadores de contratos pueden elegir si publicar o no el código fuente, _no pueden_ publicar el código fuente incorrecto. El explorador de bloques compila el código fuente proporcionado de forma independiente y, si no obtiene exactamente el mismo código de bytes, rechaza ese código fuente. [Puede leer más sobre esto en el sitio de Etherscan](https://etherscan.io/verifyContract).

## Comparación con tokens ERC-20 legítimos {#compare-legit-erc20}

Vamos a comparar este token con tokens ERC-20 legítimos. Si no está familiarizado con cómo se escriben normalmente los tokens ERC-20 legítimos, [consulte este tutorial](/developers/tutorials/erc20-annotated-code/).

### Constantes para direcciones privilegiadas {#constants-for-privileged-addresses}

Los contratos a veces necesitan direcciones privilegiadas. Los contratos que están diseñados para uso a largo plazo permiten que alguna dirección privilegiada cambie esas direcciones, por ejemplo, para habilitar el uso de un nuevo contrato de multifirma. Hay varias formas de hacer esto.

El [contrato de token `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) utiliza el patrón [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). La dirección privilegiada se mantiene en el almacenamiento, en un campo llamado `_owner` (consulte el tercer archivo, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

El [contrato de token `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) no tiene una dirección privilegiada directamente. Sin embargo, no la necesita. Se encuentra detrás de un [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) en la [dirección `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Ese contrato tiene una dirección privilegiada (consulte el cuarto archivo, `ERC1967Upgrade.sol`) que se puede utilizar para actualizaciones.

```solidity
    /**
     * @dev Almacena una nueva dirección en la ranura de administrador EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Por el contrario, el contrato `wARB` tiene un `contract_owner` codificado de forma rígida.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[El propietario de este contrato](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) no es un contrato que pueda ser controlado por diferentes cuentas en diferentes momentos, sino una [cuenta de propiedad externa](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Esto significa que probablemente esté diseñado para el uso a corto plazo por parte de un individuo, en lugar de como una solución a largo plazo para controlar un ERC-20 que seguirá siendo valioso.

Y de hecho, si miramos en Etherscan vemos que el estafador solo usó este contrato durante 12 horas (desde la [primera transacción](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) hasta la [última transacción](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) durante el 19 de mayo de 2023.

### La función `_transfer` falsa {#the-fake-transfer-function}

Es estándar que las transferencias reales se realicen utilizando [una función `_transfer` interna](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

En `wARB` esta función parece casi legítima:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

La parte sospechosa es:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Si el propietario del contrato envía tokens, ¿por qué el evento `Transfer` muestra que provienen de `deployer`?

Sin embargo, hay un problema más importante. ¿Quién llama a esta función `_transfer`? No se puede llamar desde el exterior, está marcada como `internal`. Y el código que tenemos no incluye ninguna llamada a `_transfer`. Claramente, está aquí como un señuelo.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Cuando observamos las funciones a las que se llama para transferir tokens, `transfer` y `transferFrom`, vemos que llaman a una función completamente diferente, `_f_`.

### La verdadera función `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Hay dos posibles señales de alerta en esta función.

- El uso del [modificador de función](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Sin embargo, cuando miramos el código fuente vemos que `_mod_` es en realidad inofensivo.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- El mismo problema que vimos en `_transfer`, que es cuando `contract_owner` envía tokens, parecen provenir de `deployer`.

### La función de eventos falsos `dropNewTokens` {#the-fake-events-function-dropnewtokens}

Ahora llegamos a algo que parece una estafa real. Edité un poco la función para facilitar la lectura, pero es funcionalmente equivalente.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Esta función tiene el modificador `auth()`, lo que significa que solo puede ser llamada por el propietario del contrato.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Esta restricción tiene mucho sentido, porque no querríamos que cuentas aleatorias distribuyeran tokens. Sin embargo, el resto de la función es sospechoso.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Una función para transferir desde una cuenta de fondo común a una matriz de receptores una matriz de cantidades tiene mucho sentido. Hay muchos casos de uso en los que querrá distribuir tokens desde una sola fuente a múltiples destinos, como nóminas, airdrops, etc. Es más barato (en gas) hacerlo en una sola transacción en lugar de emitir múltiples transacciones, o incluso llamar al ERC-20 varias veces desde un contrato diferente como parte de la misma transacción.

Sin embargo, `dropNewTokens` no hace eso. Emite [eventos `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), pero en realidad no transfiere ningún token. No hay ninguna razón legítima para confundir a las aplicaciones fuera de la cadena informándoles de una transferencia que en realidad no ocurrió.

### La función de quemado `Approve` {#the-burning-approve-function}

Se supone que los contratos ERC-20 tienen [una función `approve`](/developers/tutorials/erc20-annotated-code/#approve) para asignaciones, y de hecho nuestro token fraudulento tiene tal función, e incluso es correcta. Sin embargo, debido a que Solidity desciende de C, distingue entre mayúsculas y minúsculas. "Approve" y "approve" son cadenas diferentes.

Además, la funcionalidad no está relacionada con `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Esta función se llama con una matriz de direcciones para los titulares del token.

```solidity
    public approver() {
```

El modificador `approver()` se asegura de que solo `contract_owner` tenga permiso para llamar a esta función (consulte a continuación).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Para cada dirección de titular, la función mueve el saldo completo del titular a la dirección `0x00...01`, quemándolo efectivamente (el `burn` real en el estándar también cambia el suministro total y transfiere los tokens a `0x00...00`). Esto significa que `contract_owner` puede eliminar los activos de cualquier usuario. Esa no parece una característica que desearía en un token de gobernanza.

### Problemas de calidad del código {#code-quality-issues}

Estos problemas de calidad del código no _prueban_ que este código sea una estafa, pero lo hacen parecer sospechoso. Las empresas organizadas como Arbitrum no suelen publicar un código tan malo.

#### La función `mount` {#the-mount-function}

Si bien no se especifica en [el estándar](https://eips.ethereum.org/EIPS/eip-20), en términos generales, la función que crea nuevos tokens se llama [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Si miramos en el constructor de `wARB`, vemos que la función de acuñación de tiempo ha sido renombrada a `mount` por alguna razón, y se llama cinco veces con una quinta parte del suministro inicial, en lugar de una vez por la cantidad total por eficiencia.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

La función `mount` en sí también es sospechosa.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Al observar el `require`, vemos que solo el propietario del contrato tiene permiso para acuñar. Eso es legítimo. Pero el mensaje de error debería ser _only owner is allowed to mint_ (solo el propietario tiene permiso para acuñar) o algo similar. En cambio, es el irrelevante _ERC20: mint to the zero address_ (ERC20: acuñar a la dirección cero). La prueba correcta para acuñar a la dirección cero es `require(account != address(0), "<error message>")`, que el contrato nunca se molesta en verificar.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Hay dos hechos más sospechosos, directamente relacionados con la acuñación:

- Hay un parámetro `account`, que presumiblemente es la cuenta que debería recibir la cantidad acuñada. Pero el saldo que aumenta es en realidad el de `contract_owner`.

- Si bien el saldo incrementado pertenece a `contract_owner`, el evento emitido muestra una transferencia a `account`.

### ¿Por qué tanto `auth` como `approver`? ¿Por qué el `mod` que no hace nada? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Este contrato contiene tres modificadores: `_mod_`, `auth` y `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` toma tres parámetros y no hace nada con ellos. ¿Por qué tenerlo?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` y `approver` tienen más sentido, porque verifican que el contrato fue llamado por `contract_owner`. Esperaríamos que ciertas acciones privilegiadas, como la acuñación, se limitaran a esa cuenta. Sin embargo, ¿cuál es el punto de tener dos funciones separadas que hacen _exactamente lo mismo_?

## ¿Qué podemos detectar automáticamente? {#what-can-we-detect-automatically}

Podemos ver que `wARB` es un token fraudulento al mirar en Etherscan. Sin embargo, esa es una solución centralizada. En teoría, Etherscan podría ser subvertido o hackeado. Es mejor poder averiguar de forma independiente si un token es legítimo o no.

Hay algunos trucos que podemos usar para identificar que un token ERC-20 es sospechoso (ya sea una estafa o está muy mal escrito), observando los eventos que emiten.

## Eventos `Approval` sospechosos {#suspicious-approval-events}

Los [eventos `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) solo deberían ocurrir con una solicitud directa (a diferencia de los [eventos `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) que pueden ocurrir como resultado de una asignación). [Consulte la documentación de Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) para obtener una explicación detallada de este problema y por qué las solicitudes deben ser directas, en lugar de estar mediadas por un contrato.

Esto significa que los eventos `Approval` que aprueban el gasto de una [cuenta de propiedad externa](/developers/docs/accounts/#types-of-account) tienen que provenir de transacciones que se originan en esa cuenta, y cuyo destino es el contrato ERC-20. Cualquier otro tipo de aprobación de una cuenta de propiedad externa es sospechosa.

Aquí hay [un programa que identifica este tipo de evento](https://github.com/qbzzt/20230915-scam-token-detection), utilizando [Viem](https://viem.sh/) y [TypeScript](https://www.typescriptlang.org/docs/), una variante de JavaScript con seguridad de tipos. Para ejecutarlo:

1. Copie `.env.example` a `.env`.
2. Edite `.env` para proporcionar la URL a un nodo de la red principal de Ethereum.
3. Ejecute `pnpm install` para instalar los paquetes necesarios.
4. Ejecute `pnpm susApproval` para buscar aprobaciones sospechosas.

Aquí hay una explicación línea por línea:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Importe definiciones de tipos, funciones y la definición de la cadena desde `viem`.

```typescript
import { config } from "dotenv"
config()
```

Lea `.env` para obtener la URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Cree un cliente de Viem. Solo necesitamos leer de la cadena de bloques, por lo que este cliente no necesita una clave privada.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

La dirección del contrato ERC-20 sospechoso y los bloques dentro de los cuales buscaremos eventos. Los proveedores de nodos generalmente limitan nuestra capacidad de leer eventos porque el ancho de banda puede resultar costoso. Afortunadamente, `wARB` no estuvo en uso durante un período de dieciocho horas, por lo que podemos buscar todos los eventos (solo hubo 13 en total).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Esta es la forma de pedirle a Viem información sobre eventos. Cuando le proporcionamos la firma exacta del evento, incluidos los nombres de los campos, analiza el evento por nosotros.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Nuestro algoritmo solo es aplicable a cuentas de propiedad externa. Si hay algún código de bytes devuelto por `client.getBytecode`, significa que se trata de un contrato y simplemente deberíamos omitirlo.

Si no ha usado TypeScript antes, la definición de la función puede parecer un poco extraña. No solo le decimos que el primer (y único) parámetro se llama `addr`, sino también que es de tipo `Address`. De manera similar, la parte `: boolean` le dice a TypeScript que el valor de retorno de la función es un booleano.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Esta función obtiene el recibo de la transacción de un evento. Necesitamos el recibo para asegurarnos de saber cuál fue el destino de la transacción.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Esta es la función más importante, la que realmente decide si un evento es sospechoso o no. El tipo de retorno, `(Event | null)`, le dice a TypeScript que esta función puede devolver un `Event` o `null`. Devolvemos `null` si el evento no es sospechoso.

```typescript
const owner = ev.args._owner
```

Viem tiene los nombres de los campos, por lo que analizó el evento por nosotros. `_owner` es el propietario de los tokens que se gastarán.

```typescript
// Las aprobaciones por contratos no son sospechosas
if (await isContract(owner)) return null
```

Si el propietario es un contrato, asuma que esta aprobación no es sospechosa. Para verificar si la aprobación de un contrato es sospechosa o no, necesitaremos rastrear la ejecución completa de la transacción para ver si alguna vez llegó al contrato del propietario, y si ese contrato llamó al contrato ERC-20 directamente. Eso consume muchos más recursos de lo que nos gustaría hacer.

```typescript
const txn = await getEventTxn(ev)
```

Si la aprobación proviene de una cuenta de propiedad externa, obtenga la transacción que la causó.

```typescript
// La aprobación es sospechosa si proviene de un propietario de EOA que no es el `from` de la transacción
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

No podemos simplemente verificar la igualdad de cadenas porque las direcciones son hexadecimales, por lo que contienen letras. A veces, por ejemplo en `txn.from`, esas letras están todas en minúsculas. En otros casos, como `ev.args._owner`, la dirección está en [mayúsculas y minúsculas para la identificación de errores](https://eips.ethereum.org/EIPS/eip-55).

Pero si la transacción no es del propietario, y ese propietario es de propiedad externa, entonces tenemos una transacción sospechosa.

```typescript
// También es sospechoso si el destino de la transacción no es el contrato ERC-20 que estamos
// investigando
if (txn.to.toLowerCase() != testedAddress) return ev
```

De manera similar, si la dirección `to` de la transacción, el primer contrato llamado, no es el contrato ERC-20 bajo investigación, entonces es sospechosa.

```typescript
    // Si no hay razón para sospechar, devuelve null.
    return null
}
```

Si ninguna de las condiciones es verdadera, entonces el evento `Approval` no es sospechoso.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Una función `async`](https://www.w3schools.com/js/js_async.asp) devuelve un objeto `Promise`. Con la sintaxis común, `await x()`, esperamos a que se cumpla ese `Promise` antes de continuar con el procesamiento. Esto es fácil de programar y seguir, pero también es ineficiente. Mientras esperamos a que se cumpla el `Promise` para un evento específico, ya podemos empezar a trabajar en el siguiente evento.

Aquí usamos [`map`](https://www.w3schools.com/jsref/jsref_map.asp) para crear una matriz de objetos `Promise`. Luego usamos [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) para esperar a que se resuelvan todas esas promesas. Luego aplicamos [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) a esos resultados para eliminar los eventos no sospechosos.

### Eventos `Transfer` sospechosos {#suspicious-transfer-events}

Otra forma posible de identificar tokens fraudulentos es ver si tienen transferencias sospechosas. Por ejemplo, transferencias desde cuentas que no tienen tantos tokens. Puede ver [cómo implementar esta prueba](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), pero `wARB` no tiene este problema.

## Conclusión {#conclusion}

La detección automatizada de estafas ERC-20 sufre de [falsos negativos](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), porque una estafa puede usar un contrato de token ERC-20 perfectamente normal que simplemente no representa nada real. Por lo tanto, siempre debe intentar _obtener la dirección del token de una fuente confiable_.

La detección automatizada puede ayudar en ciertos casos, como en las piezas de finanzas descentralizadas (DeFi), donde hay muchos tokens y deben manejarse automáticamente. Pero como siempre, [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp) (el riesgo es del comprador), haga su propia investigación y anime a sus usuarios a hacer lo mismo.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).