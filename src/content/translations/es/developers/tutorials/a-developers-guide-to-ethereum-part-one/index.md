---
title: Introducción a Ethereum para desarrolladores de Python, parte 1
description: Una introducción al desarrollo de Ethereum, especialmente útil para los que tienen conocimiento del lenguaje de programación Python
author: Marc Garreau
lang: es
tags:
  - "Empezar"
  - "python"
  - "cadena de bloques"
  - "web3.py"
skill: beginner
published: 2020-09-08
source: Encantadores de serpientes
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Entonces, ¿ha oído hablar acerca de ese tal Ethereum y está listo para indagar hasta el fondo de qué se trata? En esta entrada descubrirá de un vistazo algunos fundamentos de la cadena de bloques, para luego pasar a interactuar con un nodo simulado de Ethereum a través de la lectura de datos de bloques, de la comprobación de saldos de las cuentas y del envío de transacciones. A lo largo del descubrimiento, destacaremos las diferencias entre las formas tradicionales de construir aplicaciones y de este nuevo paradigma descentralizado.

## Prerrequisitos (fáciles) {#soft-prerequisites}

Esta entrada pretende ser accesible a un amplio abanico de desarrolladores. [Se incluirán herramientas de Python](/desarrolladores/docs/programming-languages/python/), pero solamente para conducir las ideas, no pasa nada si no es desarrollador de Python. Sin embargo, sí que voy a hacer algunas suposiciones sobre lo que ya sabe, para que podamos explorar rápidamente las partes específicas de Ethereum.

Supuestos:

