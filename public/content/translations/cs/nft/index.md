---
title: Nezaměnitelné tokeny (NFT)
description: Přehled NFT na Ethereu
lang: cs
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /infrastructure_transparent.png
alt: Logo Eth zobrazené prostřednictvím hologramu.
summaryPoint1: Způsob, jak reprezentovat cokoliv unikátního jako majetek založený na Ethereu.
summaryPoint2: NFT dávají tvůrcům obsahu větší moc než kdykoliv předtím.
summaryPoint3: Běží na chytrých kontraktech na blockchainu Ethereum.
---

## Co jsou NFTéčka? {#what-are-nfts}

NFT jsou tokeny, které jsou individuálně jedinečné. Každé NFT má jiné vlastnosti (nezaměnitelné) a je prokazatelně vzácné. V tom se liší od tokenů, jako jsou ERC-20, kde je každý token v sadě identický a má stejné vlastnosti („zaměnitelné“). Obdobně jě vám jedno, kterou konkrétní dolarovou bankovku máte v peněžence, protože všechny jsou totožné a mají stejnou hodnotu. Ale _není_ vám jedno, které konkrétní NFT vlastníte, protože každé má individuální vlastnosti, které ho odlišují od ostatních („nezastupitelné“).

Jedinečnost každého NFT umožňuje tokenizaci věcí, jako je umění, sběratelské předměty nebo dokonce nemovitosti, kde jedno konkrétní unikátní NFT představuje jednu konkrétní unikátní položku existující v reálném nebo digitálnm světě. Vlastnictví aktiva je zajištěno Ethereum blockchainem. Nikdo nemůže měnit záznam vlastnictví nebo zkopírovat a následně vložit toto NFT na blockchain.

<YouTube id="Xdkkux6OxfM" />

## Internet aktiv {#internet-of-assets}

NFT a Ethereum řeší některé problémy, které dnes na internetu existují. S postupující digitalizací je třeba replikovat vlastnosti fyzických předmětů, jako je vzácnost, jedinečnost a důkaz vlastnictví způsobem, který není řízen centrální organizací. Díky NFT můžete například vlastnit hudební mp3, která není spojena s konkrétní hudební aplikací jedné společnosti, nebo můžete vlastnit přezdívku na sociálních sítích, kterou můžete prodat nebo vyměnit, ale nemůže vám být libovolně odebrána poskytovatelem platformy.

Zde je porovnání NFT internetu a internetu, tak jak ho známe dnes...

### Porovnání {#nft-comparison}

| NFT internet                                                                                                                 | Dnešní internet                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Vy vlastníte svá aktiva! Jen vy je můžete prodat nebo směnit.                                                                | Půjčujete si aktiva od jiné organizace.                                                                                                 |
| NFT jsou digitálně unikátní, žádná dvě NFT nejsou stejná.                                                                    | Kopii aktiva často nelze odlišit od originálu.                                                                                          |
| Vlastnictví NFT je zapsáno na blockchainu, aby si jej mohl kdokoli ověřit.                                                   | Záznamy o vlastnictví digitálních položek jsou uloženy na serverech ovládaných firmami, kterým musíte ohledně jejich správy důvěřovat.  |
| NFT jsou smart kontrakty na Ethereu. To znamená, že je lze snadno použít v jiných smart kontraktech a aplikacích na Ethereu! | Firmy, které centralizovaně spravují digitálními aktiva, mají obvykle vlastní infrastrukturu „zahrady za zdí“.                          |
| Tvůrci obsahu mohou prodávat svá díla kdekoliv a mají přístup na globální trh.                                               | Tvůrci spoléhají na infrastrukturu a distribuci platforem, které využívají. Často je limitují podmínky používání a geografická omezení. |
| Tvůrci NFT si mohou ponechat vlastnická práva ke svému dílu a naprogramovat licenční poplatky přímo do NFT kontraktu.        | Platformy, jako například služby streamování hudby, si nechávají většinu zisků z prodeje.                                               |

## Jak fungují NFT? {#how-nfts-work}

Stejně jako jakýkoli jiný token na Ethereu, i NFT vznikají pomocí smart kontraktu. Smart kontrakt odpovídá jednomu z několika standardů NFT (nejčastěji se jedná o ERC-721 nebo ERC-1155), které definují, jaké funkce tento konkrétní kontrakt má. Tento kontrakt může vytvořit („vymintovat“) NFT a poslat ho konkrétnímu vlastníkovi. Vlastnictví je definováno v kontraktu pomocí mapování konkrétních NFT na konkrétní adresy. Každé NFT má svoje ID a obvykle i metadata, díky kterým je každý token jedinečný.

