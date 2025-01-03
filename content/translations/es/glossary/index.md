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

<DocLink href="/developers/docs/accounts">
  Cuentas de Ethereum
</DocLink>

### dirección {#address}

Generalmente, representa una cuenta de propiedad externa, o [EOA](#eoa) o un [contrato](#contract-account) que se puede recibir (cuenta destino) o enviar (dirección original) [transacciones](#transaction) en la cadena de bloques. En concreto, son 160 bits del [Keccak hash](#keccak-256) de una [clave pública](#ecdsa) [ECDSA](#public-key).

### interfaz binaria de la aplicación (ABI) {#abi}

La forma estándar de interactuar con [contratos](#contract-account) en el ecosistema Ethereum, tanto desde fuera de la cadena de bloques como para las interacciones entre contratos.

<DocLink href="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### interfaz de programación de aplicaciones {#api}

Una Interfaz de Programación de Aplicaciones (API) es un conjunto de definiciones acerca de cómo utilizar un software. Una API se encuentra entre una aplicación y un servidor web, y facilita la transferencia de datos entre ellos.

### ASIC {#asic}

Circuito integrado para aplicaciones específicas. Esto generalmente se refiere a un circuito integrado, hecho a la medida para la minería de criptomonedas.

### assert {#assert}

En [Solidity](#solidity), `assert(false)` se compila en `0xfe`, un código operativo inválido, que agota todo el [gas](#gas) restante y revierte todos los cambios. Cuando una sentencia `assert()` falla, algo muy malo e inesperado está sucediendo y tendrá que arreglar su código. Debería usar `assert()` para evitar condiciones que nunca jamás deberían ocurrir.

<DocLink href="/developers/docs/smart-contracts/security/">
  Seguridad en contratos inteligentes
</DocLink>

### certificación {#attestation}

Una afirmación hecha por una entidad de que algo es verdadero. En el contexto de Ethereum, los validadores de consenso deben de afirmar cuál creen que es el estado de la cadena. En los momentos designados, cada validador es responsable de publicar diferentes certificaciones que declaran formalmente la visión de la cadena de este validador, incluyendo el úlitmo punto de control finalizado y el jefe actual de la cadena.

<DocLink href="/developers/docs/consensus-mechanisms/pos/attestations/">
  Certificaciones
</DocLink>

<Divider />

## B {#section-b}

### Tarifa de base {#base-fee}

Cada [bloque](#block) tiene un precio conocido como «tarifa de base». Es la tarifa mínima de [gas](#gas) que un usuario debe pagar para incluir la transacción en el siguiente bloque.

<DocLink href="/developers/docs/gas/">
  Gas y tarifas
</DocLink>

### Cadena de baliza {#beacon-chain}

La cadena de baliza fue la cadena de bloques que introdujo la [prueba de participación](#pos) y los [validators](#validadores) en Ethereum. Se ejecutó junto con la prueba de trabajo de la cadena principal de Ethereum desde diciembre de 2020 hasta que las dos cadenas se fusionaron en septiembre de 2022 para formar el Ethereum actual.

<DocLink href="/roadmap/beacon-chain/">
  Cadena de baliza
</DocLink>

### big-endian {#big-endian}

Una representación de números de posición donde el dígito más significativo es el primero en la memoria. Lo contrario de «little-endian», donde el dígito menos significativo es el primero.

### bloque {#block}

Un bloque es una unidad de información agrupada que incluye una lista ordenada de transacciones e información relacionada con el consenso. Los bloques los proponen los validadores de prueba de participación, en el momento en que se comparten en toda la red entre pares, donde todos los demás nodos pueden verificarlos fácilmente de forma independiente. Las reglas de consenso rigen qué contenido de un bloque se considera válido. La red ignora los bloques que se consideren no válidos. El orden de estos bloques y las transacciones en ese sentido crean una cadena determinista de eventos con un final que representa el estado actual de la red.

<DocLink href="/developers/docs/blocks/">
  Bloques
</DocLink>

### explorador de bloque {#block-explorer}

Una interfaz que permite a un usuario buscar información desde y sobre una cadena de bloques. Esto incluye la recuperación de transacciones individuales, actividades asociadas con direcciones específicas e información sobre la red.

### encabezado de bloque {#block-header}

El encabezado del bloque es una colección de metadatos sobre un bloque y un resumen de las transacciones incluidas en la carga útil de ejecución.

### propagación de bloques {#block-propagation}

El proceso de transmitir un bloque confirmado a todos los otros nodos de la red.

### proponente de bloques {#block-proposer}

El validador específico elegido para crear un bloque en una [ranura](#slot) particular.

### recompensa de bloque {#block-reward}

La cantidad de ether recompensada al proponente de un nuevo bloque válido.

### estado del bloque {#block-status}

Los estados en los que puede existir un bloque. Los posibles estados incluyen:

- Propuesto: un validador ha propuesto el bloque.
- Programado: los validadores están enviando datos actualmente.
- Perdido/omitido: el proponente no propuso un bloqueo dentro del plazo elegible.
- Huérfano: el [algoritmo de elección de bifurcación](#fork-choice-algorithm) ha reorganizado el bloque.

### tiempo del bloque {#block-time}

El intervalo de tiempo que tardan los bloques en ser añadidos a la cadena de bloques.

### validación del bloque {#block-validation}

El proceso de comprobar que un nuevo bloque contiene transacciones y firmas válidas, se basa en la cadena histórica más pesada y sigue todas las demás reglas de consenso. Los bloques válidos se añaden al final de la cadena y se propagan a otros en la red. Los bloques no válidos no se tienen en cuenta.

### cadena de bloques {#blockchain}

Una secuencia de [bloques](#block), cada uno de los cuales se vincula a su predecesor hasta el [bloque inicial](#genesis-block) haciendo referencia al hash del bloque anterior. La integridad de la cadena de bloques está asegurada criptográficamente mediante un mecanismo de consenso basado en la prueba de participación.

<DocLink href="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  ¿Qué es una cadena de bloques o «blockchain»?
</DocLink>

### nodo de arranque {#bootnode}

Los nodos que se pueden utilizar para iniciar el proceso de descubrimiento al ejecutar un nodo. Las terminales de estos nodos se registran en el código fuente de Ethereum.

### código de bytes {#bytecode}

Un conjunto abstracto de instrucciones diseñado para una ejecución eficiente por parte de un software que lo interpreta o una máquina virtual. A diferencia del código fuente legible por humanos, el código de bytes se expresa en formato numérico.

### Bifurcación Byzantium {#byzantium-fork}

La primera de dos [ bifurcaciones duras de código](#hard-fork) para la etapa de desarrollo [Metropolis](#metropolis). Incluyó EIP-649 con el retraso de la [bomba de dificultad](#difficulty-bomb) Metropolis y la reducción de recompensa de bloques, donde la [Era de hielo](#ice-age) se retrasó 1 año y la recompensa del bloque se redujo de 5 a 3 ether.

<Divider />

## C {#section-c}

### Casper-FFG {#casper-ffg}

Casper-FFG es un protocolo de consenso de prueba de participación utilizado junto con el algoritmo de elección de bifurcación [LMD-GHOST](#lmd-ghost) para permitir que los [clientes de consenso](#consensus-client) se pongan de acuerdo sobre la cabeza de la cadena de baliza.

### punto de control {#checkpoint}

La [cadena de baliza](#beacon-chain) tiene un tempo dividido en ranuras (12 segundos) y épocas (32 ranuras). La primera ranura de cada época es un punto de control. Cuando una [supermayoría](#supermajority) de los validadores certifica el vínculo entre dos puntos de control, se pueden [justificar](#justification) y luego, cuando otro puesto de control esté justificado encima, pueden estar [finalizados](#finality).

### compilación {#compiling}

Convierte el código escrito en un lenguaje de programación de alto nivel (por ejemplo, [Solidity](#solidity)) en otro lenguaje de menor nivel (por ejemplo, bytecode de la [EVM](#bytecode)).

<DocLink href="/developers/docs/smart-contracts/compiling/">
  Compilación de contratos inteligentes
</DocLink>

### comité {#committee}

Un grupo de al menos 128 [validadores](#validator) asignados para validar bloques en cada ranura. Uno de los validadores del comité es el agregador, responsable de agregar las firmas de todos los demás validadores del comité que acuerden una certificación. No debe confundirse con el [comité de sincronización](#sync-committee).

### inviabilidad computacional {#computational-infeasibility}

Un proceso es computacionalmente inviable si lleva un tiempo poco factible (por ejemplo, miles de millones de años) hacerlo para cualquier persona que posiblemente tenga un interés en llevarlo a cabo.

### consenso {#consensus}

Cuando una supermayoría de nodos en la red tienen los mismos bloques en su mejor cadena de bloques validada localmente. No se debe confundir con [reglas de consenso](#consensus-rules).

### cliente de consenso {#consensus-client}

Los clientes de consenso (como Prysm, Teku, Nimbus, Lighthouse, Lodestar) ejecutan el algoritmo de consenso de la [prueba de participación](#pos) de Ethereum permitiendo a la red alcanzar un acuerdo sobre la cabeza de la cadena de bloques. Los clientes de consenso no participan en la validación/retransmisión de transacciones ni en la ejecución de transiciones de estado. Esto se realiza mediante [clientes de ejecución](#execution-client).

### capa de consenso {#consensus-layer}

La capa de consenso de Ethereum es la red de [clientes de consenso](#consensus-client).

### reglas de consenso {#consensus-rules}

Reglas de validación de bloques que siguen los nodos completos para permanecer en consenso con otros nodos. No se debe confundir con [consenso](#consensus).

### Considerado para la inclusión (CFI) {#cfi}

Un núcleo [EIP](#eip) que aún no está activo en la red principal, y a los desarrolladores de clientes les parece bien la idea, por lo general. Suponiendo que cumpla con todos los requisitos para la inclusión de la red principal, podría incluirse en una actualización de la red (no necesariamente la siguiente).

### Bifurcación Constantinople {#constantinople-fork}

Segunda parte de la etapa [Metropolis](#metropolis), prevista inicialmente para mediados de 2018. Se espera que incluya el cambio a un algoritmo de consenso híbrido de [prueba de trabajo](#pow)/[prueba de participación](#pos), entre otros cambios.

### cuenta de contrato {#contract-account}

Cuenta que contiene un código que se ejecuta cada vez que recibe una [transacción](#transaction) de otra [cuenta](#account) ([EOA](#eoa) o [contrato](#contract-account)).

### transacción de creación de contrato {#contract-creation-transaction}

Una [transacción especial](#transaction) que incluye el código de inicio de un contrato. El destinatario se establece como `null` (nulo) y el contrato se implementa en una dirección generada a partir de la dirección del usuario y `nonce`. Se utiliza para registrar un [contrato](#contract-account) y guardarlo en la cadena de bloques de Ethereum.

### criptoeconomía {#cryptoeconomics}

La economía de las criptomonedas.

## D {#section-d}

### Đ {#d-with-stroke}

Đ (D con un trazo) se usa en inglés antiguo, inglés medio, islandés y feroés para indicar una letra mayúscula «Eth». Se utiliza en palabras como ĐEV o ĐApp (aplicación descentralizada), donde Đ es la letra nórdica «eth». El eth en mayúsculas (Ð) también se utiliza para simbolizar la criptomoneda Dogecoin. Esto se ve comúnmente en la documentación más antigua de Ethereum, aunque se usa con menos frecuencia hoy en día.

### DAG {#dag}

DAG significa Directed Acyclic Graph (Grafo Acíclico Dirigido). Es una estructura de datos compuesta por nodos y enlaces entre ellos. Antes de La Fusión, Ethereum usaba un DAG en su algoritmo [proof-of-work](#pow), [Ethash](#ethash), pero ya no se usa en la [prueba de participación](#pos).

### DApp {#dapp}

Aplicación Descentralizada. Como mínimo, es un [contrato inteligente](#smart-contract) y una interfaz de usuario web. En términos más generales, un DApp es una aplicación web que se basa en servicios de infraestructura abiertos, descentralizados y entre pares. Además, muchas DApps incluyen almacenamiento descentralizado y/o un protocolo y plataforma de mensajes.

<DocLink href="/developers/docs/dapps/">
  Introducción a las dapps
</DocLink>

### disponibilidad de datos {#data-availability}

La propiedad de un estado que cualquier nodo conectado a la red podría descargar cualquier parte específica del estado que desee.

### descentralización {#decentralization}

El concepto de mover el control y la ejecución de procesos fuera de una entidad central.

### Organización Autónoma Descentralizada (DAO) {#dao}

Una empresa u otra organización que funciona sin gestión jerárquica. DAO también puede referirse a un contrato llamado «The DAO» lanzado el 30 de abril de 2016, que luego fue hackeado en junio de 2016; esto finalmente produjo una [bifurcación fuerte](#hard-fork) (con nombre de código DAO) en el bloque 1.192.000, que revirtió el contrato DAO hackeado y provocó que Ethereum y Ethereum Classic se dividieran en dos sistemas competidores.

<DocLink href="/dao/">
  Organizaciones Autónomas Descentralizadas (DAO)
</DocLink>

### Intercambio Descentralizado (DEX) {#dex}

Un tipo de [DApp](#dapp) que le permite intercambiar tókenes entre pares en la red. Necesita [ether](#ether) para usar uno (para pagar [comisiones de transacción](#transaction-fee)), pero no están sujetos a restricciones geográficas como los intercambios centralizados; cualquiera puede participar.

<DocLink href="/get-eth/#dex">
  Intercambios descentralizados
</DocLink>

### títulos de propiedad {#deed}

Ver [Tókenes no fungibles (NFT)](#nft).

### contrato de depósito {#deposit-contract}

La puerta de entrada a la participación en Ethereum. El contrato de depósito es un contrato inteligente en Ethereum que acepta depósitos de ETH y gestiona los saldos de los validadores. No se puede activar un validador sin depositar ETH en este contrato. El contrato requiere ETH y datos de entrada. Estos datos de entrada incluyen la clave pública del validador y la clave pública de retirada, firmadas por la clave privada del validador. Estos datos son necesarios para que la red de la [prueba de participación](#pos) identifique y apruebe a un validador.

### DeFi {#defi}

Abreviatura de «Finanzas Descentralizadas», que es una amplia categoría de [DApps](#dapp) que tiene como objetivo proporcionar servicios financieros respaldados por la cadena de bloques, sin intermediarios, para que cualquier persona con una conexión a Internet pueda participar.

<DocLink href="/defi/">
  Finanzas descentralizadas (DeFi)
</DocLink>

### dificultad {#difficulty}

Una configuración de toda la red en redes [prueba de trabajo](#pow) que controla cuánto cálculo promedio se requiere para encontrar un nonce válido. La dificultad viene representada por el número de ceros iniciales que se requieren en el hash de bloque resultante para que se considere válido. Este concepto ha quedado obsoleto en Ethereum desde la transición a la prueba de participación.

### bomba de dificultad {#difficulty-bomb}

Aumento exponencial planificado en la [dificultad](#pow) [de la prueba de trabajo](#difficulty) que se ha diseñado para motivar la transición a [prueba de participación](#pos), reduciendo las posibilidades de una [bifurcación](#hard-fork). La bomba de dificultad ha quedado obsoleta con la [transición a la prueba de participación](/roadmap/merge).

### firma digital {#digital-signatures}

Una cadena corta de datos que un usuario produce para un documento utilizando una [clave privada](#private-key) de manera que cualquiera con la correspondiente [clave pública](#public-key), la firma y el documento pueda verificar que (1) el documento está «firmado» por el propietario de esa clave privada en particular, y que (2) el documento no se ha modificado una vez firmado.

<Divider />

### descubrimiento {#discovery}

El proceso por el cual un nodo Ethereum encuentra otros nodos a los que conectarse.

### Tabla de Hash Distribuida (DHT) {#distributed-hash-table}

Una estructura de datos que contiene pares `(clave, valor)` utilizados por los nodos de Ethereum para identificar a los pares a los que conectarse y determinar qué protocolos usar para comunicarse.

### doble gasto {#double-spend}

Una bifurcación de cadena de bloques deliberada, en la que un usuario con una cantidad suficientemente grande de poder/participación en minería envía una transacción para pasar algo de moneda fuera de la cadena (por ejemplo, salir al dinero fiduciario o hacer una compra fuera de la cadena) y luego reorganizar la cadena de bloques para eliminar esa transacción. Un doble gasto exitoso deja al atacante con sus activos tanto en la cadena como fuera de la cadena.

## E {#section-e}

### Algoritmo de Firma Digital de Curva Elíptica (ECDSA) {#ecdsa}

Algoritmo criptográfico utilizado por Ethereum para garantizar que los fondos solo los pueden gastar sus propietarios. Es el método preferido para crear claves públicas y privadas. Relevante para la [generación de la dirección](#address) de la cuenta y la [verificación de la transacción](#transaction).

### cifrado {#encryption}

El cifrado es la conversión de datos electrónicos en una forma ilegible por cualquier persona, excepto el propietario de la clave de descifrado correcta.

### entropía {#entropy}

En el contexto de la criptografía, significa una falta de previsibilidad o nivel de aleatoriedad. Cuando se genera información secreta, como las [claves privadas](#private-key), los algoritmos suelen basarse en una fuente de alta entropía para garantizar que la salida sea impredecible.

### época {#epoch}

Un período de 32 [ranuras](#slot), cada una de las cuales es de 12 segundos, por un total de 6,4 minutos. Los [comités de validación](#committee) se barajean cada época por razones de seguridad. Cada época tiene la oportunidad de que la cadena sea [finalizada](#finality). A cada validador se le asignan nuevas responsabilidades al comienzo de cada época.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Prueba de participación
</DocLink>

### equivocación {#equivocation}

Un validador que envía dos mensajes que se contradicen entre sí. Un ejemplo simple es un remitente de transacciones que envía dos transacciones con el mismo nonce. Otro es un proponente de bloques que propone dos bloques a la misma altura de bloque (o para la misma ranura).

### Eth1 {#eth1}

«Eth1» es un término que se refiere a la red principal de Ethereum, la cadena de prueba de trabajo (PoW) existente. Este término ha sido desestimado a favor de la «capa de ejecución». [Conozca más acerca de este cambio de nombre](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Más sobre las actualizaciones de Ethereum
</DocLink>

### Eth2 {#eth2}

«Eth2» es un término que hace referencia a un conjunto de actualizaciones del protocolo de Ethereum, incluyendo la transición de Ethereum a la prueba de participación. Desde entonces, este término ha quedado obsoleto a favor de la «capa de consenso». [Conozca más acerca de este cambio de nombre](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink href="/roadmap/">
  Más sobre las actualizaciones de Ethereum
</DocLink>

### Propuesta de mejora de Ethereum(EIP) {#eip}

Documento de diseño que proporciona información a la comunidad de Ethereum, describiendo una nueva característica propuesta o sus procesos o entorno (ver [ERC](#erc)).

<DocLink href="/eips/">
  Introducción a EIP
</DocLink>

### Servicio de Nombres de Ethereum (ENS) {#ens}

El registro ENS es un único [contrato inteligente](#smart-contract) central que proporciona una asignación de nombres de dominio a propietarios y resolutores, como se describe en [EIP](#eip) 137.

[Más información en ens.domains](https://ens.domains)

### cliente de ejecución {#execution-client}

Los clientes de ejecución (anteriormente conocidos «clientes Ethereum»), como Besu, Erigon, Go-Ethereum (Geth), Nethermind, tienen la tarea de procesar y transmitir transacciones y administrar el estado de Ethereum. Ejecutan los cálculos de cada transacción utilizando la [Máquina Virtual Ethereum](#evm) para garantizar que se sigan las reglas del protocolo.

### capa de ejecución {#execution-layer}

La capa de ejecución de Ethereum es la red de [clientes de ejecución](#execution-client).

### Cuenta de Propiedad Externa (EOA) {#eoa}

Las cuentas de propiedad externa (o EOA) son [cuentas](#account) que están controladas por [claves privadas](#private-key), normalmente generadas utilizando una [frase semilla](#hd-wallet-seed). A diferencia de los contratos inteligentes, las cuentas de propiedad externa son cuentas sin ningún código asociado a ellas. Normalmente, estas cuentas se gestionan con una [cartera](#wallet).

### Ethereum Solicita Comentarios (ERC) {#erc}

Una etiqueta dada a algunas [EIP](#eip) que intentan definir un estándar específico de uso de Ethereum.

<DocLink href="/eips/">
  Introducción a EIP
</DocLink>

### Ethash {#ethash}

Un algoritmo de [prueba de trabajo](#pow) que se utilizó en Ethereum antes de hacer la transición a la [prueba de participación](#pos).

[Más información](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)

### ether {#ether}

Criptomoneda nativa utilizada por el ecosistema Ethereum, que cubre los costes del [gas](#gas) al ejecutar las transacciones. También escrito como ETH o su símbolo Ξ, el símbolo griego Xi en mayúscula.

<DocLink href="/eth/">
  Moneda para nuestro futuro digital
</DocLink>

### eventos {#events}

Permite el uso de las instalaciones de registro de la [EVM](#evm). Las [DApps](#dapp) pueden recibir eventos y utilizarlos para activar las llamadas de retorno de JavaScript en la interfaz de usuario.

<DocLink href="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Eventos y registros
</DocLink>

### Máquina virtual de Ethereum (EVM) {#evm}

Una máquina virtual basada en la pila que ejecuta [bytecode](#bytecode). En Ethereum, el modelo de ejecución determina cómo se modifica el estado del sistema, dada una serie de instrucciones mediante bytecode y una pequeña tupla de datos del entorno. Esto se especifica a través de un modelo formal de una máquina virtual.

<DocLink href="/developers/docs/evm/">
  Máquina virtual de Ethereum
</DocLink>

### Lenguaje ensamblador EVM {#evm-assembly-language}

Una forma legible de [bytecode](#bytecode) de EVM.

<Divider />

## F {#section-f}

### función de reserva {#fallback-function}

Una función por defecto llamada en ausencia de datos o de un nombre de función declarado.

### faucet (grifo) {#faucet}

Un servicio realizado a través de un [contrato inteligente](#smart-contract) que dispensa fondos en forma de ethers gratuitos de prueba que puede utilizarse en una red de prueba.

<DocLink href="/developers/docs/networks/#testnet-faucets">
  Faucets de red de prueba
</DocLink>

### finalidad {#finality}

La finalidad es la garantía de que un conjunto de transacciones anteriores a un momento dado no cambiará y no podrá revertirse.

<DocLink href="/developers/docs/consensus-mechanisms/pos/#finality">
  Finalidad de la prueba de participación
</DocLink>

### finney {#finney}

Una denominación de [ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### bifurcación {#fork}

Un cambio en el protocolo que provoca la creación de una cadena alternativa o una divergencia temporal en dos posibles rutas de bloques.

### algoritmo de elección de bifurcación {#fork-choice-algorithm}

El algoritmo utilizado para identificar la cadena de bloques en cabeza. En la capa de ejecución la cabeza de la cadena se identifica como la que tiene la mayor dificultad total detrás de ella. Esto significa que la verdadera cabeza de la cadena es la que ha requerido más trabajo para minarla. En la capa de consenso el algoritmo observa las certificaciones acumuladas de validadores ([LMD_GHOST](#lmd-ghost)).

### prueba de fraude {#fraud-proof}

Modelo de seguridad para ciertas soluciones de [capa 2](#layer-2) en las que, para aumentar la velocidad, las transacciones se [enrollan](#rollups) (rollup) en lotes y se envían a Ethereum en una única transacción. Se supone que son válidos, pero se pueden poner en tela de juicio si se sospecha el fraude. Una prueba de fraude ejecutará entonces la transacción para ver si se ha producido el fraude. Este método aumenta la cantidad de transacciones posibles manteniendo la seguridad. Algunos [rollups](#rollups) utilizan [pruebas de validez](#validity-proof).

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Agregaciones Optimistas
</DocLink>

### frontier {#frontier}

Etapa inicial de desarrollo de prueba de Ethereum, que duró desde julio de 2015 hasta marzo de 2016.

<Divider />

## G {#section-g}

### gas {#gas}

Un combustible virtual utilizado en Ethereum para ejecutar contratos inteligentes. La [EVM](#evm) utiliza un mecanismo de contabilidad para medir el consumo de gas y limitar el consumo de recursos informáticos (ver [Turing completo](#turing-complete)).

<DocLink href="/developers/docs/gas/">
  Gas y tarifas
</DocLink>

### límite de gas {#gas-limit}

La cantidad máxima de [gas](#gas) que puede consumir una [transacción](#transaction) o un [bloque](#block).

### precio de gas {#gas-price}

Precio en ether de una unidad de gas especificada en una transacción.

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

En discrepancia permanente con la [cadena de bloque](#blockchain); también conocida como cambio de «hardforking». Una suele ocurrir cuando los nodos no actualizados no pueden validar los bloques creados por los nodos actualizados que siguen las nuevas [reglas de consenso](#consensus-rules). No debe confundirse con una bifurcación, una bifurcación suave, una bifurcación de software o una bifurcación Git.

### hash {#hash}

Una huella digital de longitud fija de una entrada de tamaño variable, producida por una función hash. (Ver [keccak-256](#keccak-256)).

### tasa de hash {#hash-rate}

La cantidad de cálculos hash realizados por segundo por computadoras que ejecutan software de minería.

### Cartera HD {#hd-wallet}

Una [cartera](#wallet) que utiliza el protocolo de creación y transferencia de claves jerárquicas deterministas (HD).

[Más información en github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### Semilla de cartera HD {#hd-wallet-seed}

Un valor utilizado para generar la [clave privada](#private-key) maestra y el código de la cadena maestra para una [cartera](#wallet) HD. La semilla de cartera puede representarse mediante palabras mnemotécnicas, lo que permite a los humanos copiar, respaldar y restaurar las claves privadas con mayor facilidad.

### homestead {#homestead}

La segunda etapa de desarrollo de Ethereum, lanzada en marzo de 2016 en el bloque 1.150.000.

<Divider />

## I {#section-i}

### índice {#index}

Una estructura de red destinada a optimizar la consulta de información de toda la [cadena de bloques](#blockchain) proporcionando una ruta eficiente a su fuente de almacenamiento.

### Protocolo de Intercambio de Direcciones de Clientes (ICAP) {#icap}

Codificación de direcciones de Ethereum que es parcialmente compatible con la numeración internacional de cuentas bancarias (IBAN), ofreciendo una codificación polivalente, con suma de comprobación e interoperable para las direcciones de Ethereum. Las direcciones ICAP utilizan un nuevo código de pseudopaís IBAN: XE, que significa «eXtended Ethereum», tal como se utiliza en las monedas no jurisdiccionales (por ejemplo, XBT, XRP, XCP).

### Era de hielo {#ice-age}

Una [bifurcación fuerte](#hard-fork) de Ethereum en el bloque 200.000 para introducir un incremento exponencial de [dificultad](#difficulty) (también conocido como [bomba de dificultad](#difficulty-bomb)), motivando una transición a la[prueba de participación](#pos).

### Entorno de Desarrollo Integrado (IDE) {#ide}

Una interfaz de usuario que normalmente combina un editor de código, compilador, tiempo de ejecución y depurador.

<DocLink href="/developers/docs/ides/">
  Entornos de desarrollo integrados
</DocLink>

### problema de código implementado inmutable {#immutable-deployed-code-problem}

Una vez que el código de un [contrato](#smart-contract) (o [biblioteca](#library)) se implementa, se vuelve inmutable. Las prácticas habituales de desarrollo de software se basan en la posibilidad de corregir posibles errores y añadir nuevas funciones, por lo que esto supone un reto para el desarrollo de contratos inteligentes.

<DocLink href="/developers/docs/smart-contracts/deploying/">
  Implementación de contratos inteligentes
</DocLink>

### transacción interna {#internal-transaction}

[Transacción](#transaction) enviada desde una [cuenta de contrato](#contract-account) a otra cuenta de contrato o a una [EOA](#eoa) (ver [mensaje](#message)).

<Divider />

### emisión

La acuñación de nuevo ether para recompensar la propuesta, la certificación y la denuncia de irregularidades.

## K {#section-k}

### Función de Derivación de Clave (KDF) {#kdf}

También conocida como «algoritmo de estiramiento de contraseñas», lo utilizan los formatos [keystore](#keystore-file) (o banco de claves) para protegerse contra los ataques de fuerza bruta, de diccionario y de tabla de arcoíris en el cifrado de frases de contraseña, mediante el hashing repetido de la frase de contraseña.

<DocLink href="/developers/docs/smart-contracts/security/">
  Seguridad de los contratos inteligentes
</DocLink>

### almacén de claves {#keyfile}

El par clave/dirección privada de cada cuenta existe como un solo archivo de clave en un cliente de Ethereum. Estos son archivos de texto JSON que contienen la llave privada cifrada de la cuenta, que solo se puede descifrar con la contraseña introducida durante la creación de la cuenta.

### keccak-256 {#keccak-256}

Función criptográfica [hash](#hash) utilizada en Ethereum. Keccak-256 se ha normalizado como [SHA](#sha)-3.

<Divider />

## L {#section-l}

### capa 2 {#layer-2}

Un área de desarrollo centrada en la superposición de capas sobre el protocolo de Ethereum. Estas mejoras están relacionadas con las velocidades de [transacción](#transaction), el abaratamiento de las [comisiones de transacción](#transaction-fee) y la privacidad de las transacciones.

<DocLink href="/layer-2/">
  Capa 2
</DocLink>

### LevelDB {#level-db}

Es un almacenamiento en disco de código abierto, livianamente implementado, [biblioteca](#library) de propósito único con conexiones a diferentes plataformas.

### biblioteca {#library}

Un tipo especial de [contrato](#smart-contract) sin funciones pagaderas, sin función de reserva y sin almacenamiento de datos. Por lo tanto, no puede recibir ni guardar ether o almacenar datos. Una biblioteca sirve como un código implementado previamente al que puede acceder otro contrato para realizar funciones de computación de solo lectura.

<DocLink href="/developers/docs/smart-contracts/libraries/">
  Bibliotecas de contratos inteligentes
</DocLink>

### cliente ligero {#light-client}

Un cliente de Ethereum que no almacena una copia local de la [cadena de bloque](#blockchain), o bien valida bloques y [transacciones](#transaction). Ofrece las funciones de una [cartera](#wallet) y puede crear y transmitir transacciones.

<Divider />

### LMD_GHOST {#lmd-ghost}

El [algoritmo de opción de bifurcación](#fork-choice-algorithm) usado por los clientes de consenso de Ethereum para identificar la cabeza de la cadena. LMD-GHOST es un acrónimo que significa «último mensaje dirigido codicioso observado del subárbol más pesado», e indica que la cabeza de la cadena es el bloque con la mayor acumulación de <a href="#atestaciones">certificaciones</a> en su historia.

## M {#section-m}

### Red principal {#mainnet}

Abreviatura de «red principal», esta es la principal [cadena de bloques](#blockchain) pública de Ethereum. ETH, valor real y consecuencias reales. También se conoce como la capa 1 cuando se habla sobre las soluciones de escalabilidad de la [capa 2](#layer-2). (Consulte también la [red de pruebas](#testnet)).

<DocLink href="/developers/docs/networks/">
  Redes de Ethereum
</DocLink>

### memoria dura {#memory-hard}

Las funciones de memoria dura son procesos que experimentan una disminución drástica en la velocidad o la viabilidad cuando la cantidad de memoria disponible disminuye aunque sea ligeramente. Un ejemplo es el algoritmo de minería de Ethereum[Ethash](#ethash).

### Árbol de Merkle Patricia Trie {#merkle-patricia-tree}

Es una estructura de datos usada en Ethereum, orientada a la eficiencia para almacenar pares de claves.

### mensaje {#message}

Una [transacción interna](#internal-transaction) que nunca se serializa y solo se envía dentro de la [EVM](#evm).

### llamada de mensaje {#message-call}

El acto de transmitir un [mensaje](#message) de una cuenta a otra. Si la cuenta de destino está relacionada con el código de la [EVM](#evm), la VM se iniciará con el estado de este objeto y el mensaje en cuestión.

### Metropolis {#metropolis}

La tercera fase de desarrollo de Ethereum, que se lanzó en octubre de 2017.

### minado {#mining}

El proceso de hacer hash repetidamente de un encabezado de bloque mientras se incrementa un [nonce](#nonce) hasta que el resultado contenga un número arbitrario de ceros binarios a la izquierda. Este es el proceso mediante el cual se añaden nuevos [bloques](#block) a la cadena de bloques [de una prueba de trabajo](#blockchain). Así fue como se aseguró Ethereum antes de pasar a la [prueba de participación](#pos).

### minería {#miner}

Es un [nodo](#node) de red que encuentra [pruebas de trabajo](#pow) válidas para bloques nuevos, mediante el hashing de pase repetido (ver [Ethash](#ethash)). Los mineros ya no forman parte de Ethereum, fueron reemplazados por validadores cuando Ethereum se trasladó a la [prueba de participación](#pos).

<DocLink href="/developers/docs/consensus-mechanisms/pow/mining/">
  Minado
</DocLink>

### mint {#mint}

Acuñar (o mintear) es el proceso de crear nuevos tókenes y ponerlos en circulación para que puedan usarse. La creación de un nuevo token sin la participación de la autoridad central es un mecanismo descentralizado.

<Divider />

## N {#section-n}

### red {#network}

Si nos referimos a la red de Ethereum, se trata de una red de punto a punto que propaga transacciones y bloques a cada nodo de Ethereum (que participe en la red).

<DocLink href="/developers/docs/networks/">
  Redes
</DocLink>

### tasa de hash de red {#network-hashrate}

El [hashrate](#hashrate) colectivo producido por toda una red minera. La minería en Ethereum se desató cuando Ethereum pasó a la [prueba de participación](#pos).

### Tókenes No Fungibles (NFT) {#nft}

También conocido como «título de propiedad», se trata de un estándar de token presentado mediante la propuesta de ERC-721. Los NFT se pueden rastrear y comercializar, no obstante, cada token es único y distinto; no son intercambiables como ETH y [ los tókenes ERC-20](#token-standard). Los NFT pueden representar la propiedad de activos digitales o físicos.

<DocLink href="/nft/">
  Tókenes No Fungibles (NFT)
</DocLink>
<DocLink href="/developers/docs/standards/tokens/erc-721/">
  Estándar de token no fungible ERC-721
</DocLink>

### nodo {#node}

Un cliente de software que participa en la red.

<DocLink href="/developers/docs/nodes-and-clients/">
  Nodos y clientes
</DocLink>

### nonce {#nonce}

En criptografía, un valor que solo puede utilizarse una vez. Una cuenta nonce es un contador de transacciones en cada cuenta, que se utiliza para evitar ataques de repetición.

<Divider />

## O {#section-o}

### bloque ommer (tío) {#ommer}

Cuando un [minero de prueba de trabajo](#miner) encuentra un [bloque](#block) válido, otro minero puede haber publicado un bloque competidor que se agrega primero a la punta de la cadena de bloques. Esto es válido, pero el bloque obsoleto se puede incluir mediante bloques nuevos a modo de _ommers_ y recibir una recompensa parcial de bloque. El término «ommer» es el término de género neutral preferido para el hermano de un bloque padre, aunque algunas veces, se le denomina «tío». Esto era relevante para Ethereum cuando era una red [prueba de trabajo](#pow), pero los ommers no son una característica de [prueba de participación](#pos) Ethereum porque se selecciona precisamente un proponente de bloque en cada ranura.

### acumulaciones optimistas (Optimistic rollups) {#optimistic-rollup}

Un [rollup](#rollups) de transacciones que usan [pruebas de fraude](#fraud-proof) para ofrecer transacciones incrementadas en rendimiento en la [capa 2](#layer-2) mientras usa la seguridad proporcionada por la [red principal](#mainnet) (capa 1). A diferencia de [Plasma](#plasma), una solución de capa 2 parecida, las Optimistic rollups pueden gestionar tipos de transacciones más complejos; todos los que sean posibles en la [EVM](#evm). En comparación con los [Zero-knowledge Rollups](#zk-rollups), tienen problemas de latencia porque la transacción se puede desafiar mediante la prueba de fraude.

<DocLink href="/developers/docs/scaling/optimistic-rollups/">
  Rollups optimistas
</DocLink>

### Oráculos {#oracle}

Un oráculo es un puente entre la [cadena de bloques](#blockchain) y el mundo real. Actúan como [API en cadena](#api) que se pueden consultar para obtener información y usarse en [ contratos inteligentes](#smart-contract).

<DocLink href="/developers/docs/oracles/">
  Oráculos
</DocLink>

<Divider />

## P {#section-p}

### paridad {#parity}

Una de las implementaciones interoperables más destacadas del software cliente de Ethereum.

### par {#peer}

Ordenadores conectados que ejecutan el software cliente Ethereum que tienen copias idénticas de la [cadena de bloques](#blockchain).

### red entre pares {#peer-to-peer-network}

Una red de ordenadores ([peers](#peer)) que colectivamente son capaces de realizar funcionalidades sin la necesidad de servicios centralizados basados en servidores.

### Plasma {#plasma}

Una solución de escala fuera de la cadena que usa [pruebas de fraude](#fraud-proof), como [Optimistic rollups (acumulaciones optimistas)](#optimistic-rollups). Plasma se limita a transacciones simples como transferencias básicas de tókenes e intercambios.

<DocLink href="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### clave privada (clave secreta) {#private-key}

Un número secreto que permite a los usuarios de Ethereum probar la propiedad de una cuenta o contratos mediante la producción de una firma digital (consulte [clave pública](#public-key), [dirección](#address), [ECDSA](#ecdsa)).

### cadena privada {#private-chain}

Una cadena de bloques totalmente privada es aquella con acceso autorizado, que no está disponible públicamente para su uso.

### prueba de participación (PoS) {#pos}

Un método mediante el que un protocolo de cadena de bloques de criptomonedas intenta lograr el [consenso](#consensus) distribuido. La PoS solicita a los usuarios que demuestren la propiedad de una cierta cantidad de criptomonedas (su «participación» en la red) para poder participar en la validación de las transacciones.

<DocLink href="/developers/docs/consensus-mechanisms/pos/">
  Prueba de participación
</DocLink>

### prueba de trabajo (PoW, por sus siglas en inglés) {#pow}

Una cantidad de datos (la prueba) que precisa encontrar un cálculo significativo.

<DocLink href="/developers/docs/consensus-mechanisms/pow/">
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

<DocLink href="/developers/docs/smart-contracts/security/#re-entrancy">
  Reentrada
</DocLink>

### recompensa {#reward}

Una cantidad de ether incluida en cada nuevo bloque como recompensa que la red concede al [minero](#miner) que ha dado con la solución de la [prueba de trabajo](#pow).

### Prefijo de Longitud Recursiva (PRL) {#rlp}

Un estándar de codificación diseñado por los desarrolladores de Ethereum para codificar y serializar objetos (estructuras de datos) de complejidad y longitud arbitrarias.

### acumulaciones (rollups) {#rollups}

Un tipo de solución de escalabilidad de [capa 2](#layer-2) que agrupa varias transacciones y las envía a la [cadena principal de Ethereum](#mainnet) mediante una única transacción. Esto permite disfrutar de reducciones en el coste del [gas](#gas) y, como consecuencia, aumentos en el caudal de [transacciones](#transaction). Existen Optimistic Rollups (acumulaciones optimistas) y Zero-knowledge Rollups (acumulaciones de conocimiento cero) que utilizan diferentes métodos de seguridad para ofrecer estos beneficios de escalabilidad.

<DocLink href="/developers/docs/scaling/#rollups">
  Agregaciones
</DocLink>

<Divider />

### RPC {#rpc}

**Llamada de procedimiento remoto (RPC)** es un protocolo que un programa utiliza para solicitar un servicio de un programa ubicado en otro ordenador de una red sin tener que entender los detalles de la red.

## S {#section-s}

### Algoritmo Seguro de Hash (SHA) {#sha}

Una familia de funciones de hash criptográficas publicadas por el NIST (siglas del Instituto Norteamericano de Estándares y Tecnología).

### Serenity {#serenity}

El estado de desarrollo de Ethereum que inicio una serie de actualizaciones de escalabilidad y sustentabilidad, antes conocida como «Ethereum 2.0», o «Eth2».

<DocLink href="/roadmap/">
  Actualizaciones de Ethereum
</DocLink>

### serialización {#serialization}

El proceso de convertir una estructura de datos en una secuencia de bytes.

### fragmento/cadena de fragmentos {#shard}

Las cadenas de fragmentos son secciones discretas de la cadena de bloques total de las que pueden ser responsables los subconjuntos de validadores. Esto ofrecerá un mayor rendimiento de transacciones para Ethereum y mejorará la disponibilidad de datos para [capa 2](#layer-2) soluciones como [optimistic rollups](#optimistic-rollups) y [ZK-rollups](#zk-rollups).

<DocLink href="/roadmap/danksharding">
  Danksharding
</DocLink>

### cadena lateral {#sidechain}

Una solución escalable que utiliza una cadena separada con diferentes o la mayoría de las veces [reglas de consenso](#reglas-de-consenso). Se necesita un puente para conectar estas cadenas laterales a la [red principal](#mainnet). Los[rollups](#rollups)también usan cadenas laterales, pero trabajan en colaboración con la [red principal](#mainnet).

<DocLink href="/developers/docs/scaling/sidechains/">
  Cadenas laterales
</DocLink>

### firma {#signing}

Demostración criptográfica de que una transacción ha sido aprobada por el titular de una clave privada específica.

### singleton {#singleton}

Un término de programación informática que describe un objeto del que solamente puede existir una instancia única.

### recortador {#slasher}

Un recortador es una entidad que escanea certificaciones en busca de conductas deplorables que se puedan penalizar con recortes. Los acuchillamientos se transmiten a la red, y el siguiente proponente de bloques añade la prueba al bloque. El proponente de bloques recibe entonces una recompensa por acuchillar el validador malicioso.

### ranura {#slot}

Un período de tiempo (12 segundos) en el que un [validador](#validator) puede proponer nuevos bloques en el sistema de [prueba de participación](#pos). Una ranura puede estar vacía. 32 ranuras componen una [época](#epoch).

<DocLink href="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Prueba de participación
</DocLink>

### contrato inteligente {#smart-contract}

Un programa que se ejecuta en la infraestructura informática de Ethereum.

<DocLink href="/developers/docs/smart-contracts/">
  Introducción a los contratos inteligentes
</DocLink>

### SNARK {#snark}

SNARK significa «Succinct Non-Interactive Argument of Knowledge» o (argumento breve no interactivo de conocimiento), el cual es una [prueba de conocimiento cero](#prueba-de-conocimiento-cero).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Rollups de Conocimiento Cero
</DocLink>

### bifurcación suave {#soft-fork}

Una divergencia en una [cadena de bloques](#blockchain) que se produce cuando cambian las [reglas de consenso](#consensus-rules). A diferencia de una [bifurcación dura](#hard-fork), una bifurcación blanda es compatible con versiones anteriores; los nodos actualizados pueden validar los bloques creados por nodos no actualizados, siempre y cuando sigan las nuevas reglas de consenso.

### Solidity {#solidity}

Un lenguaje de programación (imperativo) procesal con sintaxis similar a JavaScript, C++ o Java. El lenguaje más popular y utilizado para los [contratos inteligentes](#smart-contract) de Ethereum. Creado por Dr. Gavin Wood.

<DocLink href="/developers/docs/smart-contracts/languages/#solidity">
  Solidez
</DocLink>

### Ensamblador en línea Solidity {#solidity-inline-assembly}

Lenguaje ensamblador de la [EVM](#evm) en un programa [Solidity](#solidity). La compatibilidad de Solidity con el ensamblado en línea facilita la escritura de determinadas operaciones.

### Spurious Dragon {#spurious-dragon}

Una [bifurcación dura](#hard-fork) de la cadena de bloques de Ethereum, que se produjo en el bloque 2.675.000 para abordar más vectores de ataque de denegación de servicio y limpiar el estado (consulta [Tangerine Whistle](#tangerine-whistle)). Además, es un mecanismo de protección de ataque por repetición (consulte [nonce](#nonce)).

### monedas estables {#stablecoin}

Un [token ERC-20](#token-standard) con un valor vinculado al valor de otro activo. Hay monedas estables respaldadas por monedas fiduciarias como dólares, metales preciosos como el oro y otras criptomonedas como el Bitcoin.

<DocLink href="/eth/#tokens">
  El ETH no es la única criptografía de Ethereum
</DocLink>

### apostar {#staking}

Depositar una cantidad de [ether](#ether) (su participación) para convertirse en un validador y asegurar la [red](#network). Un validador comprueba las [transacciones](#transaction) y propone [bloques](#block) bajo un modelo de consenso de [prueba de participación](#pos). Apostar le proporciona un incentivo económico para actuar en el mejor interés de la red. Obtendrá recompensas por llevar a cabo sus tareas como [validador](#validator), pero perderá cantidades diferentes de ETH si no las lleva a cabo.

<DocLink href="/staking/">
  Apueste sus ETH para convertirse en un validador de Ethereum
</DocLink>

### participaciones agrupadas {#staking-pool}

El ETH combinado de más de un participante de Ethereum, utilizado para alcanzar los 32 ETH necesarios para activar un conjunto de claves de validador. Un operador de nodo utiliza estas claves para participar en el consenso y las [recompensas de bloque](#block-reward) se dividen entre los participantes que contribuyen. Los grupos de participación o la delegación de participación no son nativos del protocolo Ethereum, pero la comunidad ha construido muchas soluciones.

<DocLink href="/staking/pools/">
  Participación agrupada
</DocLink>

### STARK {#stark}

STARK significa «argumento de conocimiento transparente escalable», el cual es un tipo de [prueba cero de conocimiento](#prueba-cero-de-conocimiento).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Agrupaciones de conocimiento cero
</DocLink>

### estado {#state}

Una instantánea de todos los saldos y datos en un momento determinado en la cadena de bloques, que normalmente se refiere a la condición en un bloque en particular.

### canales de estado {#state-channels}

Una solución de [capa 2](#layer-2) en la que un canal está configurado entre los participantes y les permite realizar transacciones de manera libre y económica. Solo se envía una [transacción](#transaction) para configurar el canal y cerrar el canal la cual es enviada a la [red principal](#mainnet). Esto permite realizar transacciones muy elevadas, pero depende en gran medida de si conocemos el número de participantes y el cierre de fondos por adelantado.

<DocLink href="/developers/docs/scaling/state-channels/#state-channels">
  Canales de estado
</DocLink>

### supermayoría {#supermajority}

Supermayoría es el término otorgado para una cantidad superior a 2/3 (66 %) del total del ether apostado que asegura Ethereum. Los bloques necesitan el voto de la supermayoría para [finalizar](#finalizado) en la cadena de baliza.

### sincronización {#syncing}

El proceso de descargar toda la última versión de una cadena de bloques en un nodo.

### comité de sincronización {#sync-committee}

Un comité de sincronización es un grupo seleccionado al azar de [validadores](#validator) que se actualizan cada ~27 horas. Su propósito es agregar sus firmas para validar los encabezados de los bloques. Los comités de sincronización permiten a los [clientes ligeros](#light-client) realizar un seguimiento de la cabeza de la cadena de bloques sin necesidad de acceder a todo el conjunto de validadores.

### szabo {#szabo}

Una denominación de [ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

Una [bifurcación dura](#hard-fork) de la cadena de bloques de Ethereum, que se produjo en el bloque 2.463.000 para cambiar el cálculo de [gas](#gas) para ciertas operaciones intensivas de E/S, así como para eliminar el estado acumulado de un ataque de denegación de servicio, que explotó el bajo coste de gas de esas operaciones.

### Dificultad Total Terminal (TTD) {#terminal-total-difficulty}

La dificultad total es la suma de la dificultad minera de Ethash para todos los bloques hasta algún punto específico de la cadena de bloques. La dificultad total terminal es un valor específico para la dificultad total que se utilizó como disparador para que los clientes de ejecución desactivaran sus funciones de minería y bloqueo de intercambio de información, lo que permite a la red hacer la transición a la prueba de participación.

### red de prueba {#testnet}

Una red que se usa para simular el comportamiento de la red principal de Ethereum (lea sobre la [red principal](#mainnet)).

<DocLink href="/developers/docs/networks/#ethereum-testnets">
  Redes de pruebas
</DocLink>

### token {#token}

Un bien virtual negociable definido en contratos inteligentes en la cadena de bloques Ethereum.

### estándar de token {#token-standard}

Presentado mediante la propuesta de ERC-20, esto proporciona una estructura de [contrato inteligente](#smart-contract) estandarizada para tókenes fungibles. A diferencia de los [NFT](#nft), a los tókenes de un mismo contrato se les puede hacer un seguimiento, comercializarlos y son intercambiables entre sí.

<DocLink href="/developers/docs/standards/tokens/erc-20/">
  Estándar de token ERC-20
</DocLink>

### transacción {#transaction}

Datos comprometidos con la cadena de bloques de Ethereum, firmados por una [cuenta](#account)originaria, con una [dirección](#address) específica. La transacción contiene metadatos como el [límite de gas](#gas-limit) para esa transacción.

<DocLink href="/developers/docs/transactions/">
  Transacciones
</DocLink>

### comisión de la transacción {#transaction-fee}

Una comisión que debe pagar siempre que utilice la red de Ethereum. Los ejemplos incluyen el envío de fondos desde su [cartera](#wallet) o una interacción [DApp](#dapp), como intercambiar tókenes o comprar un objeto de colección. Se puede entender como un cargo por servicio. Esta comisión cambiará según el nivel de actividad de la red. Esto se debe a que es probable que los [validadores](#validator), las personas responsables de procesar su transacción, dan prioridad a las transacciones con comosiones más altas, por lo que la congestión obliga a subir el precio.

A nivel técnico, sus comosiones de transacción están relacionadas con la cantidad de [gas](#gas) que requiera su transacción.

La reducción de las comosiones de transacción es un tema candente en este momento. Consulte [Capa 2](#layer-2).

### desconfianza {#trustlessness}

La capacidad de una red para mediar en las transacciones sin que ninguna de las partes involucradas tenga que confiar en un tercero.

### Turing completo {#turing-complete}

Un concepto que lleva el nombre del matemático y científico informático inglés Alan Turing. Un sistema de reglas de manipulación de datos (como el conjunto de instrucciones de un ordenador, un lenguaje de programación o un autómata celular) se dice que es «Turing completo» o «computacionalmente universal» si se puede utilizar para simular cualquier máquina de Turing.

<Divider />

## V {#section-v}

### validador {#validator}

Un [nodo](#node) en un sistema de [prueba de participación](#pos) responsable de almacenar datos, procesar transacciones y agregar nuevos bloques a la cadena de bloques. Para activar el software del validador, debe ser capaz de [participar con](#staking) 32 ETH.

<DocLink href="/developers/docs/consensus-mechanisms/pos">
  Prueba de participación
</DocLink>
<DocLink href="/staking/">
  Participación en Ethereum
</DocLink>

### ciclo de vida del validador {#validator-lifecycle}

La secuencia de estados en los que puede existir un validador. Estos incluyen:

- Depositado: el validador ha depositado al menos 32 ETH en el [contrato de depósito](#deposit-contract).
- Pendiente: el validador está en la cola de activación a la espera de ser votado en la red por los validadores existentes.
- Activo: actualmente certificando y proponiendo bloques.
- Recortando: penaliza a un validador que haya exhibido una mala conducta y se le está recortando.
- Salida: se ha señalado al validador como candidado para salir de la red, ya sea voluntariamente o porque haya sido expulsado.

### prueba de validez {#validity-proof}

Modelo de seguridad para ciertas soluciones de [capa 2](#layer-2) en las que, para aumentar la velocidad, las transacciones se [agrupan](/#rollups) en lotes y se envían a Ethereum en una única transacción. El cálculo de la transacción se realiza fuera de la cadena y, a continuación, se suministra a la cadena principal con una prueba de su validez. Este método aumenta la cantidad de transacciones posibles manteniendo la seguridad. Algunos [rollups](#rollups) utilizan [pruebas de fraude](#fraud-proof).

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Agrupaciones de conocimiento cero
</DocLink>

### validium {#validium}

Una solución fuera de la cadena que utiliza [pruebas de validación](#validity-proof) para mejorar el rendimiento de las transacciones. A diferencia de las [acumulaciones de conocimiento cero](#zk-rollup), los datos válidos no se almacenan en la capa 1 de la [red principal](#mainnet).

<DocLink href="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

Un lenguaje de programación de alto nivel con sintaxis de tipo Python. Se diseñó para acercarse a un lenguaje funcional puro. Creado por Vitalik Buterin.

<DocLink href="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### cartera {#wallet}

Un software que contiene [claves privadas](#private-key). Se utiliza para acceder y controlar las cuentas de [Ethereum](#account) e interactuar con [contratos inteligentes](#smart-contract). No es necesario almacenar las claves en una cartera y, además, se pueden recuperar del almacenamiento sin conexión (es decir, con una tarjeta de memoria o un papel) para mejorar la seguridad. A pesar de su nombre, las carteras nunca almacenan las monedas o tókenes reales.

<DocLink href="/wallets/">
  Carteras de Ethereum
</DocLink>

### Web 3.0 {#web3}

La tercera versión de la web. Propuesto por primera vez por el Dr. Gavin Wood, Web3 representa una nueva visión y enfoque para las aplicaciones web, desde aplicaciones de propiedad y gestión centralizada, hasta aplicaciones basadas en protocolos descentralizados (ver [DApp](#dapp)).

<DocLink href="/developers/docs/web2-vs-web3/">
  Web2 versus Web3
</DocLink>

### wei {#wei}

La denominación más pequeña de un [ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### dirección cero {#zero-address}

Una dirección de Ethereum, compuesta completamente de ceros, que se utiliza con frecuencia como dirección para eliminar los tókenes de la circulación de su propiedad. Se hace una distinción entre los tókenes eliminados formalmente del índice de un contrato inteligente a través del método burn() y los enviados a esta dirección.

### prueba de conocimiento cero {#zk-proof}

Una prueba de conocimiento cero es un método criptográfico que permite a los individuos probar que un enunciado o declaración es real sin tener que transmitir información adicional.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Agrupaciones de conocimiento cero
</DocLink>

### acumulación (rollup) de conocimiento cero {#zk-rollup}

Un [rollup](#rollups) de transacciones que utilizan [pruebas de validez](#validity-proof) a fin de ofrecer un aumento de los rendimientos de [capa 2](#layer-2), mientras se utiliza la seguridad proporcionada por la [red principal](#mainnet) (capa 1). Aunque no pueden gestionar tipos de transacción complejos, como [Optimistic Rollups](#optimistic-rollups), no tienen problemas de latencia porque las transacciones probablemente son válidas cuando se envían.

<DocLink href="/developers/docs/scaling/zk-rollups/">
  Acumulaciones de conocimiento cero
</DocLink>

<Divider />

## Fuentes {#sources}

_Proporcionado parcialmente en [Dominar Ethereum](https://github.com/ethereumbook/ethereumbook) por[Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) bajo CC-BY-SA_

<Divider />

## Contribuir a esta página {#contribute-to-this-page}

¿Nos hemos dejado algo? ¿Hay algo que no sea correcto? ¡Ayúdenos a mejorar contribuyendo con este glosario en GitHub!

[Más información sobre cómo contribuir.](/contributing/adding-glossary-terms)
