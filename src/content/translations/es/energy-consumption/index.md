---
title: Consumo energético de Ethereum
description: Información básica que necesita para entender el consumo energético de Ethereum
lang: es
---

# Gasto energético de Ethereum {#proof-of-stake-energy}

Ethereum es una cadena de bloques ecológica. El mecanismo de consenso de [prueba de participación](/developers/docs/consensus-mechanisms/pos) utiliza ETH en lugar de [energía para asegurar la red](/developers/docs/consensus-mechanisms/pow). El consumo de energía de Ethereum es de apoximádamente [~0,0026 TWh/año](https://carbon-ratings.com/eth-report-2022) en toda la red global.

La estimación de consumo energético de Ethereum proviene de un estudio del [CCRI (Crypto Carbon Ratings Institute)](https://carbon-ratings.com). que generó estimaciones ascendentes del consumo de electricidad y la huella de carbono de la red Ethereum ([ver el informe](https://carbon-ratings.com/eth-report-2022)) a partir de la medición del consumo eléctrico de diferentes nodos con diversas configuraciones de hardware y software cliente. La estimación de **2601 MWh** (0,0026 TWh) para el consumo de electricidad anual de la red corresponde a las emisiones de carbono anuales de **870 toneladas de CO2e** aplicando factores de intensidad de carbono específicos de la región. Este valor cambia a medida que los nodos ingresan y dejan la red ―se puede realizar un seguimiento utilizando una estimación promedio móvil de 7 días del [ Cambridge Blockchain network Sustainability Index](https://ccaf.io/cbnsi/ethereum) (cabe destacar que este índice utiliza un método ligeramente diferente para realizar las estimaciones, cuyos detalles se encuentran disponibles en su sitio web)―.

Para contextualizar el consumo de energía de Ethereum, podemos comparar estimaciones anuales de algunas otras industrias. Esto nos ayuda a comprender mejor si la estimación para Ethereum es alta o baja.

<EnergyConsumptionChart />

El gráfico anterior muestra el consumo anual estimado de energía en TWh/año para Ethereum, en comparación con otras industrias. Las estimaciones proporcionadas provienen de información disponible públicamente a la que se accedió en mayo de 2023. Los enlaces a las fuentes se encuentran en la siguiente tabla:

|                              | Consumo anual de energía (TWh) | Comparación con PoS Ethereum | Fuente                                                                                                                                                                            |
| :--------------------------- | :----------------------------: | :--------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Centros de datos globales    |              200               |           77.000x            | [fuente](https://www.iea.org/commentaries/data-centres-and-energy-from-global-headlines-to-local-headaches)                                                                       |
| Minado de oro                |              131               |           50.000x            | [fuente](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| Bitcoin                      |              131               |           50,000x            | [fuente](https://ccaf.io/cbnsi/cbeci/comparisons)                                                                                                                                 |
| PoW Ethereum                 |               78               |           30.000x            | [fuente](https://digiconomist.net/ethereum-energy-consumption)                                                                                                                    |
| YouTube (solo gasto directo) |               12               |            4600x             | [fuente](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf)                                                                                     |
| Gaming en USA                |               34               |           13.000x            | [fuente](https://www.researchgate.net/publication/336909520_Toward_Greener_Gaming_Estimating_National_Energy_Use_and_Energy_Efficiency_Potential)                                 |
| Netflix                      |             0,451              |             173x             | [fuente](https://assets.ctfassets.net/4cd45et68cgf/7B2bKCqkXDfHLadrjrNWD8/e44583e5b288bdf61e8bf3d7f8562884/2021_US_EN_Netflix_EnvironmentalSocialGovernanceReport-2021_Final.pdf) |
| PayPal                       |              0,26              |             100x             | [fuente](https://app.impaakt.com/analyses/paypal-consumed-264100-mwh-of-energy-in-2020-24-from-non-renewable-sources-27261)                                                       |
| AirBnB                       |              0,02              |              8x              | [fuente](<https://s26.q4cdn.com/656283129/files/doc_downloads/governance_doc_updated/Airbnb-ESG-Factsheet-(Final).pdf>)                                                           |
| PoS Ethereum                 |             0,0026             |              1x              | [fuente](https://carbon-ratings.com/eth-report-2022)                                                                                                                              |

Es complicado obtener estimaciones precisas del consumo de energía, especialmente cuando lo que se mide tiene una cadena de suministro compleja o detalles de implementación que influyen en su eficiencia. Consideremos a Netflix o YouTube como ejemplos. Las estimaciones de su consumo de energía varían en función de si solo incluyen la energía utilizada para mantener sus sistemas y entregar contenido a los usuarios (_gasto directo_) o si incluyen el gasto necesario para producir contenido, mantener oficinas corporativas, publicidad, etc. (_gasto indirecto_). El uso indirecto también podría incluir la energía necesaria para consumir contenido en dispositivos de usuario final, como TV, computadoras y dispositivos móviles, que a su vez depende de qué dispositivos se utilizan.

Hay discusiones sobre esta cuestión en [Carbon Brief](https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix). En la tabla anterior, el valor reportado para Netflix incluye sus usos _directos_ e _indirectos_ reportados. YouTube solo proporciona una estimación de su propio gasto de energía _directo_, que es de alrededor de [12 TWh/año](https://www.gstatic.com/gumdrop/sustainability/google-2020-environmental-report.pdf).

La tabla y el gráfico de arriba también incluyen comparaciones con Bitcoin y Ethereum basado en prueba de trabajo. Es importante señalar que el consumo energético de las redes de prueba de trabajo no es estático, sino que cambia día a día. El valor utilizado para Ethereum basado en prueba de trabajo fue tomado justo antes de [La Fusión](/roadmap/merge/) a Ethereum basado en prueba de participación, como se predijo en [Digiconomist](https://digiconomist.net/ethereum-energy-consumption). Otras fuentes, como el [PoS Ethereum](https://ccaf.io/cbnsi/ethereum/1) estiman que el consumo de energía ha sido mucho menor (cerca de 20 TWh/año). Las estimaciones sobre el consumo de energía de Bitcoin también varían ampliamente entre fuentes y son un tema que genera mucho [debate](https://www.coindesk.com/business/2020/05/19/the-last-word-on-bitcoins-energy-consumption/), no solo sobre la cantidad de energía consumida, sino también sobre las fuentes de esa energía y cuestiones éticas relacionadas. El consumo de energía no se correlaciona necesariamente con la huella ambiental de manera precisa, debido a que diferentes proyectos pueden utilizar distintas fuentes de energía, como una proporción variable de energías renovables. Por ejemplo, el [Cambridge Bitcoin Electricity Consumption Index](https://ccaf.io/cbnsi/cbeci/comparisons) indica que teóricamente la demanda de la red de Bitcoin podría ser alimentada por quema de gas o electricidad que de otra manera se perdería en la transmisión y distribución. La ruta de Ethereum hacia la sostenibilidad consistió en reemplazar la parte de la red que consumía mucha energía por una alternativa ecológica.

Las estimaciones de consumo de energía y emisiones de carbono se pueden consultar en el sitio web del [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum).

## Estimaciones por transacción {#per-transaction-estimates}

Muchos artículos estiman el gasto de energía “por transacción” para las cadenas de bloques. Esto puede ser engañoso porque la energía requerida para proponer y validar un bloque es independiente del número de transacciones dentro de él. Medir el gasto de energía por transacción implica que una menor cantidad de transacciones conduciría a un menor gasto energético y viceversa, lo cual no es el caso. Además, las estimaciones por transacción son muy sensibles a cómo se define el rendimiento de transacciones de la cadena de bloques, y cambiar esta definición se puede manipular para que el valor parezca mayor o menor.

Por ejemplo, en Ethereum, el rendimiento de transacciones (o la velocidad de procesamiento) no es solo el de la capa base, sino también la suma del rendimiento de transacciones de todos sus rollups de [capa 2](/layer-2/). Las capas 2 generalmente no se incluyen en los cálculos, pero tener en cuenta la energía adicional consumida por los secuenciadores (pequeños) y la cantidad de transacciones que procesan (grande) probablemente reduciría drásticamente las estimaciones por transacción. Esta es una de las razones por la cual las comparaciones del consumo de energía por transacción entre plataformas pueden ser engañosas.

## Deuda de carbono de Ethereum {#carbon-debt}

El gasto energético de Ethereum es muy bajo, pero no siempre ha sido así. Ethereum originalmente usaba la prueba de trabajo, que tenía un costo ambiental mucho mayor que el del mecanismo de prueba de participación actual.

Desde el principio, Ethereum planeó implementar un mecanismo de consenso basado en prueba de participación, pero hacerlo sin sacrificar la seguridad y la descentralización llevó años de investigación y desarrollo. Por lo tanto, se utilizó un mecanismo de prueba de trabajo para poner en marcha la red. La prueba de trabajo requiere que los mineros usen su hardware informático para calcular un valor, lo que consume energía en el proceso.

![Comparación del consumo de energía de Ethereum antes y después de La Fusión, utilizando la Torre Eiffel (330 metros de altura) a la izquierda para simbolizar el alto consumo de energía antes de esta, y un pequeño muñeco Lego de 4 cm de altura a la derecha para representar la drástica reducción en el consumo después de La Fusión.](energy_consumption_pre_post_merge.png)

El CCRI estima que La Fusión redujo el consumo eléctrico anual de Ethereum en más del **99,988%**. Del mismo modo, la huella de carbono de Ethereum se redujo en aproximadamente el **99,992%** (de 11.016.000 a 870 toneladas de CO2e). Para poner esto en perspectiva, la reducción en las emisiones es como pasar de la altura de la Torre Eiffel a un pequeño muñeco de juguete, como se ve en la figura anterior. Como resultado, el costo ambiental de asegurar la red se reduce drásticamente. Al mismo tiempo, se cree que la seguridad de la red ha mejorado.

## Una capa de aplicación ecológica {#green-applications}

Mientras que el consumo de energía de Ethereum es muy bajo, también se está desarrollando en Ethereum una comunidad considerable, creciente y muy activa de [**finanzas regenerativas (ReFi)**](/refi/). Las aplicaciones ReFi usan componentes DeFi para crear aplicaciones financieras que tienen externalidades positivas que benefician al entorno. ReFi es parte de un movimiento ["solarpunk"](https://en.wikipedia.org/wiki/Solarpunk) más amplio que está estrechamente alineado con Ethereum y tiene como objetivo combinar el progreso tecnológico y la gestión medioambiental. La naturaleza descentralizada, sin permisos y componible de Ethereum lo convierten en la capa base ideal para las comunidades de ReFi y solarpunk.

Las plataformas nativas de financiación de bienes públicos de la Web3, como [Gitcoin](https://gitcoin.co), realizan rondas climáticas para estimular el desarrollo respetuoso con el medio ambiente en la capa de aplicación de Ethereum. A través del desarrollo de estas iniciativas (y otras, por ejemplo, [DeSci](/desci/)), Ethereum se está convirtiendo en una tecnología medioambiental y socialmente positiva.

<InfoBanner emoji=":evergreen_tree:">
  Si cree que esta página puede ser más precisa, plantee un problema o solicitud pull (PR). Las estadísticas de esta página son estimaciones basadas en datos disponibles públicamente; no representan una declaración oficial ni una promesa del equipo de ethereum.org ni de la Ethereum Foundation.
</InfoBanner>

## Más información {#further-reading}

- [Cambridge Blockchain Network Sustainability Index](https://ccaf.io/cbnsi/ethereum)
- [Informe de la Casa Blanca sobre las cadenas de bloques de prueba de trabajo](https://www.whitehouse.gov/wp-content/uploads/2022/09/09-2022-Crypto-Assets-and-Climate-Report.pdf)
- [Emisiones Ethereum: un cálculo estimado ascendente](https://kylemcdonald.github.io/ethereum-emissions/), _Kyle McDonald_
- [Índice de consumo energético de Ethereum](https://digiconomist.net/ethereum-energy-consumption/), _Digiconomista_
- [ETHMerge.com](https://ethmerge.com/), _[@InsideTheSim](https://twitter.com/InsideTheSim)_
- [La Fusión: Implicaciones en el consumo eléctrico y la huella de carbono de la red de Ethereum](https://carbon-ratings.com/eth-report-2022) - _CCRI_
- [Consumo energético de Ethereum](https://mirror.xyz/jmcook.eth/ODpCLtO4Kq7SCVFbU4He8o8kXs418ZZDTj0lpYlZkR8)

## Temas relacionados {#related-topics}

- [Visión de Ethereum](/roadmap/vision/)
- [La cadena de baliza](/roadmap/beacon-chain)
- [La fusión](/roadmap/merge/)
