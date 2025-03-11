---
title: Seguretat i prevenció d'estafes a Ethereum
description: Anar amb compte a Ethereum
lang: ca
---

# Seguretat i prevenció d'estafes a Ethereum {#introduction}

A mesura que creix l'interès en les criptomonedes, és essencial aprendre les millors pràctiques que cal seguir a l'utilitzar-les. Les criptomonedes poden ser divertides i emocionants, però també comporten riscs seriosos. Si feu aquesta mica de treball per endavant, podeu mitigar els riscs.

<Divider />

## Seguretat web 101 {#web-security}

### Utilitzeu contrasenyes segures {#use-strong-passwords}

[Més del 80% dels atacs de pirateig de comptes són resultat de contrasenyes poc segures o robades](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Una combinació llarga de caràcters, nombres i símbols és el millor per mantenir protegit el vostre compte.

Un error comú que fan algunes persones és utilitzar una combinació de dues o tres paraules de diccionari habituals i relacionades. Aquest tipus de contrasenyes no són segures perquè són propenses a una tècnica de pirateig senzilla coneguda com a [atac de diccionari](https://wikipedia.org/wiki/Dictionary_attack).

```md
Exemple de contrasenya feble: GatetPetitBufó!

Exemple de contrasenya forta: ymv\*azu.EAC8eyp8umf
```

Un altre error comú és utilitzar contrasenyes que puguin ser endevinades fàcilment o esbrinades mitjançant [enginyeria social](<https://wikipedia.org/wiki/Social_engineering_(security)>). El nom de soltera de la mare, els noms dels fills o d'animals de companyia o les dates de naixement en la contrasenya no són segurs i incrementaran el risc que la vostra contrasenya sigui piratejada.

#### Pràctiques per a crear una bona contrasenya: {#good-password-practices}

- Feu contrasenys tan llargues com us ho permeti el vostre generador de contrasenyes o el formulari que estigueu emplenant
- Mescleu majúscules, minúscules, nombres i símbols
- No utilitzeu detalls personals, com ara noms de família, en la vostra contrasenya
- Eviteu paraules comunes del diccionari

[Més informació sobre com crear contrasenyes fortes](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Utilitzeu contrasenyes úniques per tot {#use-unique-passwords}

Una contrasenya forta no aporta molta més protecció si la contrasenya es revela en una violació de dades. El lloc web [Have I Been Pwned](https://haveibeenpwned.com) us permet comprovar si els vostres comptes han estat involucrats en cap violació de dades emmagatzemades en les seves bases de dades. Si ho han estat, **hauríeu de canviar les contrasenyes afectades immediatament**. Utilitzar contrasenyes úniques per a cada compte disminueix el risc que els pirates obtinguin accés a tots els vostres comptes quan una de les vostres contrasenyes s'hagi vist compromesa.

### Utilitzeu un gestor de contrasenyes {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Un gestor de contrasenyes s'encarrega de crear contrasenyes úniques i fortes i se'n recordar d'elles! <strong>Recomanem</strong> encaridament utilitzar-ne un i la majoria són gratuïts!
  </div>
</InfoBanner>

Recordar contrasenyes úniques i fortes per a cada compte que tingueu no és ideal. Un gestor de contrasenyes ofereix un emmagatzematge segur i encriptat per a totes les contrasenyes, a les quals podeu accedir amb una contrasenya mestra. També suggereixen una contrasenya forta quan us inscriviu a un nou servei, per tal que no hàgiu de crear-ne una. Molts gestors de contrasenyes també us diran si heu patit alguna violació de dades, la qual cosa us permetrà canviar les vostres contrasenyes abans de qualsevol atac maliciós.

![Exemples de la utilització d'un gestor de contrasenyes](./passwordManager.png)

#### Proveu un gestor de contrasenyes: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [LastPass](https://www.lastpass.com/)
- [1Password](https://1password.com/)

### Utilitzeu l'autentificació en dos factors {#two-factor-authentication}

Per provar que sou vosaltres, hi ha proves úniques que poden utilitzar-se per a l'autenticació. Es coneixen com a **factors** i els tres factors principals són:

- Alguna cosa que només sabeu vosaltres (com ara una contrasenya o una pregunta de seguretat)
- Alguna cosa que sigui només vostra (com ara una empremta dactilar o un escàner d'iris/facial)
- Alguna cosa que us pertanyi (una clau de seguretat o una aplicació d'autenticació en el vostre mòbil)

La utilització de l'**autenticació de dos factors (2FA, per les seves sigles en anglès)** aporta un _factor de seguretat_ adicional per als vostres comptes en línia perquè només conèixer la vostra contrasenya (alguna cosa que només vosaltres sabeu) no sigui suficient per accedir al vostre compte. En la majoria dels casos, el segon factor és un codi de sis dígits aleatori, conegut com a **contrasenya temporal d'un sol ús (TOTP, per les seves sigles en anglès)**, la qual podeu obtenir mitjançant una aplicació d'autentificació com ara Google Authenticator o Authy. Funciona com a factor d'«alguna cosa que només vosaltres coneixeu», ja que la llavor que genera el codi temporal està emmagatzemada en el vostre dispositiu.

<InfoBanner emoji=":lock:">
  <div>
    Nota: L'ús d'un 2FA basat en SMS és susceptible de
<a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
pirateig de la tarjeta SIM
</a>
i no és segur. Per una millor seguretat, utilitzeu un servei com ara{" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Authenticator
    </a>
     o <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Claus de seguretat {#security-keys}

Per aquells que vulgueu continuar amb la 2FA, considereu utilitzar una clau de seguretat. Les claus de seguretat són dispositius físics d'autenticació que funcionen de la mateixa manera que les aplicacions d'autenticació. Utilitzar una clau de seguretat és la forma més segura per a una 2FA. Moltes d'aquestes claus utilitzen l'estàndard FIDO Universal 2nd Factor (U2F). [Més informació sobre l'estàndard FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Mireu aquest vídeo amb més informació sobre la 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Desinstal·leu les extensions del navegador {#uninstall-browser-extensions}

Les extensions del navegador com les extensions de Chrome o els complements de Firefox poden augmentar la funcionalitat útil del navegador i millorar l'experiència de l'usuari, però venen amb riscs. Per defecte, moltes de les extensions del navegador demanen permisos de «lectura i canvi en les dades del lloc web», la qual cosa els permet fer gairebé de tot amb les vostres dades. Les extensions de Chrome s'actualitzen sempre automàticament; per tant, una extensió que anteriorment era segura podria actualitzar-se més tard per incloure codi maliciós. Moltes extensions del navegador no intenten robar les vostres dades, però hauríeu d'estar al corrent que ho poden fer.

#### Aneu amb compte seguint els següents passos: {#browser-extension-safety}

- Instal·leu només extensions de navegador de fonts de confiança
- Desfeu-vos d'extensions de navegador que no utilitzeu
- Instal·leu extensions de Chrome en emmagatzematge local per evitar l'actualització automàtica (Opcions avançades)

[Més informació sobre els riscs de les extensions del navegador](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Criptoseguretat 101 {#crypto-security}

### Amplieu els vostres coneixements {#level-up-your-knowledge}

Una de les majors causes perquè la gent sigui estafada en criptomonedes és generalment per una manca de comprensió. Per exemple, si no enteneu que la xarxa d'Ethereum és descentralitzada i que no pertany a ningú, llavors és fàcil caure en les urpes d'algú que pretén ser un agent de servei al client que us promet retornar-vos les vostres pèrdues en ETH a canvi de les vostres claus privades. Educar-vos sobre el funcionament d'Ethereum és una inversió que paga la pena.

<DocLink href="/what-is-ethereum/">
  Què és Ethereum?
</DocLink>

<DocLink href="/eth/">
  Què és l'ether?
</DocLink>
<Divider />

## Protecció de la cartera {#wallet-security}

### No doneu les vostres claus privades {#protect-private-keys}

**Mai, de cap manera, compartiu les vostres claus privades!**

La clau privada de la vostra cartera actua com a contrasenya per a la vostra cartera Ethereum. És l'únic que pot evitar que algú que coneix la vostra adreça de cartera buidi tots els actius del vostre compte!

<DocLink href="/wallets/">
  Què és una cartera d'Ethereum?
</DocLink>

#### No feu captures de pantalla de les vostres frases llavor/claus privades {#screenshot-private-keys}

Si feu una captura de pantalla de les vostres frases llavor o claus privades, us arrisqueu a sincronitzar-les amb el núvol i fer-les potencialment accessibles als pirates. Obtenir les claus privades del núvol és un vector comú d'atac dels pirates.

### Utilitzeu una cartera de maquinari {#use-hardware-wallet}

Una cartera de maquinari disposa d'emmagatzematge fora de línia per a claus privades. Es consideren l'opció de cartera més segura per emmagatzemar les vostres claus privades.

Mantenir les claus privades fora de línia redueix massivament el risc de ser piratejat, fins i tot si el pirata pren control del vostre ordinador.

#### Proveu una cartera de maquinari: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Comproveu dues vegades les transaccions abans d'enviar-les {#double-check-transactions}

És un error comú enviar criptomonedes accidentalment a una adreça de cartera incorrecta. **En Ethereum les transaccions enviades són irreversibles.** Tret que coneixeu el propietari de l'adreça i el pugueu convèncer de retornar-vos els fons, no hi ha cap altra manera de recuperar-los.

Assegureu-vos sempre que l'adreça a la qual esteu enviant concorda exactament amb l'adreça exacta del destinatari abans d'enviar una transacció. També és recomanable, quan interactueu amb un contracte intel·ligent, llegir el missatge de la transacció abans de signar.

### Poseu límits de despesa als contractes intel·ligents {#spend-limits}

Quan interactueu amb contractes intel·ligents, no permeteu límits de despesa il·limitats. Una despesa il·limitada podria capacitar un contracte intel·ligent per buidar la vostra cartera. En lloc d'això, poseu límits de despesa només a la quantitat necessària per a la transacció.

Algunes carteres d'Ethereum ofereixen protecció de límits per a salvaguardar els comptes contra el seu buidatge.

<Divider />

## Estafes habituals {#common-scams}

Els estafadors sempre estan buscant una via o una altra per treure-vos els fons. És impossible aturar els estafadors completament, però podem fer que siguin menys efectius estant al corrent de la majoria de les tècniques utilitzades. Hi ha moltes variacions d'aquestes estafes, però en general segueixen els mateixos patrons d'alt nivell. Si més no, recordeu:

- sigueu sempre escèptics
- ningú us donarà ETH de franc o amb descomptes!
- ningú necessita accés a les vostres claus privades o a la vostra informació personal

### Estafa del regal {#giveaway}

Una de les estafes més comunes en criptomoneda és l'estafa del regal. L'estafa del regal pot prendre diverses formes, però la premissa general és que si envieu ETH a l'adreça de cartera que us han donat, rebreu el doble dels ETH que heu enviat. *Per aquesta raó, també és coneguda com l'estafa 2 per 1.*

Aquestes estafes sovint estipulen un temps limitat d'oportunitat de reclamar el regal per encoratjar la presa de decisions a la lleugera i crear una sensació de falsa urgència.

#### Pirateig de les xarxes socials {#social-media-hacks}

Una versió de gran impacte d'aquest pirateig va ocórrer el juliol de 2020, quan els comptes de Twitter de personatges famosos molt coneguts i d'organitzacions van ser piratejades. El pirata va publicar simultàniament un sorteig de Bitcoins en els comptes piratejats. Encara que les piulades enganyoses van ser ràpidament notificades i esborrades, els pirates encara s'ho van manegar per endur-se 11 bitcoins (o 500.000 dòlars el setembre de 2021)

![Una estafa al Twitter](./appleTwitterScam.png)

#### Sorteig d'una celebritat {#celebrity-giveaway}

El sorteig d'una celebritat és una altra de les formes habituals que adopta l'estafa del regal. Els estafadors agafaran una entrevista gravada en vídeo o una xerrada d'una celebritat i l'emetran en directe a YouTube, fent com si aquesta celebritat estigués fent una entrevista en directe avalant un sorteig de criptomonedes.

Vitalik Buterin és molt utilitzat en aquest tipus d'estafa, però també hi són moltes altres persones prominents involucrades en criptomonedes (p. ex. Elon Musk o Charles Hoskinson). Incloure a una persona reconeguda aporta a les emissions en directe dels estafadors una sensació de legitimitat (sembla incomplet, però Vitalik Buterin hi està involucrat, així doncs ha d'estar bé!).

**Els sortejos són sempre estafes. Si envieu els vostres fons a aquests comptes, els perdreu per sempre.**

![Una estafa al YouTube](./youtubeScam.png)

### Estafes de suport {#support-scams}

La criptomoneda és una tecnologia relativament jove i malentesa. Una estafa comuna que s'aprofita d'això és l'estafa de suport, on els estafadors suplantaran suport personal per a carteres, cases d'intercanvi o cadenes de blocs populars.

La majoria de les discussions sobre Ethereum ocorren al Discord. Els estafadors de suport buscaran generalment el seu objectiu cercant preguntes de suport als canals públics de discord i enviant a qui fa la pregunta un missatge privat oferint-li suport. Creant confiança, els estafadors de suport intenten que reveleu les vostres claus privades o que envieu els vostres fons a les seves carteres.

![Una estafa de suport al Discord](./discordScam.png)

Com a norma general, el personal no es comunicarà mai a través de canals privats o que no siguin oficials. Algunes coses importants a tenir en compte a l'hora de tractar amb el suport:

- No compartiu mai les vostres claus privades, frases llavor o contrasenyes
- No permeteu mai a ningú accedir remotament al vostre ordinador
- Nos us comuniqueu mai amb cap canal extern que no sigui designat per les organitzacions

<InfoBanner emoji=":lock:">
  <div>
    Atenció: encara que les estafes del tipus suport tinguin lloc generalment al Discord, també es poden donar en qualsevol aplicació de xat on hi hagi discussions sobre criptomonedes, incloent-hi el correu electrònic.
  </div>
</InfoBanner>

### Estafes de pesca de credencials {#phishing-scams}

Les estafes de pesca de credencials són un altre angle cada cop més comú que els estafadors utilitzaran per provar de robar els fons de la vostra cartera.

Alguns correus electrònics de pesca de credencials demanen als usuaris clicar en enllaços que els redirigiran a llocs web imitats, demanant-los introduir les seves frases llavor, restablir les seves contrasenyes o enviar ETH. Altres podrien demanar-vos instal·lar programari maliciós sense saber-ho, infectant el vostre ordinador i donant als estafadors accés als vostres fitxers.

Si rebeu un correu electrònic d'un emissor desconegut, recordeu:

- No obriu mai enllaços o fitxers adjunts d'adreces de correu electrònic que no reconegueu
- No divulgueu mai la vostra informació personal o les vostres contrasenyes a ningú
- Esborreu els correus electrònics d'emissors desconeguts

[Més informació sobre com evitar estafes de pesca de credencials](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Estafes de corredor comercial de criptomonedes {#broker-scams}

En les estafes de corredor comercial de criptomonedes, els pirates afirmen ser corredors especialistes en criptomonedes que us oferiran agafar els vostres diners i investir-los en nom vostre. Aquestes ofertes generalment venen acompanyades de promeses de devolucions poc realistes. Després que l'estafador rep els vostres fons, pot persuadir-vos, demanant que li envieu més fons perquè no us perdis els guanys de futures inversions, o poden desaparèixer per complet.

Aquests corredors fraudulents troben els seus objectius utilitzant comptes falsos a YouTube per iniciar converses aparentment naturals sobre el corredor. Aquestes converses acostumen a ser molt votades a favor incrementant la legitimitat, però els vots a favor venen tots de comptes bot o de mecanismes automatitzats.

**No confieu en estranys a internet que vulguin invertir en nom vostre. Perdreu els vostres criptoactius.**

![Una estafa de corredor comercial a YouTube](./brokerScam.png)

### Estafes de grups de mineria de criptoactius {#mining-pool-scams}

Les estafes de grups de mineria involucren a gent que us contacta sense que ho demaneu i asseguren que podeu obtenir grans beneficis unint-vos a un grup de mineria d'Ethereum. Els estafadors faran aquest tipus d'asseveracions i es mantindran en contacte durant el temps que trigui. En essència, l'estafador intentarà convèncer-vos que quan us doneu d'alta en un grup de mineria d'Ethereum les vosters criptomonedes s'utilitzaran per crear ETH i se us abonaran els dividends en forma d'ETH. El que acabarà succeint és que us adonareu que les vostres criptomonedes donen pocs beneficis. Això és simplement perquè mossegueu l'esquer per invertir més. Al cap i a la fi, tots els vostres fons s'enviaran a una adreça desconeguda i l'estafador desapareixerà o en alguns casos continuarà en contacte com ha succeït en un cas recent.

En resum, tingueu cura de la gent que us contacta en les xarxes socials demanant-vos formar part d'un grup de mineria. Un cop hàgiu perdut els vostres criptoactius, ja serà massa tard.

Algunes coses a recordar:

- Tingueu cura amb qualsevol persona que us contacti per guanyar diners amb els vostres criptoactius
- Cerqueu informació referent a l'apilament, grups de liquiditat o altres formes d'invertir els vostres criptoactius
- Poques vegades, si no mai, aquests esquemes són legítims. Si ho fossin, probablement serien reconeguts i n'hauríeu sentit parlar.

[Un home perd 200.000 dòlars en una estafa de grup de mineria](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Estafa del token «Eth2» {#eth2-token-scam}

Amb [la fusió](/roadmap/merge/) que arriba el 2022, els estafadors han aprofitat la confusió al voltant del terme «Eth2» per provar de captar usuaris per bescanviar els seus ETH per tokens «ETH2». No hi ha cap token «ETH2» ni cap altre de nou introduït amb la fusió. Els ETH que teniu avui en dia continuaran sent els mateixos que tindreu després de la fusió i no hi ha cap necessitat de canviar-los a causa de la fusió.

Els estafadors poden aparèixer sota la forma de «suport» dient que si dipositeu els vosters ETH, us retornaran «ETH2». No hi ha cap [suport oficial d'Ethereum](/community/support/) i no hi ha cap token nou. No compartiu mai la frase llavor de la vostra cartera amb ningú.

_Nota: hi ha tókens/tickers derivats que poden representar ETH apilats (p. ex. rETH del grup Rocket, stETH de Lido, ETH2 de Coinbase), però aquests no són quelcom que necessiteu «migrar»_

### Estafes d'enviament {#airdrop-scams}

Les estafes d'enviament involucren que un projecte d'estafa enviï un actiu (NFT, token) a la vostra cartera i us remeti a un lloc web fraudulent per reclamar els actius enviats. Se us demanarà que ingresseu en una casella amb la vostra cartera d'Ethereum i «aproveu» la transacció quan intenteu reclamar-ho. Aquesta transacció compromet el vostre compte enviant les vostres claus públiques i privades a l'estafador. Una altra alternativa a aquest tipus d'estafa podria fer-vos confirmar una transacció que envia fons al compte de l'estafador.

[Més informació sobre l'estafa d'enviament](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Llegir-ne més {#further-reading}

### Seguretat web {#reading-web-security}

- [Per aquesta raó no hauríeu d'utilitzar textos per a l'autenticació de doble factor](https://www.theverge.com/2017/9/18/16328172/sms-two-factor-authentication-hack-password-bitcoin) - _The Verge_
- [Fins a 3 milions de dispositius infectats per complements de Chrome i Edge enllaçats a malware"](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Com crear una contrasenya forta, que no pugueu oblidar](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Què és una clau de seguretat?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Criptoseguretat {#reading-crypto-security}

- [Protegint-vos a vosaltres i als vostres fons](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Quatre formes d'anar amb compte en el món de les criptomonedes](https://www.coindesk.com/tech/2021/04/20/4-ways-to-stay-safe-in-crypto/) - _CoinDesk_
- [Guia de seguretat per a principiants i també per a gent intel·ligent](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Criptoseguretat: contrasenyes i autenticacions](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Educació contra estafes {#reading-scam-education}

- [Anar amb compte: estafes habituals](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Com evitar estafes](https://bitcoin.org/en/scams) _Bitcoin.org_