Když někdo vytvoří nebo vymintuje NFT, ve skutečnosti spouští funkci ve smart kontraktu, která přiřadí konkrétní NFT k jeho adrese. Tyto informace jsou uloženy přímo v paměti kontraktu, který je součástí blockchainu. Tvůrce kontraktu může přidat další podmínky, například omezit celkový počet tokenů v oběhu nebo nastavit licenční poplatek, který se vyplatí tvůrci pokaždé, když je token převeden.

## K čemu se NFT používají? {#nft-use-cases}

NFT se používají pro spoustu věcí, mezi které patří:

- důkaz, že jste se zúčastnili nějaké události
- certifikát o absolvování kurzu
- potvrzení vlastnictví položek do počítačových her
- digitální umění
- tokenizace aktiv v reálném světě
- prokázání vaší online identity
- nastavení přístupu k obsahu
- prodej vstupenek
- decentralizované názvy internetových domén
- kolaterál v DeFi

Možná jste umělec, který chce zveřejnit svou práci pomocí NFT, aniž by ztratil kontrolu a přišel o své zisky kvůli prostředníkům. Můžete vytvořit nový kontrakt a zadat počet NFT, jejich vlastnosti a přidat odkaz na konkrétní umělecké dílo. Jako umělec můžete do smart kontraktu naprogramovat licenční poplatky, které by vám měly být vyplaceny (např. 5 % z prodejní ceny, což je vlastníkovi kontraktu vyplaceno pokaždé, když je NFT převedeno). Vždy také můžete prokázat, že jste vytvořili NFT, protože vlastníte peněženku, která kontrakt vytvořila. Vaši kupující mohou snadno prokázat, že vlastní autentické NFT z vaší sbírky, protože adresa jejich peněženky je spojena s tokenem ve vašem smart kontraktu. Mohou jej používat v celém ekosystému Etherea a jsou si jisti jeho pravostí.

Nebo si představte vstupenku na sportovní událost. Stejně jako organizátor události si může vybrat, kolik vstupenek bude prodávat, může tvůrce NFT rozhodnout, kolik kopií existuje. Někdy se jedná o přesné kopie, jako je 5 000 všeobecných vstupenek. Někdy je vytvořených několik NFT, která jsou velmi podobná, ale každé mírně odlišné, jako například vstupenka s přiděleným sedadlem. Ty lze kupovat a prodávat peer-to-peer bez placení prodejcům vstupenek a kupující se vždy může ujistit o pravosti vstupenky pomocí kontroly adresy kontraktu.

Na ethereum.org se NFT používají k ukázce toho, že lidé přispěli do našeho repozitáře na Githubu nebo se zúčastnili callů, a dokonce máme vlastní NFT s názvem domény. Pokud přispějete na ethereum.org, můžete získat POAP NFT. Některé krypto meetupy používají POAPy jako vstupenky. [Více o přispívání](/contributing/#poap).

![ethereum.org POAP](./poap.png)

Tato webová stránka má také alternativní název domény využívající NFT, **ethereum.eth**. Naše adresa `.org` je centrálně spravována poskytovatelem doménových jmen (DNS), zatímco ethereum`.eth` je registrována na síti Ethereum prostřednictvím Ethereum Name Service (ENS). A je vlastněná a ovládaná námi. [Podívejte se na náš ENS záznam.](https://app.ens.domains/name/ethereum.eth)

[Více o ENS](https://app.ens.domains)

<Divider />

### Zabezpečení NFT {#nft-security}

Ethereum je zabezpečeno mechanismem proof-of-stake. Systém je navržen tak, aby ekonomicky bránil zlovolným akcím, takže Ethereum je chráněno proti neoprávněným zásahům. To je to, co umožňuje NFT fungovat. Jakmile bude blok obsahující vaši NFT transakci dokončen, stálo by útočníka miliony etheru to změnit. Každý, kdo používá Ethereum software, by byl okamžitě schopen odhalit nepoctivé a nedovolené zásahy týkající se NFT a záškodník by byl ekonomicky penalizován a vykázán.

Bezpečnostní otázky týkající se NFT se nejčastěji týkají podvodů s phishingem, zranitelnosti smart kontraktů nebo uživatelské chyby (jako je neúmyslné odhalení soukromého klíče). Dobrá ochrana peněženky je tedy pro majitele NFT klíčovou.

<ButtonLink to="/security/">
  Více o bezpečnosti
</ButtonLink>

## Další informace {#further-reading}

- [Průvodce NFT](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, leden 2020_
- [EtherscanNFT tracker](https://etherscan.io/nft-top-contracts)
- [Standart tokenu ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Standart tokenu ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
