---
title: "¿Qué es una DAO?"
metaTitle: "¿Qué es una DAO? | Organización Autónoma Descentralizada"
description: "Una descripción general de las DAO en Ethereum"
lang: es
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: "Una representación de una DAO votando una propuesta."
summaryPoints:
  - "Comunidades propiedad de sus miembros sin liderazgo centralizado."
  - "Una forma segura de colaborar con desconocidos en internet."
  - "Un lugar seguro para destinar fondos a una causa específica."
---

## ¿Qué son las DAO? {#what-are-daos}

Una DAO es una organización de propiedad colectiva que trabaja hacia una misión compartida.

Las DAO nos permiten trabajar con personas de ideas afines en todo el mundo sin tener que confiar en un líder benevolente para administrar los fondos o las operaciones. No hay un director ejecutivo (CEO) que pueda gastar los fondos por capricho ni un director financiero (CFO) que pueda manipular los libros contables. En su lugar, las reglas basadas en la cadena de bloques integradas en el código definen cómo funciona la organización y cómo se gastan los fondos.

Tienen tesorerías integradas a las que nadie tiene autoridad para acceder sin la aprobación del grupo. Las decisiones se rigen por propuestas y votaciones para garantizar que todos en la organización tengan voz, y todo sucede de manera transparente [en cadena](/glossary/#onchain).

## ¿Por qué necesitamos las DAO? {#why-dao}

Iniciar una organización con alguien que involucra financiamiento y dinero requiere mucha confianza en las personas con las que se trabaja. Pero es difícil confiar en alguien con quien solo has interactuado en internet. Con las DAO no necesitas confiar en nadie más del grupo, solo en el código de la DAO, que es 100 % transparente y verificable por cualquier persona.

Esto abre muchísimas oportunidades nuevas para la colaboración y coordinación global.

### Una comparación {#dao-comparison}

| DAO                                                                                                                     | Una organización tradicional                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Generalmente horizontal y totalmente democratizada.                                                                                   | Generalmente jerárquica.                                                                            |
| Se requiere la votación de los miembros para implementar cualquier cambio.                                                           | Dependiendo de la estructura, los cambios pueden ser exigidos por una sola parte o se puede ofrecer una votación.     |
| Los votos se cuentan y el resultado se implementa automáticamente sin un intermediario de confianza.                                      | Si se permite la votación, los votos se cuentan internamente y el resultado de la votación debe manejarse manualmente. |
| Los servicios ofrecidos se manejan automáticamente de manera descentralizada (por ejemplo, la distribución de fondos filantrópicos). | Requiere manejo humano o automatización controlada centralmente, propensa a la manipulación.              |
| Toda la actividad es transparente y totalmente pública.                                                                           | La actividad suele ser privada y limitada para el público.                                        |

### Ejemplos de DAO {#dao-examples}

Para ayudar a que esto tenga más sentido, aquí hay algunos ejemplos de cómo podrías usar una DAO:

- **Una organización benéfica**: podrías aceptar donaciones de cualquier persona en el mundo y votar qué causas financiar.
- **Propiedad colectiva**: podrías comprar activos físicos o digitales y los miembros pueden votar sobre cómo usarlos.
- **Emprendimientos y subvenciones**: podrías crear un fondo de riesgo que reúna capital de inversión y vote sobre qué emprendimientos respaldar. El dinero reembolsado podría redistribuirse posteriormente entre los miembros de la DAO.

<VideoWatch slug="dao-build-next-great-city" />

## ¿Cómo funcionan las DAO? {#how-daos-work}

La columna vertebral de una DAO es su [contrato inteligente](/glossary/#smart-contract), que define las reglas de la organización y mantiene la tesorería del grupo. Una vez que el contrato está activo en [Ethereum](/), nadie puede cambiar las reglas excepto mediante un voto. Si alguien intenta hacer algo que no está cubierto por las reglas y la lógica del código, fallará. Y debido a que la tesorería también está definida por el contrato inteligente, eso significa que nadie puede gastar el dinero sin la aprobación del grupo tampoco. Esto significa que las DAO no necesitan una autoridad central. En su lugar, el grupo toma decisiones colectivamente y los pagos se autorizan automáticamente cuando se aprueban los votos.

Esto es posible porque los contratos inteligentes son a prueba de manipulaciones una vez que se activan en Ethereum. No se puede simplemente editar el código (las reglas de la DAO) sin que la gente se dé cuenta porque todo es público.

## Ethereum y las DAO {#ethereum-and-daos}

Ethereum es la base perfecta para las DAO por varias razones:

- El propio consenso de Ethereum está descentralizado y lo suficientemente establecido como para que las organizaciones confíen en la red.
- El código del contrato inteligente no se puede modificar una vez activo, ni siquiera por sus propietarios. Esto permite que la DAO funcione según las reglas con las que fue programada.
- Los contratos inteligentes pueden enviar y recibir fondos. Sin esto, necesitarías un intermediario de confianza para administrar los fondos del grupo.
- La comunidad de Ethereum ha demostrado ser más colaborativa que competitiva, lo que permite que surjan rápidamente mejores prácticas y sistemas de apoyo.

## Gobernanza de las DAO {#dao-governance}

Hay muchas consideraciones al gobernar una DAO, como la forma en que funcionan las votaciones y las propuestas.

### Delegación {#governance-delegation}

La delegación es como la versión DAO de la democracia representativa. Los poseedores de tokens delegan votos a los usuarios que se nominan a sí mismos y se comprometen a administrar el protocolo y mantenerse informados.

#### Un ejemplo famoso {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking): los poseedores de ENS pueden delegar sus votos a miembros comprometidos de la comunidad para que los representen.

### Gobernanza automática de transacciones {#governance-example-2}

En muchas DAO, las transacciones se ejecutarán automáticamente si un quórum de miembros vota afirmativamente.

#### Un ejemplo famoso {#governance-example-3}

[Nouns](https://nouns.wtf): en Nouns DAO, una transacción se ejecuta automáticamente si se alcanza un quórum de votos y una mayoría vota afirmativamente, siempre que no sea vetada por los fundadores.

### Gobernanza multifirma {#governance-example-4}

Si bien las DAO pueden tener miles de miembros votantes, los fondos pueden residir en una [billetera](/glossary/#wallet) compartida por entre 5 y 20 miembros activos de la comunidad que son de confianza y generalmente están "doxxeados" (sus identidades públicas son conocidas por la comunidad). Después de una votación, los firmantes de la [multifirma](/glossary/#multisig) ejecutan la voluntad de la comunidad.

## Leyes sobre las DAO {#dao-laws}

En 1977, Wyoming inventó la LLC (Sociedad de Responsabilidad Limitada), que protege a los emprendedores y limita su responsabilidad. Más recientemente, fueron pioneros en la ley de DAO que establece el estatus legal para las DAO. Actualmente, Wyoming, Vermont y las Islas Vírgenes tienen leyes sobre las DAO de alguna forma.

### Un ejemplo famoso {#law-example}

[CityDAO](https://citizen.citydao.io/): CityDAO utilizó la ley de DAO de Wyoming para comprar 40 acres de tierra cerca del Parque Nacional de Yellowstone.

## Membresía de una DAO {#dao-membership}

Existen diferentes modelos para la membresía de una DAO. La membresía puede determinar cómo funciona la votación y otras partes clave de la DAO.

### Membresía basada en tokens {#token-based-membership}

Por lo general, es totalmente [sin permisos](/glossary/#permissionless), dependiendo del token utilizado. En su mayoría, estos tokens de gobernanza se pueden intercambiar sin permisos en un [intercambio descentralizado](/glossary/#dex). Otros deben ganarse proporcionando liquidez o alguna otra "prueba de trabajo (PoW)". De cualquier manera, el simple hecho de poseer el token otorga acceso a la votación.

_Típicamente utilizada para gobernar protocolos descentralizados amplios y/o los propios tokens._

#### Un ejemplo famoso {#token-example}

[MakerDAO](https://makerdao.com): el token MKR de MakerDAO está ampliamente disponible en intercambios descentralizados y cualquiera puede comprarlo para tener poder de voto sobre el futuro del protocolo Maker.

### Membresía basada en acciones {#share-based-membership}

Las DAO basadas en acciones son más con permisos, pero aún así bastante abiertas. Cualquier posible miembro puede enviar una propuesta para unirse a la DAO, generalmente ofreciendo un tributo de algún valor en forma de tokens o trabajo. Las acciones representan poder de voto directo y propiedad. Los miembros pueden solicitar su salida en cualquier momento con su parte proporcional de la tesorería.

_Típicamente utilizada para organizaciones más unidas y centradas en las personas, como organizaciones benéficas, colectivos de trabajadores y clubes de inversión. También puede gobernar protocolos y tokens._

### Membresía basada en reputación {#reputation-based-membership}

La reputación representa una prueba de participación y otorga poder de voto en la DAO. A diferencia de la membresía basada en tokens o acciones, las DAO basadas en reputación no transfieren la propiedad a los contribuyentes. La reputación no se puede comprar, transferir ni delegar; los miembros de la DAO deben ganar reputación a través de la participación. La votación en cadena es sin permisos y los posibles miembros pueden enviar libremente propuestas para unirse a la DAO y solicitar recibir reputación y tokens como recompensa a cambio de sus contribuciones.

_Típicamente utilizada para el desarrollo descentralizado y la gobernanza de protocolos y [aplicaciones descentralizadas (dapps)](/glossary/#dapp), pero también se adapta bien a un conjunto diverso de organizaciones como organizaciones benéficas, colectivos de trabajadores, clubes de inversión, etc._

#### Un ejemplo famoso {#reputation-example}

[DXdao](https://DXdao.eth.limo): DXdao fue un colectivo soberano global que construyó y gobernó protocolos y aplicaciones descentralizadas desde 2019. Aprovechó la gobernanza basada en la reputación y el [consenso holográfico](/glossary/#holographic-consensus) para coordinar y administrar fondos, lo que significa que nadie podía comprar su influencia en su futuro o gobernanza.

## Unirse / iniciar una DAO {#join-start-a-dao}

### Unirse a una DAO {#join-a-dao}

- [DAO de la comunidad de Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Lista de DAO de DAOHaus](https://app.daohaus.club/explore)
- [Lista de DAO de Tally.xyz](https://www.tally.xyz/explore)
- [Lista de DAO de DeGov.AI](https://apps.degov.ai/)

### Iniciar una DAO {#start-a-dao}

- [Convocar una DAO con DAOHaus](https://app.daohaus.club/summon)
- [Iniciar una DAO Governor con Tally](https://www.tally.xyz/get-started)
- [Crear una DAO impulsada por Aragon](https://aragon.org/product)
- [Iniciar una colonia](https://colony.io/)
- [Crear una DAO con el consenso holográfico de DAOstack](https://alchemy.daostack.io/daos/create)
- [Lanzar una DAO con DeGov Launcher](https://docs.degov.ai/integration/deploy)

## Lecturas adicionales {#further-reading}

### Artículos sobre DAO {#dao-articles}

- [¿Qué es una DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [La casa de las DAO](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [¿Qué es una DAO y para qué sirve?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Cómo iniciar una comunidad digital impulsada por una DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [¿Qué es una DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [¿Qué es el consenso holográfico?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [Las DAO no son corporaciones: dónde importa la descentralización en las organizaciones autónomas, por Vitalik](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO, DAC, DA y más: una guía terminológica incompleta](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Blog de Ethereum](https://blog.ethereum.org)

### Videos {#videos}

- [¿Qué es una DAO en el mundo cripto?](https://youtu.be/KHm0uUPqmVE)
- [¿Puede una DAO construir una ciudad?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />