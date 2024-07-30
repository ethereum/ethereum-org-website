---
title: Governança d'Ethereum
description: Una introducció sobre com es prenen les decisions a Ethereum.
lang: ca
---

# Introducció a la governança d'Ethereum {#introduction}

_Si ningú és el propietari d'Ethereum, com es prenen les decisions sobre els canvis passats i futurs d'Ethereum? La governança d'Ethereum es refereix al procés que permet que es prenguin aquestes decisions_

<Divider />

## Què és la governança? {#what-is-governance}

La governança són els sistemes implementats que permeten prendre decisions. En una estructura organitzativa típica, l'equip executiu o el consell de direcció pot tenir l'última paraula en el procés de presa de decisions. O potser cal el vot dels accionistes per a promulgar un canvi. En un sistema polític, els càrrecs electes poden promulgar legislació que busca representar els desitjos dels seus votants.

## Governança descentralitzada {#decentralized-governance}

Ningú és propietari o controla el protocol Ethereum, però això no vol dir que no calgui prendre decisions sobre la implementació de canvis que assegurin millor la longevitat i prosperitat de la xarxa. Aquesta falta de propietari fa que l'organització tradicional de governança no sigui una solució compatible.

## Governança d'Ethereum {#ethereum-governance}

La governança d'Ethereum és el procés pel qual es fan canvis en el protocol. És important assenyalar que aquest procés no està relacionat amb com la gent i les aplicacions utilitzen el protocol; la xarxa Ethereum no requereix permisos per a ser utilitzada. Qualsevol persona d'arreu del món pot participar en les activitats de la cadena. No hi ha normes que determinin qui pot o no construir una aplicació o enviar una transacció. Amb tot, hi ha un procés per proposar canvis al protocol bàsic, sobre el qual funcionen aquestes aplicacions. Com que hi ha tanta gent que depèn de l'estabilitat d'Ethereum i per tal d'assegurar que els canvis que es facin a Ethereum siguin segurs i tinguin un suport molt ampli de la comunitat, el llindar de coordinació que cal per a fer modificacions mínimes és molt alt, incloent-hi processos tècnics i socials.

### Governança «en cadena» vs «fora de cadena» {#on-chain-vs-off-chain}

La tecnologia de cadenes de blocs proporciona una nova forma de governança, coneguda com a governança en cadena. La governança en cadena es produeix quan els canvis en el protocol es decideixen a través de la votació dels tenidors, generalment aquells que estan en possessió d'un token de governança, i la votació succeeix en la cadena de blocs. En algunes formes de governança en cadena, els canvis que es proposen per a un protocol ja estan escrits en codi i s'implementen automàticament si els tenidors aproven els canvis.

En la fórmula oposada, la governança en cadena, les decisions sobre qualsevol canvi en un protocol es prenen a través d'un procés informal de debat social, que, si s'aprova, s'implementaria més tard en el codi.

**La governança d'Ethereum es produeix fora de cadena** amb una gran varietat de tenidors involucrats en el procés.

_Mentre que a nivell del protocol la governança d'Ethereum és fora de cadena, molts casos d'ús, construïts en base a Ethereum, com les DAO, fan servir governança en cadena._

<ButtonLink href="/dao/">
  Més sobre les DAO
</ButtonLink>

<Divider />

## Qui hi està involucrat? {#who-is-involved}

Hi ha diversos tipus de tenidors a la [comunitat Ethereum](/community/) i cadascú juga el seu paper en el procés de governança. Començant pels tenidors més allunyats del protocol i apropant la lupa a poc a poc, tenim:

- **Tenidors d'Ether**: gent que posseeix una quantitat arbitrària d'ETH. [Més informació sobre ETH](/eth/).
- **Usuaris d'aplicacions**: gent que interactua amb les aplicacions a la cadena de blocs d'Ethereum.
- **Desenvolpadors d'aplicacions/eines**: gent que escriu aplicacions executades a la cadena de blocs d'Ethereum (p. ex. DeFi, NFT, etc.) o fabrica eines per interactuar amb Ethereum (p. ex. carteres, conjunts de proves, etc.). [Més informació sobre dapps](/dapps/).
- **Operadors de nodes**: gent que executa nodes que propaguen blocs i transaccions i refusa qualsevol transacció o bloc invàlids amb què es trobin. [Més informació sobre els nodes](/developers/docs/nodes-and-clients/).
- **Autors d'EIP**: gent que proposa canvis al protocol Ethereum en forma de Propostes de Millora d'Ethereum («Ethereum Improvement Proposals» o EIP en anglès). [Més informació sobre les EIP](/eips/).
- **Miners/validadors**: gent que executa nodes que poden afegir nous blocs a la cadena de blocs d'Ethereum.
- **Desenvolupadors de protocol** (també coneguts com a «Core Developers» o desenvolupados de nucli): gent que manté les diverses implementacions d'Ethereum (p. ex. go-ethereum, Nethermind, Besu, Erigon en la capa d'execució o Prysm, Lighthouse, Nimbus, Teku o Lodestar en la capa de consens). [Més informació sobre els clients Ethereum](/developers/docs/nodes-and-clients/).

