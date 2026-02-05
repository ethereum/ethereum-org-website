---
title: Pectra MaxEB
description: "Zjistěte více o MaxEB ve vydání Pectra"
lang: cs
---

# MaxEB {#maxeb}

_tl;dr:_ Hard fork Pectra umožňuje validátorům sítě Ethereum přihlásit se k vyššímu maximálnímu efektivnímu zůstatku a složenému úročení převodem z pověření pro výběr **typu 1** na **typ 2**. Oficiálním nástrojem k tomu je Launchpad. Tuto operaci nelze vrátit zpět.

## Přehled {#overview}

### Koho se to týká? {#who-is-affected}

Každý, kdo provozuje validátora – pravděpodobně někdo, kdo zná index (např. [Validátor č. 12345](https://beaconcha.in/validator/12345)) validátora, kterého ovládá. Pokud k provozování validátora používáte protokol (např. Lido CSM nebo Rocket Pool), budete si muset u nich ověřit, zda a kdy podporují maxEB.

Pokud uzamykáte prostředky (stake) pomocí likvidního tokenu pro uzamčení (staking) (např. rETH nebo stETH), není vyžadována ani doporučena žádná akce.

### Co je „maxEB“? {#what-is-maxeb}

maxEB = MAXimální efektivní zůstatek (MAXimum Effective Balance) validátora. Až do hard forku Pectra vydělává každý validátor na maximálně 32 ETH. Po hard forku Pectra mají validátoři možnost vydělávat na jakémkoli zůstatku mezi 32 a 2048 ETH v přírůstcích po 1 ETH, pokud se k této změně přihlásí.

### Jak se validátor může přihlásit? {#how-does-a-validator-opt-in}

Validátor se ke změně maxEB přihlásí převodem pověření pro výběr z **typu 1** na **typ 2**. To lze provést na [Launchpadu (Akce validátora)](https://launchpad.ethereum.org/validator-actions) poté, co bude spuštěn hard fork Pectra. Stejně jako u **typu 0** → **typ 1** je převod z **typu 1** → **typ 2** nevratný proces.

### Co je pověření pro výběr? {#whats-a-withdrawal-credential}

Když provozujete validátor, máte sadu pověření pro výběr. Najdete je ve svém souboru JSON s daty vkladu, nebo si je můžete prohlédnout na beaconcha.in na [kartě vkladů](https://beaconcha.in/validator/12345#deposits) vašeho validátora.

1. Pověření pro výběr **typu 0**: Pokud pověření pro výběr vašeho validátora začíná `0x00...`, vložili jste prostředky před hard forkem Shapella a ještě nemáte nastavenou adresu pro výběr.

![Pověření pro výběr typu 0](./0x00-wd.png)

2. Pověření pro výběr **typu 1**: Pokud pověření pro výběr vašeho validátora začíná `0x01...`, vložili jste prostředky po hard forku Shapella nebo jste již převedli svá pověření **typu 0** na pověření **typu 1**.

![Pověření pro výběr typu 1](./0x01-wd.png)

3. Pověření pro výběr **typu 2**: Tento nový typ pověření pro výběr bude začínat na `0x02...` a bude povolen po hard forku Pectra. Validátoři s pověřeními pro výběr **typu 2** se někdy označují jako „**validátoři se složeným úročením**“

| **Povoleno**    | **Nepovoleno**  |
| --------------- | --------------- |
| ✅ Typ 0 → Typ 1 | ❌ Typ 0 → Typ 2 |
| ✅ Typ 1 → Typ 2 | ❌ Typ 1 → Typ 0 |
|                 | ❌ Typ 2 → Typ 1 |
|                 | ❌ Typ 2 → Typ 0 |

### Rizika {#risks}

MaxEB umožňuje validátorovi poslat celý svůj zůstatek jinému validátorovi. Uživatelé, kteří odesílají žádost o konsolidaci, by si měli ověřit zdroj a obsah transakce, kterou podepisují. Oficiálním nástrojem pro využití funkcí maxEB je Launchpad. Pokud se rozhodnete použít nástroj třetí strany, měli byste si ověřit, že:

- Veřejný klíč a adresa pro výběr zdrojového validátora se shodují s validátorem, kterého ovládají
- Veřejný klíč cílového validátora je správný a patří jim
- Požadavek je konverze, nikoli konsolidace, pokud nemají v úmyslu posílat prostředky jinému validátorovi
- Transakce je podepsána správnou adresou pro výběr

**Důrazně doporučujeme** prodiskutovat jakýkoli nástroj třetí strany, který plánujete použít, s [komunitou EthStaker](https://ethstaker.org/about). Je to užitečné místo pro kontrolu správnosti vašeho přístupu a pro to, abyste se vyvarovali chyb. Pokud použijete škodlivý nebo špatně nakonfigurovaný nástroj, **celý váš zůstatek validátora by mohl být odeslán validátorovi, kterého neovládáte**, bez možnosti ho získat zpět.

## Technické detaily {#technical-details}

### Postup {#the-flow}

Operace `ConsolidationRequest` bude mít dvě využití:

1. Převod stávajícího validátora z **typu 1** na validátora **typu 2**
2. Konsolidace dalších validátorů do stávajícího validátora **typu 2**

Při převodu validátora z **typu 1** na **typ 2** bude _zdroj_ i _cíl_ stejný validátor, kterého převádíte. Operace bude stát palivo a bude zařazena do fronty za ostatní žádosti o konsolidaci. Tato fronta je **oddělená** od fronty vkladů, není ovlivněna novými vklady validátorů a lze ji zobrazit na [pectrified.com](https://pectrified.com/).

Pro konsolidaci validátorů musíte mít _cílového validátora_, který má pověření pro výběr **typu 2**. Toto je cíl všech zůstatků konsolidovaných validátorů a index, který bude zachován.

### Požadavky pro převod na typ 2 {#requirements-for-converting-to-type-2}

To bude vyžadováno pro prvního validátora, kterého převedete na **typ 2**. Index tohoto validátora je zachován a je aktivní. Při převodu platí: _zdrojový validátor_ == _cílový validátor_.

Validátor musí...

- být aktivní
- mít pověření pro výběr **typu 1**
- nebýt ve stavu ukončování (nebo seknutý)
- nemít nevyřízené ručně spuštěné výběry (netýká se automatických výběrů)

![ilustrace konverze](./conversion.png)

### Požadavky pro konsolidaci {#requirements-for-consolidating}

Jedná se o _stejnou operaci_ jako převod, ale provádí se, když se _zdrojový validátor_ liší od _cílového validátora_. Index cílového validátora je zachován a přijímá zůstatek ze zdrojového validátora. Index zdrojového validátora je uveden do stavu `EXITED`.

V tomto případě má zdrojový validátor všechny stejné požadavky jako výše a navíc:

- je aktivní alespoň ~27,3 hodiny (jedna `SHARD_COMMITTEE_PERIOD`)

Cílový validátor musí

- mít pověření pro výběr **typu 2**
- nebýt ve stavu ukončování.

![ilustrace konsolidace](./consolidation.png)

### Žádost o konsolidaci {#the-consolidation-request}

Žádost o konsolidaci bude podepsána adresou pro výběr spojenou se zdrojovým validátorem a bude obsahovat:

1. Adresa zdrojového validátora (např. `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Veřejný klíč zdrojového validátora (např. `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Veřejný klíč tohoto cílového validátora

Při převodu budou body 2 a 3 stejné. Tuto operaci lze provést na [Launchpadu](https://launchpad.ethereum.org/).

### Požadavky na podepisování {#signing-requirements}

Pro odeslání žádosti `ConsolidationRequest` musí žádost podepsat **adresa pro výběr zdrojového validátora**. Tím se prokazuje kontrola nad prostředky validátora.

### Co se podepisuje? {#what-is-signed}

Používá se doménově oddělený [podpisový kořen](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) objektu `ConsolidationRequest`.

- **Doména:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Pole podpisového kořene:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Výsledný **podpis BLS** se odesílá spolu s žádostí.

Poznámka: Podpis se provádí pomocí adresy pro výběr, nikoli klíčem validátora.

### Částečné výběry {#partial-withdrawals}

Validátoři s pověřeními **typu 1** získávají automatické výběry svého přebytečného zůstatku (cokoli nad 32 ETH) na svou adresu pro výběr bez poplatku za palivo. Protože **typ 2** umožňuje validátorovi složitě úročit zůstatky v přírůstcích 1 ETH, nebude automaticky provádět výběry zůstatků, dokud nedosáhne 2048 ETH. Částečné výběry u validátorů **typu 2** musí být spuštěny ručně a budou stát palivo.

## Nástroje pro konsolidaci {#consolidation-tooling}

K dispozici je několik nástrojů pro správu konsolidací. Oficiálním nástrojem, vytvořeným nadací Ethereum, je [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Existují také nástroje třetích stran vytvořené subjekty z komunity uzamykání (stakingu), které mohou nabízet funkce, jež Launchpad neposkytuje. Ačkoli zde uvedené nástroje nejsou auditovány ani schváleny nadací Ethereum, jedná se o open source nástroje od známých členů komunity.

| Nástroj                          | Web                                                                                                       | Open source                     | Tvůrce                                         | Zkontrolovaný                                                                                                                                          | Rozhraní                                                                      | Významné funkce                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Pectra Staking Manager           | pectrastaking.com                                                                         | Ano, Apache 2.0 | [Pier Two](https://piertwo.com/)               | Ne                                                                                                                                                     | Webové UI                                                                     | Wallet Connect, funguje se SAFE                                   |
| Nástroj Pectra Validator Ops CLI | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract)                                              | Ano, MIT                        | [Luganodes](https://www.luganodes.com/)        | Ano, Quantstamp [květen 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Příkazový řádek                                                               | Dávkové zpracování, pro mnoho validátorů najednou                 |
| Ethereal                         | [GitHub](https://github.com/wealdtech/ethereal)                                                           | Ano, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Ne                                                                                                                                                     | Příkazový řádek                                                               | Kompletní sada funkcí pro správu validátorů a uzlů                |
| Siren                            | [GitHub](https://github.com/sigp/siren)                                                                   | Ano, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/)          | Ne                                                                                                                                                     | Částečně příkazový řádek, ale primárně webové UI                              | Funguje pouze, pokud používáte konsensuálního klienta Lighthouse  |
| Consolideth.app  | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Ano, licence MIT                | [Stakely](https://stakely.io/)                 | Ne                                                                                                                                                     | Webové UI, hostované společností Stakely a připravené k volnému self-hostingu | Podporuje hlavní připojení peněženek, včetně Safe s WalletConnect |

## Nejčastější dotazy {#faq}

### Změní přihlášení mé štěstí při návrzích nebo odměny? {#change-luck-or-rewards}

Ne. Přihlášení nesnižuje vaši šanci na návrh – vaše povinnosti a výběr návrhů zůstávají stejné. Například pokud máte dva validátory s 32 ETH oproti jednomu validátorovi se 64 ETH, budete mít stejnou celkovou šanci být vybráni k navržení bloku a získání odměn.

### Změní přihlášení mé riziko seknutí (slashing)? {#change-slashing-risk}

Pro menší nebo neprofesionální operátory je krátká odpověď ne. Delší odpověď zní, že pro profesionální operátory, kteří provozují mnoho validátorů na uzel s rychlým upozorňováním, může konsolidace do menšího počtu validátorů snížit jejich schopnost reagovat na seknutí (slashing) a zabránit kaskádovým událostem. Počáteční _penalizace_ za seknutí (slashing) pro všechny validátory byla dramaticky snížena z 1 ETH (na 32 ETH) na 0,0078125 ETH (na 32 ETH), aby se toto riziko vyrovnalo.

### Musím opustit svého validátora, abych ho mohl převést? {#exit-validator}

Ne. Můžete provést převod na místě bez opuštění.

### Jak dlouho bude trvat převod / konsolidace? {#how-long}

Minimálně 27,3 hodiny, ale konsolidace také podléhají frontě. Tato fronta je nezávislá na frontách pro vklady a výběry a není jimi ovlivněna.

### Mohu si ponechat svůj index validátora? {#keep-validator-index}

Ano. Převod na místě zachovává stejný index validátora. Pokud konsolidujete více validátorů, budete si moci ponechat pouze index _cílového validátora_.

### Zmeškám atestace? {#miss-attestations}

Během konsolidace do jiného validátora je zdrojový validátor ukončen a následuje ~27hodinová čekací doba, než se zůstatek aktivuje na cílovém validátorovi. Toto období **neovlivňuje metriky výkonu**.

### Hrozí mi nějaké penalizace? {#incur-penalties}

Ne. Dokud je váš validátor online, nehrozí vám žádné penalizace.

### Musí se shodovat adresy pro výběr konsolidovaných validátorů? {#withdrawal-addresses-match}

Ne. Ale _zdroj_ musí autorizovat požadavek ze své vlastní adresy.

### Budou se mé odměny po převodu složeně úročit? {#rewards-compound}

Ano. S pověřeními **typu 2** se odměny nad 32 ETH automaticky znovu uzamykají – ale ne okamžitě. Kvůli malé rezervě (nazývané [_hystereze_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)) musí váš zůstatek dosáhnout **o zhruba 1,25 ETH více**, než se přebytek znovu uzamkne. Takže místo složeného úročení při 33,0 ETH k tomu dojde při 33,25 (efektivní zůstatek = 33 ETH), pak při 34,25 (efektivní zůstatek = 34 ETH) a tak dále.

### Mohu i po převodu stále dostávat automatické výběry? {#automatic-sweep}

Automatické výběry se budou provádět pouze u přebytečných zůstatků nad 2048. Všechny ostatní částečné výběry budete muset spouštět ručně.

### Mohu si to rozmyslet a vrátit se z typu 2 na typ 1? {#go-back-to-type1}

Ne. Převod na **typ 2** je nevratný.

### Pokud chci konsolidovat více validátorů, musím nejprve každý z nich převést na typ 2? {#consolidate-multiple-validators}

Ne! Převeďte jednoho validátora na typ 2 a pak ho použijte jako cíl. Všichni ostatní validátoři konsolidovaní do tohoto cíle typu 2 mohou být typu 1 nebo typu 2.

### Můj validátor je offline nebo má méně než 32 ETH – mohu ho přesto převést? {#offline-or-below-32eth}

Ano. Dokud je aktivní (není ukončen) a můžete podepisovat jeho adresou pro výběr, můžete ho převést.

## Zdroje informací {#resources}

- [Specifikace konsensu Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): Toto je „nejpravdivější“ verze, na kterou byste se měli spolehnout. V případě pochybností si přečtěte specifikace
- Ne každému vyhovuje probírat se kódem, takže [tento maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) může pomoci s interpretací specifikací. _Upozornění: Jako zdroj pravdy by měly být brány specifikace, nikoli AI, protože AI může špatně interpretovat informace nebo si odpovědi vymýšlet_.
- [pectrified.com](https://pectrified.com/): Zobrazte si stav konsolidací, vkladů a čekacích dob ve frontě
- [Ethereal](https://github.com/wealdtech/ethereal): Komunitou vytvořený nástroj CLI pro správu běžných úkolů validátorů
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Komunitou vytvořený kontrakt, který umožňuje vložení vkladů pro více validátorů Ethereum v jedné transakci
