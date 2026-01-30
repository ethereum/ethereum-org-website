---
title: Wprowadzenie do mostów blockchain
description: Mosty pozwalają użytkownikom przenosić swoje środki pomiędzy różnymi blockchainami
lang: pl
---

# Mosty blockchain {#prerequisites}

_Web3 przekształcił się w ekosystem blockchainów warstwy 1 i rozwiązań skalujących warstwy 2, z których każdy ma unikalne możliwości i kompromisy. Wraz ze wzrostem liczby protokołów blockchain rośnie zapotrzebowanie na przenoszenie aktywów pomiędzy łańcuchami.Aby zaspokoić to zapotrzebowanie, potrzebujemy mostów._

<Divider />

## Czym są mosty? {#what-are-bridges}

Mosty blockchain działają podobnie jak mosty znane nam w świecie fizycznym. Tak jak fizyczny most łączy dwie fizyczne lokalizacje, most blockchain łączy dwa ekosystemy blockchain. **Mosty ułatwiają komunikację pomiędzy blockchainami poprzez transfer informacji i aktywów**.

Rozważmy przykład:

Jesteś z USA i planujesz podróż do Europy. Masz USD, ale potrzebujesz EUR do wydania. Aby wymienić USD na EUR, można skorzystać z kantoru wymiany walut za niewielką opłatą.

Ale co zrobić, jeśli chcesz dokonać podobnej wymiany, aby użyć innego [blockchaina](/glossary/#blockchain)? Powiedzmy, że chcesz wymienić [ETH](/glossary/#ether) w sieci głównej Ethereum na ETH na [Arbitrum](https://arbitrum.io/). Podobnie jak w przypadku wymiany walut na EUR potrzebujemy mechanizmu umożliwiającego przeniesienie ETH z Ethereum do Arbitrum. I właśnie mosty umożliwia taką transakcję. W tym przypadku [Arbitrum ma natywny most](https://portal.arbitrum.io/bridge), który może przenieść ETH z sieci głównej na Arbitrum.

## Dlaczego potrzebujemy mostów? {#why-do-we-need-bridges}

Wszystkie blockchainy mają swoje ograniczenia. Aby Ethereum mogło się skalować i nadążać za popytem, wymagało to [rollupów](/glossary/#rollups). Alternatywnie, warstwy 1 takie jak Solana i Avalanche, są zaprojektowane inaczej, aby umożliwić wyższą przepustowość, ale kosztem decentralizacji.

Jednakże wszystkie łańcuchy bloków są rozwijane w odizolowanych środowiskach i mają różne zasady oraz mechanizmy [konsensusu](/glossary/#consensus). Oznacza to, że nie mogą komunikować się w sposób naturalny, a tokeny nie mogą swobodnie przenosić się między blockchainami.

Mosty istnieją do łączenia sieci blockchain, umożliwiając transfer informacji i tokenów między nimi.

**Mosty umożliwiają**:

- międzyłańcuchowy transfer aktywów i informacji.
- [dapkom](/glossary/#dapp) dostęp do mocnych stron różnych łańcuchów bloków – zwiększając tym samym ich możliwości (ponieważ protokoły mają teraz więcej przestrzeni na innowacje).
- użytkownikom uzyskać dostęp do nowych platform i czerpać korzyści z różnych łańcuchów.
- deweloperom z różnych ekosystemów blockchainowych współpracę i tworzenie nowych platform dla użytkowników.

[Jak mostować tokeny na warstwę 2](/guides/how-to-use-a-bridge/)

<Divider />

## Przypadki użycia mostu {#bridge-use-cases}

Poniżej znajdują się niektóre scenariusze, w których możesz użyć mostu:

### Niższe opłaty transakcyjne {#transaction-fees}

Powiedzmy, że masz ETH na sieci głównej Ethereum, ale chcesz tańszych opłat za transakcje, aby przejrzeć i wypróbować różne zdecentralizowane aplikacje. Przenosząc swoje ETH z sieci głównej do pakietu zbiorczego warstwy 2 Ethereum, możesz cieszyć się niższymi opłatami transakcyjnymi.

### Dapki na innych łańcuchach bloków {#dapps-other-chains}

Jeśli korzystałeś z Aave w sieci głównej Ethereum, aby dostarczać USDT, ale oprocentowanie, które możesz otrzymać za dostarczanie USDT na Polygon za pomocą Aave jest wyższe.

### Odkrywaj ekosystemy łańcuchów bloków {#explore-ecosystems}

Jeśli posiadasz ETH w sieci głównej Ethereum i chcesz odkryć alternatywną warstwę 1, aby wypróbować ich natywne dapps. Możesz użyć mostu, aby przenieść swoje ETH z sieci głównej Ethereum do alternatywnej warstwy 1.

### Posiadaj natywne aktywa kryptowalutowe {#own-native}

Załóżmy, że chcesz posiadać natywny Bitcoin (BTC), ale masz środki tylko w sieci głównej Ethereum. Aby uzyskać ekspozycję na BTC na Ethereum, możesz kupić Wrapped Bitcoin (WBTC). Jednakże WBTC jest tokenem [ERC-20](/glossary/#erc-20) natywnym dla sieci Ethereum, co oznacza, że jest to wersja Bitcoina na Ethereum, a nie oryginalne aktywo na łańcuchu bloków Bitcoin. Aby posiadać natywne BTC, musiałbyś połączyć swoje aktywa z Ethereum do Bitcoina za pomocą mostu. Spowoduje to zmostkowanie WBTC i przekształcenie go w natywny BTC. Alternatywnie możesz posiadać BTC i chcieć go używać w protokołach [DeFi](/glossary/#defi) na Ethereum. Wymagałoby to mostkowania w drugą stronę, z BTC do WBTC, który można następnie wykorzystać jako aktywa na Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Wszystkie powyższe czynności możesz również wykonać za pomocą [giełdy scentralizowanej](/get-eth). Jeśli jednak Twoje środki nie znajdują się już na giełdzie, wymagałoby to wielu kroków i prawdopodobnie lepiej byłoby skorzystać z mostu.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Rodzaje mostów {#types-of-bridge}

Mosty mają wiele rodzajów konstrukcji i zawiłości. Ogólnie rzecz biorąc, mosty dzielą się na dwie kategorie: mosty zaufane i mosty niewymagające zaufania.

| Zaufane mosty                                                                                                                                                                                 | Mosty niewymagające zaufania                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operacje zaufanych mostów zależą od centralnego podmiotu lub systemu.                                                                                                         | Mosty bez zaufania działają przy użyciu inteligentnych kontraktów i algorytmów.                                                                             |
| Mają założenia dotyczące zaufania w odniesieniu do przechowywania funduszy i bezpieczeństwa mostu. Użytkownicy polegają głównie na reputacji operatora mostu. | Nie wymagają zaufania, tj. bezpieczeństwo mostu jest takie samo jak bezpieczeństwo bazowego blochainu.                                      |
| Użytkownicy muszą zrezygnować z kontroli nad swoimi aktywami kryptograficznymi.                                                                                               | Dzięki [inteligentnym kontraktom](/glossary/#smart-contract) mosty niewymagające zaufania umożliwiają użytkownikom zachowanie kontroli nad swoimi środkami. |

W skrócie możemy powiedzieć, że zaufane mosty mają założenia dotyczące zaufania, podczas gdy mosty bez zaufania są zminimalizowane pod względem zaufania i nie przyjmują nowych założeń dotyczących zaufania poza tymi z domen bazowych. Oto jak można opisać te terminy:

- **Niewymagające zaufania**: posiadające bezpieczeństwo równoważne z domenami podstawowymi. Jak opisuje [Arjun Bhuptani w tym artykule.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Założenia dotyczące zaufania:** odejście od bezpieczeństwa domen podstawowych poprzez dodanie do systemu zewnętrznych weryfikatorów, co czyni go mniej bezpiecznym kryptoekonomicznie.

Aby lepiej zrozumieć kluczowe różnice między tymi dwoma podejściami, weźmy przykład:

Wyobraź sobie, że jesteś w punkcie kontroli bezpieczeństwa na lotnisku. Istnieją dwa typy punktów kontrolnych:

1. Ręczne punkty kontrolne — obsługiwane przez urzędników, którzy ręcznie sprawdzają wszystkie szczegóły biletu i tożsamości przed wydaniem karty pokładowej.
2. Samodzielna odprawa — obsługiwana przez maszynę, w której wpisuje się dane lotu i otrzymuje kartę pokładową, jeśli wszystko się zgadza.

Ręczne punkty kontrolne są podobne do modelu zaufanego, ponieważ ich działanie zależy od strony trzeciej, tj. urzędników. Jako użytkownik ufasz urzędnikom, że podejmują właściwe decyzje i prawidłowo wykorzystują twoje prywatne informacje.

Samodzielna odprawa jest podobna do modelu bez zaufania, ponieważ eliminuje rolę operatora i wykorzystuje technologię do swoich operacji. Użytkownicy zawsze zachowują kontrolę nad swoimi danymi i nie muszą powierzać swoich prywatnych informacji osobom trzecim.

Wiele rozwiązań mostowych przyjmuje modele pomiędzy tymi dwoma skrajnościami z różnym stopniem braku zaufania.

<Divider />

## Korzystaj z mostów {#use-bridge}

Korzystanie z mostów pozwala na przenoszenie aktywów między różnymi blockchainami. Oto kilka źródeł, które mogą pomóc w znalezieniu i korzystaniu z mostów:

- **[Podsumowanie mostów L2BEAT](https://l2beat.com/bridges/summary) i [Analiza ryzyka mostów L2BEAT](https://l2beat.com/bridges/summary)**: kompleksowe podsumowanie różnych mostów, w tym szczegóły dotyczące udziału w rynku, typu mostu i łańcuchów docelowych. L2BEAT oferuje również analizę ryzyka mostów, pomagając użytkownikom w podejmowaniu świadomych decyzji przy wyborze mostu.
- **[Podsumowanie mostów DefiLlama](https://defillama.com/bridges/Ethereum)**: podsumowanie wolumenów na mostach w sieciach Ethereum.

<Divider />

## Ryzyko związane z korzystaniem z mostów {#bridge-risk}

Mosty są we wczesnej fazie rozwoju. Jest prawdopodobne, że optymalny projekt mostu nie został jeszcze odkryty. Interakcja z każdym rodzajem mostu wiąże się z ryzykiem:

- **Ryzyko inteligentnego kontraktu –** ryzyko błędu w kodzie, który może spowodować utratę środków użytkownika
- **Ryzyko technologiczne –** awaria oprogramowania, błędny kod, błąd ludzki, spam i złośliwe ataki mogą potencjalnie zakłócić działanie użytkownika

Co więcej, ponieważ zaufane mosty dodają założenia dotyczące zaufania, niosą ze sobą dodatkowe ryzyko, takie jak:

- **Ryzyko cenzury –** operatorzy mostów mogą teoretycznie uniemożliwić użytkownikom transfer aktywów za pomocą mostu
- **Ryzyko powiernicze –** operatorzy mostów mogą wejść w zmowę w celu kradzieży środków użytkowników

Środki użytkownika są zagrożone, jeśli:

- w inteligentnym kontrakcie występuje błąd
- użytkownik popełni błąd
- bazowy blockchain zostanie zhakowany
- operatorzy mostów mają złośliwe zamiary w zaufanym moście
- most zostanie zhakowany

Jednym z niedawnych ataków hakerskich było włamanie na most Wormhole Solany, [w którego trakcie skradziono 120 tys. wETH (325 mln USD)](https://rekt.news/wormhole-rekt/). Wiele z [największych ataków hakerskich na łańcuchach bloków dotyczyło mostów](https://rekt.news/leaderboard/).

Mosty mają kluczowe znaczenie dla wdrażania użytkowników do Ethereum, a nawet dla użytkowników, którzy chcą odkrywać różne ekosystemy. Biorąc jednak pod uwagę ryzyko związane z interakcją z mostami, użytkownicy muszą rozumieć kompromisy, jakie mosty podejmują. Oto kilka [strategii bezpieczeństwa międzyłańcuchowego](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Dalsza lektura {#further-reading}

- [EIP-5164: Wykonanie międzyłańcuchowe](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) – _18 czerwca 2022 r. – Brendan Asselstine_
- [Ramy analizy ryzyka mostów L2 (L2Bridge Risk Framework)](https://gov.l2beat.com/t/l2bridge-risk-framework/31) – _5 lipca 2022 r. – Bartek Kiepuszewski_
- ["Dlaczego przyszłość będzie wielołańcuchowa, ale nie międzyłańcuchowa"](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) – _8 stycznia 2022 r. – Vitalik Buterin_
- [Wykorzystanie współdzielonego bezpieczeństwa dla bezpiecznej interoperacyjności międzyłańcuchowej: Komitety Stanu Lagrange'a i nie tylko](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) – _12 czerwca 2024 r. – Emmanuel Awosika_
- [Stan rozwiązań interoperacyjności rollupów](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) – _20 czerwca 2024 r. – Alex Hook_

