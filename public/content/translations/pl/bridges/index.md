---
title: Mosty blockchain
metaTitle: Wprowadzenie do mostów blockchain
description: Mosty pozwalają użytkownikom na przenoszenie środków między różnymi blockchainami
lang: pl
---

_Web3 ewoluowało w ekosystem blockchainów warstwy 1 (L1) i rozwiązań skalujących warstwy 2 (L2), z których każde zostało zaprojektowane z unikalnymi możliwościami i kompromisami. Wraz ze wzrostem liczby protokołów blockchain rośnie również zapotrzebowanie na przenoszenie aktywów między łańcuchami. Aby zaspokoić to zapotrzebowanie, potrzebujemy mostów._

<Divider />

## Czym są mosty? {#what-are-bridges}

Mosty blockchain działają tak samo, jak mosty, które znamy w świecie fizycznym. Podobnie jak fizyczny most łączy dwie fizyczne lokalizacje, most blockchain łączy dwa ekosystemy blockchain. **Mosty ułatwiają komunikację między blockchainami poprzez transfer informacji i aktywów**.

Rozważmy przykład:

Jesteś z USA i planujesz podróż do Europy. Masz USD, ale potrzebujesz EUR na wydatki. Aby wymienić USD na EUR, możesz skorzystać z kantoru za niewielką opłatą.

Ale co zrobić, jeśli chcesz dokonać podobnej wymiany, aby użyć innego [blockchaina](/glossary/#blockchain)? Powiedzmy, że chcesz wymienić [ETH](/glossary/#ether) w [sieci głównej Ethereum](/) na ETH w sieci [Arbitrum](https://arbitrum.io/). Podobnie jak w przypadku wymiany walut na EUR, potrzebujemy mechanizmu do przeniesienia naszego ETH z Ethereum do Arbitrum. Mosty umożliwiają taką transakcję. W tym przypadku [Arbitrum ma natywny most](https://portal.arbitrum.io/bridge), który może przetransferować ETH z Sieci głównej do Arbitrum.

## Dlaczego potrzebujemy mostów? {#why-do-we-need-bridges}

Wszystkie blockchainy mają swoje ograniczenia. Aby Ethereum mogło się skalować i nadążać za popytem, wymagało [rollupów](/glossary/#rollups). Z kolei blockchainy warstwy 1 (L1), takie jak Solana i Avalanche, są zaprojektowane inaczej, aby umożliwić wyższą przepustowość, ale kosztem decentralizacji.

Jednak wszystkie blockchainy są rozwijane w odizolowanych środowiskach i mają różne zasady oraz mechanizmy [konsensusu](/glossary/#consensus). Oznacza to, że nie mogą się natywnie komunikować, a tokeny nie mogą swobodnie przemieszczać się między blockchainami.

Mosty istnieją po to, aby łączyć blockchainy, umożliwiając transfer informacji i tokenów między nimi.

**Mosty umożliwiają**:

- międzyłańcuchowy transfer aktywów i informacji.
- [zdecentralizowanym aplikacjom (dapp)](/glossary/#dapp) dostęp do mocnych stron różnych blockchainów – zwiększając w ten sposób ich możliwości (ponieważ protokoły mają teraz więcej przestrzeni projektowej na innowacje).
- użytkownikom dostęp do nowych platform i korzystanie z zalet różnych łańcuchów.
- programistom z różnych ekosystemów blockchain współpracę i budowanie nowych platform dla użytkowników.

[Jak przenieść tokeny przez most do warstwy 2 (L2)](/guides/how-to-use-a-bridge/)

<Divider />

## Przypadki użycia mostów {#bridge-use-cases}

Oto kilka scenariuszy, w których możesz użyć mostu:

### Niższe opłaty transakcyjne {#transaction-fees}

Powiedzmy, że masz ETH w sieci głównej Ethereum, ale chcesz niższych opłat transakcyjnych, aby eksplorować różne dappy. Przenosząc swoje ETH z Sieci głównej do rollupa warstwy 2 (L2) Ethereum, możesz cieszyć się niższymi opłatami transakcyjnymi.

### Dappy na innych blockchainach {#dapps-other-chains}

Jeśli używałeś Aave w sieci głównej Ethereum do dostarczania USDT, ale stopa procentowa, którą możesz otrzymać za dostarczanie USDT za pomocą Aave na Polygon, jest wyższa.

### Eksploracja ekosystemów blockchain {#explore-ecosystems}

Jeśli masz ETH w sieci głównej Ethereum i chcesz wypróbować alternatywny blockchain warstwy 1 (L1), aby przetestować jego natywne dappy. Możesz użyć mostu, aby przetransferować swoje ETH z sieci głównej Ethereum do alternatywnego L1.

### Posiadanie natywnych kryptoaktywów {#own-native}

Powiedzmy, że chcesz posiadać natywnego Bitcoina (BTC), ale masz środki tylko w sieci głównej Ethereum. Aby uzyskać ekspozycję na BTC w Ethereum, możesz kupić opakowanego Bitcoina (WBTC). Jednak WBTC to [ERC-20](/glossary/#erc-20) token natywny dla sieci Ethereum, co oznacza, że jest to wersja Bitcoina na Ethereum, a nie oryginalne aktywo na blockchainie Bitcoin. Aby posiadać natywne BTC, musiałbyś przenieść swoje aktywa z Ethereum do Bitcoina za pomocą mostu. To przeniesie Twoje WBTC i zamieni je na natywne BTC. Alternatywnie, możesz posiadać BTC i chcieć użyć go w protokołach [zdecentralizowanych finansów (DeFi)](/glossary/#defi) na Ethereum. Wymagałoby to przeniesienia w drugą stronę, z BTC na WBTC, które następnie może być używane jako aktywo w Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Możesz również wykonać wszystkie powyższe czynności, korzystając ze [scentralizowanej giełdy](/get-eth). Jednak o ile Twoje środki nie znajdują się już na giełdzie, wiązałoby się to z wieloma krokami i prawdopodobnie lepiej byłoby użyć mostu.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Rodzaje mostów {#types-of-bridge}

Mosty mają wiele rodzajów konstrukcji i zawiłości. Ogólnie rzecz biorąc, mosty dzielą się na dwie kategorie: mosty zaufane i mosty niewymagające zaufania.

| Zaufane mosty                                                                                                                                           | Niewymagające zaufania mosty                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Zaufane mosty w swoim działaniu zależą od centralnego podmiotu lub systemu.                                                                             | Niewymagające zaufania mosty działają przy użyciu inteligentnych kontraktów i algorytmów.                              |
| Mają założenia dotyczące zaufania w odniesieniu do przechowywania środków i bezpieczeństwa mostu. Użytkownicy polegają głównie na reputacji operatora mostu. | Są niewymagające zaufania, tzn. bezpieczeństwo mostu jest takie samo jak bezpieczeństwo bazowego blockchaina.          |
| Użytkownicy muszą zrzec się kontroli nad swoimi kryptoaktywami.                                                                                         | Dzięki [inteligentnym kontraktom](/glossary/#smart-contract), niewymagające zaufania mosty pozwalają użytkownikom zachować kontrolę nad swoimi środkami. |

W skrócie można powiedzieć, że zaufane mosty mają założenia dotyczące zaufania, podczas gdy mosty niewymagające zaufania są o zminimalizowanym zaufaniu i nie wprowadzają nowych założeń dotyczących zaufania poza tymi, które dotyczą domen bazowych. Oto jak można opisać te terminy:

- **Niewymagające zaufania**: posiadające bezpieczeństwo równoważne z domenami bazowymi. Jak opisał to [Arjun Bhuptani w tym artykule.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Założenia dotyczące zaufania:** odejście od bezpieczeństwa domen bazowych poprzez dodanie zewnętrznych weryfikatorów w systemie, co czyni go mniej bezpiecznym pod względem kryptoekonomicznym.

Aby lepiej zrozumieć kluczowe różnice między tymi dwoma podejściami, posłużmy się przykładem:

Wyobraź sobie, że jesteś w punkcie kontrolnym bezpieczeństwa na lotnisku. Istnieją dwa rodzaje punktów kontrolnych:

1. Ręczne punkty kontrolne — obsługiwane przez urzędników, którzy ręcznie sprawdzają wszystkie szczegóły Twojego biletu i tożsamości przed wydaniem karty pokładowej.
2. Samodzielna odprawa — obsługiwana przez maszynę, w której wprowadzasz dane lotu i otrzymujesz kartę pokładową, jeśli wszystko się zgadza.

Ręczny punkt kontrolny jest podobny do modelu zaufanego, ponieważ jego działanie zależy od strony trzeciej, czyli urzędników. Jako użytkownik ufasz, że urzędnicy podejmą właściwe decyzje i prawidłowo wykorzystają Twoje prywatne informacje.

Samodzielna odprawa jest podobna do modelu niewymagającego zaufania, ponieważ eliminuje rolę operatora i wykorzystuje technologię do swojego działania. Użytkownicy zawsze zachowują kontrolę nad swoimi danymi i nie muszą ufać stronie trzeciej w kwestii swoich prywatnych informacji.

Wiele rozwiązań mostowych przyjmuje modele pomiędzy tymi dwoma skrajnościami z różnym stopniem bezzaufaniowości.

<Divider />

## Korzystanie z mostów {#use-bridge}

Korzystanie z mostów pozwala na przenoszenie aktywów między różnymi blockchainami. Oto kilka zasobów, które mogą pomóc Ci znaleźć i korzystać z mostów:

- **[Podsumowanie mostów L2BEAT](https://l2beat.com/bridges/summary) i [Analiza ryzyka mostów L2BEAT](https://l2beat.com/bridges/summary)**: Kompleksowe podsumowanie różnych mostów, w tym szczegóły dotyczące udziału w rynku, typu mostu i łańcuchów docelowych. L2BEAT posiada również analizę ryzyka dla mostów, pomagając użytkownikom w podejmowaniu świadomych decyzji przy wyborze mostu.
- **[Podsumowanie mostów DefiLlama](https://defillama.com/bridges/Ethereum)**: Podsumowanie wolumenów mostów w sieciach Ethereum.

<Divider />

## Ryzyko korzystania z mostów {#bridge-risk}

Mosty są na wczesnym etapie rozwoju. Prawdopodobnie optymalny projekt mostu nie został jeszcze odkryty. Interakcja z jakimkolwiek rodzajem mostu niesie ze sobą ryzyko:

- **Ryzyko inteligentnego kontraktu —** ryzyko błędu w kodzie, który może spowodować utratę środków użytkownika
- **Ryzyko technologiczne —** awaria oprogramowania, błędny kod, błąd ludzki, spam i złośliwe ataki mogą potencjalnie zakłócić operacje użytkownika

Ponadto, ponieważ zaufane mosty dodają założenia dotyczące zaufania, niosą one ze sobą dodatkowe ryzyka, takie jak:

- **Ryzyko cenzury —** operatorzy mostów mogą teoretycznie powstrzymać użytkowników przed transferem ich aktywów za pomocą mostu
- **Ryzyko powiernicze —** operatorzy mostów mogą wejść w zmowę w celu kradzieży środków użytkowników

Środki użytkownika są zagrożone, jeśli:

- w inteligentnym kontrakcie występuje błąd
- użytkownik popełni błąd
- bazowy blockchain zostanie zhakowany
- operatorzy mostu mają złośliwe intencje w zaufanym moście
- most zostanie zhakowany

Jednym z niedawnych ataków hakerskich był atak na most Wormhole na Solanie, [gdzie podczas włamania skradziono 120 tys. wETH (325 milionów USD)](https://rekt.news/wormhole-rekt/). Wiele z [największych ataków hakerskich na blockchainy dotyczyło mostów](https://rekt.news/leaderboard/).

Mosty mają kluczowe znaczenie dla onboardingu użytkowników do warstwy 2 (L2) Ethereum, a nawet dla użytkowników, którzy chcą eksplorować różne ekosystemy. Jednak biorąc pod uwagę ryzyko związane z interakcją z mostami, użytkownicy muszą zrozumieć kompromisy, na jakie idą mosty. Oto kilka [strategii bezpieczeństwa międzyłańcuchowego](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Dalsza lektura {#further-reading}
- [EIP-5164: Wykonywanie międzyłańcuchowe](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 czerwca 2022 r. - Brendan Asselstine_
- [Ramy ryzyka L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 lipca 2022 r. - Bartek Kiepuszewski_
- [„Dlaczego przyszłość będzie wielołańcuchowa, ale nie międzyłańcuchowa.”](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 stycznia 2022 r. - Vitalik Buterin_
- [Wykorzystanie współdzielonego bezpieczeństwa do bezpiecznej interoperacyjności międzyłańcuchowej: Komitety stanu Lagrange'a i nie tylko](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 czerwca 2024 r. - Emmanuel Awosika_
- [Stan rozwiązań interoperacyjności rollupów](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 czerwca 2024 r. - Alex Hook_