---
title: Tecnología de validador distribuido
description: La tecnología de validador distribuido permite la operación distribuida de un validador de Ethereum por parte de múltiples partes.
lang: es
---

La tecnología de validador distribuido (DVT) es un enfoque para la seguridad del validador que distribuye la gestión de claves y las responsabilidades de firma entre múltiples partes, para reducir los puntos únicos de fallo y aumentar la resiliencia del validador.

Lo hace **dividiendo la clave privada** utilizada para asegurar un validador **entre muchas computadoras** organizadas en un "clúster". El beneficio de esto es que hace que sea muy difícil para los atacantes obtener acceso a la clave, porque no se almacena por completo en ninguna máquina individual. También permite que algunos nodos se desconecten, ya que la firma necesaria puede ser realizada por un subconjunto de las máquinas en cada clúster. Esto reduce los puntos únicos de fallo de la red y hace que todo el conjunto de validadores sea más robusto.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

## ¿Por qué necesitamos la DVT? {#why-do-we-need-dvt}

### Seguridad {#security}

Los validadores generan dos pares de claves pública-privada: claves de validador para participar en el consenso y claves de retiro para acceder a los fondos. Mientras que los validadores pueden asegurar las claves de retiro en almacenamiento en frío, las claves privadas del validador deben estar en línea las 24 horas del día, los 7 días de la semana. Si una clave privada de validador se ve comprometida, un atacante puede controlar el validador, lo que podría llevar a un recorte o a la pérdida de los ETH de quien hace staking. La DVT puede ayudar a mitigar este riesgo. Así es cómo:

Al usar la DVT, quienes hacen staking pueden participar en el staking mientras mantienen la clave privada del validador en almacenamiento en frío. Esto se logra cifrando la clave de validador original y completa, y luego dividiéndola en fragmentos de clave. Los fragmentos de clave permanecen en línea y se distribuyen a múltiples nodos que permiten la operación distribuida del validador. Esto es posible porque los validadores de [Ethereum](/) usan firmas BLS que son aditivas, lo que significa que la clave completa se puede reconstruir sumando sus partes componentes. Esto permite a quien hace staking mantener la clave de validador 'maestra' original y completa de forma segura fuera de línea.

### Sin puntos únicos de fallo {#no-single-point-of-failure}

Cuando un validador se divide entre múltiples operadores y múltiples máquinas, puede soportar fallos individuales de hardware y software sin desconectarse. El riesgo de fallos también se puede reducir utilizando diversas configuraciones de hardware y software en los nodos de un clúster. Esta resiliencia no está disponible para las configuraciones de validador de un solo nodo; proviene de la capa DVT.

Si uno de los componentes de una máquina en un clúster se cae (por ejemplo, si hay cuatro operadores en un clúster de validadores y uno usa un cliente específico que tiene un error), los demás aseguran que el validador siga funcionando.

### Descentralización {#decentralization}

El escenario ideal para Ethereum es tener tantos validadores operados de forma independiente como sea posible. Sin embargo, unos pocos proveedores de staking se han vuelto muy populares y representan una parte sustancial del total de ETH en staking en la red. La DVT puede permitir que estos operadores existan mientras se preserva la descentralización de la participación. Esto se debe a que las claves para cada validador se distribuyen en muchas máquinas y se necesitaría una colusión mucho mayor para que un validador se vuelva malicioso.

Sin la DVT, es más fácil para los proveedores de staking admitir solo una o dos configuraciones de cliente para todos sus validadores, lo que aumenta el impacto de un error del cliente. La DVT se puede utilizar para distribuir el riesgo entre múltiples configuraciones de cliente y hardware diferente, creando resiliencia a través de la diversidad.

**La DVT ofrece los siguientes beneficios a Ethereum:**

1. **Descentralización** del consenso de prueba de participación (PoS) de Ethereum
2. Asegura la **vitalidad** de la red
3. Crea **tolerancia a fallos** del validador
4. Operación del validador con **confianza minimizada**
5. **Minimiza los riesgos de recorte** y tiempo de inactividad
6. **Mejora la diversidad** (cliente, centro de datos, ubicación, regulación, etc.)
7. **Seguridad mejorada** en la gestión de claves del validador

## ¿Cómo funciona la DVT? {#how-does-dvt-work}

Una solución DVT contiene los siguientes componentes:

- **[Esquema de intercambio secreto de Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Los validadores usan [claves BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Los "fragmentos de clave" BLS individuales se pueden combinar en una sola clave agregada (firma). En la DVT, la clave privada para un validador es la firma BLS combinada de cada operador en el clúster.
- **[Esquema de firma de umbral](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Determina el número de fragmentos de clave individuales que se requieren para las tareas de firma, por ejemplo, 3 de 4.
- **[Generación de claves distribuidas (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Proceso criptográfico que genera los fragmentos de clave y se utiliza para distribuir los fragmentos de una clave de validador existente o nueva a los nodos en un clúster.
- **[Computación multiparte (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - La clave de validador completa se genera en secreto utilizando computación multiparte. Ningún operador individual conoce la clave completa; solo conocen su propia parte de ella (su "fragmento").
- **Protocolo de consenso** - El protocolo de consenso selecciona un nodo para que sea el proponente de bloque. Comparten el bloque con los otros nodos en el clúster, quienes agregan sus fragmentos de clave a la firma agregada. Cuando se han agregado suficientes fragmentos de clave, el bloque se propone en Ethereum.

Los validadores distribuidos tienen tolerancia a fallos incorporada y pueden seguir funcionando incluso si algunos de los nodos individuales se desconectan. Esto significa que el clúster es resiliente incluso si algunos de los nodos dentro de él resultan ser maliciosos o inactivos.

## Casos de uso de la DVT {#dvt-use-cases}

La DVT tiene implicaciones significativas para la industria del staking en general:

### Stakers en solitario {#solo-stakers}

La DVT también permite el staking sin custodia al permitirle distribuir su clave de validador a través de nodos remotos mientras mantiene la clave completa completamente fuera de línea. Esto significa que los stakers domésticos no necesitan necesariamente invertir en hardware, mientras que la distribución de los fragmentos de clave puede ayudar a fortalecerlos contra posibles hackeos.

### Staking como servicio (SaaS) {#saas}

Los operadores (como los pools de staking y los stakers institucionales) que gestionan muchos validadores pueden usar la DVT para reducir su riesgo. Al distribuir su infraestructura, pueden agregar redundancia a sus operaciones y diversificar los tipos de hardware que utilizan.

La DVT comparte la responsabilidad de la gestión de claves entre múltiples nodos, lo que significa que algunos costos operativos también se pueden compartir. La DVT también puede reducir el riesgo operativo y los costos de seguro para los proveedores de staking.

### Pools de staking {#staking-pools}

Debido a las configuraciones estándar de los validadores, los pools de staking y los proveedores de staking líquido se ven obligados a tener diferentes niveles de confianza en un solo operador, ya que las ganancias y pérdidas se socializan en todo el pool. También dependen de los operadores para salvaguardar las claves de firma porque, hasta ahora, no ha habido otra opción para ellos.

Aunque tradicionalmente se hacen esfuerzos para distribuir el riesgo distribuyendo las participaciones entre múltiples operadores, cada operador sigue gestionando una participación significativa de forma independiente. Depender de un solo operador plantea riesgos inmensos si tienen un rendimiento inferior, experimentan tiempo de inactividad, se ven comprometidos o actúan de forma maliciosa.

Al aprovechar la DVT, la confianza requerida de los operadores se reduce significativamente. **Los pools pueden permitir a los operadores mantener participaciones sin necesitar la custodia de las claves del validador** (ya que solo se utilizan fragmentos de clave). También permite que las participaciones gestionadas se distribuyan entre más operadores (por ejemplo, en lugar de tener un solo operador gestionando 1000 validadores, la DVT permite que esos validadores sean ejecutados colectivamente por múltiples operadores). Las diversas configuraciones de operadores asegurarán que si un operador se cae, los demás aún podrán atestar. Esto da como resultado redundancia y diversificación que conduce a un mejor rendimiento y resiliencia, al tiempo que maximiza las recompensas.

Otro beneficio de minimizar la confianza en un solo operador es que los pools de staking pueden permitir una participación de operadores más abierta y sin permisos. Al hacer esto, los servicios pueden reducir su riesgo y apoyar la descentralización de Ethereum utilizando conjuntos de operadores tanto seleccionados como sin permisos, por ejemplo, emparejando a stakers domésticos o menores con otros más grandes.

## Posibles inconvenientes de usar la DVT {#potential-drawbacks-of-using-dvt}

- **Componente adicional** - introducir un nodo DVT agrega otra parte que posiblemente puede ser defectuosa o vulnerable. Una forma de mitigar esto es esforzarse por tener múltiples implementaciones de un nodo DVT, lo que significa múltiples clientes DVT (de manera similar a como hay múltiples clientes para las capas de consenso y ejecución).
- **Costos operativos** - como la DVT distribuye el validador entre múltiples partes, se requieren más nodos para la operación en lugar de un solo nodo, lo que introduce mayores costos operativos.
- **Latencia potencialmente mayor** - dado que la DVT utiliza un protocolo de consenso para lograr el consenso entre los múltiples nodos que operan un validador, puede introducir potencialmente una mayor latencia.

## Más información {#further-reading}

- [Especificaciones del validador distribuido de Ethereum (alto nivel)](https://github.com/ethereum/distributed-validator-specs)
- [Especificaciones técnicas del validador distribuido de Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Aplicación de demostración del intercambio secreto de Shamir](https://iancoleman.io/shamir/)