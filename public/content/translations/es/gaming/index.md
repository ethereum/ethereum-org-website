---
title: Juegos en Ethereum
description: Aprende cómo Ethereum impulsa los juegos en cadena con reglas verificables, activos propiedad de los jugadores y ecosistemas abiertos sobre los que cualquiera puede construir.
lang: es
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoints:
  - "Las reglas y el estado del juego pueden ser aplicados por la cadena de bloques de Ethereum, no por los servidores de un estudio, lo que representa un beneficio clave de los juegos en cadena"
  - "Cualquiera puede crear mods, bots o juegos completamente nuevos que se conecten a los mismos datos abiertos en cadena"
  - "Las l2 creadas para este propósito permiten jugar en tiempo real con tarifas más bajas, mientras que los marcos de desarrollo de juegos hacen que la creación de juegos en cadena sea más accesible que nunca"
buttons:
  - content: Más información
    toId: gaming-on-ethereum
  - content: Explorar juegos
    toId: games
    isSecondary: false
---

## Juegos en Ethereum {#gaming-on-ethereum}

Los juegos en Ethereum se presentan en varias formas, desde juegos que utilizan la cadena de bloques para características específicas hasta aquellos en los que todo el mundo del juego vive en cadena. La cadena de bloques de Ethereum se puede utilizar con los juegos en diversas capacidades. Los juegos pueden almacenar sus monedas como tokens transferibles u otros activos del juego (personajes, equipamiento, mascotas, etc.) en forma de [tokens no fungibles (NFT)](/nft/). Los juegos también pueden utilizar contratos inteligentes para alojar su lógica, reglas y estado en cadena. Estos juegos se conocen comúnmente como "juegos totalmente en cadena".

El ecosistema de Ethereum también incluye [cadenas de bloques de capa 2 (l2)](/layer-2/learn/) que heredan las garantías de seguridad de la red principal de Ethereum al tiempo que amplían la escala de Ethereum y admiten casos de uso especializados. Las redes de l2 pueden proporcionar beneficios adicionales para los juegos en cadena y sus comunidades debido a sus tiempos de confirmación más rápidos y tarifas más bajas, lo que hace que el juego sea más accesible.

