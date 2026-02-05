---
title: Jak používat peněženku
metaTitle: Jak používat Ethereum peněženky | Krok za krokem
description: Návod vysvětlující, jak odesílat a přijímat tokeny a jak se připojovat k web3 projektům.
lang: cs
---

# Jak používat peněženku

Naučte se ovládat všechny základní funkce peněženky. Pokud ji ještě nemáte, podívejte se na náš návod [Jak vytvořit Ethereum účet](/guides/how-to-create-an-ethereum-account/).

## Otevřete vaši peněženku

Měli byste vidět ovládací panel, který pravděpodobně zobrazí váš zůstatek a bude obsahovat tlačítka pro odesílání a přijímání tokenů.

## Přijímání kryptoměn

Chcete přijímat kryptoměny do své peněženky?

Každý Ethereum účet má svou vlastní přijímací adresu, což je jedinečná sekvence čísel a písmen. Adresa funguje jako číslo bankovního účtu. Ethereum adresy vždy začínají řetězcem "0x". Tuto adresu můžete sdílet s kýmkoli: je to bezpečné.

S vaší adresou je to jako s adresou domova: musíte ji lidem sdělit, aby vás mohli najít. Je to bezpečné, protože vchodové dveře můžete stále zamykat jiným klíčem, který ovládáte pouze vy, takže se k vám nikdo nedostane, i když ví, kde bydlíte.

Tomu, kdo vám chce poslat peníze, musíte sdělit svou veřejnou adresu. Mnoho aplikací peněženek umožňuje zkopírovat adresu nebo zobrazit QR kód, který lze naskenovat pro snadnější použití. Vyhněte se ručnímu zadávání Ethereum adres. To může snadno vést k chybě v zadávání a ztrátě finančních prostředků.

Různé aplikace se mohou lišit nebo používat jiný jazyk, ale pokud se snažíte převést finanční prostředky, měly by vás provést podobným procesem.

1. Otevřete aplikaci peněženky.
2. Klikněte na možnost "Přijmout" (nebo podobně formulovanou možnost).
3. Zkopírujte Ethereum adresu do schránky.
4. Poskytněte odesílateli svou přijímací Ethereum adresu.

## Odesílání kryptoměn

Chcete poslat ETH do jiné peněženky?

1. Otevřete aplikaci peněženky.
2. Zjistěte adresu příjemce a ujistěte se, že jste připojeni ke stejné síti jako příjemce.
3. Zadejte adresu příjemce nebo naskenujte QR kód pomocí fotoaparátu, abyste nemuseli adresu psát ručně.
4. Klikněte v peněžence na tlačítko "Odeslat" (nebo na podobně formulovanou alternativu).

![Pole pro odeslání na krypto adresu](./send.png) <br/>

5. Mnoho aktiv, jako například DAI nebo USDC, existuje ve více sítích. Při převodu krypto tokenů se ujistěte, že příjemce používá stejnou síť jako vy, protože tyto tokeny nejsou zaměnitelné.
6. Ujistěte se, že máte v peněžence dostatek ETH na pokrytí transakčního poplatku, který se liší v závislosti na podmínkách sítě. Většina peněženek automaticky připočte navrhovaný poplatek k transakci, kterou pak můžete potvrdit.
7. Po zpracování transakce se na účtu příjemce objeví odpovídající částka v kryptoměnách. To může trvat od několika sekund do několika minut v závislosti na aktuálním vytížení sítě.

## Připojování se k projektům

Vaše adresa bude ve všech Ethereum projektech stejná. Na žádný projekt se nemusíte registrovat individuálně. Jakmile máte peněženku, můžete se připojit k jakémukoli Ethereum projektu bez dalších informací. Nejsou potřeba žádné e-maily ani jiné osobní údaje.

1. Navštivte webové stránky jakéhokoli projektu.
2. Pokud je vstupní stránka projektu pouze statickým popisem projektu, měli byste mít v nabídce možnost kliknout na tlačítko "Otevřít aplikaci", které vás přesměruje do skutečné webové aplikace.
3. Jakmile jste v aplikaci, klikněte na "Připojit".

![Tlačítko umožňující uživateli připojit se k webové stránce pomocí peněženky](./connect1.png)

4. Vyberte peněženku ze seznamu možností. Pokud svou peněženku nevidíte, může být skryta pod možností "WalletConnect".

![Výběr ze seznamu peněženek k připojení](./connect2.png)

5. Potvrďte žádost o podpis v peněžence a navažte spojení. **Podepsání této zprávy by nemělo vyžadovat utracení žádných ETH**.
6. A je to! Začněte aplikaci používat. Některé zajímavé projekty najdete na naší [stránce dApps](/apps/#explore). <br />

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

### Pokud mám ETH adresu, vlastním stejnou adresu i na jiných blockchainech?

Stejnou adresu můžete používat na všech blockchainech kompatibilních s EVM (pokud máte peněženku s frází pro obnovení). Tento [seznam](https://chainlist.org/) vám ukáže, které blockchainy můžete používat se stejnou adresou. Některé blockchainy, jako například Bitcoin, implementují samostatnou sadu síťových pravidel a budete na nich potřebovat jinou adresu s jiným formátem. Pokud máte peněženku s chytrými kontrakty, měli byste se podívat na jejich webové stránky, kde najdete další informace o podporovaných blockchainech.

### Mohu používat stejnou adresu na více zařízeních?

Ano, stejnou adresu můžete použít na více zařízeních. Peněženky jsou technicky vzato pouze rozhraním, které vám ukazuje zůstatek a umožňuje provádět transakce, váš účet není uložen v peněžence, ale na blockchainu.

### Neobdržel jsem krypto, kde mohu zkontrolovat stav transakce?

Můžete použít [prohlížeče bloků](/developers/docs/data-and-analytics/block-explorers/), abyste viděli stav jakékoli transakce v reálném čase. Stačí vyhledat adresu peněženky nebo ID transakce.

### Mohu transakce zrušit nebo vrátit?

Ne, jakmile je transakce potvrzena, nelze ji zrušit.
