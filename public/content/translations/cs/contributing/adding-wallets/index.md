---
title: Přidávání peněženek
description: Zásady, kterými se řídíme při přidávání peněženky na ethereum.org
lang: cs
---

Chceme se ujistit, že zobrazujeme rozmanitou škálu peněženek pokrývajících prostředí peněženek bohaté na funkce, aby se uživatelé mohli v Ethereu pohybovat s jistotou.

Kdokoli může navrhnout přidání peněženky na ethereum.org. Pokud jsme nějakou peněženku vynechali, navrhněte ji prosím!

Peněženky jsou aktuálně uvedeny na:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

Peněženky se v Ethereu rychle mění. Snažili jsme se vytvořit spravedlivý rámec pro posuzování na ethereum.org, ale kritéria pro zařazení se budou v průběhu času měnit a vyvíjet.

## Rámec pro rozhodování {#the-decision-framework}

### Kritéria pro zařazení: nutné požadavky {#the-must-haves}

- **Bezpečnostně testovaný produkt** – ať už prostřednictvím auditu, interního bezpečnostního týmu, open source kódu nebo jiné metody, bezpečnost vaší peněženky musí být spolehlivá. To snižuje riziko pro naše uživatele a ukazuje nám, že berete bezpečnost vážně.
- **Peněženka, která je „v provozu“ déle než šest měsíců NEBO ji vydala skupina s dobrou pověstí** – to je další známka bezpečnosti. Šest měsíců je dostatečně dlouhá doba na to, aby byly odhaleny kritické chyby a zneužití. Požadujeme šest měsíců, abychom pomohli odfiltrovat forky, které jsou jako projekty rychle opuštěny.
- **Pracuje na ní aktivní tým** – to pomáhá zajistit kvalitu a to, že uživatel získá podporu pro své dotazy.
- **Pravdivé a přesné informace o zařazení** – očekává se, že jakékoli navrhované zařazení od projektů bude obsahovat pravdivé a přesné informace. Produkty, které falšují informace o zařazení, například prohlašují, že je váš produkt „open source“, i když tomu tak není, budou odstraněny.
- **Kontaktní osoba** – kontaktní osoba pro peněženku nám velmi pomůže získat přesné informace při provádění změn. Díky tomu bude aktualizace ethereum.org při shromažďování budoucích informací zvládnutelná.
- **Transakce EIP-1559 (typ 2)** – vaše peněženka musí podporovat transakce EIP-1559 (typ 2) pro transakce na síti Mainnet Etherea.
- **Dobrá uživatelská zkušenost** – ačkoli je UX subjektivní, pokud několik členů hlavního týmu produkt otestuje a zjistí, že se obtížně používá, vyhrazujeme si právo peněženku odmítnout a místo toho poskytneme užitečné návrhy na zlepšení. Děláme to proto, abychom chránili naši uživatelskou základnu, která se skládá převážně ze začátečníků.
- **Zaměření na Ethereum** – peněženka musí poskytovat primární zkušenost zaměřenou na Ethereum. To znamená, že Ethereum (nebo jakákoli vrstva 2 (l2)) je nastaveno jako výchozí síť, aktiva ERC jsou řádně podporována a funkce jsou v souladu s ekosystémem Etherea. Peněženky, které v uživatelském rozhraní upřednostňují alternativní vrstvy 1, nebudou zařazeny. 

### Odstranění produktů {#product-removals}

- **Aktualizované informace** – poskytovatelé peněženek jsou zodpovědní za opětovné odeslání informací o své peněžence každých 6 měsíců, aby byla zajištěna platnost a aktuálnost poskytnutých informací (i když na jejich produktu nedošlo k žádným změnám). Pokud tak tým produktu neučiní, ethereum.org může projekt ze stránky odstranit. 

### Další kritéria: co by bylo dobré mít {#the-nice-to-haves}

