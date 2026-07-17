---
title: MaxEB
metaTitle: Pectra MaxEB
description: Zjistěte více o MaxEB v aktualizaci Pectra
lang: cs
authors: ["Nixo"]
---

*Shrnutí:* Hard fork Pectra umožňuje validátorům Etherea přejít na vyšší maximální efektivní zůstatek a úročení (compounding) převedením pověření k výběru **typu 1** na **typ 2**. Oficiálním nástrojem k tomuto kroku je Launchpad. Tuto operaci nelze vzít zpět.

## Přehled {#overview}

### Koho se to týká? {#who-is-affected}

Každého, kdo provozuje validátor – to je pravděpodobně někdo, kdo zná index (např. [Validátor #12345](https://beaconcha.in/validator/12345)) validátoru, který ovládá. Pokud k provozování validátoru používáte protokol (např. Lido CSM nebo Rocket Pool), budete si u nich muset ověřit, zda a kdy podporují MaxEB.

Pokud provádíte staking pomocí tokenu likvidního stakingu (LST) (např. rETH nebo stETH), není vyžadována ani doporučována žádná akce.

### Co je „MaxEB“? {#what-is-maxeb}

MaxEB = MAXimální efektivní zůstatek (MAXimum Effective Balance) validátoru. Až do hard forku Pectra získává každý validátor odměny z maximálně 32 ETH. Po aktualizaci Pectra mají validátoři možnost získávat odměny z jakéhokoli zůstatku mezi 32 a 2048 ETH, a to v krocích po 1 ETH, pokud se pro tuto změnu rozhodnou.

### Jak se validátor může zapojit? {#how-does-a-validator-opt-in}

Validátor se do změny MaxEB zapojí převedením pověření k výběru **typu 1** na **typ 2**. To lze provést na [Launchpadu (Akce validátoru)](https://launchpad.ethereum.org/validator-actions) poté, co bude spuštěn hard fork Pectra. Stejně jako u převodu **typu 0** → **typ 1**, je i převod **typu 1** → **typ 2** nevratný proces.

### Co je pověření k výběru? {#whats-a-withdrawal-credential}

Když provozujete validátor, máte sadu pověření k výběru. Ty lze nalézt ve vašem souboru deposit data json nebo si je můžete prohlédnout na beaconcha.in na [záložce vkladů](https://beaconcha.in/validator/12345#deposits) vašeho validátoru.

1. Pověření k výběru **typu 0**: Pokud pověření k výběru vašeho validátoru začínají na `0x00...`, vložili jste prostředky před hard forkem Shapella a ještě nemáte nastavenou adresu pro výběr.

![Type 0 withdrawal credential](./0x00-wd.png)

2. Pověření k výběru **typu 1**: Pokud pověření k výběru vašeho validátoru začínají na `0x01...`, vložili jste prostředky po hard forku Shapella nebo jste již svá pověření **typu 0** převedli na pověření **typu 1**.

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. Pověření k výběru **typu 2**: Tento nový typ pověření k výběru bude začínat na `0x02...` a bude povolen po aktualizaci Pectra. Validátoři s pověřením k výběru **typu 2** se někdy nazývají „**úročící validátoři (compounding validators)**“

| **Povoleno** | **Nepovoleno** |
| --- | --- |
| ✅ Typ 0 → Typ 1 | ❌ Typ 0 → Typ 2 |
| ✅ Typ 1 → Typ 2 | ❌ Typ 1 → Typ 0 |
|  | ❌ Typ 2 → Typ 1 |
|  | ❌ Typ 2 → Typ 0 |

### Rizika {#risks}

MaxEB umožňuje validátoru odeslat celý svůj zůstatek jinému validátoru. Uživatelé, kteří odesílají návrh na konsolidaci, by měli ověřit zdroj a obsah transakce, kterou podepisují. Oficiálním nástrojem pro využití funkcí MaxEB je Launchpad. Pokud se rozhodnete použít nástroj třetí strany, měli byste ověřit, že:

- Veřejný klíč a adresa pro výběr zdrojového validátoru se shodují s validátorem, kterého ovládají
- Veřejný klíč cílového validátoru je správný a patří jim
- Požadavek je převod, nikoli konsolidace, pokud nemají v úmyslu odeslat prostředky jinému validátoru
- Transakce je podepisována správnou adresou pro výběr

**Důrazně doporučujeme** prodiskutovat jakýkoli nástroj třetí strany, který plánujete použít, s [komunitou EthStaker](https://ethstaker.org/about). Je to užitečné místo, kde si můžete ověřit svůj postup a vyhnout se chybám. Pokud použijete škodlivý nebo špatně nakonfigurovaný nástroj, **celý zůstatek vašeho validátoru by mohl být odeslán validátoru, kterého neovládáte** – a to bez možnosti získat jej zpět.

## Technické detaily {#technical-details}

### Průběh {#the-flow}

Operace `ConsolidationRequest` bude mít dvě využití:

1. Převod stávajícího validátoru z **typu 1** na validátor **typu 2**
2. Konsolidace dalších validátorů do stávajícího validátoru **typu 2**

Při převodu validátoru **typu 1** na **typ 2** bude *zdrojem* i *cílem* validátor, kterého převádíte. Operace bude stát gas a bude zařazena do fronty za ostatní požadavky na konsolidaci. Tato fronta je **oddělená** od fronty vkladů, není ovlivněna novými vklady validátorů a lze ji sledovat na [pectrified.com](https://pectrified.com/).

Pro konsolidaci validátorů musíte mít *cílový validátor*, který má pověření k výběru **typu 2**. To je cíl všech konsolidovaných zůstatků validátorů a index, který bude zachován.

### Požadavky pro převod na typ 2 {#requirements-for-converting-to-type-2}

Toto bude vyžadováno pro první validátor, který převedete na **typ 2**. Index tohoto validátoru je zachován a aktivní. Pro převod platí, že *zdrojový validátor* == *cílový validátor*.

Validátor musí...

- být aktivní
- mít pověření k výběru **typu 1**
- nebýt ve stavu výstupu (nebo penalizován)
- nemít čekající ručně spuštěné výběry (neplatí pro automatické přesuny - sweeps)

![conversion illustration](./conversion.png)

### Požadavky pro konsolidaci {#requirements-for-consolidating}

Jedná se o *stejnou operaci* jako převod, ale nastává, když se *zdrojový validátor* liší od *cílového validátoru*. Index cílového validátoru je zachován a přijímá zůstatek ze zdrojového validátoru. Index zdrojového validátoru je převeden do stavu `EXITED`.

V tomto případě má zdrojový validátor všechny stejné požadavky jako výše a navíc:

- byl aktivní po dobu alespoň ~27,3 hodin (jedna `SHARD_COMMITTEE_PERIOD`)

Cílový validátor musí

- mít pověření k výběru **typu 2**
- nebýt ve stavu výstupu.

![consolidation illustration](./consolidation.png)

### Požadavek na konsolidaci {#the-consolidation-request}

Požadavek na konsolidaci bude podepsán adresou pro výběr spojenou se zdrojovým validátorem a bude obsahovat:

1. Adresu zdrojového validátoru (např. `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Veřejný klíč zdrojového validátoru (např. `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Veřejný klíč cílového validátoru

Při převodu budou body 2 a 3 stejné. Tuto operaci lze provést na [Launchpadu](https://launchpad.ethereum.org/).

### Požadavky na podepisování {#signing-requirements}

Pro odeslání `ConsolidationRequest` musí požadavek podepsat **adresa pro výběr zdrojového validátoru**. Tím se prokazuje kontrola nad prostředky validátoru.

### Co se podepisuje? {#what-is-signed}

Používá se doménově oddělený [kořen podepisování (signing root)](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) objektu `ConsolidationRequest`.

- **Doména:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Pole kořene podepisování:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

Výsledný **podpis BLS** je odeslán spolu s požadavkem.

Poznámka: Podepisování provádí adresa pro výběr, nikoli klíč validátoru.

### Částečné výběry {#partial-withdrawals}

Validátoři s pověřeními **typu 1** získávají automatické přesuny (sweeps) svého přebytečného zůstatku (vše nad 32 ETH) na svou adresu pro výběr bez poplatků za gas. Protože **typ 2** umožňuje validátoru úročit zůstatky v krocích po 1 ETH, nebude automaticky přesouvat zůstatky, dokud nedosáhne 2048 ETH. Částečné výběry u validátorů **typu 2** musí být spuštěny ručně a budou stát gas.

## Nástroje pro konsolidaci {#consolidation-tooling}

Ke správě konsolidací je k dispozici několik nástrojů. Oficiálním nástrojem, který vytvořila Nadace Ethereum, je [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Existují také nástroje třetích stran vytvořené subjekty ze stakingové komunity, které mohou nabízet funkce, jež Launchpad neposkytuje. Ačkoli zde uvedené nástroje nejsou auditovány ani podporovány Nadací Ethereum, jedná se o open source nástroje od známých členů komunity.

| Nástroj | Webová stránka | Open source | Tvůrce | Auditováno | Rozhraní | Významné funkce |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Ano, Apache-2.0 | [Pier Two](https://piertwo.com/) | Ne | Webové uživatelské rozhraní | WalletConnect, funguje se Safe |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Ano, MIT | [Luganodes](https://www.luganodes.com/) | Ano, Quantstamp [Květen 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Příkazový řádek | Dávkování, pro mnoho validátorů najednou |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Ano, Apache-2.0 | [Jim McDonald](https://www.attestant.io/team/) | Ne | Příkazový řádek | Kompletní sada funkcí pro správu validátoru a uzlu |
| Siren | [GitHub](https://github.com/sigp/siren) | Ano, Apache-2.0 | [Sigma Prime](https://sigmaprime.io/) | Ne | Částečně příkazový řádek, ale primárně webové uživatelské rozhraní | Funguje pouze pokud používáte konsensuální klient Lighthouse |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Ano, licence MIT | [Stakely](https://stakely.io/) | Ne | Webové uživatelské rozhraní, hostováno společností Stakely a připraveno k bezplatnému self-hostingu | Podporuje hlavní připojení peněženek včetně Safe s WalletConnect |

## Často kladené dotazy (FAQ) {#faq}

### Změní zapojení mé štěstí při návrhu nebo odměny? {#change-luck-or-rewards}

Ne. Zapojení nesnižuje vaši šanci na návrh – vaše povinnosti a výběr pro návrh zůstávají stejné. Pokud máte například dva validátory s 32 ETH oproti jednomu validátoru s 64 ETH, budete mít stejnou celkovou šanci, že budete vybráni k návrhu bloku a získáte odměny.

### Změní zapojení mé riziko penalizace? {#change-slashing-risk}

Pro menší nebo neprofesionální provozovatele je krátká odpověď ne. Delší odpověď zní, že pro profesionální provozovatele, kteří provozují mnoho validátorů na uzel s rychlým upozorňováním, může konsolidace do menšího počtu validátorů snížit jejich schopnost reagovat na penalizaci a zabránit kaskádovým událostem. Počáteční *pokuta* za penalizaci pro všechny validátory byla dramaticky snížena z 1 ETH (na 32 ETH) na 0,0078125 ETH (na 32 ETH), aby se toto riziko kompenzovalo.

### Musím provést výstup svého validátoru, abych mohl provést převod? {#exit-validator}

Ne. Převod můžete provést na místě bez výstupu.

### Jak dlouho bude trvat převod / konsolidace? {#how-long}

Minimálně 27,3 hodin, ale konsolidace také podléhají frontě. Tato fronta je nezávislá na frontách vkladů a výběrů a není jimi ovlivněna.

### Mohu si ponechat index svého validátoru? {#keep-validator-index}

Ano. Převod na místě zachovává stejný index validátoru. Pokud konsolidujete více validátorů, budete si moci ponechat pouze index *cílového validátoru*.

### Zmeškám atestace? {#miss-attestations}

Během konsolidace do jiného validátoru je u zdrojového validátoru proveden výstup a následuje čekací doba přibližně 27 hodin, než je zůstatek aktivní na cílovém validátoru. Toto období **neovlivňuje metriky výkonu**.

### Budou mi účtovány pokuty? {#incur-penalties}

Ne. Dokud je váš validátor online, nebudou vám účtovány žádné pokuty.

### Musí se adresy pro výběr konsolidovaných validátorů shodovat? {#withdrawal-addresses-match}

Ne. Ale *zdroj* musí autorizovat požadavek ze své vlastní adresy.

### Budou se mé odměny po převodu úročit? {#rewards-compound}

Ano. S pověřeními **typu 2** jsou odměny nad 32 ETH automaticky znovu stakovány (restaked) – ale ne okamžitě. Kvůli malé rezervě (nazývané [*hystereze*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)) musí váš zůstatek dosáhnout **o zhruba 1,25 ETH více**, než se přebytek znovu stakuje. Takže místo úročení při 33,0 ETH k němu dochází při 33,25 (efektivní zůstatek = 33 ETH), poté při 34,25 (efektivní zůstatek = 34 ETH) a tak dále.

### Mohu po převodu stále získávat automatické přesuny (sweeps)? {#automatic-sweep}

K automatickým přesunům dojde pouze u přebytečných zůstatků nad 2048. Všechny ostatní částečné výběry budete muset spouštět ručně.

### Mohu si to rozmyslet a vrátit se z typu 2 na typ 1? {#go-back-to-type1}

Ne. Převod na **typ 2** je nevratný.

### Pokud chci konsolidovat více validátorů, musím nejprve každý z nich převést na typ 2? {#consolidate-multiple-validators}

Ne! Převeďte jeden validátor na typ 2 a poté jej použijte jako cíl. Všechny ostatní validátory konsolidované do tohoto cíle typu 2 mohou být typu 1 nebo typu 2.

### Můj validátor je offline nebo má méně než 32 ETH – mohu jej stále převést? {#offline-or-below-32eth}

Ano. Dokud je aktivní (nebyl u něj proveden výstup) a můžete podepisovat jeho adresou pro výběr, můžete jej převést.

## Zdroje {#resources}

- [Specifikace konsensu Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): Toto je ta „nejpravdivější“ verze, na kterou byste se měli spolehnout. V případě pochybností si přečtěte specifikace
- Ne každý se rád probírá kódem, takže [tento maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) může pomoci s interpretací specifikací. *Upozornění: Jako na pravdu byste se měli spoléhat na specifikace, nikoli na umělou inteligenci, protože AI může informace špatně interpretovat nebo si odpovědi vymýšlet*
- [pectrified.com](https://pectrified.com/): Zobrazte si stav konsolidací, vkladů a čekacích dob ve frontě
- [Ethereal](https://github.com/wealdtech/ethereal): Komunitou vytvořený nástroj příkazového řádku (CLI) pro správu běžných úloh validátoru
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Komunitou vytvořený kontrakt, který umožňuje vložení prostředků pro více validátorů Etherea v jediné transakci