A medida que la [capa 1 (l1) escala](/roadmap/scaling/), los juegos están comenzando a regresar a la red principal de Ethereum. Un ejemplo es [Asphodel](https://x.com/asph0d37), un juego totalmente en cadena que actualmente se encuentra en fase de pruebas en la l1 de Ethereum. Sin embargo, la mayoría de los juegos todavía utilizan soluciones de l2 para beneficiarse de tarifas más bajas.

## El auge de los juegos en Ethereum {#rise-of-ethereum-gaming}

Los MMO tradicionales como EVE Online, World of Warcraft, MapleStory y RuneScape demostraron que las economías virtuales podían generar valor en el mundo real. Los jugadores farmeaban oro para obtener ingresos, la economía de EVE reflejaba los sistemas financieros reales y la cultura de los mods (Counter-Strike, DotA 2, servidores de Minecraft) demostró que los jugadores querían crear sobre mundos existentes. Incluso la [famosa frustración de Vitalik por un "nerfeo" en World of Warcraft](https://youtu.be/Letsfuhpobw?t=140) se convirtió en un símbolo temprano de los problemas con los ecosistemas de juegos cerrados. Pero los estudios lo controlaban todo; podían prohibir cuentas, cerrar servidores o reclamar la propiedad del contenido creado por los jugadores.

Cuando se lanzó Ethereum, **los diseñadores de juegos vieron la oportunidad de construir mundos que no se pudieran cerrar**. [Como dijo Ronan Sandford, creador de Conquest.eth](https://ronan.eth.limo/blog/infinite-games/): "Desde el día en que me topé con Ethereum, me enganchó la idea de crear juegos que se ejecuten y evolucionen independientemente de su creador".

La cadena de bloques de Ethereum permitió mundos donde las reglas no se pueden cambiar arbitrariamente, el estado no se puede eliminar y cualquiera puede construir extensiones que vivan tanto tiempo como exista la red. Esto es algo que Ethereum proporciona de forma nativa.

## Descripción general del ecosistema de juegos de Ethereum {#ethereums-gaming-ecosystem-overview}

- **Capas 2:** Con tarifas más baratas y tiempos de transacción cortos, las l2 de Ethereum se convirtieron en un lugar común para el lanzamiento de juegos. El panorama de las l2 continúa evolucionando, con ecosistemas de juegos Web3 líderes como Ronin (originalmente una cadena lateral para Axie Infinity) que recientemente hicieron la transición a la arquitectura de capa 2 de Ethereum, heredando las garantías de seguridad de Ethereum mientras conservan su infraestructura optimizada para juegos. Las l2 líderes actuales para juegos incluyen: [Ronin](https://www.roninchain.com/), [Starknet](https://www.starknet.io/), [Abstract](https://abs.xyz/), [Immutable](https://www.immutable.com/) y [Base](https://www.base.org/).
- **Infraestructura:** Para facilitar el desarrollo de juegos en cadena, existen varias pilas de herramientas; [Cartridge](https://cartridge.gg/) (que ofrece claves de sesión, transacciones sin gas a través de un pagador y autenticación basada en WebAuthn a través de Cartridge Controller), [Dojo](https://dojoengine.org/) (un marco de juegos demostrables con soporte nativo de abstracción de cuentas), [MUD](https://mud.dev/) (un motor de juegos en cadena basado en EVM). Otros, como [Proof of Play](https://proofofplay.com/) y [Thirdweb](https://thirdweb.com/), permiten a los desarrolladores crear juegos con experiencias de usuario similares a las de la Web2.
- **Comunidades de juegos:** El ecosistema de juegos de Ethereum está respaldado por gremios de juegos, que incluyen ([YGG](https://x.com/YieldGuild), [MANA Gaming](https://x.com/ManaGamingBR), [WASD](https://x.com/WASD_0x), [LegacyGG](https://x.com/Lgc_GG), [Gaming Grid](https://x.com/GamingGridx) y [OLAGG](https://x.com/OLAGuildGames)) para la colaboración de los jugadores, plataformas de descubrimiento como [GAM3S.GG](https://games.gg/) y medios de comunicación como [Gaming Daily](https://x.com/GamingDailyx) para el análisis de juegos y la cobertura del ecosistema. Algunos abarcan todos estos, como [FOCGERS](https://x.com/FOCGERS).
- **Géneros de juegos:** Ciertos géneros de juegos se alinean naturalmente con las propiedades únicas de la cadena de bloques de Ethereum: **estado persistente**, **lógica verificable** y **economías propiedad de los jugadores**. Los desarrolladores abordan la integración de manera diferente. Algunos construyen juegos totalmente en cadena donde toda la lógica y el estado viven en la cadena de bloques, mientras que otros usan la cadena de bloques mínimamente para la propiedad de activos, como los cosméticos NFT. Los desarrolladores están descubriendo qué tipos de juego se benefician más de la arquitectura en cadena, que incluyen:
   1. **Exploración de mazmorras y roguelikes:** Las mazmorras de muerte permanente totalmente en cadena de Loot Survivor con puntuaciones altas verificables, Maze of Gains de Onchain Heroes, así como su versión con temática de Axie llamada Axie: Den of Mysteries, que combinan la exploración de laberintos con mecánicas de finanzas descentralizadas (DeFi).
   2. **MMO:** El MMO estacional de riesgo para ganar Gold Rush de Cambria con mecánicas de JcJ y extracción, donde cada paso fuera de las zonas seguras conlleva apuestas reales. El juego de estrategia MMO totalmente en cadena de ForTheKingdom, que presenta guerras de facciones a gran escala. Axie Infinity: Atia's Legacy, un MMO en cadena en Ronin donde los jugadores luchan a través de mazmorras JcE y batallas JcJ con apuestas reales. 
   3. **Estrategia 4X y gran estrategia:** Conquest.eth, un juego sin permisos de conquista espacial y diplomacia donde los jugadores depositan tokens en garantía en planetas para producir flotas y formar alianzas, en un juego que se ejecuta para siempre en cadena. Realms lleva las mecánicas 4X de Ethereum a un entorno de fantasía, donde los jugadores controlan Realms (NFT de tierras) para extraer recursos, construir ejércitos y participar en una diplomacia compleja dentro de una economía impulsada completamente por los jugadores. Dark Forest fue pionero en el género con mecánicas de niebla de guerra de prueba de conocimiento cero y actualmente se mantiene como una bifurcación de la comunidad por DFArchon.
   4. **Estrategia y táctica:** Realms incluye las intensas partidas de estrategia de 1 hora basadas en la compra de entrada de Blitz, y el próximo juego de batallas automáticas Asphodel se está probando en la red principal de Ethereum.
   5. **Juegos de cartas coleccionables:** Showdown combina la estrategia de los juegos de cartas coleccionables con la intensidad del póquer. Axie Infinity Classic es una combinación de ajedrez, póquer y Pokémon, y el primer juego Web3 en alcanzar millones de jugadores.
   6. **Arenas competitivas:** Duel Arena de Cambria, donde los jugadores depositan ETH en garantía en duelos a muerte 1 contra 1 de ritmo rápido. AveForge, una arena de batalla de mechas competitiva donde los jugadores pilotan mechas personalizables.

## Juegos para probar {#games}

<CategoryAppsGrid category="gaming" />

## Características de los juegos en cadena {#features-of-onchain-games}

1. **Forma segura de intercambiar bienes digitales**

   Los activos del juego negociables se pueden intercambiar entre jugadores por otros activos del juego o tokens en esa cadena. En el pasado, los juegos comúnmente se enfrentaban al desafío de facilitar el comercio justo entre los jugadores, especialmente para artículos escasos y valiosos. Los mercados de terceros y el comercio entre pares a menudo llevaban a que los jugadores fueran engañados o estafados con sus preciadas posesiones. Debido a que los activos en cadena siguen una estructura de datos establecida, se pueden integrar fácilmente con los mercados existentes, lo que brinda a los jugadores tranquilidad al intercambiarlos. Los avances en los creadores de mercado automatizados (AMM) también permiten a los jugadores intercambiar instantáneamente ciertos artículos sin tener que esperar a que una contraparte (comprador/vendedor) finalice su intercambio.

2. **Origen transparente de los activos**

   Las falsificaciones y copias de originales pueden ser un problema considerable al valorar artículos, especialmente si la persona no está muy familiarizada con cómo distinguir un artículo real de uno falso. Los activos en cadena siempre tienen un historial de registro completo de quién (qué billetera) los poseía y su dirección de origen. Incluso si existe una copia perfecta del artículo en cadena, se distingue claramente del original en función de su contrato inteligente de origen, lo que mitiga el riesgo de fraude.

3. **Lógica transparente**

   Los juegos totalmente en cadena utilizan contratos inteligentes para su funcionalidad. Esto significa que cualquiera puede revisar y verificar la lógica del juego, asegurando que se ejecute de acuerdo con lo que los desarrolladores pretendían. Esta transparencia lógica también permite a otros desarrolladores crear nuevos contratos inteligentes que pueden expandir el juego o integrarse con algunas de sus características.

4. **Logros demostrables**

   En los juegos totalmente en cadena, cada acción del jugador se registra en la cadena de bloques. Esto hace que sea muy fácil comprobar y verificar si un jugador realizó las acciones requeridas para un determinado hito/logro. Debido a la naturaleza inmutable de las cadenas de bloques, esos registros de logros permanecerán intactos mientras la cadena siga funcionando, y pueden ser verificados por cualquier parte (no solo por los desarrolladores, como se ve comúnmente en los juegos tradicionales).

5. **Juegos para siempre**

   Los jugadores invierten mucho tiempo y esfuerzo en construir su reputación y personajes en el juego, pero ese progreso se puede perder fácilmente si los desarrolladores deciden cerrar los servidores (especialmente si es un juego en línea). Dado que los juegos totalmente en cadena almacenan su lógica y estado en cadena, los jugadores aún pueden interactuar con los contratos inteligentes del juego, incluso si el desarrollador principal del juego cesa el desarrollo. Estos juegos aún se pueden jugar y continúan recibiendo actualizaciones de sus comunidades porque su lógica aún se ejecuta en la cadena de bloques.

## Cómo los juegos integran las cadenas de bloques {#how-games-integrate-blockchains}

Los desarrolladores de juegos pueden decidir incorporar diferentes características de Ethereum en sus juegos. El hecho de que las características existan no significa que todos los juegos creados en Ethereum deban usarlas todas, ya que existen soluciones alternativas (con sus propios pros y contras) que los desarrolladores pueden usar en su lugar.

### Iniciar sesión con Ethereum {#sign-in-with-ethereum}

Los jugadores pueden usar sus cuentas en cadena para iniciar sesión en el juego. Esto generalmente se facilita mediante la firma de una transacción con la billetera Web3 de un jugador. Luego, los jugadores pueden mantener sus activos del juego y llevar su reputación de jugador en una sola cuenta, en cualquier juego en el que inicien sesión usando la misma billetera. La [EVM](/developers/docs/evm/) de Ethereum es un estándar de uso común en muchas cadenas de bloques, por lo que un jugador a menudo puede usar la misma cuenta para iniciar sesión en juegos en cualquier cadena de bloques compatible con EVM que admita la billetera (nota: algunas billeteras Web3 requieren una importación manual de RPC, especialmente para cadenas de bloques más nuevas, antes de que puedan usarse para hacer algo en esa cadena).

### Tokens fungibles {#fungible-tokens}

Al igual que el ether, los recursos y monedas fungibles del juego se pueden almacenar en cadena como tokens fungibles. Luego, los tokens se pueden enviar entre direcciones y usar en contratos inteligentes, lo que permite a los jugadores intercambiar o regalar recursos y monedas del juego en mercados abiertos.

### Tokens no fungibles {#non-fungible-tokens}

Los tokens no fungibles representan activos digitales únicos con propiedades distintas y registros de propiedad almacenados en cadena. Ethereum alberga el ecosistema de NFT más grande, y [OpenSea](https://opensea.io/) sigue siendo el mercado de propósito general dominante para el comercio de NFT de juegos entre cadenas. Los desarrollos recientes muestran que los NFT evolucionan más allá de los coleccionables estáticos, como los Axies de Axie Infinity, hacia activos digitales dinámicos y funcionales que se pueden usar para jugar juegos en cadena.

Los NFT de Bestias en Loot Survivor de Starknet almacenan metadatos totalmente en cadena, que incluyen especie, nivel, salud, tipo de combate e historial de derrotas. Esto hace que cada NFT sea un **registro verificable y permanentemente en cadena de los eventos del juego**. Cuando un jugador es el primero en derrotar a una Bestia con nombre, acuña el NFT, y esa Bestia continúa apareciendo en la mazmorra de todos los demás jugadores; cada muerte posterior a manos de esa Bestia se registra en sus metadatos, creando interacciones entre jugadores sin requerir servidores centrales. Las muertes de los jugadores generan recompensas para el NFT de la Bestia en propiedad. 

Los NFT ROM de Gigaverse funcionan como fábricas, generando materiales y recursos con el tiempo. En lugar de poseer un solo artículo, los jugadores pueden poseer infraestructura de fabricación, introduciendo **mecánicas de cadena de suministro y generación de valor continuo a las economías de los juegos**. Los NFT 'Core' de Cambria en Abstract cambian el modelo de microtransacciones al permitir a los jugadores acuñar mascotas y aspectos. Los poseedores de Core ganan fragmentos (Shards), los queman para crear nuevos cosméticos y los intercambian en mercados impulsados por los jugadores, mientras que el estudio gana con las regalías en lugar de las ventas directas.  


### Contratos inteligentes {#smart-contracts}

Los juegos totalmente en cadena utilizan contratos inteligentes para crear una lógica de juego transparente e inmutable. En tales casos, la cadena de bloques sirve como el backend del juego, reemplazando la necesidad de alojar su lógica y almacenamiento de datos en un servidor centralizado. (Nota: no todos los juegos Web3 son juegos totalmente en cadena. Como se mencionó anteriormente, depende de cada caso cuánto de los datos y la lógica del juego se almacena en cadena, en comparación con otra capa de disponibilidad de datos o en un servidor clásico).

## Evolución de las mejoras en la experiencia del usuario (UX) del jugador {#evolution-of-player-ux-improvements}

### Interoperabilidad y juego intercadena {#interoperability-and-cross-chain-play}

Los avances en las interacciones intercadena y los puentes permiten a los jugadores acceder a los juegos en Ethereum de manera más fluida que nunca. Los juegos se pueden implementar en múltiples cadenas de bloques, y los activos en cadena de un juego pueden ser integrados por otro juego. En el pasado, a los jugadores generalmente se les exigía puentear sus fondos a otra cadena antes de poder comenzar a usarlos en el juego. Hoy en día, los juegos comúnmente integran puentes de tokens a otras cadenas para facilitar la incorporación de los jugadores.

### Mejoras en la escalabilidad y las tarifas de gas {#scalability-and-gas-fee-improvements}

En 2017, la locura en torno a CryptoKitties aumentó drásticamente las tarifas de gas para todos los usuarios que realizaban transacciones en Ethereum. Desde entonces, se han implementado con éxito numerosas Propuestas de Mejora de Ethereum en las actualizaciones de la red, aumentando el ancho de banda de la red principal de Ethereum y reduciendo significativamente las tarifas de transacción promedio. Las l2 amplían aún más la capacidad de procesamiento disponible, reduciendo las tarifas de transacción a centavos o incluso menos. Las tarifas más bajas y la mayor capacidad de procesamiento han ampliado los casos de uso de juegos que se pueden construir en Ethereum, admitiendo acciones de alto volumen y microtransacciones en el juego que no excluyen a los jugadores cotidianos por su precio.

### Inicios de sesión sociales {#social-logins}

El inicio de sesión con una cuenta de Ethereum en cadena, que se puede usar en todas las cadenas de bloques compatibles con EVM, es uno de los métodos de autenticación más comunes. Algunas cadenas que no son EVM también lo usan como una opción para crear una cuenta. Sin embargo, si un nuevo jugador no tiene una cuenta de Ethereum existente y quiere crear fácilmente una cuenta para iniciar sesión en un juego, la [abstracción de cuentas](/roadmap/account-abstraction/) le permite iniciar sesión con sus cuentas sociales y crear una cuenta de Ethereum en segundo plano.

### Pagador y claves de sesión {#paymaster-and-session-keys}

Pagar tarifas de gas para enviar transacciones en cadena o interactuar con contratos inteligentes puede ser un punto de fricción significativo para muchos jugadores nuevos. Las cuentas de pagador pueden ser financiadas por el jugador o subsidiadas por el juego. Las claves de sesión permiten al jugador permanecer conectado al juego durante toda la duración de su sesión, lo que requiere que firme solo el primer mensaje de su sesión, y los mensajes posteriores se firman en segundo plano.

Existen filosofías contrastantes en torno a estas mecánicas. Un ejemplo destacado es Kamigotchi de Initia, que trata el gas pagado por el jugador como ingresos directos. Por el contrario, el ecosistema de juegos Realms.World, que incluye más de 4 juegos totalmente en cadena en vivo en Starknet, adopta el enfoque opuesto. Todos los juegos del ecosistema utilizan el pagador de Cartridge, lo que permite a los jugadores interactuar con los juegos sin costo de gas. Mientras que Kamigotchi adopta las tarifas de gas como parte del diseño económico, los juegos de Realms.World ven los costos de gas principalmente como un obstáculo para la experiencia del jugador.

## Comienza a jugar en Ethereum {#get-started-with-gaming-on-ethereum}

1. **Encuentra un juego divertido para jugar:** explora los juegos enumerados anteriormente o explora plataformas como [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) y [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Configura tu billetera cripto:** los jugadores necesitan una billetera para administrar los activos digitales del juego y (en algunos casos) para iniciar sesión en los juegos. [Encuentra una billetera aquí](/wallets/find-wallet/).
3. **Financia tu billetera:** adquiere algo de ether (ETH) o tokens relevantes para la red de l2 en la que planeas jugar. [Aprende dónde obtener ETH aquí](/get-eth/). 
4. **Juega:** ¡comienza a jugar y disfruta de la verdadera propiedad de tu progreso en el juego!