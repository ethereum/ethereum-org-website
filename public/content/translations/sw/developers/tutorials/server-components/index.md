---
title: "Vipengele vya seva na mawakala kwa ajili ya programu za web3"
description: Baada ya kusoma mafunzo haya, utaweza kuandika seva za TypeScript zinazosikiliza matukio kwenye mnyororo wa bloku na kujibu ipasavyo kwa miamala yao wenyewe. Hii itakuwezesha kuandika programu za kati (kwa sababu seva ni mahali pa kushindwa), lakini inaweza kuingiliana na mashirika ya web3. Mbinu hizi hizi zinaweza pia kutumika kuandika wakala anayeshughulikia matukio ya onchain bila kuhusisha binadamu.

author: Ori Pomerantz
lang: sw
tags: ["agent", "server", "offchain"]
skill: beginner
published: 2024-07-15
---

## Utangulizi {#introduction}

Katika hali nyingi, programu isiyo ya kati hutumia seva kusambaza programu, lakini mwingiliano wote halisi hutokea kati ya mteja (kawaida, kivinjari cha wavuti) na mnyororo wa bloku.

![Mwingiliano wa kawaida kati ya seva ya wavuti, mteja, na mnyororo wa bloku](./fig-1.svg)

Hata hivyo, kuna baadhi ya matukio ambapo programu ingenufaika kutokana na kuwa na kipengele cha seva kinachofanya kazi kivyake. Seva kama hiyo itaweza kujibu matukio, na maombi yanayotoka kwenye vyanzo vingine, kama vile API, kwa kutoa miamala.

![Mwingiliano na nyongeza ya seva](./fig-2.svg)

Kuna kazi kadhaa zinazowezekana ambazo seva kama hiyo inaweza kutimiza.

- Mmiliki wa hali ya siri. Katika michezo ya kubahatisha mara nyingi ni muhimu kutokuwa na taarifa zote ambazo mchezo unajua zinazopatikana kwa wachezaji. Hata hivyo, _hakuna siri kwenye mnyororo wa bloku_, taarifa yoyote iliyo kwenye mnyororo wa bloku ni rahisi kwa yeyote kuigundua. Kwa hiyo, kama sehemu ya hali ya mchezo inapaswa kuwekwa siri, ni lazima ihifadhiwe mahali pengine (na ikiwezekana athari za hali hiyo zithibitishwe kwa kutumia [uthibitisho wa zero-knowledge](/zero-knowledge-proofs)).

- Oracle ya kati. Ikiwa hisa ni za chini vya kutosha, seva ya nje inayosoma baadhi ya taarifa mtandaoni na kisha kuichapisha kwenye chaini inaweza kuwa nzuri ya kutosha kutumia kama [oracle](/developers/docs/oracles/).

