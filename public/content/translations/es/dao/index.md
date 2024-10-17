---
title: Organizaciones Autónomas Descentralizadas (DAO)
description: Una visión general de las DAO en Ethereum
lang: es
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: Imagen de una DAO votando una propuesta.
summaryPoint1: Comunidades con propiedad compartida por los miembros sin liderazgo centralizado.
summaryPoint2: Una forma segura de colaborar con desconocidos en Internet.
summaryPoint3: Un lugar seguro para dar fondos a una causa específica.
---

## ¿Qué son las DAO? {#what-are-daos}

Una DAO (Decentralized Autonomous Organization) es una organización de propiedad colectiva que trabaja por una misión compartida.

Las DAO nos permiten trabajar con personas de ideas afines a nosotros en todo el mundo sin tener que confiar en un líder benévolo para que administre los fondos u operaciones. No existe ningún director ejecutivo que pueda gastar los fondos a su antojo, ni ningún director financiero que pueda manipular la contabilidad. En lugar de eso, las reglas basadas en la cadena de bloques e integradas en el código son las que definen cómo funciona la organización y cómo se gastan los fondos.

Han incorporado tesoros a los que nadie tiene autoridad para acceder sin la aprobación del grupo. Las decisiones se rigen por propuestas y votos para asegurar que todos los miembros de la organización tengan voz y que todo sea transparente [en la cadena de bloques](/glossary/#on-chain).

## ¿Por qué necesitamos DAO? {#why-dao}

Emprender una organización conjunta, que involucre financiación y dinero requiere mucha confianza en las personas con las que se esté trabajando. No obstante, es difícil confiar en alguien con quien solo se ha interactuado en Internet. Con una DAO, no necesita confiar en nadie de su grupo, tan solo en el código de DAO, que es 100 % transparente y cualquier persona puede verificar.

Así se abren nuevas oportunidades para la colaboración y coordinación globales.

### Una comparación {#dao-comparison}

| DAO                                                                                                                                   | Una organización tradicional                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Suele ser plana y totalmente democratizada.                                                                                           | Suele ser jerárquica.                                                                                                           |
| Los miembros votan previamente cualquier cambio que quieran emprender.                                                                | Dependiendo de la estructura, se pueden exigir cambios a un único grupo o se puede ofrecer la posibilidad de votarlos.          |
| Los votos cuentan y los resultados se implementan automáticamente sin intermediarios de confianza.                                    | Si se permite la votación, los votos se contabilizan internamente y el resultado de la votación debe ser tramitado manualmente. |
| Los servicios ofrecidos se gestionan automáticamente de forma descentralizada (por ejemplo, la distribución de fondos filantrópicos). | Requiere tramitación humana o centralización, propensa a la manipulación.                                                       |
| Toda la actividad es transparente y totalmente pública.                                                                               | La actividad es normalmente privada y limitada al público.                                                                      |

### Ejemplos de DAO {#dao-examples}

Para ayudar a que esto tenga más sentido, aquí hay algunos ejemplos de cómo se podría usar una DAO:

- **Una organización benéfica:** Podría aceptar donaciones de cualquier persona en el mundo y votar sobre qué causas financiar.
- **Propiedad colectiva:** Podría comprar activos físicos o digitales, y los miembros pueden votar sobre cómo usarlos.
- **Emprendimientos y subvenciones:** Podría crear un fondo de inversión que agrupe capital y permita votar sobre los emprendimientos que respaldará. El dinero reembolsado podría redistribuirse posteriormente entre los miembros de la DAO.

<YouTube id="zTStDvUtQWc" />

## ¿Cómo funcionan las DAO? {#how-daos-work}

La columna vertebral de una DAO es su [contrato inteligente](/glossary/#smart-contract), el cual define las reglas de la organización y custodia el tesoro del grupo. Una vez que el contrato está activo en Ethereum, nadie puede cambiar las reglas excepto con una votación. Si alguien intenta hacer algo que no está cubierto por las reglas y la lógica del código, no podrá hacerlo. Y dado que el tesoro está definido también por el contrato inteligente, nadie puede gastar el dinero sin la aprobación del grupo. Esto significa que las DAO no necesitan una autoridad central. En vez de ello, el grupo toma las decisiones colectivamente y los pagos se autorizan automáticamente cuando se aprueben los votos suficientes.

Esto se consigue gracias a que los contratos inteligentes son a prueba de manipulación una vez que conectan con Ethereum. No puede editar el código (las reglas de la DAO) sin que la gente se dé cuenta, ya que todo es público.

## Ethereum y las DAO {#ethereum-and-daos}

Ethereum es la base perfecta para las DAO por varias razones:

- El propio consenso de Ethereum está descentralizado y lo suficientemente establecido para que las organizaciones confíen en la red.
- El código inteligente del contrato no puede ser modificado una vez se conecte, ni siquiera por sus propietarios. Esto permite a la DAO funcionar siguiendo las reglas con las que fue programada.
- Los contratos inteligentes pueden enviar/recibir fondos. Sin esto necesitará un intermediario de confianza para administrar los fondos del grupo.
- La comunidad Ethereum ha demostrado ser más colaborativa que competitiva, permitiendo que emerjan rápidamente las mejores prácticas y sistemas de apoyo.

## Gobernanza de las DAO {#dao-governance}

Muchas consideraciones entran en juego a la hora de gobernar una DAO, como la manera en que funcionan los votos y las propuestas.

### Delegación {#governance-delegation}

La delegación es la versión DAO de la democracia representativa. Los poseedores de los tokens delegan votos a los usuarios quienes se nominan a sí mismos y se comprometen a administrar el protocolo y mantenerse informados.

#### Un conocido ejemplo {#governance-example}

[ENS:](https://claim.ens.domains/delegate-ranking) Los titulares de ENS pueden delegar sus votos a miembros comprometidos de la comunidad para representarlos.

### Gobernanza de transacciones automáticas {#governance-example}

En muchas DAO, las transacciones se ejecutarán automáticamente si el quórum de miembros vota afirmativamente.

#### Un conocido ejemplo {#governance-example}

[Nouns:](https://nouns.wtf) En Nouns DAO, una transacción se ejecuta automáticamente si se cumple un quórum de votos y la mayoría voto afirmativamente, siempre y cuando no reciba el veto de los fundadores.

### Gobernanza multifirma {#governance-example}

Mientras que las DAO pueden tener miles de miembros votantes, los fondos pueden residir en una [billetera](/glossary/#wallet) compartida por 5-20 miembros activos de la comunidad que suelen ser de confianza y generalmente doxados (identidades públicas conocidas por la comunidad). Después de una votación, los firmantes [multifirma](/glossary/#multisig) ejecutan la voluntad de la comunidad.

## Leyes de una DAO {#dao-laws}

En 1977, Wyoming inventó la LLC, la cual protege a los empresarios y limita su responsabilidad. Más recientemente, fueron pioneros en la ley DAO que establece el estatus legal de las DAO. Actualmente Wyoming, Vermont y las Islas Vírgenes tienen alguna legislación que regula las DAO.

### Un conocido ejemplo {#law-example}

[CityDAO:](https://citydao.io) CityDAO utilizó la ley de las DAO de Wyoming para comprar 40 hectáreas de tierra cerca del Parque Nacional de Yellowstone.

## Membresía de las DAO {#dao-membership}

Existen diferentes modelos de afiliación a una DAO. La membresía puede determinar cómo funciona la votación y otras partes clave de la DAO.

### Membresía basada en tokens {#token-based-membership}

Normalmente, no necesita de [permisos](/glossary/#permissionless), dependiendo del token utilizado. En su mayoría, estos tokens de gobernanza pueden comercializarse decentralizadamente en un [exchange descentralizado](/glossary/#dex). Otros deben ganarse proporcionando liquidez o alguna otra "prueba de trabajo". En cualquier caso, simplemente poseer el token otorga acceso a las votaciones.

_Típicamente se usa para gobernar protocolos descentralizados amplios o tokens en sí mismos._

#### Un conocido ejemplo {#token-example}

[MakerDAO:](https://makerdao.com) MKR, el token de MakerDAO, está ampliamente disponible en plataformas de intercambio descentralizadas, y cualquiera puede comprarlo para obtener un voto en el futuro del protocolo Maker.

### Membresía basada en participación {#share-based-membership}

Las DAO basadas en participación dependen más de los permisos, pero siguen siendo bastante abiertas. Cualquier miembro potencial puede presentar una propuesta para unirse a la DAO, generalmente ofreciendo un tributo de algún valor en forma de tokens o trabajo. La participación representa poder de voto y propiedad directos. Los miembros pueden salir en cualquier momento con su parte proporcional del tesoro.

_Normalmente se utiliza para organizaciones más unidas, centradas en el ser humano, como organizaciones benéficas, sindicatos y clubes de inversión. También se pueden gobernar protocolos y tokens._

#### Un conocido ejemplo {#share-example}

[MolochDAO:](http://molochdao.com/) MolochDAO se centra en la financiación de proyectos Ethereum. Requieren una propuesta para la membresía, de modo que el grupo pueda evaluar si tiene la experiencia y el capital necesarios para emitir juicios informados sobre los potenciales beneficiarios. No se puede simplemente comprar acceso a la DAO en el mercado abierto.

### Membresía basada en la reputación {#reputation-based-membership}

La reputación representa una prueba de participación y otorga poder de voto en la DAO. A diferencia de la adhesión de miembros basada en tokens o en la participación, las DAO basadas en la reputación no transfieren la propiedad a los colaboradores. La reputación no puede comprarse, transferirse ni delegarse; los miembros de la DAO deben ganarse la reputación mediante la participación. La votación en cadena se realiza sin permiso, y los potenciales miembros pueden presentar propuestas libremente para unirse a la DAO y solicitar reputación y tokens como recompensa a cambio de su contribución.

_Normalmente se utiliza para el desarrollo descentralizado y la gobernanza de protocolos y [dapps](/glossary/#dapp), pero también se adapta bien a un conjunto diverso de organizaciones como organizaciones benéficas, sindicatos, clubes de inversión, etc._

#### Un conocido ejemplo {#reputation-example}

[DXdao:](https://DXdao.eth.limo) DXdao era un colectivo soberano global que construía y gobernaba protocolos y aplicaciones descentralizados desde 2019. Aprovechaba la gobernanza basada en la reputación y el [consenso holográfico](/glossary/#holographic-consensus) para coordinar y gestionar los fondos, lo que significa que nadie podía comprar su forma de influir en su futuro o gobernanza.

## Crear/unirse a una DAO {#join-start-a-dao}

### Únase a una DAO {#join-a-dao}

- [Comunidad Ethereum y DAO](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Lista de DAOHaus de las DAO](https://app.daohaus.club/explore)
- [Lista Tally.xyz de DAO](https://www.tally.xyz)

### Crear una DAO {#start-a-dao}

- [Crear una DAO con DAOHaus](https://app.daohaus.club/summon)
- [Iniciar un gobernador DAO con Tally](https://www.tally.xyz/add-a-dao)
- [Crear una DAO impulsada por Aragon](https://aragon.org/product)
- [Empezar una colonia](https://colony.io/)
- [Crear una DAO con el consenso holográfico de DAOstack](https://alchemy.daostack.io/daos/create)

## Para profundizar sobre el tema {#further-reading}

### Artículos acerca de las DAO {#dao-articles}

- [¿Qué es una DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [La casa de las DAO](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [¿Qué es una DAO y para qué sirve?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Cómo empezar una comunidad digital con una DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [¿Qué es una DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [¿Qué es el consenso holográfico?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [Las DAO no son corporaciones: donde la descentralización en organizaciones autónomas importa, por Vitalik](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO, DAC, DA y más: una guía de terminología incompleta](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Blog de Ethereum](https://blog.ethereum.org)

### Vídeos {#videos}

- [¿Qué es una DAO en cripto?](https://youtu.be/KHm0uUPqmVE)
- [¿Puede una DAO construir una ciudad?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />
