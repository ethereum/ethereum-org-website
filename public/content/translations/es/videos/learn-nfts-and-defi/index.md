---
title: "¿Qué son los NFT y cómo se pueden usar en las finanzas descentralizadas?"
description: "Comprenda la mecánica de los tokens no fungibles (NFT) en Ethereum y cómo se utilizan en las aplicaciones de finanzas descentralizadas (DeFi)."
lang: es
youtubeId: "Xdkkux6OxfM"
uploadDate: 2020-09-29
duration: "0:11:13"
educationLevel: beginner
topic:
  - "nfts"
  - "defi"
  - "erc-721"
  - "erc-1155"
  - "lending"
format: explainer
author: Finematics
breadcrumb: "NFT y DeFi"
---

Una explicación de **Finematics** que cubre la mecánica de los tokens no fungibles (NFT) en Ethereum y cómo se cruzan con las finanzas descentralizadas (DeFi), incluyendo los estándares de tokens, casos de uso y préstamos con colateral en NFT.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=Xdkkux6OxfM) publicada por Finematics. Ha sido ligeramente editada para facilitar su lectura.*

#### Fungible vs. no fungible (0:00) {#fungible-vs-non-fungible-000}

Empecemos con la palabra "fungible". Fungible significa que las unidades individuales de un activo son intercambiables e indistinguibles entre sí. Un buen ejemplo de un activo fungible es una moneda. Un billete de cinco dólares siempre tiene el mismo valor que cualquier otro billete de cinco dólares. Realmente no le importa qué billete de cinco dólares en particular recibe porque todos valen la misma cantidad.

Sin embargo, cuando se trata de activos no fungibles, cada unidad es única y no puede ser reemplazada directamente por otra. Un buen ejemplo es un billete de avión. Aunque los billetes de avión puedan parecer similares, cada uno lleva un nombre de pasajero, destino, hora de salida y número de asiento diferentes. Intentar intercambiar un billete de avión por otro podría causar problemas graves.

Otro ejemplo son las cartas coleccionables. Aunque puedan parecer similares, cada carta tiene atributos diferentes. Factores como el año de producción o cómo se conserva la carta pueden marcar la diferencia. Un ejemplo extremo de algo no fungible es una obra de arte: una pintura, por ejemplo, generalmente se crea como una única copia original.

#### Propiedades de los NFT (2:13) {#properties-of-nfts-213}

Ahora que sabemos qué significa "no fungible", veamos las propiedades más comunes de los NFT.

- **Único**: cada NFT tiene propiedades diferentes que generalmente se almacenan en los metadatos del token.
- **Demostrablemente escaso**: generalmente hay un número limitado de NFT, con el ejemplo extremo de tener solo una copia; el número de tokens se puede verificar en la cadena de bloques.
- **Indivisible**: la mayoría de los NFT no se pueden dividir en denominaciones más pequeñas, por lo que no puede comprar ni transferir una fracción de su NFT.

De manera similar a los tokens estándar, los NFT también garantizan la propiedad del activo, son fácilmente transferibles y a prueba de fraudes.

#### Estándares de tokens: ERC-20, ERC-721 y ERC-1155 (3:17) {#token-standards-erc-20-erc-721-and-erc-1155-317}

Aunque los NFT se pueden implementar en cualquier cadena de bloques que admita la programación de contratos inteligentes, los estándares más notables son ERC-721 y ERC-1155 en Ethereum. Antes de sumergirnos en los estándares de NFT, repasemos rápidamente el ERC-20, ya que será útil para la comparación.

**ERC-20** es un estándar muy conocido para crear tokens en la cadena de bloques de Ethereum. Los ejemplos incluyen monedas estables como USDT o DAI, y tokens DeFi como LEND, YFI, SNX y UNI. ERC-20 permite crear tokens fungibles: todos los tokens creados bajo este estándar son completamente indistinguibles. No importa si recibe USDT de un amigo o de un intercambio; el valor de cada token es el mismo.

**ERC-721** es el estándar para crear tokens no fungibles. Permite crear contratos que producen tokens distinguibles con diferentes propiedades. Un ejemplo común es el famoso CryptoKitties, un juego que permite coleccionar y criar gatitos virtuales.

**ERC-1155** es el siguiente paso en la creación de tokens no fungibles. Este estándar permite crear contratos que admiten tanto tokens fungibles como no fungibles. Fue creado por Enjin, un proyecto centrado en los juegos basados en la cadena de bloques. En muchos juegos como World of Warcraft, un jugador puede tener tanto artículos no fungibles (espadas, escudos, armaduras) como artículos fungibles, como oro o flechas. ERC-1155 permite a los desarrolladores definir tanto tokens fungibles como no fungibles y decidir cuántos de cada uno deben existir.

#### Casos de uso de los NFT (5:28) {#nft-use-cases-528}

Además de CryptoKitties, hay varios otros juegos populares que aprovechan los NFT, como Gods Unchained y Decentraland. Decentraland es un ejemplo interesante porque los jugadores pueden comprar parcelas de tierra digital que luego pueden revenderse o incluso usarse como espacio publicitario dentro del juego.

Otros ejemplos incluyen mercados de arte digital, como Rarible y SuperRare, e incluso agregadores de mercados como OpenSea. Otro ejemplo de algo escaso que se puede representar como NFT son los nombres de dominio; por ejemplo, Ethereum Name Service con la extensión .eth y Unstoppable Domains con la extensión .crypto.

Algunos NFT pueden ser extremadamente costosos. El CryptoKitty más caro, Dragon, se vendió por 600 ETH a finales de 2017, lo que equivalía a unos ciento setenta mil dólares en ese momento. Los nombres de dominio escasos como exchange.eth pueden valer más de quinientos mil dólares.

#### Los NFT como colateral en DeFi (6:48) {#nfts-as-collateral-in-defi-648}

Cuando se trata de DeFi, los NFT pueden desbloquear aún más potencial para las finanzas descentralizadas (DeFi). Actualmente, la gran mayoría de los protocolos de préstamos DeFi están colateralizados. Una de las ideas más interesantes es usar los NFT como colateral. Esto significa que podría suministrar un NFT que represente una obra de arte, tierra digital o incluso bienes raíces tokenizados como colateral, y pedir dinero prestado contra él.

Esto suena prometedor, pero hay un problema. En las plataformas estándar de préstamos y toma de préstamos DeFi como Compound o Aave, el valor del colateral suministrado se puede medir fácilmente integrando oráculos de precios. Estos agregan precios de múltiples fuentes líquidas, como intercambios centralizados y descentralizados. Cuando se trata de NFT, los mercados para tokens particulares a menudo son ilíquidos, lo que hace que el proceso de descubrimiento de precios sea complicado.

Para entender mejor este problema, imagine que alguien compra un CryptoKitty raro por 10 ETH. Este NFT se usa más tarde como colateral, y el prestatario retira 1.700 DAI, asumiendo que 10 ETH valen 3.500 dólares y este NFT en particular tiene una relación préstamo-valor del 50%. Después de esto, si nadie más está dispuesto a comprar este CryptoKitty en particular, el mercado para este NFT es ilíquido o incluso inexistente. La única suposición es que el NFT todavía vale la misma cantidad por la que se vendió por última vez, lo cual no es una suposición segura, ya que el valor de los NFT puede cambiar de manera bastante drástica.

Es por eso que algunos proyectos que ofrecen préstamos colateralizados con NFT utilizan un modelo ligeramente diferente: préstamos entre pares. En este modelo de mercado, los prestatarios pueden ofrecer sus NFT como colateral, y los prestamistas pueden elegir qué NFT están dispuestos a aceptar antes de iniciar un préstamo. El NFT utilizado como colateral se mantiene en un contrato de depósito en garantía, y si el prestatario incumple al no reembolsar la cantidad prestada más los intereses a tiempo, el NFT se transfiere al prestamista. Este espacio es nuevo, pero una de las empresas que utiliza este modelo es NFTfi.

#### Los NFT como productos financieros (9:32) {#nfts-as-financial-products-932}

Además de usarse como colateral, los NFT también pueden representar productos financieros más complejos, como seguros, bonos u opciones. Yinsure de Yearn Finance es un buen ejemplo del uso de NFT en el espacio de los seguros. En Yinsure, cada contrato de seguro se representa como un NFT que también se puede negociar en un mercado secundario como Rarible.

Recientemente también hemos comenzado a ver conceptos nativos de DeFi, como la minería de liquidez, siendo utilizados por proyectos de NFT. Rarible, por ejemplo, comenzó a recompensar a sus usuarios con tokens de gobernanza RARI por crear, comprar y vender NFT en su plataforma.

#### El creciente mercado de los NFT (10:30) {#the-growing-nft-market-1030}

Con más de 100 millones de dólares en NFT negociados y 6 millones de dólares solo en el mes más reciente, el espacio de los NFT es uno de los nichos de más rápido crecimiento en el mundo cripto. Tiene un enorme potencial que va desde gatitos digitales hasta productos financieros complejos.