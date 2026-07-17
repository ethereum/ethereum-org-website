---
title: Pectra 7702
metaTitle: Pokyny pro Pectra 7702
description: Zjistěte více o 7702 v aktualizaci Pectra
lang: cs
---

## Abstrakt {#abstract}

EIP-7702 definuje mechanismus pro přidání kódu k EOA. Tento návrh umožňuje EOA, starším účtům na Ethereu, získat krátkodobá vylepšení funkčnosti, což zvyšuje použitelnost aplikací. To se provádí nastavením ukazatele na již nasazený kód pomocí nového typu transakce: 4.

Tento nový typ transakce zavádí seznam autorizací. Každá autorizační n-tice v seznamu je definována jako

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** je delegace (již nasazený bajtkód, který bude EOA používat)
**chain_id** uzamyká autorizaci na konkrétní řetězec (nebo 0 pro všechny řetězce)
**nonce** uzamyká autorizaci na konkrétní nonce účtu
(**y_parity, r, s**) je podpis autorizační n-tice, definovaný jako keccak(0x05 || rlp ([chain_id ,address, nonce])) soukromým klíčem EOA, na který se autorizace vztahuje (nazývaný také autorita)

Delegaci lze resetovat delegováním na nulovou adresu.

Soukromý klíč EOA si po delegaci zachovává plnou kontrolu nad účtem. Například delegování na Safe neudělá z účtu multisig, protože stále existuje jediný klíč, který může obejít jakoukoli politiku podepisování. Do budoucna by vývojáři měli navrhovat s předpokladem, že jakýkoli účastník v systému může být chytrý kontrakt. Pro vývojáře chytrých kontraktů již není bezpečné předpokládat, že `tx.origin` odkazuje na EOA.

## Osvědčené postupy {#best-practices}

**Abstrakce účtu**: Kontrakt delegace by měl být v souladu s širšími standardy abstrakce účtu (AA) na Ethereu, aby se maximalizovala kompatibilita. Konkrétně by měl být ideálně v souladu s ERC-4337 nebo s ním kompatibilní.

