---
title: "¿El código es ley? Explicación de los contratos inteligentes"
description: "Explorando el concepto de 'el código es ley' a través de la perspectiva de los contratos inteligentes en Ethereum y las DeFi. Este video cubre qué son los contratos inteligentes, cómo funcionan y la cuestión filosófica de si el código debería ser el árbitro definitivo."
lang: es
youtubeId: "pWGLtjG-F5c"
uploadDate: 2020-11-18
duration: "0:15:25"
educationLevel: beginner
topic:
  - "smart-contracts"
format: explainer
author: Finematics
breadcrumb: "Contratos inteligentes"
---

Una explicación de **Finematics** que explora el concepto de "el código es ley" a través de la perspectiva de los contratos inteligentes en Ethereum, cubriendo qué son los contratos inteligentes, cómo funcionan, sus ventajas sobre los contratos tradicionales y por qué son los componentes básicos de las finanzas descentralizadas (DeFi).

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=pWGLtjG-F5c) publicada por Finematics. Ha sido ligeramente editada para facilitar su lectura.*

#### Introducción (0:00) {#introduction-000}

¿Alguna vez ha escuchado la expresión "el código es ley", donde la tecnología se utiliza para hacer cumplir las reglas? En ese caso, ¿siquiera necesitamos abogados? O tal vez podamos vivir en un mundo totalmente automatizado donde el código dicte lo que podemos y no podemos hacer. Con el desarrollo actual de los contratos inteligentes, este escenario futurista puede estar más cerca de lo que pensamos.

Un contrato inteligente es un fragmento de código que puede ejecutarse automáticamente y de forma determinista. El código del contrato inteligente generalmente se almacena y ejecuta en la cadena de bloques para que sea seguro y sin necesidad de confianza. Los contratos inteligentes también tienen la capacidad de recibir, almacenar y enviar fondos, e incluso de llamar a otros contratos inteligentes. Siguen la semántica "si-entonces" (if-then), lo que los hace bastante fáciles de programar.

Los contratos inteligentes tienen como objetivo eliminar el factor humano de la toma de decisiones. A menudo se ha demostrado que el factor humano es el elemento más propenso a errores y menos confiable de los contratos tradicionales estándar.

Una máquina expendedora surge muy a menudo como una buena analogía de un contrato inteligente, ya que comparte algunas similitudes. Una máquina expendedora típica está programada de una manera que permite ciertas acciones y transiciones de estado basadas en la entrada. También funciona de una manera totalmente determinista. Por ejemplo, si desea comprar una lata de refresco que cuesta dos dólares y solo tiene un dólar, no importa cuántas veces lo intente, no podrá obtener la bebida. Por otro lado, si inserta tres dólares, la máquina le dará una lata de refresco y el cambio adecuado. Incluso el cambio entregado se selecciona de una manera predefinida y programada en función de qué monedas están disponibles y de cuáles monedas la máquina quiere deshacerse primero.

Un contrato inteligente puede depender puramente de la información disponible en la cadena de bloques; por ejemplo, "si me das diez tokens A, te daré diez tokens B". O puede depender de una fuente de datos externa, por ejemplo, del precio de ETH o del S&P 500. Este último ejemplo hace que los contratos inteligentes sean más difíciles, ya que tienen que confiar en datos del mundo real. La confianza necesaria se puede minimizar utilizando servicios de oráculo, pero incluso en los servicios de oráculo hay que confiar. Ya hay algunos proyectos que, mediante el uso de ciertos incentivos, hacen que sea más probable que los oráculos proporcionen datos correctos. Chainlink es un proyecto que destaca claramente en esta categoría.

#### Contratos inteligentes de Ethereum (3:09) {#ethereum-smart-contracts-309}

Ethereum es una cadena de bloques que soporta contratos inteligentes y hace posible que un programador implemente sus propios contratos inteligentes. Un contrato inteligente se puede escribir en un lenguaje de programación llamado Solidity, que fue creado específicamente para ese propósito. En Ethereum, todos los contratos inteligentes implementados son inmutables; esto significa que una vez implementados, no se pueden modificar, lo que crea ciertos riesgos que discutiremos más adelante.

Los contratos inteligentes en Ethereum también son descentralizados, lo que significa que no hay una sola máquina controlando el contrato. De hecho, todos los nodos de la red Ethereum almacenan el mismo contrato con exactamente el mismo estado. Aunque Ethereum es actualmente la plataforma de contratos inteligentes de propósito general más popular, no es la única y tiene algunos competidores, incluyendo Cardano, Tezos, EOS y Tron, pero no todos comparten las mismas características.

