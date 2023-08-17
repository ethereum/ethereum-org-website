---
title: Propostes de millora d'Ethereum (EIP per les seves sigles en anglès)
description: Conceptes bàsics que necessites per entendre les Propostes de Millora d'Ethereum (EIP).
lang: ca
---

# Introducció a les Propostes de Millora d'Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals-eips}

## Què són les EIP? {#what-are-eips}

[Les Propostes de Millora d'Ethereum (EIP](https://eips.ethereum.org/) són estàndards que especifiquen noves característiques o processos potencials per Ethereum. Les EIP contenen especificacions tècniques per als canvis proposats i actuen com a "font de la veritat" per a la comunitat. Les millores de la xarxa i els estàndards d'aplicació per a Ethereum són discutits i desenvolupats a través del procés EIP.

Qualsevol dins la comunitat Ethereum té la capacitat de crear una EIP. [EIP 1](https://eips.ethereum.org/EIPS/eip-1) Inclou exemples de com escriure les EIP. L'EIP hauria de proveir una especificació tècnica concisa de la característica de la seva racionalitat. L'autor de l'EIP és responsable d'edificar consens entre la comunitat i documentar les opinions contràries. Donat l'alt barem tècnic per presentar una EIP ben formada, històricament, la majoria dels autors d'EIP han estat desenvolupadors d'aplicacions o protocol.

## Per què són importants les EIP? {#why-do-eips-matter}

Les EIP juguen un paper central en com succeeixen i són documentats els canvis a Ethereum. Són el mitjà perquè la gent proposi, debati i adopti canvis. Hi ha [diferents tipus d'EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types) inclòs EIP bàsiques per a canvis de protocol de baix nivell que afecten el consens i requereixen una millora de la xarxa també així com l'ERC per estàndards d'aplicacions. Per exemple, els estàndards per crear tokens, com l' [ERC20](https://eips.ethereum.org/EIPS/eip-20) o l'[ERC721](https://eips.ethereum.org/EIPS/eip-721) permet a les aplicacions la interacció d'aquests tokens amb la resta de tokens de tracte utilitzant les mateixes normes, cosa que fa més fàcil crear aplicacions interoperables.

Cada millora de xarxa consisteix en un conjunt d'EIP que necessiten ser implementades per cada [client Ethereum](/learn/#clients-and-nodes) a la xarxa. Això implica que per mantenir-se en consens amb altres clients de la xarxa Principal d'Ethereum, els desenvolupadors de clients necessiten estar segurs que han implementat totes les EIP requerides.

A més de proveir especificacions tècniques per als canvis, les EIP són les unitats sobre les quals succeeix la governança a Ethereum: qualsevol pot proposar una i llavors diversos tenidors a la comunitat discutiran determinar si s'hauria d'adoptar com a estàndard o incloure-la en una millora de xarxa. Donat que les EIP que no són bàsiques no han de ser adoptades per totes les aplicacions (per exemple, pots crear un no-[token ERC20](https://eips.ethereum.org/EIPS/eip-20)), però les EIP bàsiques han de ser àmpliament adoptades (ja que tots els nodes han d'actualitzar-se per formar part de la mateixa xarxa), les EIP bàsiques requereixen un consens més ampli dins la comunitat que no pas les EIP que no ho són.

## Història de les EIP {#history-of-eips}

El [repositori GitHub de Propostes de Millora d'Ethereum (EIP, per les seves sigles en anglès)](https://github.com/ethereum/EIPs) fou creat l'octubre de 2015. El procés de l'EIP està basat en el procés de [Propostes de Millora de Bitcoin (BIP, per les seves sigles en anglès)](https://github.com/bitcoin/bips), que està basat en sí mateix en el procés de [Propostes de Millora de Python (PEP, per les seves sigles en anglès)](https://www.python.org/dev/peps/).

Els editors d'EIP se'ls encomana el procés de revisió de les EIP per obtenir solidesa tècnica, ortografia i gramàtica correctes i estil de codificació. Martin Becze, Vitalik Buterin, Gavin Wood i d'altres van ser els editors originals d'EIP des del 2015 a finals de 2016. Els editors d'EIP actuals són:

- Alex Beregszaszi (EWASM/Fundació Ethereum)
- Greg Colvin (Comunitat)
- Casey Detrio (EWASM/Fundació Ethereum)
- Matt Garnett (Superposició de capes o Quilt, en anglès)
- Hudson James (Fundació Ethereum)
- Nick Johnson (Servei de Nom d'Ethereum o ENS, per les seves sigles en anglès)
- Nick Savers (Comunitat)
- Micah Zoltu (Comunitat)

Els editors d'EIP junt amb els membres de la comunitat d'[Ethereum Cat Herders](https://ethereumcatherders.com/) i [Ethereum Magicians](https://ethereum-magicians.org/) decideixen quina EIP s'ha d'implementar, són responsables de la facilitació de les EIP així com de passar les EIP a l'estat "Final" o "Retirada".

[EIP-1](https://eips.ethereum.org/EIPS/eip-1) descriu el procés complet d'estandardització acompanyat d'un gràfic

## Saber-ne més {#learn-more}

Si estàs interessat a llegir més coses a referència a les EIP, dona una ullada al [lloc web de les EIP](https://eips.ethereum.org/) on trobaràs informació addicional, inclòs:

- [Els diferents tipus d'EIP](https://eips.ethereum.org/)
- [Un llistat de cada EIP que ha estat creada](https://eips.ethereum.org/all)
- [Estatus de les EIP i què signifiquen](https://eips.ethereum.org/)

## Participa {#participate}

Qualsevol pot crear una EIP o ERC encara que hauries de llegir [EIP-1](https://eips.ethereum.org/EIPS/eip-1) que remarca el procés de la EIP, què és una EIP, tipus d'EIP, què ha de contenir un document EIP, formats i plantilles EIP, llistes d'Editors EIP i tot el què has de saber sobre les EIP abans de crear-ne una. El teu nou EIP hauria de definir una funció nova que no sigui realment complexa però que no sigui super nínxol i que pugui ser utilitzada per projectes de l'ecosistema Ethereum. La part més difícil és la facilitació. Tu, com a autor, has de facilitar a la gent que t'envolta la teva EIP, recollir comentaris, escriure articles descrivint problemes que soluciona la teva EIP i col·laborar amb projectes per a implementar la teva EIP.

Si estàs interessat a seguir el procés de discussió o compartir les teves entrades sobre les EIP, dona un cop d'ull al [fòrum dels Mags d'Ethereum](https://ethereum-magicians.org/) on es discuteixen les EIP amb la comunitat.

Mira també:

- [Com crear una EIP](https://eips.ethereum.org/EIPS/eip-1)

## Referències {#references}

<cite class="citation">

Contingut de pàgina aportat en part per [Governança del Desenvolupament del Protocol d'Ethereum i Coordinació de Millora de Xarxa](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) per Hudson Jameson

</cite>
