---
title: Fui estafado o perdí fondos
metaTitle: Ayuda y denuncias de estafas
description: Qué hacer si ha sido estafado, cómo asegurar sus activos restantes y dónde denunciar el fraude.
lang: es
---

Las estafas con criptomonedas se dirigen a personas de todos los niveles de experiencia, incluidos profesionales en finanzas y tecnología. No está solo, y estar aquí es el primer paso correcto.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Nadie puede revertir las transacciones de la cadena de bloques.** Si alguien se comunica con usted afirmando que puede recuperar sus fondos a cambio de una tarifa, es casi seguro que se trate de una segunda estafa. Consulte las [estafas de recuperación](#scam-types) a continuación.

</AlertDescription>
</AlertContent>
</Alert>

## Asegure sus activos restantes {#secure-assets}

Si interactuó con un estafador o sospecha que su billetera está comprometida, siga estos pasos de inmediato:

1. **Mueva los fondos restantes** a una nueva billetera segura a la que el estafador no tenga acceso
2. **Revoque las aprobaciones de tokens.** Los estafadores a menudo lo engañan para que apruebe el gasto ilimitado de tokens. Revocar estos permisos evita que sigan vaciando su billetera
3. **Cambie las contraseñas** de cualquier cuenta de intercambio que pueda estar vinculada
4. **Habilite la autenticación de dos factores (2FA)** en todas las cuentas relacionadas con las cripto

### Cómo revocar las aprobaciones de tokens {#revoke-approvals}

Cuando interactúa con una aplicación descentralizada (dapp) o un contrato inteligente, es posible que le haya otorgado permiso para gastar sus tokens. Si un estafador lo engañó para que aprobara un contrato malicioso, puede continuar vaciando sus tokens incluso después de la estafa inicial.

Use estas herramientas para verificar y revocar aprobaciones:

- [Revoke.cash](https://revoke.cash/): conecte su billetera para ver todas las aprobaciones activas y revocarlas
- [Revokescout](https://revoke.blockscout.com/): verifique y revoque aprobaciones a través de Blockscout
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): verifique y revoque aprobaciones a través de Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Guía paso a paso: Cómo revocar el acceso a los tokens
</DocLink>

## Denuncie direcciones y sitios web fraudulentos {#report}

Denunciar ayuda a advertir a otros usuarios y puede ayudar en las investigaciones policiales. Documente todo: hashes de transacción, direcciones de billeteras, capturas de pantalla y cualquier comunicación con el estafador.

### Denuncie una dirección fraudulenta {#report-address}

- [Chainabuse](https://www.chainabuse.com/): base de datos de denuncias de estafas y fraudes impulsada por la comunidad. Envíe denuncias y busque direcciones fraudulentas conocidas
- [Denuncia en Etherscan](https://info.etherscan.com/report-address/): marque una dirección en el explorador de bloques de Ethereum más utilizado
- [CryptoScamDB](https://cryptoscamdb.org/): base de datos de código abierto que rastrea estafas con criptomonedas

### Denuncie un sitio web o cuenta de redes sociales fraudulenta {#report-website}

- [PhishTank](https://phishtank.org/): envíe y verifique URL de phishing
- [Navegación segura de Google](https://safebrowsing.google.com/safebrowsing/report_phish/): denuncie sitios de phishing a Google para que se bloqueen en Chrome y otros navegadores
- [Netcraft](https://report.netcraft.com/report/mistake): denuncie sitios web maliciosos y fraudulentos
- Denuncie directamente en la plataforma de redes sociales donde ocurrió la estafa (Twitter/X, Discord y Telegram tienen funciones de denuncia)

### Denuncie a las autoridades policiales {#report-law-enforcement}

- **Estados Unidos:** [Centro de Denuncias de Delitos en Internet del FBI (IC3)](https://www.ic3.gov/)
- **Reino Unido:** [Action Fraud](https://www.actionfraud.police.uk/)
- **Unión Europea:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Otros países:** presente una denuncia ante su policía local. El fraude con criptomonedas es un delito en la mayoría de las jurisdicciones

## Analice lo que sucedió {#analyze}

Comprender a dónde fueron sus fondos puede ayudar con las denuncias y puede respaldar los esfuerzos de recuperación si los fondos llegan a un intercambio centralizado.

- [Blockscout](https://eth.blockscout.com/): explorador de bloques de código abierto para buscar cualquier hash de transacción o dirección de billetera para ver a dónde se enviaron los fondos
- [Etherscan](https://etherscan.io/): busque cualquier hash de transacción o dirección de billetera para ver a dónde se enviaron los fondos
- [Búsqueda en Chainabuse](https://www.chainabuse.com/): verifique si una dirección ya ha sido denunciada por otras víctimas
- [MetaSleuth](https://metasleuth.io/) de BlockSec: herramienta visual de seguimiento de transacciones que mapea los flujos de fondos

**Si los fondos se enviaron a un intercambio centralizado** (como Coinbase, Binance, Kraken), comuníquese con su equipo de soporte de inmediato con los detalles de la transacción. Los intercambios a veces pueden congelar las cuentas marcadas por fraude.

## La dura realidad {#hard-truth}

Debido a que Ethereum es descentralizado, ninguna autoridad central puede revertir las transacciones o recuperar los fondos robados. Una vez que una transacción se confirma en la cadena de bloques, es definitiva.

Denunciar sigue siendo valioso. Las denuncias ayudan a las autoridades policiales a rastrear redes de fraude organizado, y marcar direcciones en Chainabuse y Etherscan advierte a futuras víctimas potenciales.

## Tipos de estafas a las que debe prestar atención {#scam-types}

<ExpandableCard
title="Giveaway and airdrop scams"
contentPreview="No one is giving away free ETH. These offers are always scams."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

Los estafadores crean sorteos falsos prometiendo multiplicar sus ETH o darle tokens gratis. A menudo se hacen pasar por figuras conocidas como Vitalik Buterin. Si envía ETH a una dirección de "sorteo", no recibirá nada a cambio.

**Recuerde:** Vitalik y otras figuras prominentes nunca le pedirán que les envíe ETH.

[Más sobre estafas comunes](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Impersonation and fake support"
contentPreview="No one from Ethereum or ethereum.org will ever contact you first."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

Los estafadores se hacen pasar por miembros del equipo de Ethereum, moderadores o agentes de soporte en Discord, Telegram y redes sociales. Pueden enviarle mensajes directos ofreciendo ayuda o afirmando que hay un problema con su cuenta.

**Recuerde:**

- No existe un "equipo de soporte de Ethereum"
- Los moderadores reales nunca le enviarán un mensaje directo primero
- Nunca comparta su frase semilla o claves privadas con nadie, por ningún motivo
- Nunca haga clic en enlaces enviados en mensajes no solicitados

</ExpandableCard>

<ExpandableCard
title="Recovery scams"
contentPreview="After being scammed, watch out for fake 'crypto recovery experts.'"
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

Las estafas de recuperación se dirigen específicamente a personas que ya han perdido fondos. Los estafadores monitorean las redes sociales en busca de personas que hablan sobre haber sido estafadas, y luego se comunican haciéndose pasar por "investigadores de la cadena de bloques" o "expertos en recuperación de cripto".

Prometen rastrear y recuperar sus cripto robadas a cambio de una tarifa por adelantado. Después de que usted paga, desaparecen.

**Ningún servicio legítimo puede revertir las transacciones de la cadena de bloques.** Cualquiera que prometa esto está mintiendo. Esta es una de las estafas de seguimiento más comunes.

</ExpandableCard>

<ExpandableCard
title="Phishing websites and fake apps"
contentPreview="Scam sites mimic real wallets and exchanges to steal your credentials."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

Los sitios de phishing se ven idénticos a las aplicaciones de billetera, intercambios o plataformas de finanzas descentralizadas (DeFi) reales. Lo engañan para que ingrese su frase semilla o conecte su billetera, y luego vacían sus fondos.

**Protéjase:**

- Siempre verifique la URL antes de conectar su billetera
- Agregue a marcadores los sitios oficiales que usa regularmente
- Nunca ingrese su frase semilla en ningún sitio web. Las aplicaciones legítimas nunca la piden
- Use [PhishTank](https://phishtank.org/) para verificar URL sospechosas

<DocLink href="/guides/how-to-id-scam-tokens/">
  Cómo identificar tokens fraudulentos
</DocLink>

</ExpandableCard>

<DocLink href="/security/">
  Guía completa sobre seguridad en Ethereum y prevención de estafas
</DocLink>