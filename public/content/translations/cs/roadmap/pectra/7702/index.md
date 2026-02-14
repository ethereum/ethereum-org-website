---
title: Pokyny pro Pectra 7702
description: "Zjistěte více o 7702 ve vydání Pectra"
lang: cs
---

# Pectra 7702

## Abstrakt {#abstract}

EIP 7702 definuje mechanismus pro přidání kódu do EOA. Tento návrh umožňuje účtům EOA, starším účtům Etherea, získat krátkodobá vylepšení funkčnosti, což zvyšuje použitelnost aplikací. To se provádí nastavením ukazatele na již nasazený kód pomocí nového typu transakce: 4.

Tento nový typ transakce zavádí autorizační seznam. Každá autorizační n-tice v seznamu je definována jako

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**adresa** je delegace (již nasazený bytekód, který bude použit EOA)
**chain_id** uzamkne autorizaci ke konkrétnímu řetězci (nebo 0 pro všechny řetězce)
**nonce** uzamkne autorizaci ke konkrétní hodnotě nonce účtu
(**y_parity, r, s**) je podpis autorizační n-tice, definovaný jako keccak(0x05 || rlp ([chain_id ,adresa, nonce])) soukromým klíčem EOA, na který se autorizace vztahuje (také se nazývá autorita)

Delegaci lze resetovat delegováním na nulovou adresu.

Soukromý klíč EOA si po delegaci zachovává plnou kontrolu nad účtem. Například delegování na Safe neudělá z účtu multisig, protože stále existuje jediný klíč, který může obejít jakoukoli politiku podepisování. Do budoucna by vývojáři měli navrhovat s předpokladem, že jakýkoli účastník v systému by mohl být chytrý kontrakt. Pro vývojáře chytrých kontraktů již není bezpečné předpokládat, že `tx.origin` odkazuje na EOA.

## Osvědčené postupy {#best-practices}

**Abstrakce účtu**: Delegační kontrakt by měl být v souladu s širšími standardy abstrakce účtu (AA) Etherea, aby se maximalizovala kompatibilita. Zejména by měl být ideálně kompatibilní s ERC-4337.

