---
title: Escribir un plasma específico para una aplicación que preserve la privacidad
description: En este tutorial, construimos un banco semisecreto para depósitos. El banco es un componente centralizado; conoce el saldo de cada usuario. Sin embargo, esta información no se almacena en la cadena. En su lugar, el banco publica un hash del estado. Cada vez que ocurre una transacción, el banco publica el nuevo hash, junto con una prueba de conocimiento cero de que tiene una transacción firmada que cambia el estado del hash por el nuevo. Después de leer este tutorial, entenderá no solo cómo utilizar las pruebas de conocimiento cero, sino también por qué se utilizan y cómo hacerlo de forma segura.
author: Ori Pomerantz
tags:
  [
    "conocimiento-cero",
    "servidor",
    "fuera de la cadena",
    "privacidad"
  ]
skill: advanced
lang: es
published: 15-10-2025
---

## Introducción {#introduction}

A diferencia de los [rollups](/developers/docs/scaling/zk-rollups/), los [plasmas](/developers/docs/scaling/plasma) utilizan la red principal de Ethereum para la integridad, pero no para la disponibilidad. En este artículo, escribimos una aplicación que se comporta como un plasma, con Ethereum garantizando la integridad (sin cambios no autorizados), pero no la disponibilidad (un componente centralizado puede caerse e inhabilitar todo el sistema).

La aplicación que escribimos aquí es un banco que preserva la privacidad. Diferentes direcciones tienen cuentas con saldos y pueden enviar dinero (ETH) a otras cuentas. El banco publica hashes del estado (cuentas y sus saldos) y transacciones, pero mantiene los saldos reales fuera de la cadena, donde pueden permanecer privados.

## Diseño {#design}

Este no es un sistema listo para producción, sino una herramienta de enseñanza. Como tal, está escrito con varias suposiciones simplificadoras.

- Conjunto de cuentas fijo. Hay un número específico de cuentas, y cada cuenta pertenece a una dirección predeterminada. Esto hace que el sistema sea mucho más simple porque es difícil manejar estructuras de datos de tamaño variable en las pruebas de conocimiento cero. Para un sistema listo para producción, podemos usar la [raíz de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) como el hash de estado y proporcionar pruebas de Merkle para los saldos requeridos.

- Almacenamiento en memoria. En un sistema de producción, necesitamos escribir todos los saldos de las cuentas en el disco para preservarlos en caso de un reinicio. Aquí, no pasa nada si la información simplemente se pierde.

- Solo transferencias. Un sistema de producción requeriría una forma de depositar activos en el banco y de retirarlos. Pero el propósito aquí es solo ilustrar el concepto, así que este banco se limita a las transferencias.

### Pruebas de conocimiento cero {#zero-knowledge-proofs}

A un nivel fundamental, una prueba de conocimiento cero demuestra que el probador conoce algunos datos, _Datos<sub>privados</sub>_, de tal manera que existe una relación _Relación_ entre algunos datos públicos, _Datos<sub>públicos</sub>_, y los _Datos<sub>privados</sub>_. El verificador conoce la _Relación_ y los _Datos<sub>públicos</sub>_.

