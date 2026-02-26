---
title: "Uso de direcciones sigilosas"
description: "Las direcciones sigilosas permiten a los usuarios transferir activos de forma anónima. Después de leer este artículo, podrá: Explicar qué son las direcciones sigilosas y cómo funcionan, comprender cómo utilizarlas de manera que se preserve el anonimato y escribir una aplicación web que las utilice."
author: Ori Pomerantz
tags:
  [
    "Dirección sigilosa",
    "privacidad",
    "criptografía",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: es
sidebarDepth: 3
---

Usted es Bill. Por razones que no detallaremos, usted quiere donar a la campaña «Alice para Reina del Mundo» y que Alice sepa que donó para que lo recompense si gana. Lamentablemente, su victoria no está garantizada. Existe una campaña rival, «Carol para Emperatriz del Sistema Solar». Si Carol gana y descubre que usted donó a Alice, estará en problemas. Así que no puede simplemente transferir 200 ETH de su cuenta a la de Alice.

[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) tiene la solución. Este ERC explica cómo usar [direcciones sigilosas](https://nerolation.github.io/stealth-utils) para transferencias anónimas.

**Advertencia**: La criptografía detrás de las direcciones sigilosas es, hasta donde sabemos, sólida. Sin embargo, existen posibles ataques de canal lateral. [A continuación](#go-wrong), verá lo que puede hacer para reducir este riesgo.

## Cómo funcionan las direcciones sigilosas {#how}

Este artículo intentará explicar las direcciones sigilosas de dos maneras. La primera es [cómo usarlas](#how-use). Esta parte es suficiente para comprender el resto del artículo. Luego, hay [una explicación de las matemáticas detrás de esto](#how-math). Si le interesa la criptografía, lea también esta parte.

### La versión simple (cómo usar direcciones sigilosas) {#how-use}

Alice crea dos claves privadas y publica las claves públicas correspondientes (que se pueden combinar en una única metadirección de doble longitud). Bill también crea una clave privada y publica la clave pública correspondiente.

Usando la clave pública de una de las partes y la clave privada de la otra, se puede derivar un secreto compartido conocido solo por Alice y Bill (no se puede derivar solo de las claves públicas). Usando este secreto compartido, Bill obtiene la dirección sigilosa y puede enviar activos a ella.

Alice también obtiene la dirección a partir del secreto compartido, pero como conoce las claves privadas de las claves públicas que publicó, también puede obtener la clave privada que le permite retirar de esa dirección.

### Las matemáticas (por qué las direcciones sigilosas funcionan así) {#how-math}

Las direcciones sigilosas estándar utilizan la [criptografía de curva elíptica (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) para obtener un mejor rendimiento con menos bits de clave, mientras mantienen el mismo nivel de seguridad. Pero en su mayor parte podemos ignorar eso y fingir que estamos usando aritmética regular.

Hay un número que todo el mundo conoce, _G_. Se puede multiplicar por _G_. Pero debido a la naturaleza de la ECC, es prácticamente imposible dividir por _G_. La forma en que la criptografía de clave pública funciona generalmente en Ethereum es que puede usar una clave privada, _P<sub>priv</sub>_, para firmar transacciones que luego son verificadas por una clave pública, _P<sub>pub</sub> = GP<sub>priv</sub>_.

Alice crea dos claves privadas, _K<sub>priv</sub>_ y _V<sub>priv</sub>_. _K<sub>priv</sub>_ se utilizará para gastar dinero de la dirección sigilosa y _V<sub>priv</sub>_ para ver las direcciones que pertenecen a Alice. Alice luego publica las claves públicas: _K<sub>pub</sub> = GK<sub>priv</sub>_ y _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill crea una tercera clave privada, _R<sub>priv</sub>_, y publica _R<sub>pub</sub> = GR<sub>priv</sub>_ en un registro central (Bill también podría habérsela enviado a Alice, pero asumimos que Carol está escuchando).

Bill calcula _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_, que espera que Alice también conozca (se explica a continuación). Este valor se llama _S_, el secreto compartido. Esto le da a Bill una clave pública, _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_. A partir de esta clave pública, puede calcular una dirección y enviar los recursos que desee a ella. En el futuro, si Alice gana, Bill puede decirle _R<sub>priv</sub>_ para demostrar que los recursos provinieron de él.

Alice calcula _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_. Esto le da el mismo secreto compartido, _S_. Como conoce la clave privada, _K<sub>priv</sub>_, puede calcular _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_. Esta clave le permite acceder a los activos en la dirección que resulta de _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_.

Tenemos una clave de visualización separada para permitir que Alice subcontrate a Dave's World Domination Campaign Services. Alice está dispuesta a que Dave conozca las direcciones públicas y le informe cuando haya más dinero disponible, pero no quiere que él gaste el dinero de su campaña.

Debido a que la visualización y el gasto usan claves separadas, Alice puede darle a Dave _V<sub>priv</sub>_. Entonces Dave puede calcular _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ y de esa manera obtener las claves públicas (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_). Pero sin _K<sub>priv</sub>_ Dave no puede obtener la clave privada.

En resumen, estos son los valores conocidos por los diferentes participantes.

| Alice                                                                     | Publicado         | Bill                                                                      | Dave                                                                        |                                                   |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------- |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                                   |
| _K<sub>priv</sub>_                                                        | -                 | -                                                                         | -                                                                           |                                                   |
| _V<sub>priv</sub>_                                                        | -                 | -                                                                         | _V<sub>priv</sub>_                                                          |                                                   |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                                   |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                                   |
| -                                                                         | -                 | _R<sub>priv</sub>_                                                        | -                                                                           |                                                   |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                                   |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | -                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                                   |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | -                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                                   |
| _Dirección=f(P<sub>pub</sub>)_                         | -                 | _Dirección=f(P<sub>pub</sub>)_                         | _Dirección=f(P<sub>pub</sub>)_                           | _Dirección=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | -                 | -                                                                         | -                                                                           |                                                   |

## Cuando las direcciones sigilosas fallan {#go-wrong}

_No hay secretos en la cadena de bloques_. Aunque las direcciones sigilosas pueden proporcionarle privacidad, esa privacidad es susceptible al análisis de tráfico. Para poner un ejemplo trivial, imagine que Bill financia una dirección e inmediatamente envía una transacción para publicar un valor _R<sub>pub</sub>_. Sin la clave _V<sub>priv</sub>_ de Alice, no podemos estar seguros de que se trate de una dirección sigilosa, pero es la apuesta más segura. Luego, vemos otra transacción que transfiere todos los ETH de esa dirección a la dirección del fondo de campaña de Alice. Puede que no podamos probarlo, pero es probable que Bill acabe de donar a la campaña de Alice. Carol sin duda lo pensaría.

Para Bill es fácil separar la publicación de _R<sub>pub</sub>_ de la financiación de la dirección sigilosa (hacerlo en momentos diferentes, desde direcciones diferentes). Sin embargo, eso es insuficiente. El patrón que Carol busca es que Bill financie una dirección y luego el fondo de campaña de Alice retire de ella.

Una solución es que la campaña de Alice no retire el dinero directamente, sino que lo utilice para pagar a un tercero. Si la campaña de Alice envía 10 ETH a Dave's World Domination Campaign Services, Carol solo sabe que Bill donó a uno de los clientes de Dave. Si Dave tiene suficientes clientes, Carol no podría saber si Bill donó a Alice, que compite con ella, o a Adam, Albert o Abigail, que a Carol no le importan. Alice puede incluir un valor hasheado con el pago y luego proporcionar a Dave la preimagen para demostrar que fue su donación. Alternativamente, como se señaló anteriormente, si Alice le da a Dave su _V<sub>priv</sub>_, él ya sabe de quién provino el pago.

El principal problema con esta solución es que requiere que a Alice le importe el secreto cuando ese secreto beneficia a Bill. Alice puede querer mantener su reputación para que el amigo de Bill, Bob, también le done. Pero también es posible que no le importe exponer a Bill, porque entonces él tendrá miedo de lo que sucederá si Carol gana. Bill podría terminar brindando aún más apoyo a Alice.

### Uso de múltiples capas sigilosas {#multi-layer}

En lugar de depender de Alice para preservar la privacidad de Bill, Bill puede hacerlo él mismo. Puede generar múltiples metadirecciones para personas ficticias, Bob y Bella. Luego, Bill envía ETH a Bob, y «Bob» (que en realidad es Bill) se lo envía a Bella. «Bella» (también Bill) se lo envía a Alice.

Carol aún puede hacer análisis de tráfico y ver la tubería de Bill a Bob, de Bob a Bella y de Bella a Alice. Sin embargo, si «Bob» y «Bella» también usan ETH para otros fines, no parecerá que Bill transfirió nada a Alice, incluso si Alice retira inmediatamente de la dirección sigilosa a su dirección de campaña conocida.

## Escribir una aplicación de dirección sigilosa {#write-app}

Este artículo explica una aplicación de dirección sigilosa [disponible en GitHub](https://github.com/qbzzt/251022-stealth-addresses.git).

### Herramientas {#tools}

Hay [una librería de typescript para direcciones sigilosas](https://github.com/ScopeLift/stealth-address-sdk) que podríamos usar. Sin embargo, las operaciones criptográficas pueden ser intensivas en CPU. Prefiero implementarlas en un lenguaje compilado, como [Rust](https://rust-lang.org/), y usar [WASM](https://webassembly.org/) para ejecutar el código en el navegador.

Vamos a usar [Vite](https://vite.dev/) y [React](https://react.dev/). Estas son herramientas estándar de la industria; si no está familiarizado con ellas, puede usar [este tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Para usar Vite, necesitamos Node.

### Ver direcciones sigilosas en acción {#in-action}

1. Instale las herramientas necesarias: [Rust](https://rust-lang.org/tools/install/) y [Node](https://nodejs.org/en/download).

2. Clone el repositorio de GitHub.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Instale los requisitos previos y compile el código de Rust.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Inicie el servidor web.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. Navegue hasta [la aplicación](http://localhost:5173/). Esta página de la aplicación tiene dos marcos: uno para la interfaz de usuario de Alice y el otro para la de Bill. Los dos marcos no se comunican; solo están en la misma página por conveniencia.

6. Como Alice, haga clic en **Generar una metadirección sigilosa**. Esto mostrará la nueva dirección sigilosa y las claves privadas correspondientes. Copie la metadirección sigilosa al portapapeles.

7. Como Bill, pegue la nueva metadirección sigilosa y haga clic en **Generar una dirección**. Esto le da la dirección para financiar a Alice.

8. Copie la dirección y la clave pública de Bill y péguelas en el área «Clave privada para la dirección generada por Bill» de la interfaz de usuario de Alice. Una vez que esos campos estén llenos, verá la clave privada para acceder a los activos en esa dirección.

9. Puede usar [una calculadora en línea](https://iancoleman.net/ethereum-private-key-to-address/) para asegurarse de que la clave privada corresponde a la dirección.

### Cómo funciona el programa {#how-the-program-works}

#### El componente WASM {#wasm}

El código fuente que se compila en WASM está escrito en [Rust](https://rust-lang.org/). Puede verlo en [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Este código es principalmente una interfaz entre el código de JavaScript y [la librería `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) en Rust es análogo a [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) en JavaScript. Contiene información del paquete, declaraciones de dependencia, etc.

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

El paquete [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) necesita generar valores aleatorios. Eso no se puede hacer por medios puramente algorítmicos; requiere acceso a un proceso físico como fuente de entropía. Esta definición especifica que obtendremos esa entropía preguntándole al navegador en el que estamos ejecutando.

```toml
console_error_panic_hook = "0.1.7"
```

[Esta librería](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) nos da mensajes de error más significativos cuando el código WASM entra en pánico y no puede continuar.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

El tipo de salida requerido para producir código WASM.

**`lib.rs`**

Este es el código real de Rust.

```rust
use wasm_bindgen::prelude::*;
```

Las definiciones para crear un paquete WASM a partir de Rust. Están documentadas [aquí](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

Las funciones que necesitamos de [la librería `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust generalmente usa [matrices](https://doc.rust-lang.org/std/primitive.array.html) de bytes (`[u8; <size>]`) para los valores. Pero en JavaScript, generalmente usamos cadenas hexadecimales. [La librería `hex`](https://docs.rs/hex/latest/hex/) traduce por nosotros de una representación a la otra.

```rust
#[wasm_bindgen]
```

Generar enlaces WASM para poder llamar a esta función desde JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

La forma más fácil de devolver un objeto con múltiples campos es devolver una cadena JSON.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

La función [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) devuelve tres campos:

- La metadirección (_K<sub>pub</sub>_ y _V<sub>pub</sub>_)
- La clave privada de visualización (_V<sub>priv</sub>_)
- La clave privada de gasto (_K<sub>priv</sub>_)

La sintaxis de [tupla](https://doc.rust-lang.org/std/primitive.tuple.html) nos permite separar esos valores nuevamente.

```rust
    format!("{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Use la macro [`format!`](https://doc.rust-lang.org/std/fmt/index.html) para generar la cadena codificada en JSON. Use [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) para cambiar las matrices a cadenas hexadecimales.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Esta función convierte una cadena hexadecimal (proporcionada por JavaScript) en una matriz de bytes. La usamos para analizar los valores proporcionados por el código de JavaScript. Esta función es complicada por la forma en que Rust maneja las matrices y los vectores.

La expresión `<const N: usize>` se llama un [genérico](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` es un parámetro que controla la longitud de la matriz devuelta. La función en realidad se llama `str_to_array::<n>`, donde `n` es la longitud de la matriz.

El valor de retorno es `Option<[u8; N]>`, lo que significa que la matriz devuelta es [opcional](https://doc.rust-lang.org/std/option/). Este es un patrón típico en Rust para funciones que pueden fallar.

Por ejemplo, si llamamos a `str_to_array::10("bad060a7")`, se supone que la función debe devolver una matriz de diez valores, pero la entrada es de solo cuatro bytes. La función necesita fallar, y lo hace devolviendo `None`. El valor de retorno para `str_to_array::4("bad060a7")` sería `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

La función [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) devuelve un `Result<Vec<u8>, FromHexError>`. El tipo [`Result`](https://doc.rust-lang.org/std/result/) puede contener un resultado exitoso (`Ok(value)`) o un error (`Err(error)`).

El método `.ok()` convierte el `Result` en un `Option`, cuyo valor es el valor `Ok()` si tiene éxito o `None` si no lo tiene. Finalmente, el [operador de signo de interrogación](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) aborta las funciones actuales y devuelve un `None` si el `Option` está vacío. De lo contrario, desenvuelve el valor y lo devuelve (en este caso, para asignar un valor a `vec`).

Este parece un método extrañamente complicado para manejar errores, pero `Result` y `Option` aseguran que todos los errores se manejen, de una forma u otra.

```rust
    if vec.len() != N { return None; }
```

Si el número de bytes es incorrecto, es un fallo, y devolvemos `None`.

```rust
    // try_into consumes vec and attempts to make [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust tiene dos tipos de matrices. Las [matrices](https://doc.rust-lang.org/std/primitive.array.html) tienen un tamaño fijo. Los [vectores](https://doc.rust-lang.org/std/vec/index.html) pueden crecer y encogerse. `hex::decode` devuelve un vector, pero la librería `eth_stealth_addresses` quiere recibir matrices. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) convierte un valor en otro tipo, por ejemplo, un vector en una matriz.

```rust
    Some(array)
}
```

Rust no requiere que use la palabra clave [`return`](https://doc.rust-lang.org/std/keyword.return.html) al devolver un valor al final de una función.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Esta función recibe una metadirección pública, que incluye tanto _V<sub>pub</sub>_ como _K<sub>pub</sub>_. Devuelve la dirección sigilosa, la clave pública para publicar (_R<sub>pub</sub>_) y un valor de escaneo de un byte que acelera la identificación de qué direcciones publicadas pueden pertenecer a Alice.

El valor de escaneo es parte del secreto compartido (_S = GR<sub>priv</sub>V<sub>priv</sub>_). Este valor está disponible para Alice, y verificarlo es mucho más rápido que verificar si _f(K<sub>pub</sub>+G\*hash(S))_ es igual a la dirección publicada.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Usamos la función [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) de la librería.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Preparar la cadena de salida codificada en JSON.

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

Esta función usa la función [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) de la librería para calcular la clave privada para retirar de la dirección (_R<sub>priv</sub>_). Este cálculo requiere estos valores:

- La dirección (_Dirección=f(P<sub>pub</sub>)_)
- La clave pública generada por Bill (_R<sub>pub</sub>_)
- La clave privada de visualización (_V<sub>priv</sub>_)
- La clave privada de gasto (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) especifica que la función se ejecuta cuando se inicializa el código WASM.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Este código especifica que la salida de pánico se envíe a la consola de JavaScript. Para verlo en acción, use la aplicación y dé a Bill una metadirección no válida (simplemente cambie un dígito hexadecimal). Verá este error en la consola de JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Seguido de un seguimiento de la pila. Luego, dé a Bill la metadirección válida y a Alice una dirección no válida o una clave pública no válida. Verá este error:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

De nuevo, seguido de un seguimiento de la pila.

#### La interfaz de usuario {#ui}

La interfaz de usuario está escrita con [React](https://react.dev/) y servida por [Vite](https://vite.dev/). Puede aprender sobre ellos usando [este tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). No hay necesidad de [WAGMI](https://wagmi.sh/) aquí porque no interactuamos directamente con una cadena de bloques o una billetera.

La única parte no obvia de la interfaz de usuario es la conectividad WASM. Así es como funciona.

**`vite.config.js`**

Este archivo contiene [la configuración de Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

Necesitamos dos plugins de Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) y [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Este archivo es el componente principal de la aplicación. Es un contenedor que incluye dos componentes: `Alice` y `Bill`, las interfaces de usuario para esos usuarios. La parte relevante para WASM es el código de inicialización.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Cuando usamos [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), crea dos archivos que usamos aquí: un archivo wasm con el código real (aquí, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) y un archivo JavaScript con las definiciones para usarlo (aquí, `src/rust_wasm/pkg/rust_wasm.js`). La exportación predeterminada de ese archivo JavaScript es código que necesita ejecutarse para iniciar WASM.

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

El [hook `useEffect`](https://react.dev/reference/react/useEffect) le permite especificar una función que se ejecuta cuando cambian las variables de estado. Aquí, la lista de variables de estado está vacía (`[]`), por lo que esta función se ejecuta solo una vez cuando la página se carga.

La función de efecto tiene que retornar inmediatamente. Para usar código asíncrono, como el `init` de WASM (que tiene que cargar el archivo `.wasm` y por lo tanto toma tiempo), definimos una función interna [`async`](https://en.wikipedia.org/wiki/Async/await) y la ejecutamos sin un `await`.

**`Bill.jsx`**

Esta es la interfaz de usuario para Bill. Tiene una sola acción, crear una dirección basada en la metadirección sigilosa proporcionada por Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Además de la exportación predeterminada, el código JavaScript generado por `wasm-pack` exporta una función por cada función en el código WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Para llamar a las funciones de WASM, simplemente llamamos a la función exportada por el archivo JavaScript creado por `wasm-pack`.

**`Alice.jsx`**

El código en `Alice.jsx` es análogo, excepto que Alice tiene dos acciones:

- Generar una metadirección
- Obtener la clave privada para una dirección publicada por Bill

## Conclusión {#conclusion}

Las direcciones sigilosas no son la panacea; tienen que ser [usadas correctamente](#go-wrong). Pero cuando se usan correctamente, pueden habilitar la privacidad en una cadena de bloques pública.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).