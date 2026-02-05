---
title: "Úvod do přemostění blokchainů"
description: "Přemostění umožňují uživatelům přesouvat aktiva mezi různými blockchainy"
lang: cs
---

# Blockchainová přemostění {#prerequisites}

_Web3 se vyvinul do ekosystému L1 blockchainů a L2 škálovacích řešení, která mají specifické výhody i nedostatky. S rostoucím počtem blockchainových protokolů roste i poptávka po přesunu aktiv mezi různými blockchainy.Abychom tuto poptávku uspokojili, potřebujeme přemostění._

<Divider />

## Co je přemostění? {#what-are-bridges}

Přemostění mezi blockchainy funguje podobně jako most, který známe ve fyzickém světě. Stejně jako fyzický most spojuje dvě fyzické lokality, přemostění mezi blockchainy spojuje dva ekosystémy blockchainů. **Přemostění umožňuje komunikaci mezi blockchainy prostřednictvím přenosu informací a prostředků**.

Vezměme si příklad:

Jste z USA a plánujete cestu do Evropy. Máte USD, ale potřebujete EUR na útratu. Chcete-li své USD směnit na EUR, můžete využít služeb směnárny. Ta vám pravděpodobně naúčtuje nějaký poplatek.

Ale co uděláte, pokud chcete provést podobnou směnu, abyste své prostředky mohli používat na jiném [blockchainu](/glossary/#blockchain)? Řekněme, že chcete směnit [ETH](/glossary/#ether) na Mainnetu Etherea za ETH na [Arbitru](https://arbitrum.io/). Stejně jako jsme pro směnu USD na EUR využili služeb směnárny, potřebujeme mechanismus k přesunu našeho ETH z Mainnetu Etherea na Arbitrum. Právě přemostění umožňují provádění takovýchto transakcí. V tomto případě má [Arbitrum své vlastní přemostění](https://portal.arbitrum.io/bridge), které umožňuje převádět ETH z Mainnetu na Arbitrum.

## Proč přemostění potřebujeme? {#why-do-we-need-bridges}

Každý blockchain má nějaké omezení. Aby mohlo Ethereum zvyšovat škálovatelnost a držet krok s poptávkou, potřebuje [rollupy](/glossary/#rollups). Naopak L1 blockchainy, jako je Solana a Avalanche, jsou navrženy tak, aby umožnily vyšší propustnost transakcí, ale za cenu nižší decentralizace.

Všechny blockchainy jsou však vyvíjeny v izolovaných prostředích a mají odlišná pravidla a mechanismy [konsensu](/glossary/#consensus). To znamená, že spolu nejsou schopny komunikovat a tokeny není možné volně přesouvat mezi blockchainy.

Přemostění existují k propojení blockchainů, umožňují přenos informací a tokenů.

**Přemostění umožňují**:

- převod prostředků a informací mezi blockchainy.
- [dappkám](/glossary/#dapp) přistupovat k výhodám různých blockchainů, což zvyšuje jejich funkčnost (protože protokoly mají nyní více prostoru pro inovace).
- uživatelům přístup k novým platformám a využívání výhod různých blockchainů.
- vývojářům z různých blockchainových ekosystémů spolupracovat a budovat nové platformy pro uživatele.

[Jak přemostit tokeny na druhou vrstvu](/guides/how-to-use-a-bridge/)

<Divider />

## Případy použití přemostění {#bridge-use-cases}

Podívejte se na některé možnosti využití přemostění mezi blockchainy:

### Nižší transakční poplatky {#transaction-fees}

Představte si, že máte ETH na hlavní síti Ethereum, ale chtěli byste platit nižší transakční poplatky, abyste mohli vyzkoušet různé dappky. Přemostění vám umožní převést ETH z hlavní sítě na Ethereum L2 rollup a mít tak nižší transakční poplatky.

### Dapps na jiných blockchainech {#dapps-other-chains}

Pokud jste používali Aave na hlavní síti Etherea k poskytování půjček v USDT, ale úroková sazba pro půjčování USDT pomocí Aave na Polygonu je vyšší.

### Prozkoumejte blockchainové ekosystémy {#explore-ecosystems}

Máte-li ETH na hlavní síti Ethereum a chcete prozkoumat alternativní L1 blockchain a vyzkoušet tamní dappky. Pomocí přemostění můžete převést své ETH z hlavní sítě Ethereum na alternativní L1.

### Vlastnictví nativních kryptoaktiv {#own-native}

Představte si, že si chcete koupit Bitcoin (BTC), ale máte peníze pouze na hlavní síti Ethereum. Abyste získali BTC zastoupený na Ethereu, můžete si koupit Wrapped Bitcoin (WBTC). WBTC je ale [ERC-20](/glossary/#erc-20) token nativní pro síť Ethereum, což znamená, že jde o verzi Bitcoinu na Ethereu a nikoli o původní aktivum na blockchainu Bitcoinu. Abyste mohli vlastnit původní BTC, musíte svá aktiva převést z Etherea na Bitcoin pomocí přemostění. Tímto způsobem převedete svůj WBTC na BTC. Alternativně můžete vlastnit BTC a chtít jej použít v protokolech [DeFi](/glossary/#defi) na Ethereu. To by vyžadovalo přemostění opačným směrem, tedy z BTC na WBTC, který lze pak použít jako aktivum na Ethereu.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Vše výše uvedené můžete provést také pomocí [centralizované burzy](/get-eth). Ale pokud vaše prostředky ještě na burze nejsou, zahruje taková operace vícero kroků, a pravděpodobně bude jednodušší použít přemostění.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Typy přemostění {#types-of-bridge}

Různá přemostění mají různý design a jsou různě složitá. Obecně je lze rozdělit do dvou kategorií: Centralizovaná - těm musíte věřit - a decentralizovaná, která jsou řízena smart kontrakty.

| Přemostění s nutností další důvěry                                                                                                                                               | Přemostění bez nutnosti další důvěry                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jejich provoz závisí na centrální entitě nebo systému.                                                                                                           | Fungují pomocí chytrých kontraktů a algoritmů.                                                                                                          |
| Musíte důvěřovat třetí straně, pokud jde o zabezpečení prostředků a procesu přemostění. Uživatelé se většinou spoléhají na pověst provozovatele. | Neexistuje třetí strana, které byste byli nuceni důvěřovat, což znamená, že zabezpečení mostu je stejné jako zabezpečení základního blockchainu.        |
| Uživatelé musí odevzdat kontrolu nad svými kryptoměnovými prostředky.                                                                                            | Přemostění bez nutnosti důvěry využívají [chytré kontrakty](/glossary/#smart-contract) a umožňují uživatelům ponechat si kontrolu nad svými prostředky. |

Ve zkratce: Centralizovaným řešením přemostění musíte prostě věřit, zatímco decentralizovaná přemostění nevyžadují větší míru důvěry než tu, kterou už máte v blockchain, na kterém jsou spuštěny. Zde je vysvětlení těchto pojmů:

- **Bez nutnosti důvěry**: zabezpečení je ekvivalentní podkladovým doménám. Jak popisuje [Arjun Bhuptani v tomto článku.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **S nutností další důvěry:** odchylují se od zabezpečení podkladových domén přidáním externích ověřovatelů do systému, což způsobuje menší kryptoekonomickou bezpečnost.

Pro lepší pochopení hlavních rozdílů mezi oběma přístupy si vezměme příklad:

Představte si, že se chcete odbavit na letišti. Existují dva typy odbavení:

1. Manuální odbavení – mluvíte s úředníky, kteří ručně kontrolují všechny údaje o vaší letence a identitě, než vám vydají palubní lístek.
2. Samoobslužné odbavení – přijdete k automatu, kam zadáte údaje o svém letu a obdržíte palubní lístek, pokud je vše v pořádku.

Ruční odbavení je podobné modelu s nutností další důvěry, protože jeho provoz závisí na třetí straně (v našem příkladu na úřednících). Jako uživatelé věříte úředníkům, že udělají správná rozhodnutí a korektně využijí vaše soukromé informace.

Samoobslužné odbavení je podobné modelu bez nutnosti další důvěry, protože nemá žádného operátora a funguje za pomoci technologie. Uživatelé neztrácejí kontrolu nad svými daty a nemusejí ohledně svých soukromých informací důvěřovat třetí straně.

Většina řešení přemostění aplikuje modely s různými stupni důvěry, která se pohybují mezi těmito dvěma extrémy.

<Divider />

## Použití přemostění {#use-bridge}

Přemostění vám umožňují přesouvat aktiva mezi různými blockchainy. Zde je několik zdrojů, které vám mohou pomoci najít a používat přemostění:

- **[Souhrn přemostění L2BEAT](https://l2beat.com/bridges/summary) a [Analýza rizik přemostění L2BEAT](https://l2beat.com/bridges/summary)**: Komplexní souhrn různých přemostění, včetně podrobností o podílu na trhu, typu přemostění a cílových blockchainech. L2BEAT rovněž obsahuje analýzu rizik pro přemostění, která uživatelům při výběru přemostění pomáhá činit informovaná rozhodnutí.
- **[Souhrn přemostění DefiLlama](https://defillama.com/bridges/Ethereum)**: Souhrn objemů přemostění napříč sítěmi Ethereum.

<Divider />

## Rizika použití přemostění {#bridge-risk}

V současné době se nacházíme v rané fázi vývoje těchto řešení. Je pravděpodobné, že optimální návrh přemostění zatím nebyl vyvinut. Interakce s jakýmkoli typem přemostění nese rizika:

- **Riziko chytrého kontraktu —** riziko chyby v kódu, která může způsobit ztrátu prostředků uživatele
- **Technologické riziko —** selhání softwaru, chybový kód, lidská chyba, spam a škodlivé útoky mohou narušit operace uživatele

Přemostění s nutností další důvěry navíc nesou dodatečná rizika spojená právě se zvýšenou nutností důvěry, jako jsou:

- **Riziko cenzury —** provozovatelé přemostění mohou teoreticky zabránit uživatelům v převodu jejich aktiv pomocí přemostění
- **Riziko úschovy —** provozovatelé přemostění se mohou domluvit a ukrást prostředky uživatelů

Finanční prostředky uživatele jsou v ohrožení, pokud:

- je v chytrém kontraktu chyba
- uživatel udělá chybu
- blockchain, na kterém je přemostění spuštěno, je napaden
- provozovatelé přemostění mejí dobré úmysly
- přemostění je pod útokem hackera

Jedním z nedávných hacků bylo přemostění Wormhole na Solaně, [při kterém bylo ukradeno 120k wETH (325 milionů USD)](https://rekt.news/wormhole-rekt/). Mnoho z [největších hacků v historii blockchainu zahrnovalo přemostění](https://rekt.news/leaderboard/).

Přemostění jsou klíčová pro vstup uživatelů do 2. vrstev Etherea, stejně jako pro možnost prozkoumání jiných ekosystémů. Nicméně uživatelé musí porozumět rizikům, které používání přemostění přináší. Zde jsou některé [strategie pro meziřetězcové zabezpečení](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Další čtení {#further-reading}

- [EIP-5164: Meziřetězcové provádění](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) – _18. června 2022 – Brendan Asselstine_
- [Rámec rizik přemostění L2](https://gov.l2beat.com/t/l2bridge-risk-framework/31) – _5. července 2022 – Bartek Kiepuszewski_
- [„Proč bude budoucnost víceřetězcová, ale ne meziřetězcová.“](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) – _8. ledna 2022 – Vitalik Buterin_
- [Využití sdíleného zabezpečení pro bezpečnou meziřetězcovou interoperabilitu: Lagrangeovy stavové komise a dále](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) – _12. června 2024 – Emmanuel Awosika_
- [Stav řešení interoperability rollupů](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) – _20. června 2024 – Alex Hook_

