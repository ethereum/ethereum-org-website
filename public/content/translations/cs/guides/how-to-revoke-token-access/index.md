---
title: "Jak zrušit přístup chytrého kontraktu k vašim krypto fondům"
description: "Návod, jak odebrat přístup k vašim tokenům škodlivým smart kontraktům"
lang: cs
---

# Jak zrušit přístup chytrého kontraktu k vašim krypto fondům

V tomto návodu zjistíte, jak zobrazit seznam všech [smart kontraktů](/glossary/#smart-contract), kterým jste povolili přístup k vašim finančním prostředkům, a jak je zrušit.

Nečestní vývojáři mohou do smart kontraktů přidat zadní vrátka, která umožňují přístup k finančním prostředkům nevědomých uživatelů, kteří se smart kontraktem interagují. Často se stává, že takové platformy žádají uživatele o povolení utratit **neomezený počet tokenů** ve snaze ušetřit v budoucnu malé množství [gasu](/glossary/#gas), což je ale spojeno se zvýšeným rizikem.

Jakmile platforma získá neomezená přístupová práva k tokenu ve vaší [peněžence](/glossary/#wallet), může všechny tyto tokeny utratit, i když jste své prostředky z jejich platformy vybrali do své peněženky. Útočníci totiž mají stále přístup k vašim prostředkům a mohou je vybrat do svých peněženek, aniž byste měli možnost získat je zpět.

Jedinou ochranou je vyhnout se interakci s neověřenými novými projekty, schvalovat pouze to, co potřebujete, případně pravidelně odebírat přístup službám, které už nevyužíváte. Takže, jak na to?

## Krok 1: Používejte nástroje pro zrušení přístupu

Hned několik webových stránek vám umožňuje zobrazit a zrušit přístup smart kontraktů spojených s vaší adresou. Běžte na některou k následujících stránek a připojte svoji peněženku:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/apps/revokescout) (Ethereum)
- [Revoke](https://revoke.cash/) (více sítí)
- [Unrekt](https://app.unrekt.net/) (více sítí)
- [EverRevoke](https://everrise.com/everrevoke/) (více sítí)

## Krok 2: Připojte svoji peněženku

Jakmile budete na webové stránce, klikněte na možnost "Připojit peněženku". Webová stránka by vás měla vyzvat k připojení peněženky.

Ujistěte se, že v peněžence a na webové stránce používáte stejnou síť. Zobrazí se vám pouze chytré kontrakty související s vybranou sítí. Pokud se například připojíte k Ethereum Mainnetu, uvidíte pouze kontrakty na Ethereu, nikoliv kontrakty na jiných blockchainech, jako je Polygon.

## Krok 3: Vyberte smart kontrakt, kterému chcete zrušit přístup

Měli byste vidět všechny kontrakty, které mají povolený přístup k tokenům, a jejich limit výdajů. Najděte ten, kterému chcete zrušit přístup.

Pokud nevíte, který kontrakt vybrat, můžete zrušit přístup všem. To to pro vás nebude znamenat žádné problémy, ale při příští interakci s některým z těchto kontraktů, jim budete muset znovu povolit přístup.

## Krok 4: Zruště přístup k finančním prostředkům

Po kliknutí na zrušení přístupu by se měl v peněžence zobrazit návrh nové transakce. To lze očekávat. Aby bylo zrušení přístupu úspěšně dokončeno, musíte zaplatit transakční poplatek. V závislosti na vytížení sítě může zpracování trvat až několik minut.

Doporučujeme vám po několika minutách obnovit nástroj na zrušení přístupu a znovu připojit svoji peněženku, abyste si ověřili, zda kontrakt se zrušeným přístupem skutečně zmizel ze seznamu.

<mark>Doporučujeme vám nikdy nedávat projektům neomezený přístup k vašim tokenům a pravidelně rušit všechna oprávnění k přístupu k tokenům. Zrušení přístupu k tokenům by nikdy nemělo vést ke ztrátě finančních prostředků, zejména pokud používáte výše uvedené nástroje.</mark>

<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Chcete se dozvědět více?</div>
  <ButtonLink href="/guides/">
    Podívejte se na naše další návody
  </ButtonLink>
</AlertContent>
</Alert>

## Často kladené dotazy

### Ukončí zrušení přístupu k tokenům také staking, pooling, půjčky atd.?

Ne, neovlivní to žádnou z vašich [DeFi](/glossary/#defi) strategií. Zůstanete na svých pozicích a budete dostávat odměny atd.

### Je odpojení peněženky od projektu totéž jako odebrání povolení používat mé prostředky?

Ne, pokud svou peněženku od projektu odpojíte, ale udělili jste oprávnění k přístupu k tokenům, mohou tyto projekty vaše tokeny stále používat. Tento přístup musíte zrušit.

### Kdy vyprší platnost povolení kontraktu k přístupu k mým prostředkům?

Platnost povolení k přístupu není omezena. Pokud udělíte kontraktu oprávění, může ho použít i několik let po jeho udělení.

### Proč se v projektech dá nastavit přístup k neomezenému množství tokenů?

Projekty to často dělají proto, aby minimalizovaly počet žádostí, což znamená, že uživatel musí schválit přístup a zaplatit poplatek za transakci jen jednou. To je sice pohodlné, ale pro uživatele to může být nebezpečné při neopatrném udělování přístupu na stránkách, které nejsou prověřeny časem nebo které nejsou auditované. Některé peněženky umožňují ručně omezit množství schvalovaných tokenů, čímž se riziko zneužití prostředků snižuje. Další informace získáte u poskytovatele peněženky.
