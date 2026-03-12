---
title: Juegos en Ethereum
lang: es
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoint1: Las reglas del juego y el estado pueden ser aplicados por la cadena de bloques de Ethereum, no por los servidores de un estudio, lo que representa un beneficio clave de los juegos en cadena
summaryPoint2: Cualquiera puede crear mods, bots o juegos completamente nuevos que se conectan a los mismos datos abiertos en cadena
summaryPoint3: "Las L2 especialmente diseñadas permiten jugar en tiempo real con tarifas más bajas, mientras que los marcos de desarrollo de juegos hacen que crear juegos en cadena sea más accesible que nunca"
buttons:
  - content: Más información
    toId: gaming-on-ethereum
  - content: Explorar juegos
    toId: games
    isSecondary: false
---

## Juegos en Ethereum {#gaming-on-ethereum}

Los juegos en Ethereum se presentan en diversas formas, desde juegos que utilizan la cadena de bloques para funciones específicas hasta aquellos en los que todo el mundo del juego reside en cadena. La cadena de bloques de Ethereum se puede usar en juegos de varias formas. Los juegos pueden almacenar sus monedas como tokens transferibles u otros activos del juego (personajes, equipo, mascotas, etc.) en forma de [NFT (tokens no fungibles)](/nft/). Los juegos también pueden utilizar contratos inteligentes para alojar su lógica, reglas y estado en cadena. Estos juegos se conocen comúnmente como "juegos totalmente en cadena".

El ecosistema de Ethereum también incluye [cadenas de bloques de capa 2 (L2)](/layer-2/learn/) que heredan las garantías de seguridad de la red principal de Ethereum, al tiempo que amplían la escala de Ethereum y admiten casos de uso especializados. Las redes de L2 pueden proporcionar beneficios adicionales para los juegos en cadena y sus comunidades, ya que las L2 pueden ofrecer tiempos de confirmación más rápidos, un mayor volumen de procesamiento y tarifas más bajas, lo que hace que el juego sea más rápido y accesible.

## Descripción general del ecosistema de juegos de Ethereum {#ethereums-gaming-ecosystem-overview}

- **Capas 2:** Con tarifas más baratas y tiempos de transacción cortos, las L2 se convirtieron en un lugar común para el lanzamiento de juegos. Entre las principales capas 2 con juegos se incluyen: Starknet, Immutable, Base y Abstract.
- **Infraestructura:** Para facilitar el desarrollo de juegos en cadena, existen varias pilas de herramientas que se pueden utilizar con su propio proyecto, entre ellas: Cartridge, Dojo, Proof of Play y Thirdweb.
- **Gremios de juegos:** Los jugadores que quieran formar parte de una comunidad de jugadores pueden unirse a gremios de juegos para elaborar estrategias y colaborar con otros jugadores del gremio. Entre los gremios notables se incluyen: YGG, WASD, LegacyGG, Gaming Grid, OLAGG y más.
- **Juegos:** Los juegos de Ethereum se presentan en diferentes formas y tamaños, abarcando desde la estrategia en tiempo real de _Realms: Eternum_, hasta el MMO de _Axie: Atia's Legacy_, el RPG de acción de _Fableborn_ e incluso plataformas DeFi gamificadas como _Ponziland_. Con el lanzamiento regular de nuevos juegos en diferentes cadenas, siempre hay algo nuevo que explorar.

## Juegos para probar {#games}

<CategoryAppsGrid category="gaming" />

## Características de los juegos en cadena {#features-of-onchain-games}

1. **Forma segura de intercambiar bienes digitales**

   Los activos negociables del juego se pueden intercambiar entre jugadores por otros activos del juego o tokens en esa cadena. En el pasado, los juegos se enfrentaban comúnmente al desafío de facilitar un comercio justo entre jugadores, especialmente para artículos escasos y valiosos. Los mercados de terceros y el comercio entre pares a menudo llevaban a que los jugadores fueran engañados o estafados, perdiendo sus preciadas posesiones. Debido a que los activos en cadena siguen una estructura de datos establecida, se pueden integrar fácilmente con los mercados existentes, lo que brinda a los jugadores tranquilidad al intercambiarlos. Los avances en los AMM también permiten a los jugadores intercambiar ciertos artículos al instante sin tener que esperar a que una contraparte (comprador/vendedor) finalice su intercambio.

