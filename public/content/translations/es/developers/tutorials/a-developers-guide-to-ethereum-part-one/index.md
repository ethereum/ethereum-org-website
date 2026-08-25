---
title: "Introducción a Ethereum para desarrolladores de Python, parte 1"
description: "Una introducción al desarrollo de Ethereum, especialmente útil para aquellos con conocimientos del lenguaje de programación Python"
author: Marc Garreau
lang: es
tags:
  - python
  - web3.py
skill: beginner
breadcrumb: Ethereum con Python
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Así que has oído hablar de esto de Ethereum y estás listo para adentrarte en la madriguera del conejo. Esta publicación cubrirá rápidamente algunos conceptos básicos de la cadena de bloques, y luego te pondrá a interactuar con un nodo de Ethereum simulado: leyendo datos de bloques, verificando saldos de cuentas y enviando transacciones. En el camino, destacaremos las diferencias entre las formas tradicionales de crear aplicaciones y este nuevo paradigma descentralizado.

## Requisitos previos (flexibles) {#soft-prerequisites}

Esta publicación aspira a ser accesible para una amplia gama de desarrolladores. Se utilizarán [herramientas de Python](/developers/docs/programming-languages/python/), pero son solo un vehículo para las ideas; no hay problema si no eres un desarrollador de Python. Sin embargo, haré solo algunas suposiciones sobre lo que ya sabes, para que podamos pasar rápidamente a las partes específicas de Ethereum.

Suposiciones:

- Sabes manejarte en una terminal,
- Has escrito algunas líneas de código en Python,
- Tienes instalada la versión 3.6 o superior de Python en tu máquina (se recomienda encarecidamente el uso de un [entorno virtual](https://realpython.com/effective-python-environment/#virtual-environments)), y
- has usado `pip`, el instalador de paquetes de Python.
  Nuevamente, si algo de esto no es cierto, o no planeas reproducir el código de este artículo, es probable que aún puedas seguirlo sin problemas.

## Cadenas de bloques, en resumen {#blockchains-briefly}

Hay muchas formas de describir Ethereum, pero en su núcleo hay una cadena de bloques. Las cadenas de bloques están formadas por una serie de bloques, así que empecemos por ahí. En los términos más simples, cada bloque en la cadena de bloques de Ethereum es solo algunos metadatos y una lista de transacciones. En formato JSON, se ve algo así:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Cada [bloque](/developers/docs/blocks/) tiene una referencia al bloque que lo precedió; el `parentHash` es simplemente el hash del bloque anterior.

<FeaturedText>Nota: Ethereum hace un uso regular de <a href="https://wikipedia.org/wiki/Hash_function">funciones hash</a> para producir valores de tamaño fijo ("hashes"). Los hashes juegan un papel importante en Ethereum, pero por ahora puedes pensar en ellos como identificadores únicos.</FeaturedText>

![A diagram depicting a blockchain including the data inside  each block](./blockchain-diagram.png)

_Una cadena de bloques es esencialmente una lista enlazada; cada bloque tiene una referencia al bloque anterior._

Esta estructura de datos no es nada novedosa, pero las reglas (es decir, los protocolos entre pares) que rigen la red sí lo son. No hay una autoridad central; la red de pares debe colaborar para sostener la red y competir para decidir qué transacciones incluir en el siguiente bloque. Por lo tanto, cuando quieras enviar algo de dinero a un amigo, tendrás que transmitir esa transacción a la red y luego esperar a que se incluya en un próximo bloque.

La única forma en que la cadena de bloques puede verificar que el dinero realmente se envió de un usuario a otro es usar una moneda nativa de (es decir, creada y gobernada por) esa cadena de bloques. En Ethereum, esta moneda se llama ether, y la cadena de bloques de Ethereum contiene el único registro oficial de los saldos de las cuentas.

## Un nuevo paradigma {#a-new-paradigm}

Esta nueva pila tecnológica descentralizada ha generado nuevas herramientas para desarrolladores. Dichas herramientas existen en muchos lenguajes de programación, pero las veremos a través de la lente de Python. Para reiterar: incluso si Python no es tu lenguaje preferido, no debería ser un gran problema seguir el ritmo.

Los desarrolladores de Python que quieran interactuar con Ethereum probablemente recurrirán a [Web3.py](https://web3py.readthedocs.io/). Web3.py es una biblioteca que simplifica enormemente la forma en que te conectas a un nodo de Ethereum y luego envías y recibes datos de él.

<FeaturedText>Nota: "Nodo de Ethereum" y "cliente de Ethereum" se usan indistintamente. En cualquier caso, se refiere al software que ejecuta un participante en la red Ethereum. Este software puede leer datos de bloques, recibir actualizaciones cuando se agregan nuevos bloques a la cadena, transmitir nuevas transacciones y más. Técnicamente, el cliente es el software, el nodo es la computadora que ejecuta el software.</FeaturedText>

Los [clientes de Ethereum](/developers/docs/nodes-and-clients/) se pueden configurar para que sean accesibles mediante [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP o Websockets, por lo que Web3.py deberá reflejar esta configuración. Web3.py se refiere a estas opciones de conexión como **proveedores**. Querrás elegir uno de los tres proveedores para vincular la instancia de Web3.py con tu nodo.

![A diagram showing how web3.py uses IPC to connect your application to an Ethereum node](./web3py-and-nodes.png)

_Configura el nodo de Ethereum y Web3.py para que se comuniquen a través del mismo protocolo, por ejemplo, IPC en este diagrama._

Una vez que Web3.py esté configurado correctamente, puedes comenzar a interactuar con la cadena de bloques. Aquí hay un par de ejemplos de uso de Web3.py como un adelanto de lo que vendrá:

```python
# leer datos del bloque:
w3.eth.get_block('latest')

# enviar una transacción:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalación {#installation}

En este tutorial, solo trabajaremos dentro de un intérprete de Python. No crearemos directorios, archivos, clases ni funciones.

<FeaturedText>Nota: En los ejemplos a continuación, los comandos que comienzan con `$` están destinados a ejecutarse en la terminal. (No escribas el `$`, solo significa el comienzo de la línea).</FeaturedText>

Primero, instala [IPython](https://ipython.org/) para tener un entorno fácil de usar en el que explorar. IPython ofrece autocompletado con tabulador, entre otras características, lo que hace que sea mucho más fácil ver qué es posible dentro de Web3.py.

```bash
pip install ipython
```

Web3.py se publica bajo el nombre `web3`. Instálalo de la siguiente manera:

```bash
pip install web3
```

Una cosa más: vamos a simular una cadena de bloques más adelante, lo que requiere un par de dependencias más. Puedes instalarlas a través de:

```bash
pip install 'web3[tester]'
```

¡Ya estás listo para empezar!

Nota: El paquete `web3[tester]` funciona hasta Python 3.10.xx

## Pon en marcha un entorno de pruebas {#spin-up-a-sandbox}

Abre un nuevo entorno de Python ejecutando `ipython` en tu terminal. Esto es comparable a ejecutar `python`, pero viene con más funciones y mejoras.

```bash
ipython
```

Esto imprimirá cierta información sobre las versiones de Python e IPython que estás ejecutando, luego deberías ver un indicador esperando una entrada:

```python
In [1]:
```

Ahora estás viendo un shell interactivo de Python. Esencialmente, es un entorno de pruebas para jugar. Si has llegado hasta aquí, es hora de importar Web3.py:

```python
In [1]: from web3 import Web3
```

## Presentación del módulo Web3 {#introducing-the-web3-module}

Además de ser una puerta de enlace a Ethereum, el módulo [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) ofrece algunas funciones de conveniencia. Exploremos un par de ellas.

En una aplicación de Ethereum, comúnmente necesitarás convertir denominaciones de moneda. El módulo Web3 proporciona un par de métodos auxiliares solo para esto: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) y [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Nota: Las computadoras son notoriamente malas para manejar matemáticas decimales. Para evitar esto, los desarrolladores a menudo almacenan montos en dólares en centavos. Por ejemplo, un artículo con un precio de $5.99 puede almacenarse en la base de datos como 599.

Se utiliza un patrón similar al manejar transacciones en <b>ether</b>. Sin embargo, en lugar de dos puntos decimales, ¡ether tiene 18! La denominación más pequeña de ether se llama <b>Wei</b>, por lo que ese es el valor especificado al enviar transacciones.

1 ether = 1000000000000000000 Wei

1 Wei = 0.000000000000000001 ether

</FeaturedText>

Intenta convertir algunos valores a y desde Wei. Ten en cuenta que [hay nombres para muchas de las denominaciones](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) entre ether y Wei. Una de las más conocidas entre ellas es **Gwei**, ya que a menudo es como se representan las tarifas de transacción.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Otros métodos de utilidad en el módulo Web3 incluyen convertidores de formato de datos (por ejemplo, [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), ayudantes de direcciones (por ejemplo, [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) y funciones hash (por ejemplo, [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Muchos de estos se cubrirán más adelante en la serie. Para ver todos los métodos y propiedades disponibles, utiliza el autocompletado de IPython escribiendo `Web3`. y presionando la tecla de tabulación dos veces después del punto.

## Habla con la cadena {#talk-to-the-chain}

Los métodos de conveniencia son encantadores, pero pasemos a la cadena de bloques. El siguiente paso es configurar Web3.py para que se comunique con un nodo de Ethereum. Aquí tenemos la opción de usar los proveedores IPC, HTTP o Websocket.

No seguiremos este camino, pero un ejemplo de un flujo de trabajo completo utilizando el proveedor HTTP podría verse así:

- Descarga un nodo de Ethereum, por ejemplo, [Geth](https://geth.ethereum.org/).
- Inicia Geth en una ventana de terminal y espera a que sincronice la red. El puerto HTTP predeterminado es `8545`, pero es configurable.
- Dile a Web3.py que se conecte al nodo a través de HTTP, en `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Usa la instancia `w3` para interactuar con el nodo.

Si bien esta es una forma "real" de hacerlo, el proceso de sincronización lleva horas y es innecesario si solo deseas un entorno de desarrollo. Web3.py expone un cuarto proveedor para este propósito, el **EthereumTesterProvider**. Este proveedor de pruebas se vincula a un nodo de Ethereum simulado con permisos relajados y moneda falsa para jugar.

![A diagram showing the EthereumTesterProvider linking your web3.py application to a simulated Ethereum node](./ethereumtesterprovider.png)

_El EthereumTesterProvider se conecta a un nodo simulado y es útil para entornos de desarrollo rápidos._

Ese nodo simulado se llama [eth-tester](https://github.com/ethereum/eth-tester) y lo instalamos como parte del comando `pip install web3[tester]`. Configurar Web3.py para usar este proveedor de pruebas es tan simple como:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

¡Ahora estás listo para surfear la cadena! Eso no es algo que la gente diga. Me lo acabo de inventar. Hagamos un recorrido rápido.

## El recorrido rápido {#the-quick-tour}

Lo primero es lo primero, una verificación rápida:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Dado que estamos utilizando el proveedor de pruebas, esta no es una prueba muy valiosa, pero si falla, lo más probable es que hayas escrito algo mal al instanciar la variable `w3`. Verifica que hayas incluido los paréntesis internos, es decir, `Web3.EthereumTesterProvider()`.

## Parada del recorrido n.º 1: [cuentas](/developers/docs/accounts/) {#tour-stop-1-accounts}

Para mayor comodidad, el proveedor de pruebas creó algunas cuentas y las precargó con ether de prueba.

Primero, veamos una lista de esas cuentas:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Si ejecutas este comando, deberías ver una lista de diez cadenas que comienzan con `0x`. Cada una es una **dirección pública** y es, en cierto modo, análoga al número de cuenta de una cuenta corriente. Proporcionarías esta dirección a alguien que quisiera enviarte ether.

Como se mencionó, el proveedor de pruebas ha precargado cada una de estas cuentas con algo de ether de prueba. Averigüemos cuánto hay en la primera cuenta:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

¡Eso es un montón de ceros! Antes de que te vayas riendo hasta el banco falso, recuerda esa lección sobre las denominaciones de moneda de antes. Los valores de ether se representan en la denominación más pequeña, Wei. Convierte eso a ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Un millón de ether de prueba: todavía no está nada mal.

## Parada del recorrido n.º 2: datos del bloque {#tour-stop-2-block-data}

Echemos un vistazo al estado de esta cadena de bloques simulada:

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

Se devuelve mucha información sobre un bloque, pero solo hay un par de cosas que señalar aquí:

- El número de bloque es cero, sin importar cuánto tiempo hace que configuraste el proveedor de pruebas. A diferencia de la red Ethereum real, que agrega un nuevo bloque cada 12 segundos, esta simulación esperará hasta que le des algo de trabajo que hacer.
- `transactions` es una lista vacía, por la misma razón: aún no hemos hecho nada. Este primer bloque es un **bloque vacío**, solo para iniciar la cadena.
- Observa que el `parentHash` es solo un montón de bytes vacíos. Esto significa que es el primer bloque de la cadena, también conocido como el **bloque génesis**.

## Parada del recorrido n.º 3: [transacciones](/developers/docs/transactions/) {#tour-stop-3-transactions}

Estamos atascados en el bloque cero hasta que haya una transacción pendiente, así que démosle una. Envía unos cuantos ether de prueba de una cuenta a otra:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Este es típicamente el punto en el que esperarías varios segundos para que tu transacción se incluya en un nuevo bloque. El proceso completo es algo así:

1. Envía una transacción y conserva el hash de transacción. Hasta que se cree y transmita el bloque que contiene la transacción, la transacción está "pendiente".
   `tx_hash = w3.eth.send_transaction({ … })`
2. Espera a que la transacción se incluya en un bloque:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Continúa con la lógica de la aplicación. Para ver la transacción exitosa:
   `w3.eth.get_transaction(tx_hash)`

Nuestro entorno simulado agregará la transacción en un nuevo bloque al instante, por lo que podemos ver la transacción de inmediato:

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

Verás algunos detalles familiares aquí: los campos `from`, `to` y `value` deben coincidir con las entradas de nuestra llamada `send_transaction`. El otro detalle tranquilizador es que esta transacción se incluyó como la primera transacción (`'transactionIndex': 0`) dentro del bloque número 1.

También podemos verificar fácilmente el éxito de esta transacción comprobando los saldos de las dos cuentas involucradas. Tres ether deberían haberse movido de una a otra.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

¡El último se ve bien! El saldo pasó de 1,000,000 a 1,000,003 ether. ¿Pero qué pasó con la primera cuenta? Parece haber perdido un poco más de tres ether. Por desgracia, nada en la vida es gratis, y usar la red pública de Ethereum requiere que compenses a tus pares por su papel de apoyo. Se dedujo una pequeña tarifa de transacción de la cuenta que envió la transacción: esta tarifa es la cantidad de gas quemado (21000 unidades de gas para una transferencia de ETH) multiplicada por una tarifa base que varía según la actividad de la red más una tarifa de prioridad que va al validador que incluye la transacción en un bloque.

Más sobre el [gas](/developers/docs/gas/#post-london)

<FeaturedText>Nota: En la red pública, las tarifas de transacción son variables según la demanda de la red y la rapidez con la que deseas que se procese una transacción. Si estás interesado en un desglose de cómo se calculan las tarifas, consulta mi publicación anterior sobre <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">cómo se incluyen las transacciones en un bloque</a>.</FeaturedText>

## Y respira {#and-breathe}

Llevamos un rato en esto, así que este parece un lugar tan bueno como cualquier otro para tomar un descanso. La madriguera del conejo continúa, y seguiremos explorando en la segunda parte de esta serie. Algunos conceptos por venir: conectarse a un nodo real, contratos inteligentes y tokens. ¿Tienes preguntas de seguimiento? ¡Házmelo saber! Tus comentarios influirán en hacia dónde vamos a partir de aquí. Las solicitudes son bienvenidas a través de [Twitter](https://twitter.com/wolovim).