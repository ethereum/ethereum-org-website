---
title: "Jak rozpoznat podvodné tokeny"
description: "Co jsou podvodné tokeny, jak se snaží vypadat legitimně a jak se jim vyhnout."
lang: cs
---

# Jak rozpoznat podvodné tokeny {#identify-scam-tokens}

Jedním z nejčastějších způsobů využití Etherea je vytvoření obchodovatelného tokenu pro skupinu, v podstatě jejich vlastní měny. Tyto tokeny obvykle dodržují standard [ERC-20](/developers/docs/standards/tokens/erc-20/). Kdekoliv, kde existují legitimní případy použití, které přinášejí hodnotu, se také objevují i zločinci, kteří se snaží tuto hodnotu ukrást pro sebe.

Existují dva způsoby, jak vás mohou oklamat:

- **Prodat vám podvodný token**, který může vypadat jako legitimní token, který chcete koupit, ale je vydán podvodníky a nemá žádnou hodnotu.
- **Přimět vás k podepsání škodlivých transakcí**, obvykle tím, že vás nasměrují na své vlastní uživatelské rozhraní. Mohou se vás pokusit přimět k tomu, abyste jim poskytli příspěvek na vaše ERC-20 tokeny, odhalili citlivé informace, které jim umožní přístup k vašim aktivům, atd. Tato uživatelská rozhraní mohou být téměř dokonalými klony poctivých stránek, ale se skrytými triky.

Abychom si ukázali, co jsou to podvodné tokeny a jak je identifikovat, podíváme se na jeden příklad: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Tento token se snaží vypadat jako legitimní token [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Co je ARB?"
contentPreview=''>

Arbitrum je organizace, která vyvíjí a spravuje [optimistické rollupy](/developers/docs/scaling/optimistic-rollups/). Zpočátku byla společnost Arbitrum organizována jako ziskový podnik, ale poté podnikla kroky k decentralizaci. V rámci tohoto procesu vydali obchodovatelný [správní token](/dao/#token-based-membership).
</ExpandableCard>

<ExpandableCard
title="Proč se podvodný token jmenuje wARB?"
contentPreview=''>

V Ethereu platí konvence, že pokud aktivum není kompatibilní s ERC-20, vytvoříme jeho "zabalenou" verzi s názvem začínajícím na "w". Takže máme například wBTC pro bitcoin a <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH pro ether</a>.

Nemá smysl vytvářet zabalenou verzi tokenu ERC-20, který již na Ethereu je, ale podvodníci spoléhají spíše na zdání legitimity než na realitu.
</ExpandableCard>

## Jak fungují podvodné tokeny? {#how-do-scam-tokens-work}

Smyslem Etherea je decentralizace. To znamená, že neexistuje žádná centrální autorita, která by vám mohla zabavit majetek nebo vám zabránit v nasazení chytrého kontraktu. Znamená to ale také, že podvodníci mohou nasadit libovolný chytrý kontrakt.

<ExpandableCard
title="Co jsou chytré kontrakty?"
contentPreview=''>

[Chytré kontrakty](/developers/docs/smart-contracts/) jsou programy, které běží na blockchainu Ethereum. Například, každý ERC-20 token je implementován jako chytrý kontrakt.
</ExpandableCard>

Konkrétně společnost Arbitrum nasadila kontrakt, který používá symbol `ARB`. To však nebrání ostatním lidem, aby také nasadili kontrakt, který používá stejný nebo podobný symbol. Ten, kdo kontrakt sepisuje, určuje, co bude kontrakt dělat.

## Zdánlivá legitimita {#appearing-legitimate}

Tvůrci podvodných tokenů používají několik triků, aby vypadali legitimně.

- **Legitimní název a symbol**. Jak již bylo zmíněno, ERC-20 kontrakty mohou mít stejný symbol a název jako jiné ERC-20 kontrakty. Na tato pole se nemůžete z hlediska bezpečnosti spolehnout.

- **Legitimní vlastníci**. Podvodné tokeny často posílají značné zůstatky na adresy, u kterých lze předpokládat, že jsou legitimními držiteli skutečného tokenu.

  Podívejme se například znovu na `wARB`. [Asi 16 % tokenů](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) drží adresa, jejíž veřejný štítek je [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Toto _není_ falešná adresa, je to skutečně adresa, která [nasadila skutečný kontrakt ARB na mainnetu Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Protože je zůstatek ERC-20 adresy součástí úložiště ERC-20 kontraktu, může být ve smlouvě specifikován tak, jak si tvůrce smlouvy přeje. Je také možné, že smlouva zakáže převody, aby se legitimní uživatelé nemohli těchto podvodných tokenů zbavit.

- **Legitimní převody**. _Legitimní vlastníci by neplatili za převod podvodného tokenu jiným lidem, takže pokud dochází k převodům, musí být legitimní, ne?_ **Špatně**. Události `Transfer` jsou vytvářeny kontraktem ERC-20. Podvodník může snadno sepsat smlouvu tak, aby vedla k těmto úkonům.

## Podvodné webové stránky {#websites}

Podvodníci mohou také vytvářet velmi přesvědčivé webové stránky, někdy dokonce přesné klony s identickým uživatelským rozhraním, ale s rafinovanými triky. Příkladem mohou být externí odkazy, které se zdají být legitimní, ale ve skutečnosti odesílají uživatele na externí podvodnou stránku, nebo nesprávné pokyny, které vedou uživatele k vyzrazení klíčů nebo odeslání finančních prostředků na adresu útočníka.

Nejlepší postup, jak se tomu vyhnout, je pečlivě kontrolovat URL adresy navštívených stránek a ukládat adresy známých autentických stránek do záložek. Pak můžete navštěvovat skutečný web prostřednictvím záložek, aniž byste omylem udělali pravopisné chyby nebo se spoléhali na externí odkazy.

## Jak se můžete chránit? Jak se chránit {#protect-yourself}

1. **Zkontrolujte adresu kontraktu**. Legitimní tokeny pocházejí od legitimních organizací a jejich adresy kontraktů si můžete prohlédnout na webových stránkách organizace. Například [pro `ARB` si můžete legitimní adresy prohlédnout zde](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Pravé tokeny mají likviditu**. Další možností je podívat se na velikost poolu likvidity na [Uniswap](https://uniswap.org/), jednom z nejběžnějších protokolů pro výměnu tokenů. Tento protokol funguje na bázi poolů likvidity, do kterých investoři vkládají své tokeny v naději na výnos z poplatků za obchodování.

Podvodné tokeny mají obvykle jen malou likviditu, pokud vůbec nějakou, protože podvodníci nechtějí riskovat skutečná aktiva. Například pool `ARB`/`ETH` na Uniswapu drží asi milion dolarů ([aktuální hodnotu najdete zde](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) a nákup nebo prodej malého množství cenu nezmění:

![Nákup legitimního tokenu](./uniswap-real.png)

Ale když se pokusíte koupit podvodný token `wARB`, i nepatrný nákup by změnil cenu o více než 90 %:

![Nákup podvodného tokenu](./uniswap-scam.png)

To je další důkaz, který nám ukazuje, že `wARB` pravděpodobně není legitimní token.

3. **Podívejte se na Etherscan**. Komunita již identifikovala a nahlásila mnoho podvodných tokenů. Takové tokeny jsou [označeny na Etherscanu](https://info.etherscan.com/etherscan-token-reputation/). Ačkoli Etherscan není autoritativním zdrojem pravdy (z povahy decentralizovaných sítí vyplývá, že nemůže existovat autoritativní zdroj legitimity), tokeny, které Etherscan identifikuje jako podvodné, pravděpodobně podvodné jsou.

   ![Podvodný token na Etherscanu](./etherscan-scam.png)

## Závěr {#conclusion}

Dokud budou na světě existovat hodnoty, budou existovat podvodníci, kteří se je budou snažit ukrást pro sebe, a v decentralizovaném světě není nikdo, kdo by vás chránil, kromě vás samotných. Doufejme, že si zapamatujete tyto body, které vám pomohou rozlišit legitimní tokeny od podvodných:

- Podvodné tokeny se vydávají za legitimní tokeny, mohou používat stejný název, symbol atd.
- Podvodné tokeny _nemohou_ používat stejnou adresu kontraktu.
- Nejlepším zdrojem adresy legitimního tokenu je organizace, o jejíž token se jedná.
- Pokud to selže, můžete použít oblíbené a důvěryhodné aplikace, jako jsou [Uniswap](https://app.uniswap.org/#/swap) a [Blockscout](https://eth.blockscout.com/).
