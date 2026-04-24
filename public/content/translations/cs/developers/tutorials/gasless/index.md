---
title: "Sponzorování poplatků za gas: Jak pokrýt transakční náklady vašich uživatelů"
description: Vytvořit soukromý klíč a adresu je snadné; stačí jen spustit ten správný software. Na světě je ale mnoho míst, kde je získání ETH pro odesílání transakcí mnohem těžší. V tomto tutoriálu se naučíte, jak pokrýt onchain náklady na gas za spuštění offchain strukturovaných dat podepsaných uživatelem ve vašem chytrém kontraktu. Necháte uživatele podepsat strukturu obsahující informace o transakci, kterou pak váš offchain kód odešle na blockchain jako transakci.
author: Ori Pomerantz
tags: ["bez gasu", "Solidity", "EIP-712", "meta-transakce"]
skill: intermediate
breadcrumb: Sponzorování gasu
lang: cs
published: 2026-02-27
---

## Úvod {#introduction}

Pokud chceme, aby Ethereum sloužilo [další miliardě lidí](https://blog.ethereum.org/category/next-billion), musíme odstranit překážky a zajistit, aby se používalo co nejsnadněji. Jedním ze zdrojů těchto překážek je nutnost mít ETH na placení poplatků za gas.

Pokud máte decentralizovanou aplikaci (dapp), která vydělává na uživatelích, může dávat smysl nechat uživatele odesílat transakce přes váš server a platit transakční poplatky sami. Protože uživatelé stále podepisují [autorizační zprávu EIP-712](https://eips.ethereum.org/EIPS/eip-712) ve svých peněženkách, zachovávají si záruky integrity Etherea. Dostupnost závisí na serveru, který transakce přeposílá, takže je omezenější. Můžete to však nastavit tak, aby uživatelé mohli k chytrému kontraktu přistupovat i přímo (pokud získají ETH), a umožnit ostatním nastavit si vlastní servery, pokud chtějí sponzorovat transakce.

Technika v tomto tutoriálu funguje pouze tehdy, když ovládáte chytrý kontrakt. Existují i další techniky, včetně [abstrakce účtu](https://eips.ethereum.org/EIPS/eip-4337), které vám umožní sponzorovat transakce do jiných chytrých kontraktů, a kterým se snad budu věnovat v některém z budoucích tutoriálů.

Poznámka: Toto _není_ kód připravený pro produkci. Je zranitelný vůči významným útokům a chybí mu důležité funkce. Více se dozvíte v [části tohoto průvodce věnované zranitelnostem](#vulnerabilities).

### Předpoklady {#prerequisites}

K porozumění tomuto tutoriálu byste již měli znát:

- Solidity
- JavaScript
- React a WAGMI. Pokud tyto nástroje pro uživatelské rozhraní neznáte, [máme pro to tutoriál](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## Ukázková aplikace {#sample-app}

Zdejší ukázková aplikace je variantou kontraktu `Greeter` z nástroje Hardhat. Můžete si ji prohlédnout [na GitHubu](https://github.com/qbzzt/260301-gasless). Chytrý kontrakt je již nasazen v síti [Sepolia](https://sepolia.dev/) na adrese [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

Chcete-li ji vidět v akci, postupujte podle těchto kroků.

1. Naklonujte repozitář a nainstalujte potřebný software.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. Upravte `.env` a nastavte `PRIVATE_KEY` na peněženku, která má ETH v síti Sepolia. Pokud potřebujete Sepolia ETH, [použijte faucet](/developers/docs/networks/#sepolia). V ideálním případě by se tento soukromý klíč měl lišit od toho, který máte v peněžence v prohlížeči.

3. Spusťte server.

   ```sh
   npm run dev
   ```

4. Přejděte do aplikace na URL [`http://localhost:5173`](http://localhost:5173).

5. Klikněte na **Connect with Injected** pro připojení k peněžence. Schvalte to v peněžence a v případě potřeby schvalte změnu na síť Sepolia.

6. Napište nový pozdrav a klikněte na **Update greeting via sponsor**.

7. Podepište zprávu.

8. Počkejte asi 12 sekund (čas bloku v síti Sepolia). Během čekání se můžete podívat na URL v konzoli serveru a prohlédnout si transakci.

9. Podívejte se, že se pozdrav změnil a že hodnota adresy, která jej naposledy aktualizovala, je nyní adresa vaší peněženky v prohlížeči.

Abychom pochopili, jak to funguje, musíme se podívat na to, jak se zpráva vytváří v uživatelském rozhraní, jak ji server přeposílá a jak ji chytrý kontrakt zpracovává.

### Uživatelské rozhraní {#ui-changes}

Uživatelské rozhraní je založeno na [WAGMI](https://wagmi.sh/); můžete si o něm přečíst [v tomto tutoriálu](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Zde je ukázka, jak zprávu podepisujeme:

```js
const signGreeting = useCallback(
```

React hook [`useCallback`](https://react.dev/reference/react/useCallback) nám umožňuje zlepšit výkon opětovným použitím stejné funkce při překreslení komponenty.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

Pokud neexistuje žádný účet, vyvolejte chybu. To by se nikdy nemělo stát, protože tlačítko uživatelského rozhraní, které spouští proces volající `signGreeting`, je v takovém případě zakázáno. Budoucí programátoři však mohou tuto pojistku odstranit, takže je dobré tuto podmínku zkontrolovat i zde.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Parametry pro [oddělovač domén (domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Tato hodnota je konstantní, takže v lépe optimalizované implementaci bychom ji mohli vypočítat pouze jednou, místo abychom ji přepočítávali při každém volání funkce.

- `name` je uživatelsky čitelný název, například název dapp, pro kterou vytváříme podpisy.
- `version` je verze. Různé verze nejsou kompatibilní.
- `chainId` je řetězec, který používáme, jak jej poskytuje [WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` je adresa kontraktu, který tento podpis ověří. Nechceme, aby stejný podpis platil pro více kontraktů, pro případ, že existuje několik kontraktů `Greeter` a my chceme, aby měly různé pozdravy.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

Datový typ, který podepisujeme. Zde máme jediný parametr, `greeting`, ale systémy v reálném světě jich obvykle mají více.

```js
        const message = { greeting }
```

Samotná zpráva, kterou chceme podepsat a odeslat. `greeting` je název pole i název proměnné, která jej vyplňuje.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Samotné získání podpisu. Tato funkce je asynchronní, protože uživatelům trvá dlouho (z pohledu počítače), než data podepíší.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

Funkce vrací jedinou hexadecimální hodnotu. Zde ji rozdělíme do polí.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Pokud se některá z těchto proměnných změní, vytvořte novou instanci funkce. Parametry `account` a `chainId` může uživatel změnit v peněžence. `contractAddr` je funkcí ID řetězce. `signTypedDataAsync` by se nemělo měnit, ale importujeme jej z [hooku](https://wagmi.sh/react/api/hooks/useSignTypedData), takže si nemůžeme být jisti, a je nejlepší jej sem přidat.

Nyní, když je nový pozdrav podepsán, musíme jej odeslat na server.

```js
  const sponsoredGreeting = async () => {
    try {
```

Tato funkce převezme podpis a odešle jej na server.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Odešlete na cestu `/server/sponsor` na serveru, ze kterého jsme přišli.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Použijte `POST` k odeslání informací zakódovaných ve formátu JSON.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Vypište odpověď. V produkčním systému bychom odpověď také zobrazili uživateli.

### Server {#server}

Rád používám [Vite](https://vite.dev/) jako svůj front-end. Automaticky servíruje knihovny Reactu a aktualizuje prohlížeč při změně front-endového kódu. Vite však neobsahuje nástroje pro backend.

Řešení se nachází v [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Nechte Vite zpracovat vše ostatní
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

Nejprve zaregistrujeme handler pro požadavky, které zpracováváme sami (`POST` na `/server/sponsor`). Poté vytvoříme a použijeme server Vite ke zpracování všech ostatních URL.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

Toto je jen standardní volání blockchainu pomocí knihovny [viem](https://viem.sh/).

### Chytrý kontrakt {#smart-contract}

Nakonec musí [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) ověřit podpis.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

Konstruktor vytvoří [oddělovač domén](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), podobně jako kód uživatelského rozhraní výše. Provádění na blockchainu je mnohem dražší, takže jej počítáme pouze jednou.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

Toto je struktura, která se podepisuje. Zde máme pouze jedno pole.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

Toto je [identifikátor struktury](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). V uživatelském rozhraní se počítá pokaždé znovu.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Tato funkce přijme podepsaný požadavek a aktualizuje pozdrav.

```solidity
        // Vypočítat otisk EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

Vytvořte hash (digest) v souladu s [EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // Obnovit podepisujícího
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Použijte [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) k získání adresy podepisujícího. Všimněte si, že špatný podpis může stále vést k platné adrese, jen k nějaké náhodné.

```solidity
        // Použít pozdrav, jako by jej volal podepisující
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Aktualizujte pozdrav.

## Zranitelnosti {#vulnerabilities}

Toto _není_ kód připravený pro produkci. Je zranitelný vůči významným útokům a chybí mu důležité funkce. Zde jsou některé z nich, spolu s návodem, jak je vyřešit.

Chcete-li vidět některé z těchto útoků, klikněte na tlačítka pod nadpisem _Attacks_ a sledujte, co se stane. U tlačítka **Invalid signature** zkontrolujte konzoli serveru, abyste viděli odpověď na transakci.

### Odepření služby (Denial of service) na serveru {#dos-on-server}

Nejjednodušším útokem je útok typu [odepření služby (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) na server. Server přijímá požadavky odkudkoli z internetu a na základě těchto požadavků odesílá transakce. Útočníkovi absolutně nic nebrání ve vydání hromady podpisů, ať už platných, nebo neplatných. Každý z nich vyvolá transakci. Nakonec serveru dojde ETH na placení za gas.

Jedním z řešení tohoto problému je omezit rychlost na jednu transakci na blok. Pokud je účelem zobrazovat pozdravy [externě vlastněným účtům (externally owned accounts)](/developers/docs/accounts/#key-differences), stejně nezáleží na tom, jaký je pozdrav uprostřed bloku.

Dalším řešením je sledovat adresy a povolit podpisy pouze od platných zákazníků.

### Podpisy pro nesprávný pozdrav {#wrong-greeting-sigs}

Když kliknete na **Signature for wrong greeting**, odešlete platný podpis pro konkrétní adresu (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) a pozdrav (`Hello`). Odešle se to ale s jiným pozdravem. To zmate `ecrecover`, což změní pozdrav, ale s nesprávnou adresou.

Chcete-li tento problém vyřešit, přidejte adresu do [podepsané struktury](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). Tímto způsobem se náhodná adresa z `ecrecover` nebude shodovat s adresou v podpisu a chytrý kontrakt zprávu odmítne.

### Replay útoky {#replay-attack}

Když kliknete na **Replay attack**, odešlete stejný podpis „Jsem 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e a chtěl bych, aby pozdrav byl `Hello`“, ale se správným pozdravem. V důsledku toho se chytrý kontrakt domnívá, že adresa (která není vaše) změnila pozdrav zpět na `Hello`. Informace k provedení tohoto kroku jsou veřejně dostupné v [informacích o transakci](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

Pokud to představuje problém, jedním z řešení je přidat [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Vytvořte [mapování (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) mezi adresami a čísly a přidejte do podpisu pole nonce. Pokud se pole nonce shoduje s mapováním pro danou adresu, přijměte podpis a zvyšte hodnotu v mapování pro příště. Pokud se neshoduje, transakci odmítněte.

Dalším řešením je přidat k podepsaným datům časové razítko a přijmout podpis jako platný pouze několik sekund po tomto časovém razítku. Je to jednodušší a levnější, ale riskujeme replay útoky v rámci tohoto časového okna a selhání legitimních transakcí, pokud je časové okno překročeno.

## Další chybějící funkce {#other-missing-features}

Existují další funkce, které bychom v produkčním prostředí přidali.

### Přístup z jiných serverů {#other-servers}

V současné době umožňujeme jakékoli adrese odeslat `sponsorSetGreeting`. To může být přesně to, co chceme, v zájmu decentralizace. Nebo možná chceme zajistit, aby sponzorované transakce procházely přes _náš_ server, v takovém případě bychom v chytrém kontraktu zkontrolovali `msg.sender`.

Ať tak či onak, mělo by jít o vědomé rozhodnutí při návrhu, nikoli jen o výsledek toho, že jsme o problému nepřemýšleli.

### Zpracování chyb {#error-handling}

Uživatel odešle pozdrav. Možná se aktualizuje v dalším bloku. Možná ne. Chyby jsou neviditelné. V produkčním systému by měl být uživatel schopen rozlišit mezi těmito případy:

- Nový pozdrav ještě nebyl odeslán
- Nový pozdrav byl odeslán a zpracovává se
- Nový pozdrav byl odmítnut

## Závěr {#conclusion}

V tuto chvíli byste měli být schopni vytvořit pro uživatele vaší dapp zážitek bez nutnosti platit za gas, a to za cenu určité centralizace.

To však funguje pouze u chytrých kontraktů, které podporují ERC-712. Například k převodu tokenu ERC-20 je nutné, aby transakci podepsal vlastník, a ne jen zprávu. Řešením je [abstrakce účtu (ERC-4337)](https://docs.erc4337.io/index.html). Doufám, že o tom napíšu budoucí tutoriál.

[Zde najdete další mou práci](https://cryptodocguy.pro/).