2. **Origen transparente de los activos**

   Las falsificaciones y copias de originales pueden ser un problema considerable al valorar los artículos, especialmente si la persona no está muy familiarizada con cómo distinguir un artículo real de uno falso. Los activos en cadena siempre tienen un historial completo de quién (qué billetera) los poseyó y su dirección de origen. Incluso si existe una copia perfecta del artículo en cadena, se distingue claramente del original por su contrato inteligente de origen, lo que mitiga el riesgo de fraude.

3. **Lógica transparente**

   Los juegos completamente en cadena utilizan contratos inteligentes para su funcionalidad. Esto significa que cualquiera puede revisar y verificar la lógica del juego, asegurando que se ejecute según lo previsto por los desarrolladores. Esta transparencia en la lógica también permite a otros desarrolladores crear nuevos contratos inteligentes que pueden expandir el juego o integrarse con algunas de sus características.

4. **Logros demostrables**

   En los juegos totalmente en cadena, cada acción del jugador se registra en la cadena de bloques. Esto hace que sea muy fácil comprobar y verificar si un jugador ha realizado las acciones necesarias para un determinado hito/logro. Debido a la naturaleza inmutable de las cadenas de bloques, esos registros de logros permanecerán intactos mientras la cadena siga funcionando, y pueden ser verificados por cualquier parte (no solo los desarrolladores, como se ve comúnmente en los juegos tradicionales).

5. **Juegos para siempre**

   Los jugadores invierten mucho tiempo y esfuerzo en construir su reputación y personajes en el juego, pero ese progreso puede perderse fácilmente si los desarrolladores deciden cerrar los servidores (especialmente si es un juego en línea). Dado que los juegos totalmente en cadena almacenan su lógica y estado en cadena, los jugadores pueden seguir interactuando con los contratos inteligentes del juego, incluso si el desarrollador principal del juego cesa el desarrollo. Estos juegos pueden seguir jugándose y recibir actualizaciones de sus comunidades porque su lógica sigue ejecutándose en la cadena de bloques.

## Cómo los juegos integran las cadenas de bloques {#how-games-integrate-blockchains}

Los desarrolladores de juegos pueden decidir incorporar diferentes características de Ethereum en sus juegos. El hecho de que existan estas características no significa que todos los juegos creados en Ethereum deban utilizarlas todas, ya que existen soluciones alternativas (con sus pros y sus contras) que los desarrolladores pueden usar en su lugar.

### Iniciar sesión con Ethereum {#sign-in-with-ethereum}

Los jugadores pueden usar sus cuentas en cadena para iniciar sesión en el juego. Esto generalmente se facilita mediante la firma de una transacción con la billetera web3 de un jugador. Los jugadores pueden entonces mantener sus activos del juego y llevar su reputación de jugador en una sola cuenta, en todos los juegos en los que inicien sesión con la misma billetera. La [EVM](/developers/docs/evm/) de Ethereum es un estándar de uso común en muchas cadenas de bloques, por lo que un jugador a menudo puede usar la misma cuenta para iniciar sesión en juegos en cualquier cadena de bloques compatible con EVM que la billetera admita (nota: algunas billeteras web3 requieren una importación manual de RPC, especialmente para cadenas de bloques más nuevas, antes de que se puedan usar para hacer algo en esa cadena).

### Tokens fungibles {#fungible-tokens}

Al igual que el ether, los recursos y las monedas fungibles del juego se pueden almacenar en cadena como tokens fungibles. Los tokens pueden entonces enviarse entre direcciones y usarse en contratos inteligentes, permitiendo a los jugadores comerciar o regalar recursos y monedas del juego en mercados abiertos.

### Tokens no fungibles {#non-fungible-tokens}

Los tokens no fungibles (NFT) pueden representar elementos únicos del juego, como personajes, objetos, terrenos o incluso estados de guardado. Con metadatos dinámicos, los NFT pueden evolucionar en respuesta a eventos del juego, lo que permite que los activos acumulen un historial a lo largo del tiempo. Por ejemplo, los NFT de Bestia en Loot Survivor registran permanentemente cuando un jugador específico derrota a una criatura única, incrustando ese resultado en el propio activo NFT. Este tipo de diseño apunta a juegos en los que los activos son persistentes, con estado y potencialmente utilizables en múltiples experiencias en cadena, en lugar de ser objetos de colección estáticos.

### Contratos inteligentes {#smart-contracts}

