---
title: Seguridad en Ethereum y prevención de estafas
description: Cómo mantenerse seguro en Ethereum
lang: es
---

El creciente interés en las criptomonedas trae consigo un riesgo cada vez mayor por parte de estafadores y piratas informáticos (hackers). Este artículo expone algunas de las mejores prácticas para mitigar estos riesgos.

**Recuerda: Nadie de ethereum.org se pondrá en contacto contigo. No respondas a correos electrónicos que digan ser del soporte oficial de Ethereum.**

<Divider />

## Conceptos básicos de seguridad cripto {#crypto-security}

### Mejora tus conocimientos {#level-up-your-knowledge}

Los malentendidos sobre cómo funcionan las cripto pueden llevar a errores costosos. Por ejemplo, si alguien finge ser un agente de servicio al cliente que puede devolver ETH perdido a cambio de tus claves privadas, se está aprovechando de las personas que no entienden que [Ethereum](/) es una red descentralizada que carece de este tipo de funcionalidad. Educarse sobre cómo funciona Ethereum es una inversión que vale la pena.

<DocLink href="/what-is-ethereum/">
  ¿Qué es Ethereum?
</DocLink>

<DocLink href="/what-is-ether/">
  ¿Qué es el ether?
</DocLink>
<Divider />

## Seguridad de la billetera {#wallet-security}

### Nunca compartas tu frase de recuperación {#protect-private-keys}

**¡Nunca, por ningún motivo, compartas tu frase de recuperación o tus claves privadas!**

Tu frase de recuperación (también llamada frase de recuperación secreta o frase semilla) es la clave maestra de tu billetera. Cualquiera que la tenga puede acceder a todas tus cuentas y vaciar todos tus activos. Las claves privadas funcionan de la misma manera para las cuentas individuales. Ningún servicio legítimo, agente de soporte o sitio web te las pedirá jamás.

<DocLink href="/wallets/">
  ¿Qué es una billetera de Ethereum?
</DocLink>

#### No tomes capturas de pantalla de tus frases semilla/claves privadas {#screenshot-private-keys}

Tomar capturas de pantalla de tus frases semilla o claves privadas podría sincronizarlas con un proveedor de datos en la nube, lo que podría hacerlas accesibles a los piratas informáticos. Obtener claves privadas de la nube es un vector de ataque común para los piratas informáticos.

### Usa una billetera de hardware {#use-hardware-wallet}

Una billetera de hardware proporciona almacenamiento sin conexión para las claves privadas. Se consideran la opción de billetera más segura para almacenar tus claves privadas: tu clave privada nunca toca Internet y permanece completamente local en tu dispositivo.

Mantener las claves privadas sin conexión reduce enormemente el riesgo de ser hackeado, incluso si un pirata informático toma el control de tu computadora.

#### Prueba una billetera de hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Verifica dos veces las transacciones antes de enviarlas {#double-check-transactions}

Enviar cripto accidentalmente a la dirección de billetera equivocada es un error común. **Una transacción enviada en Ethereum es irreversible.** A menos que conozcas al propietario de la dirección y puedas convencerlo de que te devuelva tus fondos, no podrás recuperarlos.

Asegúrate siempre de que la dirección a la que envías coincida exactamente con la dirección del destinatario deseado antes de enviar una transacción.
Es una buena práctica al interactuar con un contrato inteligente leer el mensaje de la transacción antes de firmar.

### Establece límites de gasto para los contratos inteligentes {#spend-limits}

Al interactuar con contratos inteligentes, no permitas límites de gasto ilimitados. Un gasto ilimitado podría permitir que el contrato inteligente vacíe tu billetera. En su lugar, establece límites de gasto solo por la cantidad necesaria para la transacción.

Muchas billeteras de Ethereum ofrecen protección de límites para salvaguardar las cuentas y evitar que sean vaciadas.

[Cómo revocar el acceso de los contratos inteligentes a tus fondos cripto](/guides/how-to-revoke-token-access/)

<Divider />

## Estafas comunes {#common-scams}