#### Definición de contrato inteligente (4:23) {#smart-contract-definition-423}

El término "contrato inteligente" fue acuñado por el conocido criptógrafo Nick Szabo a principios de la década de 1990. El nombre, aunque no es el más autoexplicativo, se popularizó y se usa comúnmente, especialmente en la industria de la cadena de bloques. Para ver los beneficios de los contratos inteligentes, comparemos un contrato inteligente hipotético con su equivalente en el espacio tradicional.

#### Ejemplo de contrato inteligente (4:46) {#smart-contract-example-446}

Digamos que queremos escribir el siguiente contrato: si Alice envía X cantidad de tokens A y Bob envía la misma cantidad de tokens B, los tokens se intercambiarán (Alice recibirá los tokens de Bob y Bob recibirá los tokens de Alice).

En un mundo sin contratos inteligentes, una forma de lograrlo sin que Alice tenga que confiar en Bob y Bob tenga que confiar en Alice sería crear un contrato de depósito en garantía (escrow) con un tercero. El tercero recolectaría los tokens A de Alice, esperaría la misma cantidad de tokens B de Bob y enviaría a Alice y a Bob los respectivos tokens intercambiados.

#### Problemas de los contratos inteligentes (5:45) {#smart-contract-problems-545}

Este enfoque ya muestra algunos problemas a los que Alice y Bob podrían enfrentarse:

- **Confiar en intermediarios**: no hay garantía de que el tercero no huya con los tokens después de recibir los fondos de Alice y Bob. Tenemos que depender de la reputación del intermediario y de un posible seguro.
- **Resultados no deterministas**: si algo sale mal, puede tener diferentes resultados dependiendo de múltiples factores, incluida la jurisdicción donde se resolvería un posible caso.

Por otro lado, un contrato inteligente funcionaría de una manera totalmente automatizada y determinista, asegurándose de que ambas partes reciban los fondos cuando cumplan con los criterios iniciales de depositar los tokens. Los contratos inteligentes también pueden mantener fondos dentro de sí mismos, lo cual no es posible lograr en el mundo tradicional.

#### Velocidad (6:47) {#speed-647}

Dependiendo del intermediario, Alice y Bob pueden tener que esperar incluso unos días o semanas para liquidar la transición de los tokens. ¿Qué pasa si quieren hacer un intercambio de tokens un domingo y el intermediario no está operando? Con los contratos inteligentes, este tipo de problemas desaparecen y el contrato puede cumplirse segundos después de que se cumplan los criterios iniciales.

#### Costo (7:16) {#cost-716}

Los contratos tradicionales no solo son costosos debido al intermediario que tiene que obtener ganancias; también existe un gran riesgo de costos ocultos por cosas como el arbitraje y la ejecución si hay algún problema con el contrato.

La reutilización es otra ventaja: el mismo contrato inteligente responsable del intercambio de los tokens de Alice y Bob podría ser utilizado por cualquier otra persona que quiera hacer un intercambio de tokens. En el mundo tradicional, todos tendrían que firmar contratos separados y pagar las tarifas respectivas al intermediario.

#### Fraude (7:58) {#fraud-758}

El fraude es otro costo oculto, esta vez para el propio intermediario. El intermediario tendría que asegurarse de que los tokens tanto de Alice como de Bob sean legítimos antes de iniciar un intercambio. El fraude es muy común en las finanzas tradicionales, y la mayoría de las empresas tienen enormes equipos trabajando puramente en la prevención del fraude. Con los contratos inteligentes, los tokens se pueden verificar en la cadena de bloques y, con las firmas digitales, queda claro de inmediato si tanto Alice como Bob son elegibles para gastar sus tokens.

#### Casos de uso (8:42) {#use-cases-842}

Los contratos inteligentes tienen un número creciente de casos de uso que van desde pagos y finanzas descentralizadas (DeFi) hasta cadenas de suministro y financiamiento colectivo (crowdfunding). Los contratos inteligentes también son los componentes básicos de las aplicaciones descentralizadas (dapps).

#### DeFi (9:07) {#defi-907}

Las finanzas descentralizadas (DeFi) son una de las nuevas industrias que dependen en gran medida de los contratos inteligentes. Algunas de las cosas que ya se han construido en este espacio incluyen:

- **Monedas estables descentralizadas**: con un uso inteligente de los contratos inteligentes y ciertos incentivos, podemos crear una moneda estable vinculada al dólar estadounidense sin tener que almacenar dólares en el mundo real. MakerDAO es uno de los proyectos que hace esto posible.
- **Provisión automatizada de liquidez**: un conjunto de contratos inteligentes puede permitir a los usuarios proporcionar liquidez e intercambiar tokens de una manera completamente descentralizada y sin permisos. Uniswap y Kyber Network son buenos ejemplos de tales protocolos.

#### Financiamiento colectivo y cadenas de suministro (10:05) {#crowdfunding-and-supply-chains-1005}

Otro caso de uso es proporcionar más transparencia a las cadenas de suministro, donde entran en juego protocolos como OriginTrail. Cuando se trata de financiamiento colectivo, puede imaginar un contrato que desbloquee fondos tan pronto como se cumplan ciertos objetivos y sean verificados por la comunidad.

#### Futuros contratos inteligentes (10:29) {#future-smart-contracts-1029}

¿Qué pasaría si los contratos inteligentes pudieran facilitar cosas como viajes compartidos, alquileres de apartamentos y mucho más? ¿Qué hay de la caridad? Puede imaginar un fondo totalmente automatizado que enviaría dinero directamente a las personas que más lo necesitan, sin ningún intermediario. Por ejemplo, el fondo podría determinar que una cierta región fue azotada por un huracán y redirigir los fondos a esa parte del mundo. Por ahora, suena bastante imposible, pero todos los elementos necesarios para hacer que algo así suceda se están construyendo en este momento.

Los casos de uso para los contratos inteligentes son casi infinitos, pero antes de que podamos lograr todo eso, tenemos que abordar algunos problemas:

- **Errores (bugs)**: uno de los principales riesgos cuando se trata de contratos inteligentes es algo que persigue a cualquier otro software. El mejor ejemplo es el hackeo de The DAO, que resultó en la pérdida de millones de dólares en ether, ya que el atacante pudo drenar los fondos del contrato inteligente. Esto provocó que Ethereum realizara una bifurcación dura y creó mucho desacuerdo en la comunidad de Ethereum. Desde el hackeo de The DAO, la comunidad de Ethereum ha ideado muchas medidas de seguridad adicionales. En la actualidad, casi todos los contratos inteligentes populares han pasado por una auditoría de seguridad, a menudo por múltiples equipos. También hay una tendencia a utilizar métodos de verificación formal para demostrar que ciertos contratos siempre se comportarán de la manera esperada.
- **Cambios en el protocolo**: incluso si un contrato inteligente no tiene errores y ha sido auditado, todavía no podemos garantizar que un cambio a nivel de plataforma no cause problemas. Una actualización del protocolo en sí puede hacer que ciertos contratos inteligentes comiencen a comportarse de manera diferente a lo esperado.
- **Datos del mundo real**: los servicios de oráculo pueden proporcionar una forma confiable de llevar información del mundo real a la cadena de bloques. Pero imagine que alquiló un apartamento o un automóvil y causó algún daño accidental. ¿Cómo podría un contrato inteligente, sin ninguna intervención humana, saberlo? Hay múltiples ejemplos en los que es difícil imaginar cómo algo inesperado que sucede en el mundo real puede ser visible para un contrato inteligente.

Además de lo anterior, también existen riesgos relacionados con la regulación y los impuestos, pero todos estos pueden resolverse eventualmente.

#### ¿Podemos reemplazar a los abogados? (13:58) {#can-we-replace-lawyers-1358}

Entonces, ¿podemos realmente reemplazar a los abogados con código? No del todo, al menos no en este momento. En el futuro, es probable que cada vez más contratos estén automatizados, especialmente en las finanzas. Pero incluso en un mundo totalmente automatizado, los abogados pueden proporcionar conocimientos valiosos que pueden traducirse en código. También hay muchos desafíos regulatorios en torno a la industria cripto que mantendrán a los abogados muy ocupados por un tiempo. Sin embargo, si yo fuera abogado, comenzaría a aprender sobre contratos inteligentes y programación, ya que jugarán un papel importante en el futuro.

#### Resumen (14:53) {#summary-1453}

Ventajas de los contratos inteligentes:

- Totalmente automatizados
- Resultados deterministas
- Sin necesidad de confianza
- Rápidos, precisos y seguros
- Rentables y transparentes

Desventajas de los contratos inteligentes:

- Errores de software (bugs)
- Cambios en el protocolo
- Incertidumbre regulatoria y fiscal

Aunque los contratos inteligentes conllevan ciertos riesgos, todavía estamos en una etapa muy temprana y la mayoría de los problemas actuales tienen solución.