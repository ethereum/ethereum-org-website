---
title: Tókenes no fungibles (NFT)
description: Una visión general de los NFT en Ethereum
lang: es
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /infrastructure_transparent.png
alt: Un logotipo Eth mostrado a través de un holograma.
summaryPoint1: Una forma de representar cualquier cosa exclusiva como un activo de Ethereum.
summaryPoint2: Los NFT están otorgando más poder a los creadores de contenido que nunca.
summaryPoint3: Impulsados por contratos inteligentes en la cadena de bloques de Ethereum.
---

## ¿Qué son los NFT? {#what-are-nfts}

Los NFT son tókenes individualmente únicos. Cada NFT tiene diferentes propiedades (no fungibles) y es probable que no abunde. Es distinto de tókenes como el ERC-20, en el que cada token en el conjunto es idéntico y tiene las mismas propiedades (denominadas «fungibles»). A usted no le importa saber qué billete de un dólar tiene en su cartera en concreto, ya que todos son los billetes son idénticos y valen lo mismo. Pero, _sí_ le importaría saber qué NFT en concreto posee, porque cada uno tiene propiedades individuales que lo distinguen de los demás («no fungibles»).

El carácter único de cada NFT permite la tokenización de cosas como arte, bienes coleccionables, o incluso bienes raíces, donde cada NFT específico es único y representa algo específico que es único en el mundo real o digital. El propietario de un activo está respaldado por la cadena de bloques de Ethereum y nadie puede modificar el registro de propiedad, ni copiar ni pegar un NFT nuevo.

<YouTube id="Xdkkux6OxfM" />

## El Internet de los activos {#internet-of-assets}

Los NFT y Ethereum solucionan algunos de los problemas que existen hoy en día en Internet. Visto el entorno cada vez más digital en el que nos movemos, es necesario imitar las propiedades de los objetos físicos, tales como su escasez, su singularidad y la veracidad del derecho de propiedad. de una manera que no esté controlada por una organización centralizada. Por ejemplo, con los NFT, se pueden poseer archivos musicales en mp3, siempre que no pertenezcan a la aplicación específica de música propiedad de una empresa, o ser usuario de una red social que le permita vender o intercambiar archivos musicales, y que ningún proveedor de plataformas se lo pueda quitar arbitrariamente.

El Internet de los NFT es comparable con el Internet que la mayoría de nosotros conocemos hoy en día...

### Una comparación {#nft-comparison}

| Internet con NFT                                                                                                                                            | Internet actual                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ¡Usted es dueño de sus activos! Sólo usted puede venderlos o intercambiarlos.                                                                               | Usted alquila un activo a alguna organización.                                                                                                                                                   |
| Los NFT son únicos digitalmente: no hay dos NFT iguales.                                                                                                    | La copia de un elemento, muchas veces no se puede distinguir de la original.                                                                                                                     |
| El derecho de propiedad de un NFT está almacenado en la cadena de bloques para que cualquiera lo verifique.                                                 | Los registros con los derechos de propiedad de los objetos digitales se almacenan en servidores controlados por instituciones, y a usted no le queda otra alternativa que confiar en su palabra. |
| Los NFT son contratos inteligentes en Ethereum. Esto significa que pueden ser facilmente usados en otros contratos inteligentes y aplicaciones en Ethereum. | Las empresas con activos digitales suelen necesitar su propia infraestructura de «jardín cerrado».                                                                                               |
| Los creadores de contenido pueden vender su trabajo en cualquier lugar y acceder a un mercado global.                                                       | Los creadores dependen de la infraestructura y la distribución de las plataformas que usan. A menudo suelen estar sujetos a condiciones de uso y restricciones geográficas.                      |
| Los creadores de NFT pueden conservar los derechos de propiedad sobre sus obras, y programar derechos de autor directamente en el contrato del NFT.         | Las plataformas (como los servicios de streaming de música) retienen la mayoría de las ganancias de las ventas.                                                                                  |

## ¿Cómo funcionan los NFT? {#how-nfts-work}

Como cualquier token emitido en Ethereum, los NFT se emiten mediante un contrato inteligente. El contrato inteligente se ajusta a uno de los distintos estándares de NFT que existen —los más comunes son el ERC-721 o el ERC-1155— y esto define las funciones que tiene el contrato. El contrato puede crear (acuñar) los NFT y asignarlos a un dueño específico. La propiedad del NFT viene definida dentro del contrato a través de un mapeo de trazabilidad que asigna un NFT concreto a una dirección específica. El NFT tiene un ID y suele llevar metadatos asociados, que lo convierten en un token único.

Cuando alguien crea o acuña un NFT, lo que realmente están haciendo es ejecutar una función en el contrato inteligente que asigna ese NFT en particular a su dirección. Esta información se guarda en el almacenamiento interno del contrato que forma parte de la cadena de bloques. El creador del contrato puede incorporar la lógica adicional al contrato, por ejemplo, al limitar el número total de tókenes, o pedir derechos de autor que se le pagarán al creador cada vez que el token se transfiera.

## ¿Para qué se usan los NFT? {#nft-use-cases}

Los NFT se usan para muchas cosas, como por ejemplo:

- demostrar la asistencia a un evento
- certificar que completó un curso
- definir la propiedad de artículos en un videojuego
- arte digital
- tokenización de activos del mundo real
- comprobar su identidad digital
- limitar el acceso a contenido
- venta de entradas
- crear nombres de dominio de Internet descentralizados
- usarlos como garantía en DeFi

Tal vez usted es un artista que quiere compartir su arte a través de los NFT, sin perder el control de su propiedad intelectual ni sacrificar sus ganancias, dándoselas a intermediarios. Puede crear un nuevo contrato que especifique el número de NFT, sus propiedades y añadir un enlace a la obra de arte específica. Como artista, usted puede programar en su contrato inteligente los derechos de autor que debería recibir (por ejemplo, «transferir 5 % del precio de venta al dueño del contrato cada vez que se transfiera el NFT»). También podrá demostrar en todo momento que creó usted los NFT, al ser el propietario o la propietaria de la cartera utilizada en el contrato. Sus compradores podrán comprobar fácilmente que poseen un NFT auténtico de su colección, ya que la dirección de sus carteras estará asociada a un token en su contrato inteligente. Los pueden usar a través del ecosistema de Ethereum, confiando en su autenticidad.

O pongamos, por ejemplo, una entrada a un evento deportivo. Al igual que el organizador de un evento puede escoger el número de entradas que va a vender, el creador de un NFT también puede decidir cuántas copias existirán. En algunos casos las copias son idénticas, como 5.000 entradas de admisión general. Algunas veces muchas copias acuñadas son muy similares, pero cada una difiere ligeramente, como una entrada con un asiento asignado. Estas se pueden comprar y vender entre pares directamente, sin tener que pasar por promotores o intermediarios de venta, porque pueden asegurarse de la autenticidad de la entrada revisando la dirección del contrato donde se crearon.

Aquí en ethereum.org, utilizamos NFT para reconocer a las personas que han contribuido a nuestro repositorio de GitHub, su asistencia a las reuniones, e incluso tenemos nuestro NFT del nombre de nuestro dominio. Si contribuye a ethereum.org, puede reclamar un NFT POAP. Algunos eventos y encuentros de criptomonedas utilizan POAP (protocolos de prueba de asistencia) para sus entradas. [Más información sobre cómo contribuir](/contributing/#poap).

![POAP de ethereum.org](./poap.png)

El nombre de dominio alternativo de esta página web también funciona a través de NFT, **ethereum.eth**. Nuestra dirección `.org` está gestionada por un proveedor de sistemas de nombres de dominio (DNS), mientras que ethereum`.eth` está registrado en Ethereum a través del servicio de nombres de Ethereum (ENS). Este último es de nuestra propiedad y lo administramos nosotros mismos. [Échele un vistazo a nuestro registro de ENS](https://app.ens.domains/name/ethereum.eth)

[Más información sobre ENS](https://app.ens.domains)

<Divider />

### Seguridad de los NFT {#nft-security}

La seguridad en Ethereum proviene de la prueba de participación. El sistema está diseñado para desincentivar económicamente acciones maliciosas, haciendo que Ethereum sea a prueba de manipulación y fraude. Esto es lo que hace que los NFT sean posibles. Una vez que finalice el bloque que contiene su transacción de NFT, le costaría a un atacante millones de ETH cambiarla. Cualquiera que ejecute el software Ethereum podría detectar inmediatamente una manipulación deshonesta con un NFT, y el causante recibiría una penalización económica y se le expulsaría.

Las cuestiones de seguridad en relación a los NFT están casi siempre relacionadas con estafas de phishing, puntos flacos en los contratos inteligentes o errores de usuario (como exponer sus claves privadas sin darse cuenta), haciendo que la adopción de óptimas medidas de seguridad y la gestión de la cartera sean dos criterios fundamentales para los propietarios de NFT.

<ButtonLink to="/security/">
  Más sobre seguridad
</ButtonLink>

## Más información {#further-reading}

- [Guía sobre NFT para principiantes](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d), _Linda Xie, enero del 2020_
- [Rastreador EtherscanNFT](https://etherscan.io/nft-top-contracts)
- [Estándar de token ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Estándar de token ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
