---
title: "Vipengele vya seva na mawakala kwa programu za web3"
description: Baada ya kusoma mafunzo haya, utaweza kuandika seva za TypeScript zinazosikiliza matukio kwenye mnyororo wa vitalu na kujibu ipasavyo kwa miamala yao wenyewe. Hii itakuwezesha kuandika programu zilizowekwa kati (kwa sababu seva ni kituo cha kushindwa), lakini zinaweza kuingiliana na huluki za web3. Mbinu hizo hizo pia zinaweza kutumika kuandika wakala anayejibu matukio ya mnyororoni bila mwanadamu kuhusika.
author: Ori Pomerantz
lang: sw
tags:
  - wakala
  - seva
  - nje ya mnyororo
  - dapps
skill: beginner
breadcrumb: Vipengele vya seva
published: 2024-07-15
---

## Utangulizi {#introduction}

Katika hali nyingi, programu tumizi iliyogatuliwa (dapp) hutumia seva kusambaza programu, lakini mwingiliano wote halisi hufanyika kati ya kiteja (kawaida, kivinjari cha wavuti) na mnyororo wa vitalu.

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

Hata hivyo, kuna baadhi ya matukio ambapo programu itanufaika kwa kuwa na kipengele cha seva kinachofanya kazi kwa kujitegemea. Seva kama hiyo itaweza kujibu matukio, na maombi yanayotoka kwa vyanzo vingine, kama vile API, kwa kutoa miamala.

![The interaction with the addition of a server](./fig-2.svg)

Kuna kazi kadhaa zinazowezekana kwa seva kama hiyo kutimiza.

- Mshikiliaji wa hali ya siri. Katika michezo mara nyingi ni muhimu kutokuwa na taarifa zote ambazo mchezo unajua kupatikana kwa wachezaji. Hata hivyo, _hakuna siri kwenye mnyororo wa vitalu_, taarifa yoyote iliyo kwenye mnyororo wa vitalu ni rahisi kwa mtu yeyote kuigundua. Kwa hivyo, ikiwa sehemu ya hali ya mchezo inapaswa kuwekwa siri, inabidi ihifadhiwe mahali pengine (na ikiwezekana athari za hali hiyo zithibitishwe kwa kutumia [uthibitisho wa sifuri-maarifa](/zero-knowledge-proofs)).

- Orakeli iliyowekwa kati. Ikiwa hatari ni ndogo vya kutosha, seva ya nje inayosoma baadhi ya taarifa mtandaoni na kisha kuziweka kwenye mnyororo inaweza kuwa nzuri vya kutosha kutumika kama [orakeli](/developers/docs/oracles/).

