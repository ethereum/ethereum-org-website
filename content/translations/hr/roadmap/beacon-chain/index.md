---
title: Beacon Chain
description: Saznajte vieše o nadogradnji Beacon Chain kojom je implementiran dokaz uloga u Ethereumu.
lang: hr
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoint1: Nadogradnja Beacon Chain implementirala je dokaz uloga u ekosustav Ethereuma.
summaryPoint2: Nadogradnja je objedinjena s izvornim lancem dokaza rada Ethereuma u rujnu 2022.
summaryPoint3: Nadogradnja Beacon Chain uvela je logiku koncenzusa i protokol blokiranja nagađanja koji sada pruža Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Nadogradnja Beacon Chain krenula je u implementaciju 1. prosinca 2020., dok je formalizacija dokaza uloga kao Ethereumovog mehanizma konsenzusa izvršena nadogradnjom The Merge 15. rujna 2022.
</UpgradeStatus>

## Što je Beacon Chain? {#what-is-the-beacon-chain}

Beacon Chain bio je naziv izvornog lanca blokova dokaza uloga koji je pokrenut u 2020. Nadogradnja je izrađena prije implementacije glavne mreže Ethereuma kako bi osigurao da je logika konsenzusa dokaza uloga točna i održiva. Ova nadogradnja aktivna je zajedno s izvornim dokazom rada Ethereuma. Isključivanje i uključivanje dokaza rada na Ethereumu zahtijevalo je upućivanje nadogradnje Beacon Chain da prihvati transakcije iz izvornog Ethereumovog lanca, da ih objedini u blokove i organizira u lance blokova koristeći se mehanizmom konsenzusa dokaza uloga. Istodobno, izvorni korisnici Ethereuma isključili su rudarenje, propagiranje bloka i logiku konsenzusa i predali to nadogradnji Beacon Chain. Taj je događaj poznat pod nazivom [The Merge (Spajanje)](/roadmap/merge/). Nako što se spajanje dogodilo, više nisu postojala dva lanca blokova – postojao je samo jedan lanac dokaza uloga Ethereuma.

## Što radi Beacon Chain? {#what-does-the-beacon-chain-do}

Beacon Chain predstavlja glavnu knjigu računa koji su proveli i koordinirali mrežu Ethereumovih [dionika](/staking/) prije nogo što su ti dionici započeli provoditi prave Ethereumove transakcije. Nadogradnja nije obrađivala transakcije ili interakcije pametnog ugovora.

Nadogradnja uvodi procesor konsenzusa (ili „sloj konsenzusa”) koji je preuzeo mjesto rudarenja dokaza rada u Ethereumu i uveo mnoge značajne promjene.

Beacon Chain bila je temeljna komponenta [sadašnjeg sigurnog, ekološkog i prilagodljivog Ethereuma](/roadmap/vision/).

## Utjecaj nadogradnje Beacon Chain {#beacon-chain-features}

### Osnove ulaganja {#introducing-staking}

Beacon Chain uveo je u Ethereum [dokaz uloga](/developers/docs/consensus-mechanisms/pos/). Tako je zaštićen Ethereum, a validatori imaju mogućnost veće zarade ETH-a. U praksi, ulaganje znači ulaganje ETH-a kako bi se aktivirao softver validatora. Kao ulagač pokrećete softver koji izrađuje i potvrđuje nove blokove u lancu.

Ulaganje ima sličnu ulogu kao i [rudarenje](/developers/docs/consensus-mechanisms/pow/mining/), ali uz mnoge razlike. Rudarenje zahtijeva veća prethodna ulaganja u obliku snažnog hardvera i potrošnje energije i rezultira proporcionalnom zaradom kroz proizvodnju i naprednom centralizacijom. Rudarenje nije imalo zahtjev da se sredstva blokiraju kao pokriće te protokol tako nije mogao kazniti loše sudionike nakon napada.

Prijelazom na dokaz uloga Ethereum je postao sigurniji i manje centraliziran u odnosu na dokaz rada. Što više ljudi sudjeluje u mreži, to će ona biti decentraliziranija i sigurnija od napada.

<InfoBanner emoji=":money_bag:">
  Ako želite postati validator i pomoći u zaštiti Ethereuma, <a href="/staking/">ovdje saznajte više o ulaganju</a>.
</InfoBanner>

### Postavljanje razdjeljivanja {#setting-up-for-sharding}

Od trenutka kada se Beacon Chain objedinio s izvornom glavnom mrežom Ethereuma, Ethereumova zajednica počela je tražiti mogućnost prilagođavanja mreže.

Prednost dokaza uloga predstavlja dostupnost registra svih odobrenih izdavača blokova zajedno s ETH ulogom. Registar postavlja temelj mogućnosti pouzdanog dijeljenja i osvajanja određenih mrežnih odgovornosti.

Razlika je i u odgovornost u odnosu na dokaz rada gdje rudari nisu imali obvezu prema mreži i mogli su zaustaviti rudarenje i trajno i trenutačno isključiti svoje čvorove bez ikakvih posljedica. Također, nema registra poznatih, blokiranih predlagača te pouzdanog načina sigurne podjele mrežnih odgovornosti.

[Više o dijeljenju](/roadmap/danksharding/)

## Odnos između nadogradnji {#relationship-between-upgrades}

Sve nadogradnje Ethereuma donekle su međusobno povezane. Dakle, ponovimo ukratko kako Beacon Chain utječe na ostale nadogradnje.

### Beacon Chain i spajanje {#merge-and-beacon-chain}

U početku je Beacon Chain postojao odvojeno od glavne mreže Ethereuma. Godine 2022. konačno su objedinjeni.

<ButtonLink href="/roadmap/merge/">
  Spajanje
</ButtonLink>

### Djelići i Beacon Chain {#shards-and-beacon-chain}

Razdjeljivanje se sigurno može uvesti u Ethereumov ekosustav samo ako je uspostavljen mehanizam konsenzusa dokaza uloga. Beacon Chain uveo je ulaganje objedinjeno s glavnom mrežom i tako pripremio teren za razdjeljivanje koje će pomoći u daljnjem prilagođavanju Ethereuma.

<ButtonLink href="/roadmap/danksharding/">
  Lanci djelića
</ButtonLink>

## Daljnje čitanje

- [Više o budućim nadogradnjama Ethereuma](/roadmap/vision)
- [Više o dokazu uloga](/developers/docs/consensus-mechanisms/pos)
