---
title: Seguridad en Ethereum y prevención de fraudes
description: Manteniendo seguridad en Ethereum
lang: es
sidebar: true
---

# Seguridad en Ethereum y prevención de fraudes {#introduction}

Con el interés en las criptomonedas creciendo, aprender las mejores prácticas al usar criptomonedas es esencial. Cripto puede ser divertido y emocionante, pero también existen riesgos serios. Si mete esta pequeña cantidad de trabajo inicial, puede mitigar estos riesgos.

<Divider />

## Seguridad en la Web 101 {#web-security}

### Utiliza contraseñas fuertes {#use-strong-passwords}

[Más del 80% de los hacks de cuentas son a resulto de contraseñas débiles o robadas](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Una larga combinación de caracteres, números y símbolos es optimo para mantener sus cuentas seguras.

Un error común que cometen los individuos es usar una combinación de dos a tres palabras comunes del diccionario relacionadas. Contraseñas como esta son insecuras, porque son propensas a una simple técnica de hacking conocida como un [diccionario de ataque](https://wikipedia.org/wiki/Dictionary_attack).

```md
Ejemplo de una contraseña débil: ¡CuteFluffyKittens!

Ejemplo de una contraseña fuerte: ymv\*azu.EAC8eyp8umf
```

Otro error común es el uso de contraseñas que se pueden adivinar fácilmente o descubrir a través de [ingeniería social](<https://wikipedia.org/wiki/Social_engineering_(security)>). Incluye el nombre de tu madre, los nombres de tus hijos o mascotas, o fechas de nacimiento en su contraseña no es segura y aumentará el riesgo de que su contraseña sea hackeada.

#### Buenas prácticas de contraseña: {#good-password-practices}

- Crear contraseñas siempre que sea permitido por su generador de contraseñas o el formulario que está rellenando
- Usar una mezcla de mayúsculas, minúsculas, números y símbolos
- No utilices datos personales, tales como apellidos, en tu contraseña
- Evitar palabras del diccionario comunes

[Más sobre la creación de contraseñas fuertes](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Usar contraseñas únicas para todo {#use-unique-passwords}

Una contraseña fuerte no proporciona tanta protección si la contraseña se revela en una violación de datos. El sitio web[He sido Pwned](https://haveibeenpwned.com)le permite comprobar si sus cuentas participaron en cualquier infracción de datos almacenada en su base de datos. Si lo tienen,**debería cambiar las contraseñas pwned inmediatamente**. El uso de contraseñas únicas para cada cuenta reduce el riesgo de que los hackers obtengan acceso a todas sus cuentas cuando una de sus contraseñas se vea comprometida.

### Usar un gestor de contraseñas {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    ¡Usar un gestor de contraseñas se encarga de crear contraseñas fuertes y únicas y de recordarlas! <strong>Recomendamos fuertemente</strong> usar uno, y la mayoría de ellos son gratis!
  </div>
</InfoBanner>

Recordar contraseñas fuertes y únicas para cada cuenta que tengas no es el ideal. Un gestor de contraseñas ofrece una tienda segura y cifrada para todas sus contraseñas a las que puede acceder a través de una contraseña maestra fuerte. También sugieren contraseñas fuertes al registrarse en un nuevo servicio, por lo que no tiene que crear sus propias contraseñas. Muchos administradores de contraseñas también le dirán si ha estado involucrado en una violación de datos, permitiéndole cambiar las contraseñas antes de cualquier ataque malicioso.

![Example of using a password manager](./passwordManager.png)

#### Usar un gestor de contraseñas: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [LastPass](https://www.lastpass.com/)
- [1Password](https://1password.com/)

### Usar autenticación de dos factores {#two-factor-authentication}

Para demostrar que eres realmente tú, hay diferentes pruebas únicas que se pueden utilizar para la autenticación. Estos son conocidos como **factores** y los tres factores principales son:

- Algo que usted sabe (como una contraseña o una pregunta de seguridad)
- Algo que eres (como una huella dactilar o un escáner iris/facial)
- Algo que tienes (una clave de seguridad o una aplicación de autenticación en tu teléfono)

Utilizando**la autenticación de dos factores (2FA)**proporciona un*factor de seguridad adicional*para sus cuentas en línea de modo que conocer solo su contraseña (algo que usted sabe) no es suficiente para acceder a una cuenta. Lo más común es que el segundo factor es un código aleatorio de 6 dígitos, conocido como una contraseña de una sola vez basada en **(TOTP)**, que puedes acceder a través de una aplicación de autenticación, como Google Authenticator o Authy. Estos funcionan como un factor de "algo que usted posee" porque la semilla que genera el código temporizado se almacena en su dispositivo.

<InfoBanner emoji=":lock:">
  <div>
    Nota: El uso de 2FA basado en SMS es susceptible a
    <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
      jack de SIM
    </a>
    y no es seguro. Para la mejor seguridad, usa un servicio como{" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Authenticator
    </a>
    o <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Herramientas de seguridad {#security-keys}

Para aquellos que quieran dar el siguiente paso en 2FA, considere usar una clave de seguridad. Las claves de seguridad son dispositivos físicos de autenticación de hardware que funcionan de la misma manera que las aplicaciones de autenticación. Usar una clave de seguridad es la manera más segura de llegar a 2FA. Muchas de estas claves utilizan el estándar FIDO Universal 2nd Factor (U2F). [Más información sobre FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Ver más en el 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Desinstalar extensiones del navegador {#uninstall-browser-extensions}

Las extensiones del navegador como las extensiones Chrome o los complementos para Firefox pueden aumentar la funcionalidad útil del navegador y mejorar la experiencia del usuario, pero vienen con riesgos. De forma predeterminada, la mayoría de las extensiones del navegador piden acceso a 'leer y cambiar datos del sitio', permitiéndoles hacer casi cualquier cosa con sus datos. Las extensiones de Chrome siempre se actualizan automáticamente, por lo que una extensión previamente segura puede actualizarse más tarde para incluir código malicioso. La mayoría de las extensiones del navegador no están intentando robar tus datos, pero debes ser consciente de que pueden.

#### Manténgase seguro: {#browser-extension-safety}

- Instalando sólo las extensiones del navegador desde fuentes confiables
- Eliminando extensiones no utilizadas del navegador
- Instalando las extensiones de Chrome localmente para detener la actualización automática (Avanzado)

[Más sobre los riesgos de las extensiones del navegador](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Seguridad de criptomonedas 101 {#crypto-security}

### Sube de nivel tu conocimiento {#level-up-your-knowledge}

Una de las razones más importantes por las que la gente se estafa en cripto generalmente es la falta de entendimiento. Por ejemplo, si no entiende que la red Ethereum está descentralizada y propiedad de nadie, entonces es fácil caer presa de alguien que pretende ser un agente de servicio al cliente que promete devolver su ETH perdido a cambio de sus claves privadas. Educarse sobre el funcionamiento de Ethereum es una inversión que vale la pena.

<DocLink to="/what-is-ethereum/">
  ¿Qué es Ethereum?
</DocLink>

<DocLink to="/eth/">
  ¿Qué es el ether?
</DocLink>
<Divider />

## Seguridad de la cartera {#wallet-security}

### No entregue sus claves privadas {#protect-private-keys}

**Nunca por ninguna razón, comparta sus claves privadas!**

La clave privada de su cartera actúa como una contraseña para su cartera Ethereum. ¡Es lo único que impide que alguien que conozca su dirección de billetera consuma su cuenta de todos sus activos!

<DocLink to="/wallets/">
  ¿Qué es una cartera de Ethereum?
</DocLink>

#### No tome capturas de pantalla de sus frases de semilla/claves privadas {#screenshot-private-keys}

Al hacer una captura de pantalla de tus frases de semillas o claves privadas, te arriesgas a sincronizarlas en la nube y potencialmente hacerlas accesibles a los hackers. Obtener claves privadas de la nube es un vector de ataque común para los hackers.

### Usar una cartera hardware {#use-hardware-wallet}

Un monedero de hardware proporciona almacenamiento sin conexión para claves privadas. Se consideran la opción más segura para almacenar sus claves privadas.

Mantener las claves privadas sin conexión reduce masivamente el riesgo de ser hackeadas, incluso si un hacker tiene el control de su computadora.

#### Prueba una cartera hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Comprobar las transacciones antes de enviar {#double-check-transactions}

El envío accidental de criptomonedas a la dirección errónea del monedero es un error común. **Una transacción enviada en Ethereum es irreversible.** A menos que conozcas el propietario de la dirección y puedas convencerlos de que te envíen tu fondo de vuelta, no habrá forma de recuperar sus fondos.

Siempre asegúrese de que la dirección que está enviando coincida exactamente con la dirección deseada del destinatario antes de enviar una transacción. También se recomienda al interactuar con un contrato inteligente leer el mensaje de transacción antes de firmar.

### Establecer límites de gasto de contratos inteligentes {#spend-limits}

Cuando interactúe con contratos inteligentes, no permita límites ilimitados de gasto. Un gasto ilimitado podría permitir que el contrato inteligente consumiera su cartera. En cambio, fije límites de gasto a sólo la cantidad necesaria para la transacción.

Muchas billeteras Ethereum ofrecen una protección de límites para proteger contra el consumo de cuentas.

[Explora las carteras con protección de límites](/wallets/find-wallet/?filters=has_limits_protection)

<Divider />

## Estafas comunes {#common-scams}

Los estafadores siempre están buscando maneras de quitarle sus fondos. Es imposible detener completamente a los estafadores, pero podemos hacerlos menos eficaces al conocer la mayoría de las técnicas utilizadas. Hay muchas variaciones de estas estafas, pero generalmente siguen los mismos patrones de alto nivel. Si nada más, recuerda:

- siempre ser escéptico
- ¡nadie te va a regalar ETH!
- nadie necesita acceso a sus claves privadas o información personal

### Estafa de regalos {#giveaway}

Una de las estafas más comunes en criptomoneda es la estafa de regalos. La estafa de regalos puede tomar muchas formas, pero la premisa general es que si envía ETH a la dirección del monedero proporcionado, usted recibirá su ETH de vuelta pero doble. *Por esta razón, también es conocido como la estafa 2 a 1.*

Estas estafas suelen estipular un tiempo limitado de oportunidad para reclamar el regalo para alentar una mala toma de decisiones y crear una sensación de falsa urgencia.

#### Hacks en redes sociales {#social-media-hacks}

Una versión de alto perfil de esto ocurrió en julio de 2020, cuando las cuentas de Twitter de celebridades y organizaciones destacadas fueron hackeadas. El hacker ha publicado simultáneamente un regalo de Bitcoin en las cuentas hackeadas. Aunque los tweets engañosos se notaron y eliminaron rápidamente, los hackers todavía lograron salir con 11 bitcoin (o $500,000 a partir de septiembre de 2021)

![A scam on Twitter](./appleTwitterScam.png)

#### Regalo de Celebridad {#celebrity-giveaway}

El regalo de las celebridades es otra forma común que toma la estafa de regalo. Los estafadores tomarán una entrevista de vídeo grabada o conferencia de conferencia dada una celebridad y en vivo en YouTube, haciendo que aparezca como si la celebridad estuviera dando una entrevista de vídeo en vivo respaldando un regalo de criptomonedas.

Vitalik Buterin se utiliza más a menudo en esta estafa, pero muchas otras personas prominentes involucradas en criptografía también se utilizan (e. Elon Musk o Charles Hoskinson). Incluir una persona bien conocida, da a los estafadores el sentido de legitimidad (Esto parece esbozado, pero Vitalik está involucrado, así que debe estar bien!).

**Los regalos son siempre estafas. Si envía sus fondos a estas cuentas, los perderá para siempre.**

![A scam on YouTube](./youtubeScam.png)

### Scams de ayuda {#support-scams}

La criptomoneda es una tecnología relativamente joven y mal entendida. Una estafa común que se aprovecha de esto es la estafa de ayuda, donde los estafadores impersonarán al personal de soporte para carteras, intercambios o blockchains populares.

Gran parte del debate sobre Ethereum se produce en Discord. Los estafadores de apoyo generalmente encontrarán su objetivo buscando preguntas de soporte en canales de discord públicos y luego enviando al solicitante un mensaje privado que ofrezca soporte. Construyendo confianza, los estafadores de apoyo tratan de engañarle para que revele sus claves privadas o envíe sus fondos a sus billeteras.

![A support scam on Discord](./discordScam.png)

Como norma general, el personal nunca se comunicará con usted a través de canales privados y no oficiales. Algunas cosas sencillas a tener en cuenta cuando se trata de soporte:

- Nunca compartas tus claves privadas, frases de semilla o contraseñas
- Nunca permitir a nadie acceso remoto a tu ordenador
- Nunca se comunique fuera de los canales designados por una organización

<InfoBanner emoji=":lock:">
  <div>
    Atención: aunque las estafas al estilo de soporte suelen ocurrir en Discord, también pueden ser prevalentes en cualquier aplicación de chat en la que se produzca una discusión sobre criptomonedas, incluyendo el correo electrónico.
  </div>
</InfoBanner>

### Estafas de Phishing {#phishing-scams}

Las estafas de phishing son otro ángulo cada vez más común que los estafadores usarán para intentar robar los fondos de tu cartera.

Algunos correos electrónicos de suplantación de identidad piden a los usuarios que hagan clic en enlaces que los redirigirán a sitios web de imitación pidiéndoles que introduzcan su frase de semilla, restablezcan su contraseña o envíen ETH. Otros le pueden pedir que instale sin saberlo malware para infectar su computadora y dar acceso a los archivos de su computadora.

Si recibe un correo electrónico de un remitente desconocido, recuerde:

- Nunca abrir un enlace o adjunto desde direcciones de correo electrónico que no reconozca
- Nunca reconoces tu información personal o contraseñas a nadie
- Eliminar correos de remitentes desconocidos

[Más sobre cómo evitar estafas de phishing](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Estafas de brokers de cripto {#broker-scams}

Los corredores de criptomonedas Scam afirman ser corredores especializados en criptomonedas que se ofrecerán a tomar su dinero e invertirlo en su nombre. Las promesas de rendimientos poco realistas suelen acompañar esta oferta. Después de que el estafador reciba tus fondos, ellos te pueden guiar, pidiendo que envíes más fondos, para que no te pierdas más ganancias de inversión, o pueden desaparecer por completo.

Estos brokers fraudulentos encuentran sus objetivos mediante el uso de cuentas falsas en YouTube para iniciar conversaciones aparentemente naturales sobre el broker. Estas conversaciones a menudo son muy favorables para aumentar la legitimidad, pero los votos positivos son de cuentas bot.

**No confíe en los extraños de Internet para que invierta en su nombre. Perderás tus cripto.**

![A trading broker scam on YouTube](./brokerScam.png)

### Estafas mineras de cripto {#mining-pool-scams}

Las estafas de la piscina de minería involucran a personas que se pongan en contacto con usted sin solicitarlo, y afirmando que usted puede hacer grandes ganancias uniéndose a una piscina minera de Ethereum. El estafador hará reclamaciones y permanecerá en contacto con usted por todo el tiempo que tarde. Esencialmente, el estafador intentará convencerte de que cuando te unas a una piscina minera de Ethereum, su criptomoneda se utilizará para crear ETH y se le pagarán dividendos en forma de ETH. Lo que acabará sucediendo es, usted notará que su criptomoneda está haciendo pequeños rendimientos. Esto es simplemente para que usted invierta más. Finalmente todos sus fondos serán enviados a una dirección desconocida y el estafador desaparecerá o en algunos casos seguirá en contacto como ha ocurrido en un caso reciente.

Tengan cuidado con las personas que se pongan en contacto contigo en las redes sociales pidiéndole que formes parte de una piscina minera. Una vez que pierdes tu cripto, desaparece.

Algunas cosas para recordar:

- Ten cuidado de que alguien se ponga en contacto contigo acerca de las formas de ganar dinero con tu criptomonedas
- Haz tu investigación sobre stakin u otras formas de invertir tus criptomonedas
- Rarely, if ever, are such schemes legitimate. If they were, they would probably be mainstream and you will have heard of them.

[Man loses $200k in mining pool scam](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

<Divider />

## Más información {#further-reading}

### Web security {#reading-web-security}

- [This is why you shouldn’t use texts for two-factor authentication](https://www.theverge.com/2017/9/18/16328172/sms-two-factor-authentication-hack-password-bitcoin) - _The Verge_
- [Up to 3 million devices infected by malware-laced Chrome and Edge add-ons](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [How to Create a Strong Password — That You Won’t Forget](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [What is a security key?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Crypto security {#reading-crypto-security}

- [Protecting Yourself and Your Funds](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [4 Ways to Stay Safe in Crypto](https://www.coindesk.com/tech/2021/04/20/4-ways-to-stay-safe-in-crypto/) - _CoinDesk_
- [Security Guide For Dummies And Smart People Too](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Crypto Security: Passwords and Authentication](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Scam education {#reading-scam-education}

- [Staying Safe: Common Scams](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Avoiding Scams](https://bitcoin.org/en/scams) _Bitcoin.org_