- Wakala. Hakuna kinachotokea kwenye mnyororo wa vitalu bila muamala wa kuiwasha. Seva inaweza kutenda kwa niaba ya mtumiaji kufanya vitendo kama vile [usuluhishi](/developers/docs/mev/#mev-examples-dex-arbitrage) wakati fursa inapotokea.

## Programu ya mfano {#sample-program}

Unaweza kuona seva ya mfano [kwenye GitHub](https://github.com/qbzzt/20240715-server-component). Seva hii inasikiliza matukio yanayotoka kwenye [mkataba huu](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) kwenye mtandao wa majaribio wa Sepolia, toleo lililobadilishwa la Greeter ya Hardhat. Salamu inapobadilishwa, inairudisha jinsi ilivyokuwa.

Mkataba huu unashirikiwa na mafunzo mengine, kwa hivyo watu wengine (na seva zao) wanaweza kubadilisha salamu wakati yako inafanya kazi. Simamisha seva yako unapomaliza ili kuepuka kutumia ETH yako ya majaribio.

Ili kuiendesha:

1. Nakili hazina.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Hazina ya mfano iliandikwa kwa ajili ya mtandao wa majaribio wa Holesky, ambao umefungwa tangu wakati huo. Isasishe ili itumie Sepolia na anwani ya mkataba wa Sepolia.

   ```sh copy
   sed -i.bak -e 's/holesky/sepolia/g' -e 's/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA/' src/app.ts
   ```

3. Sakinisha vifurushi muhimu. Ikiwa huna tayari, [sakinisha Node kwanza](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

4. Hariri `.env` ili kubainisha ufunguo wa siri wa akaunti iliyo na ETH kwenye mtandao wa majaribio wa Sepolia. Ikiwa huna ETH kwenye Sepolia, unaweza [kutumia bomba hili](https://sepolia-faucet.pk910.de/). Tumia akaunti mpya unayotumia kwa majaribio pekee, kamwe usitumie ile inayoshikilia mali halisi.

   ```sh filename=".env" copy
   PRIVATE_KEY=0x<private key goes here>
   ```

5. Anzisha seva.

   ```sh copy
   npm start
   ```

6. Nenda kwenye [kichunguzi cha bloku](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=write_contract), na ukitumia anwani tofauti na ile iliyo na ufunguo wa siri badilisha salamu. Utaona kwamba salamu inarudishwa kiotomatiki jinsi ilivyokuwa.

### Inafanyaje kazi? {#how-it-works}

Njia rahisi ya kuelewa jinsi ya kuandika kipengele cha seva ni kupitia mfano mstari kwa mstari.

#### `src/app.ts` {#src-app-ts}

Sehemu kubwa ya programu iko ndani ya [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Kuunda vipengee vya awali

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Hivi ni vipengee vya [Viem](https://viem.sh/) tunavyohitaji, vitendaji na [aina ya `Address`](https://viem.sh/docs/glossary/types#address). Seva hii imeandikwa kwa [TypeScript](https://www.typescriptlang.org/), ambayo ni kiendelezi cha JavaScript kinachoifanya iwe [na aina thabiti](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Kitendaji hiki](https://viem.sh/docs/accounts/privateKey) kinaturuhusu kuzalisha taarifa za mkoba, ikiwa ni pamoja na anwani, inayoendana na ufunguo wa siri.

```typescript
import { sepolia } from "viem/chains"
```

Ili kutumia mnyororo wa vitalu katika Viem unahitaji kuingiza ufafanuzi wake. Katika hali hii, tunataka kuunganisha kwenye mnyororo wa vitalu wa majaribio wa [Sepolia](/developers/docs/networks/#sepolia).

```typescript
// Hivi ndivyo tunavyoongeza fasili zilizo katika .env kwenye process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

Hivi ndivyo tunavyosoma `.env` kwenye mazingira. Tunaihitaji kwa ajili ya ufunguo wa siri (tazama baadaye).

```typescript
const greeterAddress : Address = "0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Ili kutumia mkataba tunahitaji anwani yake na [ABI](/glossary/#abi) yake. Tunatoa zote mbili hapa.

Katika JavaScript (na hivyo basi TypeScript) huwezi kugawa thamani mpya kwa konstanti, lakini _unaweza_ kubadilisha kipengee kilichohifadhiwa ndani yake. Kwa kutumia kiambishi tamati `as const` tunaiambia TypeScript kwamba orodha yenyewe ni konstanti na haiwezi kubadilishwa.

```typescript
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Unda [kiteja cha umma](https://viem.sh/docs/clients/public) cha Viem. Wateja wa umma hawana ufunguo wa siri ulioambatishwa, na kwa hivyo hawawezi kutuma miamala. Wanaweza kuita [vitendaji vya `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), kusoma salio la akaunti, n.k.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Vigezo vya mazingira vinapatikana katika [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Hata hivyo, TypeScript ina aina thabiti. Kigezo cha mazingira kinaweza kuwa mfuatano wowote, au tupu, kwa hivyo aina ya kigezo cha mazingira ni `string | undefined`. Hata hivyo, ufunguo unafafanuliwa katika Viem kama `0x${string}` (`0x` ikifuatiwa na mfuatano). Hapa tunaiambia TypeScript kwamba kigezo cha mazingira cha `PRIVATE_KEY` kitakuwa cha aina hiyo. Ikiwa sivyo, tutapata hitilafu ya wakati wa utekelezaji.

Kisha kitendaji cha [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) kinatumia ufunguo wa siri huu kuunda kipengee kamili cha akaunti.

```typescript
const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(),
})
```

Kisha, tunatumia kipengee cha akaunti kuunda [kiteja cha mkoba](https://viem.sh/docs/clients/wallet). Kiteja hiki kina ufunguo wa siri na anwani, kwa hivyo kinaweza kutumika kutuma miamala.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Sasa kwa kuwa tuna mahitaji yote ya awali, hatimaye tunaweza kuunda [mfano wa mkataba](https://viem.sh/docs/contract/getContract). Tutatumia mfano huu wa mkataba kuwasiliana na mkataba wa mnyororoni.

##### Kusoma kutoka kwenye mnyororo wa vitalu

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Vitendaji vya mkataba ambavyo ni vya kusoma pekee ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) na [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) vinapatikana chini ya `read`. Katika hali hii, tunaitumia kufikia kitendaji cha [`greet`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_contract), ambacho kinarudisha salamu.

JavaScript ina uzi mmoja, kwa hivyo tunapoanzisha mchakato unaochukua muda mrefu tunahitaji [kubainisha kuwa tunaifanya kwa njia isiyosawazishwa](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Kuita mnyororo wa vitalu, hata kwa operesheni ya kusoma pekee, kunahitaji safari ya kwenda na kurudi kati ya kompyuta na nodi ya mnyororo wa vitalu. Hiyo ndiyo sababu tunabainisha hapa kwamba msimbo unahitaji `await` kwa ajili ya matokeo.

Ikiwa una nia ya kujua jinsi hii inavyofanya kazi unaweza [kusoma kuihusu hapa](https://www.w3schools.com/js/js_promise.asp), lakini kwa vitendo unachohitaji kujua ni kwamba una `await` matokeo ikiwa utaanzisha operesheni inayochukua muda mrefu, na kwamba kitendaji chochote kinachofanya hivi lazima kitangazwe kama `async`.

##### Kutoa miamala

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Hiki ni kitendaji unachokiita ili kutoa muamala unaobadilisha salamu. Kwa kuwa hii ni operesheni ndefu, kitendaji kinatangazwa kama `async`. Kwa sababu ya utekelezaji wa ndani, kitendaji chochote cha `async` kinahitaji kurudisha kipengee cha `Promise`. Katika hali hii, `Promise<any>` inamaanisha kuwa hatubainishi ni nini hasa kitarudishwa katika `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Sehemu ya `write` ya mfano wa mkataba ina vitendaji vyote vinavyoandika kwenye hali ya mnyororo wa vitalu (vile vinavyohitaji kutuma muamala), kama vile [`setGreeting`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=write_contract). Vigezo, ikiwa vipo, vinatolewa kama orodha, na kitendaji kinarudisha heshi ya muamala.

```typescript
    console.log(`Working on a fix, see https://eth-sepolia.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Ripoti heshi ya muamala (kama sehemu ya URL kwenye kichunguzi cha bloku ili kuitazama) na uirudishe.

##### Kujibu matukio

```typescript
greeter.watchEvent.SetGreeting({
```

[Kitendaji cha `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) kinakuruhusu kubainisha kuwa kitendaji kitaendeshwa wakati tukio linapotolewa. Ikiwa unajali tu kuhusu aina moja ya tukio (katika hali hii, `SetGreeting`), unaweza kutumia sintaksia hii kujiwekea kikomo kwa aina hiyo ya tukio.

```typescript
    onLogs: logs => {
```

Kitendaji cha `onLogs` kinaitwa wakati kuna maingizo ya logi. Katika Ethereum "logi" na "tukio" kwa kawaida hutumika kwa kubadilishana.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Kunaweza kuwa na matukio mengi, lakini kwa urahisi tunajali tu kuhusu la kwanza. `logs[0].args` ni hoja za tukio, katika hali hii `sender` na `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Ikiwa mtumaji _sio_ seva hii, tumia `setGreeting` kubadilisha salamu.

#### `package.json` {#package-json}

[Faili hili](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) linadhibiti usanidi wa [Node.js](https://nodejs.org/en). Makala haya yanaelezea tu ufafanuzi muhimu.

```json
{
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Hati ni vitendo mbalimbali vya programu. Katika hali hii, pekee tuliyo nayo ni `start`, ambayo inakusanya na kisha kuendesha seva. Amri ya `tsc` ni sehemu ya kifurushi cha `typescript` na inakusanya TypeScript kuwa JavaScript. Ikiwa unataka kuiendesha wewe mwenyewe, inapatikana katika `node_modules/.bin`. Amri ya pili inaendesha seva.

```json
  "type": "module",
```

Kuna aina nyingi za programu za nodi za JavaScript. Aina ya `module` inaturuhusu kuwa na `await` katika msimbo wa kiwango cha juu, ambayo ni muhimu unapofanya operesheni za polepole (na kwa hivyo zisizosawazishwa).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Hivi ni vifurushi ambavyo vinahitajika tu kwa ajili ya usanidi. Hapa tunahitaji `typescript` na kwa sababu tunaitumia na Node.js, tunapata pia aina za vigezo na vipengee vya nodi, kama vile `process`. [Nukuu ya `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) inamaanisha toleo hilo au toleo la juu zaidi ambalo halina mabadiliko yanayovunja. Tazama [hapa](https://semver.org) kwa maelezo zaidi kuhusu maana ya nambari za matoleo.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Hivi ni vifurushi ambavyo vinahitajika wakati wa utekelezaji, wakati wa kuendesha `dist/app.js`.

## Hitimisho {#conclusion}

Seva iliyowekwa kati tuliyounda hapa inafanya kazi yake, ambayo ni kutenda kama wakala kwa mtumiaji. Mtu mwingine yeyote anayetaka dapp iendelee kufanya kazi na yuko tayari kutumia gesi anaweza kuendesha mfano mpya wa seva na anwani yake mwenyewe.

Hata hivyo, hii inafanya kazi tu wakati vitendo vya seva iliyowekwa kati vinaweza kuthibitishwa kwa urahisi. Ikiwa seva iliyowekwa kati ina taarifa yoyote ya hali ya siri, au inaendesha hesabu ngumu, ni huluki iliyowekwa kati ambayo unahitaji kuiamini ili kutumia programu, ambayo ndiyo hasa minyororo ya vitalu inajaribu kuepuka. Katika makala yajayo ninapanga kuonyesha jinsi ya kutumia [uthibitisho wa sifuri-maarifa](/zero-knowledge-proofs) ili kutatua tatizo hili.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
