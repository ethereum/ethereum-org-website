---
title: Glosario de Ethereum
description: Un glosario incompleto de términos técnicos y no técnicos relacionados con Ethereum
lang: es
sidebarDepth: 2
---

# Glosario {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### Ataque del 51 % {#51-attack}

Un tipo de ataque a una [red](#network) descentralizada donde un grupo obtiene el control de la mayoría de los [nodos](#node). Esto les permitiría defraudar a la cadena de bloques al revertir [transacciones](#transaction) y gastar el doble de [ether](#ether) y otras fichas criptográficas.

## A {#section-a}

### cuenta {#account}

Un objeto que contiene una [dirección](#address), balance, [nonce](#nonce) y, opcionalmente, un código fuente y almacenamiento. Una cuenta puede ser una [cuenta de contrato](#contract-account) o una [cuenta de propiedad externa (EOA)](#eoa).

<DocLink to="/developers/docs/accounts">
  Cuentas de Ethereum
</DocLink>

### dirección {#address}

Generalmente, representa una [EOA](#eoa) o un [contrato](#contract-accouint) que puede recibir (cuenta destino) o enviar (dirección original) [transacciones](#transaction) en la cadena de bloques. En concreto, son 160 bits del [Keccak hash](#keccak-256) de una [clave pública](#ecdsa) [ECDSA](#public-key).

### interfaz binaria de la aplicación (ABI) {#abi}

La forma estándar de interactuar con [contratos](#contract-account) en el ecosistema Ethereum, tanto desde fuera de la cadena de bloques como para las interacciones entre contratos.

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### interfaz de programación de aplicaciones {#api}

Una Interfaz de Programación de Aplicaciones (API) es un conjunto de definiciones acerca de cómo utilizar un software. Una API se encuentra entre una aplicación y un servidor web, y facilita la transferencia de datos entre ellos.

### assert {#assert}

En [Solidity](#solidity), `assert(false)` se compila en `0xfe`, un código de operación no válido, que agota todo el [gas](#gas) restante y revierte todos los cambios. Cuando un enunciado `assert()` falla, es síntoma de que algo va mal de forma inesperada y tendrá que arreglar su código. Debería usar `assert()` para evitar condiciones que nunca, nunca deberían ocurrir.

<DocLink to="/developers/docs/smart-contracts/security/">
  Seguridad en contratos inteligentes
</DocLink>

### certificación {#attestation}

Un validador vota por una [cadena de baliza](#beacon-chain) o [bloque](#shard) [de fragmento](#block). Los validadores deben certificar los bloques, señalando que están de acuerdo con el estado propuesto por el bloque.

<Divider />

## B {#section-b}

### Comisión base {#base-fee}

Cada [bloque](#block) tiene un precio conocido como «comisión base». Es la comisión mínima de [gas](#gas) que un usuario debe pagar para incluir la transacción en el siguiente bloque.

<DocLink to="/developers/docs/gas/">
  Gas y tarifas
</DocLink>

### Cadena de baliza {#beacon-chain}

Una actualización de la red que introduce una nueva capa de consenso, la cual se convertirá en coordinador de toda la red de Ethereum. Introduce [pruebas de participación](#pos) y [validadores](#validator) en Ethereum. Eventualmente se fusionará con la [red principal](#mainnet).

<DocLink to="/upgrades/beacon-chain/">
  Cadena de baliza
</DocLink>

### grande-endiano {#big-endian}

Una representación de números de posición donde el dígito más significativo es el primero en la memoria. Lo contrario de pequeño-endiano, donde el dígito menos significativo es el primero.

### bloque {#block}

Una colección de información requerida (un encabezado de bloque) acerca de las [transacciones](#transaction) comprendidas, y un conjunto de otros encabezados de bloque conocidos como [ommers](#ommer). Los [mineros](#miner) añaden los bloques a la red de Ethereum.

<DocLink to="/developers/docs/blocks/">
  Bloques
</DocLink>

### cadena de bloques {#blockchain}

En Ethereum, una secuencia de [bloques](#block) validados por el sistema de [prueba de trabajo](#pow), cada uno de los cuales se vincula con su predecesor hasta llegar al [bloque génesis](#genesis-block). No hay límite en el tamaño del bloque; en su lugar, utiliza [límites de gas](#gas-limit) variables.

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  ¿Qué es una cadena de bloques?
</DocLink>

### código de bytes {#bytecode}

Un conjunto abstracto de instrucciones diseñado para una ejecución eficiente por parte de un intérprete de software o una máquina virtual. A diferencia del código fuente legible por humanos, el código de bytes se expresa en formato numérico.

### Bifurcación de Bizancio {#byzantium-fork}

La primera de dos [bifurcaciones duras de código](#hard-fork) para la etapa de desarrollo [Metropolis](#metropolis). Incluyó EIP-649 con el retraso de la [bomba de dificultad](#difficulty-bomb) Metropolis y la reducción de recompensa de bloques, donde la [Era de hielo](#ice-age) se retrasó 1 año y la recompensa del bloque se redujo de 5 a 3 ether.

<Divider />

## C {#section-c}

### punto de control {#checkpoint}

La cadena de baliza[](#beacon-chain) tiene un tempo dividido en ranuras (12 segundos) y épocas (32 ranuras). La primera ranura de cada época es un punto de control. Cuando una [mayoría absoluta](#supermajority) de los validadores atestigua el vínculo entre dos puntos de control, pueden ser [justificados](#justification) y luego cuando otro puesto de control esté justificado en la parte superior, pueden estar [finalizados](#finality).

### compilación {#compiling}

Convierte el código escrito en un lenguaje de programación de alto nivel (por ejemplo, [Solidity](#solidity)) en un lenguaje de menor nivel (por ejemplo, bytecode de la [EVM](#bytecode)).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Compilación de contratos inteligentes
</DocLink>

### comité {#committee}

Un grupo de al menos 128 [validadores](#validator) asignados para revisar bloques y fragmentos al azar por [la cadena de baliza](#beacon-chain).

### consenso {#consensus}

Cuando numerosos nodos (normalmente la mayoría de los nodos en la red) tienen los mismos bloques en su mejor cadena de bloques validada localmente. No se debe confundir con [reglas de consenso](#consensus-rules).

### cliente de consenso {#consensus-client}

Los clientes de consenso (como Prysm, Teku, Nimbus, Lighthouse, Lodestar) ejecutan el algoritmo de consenso [prueba de participación](#pos) de Ethereum permitiendo a la red alcanzar un acuerdo sobre la jefatura o cabeza de la cadena de bloques. Los clientes de consenso no participan en la validación/retransmisión de transacciones ni en ejecutan transiciones de estado. Esto se realiza mediante [clientes de ejecución](#execution-client).

### capa de consenso {#consensus-layer}

La capa de consenso de Ethereum es la red de [clientes de consenso](#consensus-client).

### reglas de consenso {#consensus-rules}

Reglas de validación de bloques que siguen los nodos completos para permanecer en consenso con otros nodos. No confundir con [consenso](#consensus).

### Bifurcación de Constantinopla {#constantinople-fork}

Segunda parte de la etapa [Metrópolis](#metropolis), prevista inicialmente para mediados de 2018. Se espera que incluya el cambio a un algoritmo de consenso híbrido de [prueba de trabajo](#pow)/[prueba de participación](#pos), entre otros cambios.

### cuenta de contrato {#contract-account}

Cuenta que contiene un código que se ejecuta cada vez que recibe una [transacción](#transaction) de otra [cuenta](#account) ([EOA](#eoa) o [contrato](#contract-account)).

### transacción de creación de contrato {#contract-creation-transaction}

Una [transacción](#transaction) especial, con la [dirección cero](#zero-address) como destinatario, se utiliza para registrar un [contrato](#contract-account) e introducirlo en la cadena de bloques de Ethereum.

### enlace cruzado {#crosslink}

El enlace cruzado proporciona un resumen del estado de un fragmento. Muestra como [las cadenas fragmentadas](#shard) se comunicarán unas con otras a través de la [cadena de baliza](#beacon-chain)en el sistema de [prueba de participación fragmentada](#proof-of-stake).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Prueba de participación
</DocLink>

<Divider />

## D {#section-d}

### Organización Autónoma Descentralizada (DAO) {#dao}

Una empresa u otra organización que funciona sin gestión jerárquica. DAO también puede referirse a un contrato llamado «The DAO» lanzado el 30 de abril de 2016, que luego fue hackeado en junio de 2016; esto finalmente motivó una [fuerte bifurcación](#hard-fork) (con nombre de código DAO) en el bloque 1.192.000, que revirtió el contrato DAO hackeado y provocó que Ethereum y Ethereum Classic se dividieran en dos sistemas competidores.

<DocLink to="/dao/">
  Organizaciones Autónomas Descentralizadas (DAO)
</DocLink>

### Dapp {#dapp}

Aplicación descentralizada. Como mínimo, es un [contrato inteligente](#smart-contract) y una interfaz de usuario web. En líneas generales, una Dapp es una aplicación web que se construye sobre servicios de infraestructura abiertos, descentralizados y entre pares. Además, muchas Dapps incluyen almacenamiento descentralizado y/o un protocolo y una plataforma de mensajes.

<DocLink to="/developers/docs/dapps/">
  Introducción a Dapps
</DocLink>

### intercambio descentralizado (DEX) {#dex}

Un tipo de [dapp](#dapp) que le permite intercambiar tókenes con pares en la red. Necesita [ether](#ether) para usar uno (para pagar [tasas de transacción](#transaction-fee)), pero no están sujetos a restricciones geográficas como los intercambios centralizados; cualquiera puede participar.

<DocLink to="/get-eth/#dex">
  Intercambios descentralizados
</DocLink>

### deed {#deed}

Ver [Tókenes no fungibles (NFT)](#nft)

### DeFi {#defi}

Abreviatura de «finanzas descentralizadas», una amplia categoría de [dApps](#dapp) que tiene como objetivo proporcionar servicios financieros respaldados por la cadena de bloques, sin intermediarios, para que cualquier persona con una conexión a Internet pueda participar.

<DocLink to="/defi/">
  Finanzas descentralizadas (DeFi)
</DocLink>

### dificultad {#difficulty}

Un ajuste a medida de la red que controla la cantidad de cálculos necesarios para producir una [prueba de trabajo](#pow).

### bomba de dificultad {#difficulty-bomb}

Aumento exponencial planificado en la [dificultad](#pow) de la [prueba de trabajo](#difficulty), diseñado para motivar la transición a la [prueba de participación](#pos), reduciendo los cambios de una [bifurcación](#hard-fork)

### firma digital {#digital-signatures}

Una cadena corta de datos que un usuario produce para un documento utilizando una [clave privada](#private-key) de manera que cualquiera con la correspondiente [clave pública](#public-key), la firma y el documento pueda verificar que (1) el documento está «firmado» por el propietario de esa clave privada en particular, y que (2) el documento no se ha modificado una vez firmado.

<Divider />

## E {#section-e}

### algoritmo de firma digital de curva elíptica (ECDSA) {#ecdsa}

Algoritmo criptográfico utilizado por Ethereum para garantizar que los fondos solo los pueden gastar sus propietarios. Es el método preferido para crear claves públicas y privadas. Relevante para la [generación de la dirección](#address) de la cuenta y la [verificación de la transacción](#transaction).

### época {#epoch}

Un periodo de 32 [ranuras](#slot) (6,4 minutos) en el sistema coordinado de [cadena de baliza](#beacon-chain). Los [comités](#committee) de[validadores](#validator) se mezclan cada época por razones de seguridad. Hay una oportunidad en cada época para que la cadena sea [finalizada](#finality).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Prueba de participación
</DocLink>

### Eth1 {#eth1}

«Eth1» es un término que se refiere a la red principal de Ethereum, la cadena de prueba de trabajo (PoW) existente. Este término ha sido desestimado a favor de la «capa de ejecución». [Más información más acerca de este cambio de nombre](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  Más sobre las actualizaciones de Ethereum
</DocLink>

### Eth2 {#eth2}

«Eth2» es un término que hace referencia a un conjunto de actualizaciones del protocolo de Ethereum, incluyendo la transición de Ethereum a prueba de participación. Desde entonces, este término ha quedado obsoleto a favor de la «capa de consenso». [Conozca más acerca de este cambio de nombre](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  Más sobre las actualizaciones de Ethereum
</DocLink>

### Propuestas de mejoras de Ethereum (EIP) {#eip}

Documento de diseño que proporciona información a la comunidad de Ethereum, describiendo una nueva característica propuesta o sus procesos o entorno (ver [ERC](#erc)).

<DocLink to="/eips/">
  Introducción a EIP
</DocLink>

### Servicio de nombres de Ethereum (ENS) {#ens}

El registro ENS es un único [contrato inteligente](#smart-contract) central que proporciona una asignación de nombres de dominio a propietarios y resolutores, como se describe en [EIP](#eip) 137.

[Más información en ens.domains](https://ens.domains)

### entropía {#entropy}

En el contexto de la criptografía, falta de previsibilidad o nivel de aleatoriedad. Cuando se genera información secreta, como las [claves privadas](#private-key), los algoritmos suelen basarse en una fuente de alta entropía para garantizar que la salida sea impredecible.

### cliente de ejecución {#execution-client}

Clientes de ejecución (antes conocidos como clientes «Eth1»), véase Besu, Erigon, go-ethereum, Nethermind, se encargan de procesar y transmitir transacciones, así como de gestionar el estado de Ethereum. Estos clientes ejecutan las computaciones para cada transacción en la [máquina virtual de Ethereum](#evm) para garantizar que se sigan las reglas del protocolo. A día de hoy, también manejan el consenso de [prueba de trabajo](#pow). Después de la transición a [prueba de participación (PoS)](#pos), delegarán esta labor en clientes de consenso.

### capa de ejecución {#execution-layer}

La capa de ejecución de Ethereum es la red de [clientes de ejecución](#execution-client).

### cuenta de propiedad externa (EOA) {#eoa}

Una [cuenta](#account) creada por o para usuarios humanos de la red de Ethereum.

### Solicitud de comentarios de Ethereum (ERC) {#erc}

Una etiqueta dada a algunos [EIP](#eip) que intentan definir un estándar específico de uso de Ethereum.

<DocLink to="/eips/">
  Introducción a EIP
</DocLink>

### Ethash {#ethash}

Algoritmo de [prueba de trabajo](#pow) para Ethereum 1.0.

[Más información en eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

Criptomoneda nativa utilizada por el ecosistema Ethereum, que cubre los costes del [gas](#gas) al ejecutar las transacciones. También escrito como ETH o su símbolo Ξ, el símbolo griego Xi en mayúscula.

<DocLink to="/eth/">
  Moneda para nuestro futuro digital
</DocLink>

### eventos {#events}

Permite el uso de las instalaciones de registro de la [EVM](#evm). Las [Dapps](#dapp) pueden recibir eventos y utilizarlos para activar las llamadas de retorno de JavaScript en la interfaz de usuario.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Eventos y registros
</DocLink>

### Máquina virtual de Ethereum (EVM) {#evm}

Una máquina virtual basada en la pila que ejecuta [bytecode](#bytecode). En Ethereum, el modelo de ejecución determina cómo se modifica el estado del sistema, dada una serie de instrucciones mediante bytecode y una pequeña tupla de datos del entorno. Esto se especifica a través de un modelo formal de una máquina virtual.

<DocLink to="/developers/docs/evm/">
  Máquina virtual de Ethereum
</DocLink>

### Lenguaje ensamblador EVM {#evm-assembly-language}

Una forma legible de [bytecode](#bytecode) de EVM.

<Divider />

## F {#section-f}

### función de reserva {#fallback-function}

Una función por defecto llamada en ausencia de datos o de un nombre de función declarado.

### faucet {#faucet}

Un servicio realizado a través de un [contrato inteligente](#smart-contract) que dispensa fondos en forma de éter gratuito de prueba que puede utilizarse en una red de prueba.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Faucets de redes de prueba
</DocLink>

### finalidad {#finality}

La finalidad es la garantía de que un conjunto de transacciones anteriores a un momento dado no cambiará y no podrá revertirse.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  Finalidad de la prueba de trabajo
</DocLink>
<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalidad de la prueba de participación
</DocLink>

### finney {#finney}

Una denominación de [ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### bifurcación {#fork}

Un cambio en el protocolo que provoca la creación de una cadena alternativa, o una divergencia temporal en dos posibles rutas de bloques durante la minería.

### algoritmo de elección de bifurcación {#fork-choice-algorithm}

El algoritmo utilizado para identificar la cadena de bloques en cabeza. En la capa de ejecución la cabeza de la cadena se identifica como la que tiene la mayor dificultad total detrás de ella. Esto significa que la verdadera cabeza de la cadena es la que ha requerido más trabajo para minarla. En la capa de consenso el algoritmo observa las certificaciones acumuladas de validadores ([LMD_GHOST](#lmd-ghost)).

### prueba de fraude {#fraud-proof}

Modelo de seguridad para ciertas soluciones de [capa 2](#layer-2) en las que, para aumentar la velocidad, las transacciones son [envueltas](#rollups) en lotes y enviadas a Ethereum en una única transacción. Se supone que son válidos, pero se pueden poner en tela de juicio si se sospecha el fraude. Una prueba de fraude ejecutará entonces la transacción para ver si se ha producido el fraude. Este método aumenta la cantidad de transacciones posibles manteniendo la seguridad. Algunos [rollups](#rollups) utilizan [pruebas de validez](#validity-proof).

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Optimistic rollups
</DocLink>

### frontera {#frontier}

Etapa inicial de desarrollo de prueba de Ethereum, que duró desde julio de 2015 hasta marzo de 2016.

<Divider />

## G {#section-g}

### gas {#gas}

Un combustible virtual utilizado en Ethereum para ejecutar contratos inteligentes. La [EVM](#evm) utiliza un mecanismo de contabilidad para medir el consumo de gas y limitar el consumo de recursos informáticos (ver [Turing completo](#turing-complete)).

<DocLink to="/developers/docs/gas/">
  Gas y tarifas
</DocLink>

### límite de gas {#gas-limit}

La cantidad máxima de [gas](#gas) que puede consumir una [transacción](#transaction) o un [bloque](#block).

### bloque inicial {#genesis-block}

El primer bloque de una [cadena de bloque](#blockchain), utilizado para inicializar una red concreta y su criptomoneda.

### geth {#geth}

Go Ethereum. Una de las implementaciones más destacadas del protocolo Ethereum, escrito en Go.

[Más información en geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Abreviatura de gigawei, una denominación de [ether](#ether), comúnmente utilizada para fijar el precio del [gas](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### bifurcación fuerte {#hard-fork}

Una diferencia permanente en la [cadena de bloque](#blockchain); también conocida como cambio de «hardforking». Una suele ocurrir cuando los nodos no actualizados no pueden validar los bloques creados por los nodos actualizados que siguen las nuevas [reglas de consenso](#consensus-rules). No debe confundirse con una bifurcación, una bifurcación suave, una bifurcación de software o una bifurcación Git.

### hash {#hash}

Una huella digital de longitud fija de una entrada de tamaño variable, producida por una función hash. (Ver [keccak-256](#keccak-256))

### Cartera HD {#hd-wallet}

Una [cartera](#wallet) que utiliza el protocolo de creación y transferencia de claves jerárquicas deterministas (HD).

[Más información en github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### Semilla de cartera HD {#hd-wallet-seed}

Un valor utilizado para generar la [clave privada](#private-key) maestra y el código de la cadena maestra para una [cartera](#wallet) HD. La semilla de cartera puede representarse mediante palabras mnemotécnicas, lo que permite a los humanos copiar, respaldar y restaurar las claves privadas con mayor facilidad.

### hacienda {#homestead}

La segunda etapa de desarrollo de Ethereum, lanzada en marzo de 2016 en el bloque 1.150.000.

<Divider />

## I {#section-i}

### índice {#index}

Una estructura de red destinada a optimizar la consulta de información de toda la [cadena de bloques](#blockchain) proporcionando una ruta eficiente a su fuente de almacenamiento.

### Protocolo de intercambio de direcciones de clientes (ICAP) {#icap}

Codificación de direcciones de Ethereum que es parcialmente compatible con la codificación del número de cuenta bancaria internacional (IBAN), ofreciendo una codificación polivalente, con suma de comprobación e interoperable para las direcciones de Ethereum. Las direcciones ICAP utilizan un nuevo código de pseudopaís IBAN: XE, que significa «eXtended Ethereum», tal como se utiliza en las monedas no jurisdiccionales (por ejemplo, XBT, XRP, XCP).

### Era de hielo {#ice-age}

Una [bifurcación fuerte](#hard-fork) de Ethereum en el bloque 200.000 para introducir un incremento exponencial de [dificultad](#difficulty) (también conocido como [bomba de dificultad](#difficulty-bomb)), motivando una transición a la[prueba de participación](#pos).

### entorno de desarrollo integrado (IDE) {#ide}

Una interfaz de usuario que normalmente combina un editor de código, compilador, tiempo de ejecución y depurador.

<DocLink to="/developers/docs/ides/">
  Entornos de desarrollo integrados
</DocLink>

### problema de código implementado inmutable {#immutable-deployed-code-problem}

Una vez que el código de un [contrato](#smart-contract) (o [biblioteca](#library)) se implementa, se vuelve inmutable. Las prácticas habituales de desarrollo de software se basan en la posibilidad de corregir posibles errores y añadir nuevas funciones, por lo que esto supone un reto para el desarrollo de contratos inteligentes.

<DocLink to="/developers/docs/smart-contracts/deploying/">
  Implementación de contratos inteligentes
</DocLink>

### transacción interna {#internal-transaction}

[Transacción](#transaction) enviada desde una [cuenta de contrato](#contract-account) a otra cuenta de contrato o a una [EOA](#eoa) (consulta [mensaje](#message)).

<Divider />

## K {#section-k}

### función de derivación de clave (KDF) {#kdf}

También conocido como «algoritmo de estiramiento de contraseñas», lo utilizan los formatos [keystore](#keystore-file) (o banco de llaves) para protegerse contra los ataques de fuerza bruta, de diccionario y de tabla de arcoíris en el cifrado de frases de contraseña, mediante el hashing repetido de la frase de contraseña.

<DocLink to="/developers/docs/smart-contracts/security/">
  Seguridad en contratos inteligentes
</DocLink>

### keccak-256 {#keccak-256}

Función criptográfica [hash](#hash) utilizada en Ethereum. Keccak-256 se ha normalizado como [SHA](#sha)-3.

### archivo de claves {#keystore-file}

Un archivo codificado en JSON que contiene una única [clave privada](#private-key) (generada aleatoriamente), cifrada por una frase de contraseña para mayor seguridad.

<Divider />

## L {#section-l}

### capa 2 {#layer-2}

Un área de desarrollo centrada en la superposición de capas sobre el protocolo de Ethereum. Estas mejoras están relacionadas con las velocidades de [transacción](#transaction), el abaratamiento de las [tarifas de transacción](#transaction-fee) y la privacidad de las transacciones.

<DocLink to="/developers/docs/scaling/#layer-2-scaling">
  Capa 2
</DocLink>

### NivelDB {#level-db}

Es un almacenamiento en disco de código abierto, livianamente implementado, biblioteca de propósito único con conexiones a diferentes plataformas.

### biblioteca {#library}

Un tipo especial de [contrato](#smart-contract) sin funciones pagaderas, sin función de reserva y sin almacenamiento de datos. Por lo tanto, no puede recibir ni guardar ether o almacenar datos. Una biblioteca sirve como un código implementado previamente al que puede acceder otro contrato para realizar funciones de computación de solo lectura.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Bibliotecas de contrato inteligente
</DocLink>

### cliente ligero {#lightweight-client}

Un cliente de Ethereum que no almacena una copia local de la [cadena de bloques](#blockchain), o bien valida bloques y [transacciones](#transaction). Ofrece las funciones de una [cartera](#wallet) y puede crear y transmitir transacciones.

<Divider />

### LMD_GHOST {#lmd-ghost}

El [algoritmo de opción de bifurcación](#fork-choice-algorithm) usado por los clientes de consenso de Ethereum para identificar la cabeza de la cadena. LMD-Ghost es un acrónimo que significa «último mensaje dirigido codicioso observado del subárbol», e indica que la cabeza de la cadena es el bloque con la mayor acumulación de [atestaciones](#attestation) en su historia.

## M {#section-m}

### Red principal {#mainnet}

Abreviatura de «red principal», esta es la principal [cadena de bloques](#blockchain) pública de Ethereum. ETH, valor real y consecuencias reales. También se conoce como la capa 1 cuando se habla sobre las soluciones de escalado de la [capa 2](#layer-2). (Consulte también la [red de pruebas](#testnet))

### Árbol de Merkle Patricia Trie {#merkle-patricia-tree}

Es una estructura de datos usada en Ethereum, orientada a la eficiencia para almacenar pares de claves.

### mensaje {#message}

Una [transacción interna](#internal-transaction) que nunca se serializa y solo se envía dentro de la [EVM](#evm).

### llamada de mensaje {#message-call}

El acto de transmitir un [mensaje](#message) de una cuenta a otra. Si la cuenta de destino está relacionada con el código de la [EVM](#evm), la VM se iniciará con el estado de este objeto y el mensaje en cuestión.

### Metropolis {#metropolis}

La tercera fase de desarrollo de Ethereum, que se lanzó en octubre de 2017.

### minero {#miner}

Es un [nodo](#node) de red que encuentra [pruebas de trabajo](#pow) válidas para bloques nuevos, mediante el hashing de pase repetido (ver [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Minería
</DocLink>

### Acuñar {#mint}

Acuñar (o mintear) es el proceso de crear nuevos tókenes y ponerlos en circulación para que puedan usarse. La creación de un nuevo token sin la participación de la autoridad central es un mecanismo descentralizado.

<Divider />

## N {#section-n}

### red {#network}

Si nos referimos a la red de Ethereum, se trata de una red de punto a punto que propaga transacciones y bloques a cada nodo de Ethereum (que participe en la red).

<DocLink to="/developers/docs/networks/">
  Redes
</DocLink>

### tókenes no fungibles (NFT) {#nft}

También conocido como «deed», se trata de un estándar de token presentado mediante la propuesta de ERC-721. Los NFT pueden ser rastreados y comercializados, pero cada token es único y distinto; no son intercambiables como ETH y [ los tókenes ERC-20](#token-standard). Los NFT pueden representar la propiedad de activos digitales o físicos.

<DocLink to="/nft/">
  Tokens No Fungibles (NFTs)
</DocLink>
<DocLink to="/developers/docs/standards/tokens/erc-721/">
  Estándar de token no fungible ERC-721
</DocLink>

### nodo {#node}

Un cliente de software que participa en la red.

<DocLink to="/developers/docs/nodes-and-clients/">
  Nodos y clientes
</DocLink>

### nonce {#nonce}

En criptografía, un valor que solo puede utilizarse una vez. En Ethereum se utilizan dos tipos de nonce: un nonce de cuenta es un contador de transacción en cada cuenta, que se utiliza para prevenir los ataques de repetición; un nonce de [prueba de trabajo](#pow) es el valor aleatorio de un bloque que se ha utilizado para satisfacer la [prueba de trabajo](#pow).

<Divider />

## O {#section-o}

### bloque ommer (tío) {#ommer}

Cuando un [minero](#miner) encuentra un [bloque](#block) válido, otro minero podría publicar un bloque rival, que se añade antes al extremo de la cadena de bloques. Esto es válido, pero el bloque obsoleto se puede incluir mediante bloques nuevos a modo de _ommers_ y recibir una recompensa parcial de bloque. El término «ommer» es el término de género neutral preferido para el hermano de un bloque padre, aunque algunas veces, se le denomina «tío».

### Optimistic Rollup {#optimistic-rollup}

Un [rollup](#rollups) de transacciones que usan [pruebas de fraude](#fraud-proof) para ofrecer transacciones incrementadas en rendimiento en la [capa 2](#layer-2) mientras usa la seguridad proporcionada por la [red principal](#mainnet) (capa 1). A diferencia de [Plasma](#plasma), una solución de capa 2 parecida, los Optimistic Rollups pueden gestionar tipos de transacciones más complejos; todos los que sean posibles en la [EVM](#evm). En comparación con los [Zero-knowledge Rollups](#zk-rollups), tienen problemas de latencia porque la transacción se puede desafiar mediante la prueba de fraude.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Optimistic Rollups
</DocLink>

### Oráculos {#oracle}

Un oráculo es un puente entre la [cadena de bloques](#blockchain) y el mundo real. Actúan como [API en cadena](#api) que se pueden consultar para obtener información y usarse en [ contratos inteligentes](#smart-contract).

<DocLink to="/developers/docs/oracles/">
  Oráculos
</DocLink>

<Divider />

## P {#section-p}

### paridad {#parity}

Una de las implementaciones interoperables más destacadas del software cliente de Ethereum.

### Plasma {#plasma}

Una solución de escala fuera de la cadena que usa [pruebas de fraude](#fraud-proof), como [Optimistic Rollups](#optimistic-rollups). Plasma se limita a transacciones simples como transferencias básicas de tókenes e intercambios.

<DocLink to="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### clave privada (clave secreta) {#private-key}

Un número secreto que permite a los usuarios de Ethereum probar la propiedad de una cuenta o contratos mediante la producción de una firma digital (consulte [clave pública](#public-key), [dirección](#address), [ECDSA](#ecdsa)).

### Prueba de participación (PoS) {#pos}

Un método mediante el que un protocolo de cadena de bloques de criptomonedas intenta lograr el [consenso](#consensus) distribuido. La PoS solicita a los usuarios que demuestren la propiedad de una cierta cantidad de criptomonedas (su «participación» en la red) para poder participar en la validación de las transacciones.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Prueba de participación
</DocLink>

### Prueba de trabajo (PoW, por sus siglas en inglés) {#pow}

Una cantidad de datos (la prueba) que precisa encontrar un cálculo significativo. En Ethereum, los [mineros](#miner) deben encontrar una solución numérica para el algoritmo [Ethash](#ethash) que cumpla con un objetivo de [dificultad](#difficulty) en toda la red.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  Prueba de trabajo
</DocLink>

### clave pública {#public-key}

Un número, derivado de una función de un solo sentido a partir de una [clave privada](#private-key), que se puede compartir públicamente y que cualquiera puede utilizar para verificar una firma digital hecha con la correspondiente clave privada.

<Divider />

## R {#section-r}

### recibo {#receipt}

Datos que devuelve un cliente de Ethereum para representar el resultado de una [transacción](#transaction) particular, que incluyen un [hash](#hash) de la transacción, su número de [bloque](#block), la cantidad de [gas](#gas) utilizado y, en caso de implementación de un [contrato inteligente](#smart-contract), la [dirección](#address) del contrato.

### ataque de reentrada {#re-entrancy-attack}

Un ataque que consiste en un contrato del atacante que solicita un contrato de víctima de modo que, durante la ejecución, la víctima vuelve a solicitar el contrato del atacante de manera recurrente. Las consecuencias de esta acción pueden ser, entre otras, el robo de fondos mediante la omisión de partes del contrato de la víctima que actualizan el saldo la información de las cantidades retiradas.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Reentrada
</DocLink>

### recompensa {#reward}

Una cantidad de ether incluida en cada nuevo bloque como recompensa que la red concede al [minero](#miner) que ha dado con la solución de la [prueba de trabajo](#pow).

### Recursive Length Prefix (RLP) {#rlp}

Un estándar de codificación diseñado por los desarrolladores de Ethereum para codificar y serializar objetos (estructuras de datos) de complejidad y longitud arbitrarias.

### rollups {#rollups}

Un tipo de solución de escala de [capa 2](#layer-2) que agrupa varias transacciones y las envía a la [cadena principal de Ethereum](#mainnet) mediante una única transacción. Esto permite disfrutar de reducciones en el coste del [gas](#gas) y, como consecuencia, aumentos en el caudal de [transacciones](#transaction). Existen Optimistic Rollups y Zero-knowledge Rollups que utilizan diferentes métodos de seguridad para ofrecer estos beneficios de escalabilidad.

<DocLink to="/developers/docs/scaling/#rollups">
  Rollups
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

El estado de desarrollo de Ethereum que inició una serie de actualizaciones de escalabilidad y sustentabilidad, antes conocida como «Ethereum 2.0», o «Eth2».

<DocLink to="/upgrades/">
  Actualizaciones de Ethereum
</DocLink>

### Algoritmo seguro de Hash (SHA) {#sha}

Una familia de funciones de hash criptográficas publicadas por el NIST (siglas del Instituto Norteamericano de Estándares y Tecnología).

### fragmento/cadena de fragmentos {#shard}

Una cadena de [prueba de participación](#pos) coordinada por la [cadena de baliza](#beacon-chain) y asegurada mediante los [validadores](#validator). Se añadirán 64 a la red como parte de la actualización de la cadena de fragmentos. Las cadenas compartidas ofrecerán un aumento de transacciones y mayor rendimiento para Ethereum, proporcionando datos adicionales a la [capa 2](#layer-2) en soluciones como [Optimistic Rollups](#optimistic-rollups) y [rollups-ZK](#zk-rollups).

<DocLink to="/upgrades/sharding">
  Cadenas de fragmentos
</DocLink>

### cadena lateral {#sidechain}

Una solución escalable que utiliza una cadena separada con diferentes o la mayoría de las veces [reglas de consenso](#reglas-de-consenso). Se necesita un puente para conectar estas cadenas laterales a la [red principal](#mainnet). Los[Rollups](#rollups)también usan cadenas laterales, pero trabajan en colaboración con la [red principal](#mainnet).

<DocLink to="/developers/docs/scaling/sidechains/">
  Cadenas laterales
</DocLink>

### singleton {#singleton}

Un término de programación informática que describe un objeto del que solamente puede existir una instancia única.

### ranura {#slot}

Un periodo de tiempo (12 segundos) en el que una nueva [cadena de baliza](#beacon-chain) y un nuevo bloque de cadena de [fragmentos](#shard) se pueden proponer mediante un [validador](#validator) en el sistema de [prueba de participación](#pos). Una ranura puede estar vacía. 32 ranuras componen una [época](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Prueba de participación
</DocLink>

### contrato inteligente {#smart-contract}

Un programa que se ejecuta en la infraestructura informática de Ethereum.

<DocLink to="/developers/docs/smart-contracts/">
  Introducción a los contratos inteligentes
</DocLink>

### SNARK (o argumento breve no interactivo de conocimiento) {#snark}

SNARK significa «Succinct Non-Interactive Argument of Knowledge» o (argumento breve no interactivo de conocimiento), el cual es una [prueba de conocimiento cero](#prueba-de-conocimiento-cero).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-knowledge Rollups
</DocLink>

### Solidity {#solidity}

Un lenguaje de programación (imperativo) procesal con sintaxis similar a JavaScript, C++ o Java. El lenguaje más popular y utilizado para los [contratos inteligentes](#smart-contract) de Ethereum. Creado por Dr. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity inline assembly {#solidity-inline-assembly}

Lenguaje ensamblador de la [EVM](#evm) en un programa [Solidity](#solidity). La compatibilidad de Solidity con el ensamblado en línea facilita la escritura de determinadas operaciones.

### Spurious Dragon {#spurious-dragon}

Una [bifurcación dura](#hard-fork) de la cadena de bloques de Ethereum, que se produjo en el bloque 2.675.000 para abordar más vectores de ataque de denegación de servicio y limpiar el estado (consulta [Tangerine Whistle](#tangerine-whistle)). Además, es un mecanismo de protección de ataque por repetición (consulte [nonce](#nonce)).

### monedas estables {#stablecoin}

Un [token ERC-20](#token-standard) con un valor vinculado al valor de otro activo. Hay monedas estables respaldadas por monedas fiduciaria como dólares, metales preciosos como el oro y otras criptomonedas como el Bitcoin.

<DocLink to="/eth/#tokens">
  ETH no es la única criptografía en Ethereum
</DocLink>

### staking {#staking}

Depositar una cantidad de [ether](#ether) (su participación) para convertirse en un validador y asegurar la [red](#network). Un validador comprueba las [transacciones](#transaction) y propone [bloques](#block) bajo un modelo de consenso de [prueba de participación](#pos). La apuesta le proporciona un incentivo económico para actuar en el mejor interés de la red. Obtendrá recompensas por llevar a cabo sus tareas como [validador](#validator), pero perderá cantidades diferentes de ETH si no las lleva a cabo.

<DocLink to="/staking/">
  Apueste sus ETH para convertirse en un validador de Ethereum
</DocLink>

### STARK (argumento de conocimiento transparente escalable) {#stark}

STARK significa «argumento de conocimiento transparente escalable», el cual es un tipo de [prueba cero de conocimiento](#prueba-cero-de-conocimiento).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-knowledge Rollups
</DocLink>

### canales de estado {#state-channels}

Una solución de [capa 2](#layer-2) en la que un canal está configurado entre los participantes y les permite realizar transacciones de manera libre y económica. Solo se envía una [transacción](#transaction) para configurar el canal y cerrar el canal la cual es enviada a la [red principal](#mainnet). Esto permite realizar transacciones muy elevadas, pero depende en gran nivel de si conocemos el número de participantes y el cierre de fondos por adelantado.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  Canales de estado
</DocLink>

### supermayoría {#supermajority}

Supermayoría es el término dado a la cantidad excedente de 2/3 (66 %) del total acumulado de ether en la [cadena de baliza](#cadena-baliza). Los bloques necesitan el voto de la supermayoría para [acabar](#finalizado) en la cadena de baliza.

### Comité de Sincronización {#sync-committee}

Un Comité de Sincronización es un grupo de [validadores](#validadores) seleccionado aleatoriamente en la [cadena de baliza](#Cadena-Baliza) que se actualiza cada ~27 horas. Su propósito es agregar sus firmas para validar los encabezados de los bloques. Los Comités de Sincronización permiten a los [clientes ligeros](#clientes-ligeros) mantener la trazabilidad en el encabezado de la cadena de bloques sin tener que acceder a todo el conjunto de validadores.

### szabo {#szabo}

Una denominación de [ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

Una [bifurcación dura](#hard-fork) de la cadena de bloques de Ethereum, que se produjo en el bloque 2.463.000 para cambiar el cálculo de [gas](#gas) para ciertas operaciones intensivas de E/S, así como para eliminar el estado acumulado de un ataque de denegación de servicio, que explotó el bajo coste de gas de esas operaciones.

### red de pruebas {#testnet}

Una red que se usa para simular el comportamiento de la red principal de Ethereum (lea sobre la [red principal](#mainnet)).

<DocLink to="/developers/docs/networks/#testnets">
  Redes de prueba
</DocLink>

### estándar de token {#token-standard}

Presentado mediante la propuesta de ERC-20, esto proporciona una estructura de [contrato inteligente](#smart-contract) estandarizada para tókenes fungibles. A diferencia de los [NFT](#nft), a los tókenes de un mismo contrato se les puede hacer un seguimiento, comercializarlos y son intercambiables entre sí.

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  Estándar de token ERC-20
</DocLink>

### transacción {#transaction}

Datos comprometidos con la cadena de bloques de Ethereum, firmados por una [cuenta](#account)originaria, con una [dirección](#address) específica. La transacción contiene metadatos como el [límite de gas](#gas-limit) para esa transacción.

<DocLink to="/developers/docs/transactions/">
  Transacciones
</DocLink>

### tarifa de transacción {#transaction-fee}

Una tarifa que debe pagar siempre que utilice la red de Ethereum. Los ejemplos incluyen el envío de fondos desde su [cartera](#wallet) o una interacción de [dapp](#dapp), como intercambiar tókenes o comprar un coleccionable. Se puede entender como un cargo por servicio. Esta tarifa cambiará según el nivel de actividad de la red. Esto sucede porque los [mineros](#miner), las personas responsables de procesar sus transacciones, suelen priorizar las transacciones con tarifas altas, de modo que la congestión contribuye a la subida de precios.

A nivel técnico, sus tarifas de transacción están relacionadas con la cantidad de [gas](#gas) que requiera su transacción.

La reducción de las tasas de transacción es un tema candente en este momento. Consulte [Capa 2](#layer-2)

### Turing completo {#turing-complete}

Un concepto que lleva el nombre del matemático y informático inglés Alan Turing. Se trata de un sistema de reglas de manipulación de datos (como el conjunto de instrucciones de una ordenador, un lenguaje de programación o un autómata celular). Se dice que un ítem es «Turing completo» o «de universalidad informática» si se puede utilizar para simular cualquier máquina Turing.

<Divider />

## V {#section-v}

### validador {#validator}

Un [nodo](#node) en un sistema de [prueba de participación](#pos) responsable de almacenar datos, procesar transacciones y agregar nuevos bloques a la cadena de bloques. Para activar el software validador, debe poder [participar](#staking) con 32 ETH.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Prueba de participación
</DocLink>
<DocLink to="/staking/">
  Participación en Ethereum
</DocLink>

### Prueba de validación {#validity-proof}

Modelo de seguridad para ciertas soluciones de [capa 2](#layer-2) en las que, para aumentar la velocidad, las transacciones se [agrupan](/#rollups) en lotes y se envían a Ethereum en una única transacción. El cálculo de la transacción se realiza fuera de la cadena y, a continuación, se suministra a la cadena principal con una prueba de su validez. Este método aumenta la cantidad de transacciones posibles manteniendo la seguridad. Algunos [rollups](#rollups) utilizan [pruebas de fraude](#fraud-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-knowledge Rollups
</DocLink>

### Validium {#validium}

Una solución fuera de la cadena que utiliza [pruebas de validación](#validity-proof) para mejorar el rendimiento de las transacciones. A diferencia de los [Zero-knowledge Rollups](#zk-rollup), los datos de Validium no se almacenan en la [red principal](#mainnet) de la capa 1.

<DocLink to="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Un lenguaje de programación de alto nivel con sintaxis de tipo Python. Se diseñó para acercarse a un lenguaje funcional puro. Creado por Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### cartera {#wallet}

Un software que contiene [claves privadas](#private-key). Se utiliza para acceder y controlar las cuentas de [Ethereum](#account) e interactuar con [contratos inteligentes](#smart-contract). No es necesario almacenar las claves en una cartera y, además, se pueden recuperar del almacenamiento sin conexión (es decir, con una tarjeta de memoria o un papel) para mejorar la seguridad. A pesar de su nombre, las carteras nunca almacenan las monedas o tókenes reales.

<DocLink to="/wallets/">
  Carteras de Ethereum
</DocLink>

### Web 3.0 {#web3}

La tercera versión de la web. Propuesta inicialmente por el Dr. Gavin Wood, Web3 representa una visión y un enfoque novedosos para aplicaciones web, desde aplicaciones de propiedad y gestión centralizadas hasta aplicaciones construidas en protocolos descentralizados (consulte [Dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Comparación entre web2 y web3
</DocLink>

### wei {#wei}

La denominación más pequeña de un [ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### dirección cero {#zero-address}

Una dirección especial de Ethereum, compuesta íntegramente por ceros, que se especifica como la dirección de destino de una [transacción de creación de contrato](#contract-creation-transaction).

### Prueba de conocimiento cero {#zk-proof}

Una prueba de conocimiento cero es un método criptográfico que permite a los individuos probar que un enunciado o declaración es real sin tener que transmitir información adicional.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-knowledge Rollups
</DocLink>

### Zero-knowledge Rollup {#zk-rollup}

Un [rollup](#rollups) de transacciones que utilizan [pruebas de validez](#validity-proof) a fin de ofrecer un aumento de los rendimientos de [capa 2](#layer-2), mientras se utiliza la seguridad proporcionada por la [red principal](#mainnet) (capa 1). Aunque no pueden gestionar tipos de transacción complejos, como [Optimistic Rollups](#optimistic-rollups), no tienen problemas de latencia porque las transacciones probablemente son válidas cuando se envían.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-knowledge Rollups
</DocLink>

<Divider />

## Fuentes {#sources}

_Proporcionado parcialmente por [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) mediante [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) bajo CC-BY-SA_

<Divider />

## Contribuir a esta página {#contribute-to-this-page}

¿Nos hemos dejado algo? ¿Hay algo que no es correcto? ¡Ayúdenos a mejorar contribuyendo a este glosario en GitHub!

[Más información sobre cómo contribuir](/contributing/adding-glossary-terms)