- Wakala. Hakuna kinachotokea kwenye mnyororo wa bloku bila muamala wa kuiwasha. Seva inaweza kutenda kwa niaba ya mtumiaji kutekeleza vitendo kama vile [arbitrage](/developers/docs/mev/#mev-examples-dex-arbitrage) wakati fursa inapojitokeza.

## Programu ya mfano {#sample-program}

Unaweza kuona seva ya mfano [kwenye github](https://github.com/qbzzt/20240715-server-component). Seva hii inasikiliza matukio yanayotoka kwenye [mkataba huu](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), toleo lililobadilishwa la Greeter ya Hardhat. Wakati salamu inabadilishwa, inairudisha kama ilivyokuwa.

Ili kuiendesha:

1. Kloni hifadhi.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Sakinisha vifurushi vinavyohitajika. Kama huna tayari, [sakinisha Node kwanza](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Hariri `.env` ili kubainisha ufunguo binafsi wa akaunti iliyo na ETH kwenye testnet ya Holesky. Ikiwa huna ETH kwenye Holesky, unaweza [kutumia bomba hili](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <ufunguo binafsi unaenda hapa>
   ```

4. Anzisha seva.

   ```sh copy
   npm start
   ```

5. Nenda kwenye [kichunguzi cha bloku](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract), na ukitumia anwani tofauti na ile iliyo na ufunguo binafsi rekebisha salamu. Tazama kwamba salamu inarekebishwa kiotomatiki.

### Inafanyaje kazi? {#how-it-works}

Njia rahisi zaidi ya kuelewa jinsi ya kuandika kipengele cha seva ni kupitia sampuli mstari kwa mstari.

#### `src/app.ts` {#src-app-ts}

Idadi kubwa ya programu imo ndani ya [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Kuunda vitu vinavyohitajika

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Hizi ni huluki za [Viem](https://viem.sh/) tunazohitaji, kazi na [aina ya `Anwani`](https://viem.sh/docs/glossary/types#address). Seva hii imeandikwa kwa [TypeScript](https://www.typescriptlang.org/), ambayo ni nyongeza kwa JavaScript inayoifanya iwe na [aina madhubuti](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Kitendakazi hiki](https://viem.sh/docs/accounts/privateKey) kinaturuhusu kutoa maelezo ya mkoba, ikiwa ni pamoja na anwani, inayolingana na ufunguo binafsi.

```typescript
import { holesky } from "viem/chains"
```

Ili kutumia mnyororo wa bloku katika Viem unahitaji kuingiza ufafanuzi wake. Katika kesi hii, tunataka kuunganisha kwenye mnyororo wa bloku wa majaribio wa [Holesky](https://github.com/eth-clients/holesky).

```typescript
// Hivi ndivyo tunavyoongeza ufafanuzi katika .env kwa process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

Hivi ndivyo tunavyosoma `.env` katika mazingira. Tunaihitaji kwa ufunguo binafsi (tazama baadaye).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
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

Katika JavaScript (na kwa hiyo TypeScript) huwezi kugawa thamani mpya kwa kistari, lakini _unaweza_ kurekebisha kitu kilichohifadhiwa ndani yake. Kwa kutumia kiambishi tamati `as const` tunaiambia TypeScript kwamba orodha yenyewe ni ya kudumu na haiwezi kubadilishwa.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Unda [mteja wa umma](https://viem.sh/docs/clients/public.html) wa Viem. Wateja wa umma hawana ufunguo binafsi ulioambatanishwa, na kwa hivyo hawawezi kutuma miamala. Wanaweza kuita [kazi za `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), kusoma salio za akaunti, n.k.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Vigezo vya mazingira vinapatikana katika [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Hata hivyo, TypeScript ina aina madhubuti. Kigezo cha mazingira kinaweza kuwa mfuatano wowote, au tupu, kwa hivyo aina ya kigezo cha mazingira ni `string | undefined`. Hata hivyo, ufunguo umefafanuliwa katika Viem kama `0x${string}` (`0x` ikifuatiwa na mfuatano). Hapa tunaiambia TypeScript kwamba kigezo cha mazingira cha `PRIVATE_KEY` kitakuwa cha aina hiyo. Ikiwa sivyo, tutapata hitilafu ya muda wa utekelezaji.

Kitendakazi cha [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) kisha hutumia ufunguo huu binafsi kuunda kitu kamili cha akaunti.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Ifuatayo, tunatumia kitu cha akaunti kuunda [mteja wa mkoba](https://viem.sh/docs/clients/wallet). Mteja huyu ana ufunguo binafsi na anwani, kwa hivyo inaweza kutumika kutuma miamala.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Sasa kwa kuwa tuna mahitaji yote, hatimaye tunaweza kuunda [mfano wa mkataba](https://viem.sh/docs/contract/getContract). Tutatumia mfano huu wa mkataba kuwasiliana na mkataba wa onchain.

##### Kusoma kutoka kwenye mnyororo wa bloku

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Kazi za mkataba ambazo zinasomwa tu ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) na [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) zinapatikana chini ya `read`. Katika kisa hiki, tunaitumia kufikia kitendakazi cha [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), ambacho hurudisha salamu.

JavaScript ina uzi mmoja, kwa hivyo tunapoanzisha mchakato mrefu tunahitaji [kubainisha kuwa tunafanya hivyo kwa njia isiyosawazishwa](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Kuita mnyororo wa bloku, hata kwa operesheni ya kusoma tu, inahitaji safari ya kwenda na kurudi kati ya kompyuta na nodi ya mnyororo wa bloku. Hiyo ndiyo sababu tunabainisha hapa msimbo unahitaji `kusubiri` matokeo.

Ikiwa una nia ya jinsi hii inavyofanya kazi unaweza [kusoma kuihusu hapa](https://www.w3schools.com/js/js_promise.asp), lakini kwa vitendo unachohitaji kujua ni kwamba `unasubiri` matokeo ukianza operesheni inayochukua muda mrefu, na kwamba kitendakazi chochote kinachofanya hivi lazima kitangazwe kama `async`.

##### Kutoa miamala

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Hiki ndicho kitendakazi unachoita ili kutoa muamala unaobadilisha salamu. Kwa kuwa hii ni operesheni ndefu, kitendakazi kinatangazwa kama `async`. Kwa sababu ya utekelezaji wa ndani, kitendakazi chochote cha `async` kinahitaji kurudisha kitu cha `Promise`. Katika kesi hii, `Promise<any>` inamaanisha kuwa hatubainishi nini hasa kitarudishwa katika `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Sehemu ya `write` ya mfano wa mkataba ina kazi zote zinazoandika kwenye hali ya mnyororo wa bloku (zile zinazohitaji kutuma muamala), kama vile [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Vigezo, ikiwa vipo, vinatolewa kama orodha, na kitendakazi hurudisha hashi ya muamala.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Ripoti hashi ya muamala (kama sehemu ya URL kwa kichunguzi cha bloku ili kuitazama) na uirudishe.

##### Kujibu matukio

```typescript
greeter.watchEvent.SetGreeting({
```

[Kitendakazi cha `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) hukuruhusu kubainisha kuwa kitendakazi kitaendeshwa tukio linapotolewa. Ikiwa unajali tu aina moja ya tukio (katika kesi hii, `SetGreeting`), unaweza kutumia sintaksia hii kujizuia kwa aina hiyo ya tukio.

```typescript
    onLogs: logs => {
```

Kitendakazi cha `onLogs` huitwa kunapokuwa na maingizo ya kumbukumbu. Katika Ethereum "log" na "tukio" kawaida hubadilishana.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Kunaweza kuwa na matukio mengi, lakini kwa urahisi tunajali tu lile la kwanza. `logs[0].args` ni hoja za tukio, katika kesi hii `sender` na `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Ikiwa mtumaji _sio_ seva hii, tumia `setGreeting` kubadilisha salamu.

#### `package.json` {#package-json}

[Faili hii](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) inadhibiti usanidi wa [Node.js](https://nodejs.org/en). Makala hii inaelezea tu ufafanuzi muhimu.

```json
{
  "main": "dist/index.js",
```

Ufafanuzi huu unabainisha faili gani ya JavaScript itaendeshwa.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Hati ni vitendo mbalimbali vya programu. Katika kesi hii, pekee tuliyo nayo ni `start`, ambayo inakusanya na kisha kuendesha seva. Amri ya `tsc` ni sehemu ya kifurushi cha `typescript` na inakusanya TypeScript kuwa JavaScript. Ikiwa unataka kuiendesha mwenyewe, iko katika `node_modules/.bin`. Amri ya pili inaendesha seva.

```json
  "type": "module",
```

Kuna aina nyingi za programu za Node za JavaScript. Aina ya `module` inaturuhusu kuwa na `await` katika msimbo wa kiwango cha juu, ambayo ni muhimu unapofanya operesheni za polepole (na kwa hivyo zisizosawazishwa).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Hivi ni vifurushi vinavyohitajika tu kwa ajili ya maendeleo. Hapa tunahitaji `typescript` na kwa sababu tunaitumia na Node.js, tunapata pia aina za vigezo na vitu vya Node, kama vile `process`. [Nukuu ya `^<toleo>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) inamaanisha toleo hilo au toleo la juu zaidi ambalo halina mabadiliko ya kuvunja. Tazama [hapa](https://semver.org) kwa habari zaidi kuhusu maana ya nambari za toleo.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Hivi ni vifurushi vinavyohitajika wakati wa utekelezaji, wakati wa kuendesha `dist/app.js`.

## Hitimisho {#conclusion}

Seva ya kati tuliyoiunda hapa inafanya kazi yake, ambayo ni kutenda kama wakala kwa mtumiaji. Mtu mwingine yeyote anayetaka mfumo mtawanyo wa kimamlaka uendelee kufanya kazi na yuko tayari kutumia gesi anaweza kuendesha mfano mpya wa seva na anwani yake mwenyewe.

Hata hivyo, hii inafanya kazi tu wakati vitendo vya seva ya kati vinaweza kuthibitishwa kwa urahisi. Ikiwa seva ya kati ina habari yoyote ya hali ya siri, au inafanya hesabu ngumu, ni chombo cha kati ambacho unahitaji kuamini ili kutumia programu, ambacho ndicho hasa minyororo ya bloku inajaribu kuepuka. Katika makala ya baadaye napanga kuonyesha jinsi ya kutumia [uthibitisho wa zero-knowledge](/zero-knowledge-proofs) ili kutatua tatizo hili.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