Para preservar la privacidad, necesitamos que los estados y las transacciones sean privados. Pero para garantizar la integridad, necesitamos que el [hash criptográfico](https://en.wikipedia.org/wiki/Cryptographic_hash_function) de los estados sea público. Para demostrar a las personas que envían transacciones que esas transacciones realmente ocurrieron, también necesitamos publicar los hashes de las transacciones.

En la mayoría de los casos, _Datos<sub>privados</sub>_ es la entrada al programa de prueba de conocimiento cero, y _Datos<sub>públicos</sub>_ es la salida.

Estos campos en _Datos<sub>privados</sub>_:

- _Estado<sub>n</sub>_, el estado antiguo
- _Estado<sub>n+1</sub>_, el nuevo estado
- _Transacción_, una transacción que cambia del estado antiguo al nuevo. Esta transacción necesita incluir estos campos:
  - _Dirección de destino_ que recibe la transferencia
  - _Cantidad_ que se transfiere
  - _Nonce_ para garantizar que cada transacción solo se pueda procesar una vez.
    La dirección de origen no necesita estar en la transacción, porque se puede recuperar de la firma.
- _Firma_, una firma autorizada para realizar la transacción. En nuestro caso, la única dirección autorizada para realizar una transacción es la dirección de origen. Debido a la forma en que funciona nuestro sistema de conocimiento cero, también necesitamos la clave pública de la cuenta, además de la firma de Ethereum.

Estos son los campos en _Datos<sub>públicos</sub>_:

- _Hash(Estado<sub>n</sub>)_ el hash del estado antiguo
- _Hash(Estado<sub>n+1</sub>)_ el hash del nuevo estado
- _Hash(Transacción)_ el hash de la transacción que cambia el estado de _Estado<sub>n</sub>_ a _Estado<sub>n+1</sub>_.

La relación comprueba varias condiciones:

- Los hashes públicos son, de hecho, los hashes correctos para los campos privados.
- La transacción, cuando se aplica al estado antiguo, resulta en el nuevo estado.
- La firma proviene de la dirección de origen de la transacción.

Debido a las propiedades de las funciones de hash criptográficas, demostrar estas condiciones es suficiente para garantizar la integridad.

### Estructuras de datos {#data-structures}

La estructura de datos principal es el estado que mantiene el servidor. Para cada cuenta, el servidor realiza un seguimiento del saldo de la cuenta y un [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), utilizado para prevenir [ataques de repetición](https://en.wikipedia.org/wiki/Replay_attack).

### Componentes {#components}

Este sistema requiere dos componentes:

- El _servidor_ que recibe transacciones, las procesa y publica los hashes en la cadena junto con las pruebas de conocimiento cero.
- Un _contrato inteligente_ que almacena los hashes y verifica las pruebas de conocimiento cero para garantizar que las transiciones de estado sean legítimas.

### Flujo de datos y de control {#flows}

Estas son las formas en que los diversos componentes se comunican para transferir de una cuenta a otra.

1. Un navegador web envía una transacción firmada solicitando una transferencia desde la cuenta del firmante a una cuenta diferente.

2. El servidor verifica que la transacción sea válida:

   - El firmante tiene una cuenta en el banco con saldo suficiente.
   - El destinatario tiene una cuenta en el banco.

3. El servidor calcula el nuevo estado restando la cantidad transferida del saldo del firmante y sumándola al saldo del destinatario.

4. El servidor calcula una prueba de conocimiento cero de que el cambio de estado es válido.

5. El servidor envía a Ethereum una transacción que incluye:

   - El nuevo hash de estado
   - El hash de la transacción (para que el remitente de la transacción sepa que se ha procesado)
   - La prueba de conocimiento cero que demuestra que la transición al nuevo estado es válida

6. El contrato inteligente verifica la prueba de conocimiento cero.

7. Si la prueba de conocimiento cero se verifica correctamente, el contrato inteligente realiza estas acciones:
   - Actualiza el hash del estado actual al nuevo hash de estado
   - Emite una entrada de registro con el nuevo hash de estado y el hash de la transacción

### Herramientas {#tools}

Para el código del lado del cliente, vamos a usar [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) y [Wagmi](https://wagmi.sh/). Estas son herramientas estándar de la industria; si no está familiarizado con ellas, puede usar [este tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

La mayor parte del servidor está escrita en JavaScript usando [Node](https://nodejs.org/en). La parte de conocimiento cero está escrita en [Noir](https://noir-lang.org/). Necesitamos la versión `1.0.0-beta.10`, así que después de [instalar Noir como se indica](https://noir-lang.org/docs/getting_started/quick_start), ejecute:

```
noirup -v 1.0.0-beta.10
```

La cadena de bloques que usamos es `anvil`, una cadena de bloques de prueba local que es parte de [Foundry](https://getfoundry.sh/introduction/installation).

## Implementación {#implementation}

Debido a que este es un sistema complejo, lo implementaremos en etapas.

### Etapa 1: Conocimiento cero manual {#stage-1}

Para la primera etapa, firmaremos una transacción en el navegador y luego proporcionaremos manualmente la información a la prueba de conocimiento cero. El código de conocimiento cero espera obtener esa información en `server/noir/Prover.toml` (documentado [aquí](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Para verlo en acción:

1. Asegúrese de que tiene instalados [Node](https://nodejs.org/en/download) y [Noir](https://noir-lang.org/install). Preferiblemente, instálelos en un sistema UNIX como macOS, Linux o [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Descargue el código de la etapa 1 e inicie el servidor web para servir el código del cliente.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   La razón por la que necesita un servidor web aquí es que, para prevenir ciertos tipos de fraude, muchas billeteras (como MetaMask) no aceptan archivos servidos directamente desde el disco

3. Abra un navegador con una billetera.

4. En la billetera, ingrese una nueva frase de contraseña. Tenga en cuenta que esto eliminará su frase de contraseña existente, así que _asegúrese de tener una copia de seguridad_.

   La frase de contraseña es `test test test test test test test test test test test junk`, la frase de contraseña de prueba predeterminada para anvil.

5. Navegue hasta [el código del lado del cliente](http://localhost:5173/).

6. Conéctese a la billetera y seleccione la cuenta de destino y la cantidad.

7. Haga clic en **Firmar** y firme la transacción.

8. Bajo el encabezado **Prover.toml**, encontrará un texto. Reemplace `server/noir/Prover.toml` con ese texto.

9. Ejecute la prueba de conocimiento cero.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   El resultado debería ser similar a

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Testigo del circuito resuelto correctamente
   [zkBank] Testigo guardado en target/zkBank.gz
   [zkBank] Salida del circuito: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Compare los dos últimos valores con el hash que ve en el navegador web para ver si el mensaje tiene el hash correcto.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Este archivo](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) muestra el formato de información que espera Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

El mensaje está en formato de texto, lo que facilita su comprensión por parte del usuario (lo cual es necesario al firmar) y su análisis por parte del código Noir. La cantidad se indica en finneys para permitir transferencias fraccionarias, por un lado, y para que sea fácilmente legible, por el otro. El último número es el [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

La cadena tiene 100 caracteres de largo. Las pruebas de conocimiento cero no manejan bien los datos de tamaño variable, por lo que a menudo es necesario rellenar los datos.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Estos tres parámetros son matrices de bytes de tamaño fijo.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

Esta es la forma de especificar una matriz de estructuras. Para cada entrada, especificamos la dirección, el saldo (en miliETH, también conocido como [finney](https://cryptovalleyjournal.com/glossary/finney/)), y el siguiente valor de nonce.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Este archivo](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) implementa el procesamiento del lado del cliente y genera el archivo `server/noir/Prover.toml` (el que incluye los parámetros de conocimiento cero).

Esta es la explicación de las partes más interesantes.

```tsx
export default attrs =>  {
```

Esta función crea el componente de React `Transfer`, que otros archivos pueden importar.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Estas son las direcciones de las cuentas, las direcciones creadas por el `test ... test junk`. Si desea utilizar sus propias direcciones, simplemente modifique esta definición.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Estos [hooks de Wagmi](https://wagmi.sh/react/api/hooks) nos permiten acceder a la [biblioteca de viem](https://viem.sh/) y a la billetera.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Este es el mensaje, rellenado con espacios. Cada vez que cambia una de las variables [`useState`](https://react.dev/reference/react/useState), el componente se vuelve a dibujar y `message` se actualiza.

```tsx
  const sign = async () => {
```

Se llama a esta función cuando el usuario hace clic en el botón **Firmar**. El mensaje se actualiza automáticamente, pero la firma requiere la aprobación del usuario en la billetera y no queremos pedirla a menos que sea necesario.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Pida a la billetera que [firme el mensaje](https://viem.sh/docs/accounts/local/signMessage).

```tsx
    const hash = hashMessage(message)
```

Obtenga el hash del mensaje. Es útil proporcionárselo al usuario para la depuración (del código Noir).

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Obtenga la clave pública](https://viem.sh/docs/utilities/recoverPublicKey). Esto es necesario para la función [`ecrecover` de Noir](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Establezca las variables de estado. Al hacer esto, se vuelve a dibujar el componente (después de que finalice la función `sign`) y se muestran al usuario los valores actualizados.

```tsx
    let proverToml = `
```

El texto para `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem nos proporciona la clave pública como una cadena hexadecimal de 65 bytes. El primer byte es `0x04`, un marcador de versión. A esto le siguen 32 bytes para la `x` de la clave pública y luego 32 bytes para la `y` de la clave pública.

Sin embargo, Noir espera obtener esta información como dos matrices de bytes, una para `x` y otra para `y`. Es más fácil analizarlo aquí en el cliente que como parte de la prueba de conocimiento cero.

Tenga en cuenta que esta es una buena práctica en el conocimiento cero en general. El código dentro de una prueba de conocimiento cero es costoso, por lo que cualquier procesamiento que se pueda hacer fuera de la prueba de conocimiento cero _debería_ hacerse fuera de la prueba de conocimiento cero.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

La firma también se proporciona como una cadena hexadecimal de 65 bytes. Sin embargo, el último byte solo es necesario para recuperar la clave pública. Dado que la clave pública ya se proporcionará al código Noir, no la necesitamos para verificar la firma, y el código Noir no la requiere.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Proporcione las cuentas.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

Este es el formato HTML (más exactamente, [JSX](https://react.dev/learn/writing-markup-with-jsx)) del componente.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Este archivo](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) es el código de conocimiento cero real.

```
use std::hash::pedersen_hash;
```

El [hash de Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) se proporciona con la [biblioteca estándar de Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Las pruebas de conocimiento cero suelen utilizar esta función de hash. Es mucho más fácil de calcular dentro de los [circuitos aritméticos](https://rareskills.io/post/arithmetic-circuit) en comparación con las funciones de hash estándar.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Estas dos funciones son bibliotecas externas, definidas en [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Son precisamente para lo que su nombre indica, una función que calcula el [hash keccak256](https://emn178.github.io/online-tools/keccak_256.html) y una función que verifica las firmas de Ethereum y recupera la dirección de Ethereum del firmante.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir está inspirado en [Rust](https://www.rust-lang.org/). Las variables, por defecto, son constantes. Así es como definimos las constantes de configuración globales. Específicamente, `ACCOUNT_NUMBER` es el número de cuentas que almacenamos.

Los tipos de datos con el nombre `u<número>` son ese número de bits, sin signo. Los únicos tipos admitidos son `u8`, `u16`, `u32`, `u64` y `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Esta variable se utiliza para el hash de Pedersen de las cuentas, como se explica a continuación.

```
global MESSAGE_LENGTH : u32 = 100;
```

Como se explicó anteriormente, la longitud del mensaje es fija. Se especifica aquí.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

Las [firmas EIP-191](https://eips.ethereum.org/EIPS/eip-191) requieren un búfer con un prefijo de 26 bytes, seguido de la longitud del mensaje en ASCII y, finalmente, el mensaje en sí.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

La información que almacenamos sobre una cuenta. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) es un número, normalmente de hasta 253 bits, que se puede utilizar directamente en el [circuito aritmético](https://rareskills.io/post/arithmetic-circuit) que implementa la prueba de conocimiento cero. Aquí usamos el `Field` para almacenar una dirección de Ethereum de 160 bits.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

La información que almacenamos para una transacción de transferencia.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Una definición de función. El parámetro es la información de la `Account`. El resultado es una matriz de variables `Field`, cuya longitud es `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

El primer valor de la matriz es la dirección de la cuenta. El segundo incluye tanto el saldo como el nonce. Las llamadas a `.into()` cambian un número al tipo de datos que necesita ser. `account.nonce` es un valor `u32`, pero para agregarlo a `account.balance << 32`, un valor `u128`, debe ser un `u128`. Esa es la primera llamada a `.into()`. La segunda convierte el resultado `u128` en un `Field` para que quepa en la matriz.

```
    flat
}
```

En Noir, las funciones solo pueden devolver un valor al final (no hay devolución anticipada). Para especificar el valor de retorno, se evalúa justo antes del corchete de cierre de la función.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Esta función convierte la matriz de cuentas en una matriz `Field`, que se puede usar como entrada para un hash de Petersen.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Así es como se especifica una variable mutable, es decir, _no_ una constante. Las variables en Noir siempre deben tener un valor, por lo que inicializamos esta variable en todos los ceros.

```
    for i in 0..ACCOUNT_NUMBER {
```

Este es un bucle `for`. Tenga en cuenta que los límites son constantes. Los bucles de Noir deben tener sus límites conocidos en tiempo de compilación. La razón es que los circuitos aritméticos no admiten el control de flujo. Al procesar un bucle `for`, el compilador simplemente coloca el código dentro de él varias veces, una para cada iteración.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Finalmente, llegamos a la función que aplica el hash a la matriz de cuentas.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Esta función encuentra la cuenta con una dirección específica. Esta función sería terriblemente ineficiente en el código estándar porque itera sobre todas las cuentas, incluso después de haber encontrado la dirección.

Sin embargo, en las pruebas de conocimiento cero, no hay control de flujo. Si alguna vez necesitamos verificar una condición, tenemos que verificarla cada vez.

Algo similar ocurre con las sentencias `if`. La sentencia `if` en el bucle anterior se traduce en estas sentencias matemáticas.

_resultado<sub>condición</sub> = accounts[i].address == address_ // uno si son iguales, cero en caso contrario

_cuenta<sub>nueva</sub> = resultado<sub>condición</sub>\*i + (1-resultado<sub>condición</sub>)\*cuenta<sub>antigua</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

La función [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) hace que la prueba de conocimiento cero falle si la aserción es falsa. En este caso, si no podemos encontrar una cuenta con la dirección relevante. Para informar la dirección, usamos una [cadena de formato](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Esta función aplica una transacción de transferencia y devuelve la nueva matriz de cuentas.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

No podemos acceder a los elementos de la estructura dentro de una cadena de formato en Noir, por lo que creamos una copia utilizable.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

Estas son dos condiciones que podrían invalidar una transacción.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Cree la nueva matriz de cuentas y luego devuélvala.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Esta función lee la dirección del mensaje.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

La dirección siempre tiene 20 bytes (es decir, 40 dígitos hexadecimales) de largo y comienza en el carácter n.º 7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Leer la cantidad y el nonce del mensaje.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

En el mensaje, el primer número después de la dirección es la cantidad de finney (también conocido como milésima de un ETH) a transferir. El segundo número es el nonce. Se ignora cualquier texto entre ellos.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Devolver una [tupla](https://noir-lang.org/docs/noir/concepts/data_types/tuples) es la forma en que Noir devuelve múltiples valores de una función.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Esta función convierte el mensaje en bytes, luego convierte las cantidades en un `TransferTxn`.

```rust
// El equivalente al hashMessage de Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Pudimos usar el hash de Pedersen para las cuentas porque solo se aplica el hash dentro de la prueba de conocimiento cero. Sin embargo, en este código necesitamos verificar la firma del mensaje, que es generada por el navegador. Para ello, necesitamos seguir el formato de firma de Ethereum en [EIP 191](https://eips.ethereum.org/EIPS/eip-191). Esto significa que necesitamos crear un búfer combinado con un prefijo estándar, la longitud del mensaje en ASCII y el mensaje en sí, y usar el keccak256 estándar de Ethereum para aplicarle el hash.

```rust
    // Prefijo ASCII
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Para evitar casos en los que una aplicación le pida al usuario que firme un mensaje que se puede usar como una transacción o para algún otro propósito, EIP 191 especifica que todos los mensajes firmados comienzan con el carácter 0x19 (no es un carácter ASCII válido) seguido de `Ethereum Signed Message:` y una nueva línea.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

Maneje longitudes de mensaje de hasta 999 y falle si es mayor. Agregué este código, aunque la longitud del mensaje es una constante, porque facilita su cambio. En un sistema de producción, probablemente solo asumiría que `MESSAGE_LENGTH` no cambia por el bien de un mejor rendimiento.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Use la función estándar de Ethereum `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

Esta función verifica la firma, que requiere el hash del mensaje. Luego nos proporciona la dirección que lo firmó y el hash del mensaje. El hash del mensaje se proporciona en dos valores `Field` porque son más fáciles de usar en el resto del programa que una matriz de bytes.

Necesitamos usar dos valores `Field` porque los cálculos de campo se realizan [módulo](https://en.wikipedia.org/wiki/Modulo) un número grande, pero ese número suele ser inferior a 256 bits (de lo contrario, sería difícil realizar esos cálculos en la EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Especifique `hash1` y `hash2` como variables mutables, y escriba el hash en ellas byte por byte.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

Esto es similar al `ecrecover` de [Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), con dos diferencias importantes:

- Si la firma no es válida, la llamada falla en un `assert` y el programa se anula.
- Si bien la clave pública se puede recuperar de la firma y el hash, este es un procesamiento que se puede realizar externamente y, por lo tanto, no vale la pena hacerlo dentro de la prueba de conocimiento cero. Si alguien intenta engañarnos aquí, la verificación de la firma fallará.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

Finalmente, llegamos a la función `main`. Necesitamos demostrar que tenemos una transacción que cambia válidamente el hash de las cuentas del valor antiguo al nuevo. También necesitamos demostrar que tiene este hash de transacción específico para que la persona que lo envió sepa que su transacción ha sido procesada.

```rust
{
    let mut txn = readTransferTxn(message);
```

Necesitamos que `txn` sea mutable porque no leemos la dirección de origen del mensaje, la leemos de la firma.

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Etapa 2: Agregar un servidor {#stage-2}

En la segunda etapa, agregamos un servidor que recibe e implementa transacciones de transferencia desde el navegador.

Para verlo en acción:

1. Detenga Vite si se está ejecutando.

2. Descargue la rama que incluye el servidor y asegúrese de tener todos los módulos necesarios.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   No es necesario compilar el código de Noir, es el mismo código que usó para la etapa 1.

3. Inicie el servidor.

   ```sh
   npm run start
   ```

4. En una ventana de línea de comandos separada, ejecute Vite para servir el código del navegador.

   ```sh
   cd client
   npm run dev
   ```

5. Navegue hasta el código del cliente en [http://localhost:5173](http://localhost:5173)

6. Antes de que pueda emitir una transacción, necesita saber el nonce, así como la cantidad que puede enviar. Para obtener esta información, haga clic en **Actualizar datos de la cuenta** y firme el mensaje.

   Tenemos un dilema aquí. Por un lado, no queremos firmar un mensaje que se pueda reutilizar (un [ataque de repetición](https://en.wikipedia.org/wiki/Replay_attack)), que es la razón por la que queremos un nonce en primer lugar. Sin embargo, todavía no tenemos un nonce. La solución es elegir un nonce que se pueda usar solo una vez y que ya tengamos en ambos lados, como la hora actual.

   El problema con esta solución es que la hora podría no estar perfectamente sincronizada. Así que, en su lugar, firmamos un valor que cambia cada minuto. Esto significa que nuestra ventana de vulnerabilidad a los ataques de repetición es de como máximo un minuto. Considerando que en producción la solicitud firmada estará protegida por TLS, y que el otro lado del túnel, el servidor, ya puede revelar el saldo y el nonce (tiene que conocerlos para funcionar), este es un riesgo aceptable.

7. Una vez que el navegador recibe el saldo y el nonce, muestra el formulario de transferencia. Seleccione la dirección de destino y la cantidad y haga clic en **Transferir**. Firme esta solicitud.

8. Para ver la transferencia, **Actualice los datos de la cuenta** o mire en la ventana donde ejecuta el servidor. El servidor registra el estado cada vez que cambia.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Escuchando en el puerto 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 procesada
    Nuevo estado:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 tiene 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 tiene 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC tiene 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 tiene 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 tiene 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 procesada
    Nuevo estado:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 tiene 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 tiene 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC tiene 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 tiene 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 tiene 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 procesada
    Nuevo estado:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 tiene 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 tiene 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC tiene 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 tiene 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 tiene 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Este archivo](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) contiene el proceso del servidor e interactúa con el código Noir en [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). A continuación, se explican las partes interesantes.

```js
import { Noir } from '@noir-lang/noir_js'
```

La biblioteca [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) sirve de interfaz entre el código JavaScript y el código Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Cargue el circuito aritmético —el programa Noir compilado que creamos en la etapa anterior— y prepárese para ejecutarlo.

```js
// We only provide account information in return to a signed request
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Para proporcionar información de la cuenta, solo necesitamos la firma. La razón es que ya sabemos cuál será el mensaje y, por lo tanto, el hash del mensaje.

```js
const processMessage = async (message, signature) => {
```

Procese un mensaje y ejecute la transacción que codifica.

```js
    // Get the public key
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Ahora que ejecutamos JavaScript en el servidor, podemos recuperar la clave pública allí en lugar de en el cliente.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` ejecuta el programa Noir. Los parámetros son equivalentes a los proporcionados en [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Tenga en cuenta que los valores largos se proporcionan como una matriz de cadenas hexadecimales (`["0x60", "0xA7"]`), no como un único valor hexadecimal (`0x60A7`), como lo hace Viem.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Si hay un error, captúrelo y luego transmita una versión simplificada al cliente.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Aplicar la transacción. Ya lo hicimos en el código de Noir, pero es más fácil hacerlo de nuevo aquí que extraer el resultado de allí.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

La estructura inicial `Accounts`.

### Etapa 3: Contratos inteligentes de Ethereum {#stage-3}

1. Detenga los procesos del servidor y del cliente.

2. Descargue la rama con los contratos inteligentes y asegúrese de tener todos los módulos necesarios.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Ejecute `anvil` en una ventana de línea de comandos separada.

4. Genere la clave de verificación y el verificador de solidez, luego copie el código del verificador en el proyecto de Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Vaya a los contratos inteligentes y configure las variables de entorno para usar la cadena de bloques `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Despliegue `Verifier.sol` y almacene la dirección en una variable de entorno.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Despliegue el contrato `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   El valor `0x199..67b` es el hash de Pederson del estado inicial de `Accounts`. Si modifica este estado inicial en `server/index.mjs`, puede ejecutar una transacción para ver el hash inicial informado por la prueba de conocimiento cero.

8. Ejecute el servidor.

   ```sh
   cd ../server
   npm run start
   ```

9. Ejecute el cliente en una ventana de línea de comandos diferente.

   ```sh
   cd client
   npm run dev
   ```

10. Ejecute algunas transacciones.

11. Para verificar que el estado cambió en la cadena, reinicie el proceso del servidor. Vea que `ZkBank` ya no acepta transacciones, porque el valor del hash original en las transacciones difiere del valor del hash almacenado en la cadena.

    Este es el tipo de error esperado.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Escuchando en el puerto 3000
    Error de verificación: ContractFunctionExecutionError: La función del contrato "processTransaction" se revirtió con la siguiente razón:
    Hash de estado antiguo incorrecto

    Llamada de contrato:
        dirección: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        función:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        argumentos: (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Los cambios en este archivo se relacionan principalmente con la creación de la prueba real y su envío en la cadena.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Necesitamos usar [el paquete Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) para crear la prueba real que se enviará en la cadena. Podemos usar este paquete ya sea ejecutando la interfaz de línea de comandos (`bb`) o usando la [biblioteca de JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). La biblioteca de JavaScript es mucho más lenta que ejecutar el código de forma nativa, por lo que usamos [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) aquí para usar la línea de comandos.

Tenga en cuenta que si decide usar `bb.js`, debe usar una versión que sea compatible con la versión de Noir que está usando. En el momento de escribir este artículo, la versión actual de Noir (1.0.0-beta.11) usa la versión 0.87 de `bb.js`.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

La dirección aquí es la que se obtiene cuando se comienza con un `anvil` limpio y se siguen las instrucciones anteriores.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Esta clave privada es una de las cuentas prefinanciadas predeterminadas en `anvil`.

```js
const generateProof = async (witness, fileID) => {
```

Genere una prueba usando el ejecutable `bb`.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Escriba el testigo en un archivo.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Realmente cree la prueba. Este paso también crea un archivo con las variables públicas, pero no lo necesitamos. Ya obtuvimos esas variables de `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

La prueba es una matriz JSON de valores `Field`, cada uno representado como un valor hexadecimal. Sin embargo, debemos enviarlo en la transacción como un único valor de `bytes`, que Viem representa mediante una gran cadena hexadecimal. Aquí cambiamos el formato concatenando todos los valores, eliminando todos los `0x` y luego agregando uno al final.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Limpie y devuelva la prueba.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Los campos públicos deben ser una matriz de valores de 32 bytes. Sin embargo, como necesitábamos dividir el hash de la transacción entre dos valores `Field`, aparece como un valor de 16 bytes. Aquí agregamos ceros para que Viem entienda que en realidad son 32 bytes.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Cada dirección solo usa cada nonce una vez para que podamos usar una combinación de `fromAddress` y `nonce` como un identificador único para el archivo testigo y el directorio de salida.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

Envíe la transacción a la cadena.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Este es el código en cadena que recibe la transacción.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

El código en cadena necesita hacer un seguimiento de dos variables: el verificador (un contrato separado que es creado por `nargo`) y el hash de estado actual.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Cada vez que cambia el estado, emitimos un evento `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Esta función procesa las transacciones. Obtiene la prueba (como `bytes`) y las entradas públicas (como una matriz `bytes32`), en el formato que requiere el verificador (para minimizar el procesamiento en cadena y, por lo tanto, los costos de gas).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

La prueba de conocimiento cero debe ser que la transacción cambie de nuestro hash actual a uno nuevo.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Llame al contrato del verificador para verificar la prueba de conocimiento cero. Este paso revierte la transacción si la prueba de conocimiento cero es incorrecta.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Si todo está en orden, actualice el hash de estado al nuevo valor y emita un evento `TransactionProcessed`.

## Abusos por parte del componente centralizado {#abuses}

La seguridad de la información consta de tres atributos:

- _Confidencialidad_, los usuarios no pueden leer información que no están autorizados a leer.
- _Integridad_, la información no puede ser modificada excepto por usuarios autorizados de una manera autorizada.
- _Disponibilidad_, los usuarios autorizados pueden usar el sistema.

En este sistema, la integridad se proporciona a través de pruebas de conocimiento cero. La disponibilidad es mucho más difícil de garantizar y la confidencialidad es imposible, porque el banco tiene que conocer el saldo de cada cuenta y todas las transacciones. No hay forma de evitar que una entidad que tiene información la comparta.

Podría ser posible crear un banco verdaderamente confidencial utilizando [direcciones sigilosas](https://vitalik.eth.limo/general/2023/01/20/stealth.html), pero eso está fuera del alcance de este artículo.

### Información falsa {#false-info}

Una forma en que el servidor puede violar la integridad es proporcionar información falsa cuando [se solicitan datos](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Para resolver esto, podemos escribir un segundo programa Noir que reciba las cuentas como una entrada privada y la dirección para la que se solicita información como una entrada pública. La salida es el saldo y el nonce de esa dirección, y el hash de las cuentas.

Por supuesto, esta prueba no se puede verificar en la cadena, porque no queremos publicar nonces y saldos en la cadena. Sin embargo, puede ser verificado por el código del cliente que se ejecuta en el navegador.

### Transacciones forzadas {#forced-txns}

El mecanismo habitual para garantizar la disponibilidad y prevenir la censura en las L2 son las [transacciones forzadas](https://docs.optimism.io/stack/transactions/forced-transaction). Pero las transacciones forzadas no se combinan con las pruebas de conocimiento cero. El servidor es la única entidad que puede verificar las transacciones.

Podemos modificar `smart-contracts/src/ZkBank.sol` para aceptar transacciones forzadas y evitar que el servidor cambie el estado hasta que se procesen. Sin embargo, esto nos expone a un simple ataque de denegación de servicio. ¿Qué pasa si una transacción forzada no es válida y, por lo tanto, es imposible de procesar?

La solución es tener una prueba de conocimiento cero de que una transacción forzada no es válida. Esto le da al servidor tres opciones:

- Procesar la transacción forzada, proporcionando una prueba de conocimiento cero de que ha sido procesada y el nuevo hash de estado.
- Rechazar la transacción forzada y proporcionar una prueba de conocimiento cero al contrato de que la transacción no es válida (dirección desconocida, nonce incorrecto o saldo insuficiente).
- Ignorar la transacción forzada. No hay forma de obligar al servidor a procesar realmente la transacción, pero significa que todo el sistema no está disponible.

#### Bonos de disponibilidad {#avail-bonds}

En una implementación de la vida real, probablemente habría algún tipo de motivo de lucro para mantener el servidor en funcionamiento. Podemos fortalecer este incentivo haciendo que el servidor publique un bono de disponibilidad que cualquiera puede quemar si una transacción forzada no se procesa dentro de un cierto período.

### Código Noir incorrecto {#bad-noir-code}

Normalmente, para que la gente confíe en un contrato inteligente, subimos el código fuente a un [explorador de bloques](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Sin embargo, en el caso de las pruebas de conocimiento cero, eso es insuficiente.

`Verifier.sol` contiene la clave de verificación, que es una función del programa Noir. Sin embargo, esa clave no nos dice cuál era el programa Noir. Para tener realmente una solución confiable, debe cargar el programa Noir (y la versión que lo creó). De lo contrario, las pruebas de conocimiento cero podrían reflejar un programa diferente, uno con una puerta trasera.

Hasta que los exploradores de bloques comiencen a permitirnos cargar y verificar programas Noir, debe hacerlo usted mismo (preferiblemente en [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Luego, los usuarios sofisticados podrán descargar el código fuente, compilarlo ellos mismos, crear `Verifier.sol` y verificar que sea idéntico al que está en la cadena.

## Conclusión {#conclusion}

Las aplicaciones de tipo plasma requieren un componente centralizado como almacenamiento de información. Esto abre posibles vulnerabilidades pero, a cambio, nos permite preservar la privacidad de formas no disponibles en la propia cadena de bloques. Con las pruebas de conocimiento cero podemos garantizar la integridad y posiblemente hacer que sea económicamente ventajoso para quienquiera que esté ejecutando el componente centralizado mantener la disponibilidad.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).

## Reconocimientos {#acknowledgements}

- Josh Crites leyó un borrador de este artículo y me ayudó con un espinoso problema de Noir.

Cualquier error restante es mi responsabilidad.
