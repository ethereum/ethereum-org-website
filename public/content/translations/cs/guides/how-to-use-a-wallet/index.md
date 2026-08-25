---
title: "Jak používat peněženku"
metaTitle: "Jak používat Ethereum peněženky | Krok za krokem"
description: "Průvodce vysvětlující, jak odesílat a přijímat tokeny a jak se připojit k web3 projektům."
lang: cs
---

Naučte se ovládat všechny základní funkce peněženky. Pokud ji ještě nemáte, podívejte se na náš návod [Jak si vytvořit Ethereum účet](/guides/how-to-create-an-ethereum-account/).

## Otevřete svou peněženku {#open-your-wallet}

Měli byste vidět řídicí panel, který pravděpodobně zobrazí váš zůstatek a obsahuje tlačítka pro odesílání a přijímání tokenů.

## Přijímání kryptoměny {#receive-cryptocurrency}

Chcete do své peněženky přijmout krypto?

Každý Ethereum účet má svou vlastní přijímací adresu, což je unikátní sekvence čísel a písmen. Adresa funguje jako číslo bankovního účtu. Ethereum adresy vždy začínají na „0x“. Tuto adresu můžete s kýmkoli sdílet: je to bezpečné.

Vaše adresa je jako adresa vašeho bydliště: musíte lidem říct, jaká je, aby vás mohli najít. Je to bezpečné, protože své vchodové dveře můžete stále zamknout jiným klíčem, který ovládáte pouze vy, takže se nikdo nedostane dovnitř, i když ví, kde bydlíte.

Tomu, kdo vám chce poslat peníze, musíte poskytnout svou veřejnou adresu. Mnoho aplikací peněženek vám umožňuje zkopírovat vaši adresu nebo zobrazit QR kód k naskenování pro snazší použití. Vyhněte se ručnímu přepisování jakékoli Ethereum adresy. To může snadno vést k překlepům a ztrátě prostředků.

Různé aplikace se mohou lišit nebo používat jiný jazyk, ale pokud se snažíte o převod prostředků, měly by vás provést podobným procesem.

1. Otevřete aplikaci své peněženky.
2. Klikněte na „Přijmout“ (nebo podobně formulovanou možnost).
3. Zkopírujte svou Ethereum adresu do schránky.
4. Poskytněte odesílateli svou přijímací Ethereum adresu.

## Odesílání kryptoměny {#send-cryptocurrency}

Chtěli byste odeslat ETH do jiné peněženky?

1. Otevřete aplikaci své peněženky.
2. Získejte přijímací adresu a ujistěte se, že jste připojeni ke stejné síti jako příjemce.
3. Zadejte přijímací adresu nebo naskenujte QR kód pomocí fotoaparátu, abyste nemuseli adresu psát ručně.
4. Klikněte na tlačítko „Odeslat“ ve své peněžence (nebo na podobně formulovanou alternativu).

![Send field for crypto address](./send.png)
<br/>

5. Mnoho aktiv, jako jsou DAI nebo USDC, existuje na více sítích. Při převodu krypto tokenů se ujistěte, že příjemce používá stejnou síť jako vy, protože tyto sítě nejsou zaměnitelné.
6. Ujistěte se, že má vaše peněženka dostatek ETH na pokrytí transakčního poplatku, který se liší v závislosti na podmínkách sítě. Většina peněženek automaticky přidá navrhovaný poplatek k transakci, kterou pak můžete potvrdit.
7. Jakmile je vaše transakce zpracována, odpovídající částka v kryptu se objeví na účtu příjemce. To může trvat od několika sekund do několika minut v závislosti na tom, jak moc je síť aktuálně využívána.

## Připojování k projektům {#connecting-to-projects}

Vaše adresa bude ve všech Ethereum projektů stejná. Nemusíte se registrovat do každého projektu zvlášť. Jakmile máte peněženku, můžete se připojit k jakémukoli Ethereum projektu bez jakýchkoli dalších informací. Nejsou potřeba žádné e-maily ani jiné osobní údaje.

1. Navštivte webové stránky jakéhokoli projektu.
2. Pokud je vstupní stránka projektu pouze jeho statickým popisem, měli byste mít možnost kliknout v nabídce na tlačítko „Otevřít aplikaci“, které vás přesměruje do samotné webové aplikace.
3. Jakmile jste v aplikaci, klikněte na „Připojit“.

![Button allowing user to connect to the website with a wallet](./connect1.png)

4. Vyberte svou peněženku z poskytnutého seznamu možností. Pokud svou peněženku nevidíte, může být skrytá pod možností „WalletConnect“.

![Selecting from a list of wallets to connect with](./connect2.png)

5. Potvrďte žádost o podpis ve své peněžence, abyste navázali spojení. **Podepisování této zprávy by nemělo vyžadovat utracení žádného ETH**.
6. To je vše! Začněte aplikaci používat. Některé zajímavé projekty můžete najít na naší [stránce s decentralizovanými aplikacemi (dapps)](/apps/#explore).
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

## Často kladené dotazy {#frequently-asked-questions}

### Pokud vlastním ETH adresu, vlastním stejnou adresu i na jiných blockchainech? {#if-i-own-an-eth-address-do-i-own-the-same-address-on-other-blockchains}

Stejnou adresu můžete použít na všech blockchainech kompatibilních s EVM (pokud máte typ peněženky s frází pro obnovení). Tento [seznam](https://chainlist.org/) vám ukáže, které blockchainy můžete používat se stejnou adresou. Některé blockchainy, jako je Bitcoin, implementují zcela odlišný soubor pravidel sítě a budete potřebovat jinou adresu s jiným formátem. Pokud máte peněženku typu chytrý kontrakt, měli byste se podívat na webové stránky jejího produktu pro více informací o tom, které blockchainy jsou podporovány.

### Mohu používat stejnou adresu na více zařízeních? {#can-i-use-the-same-address-on-multiple-devices}

Ano, stejnou adresu můžete používat na více zařízeních. Peněženky jsou technicky pouze rozhraním, které vám ukazuje váš zůstatek a umožňuje provádět transakce, váš účet není uložen uvnitř peněženky, ale na blockchainu.

### Neobdržel jsem krypto, kde mohu zkontrolovat stav transakce? {#i-have-not-received-the-crypto-where-can-i-check-the-status-of-a-transaction}

Ke sledování stavu jakékoli transakce v reálném čase můžete použít [prohlížeče bloků](/developers/docs/data-and-analytics/block-explorers/). Vše, co musíte udělat, je vyhledat adresu vaší peněženky nebo ID transakce.

### Mohu zrušit nebo vrátit transakce? {#can-i-cancel-or-return-transactions}

Ne, jakmile je transakce potvrzena, nemůžete ji zrušit.
