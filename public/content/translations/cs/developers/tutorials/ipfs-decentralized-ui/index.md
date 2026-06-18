---
title: IPFS pro decentralizovaná uživatelská rozhraní
description: Tento tutoriál učí čtenáře, jak používat IPFS k ukládání uživatelského rozhraní pro decentralizovanou aplikaci (dapp). Ačkoli jsou data a obchodní logika aplikace decentralizované, bez uživatelského rozhraní odolného vůči cenzuře by k ní uživatelé mohli stejně ztratit přístup.
author: Ori Pomerantz
tags:
  - ipfs
  - dapps
  - frontend
skill: beginner
breadcrumb: IPFS pro uživatelská rozhraní dapp
lang: cs
published: 2024-06-29
---

Napsali jste úžasnou novou decentralizovanou aplikaci (dapp). Dokonce jste pro ni napsali [uživatelské rozhraní](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Nyní se ale obáváte, že se ji někdo pokusí cenzurovat tím, že vaše uživatelské rozhraní, které běží jen na jednom serveru v cloudu, odstaví. V tomto tutoriálu se dozvíte, jak se vyhnout cenzuře umístěním vašeho uživatelského rozhraní na **[meziplanetární souborový systém (IPFS)](https://ipfs.tech/developers/)**, aby si jej kdokoli mohl připnout (pin) na server pro budoucí přístup.

K provedení veškeré práce byste mohli použít službu třetí strany, jako je [Fleek](https://resources.fleek.xyz/docs/). Tento tutoriál je pro lidi, kteří chtějí udělat dost pro to, aby pochopili, co dělají, i když to znamená více práce.

## Začínáme lokálně {#getting-started-locally}

Existuje několik [poskytovatelů IPFS třetích stran](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), ale pro testování je nejlepší začít spuštěním IPFS lokálně.

1. Nainstalujte si [uživatelské rozhraní IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Vytvořte adresář se svým webem. Pokud používáte [Vite](https://vite.dev/), použijte tento příkaz:

   ```sh
   pnpm vite build
   ```

3. V aplikaci IPFS Desktop klikněte na **Import > Folder** a vyberte adresář, který jste vytvořili v předchozím kroku.

4. Vyberte složku, kterou jste právě nahráli, a klikněte na **Rename** (Přejmenovat). Dejte jí smysluplnější název.

5. Znovu ji vyberte a klikněte na **Share link** (Sdílet odkaz). Zkopírujte URL do schránky. Odkaz bude vypadat podobně jako `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Klikněte na **Status**. Rozbalte kartu **Advanced** (Pokročilé), abyste viděli adresu brány. Například na mém systému je adresa `http://127.0.0.1:8080`.

7. Zkombinujte cestu z kroku s odkazem s adresou brány, abyste získali svou adresu. Například pro výše uvedený příklad je URL `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Otevřete tuto URL v prohlížeči a uvidíte svůj web.

## Nahrávání {#uploading}

Nyní tedy můžete používat IPFS k lokálnímu poskytování souborů, což není příliš vzrušující. Dalším krokem je zpřístupnit je světu, i když jste offline.

Existuje řada známých [pinovacích služeb](https://docs.ipfs.tech/concepts/persistence/#pinning-services). Vyberte si jednu z nich. Ať už použijete jakoukoli službu, musíte si vytvořit účet a poskytnout jí **identifikátor obsahu (CID)** z vašeho IPFS Desktopu.

Osobně mi přišlo nejjednodušší použít [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides). Zde je návod, jak na to:

1. Přejděte na [řídicí panel](https://dashboard.4everland.org/overview) a přihlaste se pomocí své peněženky.

2. V levém postranním panelu klikněte na **Storage > 4EVER Pin**.

3. Klikněte na **Upload > Selected CID**. Pojmenujte svůj obsah a zadejte CID z IPFS Desktopu. V současné době je CID řetězec, který začíná na `Qm` a po něm následuje 44 písmen a číslic, které představují hash [zakódovaný v base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), jako například `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, ale [to se pravděpodobně změní](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Počáteční stav je **Queued** (Ve frontě). Obnovujte stránku, dokud se nezmění na **Pinned** (Připnuto).

5. Kliknutím na vaše CID získáte odkaz. Moji aplikaci si můžete prohlédnout [zde](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Možná budete muset provést aktivaci účtu, aby byl obsah připnutý déle než měsíc. Aktivace účtu stojí asi 1 dolar. Pokud jste výzvu zavřeli, odhlaste se a znovu se přihlaste, abyste byli k aktivaci vyzváni znovu.

## Používání z IPFS {#using-from-ipfs}

V tuto chvíli máte odkaz na centralizovanou bránu, která poskytuje váš obsah z IPFS. Stručně řečeno, vaše uživatelské rozhraní může být o něco bezpečnější, ale stále není odolné vůči cenzuře. Pro skutečnou odolnost vůči cenzuře musí uživatelé používat IPFS [přímo z prohlížeče](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Jakmile to budete mít nainstalované (a desktopové IPFS bude fungovat), můžete na jakémkoli webu přejít na [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) a získáte daný obsah, který je poskytován decentralizovaným způsobem.

## Nevýhody {#drawbacks}

Soubory na IPFS nelze spolehlivě smazat, takže dokud své uživatelské rozhraní upravujete, je pravděpodobně nejlepší nechat ho buď centralizované, nebo použít [interplanetary name system (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), což je systém, který poskytuje měnitelnost nad IPFS. Samozřejmě, cokoli, co je měnitelné, může být cenzurováno, v případě IPNS nátlakem na osobu se soukromým klíčem, kterému odpovídá.

Některé balíčky mají navíc s IPFS problém, takže pokud je váš web velmi složitý, nemusí to být dobré řešení. A samozřejmě, cokoli, co spoléhá na integraci se serverem, nelze decentralizovat jen tím, že klientská část bude na IPFS.

## Objevitelnost přes ENS {#discoverability}

Pokud na svůj web nasměrujete jméno ENS (například vitalik.eth), bude považován za plně decentralizovanou webovou stránku a bude automaticky připnut službou [dweb3.wtf](https://dweb3.wtf), a také bude vyhledatelný prostřednictvím vyhledávače [web3compass.net](https://web3compass.net), podobně jako to dělá DuckDuckGo, Brave Search nebo Google pro tradiční web.

## Závěr {#conclusion}

Stejně jako vám Ethereum umožňuje decentralizovat databázi a obchodní logiku vaší dapp, IPFS vám umožňuje decentralizovat uživatelské rozhraní. To vám umožní uzavřít další vektor útoku proti vaší dapp.

[Zde najdete další mou práci](https://cryptodocguy.pro/).