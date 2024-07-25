---
title: Organitzacions Autònomes Descentralitzades (DAO en anglès)
description: Una visió general de les DAO a Ethereum
lang: ca
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: Representació d'una DAO que vota una proposta.
summaryPoint1: Comunitats de membres sense un lideratge centralitzat.
summaryPoint2: Una forma segura de col·laborar amb desconeguts a internet.
summaryPoint3: Un lloc segur per destinar fons per a una causa específica.
---

## Què són les DAO? {#what-are-daos}

Les DAOs són sistemes segurs i eficaços perquè persones afins d'arreu del món treballin plegades.

Pensa-hi com si fossin negocis natius d'internet que són propietat i estan dirigits col·lectivament pels seus membres. Disposen de tresoreries incorporades a les quals ningú està autoritzat a accedir-hi sense l'aprovació del grup. Les decisions es regeixen mitjançant propostes i votacions per garantir que tothom dins la organització hi té veu.

No hi ha cap CEO que pugui autoritzar una despesa basada en el seu propi caprici i tampoc hi ha oportunitat de cap CFO dubtós que manipuli els llibres. Tot està al descobert i les normes referents a les despeses es cuinen dins la DAO mitjançant el seu codi.

## Per què necessitem les DAO? {#why-dao}

Començar una organització amb algú que involucri fons i diners requereix molta confiança en la gent amb qui es treballa. Però és difícil confiar en algú amb qui només heu interactuat a internet. Amb les DAO no heu de depositar la vostra confiança en cap persona del grup, només en el codi de la DAO, que és 100% transparent i verificable per qualsevol.

Això obre un ventall de noves oportunitats per a la coordinació i col·laboració global.

### Una comparativa {#dao-comparison}

| DAO                                                                                                                                 | Una organització tradicional                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Generalment plana i totalment democratitzada.                                                                                       | Generalment jeràrquica.                                                                                                   |
| Es requereix la votació dels membres per implementar qualsevol canvi.                                                               | Depenent de l'estructura, es poden demanar canvis des d'una part solament o es pot proposar una votació.                  |
| Vots comptats i resultats implementats automàticament sense cap intermediari de confiança.                                          | Si es permet una votació, els vots es compten internament i els resultats de la votació han de ser gestionats manualment. |
| Els serveis oferts són gestionats automàticament d'una forma descentralitzada (per exemple en la distribució de fons filantròpics). | Requereix gestió humana o un sistema automàtic de control centralitzat, inclinat a la manipulació.                        |
| Tota l'activitat és transparent i totalment pública.                                                                                | L'activitat és típicament privada i limitada al públic.                                                                   |

### Exemples de DAO {#dao-examples}

Perquè sigui més comprensible, aquí teniu alguns exemples de com podríeu utilitzar una DAO:

- La caritat – podeu acceptar pertinences i donacions per part de qualsevol persona del món i el grup pot decidir com es volen gastar aquestes donacions.
- Una xarxa de treballadors autònoms – podeu crear una xarxa de contractants que agrupen els seus fons per a espais d'oficina i subscripcions de software.
- Empreses i subvencions – podeu crear un fons de risc que agrupi capitals d'inversió i voti a les empreses per donar-hi suport. Els diners reemborsats es poden redistribuir més endavant entre els membres de la DAO.

## Pertinença a la DAO {#dao-membership}

Hi ha diferents models de pertinença a la DAO. La pertinença pot determinar com funciona la votació i altres parts clau de la DAO.

### Pertinença basada en tókens {#token-based-membership}

Generalment completament lliure de permisos, depenent del token utilitzat. La majoria d'aquests tókens de govern es poden intercanviar sense cap permís en una casa de canvi descentralitzada. D'altres s'han de guanyar aportant liquiditat o alguna altra prova de treball o «proof-of-work». De qualsevol manera, tan sols mantenir el token garanteix l'accés al vot.

_Típicament utilitzat per a governar amplis protocols descentralitzats o els tókens en sí mateixos._

