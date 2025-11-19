---
title: Consumo energético de Ethereum
description: Información básica que necesita para entender el consumo energético de Ethereum
lang: es
---

# Consumo energético de Ethereum {#proof-of-stake-energy}

Ethereum es una cadena de bloques ecológica. El mecanismo de consenso de [proof-of-stake](/developers/docs/consensus-mechanisms/pos) de Ethereum utiliza ETH en lugar de [energía para asegurar la red](/developers/docs/consensus-mechanisms/pow). El consumo energético de Ethereum es de aproximadamente [~0,0026 TWh/año](https://carbon-ratings.com/eth-report-2022) en toda la red global.

La estimación del consumo energético de Ethereum proviene de un estudio realizado por el [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). Ellos generaron estimaciones detalladas desde cero sobre el consumo eléctrico y la huella de carbono de la red Ethereum ([ver el informe](https://carbon-ratings.com/eth-report-2022)). a partir de la medición del consumo eléctrico de diferentes nodos con diversas configuraciones de hardware y software cliente. La estimación de **2.601 MWh** (0,0026 TWh) para el consumo eléctrico anual de la red corresponde a emisiones de carbono anuales de **870 toneladas de CO2e**, aplicando factores de intensidad de carbono específicos por región. Este valor varía a medida que los nodos entran y salen de la red; puede monitorearlo utilizando una estimación promedio diaria móvil de 7 días proporcionada por el [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (tenga en cuenta que utilizan un método ligeramente diferente para sus estimaciones; los detalles están disponibles en su sitio).

Para contextualizar el consumo de energía de Ethereum, es posible comparar las estimaciones anuales de otros productos e industrias. Esto nos ayuda a comprender mejor si la estimación para Ethereum es alta o baja.

<EnergyConsumptionChart />

La tabla de arriba muestra el consumo estimado de energía en TWh/yr para Ethereum, con respecto a un conjunto de otros productos e industrias. Las estimaciones proporcionadas provienen de fuentes públicas de información disponible, consultadas en julio 2023, con los correspondientes enlaces a las fuentes disponibles en la tabla de abajo.

|                                                          | Consumo anual de energía (TWh) | Comparación con PoS Ethereum |                                                                                       Fuente                                                                                      |
| :------------------------------------------------------- | :-----------------------------------------------: | :--------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Centros de datos globales                                |                        190                        |   x 73.000   |                                    [fuente](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                    |
| Bitcoin                                                  |                        149                        |   x 53.000   |                                                                 [fuente](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Minería de oro                                           |                        131                        |   x 50.000   |                                                                 [fuente](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                 |
| Videojuegos en EE. UU.\* |                         34                        |   x 13.000   |                 [fuente](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                 |
| PoW en Ethereum                                          |                         21                        |    x 8.100   |                                                                     [fuente](https://ccaf.io/cbnsi/ethereum/1)                                                                    |
| Google                                                   |                         19                        |    x 7.300   |                                           [fuente](https://www.gstatic.com/gumdrop/sustainability/google-2022-environmental-report.pdf)                                           |
| Netflix                                                  |                       0,457                       |             x 176            | [fuente](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                                                   |                        0,26                       |             100x             |                                  [fuente](https://s202.q4cdn.com/805890769/files/doc_downloads/global-impact/CDP_Climate_Change_PayPal-\(1\).pdf)                                 |
| AirBnB                                                   |                        0,02                       |              8x              |                              [fuente](https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-\(Final\).pdf)                              |
| **PoS de Ethereum**                                      |                     **0,0026**                    |            **1x**            |                                                                [fuente](https://carbon-ratings.com/eth-report-2022)                                                               |

\* Incluye dispositivos de usuario final, como PC, ordenadores portátiles y consolas de videojuegos.

Obtener las estimaciones precisas de consumo energético es complicado, especialmente cuando lo que se está midiendo tiene un suministro complejo de cadenas o detalles de desarrollo que influyen en su eficiencia. Por ejemplo, las estimaciones del consumo energético de Netflix y Google varían dependiendo de si solo incluyen la energía usada para mantener sus sistemas y entregar contenido a los usuarios (_gasto directo_) o si incluyen también el gasto necesario para producir contenido, mantener oficinas corporativas, publicidad, etc. (_gasto indirecto_). El gasto indirecto puede incluir también la energía requerida para consumir contenido en dispositivos de usuarios finales, como televisores, ordenadores y teléfonos móviles.

Las estimaciones de arriba no son comparaciones perfectas. La cantidad de gastos indirectos contabilizados varía dependiendo de la fuente, y rara vez incluye la energía de los dispositivos de usuario final. Cada fuente subyacente incluye mas detalles sobre lo que se está midiendo.

La tabla y el gráfico de arriba también incluyen comparaciones con Bitcoin y con la prueba de trabajo de Ethereum. Es importante notar que el consumo energético de las redes de prueba de trabajo no es estático y que cambia diariamente. Las estimaciones pueden a su vez variar ampliamente dependiendo de la fuente. El tema atrae un [debate](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/) matizado, no solo sobre la cantidad de energía consumida, sino también sobre las fuentes de esa energía y la ética relacionada. El consumo de energía no se correlaciona necesariamente con la huella ambiental de manera precisa, debido a que diferentes proyectos pueden utilizar distintas fuentes de energía, como por ejemplo una proporción mayor o menor de energías renovables. Por ejemplo, el [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) indica que la demanda de la red de Bitcoin podría, en teoría, abastecerse con gas de venteo o electricidad que de otro modo se perdería en transmisión y distribución. La ruta de Ethereum hacia la sostenibilidad consistió en reemplazar la parte de la red que consumía mucha energía por una alternativa ecológica.

Puede consultar estimaciones de consumo de energía y emisiones de carbono para muchas industrias en el [sitio del Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum).

## Estimaciones por transacción {#per-transaction-estimates}

Hay muchos artículos que calculan el gasto de energía «por transacción» para las cadenas de bloques. Esto puede ser engañoso porque la energía requerida para proponer y validar un bloque es independiente del número de transacciones dentro de él. Medir el gasto de energía por transacción implica que una menor cantidad de transacciones conduciría a un menor gasto energético y viceversa, lo cual no es el caso. Además, las estimaciones por transacción son muy sensibles a cómo se define el rendimiento de transacciones de la cadena de bloques, y cambiando esta definición es posible manipular su valor, haciendolo parecer mayor o menor.

En Ethereum, por ejemplo, el rendimiento de transacciones no solo corresponde a la capa base, sino que también es la suma del rendimiento de transacciones de todos sus "[rollups de capa 2](/layer-2/)". Las capas 2 generalmente no se suelen incluir en los cálculos, no obstante el tener en cuenta la energía adicional consumida por los secuenciadores (pequeños) y la cantidad de transacciones que procesan (grande) probablemente reduciría drásticamente las estimaciones por transacción. Esta es una de las razones que explican por qué las comparaciones de consumo de energía por transacción a través de plataformas pueden ser engañosas.

## Deuda de carbono de Ethereum {#carbon-debt}

El gasto energético de Ethereum es muy bajo, aunque no siempre ha sido así. Ethereum originalmente usaba la prueba de trabajo, que tenía un coste ambiental mucho más elevado que el del mecanismo de prueba de participación actual.

Desde el principio, Ethereum planeó implementar un mecanismo de consenso basado en la prueba de participación, pero hacerlo sin que ello afectara a la seguridad y a la descentralización llevó años de investigación y desarrollo. Por lo tanto, se utilizó un mecanismo de prueba de trabajo para poner en marcha la red. La prueba de trabajo requiere que los mineros usen su hardware informático para calcular un valor, lo que consume energía en el proceso.

![Comparación del consumo energético de Ethereum antes y después de The Merge, utilizando la Torre Eiffel (330 metros de altura) a la izquierda para simbolizar el alto consumo energético antes de The Merge, y una pequeña figura de Lego de 4 cm de alto a la derecha para representar la drástica reducción en el uso de energía tras The Merge](energy_consumption_pre_post_merge.png)

El CCRI estima que The Merge redujo el consumo anualizado de electricidad de Ethereum en más de **99,988%**. Asimismo, la huella de carbono de Ethereum disminuyó aproximadamente en **99,992%** (de 11.016.000 a 870 toneladas de CO2e). Para ponerlo en contexto, la reducción en las emisiones es como pasar de la altura de la torre Eiffel a un pequeño muñeco de juguete, como se ve en la figura anterior. Como resultado, el costo ambiental de asegurar la red se reduce drásticamente. Al mismo tiempo, se cree que la seguridad de la red ha mejorado.

## Una capa de aplicaciones ecológicas {#green-applications}

Aunque el consumo energético de Ethereum es muy bajo, también existe una comunidad de [**finanzas regenerativas (ReFi)**](/refi/) sustancial, en crecimiento y muy activa, que desarrolla sobre Ethereum. Las aplicaciones ReFi usan componentes DeFi para crear aplicaciones financieras que tienen efectos externos que benefician al entorno. ReFi es parte de un movimiento ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) más amplio que está estrechamente alineado con Ethereum y busca unir el avance tecnológico con el cuidado ambiental. La naturaleza descentralizada, sin permisos y componible de Ethereum lo convierten en la capa base ideal para las comunidades de ReFi y solarpunk.

Plataformas nativas de Web3 para financiar bienes públicos, como [Gitcoin](https://gitcoin.co), realizan rondas climáticas para estimular la construcción consciente del medio ambiente en la capa de aplicaciones de Ethereum. A través del desarrollo de estas iniciativas (y otras, por ejemplo, [DeSci](/desci/)), Ethereum se está convirtiendo en una tecnología netamente positiva a nivel ambiental y social.

<Alert variant="update">
<AlertEmoji text=":evergreen_tree:" />
<AlertContent>
<AlertDescription>
  Si cree que esta página puede ser más precisa, por favor informe un issue o PR. Las estadísticas de esta página son estimaciones basadas en datos disponibles públicamente; no representan una declaración oficial ni una promesa del equipo de ethereum.org ni de la Fundación Ethereum.
</AlertDescription>
</AlertContent>
</Alert>

## Lecturas adicionales {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Informe de la Casa Blanca sobre blockchains con proof-of-work](https://web.archive.org/web/20221109005700/https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emisiones de Ethereum: Una estimación desde abajo](https://kylemcdonald.github.io/ethereum-emissions/) - _Kyle McDonald_
- [Índice de Consumo Energético de Ethereum](https://digiconomist.net/ethereum-energy-consumption/) - _Digiconomist_
- [ETHMerge.com](https://ethmerge.com/) - _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [The Merge - Implicaciones en el consumo eléctrico y la huella de carbono de la red Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Consumo energético de Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Temas relacionados {#related-topics}

- [Visión de Ethereum](/roadmap/vision/)
- [The Beacon Chain](/roadmap/beacon-chain)
- [The Merge](/roadmap/merge/)
