---
title: "¿Cómo funcionan los retiros de Ethereum?"
description: "Cómo funcionan los retiros de staking en Ethereum después de la actualización Shanghái/Capella, cubriendo el proceso técnico, la cola de retiros y lo que los participantes deben saber sobre el acceso a su ETH en staking."
lang: es
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "how-ethereum-works"
  - "staking"
  - "withdrawals"
format: explainer
author: Finematics
breadcrumb: "Retiros de staking"
---

Una explicación de **Finematics** que cubre cómo funcionan los retiros de staking en Ethereum después de la actualización Shanghái/Capella, incluyendo la mecánica de los retiros parciales y totales, los conceptos erróneos comunes y las implicaciones para el ecosistema de staking.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=RwwU3P9n3uo) publicada por Finematics. Ha sido ligeramente editada para facilitar su lectura.*

#### La cadena de balizas (0:31) {#the-beacon-chain-031}

Con la actualización Shanghái/Capella acercándose rápidamente, hay mucha discusión sobre los retiros de staking de Ethereum y lo que esto significa para el ecosistema de Ethereum en su conjunto.

Comencemos por entender cómo llegamos aquí y por qué los retiros de staking no se habilitaron cuando Ethereum pasó de la prueba de trabajo (PoW) a la prueba de participación (PoS).

La transición a la prueba de participación (PoS) ocurrió en varios pasos para minimizar la cantidad de grandes cambios que ocurrían al mismo tiempo. Este enfoque fue esencial, especialmente para una red establecida que liquida billones de dólares de valor por año. Los pasos más significativos fueron: el lanzamiento de la cadena de balizas y La Fusión.

El lanzamiento de la cadena de balizas en 2020 sentó las bases para la transición al crear una capa de consenso de prueba de participación separada, que se ejecutaba junto a la cadena de prueba de trabajo de Ethereum. Lanzar la cadena de balizas antes permitió la acumulación de suficiente ETH para asegurar la red antes de liquidar transacciones de valor real. También permitió probar el nuevo modelo de consenso de prueba de participación durante un período prolongado con fondos reales en staking.

Los primeros participantes de la red comprometieron millones de ETH para asegurar la red de prueba de participación de Ethereum a pesar de saber que no podrían retirar su ETH hasta mucho más tarde.

El siguiente gran paso, La Fusión, unió la capa de consenso de prueba de participación con la capa de ejecución. Esto permitió finalmente abandonar la prueba de trabajo y mantener solo una cadena canónica —Ethereum— ahora asegurada por millones de ETH en staking. La Fusión fue, con diferencia, el cambio más grande jamás realizado en Ethereum. Debido a la naturaleza de la actualización, tuvo que ocurrir sin ningún tiempo de inactividad.

Para minimizar el riesgo, el alcance de La Fusión se redujo, y no se incluyeron otras características —fuera del cambio de prueba de trabajo a prueba de participación— como parte de la actualización. El mayor "recorte" que tuvo que hacerse afectó a los retiros, que se convirtieron en el foco de la próxima actualización Shanghái/Capella.

#### Retiros (2:09) {#withdrawals-209}

Los retiros de staking, como su nombre indica, permitirán a los participantes retirar su ETH bloqueado. Hay dos tipos de retiros: "parciales" y "totales".

Un **retiro parcial** ocurre cuando el validador retira sus recompensas acumuladas: el saldo adicional por encima del saldo efectivo máximo de 32 ETH. Un retiro parcial también puede denominarse "pago de recompensa" o "pago de saldo excedente".

Un **retiro total** ocurre cuando el validador ha completado el proceso de salida y se retira todo el saldo. Esto ocurre solo cuando el validador sale del sistema, ya sea voluntariamente o al ser eliminado por la fuerza en un proceso llamado "recorte".

Una vez habilitados, los retiros de staking se distribuirán automáticamente cada pocos días. Además, el proceso de retiro se inicia en la capa de consenso, por lo que no se requiere ninguna tarifa de transacción en ninguno de los pasos.

