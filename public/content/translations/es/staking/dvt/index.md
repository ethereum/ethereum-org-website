---
title: Tecnología de validador distribuido
description: La tecnología de validador distribuido permite la operación distribuida de un validador de Ethereum por parte de múltiples partes.
lang: es
template: staking
sidebarDepth: 2
summaryPoints:
  - Divide la clave de firma de un validador entre múltiples máquinas y operadores, eliminando los puntos únicos de falla
  - Mantiene a los validadores en línea a pesar de fallas individuales de hardware, software u operadores
  - Infraestructura de producción utilizada hoy en día por quienes hacen staking en solitario, servicios de staking y opciones de staking conjunto
---

## ¿Qué es la tecnología de validador distribuido? {#what-is-dvt}

La tecnología de validador distribuido (DVT) es un enfoque para la seguridad del validador que distribuye la gestión de claves y las responsabilidades de firma entre múltiples partes, para reducir los puntos únicos de falla y aumentar la resiliencia del validador.

La DVT distribuye la gestión de claves y la firma al **dividir la clave privada** utilizada para asegurar un validador **entre muchas computadoras** organizadas en un "clúster". Hacer esto permite que algunos nodos del clúster se desconecten mientras se mantiene activo el nodo validador, ya que el trabajo de validación necesario puede ser realizado por un subconjunto de las máquinas en cada clúster. Esta distribución reduce los puntos únicos de falla, haciendo que el validador sea más robusto. Un beneficio adicional de la distribución de firmas de la DVT es que hace que sea muy difícil para los atacantes obtener acceso a la clave, porque no se almacena completa en ninguna máquina individual.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

La DVT no es una forma separada de hacer staking. Es una capa de software que cualquier configuración de staking puede utilizar:
- [Quienes hacen staking en solitario](/staking/solo/) pueden unirse para ejecutar un validador juntos, o un individuo que hace staking en solitario puede usar la DVT para agregar resiliencia a su configuración de staking en solitario.
- Los [servicios de staking](/staking/saas/) y las opciones de [staking conjunto](/staking/pools/) pueden usar la DVT para agregar resiliencia y fortalecer su infraestructura de staking, o para distribuir las operaciones del validador entre muchos operadores independientes.

## ¿Por qué necesitamos la DVT? {#why-do-we-need-dvt}

### Seguridad {#security}

Los validadores generan dos pares de claves público-privadas: claves de validador para participar en el consenso y claves de retiro para acceder a los fondos. Mientras que los validadores pueden asegurar las claves de retiro en almacenamiento en frío, las claves privadas del validador deben estar en línea las 24 horas del día, los 7 días de la semana, para firmar las tareas que se le asignan al validador en todo momento, como las atestaciones y las propuestas de bloques. Mantener una clave en línea la expone a robos, y la DVT limita esa exposición: solo las partes de la clave están en línea, nunca la clave completa.

Si la clave privada de un validador se ve comprometida, un atacante puede controlar el validador, lo que podría llevar a un recorte o a la pérdida de los ETH de quien hace staking. La DVT mitiga este riesgo. Con la DVT, la clave de validador original y completa se cifra y se divide en partes de clave. Las partes de la clave viven en línea, distribuidas en múltiples nodos que operan el validador juntos, mientras que la clave 'maestra' completa permanece segura fuera de línea. La distribución es posible porque los validadores de [Ethereum](/) usan firmas BLS que son aditivas, lo que significa que la clave completa se puede reconstruir sumando sus partes componentes. Las firmas parciales realizadas con las partes de la clave se combinan en una firma que es válida para la clave completa, por lo que la clave completa en sí nunca es necesaria para la firma diaria. Cuando un clúster genera una nueva clave de validador utilizando la generación de claves distribuidas, la clave privada completa nunca existe en ninguna máquina individual.

### Sin puntos únicos de falla {#no-single-point-of-failure}

Cuando un validador se divide entre múltiples operadores y múltiples máquinas, puede soportar fallas individuales de hardware y software sin desconectarse. El riesgo de fallas también se puede reducir utilizando diversas configuraciones de hardware y software en los nodos de un clúster. La distribución multioperador no está disponible de forma nativa para las configuraciones de validador de un solo nodo; proviene de la capa de middleware de la DVT.

