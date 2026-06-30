---
title: Jak rozpoznat podvodné tokeny
description: Porozumění podvodným tokenům, jak se tváří jako legitimní a jak se jim vyhnout.
lang: cs
---

Jedním z nejčastějších způsobů využití Etherea je vytvoření obchodovatelného tokenu určitou skupinou, v podstatě jejich vlastní měny. Tyto tokeny obvykle dodržují standard [ERC-20](/developers/docs/standards/tokens/erc-20/). Nicméně všude tam, kde existují legitimní případy užití přinášející hodnotu, se najdou i zločinci, kteří se tuto hodnotu snaží ukrást pro sebe.

Existují dva pravděpodobné způsoby, jakými se vás pokusí oklamat:

- **Prodejem podvodného tokenu**, který může vypadat jako legitimní token, jenž si chcete koupit, ale je vydán podvodníky a nemá žádnou hodnotu.
- **Oklamáním, abyste podepsali škodlivé transakce**, obvykle tím, že vás přesměrují do svého vlastního uživatelského rozhraní. Mohou se vás pokusit přimět, abyste jejich kontraktům udělili povolený limit na vaše ERC-20 tokeny, odhalili citlivé informace, které jim poskytnou přístup k vašim aktivům, atd. Tato uživatelská rozhraní mohou být téměř dokonalými klony poctivých stránek, ale se skrytými triky.