**Návrh nevyžadující povolení a odolný vůči cenzuře**: Ethereum si cení účasti nevyžadující povolení. Kontrakt delegace NESMÍ mít pevně zakódovaného nebo spoléhat na žádného jediného „důvěryhodného“ relayera nebo službu. To by účet znefunkčnilo, pokud by se relayer odpojil. Funkce jako dávkování (např. schválit+transferFrom) může používat samotný EOA bez relayera. Pro vývojáře aplikací, kteří chtějí využívat pokročilé funkce umožněné EIP-7702 (abstrakce gasu, výběry zachovávající soukromí), budete potřebovat relayera. Ačkoli existují různé architektury relayerů, doporučujeme používat [bundlery 4337](https://www.erc4337.io/bundlers) ukazující alespoň na [entry point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0), protože:

- Poskytují standardizovaná rozhraní pro relaying
- Zahrnují vestavěné systémy paymaster
- Zajišťují dopřednou kompatibilitu
- Mohou podporovat odolnost vůči cenzuře prostřednictvím [veřejného mempoolu](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Mohou vyžadovat, aby funkce init byla volána pouze z [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Jinými slovy, kdokoli by měl být schopen jednat jako sponzor/relayer transakce, pokud poskytne požadovaný platný podpis nebo uživatelskou operaci (UserOperation) z účtu. To zajišťuje odolnost vůči cenzuře: pokud není vyžadována žádná vlastní infrastruktura, transakce uživatele nemohou být svévolně blokovány omezujícím relayerem. Například [Delegation Toolkit od MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) explicitně funguje s jakýmkoli bundlerem nebo paymasterem ERC-4337 na jakémkoli řetězci, místo aby vyžadoval server specifický pro MetaMask.

**Integrace decentralizovaných aplikací (dapp) přes rozhraní peněženek**:

Vzhledem k tomu, že peněženky budou mít na whitelistu specifické kontrakty delegace pro EIP-7702, dapps by neměly očekávat, že budou přímo žádat o autorizace 7702. Místo toho by integrace měla probíhat prostřednictvím standardizovaných rozhraní peněženek:

- **ERC-5792 (`wallet_sendCalls`)**: Umožňuje dapps požádat peněženky o provedení dávkových volání, což usnadňuje funkce jako dávkování transakcí a abstrakce gasu.

- **ERC-6900**: Umožňuje dapps využívat modulární schopnosti chytrých účtů, jako jsou klíče relace (session keys) a obnova účtu, prostřednictvím modulů spravovaných peněženkou.

Využitím těchto rozhraní mohou dapps přistupovat k funkcím chytrých účtů poskytovaným EIP-7702 bez přímé správy delegací, což zajišťuje kompatibilitu a bezpečnost napříč různými implementacemi peněženek.

> Poznámka: Neexistuje žádná standardizovaná metoda, jak by dapps mohly přímo žádat o autorizační podpisy 7702. Dapps se musí spoléhat na specifická rozhraní peněženek, jako je ERC-6900, aby mohly využívat funkce EIP-7702.

Pro více informací:

- [Specifikace ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Specifikace ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Zabránění uzamčení k dodavateli (Vendor Lock-In)**: V souladu s výše uvedeným je dobrá implementace neutrální vůči dodavateli a interoperabilní. To často znamená dodržování vznikajících standardů pro chytré účty. Například [Modulární účet od Alchemy](https://github.com/alchemyplatform/modular-account) používá standard ERC-6900 pro modulární chytré účty a je navržen s ohledem na „interoperabilní použití nevyžadující povolení“.

**Zachování soukromí**: Ačkoli je onchain soukromí omezené, kontrakt delegace by se měl snažit minimalizovat odhalení dat a propojitelnost. Toho lze dosáhnout podporou funkcí, jako jsou platby za gas v tokenech ERC-20 (takže uživatelé nemusí udržovat veřejný zůstatek ETH, což zlepšuje soukromí a UX) a jednorázové klíče relace (které snižují závislost na jediném dlouhodobém klíči). Například EIP-7702 umožňuje platit gas v tokenech prostřednictvím sponzorovaných transakcí a dobrá implementace usnadní integraci takových paymasterů bez úniku více informací, než je nutné. Navíc offchain delegace určitých schválení (pomocí podpisů, které jsou ověřeny onchain) znamená méně onchain transakcí s primárním klíčem uživatele, což napomáhá soukromí. Účty, které vyžadují použití relayera, nutí uživatele odhalit své IP adresy. Veřejné mempooly to zlepšují; když se transakce/uživatelská operace šíří přes mempool, nelze poznat, zda pochází z IP adresy, která ji odeslala, nebo přes ni byla pouze přeposlána prostřednictvím p2p protokolu.

**Rozšiřitelnost a modulární bezpečnost**: Implementace účtů by měly být rozšiřitelné, aby se mohly vyvíjet s novými funkcemi a bezpečnostními vylepšeními. Možnost upgradu je s EIP-7702 ze své podstaty možná (protože EOA může v budoucnu vždy delegovat na nový kontrakt, aby upgradoval svou logiku). Kromě možnosti upgradu umožňuje dobrý návrh modularitu – např. zásuvné moduly pro různá schémata podpisů nebo politiky utrácení – bez nutnosti úplného nového nasazení. Account Kit od Alchemy je ukázkovým příkladem, který umožňuje vývojářům instalovat validační moduly (pro různé typy podpisů jako ECDSA, BLS atd.) a exekuční moduly pro vlastní logiku. K dosažení větší flexibility a bezpečnosti u účtů s povoleným EIP-7702 se vývojářům doporučuje delegovat na proxy kontrakt spíše než přímo na konkrétní implementaci. Tento přístup umožňuje bezproblémové upgrady a modularitu bez nutnosti dalších autorizací EIP-7702 pro každou změnu.

Výhody návrhového vzoru Proxy:

- **Možnost upgradu**: Aktualizujte logiku kontraktu nasměrováním proxy na nový implementační kontrakt.

- **Vlastní inicializační logika**: Zahrňte inicializační funkce do proxy pro bezpečné nastavení nezbytných stavových proměnných.

Například [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) ukazuje, jak lze proxy využít k bezpečné inicializaci a správě delegací v účtech kompatibilních s EIP-7702.

Nevýhody návrhového vzoru Proxy:

- **Závislost na externích aktérech**: Musíte se spoléhat na externí tým, že neprovede upgrade na nebezpečný kontrakt.

## Bezpečnostní hlediska {#security-considerations}

**Ochrana proti reentranci**: Se zavedením delegace EIP-7702 může účet uživatele dynamicky přepínat mezi externě vlastněným účtem (EOA) a chytrým kontraktem (SC). Tato flexibilita umožňuje účtu jak iniciovat transakce, tak být cílem volání. V důsledku toho budou mít scénáře, kdy účet volá sám sebe a provádí externí volání, `msg.sender` rovno `tx.origin`, což podkopává určité bezpečnostní předpoklady, které dříve spoléhaly na to, že `tx.origin` je vždy EOA.

Pro vývojáře chytrých kontraktů již není bezpečné předpokládat, že `tx.origin` odkazuje na EOA. Stejně tak použití `msg.sender == tx.origin` jako ochrany proti útokům typu reentrance již není spolehlivou strategií.

Do budoucna by vývojáři měli navrhovat s předpokladem, že jakýkoli účastník v systému může být chytrý kontrakt. Alternativně by mohli implementovat explicitní ochranu proti reentranci pomocí ochran proti reentranci se vzory modifikátoru `nonReentrant`. Doporučujeme následovat auditovaný modifikátor, např. [Reentrancy Guard od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Mohli by také použít [proměnnou v přechodném úložišti (transient storage)](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Bezpečnostní hlediska inicializace**

Implementace kontraktů delegace EIP-7702 přináší specifické bezpečnostní výzvy, zejména pokud jde o proces inicializace. Kritická zranitelnost vzniká, když je inicializační funkce (`init`) atomicky spojena s procesem delegace. V takových případech by mohl frontrunner zachytit podpis delegace a provést funkci `init` se změněnými parametry, čímž by potenciálně převzal kontrolu nad účtem.

Toto riziko je obzvláště aktuální při pokusu o použití stávajících implementací chytrých účtů (SCA) s EIP-7702 bez úpravy jejich inicializačních mechanismů.

**Řešení pro zmírnění zranitelností inicializace**

- Implementujte `initWithSig`  
  Nahraďte standardní funkci `init` funkcí `initWithSig`, která vyžaduje, aby uživatel podepsal inicializační parametry. Tento přístup zajišťuje, že inicializace může pokračovat pouze s explicitním souhlasem uživatele, čímž se zmírňují rizika neoprávněné inicializace.

- Využijte EntryPoint z ERC-4337  
  Vyžadujte, aby inicializační funkce byla volána výhradně z kontraktu EntryPoint ERC-4337. Tato metoda využívá standardizovaný rámec pro validaci a provádění poskytovaný ERC-4337, což přidává další vrstvu zabezpečení do procesu inicializace.  
  _(Viz: [Dokumentace Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Přijetím těchto řešení mohou vývojáři zvýšit bezpečnost kontraktů delegace EIP-7702 a chránit se před potenciálními frontrunning útoky během fáze inicializace.

**Kolize úložiště** Delegování kódu nevymaže stávající úložiště. Při migraci z jednoho kontraktu delegace na jiný zůstávají zbytková data z předchozího kontraktu. Pokud nový kontrakt využívá stejné sloty úložiště, ale interpretuje je odlišně, může to způsobit nezamýšlené chování. Například pokud byla počáteční delegace na kontrakt, kde slot úložiště představuje `bool`, a následná delegace je na kontrakt, kde stejný slot představuje `uint`, může tento nesoulad vést k nepředvídatelným výsledkům.

**Rizika phishingu** S implementací delegace EIP-7702 mohou být aktiva na účtu uživatele plně kontrolována chytrými kontrakty. Pokud uživatel nevědomky deleguje svůj účet na škodlivý kontrakt, útočník by mohl snadno získat kontrolu a ukrást prostředky. Při použití `chain_id=0` se delegace aplikuje na všechna ID řetězců. Delegujte pouze na neměnný kontrakt (nikdy nedelegujte na proxy) a pouze na kontrakty, které byly nasazeny pomocí CREATE2 (se standardním initcode – žádné metamorfní kontrakty), aby nasazovatel nemohl nasadit něco jiného na stejnou adresu jinde. V opačném případě vaše delegace vystavuje váš účet riziku na všech ostatních EVM řetězcích.

Když uživatelé provádějí delegované podpisy, cílový kontrakt přijímající delegaci by měl být jasně a nápadně zobrazen, aby se pomohlo zmírnit rizika phishingu.

**Minimální důvěryhodný povrch a bezpečnost**: Ačkoli kontrakt delegace nabízí flexibilitu, měl by udržovat svou základní logiku minimální a auditovatelnou. Kontrakt je v podstatě rozšířením EOA uživatele, takže jakákoli chyba může být katastrofální. Implementace by měly dodržovat osvědčené postupy komunity pro bezpečnost chytrých kontraktů. Například funkce konstruktoru nebo inicializátoru musí být pečlivě zabezpečeny – jak zdůrazňuje Alchemy, pokud se v rámci 7702 používá návrhový vzor proxy, nechráněný inicializátor by mohl útočníkovi umožnit převzít kontrolu nad účtem. Týmy by se měly snažit udržovat onchain kód jednoduchý: kontrakt 7702 od Ambire má pouze ~200 řádků v Solidity, čímž záměrně minimalizuje složitost, aby se snížil počet chyb. Je třeba najít rovnováhu mezi logikou bohatou na funkce a jednoduchostí, která usnadňuje auditování.

### Známé implementace {#known-implementations}

Vzhledem k povaze EIP-7702 se doporučuje, aby peněženky postupovaly opatrně, když pomáhají uživatelům delegovat na kontrakt třetí strany. Níže je uveden seznam známých implementací, které byly auditovány:

| Adresa kontraktu                           | Zdroj                                                                                                                                      | Audity                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [audity](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [audity](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [audity](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [audity](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [AA tým Nadace Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audity](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [audity](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Pokyny pro hardwarové peněženky {#hardware-wallet-guidelines}

Hardwarové peněženky by neměly umožňovat libovolnou delegaci. Konsensus v oblasti hardwarových peněženek je používat seznam důvěryhodných kontraktů delegátorů. Doporučujeme povolit známé implementace uvedené výše a ostatní zvažovat případ od případu. Vzhledem k tomu, že delegování vašeho EOA na kontrakt dává kontrolu nad všemi aktivy, hardwarové peněženky by měly být opatrné ve způsobu, jakým implementují 7702.

### Scénáře integrace pro doprovodné aplikace {#integration-scenarios-for-companion-apps}

#### Líná (Lazy) {#lazy}

Vzhledem k tomu, že EOA stále funguje jako obvykle, není třeba nic dělat.

Poznámka: některá aktiva by mohla být kódem delegace automaticky odmítnuta, jako například NFT ERC-1155, a podpora by si toho měla být vědoma.

#### Uvědomělá (Aware) {#aware}

Upozorněte uživatele, že pro EOA je zavedena delegace kontrolou jeho kódu, a volitelně nabídněte odstranění delegace.

#### Běžná delegace {#common-delegation}

Poskytovatel hardwaru zařadí známé kontrakty delegace na whitelist a implementuje jejich podporu v softwarové doprovodné aplikaci. Doporučuje se vybrat kontrakt s plnou podporou ERC-4337.

EOA delegované na jiný kontrakt budou zpracovány jako standardní EOA.

#### Vlastní delegace {#custom-delegation}

Poskytovatel hardwaru implementuje svůj vlastní kontrakt delegace, přidá jej do seznamů a implementuje jeho podporu v softwarové doprovodné aplikaci. Doporučuje se vytvořit kontrakt s plnou podporou ERC-4337.

EOA delegované na jiný kontrakt budou zpracovány jako standardní EOA.