#### Un exemple famós {#token-example}

[MakerDAO](https://makerdao.com) – El token MKR de MakerDAO està ampliament disponible en cases de canvi descentralitzades. Per tant, qualsevol en pot comprar per tenir poder de vot en el futur protocol de Maker.

### Pertinença basada en accions {#share-based-membership}

Les DAO basades en accions necessiten de més permisos, però tot i això són bastant obertes. Qualsevol membre potencial pot presentar una proposta per unir-se a la DAO, generalment oferint tributs que tinguin algun valor en forma de tókens o treball. Les accions representen el poder de vot directe i la propietat. Els membres poden sortir en qualsevol moment amb la seva part proporcional de la tresoreria.

_Generalment utilitzada per organitzacions més unides i centrades en l'ésser humà com ara les caritats, col·lectius de treballadors i clubs d'inversions. També poden governar protocols i tókens._

#### Un exemple famós {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO està enfocat a projectes de fons d'Ethereum. Requereixen una proposta per la pertinença per la qual cosa el grup pot avaluar si teniu l'experiència i el capital necessaris per fer judicis informats sobre potencials becaris. No podeu obtenir accés a la DAO en el mercat obert.

## Com funcionen les DAO? {#how-daos-work}

La vèrtebra d'una DAO és el contracte intel·ligent. El contracte defineix les normes de l'organització i suporta la tresoreria del grup. Un cop el contracte està actiu a Ethereum, ningú pot canviar les normes, excepte amb una votació. Si algú intenta fer alguna cosa que no estigui coberta per les normes i la lògica del codi, no tindrà èxit. I com que la tresoreria també està definida pel contracte intel·ligent, tampoc ningú pot gastar els diners sense l'aprovació del grup. Això vol dir que les DAO no necessiten una autoritat centralitzada. En canvi, el grup pren decisions de forma col·lectiva i s'autoritzen els pagaments automàticament quan ocorren votacions.

Això és possible perquè els contractes intel·ligents són a prova de manipulació un cop estan actius a Ethereum. No podeu editar el codi (normes de la DAO) sense que la gent se n'adoni, ja que tot és públic.

<DocLink href="/smart-contracts/">
  Més informació sobre els contractes intel·ligents
</DocLink>

## Ethereum i les DAO {#ethereum-and-daos}

Ethereum és el fonament perfecte per a les DAO per un seguit de raons:

- El propi consens d'Ethereum està prou distribuit i establert perquè les organitzacions confïin en la xarxa.
- El codi dels contractes intel·ligents no pot ésser modificat un cop està actiu, ni tan sols pels seus propis propietaris. Això permet a la DAO executar-se amb les normes amb les quals va ser programada.
- Els contractes intel·ligents poden rebre/enviar fons. Sense això necessitaríeu un intermediari de confiança per gestionar els fons del grup.
- La comunitat d'Ethereum ha provat ser més col·laborativa que competitiva i ha permès emergir ràpidament millors pràctiques i sistemes de suport.

## Formar part / iniciar una DAO {#join-start-a-dao}

### Formar part d'una DAO {#join-a-dao}

- [DAO comunitàries d'Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Llistat de DAO de DAOHaus](https://app.daohaus.club/explore)

### Iniciar una DAO {#start-a-dao}

- [Convocar una DAO amb DAOHaus](https://app.daohaus.club/summon)
- [Crear una DAO impulsada per Aragon](https://aragon.org/product)
- [Iniciar una colònia](https://colony.io/)
- [Construir una DAO amb DAOstack](https://daostack.io/)

## Llegir-ne més {#further-reading}

### Articles sobre DAO {#dao-articles}

- [Què és una DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [La casa de les DAO](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Què és una DAO i per què serveix?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOHaus](https://daohaus.club/)
- [Com iniciar una DAO-Comunitat impulsada digitalment](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOHaus](https://daohaus.club/)
- [Què és una DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)

### Vídeos {#videos}

- [Què és una DAO en criptografia?](https://youtu.be/KHm0uUPqmVE)
