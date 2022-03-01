---
title: Glosario de Ethereum
description: Un glosario incompleto de términos técnicos y no técnicos relacionados con Ethereum
lang: es
sidebar: true
sidebarDepth: 2
---

# Glosario {#ethereum-glossary}

<Divider />

## # {#section-numbers}

### Ataque del 51% {#51-attack}

Un tipo de ataque a una [red](#network) descentralizada donde un grupo obtiene el control de la mayoría de los [nodos](#node). Esto les permitiría defraudar a la cadena de bloques al revertir [transacciones](#transaction) y gastar el doble de [ether](#ether) y otras fichas criptográficas.

## A {#section-a}

### cuenta {#account}

Un objeto que contiene una [dirección](#address), balance, [nonce](#nonce) y, opcionalmente, código fuente y almacenamiento. Una cuenta puede ser una [cuenta de contrato](#contract-account) o una [cuenta de propiedad externa (EOA)](#eoa).

<DocLink to="/developers/docs/accounts">
  Cuentas de Ethereum
</DocLink>

### dirección {#address}

Generalmente, representa una [EOA](#eoa) o un [contrato](#contract-accouint) que puede recibir (cuenta destino) o enviar (dirección original) [transacciones](#transaction) en la blockchain. En concreto, son 160 bits del [Keccak hash](#keccak-256) de una [clave pública](#ecdsa) [ECDSA](#public-key).

### assert {#assert}

En [Solidity](#solidity), `assert(false)` se compila en `0xfe`, un opcode inválido, que agota todo el [gas](#gas) restante y revierte todos los cambios. Cuando una sentencia `assert()` falla, algo muy malo e inesperado está sucediendo y tendrás que arreglar tu código. Deberías usar `assert()` para evitar condiciones que nunca, nunca deberían ocurrir.

<DocLink to="/developers/docs/smart-contracts/security/">
  Seguridad
</DocLink>

### certificación {#attestation}

Un validador vota por una [cadena de faros](#beacon-chain) o [fragmento](#shard) [bloque](#block). Los validadores deben certificar los bloques, señalando que están de acuerdo con el estado propuesto por el bloque.

<Divider />

## B {#section-b}

### Cadena de baliza {#beacon-chain}

Una actualización de Eth2 que se convertirá en el coordinador de la red Ethereum. Introduce [pruebas de apuesta](#proof-of-stake) y [validadores](#validator) en Ethereum. Posiblemente se fusionará con la [red principal](#mainnet).

<DocLink to="/upgrades/beacon-chain/">
  Cadena de baliza
</DocLink>

### grande-endiano {#big-endian}

Una representación de números de posición donde el dígito más significativo es el primero en la memoria. Lo contrario de pequeño-endiano, donde el dígito menos significativo es el primero.

### bloque {#block}

Una colección de información requerida (un encabezado de bloque) acerca de las [transacciones](#transaction) comprendidas, y un conjunto de otras encabezados de bloque conocidas como [ommers](#ommer). Los bloques se añadiden a la red de Ethereum mediante los[mineros](#miner).

<DocLink to="/developers/docs/blocks/">
  Bloques
</DocLink>

### blockchain {#blockchain}

En Ethereum, una secuencia de [bloques](#block) validados por el sistema [proof-of-work/prueba de trabajo](#pow), cada uno de los cuales se vincula con su predecesor hasta llegar al [bloque génesis](#genesis-block). No hay límite en el tamaño del bloque; en su lugar, utiliza [límites-de-gas](#gas-limit) variables.

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  ¿Qué es una blockchain?
</DocLink>

### código de bytes {#bytecode}

Un conjunto abstracto de instrucciones diseñado para una ejecución eficiente por parte de un intérprete de software o una máquina virtual. A diferencia del código fuente legible por humanos, el código de bytes se expresa en formato numérico.

### Bifurcación de Bizancio {#byzantium-fork}

La primera de dos [ bifurcaciones duras de codigo](#hard-fork) para la etapa de desarrollo [Metropolis](#metropolis). Incluyó EIP-649 con el retraso de la [bomba de dificultad](#difficulty-bomb) Metropolis y la reducción de Recompensa de Bloques, donde la [Edad de Hielo](#ice-age) se retrasó 1 año y la recompensa del bloque se redujo de 5 a 3 ether.

<Divider />

## C {#section-c}

### compilación {#compiling}

Convierte código escrito en un lenguaje de programación de alto nivel (por ejemplo, [solidity](#solidity)) en un lenguaje de menor nivel (por ejemplo, bytecode de la [EVM](#bytecode)).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Compilación de contratos inteligentes
</DocLink>

### comité {#committee}

Un grupo de al menos 128 [validadores](#validator) asignados para revisar bloques y fragmentos al azar por [la cadena de baliza](#beacon-chain).

### consenso {#consensus}

Cuando numerosos nodos (normalmente la mayoría de los nodos en la red) tienen los mismos bloques en su mejor cadena de bloques validada localmente. No se debe confundir con [reglas de consenso](#consensus-rules).

### reglas de consenso {#consensus-rules}

Reglas de validación de bloques que siguen los nodos completos para permanecer en acuerdo con otros nodos. No confundir con [consenso](#consensus).

### Bifurcación de Constantinopla {#constantinople-fork}

Segunda parte de la etapa [Metrópolis](#metropolis), prevista inicialmente para mediados de 2018. Se espera que incluya el cambio a un algoritmo de consenso híbrido de [Prueba de trabajo](#pow)/[Prueba de participación](#pos), entre otros cambios.

### cuenta de contrato {#contract-account}

Cuenta que contiene código que se ejecuta cada vez que recibe una [transacción](#transaction) de otra [cuenta](#account) ([EOA](#eoa) o [contrato](#contract-account)).

### transacción de creación de contrato {#contract-creation-transaction}

Una [transacción](#transaction) especial, con la [dirección-cero](#zero-address) como destinatario, se utiliza para registrar un [contrato](#contract-account) y registrarlo en la blockchain de Ethereum.

### enlace cruzado {#crosslink}

El enlace cruzado proporciona un resumen del estado de un fragmento. Es la forma en que las cadenas [shard](#shard) se comunicarán entre sí a través de la [cadena de balizas](#beacon-chain) en el sistema sharded [Prueba de participación](#proof-of-stake).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Prueba de participación
</DocLink>

<Divider />

## D {#section-d}

### Organización Autónoma Descentralizada (DAO) {#dao}

Una empresa u otra organización que funciona sin gestión jerárquica. DAO también puede referirse a un contrato llamado "The DAO" lanzado el 30 de abril de 2016, que luego fue hackeado en junio de 2016; esto finalmente motivó una [fuerte bifurcación](#hard-fork) (con nombre de código DAO) en el bloque 1 192 000, que revirtió el contrato DAO hackeado y provocó que Ethereum y Ethereum Classic se dividieran en dos sistemas competidores.

<DocLink to="/community/#decentralized-autonomous-organizations-daos">
  Organizaciones Autónomas Descentralizadas (DAO)
</DocLink>

### Dapp {#dapp}

Aplicación descentralizada. Como mínimo, es un [contrato inteligente](#smart-contract) y una interfaz de usuario web. En líneas generales, una Dapp es una aplicación web que se construye sobre servicios de infraestructura abiertos, descentralizados y entre pares. Además, muchas Dapps incluyen almacenamiento descentralizado y/o un protocolo y una plataforma de mensajes.

<DocLink to="/developers/docs/dapps/">
  Introducción a Dapps
</DocLink>

### intercambio descentralizado (DEX) {#dex}

Un tipo de [dapp](#dapp) que te permite intercambiar tokens con pares en la red. Necesitas [ether](#ether) para usar uno (para pagar [tasas de transacción](#transaction-fee)), pero no están sujetos a restricciones geográficas como los intercambios centralizados; cualquiera puede participar.

<DocLink to="/get-eth/#dex">
  Intercambios descentralizados
</DocLink>

### deed {#deed}

Ver [token no fungibles (NFT)](#nft)

### defi {#defi}

Abreviatura para "finanzas descentralizadas", una amplia categoría de [Dapps](#dapp) que tiene como objetivo proporcionar servicios financieros respaldados por la blockchain, sin intermediarios, para que cualquier persona con una conexión a Internet pueda participar.

<DocLink to="/dapps/#explore">
  Dapps de Defi
</DocLink>

### dificultad {#difficulty}

Un ajuste a medida de la red que controla la cantidad de cálculos necesarios para producir una [prueba de trabajo](#pow).

### bomba de dificultad {#difficulty-bomb}

Aumento exponencial planificado en la [dificultad](#difficulty) de la [Prueba de trabajo](#pow), diseñado para motivar la transición a la [Prueba de participación](#pos), reduciendo los cambios de una [bifurcación](#hard-fork)

### firma digital {#digital-signatures}

Una cadena corta de datos que un usuario produce para un documento utilizando una [clave privada](#private-key) de manera que cualquiera con la correspondiente [clave pública](#public-key), la firma y el documento puede verificar que (1) el documento fue "firmado" por el propietario de esa clave privada en particular, y (2) el documento no fue modificado después de ser firmado.

<Divider />

## E {#section-e}

### algoritmo de firma digital de curva elíptica (ECDSA) {#ecdsa}

Algoritmo criptográfico utilizado por Ethereum para garantizar que los fondos solo los pueden gastar sus propietarios.

### epoch {#epoch}

Un periodo de 32 [slots](#slot) (6,4 minutos) en el sistema coordinado de [cadena de balizas](#beacon-chain). Los [comités](#committee) de[validadores](#validator) se mezclan cada época por razones de seguridad. Hay una oportunidad en cada época para que la cadena sea [finalizada](#finality).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Prueba de participación
</DocLink>

### Propuestas de mejora de Ethereum (EIP) {#eip}

Documento de diseño que proporciona información a la comunidad de Ethereum, describiendo una nueva característica propuesta o sus procesos o entorno (ver [ERC](#erc)).

<DocLink to="/eips/">
  Introducción a EIP
</DocLink>

### Servicio de nombres de Ethereum (ENS) {#ens}

El registro ENS es un único [contrato inteligente](#smart-contract) central que proporciona una asignación de nombres de dominio a propietarios y resolutores, como se describe en [EIP](#eip) 137.

[Más información en github.com](https://github.com/ethereum/ens)

### entropía {#entropy}

En el contexto de la criptografía, falta de previsibilidad o nivel de aleatoriedad. Cuando se genera información secreta, como las [claves privadas](#private-key), los algoritmos suelen basarse en una fuente de alta entropía para garantizar que la salida sea impredecible.

### cuenta de propiedad externa (EOA) {#eoa}

Una [cuenta](#account) creada por o para usuarios humanos de la red de Ethereum.

### Solicitud de comentarios de Ethereum (ERC) {#erc}

Una etiqueta dada a algunos [EIP](#eip) que intentan definir un estándar específico de uso de Ethereum.

<DocLink to="/eips/">
  Introducción a EIP
</DocLink>

### Ethash {#ethash}

Algoritmo de [Prueba de trabajo](#pow) para Ethereum 1.0.

[Más información en eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

Criptomoneda nativa utilizada por el ecosistema Ethereum, que cubre los costes del [gas](#gas) al ejecutar las transacciones. También se escribe como ETH o su símbolo Ξ, el símbolo griego Xi en mayúscula.

<DocLink to="/eth/">
  Moneda para nuestro futuro digital
</DocLink>

### eventos {#events}

Permite el uso de las instalaciones de registro de la [EVM](#evm). Las [Dapps](#dapp) pueden recibir eventos y utilizarlos para activar las llamadas de retorno de JavaScript en la interfaz de usuario.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Eventos y logs
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
  Faucets para redes de prueba
</DocLink>

### finalidad {#finality}

La finalidad es la garantía de que un conjunto de transacciones anteriores a un momento dado no cambiará y no podrá revertirse.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality">
  Finalidad de la prueba de trabajo
</DocLink> <DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalidad de la prueba de participación
</DocLink>

### finney {#finney}

Una denominación de [ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### bifurcación {#fork}

Un cambio en el protocolo que provoca la creación de una cadena alternativa, o una divergencia temporal en dos posibles rutas de bloques durante la minería.

### prueba de fraude {#fraud-proof}

Modelo de seguridad para ciertas soluciones de [capa 2](#layer-2) en las que, para aumentar la velocidad, las transacciones son [envueltas](#rollups) en lotes y enviadas a Ethereum en una única transacción. Se supone que son válidos, pero se pueden poner en tela de juicio si se sospecha el fraude. Una prueba de fraude ejecutará entonces la transacción para ver si se ha producido el fraude. Este método aumenta la cantidad de transacciones posibles manteniendo la seguridad. Algunos [rollups](#rollups) utilizan [pruebas de validez](#validity-proof).

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups">
  Optimistic Rollups
</DocLink>

### frontera {#frontier}

Etapa inicial de desarrollo de prueba de Ethereum, que duró desde julio de 2015 hasta marzo de 2016.

<Divider />

## G {#section-g}

### gas {#gas}

Un combustible virtual utilizado en Ethereum para ejecutar contratos inteligentes. La [EVM](#evm) utiliza un mecanismo de contabilidad para medir el consumo de gas y limitar el consumo de recursos informáticos (ver [Turing complete](#turing-complete)).

<DocLink to="/developers/docs/gas/">
  Gas y tarifas
</DocLink>

### límite de gas {#gas-limit}

La cantidad máxima de [gas](#gas) que puede consumir una [transacción](#transaction) o un [bloque](#block).

### bloque inicial {#genesis-block}

El primer bloque de una [blockchain](#blockchain), utilizado para inicializar una red concreta y su criptomoneda.

### geth {#geth}

Go-Ethereum. Una de las implementaciones más destacadas del protocolo Ethereum, escrito en Go.

[Más información en geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Abreviatura de gigawei, una denominación de [ether](#ether), comúnmente utilizada para fijar el precio de [gas](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### bifurcación fuerte {#hard-fork}

Una diferencia permanente en la [blockchain](#blockchain); también conocida como cambio de hardforking. Una suele ocurrir cuando los nodos no actualizados no pueden validar los bloques creados por los nodos actualizados que siguen las nuevas [reglas de consenso](#consensus-rules). No debe confundirse con una bifurcación, una bifurcación suave, una bifurcación de software o una bifurcación Git.

### hash {#hash}

Una huella digital de longitud fija de una entrada de tamaño variable, producida por una función hash. (Ver [keccak-256](#keccak-256))

### Cartera HD {#hd-wallet}

Una [cartera](#wallet) que utiliza el protocolo de creación y transferencia de claves jerárquicas deterministas (HD).

[Más información en github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### Semilla de cartera HD {#hd-wallet-seed}

Un valor utilizado para generar la [clave privada](#private-key) maestra y el código de la cadena maestra para una [cartera](#wallet) HD. La semilla de cartera puede representarse mediante palabras mnemotécnicas, lo que permite a los humanos copiar, respaldar y restaurar las claves privadas con mayor facilidad.

### homestead {#homestead}

La segunda etapa de desarrollo de Ethereum, lanzada en marzo de 2016 en el bloque 1 150 000.

<Divider />

## I {#section-i}

### Protocolo de intercambio de direcciones de clientes (ICAP) {#icap}

Codificación de direcciones de Ethereum que es parcialmente compatible con la codificación del número de cuenta bancaria internacional (IBAN), ofreciendo una codificación polivalente, con suma de comprobación e interoperable para las direcciones de Ethereum. Las direcciones ICAP utilizan un nuevo código de pseudopaís IBAN: XE, que significa "eXtended Ethereum", tal como se utiliza en las monedas no jurisdiccionales (por ejemplo, XBT, XRP, XCP).

### Edad de Hielo {#ice-age}

Una [bifurcación fuerte](#hard-fork) de Ethereum en el bloque 200 000 para introducir un incremento exponencial de [dificultad](#difficulty) (también conocido como [bomba de dificultad](#difficulty-bomb)), motivando una transición a la[prueba de participación](#pos).

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

También conocido como "algoritmo de estiramiento de contraseñas", es utilizado por los formatos [keystore](#keystore-file) para protegerse contra los ataques de fuerza bruta, de diccionario y de tabla de arcoíris en el cifrado de frases de contraseña, mediante el hashing repetido de la frase de contraseña.

<DocLink to="/developers/docs/smart-contracts/security/">
  Seguridad
</DocLink>

### keccak-256 {#keccak-256}

Función criptográfica [hash](#hash) utilizada en Ethereum. Keccak-256 fue estandarizado como [SHA](#sha)-3.

### archivo de claves {#keystore-file}

Un archivo codificado en JSON que contiene una única (generada aleatoriamente) [clave privada](#private-key), cifrada por una frase de contraseña para mayor seguridad.

<Divider />

## L {#section-l}

### capa 2 {#layer-2}

Un área de desarrollo centrada en la superposición de mejoras sobre el protocolo de Ethereum. Estas mejoras están relacionadas con las velocidades de [transacción](#transaction), el abaratamiento de las [tarifas de transacción](#transaction-fee) y la privacidad de las transacciones.

<DocLink to="/developers/docs/layer-2-scaling/">
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

Un cliente de Ethereum que no almacena una copia local de la [blockchain](#blockchain), o bien valida bloques y [transacciones](#transaction). Ofrece las funciones de una [cartera](#wallet) y puede crear y transmitir transacciones.

<Divider />

## M {#section-m}

### red principal {#mainnet}

Abreviatura de "red principal", esta es la principal [blockchain](#blockchain) pública de Ethereum. ETH, valor real y consecuencias reales. También se conoce como la capa 1 cuando se habla sobre las soluciones de escalado de la [capa 2](#layer-2). (Consulta también la [red de pruebas](#testnet))

### Árbol Merkle Patricia {#merkle-patricia-tree}

Es una estructura de datos usada en Ethereum, orientada a la eficiencia para almacenar pares de claves.

### mensaje {#message}

Una [transacción interna](#internal-transaction) que nunca se serializa y solo se envía dentro de la [EVM](#evm).

### llamada de mensaje {#message-call}

El acto de transmitir un [mensaje](#message) de una cuenta a otra. Si la cuenta de destino está relacionada con el código de la [EVM](#evm), la VM se iniciará con el estado de este objeto y el mensaje accionado.

### Metropolis {#metropolis}

La tercera fase de desarrollo de Ethereum, que se lanzó en octubre de 2017.

### minero {#miner}

Es un [nodo](#node) de red que encuentra [pruebas de trabajo](#pow) válidas para bloques nuevos, mediante el hashing de pase repetido (ver [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Minería
</DocLink>

<Divider />

## N {#section-n}

### red {#network}

Si nos referimos a la red de Ethereum, se trata de una red de punto a punto que propaga transacciones y bloques a cada nodo de Ethereum (que participe en la red).

<DocLink to="/developers/docs/networks/">
  Redes
</DocLink>

### tokens no fungibles (NFT) {#nft}

También conocido como "deed", se trata de un estándar de token presentado mediante la propuesta de ERC-721. Los NFT pueden rastrearse y comercializarse, pero cada token es único e inconfundible y no son son intercambiables como los ERC-20. Los NFT pueden representar la propiedad de activos digitales o físicos.

<DocLink to="/developers/docs/standards/tokens/erc-721/">
  Estándar de token no fungible ERC-721
</DocLink>

### nodo {#node}

Un cliente de software que participa en la red.

<DocLink to="/developers/docs/nodes-and-clients/">
  Nodos y clientes
</DocLink>

<DocLink to="/developers/docs/nodes-and-clients/">
  Nodos y clientes
</DocLink>

### nonce {#nonce}

En criptografía, un valor que solo puede utilizarse una vez. En Ethereum se utilizan dos tipos de nonce: un nonce de cuenta es un contador de transacción en cada cuenta, que se utiliza para prevenir los ataques de repetición; un nonce de [Prueba de trabajo](#pow) es el valor aleatorio de un bloque que se ha utilizado para satisfacer la [Prueba de trabajo](#pow).

<Divider />

## O {#section-o}

### bloque ommer (uncle) {#ommer}

Cuando un [minero](#miner) encuentra un [bloque](#block) válido, otro minero podría publicar un bloque rival, que se añade antes al extremo de la blockchain. Esto es válido, pero el bloque obsoleto se puede incluir mediante bloques nuevos a modo de _ommers_ y recibir una recompensa parcial de bloque. El término “ommer” es el término de género neutral preferido para el hermano de un bloque padre, pero, algunas veces, se hace referencia a él como “uncle” (tío en inglés).

### Optimistic Rollup {#optimistic-rollup}

Un [rollup](#rollups) de transacciones que utilizan [pruebas de fraude](#fraud-proof) para ofrecer una transacción completa y aumentada de [capa 2](#layer-2), mientras utiliza la seguridad proporcionada por la [red principal](#mainnet) (capa 1). A diferencia de [Plasma](#plasma), una solución de capa 2 parecida, los Optimistic Rollups pueden gestionar tipos de transacciones más complejos; todos los que sean posibles en la [EVM](#evm). En comparación con los [Zero-knowledge Rollups](#zk-rollups), tienen problemas de latencia porque la transacción se puede desafiar mediante la prueba de fraude.

<DocLink to="/developers/docs/layer-2-scaling/#optimistic-rollups">
  Rollups Optimistas
</DocLink>

<Divider />

## P {#section-p}

### paridad {#parity}

Una de las implementaciones interoperables más destacadas del software cliente de Ethereum.

### Plasma {#plasma}

Una solución de escala de [capa 2](#layer-2) que utiliza [pruebas de fraude](#fraud-proof), como los [Optimistic Rollups](#optimistic-rollups). Plasma se limita a transacciones simples como transferencias básicas de tokens y swaps.

<DocLink to="/developers/docs/layer-2-scaling/#Plasma">
  Plasma
</DocLink>

### clave privada (clave secreta) {#private-key}

Un número secreto que permite a los usuarios de Ethereum probar la propiedad de una cuenta o contratos mediante la producción de una firma digital (consulta [clave pública](#public-key), [dirección](#address), [ECDSA](#ecdsa)).

### prueba de participación (PoS) {#pos}

Un método mediante el que un protocolo de blockchain de criptomonedas intenta lograr el [consenso](#consensus) distribuido. La PoS solicita a los usuarios que demuestren la propiedad de una cierta cantidad de criptomonedas (su "participación" en la red) para poder participar en la validación de las transacciones.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Prueba de participación
</DocLink>

### prueba de trabajo (PoW) {#pow}

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

Una cantidad de ether incluida en cada nuevo bloque como recompensa que la red concede al [minero](#miner) que ha dado con la solución de la [Prueba de trabajo](#pow).

### Recursive Length Prefix (RLP) {#rlp}

Un estándar de codificación diseñado por los desarrolladores de Ethereum para codificar y serializar objetos (estructuras de datos) de complejidad y longitud arbitrarias.

### rollups {#rollups}

Un tipo de solución de escala de [capa 2](#layer-2) que agrupa varias transacciones y las envía a la [cadena principal de Ethereum](#mainnet) mediante una única transacción. Esto permite disfrutar de reducciones en el coste del [gas](#gas) y, como consecuencia, aumentos en las [transacción](#transaction). Existen Optimistic Rollups y Zero-knowledge Rollups que utilizan diferentes métodos de seguridad para ofrecer estos beneficios de escalabilidad.

<DocLink to="/developers/docs/layer-2-scaling/#rollups">
  Rollups
</DocLink>

<Divider />

## S {#section-s}

### Serenity {#serenity}

La cuarta y última fase de desarrollo de Ethereum.

<DocLink to="/upgrades/">
  Ethereum 2.0 (Eth2)
</DocLink>

### Algoritmo seguro de Hash (SHA) {#sha}

Una familia de funciones de hash criptográficas publicadas por el NIST (siglas del Instituto Norteamericano de Estándares y Tecnología).

### fragmento/cadena de fragmentos {#shard}

Una cadena de [prueba de participación](#proof-of-stake) coordinada por la [cadena de baliza](#beacon-chain) y asegurada mediante los [validadores](#validator). Se producirán 64 adiciones a la red como parte de la actualización de la cadena de fragmentos Eth2. Las cadenas de fragmentos ofrecerán un mayor rendimiento de la transacción para Ethereum, ya que proporcionan datos adicionales a soluciones de [capa 2](#layer-2) como [Optimistic Rollups](#optimistic-rollups) y [ZK Rollups](#zk-rollups).

<DocLink to="/upgrades/shard-chains">
  Cadenas de fragmentos
</DocLink>

### Sidechain {#sidechain}

Una solución de escalado que usa una cadena separada con diferentes [reglas de consenso](#consensus-rules). Se precisa un puente para conectar estas sidechains a la [red principal](#mainnet). Los [Rollups](#rollups) también usan sidechains, pero trabajan en colaboración con la [red principal](#mainnet).

<DocLink to="/developers/docs/layer-2-scaling/#sidechains">
  Sidechains
</DocLink>

### singleton {#singleton}

Un término de programación informática que describe un objeto del que solamente puede existir una instancia única.

### slot {#slot}

Un periodo de tiempo (12 segundos) en el que una nueva [cadena de baliza](#beacon-chain) y un nuevo bloque de cadena de [fragmentos](#shard) se pueden proponer mediante un [validador](#validator) en el sistema de [Prueba de participación](#proof-of-stake). Un slot puede estar vacío. 32 slots componen un [epoch](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Prueba de participación
</DocLink>

### contrato inteligente {#smart-contract}

Un programa que se ejecuta en la infraestructura informática de Ethereum.

<DocLink to="/developers/docs/smart-contracts/">
  Introducción a los contratos inteligentes
</DocLink>

### Solidity {#solidity}

Un lenguaje de programación (imperativo) procesual con sintaxis similar a JavaScript, C++ o Java. El lenguaje más popular y utilizado para los [contratos inteligentes](#smart-contract) de Ethereum. Creado por Dr. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity inline assembly {#solidity-inline-assembly}

Lenguaje ensamblador de la [EVM](#evm) en un programa [Solidity](#solidity). La compatibilidad de Solidity con el ensamblado en línea facilita la escritura de determinadas operaciones.

### Spurious Dragon {#spurious-dragon}

Una [bifurcación dura](#hard-fork) de la blockchain de Ethereum, que se produjo en el bloque 2 675 000 para abordar más vectores de ataque de denegación de servicio y limpiar el estado (consulta [Tangerine Whistle](#tangerine-whistle)). Además, es un mecanismo de protección de ataque por repetición (consulta [nonce](#nonce)).

### monedas estables {#stablecoin}

Un [token ERC-20](#token-standard) con un valor vinculado al valor de otro activo. Hay monedas estables respaldadas por monedas fiat como dólares, metales preciosos como el oro y otras criptomonedas como Bitcoin.

<DocLink to="/eth/#tokens">
  El ETH no es la única criptografía de Ethereum
</DocLink>

### participación {#staking}

Depositar una cantidad de [ether](#ether) (tu participación) para convertirte en un validador y asegurar la [red](#network). Un validador comprueba las [transacciones](#transaction) y propone [bloques](#block) bajo un modelo de consenso de [prueba de participación](#pos). La participación te proporciona un incentivo económico para actuar en el mejor interés de la red. Obtendrás recompensas por llevar a cabo tus tareas como [validador](#validator), pero perderás cantidades diferentes de ETH si no las llevas a cabo.

<DocLink to="/staking/">
  Apuesta tus ETH para llegar a ser un validador de Ethereum
</DocLink>

### canales de estado {#state-channels}

Una solución de [capa 2](#layer-2) en el que un canal está configurado entre los participantes y les permite realizar transacciones de manera libre y económica. Solo se envía a la [red principal](#mainnet) una [transacción](#transaction) para configurar y cerrar el canal. Esto permite realizar transacciones muy elevadas, pero depende en gran nivel de si conocemos el número de participantes y el cierre de fondos por adelantado.

<DocLink to="/developers/docs/layer-2-scaling/#state-channels">
  Canales de estado
</DocLink>

### szabo {#szabo}

Una denominación de [ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

Una [bifurcación dura](#hard-fork) de la blockchain de Ethereum, que se produjo en el bloque 2 463 000 para cambiar el cálculo de [gas](#gas) para ciertas operaciones intensivas de E/S, así como para eliminar el estado acumulado de un ataque de denegación de servicio, que explotó el bajo coste de gas de esas operaciones.

### red de pruebas {#testnet}

Una red que se utiliza para simular el comportamiento de la red principal de Ethereum (consulta [red principal](#mainnet)).

<DocLink to="/developers/docs/networks/#testnets">
  Redes de pruebas
</DocLink>

### estándar de token {#token-standard}

Presentado mediante la propuesta de ERC-20, esto proporciona una estructura de [contrato inteligente](#smart-contract) estandarizada para tokens fungibles. A diferencia de lo que sucede con [NFT](#nft), es posible realizar un seguimiento, comercializar e intercambiar los tokens del mismo contrato.

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  Estándar de token ERC-20
</DocLink>

### transacción {#transaction}

Datos comprometidos con la blockchain de Ethereum, firmados por una [cuenta](#account)originaria, con una [dirección](#address) específica. La transacción contiene metadatos como el [límite de gas](#gas-limit) para esa transacción.

<DocLink to="/developers/docs/transactions/">
  Transacciones
</DocLink>

### tarifa de transacción {#transaction-fee}

Una tarifa que debes pagar siempre que utilices la red de Ethereum. Los ejemplos incluyen el envío de fondos desde tu [cartera](#wallet) o una interacción de [dapp](#dapp), como intercambiar tokens o comprar un coleccionable. Se puede entender como un cargo por servicio. Esta tarifa cambiará según el nivel de actividad de la red. Esto sucede porque los [mineros](#miner), las personas responsables de procesar tus transacciones, suelen priorizar las transacciones con tarifas altas, de modo que la congestión contribuye a la subida de precios.

A nivel técnico, tus tarifas de transacción están relacionadas con la cantidad de [gas](#gas) que requiere tu transacción.

La reducción de las tasas de transacción es un tema candente en este momento. Consulta [Capa 2](#layer-2)

### Turing completo {#turing-complete}

Un concepto que lleva el nombre del matemático y informático inglés Alan Turing. Se trata de un sistema de reglas de manipulación de datos (como el conjunto de instrucciones de una ordenador, un lenguaje de programación o un autómata celular). Se dice que un ítem es "Turing completo" o "de universalidad informática" si se puede utilizar para simular cualquier máquina Turing.

<Divider />

## V {#section-v}

### validador {#validator}

Un [nodo](#node) en un sistema de [Prueba de participación](#proof-of-stake) responsable de almacenar datos, procesar transacciones y agregar nuevos bloques a la blockchain. Para activar el software validador, debes poder [participar](#staking) con 32 ETH.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Prueba de participación
</DocLink> <DocLink to="/staking/">
  Participación en Ethereum
</DocLink>

### Prueba de validación {#validity-proof}

Modelo de seguridad para ciertas soluciones de [capa 2](#layer-2) en las que, para aumentar la velocidad, las transacciones se [agrupan](/#rollups) en lotes y se envían a Ethereum en una única transacción. El cálculo de la transacción se realiza fuera de la cadena y, a continuación, se suministra a la cadena principal con una prueba de su validez. Este método aumenta la cantidad de transacciones posibles sin comprometer la seguridad. Algunos [rollups](#rollups) utilizan [pruebas de fraude](#fraud-proof).

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups">
  Zero-knowledge Rollups
</DocLink>

### Validium {#validium}

Una solución de [capa 2](#layer-2) que usa [pruebas de validez](#validity-proof) para mejorar la transacción. A diferencia de [Zero-knowlege Rollups](#zk-rollup), los datos de Validium no se almacenan en la [red principal](#mainnet) de la capa 1.

<DocLink to="/developers/docs/layer-2-scaling/#validium">
  Validium
</DocLink>

### Vyper {#vyper}

Un lenguaje de programación de alto nivel con sintaxis de tipo Python. Se diseñó para acercarse a un lenguaje funcional puro. Creado por Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### cartera {#wallets}

Un software que contiene [claves privadas](#private-key). Se utiliza para acceder y controlar las cuentas de [Ethereum](#account) e interactuar con [contratos inteligentes](#smart-contract). No es necesario almacenar las claves en una cartera y, además, se pueden recuperar del almacenamiento sin conexión (es decir, con una tarjeta de memoria o un papel) para mejorar la seguridad. A pesar de su nombre, las carteras nunca almacenan las monedas o tokens reales.

<DocLink to="/wallets/">
  Carteras de Ethereum
</DocLink>

### Web3 {#web3}

La tercera versión de la web. Propuesta inicialmente por el Dr. Gavin Wood, Web3 representa una visión y un enfoque novedosos para aplicaciones web, desde aplicaciones de propiedad y gestión centralizadas hasta aplicaciones construidas en protocolos descentralizados (consulta [Dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 versus Web3
</DocLink>

### wei {#wei}

La denominación más pequeña de un [ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### dirección cero {#zero-address}

Una dirección especial de Ethereum, compuesta íntegramente por ceros, que se especifica como la dirección de destino de una [transacción de creación de contrato](#contract-creation-transaction).

### Zero-knowledge Rollup {#zk-rollup}

Un [rollup](#rollups) de transacciones que utiliza [pruebas de validez](#validity-proof) para ofrecer una transacción completa y aumentada de [capa 2](#layer-2), mientras utiliza la seguridad proporcionada por la [red principal](#mainnet) (capa 1). Aunque no pueden gestionar tipos de transacción complejos, como [Optimistic Rollups](#optimistic-rollups), no tienen problemas de latencia porque las transacciones probablemente son válidas cuando se envian.

<DocLink to="/developers/docs/layer-2-scaling/#zk-rollups">
  Zero-knowledge Rollups
</DocLink>

<Divider />

## Fuentes {#sources}

_Proporcionado parcialmente por [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) mediante [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) under CC-BY-SA_

<Divider />

## Contribuir a esta página {#contribute-to-this-page}

¿Nos hemos dejado algo? ¿Hay algo que no es correcto? ¡Ayúdanos a mejorar contribuyendo a este glosario en GitHub!

[Más información sobre cómo contribuir](/contributing/adding-glossary-terms)