- sabe cómo usar una terminal,
- ha escrito unas cuantas líneas de código en Python,
- Tiene la versión 3.6 o superior de Python instalada en su computadora (se recomienda el uso de un [entorno virtual](https://realpython.com/effective-python-environment/#virtual-environments)), y
- ha utilizado `pip`, el instalador de paquetes de Python. Si una de las suposiciones previas no encajan, o no planeas reproducir el código en este artículo, puede ser que no tengas ningún inconveniente leyendo este articulo.

## Expliquemos brevemente en qué consisten las cadenas de bloques {#blockchains-briefly}

Hay muchas maneras de describir Ethereum, pero en su esencia es una cadena de bloques. Las cadenas de bloques se componen de una serie de bloques, así que empecemos por ahí. En términos sencillos, cada bloque de la cadena de bloques de Ethereum, no es más que algunos metadatos y una lista de transacciones. En el formato JSON, se parece a esto:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   "miner": "0xa1b2c3...",
   ...,
   "transactions": [...]
}
```

Cada [bloque](/developers/docs/blocks/) tiene una referencia al bloque anterior; el `parentHash` es el hash a ese bloque previo.

<div class="featured">Nota: Ethereum hace un uso regular de las <a href="https://wikipedia.org/wiki/Hash_function">funciones hash</a> para producir valores de tamaño fijo («hashes»). Los hashes desempeñan un importante papel en Ethereum; por ahora, puede considerarlos como identificadores únicos.</div>

![Un diagrama que representa a la cadena de bloques incluyendo datos dentro de cada bloque](./blockchain-diagram.png)

_Una cadena de bloques es esencialmente una lista enlazada; cada bloque hace referencia a otro anterior._

Esta estructura de datos no es nada novedosa, pero las reglas (p. ej., protocolos peer-to-peer) que gobiernan la red sí lo son. No hay una autoridad central; una red de pares debe colaborar para sostenerla, y competir para decidir qué transacciones se incluirán en el siguiente bloque. Por tanto, cuando quiera enviar dinero a un amigo, necesitará emitir esa transacción a la red y luego esperar a que esta se incluya en un próximo bloque.

La única forma en que la cadena de bloques puede verificar que el dinero se ha enviado, realmente, de un usuario a otro, es usando una moneda nativa (es decir, creada y gobernada por) esa cadena de bloques. En Ethereum, esta moneda se denomina ether, y la cadena de bloques de Ethereum contiene el único registro oficial de los balances de cuentas.

## Un nuevo paradigma {#a-new-paradigm}

Este nuevo conjunto de tecnologías descentralizadas ha generado nuevas herramientas para desarrolladores. Estas herramientas existen en muchos lenguajes de programación, pero las veremos a través de la lente de Python. Repito: aunque no use Python, no debería ser un problema seguirlo.

Los desarrolladores de Python que quieran interactuar con Ethereum seguramente quieran usar [Web3.py](https://web3py.readthedocs.io/). Web3.py es una biblioteca que simplifica la forma en la que puede conectarse a un nodo de Ethereum para luego enviar y recibir datos de él.

<div class="featured">Nota: «nodo de Ethereum» y «cliente de Ethereum» se usan de forma indistinta. En cualquier caso, se refiere al software que ejecuta un participante de la red Ethereum. Este software puede leer los datos de un bloque, recibir actualizaciones cuando se añaden nuevos bloques («minería») y emitir nuevas transacciones, entre otras opciones.</div>

Los [clientes de Ethereum](/developers/docs/nodes-and-clients/) pueden configurarse para que sean accesibles por [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP o Websockets, por lo que Web3.py necesitará reflejar esta configuración. Web3.py se refiere a estas opciones de conexión como **proveedores**. Tendrá que elegir uno de los tres proveedores para vincular la instancia de Web3.py a su nodo.

![Un diagrama que muestra cómo web3.py usa IPC para conectar su aplicación a un nodo de Ethereum](./web3py-and-nodes.png)

_Configure el nodo de Ethereum y Web3.py para que se comuniquen por el mismo protocolo (IPC en este diagrama)._

Cuando Web3.py esté configurado correctamente, puede empezar a interactuar con la cadena de bloques. He aquí hay un par de ejemplos de uso de Web3.py como avance de lo que está por venir:

```python
# read block data:
w3.eth.get_block('latest')

# send a transaction:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalación {#installation}

En este tutorial, trabajaremos solo con el intérprete de Python. No crearemos ningún directorio, archivo, clases o funciones.

<div class="featured">Nota: en los ejemplos de abajo, los comandos que empiezan con `$` están destinados a ser ejecutados en la terminal. (No escriba el símbolo `$`, ya que sólo significa el inicio de la línea).</div>

Primero, instale [IPython](https://ipython.org/) para tener un entorno fácil de usar para explorar. IPython ofrece el autocompletado mediante la tecla de tabulación —entre otras características—, haciendo mucho más fácil ver qué es posible con Web3.py.

```bash
pip install ipython
```

Web3.py se publica bajo el nombre `web3`. Instálelo de la siguiente manera:

```bash
pip install web3
```

Una cosa más: vamos a simular una cadena de bloques posteriormente, lo que requerirá un par de dependencias más. Puede instalarlos todos mediante:

```bash
pip install 'web3[tester]'
```

¡Ya está listo para comenzar!

## Crear un proceso aislado {#spin-up-a-sandbox}

Abra un nuevo entorno de Python escribiendo `ipython` en su terminal. Esto es comparable a escribir `python`, pero tiene más funciones.

```bash
ipython
```

Esto imprimirá información sobre las versiones de Python e IPython que están instaladas. Después, verá que la terminal está esperando que escriba algo:

```python
In [1]:
```

Ahora mismo está viendo una consola interactiva de Python. Es, esencialmente, un proceso aislado que puede usar para jugar. Si ha llegado hasta aquí, es hora de importar Web3.py:

```python
In [1]: from web3 import Web3
```

## Presentamos el módulo Web3 {#introducing-the-web3-module}

Además de ser una entrada a Ethereum, el módulo [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) ofrece algunas prácticas funciones. Vamos a explorar un par de ellas.

En una aplicación que interactúe con Ethereum, normalmente necesitará convertir las denominaciones de las monedas. El módulo Web3 proporciona un par de métodos de ayuda para este proceso: [fromWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.fromWei) y [toWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toWei).

<div class="featured">
Nota: los ordenadores son especialmente poco precisos en el cálculo de decimales. Para solucionarlo, los desarrolladores suelen almacenar cantidades de dólares en centavos. Por ejemplo, un artículo con un precio de 5,99 $ puede almacenarse en la base de datos como 599.

Se usa un patrón similar cuando se manejan transacciones en <b>ether</b>. No obstante, en vez de dos puntos decimales, ¡ether tiene 18! La denominación más pequeña de ether se llama <b>wei</b>: ese es el valor especificado cuando se envían transacciones.

1 ether = 1000000000000000000 wei

1 wei = 0.000000000000000001 ether

</div>

Pruebe convirtiendo algunos valores a y desde wei. Tenga en cuenta que [hay nombres para muchas de las denominaciones](https://web3py.readthedocs.io/en/stable/examples.html#converting-currency-denominations) entre ether y wei. Una de las más conocidas es **gwei**, ya que es como suelen representarse las comisiones de las transacciones.

```python
In [2]: Web3.toWei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.fromWei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Otros métodos de utilidad en el módulo Web3 incluyen conversores de formato de datos (p. ej., [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), ayudantes de dirección (p. ej., [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) y funciones hash (p. ej., [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Explicaremos muchos de estos en próximos tutoriales. Para ver todos los métodos y funciones disponibles, utilice el autocompletador de IPython escribiendo `Web3`. y presionando la tecla de tabulación dos veces después del período.

## Hable con la cadena {#talk-to-the-chain}

Los métodos de conveniencia son encantadores, pero pasemos a la cadena de bloques. El siguiente paso es configurar Web3.py para comunicarse con un nodo Ethereum. Aquí tenemos la opción de utilizar los proveedores IPC, HTTP o Websocket.

No seguiremos este camino, pero un ejemplo de flujo de trabajo completo utilizando el proveedor HTTP podría ser este:

- Descargue un nodo Ethereum, por ejemplo, [Geth](https://geth.ethereum.org/).
- Inicie Geth en una ventana de terminal y espere a que sincronice la red. El puerto HTTP predeterminado es `8545`, pero es configurable.
- Haga que Web3 se conecte al nodo a través de HTTP, en `localhost:8545`. `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Use la instancia `w3` para interactuar con el nodo.

Si bien es una forma «real» de hacerlo, el proceso de sincronización lleva horas y es innecesario si solo quiere un entorno de desarrollo. Web3.py expone un cuarto proveedor para este propósito, el **EthereumTesterProvider**. Este proveedor de pruebas se vincula a un nodo de Ethereum simulado con permisos relajados y dinero falso para jugar.

![Un diagrama que muestra el EthereumTesterProvider vinculando su aplicación web3.py a un nodo simulado de Ethereum](./ethereumtesterprovider.png)

_El EthereumTesterProvider se conecta a un nodo simulado y es práctico para entornos de desarrollo rápidos._

Ese nodo simulado se llama [eth-tester](https://github.com/ethereum/eth-tester) y lo instalamos como parte del comando `pip install web3[tester]`. Configurar Web3.py para utilizar este proveedor de pruebas es tan simple como:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

¡Ya está listo para navegar por la cadena! Eso no es algo que la gente suela decir. Me lo acabo de inventar. Veamos rápidamente en qué consiste.

## Explicación rápida {#the-quick-tour}

Lo primero de todo es comprobar que funciona:

```python
In [5]: w3.isConnected()
Out[5]: True
```

A decir verdad, desde que usamos el proveedor de pruebas, esta no es una prueba muy valiosa, pero si falla, existe la posibilidad de que escriba algo incorrecto cuando instancie la variable `w3`. Compruebe dos veces que haya incluído los paréntesis internos, es decir:`Web3.EthereumTesterProvider()`.

## Punto n.º1 de la explicación: [cuentas](/developers/docs/accounts/) {#tour-stop-1-accounts}

Por conveniencia, el proveedor ha creado algunas cuentas y las ha cargado previamente con ether de prueba.

Primero, veamos una lista de las cuentas:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Si ejecuta este comando, debería ver una lista de diez cadenas que comienzan con `0x`. Cada uno es una **dirección pública** y es, más o menos, análoga al número de cuenta de una cuenta corriente. Esa es la dirección que le daría a alguien que quisiera enviarle ether.

Como se ha mencionado, el proveedor ha cargado previamente cada una de estas cuentas con ether de prueba. Veamos cuánto hay en la primera cuenta:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

¡Un montón de ceros! Antes de que vaya corriendo a un banco falso, recuerde la lección sobre las denominaciones de monedas que le enseñamos antes. Los valores de ether se representan en la menor denominación: wei. Convierte eso a ether:

```python
In [8]: w3.fromWei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Un millón de ether de prueba; nada mal.

## Parada n.º2 de la explicación: datos de bloque {#tour-stop-2-block-data}

Echemos un vistazo al estado de esta cadena de bloques de prueba:

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

Veremos que aparece mucha información sobre un bloque, pero lo más importante es:

- El número del bloque es cero, al margen de cuando se haya configurado el proveedor de pruebas. A diferencia de la red Ethereum, que mina un nuevo bloque cada 15 segundos —aproximadamente—, esta simulación le esperará hasta que le pida que haga algo.
- `transactions` es una lista vacía debido a lo que decimos arriba: aún no hemos hecho nada. Este primer bloque es un **bloque vacío**, usado solo para iniciar la cadena.
- Observe que `parentHash` es simplemente un montón de bytes vacíos. Esto significa que es el primer bloque en la cadena, también conocido como un **bloque génesis**.

## Parada n.º3 de la explicación: [transacciones](/developers/docs/transactions/) {#tour-stop-3-transactions}

Estamos estancados en el bloque cero hasta que haya una transacción por minar, así que vamos a proporcionarle una. Envíe unos cuantos ether de prueba desde una cuenta a otra:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.toWei(3, 'ether'),
   'gas': 21000
})
```

Este suele ser el momento en el que espera varios segundos para que su transacción sea minada en un nuevo bloque. El proceso completo suele ser de esta manera:

1. Envíe una transacción y mantenga el hash de la transacción. Hasta que se mine, la transacción aparecerá como «pendiente». `tx_hash = w3.eth.send_transaction({ … })`
2. Espere a que la transacción sea minada: `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Continúe con la lógica de la aplicación. Para ver la transacción satisfactoria: `w3.eth.get_transaction(tx_hash)`

Nuestro entorno simulado añadirá la transacción en un nuevo bloque de manera instantánea, por lo que podremos ver inmediatamente la transacción:

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

Aquí encontrará algunos detalles que le resultarán familiares: las casillas `from`, `to` y `value` deben coincidir con el contenido de nuestra consulta `send_transaction`. El otro aspecto tranquilizador es que esta transacción se ha incluido como la primera transacción (`'transactionIndex': 0`) dentro del bloque número 1.

También podemos verificar fácilmente el éxito de esta transacción al revisar los balances de las dos cuentas implicadas. Deben haber pasado tres ether de una cuenta a otra.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999999999999969000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

¡El último parece ser correcto! El balance ha pasado de 1.000.000 a 1.000.003 ether. Pero ¿qué pasó con la primera cuenta? Parece que perdió algo más de tres ether. Desafortunadamente, nada en esta vida es gratis; hacer uso de la red pública de Ethereum requiere compensar a las personas que cumplen con su tarea. Se ha tomado de la cuenta una pequeña comisión por la transacción, dejando la cantidad de la transacción al orden dd 31000 wei.

<div class="featured">Nota: en la red pública, el precio de las comisiones por transacción se basa en la demanda de la red y en la rapidez con la que se desee procesar una transacción. Si quiere saber cómo se calculan las comisiones, lea mi artículo anterior, en donde describo <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">cómo se incluyen las transacciones en un bloque</a>.</div>

## Tómese un respiro {#and-breathe}

Después de todo lo que hemos aprendido hasta ahora, es un buen momento para hacer una pausa. Todavía hay mucho por indagar, por lo que continuaremos explorando en la parte dos de esta serie. Algunos conceptos que trataremos posteriormente: conectarse a un nodo real, contratos inteligentes y tókenes. ¿Tiene alguna pregunta? Si la tiene, adelante, ¡pregúntemela! Sus comentarios ayudarán a definir el camino a seguir. Puede hacer comentarios a través de [Twitter](https://twitter.com/wolovim).
