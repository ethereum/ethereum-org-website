---
title: Gasto energético de Ethereum
metaTitle: Consumo de energía de Ethereum
description: La información básica que necesita para entender el consumo de energía de Ethereum.
lang: es
---

[Ethereum](/) es una cadena de bloques ecológica. El mecanismo de consenso de [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos) de Ethereum utiliza ETH en lugar de [energía para proteger la red](/developers/docs/consensus-mechanisms/pow). El consumo de energía de Ethereum es de aproximadamente [~0,0026 TWh/año](https://carbon-ratings.com/eth-report-2022) en toda la red global.

La estimación del consumo de energía de Ethereum proviene de un estudio del [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Generaron estimaciones ascendentes (bottom-up) del consumo de electricidad y la huella de carbono de la red Ethereum ([ver el informe](https://carbon-ratings.com/eth-report-2022)). Midieron el consumo de electricidad de diferentes nodos con varias configuraciones de hardware y software de cliente. Los **2601 MWh** (0,0026 TWh) estimados para el consumo anual de electricidad de la red corresponden a unas emisiones anuales de carbono de **870 toneladas de CO2e** aplicando factores de intensidad de carbono específicos de cada región. Este valor cambia a medida que los nodos entran y salen de la red; puede realizar un seguimiento utilizando una estimación de promedio móvil de 7 días del [Índice de Sostenibilidad de la Red Blockchain de Cambridge](https://ccaf.io/cbnsi/ethereum) (tenga en cuenta que utilizan un método ligeramente diferente para sus estimaciones; los detalles están disponibles en su sitio web).

Para contextualizar el consumo de energía de Ethereum, podemos comparar estimaciones anualizadas de algunos otros productos e industrias. Esto nos ayuda a comprender mejor si la estimación para Ethereum es alta o baja.

<EnergyConsumptionChart />

El gráfico anterior muestra el consumo de energía estimado en TWh/año para Ethereum, en comparación con varios otros productos e industrias. Las estimaciones proporcionadas provienen de información disponible públicamente, a la que se accedió en julio de 2023, con enlaces a las fuentes disponibles en la tabla a continuación.

|                     | Consumo de energía anualizado (TWh) | Comparación con Ethereum PoS |                                                                                      Fuente                                                                                       |
| :------------------ | :---------------------------------: | :------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Centros de datos globales |                 190                 |          73.000x           |                                    [fuente](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin             |                 149                 |          53.000x           |                                                                 [fuente](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Minería de oro         |                 131                 |          50.000x           |                                                                 [fuente](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Videojuegos en EE. UU.\*     |                 34                  |          13.000x           |                 [fuente](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| Ethereum PoW        |                 21                  |           8.100x           |                                                                    [fuente](https://ccaf.io/cbnsi/ethereum/1)                                                                     |
| Google              |                 19                  |           7.300x           |                                           [fuente](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix             |                0,457                |            176x            | [fuente](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal              |                0,26                 |            100x            |                                 [fuente](<https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-(1).pdf>)                                  |
| AirBnB              |                0,02                 |             8x             |                              [fuente](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                              |
| **Ethereum PoS**    |             **0,0026**              |           **1x**           |                                                               [fuente](https://carbon-ratings.com/eth-report-2022)                                                                |

\*Incluye dispositivos de usuario final como PC, computadoras portátiles y consolas de videojuegos.

Obtener estimaciones precisas del consumo de energía es complicado, especialmente cuando lo que se mide tiene una cadena de suministro compleja o detalles de despliegue que influyen en su eficiencia. Por ejemplo, las estimaciones del consumo de energía de Netflix y Google varían dependiendo de si solo incluyen la energía utilizada para mantener sus sistemas y entregar contenido a los usuarios (_gasto directo_) o si incluyen el gasto requerido para producir contenido, administrar oficinas corporativas, publicidad, etc. (_gasto indirecto_). El gasto indirecto también podría incluir la energía requerida para consumir contenido en dispositivos de usuario final como televisores, computadoras y teléfonos móviles.

Las estimaciones anteriores no son comparaciones perfectas. La cantidad de gasto indirecto que se contabiliza varía según la fuente y rara vez incluye la energía de los dispositivos de usuario final. Cada fuente subyacente incluye más detalles sobre lo que se está midiendo.

La tabla y el gráfico anteriores también incluyen comparaciones con Bitcoin y la prueba de trabajo (PoW) de Ethereum. Es importante tener en cuenta que el consumo de energía de las redes de prueba de trabajo no es estático y cambia día a día. Las estimaciones también pueden variar ampliamente entre las fuentes. El tema atrae un [debate](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) lleno de matices, no solo sobre la cantidad de energía consumida, sino también sobre las fuentes de esa energía y la ética relacionada. El consumo de energía no se corresponde necesariamente con precisión con la huella ambiental porque diferentes proyectos pueden usar diferentes fuentes de energía, incluida una menor o mayor proporción de energías renovables. Por ejemplo, el [Índice de Consumo de Electricidad de Bitcoin de Cambridge](https://ccaf.io/cbnsi/cbeci/comparisons) indica que la demanda de la red Bitcoin teóricamente podría ser impulsada por la quema de gas o la electricidad que de otro modo se perdería en la transmisión y distribución. La ruta de Ethereum hacia la sostenibilidad fue reemplazar la parte de la red que consumía mucha energía con una alternativa ecológica.

Puede explorar las estimaciones de consumo de energía y emisiones de carbono para muchas industrias en el [sitio del Índice de Sostenibilidad de la Red Blockchain de Cambridge](https://ccaf.io/cbnsi/ethereum).

## Estimaciones por transacción {#per-transaction-estimates}

Muchos artículos estiman el gasto de energía "por transacción" para las cadenas de bloques. Esto puede ser engañoso porque la energía requerida para proponer y validar un bloque es independiente del número de transacciones dentro de él. Una unidad de gasto de energía por transacción implica que menos transacciones conducirían a un menor gasto de energía y viceversa, lo cual no es el caso. Además, las estimaciones por transacción son muy sensibles a cómo se define la capacidad de procesamiento de transacciones de una cadena de bloques, y modificar esta definición puede manipularse para hacer que el valor parezca mayor o menor.

En Ethereum, por ejemplo, la capacidad de procesamiento de transacciones no es solo la de la capa base; también es la suma de la capacidad de procesamiento de transacciones de todos sus rollups de "[capa 2 (L2)](/layer-2/)". Las capas 2 generalmente no se incluyen en los cálculos, pero tener en cuenta la energía adicional consumida por los secuenciadores (pequeña) y la cantidad de transacciones que procesan (grande) probablemente reduciría drásticamente las estimaciones por transacción. Esta es una de las razones por las que las comparaciones del consumo de energía por transacción entre plataformas pueden ser engañosas.

## La deuda de carbono de Ethereum {#carbon-debt}

El gasto energético de Ethereum es muy bajo, pero este no siempre ha sido el caso. Originalmente, Ethereum utilizaba la prueba de trabajo, que tenía un costo ambiental mucho mayor que el mecanismo actual de prueba de participación.

Desde el principio, Ethereum planeó implementar un mecanismo de consenso basado en la prueba de participación, pero hacerlo sin sacrificar la seguridad y la descentralización requirió años de investigación y desarrollo enfocados. Por lo tanto, se utilizó un mecanismo de prueba de trabajo para poner en marcha la red. La prueba de trabajo requiere que los mineros utilicen su hardware informático para calcular un valor, gastando energía en el proceso.

![Comparing Ethereum's energy consumption pre- and post-Merge, using the Eiffel Tower (330 meters tall) on the left to symbolize the high energy consumption before The Merge, and a small 4 cm tall Lego figure on the right to represent the dramatic reduction in energy usage after The Merge](energy_consumption_pre_post_merge.png)

El CCRI estima que La Fusión redujo el consumo de electricidad anualizado de Ethereum en más de un **99,988 %**. Del mismo modo, la huella de carbono de Ethereum se redujo en aproximadamente un **99,992 %** (de 11.016.000 a 870 toneladas de CO2e). Para poner esto en perspectiva, la reducción de emisiones es como pasar de la altura de la Torre Eiffel a una pequeña figura de juguete de plástico, como se ilustra en la figura anterior. Como resultado, el costo ambiental de proteger la red se reduce drásticamente. Al mismo tiempo, se cree que la seguridad de la red ha mejorado.

## Una capa de aplicación ecológica {#green-applications}

Si bien el consumo de energía de Ethereum es muy bajo, también hay una comunidad de [**finanzas regenerativas (ReFi)**](/refi/) sustancial, en crecimiento y muy activa construyendo sobre Ethereum. Las aplicaciones ReFi utilizan componentes de las finanzas descentralizadas (DeFi) para crear aplicaciones financieras que tienen externalidades positivas que benefician al medio ambiente. ReFi es parte de un movimiento "[solarpunk](https://en.wikipedia.org/wiki/Solarpunk)" más amplio que está estrechamente alineado con Ethereum y tiene como objetivo combinar el avance tecnológico y la gestión ambiental. La naturaleza descentralizada, sin permisos y componible de Ethereum lo convierte en la capa base ideal para las comunidades ReFi y solarpunk.

Las plataformas de financiación de bienes públicos nativas de la Web3, como [Gitcoin](https://gitcoin.co), llevan a cabo rondas climáticas para estimular la construcción consciente del medio ambiente en la capa de aplicación de Ethereum. A través del desarrollo de estas iniciativas (y otras, por ejemplo, la [ciencia descentralizada (DeSci)](/desci/)), Ethereum se está convirtiendo en una tecnología netamente positiva a nivel ambiental y social.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Si cree que esta página puede ser más precisa, abra un "issue" o un "PR" (solicitud de extracción). Las estadísticas de esta página son estimaciones basadas en datos disponibles públicamente; no representan una declaración oficial ni una promesa del equipo de ethereum.org o de la Fundación Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Más información {#further-reading}

- [Índice de Sostenibilidad de la Red Blockchain de Cambridge](https://ccaf.io/cbnsi/ethereum)
- [Informe de la Casa Blanca sobre las cadenas de bloques de prueba de trabajo](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emisiones de Ethereum: una estimación ascendente](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Índice de Consumo de Energía de Ethereum](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [La Fusión: implicaciones en el consumo de electricidad y la huella de carbono de la red Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Consumo de energía de Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Temas relacionados {#related-topics}

- [La cadena de balizas](/roadmap/beacon-chain)
- [La Fusión](/roadmap/merge/)