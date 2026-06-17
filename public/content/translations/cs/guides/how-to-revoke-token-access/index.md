---
title: Jak zrušit přístup chytrých kontraktů k vašim kryptoměnám
description: Návod, jak zrušit přístup zneužívajících chytrých kontraktů k tokenům
lang: cs
---

Tento průvodce vás naučí, jak zobrazit seznam všech [chytrých kontraktů](/glossary/#smart-contract), kterým jste povolili přístup ke svým prostředkům, a jak je zrušit.

Někdy zlomyslní vývojáři zabudují do chytrých kontraktů zadní vrátka, která umožňují přístup k prostředkům nevědomých uživatelů, kteří s chytrým kontraktem interagují. Často se stává, že takové platformy žádají uživatele o povolení utratit **neomezené množství tokenů** ve snaze ušetřit v budoucnu malé množství [gasu](/glossary/#gas), ale to s sebou nese zvýšené riziko.

Jakmile má platforma neomezená přístupová práva k tokenu ve vaší [peněžence](/glossary/#wallet), může utratit všechny tyto tokeny, i když jste své prostředky z jejich platformy vybrali zpět do své peněženky. Zlomyslní aktéři mohou stále přistupovat k vašim prostředkům a vybrat je do svých peněženek, aniž byste měli jakoukoli možnost obnovy.

Jedinou ochranou je zdržet se používání netestovaných nových projektů, schválit pouze to, co potřebujete, nebo pravidelně rušit přístup. Jak to tedy udělat?

## Krok 1: Použijte nástroje pro zrušení přístupu {#step-1-use-revoke-access-tools}

Několik webových stránek vám umožňuje zobrazit a zrušit chytré kontrakty připojené k vaší adrese. Navštivte webovou stránku a připojte svou peněženku:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (více sítí)
- [Unrekt](https://app.unrekt.net/) (více sítí)
- [EverRevoke](https://everrise.com/everrevoke/) (více sítí)

## Krok 2: Připojte svou peněženku {#step-2-connect-your-wallet}

Jakmile jste na webové stránce, klikněte na „Connect wallet“ (Připojit peněženku). Webová stránka by vás měla vyzvat k připojení vaší peněženky.

Ujistěte se, že ve své peněžence i na webové stránce používáte stejnou síť. Uvidíte pouze chytré kontrakty související s vybranou sítí. Pokud se například připojíte k síti Ethereum Mainnet, uvidíte pouze kontrakty na Ethereu, nikoli kontrakty z jiných řetězců, jako je Polygon.

## Krok 3: Vyberte chytrý kontrakt, který chcete zrušit {#step-3-select-a-smart-contract-you-wish-to-revoke}

Měli byste vidět všechny kontrakty, které mají povolený přístup k vašim tokenům, a jejich povolený limit útraty. Najděte ten, který chcete ukončit.

Pokud nevíte, který kontrakt vybrat, můžete zrušit všechny. Nezpůsobí vám to žádné problémy, ale při příští interakci s kterýmkoli z těchto kontraktů budete muset udělit novou sadu oprávnění.

## Krok 4: Zrušte přístup ke svým prostředkům {#step-4-revoke-access-to-your-funds}

Jakmile kliknete na zrušit (revoke), měli byste ve své peněžence vidět návrh nové transakce. To se dá očekávat. Aby bylo zrušení úspěšné, budete muset zaplatit transakční poplatek. V závislosti na síti může zpracování trvat od jedné do několika minut.

Doporučujeme vám po několika minutách obnovit nástroj pro zrušení a znovu připojit peněženku, abyste si ověřili, zda zrušený kontrakt zmizel ze seznamu.

<mark>Doporučujeme, abyste projektům nikdy nepovolovali neomezený přístup k vašim tokenům a pravidelně rušili všechny povolené limity tokenů. Zrušení přístupu k tokenům by nikdy nemělo vést ke ztrátě prostředků, zejména pokud používáte výše uvedené nástroje.</mark>

 <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Chcete se dozvědět více?</div>
  <ButtonLink href="/guides/">
    Podívejte se na naše další průvodce
  </ButtonLink>
</AlertContent>
</Alert>

## Často kladené dotazy {#frequently-asked-questions}

### Ukončí zrušení přístupu k tokenům také staking, pooling, půjčování atd.? {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

Ne, neovlivní to žádnou z vašich strategií v rámci [decentralizovaných financí (DeFi)](/glossary/#defi). Zůstanete ve svých pozicích a budete nadále získávat odměny atd.

### Je odpojení peněženky od projektu totéž jako odebrání oprávnění používat mé prostředky? {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

Ne, pokud odpojíte svou peněženku od projektu, ale udělili jste oprávnění pro povolený limit tokenů, mohou tyto tokeny stále používat. Tento přístup musíte zrušit.

### Kdy vyprší oprávnění kontraktu? {#when-will-the-contract-permission-expire}

Oprávnění kontraktu nemají žádné datum vypršení platnosti. Pokud udělíte oprávnění kontraktu, mohou být použita i roky po jejich udělení.

### Proč projekty nastavují neomezený povolený limit tokenů? {#why-do-projects-set-unlimited-token-allowance}

Projekty to často dělají, aby minimalizovaly počet požadovaných žádostí, což znamená, že uživatel musí schválit a zaplatit transakční poplatek pouze jednou. Ačkoli je to pohodlné, může být pro uživatele nebezpečné neopatrně schvalovat přístup na stránkách, které nejsou prověřené časem nebo auditované. Některé peněženky vám umožňují ručně omezit množství schvalovaných tokenů, abyste omezili své riziko. Pro více informací se obraťte na poskytovatele vaší peněženky.