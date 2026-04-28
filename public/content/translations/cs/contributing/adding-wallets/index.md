---
title: "Přidávání peněženek"
description: "Zásady, které používáme při přidávání peněženek na ethereum.org"
lang: cs
---

# Přidávání peněženek {#adding-wallets}

Chceme se ujistit, že ukazujeme různé peněženky pokrývající bohatou nabídku funkcí, aby se uživatelé mohli na Ethereu s jistotou orientovat.

Kdokoli může na stránkách ethereum.org navrhnout peněženku. Pokud jsme nějakou peněženku přehlédli, prosím, navrhněte ji!

Peněženky jsou v současné době uvedeny na:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

Peněženky se na Ethereu rychle mění. Snažili jsme se vytvořit spravedlivý framework pro posuzování na ethereum.org, ale kritéria pro zařazení do seznamu se budou časem měnit a vyvíjet.

## Rozhodovací rámec {#the-decision-framework}

### Kritéria pro zařazení: povinné vlastnosti {#the-must-haves}

- **Produkt otestovaný z hlediska bezpečnosti** – ať už prostřednictvím auditu, interního bezpečnostního týmu, otevřeného zdrojového kódu nebo jiné metody, bezpečnost vaší peněženky musí být spolehlivá. Snižujete tím riziko pro naše uživatele a dáváte nám najevo, že zabezpečení berete vážně.
- **Peněženka, která je v provozu déle než šest měsíců NEBO ji vydala skupina s dobrou pověstí** – to je další ukazatel bezpečnosti. 6 měsíců je dostatečná doba na to, aby byly nalezeny kritické chyby a zneužití. Požadujeme šest měsíců, abychom pomohli odfiltrovat forky, které jsou jako projekty rychle opuštěny.
- **Pracuje na ní aktivní tým** – pomáhá to zajistit kvalitu a to, že uživatel dostane podporu ke svým dotazům.
- **Poctivé a přesné informace o zařazení** - očekává se, že všechny navrhované seznamy z projektů budou obsahovat poctivé a přesné informace. Produkty, které zfalšují výpisy informací, například uvedou, že váš produkt je „open-source“, i když tomu tak není, budou odstraněny.
- **Kontaktní osoba** – kontaktní osoba pro peněženku nám výrazně pomůže získat přesné informace v případě změn. Díky tomu bude aktualizace ethereum.org při shromažďování budoucích informací zvládnutelná.
- **Transakce EIP-1559 (typ 2)** – vaše peněženka musí podporovat transakce EIP-1559 (typ 2) pro transakce na hlavní síti Etherea.
- **Dobrý uživatelský zážitek** – přestože je UX subjektivní, pokud několik členů hlavního týmu otestuje produkt a zjistí, že je obtížné ho používat, vyhrazujeme si právo peněženku odmítnout a místo toho poskytneme užitečné návrhy na zlepšení. Důvodem je ochrana naší uživatelské základny, která se skládá převážně ze začátečníků.
- **Zaměření na Ethereum** – peněženka musí poskytovat primárně na Ethereum zaměřený zážitek. To znamená, že Ethereum (nebo jakákoli L2) je nastaveno jako výchozí síť, aktiva ERC jsou řádně podporována a funkce jsou v souladu s ekosystémem Etherea. Peněženky, které v uživatelském rozhraní upřednostňují alternativní vrstvy 1, nebudou uvedeny.

### Odstranění produktů {#product-removals}

- **Aktualizované informace** – poskytovatelé peněženek jsou povinni každých 6 měsíců znovu předložit informace o své peněžence, aby byla zajištěna platnost a relevance poskytnutých informací (i když u jejich produktu nedošlo k žádným změnám). Pokud tak produktový tým neučiní, může ethereum.org projekt ze stránky odstranit.

### Další kritéria: co se hodí {#the-nice-to-haves}