Si uno de los componentes de una máquina en un clúster se cae (por ejemplo, si hay cuatro operadores en un clúster de validadores y uno usa un cliente específico que tiene un error), los demás pueden asegurarse de que el validador siga funcionando.

### Descentralización {#decentralization}

El escenario ideal para Ethereum es tener tantos validadores operados de forma independiente como sea posible. Sin embargo, unos pocos proveedores de staking se han vuelto muy populares y representan una parte sustancial del total de ETH en staking en la red. La DVT puede permitir que estos operadores existan mientras se preserva la descentralización de la participación. Esto se debe a que las claves de cada validador se distribuyen en muchas máquinas y se necesitaría una colusión mucho mayor para que un validador se vuelva malicioso.

Sin la DVT, es más fácil para los proveedores de staking admitir solo una o dos configuraciones de cliente para todos sus validadores, lo que aumenta el impacto de un error del cliente. La DVT se puede utilizar para distribuir el riesgo entre múltiples configuraciones de clientes y diferentes hardware, creando resiliencia a través de la diversidad.

**La DVT ofrece los siguientes beneficios a Ethereum:**

1. **Descentralización** del consenso de prueba de participación (PoS) de Ethereum
2. Garantiza la **vitalidad** de la red
3. Crea **tolerancia a fallas** del validador
4. Operación del validador con **confianza minimizada**
5. Riesgos de **recorte** y tiempo de inactividad **minimizados**
6. **Mejora la diversidad** (cliente, centro de datos, ubicación, regulación, etc.)
7. **Seguridad mejorada** en la gestión de claves del validador

## ¿Cómo funciona la DVT? {#how-does-dvt-work}

Las implementaciones de DVT generalmente se ejecutan como una pieza de software adicional en cada máquina de un clúster. Este software actúa como middleware, situándose entre el cliente de validador de un nodo y su cliente de consenso, donde se coordina con los otros nodos del clúster para que las tareas del validador se firmen colectivamente.

Una solución DVT contiene los siguientes componentes:

- **[Esquema de secreto compartido de Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)**: los validadores usan [claves BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Una clave privada de validador se puede dividir en múltiples "partes de clave", y debido a que las firmas BLS son aditivas, las firmas parciales realizadas con esas partes de clave se pueden combinar en una sola firma que es válida para la clave de validador completa.
- **[Esquema de firma de umbral](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)**: determina la cantidad de partes de clave individuales que se requieren para las tareas de firma, por ejemplo, 3 de 4.
- **[Generación de claves distribuidas (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)**: proceso criptográfico que genera las partes de la clave y se utiliza para distribuir las partes de una clave de validador existente o nueva a los nodos de un clúster.
- **[Computación multiparte (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)**: la clave de validador completa se genera en secreto mediante computación multiparte. Ningún operador individual conoce la clave completa; solo conocen su propia parte de ella (su "parte").
- **Protocolo de consenso**: el protocolo de consenso selecciona un nodo para que sea el proponente de bloque. Comparten el bloque con los otros nodos del clúster, quienes agregan sus partes de clave a la firma agregada. Cuando se han agregado suficientes partes de clave, el bloque se propone en Ethereum.

Los validadores distribuidos tienen tolerancia a fallas incorporada y pueden seguir funcionando incluso si algunos de los nodos individuales se desconectan. El clúster del nodo validador es resiliente incluso si algunos de los nodos dentro de él resultan ser maliciosos o perezosos.

## La DVT en producción {#dvt-in-production}

Los validadores distribuidos se ejecutan en la Red principal hoy en día a través del staking en solitario, como servicio y conjunto. Dos redes representan la mayor parte de esta actividad:

<ProductDisclaimer />

- **Obol** desarrolla Charon, un cliente de middleware DVT de código abierto que permite que un clúster de máquinas opere un validador en conjunto ("staking en escuadrón"). Los grupos realizan la generación de claves distribuidas y configuran su clúster a través del [DV Launchpad](https://docs.obol.org/learn/readme/launchpad) de Obol. Los clústeres de Obol son utilizados en producción por [protocolos de staking](/staking/pools/) y [servicios de staking](/staking/saas/), incluido el módulo Simple DVT de Lido y el programa Operation Solo Staker de EtherFi, que incorpora a operadores domésticos en clústeres tolerantes a fallas.
- **SSV Network** es una red sin permisos de operadores de nodos independientes. Una clave de validador se divide en partes de clave y se distribuye a un conjunto elegido de operadores, quienes realizan las tareas del validador de manera colectiva; ningún operador individual posee la clave completa. Los servicios y pools de staking ejecutan grandes conjuntos de validadores en SSV y, al igual que Obol, es utilizado por el módulo Simple DVT de Lido.

## Casos de uso de la DVT {#dvt-use-cases}

La DVT tiene implicaciones significativas para la industria del staking en general:

### Quienes hacen staking en solitario {#solo-stakers}

La DVT permite el **staking en escuadrón**: un pequeño grupo de personas, como amigos, miembros de la comunidad o extraños coordinados a través de un launchpad, que ejecutan colectivamente un solo validador en sus propias máquinas. Un umbral del grupo (por ejemplo, 3 de 4) debe estar en línea para que el validador realice sus tareas, por lo que el tiempo de inactividad, la falla de hardware o el error de ningún miembro individual desconecta al validador. Cuando la clave se crea con la generación de claves distribuidas, ningún miembro posee la clave de firma completa.

La DVT también permite el staking sin custodia al permitirle distribuir su clave de validador en nodos remotos mientras mantiene la clave completa completamente fuera de línea. Esto significa que quienes hacen staking no necesariamente necesitan ejecutar su propio hardware, y la distribución de las partes de la clave ayuda a proteger contra posibles hackeos.

### Staking como servicio (SaaS) {#saas}

Los operadores (como los pools de staking conjunto y quienes hacen staking institucional) que gestionan muchos validadores pueden usar la DVT para reducir su riesgo. Al distribuir su infraestructura, pueden agregar redundancia a sus operaciones y diversificar los tipos de hardware que utilizan.

La DVT comparte la responsabilidad de la gestión de claves entre múltiples nodos, lo que significa que algunos costos operativos también se pueden compartir. La DVT también puede reducir el riesgo operativo y los costos de seguro para los proveedores de staking.

### Pools de staking conjunto {#staking-pools}

Debido a las configuraciones estándar de los validadores, los pools de staking conjunto y los proveedores de staking líquido históricamente tuvieron que depositar una confianza significativa en cada operador individual, ya que las ganancias y pérdidas se socializan en todo el pool. También dependían de los operadores para salvaguardar las claves de firma porque, hasta la DVT, no había otra opción para ellos.

Aunque tradicionalmente se hacen esfuerzos para distribuir el riesgo distribuyendo las participaciones entre múltiples operadores, cada operador aún gestiona una participación significativa de forma independiente. Depender de un solo operador plantea riesgos inmensos si tienen un rendimiento inferior, experimentan tiempo de inactividad, se ven comprometidos o actúan de forma maliciosa.

Al aprovechar la DVT, se puede reducir la confianza requerida de cada operador individual. **Los pools pueden permitir que los operadores mantengan participaciones sin necesitar la custodia de las claves del validador** (ya que solo se utilizan partes de la clave). También permite que las participaciones gestionadas se distribuyan entre más operadores (por ejemplo, en lugar de tener un solo operador gestionando 1000 validadores, la DVT permite que esos validadores sean ejecutados colectivamente por múltiples operadores). Las diversas configuraciones de operadores ayudan a garantizar que si un operador se cae, los demás aún podrán atestar. La redundancia y diversificación resultantes pueden conducir a un mejor rendimiento y resiliencia, al tiempo que maximizan las recompensas.

Otro beneficio de minimizar la confianza en un solo operador es que los pools de staking conjunto pueden permitir una participación de operadores más abierta y sin permisos. Algunos pools de staking conjunto hacen esto en producción hoy en día. Los clústeres DVT multioperador permiten que los protocolos emparejen a quienes hacen staking desde casa y a operadores más pequeños con profesionales más grandes, combinando conjuntos de operadores seleccionados y sin permisos.

## Posibles inconvenientes de usar la DVT {#potential-drawbacks-of-using-dvt}

- **Componente adicional**: la introducción de un nodo DVT agrega otra parte que posiblemente puede ser defectuosa o vulnerable. Esto se mitiga al tener múltiples implementaciones de software DVT, al igual que hay múltiples clientes para las capas de consenso y de ejecución.
- **Costos operativos**: como la DVT distribuye el validador entre múltiples partes, se requieren más nodos para la operación en lugar de un solo nodo, lo que introduce mayores costos operativos.
- **Latencia potencialmente mayor**: dado que la DVT utiliza un protocolo de consenso para lograr el consenso entre los múltiples nodos que operan un validador, puede introducir potencialmente una mayor latencia.

## Preguntas frecuentes {#faq}

<ExpandableCard title="¿Necesito DVT para hacer staking?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
No. Una sola máquina que ejecuta un cliente de validador funciona sin ningún software DVT, y esta sigue siendo una configuración común de staking en casa. La DVT es una capa opcional que agrega tolerancia a fallas y elimina los puntos únicos de falla. Esto es útil si desea que su validador sobreviva a fallas de máquinas individuales, o si desea compartir la responsabilidad de ejecutar un validador con otros.
</ExpandableCard>

<ExpandableCard title="¿DVT divide mi ETH o mis claves de retiro?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
No. La DVT divide solo la clave de _firma_ del validador, que se utiliza para tareas de consenso como atestaciones y propuestas de bloques. Su participación siempre está controlada por la dirección de retiro establecida para el validador, que no se ve afectada por la DVT. Desde la actualización Pectra, el titular de la dirección de retiro también puede activar una salida del validador directamente desde la capa de ejecución, sin necesitar la clave de firma en absoluto.
</ExpandableCard>

<ExpandableCard title="¿Qué pasa si los nodos de un clúster se desconectan?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Mientras un umbral de nodos permanezca en línea (por ejemplo, 3 de 4), el validador sigue realizando sus tareas. Si demasiados nodos se desconectan a la vez, el validador simplemente se desconecta y pierde recompensas hasta que regresen suficientes nodos, al igual que cualquier validador fuera de línea. Desconectarse no es una ofensa sujeta a recorte.
</ExpandableCard>

<ExpandableCard title="¿Un clúster tiene que ser de 3 de 4?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
No. "3 de 4" es solo la configuración común más pequeña, y se utiliza como ejemplo a lo largo de esta página. El tamaño del clúster y el umbral de firma se eligen cuando se crea el clúster.

Los clústeres generalmente tienen un tamaño tal que el umbral es una supermayoría de dos tercios de los nodos, que es lo que permite que el clúster siga firmando mientras tolera miembros defectuosos o fuera de línea. Un clúster de 4 nodos firma con 3 y tolera 1 falla; 7 nodos firman con 5 y toleran 2; 10 nodos firman con 7 y toleran 3. Los clústeres más grandes compran más tolerancia a fallas a costa de más máquinas para ejecutar y más coordinación entre ellas.

[Más sobre el tamaño y la resiliencia del clúster](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="¿Es DVT lo mismo que el staking conjunto?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
No. El staking conjunto combina ETH de muchas personas para financiar validadores, y es una de las varias [formas de hacer staking](/staking/). La DVT es infraestructura para _operar_ un validador. Distribuye la firma de un validador entre múltiples máquinas y operadores. Los dos son complementarios; muchos pools usan la DVT para distribuir sus conjuntos de operadores, pero la DVT en sí no agrupa los ETH de nadie.
</ExpandableCard>

## Más información {#further-reading}

- [Tecnología de validador distribuido (DVT) de Ethereum: introducción completa](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [¿Qué es la DVT y cómo mejora el staking en Ethereum?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Especificaciones del validador distribuido de Ethereum (alto nivel)](https://github.com/ethereum/distributed-validator-specs)
- [Especificaciones técnicas del validador distribuido de Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Documentación de Obol](https://docs.obol.org/)
- [Documentación de SSV Network](https://docs.ssv.network/)
- [Módulo Simple DVT de Lido](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [Aplicación de demostración del esquema de secreto compartido de Shamir](https://iancoleman.io/shamir/)