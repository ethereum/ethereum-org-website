---
title: Tecnología de validador distribuido
description: La tecnología de valor distribuido (o DVT) permite la operación de un validador de Ethereum distribuida por varias partes.
lang: es
---

# Tecnología de validadores distribuidos {#distributed-validator-technology}

La tecnología de validador distribuido (DVT) es un enfoque para la seguridad del validador que reparte la gestión de claves y la firma de responsabilidades entre varias partes, para reducir puntos únicos de fallo, e incrementar la resiliencia del validador.

Esto se logra **dividiendo la clave privada** que protege a un validador **en varias computadoras** organizadas en un "clúster". El beneficio de aporta es que se hace muy difícil que los atacantes puedan acceder a la clave, porque no se almacena completamente en una sola máquina. También permite que algunos nodos se desconecten, ya que la firma necesaria puede ser hecha por un subconjunto de las máquinas en cada cluster. Esto reduce los puntos únicos de fallo de la red y hace que el validador entero sea más robusto.

![Un diagrama que muestra cómo una única clave de validador se divide en partes y se distribuye a varios nodos con diferentes componentes.](./dvt-cluster.png)

## ¿Por qué necesitamos la DVT? {#why-do-we-need-dvt}

### Seguridad {#security}

Los validadores generan dos pares de claves público-privadas: claves validadoras para participar en un consenso y claves de retiro para acceder a fondos. Mientras que los validadores pueden asegurar claves de retirada en almacenamiento en frío, las claves privadas de los validadores deben estar en línea constantemente. Si una clave privada del validador se ve afectada, un atacante puede controlar el validador, lo que potencialmente conduce a un recorte o a la pérdida de un participante ETH. DVT puede ayudar a mitigar este riesgo. He aquí la forma de hacerlo:

Mediante el uso de DVT, los participantes pueden participar en la apuesta mientras mantienen la clave privada del validador en el almacenamiento en frío. Esto se consigue cifrando la clave original y completa del validador, para después dividirla en claves compartidas. Las claves compartidas en línea y se distribuyen a múltiples nodos que permiten la operación distribuida del validador. Esto es posible porque los validadores de Ethereum utilizan firmas BLS que son aditivas, lo que significa que la clave completa puede ser reconstruida sumando sus partes componentes. Esto permite al participante mantener la clave «maestra» del validador completa y original de forma segura sin conexión.

### Sin puntos únicos de fallo {#no-single-point-of-failure}

Cuando un validador se divide entre distintos operarios y equipos, puede soportar fallos puntuales del hardware y del software sin desconectarse. Además, se puede reducir el riesgo de fallos utilizando distintas configuraciones para el hardware y el software en los nodos de un clúster. Esta capacidad de recuperación no está a disposición de las configuraciones de validador de nodo único: se origina en la capa DVT.

En caso de que uno de los componentes de una máquina en un clúster dejara de funcionar (por ejemplo, si hubiera cuatro operadores en un clúster de validador y uno de ellos utilizara un cliente determinado que presentara un fallo), el resto se encargaría de que el validador siguiera funcionando.

### Descentralización {#decentralization}

La situación ideal para Ethereum es contar con el mayor número posible de validadores operados de forma independiente. Sin embargo, un número reducido de proveedores de participaciones ha adquirido gran popularidad y representa una parte considerable del total de ETH apostado en la red. La DVT puede conseguir que estos operadores sigan existiendo al tiempo que mantiene la descentralización de la participación. Esto se debe a que las claves de cada validador se reparten entre muchas máquinas y para que un validador se vuelva malicioso se requeriría una mayor confabulación.

Sin la DVT es más sencillo que los proveedores de participación admitan sólo una o dos configuraciones de cliente para todos sus validadores, lo que incrementa el alcance de un fallo en el cliente. La DVT puede servir para distribuir el riesgo entre varias configuraciones de cliente y diferente hardware, lo que genera capacidad de recuperación mediante la diversidad.

**La DVT supone ventajas para Ethereum:**

1. **Descentralización** del consenso de prueba de participación (proof-of-stake) de Ethereum
2. Garantiza la **disponibilidad** de la red
3. Crea **tolerancia a fallos** en los validadores
4. Operación de validadores con **confianza minimizada**
5. Riesgos de **corte** y tiempo de inactividad **minimizados**
6. **Mejora la diversidad** (cliente, centro de datos, ubicación, regulación, etc.)
7. **Mayor seguridad** en la gestión de claves de validadores

## ¿Cómo funciona la DVT? {#how-does-dvt-work}

Una solución DVT contiene los siguientes componentes:

- **[Shamir's secret sharing](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Los validadores utilizan [claves BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Las «acciones clave» individuales de BLS («acciones clave») pueden combinarse en una única clave agregada (firma). En DVT, la clave privada para un validador es la firma BLS combinada de cada operador en el clúster.
- **[Threshold signature scheme](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Determina el número de fragmentos individuales de clave necesarios para firmar, por ejemplo, 3 de 4.
- **[Distributed key generation (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Proceso criptográfico que genera los fragmentos de clave y permite distribuir partes de una clave de validador existente o nueva a los nodos de un clúster.
- **[Multiparty computation (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - La clave completa del validador se genera en secreto usando computación multipartita. Ningún operador conoce la clave completa —solamente conocen su parte (su «fracción»).
- **Protocolo de consenso** - El protocolo de consenso selecciona un nodo para que sea el proponente de bloque. Comparten el bloque con los otros nodos del clúster, los cuales agregan sus fragmentos de clave a la firma agregada. Cuando se han agregado suficientes fragmentos de clave, el bloque se propone en Ethereum.

Los validadores distribuidos incorporan tolerancia a fallos y pueden continuar funcionando incluso si algunos de los nodos individuales se desconecta. Esto quiere decir que el clúster es resiliente aun en el caso de que alguno de los nodos que lo integran resulte ser malicioso o perezoso.

## Casos de uso de DVT {#dvt-use-cases}

La DVT tiene implicaciones importantes para la industria de las participaciones en general:

### Stakers individuales {#solo-stakers}

La TVD además habilita la participación sin custodia, al permitir que usted distribuya sus claves de validador entre nodos remotos, mientras mantenga la clave totalmente desconectada. Esto significa que los participantes domésticos no necesariamente deben invertir en hardware, mientras que la distribución de fragmentos de clave puede ayudar a fortalecerlos frente a posibles hackeos.

### Staking como servicio (SaaS) {#saas}

Los operadores (como las participaciones agrupadas y los participantes institucionales) que gestionan muchos validadores pueden utilizar la DVT para reducir su riesgo. Al distribuir su infraestructura, pueden añadir redundancia a sus operaciones y diversificar los tipos de hardware que utilizan.

La DVT comparte la responsabilidad de la gestión de claves entre varios nodos, lo que significa que también se pueden compartir algunos costes operativos. La DVT también puede reducir el riesgo operativo y los costes de seguro para los proveedores de participaciones.

### Pools de staking {#staking-pools}

Debido a las configuraciones estándar de los validadores, las participaciones agrupadas y los proveedores de participaciones líquidas se ven obligados a tener distintos niveles de confianza de un único operador, ya que las ganancias y las pérdidas se comparten con todo el grupo. También dependen de los operadores para salvaguardar las claves de firma porque, hasta ahora, no tenían otra opción.

Aunque tradicionalmente se procura repartir el riesgo distribuyendo las participaciones entre varios operadores, cada uno de ellos sigue gestionando una participación importante de forma independiente. Depender de un único operador plantea enormes riesgos si su rendimiento es inferior al esperado, se produce un tiempo de inactividad, se ve comprometido o actúa de forma malintencionada.

Al aprovechar la DVT, se reduce significativamente la confianza requerida de los operadores. **Los pools pueden permitir a los operadores tener participaciones sin necesidad de custodiar las claves de los validadores** (ya que solo se utilizan fragmentos de clave). También permite que las participaciones administradas se distribuyan entre más operadores (p. ej., en lugar de tener un solo operador que administre 1.000 validadores, DVT permite que esos validadores sean administrados colectivamente por múltiples operadores). Diversas configuraciones de operadores garantizarán que, si un operador falla, los demás aún podrán certificar. Esto produce redundancia y diversificación que conduce a un mejor rendimiento y resistencia, mientras maximiza las recompensas.

Otro beneficio de minimizar la confianza de un solo operador es que las participaciones agrupadas pueden permitir una participación más abierta y sin permiso. Al hacerlo, los servicios pueden reducir su riesgo y apoyar la descentralización de Ethereum al usar ambos conjuntos de operadores, organizados y de acceso libre, por ejemplo, al hacer combinar operadores doméstricos o participantes menores con otros más grandes.

## Posibles desventajas del uso de DVT {#potential-drawbacks-of-using-dvt}

- **Componente adicional**: introducir un nodo DVT añade otra parte que podría ser defectuosa o vulnerable. Una forma de mitigarlo es intentar múltiples implementaciones de un nodo DVT, lo que significa múltiples clientes DVT (similar a como existen múltiples clientes para las capas de consenso y ejecución).
- **Costos operativos**: como DVT distribuye el validador entre múltiples partes, se requieren más nodos para la operación en lugar de solo un nodo, lo que genera costes operativos mayores.
- **Latencia potencialmente incrementada**: dado que DVT utiliza un protocolo de consenso para lograr acuerdo entre los múltiples nodos que operan un validador, puede introducir una mayor latencia.

## Lecturas recomendadas {#further-reading}

- [Especificaciones de validadores distribuidos de Ethereum (nivel alto)](https://github.com/ethereum/distributed-validator-specs)
- [Especificaciones técnicas de validadores distribuidos de Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aplicación de demostración de Shamir secret sharing](https://iancoleman.io/shamir/)
