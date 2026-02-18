---
title: "IPFS pro decentralizovaná uživatelská rozhraní"
description: "Tento návod čtenáře naučí, jak pomocí IPFS uložit uživatelské rozhraní pro dapp. I když jsou data a obchodní logika aplikace decentralizované, bez uživatelského rozhraní odolného proti cenzuře by k němu uživatelé mohli stejně ztratit přístup."
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: beginner
lang: cs
published: 2024-06-29
---

Napsali jste neuvěřitelnou novou dapp. Dokonce jste pro ni napsali [uživatelské rozhraní](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Ale teď se bojíte, že se ho někdo pokusí cenzurovat tím, že shodí vaše uživatelské rozhraní, což je jen jeden server v cloudu. V tomto návodu se naučíte, jak se vyhnout cenzuře tím, že své uživatelské rozhraní umístíte na **[Interplanetární souborový systém (IPFS)](https://ipfs.tech/developers/)**, aby si ho každý zájemce mohl připnout na server pro budoucí přístup.

Veškerou práci můžete udělat pomocí služby třetí strany, jako je [Fleek](https://resources.fleek.xyz/docs/). Tento návod je určen pro lidi, kteří chtějí udělat dost pro to, aby pochopili, co dělají, i když je to více práce.

## Začínáme lokálně {#getting-started-locally}

Existuje několik [poskytovatelů IPFS třetích stran](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), ale pro testování je nejlepší začít se spuštěním IPFS lokálně.

1. Nainstalujte si [uživatelské rozhraní IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Vytvořte si adresář s webovou stránkou. Pokud používáte [Vite](https://vite.dev/), použijte tento příkaz:

   ```sh
   pnpm vite build
   ```

3. V aplikaci IPFS Desktop klikněte na **Importovat > Složka** a vyberte adresář, který jste vytvořili v předchozím kroku.

4. Vyberte právě nahranou složku a klikněte na **Přejmenovat**. Dejte jí smysluplnější název.

5. Znovu ji vyberte a klikněte na **Sdílet odkaz**. Zkopírujte URL adresu do schránky. Odkaz bude podobný tomuto: `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Klikněte na **Stav**. Rozbalte kartu **Pokročilé**, abyste viděli adresu brány. Například v mém systému je adresa `http://127.0.0.1:8080`.

7. Zkombinujte cestu z kroku s odkazem s adresou brány, abyste našli svou adresu. Například pro výše uvedený příklad je URL `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Otevřete tuto URL adresu v prohlížeči a podívejte se na své stránky.

## Nahrávání {#uploading}

Takže teď můžete používat IPFS k lokálnímu poskytování souborů, což není příliš vzrušující. Dalším krokem je zpřístupnit je světu, když jste offline.

Existuje řada známých [služeb pro připínání](https://docs.ipfs.tech/concepts/persistence/#pinning-services). Vyberte si jednu z nich. Ať už používáte jakoukoli službu, musíte si vytvořit účet a poskytnout jí **identifikátor obsahu (CID)** ve vaší aplikaci IPFS Desktop.

Osobně jsem zjistil, že nejjednodušší je používat [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides). Zde jsou pokyny:

1. Přejděte na [nástěnku](https://dashboard.4everland.org/overview) a přihlaste se pomocí své peněženky.

2. V levém postranním panelu klikněte na **Úložiště > 4EVER Pin**.

3. Klikněte na **Nahrát > Vybrané CID**. Pojmenujte svůj obsah a zadejte CID z aplikace IPFS Desktop. V současné době je CID řetězec, který začíná na `Qm`, za nímž následuje 44 písmen a číslic, které představují [kódovaný](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524) haš v base58, například `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, ale [to se pravděpodobně změní](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Počáteční stav je **Ve frontě**. Načítejte znovu, dokud se nezmění na **Připnuto**.

5. Kliknutím na své CID získáte odkaz. Mou aplikaci si můžete prohlédnout [zde](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im/).

6. Možná budete muset aktivovat svůj účet, aby byl připnutý déle než měsíc. Aktivace účtu stojí asi 1 dolar. Pokud jste ji zavřeli, odhlaste se a znovu se přihlaste, abyste byli znovu požádáni o aktivaci.

## Používání z IPFS {#using-from-ipfs}

V tomto okamžiku máte odkaz na centralizovanou bránu, která poskytuje váš obsah z IPFS. Stručně řečeno, vaše uživatelské rozhraní může být o něco bezpečnější, ale stále není odolné vůči cenzuře. Pro skutečnou odolnost proti cenzuře musí uživatelé používat IPFS [přímo z prohlížeče](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Jakmile máte toto nainstalováno (a funguje desktopová aplikace IPFS), můžete přejít na [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) na jakékoli stránce a získáte tento obsah, poskytovaný decentralizovaným způsobem.

## Nevýhody {#drawbacks}

Soubory IPFS nelze spolehlivě mazat, takže dokud upravujete své uživatelské rozhraní, je pravděpodobně nejlepší jej buď nechat centralizovaný, nebo použít [Interplanetární jmenný systém (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), systém, který poskytuje proměnlivost nad IPFS. Samozřejmě, vše, co je proměnlivé, může být cenzurováno, v případě IPNS nátlakem na osobu s privátním klíčem, kterému odpovídá.

Některé balíčky mají navíc s IPFS problém, takže pokud je vaše webová stránka velmi složitá, nemusí to být dobré řešení. A samozřejmě cokoli, co se spoléhá na integraci serveru, nelze decentralizovat jen tím, že klientská strana bude na IPFS.

## Závěr {#conclusion}

Stejně jako vám Ethereum umožňuje decentralizovat databázové a obchodní logické aspekty vaší dapp, IPFS vám umožňuje decentralizovat uživatelské rozhraní. To vám umožní uzavřít další vektor útoku proti vaší dapp.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