_Nota: Qualsevol particular pot ser part de mutitud d'aquests grups (p. ex. un desenvolupador de protocol podria ser autor d'una EIP i executar un validador de la cadena de balisa a més d'utilitzar aplicacions DeFi). No obstant això, per a presentar els conceptes de forma clara, és més fàcil que hi hagi diferències entre ells._

<Divider />

## Què és una EIP? {#what-is-an-eip}

Un procés important utilitzat en la governança d'Ethereum és la iniciativa d'**EIP (Propostes de Millora d'Ethereum o «Ethereum Improvement Proposals», en anglès)**. Les EIP són estàndards que especifiquen nous processos o característiques potencials per a Ethereum. Qualsevol persona dins la comunitat Ethereum pot crear una EIP. Per exemple, cap dels autors de la EIP-721, l'EIP que ha estandarditzat els NFT, ha treballat directament en el desenvolupament del protocol d'Ethereum.

<ButtonLink href="/eips/">
  Més informació sobre les EIP
</ButtonLink>

<Divider />

## El procés formal {#formal-process}

El procés formal per introduir canvis al protocol Ethereum és el següent:

1. **Proposar una EIP de nucli**: tal com es descriu en [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), el primer pas per a proposar formalment un canvi a Ethereum és detallar-ho en una EIP de nucli. Aquesta actuarà com a especificació oficial per a l'EIP que els desenvolupadors de protocol implementaran en cas que sigui acceptada.

2. **Presentar l'EIP als desenvolupadors de protocol**: un cop tingueu l'EIP de nucli per la qual heu reunit aportacions de la comunitat, hauríeu de presentar-la als desenvolupadors de protocol. Podeu fer-ho proposant-la com a discussió en una [trucada d'AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). És probable que algunes discussions ja hagin tingut lloc asincrònicament al [fòrum Ethereum Magicians](https://ethereum-magicians.org/) o al [Discord Ethereum R&D](https://discord.gg/mncqtgVSVw).

> Alguns possibles resultats d'aquesta etapa són:

> - L'EIP serà presa en consideració per a una futura millora de la xarxa
> - Es demanaran canvis tècnics
> - Podrà ser rebutjada si no és una prioritat o si la millora no és suficientment gran en relació amb l'esforç del desenvolupament

3. **Iterar cap a una proposta final:** després de rebre comentaris de multitud de tenidors rellevants, probablement necessitareu fer canvis en la vostra proposta inicial per millorar la seva seguretat o satisfer millor les necessitats de diversos usuaris. Un cop la vostra EIP ha incorporat tots els canvis que creieu necessaris, haureu de presentar-la de nou als desenvolupadors de protocol. Llavors fareu el següent pas dins d'aquest procés o, potser, apareixen nous problemes que requereixen una altra ronda d'iteracions en la vostra proposta.

4. **Introducció de l'EIP en l'actualització de xarxa**: suposant que l'EIP s'aprovi, es provi i s'implementi, es programa com a part d'una actualització de xarxa. A causa dels alts costos de coordinació de les actualitzacions de xarxa (tothom s'ha d'actualitzar simultàniament), les EIP s'agrupen generalment en actualitzacions.

5. **Activació de l'actualització de xarxa**: després que l'actualització de xarxa sigui activada, l'EIP estarà disponible a la xarxa Ethereum. _Nota: generalment les actualitzacions de xarxa s'activen en les xarxes de prova abans d'activar-se en la xarxa principal d'Ethereum._

Aquest flux, a la vegada que molt simplificat, dona una visió general dels nivells rellevant perquè s'activi un canvi de protocol a Ethereum. Ara, fem una ullada als factors informals en joc durant aquest procés.

## El procés informal {#informal-process}

### Treballs previs {#prior-work}

Els autors d'EIP haurien de familiaritzar-se amb les propostes i els treballs previs abans de crear una EIP que pugui ser considerada formalment per a la seva implementació a la xarxa principal d'Ethereum. D'aquesta manera, s'espera que l'EIP aporti quelcom de nou que no hagi estat rebutjat anteriorment. Els tres llocs principals per fer-ne recerques són el [repositori d'EIP](https://github.com/ethereum/eips), el fòrum [Ethereum Magicians](https://ethereum-magicians.org/) i [ethresear.ch](https://ethresear.ch/).

### Grups de treball {#working-groups}

És poc probable que un primer esborrany d'una EIP sigui implementat a la xarxa principal d'Ethereum sense edicions o canvis. Generalment, els autors d'EIP treballaran amb un subconjunt de desenvolupadors de protocol per especificar, implementar, provar, iterar i finalitzar la seva proposta. Històricament, aquests grups de treball han requerit molts mesos (i de vegades anys!) de treball. De forma similiar, per a efectuar tals canvis, els autors d'EIP hauran d'involucrar desenvolupadors d'aplicacions/eines rellevants des del primer moment per a recaptar opinions d'usuaris finals i mitigar qualsevol risc d'implementació.

### Consens comunitari {#community-consensus}

Mentre que algunes EIP són simples millores tècniques amb matissos mínims, d'altres són compensacions més complexes i inherents que afectaran a diferents tenidors de diverses formes. Això significa que algunes EIP acabaran sent més polèmiques dins la comunitat que d'altres.

No hi ha un guió clar de com gestionar les propostes polèmiques. Com que els desenvolupadors de protocol no poden, de cap manera, forçar la gent a adoptar les millores de xarxa, generalment evitaran implementar les EIP la polèmica de les quals superi els beneficis de la majoria més àmplia.

S'espera que els autors d'EIP demanin l'opinió de tots els tenidors rellevants. Si en algun moment arribeu a ser autor d'una EIP polèmica, hauríeu d'intentar abordar les objeccions per a generar consens sobre la vostra EIP. A causa de la grandària i la diversitat de la comunitat Ethereum, no hi ha una única mesura (p. ex. vot amb moneda) que pugui ser utilitzada per a calibrar el consens comunitari i s'espera que els autors de les EIP s'adaptin a les circumstàncies de la seva proposta.

Més enllà de la seguretat de la xarxa Ethereum, històricament els desenvolupadors de protocol han atorgat un pes significant al valor dels desenvolupadors d'aplicacions/eines i als usuaris d'aplicacions, ja que el seu ús i desenvolupament a Ethereum és el que fa que l'ecosistema sigui atractiu per a altres tenidors. A més, les EIP han d'implementar-se al llarg de totes les implementacions de client, que són gestionades per diferents equips. Part d'aquest procés significa generalment convèncer múltiples equips de desenvolupadors de protocol que un canvi en particular és valuós i ajuda als usuaris finals o soluciona un problema de seguretat.

<Divider />

## Com abordar els desacords {#disagreements}

Comptar amb molts tenidors amb motivacions i creences diferents significa que els desacords no són inusuals.

Per norma general, els desacords s'aborden en llargues discussions en fòrums públics per comprendre el problema d'arrel i permetre que l'opinió de qualsevol tingui pes. Normalment, o bé un dels grups cedeix o bé s'aconsegueix un terme mitjà. Si un grup se sent suficientment fort, el fet de forçar a través d'un canvi particular podria resultar en una separació de cadena. Una separació de cadena es produeix quan alguns tenidors protesten implementant un canvi de protocol i això dona com a resultat versions diferents i incompatibles del protocol que està operatiu, del qual sorgeixen dues cadenes de blocs diferents.

### La bifurcació d'una DAO {#dao-fork}

Les bifurcacions es donen quan s'han de fer importants millores tècniques o modificacions a la xarxa i canvien les «normes» del protocol. [Els clients Ethereum](/developers/docs/nodes-and-clients/) han d'actualitzar el software per a implementar les noves normes de la bifurcació.

La bifurcació d'una DAO va ser la resposta a [l'atac d'una DAO el 2016](https://www.coindesk.com/understanding-dao-hack-journalists), on un contracte insegur d'una [DAO](/glossary/#dao) va patir un drenatge de més de 3,6 milions d'ETH en un hack. La bifurcació va moure els fons del contracte defectuós al nou contracte i va permetre recuperar els fons a qui n'hagués perdut a causa del pirateig.

La comunitat d'Ethereum va votar a favor d'aquest pla d'acció. Qualsevol titular d'ETH va poder votar mitjançant una transacció a [una plataforma de votació](http://v1.carbonvote.com/). La decisió de bifurcar va assolir el 85% dels vots.

És important tenir en compte que, si bé el protocol es va bifurcar per a revertir el pirateig, el pes dels vots en el moment de prendre la decisió de bifurcar és discutible per diverses raons:

- La participació de vot va ser increïblement baixa
- Molta gent no sabia que hi havia una votació
- La votació només representava els tenidors d'ETH, no qualsevol dels altres participants del sistema

Un subgrup de la comunitat va refusar bifurcar-se, en gran part perquè sentien que l'incident amb la DAO no era un defecte de protocol. Aquests van formar [ Ethereum Classic](https://ethereumclassic.org/).

Avui en dia, la comunitat Ethereum ha adoptat una política de no-intervenció en cas d'errors de contracte o fons perduts per a mantenir la neutral credibilitat del sistema.

Veieu aquest vídeo amb més informació sobre el pirateig de la DAO:

<YouTube id="rNeLuBOVe8A" />

<Divider />

### La utilitat de les bifurcacions {#forking-utility}

La bifurcació d'Ethereum/Ethereum Classic és un exemple excel·lent d'una bifurcació sana. Teníem dos grups que diferien tant l'un de l'altre en relació amb els valors principals com per sentir que pagaven la pena els riscs derivats de perseguir els seus camins d'acció específics.

L'habilitat de bifurcar-se front a diferències polítiques, filosòfiques o econòmiques significants juga un gran paper en l'èxit de la governança d'Ethereum. Si no hi hagués hagut la possibilitat d'una bifurcació, l'alternativa era una lluita interna continuada, participació forçada reticent per a aquells que eventualment van formar Ethereum Classic i una visió cada cop més diferent de com es percep l'èxit d'Ethereum.

<Divider />

## Desenvolupament de la cadena de balisa {#beacon-chain}

El procés de governança d'Ethereum sovint sacrifica velocitat i eficiència per obertura i inclusivitat. Per a accelerar el desenvolupament de la cadena de balisa, es va llençar de forma separada a la xarxa de prova de treball d'Ethereum i seguia les seves pròpies pràctiques de governança.

Mentre que el desenvolupament de les especificacions i les implementacions ha estat sempre en programari lliure, no s'utlitzaven els antics processos utilitzats per a proposar les actualitzacions descrites anteriorment. Això va permetre que els investigadors i els implementadors poguessin especificar i posar-se d'acord amb els canvis més ràpidament.

Quan la cadena de balisa es fusioni amb la capa d'execució d'Ethereum, el procés de governança per proposar canvis estarà harmonitzat. Aquest procés d'implementar la fusió ja es troba [en marxa](https://eips.ethereum.org/EIPS/eip-3675).

<ButtonLink href="/roadmap/merge/">
  Més informació sobre La Fusió
</ButtonLink>

<Divider />

## Com puc involucrar-me? {#get-involved}

- [Proposeu una EIP](/eips/#participate)
- [Debatiu propostes actuals](https://ethereum-magicians.org/)
- [Participeu en una discussió de R&D](https://ethresear.ch/)
- [Uniu-vos al discord R&D d'Ethereum](https://discord.gg/mncqtgVSVw)
- [Executeu un node](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuïu al desenvolupament de clients](/developers/docs/nodes-and-clients/#execution-clients)
- [Programa d'aprenentatge per a desenvolupadors de nucli](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Llegir-ne més {#further-reading}

La governança a Ethereum no està definida de manera rígida. Diversos participants de la comunitat tenen diferents perspectives al respecte. Aquí en teniu uns quants:

- [Notes sobre la governança de la cadena de blocs](https://vitalik.eth.limo/general/2017/12/17/voting.html) – _Vitalik Buterin_
- [Com funciona la governança d'Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Com funciona la governança d'Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [Què és un desenvolupador de nucli d'Ethereum?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) – _Hudson Jameson_
- [Governança, 2a part: la plutocràcia també és dolenta](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) – _Vitalik Buterin_
- [Més enllà de la governança per votació amb monedes](https://vitalik.eth.limo/general/2021/08/16/voting3.html) – _Vitalik Buterin_