- **Globálně přístupná** – vaše peněženka nemá geografická omezení ani požadavky KYC, které by z přístupu k vašim službám vylučovaly určité osoby.
- **K dispozici ve více jazycích** – vaše peněženka je přeložena do více jazyků, takže k ní mají přístup uživatelé z celého světa.
- **Open source** – všechen kód projektu (nejen moduly) musí být přístupný a měli byste přijímat pull requesty od širší komunity.
- **Neopatrovnická** – uživatelé mají své prostředky pod kontrolou. Pokud váš produkt zmizí, uživatelé mají stále přístup ke svým prostředkům a mohou je přesunout.
- **Podpora hardwarových peněženek** – uživatelé mohou připojit svou hardwarovou peněženku a podepisovat transakce.
- **WalletConnect** – uživatelé se mohou připojit k dapps pomocí WalletConnect.
- **Importování RPC koncových bodů Etherea** – uživatelé mohou importovat data RPC uzlů, což jim umožní připojit se k vybranému uzlu nebo k jiným sítím kompatibilním s EVM.
- **NFTs** – uživatelé mohou v peněžence prohlížet své NFT a pracovat s nimi.
- **Připojení k aplikacím Etherea** – uživatelé se mohou připojit k aplikacím Etherea a používat je.
- **Stakování** – uživatelé mohou stakovat přímo prostřednictvím peněženky.
- **Směny** – uživatelé mohou směňovat tokeny prostřednictvím peněženky.
- **Multichainové sítě** – vaše peněženka ve výchozím nastavení podporuje přístup uživatelů k více blockchainovým sítím.
- **Sítě druhé vrstvy** – vaše peněženka ve výchozím nastavení podporuje přístup uživatelů k sítím druhé vrstvy.
- **Přizpůsobení poplatků za palivo** – vaše peněženka umožňuje uživatelům přizpůsobit si transakční poplatky za palivo (základní poplatek, prioritní poplatek, maximální poplatek).
- **Podpora ENS** – vaše peněženka umožňuje uživatelům posílat transakce na jména ENS.
- **Podpora ERC-20** – vaše peněženka umožňuje uživatelům importovat kontrakty tokenů ERC-20 nebo automaticky vyhledává a zobrazuje tokeny ERC-20.
- **Nákup kryptoměn** – vaše peněženka podporuje přímý nákup kryptoměn a usnadňuje uživatelům vstup do světa krypta.
- **Prodej za fiat** – vaše peněženka podporuje prodej za fiat a výběr přímo na kartu nebo bankovní účet.
- **Multisig** – vaše peněženka podporuje více podpisů k podepsání transakce.
- **Sociální obnovení** – vaše peněženka podporuje strážce a uživatel může pomocí těchto strážců obnovit svou peněženku, pokud ztratí bezpečnostní frázi.
- **Specializovaný tým podpory** – vaše peněženka má specializovaný tým podpory, na který se uživatelé mohou obrátit v případě problémů.
- **Vzdělávací zdroje / dokumentace** – váš produkt by měl mít dobře navržené vstupní prostředí, které uživatelům pomáhá a vzdělává je. Nebo důkazy o obsahu s návody, jako jsou články nebo videa.

## Přidání peněženky {#adding-a-wallet}

Pokud chcete přidat peněženku na ethereum.org, vytvořte problém na GitHubu.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Vytvořit issue
</ButtonLink>

## Údržba {#maintenance}

Jak už to na Ethereu bývá, týmy a produkty přicházejí a odcházejí a denně dochází k inovacím, proto budeme provádět rutinní kontroly našeho obsahu:

- zajistíme, aby všechny uvedené peněženky a dappky stále splňovaly naše kritéria
- ověříme, zda nebyly navrženy produkty, které by splňovaly více našich kritérií než ty, které jsou v současné době uvedeny

ethereum.org je spravováno open source komunitou a spoléháme na to, že komunita pomůže udržovat tento web aktuální. Pokud si všimnete, že je třeba aktualizovat nějaké informace o uvedených peněženkách, prosím [nahlaste problém](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) nebo [vytvořte pull request](https://github.com/ethereum/ethereum-org-website/pulls)!

## Podmínky použití {#terms-of-use}

Přečtěte si také naše [podmínky používání](/terms-of-use/). Informace na ethereum.org jsou poskytovány výhradně pro obecné informační účely.