Los juegos totalmente en cadena usan contratos inteligentes para crear una lógica de juego transparente e inmutable. En tales casos, la cadena de bloques sirve como el backend del juego, reemplazando la necesidad de alojar su lógica y almacenamiento de datos en un servidor centralizado. (Nota: no todos los juegos de web3 son juegos totalmente en cadena. Como se mencionó anteriormente, depende de cada caso la cantidad de datos y lógica del juego que se almacena en cadena, en lugar de en otra capa de disponibilidad de datos o en un servidor clásico).

## Evolución de las mejoras en la UX del jugador {#evolution-of-player-ux-improvements}

### Interoperabilidad y juego entre cadenas {#interoperability-and-cross-chain-play}

Los avances en las interacciones entre cadenas y el uso de puentes permiten a los jugadores acceder a los juegos en Ethereum de forma más fluida que nunca. Los juegos se pueden implementar en múltiples cadenas de bloques, y los activos en cadena de un juego pueden ser integrados por otro juego. En el pasado, los jugadores generalmente debían pasar sus fondos por un puente a otra cadena antes de poder comenzar a usarlos en el juego. Hoy en día, los juegos suelen integrar puentes de tokens a otras cadenas para facilitar la incorporación de jugadores.

### Mejoras en la escalabilidad y las tarifas de gas {#scalability-and-gas-fee-improvements}

En 2017, la locura por los CryptoKitties aumentó drásticamente las tarifas de gas para todos los usuarios que realizaban transacciones en Ethereum. Desde entonces, se han implementado con éxito numerosas Propuestas de mejora de Ethereum en actualizaciones de la red, lo que ha aumentado el ancho de banda de la red principal de Ethereum y ha reducido significativamente las tarifas de transacción promedio. Las capas 2 amplían aún más el rendimiento disponible, reduciendo las tarifas de transacción a centavos o incluso menos. Las tarifas más bajas y el mayor rendimiento han ampliado los casos de uso de juegos que se pueden construir en Ethereum, admitiendo acciones de gran volumen y microtransacciones en el juego que no dejan fuera a los jugadores cotidianos.

### Inicios de sesión sociales {#social-logins}

Iniciar sesión con una cuenta de Ethereum en cadena, que se puede utilizar en todas las cadenas de bloques compatibles con EVM, es uno de los métodos de autenticación más comunes. Algunas cadenas que no son EVM también lo utilizan como una opción para crear una cuenta. Sin embargo, si un nuevo jugador no tiene una cuenta de Ethereum existente y quiere crear fácilmente una cuenta para iniciar sesión en un juego, la [abstracción de cuentas](/roadmap/account-abstraction/) le permite iniciar sesión con sus cuentas sociales y crear una cuenta de Ethereum en segundo plano.

### Paymaster y claves de sesión {#paymaster-and-session-keys}

Pagar tarifas de gas para enviar transacciones en cadena o interactuar con contratos inteligentes puede ser un punto de fricción significativo para muchos jugadores nuevos. Las cuentas Paymaster pueden ser financiadas por el jugador o subvencionadas por el juego. Las claves de sesión permiten al jugador permanecer conectado al juego durante toda la duración de su sesión, requiriendo que firmen solo el primer mensaje de su sesión, mientras que los mensajes posteriores se firman en segundo plano.

Existen filosofías contrapuestas en torno a estas mecánicas. Un ejemplo destacado es Kamigotchi de Initia, que trata el gas pagado por el jugador como un ingreso directo. En contraste, el ecosistema de juegos de Realms.World, que incluye más de 4 juegos en vivo totalmente en cadena en Starknet, adopta el enfoque opuesto. Todos los juegos del ecosistema utilizan el Paymaster de Cartridge, lo que permite a los jugadores interactuar con los juegos sin coste de gas. Mientras que Kamigotchi adopta las tarifas de gas como parte del diseño económico, los juegos de Realms.World ven los costes de gas principalmente como un obstáculo para la experiencia del jugador.

## Comenzar a jugar en Ethereum {#get-started-with-gaming-on-ethereum}

1. **Busque un juego divertido para jugar** - Explore los juegos mencionados anteriormente o explore plataformas como [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) y [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Configure su billetera de criptomonedas** - Necesitará una billetera para gestionar sus activos digitales del juego y (en algunos casos) para iniciar sesión en los juegos. [Elija una billetera aquí](/wallets/find-wallet/).
3. **Fondee su billetera** - Adquiera algo de ether (ETH) o los tokens relevantes para la red de capa 2 que planea usar.
4. **Juegue** - Comience a jugar y disfrute de la verdadera propiedad de su progreso en el juego.
