---
title: Uso de conocimiento cero para un estado secreto
description: Los juegos en cadena son limitados porque no pueden mantener ninguna información oculta. Después de leer este tutorial, el lector podrá combinar pruebas de conocimiento cero y componentes del servidor para crear juegos verificables con un estado secreto, un componente fuera de cadena. La técnica para hacer esto se demostrará creando un juego de buscaminas.
author: Ori Pomerantz
tags:
  [
    "servidor",
    "fuera de la cadena",
    "centralizado",
    "conocimiento-cero",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: es
published: 15-03-2025
---

_No hay secretos en la cadena de bloques_. Todo lo que se publica en la cadena de bloques está abierto a la lectura para todo el mundo. Esto es necesario, porque la cadena de bloques se basa en que cualquiera pueda verificarla. Sin embargo, los juegos a menudo dependen de un estado secreto. Por ejemplo, el juego de [buscaminas](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) no tiene absolutamente ningún sentido si se puede simplemente ir a un explorador de la cadena de bloques y ver el mapa.

La solución más sencilla es utilizar un [componente de servidor](/developers/tutorials/server-components/) para mantener el estado secreto. Sin embargo, la razón por la que usamos la cadena de bloques es para evitar trampas por parte del desarrollador del juego. Tenemos que garantizar la honestidad del componente del servidor. El servidor puede proporcionar un hash del estado y utilizar [pruebas de conocimiento cero](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) para demostrar que el estado utilizado para calcular el resultado de un movimiento es el correcto.

Después de leer este artículo, usted sabrá cómo crear este tipo de servidor que contiene el estado secreto, un cliente para mostrar el estado y un componente en cadena para la comunicación entre ambos. Las herramientas principales que usaremos serán:

| Herramienta                                   | Propósito                                                            |                Verificado en la versión |
| --------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Pruebas de conocimiento cero y su verificación                       |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Lenguaje de programación tanto para el servidor como para el cliente |   5.4.2 |
| [Node](https://nodejs.org/en)                 | Ejecución del servidor                                               | 20.18.2 |
| [Viem](https://viem.sh/)                      | Comunicación con la cadena de bloques                                |  2.9.20 |
| [MUD](https://mud.dev/)                       | Gestión de datos en cadena                                           |  2.0.12 |
| [React](https://react.dev/)                   | Interfaz de usuario del cliente                                      |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | Servir el código del cliente                                         |   4.2.1 |

## Ejemplo de buscaminas {#minesweeper}

[Buscaminas](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) es un juego que incluye un mapa secreto con un campo minado. El jugador elige cavar en una ubicación específica. Si esa ubicación tiene una mina, se acaba el juego. De lo contrario, el jugador obtiene el número de minas en las ocho casillas que rodean esa ubicación.

Esta aplicación está escrita usando [MUD](https://mud.dev/), un marco de trabajo que nos permite almacenar datos en cadena usando una [base de datos de clave-valor](https://aws.amazon.com/nosql/key-value/) y sincronizar esos datos automáticamente con componentes fuera de cadena. Además de la sincronización, MUD facilita el control de acceso y que otros usuarios [extiendan](https://mud.dev/guides/extending-a-world) nuestra aplicación sin necesidad de permisos.

### Ejecutar el ejemplo de buscaminas {#running-minesweeper-example}

Para ejecutar el ejemplo de buscaminas:

1. Asegúrese de [tener instalados los requisitos previos](https://mud.dev/quickstart#prerequisites): [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) y [`mprocs`](https://github.com/pvolok/mprocs).

2. Clone el repositorio.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Instale los paquetes.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Si Foundry se instaló como parte de `pnpm install`, necesita reiniciar el shell de la línea de comandos.

4. Compile los contratos

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. Inicie el programa (incluida una cadena de bloques de [anvil](https://book.getfoundry.sh/anvil/)) y espere.

   ```sh copy
   mprocs
   ```

   Tenga en cuenta que el inicio tarda mucho tiempo. Para ver el progreso, primero use la flecha hacia abajo para desplazarse a la pestaña _contracts_ para ver los contratos MUD que se están desplegando. Cuando reciba el mensaje _Waiting for file changes…_ (Esperando cambios en el archivo), los contratos se desplegarán y el progreso posterior se producirá en la pestaña _server_. Allí, espere hasta que reciba el mensaje _Verifier address: 0x...._ (Dirección del verificador: 0x...).

   Si este paso se realiza correctamente, verá la pantalla de `mprocs`, con los diferentes procesos a la izquierda y la salida de la consola para el proceso actualmente seleccionado a la derecha.

   ![La pantalla de mprocs](./mprocs.png)

   Si hay un problema con `mprocs`, puede ejecutar los cuatro procesos manualmente, cada uno en su propia ventana de línea de comandos:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contratos**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Servidor**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **Cliente**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. Ahora puede navegar al [cliente](http://localhost:3000), hacer clic en **New Game** (Nuevo juego) y comenzar a jugar.

### Tablas {#tables}

Necesitamos [varias tablas](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) en cadena.

- `Configuration`: esta tabla es un singleton, no tiene clave y tiene un único registro. Se utiliza para contener información de configuración del juego:
  - `height`: la altura de un campo de minas
  - `width`: el ancho de un campo de minas
  - `numberOfBombs`: el número de bombas en cada campo de minas

- `VerifierAddress`: esta tabla también es un singleton. Se utiliza para contener una parte de la configuración, la dirección del contrato del verificador (`verifier`). Podríamos haber puesto esta información en la tabla `Configuration`, pero es establecida por un componente diferente, el servidor, por lo que es más fácil ponerla en una tabla separada.

- `PlayerGame`: la clave es la dirección del jugador. Los datos son:

  - `gameId`: valor de 32 bytes que es el hash del mapa en el que el jugador está jugando (el identificador del juego).
  - `win`: un booleano que indica si el jugador ganó el juego.
  - `lose`: un booleano que indica si el jugador perdió el juego.
  - `digNumber`: el número de excavaciones exitosas en el juego.

- `GamePlayer`: esta tabla contiene el mapeo inverso, desde `gameId` a la dirección del jugador.

- `Map`: la clave es una tupla de tres valores:

  - `gameId`: valor de 32 bytes que es el hash del mapa en el que el jugador está jugando (el identificador del juego).
  - coordenada `x`
  - coordenada `y`

  El valor es un único número. Es 255 si se detectó una bomba. De lo contrario, es el número de bombas alrededor de esa ubicación más uno. No podemos usar solo el número de bombas, porque por defecto todo el almacenamiento en la EVM y todos los valores de las filas en MUD son cero. Necesitamos distinguir entre "el jugador aún no ha cavado aquí" y "el jugador cavó aquí y descubrió que no hay bombas alrededor".

Además, la comunicación entre el cliente y el servidor se produce a través del componente en cadena. Esto también se implementa usando tablas.

- `PendingGame`: solicitudes no atendidas para iniciar un nuevo juego.
- `PendingDig`: solicitudes no atendidas para cavar en un lugar específico en un juego específico. Esta es una [tabla fuera de cadena](https://mud.dev/store/tables#types-of-tables), lo que significa que no se escribe en el almacenamiento de la EVM, solo se puede leer fuera de la cadena usando eventos.

### Ejecución y flujos de datos {#execution-data-flows}

Estos flujos coordinan la ejecución between el cliente, el componente en cadena y el servidor.

#### Inicialización {#initialization-flow}

Cuando ejecuta `mprocs`, ocurren estos pasos:

1. [`mprocs`](https://github.com/pvolok/mprocs) ejecuta cuatro componentes:

   - [Anvil](https://book.getfoundry.sh/anvil/), que ejecuta una cadena de bloques local
   - [Contratos](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), que compila (si es necesario) y despliega los contratos para MUD
   - [Cliente](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), que ejecuta [Vite](https://vitejs.dev/) para servir la interfaz de usuario y el código del cliente a los navegadores web.
   - [Servidor](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), que realiza las acciones del servidor

2. El paquete `contracts` despliega los contratos de MUD y luego ejecuta [el script `PostDeploy.s.sol`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol). Este script establece la configuración. El código de github especifica [un campo minado de 10x5 con ocho minas en él](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23).

3. [El servidor](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) comienza [configurando MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6). Entre otras cosas, esto activa la sincronización de datos, de modo que exista una copia de las tablas relevantes en la memoria del servidor.

4. El servidor suscribe una función para que se ejecute [cuando cambie la tabla `Configuration`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23). [Esta función](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168) se llama después de que `PostDeploy.s.sol` se ejecute y modifique la tabla.

5. Cuando la función de inicialización del servidor tiene la configuración, [llama a `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) para inicializar [la parte de conocimiento cero del servidor](#using-zokrates-from-typescript). Esto no puede suceder hasta que obtengamos la configuración porque las funciones de conocimiento cero deben tener el ancho y el alto del campo minado como constantes.

6. Una vez que se inicializa la parte de conocimiento cero del servidor, el siguiente paso es [desplegar el contrato de verificación de conocimiento cero en la cadena de bloques](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) y establecer la dirección del verificador en MUD.

7. Finalmente, nos suscribimos a las actualizaciones para que veamos cuándo un jugador solicita [iniciar un nuevo juego](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) o [cavar en un juego existente](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108).

#### Nuevo juego {#new-game-flow}

Esto es lo que sucede cuando el jugador solicita un nuevo juego.

1. Si no hay ningún juego en curso para este jugador, o hay uno pero con un gameId de cero, el cliente muestra un [botón de nuevo juego](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175). Cuando el usuario presiona este botón, [React ejecuta la función `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) es una llamada de `System`. En MUD, todas las llamadas se enrutan a través del contrato `World` y, en la mayoría de los casos, se llama a `<namespace>__<function name>`. En este caso, la llamada es a `app__newGame`, que MUD luego enruta a [`newGame` en `GameSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22).

3. La función en cadena comprueba que el jugador no tiene un juego en curso y, si no lo hay, [agrega la solicitud a la tabla `PendingGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. El servidor detecta el cambio en `PendingGame` y [ejecuta la función suscrita](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Esta función llama a [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114), que a su vez llama a [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144).

5. Lo primero que hace `createGame` es [crear un mapa aleatorio con el número adecuado de minas](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Luego, llama a [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) para crear un mapa con bordes en blanco, que es necesario para Zokrates. Finalmente, `createGame` llama a [`calculateMapHash`](#calculateMapHash), para obtener el hash del mapa, que se utiliza como ID del juego.

6. La función `newGame` agrega el nuevo juego a `gamesInProgress`.

7. Lo último que hace el servidor es llamar a [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43), que está en cadena. Esta función está en un `System` diferente, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol), para permitir el control de acceso. El control de acceso se define en el [archivo de configuración de MUD](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72).

   La lista de acceso solo permite que una única dirección llame al `System`. Esto restringe el acceso a las funciones del servidor a una única dirección, por lo que nadie puede suplantar al servidor.

8. El componente en cadena actualiza las tablas pertinentes:

   - Crea el juego en `PlayerGame`.
   - Establezca el mapeo inverso en `GamePlayer`.
   - Elimine la solicitud de `PendingGame`.

9. El servidor identifica el cambio en `PendingGame`, pero no hace nada porque [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) es falso.

10. En el cliente, [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) se establece en la entrada `PlayerGame` para la dirección del jugador. Cuando `PlayerGame` cambia, `gameRecord` también cambia.

11. Si hay un valor en `gameRecord` y el juego no se ha ganado ni perdido, el cliente [muestra el mapa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Cavar {#dig-flow}

1. El jugador [hace clic en el botón de la celda del mapa](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), lo que llama a [la función `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36). Esta función llama a [`dig` en cadena](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. El componente en cadena [realiza una serie de comprobaciones de cordura](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) y, si tiene éxito, agrega la solicitud de excavación a [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. El servidor [detecta el cambio en `PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Si es válido](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), [llama al código de conocimiento cero](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (explicado a continuación) para generar tanto el resultado como una prueba de que es válido.

4. [El servidor](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) llama a [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) en cadena.

5. `digResponse` hace dos cosas. En primer lugar, comprueba [la prueba de conocimiento cero](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61). Luego, si la prueba es correcta, llama a [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) para procesar realmente el resultado.

6. `processDigResult` comprueba si el juego se ha [perdido](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) o [ganado](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86), y [actualiza `Map`, el mapa en cadena](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. El cliente recoge las actualizaciones automáticamente y [actualiza el mapa que se muestra al jugador](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190), y si procede, le dice al jugador si ha ganado o perdido.

## Uso de Zokrates {#using-zokrates}

En los flujos explicados anteriormente, omitimos las partes de conocimiento cero, tratándolas como una caja negra. Ahora abrámosla y veamos cómo está escrito ese código.

### Aplicar hash al mapa {#hashing-map}

Podemos usar [este código JavaScript](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) para implementar [Poseidon](https://www.poseidon-hash.info), la función hash de Zokrates que usamos. Sin embargo, si bien esto sería más rápido, también sería más complicado que simplemente usar la función hash de Zokrates para hacerlo. Este es un tutorial, por lo que el código está optimizado para la simplicidad, no para el rendimiento. Por lo tanto, necesitamos dos programas Zokrates diferentes, uno para simplemente calcular el hash de un mapa (`hash`) y otro para crear realmente una prueba de conocimiento cero del resultado de la excavación en una ubicación en el mapa (`dig`).

### La función hash {#hash-function}

Esta es la función que calcula el hash de un mapa. Repasaremos este código línea por línea.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Estas dos líneas importan dos funciones de la [biblioteca estándar de Zokrates](https://zokrates.github.io/toolbox/stdlib.html). [La primera función](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) es un [hash Poseidon](https://www.poseidon-hash.info/). Toma una matriz de [`elementos de campo`](https://zokrates.github.io/language/types.html#field) y devuelve un `campo`.

El elemento de campo en Zokrates suele tener menos de 256 bits, pero no por mucho. Para simplificar el código, restringimos el mapa a un máximo de 512 bits y aplicamos un hash a una matriz de cuatro campos, y en cada campo usamos solo 128 bits. La [función `pack128`](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) convierte una matriz de 128 bits en un `campo` para este propósito.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Esta línea inicia una definición de función. `hashMap` obtiene un único parámetro llamado `map`, una matriz `bool`(eana) bidimensional. El tamaño del mapa es `width+2` por `height+2` por razones que se [explican a continuación](#why-map-border).

Podemos usar `${width+2}` y `${height+2}` porque los programas de Zokrates se almacenan en esta aplicación como [cadenas de plantilla](https://www.w3schools.com/js/js_string_templates.asp). El código entre `${` y `}` es evaluado por JavaScript, y de esta manera el programa puede ser utilizado para diferentes tamaños de mapa. El parámetro del mapa tiene un borde de una ubicación de ancho a su alrededor sin ninguna bomba, que es la razón por la que necesitamos agregar dos al ancho y al alto.

El valor de retorno es un `campo` que contiene el hash.

```
   bool[512] mut map1d = [false; 512];
```

El mapa es bidimensional. Sin embargo, la función `pack128` no funciona con matrices bidimensionales. Así que primero aplanamos el mapa en una matriz de 512 bytes, usando `map1d`. Por defecto, las variables de Zokrates son constantes, pero necesitamos asignar valores a esta matriz en un bucle, así que la definimos como [`mut`](https://zokrates.github.io/language/variables.html#mutability).

Necesitamos inicializar la matriz porque Zokrates no tiene `undefined`. La expresión `[false; 512]` significa [una matriz de 512 valores `false`](https://zokrates.github.io/language/types.html#declaration-and-initialization).

```
   u32 mut counter = 0;
```

También necesitamos un contador para distinguir entre los bits que ya hemos rellenado en `map1d` y los que no.

```
   for u32 x in 0..${width+2} {
```

Así es como se declara un [bucle `for`](https://zokrates.github.io/language/control_flow.html#for-loops) en Zokrates. Un bucle `for` de Zokrates tiene que tener límites fijos, porque aunque parece un bucle, el compilador en realidad lo "desenrolla". La expresión `${width+2}` es una constante de tiempo de compilación porque `width` es establecida por el código TypeScript antes de que llame al compilador.

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Para cada ubicación en el mapa, ponga ese valor en la matriz `map1d` e incremente el contador.

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

El `pack128` para crear una matriz de cuatro valores de `campo` a partir de `map1d`. En Zokrates, `array[a..b]` significa el segmento de la matriz que comienza en `a` y termina en `b-1`.

```
    return poseidon(hashMe);
}
```

Use `poseidon` para convertir esta matriz en un hash.

### El programa hash {#hash-program}

El servidor necesita llamar a `hashMap` directamente para crear identificadores de juego. Sin embargo, Zokrates solo puede llamar a la función `main` en un programa para iniciar, por lo que creamos un programa con un `main` que llama a la función hash.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### El programa de excavación {#dig-program}

Este es el corazón de la parte de conocimiento cero de la aplicación, donde producimos las pruebas que se utilizan para verificar los resultados de la excavación.

```
${hashFragment}

// El número de minas en la ubicación (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Por qué el borde del mapa {#why-map-border}

Las pruebas de conocimiento cero usan [circuitos aritméticos](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785), que no tienen un equivalente fácil a una declaración `if`. En su lugar, utilizan el equivalente del [operador condicional](https://en.wikipedia.org/wiki/Ternary_conditional_operator). Si `a` puede ser cero o uno, puede calcular `if a { b } else { c }` como `ab+(1-a)c`.

Debido a esto, una declaración `if` de Zokrates siempre evalúa ambas ramas. Por ejemplo, si tiene este código:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Se producirá un error, porque necesita calcular `arr[10]`, aunque ese valor se multiplicará más tarde por cero.

Esta es la razón por la que necesitamos un borde de una ubicación de ancho alrededor de todo el mapa. Necesitamos calcular el número total de minas alrededor de una ubicación, y eso significa que necesitamos ver la ubicación una fila arriba y abajo, a la izquierda y a la derecha, de la ubicación donde estamos cavando. Lo que significa que esas ubicaciones tienen que existir en la matriz del mapa que se proporciona a Zokrates.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Por defecto, las pruebas de Zokrates incluyen sus entradas. No sirve de nada saber que hay cinco minas alrededor de un lugar a menos que realmente sepa de qué lugar se trata (y no puede simplemente hacerlo coincidir con su solicitud, porque entonces el probador podría usar valores diferentes y no decírselo). Sin embargo, necesitamos mantener el mapa en secreto, mientras se lo proporcionamos a Zokrates. La solución es usar un parámetro `private` (privado), uno que _no_ se revela por la prueba.

Esto abre otra vía para el abuso. El probador podría usar las coordenadas correctas, pero crear un mapa con cualquier número de minas alrededor de la ubicación y posiblemente en la ubicación misma. Para evitar este abuso, hacemos que la prueba de conocimiento cero incluya el hash del mapa, que es el identificador del juego.

```
   return (hashMap(map),
```

El valor de retorno aquí es una tupla que incluye la matriz de hash del mapa, así como el resultado de la excavación.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Usamos 255 como un valor especial en caso de que la ubicación misma tenga una bomba.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Si el jugador no ha encontrado una mina, sume los recuentos de minas del área alrededor de la ubicación y devuelva eso.

### Uso de Zokrates desde TypeScript {#using-zokrates-from-typescript}

Zokrates tiene una interfaz de línea de comandos, pero en este programa lo usamos en el [código TypeScript](https://zokrates.github.io/toolbox/zokrates_js.html).

La biblioteca que contiene las definiciones de Zokrates se llama [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts).

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

Importe los [enlaces JavaScript de Zokrates](https://zokrates.github.io/toolbox/zokrates_js.html). Solo necesitamos la función [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) porque devuelve una promesa que se resuelve con todas las definiciones de Zokrates.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Al igual que el propio Zokrates, también exportamos una sola función, que también es [asíncrona](https://www.w3schools.com/js/js_async.asp). Cuando finalmente regresa, proporciona varias funciones como veremos a continuación.

```typescript
const zokrates = await zokratesInitialize()
```

Inicialice Zokrates, obtenga todo lo que necesita de la biblioteca.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

A continuación tenemos la función hash y dos programas de Zokrates que vimos anteriormente.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Aquí compilamos esos programas.

```typescript
// Cree las claves para la verificación de conocimiento cero.
// En un sistema de producción, querrá utilizar una ceremonia de configuración.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

En un sistema de producción, podríamos usar una [ceremonia de configuración](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) más complicada, pero esto es suficiente para una demostración. No es un problema que los usuarios puedan conocer la clave del probador, ya que aun así no pueden usarla para probar cosas a menos que sean ciertas. Como especificamos la entropía (el segundo parámetro, `""`), los resultados siempre serán los mismos.

**Nota:** la compilación de programas de Zokrates y la creación de claves son procesos lentos. No es necesario repetirlos cada vez, solo cuando cambia el tamaño del mapa. En un sistema de producción, los haría una vez y luego almacenaría el resultado. La única razón por la que no lo hago aquí es por simplicidad.

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

La función [`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) realmente ejecuta el programa de Zokrates. Devuelve una estructura con dos campos: `output`, que es la salida del programa como una cadena JSON, y `witness`, que es la información necesaria para crear la prueba de conocimiento cero del resultado. Aquí solo necesitamos la salida.

La salida es una cadena de la forma `"31337"`, un número decimal entre comillas. Pero la salida que necesitamos para `viem` es un número hexadecimal de la forma `0x60A7`. Así que usamos `.slice(1,-1)` para eliminar las comillas y luego `BigInt` para convertir la cadena restante, que es un número decimal, a un [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt). `.toString(16)` convierte este `BigInt` en una cadena hexadecimal, y `"0x"+` agrega el marcador para números hexadecimales.

```typescript
// Cava y devuelve una prueba de conocimiento cero del resultado
// (código del lado del servidor)
```

La prueba de conocimiento cero incluye las entradas públicas (`x` e `y`) y los resultados (hash del mapa y número de bombas).

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Intentando cavar fuera del mapa")
```

Es un problema comprobar si un índice está fuera de los límites en Zokrates, así que lo hacemos aquí.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Ejecute el programa de excavación.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

Use [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) y devuelva la prueba.

```typescript
const solidityVerifier = `
        // Tamaño del mapa: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Un verificador de Solidity, un contrato inteligente que podemos desplegar en la cadena de bloques y usar para verificar las pruebas generadas por `digCompiled.program`.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Finalmente, devuelve todo lo que otro código pueda necesitar.

## Pruebas de seguridad {#security-tests}

Las pruebas de seguridad son importantes porque un error de funcionalidad eventualmente se revelará. Pero si la aplicación es insegura, es probable que eso permanezca oculto durante mucho tiempo antes de que lo revele alguien que haga trampas y se apropie de recursos que pertenecen a otros.

### Permisos {#permissions}

Hay una entidad privilegiada en este juego, el servidor. Es el único usuario autorizado a llamar a las funciones en [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol). Podemos usar [`cast`](https://book.getfoundry.sh/cast/) para verificar que las llamadas a funciones con permisos solo se permiten como la cuenta del servidor.

[La clave privada del servidor está en `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. En la computadora que ejecuta `anvil` (la cadena de bloques), establezca estas variables de entorno.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Use `cast` para intentar establecer la dirección del verificador como una dirección no autorizada.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   No solo `cast` informa de un fallo, sino que puede abrir **MUD Dev Tools** (Herramientas de desarrollo de MUD) en el juego en el navegador, hacer clic en **Tables** (Tablas) y seleccionar **app\_\_VerifierAddress**. Vea que la dirección no es cero.

3. Establezca la dirección del verificador como la dirección del servidor.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   La dirección en **app\_\_VerifiedAddress** debería ser ahora cero.

Todas las funciones de MUD en el mismo `System` pasan por el mismo control de acceso, por lo que considero que esta prueba es suficiente. Si no lo cree, puede comprobar las otras funciones en [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol).

### Abusos de conocimiento cero {#zero-knowledge-abuses}

Las matemáticas para verificar Zokrates están fuera del alcance de este tutorial (y de mis habilidades). Sin embargo, podemos ejecutar varias comprobaciones en el código de conocimiento cero para verificar que, si no se hace correctamente, falla. Todas estas pruebas requerirán que cambiemos [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) y reiniciemos toda la aplicación. No es suficiente reiniciar el proceso del servidor, porque pone la aplicación en un estado imposible (el jugador tiene un juego en curso, pero el juego ya no está disponible para el servidor).

#### Respuesta incorrecta {#wrong-answer}

La posibilidad más simple es proporcionar la respuesta incorrecta en la prueba de conocimiento cero. Para ello, entramos en `zkDig` y [modificamos la línea 91](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Esto significa que siempre afirmaremos que hay una bomba, independientemente de la respuesta correcta. Intente jugar con esta versión y verá en la pestaña **servidor** de la pantalla `pnpm dev` este error:

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Fallo de la verificación de conocimiento cero',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Así que este tipo de trampa falla.

#### Prueba incorrecta {#wrong-proof}

¿Qué sucede si proporcionamos la información correcta, pero simplemente tenemos los datos de prueba incorrectos? Ahora, reemplace la línea 91 por:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Todavía falla, pero ahora falla sin razón porque ocurre durante la llamada al verificador.

### ¿Cómo puede un usuario verificar el código de confianza cero? {#user-verify-zero-trust}

Los contratos inteligentes son relativamente fáciles de verificar. Normalmente, el desarrollador publica el código fuente en un explorador de bloques, y el explorador de bloques verifica que el código fuente se compila en el código de la [transacción de despliegue del contrato](/developers/docs/smart-contracts/deploying/). En el caso de los `System` de MUD, esto es [ligeramente más complicado](https://mud.dev/cli/verify), pero no mucho.

Esto es más difícil con el conocimiento cero. El verificador incluye algunas constantes y ejecuta algunos cálculos sobre ellas. Esto no le dice qué se está probando.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

La solución, al menos hasta que los exploradores de bloques se animen a añadir la verificación de Zokrates a sus interfaces de usuario, es que los desarrolladores de aplicaciones pongan a disposición los programas de Zokrates y que, al menos, algunos usuarios los compilen ellos mismos con la clave de verificación adecuada.

Para ello:

1. [Instale Zokrates](https://zokrates.github.io/gettingstarted.html).

2. Cree un archivo, `dig.zok`, con el programa Zokrates. El siguiente código asume que ha mantenido el tamaño original del mapa, 10x5.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // El número de minas en la ubicación (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Compile el código Zokrates y cree la clave de verificación. La clave de verificación debe crearse con la misma entropía utilizada en el servidor original, [en este caso, una cadena vacía](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Cree el verificador de Solidity por su cuenta y verifique que es funcionalmente idéntico al de la cadena de bloques (el servidor añade un comentario, pero eso no es importante).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Decisiones de diseño {#design}

En cualquier aplicación suficientemente compleja existen objetivos de diseño contrapuestos que requieren concesiones. Veamos algunas de las compensaciones y por qué la solución actual es preferible a otras opciones.

### Por qué conocimiento cero {#why-zero-knowledge}

Para el buscaminas no se necesita realmente el conocimiento cero. El servidor siempre puede guardar el mapa y revelarlo todo cuando termine el juego. Entonces, al final del juego, el contrato inteligente puede calcular el hash del mapa, verificar que coincide y, si no es así, penalizar al servidor o descartar el juego por completo.

No utilicé esta solución más sencilla porque solo funciona para juegos cortos con un estado final bien definido. Cuando un juego es potencialmente infinito (como en el caso de los [mundos autónomos](https://0xparc.org/blog/autonomous-worlds)), se necesita una solución que demuestre el estado _sin_ revelarlo.

Como tutorial, este artículo necesitaba un juego corto que fuera fácil de entender, pero esta técnica es más útil para juegos más largos.

### ¿Por qué Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) no es la única biblioteca de conocimiento cero disponible, pero es similar a un lenguaje de programación normal, [imperativo](https://en.wikipedia.org/wiki/Imperative_programming) y admite variables booleanas.

Para su aplicación, con diferentes requisitos, es posible que prefiera usar [Circum](https://docs.circom.io/getting-started/installation/) o [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/).

### Cuándo compilar Zokrates {#when-compile-zokrates}

En este programa compilamos los programas Zokrates [cada vez que se inicia el servidor](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61). Esto es claramente un desperdicio de recursos, pero este es un tutorial, optimizado para la simplicidad.

Si estuviera escribiendo una aplicación a nivel de producción, comprobaría si tengo un archivo con los programas de Zokrates compilados en este tamaño de campo minado y, en caso afirmativo, lo usaría. Lo mismo ocurre con el despliegue de un contrato de verificador en cadena.

### Creación de las claves del verificador y del probador {#key-creation}

La [creación de claves](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69) es otro cálculo puro que no es necesario realizar más de una vez para un tamaño de campo minado determinado. Nuevamente, se hace solo una vez por simplicidad.

Además, podríamos usar [una ceremonia de configuración](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony). La ventaja de una ceremonia de configuración es que se necesita la entropía o algún resultado intermedio de cada participante para hacer trampas en la prueba de conocimiento cero. Si al menos un participante de la ceremonia es honesto y elimina esa información, las pruebas de conocimiento cero están a salvo de ciertos ataques. Sin embargo, _no hay ningún mecanismo_ para verificar que la información se ha eliminado de todas partes. Si las pruebas de conocimiento cero son de importancia crítica, querrá participar en la ceremonia de configuración.

Aquí nos basamos en [poderes perpetuos de tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau), que tuvo docenas de participantes. Probablemente sea lo suficientemente seguro y mucho más simple. Tampoco agregamos entropía durante la creación de la clave, lo que facilita a los usuarios [verificar la configuración de conocimiento cero](#user-verify-zero-trust).

### Dónde verificar {#where-verification}

Podemos verificar las pruebas de conocimiento cero ya sea en cadena (lo que cuesta gas) o en el cliente (usando [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)). Elegí la primera, porque esto le permite [verificar el verificador](#user-verify-zero-trust) una vez y luego confiar en que no cambiará mientras la dirección del contrato para él permanezca igual. Si la verificación se hiciera en el cliente, tendría que verificar el código que recibe cada vez que descarga el cliente.

Además, aunque este juego es para un solo jugador, muchos juegos de cadena de bloques son multijugador. La verificación en cadena significa que solo se verifica la prueba de conocimiento cero una vez. Hacerlo en el cliente requeriría que cada cliente verificara de forma independiente.

### ¿Aplanar el mapa en TypeScript o Zokrates? {#where-flatten}

En general, cuando el procesamiento se puede hacer en TypeScript o Zokrates, es mejor hacerlo en TypeScript, que es mucho más rápido y no requiere pruebas de conocimiento cero. Esta es la razón, por ejemplo, de que no proporcionemos a Zokrates el hash y hagamos que verifique que es correcto. La aplicación de hash debe hacerse dentro de Zokrates, pero la coincidencia entre el hash devuelto y el hash en cadena puede ocurrir fuera de él.

Sin embargo, todavía [aplanamos el mapa en Zokrates](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20), mientras que podríamos haberlo hecho en TypeScript. La razón es que las otras opciones son, en mi opinión, peores.

- Proporcione una matriz unidimensional de booleanos al código de Zokrates y use una expresión como `x*(height+2)
  +y` para obtener el mapa bidimensional. Esto haría [el código](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) algo más complicado, así que decidí que la ganancia de rendimiento no vale la pena para un tutorial.

- Envíe a Zokrates tanto la matriz unidimensional como la bidimensional. Sin embargo, esta solución no nos aporta nada. El código de Zokrates tendría que verificar que la matriz unidimensional que se le proporciona es realmente la representación correcta de la matriz bidimensional. Así que no habría ninguna ganancia de rendimiento.

- Aplanar la matriz bidimensional en Zokrates. Esta es la opción más sencilla, así que la elegí.

### Dónde almacenar los mapas {#where-store-maps}

En esta aplicación, [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) es simplemente una variable en la memoria. Esto significa que si el servidor muere y necesita ser reiniciado, toda la información que almacenó se pierde. No solo los jugadores no pueden continuar su juego, sino que ni siquiera pueden comenzar un nuevo juego porque el componente en cadena cree que todavía tienen un juego en progreso.

Este es claramente un mal diseño para un sistema de producción, en el que almacenaría esta información en una base de datos. La única razón por la que utilicé una variable aquí es because este es un tutorial y la simplicidad es la principal consideración.

## Conclusión: ¿en qué condiciones es esta la técnica adecuada? {#conclusion}

Así que ahora ya sabe cómo escribir un juego con un servidor que almacena un estado secreto que no pertenece a la cadena. Pero, ¿en qué casos debería hacerlo? Hay dos consideraciones principales.

- _Juego de larga duración_: [como se mencionó anteriormente](#why-zero-knowledge), en un juego corto puede publicar el estado una vez que el juego ha terminado y hacer que todo se verifique entonces. Pero esa no es una opción cuando el juego toma un tiempo largo o indefinido y el estado necesita permanecer en secreto.

- _Cierta centralización aceptable_: las pruebas de conocimiento cero pueden verificar la integridad, que una entidad no está falsificando los resultados. Lo que no pueden hacer es garantizar que la entidad seguirá disponible y responderá a los mensajes. En situaciones donde la disponibilidad también necesita ser descentralizada, las pruebas de conocimiento cero no son una solución suficiente y se necesita [computación multipartita](https://en.wikipedia.org/wiki/Secure_multi-party_computation).

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).

### Reconocimientos {#acknowledgements}

- Alvaro Alonso leyó un borrador de este artículo y aclaró algunos de mis malentendidos sobre Zokrates.

Cualquier error restante es mi responsabilidad.
