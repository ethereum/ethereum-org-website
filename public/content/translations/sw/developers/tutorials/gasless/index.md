---
title: "Kufadhili ada za gesi: Jinsi ya kulipia gharama za miamala kwa watumiaji wako"
description: Ni rahisi kuunda ufunguo wa siri na anwani; ni suala tu la kuendesha programu sahihi. Lakini kuna maeneo mengi duniani ambapo kupata ETH kutuma miamala ni ngumu zaidi. Katika mafunzo haya unajifunza jinsi ya kulipia gharama za gesi kwenye mnyororo kwa ajili ya kutekeleza data iliyopangwa nje ya mnyororo, iliyotiwa saini na mtumiaji katika mkataba mahiri wako. Unamfanya mtumiaji atie saini muundo ulio na maelezo ya muamala, ambayo kisha msimbo wako wa nje ya mnyororo unawasilisha kwenye mnyororo wa vitalu kama muamala.
author: Ori Pomerantz
tags: ["bila gesi", "Solidity", "eip-712", "miamala-meta"]
skill: intermediate
breadcrumb: Ufadhili wa gesi
lang: sw
published: 2026-02-27
---

## Utangulizi {#introduction}

Ikiwa tunataka Ethereum ihudumie [watu bilioni moja zaidi](https://blog.ethereum.org/category/next-billion), tunahitaji kuondoa msuguano na kuifanya iwe rahisi kutumia iwezekanavyo. Chanzo kimoja cha msuguano huu ni hitaji la ETH kulipia ada za gesi.

Ikiwa una programu tumizi iliyogatuliwa (dapp) inayotengeneza pesa kutoka kwa watumiaji, inaweza kuwa na maana kuruhusu watumiaji kuwasilisha miamala kupitia seva yako na wewe mwenyewe kulipia ada za muamala. Kwa sababu watumiaji bado wanatia saini [ujumbe wa uidhinishaji wa EIP-712](https://eips.ethereum.org/EIPS/eip-712) kwenye mikoba yao, wanahifadhi dhamana za uadilifu za Ethereum. Upatikanaji unategemea seva inayosambaza miamala, kwa hivyo ina kikomo zaidi. Hata hivyo, unaweza kuweka mambo ili watumiaji waweze pia kufikia mkataba mahiri moja kwa moja (ikiwa watapata ETH), na kuruhusu wengine kuanzisha seva zao wenyewe ikiwa wanataka kufadhili miamala.

Mbinu katika mafunzo haya inafanya kazi tu unapodhibiti mkataba mahiri. Kuna mbinu zingine, ikiwa ni pamoja na [udhanifu wa akaunti](https://eips.ethereum.org/EIPS/eip-4337) zinazokuruhusu kufadhili miamala kwa mikataba mahiri mingine, ambayo natumai kuishughulikia katika mafunzo yajayo.

Kumbuka: Huu _sio_ msimbo wa kiwango cha uzalishaji. Una hatari ya kushambuliwa kwa kiasi kikubwa na unakosa vipengele muhimu. Jifunze zaidi katika [sehemu ya udhaifu ya mwongozo huu](#vulnerabilities).

### Mahitaji ya awali {#prerequisites}

Ili kuelewa mafunzo haya unahitaji kuwa tayari unafahamu:

- Solidity
- JavaScript
- React na WAGMI. Ikiwa hufahamu zana hizi za kiolesura cha mtumiaji, [tuna mafunzo kwa ajili ya hilo](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## Programu ya mfano {#sample-app}

Programu ya mfano hapa ni tofauti ya mkataba wa `Greeter` wa Hardhat. Unaweza kuiona [kwenye GitHub](https://github.com/qbzzt/260301-gasless). Mkataba mahiri tayari umesambazwa kwenye [Sepolia](https://sepolia.dev/), kwenye anwani [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

Ili kuiona ikifanya kazi, fuata hatua hizi.

1. Nakili hazina (clone repository) na usakinishe programu muhimu.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. Hariri `.env` ili kuweka `PRIVATE_KEY` kwenye mkoba ulio na ETH kwenye Sepolia. Ikiwa unahitaji Sepolia ETH, [tumia bomba](/developers/docs/networks/#sepolia). Kimsingi, ufunguo wa siri huu unapaswa kuwa tofauti na ule ulio nao kwenye mkoba wa kivinjari chako.

3. Anzisha seva.

   ```sh
   npm run dev
   ```

4. Vinjari kwenye programu kwenye URL [`http://localhost:5173`](http://localhost:5173).

5. Bofya **Connect with Injected** ili kuunganisha kwenye mkoba. Idhinisha kwenye mkoba, na idhinisha mabadiliko kwenda Sepolia ikiwa ni lazima.

6. Andika salamu mpya na ubofye **Update greeting via sponsor**.

7. Tia saini ujumbe.

8. Subiri takriban sekunde 12 (muda wa kitalu kwenye Sepolia). Wakati unasubiri unaweza kuangalia URL kwenye kiweko cha seva ili kuona muamala.

9. Angalia kwamba salamu imebadilika, na kwamba thamani ya anwani iliyosasishwa mwisho sasa ni anwani ya mkoba wa kivinjari chako.

Ili kuelewa jinsi hii inavyofanya kazi, tunahitaji kuangalia jinsi ujumbe unavyoundwa katika kiolesura cha mtumiaji, jinsi unavyosambazwa na seva, na jinsi mkataba mahiri unavyouchakata.

### Kiolesura cha mtumiaji {#ui-changes}

Kiolesura cha mtumiaji kinategemea [WAGMI](https://wagmi.sh/); unaweza kusoma kuihusu [katika mafunzo haya](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Hivi ndivyo tunavyotia saini ujumbe:

```js
const signGreeting = useCallback(
```

Hook ya React [`useCallback`](https://react.dev/reference/react/useCallback) inaturuhusu kuboresha utendaji kwa kutumia tena kipengele kile kile wakati kijenzi kinachorwa upya.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

Ikiwa hakuna akaunti, onyesha hitilafu. Hili halipaswi kutokea kamwe kwa sababu kitufe cha UI kinachoanzisha mchakato unaoita `signGreeting` kimezimwa katika hali hiyo. Hata hivyo, watengenezaji programu wa baadaye wanaweza kuondoa ulinzi huo, kwa hivyo ni wazo zuri kuangalia sharti hili hapa pia.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Vigezo vya [kitenganishi cha kikoa](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Thamani hii ni ya kudumu, kwa hivyo katika utekelezaji ulioboreshwa zaidi, tunaweza kuihesabu mara moja badala ya kuihesabu upya kila wakati kipengele kinapoitwa.

- `name` ni jina linalosomeka na mtumiaji, kama vile jina la dapp ambalo tunatengenezea sahihi.
- `version` ni toleo. Matoleo tofauti hayaendani.
- `chainId` ni mnyororo tunaotumia, kama inavyotolewa [na WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` ni anwani ya mkataba itakayothibitisha sahihi hii. Hatutaki sahihi hiyo hiyo itumike kwa mikataba mingi, endapo kuna mikataba kadhaa ya `Greeter` na tunataka iwe na salamu tofauti.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

Aina ya data tunayotia saini. Hapa, tuna kigezo kimoja, `greeting`, lakini mifumo ya maisha halisi kwa kawaida huwa na zaidi.

```js
        const message = { greeting }
```

Ujumbe halisi tunaotaka kutia saini na kutuma. `greeting` ni jina la uwanja na jina la kigezo kinachoujaza.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Pata sahihi haswa. Kipengele hiki hakilandanishwi (asynchronous) kwa sababu watumiaji huchukua muda mrefu (kwa mtazamo wa kompyuta) kutia saini data.

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

Kipengele kinarudisha thamani moja ya heksadesimali. Hapa tunaigawanya katika nyanja.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Ikiwa yoyote ya vigezo hivi itabadilika, unda mfano mpya wa kipengele. Vigezo vya `account` na `chainId` vinaweza kubadilishwa na mtumiaji kwenye mkoba. `contractAddr` ni kipengele cha Kitambulisho cha mnyororo. `signTypedDataAsync` haipaswi kubadilika, lakini tunaiingiza kutoka [kwa hook](https://wagmi.sh/react/api/hooks/useSignTypedData), kwa hivyo hatuwezi kuwa na uhakika, na ni bora kuiongeza hapa.

Sasa kwa kuwa salamu mpya imetiwa saini, tunahitaji kuituma kwa seva.

```js
  const sponsoredGreeting = async () => {
    try {
```

Kipengele hiki kinachukua sahihi na kuituma kwa seva.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Tuma kwa njia ya `/server/sponsor` katika seva tuliyotoka.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Tumia `POST` kutuma taarifa iliyosimbwa kwa JSON.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Toa majibu. Kwenye mfumo wa uzalishaji tungeonyesha pia majibu kwa mtumiaji.

### Seva {#server}

Ninapenda kutumia [Vite](https://vite.dev/) kama upande wangu wa mbele (front-end). Inatumikia maktaba za React kiotomatiki na kusasisha kivinjari wakati msimbo wa upande wa mbele unabadilika. Hata hivyo, Vite haijumuishi zana za upande wa nyuma (backend).

Suluhisho liko katika [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Acha Vite ishughulikie kila kitu kingine
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

Kwanza tunasajili kidhibiti cha maombi tunayoshughulikia wenyewe (`POST` hadi `/server/sponsor`). Kisha tunaunda na kutumia seva ya Vite kushughulikia URL zingine zote.

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

Huu ni wito wa kawaida tu wa mnyororo wa vitalu wa [viem](https://viem.sh/).

### Mkataba mahiri {#smart-contract}

Hatimaye, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) inahitaji kuthibitisha sahihi.

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

Konstrukta inaunda [kitenganishi cha kikoa](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), sawa na msimbo wa kiolesura cha mtumiaji hapo juu. Utekelezaji wa mnyororo wa vitalu ni ghali zaidi, kwa hivyo tunaihesabu mara moja tu.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

Huu ndio muundo unaotiwa saini. Hapa tuna uwanja mmoja tu.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

Hiki ni [kitambulisho cha muundo](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). Kinahesabiwa kila wakati katika kiolesura cha mtumiaji.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Kipengele hiki kinapokea ombi lililotiwa saini na kusasisha salamu.

```solidity
        // Kokotoa muhtasari wa EIP-712
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

Unda muhtasari kwa mujibu wa [EIP 712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // Rejesha mtia sahihi
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Tumia [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) kupata anwani ya mtia saini. Kumbuka kwamba sahihi mbaya bado inaweza kusababisha anwani halali, lakini ya kubahatisha tu.

```solidity
        // Tekeleza salamu kana kwamba mtia sahihi ameiita
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Sasisha salamu.

## Udhaifu {#vulnerabilities}

Huu _sio_ msimbo wa kiwango cha uzalishaji. Una hatari ya kushambuliwa kwa kiasi kikubwa na unakosa vipengele muhimu. Hapa kuna baadhi, pamoja na jinsi ya kuzitatua.

Ili kuona baadhi ya mashambulizi haya, bofya vitufe vilivyo chini ya kichwa cha _Attacks_ na uone kinachotokea. Kwa kitufe cha **Invalid signature**, angalia kiweko cha seva ili kuona majibu ya muamala.

### Kunyimwa huduma kwenye seva {#dos-on-server}

Shambulio rahisi zaidi ni shambulio la [kunyimwa huduma](https://en.wikipedia.org/wiki/Denial-of-service_attack) kwenye seva. Seva hupokea maombi kutoka popote kwenye Mtandao na kulingana na maombi hayo hutuma miamala. Hakuna chochote kinachozuia mshambuliaji kutoa rundo la sahihi, halali au batili. Kila moja itasababisha muamala. Hatimaye seva itaishiwa na ETH ya kulipia gesi.

Suluhisho moja la tatizo hili ni kupunguza kiwango hadi muamala mmoja kwa kila kitalu. Ikiwa madhumuni ni kuonyesha salamu kwa [akaunti zinazomilikiwa na watu wa nje](/developers/docs/accounts/#key-differences), haijalishi salamu ni nini katikati ya kitalu hata hivyo.

Suluhisho jingine ni kufuatilia anwani na kuruhusu tu sahihi kutoka kwa wateja halali.

### Sahihi za salamu zisizo sahihi {#wrong-greeting-sigs}

Unapobofya **Signature for wrong greeting**, unawasilisha sahihi halali kwa anwani maalum (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) na salamu (`Hello`). Lakini inaiwasilisha na salamu tofauti. Hii inachanganya `ecrecover`, ambayo inabadilisha salamu lakini ina anwani isiyo sahihi.

Ili kutatua tatizo hili, ongeza anwani kwenye [muundo uliotiwa saini](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). Kwa njia hii, anwani ya kubahatisha ya `ecrecover` haitalingana na anwani iliyo kwenye sahihi, na mkataba mahiri utakataa ujumbe.

### Mashambulizi ya kurudia {#replay-attack}

Unapobofya **Replay attack**, unawasilisha sahihi ile ile ya "Mimi ni 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e, na ningependa salamu iwe `Hello`", lakini kwa salamu sahihi. Kama matokeo, mkataba mahiri unaamini kwamba anwani (ambayo sio yako) ilibadilisha salamu kurudi kwenye `Hello`. Taarifa ya kufanya hivi inapatikana kwa umma katika [taarifa ya muamala](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

Ikiwa hili ni tatizo, suluhisho moja ni kuongeza [nonsi](https://en.wikipedia.org/wiki/Cryptographic_nonce). Kuwa na [upangaji](https://docs.soliditylang.org/en/latest/types.html#mapping-types) kati ya anwani na nambari, na uongeze uwanja wa nonsi kwenye sahihi. Ikiwa uwanja wa nonsi unalingana na upangaji wa anwani, kubali sahihi na uongeze upangaji kwa wakati ujao. Ikiwa sivyo, kataa muamala.

Suluhisho jingine ni kuongeza muhuri wa muda kwenye data iliyotiwa saini na kukubali sahihi kama halali kwa sekunde chache tu baada ya muhuri huo wa muda. Hii ni rahisi na ya bei nafuu, lakini tunahatarisha mashambulizi ya kurudia ndani ya dirisha la muda, na kushindwa kwa miamala halali ikiwa dirisha la muda limepitwa.

## Vipengele vingine vinavyokosekana {#other-missing-features}

Kuna vipengele vya ziada ambavyo tungeongeza katika mpangilio wa uzalishaji.

### Ufikiaji kutoka kwa seva zingine {#other-servers}

Kwa sasa, tunaruhusu anwani yoyote kuwasilisha `sponsorSetGreeting`. Hili linaweza kuwa hasa kile tunachotaka, kwa maslahi ya ugatuzi. Au labda tunataka kuhakikisha kwamba miamala inayofadhiliwa inapitia seva _yetu_, katika hali ambayo tungeangalia `msg.sender` katika mkataba mahiri.

Vyovyote vile, huu unapaswa kuwa uamuzi wa muundo wa makusudi, sio tu matokeo ya kutofikiria kuhusu suala hilo.

### Ushughulikiaji wa hitilafu {#error-handling}

Mtumiaji anawasilisha salamu. Labda inasasishwa kwenye kitalu kinachofuata. Labda haisasishwi. Hitilafu hazionekani. Kwenye mfumo wa uzalishaji, mtumiaji anapaswa kuwa na uwezo wa kutofautisha kati ya kesi hizi:

- Salamu mpya bado haijawasilishwa
- Salamu mpya imewasilishwa, na iko katika mchakato
- Salamu mpya imekataliwa

Kufikia hapa, unapaswa kuwa na uwezo wa kuunda uzoefu usio na gesi kwa watumiaji wa programu tumizi iliyogatuliwa (dapp) yako, kwa gharama ya usimamizi wa kati kiasi.

Hata hivyo, hii inafanya kazi tu na mikataba mahiri inayoauni ERC-712. Ili kuhamisha tokeni ya ERC-20, kwa mfano, ni lazima muamala utiwe saini na mmiliki badala ya ujumbe tu. Suluhisho rahisi zaidi ni kuwa na rasilimali zinazomilikiwa si na anwani ya EOA, bali na mkataba tofauti (aina rahisi ya [udhanifu wa akaunti](/roadmap/account-abstraction/)). Unaweza kusoma zaidi kuihusu [katika mafunzo yanayofuata](/developers/tutorials/gasless-token).

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