Abychom si ukázali, co jsou podvodné tokeny a jak je rozpoznat, podíváme se na jeden příklad: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Tento token se snaží vypadat jako legitimní token [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Co je ARB?"
contentPreview=''>

Arbitrum je organizace, která vyvíjí a spravuje [optimistic rollupy](/developers/docs/scaling/optimistic-rollups/). Původně bylo Arbitrum organizováno jako zisková společnost, ale poté podniklo kroky k decentralizaci. Jako součást tohoto procesu vydali obchodovatelný [token správy](/dao/#token-based-membership).

</ExpandableCard>

<ExpandableCard
title="Proč se podvodný token nazývá wARB?"
contentPreview=''>

V Ethereu existuje konvence, že když aktivum není kompatibilní s ERC-20, vytvoříme jeho „zabalenou“ (wrapped) verzi s názvem začínajícím na „w“. Takže například máme wBTC pro bitcoin a <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH pro ether</a>.

Nedává smysl vytvářet zabalenou verzi ERC-20 tokenu, který již na Ethereu je, ale podvodníci spoléhají spíše na zdání legitimity než na základní realitu.

</ExpandableCard>

## Jak fungují podvodné tokeny? {#how-do-scam-tokens-work}

Celým smyslem Etherea je decentralizace. To znamená, že neexistuje žádná centrální autorita, která by vám mohla zabavit vaše aktiva nebo vám zabránit nasadit chytrý kontrakt. Znamená to ale také, že podvodníci mohou nasadit jakýkoli chytrý kontrakt, který si přejí.

<ExpandableCard
title="Co jsou chytré kontrakty?"
contentPreview=''>

[Chytré kontrakty](/developers/docs/smart-contracts/) jsou programy, které běží nad blockchainem Etherea. Například každý ERC-20 token je implementován jako chytrý kontrakt.

</ExpandableCard>

Konkrétně Arbitrum nasadilo kontrakt, který používá symbol `ARB`. To ale nebrání ostatním lidem, aby také nasadili kontrakt, který používá naprosto stejný nebo podobný symbol. Ten, kdo kontrakt napíše, může určit, co bude kontrakt dělat.

## Zdání legitimity {#appearing-legitimate}

Existuje několik triků, které tvůrci podvodných tokenů používají, aby působili legitimně.

- **Legitimní název a symbol**. Jak již bylo zmíněno, ERC-20 kontrakty mohou mít stejný symbol a název jako jiné ERC-20 kontrakty. Na tato pole se z hlediska bezpečnosti nemůžete spoléhat.

- **Legitimní vlastníci**. Podvodné tokeny často provádějí airdrop významných zůstatků na adresy, u kterých se dá očekávat, že jsou legitimními držiteli skutečného tokenu.

  Podívejme se například znovu na `wARB`. [Asi 16 % tokenů](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) drží adresa, jejíž veřejná značka je [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Toto _není_ falešná adresa, je to skutečně adresa, která [nasadila skutečný kontrakt ARB na Ethereum Mainnet](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Protože ERC-20 zůstatek adresy je součástí úložiště ERC-20 kontraktu, může být kontraktem specifikován na jakoukoli hodnotu, kterou si vývojář kontraktu přeje. Je také možné, aby kontrakt zakázal převody, takže se legitimní uživatelé nebudou moci těchto podvodných tokenů zbavit.

- **Legitimní převody**. _Legitimní vlastníci by neplatili za převod podvodného tokenu jiným osobám, takže pokud dochází k převodům, musí to být legitimní, že?_ **Omyl**. Události `Transfer` jsou produkovány ERC-20 kontraktem. Podvodník může snadno napsat kontrakt takovým způsobem, že bude tyto akce produkovat.

## Podvodné webové stránky {#websites}

Podvodníci mohou také vytvořit velmi přesvědčivé webové stránky, někdy dokonce přesné klony autentických stránek s identickým uživatelským rozhraním, ale s nenápadnými triky. Příkladem mohou být externí odkazy, které se zdají být legitimní, ale ve skutečnosti uživatele přesměrují na externí podvodnou stránku, nebo nesprávné pokyny, které uživatele navedou k odhalení jeho klíčů nebo odeslání prostředků na adresu útočníka.

Nejlepším postupem, jak se tomu vyhnout, je pečlivě kontrolovat URL adresy navštěvovaných stránek a ukládat si adresy známých autentických stránek do záložek. Poté můžete na skutečnou stránku přistupovat přes své záložky, aniž byste omylem udělali překlep nebo se spoléhali na externí odkazy.

## Jak se můžete chránit? {#protect-yourself}

1. **Zkontrolujte adresu kontraktu**. Legitimní tokeny pocházejí od legitimních organizací a adresy kontraktů můžete najít na webových stránkách dané organizace. Například [pro `ARB` můžete vidět legitimní adresy zde](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Skutečné tokeny mají likviditu**. Další možností je podívat se na velikost fondu likvidity na [Uniswapu](https://uniswap.org/), jednom z nejběžnějších protokolů pro směnu tokenů. Tento protokol funguje pomocí fondů likvidity, do kterých investoři vkládají své tokeny v naději na výnos z poplatků za obchodování.

Podvodné tokeny mají obvykle nepatrné fondy likvidity, pokud vůbec nějaké, protože podvodníci nechtějí riskovat skutečná aktiva. Například fond `ARB`/`ETH` na Uniswapu drží zhruba milion dolarů ([aktuální hodnotu najdete zde](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) a nákup nebo prodej malého množství nezmění cenu:

![Buying a legitimate token](./uniswap-real.png)

Když se ale pokusíte koupit podvodný token `wARB`, i nepatrný nákup by změnil cenu o více než 90 %:

![Buying a scam token](./uniswap-scam.png)

To je další důkaz, který nám ukazuje, že `wARB` pravděpodobně není legitimní token.

3. **Podívejte se na Etherscan**. Mnoho podvodných tokenů již bylo komunitou identifikováno a nahlášeno. Takové tokeny jsou [označeny na Etherscanu](https://info.etherscan.com/etherscan-token-reputation/). Ačkoli Etherscan není autoritativním zdrojem pravdy (je přirozeností decentralizovaných sítí, že nemůže existovat autoritativní zdroj legitimity), tokeny, které Etherscan identifikuje jako podvody, jimi pravděpodobně skutečně jsou.

   ![Scam token in Etherscan](./etherscan-scam.png)

## Závěr {#conclusion}

Dokud bude na světě existovat hodnota, budou existovat i podvodníci, kteří se ji pokusí ukrást pro sebe, a v decentralizovaném světě není nikdo, kdo by vás ochránil, kromě vás samotných. Doufejme, že si zapamatujete tyto body, které vám pomohou rozeznat legitimní tokeny od těch podvodných:

- Podvodné tokeny se vydávají za legitimní tokeny, mohou používat stejný název, symbol atd.
- Podvodné tokeny _nemohou_ používat stejnou adresu kontraktu.
- Nejlepším zdrojem adresy legitimního tokenu je organizace, které token patří.
- Pokud to není možné, můžete použít populární a důvěryhodné aplikace, jako jsou [Uniswap](https://app.uniswap.org/#/swap) a [Blockscout](https://eth.blockscout.com/).
