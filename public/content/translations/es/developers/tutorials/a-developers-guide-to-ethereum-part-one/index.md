---
title: "Introducción a Ethereum para desarrolladores de Python, parte 1"
description: "Una introducción al desarrollo de Ethereum, especialmente útil para quienes tienen conocimientos del lenguaje de programación Python"
author: Marc Garreau
lang: es
tags: [ "python", "web3.py" ]
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Entonces, ¿ha oído hablar sobre Ethereum y está listo para adentrarse en la madriguera del conejo? En esta publicación se tratarán rápidamente algunos conceptos básicos de la cadena de bloques y, después, podrá interactuar con un nodo de Ethereum simulado: leerá datos de bloques, comprobará saldos de cuentas y enviará transacciones. En el proceso, destacaremos las diferencias entre las formas tradicionales de crear aplicaciones y este nuevo paradigma descentralizado.

## Requisitos (no estrictos) {#soft-prerequisites}

Esta publicación aspira a ser accesible para una amplia gama de desarrolladores. Las [herramientas de Python](/developers/docs/programming-languages/python/) estarán involucradas, pero solo son un vehículo para las ideas; no hay problema si usted no es un desarrollador de Python. Sin embargo, haré algunas suposiciones sobre lo que ya sabe, para que podamos pasar rápidamente a los bits específicos de Ethereum.

Suposiciones:

- Sabe cómo moverse en una terminal,
- Ha escrito algunas líneas de código de Python,
- La versión 3.6 de Python o superior está instalada en su máquina (se recomienda encarecidamente el uso de un [entorno virtual](https://realpython.com/effective-python-environment/#virtual-environments)), y
- ha usado `pip`, el instalador de paquetes de Python.
  Una vez más, si alguno de estos puntos no es cierto, o si no planea reproducir el código de este artículo, es probable que pueda seguirlo sin problemas.

## Cadenas de bloques, en resumen {#blockchains-briefly}

Hay muchas maneras de describir Ethereum, pero en su esencia es una cadena de bloques. Las cadenas de bloques se componen de una serie de bloques, así que empecemos por ahí. En los términos más sencillos, cada bloque en la cadena de bloques de Ethereum es solo una serie de metadatos y una lista de transacciones. En formato JSON, tiene un aspecto similar a este:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Cada [bloque](/developers/docs/blocks/) tiene una referencia al bloque que lo precede; el `parentHash` es simplemente el hash del bloque anterior.

<FeaturedText>Nota: Ethereum hace un uso regular de las <a href="https://wikipedia.org/wiki/Hash_function">funciones hash</a> para producir valores de tamaño fijo («hashes»). Los hashes desempeñan un papel importante en Ethereum, pero por ahora puede considerarlos como identificadores únicos.</FeaturedText>

![Un diagrama que representa una cadena de bloques, incluidos los datos dentro de cada bloque](./blockchain-diagram.png)

_Una cadena de bloques es esencialmente una lista enlazada; cada bloque hace referencia al bloque anterior._

Esta estructura de datos no es nada novedosa, pero las reglas (es decir, los protocolos entre pares) que gobiernan la red sí lo son. No hay una autoridad central; la red de pares debe colaborar para sostener la red y competir para decidir qué transacciones incluir en el siguiente bloque. Entonces, cuando quiera enviar algo de dinero a un amigo, tendrá que transmitir esa transacción a la red y luego esperar a que se incluya en un bloque futuro.

La única forma de que la cadena de bloques verifique que el dinero se envió realmente de un usuario a otro es usar una moneda nativa de esa cadena de bloques (es decir, creada y gobernada por ella). En Ethereum, esta moneda se llama ether y la cadena de bloques de Ethereum contiene el único registro oficial de los saldos de las cuentas.

## Un nuevo paradigma {#a-new-paradigm}

Esta nueva pila de tecnología descentralizada ha generado nuevas herramientas para desarrolladores. Existen herramientas de este tipo en muchos lenguajes de programación, pero las veremos a través de la lente de Python. Para reiterar: aunque Python no sea su lenguaje de elección, no debería tener muchos problemas para seguir la explicación.

Los desarrolladores de Python que quieren interactuar con Ethereum probablemente recurran a [Web3.py](https://web3py.readthedocs.io/). Web3.py es una biblioteca que simplifica enormemente la forma en que puede conectarse a un nodo de Ethereum, para luego enviar y recibir datos de él.

<FeaturedText>Nota: «nodo de Ethereum» y «cliente de Ethereum» se usan indistintamente. En cualquier caso, se refiere al software que ejecuta un participante en la red de Ethereum. Este software puede leer datos de bloques, recibir actualizaciones cuando se añaden nuevos bloques a la cadena, transmitir nuevas transacciones y mucho más. Técnicamente, el cliente es el software y el nodo es la computadora que ejecuta el software.</FeaturedText>

Los [clientes de Ethereum](/developers/docs/nodes-and-clients/) pueden configurarse para ser accesibles mediante [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP o Websockets, por lo que Web3.py deberá reflejar esta configuración. Web3.py se refiere a estas opciones de conexión como **proveedores**. Tendrá que elegir uno de los tres proveedores para vincular la instancia de Web3.py a su nodo.

![Un diagrama que muestra cómo web3.py utiliza IPC para conectar su aplicación a un nodo de Ethereum](./web3py-and-nodes.png)

_Configure el nodo de Ethereum y Web3.py para que se comuniquen a través del mismo protocolo, por ejemplo, IPC en este diagrama._

Una vez que Web3.py esté configurado correctamente, puede comenzar a interactuar con la cadena de bloques. Aquí tiene un par de ejemplos de uso de Web3.py como anticipo de lo que está por venir:

```python
# leer datos del bloque:
w3.eth.get_block('latest')

# enviar una transacción:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Instalación {#installation}

En esta guía, trabajaremos únicamente con un intérprete de Python. No crearemos ningún directorio, archivo, clase o función.

<FeaturedText>Nota: En los ejemplos siguientes, los comandos que comienzan con `$` deben ejecutarse en la terminal. (No escriba el `$`, solo significa el inicio de la línea)</FeaturedText>

Primero, instale [IPython](https://ipython.org/) para tener un entorno amigable en el que explorar. IPython ofrece la función de autocompletar con la tecla de tabulación, entre otras características, lo que hace que sea mucho más fácil ver lo que es posible hacer con Web3.py.

```bash
pip install ipython
```

Web3.py se publica con el nombre `web3`. Instálelo de la siguiente manera:

```bash
pip install web3
```

Una cosa más: más adelante vamos a simular una cadena de bloques, lo que requiere un par de dependencias más. Puede instalarlas a través de:

```bash
pip install 'web3[tester]'
```

¡Ya está todo listo para empezar!

Nota: El paquete `web3[tester]` funciona hasta Python 3.10.xx

## Iniciar un entorno de pruebas {#spin-up-a-sandbox}

Abra un nuevo entorno de Python ejecutando `ipython` en su terminal. Esto es comparable a ejecutar `python`, pero viene con muchas más funciones.

```bash
ipython
```

Esto imprimirá alguna información sobre las versiones de Python e IPython que está ejecutando, y luego debería ver un indicador esperando una entrada:

```python
In [1]:
```

Ahora está viendo un shell interactivo de Python. Básicamente, es un entorno de pruebas para experimentar. Si ha llegado hasta aquí, es hora de importar Web3.py:

```python
In [1]: from web3 import Web3
```

## Presentación del módulo Web3 {#introducing-the-web3-module}

Además de ser una puerta de enlace a Ethereum, el módulo [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) ofrece algunas funciones de utilidad. Exploremos un par de ellas.

En una aplicación de Ethereum, comúnmente necesitará convertir denominaciones de moneda. El módulo Web3 proporciona un par de métodos de ayuda para esto: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) y [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Nota: Las computadoras son notoriamente malas manejando matemática decimal. Para evitar esto, los desarrolladores suelen almacenar las cantidades en dólares en céntimos. Por ejemplo, un artículo con un precio de 5,99 $ puede almacenarse en la base de datos como 599.

Se utiliza un patrón similar al manejar transacciones en <b>ether</b>. Sin embargo, en lugar de dos decimales, ¡el ether tiene 18! La denominación más pequeña de ether se llama <b>wei</b>, así que ese es el valor que se especifica al enviar transacciones.

1 ether = 1000000000000000000 wei

1 wei = 0,000000000000000001 ether

</FeaturedText>

Pruebe a convertir algunos valores a y desde wei. Tenga en cuenta que [existen nombres para muchas de las denominaciones](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) entre ether y wei. Una de las más conocidas es el **gwei**, ya que suele ser la forma en que se representan las comisiones de las transacciones.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Otros métodos de utilidad del módulo Web3 incluyen convertidores de formato de datos (p. ej., [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), funciones de ayuda para direcciones (p. ej., [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) y funciones de hash (p. ej., [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Muchos de ellos se tratarán más adelante en la serie. Para ver todos los métodos y propiedades disponibles, utilice la función de autocompletado de IPython escribiendo `Web3`. y pulsando la tecla de tabulación dos veces después del punto.

## Hablar con la cadena {#talk-to-the-chain}

Los métodos de utilidad son estupendos, pero pasemos a la cadena de bloques. El siguiente paso es configurar Web3.py para que se comunique con un nodo de Ethereum. Aquí tenemos la opción de usar los proveedores de IPC, HTTP o Websocket.

No seguiremos este camino, pero un ejemplo de un flujo de trabajo completo usando el proveedor HTTP podría ser algo como esto:

- Descargar un nodo de Ethereum, p. ej., [Geth](https://geth.ethereum.org/).
- Inicie Geth en una ventana de la terminal y espere a que se sincronice con la red. El puerto HTTP por defecto es `8545`, pero es configurable.
- Indique a Web3.py que se conecte al nodo a través de HTTP, en `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Use la instancia `w3` para interactuar con el nodo.

Aunque esta es una forma «real» de hacerlo, el proceso de sincronización tarda horas y es innecesario si solo quiere un entorno de desarrollo. Web3.py expone un cuarto proveedor para este propósito, el **EthereumTesterProvider**. Este proveedor de prueba se enlaza a un nodo de Ethereum simulado con permisos relajados y moneda falsa para jugar.

![Un diagrama que muestra el EthereumTesterProvider enlazando su aplicación de web3.py a un nodo de Ethereum simulado](./ethereumtesterprovider.png)

_El EthereumTesterProvider se conecta a un nodo simulado y es útil para entornos de desarrollo rápidos._

Ese nodo simulado se llama [eth-tester](https://github.com/ethereum/eth-tester) y lo instalamos como parte del comando `pip install web3[tester]`. Configurar Web3.py para usar este proveedor de prueba es tan simple como:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

¡Ahora está listo para surfear por la cadena! Eso no es algo que la gente diga. Me lo acabo de inventar. Hagamos un recorrido rápido.

## El recorrido rápido {#the-quick-tour}

Primero lo primero, una comprobación de estado:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Como estamos usando el proveedor de prueba, esta no es una prueba muy valiosa, pero si falla, es probable que haya escrito algo mal al instanciar la variable `w3`. Vuelva a comprobar que ha incluido los paréntesis internos, es decir, `Web3.EthereumTesterProvider()`.

## Parada del recorrido n.º 1: [cuentas](/developers/docs/accounts/) {#tour-stop-1-accounts}

Para mayor comodidad, el proveedor de prueba creó algunas cuentas y las precargó con ether de prueba.

Primero, veamos una lista de esas cuentas:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Si ejecuta este comando, debería ver una lista de diez cadenas que comienzan con `0x`. Cada una es una **dirección pública** y es, en cierto modo, análoga al número de una cuenta corriente. Proporcionaría esta dirección a alguien que quisiera enviarle ether.

Como se mencionó, el proveedor de prueba ha precargado cada una de estas cuentas con algo de ether de prueba. Averigüemos cuánto hay en la primera cuenta:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

¡Son muchos ceros! Antes de que se vaya riendo camino al banco falso, recuerde la lección anterior sobre las denominaciones de la moneda. Los valores de ether se representan en la denominación más pequeña, el wei. Convierta eso a ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Un millón de ether de prueba, nada mal.

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

- El número de bloque es cero, sin importar hace cuánto tiempo configuró el proveedor de prueba. A diferencia de la red real de Ethereum, que añade un nuevo bloque cada 12 segundos aproximadamente, esta simulación esperará hasta que le dé algo de trabajo que hacer.
- `transactions` es una lista vacía, por la misma razón: todavía no hemos hecho nada. Este primer bloque es un **bloque vacío**, solo para iniciar la cadena.
- Observe que el `parentHash` es solo un montón de bytes vacíos. Esto significa que es el primer bloque de la cadena, también conocido como el **bloque génesis**.

## Parada del recorrido n.º 3: [transacciones](/developers/docs/transactions/) {#tour-stop-3-transactions}

Estamos atascados en el bloque cero hasta que haya una transacción pendiente, así que vamos a crear una. Envíe unos cuantos ether de prueba de una cuenta a otra:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Este es normalmente el punto en el que esperaría varios segundos para que su transacción se incluya en un nuevo bloque. El proceso completo es algo así:

1. Envíe una transacción y guarde el hash de la transacción. Hasta que el bloque que contiene la transacción se crea y se difunde, la transacción está «pendiente».
   `tx_hash = w3.eth.send_transaction({ … })`
2. Espere a que la transacción se incluya en un bloque:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Continúe con la lógica de la aplicación. Para ver la transacción exitosa:
   `w3.eth.get_transaction(tx_hash)`

Nuestro entorno simulado añadirá la transacción a un nuevo bloque al instante, por lo que podemos ver la transacción inmediatamente:

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

Verá algunos detalles familiares aquí: los campos `from`, `to` y `value` deberían coincidir con las entradas de nuestra llamada a `send_transaction`. El otro dato tranquilizador es que esta transacción fue incluida como la primera transacción (`'transactionIndex': 0`) en el bloque número 1.

También podemos verificar fácilmente el éxito de esta transacción comprobando los saldos de las dos cuentas involucradas. Tres ether deberían haberse movido de una a otra.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

¡El último se ve bien! El saldo pasó de 1 000 000 a 1 000 003 de ether. ¿Pero qué pasó con la primera cuenta? Parece haber perdido un poco más de tres ether. Por desgracia, nada en la vida es gratis, y usar la red pública de Ethereum requiere que compense a sus pares por su papel de apoyo. Se dedujo una pequeña comisión por transacción de la cuenta que la envió; esta comisión es la cantidad de gas quemado (21 000 unidades de gas para una transferencia de ETH) multiplicada por una tarifa base que varía según la actividad de la red más una propina que va para el validador que incluye la transacción en un bloque.

Más sobre el [gas](/developers/docs/gas/#post-london)

<FeaturedText>Nota: En la red pública, las comisiones por transacción son variables y se basan en la demanda de la red y en la rapidez con la que desee que se procese una transacción. Si está interesado en un desglose de cómo se calculan las comisiones, consulte mi publicación anterior sobre <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">cómo se incluyen las transacciones en un bloque</a>.</FeaturedText>

## Y respire {#and-breathe}

Llevamos un rato con esto, así que este parece un buen lugar para tomar un descanso. La madriguera del conejo continúa, y seguiremos explorando en la segunda parte de esta serie. Algunos conceptos que están por venir: conexión a un nodo real, contratos inteligentes y tokens. ¿Tiene más preguntas? ¡Hágamelo saber! Sus comentarios influirán en la dirección que tomemos a partir de ahora. Las peticiones son bienvenidas a través de [Twitter](https://twitter.com/wolovim).