- **Globálně dostupné** – vaše peněženka nemá geografická omezení ani požadavky na KYC, které by určitým lidem bránily v přístupu k vaší službě.
- **Dostupné ve více jazycích** – vaše peněženka je přeložena do více jazyků, což k ní umožňuje přístup uživatelům po celém světě.
- **Open source** – kódová základna celého vašeho projektu (nejen moduly) by měla být přístupná a měli byste přijímat PR (pull requesty) od širší komunity.
- **Nekustodiální** – uživatelé mají kontrolu nad svými prostředky. Pokud váš produkt zmizí, uživatelé mohou ke svým prostředkům stále přistupovat a přesouvat je.
- **Podpora hardwarových peněženek** – uživatelé mohou připojit svou hardwarovou peněženku k podepisování transakcí.
- **WalletConnect** – uživatelé se mohou připojit k decentralizovaným aplikacím (dapp) pomocí WalletConnect.
- **Import koncových bodů RPC Etherea** – uživatelé mohou importovat data RPC uzlu, což jim umožňuje připojit se k uzlu podle vlastního výběru nebo k jiným sítím kompatibilním s EVM.
- **NFT** – uživatelé si mohou prohlížet svá NFT a pracovat s nimi v peněžence.
- **Připojení k aplikacím Etherea** – uživatelé se mohou připojit k aplikacím Etherea a používat je.
- **Staking** – uživatelé mohou stakovat přímo přes peněženku.
- **Swapy** – uživatelé mohou swapovat tokeny prostřednictvím peněženky.
- **Víceřetězcové sítě** – vaše peněženka ve výchozím nastavení podporuje přístup uživatelů k více blockchainovým sítím.
- **Sítě vrstvy 2 (l2)** – vaše peněženka ve výchozím nastavení podporuje přístup uživatelů k sítím vrstvy 2 (l2).
- **Přizpůsobení poplatků za gas** – vaše peněženka umožňuje uživatelům přizpůsobit si poplatky za gas u transakcí (základní poplatek, prioritní poplatek, maximální poplatek).
- **Podpora ENS** – vaše peněženka umožňuje uživatelům odesílat transakce na jména ENS.
- **Podpora ERC-20** – vaše peněženka umožňuje uživatelům importovat kontrakty tokenů ERC-20 nebo automaticky dotazuje a zobrazuje tokeny ERC-20.
- **Nákup krypta** – vaše peněženka podporuje uživatele v přímém nákupu a onboardingu do krypta.
- **Prodej za fiat** – vaše peněženka podporuje uživatele v prodeji a výběru do fiat měny přímo na kartu nebo bankovní účet.
- **Multisig** – vaše peněženka podporuje více podpisů k podepsání transakce.
- **Sociální obnova** – vaše peněženka podporuje strážce (guardians) a uživatel může obnovit svou peněženku, pokud ztratí svou seed frázi, pomocí těchto strážců.
- **Vyhrazený tým podpory** – vaše peněženka má vyhrazený tým podpory, na který se uživatelé mohou obrátit, když narazí na problémy.
- **Vzdělávací zdroje/dokumentace** – váš produkt by měl mít dobře navržený proces onboardingu, který uživatelům pomůže a vzdělá je. Nebo důkazy o obsahu s návody, jako jsou články nebo videa.

## Přidání peněženky {#adding-a-wallet}

Pokud chcete přidat peněženku na ethereum.org, vytvořte issue na GitHubu.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Vytvořit issue
</ButtonLink>

## Údržba {#maintenance}

Vzhledem k proměnlivé povaze Etherea týmy a produkty přicházejí a odcházejí a k inovacím dochází denně, proto budeme provádět rutinní kontroly našeho obsahu, abychom:

- zajistili, že všechny uvedené peněženky a decentralizované aplikace (dapp) stále splňují naše kritéria
- ověřili, že neexistují navržené produkty, které by splňovaly více našich kritérií než ty, které jsou aktuálně uvedeny

ethereum.org spravuje open source komunita a spoléháme na ni, že nám pomůže udržovat tyto informace aktuální. Pokud si všimnete jakýchkoli informací o uvedených peněženkách, které je třeba aktualizovat, prosím [otevřete issue](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) nebo [pull request](https://github.com/ethereum/ethereum-org-website/pulls)!


## Podmínky použití {#terms-of-use}

Přečtěte si prosím také naše [podmínky použití](/terms-of-use/). Informace na ethereum.org jsou poskytovány výhradně pro obecné informační účely.