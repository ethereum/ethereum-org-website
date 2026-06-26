---
title: zkEVM para la verificación de bloques de la capa 1
description: Aprenda cómo las pruebas de conocimiento cero pueden verificar la ejecución de bloques de Ethereum, permitiendo una mayor capacidad de procesamiento y menores requisitos para los validadores.
lang: es
---

La zkEVM es una tecnología que utiliza [pruebas de conocimiento cero](/zero-knowledge-proofs/) para verificar la ejecución de bloques de Ethereum. En lugar de requerir que cada [validador](/glossary/#validator) vuelva a ejecutar todas las transacciones en un bloque, un único actor especializado (llamado "probador") ejecuta el bloque y genera una prueba criptográfica de que la ejecución fue correcta. Cualquier nodo puede entonces verificar esta prueba, un proceso que es órdenes de magnitud más barato que volver a ejecutar todas las transacciones.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>No confundir con los rollups zkEVM</AlertTitle>
<AlertDescription>
Esta página trata sobre el uso de la zkEVM para verificar la ejecución de bloques de la capa 1 (l1) de Ethereum. Para los rollups zkEVM que utilizan pruebas ZK para escalar Ethereum como soluciones de capa 2 (l2), consulte los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## El problema de la reejecución {#reexecution-problem}

Hoy en día, Ethereum utiliza un modelo de verificación "N de N": cada validador debe volver a ejecutar de forma independiente cada transacción en cada bloque para verificar que los cambios de estado propuestos sean correctos. Aunque este enfoque es al máximo sin necesidad de confianza, crea un cuello de botella fundamental.

El problema es que la capacidad de procesamiento de Ethereum está limitada por lo que el validador promedio puede procesar. Aumentar el [límite de gas](/glossary/#gas-limit) permitiría más transacciones por bloque, pero también aumentaría los requisitos de hardware para los validadores. Esto amenaza la descentralización: si ejecutar un validador requiere hardware costoso, menos personas pueden participar en la seguridad de la red.

La zkEVM ofrece una salida a esta disyuntiva. Al pasar de "todos vuelven a ejecutar" a "uno prueba, todos verifican", Ethereum puede aumentar de forma segura el límite de gas sin elevar los requisitos de hardware de los validadores.

## Cómo funciona la verificación de la l1 con zkEVM {#how-it-works}

La verificación con zkEVM transforma la validación de bloques en un modelo "1 de N":

1. **Ejecución**: Un probador ejecuta todas las transacciones en un bloque, rastreando cada cambio de estado
2. **Prueba**: El probador genera una prueba criptográfica (un [SNARK o STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) que da fe de la exactitud de la ejecución
3. **Verificación**: Los validadores verifican la prueba en lugar de volver a ejecutar las transacciones; esto es drásticamente más barato que la reejecución completa

La garantía de seguridad sigue siendo la misma: si la ejecución fue incorrecta, no se puede generar ninguna prueba válida. Pero ahora, en lugar de que cada nodo realice cálculos costosos, solo lo hace el probador, y la verificación es lo suficientemente barata como para no limitar el límite de gas.

### zkEVM de Tipo 1 {#type-1-zkevm}

Las zkEVM se clasifican en tipos según su compatibilidad con Ethereum:

- **Tipo 1**: Totalmente equivalentes a Ethereum. Sin modificaciones en la EVM, por lo que cualquier bloque de Ethereum se puede probar exactamente tal como es
- **Tipos 2-4**: Hacen varias concesiones, modificando el comportamiento de la EVM para facilitar la generación de pruebas

Para la verificación de la capa 1 (l1), el Tipo 1 es esencial. La zkEVM debe ser capaz de probar cualquier bloque válido de Ethereum, incluidos los casos extremos y los bloques históricos. Cualquier desviación del comportamiento exacto de Ethereum crearía problemas de consenso.

La investigación sobre zkEVM de la Fundación Ethereum se centra en implementaciones de Tipo 1 que son totalmente compatibles con la ejecución existente de Ethereum.

## Beneficios para Ethereum {#benefits}

### Mayor capacidad de procesamiento {#higher-throughput}

Cuando la verificación es barata, el límite de gas puede aumentar de forma segura. Esto amplía la capacidad de la red y ayuda a estabilizar las tarifas durante los períodos de alta demanda. El límite de gas actual está parcialmente restringido por el hardware de los validadores; la zkEVM elimina esta restricción.

### Mayor descentralización {#stronger-decentralization}

Con la verificación mediante zkEVM, los validadores solo necesitan verificar pruebas en lugar de ejecutar transacciones. Esto reduce drásticamente los requisitos de hardware para ejecutar un validador, lo que permite que más personas participen en la seguridad de la red. Una mayor diversidad de validadores fortalece la resistencia a la censura y la resiliencia de Ethereum.

Tenga en cuenta que la generación de pruebas en sí requiere recursos computacionales significativos, mayores que los del hardware actual de los validadores. Sin embargo, a diferencia de la validación, la generación de pruebas no necesita estar descentralizada de la misma manera: solo se necesita una prueba correcta por bloque, y cualquiera puede verificarla rápidamente. La investigación sobre mercados de probadores, agregación de pruebas y aceleración de hardware tiene como objetivo garantizar que la generación de pruebas siga siendo competitiva y accesible en lugar de concentrarse entre unos pocos grandes operadores.

### Finalidad predecible {#predictable-finality}

La verificación de pruebas opera en tiempo constante independientemente de la complejidad del bloque. Esto hace que el tiempo de atestación sea más predecible y reduce las atestaciones perdidas que pueden ocurrir cuando los validadores tienen dificultades para procesar bloques complejos a tiempo.

## Desafíos de la generación de pruebas en tiempo real {#realtime-proving}

El principal desafío para la verificación de la l1 con zkEVM es la velocidad. Los bloques de Ethereum se producen cada 12 segundos, lo que significa que las pruebas deben generarse en un plazo similar para ser útiles para el consenso.

Las implementaciones actuales de zkEVM pueden tardar de minutos a horas en probar un solo bloque. La investigación se centra en cerrar esta brecha a través de:

- **Paralelización**: Distribución del trabajo de generación de pruebas en múltiples máquinas
- **Hardware especializado**: Diseño de circuitos y hardware optimizados para la generación de pruebas ZK
- **Mejoras algorítmicas**: Sistemas de pruebas y diseños de circuitos más eficientes
- **Generación de pruebas incremental**: Generación de pruebas a medida que se ejecutan las transacciones, en lugar de hacerlo después

## Investigación e implementaciones actuales {#current-research}

La Fundación Ethereum financia la investigación sobre zkEVM a través del equipo [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Las principales líneas de investigación incluyen:

- **Generación de pruebas en tiempo real**: Generación de pruebas de bloques completos dentro de slots de 12 segundos
- **Integración de clientes**: Estandarización de interfaces entre clientes de ejecución y probadores
- **Incentivos económicos**: Diseño de mercados de probadores y estructuras de tarifas sostenibles

### Estado de la implementación {#implementations}

Se están desarrollando y probando varias implementaciones de zkVM para la generación de pruebas de bloques de Ethereum:

| Implementación | Arquitectura |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Estas utilizan máquinas virtuales basadas en RISC-V para ejecutar el código de bytes de la EVM y, a continuación, generan pruebas ZK de la ejecución correcta. Los resultados de las pruebas actualizados y el progreso se rastrean en el [rastreador de zkVM de la Fundación Ethereum](https://zkevm.ethereum.foundation/zkvm-tracker).

## Cómo encaja la zkEVM con otras actualizaciones {#related-upgrades}

La verificación de la l1 con zkEVM se conecta con varios otros elementos de la hoja de ruta de Ethereum:

- **[Árboles Verkle](/roadmap/verkle-trees/)**: Permiten testigos más pequeños para la verificación con ausencia de estado, reduciendo los datos con los que los probadores necesitan trabajar
- **[Ausencia de estado](/roadmap/statelessness/)**: La zkEVM es un facilitador clave; con las pruebas ZK de ejecución, los nodos no necesitan el estado completo para verificar los bloques
- **[Separación proponente-constructor (PBS)](/roadmap/pbs/)**: Los constructores de bloques podrían integrar potencialmente la generación de pruebas, o podría surgir un mercado de probadores independiente
- **[Finalidad de un solo slot](/roadmap/single-slot-finality/)**: Una generación de pruebas más rápida podría permitir la finalidad de un solo slot con garantías criptográficas

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
La verificación de la l1 con zkEVM se encuentra en investigación activa y aún no está integrada en los clientes de Ethereum en producción.
</AlertDescription>
</AlertContent>
</Alert>

## Más información {#further-reading}

- [Fundación zkEVM](https://zkevm.ethereum.foundation): Centro oficial de investigación sobre zkEVM de la Fundación Ethereum
- [Ethproofs](https://ethproofs.org/): Siga la carrera para probar Ethereum en tiempo real
- [zkevm.fyi](https://zkevm.fyi): Libro técnico sobre zkEVM para la l1
- [Especificaciones de zkEVM de PSE](https://github.com/privacy-scaling-explorations/zkevm-specs): Especificaciones técnicas
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html): Resumen de Vitalik sobre las mejoras de verificación
- [Blog de zkEVM de la EF](https://zkevm.ethereum.foundation/blog): Análisis de rendimiento del equipo de la Fundación Ethereum (EF)