Para comenzar a retirar sus recompensas de staking, un validador tendrá que proporcionar su dirección de retiro solo una vez. Dado que los retiros afectan tanto a la capa de consenso como a la capa de ejecución de Ethereum, ambas partes de la red deben actualizarse. "Shanghái" es el nombre de la actualización de la capa de ejecución que contiene los retiros, los cuales se especifican en la EIP-4895. "Capella" es el nombre de la actualización homóloga de la capa de consenso, activada al mismo tiempo. Estas dos actualizaciones a veces también se denominan "Shapella".

#### Mecánica (3:40) {#mechanics-340}

En el ecosistema de Ethereum, cada validador tiene un número de índice correspondiente. Además, también tienen dos tipos de credenciales de retiro, definidas como `0x00` o `0x01`.

`0x00` indica que un validador en particular no tiene una dirección de retiro asociada. Estas credenciales se derivan como el hash de la clave pública BLS con su primer byte intercambiado por un byte cero, de ahí el nombre.

`0x01` significa que un validador proporcionó su dirección de retiro. Estas credenciales de retiro se representan como `0x01` seguido de 11 bytes de ceros, y luego una dirección de Ethereum elegida.

Para habilitar los retiros, los validadores con credenciales `0x00` deberán firmar un mensaje "BLSToExecutionChange". Esto será posible después de la actualización Capella.

Una vez que se habiliten los retiros, un validador que proponga un bloque escaneará linealmente a través de los índices de los validadores para encontrar los primeros 16 validadores con credenciales `0x01` que cumplan con una de las siguientes condiciones:

- Tienen un saldo que excede los 32 ETH (recompensas de validador acumuladas)
- Son "retirables" (han completado su salida del conjunto de validadores)

La búsqueda lineal se detiene después de encontrar 16 validadores que coincidan con estos criterios o después de 16,384 iteraciones. El algoritmo recuerda el índice en el que se detuvo la búsqueda, por lo que el siguiente validador que proponga un bloque puede reanudar desde ese índice. Después de llegar al último índice, el algoritmo comienza desde el principio: el índice 0.

Una buena analogía sería un reloj analógico donde la manecilla señala la hora, avanza en una dirección, no se salta ninguna hora y, finalmente, vuelve al principio una vez que se alcanza el último número.

Una vez completado el escaneo, el validador crea una lista de retiros para ser incluidos en su carga útil de ejecución. Cada elemento de la lista contiene:

- **WithdrawalIndex** — un índice que aumenta monótonamente, comenzando desde 0, que se incrementa en 1 por retiro para identificar de manera única cada retiro
- **ValidatorIndex** — el índice del validador cuyo saldo se está retirando
- **ExecutionAddress** — la dirección de ETH en la capa de ejecución a la que se debe enviar el retiro
- **Amount** — la cantidad, en Gwei, que se enviará a la dirección de ejecución

Al construir o procesar un bloque, los clientes de la capa de ejecución aplican estos retiros al final de un bloque. El procesamiento de retiros no compite con las transacciones de los usuarios por el espacio del bloque. Con un máximo de 16 retiros procesados por bloque, debería haber un máximo de 115,200 retiros procesados por día, asumiendo que no se pierdan ranuras (slots).

El diseño de los retiros es simple pero extremadamente robusto.

#### Conceptos erróneos (6:30) {#misconceptions-630}

El primer concepto erróneo afirma que al procesar retiros, existe una diferencia entre un retiro "total" y uno "parcial" en términos de prioridad u orden. Tanto los retiros totales como los parciales ocurren cuando el escaneo lineal sobre el conjunto de validadores alcanza el índice de un validador. La única diferencia es que, en el caso de los retiros totales, un validador debe abandonar la cola de salida y alcanzar la "época retirable" antes de que el escaneo lineal pueda detectarlo.

Otro concepto erróneo es que los usuarios perderán sus recompensas si no proporcionan una dirección de retiro. Esto no es cierto: en caso de que un validador olvide proporcionar una dirección de retiro, sus recompensas de ETH no se enviarán al vacío una vez que se habiliten los retiros. En su lugar, el escaneo omitirá a los validadores que no hayan proporcionado sus direcciones de retiro.