**Návrh bez povolení a odolný proti cenzuře**: Ethereum si cení účasti bez povolení. Delegační kontrakt NESMÍ natvrdo kódovat ani se spoléhat na žádný jediný „důvěryhodný“ relayer nebo službu. To by zablokovalo účet, pokud by relayer přestal fungovat. Funkce jako dávkování (např. approve+transferFrom) může EOA používat samo o sobě bez relayeru. Pro vývojáře aplikací, kteří chtějí využívat pokročilé funkce povolené EIP 7702 (abstrakce paliva, výběry chránící soukromí), budete potřebovat relayer. Ačkoli existují různé architektury relayerů, doporučujeme používat [bundlery 4337](https://www.erc4337.io/bundlers) odkazující alespoň na [vstupní bod 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0), protože:

- Poskytují standardizovaná rozhraní pro předávání
- Zahrnují vestavěné systémy paymaster
- Zajišťují dopřednou kompatibilitu
- Mohou podporovat odolnost proti cenzuře prostřednictvím [veřejného mempoolu](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Mohou vyžadovat, aby se funkce init volala pouze z [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

Jinými slovy, kdokoli by měl být schopen jednat jako sponzor/relayer transakce, pokud poskytne požadovaný platný podpis nebo UserOperation z účtu. To zajišťuje odolnost proti cenzuře: pokud není vyžadována žádná vlastní infrastruktura, transakce uživatele nemohou být svévolně blokovány prostřednictvím gatekeeping relaye. Například [Delegation Toolkit od MetaMasku](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) explicitně funguje s jakýmkoli bundlerem ERC-4337 nebo paymasterem na jakémkoli řetězci, namísto toho, aby vyžadoval server specifický pro MetaMask.

**Integrace dApps přes rozhraní peněženek**:

Vzhledem k tomu, že peněženky budou na whitelist umisťovat konkrétní delegační kontrakty pro EIP-7702, dApps by neměly očekávat, že budou přímo žádat o autorizace 7702. Místo toho by měla integrace probíhat prostřednictvím standardizovaných rozhraní peněženek:

- **ERC-5792 (`wallet_sendCalls`)**: Umožňuje dApps požadovat od peněženek provádění dávkových volání, což usnadňuje funkce, jako je dávkování transakcí a abstrakce paliva.

- **ERC-6900**: Umožňuje dApps využívat modulární schopnosti chytrých účtů, jako jsou klíče relace a obnovení účtu, prostřednictvím modulů spravovaných peněženkou.

Využitím těchto rozhraní mohou dApps přistupovat k funkcím chytrých účtů poskytovaných EIP-7702 bez přímé správy delegací, což zajišťuje kompatibilitu a bezpečnost napříč různými implementacemi peněženek.

> Poznámka: Neexistuje žádná standardizovaná metoda, jak by dApps mohly přímo žádat o autorizační podpisy 7702. dApps se musí spoléhat na specifická rozhraní peněženek, jako je ERC-6900, aby mohly využívat funkce EIP-7702.

Pro více informací:

- [Specifikace ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Specifikace ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Vyhnutí se závislosti na dodavateli**: V souladu s výše uvedeným je dobrá implementace neutrální vůči dodavateli a interoperabilní. To často znamená dodržování nově vznikajících standardů pro chytré účty. Například [Modulární účet od Alchemy](https://github.com/alchemyplatform/modular-account) používá standard ERC-6900 pro modulární chytré účty a je navržen s ohledem na „interoperabilní použití bez povolení“.

**Zachování soukromí**: Zatímco soukromí na blockchainu je omezené, delegační kontrakt by se měl snažit minimalizovat odhalení dat a jejich propojitelnost. Toho lze dosáhnout podporou funkcí, jako jsou platby za palivo v tokenech ERC-20 (takže uživatelé nemusí udržovat veřejný zůstatek ETH, což zlepšuje soukromí a UX) a jednorázové klíče relace (které snižují závislost na jediném dlouhodobém klíči). Například EIP-7702 umožňuje platit za palivo v tokenech prostřednictvím sponzorovaných transakcí a dobrá implementace usnadní integraci takových paymasterů, aniž by uniklo více informací, než je nutné. Navíc delegace určitých schválení mimo řetězec (pomocí podpisů ověřených na blockchainu) znamená méně transakcí na blockchainu s primárním klíčem uživatele, což napomáhá soukromí. Účty, které vyžadují použití relayeru, nutí uživatele odhalit své IP adresy. PublicMempools to vylepšuje, když se transakce/UserOp šíří mempoolem, nelze poznat, zda pochází z IP adresy, která ji odeslala, nebo zda byla pouze předána přes p2p protokol.

**Rozšiřitelnost a modulární bezpečnost**: Implementace účtů by měly být rozšiřitelné, aby se mohly vyvíjet s novými funkcemi a bezpečnostními vylepšeními. Možnost upgradu je s EIP-7702 přirozeně možná (protože EOA může v budoucnu vždy delegovat na nový kontrakt, aby upgradoval svou logiku). Kromě možnosti upgradu dobrý design umožňuje modularitu – např. zásuvné moduly pro různé schémata podepisování nebo politiky utrácení – bez nutnosti úplného znovunasazení. Account Kit od Alchemy je skvělým příkladem, který umožňuje vývojářům instalovat ověřovací moduly (pro různé typy podpisů jako ECDSA, BLS atd.) a exekuční moduly pro vlastní logiku. Pro dosažení větší flexibility a bezpečnosti v účtech s podporou EIP-7702 jsou vývojáři vyzýváni, aby delegovali na proxy kontrakt spíše než přímo na konkrétní implementaci. Tento přístup umožňuje bezproblémové upgrady a modularitu bez nutnosti dalších autorizací EIP-7702 pro každou změnu.

Výhody vzoru proxy:

- **Možnost upgradu**: Aktualizujte logiku kontraktu nasměrováním proxy na nový implementační kontrakt.

- **Vlastní inicializační logika**: Zahrňte inicializační funkce do proxy, abyste bezpečně nastavili potřebné stavové proměnné.

Například [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) ukazuje, jak lze proxy využít k bezpečné inicializaci a správě delegací v účtech kompatibilních s EIP-7702.

Nevýhody vzoru proxy:

- **Závislost na externích aktérech**: Musíte se spolehnout na externí tým, že neprovede upgrade na nebezpečný kontrakt.

## Bezpečnostní aspekty {#security-considerations}

**Ochrana proti reentrancy**: Se zavedením delegace EIP-7702 může účet uživatele dynamicky přepínat mezi externě vlastněným účtem (EOA) a chytrým kontraktem (SC). Tato flexibilita umožňuje účtu jak iniciovat transakce, tak být cílem volání. V důsledku toho budou mít scénáře, kdy účet volá sám sebe a provádí externí volání, `msg.sender` rovno `tx.origin`, což podkopává určité bezpečnostní předpoklady, které se dříve spoléhaly na to, že `tx.origin` je vždy EOA.

Pro vývojáře chytrých kontraktů již není bezpečné předpokládat, že `tx.origin` odkazuje na EOA. Stejně tak použití `msg.sender == tx.origin` jako ochrany proti útokům reentrancy již není spolehlivou strategií.

Do budoucna by vývojáři měli navrhovat s předpokladem, že jakýkoli účastník v systému by mohl být chytrý kontrakt. Alternativně by mohli implementovat explicitní ochranu proti reentrancy pomocí ochran proti reentrancy se vzory modifikátoru `nonReentrant`. Doporučujeme použít auditovaný modifikátor, např. [Reentrancy Guard od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Mohli by také použít [přechodnou proměnnou úložiště](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Bezpečnostní aspekty inicializace**

Implementace delegačních kontraktů EIP-7702 přináší specifické bezpečnostní výzvy, zejména co se týče procesu inicializace. Kritická zranitelnost vzniká, když je inicializační funkce (`init`) atomicky spojena s procesem delegace. V takových případech by mohl frontrunner zachytit podpis delegace a spustit funkci `init` se změněnými parametry, čímž by potenciálně převzal kontrolu nad účtem.

Toto riziko je obzvláště relevantní při pokusu o použití stávajících implementací účtů chytrých kontraktů (SCA) s EIP-7702 bez úpravy jejich inicializačních mechanismů.

**Řešení pro zmírnění zranitelností inicializace**

- Implementujte `initWithSig`
  Nahraďte standardní funkci `init` funkcí `initWithSig`, která vyžaduje, aby uživatel podepsal inicializační parametry. Tento přístup zajišťuje, že inicializace může proběhnout pouze s explicitním souhlasem uživatele, čímž se zmírňují rizika neoprávněné inicializace.

- Využijte EntryPoint z ERC-4337
  Vyžadujte, aby se inicializační funkce volala výhradně z kontraktu EntryPoint ERC-4337. Tato metoda využívá standardizovaný rámec pro ověřování a provádění poskytovaný ERC-4337, čímž přidává další vrstvu zabezpečení do procesu inicializace.  
  _(Viz: [Safe Docs](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Přijetím těchto řešení mohou vývojáři zvýšit bezpečnost delegačních kontraktů EIP-7702 a chránit se před potenciálními útoky frontrunningu během inicializační fáze.

**Kolize úložiště** Delegování kódu nevymaže stávající úložiště. Při migraci z jednoho delegačního kontraktu na jiný zůstávají zbytková data z předchozího kontraktu. Pokud nový kontrakt využívá stejné sloty úložiště, ale interpretuje je odlišně, může to způsobit neúmyslné chování. Například pokud byla počáteční delegace na kontrakt, kde slot úložiště představuje `bool`, a následná delegace je na kontrakt, kde stejný slot představuje `uint`, nesoulad může vést k nepředvídatelným výsledkům.

**Rizika phishingu** S implementací delegace EIP-7702 mohou být aktiva na účtu uživatele zcela ovládána chytrými kontrakty. Pokud uživatel nevědomky deleguje svůj účet na škodlivý kontrakt, útočník by mohl snadno získat kontrolu a ukrást prostředky. Při použití `chain_id=0` se delegace vztahuje na všechny ID řetězců. Delegujte pouze na neměnný kontrakt (nikdy nedelegujte na proxy) a pouze na kontrakty, které byly nasazeny pomocí CREATE2 (se standardním initcode – žádné metamorfní kontrakty), aby nasazující nemohl nasadit něco jiného na stejnou adresu jinde. V opačném případě vaše delegace ohrožuje váš účet na všech ostatních EVM řetězcích.

Když uživatelé provádějí delegované podpisy, cílový kontrakt přijímající delegaci by měl být jasně a viditelně zobrazen, aby se pomohlo zmírnit rizika phishingu.

**Minimální důvěryhodný povrch a bezpečnost**: I když nabízí flexibilitu, delegační kontrakt by měl udržovat svou základní logiku minimální a auditovatelnou. Kontrakt je v podstatě rozšířením uživatelova EOA, takže jakákoli chyba může být katastrofální. Implementace by měly dodržovat osvědčené postupy z komunity bezpečnosti chytrých kontraktů. Například konstruktorové nebo inicializační funkce musí být pečlivě zabezpečeny – jak zdůrazňuje Alchemy, pokud se používá vzor proxy v rámci 7702, nechráněný inicializátor by mohl útočníkovi umožnit převzít kontrolu nad účtem. Týmy by se měly snažit udržovat kód na blockchainu jednoduchý: kontrakt 7702 od Ambire má pouze ~200 řádků v Solidity a záměrně minimalizuje složitost, aby se snížil počet chyb. Musí být nalezena rovnováha mezi logikou bohatou na funkce a jednoduchostí, která usnadňuje auditování.

### Známé implementace {#known-implementations}

Vzhledem k povaze EIP 7702 se doporučuje, aby peněženky postupovaly opatrně, když pomáhají uživatelům delegovat na kontrakt třetí strany. Níže je uveden soubor známých implementací, které byly auditovány:

| Adresa kontraktu                           | Zdroj                                                                                                                                 | Audity                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                 | [audity](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                 | [audity](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)         | [audity](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                     | [audity](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Tým AA Nadace Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audity](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                 | [audity](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Pokyny pro hardwarové peněženky {#hardware-wallet-guidelines}

Hardwarové peněženky by neměly umožňovat libovolnou delegaci. Konsensus v prostoru hardwarových peněženek je používat seznam důvěryhodných delegačních kontraktů. Doporučujeme povolit známé implementace uvedené výše a zvážit ostatní případ od případu. Vzhledem k tomu, že delegování vašeho EOA na kontrakt dává kontrolu nad všemi aktivy, měly by být hardwarové peněženky opatrné při implementaci 7702.

### Scénáře integrace pro doprovodné aplikace {#integration-scenarios-for-companion-apps}

#### Pasivní {#lazy}

Protože EOA stále funguje jako obvykle, není třeba nic dělat.

Poznámka: některá aktiva mohou být automaticky odmítnuta delegačním kódem, jako například NFT ERC-1155, a podpora by si toho měla být vědoma.

#### Vědomý {#aware}

Upozorněte uživatele, že pro EOA je nastavena delegace, kontrolou jeho kódu, a volitelně nabídněte odstranění delegace.

#### Běžná delegace {#common-delegation}

Poskytovatel hardwaru umisťuje známé delegační kontrakty na whitelist a implementuje jejich podporu v softwarovém doprovodu. Doporučuje se zvolit kontrakt s plnou podporou ERC 4337.

EOA delegované na jiný kontrakt budou zpracovávány jako standardní EOA.

#### Vlastní delegace {#custom-delegation}

Poskytovatel hardwaru implementuje vlastní delegační kontrakt, přidá jej na seznamy a implementuje jeho podporu v softwarovém doprovodu. Doporučuje se vytvořit kontrakt s plnou podporou ERC 4337.

EOA delegované na jiný kontrakt budou zpracovávány jako standardní EOA.
