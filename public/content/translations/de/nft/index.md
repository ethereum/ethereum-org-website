---
title: Non Fungible Token (NFT)
description: Ein Überblick über NFTs bei Ethereum
lang: de
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /infrastructure_transparent.png
alt: Ein als Hologramm abgebildetes ETH-Logo.
summaryPoint1: Ein Weg, alles Einzigartige als eine Ethereum-basierte Anlage darzustellen.
summaryPoint2: NFTs geben Inhaltserstellern mehr Einfluss denn je.
summaryPoint3: Auf Grundlage von intelligenten Verträgen auf der Ethereum-Blockchain.
---

## Was sind NFTs? {#what-are-nfts}

NFTs, also Non Fungible Token, sind Token, die individuell einzigartig sind. Jeder NFT hat unterschiedliche Eigenschaften (nicht-fungibel) und ist nachweislich nur begrenzt verfügbar. Das ist ein Unterschied zu Token wie beispielsweise ERC-20s, bei denen alle Token desselben Typs identisch sind und die gleichen Eigenschaften aufweisen ('fungibel'). Vermutlich ist es Ihnen egal, welche Dollarnote Sie in Ihrer Brieftasche haben, denn sie sind alle identisch und gleich viel wert. Im Gegensatz dazu _ist_ es nicht egal, welchen spezifischen NFT Sie besitzen, da alle individuelle Eigenschaften haben, die sie von anderen unterscheiden ('nicht-fungibel').

Die Einzigartigkeit eines jeden NFT ermöglicht die Tokenisierung von Dingen wie Kunst, Sammlerstücken oder sogar Immobilien. Dabei stellt jeder bestimmte einzigartige NFT einen bestimmten einzigartigen realen oder digitalen Gegenstand dar. Das Eigentum an einem Vermögenswert ist durch die Ethereum-Blockchain gesichert – niemand kann die Aufzeichnung des Eigentums ändern oder einen neuen NFT kopieren/einfügen.

<YouTube id="Xdkkux6OxfM" />

## Das Internet der Vermögenswerte {#internet-of-assets}

NFTs und Ethereum lösen einige der Probleme, die heute mit dem Internet bestehen. Da alles digital wird, braucht es Möglichkeiten, die Eigenschaften physischer Objekte wie Knappheit, Einzigartigkeit und den Eigentumsnachweis digital nachzubilden. Dieser Eigentumsnachweis sollte dabei nicht von einer zentralen Organisation kontrolliert werden. Mit NFTs können Sie z. B. eine Musikdatei im MP3-Format besitzen, die nicht an eine bestimmte Musik-App eines Unternehmens gebunden ist, oder Sie können einen Social-Media-Handle besitzen, den Sie verkaufen oder tauschen können, welcher Ihnen aber nicht willkürlich von einem Plattformanbieter entzogen werden kann.

Doch wie könnte ein Internet der NFTs im Vergleich zum Internet von heute aussehen?

### Ein Vergleich {#nft-comparison}

| Internet der NFTs                                                                                                                                          | Das Internet heute                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sie besitzen Ihre Vermögenswerte! Nur Sie können sie verkaufen oder eintauschen.                                                                           | Sie leihen sich Vermögenswerte von anderen Organisationen aus.                                                                                                                        |
| NFTs sind digital einzigartig. Es ist nicht möglich, dass zwei NFTs identisch sind.                                                                        | Die Kopie eines Objektes ist oft nicht vom Original zu unterscheiden.                                                                                                                 |
| Das Eigentum an einem NFT wird in der Blockchain gespeichert und kann von jedem überprüft werden.                                                          | Eigentumsnachweise von digitalen Objekten werden auf Servern gespeichert, die von Institutionen kontrolliert werden. Denen müssen Sie vertrauen.                                      |
| NFTs sind Smart Contracts auf Ethereum. Das bedeutet, dass sie problemlos in anderen Smart Contracts und Anwendungen auf Ethereum verwendet werden können. | Unternehmen mit digitalen Objekten benötigen in der Regel ihre eigene geschützte Infrastruktur.                                                                                       |
| Inhaltsersteller können ihre Arbeit überall verkaufen und auf einen globalen Markt zugreifen.                                                              | Dabei sind die Ersteller von der Infrastruktur und Distribution der Plattform abhängig, die sie nutzen. Für diese gelten häufig Nutzungsbedingungen und geografische Einschränkungen. |
| Schöpfer von NFTs können die Eigentumsrechte an ihren eigenen Werken behalten und die Tantiemen direkt in dem NFT-Vertrag einarbeiten.                     | Plattformen, wie z. B. Musik-Streaming-Dienste, behalten einen Großteil der Verkaufserlöse ein.                                                                                       |

## Wie funktionieren NFTs? {#how-nfts-work}

Wie alle Token auf Ethereum werden auch NFTs von einem Smart Contract herausgegeben. Der Smart Contract entspricht einem von mehreren NFT-Standards (für gewöhnlich ERC-721 oder ERC-1155), die festlegen, welche Funktionen der Contract hat. Der Contract kann NFTs erzeugen ('mint') und weist sie einem spezifischen Besitzer zu. Die Eigentümerschaft wird im Contract definiert, indem bestimmte NFTs bestimmten Adressen zugeordnet werden. Der NFT hat eine eigene ID und in der Regel auch Metadaten, die den jeweiligen Token eindeutig machen.