Es importante recordar que la dirección de retiro no se puede cambiar y se configura solo una vez. Los participantes deben tener mucho cuidado al configurar la dirección de retiro, asegurándose de tener la propiedad total de la dirección proporcionada.

También se especula que los participantes retirarán una gran cantidad de ETH del ecosistema de Ethereum una vez que se habiliten los retiros, y la versión más fuerte de este argumento asume que desestabilizará el mecanismo de consenso de prueba de participación. Aunque no podemos predecir completamente cuánto ETH se retirará con el tiempo, hay algunos contraargumentos importantes:

En primer lugar, la mayoría de los participantes son los primeros en adoptar Ethereum, quienes fueron lo suficientemente valientes como para hacer staking cuando aún era incierto cuándo se habilitarían los retiros. Muchos participantes han expresado su deseo de continuar haciendo staking para apoyar la red y seguir ganando recompensas denominadas en ETH.

En segundo lugar, para garantizar que el mecanismo de consenso de prueba de participación y el conjunto activo de validadores permanezcan estables, Ethereum implementó una cola de retiros para todos los validadores que deseen salir. Esta cola limita la cantidad de validadores que pueden abandonar el ecosistema simultáneamente.

El primer escaneo de retiros retirará una gran cantidad de recompensas acumuladas, básicamente desde el inicio de la cadena de balizas. Sin embargo, los posteriores procesarán una cantidad mucho menor de ETH.

#### Implicaciones (8:39) {#implications-839}

Habilitar los retiros creará un flujo de staking abierto y bidireccional. Actualmente, el flujo de staking es unidireccional: el ETH solo puede fluir hacia la red y nunca salir de ella. Curiosamente, habilitar los retiros puede incentivar a aún más personas a hacer staking, ya que sabrán que siempre pueden retirar su ETH si lo necesitan para otra cosa.

Los participantes que no ejecutan sus propios validadores y hacen staking con un proveedor de staking centralizado podrán cambiar su proveedor por uno diferente. Pueden retirar fondos de un proveedor que ofrece una tasa de staking más baja a uno que ofrece una mejor tasa, pasar de un proveedor centralizado a uno descentralizado, o incluso ejecutar su propio validador.

Los retiros también afectarán a los derivados de staking líquido como Lido, Rocket Pool y otros. Los tokens de staking líquido (LST) como stETH o rETH tenían un historial de perder temporalmente su paridad con el precio de ETH durante las turbulencias del mercado. Sin embargo, con el flujo de staking bidireccional, cualquier discrepancia significativa en su paridad se eliminaría rápidamente mediante arbitraje.

Los primeros en adoptar el staking líquido y el staking centralizado capturaron una gran mayoría del mercado, ya que no tenían mucha competencia. Sin embargo, la cuota de mercado de estos actores establecidos podría experimentar un cambio importante una vez que se habiliten los retiros, especialmente si no ofrecen una tasa competitiva. La capacidad de cambiar libremente entre proveedores de staking beneficiará al mercado de staking de ETH.

#### Resumen (10:01) {#summary-1001}

Habilitar los retiros de staking es una de las actualizaciones más esperadas de Ethereum. Será extremadamente importante asegurarse de que este cambio se ejecute sin problemas. Para ayudar con las pruebas, los validadores tendrán varias redes de desarrollo (devnets) y redes de prueba (testnets) disponibles para ejecutar el proceso y resolver cualquier problema potencial antes de lanzarse en la Red principal.

Los retiros son otra mejora que acerca a Ethereum un paso más hacia la construcción de un futuro sostenible, seguro y descentralizado. Se espera que la actualización Shapella tenga lugar en la primera mitad de 2023.

En el momento de este video, la cadena de balizas acumulaba más de 17 millones de ETH a través de más de 530,000 validadores. El saldo promedio de un validador es un poco más de 34 ETH, lo que significa más de 1 millón de ETH en recompensas acumuladas. Será interesante ver cómo los retiros afectarán estos números.