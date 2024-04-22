---
title: Organizaciones Autónomas Descentralizadas (DAO)
description: Una visión general de las DAO en Ethereum
lang: es
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /use-cases/dao-2.png
alt: Imagen de una DAO votando una propuesta.
summaryPoint1: Comunidades con propiedad compartida por los miembros sin liderazgo centralizado.
summaryPoint2: Una forma segura de colaborar con desconocidos en Internet.
summaryPoint3: Un lugar seguro para dar fondos a una causa específica.
---

## ¿Qué son las DAO? {#what-are-daos}

Una DAO es una organización de propiedad colectiva y gobernada mediante cadena de bloques que vela por una misión compartida.

Las DAO nos permiten trabajar con personas de ideas afines a nosotros en todo el mundo sin tener que confiar en un líder benévolo para que administre los fondos u operaciones. No existe ningún director ejecutivo que pueda gastar los fondos a su antojo, ni ningún director financiero que pueda manipular la contabilidad. En lugar de eso, las reglas basadas en la cadena de bloques e integradas en el código son las que definen cómo funciona la organización y cómo se gastan los fondos.

Han incorporado tesoros a los que nadie tiene autoridad para acceder sin la aprobación del grupo. Las decisiones se toman a través de propuestas y votaciones para asegurar que todos en la organización tengan voz, y que todo suceda de forma transparente en cadena.

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

- Una organización benéfica puede aceptar donaciones de cualquier persona en el mundo y votar por aquellas causas que quiera financiar.
- Como miembros de la propiedad colectiva, pueden comprar activos físicos o digitales y votar sobre cómo usarlos.
- Empresas y subvenciones: podría crear un fondo de riesgo que agrupe el capital de inversión y vote sobre las empresas a respaldar. El dinero reembolsado podría redistribuirse posteriormente entre los miembros de la DAO.

## ¿Cómo funcionan las DAO? {#how-daos-work}

La columna vertebral de una DAO son los contratos inteligentes, estos definen las reglas de la organización y la forma de administrar los activos atesorados. Una vez que el contrato está activo en Ethereum, nadie puede cambiar las reglas excepto con una votación. Si alguien intenta hacer algo que no está cubierto por las reglas y la lógica del código, no podrá hacerlo. Y dado que el tesoro está definido también por el contrato inteligente, nadie puede gastar el dinero sin la aprobación del grupo. Esto significa que las DAO no necesitan una autoridad central. En vez de ello, el grupo toma las decisiones colectivamente y los pagos se autorizan automáticamente cuando se aprueben los votos suficientes.

Esto se consigue gracias a que los contratos inteligentes son a prueba de manipulación una vez que conectan con Ethereum. No puede editar el código (las reglas de la DAO) sin que la gente se dé cuenta, ya que todo es público.

<DocLink to="/smart-contracts/">
  Más sobre contratos inteligentes
</DocLink>

## Ethereum y las DAO {#ethereum-and-daos}

Ethereum es la base perfecta para las DAO por varias razones:

- El propio consenso de Ethereum se distribuye y establece lo suficiente como para que las organizaciones confíen en la red.
- El código inteligente del contrato no puede ser modificado una vez se conecte, ni siquiera por sus propietarios. Esto permite a la DAO funcionar siguiendo las reglas con las que fue programada.
- Los contratos inteligentes pueden enviar/recibir fondos. Sin esto necesitará un intermediario de confianza para administrar los fondos del grupo.
- La comunidad Ethereum ha demostrado ser más colaborativa que competitiva, permitiendo que emerjan rápidamente las mejores prácticas y sistemas de apoyo.

## Gobernanza de las DAO {#dao-governance}

Muchas consideraciones entran en juego a la hora de gobernar una DAO, como las funciones de los votos y propuestas.

### Delegación {#governance-delegation}

La delegación es como la versión DAO de la democracia representativa. Los dueños de los tókenes delegan votos a los usuarios que se nominan a sí mismos y se comprometen a administrar el protocolo y a mantenerse informados.

#### Un conocido ejemplo {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – Los titulares de ENS pueden delegar sus votos a los miembros comprometidos de la comunidad para representarlos.

### Gobernanza de transacciones automáticas {#governance-example}

En muchas DAO, las transacciones se ejecutarán automáticamente si un conjunto de miembros vota afirmativamente.

#### Un conocido ejemplo {#governance-example}

[Nouns](https://nouns.wtf) – En Nouns DAO, una transacción se ejecuta automáticamente si se cumple un quórum de votos y la mayoría lo refrenda por voto, siempre y cuando no reciba el veto de los fundadores.

### Gobernanza multifirma {#governance-example}

Mientras que las DAO pueden tener miles de miembros votantes, los fondos pueden vivir en una cartera compartida por 5-20 miembros activos de la comunidad que suelen ser de confianza y "doxxed" (identidades públicas conocidas por la comunidad). Después de una votación, los firmantes multifirma ejecutan la voluntad de la comunidad.

## Las Leyes de una DAO {#dao-laws}

En 1977, Wyoming inventó la LLC (sociedad de responsabilidad limitada), que protege a los emprendedores y limita su responsabilidad. Más recientemente, promovieron la ley de las DAO que establece su estatus legal. Actualmente Wyoming, Vermont y las islas Vírgenes tienen alguna legislación que regula las DAO.

### Un conocido ejemplo {#law-example}

La CityDAO utilizó la ley de las DAO de Wyoming para comprar 40 hectáreas de tierra cerca del Parque Nacional de Yellowstone.

## Suscripción a una DAO {#dao-membership}

Existen diferentes modelos de suscripción a una DAO. Los miembros pueden determinar cómo funciona la votación y otras partes clave de la DAO.

### Inscripción basada en tókenes {#token-based-membership}

Normalmente no tienen todos los permisos, dependiendo del token utilizado. La mayoría de estos tókenes de gobernanza pueden comerciarse sin permiso en un intercambio descentralizado. Otros deben ganarse proporcionando liquidez o alguna otra «prueba de trabajo». En cualquiera de los dos casos, simplemente conservar el token permite el acceso a las votaciones.

_Normalmente se utiliza para gobernar protocolos o tókenes descentralizados en sí mismos._

#### Un conocido ejemplo {#token-example}

[MakerDAO](https://makerdao.com) – El token de MakerDAO MKR está ampliamente disponible en intercambios descentralizados y cualquiera puede comprar para poder tener un voto en el futuro del protocolo Maker.

### Inscripción basada en participaciones {#share-based-membership}

Las DAO basadas en participaciones son más permisivas, pero aun así bastante abiertas. Cualquier miembro potencial puede presentar una propuesta para unirse a la DAO, generalmente ofreciendo un tributo de algún valor en forma de tókenes o trabajo. Las participaciones representan poder de voto directo y propiedad. Los miembros pueden salir en cualquier momento con su parte proporcional de la tesorería.

_Normalmente se utiliza para organizaciones más estrechas, centradas en el ser humano, como organizaciones benéficas, colectivos de trabajadores y clubes de inversión. También se pueden gobernar protocolos y tókenes._

#### Un conocido ejemplo {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO se centra en la financiación de proyectos Ethereum. Requieren una propuesta de membresía para que el grupo pueda evaluar si tiene la experiencia y el capital necesarios para emitir juicios informados sobre posibles subvenciones. No se puede simplemente comprar acceso a la DAO en el mercado abierto.

### Inscripción basada en la reputación {#reputation-based-membership}

La reputación representa una prueba de participación y otorga poder de voto en la DAO. A diferencia de la adhesión de miembros basada en tókenes o en la participación, las DAO basadas en la reputación no transfieren la propiedad a colaboradores. La reputación no puede comprarse, transferirse ni delegarse; los miembros de la DAO deben ganarse la reputación mediante la participación. La votación en cadena se realiza sin permisos y los potenciales miembros pueden presentar propuestas libremente para unirse a la DAO y solicitar reputación y tókenes como recompensa a cambio de su contribución.

_Suele usarse para el desarrollo descentralizado y la gobernanza de protocolos y DApps, pero resulta igualmente adecuado para un conjunto diverso de organizaciones, como las benéficas, los colectivos de trabajadores, o los grupos de inversión, entre otros._

#### Un conocido ejemplo {#reputation-example}

[DXdao](https://DXdao.eth.link) – DXdao es un colectivo soberano global que construye y gobierna aplicaciones y protocolos descentralizados desde 2019. Goza de la gobernanza basada en la reputación y el consenso holográfico para coordinar y manejar fondos, por lo que nadie puede sumar capital para influenciar su futuro.

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
- [El manual de las DAO](https://daohandbook.xyz)
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
