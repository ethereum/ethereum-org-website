---
title: Tokeny niezamienne (NFT)
description: Przedstawienie NFT na Ethereum
lang: pl
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /infrastructure_transparent.png
alt: Logo Ethereum wyświetlane jako hologram.
summaryPoint1: Sposób reprezentowania czegoś wyjątkowego jako aktywu na blockchainie Ethereum.
summaryPoint2: NFT dają ich twórcom możliwości, których nigdy wcześniej nie mieli.
summaryPoint3: Wspierane przez inteligentne kontrakty na blockchainie Ethereum.
---

## Czym są NFT? {#what-are-nfts}

NFTs are tokens that are **individually unique**. Każdy NFT ma inne właściwości (niezamienne) i można udowodnić, że jest rzadki. This is different from tokens such as [ETH](/glossary/#ether) or other Ethereum based tokens like USDC where every token is identical and has the same properties ('fungible'). Nie ma znaczenia, który konkretnie banknot (lub ETH) masz w portfelu, ponieważ wszystkie są identyczne i warte tyle samo. Jednakże _ma_ znaczenie, który konkretnie NFT posiadasz, ponieważ wszystkie mają indywidualne właściwości, które odróżniają je od innych („niezamienne”).

Unikalność każdego NFT umożliwia tokenizację rzeczy takich jak dzieła artystyczne, przedmioty kolekcjonerskie, a nawet nieruchomości, gdzie jeden konkretny unikalny NFT reprezentuje konkretny unikalny prawdziwy lub cyfrowy przedmiot. Ownership of an asset is publicly verifiable on Ethereum [blockchain](/glossary/#blockchain).

<YouTube id="Xdkkux6OxfM" />

## Internet aktywów {#internet-of-assets}

NFT i Ethereum rozwiązują niektóre z problemów występujących w dzisiejszym Internecie. Ponieważ wszystko staje się coraz bardziej cyfrowe, istnieje potrzeba odtworzenia właściwości przedmiotów fizycznych, takich jak rzadkość, unikalność i dowód własności w sposób, który nie jest kontrolowany przez centralną organizację. Dzięki NFT możesz na przykład posiadać plik muzyczny mp3 we wszystkich aplikacjach opartych na Ethereum i nie być przywiązanym do konkretnej aplikacji muzycznej danej firmy, takiej jak Spotify lub Apple Music. You can own a social media handle that you can sell or swap, but **can't be arbitrarily taken away from you** by a platform provider.

Oto jak wygląda porównanie Internetu NFT z Internetem, z którego korzysta większość z nas...

### Porównanie {#nft-comparison}

| Internet NFT                                                                                                                                             | Internet dzisiaj                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **You own your assets!** Only you can sell or swap them.                                                                                                 | **You rent an asset** from some organization and it can be taken away from you.                                                                                          |
| NFTs are **digitally unique**, no two NFTs are the same.                                                                                                 | **A copy often cannot be distinguished** from the original.                                                                                                              |
| Ownership of an NFT is stored on the blockchain for anyone to **verify publicly**.                                                                       | The access to ownership records of digital items is **controlled by institutions** – you must take their word for it.                                                    |
| NFTs are [smart contracts](/glossary/#smart-contract) on Ethereum. This means they **can easily be used in other smart contracts** and apps on Ethereum! | Companies with digital items usually **require their own "walled garden" infrastructure**.                                                                               |
| Content **creators can sell their work anywhere** and can access a global market.                                                                        | Twórcy opierają się na infrastrukturze i systemie dystrybucji platform, z których korzystają. These are often subject to terms of use and **geographical restrictions**. |
| NFT creators **can retain ownership rights** over their own work, and program royalties directly into the NFT contract.                                  | Platforms, such as music **streaming services, retain the majority of profits from sales**.                                                                              |

## W jakim celu używa się NFT? {#nft-use-cases}

NFT są używane do wielu rzeczy, w tym:

- do udowadniania udziału w wydarzeniu
- do zaświadczania o ukończeniu kursu
- jako posiadalne przedmioty dla graczy
- cyfrowa sztuka
- tokenizacja prawdziwych aktywów
- do potwierdzania tożsamości w sieci
- do ograniczania dostępu do treści
- do wystawiania biletów
- zdecentralizowane nazwy domen internetowych
- collateral in [decentralized finance](/glossary/#defi)

Być może jesteś artystą, który chce udostępniać swoje prace za pomocą NFT, bez utraty kontroli i poświęcania zysków na rzecz pośredników. Możesz utworzyć nowy kontrakt i określić liczbę NFT, ich właściwości oraz link do określonego dzieła sztuki. As the artist, **you can program into the smart contract the royalties** you should be paid (e.g. transfer 5% of the sale price to the contract owner each time an NFT is transferred). You can also always prove that you created the NFTs because you own the [wallet](/glossary/#wallet) that deployed the contract. Your buyers can easily prove that they own an **authentic NFT** from your collection because their wallet [address](/glossary/#address) is associated with a token in your smart contract. Mogą go używać w całym ekosystemie Ethereum, mając pewność co do jego autentyczności.

<InfoBanner shouldSpaceBetween emoji=":eyes:" mt="8">
  <div>Odkrywaj, kupuj lub stwórz swoje własne NFT...</div>
  <ButtonLink to="/dapps/?category=collectibles#explore">
    Przeglądaj sztukę w NFT
  </ButtonLink>
</InfoBanner>

Pomyśl o tym tak jak o bilecie na wydarzenie sportowe. Just as an **organizer of an event can choose how many tickets to sell**, the creator of an NFT can decide how many replicas exist. Czasami są to dokładne repliki, takie jak 5000 takich samych biletów wstępu. Czasami wybijanych jest kilka bardzo podobnych, ale każdy z nich nieco się różni, np. bilet z przypisanym miejscem. Można je kupować i sprzedawać peer-to-peer bez płacenia osobie obsługującej bilety, a kupujący zawsze ma pewność co do autentyczności biletu, sprawdzając adres kontraktu.

On ethereum.org, **NFTs are used to demonstrate that people have meaningfully contributed** to our Github repository (programmed the website, written or modified an article...), translated our content, or attended our community calls, and we've even got our own NFT domain name. If you contribute to ethereum.org, you can claim a [POAP](/glossary/#poap) NFT. Niektóre spotkania kryptowalutowe wykorzystywały POAPy jako bilety. [Więcej na temat przyczyniania się do rozwoju](/contributing/#poap).

![ethereum.org POAP](./poap.png)

Ta strona ma również alternatywną domenę obsługiwaną przez NFT, **ethereum.eth**. Nasz adres `.org` jest zarządzany centralnie przez dostawcę DNS, podczas gdy ethereum`.eth` jest zarejestrowany na Ethereum za pośrednictwem Ethereum Name Service (ENS). Jest ona naszą własnością oraz jest zarządzana przez nas. [Sprawdź nasz rekord ENS](https://app.ens.domains/name/ethereum.eth)

[Więcej o ENS](https://app.ens.domains)

<Divider />

## Jak działają NFT? {#how-nfts-work}

NFT, podobnie jak inne cyfrowe elementy w blockchainie Ethereum, są tworzone za pomocą specjalnego programu komputerowego opartego na Ethereum, zwanego „inteligentnym kontraktem”. These contracts follow certain rules, like the [ERC-721](/glossary/#erc-721) or [ERC-1155](/glossary/#erc-1155) standards, which determine what the contract can do.

Inteligentny kontrakt NFT może robić kilka kluczowych czynności:

- **Tworzyć NFT:** może tworzyć nowe NFT.
- **Przypisywać własność:** utrzymuje kontrolę nad tym, kto jest właścicielem, którego NFT, łącząc je z określonymi adresami Ethereum.
- **Nadawać każdemu NFT własne ID:** każdy NFT ma numer, który sprawia, że jest unikalny. Ponadto dołączone są do niego zazwyczaj pewne informacje (metadane) opisujące, co reprezentuje NFT.

Kiedy ktoś „tworzy” lub „wybija” NFT, w zasadzie mówi inteligentnemu kontraktowi, aby dał mu prawo własności do konkretnego NFT. Ta informacja jest bezpiecznie i publicznie przechowywana w blockchainie.

Co więcej, twórca kontraktu może dodać dodatkowe zasady. Może ograniczyć liczbę NFT, które mogą zostać utworzone lub zdecydować, że powinien otrzymywać niewielką tantiemę za każdym razem, gdy NFT zmieni właściciela.

### Bezpieczeństwo NFT {#nft-security}

Ethereum's security comes from [proof-of-stake](/glossary/#pos). System ten został zaprojektowany w celu ekonomicznego zniechęcenia do złośliwych działań, dzięki czemu Ethereum jest odporne na manipulacje. To właśnie umożliwia działanie NFT. Once the [block](/glossary/#block) containing your NFT transaction becomes [finalized](/glossary/#finality) it would cost an attacker millions of ETH to change it. Każdy, kto korzysta z oprogramowania Ethereum, byłby w stanie natychmiast wykryć nieuczciwą manipulację w NFT, a przestępca zostałby ekonomicznie ukarany i wyrzucony.

Kwestie bezpieczeństwa związane z NFT są najczęściej związane z oszustwami typu phishing, lukami w inteligentnych kontraktach lub błędami użytkownika (takimi jak nieumyślne ujawnienie kluczy prywatnych), co sprawia, że dbanie o bezpieczeństwo portfela ma kluczowe znaczenie dla właścicieli NFT.

<ButtonLink to="/security/">
  Więcej o bezpieczeństwie
</ButtonLink>

## Dalsza lektura {#further-reading}

- [Przewodnik po NFT dla początkujących](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) — _Linda Xie, styczeń 2020 r._
- [Moduł śledzący EtherscanNFT](https://etherscan.io/nft-top-contracts)
- [Standard tokenów ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Standard tokenów ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