Wenn jemand einen NFT erstellt oder prägt, führt er in Wirklichkeit eine Funktion im Smart Contract aus, die seiner Adresse einen bestimmten NFT zuweist. Diese Informationen werden im Speicher des Contracts verwahrt, der Teil der Blockchain ist. Der Ersteller des Contracts kann zusätzliche Funktionen in den Vertrag einbauen, z. B. eine Begrenzung des Gesamtangebots oder die Festlegung von Tantiemen, die bei jeder Übertragung eines Tokens an den Ersteller zu zahlen sind.

## Wofür werden NFTs verwendet? {#nft-use-cases}

NFTs werden unter anderem für folgende Zwecke eingesetzt:

- den Nachweis, dass Sie eine Veranstaltung besucht haben
- Bescheinigung, dass Sie einen Kurs absolviert haben
- Gegenstände aus Spielen, an denen Besitzrechte gehalten werden können
- digitale Kunst
- Tokenisierung von Vermögenswerten der realen Welt
- Nachweis Ihrer Online-Identität
- Zugangsbeschränkung zu Inhalten
- Ticketverkauf
- Dezentralisierung von Internet-Domänennamen
- Sicherheiten in DeFi

Vielleicht sind Sie ein Künstler, der seine Werke mit Hilfe von NFTs verbreiten möchte, ohne die Kontrolle über die Werke zu verlieren und seine Gewinne an Zwischenhändler zu opfern. Sie können einen neuen Contract erstellen und die Anzahl der NFTs, ihre Eigenschaften und eine Verknüpfung zu bestimmten Kunstwerken angeben. Als Künstler können Sie in den Smart Contract einprogrammieren, welche Tantiemen Sie erhalten sollen (z. B. <Überweisung on 5 % des Verkaufspreises an den Vertragseigentümer, wenn ein NFT übertragen wird). Sie können außerdem jederzeit nachweisen, dass Sie die NFTs erstellt haben, weil Sie die Wallet besitzen, die den Vertrag eingesetzt hat. Ihre Käufer können leicht nachweisen, dass sie einen echten NFT aus Ihrer Sammlung besitzen, da ihre Walletadresse mit einem Token in Ihrem Smart Contract verknüpft ist. Sie können ihn im gesamten Ethereum-Ökosystem verwenden und sich auf seine Authentizität verlassen.

Oder denken Sie ein Ticket für ein Sportevent. So wie ein Veranstalter für seine Veranstaltung entscheiden kann, wie viele Tickets verkauft werden, kann der Ersteller eines NFT entscheiden, wie viele Repliken existieren. Manchmal handelt es sich dabei um genaue Repliken, wie etwa 5.000 Eintrittskarten. Manchmal werden auch mehrere Stücke geprägt, die zwar sehr ähnlich sind, aber doch leichte Unterschiede aufweisen, wie z. B. ein Ticket mit einem zugewiesenem Sitzplatz. Diese können in Peer-to-Peer-Umgebungen gekauft und verkauft werden, ohne dass Zwischenhändler dafür bezahlt werden müssen. Dabei kann sich der Käufer durch Überprüfung der Adresse des Contracts stets von der Echtheit des Tickets überzeugen.

Auf ethereum.org werden NFTs verwendet, um zu zeigen, dass Leute zu unserer GitHub-Ablage beigetragen oder an Calls teilgenommen haben, und wir haben sogar unseren eigenen NFT-Domainnamen. Wenn Sie einen Beitrag für ethereum.org leisten, können Sie ein POAP-NFT beanspruchen. Einige Krypto-Treffen nutzen POAPs als Zutrittskarte. [Mehr zum Beitragen](/contributing/#poap).

![ethereum.org POAP](./poap.png)

Diese Website hat einen alternativen Domainnamen ermöglicht durch NFTs, **ethereum.eth**. Unsere `.org`-Adresse wird zentral von einem Domain Name System Provider (DNS) verwaltet. ethereum`.eth` hingegen ist über den Ethereum Name Service (ENS) registriert. Und sie gehört uns und wird von uns verwaltet. [Schauen Sie sich unseren ENS-Datensatz an](https://app.ens.domains/name/ethereum.eth).

[Mehr zu ENS](https://app.ens.domains)

<Divider />

### NFT-Sicherheit {#nft-security}

Die Sicherheit von Ethereum basiert auf Proof-of-Stake. Das System ist darauf ausgelegt, böswillige Handlungen mithilfe finanziell negativer Anreize zu verhindern und Ethereum dadurch Manipulationen gegenüber sicherer zu machen. Das macht NFTs überhaupt erst möglich. Sobald der Block, der Ihre NFT-Transaktion beinhaltet, endgültig festgelegt wird, würde es einen Angreifer Millionen von ETH kosten, um dies wieder zu ändern. Jeder, der Ethereum-Software ausführt, würde die unehrliche Manipulation mit einem NFT sofort erkennen können und der Angreifer würde eine finanzielle Strafe erhalten und ausgeschlossen werden.

Sicherheitsprobleme mit NFTs stehen oft im Zusammenhang mit Phishing-Betrügereien, Schwachstellen bei Smart Contracts oder Benutzerfehlern (z. B. unbeabsichtigtes Veröffentlichen privater Schlüssel). Damit wird eine sichere Wallet für NFT-Besitzer umso wichtiger.

<ButtonLink to="/security/">
  Weiteres zur Sicherheit
</ButtonLink>

## Weiterführende Informationen {#further-reading}

- [NFT-Leitfaden für Einsteiger](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, Januar 2020_
- [EtherscanNFT Tracker](https://etherscan.io/nft-top-contracts)
- [ERC-721-Token-Standard](/developers/docs/standards/tokens/erc-721/)
- [ERC-1155-Token-Standard](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
