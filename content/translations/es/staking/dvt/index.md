---
title: Tecnología de validador distribuido
description: La tecnología de valor distribuido (o DVT) permite la operación de un validador de Ethereum distribuida por varias partes.
lang: es
---

# Tecnología de validador distribuido {#distributed-validator-technology}

La tecnología de validador distribuido (DVT) es un enfoque para la seguridad del validador que reparte la gestión de claves y la firma de responsabilidades entre varias partes, para reducir puntos únicos de fallo, e incrementar la resiliencia del validador.

Esto lo hace mediante la **división de la clave privada** usada para asegurar un validador **a través de muchos ordenadores** organizados en un «clúster». El beneficio de aporta es que se hace muy difícil que los atacantes puedan acceder a la clave, porque no se almacena completamente en una sola máquina. También permite que algunos nodos se desconecten, ya que la firma necesaria puede ser hecha por un subconjunto de las máquinas en cada cluster. Esto reduce los puntos únicos de fallo de la red y hace que el validador entero sea más robusto.

![Un diagrama que muestra cómo una sola clave de validador se está distribyendo en nodos múltiples con componentes variados.](./dvt-cluster.png)

## ¿Por qué necesitamos la DVT? {#why-do-we-need-dvt}

### Seguridad {#security}

Los validadores generan dos pares de claves público-privadas: claves validadoras para participar en un consenso y claves de retiro para acceder a fondos. Mientras que los validadores pueden asegurar claves de retirada en almacenamiento en frío, las claves privadas de los validadores deben estar en línea constantemente. Si una clave privada del validador se ve afectada, un atacante puede controlar el validador, lo que potencialmente conduce a un recorte o a la pérdida de un participante ETH. DVT puede ayudar a mitigar este riesgo. He aquí la forma de hacerlo:

Mediante el uso de DVT, los participantes pueden participar en la apuesta mientras mantienen la clave privada del validador en el almacenamiento en frío. Esto se consigue cifrando la clave original y completa del validador, para después dividirla en claves compartidas. Las claves compartidas en línea y se distribuyen a múltiples nodos que permiten la operación distribuida del validador. Esto es posible porque los validadores de Ethereum utilizan firmas BLS que son aditivas, lo que significa que la clave completa puede ser reconstruida sumando sus partes componentes. Esto permite al participante mantener la clave «maestra» del validador completa y original de forma segura sin conexión.

### No existen puntos únicos de fallo. {#no-single-point-of-failure}

Cuando un validador se divide entre distintos operarios y equipos, puede soportar fallos puntuales del hardware y del software sin desconectarse. Además, se puede reducir el riesgo de fallos utilizando distintas configuraciones para el hardware y el software en los nodos de un clúster. Esta capacidad de recuperación no está a disposición de las configuraciones de validador de nodo único: se origina en la capa DVT.

En caso de que uno de los componentes de una máquina en un clúster dejara de funcionar (por ejemplo, si hubiera cuatro operadores en un clúster de validador y uno de ellos utilizara un cliente determinado que presentara un fallo), el resto se encargaría de que el validador siguiera funcionando.

### Descentralización {#decentralization}

La situación ideal para Ethereum es contar con el mayor número posible de validadores operados de forma independiente. Sin embargo, un número reducido de proveedores de participaciones ha adquirido gran popularidad y representa una parte considerable del total de ETH apostado en la red. La DVT puede conseguir que estos operadores sigan existiendo al tiempo que mantiene la descentralización de la participación. Esto se debe a que las claves de cada validador se reparten entre muchas máquinas y para que un validador se vuelva malicioso se requeriría una mayor confabulación.

Sin la DVT es más sencillo que los proveedores de participación admitan sólo una o dos configuraciones de cliente para todos sus validadores, lo que incrementa el alcance de un fallo en el cliente. La DVT puede servir para distribuir el riesgo entre varias configuraciones de cliente y diferente hardware, lo que genera capacidad de recuperación mediante la diversidad.

**La DVT supone ventajas para Ethereum:**

1. La **descentralización** del mecanismo de consenso de prueba de participación de Ethereum.
2. Garantiza la **vitalidad** de la red
3. Genera **tolerancia a los fallos** del validador.
4. Operación de validador de **poca confianza**
5. Reduce al mínimo los **riesgos de corte** y el tiempo de inactividad.
6. **Mejora la diversidad** (cliente, centro de datos, ubicación, reglamentación, etc.).
7. **Aumenta la seguridad** de la gestión de claves del validador.

## ¿Cómo funciona la DVT? {#how-does-dvt-work}

Una solución DVT contiene los siguientes componentes:

- **[Compartir secreto de Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)**: los validadores utilizan teclas [BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Las «acciones clave» individuales de BLS («acciones clave») pueden combinarse en una única clave agregada (firma). En DVT, la clave privada para un validador es la firma BLS combinada de cada operador en el clúster.
- **[Esquema de firma del umbral](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)**: determina el número de acciones clave individuales que son necesarias para firmar obligaciones, ejemplo, 3 de 4.
- **[Generación de claves distribuidas (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)**: el proceso criptográfico que genera fragmentos de clave y se usa para distribuir los fragmentos de una clave del validador existente o nueva entre los nodos del clúster.
- **[Computación de múltiples partes(MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)**: la clave completa del validator se genera en secreto mediante computación de múltiples partes. Ningún operador conoce la clave completa —solamente conocen su parte (su «fracción»).
- **Protocolo de consenso**: el protocolo de consenso selecciona un nodo para que proponga bloques. Comparten el bloque con los otros nodos del clúster, los cuales agregan sus fragmentos de clave a la firma agregada. Cuando se han agregado suficientes fragmentos de clave, el bloque se propone en Ethereum.

Los validadores distribuidos incorporan tolerancia a fallos y pueden continuar funcionando incluso si algunos de los nodos individuales se desconecta. Esto quiere decir que el clúster es resiliente aun en el caso de que alguno de los nodos que lo integran resulte ser malicioso o perezoso.

## Casos de uso de DVT {#dvt-use-cases}

La DVT tiene implicaciones importantes para la industria de las participaciones en general:

### Participación en solitario {#solo-stakers}

La TVD además habilita la participación sin custodia, al permitir que usted distribuya sus claves de validador entre nodos remotos, mientras mantenga la clave totalmente desconectada. Esto significa que los participantes domésticos no necesariamente deben invertir en hardware, mientras que la distribución de fragmentos de clave puede ayudar a fortalecerlos frente a posibles hackeos.

### Participación como servicio (SaaS) {#saas}

Los operadores (como las participaciones agrupadas y los participantes institucionales) que gestionan muchos validadores pueden utilizar la DVT para reducir su riesgo. Al distribuir su infraestructura, pueden añadir redundancia a sus operaciones y diversificar los tipos de hardware que utilizan.

La DVT comparte la responsabilidad de la gestión de claves entre varios nodos, lo que significa que también se pueden compartir algunos costes operativos. La DVT también puede reducir el riesgo operativo y los costes de seguro para los proveedores de participaciones.

### Reservas de participación {#staking-pools}

Debido a las configuraciones estándar de los validadores, las participaciones agrupadas y los proveedores de participaciones líquidas se ven obligados a tener distintos niveles de confianza de un único operador, ya que las ganancias y las pérdidas se comparten con todo el grupo. También dependen de los operadores para salvaguardar las claves de firma porque, hasta ahora, no tenían otra opción.

Aunque tradicionalmente se procura repartir el riesgo distribuyendo las participaciones entre varios operadores, cada uno de ellos sigue gestionando una participación importante de forma independiente. Depender de un único operador plantea enormes riesgos si su rendimiento es inferior al esperado, se produce un tiempo de inactividad, se ve comprometido o actúa de forma malintencionada.

Al aprovechar la DVT, se reduce significativamente la confianza requerida de los operadores. **Los pools pueden permitir a los operadores mantener participaciones sin necesidad de custodiar claves de validador** (ya que sólo se utilizan participaciones de clave). También permite que las participaciones administradas se distribuyan entre más operadores (p. ej., en lugar de tener un solo operador que administre 1.000 validadores, DVT permite que esos validadores sean administrados colectivamente por múltiples operadores). Diversas configuraciones de operadores garantizarán que, si un operador falla, los demás aún podrán certificar. Esto produce redundancia y diversificación que conduce a un mejor rendimiento y resistencia, mientras maximiza las recompensas.

Otro beneficio de minimizar la confianza de un solo operador es que las participaciones agrupadas pueden permitir una participación más abierta y sin permiso. Al hacerlo, los servicios pueden reducir su riesgo y apoyar la descentralización de Ethereum al usar ambos conjuntos de operadores, organizados y de acceso libre, por ejemplo, al hacer combinar operadores doméstricos o participantes menores con otros más grandes.

## Desventajas potenciales de usar DVT {#potential-drawbacks-of-using-dvt}

- **Componente adicional**: introducir un nodo DVT añade otra parte propensa a ser vulnerable o no funcionar. Una forma de mitigarlo es intentar múltiples implementaciones de un nodo DVT, lo que significa múltiples clientes DVT (similar a como existen múltiples clientes para las capas de consenso y ejecución).
- Los **costes operativos**: como DVT distribuye el validador entre múltiples partes, se requieren más nodos para operar en lugar de un sólo nodo, lo que incrementa los costes operativos.
- **Latencia potencialmente mayor**: dado que DVT utiliza un protocolo de consenso para lograrlo entre múltiples nodos operando un validador, puede potencialmente incorporar una mayor latencia.

## Más información {#further-reading}

- [Especificiones de un validador distribuido Ethereum (detalladas)](https://github.com/ethereum/distributed-validator-specs)
- [Especificaciones técnicas de un validador distribuido Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [App del algoritmo sistema de compartición de secretos de Shamir](https://iancoleman.io/shamir/)
