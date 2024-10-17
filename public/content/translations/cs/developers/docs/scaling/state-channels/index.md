---
title: Stavové kanály
description: Úvod do stavových kanálů a platebních kanálů jako škálovacího řešení, které v současné době využívá komunita Etherea.
lang: cs
sidebarDepth: 3
---

Stavové kanály umožňují účastníkům bezpečně transakčně komunikovat mimo řetězec, přičemž minimalizují interakci s Ethereum Mainnetem. Partneři v tomto kanálu mohou provést libovolný počet transakcí mimo řetězec, přičemž na řetězec se zapisují pouze dvě transakce – jedna pro otevření kanálu a druhá pro jeho uzavření. Tím je dosaženo extrémně vysoké propustnosti transakcí a nižších nákladů pro uživatele.

##  {#how-do-sidechains-work}

Veřejné blockchainy, jako je Ethereum, čelí výzvám v oblasti škálovatelnosti kvůli své distribuované architektuře: Transakce na řetězci musí být vykonány všemi síťovými uzly. Ty musí být schopny zpracovat objem transakcí v bloku s použitím běžného hardwaru, což omezuje propustnost transakcí za účelem zachování decentralizace sítě.

###  {#consensus-algorithms}

Kanály jsou jednoduché peer-to-peer protokoly, které umožňují dvěma stranám provést mnoho transakcí mezi sebou a poté na blockchain zveřejnit pouze konečné výsledky. Kanál využívá kryptografii k prokázání, že souhrnná data, která generují, jsou skutečně výsledkem platné sady mezitransakcí. [„Multisig“](/developers/docs/smart-contracts/#multisig) smart kontrakt zajišťuje, že transakce jsou podepsány správnými stranami.

- []()
- []()
-

Ve stavových kanálech jsou změny stavu prováděny a ověřovány zainteresovanými stranami, což minimalizuje výpočty na exekuční vrstvě Etherea. To snižuje přetížení na Ethereu a zároveň zvyšuje rychlost zpracování transakcí uživatelů.

####  {#block-parameters}

Každý kanál je řízen [multisig smart kontraktem](/developers/docs/smart-contracts/#multisig) běžícím na Ethereu. K otevření kanálu účastníci nasadí kontrakt kanálu na řetězec a vloží do něj prostředky.

K uzavření kanálu účastníci předloží na řetězec poslední dohodnutý stav kanálu. Poté smart kontrakt rozdělí uzamčené prostředky podle zůstatku každého účastníka v konečném stavu kanálu.

Peer-to-peer kanály jsou užitečné zejména v situacích, kdy někteří účastníci chtějí provádět transakce s vysokou frekvencí bez viditelné režie. Blockchainové kanály spadají do dvou kategorií: **platební kanály** a **stavové kanály**.

###  {#evm-compatibility}

Platební kanál je nejlépe popsán jako „obousměrná účetní kniha“, kterou společně spravují dva uživatelé. Počáteční zůstatek účetní knihy je součtem vkladů uzamčených v on-chain kontraktu během fáze otevření kanálu.

Aktualizace zůstatku účetní knihy (tj. stavu platebního kanálu) vyžaduje souhlas všech stran v kanálu. Aktualizace kanálu, podepsaná všemi účastníky kanálu, je považována za konečnou, podobně jako transakce na Ethereu.

Platební kanály patřily mezi první škálovací řešení navržená k minimalizaci drahých on-chain aktivit nebo jednoduchých uživatelských interakcí (např. převody ETH, atomické směny, převody malých částek). Účastníci kanálu mohou mezi sebou provádět neomezené množství okamžitých, bezpoplatkových transakcí, dokud čistá suma jejich převodů nepřekročí vložené tokeny.

Kromě podpory off-chain plateb se platební kanály neukázaly býti užitečnými pro zpracování obecné logiky změny stavu. Stavové kanály byly vytvořeny k vyřešení tohoto problému a ke zpřístupnění kanálů pro škálování obecného výpočtu.

###  {#asset-movement}

Stavové kanály mají stále mnoho společného s platebními kanály. Například uživatelé komunikují výměnou kryptograficky podepsaných zpráv (transakcí), které musí podepsat i ostatní účastníci kanálu. Pokud navrhovaná aktualizace stavu není podepsána všemi účastníky, je považována za neplatnou.

##  {#pros-and-cons-of-sidechains}

|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

###  {#use-sidechains}

- []()
- []()
- []()
- []()
- []()

##  {#further-reading}

-

_ _
