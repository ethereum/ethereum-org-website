---
title: "Jak si zobrazit NFT ve své peněžence (Část 3/3 ze série tutoriálů o NFT)"
description: "Tento tutoriál popisuje, jak si zobrazit existující NFT v MetaMasku!"
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: "Zobrazení NFT v peněžence"
lang: cs
published: 2021-04-22
---

Tento tutoriál je 3. částí ze série tutoriálů o NFT, kde si zobrazíme náš nově vyražený nezaměnitelný token (NFT). Tento obecný tutoriál však můžete použít pro jakýkoli token ERC-721 pomocí MetaMasku, a to včetně sítě Mainnet nebo jakéhokoli testnetu. Pokud byste se chtěli naučit, jak razit vlastní NFT na Ethereu, měli byste se podívat na [1. část o tom, jak napsat a nasadit chytrý kontrakt pro NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

Gratulujeme! Dostali jste se k nejkratší a nejjednodušší části naší série tutoriálů o NFT – jak si zobrazit svůj čerstvě vyražený NFT ve virtuální peněžence. Pro tento příklad budeme používat MetaMask, protože jsme ho používali i v předchozích dvou částech.

Jako předpoklad byste již měli mít nainstalovaný MetaMask, ať už jako rozšíření prohlížeče nebo mobilní aplikaci, a měl by obsahovat účet, na který jste svůj NFT vyrazili. MetaMask si můžete zdarma stáhnout ze [stránky pro stažení MetaMasku](https://metamask.io/download).

## Krok 1: Nastavte svou síť na Sepolia {#set-network-to-sepolia}

Jelikož byl náš NFT vyražen na testovací síti Sepolia, budete chtít vybrat jako svou síť Sepolia. MetaMask ve výchozím nastavení testovací sítě skrývá, takže je nejprve zapněte:

1. Otevřete nabídku v pravém horním rohu a vyberte „Networks“ (Sítě).
2. Přejděte dolů na konec seznamu sítí a zapněte možnost „Show test networks“ (Zobrazit testovací sítě).
3. Ze seznamu sítí vyberte „Sepolia“.

Pokud nabídky ve vaší verzi MetaMasku vypadají jinak, podívejte se na [průvodce MetaMasku pro zobrazení testnetů](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/).

## Krok 2: Přidejte svůj sběratelský předmět do MetaMasku {#add-nft-to-metamask}

MetaMask detekuje NFT automaticky pouze na některých sítích, mezi které Sepolia nepatří, takže svůj NFT budete muset importovat ručně. K tomu potřebujete adresu chytrého kontraktu NFT a ID tokenu ERC-721 vašeho NFT – to byste měli být schopni najít na Etherscanu na základě hashe transakce z vašeho NFT vyraženého ve 2. části našeho tutoriálu. Pokud jste použili kontrakt z 1. části, váš první NFT má ID tokenu 1.

![Jak najít hash transakce a ID tokenu ERC-721](./findNFTEtherscan.png)

Poté v MetaMasku (v rozšíření nebo mobilní aplikaci):

1. Přejděte do sekce „NFTs“ na domovské obrazovce a vyberte „Import NFT“.
2. Vyberte Sepolia jako síť a vložte adresu chytrého kontraktu vašeho NFT do pole „Address“ (Adresa).
3. Zadejte své ID tokenu do pole „Token ID“ a vyberte „Import“.

Možná budete muset několikrát obnovit stránku, abyste svůj NFT viděli – ale bude tam <Emoji text="😄" size={1} />! Pokud MetaMask říká, že nejste vlastníkem NFT, zkontrolujte, zda jste vybrali účet, na který jste NFT vyrazili. Pro další pomoc se podívejte na [průvodce MetaMasku pro NFT](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/).

Gratulujeme! Úspěšně jste vyrazili NFT a nyní si ho můžete zobrazit! Nemůžeme se dočkat, až uvidíme, jak vezmete svět NFT útokem!
