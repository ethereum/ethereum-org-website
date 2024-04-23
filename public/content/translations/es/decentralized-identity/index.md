---
title: Identidad descentralizada
description: '¿Qué es la identidad descentralizada y por qué es importante?'
lang: es
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /eth-gif-cat.png
summaryPoint1: Los sistemas tradicionales de identidad han centralizado la emisión, mantenimiento y control de sus identificadores.
summaryPoint2: La identidad descentralizada elimina la dependencia de terceras partes centralizadas.
summaryPoint3: Gracias a la criptografía, los usuarios tienen ahora las herramientas para emitir, retener y controlar sus propios identificadores y certificaciones.
---

La identidad está detrás de prácticamente todos los aspectos de su vida. El uso de servicios en línea, la apertura de una cuenta bancaria, la votación en elecciones, la compra de propiedades, los contratos de empleo... Todo esto requiere demostrar su identidad.

Sin embargo, los sistemas tradicionales de gestión de identidad dependen de intermediarios centralizados que emiten y controlan sus identificaciones y [certificados](#what-are-attestations). Esto significa que no puede controlar su información relacionada con su identidad ni decidir quién tiene acceso a su Información de Identificación Personal (PII) y cuánto acceso tienen estas partes.

Para resolver estos problemas, hemos descentralizado los sistemas de identidad utilizando cadenas de bloques públicas como Ethereum. La identidad descentralizada permite a los individuos administrar la información relacionada con su identidad. Con soluciones de identidad descentralizada, _tú_ puede crear identificadores y reclamar y mantener sus certificados sin depender de autoridades centralizadas como proveedores de servicios o gobiernos.

## Qué es la identidad? {#what-is-identity}

Identidad significa el sentido del yo como individuo, definido por características únicas. La identidad se refiere a ser un _individuo_, es decir, una entidad humana única. La identidad también refiere entidades no humanas, como una organización o autoridad.

## ¿Qué son los identificadores? {#what-are-identifiers}

Un identificador es una pieza de información que actúa como un indicador a una identidad o identidad en particular. Los identificadores comunes incluyen:

- Nombre
- Número de identificación fiscal/de seguridad social
- Número de teléfono móvil
- Fecha y lugar de nacimiento
- Credenciales de identificación digital, por ejemplo, direcciones de correo electrónico, nombres de usuario, avatares

Estos ejemplos tradicionales de identificadores son emitidos, sostenidos y controlados por entidades centrales. Se necesita permiso del Gobierno para cambiar su nombre o el de una plataforma de redes sociales para cambiar el nombre de usuario.

## ¿Qué son los certificados? {#what-are-attestations}

Un certificado es una afirmación hecha por una entidad acerca de otra entidad. Si vive en Estados Unidos, su carné de conducir emitido por el Department of Motor Vehicles (una entidad) certifica que usted (otra entidad) está legalmente autorizado a conducir un coche.

Los certificados son diferentes de los identificadores. Un certificado _contiene_ identificadores que hacen referencia a una identidad en particular, y hace una afirmación relacionada con esta identidad. Por lo tanto, su carné de conducir tiene identificadores (nombre, fecha de nacimiento, dirección), pero también es una afirmación sobre su derecho legal a conducir.

### ¿Qué son los identificadores descentralizados? {#what-are-decentralized-identifiers}

Los identificadores tradicionales como tu nombre jurídico o dirección de correo electrónico dependen de terceros: gobiernos y proveedores de correo electrónico. Los identificadores descentralizados (DID) son diferentes: no son emitidos, administrados o controlados por ninguna entidad central.

Los identificadores descentralizados son emitidos, mantenidos y controlados por individuos. Una [cuenta Ethereum](/developers/docs/accounts/) es un ejemplo de un identificador descentralizado. Puede crear tantas cuentas como quiera sin el permiso de nadie y sin necesidad de almacenarlas en un registro central.

Los identificadores descentralizados se almacenan en las cadenas de bloques o redes entre pares. Esto hace a los DIDs [globalmente únicos, resolubles con alta disponibilidad, y criptográficamente verificables](https://w3c-ccg.github.io/did-primer/). Un identificador descentralizado puede ser asociado con diferentes entidades, incluyendo personas, organizaciones o instituciones gubernamentales.

## ¿Qué hace que los identificadores descentralizados sean posibles? {#what-makes-decentralized-identifiers-possible}

### 1. Infraestructura de clave pública (ICP) {#public-key-infrastructure}

La infraestructura de clave pública (ICP) es una medida de seguridad de la información que genera una [clave pública](/glossary/#public-key) y una [clave privada](/glossary/#private-key) para una entidad. La criptografía de clave pública se utiliza en las redes de cadena de bloques para autenticar las identidades del usuario y demostrar la propiedad de los activos digitales.

Algunos identificadores descentralizados, como una cuenta de Ethereum, tienen claves públicas y privadas. La clave pública identifica al controlador de la cuenta, mientras que las claves privadas pueden firmar y descifrar mensajes para esta cuenta. Los ICP proporcionan pruebas necesarias para autenticar entidades y prevenir la suplantación y el uso de identidades falsas, utilizando [firmas criptográficas](https://andersbrownworth.com/blockchain/public-private-keys/) para verificar todas las reclamaciones.

### 2. Almacenes de datos descentralizados {#decentralized-datastores}

Una cadena de bloques sirve como un registro de datos verificables: un repositorio de información abierto, sin confianza y descentralizado. La existencia de cadenas de bloques públicas elimina la necesidad de almacenar identificadores en registros centralizados.

Si alguien necesita confirmar la validez de un identificador descentralizado, puede buscar la clave pública asociada en la cadena de bloques. Esto es diferente de los identificadores tradicionales que requieren de terceros para autenticarse.

## ¿Cómo hacen los identificadores descentralizados para generar certificaciones descentralizadas? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

La identidad descentralizada es la idea de que la información relacionada con la identidad debe ser autocontrolada, privada y portátil, siendo sus cimientos los identificadores descentralizados y los certificados.

En el contexto de la identidad descentralizada, las certificaciones (también conocidas como [credenciales verificables](https://www.w3.org/TR/vc-data-model/)) son afirmaciones a prueba de manipulación, criptográficamente verificables realizadas por el emisor. Cada certificado o credencial verificable que una entidad (por ejemplo, una organización) emite está asociada con su CPI.

Debido a que los CPI se almacenan en la cadena de bloques, cualquiera puede verificar la validez de un certificado comprobando el CPI del emisor en Ethereum. Esencialmente, la blockchain de Ethereum actúa como un directorio global que permite la verificación de CPIs asociados con ciertas entidades.

Los identificadores descentralizados son la razón por la que se pueden autocontrolar y verificar los certificados. Incluso si el emisor ya no existe, el titular siempre tiene prueba de la procedencia y validez del certificado.

Los identificadores descentralizados también son cruciales para proteger la privacidad de la información personal a través de la identidad descentralizada. Por ejemplo, si un individuo envía una prueba de un certificado (un carné de conducir), el grupo de verificación no necesita verificar la validez de la información en la prueba. En cambio, el verificador solo necesita garantías criptográficas de la autenticidad del certificado y de la identidad de la organización emisora para determinar si la prueba es válida.

## Tipos de certificados en identidad descentralizada {#types-of-attestations-in-decentralized-identity}

La forma en que se almacena y recupera la información de los certificados en un ecosistema de identidad basado en Ethereum es diferente de la gestión tradicional de la identidad. He aquí una visión general de los diversos enfoques para emitir, almacenar y verificar los certificados en sistemas de identidad descentralizados:

### Certificados fuera de cadena {#off-chain-attestations}

Un problema que conlleva el almacenamiento de certificados en la cadena es que pueden contener información que los individuos quieren mantener privados. La naturaleza pública de la cadena de bloques de Ethereum no facilita el almacenamiento de tales certificados.

La solución es emitir certificados mantenidos por los usuarios fuera de la cadena en carteras digitales pero firmadas con el CPI del emisor almacenado en la cadena. Estos certificados están codificados como [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) y contienen la firma digital del emisor, lo que permite una verificación fácil de las reclamaciones fuera de la cadena.

Este es un escenario hipotético para explicar los certificados fuera de la cadena:

1. Una universidad (el emisor) genera un certificado (un certificado académico digital), firma con sus claves y lo emite a Bob (el titular de la identidad).

2. Bob solicita un empleo y quiere demostrar sus cualificaciones académicas a un empleador, por lo que comparte la certificación desde su cartera. La compañía (el verificador) puede confirmar la validez del certificado comprobando el CPI del emisor (es decir, su clave pública en Ethereum).

### Certificaciones fuera de cadena con acceso permanente {#offchain-attestations-with-persistent-access}

Bajo este sistema, los cerficados se transforman en un archivo JSON y son almacenados off-chain (idealmente en una [plataforma de cloud descentralizada](/developers/docs/storage/) como IPFS o Swarm). Sin embargo, un [hash](/glossary/#hash) del archivo JSON se almacena en cadena y se enlaza con un CPI mediante un registro en la cadena. El CPI asociado podría ser el del emisor del certificado o el destinatario.

Este enfoque permite que las certificaciones obtengan permanencia basada en la cadena de bloques, manteniendo la información de reclamaciones cifrada y verificable. También permite la divulgación selectiva, ya que el titular de la clave privada puede descifrar la información.

### Certificados en la cadena {#onchain-attestations}

Los certificados en la cadena se mantienen en [contratos inteligentes](/developers/docs/smart-contracts/) en la cadena de bloques de Ethereum. El contrato inteligente (actuando como un registro) enlazará un certificado a un identificador descentralizado correspondiente en la cadena (una clave pública).

He aquí un ejemplo que ilustra cómo podrían funcionar en la práctica los certificados en la cadena:

1. Una empresa (XYZ Corp) planea vender acciones utilizando un contrato inteligente, pero solo quiere compradores que hayan completado una comprobación de antecedentes.

2. XYZ Corp puede hacer que la empresa realice comprobaciones de antecedentes para emitir certificados en cadena en Ethereum. Este certificado verifica que el individuo ha pasado la comprobación de antecedentes sin exponer ninguna información personal.

3. El contrato inteligente de venta de acciones puede comprobar el contrato de registro para ver las identidades de los compradores examinados, haciendo posible que el contrato inteligente determine quién está autorizado a comprar acciones y quién no.

### Los tókenes Souldbound y la identidad {#soulbound}

[Los tókenes de Soulbound](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) (NFT no transferibles) podrían utilizarse para recopilar información exclusiva de una cartera específica. Esto crea efectivamente una identidad única en cadena vinculada a una dirección particular de Ethereum que podría incluir tókenes representando logros (ej. terminar algún curso en línea específico o pasar un umbral de puntuación en un juego) o participación en la comunidad.

## Beneficios de una identidad descentralizada  {#benefits-of-decentralized-identity}

1. La identidad descentralizada aumenta el control individual de la información identificativa. Los identificadores y certificados descentralizados pueden ser verificados sin depender de autoridades centralizadas o servicios de terceros.

2. Las soluciones de identidad descentralizadas facilitan un método de protección de la privacidad, robusto y confiable para verificar y gestionar la identidad del usuario.

3. La identidad descentralizada que utiliza la tecnología de cadena de bloques crea confianza entre diferentes partes y proporciona garantías criptográficas para probar la validez de las certificaciones.

4. La identidad descentralizada permite la portabilidad de los datos de identidad. Los usuarios almacenan certificados e identificadores en la cartera móvil y los pueden compartir con cualquier otro según su criterio. Los identificadores descentralizados y los certificados no están bloqueados en la base de datos de la organización emisora.

5. La identidad descentralizada debería funcionar bien con las tecnologías emergentes de conocimiento cero que permitan a los individuos demostrar que tienen o han hecho algo sin revelar lo que es esa cosa. Esta podría convertirse en una manera poderosa de combinar confianza y privacidad para aplicaciones como la votación.

6. La identidad descentralizada permite aplicar mecanismos AntiSybil que detecten cuando un humano individual pretende ser varios humanos diferentes para jugar o hacer spam en algún sistema.

## Casos de uso de identidad descentralizada {#decentralized-identity-use-cases}

La identidad descentralizada tiene muchos casos potenciales de uso:

### 1. Inicio de sesión universal {#universal-dapp-logins}

La identidad descentralizada puede ayudar a reemplazar los inicios de sesión basados en contraseña con [autenticación descentralizada](https://www.ibm.com/blogs/blockchain/2018/10/decentralized-identity-an-alternative-to-password-based-authentication/). Los proveedores de servicios pueden emitir certificados a los usuarios, los cuales pueden ser almacenados en una cartera de Ethereum. Un certificado de ejemplo sería un [NFT](/nft/) que otorga al titular acceso a una comunidad en línea.

Una función [de inicio de sesión con Ethereum](https://login.xyz/) habilitaría entonces a los servidores para confirmar la cuenta de Ethereum del usuario y obtener la verificación necesaria desde la dirección de su cuenta. Esto significa que los usuarios pueden acceder a plataformas y sitios web sin tener que memorizar contraseñas largas y mejorar la experiencia en línea de los usuarios.

### 2. Autenticación KYC {#kyc-authentication}

El uso de muchos servicios en línea requiere que los individuos proporcionen certificados y credenciales, como un carné de conducir o pasaporte nacional. Pero este enfoque es problemático porque la información privada de los usuarios puede verse comprometida y los proveedores de servicios no pueden verificar la autenticidad del certificado.

La identidad descentralizada permite a las empresas saltarse a los procesos [Conozca a Su Cliente (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) convencionales y autenticar identidades de usuario a través de credenciales verificables. Esto reduce el coste de la gestión de la identidad y evita el uso de documentación falsa.

### 3. Votaciones y comunidades en línea {#voting-and-online-communities}

Las votaciones en línea y las redes sociales son dos nuevas aplicaciones para la identidad descentralizada. Los esquemas de votación en línea son susceptibles de manipulación, especialmente si los actores maliciosos crean identidades falsas para votar. Pedir a las personas que presenten certificaciones en la cadena puede mejorar la integridad de los procesos de votación en línea.

La identidad descentralizada puede ayudar a crear comunidades en línea libres de falsas cuentas. Por ejemplo, cada usuario podría tener que autenticar su identidad utilizando un sistema de identidad en la cadena, como el Ethereum Name Service, reduciendo la posibilidad de bots.

### 4. Protección AntiSybil {#sybil-protection}

Los ataques Sybil se refieren a seres humanos individuales engañando a un sistema para que piensen que son múltiples personas para aumentar así su influencia. [Las aplicaciones de concesión de subvenciones](https://gitcoin.co/grants/) que utilizan [votación cuadrática](https://www.radicalxchange.org/concepts/plural-voting/) son vulnerables a estos ataques de Sybil, porque el valor de una subvención aumenta cuando más personas votan por ella, incentivando a los usuarios a dividir sus contribuciones a través de muchas identidades. Las identidades descentralizadas ayudan a evitar esto aumentando la carga sobre cada participante para demostrar que son realmente humanos, aunque a menudo sin tener que revelar información privada específica.

## Usos de la identidad descentralizada {#use-decentralized-identity}

Hay muchos proyectos ambiciosos que utilizan Ethereum como base para soluciones de identidad descentralizada:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - _Un sistema de nomenclatura descentralizado en la cadena, identificadores legibles por máquinas, como direcciones del cartera Ethereum, hashes de contenido y metadatos._
- **[SpruceID](https://www.spruceid.com/)** - _Un proyecto de identidad descentralizado que permite a los usuarios controlar la identidad digital con cuentas de Ethereum y perfiles ENS en lugar de depender de servicios de terceros._
- **[Servicio de Atestación de Ethereum (EAS)](https://attest.sh/)**: _Un registro/protocolo descentralizado para hacer atestaciones dentro o fuera de la cadena sobre cualquier cosa._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (o PoH) es un sistema de verificación de identidad social construido en Ethereum._
- **[Brillo](https://www.brightid.org/)** - _Una red de identidad social descentralizada y de código abierto que busca reformar la verificación de identidad a través de la creación y el análisis de un gráfico social._
- **[Proof-of-personhood Passport](https://proofofpersonhood.com/)** - _Un agregador de identidad digital descentralizado._
- **[walt.id](https://walt.id)**: _ infraestructura de cartera e identidad descentralizadas de código abierto que permiten a los desarrolladores y organizaciones aprovechar la identidad autosoberana y los NFT/SBT._

## Para profundizar sobre el tema {#further-reading}

### Artículos {#articles}

- [Casos de Uso de la cadena de bloques: Blockchain in Digital Identity](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [¿Qué es Ethereum ERC725? Administración propia y soberana de identidades en la cadena de bloques](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Ciudad de Sam_
- [Cómo la cadena de bloques podría resolver el problema de la identidad digital](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [¿Qué es la identidad descentralizada y por qué merece tu atención?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [Introducción a la identidad descentralizada](https://walt.id/white-paper/digital-identity), _Dominik Beron_

### Vídeos {#videos}

- [Identidad descentralizada (bonificación de sesión Livestream)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Un vídeo muy aclarador de la identidad descentralizada explicado por Andreas_
- [Iniciar sesión con Ethereum e Identity descentralizada con Ceramic, IDX, React, y 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _tutorial de YouTube sobre la construcción de un sistema de gestión de identidad para crear, leer, y actualizar el perfil de un usuario usando su cartera Ethereum por Nader Dabit_
- [BrightID - Identidad descentralizada en Ethereum](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _episodio de pódcast Bankless abordando BrightID, una solución de identidad descentralizada para Ethereum_
- [Internet fuera de la cadena: Credenciales descentralizadas y verificables](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — EthDenver 2022 presentación de Evin McMullen
- [Credenciales verificables explicadas](https://www.youtube.com/watch?v=ce1IdSr-Kig), Vídeo explicativo de YouTube con una demostración realizada por Tamino Baumann

### Comunidades {#communities}

- [ERC-725 Alianza en GitHub](https://github.com/erc725alliance) — _Partidarios del estándar ERC725 para gestionar la identidad en la cadena de bloques Ethereum_
- [Servidor SpruceID Discord](https://discord.com/invite/Sf9tSFzrnt) — _Comunidad para entusiastas y desarrolladores que trabajan en SpruceID con Ethereum_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Una comunidad de desarrolladores que contribuyen a la construcción de un marco para datos verificables para aplicaciones_
- [walt.id](https://discord.com/invite/AW8AgqJthZ): _una comunidad de desarrolladores y constructores que se ocupan de los casos de uso para las identidades descentralizadas en varias industrias._