Es imposible detener a los estafadores por completo, pero podemos hacerlos menos efectivos si conocemos sus técnicas más utilizadas. Hay muchas variaciones de estas estafas, pero generalmente siguen los mismos patrones de alto nivel. Si no recuerdas nada más, ten en cuenta lo siguiente:

- sé siempre escéptico
- nadie te va a dar ETH gratis o con descuento
- nadie necesita acceso a tus claves privadas o información personal

### Phishing en anuncios de Twitter {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

Existe un método para falsificar la función de vista previa de enlaces de Twitter (también conocido como X) para engañar potencialmente a los usuarios haciéndoles creer que están visitando un sitio web legítimo. Esta técnica explota el mecanismo de Twitter para generar vistas previas de las URL compartidas en los tuits, y muestra _from ethereum.org_ por ejemplo (como se muestra arriba), cuando en realidad están siendo redirigidos a un sitio malicioso.

Comprueba siempre que estás en el dominio correcto, especialmente después de hacer clic en un enlace.

[Más información aquí](https://harrydenley.com/faking-twitter-unfurling).

### Estafa de sorteos {#giveaway}

Una de las estafas más comunes en las criptomonedas es la estafa de sorteos (giveaway). La estafa de sorteos puede tomar muchas formas, pero la idea general es que si envías ETH a la dirección de billetera proporcionada, recibirás tu ETH de vuelta pero duplicado. *Por esta razón, también se conoce como la estafa del 2 por 1.*

Estas estafas suelen estipular un tiempo limitado de oportunidad para reclamar el sorteo y así crear un falso sentido de urgencia.

### Hackeos de redes sociales {#social-media-hacks}

Una versión de alto perfil de esto ocurrió en julio de 2020, cuando las cuentas de Twitter de celebridades y organizaciones prominentes fueron hackeadas. El pirata informático publicó simultáneamente un sorteo de Bitcoin en las cuentas hackeadas. Aunque los tuits engañosos se notaron y eliminaron rápidamente, los piratas informáticos aún lograron salirse con la suya con 11 bitcoin (o $500,000 a partir de septiembre de 2021).

![A scam on Twitter](./appleTwitterScam.png)

### Sorteos de celebridades {#celebrity-giveaway}

El sorteo de celebridades es otra forma común que toma la estafa de sorteos. Los estafadores tomarán una entrevista en video grabada o una charla de conferencia dada por una celebridad y la transmitirán en vivo en YouTube, haciendo que parezca que la celebridad estaba dando una entrevista en video en vivo respaldando un sorteo de criptomonedas.

Vitalik Buterin se usa con mayor frecuencia en esta estafa, pero también se usan muchas otras personas prominentes involucradas en las cripto (por ejemplo, Elon Musk o Charles Hoskinson). Incluir a una persona conocida le da a la transmisión en vivo de los estafadores un sentido de legitimidad (¡esto parece sospechoso, pero Vitalik está involucrado, así que debe estar bien!).

**Los sorteos siempre son estafas. Si envías tus fondos a estas cuentas, los perderás para siempre.**

![A scam on YouTube](./youtubeScam.png)

### Estafas de soporte {#support-scams}

Las criptomonedas son una tecnología relativamente joven e incomprendida. Una estafa común que se aprovecha de esto es la estafa de soporte, donde los estafadores se hacen pasar por personal de soporte de billeteras, intercambios o cadenas de bloques populares.

Gran parte de la discusión sobre Ethereum ocurre en Discord. Los estafadores de soporte comúnmente encontrarán su objetivo buscando preguntas de soporte en canales públicos de Discord y luego enviando al solicitante un mensaje privado ofreciendo soporte. Al generar confianza, los estafadores de soporte intentan engañarte para que reveles tus claves privadas o envíes tus fondos a sus billeteras.

![A support scam on Discord](./discordScam.png)

Como regla general, el personal nunca se comunicará contigo a través de canales privados y no oficiales. Algunas cosas simples a tener en cuenta al tratar con el soporte:

- Nunca compartas tus claves privadas, frases semilla o contraseñas
- Nunca permitas que nadie tenga acceso remoto a tu computadora
- Nunca te comuniques fuera de los canales designados de una organización

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Cuidado: aunque las estafas de estilo de soporte ocurren comúnmente en Discord, también pueden prevalecer en cualquier aplicación de chat donde se discuta sobre cripto, incluido el correo electrónico.
</AlertDescription>
</AlertContent>
</Alert>

### Estafa del token 'Eth2' {#eth2-token-scam}

En el período previo a [La Fusión](/roadmap/merge/), los estafadores se aprovecharon de la confusión en torno al término 'Eth2' para intentar que los usuarios canjearan su ETH por un token 'ETH2'. No existe 'ETH2', y no se introdujo ningún otro token legítimo con La Fusión. El ETH que poseías antes de La Fusión es el mismo ETH ahora. **No hay necesidad de tomar ninguna medida relacionada con tu ETH para dar cuenta del cambio de prueba de trabajo (PoW) a prueba de participación (PoS)**.

Los estafadores pueden aparecer como "soporte", diciéndote que si depositas tu ETH, recibirás a cambio 'ETH2'. No hay [soporte oficial de Ethereum](/community/support/), y no hay ningún token nuevo. Nunca compartas la frase semilla de tu billetera con nadie.

_Nota: Existen tokens/símbolos derivados que pueden representar ETH en staking (es decir, rETH de Rocket Pool, stETH de Lido, ETH2 de Coinbase), pero no son algo a lo que necesites "migrar"._

### Estafas de phishing {#phishing-scams}

Las estafas de phishing son otro ángulo cada vez más común que los estafadores utilizarán para intentar robar los fondos de tu billetera.

Algunos correos electrónicos de phishing piden a los usuarios que hagan clic en enlaces que los redirigirán a sitios web de imitación, pidiéndoles que ingresen su frase semilla, restablezcan su contraseña o envíen ETH. Otros pueden pedirte que instales malware sin saberlo para infectar tu computadora y dar a los estafadores acceso a los archivos de tu computadora.

Si recibes un correo electrónico de un remitente desconocido, recuerda:

- Nunca abras un enlace o archivo adjunto de direcciones de correo electrónico que no reconozcas
- Nunca divulgues tu información personal o contraseñas a nadie
- Elimina los correos electrónicos de remitentes desconocidos

[Más sobre cómo evitar estafas de phishing](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Estafas de corredores de comercio de cripto {#broker-scams}

Los corredores de comercio de cripto fraudulentos afirman ser corredores de criptomonedas especialistas que ofrecerán tomar tu dinero e invertir en tu nombre. Después de que el estafador recibe tus fondos, puede engañarte, pidiéndote que envíes más fondos para que no te pierdas más ganancias de inversión, o puede desaparecer por completo.

Estos estafadores a menudo encuentran objetivos utilizando cuentas falsas en YouTube para iniciar conversaciones aparentemente naturales sobre el 'corredor'. Estas conversaciones a menudo reciben muchos votos positivos para aumentar la legitimidad, pero los votos positivos provienen todos de cuentas de bots.

**No confíes en extraños de Internet para que inviertan en tu nombre. Perderás tus cripto.**

![A trading broker scam on YouTube](./brokerScam.png)

### Estafas de grupos de minería de cripto {#mining-pool-scams}

A partir de septiembre de 2022, la minería en Ethereum ya no es posible. Sin embargo, las estafas de grupos de minería aún existen. Las estafas de grupos de minería involucran a personas que te contactan sin que lo solicites y afirman que puedes obtener grandes ganancias al unirte a un grupo de minería de Ethereum. El estafador hará afirmaciones y se mantendrá en contacto contigo durante el tiempo que sea necesario. Esencialmente, el estafador intentará convencerte de que cuando te unas a un grupo de minería de Ethereum, tu criptomoneda se utilizará para crear ETH y que se te pagarán dividendos en ETH. Luego verás que tu criptomoneda está obteniendo pequeños rendimientos. Esto es simplemente para atraerte a invertir más. Eventualmente, todos tus fondos se enviarán a una dirección desconocida, y el estafador desaparecerá o, en algunos casos, continuará en contacto como ha sucedido en un caso reciente.

En conclusión: desconfía de las personas que te contactan en las redes sociales pidiéndote que formes parte de un grupo de minería. Una vez que pierdes tus cripto, desaparecen para siempre.

Algunas cosas para recordar:

- Desconfía de cualquiera que te contacte sobre formas de ganar dinero con tus cripto
- Investiga sobre el staking, los fondos de liquidez u otras formas de invertir tus cripto
- Rara vez, o nunca, tales esquemas son legítimos. Si lo fueran, probablemente serían populares y habrías oído hablar de ellos.

[Un hombre pierde $200,000 en una estafa de grupo de minería](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Estafas de airdrop {#airdrop-scams}

Las estafas de airdrop involucran un proyecto fraudulento que realiza un airdrop de un activo (NFT, token) en tu billetera y te envía a un sitio web fraudulento para reclamar el activo del airdrop. Se te pedirá que inicies sesión con tu billetera de Ethereum y que "apruebes" una transacción al intentar realizar el reclamo. Esta transacción compromete tu cuenta al enviar tus claves públicas y privadas al estafador. Una forma alternativa de esta estafa puede hacer que confirmes una transacción que envía fondos a la cuenta del estafador.

[Más sobre estafas de airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Conceptos básicos de seguridad web {#web-security}

### Usa contraseñas seguras {#use-strong-passwords}

[Más del 80% de los hackeos de cuentas son el resultado de contraseñas débiles o robadas](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Una combinación larga de caracteres, números y símbolos ayudará a mantener tus cuentas seguras.

Un error común es usar una combinación de unas pocas palabras comunes y relacionadas. Las contraseñas como esta son inseguras porque son propensas a una técnica de hackeo llamada ataque de diccionario.

```md
Ejemplo de una contraseña débil: LindosGatitosEsponjosos!

Ejemplo de una contraseña segura: ymv\*azu.EAC8eyp8umf
```

Otro error común es usar contraseñas que se pueden adivinar o descubrir fácilmente a través de la [ingeniería social](<https://wikipedia.org/wiki/Social_engineering_(security)>). Incluir el apellido de soltera de tu madre, los nombres de tus hijos o mascotas, o las fechas de nacimiento en tu contraseña aumentará el riesgo de ser hackeado.

#### Buenas prácticas para contraseñas: {#good-password-practices}

- Haz que las contraseñas sean tan largas como lo permita tu generador de contraseñas o el formulario que estás completando
- Usa una mezcla de letras mayúsculas, minúsculas, números y símbolos
- No uses detalles personales, como apellidos, en tu contraseña
- Evita las palabras comunes

[Más sobre cómo crear contraseñas seguras](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Usa contraseñas únicas para todo {#use-unique-passwords}

Una contraseña segura que ha sido revelada en una violación de datos ya no es una contraseña segura. El sitio web [Have I Been Pwned](https://haveibeenpwned.com) te permite verificar si tus cuentas estuvieron involucradas en alguna violación de datos pública. Si es así, **cambia esas contraseñas de inmediato**. Usar contraseñas únicas para cada cuenta reduce el riesgo de que los piratas informáticos obtengan acceso a todas tus cuentas si una de tus contraseñas se ve comprometida.

### Usa un administrador de contraseñas {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    ¡Usar un administrador de contraseñas se encarga de crear contraseñas seguras y únicas y de recordarlas! Recomendamos <strong>encarecidamente</strong> usar uno, ¡y la mayoría de ellos son gratuitos!
</AlertDescription>
</AlertContent>
</Alert>

Recordar contraseñas seguras y únicas para cada cuenta que tienes no es lo ideal. Un administrador de contraseñas ofrece un almacenamiento seguro y encriptado para todas tus contraseñas al que puedes acceder a través de una contraseña maestra segura. También sugieren contraseñas seguras al registrarse en un nuevo servicio, por lo que no tienes que crear las tuyas propias. Muchos administradores de contraseñas también te dirán si has estado involucrado en una violación de datos, lo que te permite cambiar las contraseñas antes de cualquier ataque malicioso.

![Example of using a password manager](./passwordManager.png)

#### Prueba un administrador de contraseñas: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- O echa un vistazo a otros [administradores de contraseñas recomendados](https://www.privacytools.io/secure-password-manager)

### Usa la autenticación de dos factores {#two-factor-authentication}

A veces se te puede pedir que autentiques tu identidad a través de pruebas únicas. Estas se conocen como **factores**. Los tres factores principales son:

- Algo que sabes (como una contraseña o pregunta de seguridad)
- Algo que eres (como una huella dactilar o un escáner de iris/facial)
- Algo que posees (una clave de seguridad o una aplicación de autenticación en tu teléfono)

El uso de la **autenticación de dos factores (2FA)** proporciona un *factor de seguridad* adicional para tus cuentas en línea. La 2FA garantiza que el simple hecho de tener tu contraseña no sea suficiente para acceder a una cuenta. Por lo general, el segundo factor es un código aleatorio de 6 dígitos, conocido como **contraseña de un solo uso basada en el tiempo (TOTP)**, al que puedes acceder a través de una aplicación de autenticación como Google Authenticator o Authy. Estos funcionan como un factor de "algo que posees" porque la semilla que genera el código cronometrado se almacena en tu dispositivo.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Nota: El uso de 2FA basado en SMS es susceptible al <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">secuestro de SIM (SIM jacking)</a> y no es seguro. Para obtener la mejor seguridad, usa un servicio como <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> o <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Claves de seguridad {#security-keys}

Una clave de seguridad es un tipo de 2FA más avanzado y seguro. Las claves de seguridad son dispositivos físicos de autenticación de hardware que funcionan como aplicaciones de autenticación. Usar una clave de seguridad es la forma más segura de usar 2FA. Muchas de estas claves utilizan el estándar FIDO Universal 2nd Factor (U2F). [Obtén más información sobre FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Mira más sobre 2FA:

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### Desinstala las extensiones del navegador {#uninstall-browser-extensions}

Las extensiones del navegador, como las extensiones de Chrome o los complementos para Firefox, pueden mejorar la funcionalidad del navegador, pero también conllevan riesgos. De forma predeterminada, la mayoría de las extensiones del navegador solicitan acceso para 'leer y cambiar los datos del sitio', lo que les permite hacer casi cualquier cosa con tus datos. Las extensiones de Chrome siempre se actualizan automáticamente, por lo que una extensión previamente segura puede actualizarse más tarde para incluir código malicioso. La mayoría de las extensiones del navegador no intentan robar tus datos, pero debes tener en cuenta que pueden hacerlo.

#### Mantente seguro al: {#browser-extension-safety}

- Instalar solo extensiones de navegador de fuentes confiables
- Eliminar las extensiones de navegador que no utilices
- Instalar las extensiones de Chrome localmente para detener la actualización automática (Avanzado)

[Más sobre los riesgos de las extensiones del navegador](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Lecturas adicionales {#further-reading}

### Seguridad web {#reading-web-security}

- [Hasta 3 millones de dispositivos infectados por complementos de Chrome y Edge con malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Cómo crear una contraseña segura (que no olvidarás)](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [¿Qué es una clave de seguridad?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Seguridad cripto {#reading-crypto-security}

- [Cómo protegerte a ti mismo y a tus fondos](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Problemas de seguridad en el software de comunicación cripto común](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Guía de seguridad para principiantes y personas inteligentes también](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Seguridad cripto: contraseñas y autenticación](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Educación sobre estafas {#reading-scam-education}

- [Guía: Cómo identificar tokens fraudulentos](/guides/how-to-id-scam-tokens/)
- [Mantenerse seguro: estafas comunes](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Cómo evitar estafas](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Hilo de Twitter sobre correos electrónicos y mensajes de phishing cripto comunes](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />