---
title: Seguridad y prevención de fraudes en Ethereum
description: Actuar con seguridad en Ethereum
lang: es
---

# Seguridad en Ethereum y la prevención de fraude {#introduction}

El creciente interés en criptomonedas trae consigo un aumento de riesgo a causa de estafadores y hackers. Este artículo establece algunas de las mejores prácticas para mitigar estos riesgos.

<Divider />

## Seguridad de criptomonedas 101 {#crypto-security}

### Amplíe sus conocimientos {#level-up-your-knowledge}

Los malentendidos sobre cómo funcionan las criptomonedas pueden conducir a errores muy costosos. Por ejemplo, si alguien pretende ser un agente de servicio al cliente que ofrece recuperar ETH perdido a cambio de sus claves privadas, está pretendiendo aprovecharse de gente que no entiende que Ethereum es una red descentralizada carente de este tipo de funcionalidad. Vale la pena dedicar tiempo a conocer el funcionamiento de Ethereum.

<DocLink href="/what-is-ethereum/">
  ¿Qué es Ethereum?
</DocLink>

<DocLink href="/eth/">
  ¿Qué es el ether?
</DocLink>
<Divider />

## Seguridad de la billetera {#wallet-security}

### No entregue sus claves privadas {#protect-private-keys}

**¡Nunca, por ningún motivo, comparta sus claves privadas!**

La clave privada de su billetera digital es la contraseña para acceder a su billetera de Ethereum. ¡Es lo único que impide que alguien que conozca la dirección de su billetera saque todos los activos de su cuenta!

<DocLink href="/wallets/">
  ¿Qué es una cartera de Ethereum?
</DocLink>

#### No tome capturas de pantalla de sus frases semilla/claves privadas {#screenshot-private-keys}

Hacer capturas de pantalla de sus frases semilla o claves privadas podría sincronizarlas con un proveedor de datos en la nube, lo cual podría hacerlas accesibles a los hackers. Obtener claves privadas de la nube es un vector de ataque común para los hackers.

### Use una billetera de hardware {#use-hardware-wallet}

Una billetera de hardware proporciona almacenamiento sin conexión para claves privadas. Son considerados la opción de billetera más segura para almacenar sus claves privadas: su clave privada nunca toca Internet y permanece completamente local en su dispositivo.

Mantener las claves privadas sin conexión reduce altamente el riesgo de se pirateen, incluso si un hacker llega a controlar su computadora.

#### Pruebe una billetera de hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Compruebe las transacciones antes de enviarlas {#double-check-transactions}

El envío accidental de criptomonedas a una dirección de cartera errónea suele ocurrir frecuentemente. **Una transacción enviada en Ethereum es irreversible.** A menos que conozca al propietario de la dirección y pueda convencerlo de regresarle sus fondos, no le será posible recuperarlos.

Asegúrese siempre de que la dirección a la que está enviando los fondos sea exactamente igual que la dirección deseada del destinatario antes de enviar una transacción. Es una buena práctica cuando interactúa con un contrato inteligente leer el mensaje de la transacción antes de firmarla.

### Establezca límites de gasto de contratos inteligentes {#spend-limits}

Cuando firme contratos inteligentes, no permita un techo ilimitado de gasto. Un gasto ilimitado podría permitir que el contrato inteligente vaciara su cartera. En cambio, fije límites de gasto a tan solo la cantidad necesaria para la transacción.

Muchas carteras de Ethereum ofrecen una protección de límites para evitar que las cuentas se vacíen.

[Cómo revocar el acceso al contrato inteligente a sus fondos en criptomonedas](/guides/how-to-revoke-token-access/)

<Divider />

## Estafas comunes {#common-scams}

Es imposible parar a los estafadores completamente, pero podemos hacerlos menos efectivos siendo conscientes de sus técnicas más usadas. Estas estafas se presentan de muchas formas, pero suelen seguir los mismos patrones a grandes rasgos. Si no puede hacer más, tenga esto presente:

- actúe siempre con escepticismo,
- nadie le va a dar ETH gratis o con descuento
- nadie necesita tener acceso a sus claves privadas o su información personal.

### Phising publicitario en Twitter {#ad-phishing}

![Phishing mediante enlace de Twitter](./twitterPhishingScam.png)

Existe un método para falsificar la función de vista previa de enlaces (desplegable) de Twitter (también conocida como X) para potencialmente engañar a los usuarios haciéndoles creer que están visitando un sitio web legítimo. Esta técnica explota el mecanismo de Twitter para generar vistas previas de URL compartidas en los tuits y muestra _de ethereum.org_ por ejemplo (mostrado arriba), cuando en realidad están siendo redirigidos a un sitio malicioso.

Verifique siempre que está en el dominio correcto, especialmente después de hacer clic en un enlace.

[Más información aquí](https://harrydenley.com/faking-twitter-unfurling).

### La estafa de los regalos {#giveaway}

Una de las estafas más comunes en torno a las criptomonedas es la de ofrecer regalos. La estafa de los regalos engañosos puede tomar muchas formas, pero la idea general es que, si usted envía ETH a la dirección de la billetera digital proporcionada, recibirá su ETH de vuelta pero duplicado. *Por esta razón, también se la conoce como estafa del 2 por 1.*

Estas estafas usualmente estipulan un límite de tiempo de oportunidad para reclamar el regalo para crear una falsa sensación de urgencia.

### Hackeos en redes sociales {#social-media-hacks}

Un ejemplo concreto de esto a gran escala ocurrió en julio de 2020 cuando cuentas de Twitter de celebridades y organizaciones destacadas fueron hackeadas. El hacker publicó simultáneamente una oferta de regalar Bitcoin en las diferentes cuentas hackeadas. Aunque los tweets engañosos se detectaron y eliminaron rápidamente, los hackers lograron igualmente hacerse con 11 bitcoins (o $500.000 en septiembre de 2021).

![Estafa en Twitter](./appleTwitterScam.png)

### Regalo de celebridades {#celebrity-giveaway}

Que las celebridades hagan un regalo suele ser otra estafa común. Los estafadores toman una entrevista de video grabada o charla de una conferencia que haya realizado alguien famoso y la retransmiten en directo en YouTube, haciendo que aparezca como si la persona famosa estuviera haciendo una entrevista de video en directo apoyando una oferta de criptomonedas como regalo.

Para este tipo de estafa, se suele elegir a Vitalik Buterin, aunque tales tentativas también utilizan la imagen de muchas otras personas prominentes involucradas en las criptomonedas (como Elon Musk o Charles Hoskinson). Incluir a una persona conocida da a los estafadores sentido de legitimidad (la situación parece sospechosa, pero, si Vitalik, ¡debe ser real!).

**Los regalos son siempre estafas. Si envía sus fondos a estas cuentas, los perderá para siempre.**

![Estafa en YouTube](./youtubeScam.png)

### Estafas de soporte {#support-scams}

Las criptomonedas son una tecnología relativamente nueva y mal entendida. Un fraude común que se aprovecha de esto es la estafa de brindar ayuda o soporte, donde los estafadores se hacen pasar por técnicos de billeteras, exchanges o cadenas de bloques populares.

Gran parte del debate sobre Ethereum tiene lugar en Discord. Los estafadores que ofrecen soporte técnico generalmente encontrarán a sus víctimas buscando preguntas de soporte en canales de Discord públicos y luego enviando al solicitante un mensaje privado para ofrecer soporte. Al ganarse su confianza, los estafadores de soporte técnico intentarán engañarlo para que revele sus claves privadas o les envíe fondos a sus billeteras.

![Estafa de soporte en Discord](./discordScam.png)

Como norma general, el personal nunca se comunicará con usted a través de canales privados no oficiales. He aquí algunas cosas sencillas que debe tener en cuenta cuando trate con Soporte:

- Nunca comparta sus claves privadas, frases semilla o contraseñas.
- Nunca permita a nadie acceso remoto a su ordenador.
- Nunca se comunique fuera de los canales designados por una organización.

<InfoBanner emoji=":lock:">
  <div>
    Atención: aunque las estafas del estilo del soporte técnico suelen ocurrir en Discord, también pueden prevalecer en cualquier aplicación de chat en la que se hable de criptomonedas, incluido el correo electrónico.
  </div>
</InfoBanner>

### Estafa del token Eth2 {#eth2-token-scam}

En el período previo a [La Fusión](/roadmap/merge/), los estafadores se aprovechaban de la confusión en torno al término "Eth2" para intentar que los usuarios canjearan su ETH por un token "ETH2". No existe el "ETH2", y no se introdujo ningún otro token legítimo con La Fusión. El ETH que usted poseía antes de La Fusión es el mismo ETH ahora. No hay **necesidad de realizar ninguna acción relacionada con su ETH para el cambio de prueba de trabajo a prueba de participación**.

Los estafadores pueden presentarse como personal de "soporte", diciéndole que, si deposita ETH, recibirá de vuelta "ETH2". No hay [soporte oficial de Ethereum](/community/support/), y tampoco hay tokens nuevos. Nunca comparta la frase semilla de su billetera con nadie.

_Nota: Hay etiquetas/tokens derivados que pueden representar ETH apostado (p. ej., rETH de Rocket Pool, stETH de Lido, ETH2 de Coinbase), pero son algo a lo que deba "migrar"._

### Estafas de suplantación de identidad {#phishing-scams}

Las estafas de suplantación de identidad (o phishing) son otra forma común que los estafadores usarán para intentar robarle los fondos de su billetera.

Algunos correos electrónicos de suplantación de identidad piden a los usuarios que hagan clic en enlaces que los redirigirán a sitios web de imitación, pidiéndoles que introduzcan su frase semilla, restablezcan su contraseña o envíen ETH. Otros le pueden pedir que instale malware sin saber lo que hace para infectar su computadora y permitir el acceso a los archivos.

Si recibe un correo electrónico de un remitente desconocido, recuerde:

- No abra nunca un enlace o adjunto procedente de direcciones de correo electrónico que no reconozca.
- No facilite nunca su información personal o contraseñas a nadie.
- Elimine correos de remitentes desconocidos.

[Más información sobre cómo evitar las estafas de suplantación de identidad.](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Estafas de brokers de trading de criptomonedas {#broker-scams}

Los operadores del mercado de criptomonedas estafadores pretenden ser intermediarios especialistas que ofrecen tomar su dinero e invertirlo en su nombre. Después de que el estafador recibe sus fondos, podría inducirlo a que envíe más para que no se pierda más posibles ganancias o desaparecer por completo.

Estos estafadores a menudo buscan sus objetivos usando cuentas falsas en YouTube para comenzar una conversacion aparentemente natural sobre el broker. Las conversaciones a menudo suelen contar con gente que los apoya, pero los votos de confianza son de cuentas bot.

**No confíe en extraños de Internet para que inviertan en su nombre. Perderá sus criptomonedas.**

![Estafa de broker de trading en YouTube](./brokerScam.png)

### Estafas de fondos de minado de criptomonedas {#mining-pool-scams}

Desde septiembre de 2022, el minado en Ethereum ya no es posible. Sin embargo, las estafas basadas en fondos de minado siguen existiendo. Las estafas de fondos de minado de criptomonedas implican a personas que se ponen en contacto con usted sin haberlo solicitado y que afirman que podría obtener grandes beneficios si se une a un fondo de Ethereum. El estafador le pedirá dinero y permanecerá en contacto con usted todo el tiempo que sea necesario. Esencialmete, el estafador tratará de convencerlo de que, cuando se una a un grupo o fondo de minado, sus criptomonedas se usarán para crear ETH y así se le pagarán dividendos en forma de ETH. Luego usted verá que sus criptomonedas están generando pequeños retornos. Esto es simplemente un anzuelo para que invierta más. Eventualmente, todos sus fondos serán enviados a una dirección desconocida, y el estafador desaparecerá o, en algunos casos, seguirá en contacto como ha ocurrido en un caso reciente.

En conclusión: tenga cuidado de gente que lo contacta pidiendo ser parte de un grupo o pozo de minado. Una vez que pierda sus criptomonedas, ¡se acabó!

He aquí un compendio de puntos para recordar:

- Tenga cuidado si alguien se pone en contacto con usted y le habla de formas de ganar dinero con sus criptomonedas.
- Indague sobre staking, fondos de liquidez u otras formas de invertir sus criptomonedas.
- Rara vez son legítimos esos planes, si es que alguna vez lo son. Y si lo fueran, probablemente serían de dominio público y ya habría oído hablar de ellos.

[Un hombre pierde $200.000 en una estafa de un fondo de minado](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Estafas de distribución de criptomonedas (airdropping) {#airdrop-scams}

Las estafas de distribución de criptomonedas, o airdropping, implican una tentativa de estafa en el que un proyecto falso distribuye un activo (NFT, token) en su billetera para lo cual deben enviarlo a un un sitio web fraudulento a fin de reclamar el activo distribuido. Se le pedirá que inicie sesión con su billetera de Ethereum y que "apruebe" una transacción al intentar reclamar el activo. Esta transacción compromete su cuenta enviando sus claves públicas y privadas al estafador. Otra forma de esta estafa consiste en pedirle que confirme una transacción en la que se envían fondos a la cuenta del estafador.

[Más información sobre las estafas de airdropping](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Seguridad en la Web 101 {#web-security}

### Utilice contraseñas seguras {#use-strong-passwords}

[Más del 80% de los ataques a cuentas se producen a causa de contraseñas débiles o robadas](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Una gran combinacion de carácteres, números y símbolos ayudará a mantener sus cuentas seguras.

Un error común es usar una combinación de palabras comunmente ralcionadas. Contraseñas como estas son inseguras, ya que son propensas a una técnida de hackeo llamada ataque de diccionario.

```md
Ejemplo de una contraseña débil: CuteFluffyKittens!

Ejemplo de una contraseña fuerte: ymv\*azu.EAC8eyp8umf
```

Otro error común es el uso de contraseñas que se pueden adivinar fácilmente o descubrir a través de [ingeniería social](https://wikipedia.org/wiki/Social_engineering_(security)). Incluir el nombre de soltera de su madre, los nombres de sus hijos o mascotas, o fechas de cumpleaños en su contraseña incrementará el riesgo de ser hackeada.

#### Buenas prácticas de contraseña: {#good-password-practices}

- Crear las contraseñas más largas que permita su generador de contraseñas o el formulario que está rellenando.
- Usar una mezcla de mayúsculas, minúsculas, números y símbolos.
- No utilizar datos personales, tales como apellidos, en su contraseña.
- Evitar palabras comunes.

[Más información sobre la creación de contraseñas fuertes.](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Use contraseñas únicas para todo {#use-unique-passwords}

Una contraseña segura que ha sido revelada en una violación de datos deja de ser una contraseña segura. La página web [Have I Been Pwned](https://haveibeenpwned.com) le permite revisar si sus cuentas se han visto involucradas en alguna filtración de datos pública. Si lo han sido, **cambie esas contraseñas inmediatamente**. Usar contraseñas únicas para cada cuenta disminuye el riesgo de que los hackers accedan a todas sus cuentas si una de sus contraseñas ya está comprometida.

### Use un gestor de contraseñas {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Un gestor de contraseñas se encarga de crear contraseñas seguras, únicas y recordarlas. Le <strong>aconsejamos vivamente</strong> que utilice uno, ¡y la mayoría de ellos son gratis!
  </div>
</InfoBanner>

Recordar contraseñas seguras y únicas para cada cuenta que tenga no es la solución perfecta. Un gestor de contraseñas ofrece un espacio seguro y cifrado para todas sus contraseñas, a las que puede acceder a través de una contraseña maestra segura. También le sugiere contraseñas seguras al registrarse en un nuevo servicio, por lo que no tiene que crear sus propias contraseñas. Muchos administradores de contraseñas también le dirán si sus datos han sido filtrados, permitiéndole cambiar las contraseñas antes de cualquier ataque malicioso.

![Ejemplo de uso de un gestor de contraseñas](./passwordManager.png)

#### Pruebe a usar un gestor de contraseñas: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- O revise otros [gestores de contraseñas recomendados](https://www.privacytools.io/secure-password-manager)

### Use la autenticación de dos factores {#two-factor-authentication}

En ocasiones le pueden pedir que autentifique su identidad a través de pruebas únicas. Estas son conocidas como **factores**. Los tres factores principales son:

- Algo que usted sepa (como una contraseña o una pregunta de seguridad).
- Algún rasgo distintivo suyo (como una huella dactilar o un escáner de iris/facial).
- Algo que tenga (una clave de seguridad o una aplicación de autenticación en su teléfono).

Usar un **Factor de Doble Autenticación (2FA)** provee un *factor de seguridad* adicional para sus cuentas en línea. 2FA asegura que no sea posible acceder a su cuenta con solo tener su contraseña. Lo más común es que el segundo factor sea un código aleatorio de 6 dígitos, conocido como una **contraseña de una sola vez basada en (TOTP)**, que puede acceder a través de una aplicación de autenticación, como Google Authenticator o Authy. Estos funcionan como un factor de «algo que usted posee», porque la semilla que genera el código temporizado se almacena en su dispositivo.

<InfoBanner emoji=":lock:">
  <div>
    Nota: El uso de 2FA basado en SMS es susceptible a <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM jacking</a> y no es seguro. Para lograr mayor seguridad, utilice un servicio como <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> o <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Herramientas de seguridad {#security-keys}

Una llave de seguridad es un tipo más avanzado y seguro de 2FA. Las llaves de seguridad son dispositivos físicos de autenticación de hardware que funcionan de la misma manera que las aplicaciones de autenticación. Usar una clave de seguridad es la manera más segura de llegar a 2FA. Muchas de estas claves utilizan el estándar universal de segundo factor U2F. [Más información sobre FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Ver más sobre 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Desinstale extensiones del navegador {#uninstall-browser-extensions}

Las extensiones del navegador, como las extensiones de Chrome o los complementos para Firefox, pueden mejorar la funcionalidad del navegador y la experiencia del usuario, pero no están exentas de riesgos. De forma predeterminada, la mayoría de las extensiones del navegador piden acceso a «leer y cambiar datos del sitio», permitiéndoles hacer casi cualquier cosa con sus datos. Las extensiones de Chrome siempre se actualizan automáticamente, por lo que una extensión previamente segura puede actualizarse más tarde e incluir código malicioso. La mayoría de las extensiones del navegador no intentan robar sus datos, no obstante debe ser consciente de que pueden hacerlo.

#### Haga lo siguiente para mantenerse seguro: {#browser-extension-safety}

- Instale solo las extensiones del navegador desde fuentes de confianza.
- Elimine extensiones no utilizadas del navegador.
- Instale las extensiones de Chrome localmente para detener la actualización automática (avanzado).

[Más sobre los riesgos de las extensiones del navegador](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Más información {#further-reading}

### Seguridad de la Web {#reading-web-security}

- [Hasta 3 millones de dispositivos infectados por complementos Chrome y Edge enlazados con malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/), _Dan Goodin_
- [Cómo crear una contraseña segura que no olvide](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget), _AVG_
- [¿Qué es una clave de seguridad?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq), _Coinbase_

### Seguridad en las criptomonedas {#reading-crypto-security}

- [Protección para usted y sus fondos](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) _MyCrypto_
- [Problemas de seguridad comunes en programas cripto de comunicación](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media), _Salus_
- [Guía de Seguridad para torpes y para listos también](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Seguridad en las criptomonedas: contraseñas y autenticación](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. ispoulos_

### Recursos para evitar estafas {#reading-scam-education}

- [Guía: cómo identificar tókenes fraudulentos](/guides/how-to-id-scam-tokens/)
- [Operar con seguridad: estafas comunes](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Evitar estafas](https://bitcoin.org/en/scams), _Bitcoin.org_
- [Hilo de Twitter sobre correos electrónicos y mensajes comunes de phishing de criptomonedas](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
