---
title: Seguridad y prevención de fraudes en Ethereum
description: Actuar con seguridad en Ethereum
lang: es
---

# Seguridad en Ethereum y prevención de estafas {#introduction}

El creciente interés en criptomonedas trae consigo un aumento de riesgo a causa de estafadores y hackers. Este artículo establece algunas de las mejores prácticas para mitigar estos riesgos.

**Recuerde: Ningún miembro de ethereum.org se pondrá en contacto con usted. No conteste a mensajes que dicen provenir del soporte de Ethereum.**

<Divider />

## Seguridad en cripto 101 {#crypto-security}

### Mejore su conocimiento {#level-up-your-knowledge}

Los malentendidos sobre cómo funcionan las criptomonedas pueden conducir a errores muy costosos. Por ejemplo, si alguien pretende ser un agente de servicio al cliente que ofrece recuperar ETH perdido a cambio de sus claves privadas, está pretendiendo aprovecharse de gente que no entiende que Ethereum es una red descentralizada carente de este tipo de funcionalidad. Vale la pena dedicar tiempo a conocer el funcionamiento de Ethereum.

<DocLink href="/what-is-ethereum/">
  ¿Qué es Ethereum?
</DocLink>

<DocLink href="/eth/">
  ¿Qué es ether?
</DocLink>
<Divider />

## Seguridad de la cartera {#wallet-security}

### No comparta sus claves privadas {#protect-private-keys}

**¡Nunca, bajo ninguna circunstancia, comparta sus claves privadas!**

La clave privada de su billetera digital es la contraseña para acceder a su billetera de Ethereum. ¡Es lo único que impide que alguien que conozca la dirección de su billetera saque todos los activos de su cuenta!

<DocLink href="/wallets/">
  ¿Qué es una cartera de Ethereum?
</DocLink>

#### No tome capturas de pantalla de sus frases semilla/claves privadas {#screenshot-private-keys}

Hacer capturas de pantalla de sus frases semilla o claves privadas podría sincronizarlas con un proveedor de datos en la nube, lo cual podría hacerlas accesibles a los hackers. Obtener claves privadas de la nube es un vector de ataque común para los hackers.

### Utilice una cartera hardware {#use-hardware-wallet}

Una billetera de hardware proporciona almacenamiento sin conexión para claves privadas. Son considerados la opción de billetera más segura para almacenar sus claves privadas: su clave privada nunca toca Internet y permanece completamente local en su dispositivo.

Mantener las claves privadas sin conexión reduce altamente el riesgo de se pirateen, incluso si un hacker llega a controlar su computadora.

#### Pruebe una cartera hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Verifique dos veces las transacciones antes de enviar {#double-check-transactions}

El envío accidental de criptomonedas a una dirección de cartera errónea suele ocurrir frecuentemente. **Una transacción enviada en Ethereum es irreversible.** A menos que conozca al propietario de la dirección y pueda convencerle de devolverle sus fondos, no podrá recuperarlos.

Asegúrese siempre de que la dirección a la que está enviando los fondos sea exactamente igual que la dirección deseada del destinatario antes de enviar una transacción.
Es una buena práctica cuando interactúa con un contrato inteligente leer el mensaje de la transacción antes de firmarla.

### Establezca límites de gasto en contratos inteligentes {#spend-limits}

Cuando firme contratos inteligentes, no permita un techo ilimitado de gasto. Un gasto ilimitado podría permitir que el contrato inteligente vaciara su cartera. En cambio, fije límites de gasto a tan solo la cantidad necesaria para la transacción.

Muchas carteras de Ethereum ofrecen una protección de límites para evitar que las cuentas se vacíen.

[Cómo revocar el acceso de los contratos inteligentes a sus fondos cripto](/guides/how-to-revoke-token-access/)

<Divider />

## Estafas comunes {#common-scams}

Es imposible parar a los estafadores completamente, pero podemos hacerlos menos efectivos siendo conscientes de sus técnicas más usadas. Estas estafas se presentan de muchas formas, pero suelen seguir los mismos patrones a grandes rasgos. Si no puede hacer más, tenga esto presente:

- actúe siempre con escepticismo,
- nadie le va a dar ETH gratis o con descuento
- nadie necesita tener acceso a sus claves privadas o su información personal.

### Phishing en anuncios de Twitter {#ad-phishing}

![Phishing de enlaces en Twitter](./twitterPhishingScam.png)

Existe un método para falsificar la función de vista previa de enlaces (desplegable) de Twitter (también conocida como X) para potencialmente engañar a los usuarios haciéndoles creer que están visitando un sitio web legítimo. Esta técnica explota el mecanismo de Twitter para generar vistas previas de URLs compartidas en tweets, y muestra _de ethereum.org_ por ejemplo (como se muestra arriba), cuando en realidad están redirigiendo a un sitio malicioso.

Verifique siempre que está en el dominio correcto, especialmente después de hacer clic en un enlace.

[Más información aquí](https://harrydenley.com/faking-twitter-unfurling).

### Estafa de sorteos {#giveaway}

Una de las estafas más comunes en torno a las criptomonedas es la de ofrecer regalos. La estafa de los regalos engañosos puede tomar muchas formas, pero la idea general es que, si usted envía ETH a la dirección de la billetera digital proporcionada, recibirá su ETH de vuelta pero duplicado._Por esta razón, también se la conoce como estafa del 2 por 1._

Estas estafas usualmente estipulan un límite de tiempo de oportunidad para reclamar el regalo para crear una falsa sensación de urgencia.

### Hackeos en redes sociales {#social-media-hacks}

Un ejemplo concreto de esto a gran escala ocurrió en julio de 2020 cuando cuentas de Twitter de celebridades y organizaciones destacadas fueron hackeadas. El hacker publicó simultáneamente una oferta de regalar Bitcoin en las diferentes cuentas hackeadas. Aunque los tweets engañosos se detectaron y eliminaron rápidamente, los hackers lograron igualmente hacerse con 11 bitcoins (o $500.000 en septiembre de 2021).

![Una estafa en Twitter](./appleTwitterScam.png)

### Sorteo de celebridades {#celebrity-giveaway}

Que las celebridades hagan un regalo suele ser otra estafa común. Los estafadores toman una entrevista grabada o una charla en conferencia dada por una celebridad y la transmiten en vivo en YouTube, haciendo parecer que la celebridad está dando una entrevista en vivo respaldando un sorteo de criptomonedas.

Para este tipo de estafa, se suele elegir a Vitalik Buterin, aunque tales tentativas también utilizan la imagen de muchas otras personas prominentes involucradas en las criptomonedas (como Elon Musk o Charles Hoskinson). Incluir a una persona conocida da a los estafadores sentido de legitimidad (la situación parece sospechosa, pero, si Vitalik, ¡debe ser real!).

**Los regalos son siempre estafas. Si envía sus fondos a estas cuentas, los perderá para siempre.**

![Una estafa en YouTube](./youtubeScam.png)

### Estafas de soporte {#support-scams}

Las criptomonedas son una tecnología relativamente nueva y mal entendida. Un fraude común que se aprovecha de esto es la estafa de brindar ayuda o soporte, donde los estafadores se hacen pasar por técnicos de billeteras, exchanges o cadenas de bloques populares.

Gran parte del debate sobre Ethereum tiene lugar en Discord. Los estafadores que ofrecen soporte técnico generalmente encontrarán a sus víctimas buscando preguntas de soporte en canales de Discord públicos y luego enviando al solicitante un mensaje privado para ofrecer soporte. Al ganarse su confianza, los estafadores de soporte técnico intentarán engañarlo para que revele sus claves privadas o les envíe fondos a sus billeteras.

![Una estafa de soporte en Discord](./discordScam.png)

Como norma general, el personal nunca se comunicará con usted a través de canales privados no oficiales. He aquí algunas cosas sencillas que debe tener en cuenta cuando trate con Soporte:

- Nunca comparta sus claves privadas, frases semilla o contraseñas.
- Nunca permita a nadie acceso remoto a su ordenador.
- Nunca se comunique fuera de los canales designados por una organización.

<InfoBanner emoji=":lock:">
  <div>
    Cuidado: aunque las estafas de tipo soporte ocurren comúnmente en Discord, también pueden ser frecuentes en cualquier aplicación de chat donde se discuta sobre cripto, incluido el correo electrónico.
  </div>
</InfoBanner>

### Estafa del token 'Eth2' {#eth2-token-scam}

En la antesala de [The Merge](/roadmap/merge/), los estafadores se aprovecharon de la confusión en torno al término 'Eth2' para intentar que los usuarios canjearan su ETH por un token 'ETH2'. No existe el "ETH2", y no se introdujo ningún otro token legítimo con La Fusión. El ETH que usted poseía antes de La Fusión es el mismo ETH ahora. **No es necesario realizar ninguna acción con respecto a su ETH para la transición de proof-of-work a proof-of-stake**.

Los estafadores pueden presentarse como personal de "soporte", diciéndole que, si deposita ETH, recibirá de vuelta "ETH2". No existe [soporte oficial de Ethereum](/community/support/), ni tampoco un nuevo token. Nunca comparta la frase semilla de su billetera con nadie.

_Nota: Existen tokens derivados/tickers que pueden representar ETH en staking (por ejemplo, rETH de Rocket Pool, stETH de Lido, ETH2 de Coinbase), pero no son algo a lo que deba "migrar"._

### Estafas de phishing {#phishing-scams}

Las estafas de suplantación de identidad (o phishing) son otra forma común que los estafadores usarán para intentar robarle los fondos de su billetera.

Algunos correos electrónicos de suplantación de identidad piden a los usuarios que hagan clic en enlaces que los redirigirán a sitios web de imitación, pidiéndoles que introduzcan su frase semilla, restablezcan su contraseña o envíen ETH. Otros le pueden pedir que instale malware sin saber lo que hace para infectar su computadora y permitir el acceso a los archivos.

Si recibe un correo electrónico de un remitente desconocido, recuerde:

- No abra nunca un enlace o adjunto procedente de direcciones de correo electrónico que no reconozca.
- No facilite nunca su información personal o contraseñas a nadie.
- Elimine correos de remitentes desconocidos.

[Más sobre cómo evitar estafas de phishing](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Estafas de brokers en trading cripto {#broker-scams}

Los operadores del mercado de criptomonedas estafadores pretenden ser intermediarios especialistas que ofrecen tomar su dinero e invertirlo en su nombre. Después de que el estafador recibe sus fondos, podría inducirlo a que envíe más para que no se pierda más posibles ganancias o desaparecer por completo.

Estos estafadores a menudo buscan sus objetivos usando cuentas falsas en YouTube para comenzar una conversacion aparentemente natural sobre el broker. Las conversaciones a menudo suelen contar con gente que los apoya, pero los votos de confianza son de cuentas bot.

**No confíe en extraños de Internet para que inviertan en su nombre. Perderá sus criptomonedas.**

![Una estafa de broker de trading en YouTube](./brokerScam.png)

### Estafas de pools de minería cripto {#mining-pool-scams}

Desde septiembre de 2022, el minado en Ethereum ya no es posible. Sin embargo, las estafas basadas en fondos de minado siguen existiendo. Las estafas de fondos de minado de criptomonedas implican a personas que se ponen en contacto con usted sin haberlo solicitado y que afirman que podría obtener grandes beneficios si se une a un fondo de Ethereum. El estafador le pedirá dinero y permanecerá en contacto con usted todo el tiempo que sea necesario. Esencialmete, el estafador tratará de convencerlo de que, cuando se una a un grupo o fondo de minado, sus criptomonedas se usarán para crear ETH y así se le pagarán dividendos en forma de ETH. Luego usted verá que sus criptomonedas están generando pequeños retornos. Esto es simplemente un anzuelo para que invierta más. Eventualmente, todos sus fondos serán enviados a una dirección desconocida, y el estafador desaparecerá o, en algunos casos, seguirá en contacto como ha ocurrido en un caso reciente.

En conclusión: tenga cuidado de gente que lo contacta pidiendo ser parte de un grupo o pozo de minado. Una vez que pierda sus criptomonedas, ¡se acabó!

He aquí un compendio de puntos para recordar:

- Tenga cuidado si alguien se pone en contacto con usted y le habla de formas de ganar dinero con sus criptomonedas.
- Indague sobre staking, fondos de liquidez u otras formas de invertir sus criptomonedas.
- Rara vez son legítimos esos planes, si es que alguna vez lo son. Y si lo fueran, probablemente serían de dominio público y ya habría oído hablar de ellos.

[Hombre pierde $200,000 en estafa de pool de minería](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Estafas de airdrop {#airdrop-scams}

Las estafas de distribución de criptomonedas, o airdropping, implican una tentativa de estafa en el que un proyecto falso distribuye un activo (NFT, token) en su billetera para lo cual deben enviarlo a un un sitio web fraudulento a fin de reclamar el activo distribuido. Se le pedirá que inicie sesión con su billetera de Ethereum y que "apruebe" una transacción al intentar reclamar el activo. Esta transacción compromete su cuenta enviando sus claves públicas y privadas al estafador. Otra forma de esta estafa consiste en pedirle que confirme una transacción en la que se envían fondos a la cuenta del estafador.

[Más sobre estafas de airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Seguridad web 101 {#web-security}

### Use contraseñas seguras {#use-strong-passwords}

[Más del 80% de los hackeos de cuentas se deben a contraseñas débiles o robadas](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Una gran combinacion de carácteres, números y símbolos ayudará a mantener sus cuentas seguras.

Un error común es usar una combinación de palabras comunmente ralcionadas. Contraseñas como estas son inseguras, ya que son propensas a una técnida de hackeo llamada ataque de diccionario.

```md
Ejemplo de contraseña débil: CuteFluffyKittens!

Ejemplo de contraseña fuerte: ymv\*azu.EAC8eyp8umf
```

Otro error común es usar contraseñas que pueden adivinarse fácilmente o descubrirse mediante [ingeniería social](https://wikipedia.org/wiki/Social_engineering_\(security\)). Incluir el nombre de soltera de su madre, los nombres de sus hijos o mascotas, o fechas de cumpleaños en su contraseña incrementará el riesgo de ser hackeada.

#### Buenas prácticas para contraseñas: {#good-password-practices}

- Crear las contraseñas más largas que permita su generador de contraseñas o el formulario que está rellenando.
- Usar una mezcla de mayúsculas, minúsculas, números y símbolos.
- No utilizar datos personales, tales como apellidos, en su contraseña.
- Evitar palabras comunes.

[Más sobre cómo crear contraseñas seguras](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Use contraseñas únicas para todo {#use-unique-passwords}

Una contraseña segura que ha sido revelada en una violación de datos deja de ser una contraseña segura. El sitio web [Have I Been Pwned](https://haveibeenpwned.com) le permite comprobar si sus cuentas han estado involucradas en alguna filtración pública de datos. Si es así, **cambie esas contraseñas de inmediato**. Usar contraseñas únicas para cada cuenta disminuye el riesgo de que los hackers accedan a todas sus cuentas si una de sus contraseñas ya está comprometida.

### Use un gestor de contraseñas {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Un gestor de contraseñas se encarga de crear contraseñas seguras, únicas y recordarlas. Le <strong>aconsejamos vivamente</strong> que utilice uno, ¡y la mayoría de ellos son gratis!
  </div>
</InfoBanner>

Recordar contraseñas seguras y únicas para cada cuenta que tenga no es la solución perfecta. Un gestor de contraseñas ofrece un espacio seguro y cifrado para todas sus contraseñas, a las que puede acceder a través de una contraseña maestra segura. También le sugiere contraseñas seguras al registrarse en un nuevo servicio, por lo que no tiene que crear sus propias contraseñas. Muchos administradores de contraseñas también le dirán si sus datos han sido filtrados, permitiéndole cambiar las contraseñas antes de cualquier ataque malicioso.

![Ejemplo de uso de un gestor de contraseñas](./passwordManager.png)

#### Pruebe un gestor de contraseñas: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- O consulte otros [gestores de contraseñas recomendados](https://www.privacytools.io/secure-password-manager)

### Utilice autenticación de dos factores {#two-factor-authentication}

En ocasiones le pueden pedir que autentifique su identidad a través de pruebas únicas. Estos se conocen como **factores**. Los tres factores principales son:

- Algo que usted sepa (como una contraseña o una pregunta de seguridad).
- Algún rasgo distintivo suyo (como una huella dactilar o un escáner de iris/facial).
- Algo que tenga (una clave de seguridad o una aplicación de autenticación en su teléfono).

Usar **autenticación de dos factores (2FA)** proporciona un _factor de seguridad_ adicional para sus cuentas en línea. 2FA asegura que no sea posible acceder a su cuenta con solo tener su contraseña. Por lo general, el segundo factor es un código aleatorio de 6 dígitos, conocido como **contraseña de un solo uso basada en el tiempo (TOTP)**, al que puede acceder mediante una app de autenticador como Google Authenticator o Authy. Estos funcionan como un factor de «algo que usted posee», porque la semilla que genera el código temporizado se almacena en su dispositivo.

<InfoBanner emoji=":lock:">
  <div>
    Nota: El uso de 2FA basado en SMS es susceptible a <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM jacking</a> y no es seguro. Para lograr mayor seguridad, utilice un servicio como <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> o <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Llaves de seguridad {#security-keys}

Una llave de seguridad es un tipo más avanzado y seguro de 2FA. Las llaves de seguridad son dispositivos físicos de autenticación de hardware que funcionan de la misma manera que las aplicaciones de autenticación. Usar una clave de seguridad es la manera más segura de llegar a 2FA. Muchas de estas claves utilizan el estándar universal de segundo factor U2F. [Más información sobre FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Ver más sobre 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Desinstale las extensiones del navegador {#uninstall-browser-extensions}

Las extensiones del navegador, como las extensiones de Chrome o los complementos para Firefox, pueden mejorar la funcionalidad del navegador y la experiencia del usuario, pero no están exentas de riesgos. De forma predeterminada, la mayoría de las extensiones del navegador piden acceso a «leer y cambiar datos del sitio», permitiéndoles hacer casi cualquier cosa con sus datos. Las extensiones de Chrome siempre se actualizan automáticamente, por lo que una extensión previamente segura puede actualizarse más tarde e incluir código malicioso. La mayoría de las extensiones del navegador no intentan robar sus datos, no obstante debe ser consciente de que pueden hacerlo.

#### Manténgase seguro: {#browser-extension-safety}

- Instale solo las extensiones del navegador desde fuentes de confianza.
- Elimine extensiones no utilizadas del navegador.
- Instale las extensiones de Chrome localmente para detener la actualización automática (avanzado).

[Más sobre los riesgos de las extensiones de navegador](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Lecturas adicionales {#further-reading}

### Seguridad web {#reading-web-security}

- [Hasta 3 millones de dispositivos infectados por complementos de Chrome y Edge con malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Cómo crear una contraseña segura — que no olvidará](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [¿Qué es una llave de seguridad?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Seguridad en cripto {#reading-crypto-security}

- [Protegiéndose y protegiendo sus fondos](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Problemas de seguridad en aplicaciones de comunicación cripto comunes](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Guía de seguridad para principiantes y personas expertas también](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Seguridad cripto: Contraseñas y autenticación](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Educación sobre estafas {#reading-scam-education}

- [Guía: Cómo identificar tokens estafas](/guides/how-to-id-scam-tokens/)
- [Manteniéndose seguro: Estafas comunes](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Evitando estafas](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Hilo de Twitter sobre correos y mensajes de phishing comunes en cripto](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
