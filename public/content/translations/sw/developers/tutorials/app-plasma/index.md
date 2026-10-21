---
title: Andika Plasma mahususi kwa programu inayohifadhi faragha
description: Katika somo hili, tunaunda benki ya siri nusu kwa ajili ya amana. Benki ni kijenzi kilichowekwa kati; inajua salio la kila mtumiaji. Hata hivyo, taarifa hii haihifadhiwi mnyororoni. Badala yake, benki huchapisha heshi ya hali. Kila wakati muamala unapotokea, benki huchapisha heshi mpya, pamoja na uthibitisho wa maarifa-sifuri kwamba ina muamala uliosainiwa ambao unabadilisha hali ya heshi kuwa mpya. Baada ya kusoma somo hili, utaelewa sio tu jinsi ya kutumia uthibitisho wa maarifa-sifuri, bali pia kwa nini unaitumia na jinsi ya kufanya hivyo kwa usalama.
author: Ori Pomerantz
tags: ["sifuri-maarifa", "seva", "nje ya mnyororo", "faragha"]
skill: advanced
breadcrumb: Plasma mahususi kwa Programu
lang: sw
published: 2025-10-15
---

## Utangulizi {#introduction}

Tofauti na [mikusanyiko](/developers/docs/scaling/zk-rollups/), [Plasma](/developers/docs/scaling/plasma) hutumia Mtandao Mkuu wa Ethereum kwa uadilifu, lakini si kwa upatikanaji. Katika makala haya, tunaandika programu inayofanya kazi kama Plasma, huku Ethereum ikihakikisha uadilifu (hakuna mabadiliko yasiyoidhinishwa) lakini si upatikanaji (kijenzi kilichowekwa kati kinaweza kuharibika na kulemaza mfumo mzima).

Programu tunayoiandika hapa ni benki inayohifadhi faragha. Anwani tofauti zina akaunti zilizo na salio, na zinaweza kutuma pesa (ETH) kwa akaunti zingine. Benki huchapisha heshi za hali (akaunti na salio zake) na miamala, lakini huweka salio halisi nje ya mnyororo ambapo zinaweza kubaki faragha.

## Muundo {#design}

Huu si mfumo ulio tayari kwa uzalishaji, bali ni zana ya kufundishia. Kwa hivyo, umeandikwa kwa dhana kadhaa zinazorahisisha.

- Kundi la akaunti zisizobadilika. Kuna idadi maalum ya akaunti, na kila akaunti ni ya anwani iliyoamuliwa mapema. Hii hufanya mfumo kuwa rahisi zaidi kwa sababu ni vigumu kushughulikia miundo ya data yenye ukubwa unaobadilika katika uthibitisho wa maarifa-sifuri. Kwa mfumo ulio tayari kwa uzalishaji, tunaweza kutumia [mzizi wa Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) kama heshi ya hali na kutoa uthibitisho wa Merkle kwa salio zinazohitajika.

- Uhifadhi wa kumbukumbu. Kwenye mfumo wa uzalishaji, tunahitaji kuandika salio zote za akaunti kwenye diski ili kuzihifadhi endapo utawashwa upya. Hapa, ni sawa ikiwa taarifa itapotea tu.

- Uhamisho pekee. Mfumo wa uzalishaji ungehitaji njia ya kuweka rasilimali kwenye benki na kuzitoa. Lakini lengo hapa ni kuelezea tu dhana, kwa hivyo benki hii inakomea kwenye uhamisho pekee.

### Uthibitisho wa maarifa-sifuri {#zero-knowledge-proofs}

Katika kiwango cha msingi, uthibitisho wa maarifa-sifuri unaonyesha kwamba mthibitishaji anajua baadhi ya data, _Data<sub>private</sub>_ kiasi kwamba kuna uhusiano _Relationship_ kati ya baadhi ya data za umma, _Data<sub>public</sub>_, na _Data<sub>private</sub>_. Mhakiki anajua _Relationship_ na _Data<sub>public</sub>_.

Ili kuhifadhi faragha, tunahitaji hali na miamala iwe ya faragha. Lakini ili kuhakikisha uadilifu, tunahitaji [heshi ya kriptografia](https://en.wikipedia.org/wiki/Cryptographic_hash_function) ya hali iwe ya umma. Ili kuwathibitishia watu wanaowasilisha miamala kwamba miamala hiyo ilifanyika kweli, tunahitaji pia kuchapisha heshi za muamala.

Katika hali nyingi, _Data<sub>private</sub>_ ndiyo ingizo kwa programu ya uthibitisho wa maarifa-sifuri, na _Data<sub>public</sub>_ ndiyo towe.

Sehemu hizi katika _Data<sub>private</sub>_:

- _State<sub>n</sub>_, hali ya zamani
- _State<sub>n+1</sub>_, hali mpya
- _Transaction_, muamala unaobadilika kutoka hali ya zamani hadi mpya. Muamala huu unahitaji kujumuisha sehemu hizi:
  - _Anwani ya mwisho_ inayopokea hamisho
  - _Kiasi_ kinachohamishwa
  - _Nonsi_ ili kuhakikisha kila muamala unaweza kuchakatwa mara moja tu.
    Anwani ya chanzo haihitaji kuwa kwenye muamala, kwa sababu inaweza kupatikana kutoka kwenye sahihi.
- _Signature_, sahihi iliyoidhinishwa kufanya muamala. Kwa upande wetu, anwani pekee iliyoidhinishwa kufanya muamala ni anwani ya chanzo. Kwa sababu mfumo wetu wa sifuri-maarifa unafanya kazi jinsi unavyofanya, tunahitaji pia ufunguo wa umma wa akaunti, pamoja na sahihi ya Ethereum.

Hizi ni sehemu katika _Data<sub>public</sub>_:

- _Hash(State<sub>n</sub>)_ heshi ya hali ya zamani
- _Hash(State<sub>n+1</sub>)_ heshi ya hali mpya
- _Hash(Transaction)_ heshi ya muamala unaobadilisha hali kutoka _State<sub>n</sub>_ hadi _State<sub>n+1</sub>_.

Uhusiano huangalia masharti kadhaa:

- Heshi za umma kwa kweli ni heshi sahihi kwa sehemu za faragha.
- Muamala, unapotumika kwa hali ya zamani, husababisha hali mpya.
- Sahihi inatoka kwenye anwani ya chanzo cha muamala.

Kwa sababu ya sifa za kazi za heshi za kriptografia, kuthibitisha masharti haya kunatosha kuhakikisha uadilifu.

### Miundo ya data {#data-structures}

Muundo mkuu wa data ni hali inayoshikiliwa na seva. Kwa kila akaunti, seva hufuatilia salio la akaunti na [nonsi](https://en.wikipedia.org/wiki/Cryptographic_nonce), inayotumika kuzuia [mashambulizi ya kurudiwa](https://en.wikipedia.org/wiki/Replay_attack).

### Vijenzi {#components}

Mfumo huu unahitaji vijenzi viwili:

- _Seva_ inayopokea miamala, kuichakata, na kuchapisha heshi kwenye mnyororo pamoja na uthibitisho wa maarifa-sifuri.
- _Mkataba mahiri_ unaohifadhi heshi na kuhakiki uthibitisho wa maarifa-sifuri ili kuhakikisha mabadiliko ya hali ni halali.

### Mtiririko wa data na udhibiti {#flows}

Hizi ni njia ambazo vijenzi mbalimbali huwasiliana ili kufanya hamisho kutoka akaunti moja hadi nyingine.

1. Kivinjari cha wavuti huwasilisha muamala uliosainiwa ukiomba hamisho kutoka kwa akaunti ya mtia saini kwenda kwa akaunti tofauti.

2. Seva inahakiki kwamba muamala ni halali:

   - Mtia saini ana akaunti katika benki yenye salio la kutosha.
   - Mpokeaji ana akaunti katika benki.

3. Seva inakokotoa hali mpya kwa kutoa kiasi kilichohamishwa kutoka kwenye salio la mtia saini na kukiongeza kwenye salio la mpokeaji.

4. Seva inakokotoa uthibitisho wa maarifa-sifuri kwamba mabadiliko ya hali ni halali.

5. Seva inawasilisha kwa Ethereum muamala unaojumuisha:

   - Heshi ya hali mpya
   - Heshi ya muamala (ili mtumaji wa muamala aweze kujua imechakatwa)
   - Uthibitisho wa maarifa-sifuri unaothibitisha mabadiliko ya hali mpya ni halali

6. Mkataba mahiri unahakiki uthibitisho wa maarifa-sifuri.

7. Ikiwa uthibitisho wa maarifa-sifuri ni sahihi, mkataba mahiri hufanya vitendo hivi:
   - Kusasisha heshi ya hali ya sasa kuwa heshi ya hali mpya
   - Kutoa ingizo la logi lenye heshi ya hali mpya na heshi ya muamala

### Zana {#tools}

Kwa msimbo wa upande wa mteja, tutatumia [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), na [Wagmi](https://wagmi.sh/). Hizi ni zana za kiwango cha tasnia; ikiwa huzifahamu, unaweza kutumia [somo hili](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Sehemu kubwa ya seva imeandikwa kwa JavaScript kwa kutumia [Node](https://nodejs.org/en). Sehemu ya sifuri-maarifa imeandikwa kwa [Noir](https://noir-lang.org/). Tunahitaji toleo `1.0.0-beta.10`, kwa hivyo baada ya [kusakinisha Noir kama ilivyoelekezwa](https://noir-lang.org/docs/getting_started/quick_start), endesha:

```
noirup -v 1.0.0-beta.10
```

Mnyororo wa vitalu tunaotumia ni `anvil`, mnyororo wa vitalu wa majaribio wa ndani ambao ni sehemu ya [Foundry](https://getfoundry.sh/introduction/installation).

## Utekelezaji {#implementation}

Kwa sababu huu ni mfumo changamano, tutautekeleza kwa hatua.

### Hatua ya 1 - Sifuri maarifa ya mikono {#stage-1}

Kwa hatua ya kwanza, tutasaini muamala kwenye kivinjari na kisha kutoa taarifa hiyo kwa uthibitisho wa maarifa-sifuri kwa mikono. Msimbo wa sifuri-maarifa unatarajia kupata taarifa hiyo katika `server/noir/Prover.toml` (imeandikwa [hapa](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Ili kuiona ikifanya kazi:

1. Hakikisha umesakinisha [Node](https://nodejs.org/en/download) na [Noir](https://noir-lang.org/docs/installation). Ikiwezekana, isakinishe kwenye mfumo wa UNIX kama vile macOS, Linux, au [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Pakua msimbo wa hatua ya 1 na uwashe seva ya wavuti ili kuhudumia msimbo wa mteja.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Sababu inayofanya uhitaji seva ya wavuti hapa ni kwamba, ili kuzuia aina fulani za udanganyifu, mikoba mingi (kama vile MetaMask) haikubali faili zinazohudumiwa moja kwa moja kutoka kwenye diski

3. Fungua kivinjari kilicho na mkoba.

4. Kwenye mkoba, weka nenosiri jipya. Kumbuka kwamba hii itafuta nenosiri lako lililopo, kwa hivyo _hakikisha una nakala rudufu_.

   Nenosiri ni `test test test test test test test test test test test junk`, nenosiri chaguomsingi la majaribio la anvil.

5. Vinjari hadi kwenye [msimbo wa upande wa mteja](http://localhost:5173/).

6. Unganisha kwenye mkoba na uchague akaunti yako ya mwisho na kiasi.

7. Bofya **Saini** na usaini muamala.

8. Chini ya kichwa cha **Prover.toml**, utapata maandishi. Badilisha `server/noir/Prover.toml` na maandishi hayo.

9. Tekeleza uthibitisho wa maarifa-sifuri.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Towe linapaswa kufanana na

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Linganisha thamani mbili za mwisho na heshi unayoiona kwenye kivinjari cha wavuti ili kuona ikiwa ujumbe umeheshishwa kwa usahihi.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Faili hili](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) linaonyesha muundo wa taarifa unaotarajiwa na Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Ujumbe uko katika muundo wa maandishi, jambo ambalo hufanya iwe rahisi kwa mtumiaji kuelewa (ambayo ni muhimu wakati wa kusaini) na kwa msimbo wa Noir kuchanganua. Kiasi kimenukuliwa katika finney ili kuwezesha uhamisho wa sehemu kwa upande mmoja, na kusomeka kwa urahisi kwa upande mwingine. Nambari ya mwisho ni [nonsi](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Mfuatano una urefu wa herufi 100. Uthibitisho wa maarifa-sifuri haushughulikii data zenye ukubwa unaobadilika vizuri, kwa hivyo mara nyingi ni muhimu kujaza data.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Vigezo hivi vitatu ni safu za baiti zenye ukubwa usiobadilika.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

Hii ndiyo njia ya kubainisha safu ya miundo. Kwa kila ingizo, tunabainisha anwani, salio (kwa milliETH a.k.a. [finney](https://cryptovalleyjournal.com/glossary/finney/)), na thamani ya nonsi inayofuata.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Faili hili](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) hutekeleza uchakataji wa upande wa mteja na kuzalisha faili la `server/noir/Prover.toml` (lile linalojumuisha vigezo vya sifuri-maarifa).

Hapa kuna maelezo ya sehemu za kuvutia zaidi.

```tsx
export default attrs =>  {
```

Kazi hii inaunda kijenzi cha React cha `Transfer`, ambacho faili zingine zinaweza kuleta.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Hizi ni anwani za akaunti, anwani zilizoundwa na nenosiri la `test ... test junk`. Ikiwa unataka kutumia anwani zako mwenyewe, rekebisha tu ufafanuzi huu.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Hizi [kulabu za Wagmi](https://wagmi.sh/react/api/hooks) huturuhusu kufikia maktaba ya [Viem](https://viem.sh/) na mkoba.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Huu ni ujumbe, uliojazwa na nafasi. Kila wakati mojawapo ya vigeu vya [`useState`](https://react.dev/reference/react/useState) inapobadilika, kijenzi huchorwa upya na `message` husasishwa.

```tsx
  const sign = async () => {
```

Kazi hii inaitwa wakati mtumiaji anabofya kitufe cha **Saini**. Ujumbe husasishwa kiotomatiki, lakini sahihi inahitaji idhini ya mtumiaji kwenye mkoba, na hatutaki kuiomba isipokuwa inahitajika.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Omba mkoba [usaini ujumbe](https://viem.sh/docs/accounts/local/signMessage). 

```tsx
    const hash = hashMessage(message)
```

Pata heshi ya ujumbe. Inasaidia kuipatia mtumiaji kwa ajili ya utatuzi (wa msimbo wa Noir). 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Pata ufunguo wa umma](https://viem.sh/docs/utilities/recoverPublicKey). Hii inahitajika kwa kazi ya [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Weka vigeu vya hali. Kufanya hivi huchora upya kijenzi (baada ya kazi ya `sign` kutoka) na kumuonyesha mtumiaji thamani zilizosasishwa.

```tsx
    let proverToml = `
```

Maandishi kwa ajili ya `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem inatupatia ufunguo wa umma kama mfuatano wa heksadesimali wa baiti 65. Baiti ya kwanza ni `0x04`, alama ya toleo. Hii inafuatiwa na baiti 32 kwa ajili ya `x` ya ufunguo wa umma na kisha baiti 32 kwa ajili ya `y` ya ufunguo wa umma.

Hata hivyo, Noir inatarajia kupata taarifa hii kama safu mbili za baiti, moja kwa ajili ya `x` na moja kwa ajili ya `y`. Ni rahisi kuichanganua hapa kwa mteja badala ya kuwa sehemu ya uthibitisho wa maarifa-sifuri.

Kumbuka kwamba hii ni mazoezi mazuri katika sifuri-maarifa kwa ujumla. Msimbo ndani ya uthibitisho wa maarifa-sifuri ni ghali, kwa hivyo uchakataji wowote unaoweza kufanywa nje ya uthibitisho wa maarifa-sifuri _unapaswa_ kufanywa nje ya uthibitisho wa maarifa-sifuri.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Sahihi pia inatolewa kama mfuatano wa heksadesimali wa baiti 65. Hata hivyo, baiti ya mwisho inahitajika tu ili kurejesha ufunguo wa umma. Kwa kuwa ufunguo wa umma utakuwa tayari umetolewa kwa msimbo wa Noir, hatuuhitaji ili kuhakiki sahihi, na msimbo wa Noir hauuhitaji.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Toa akaunti.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

Huu ni muundo wa HTML (kwa usahihi zaidi, [JSX](https://react.dev/learn/writing-markup-with-jsx)) wa kijenzi.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Faili hili](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) ndio msimbo halisi wa sifuri-maarifa.

```
use std::hash::pedersen_hash;
```

[Heshi ya Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) inatolewa pamoja na [maktaba ya kawaida ya Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Uthibitisho wa maarifa-sifuri kwa kawaida hutumia kazi hii ya heshi. Ni rahisi sana kukokotoa ndani ya [saketi za hesabu](https://rareskills.io/post/arithmetic-circuit) ikilinganishwa na kazi za kawaida za heshi.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Kazi hizi mbili ni maktaba za nje, zilizofafanuliwa katika [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Ni kwa usahihi kile zilichopewa jina, kazi inayokokotoa [heshi ya keccak256](https://emn178.github.io/online-tools/keccak_256.html) na kazi inayohakiki sahihi za Ethereum na kurejesha anwani ya mtia saini wa Ethereum.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir imetiwa hamasa na [Rust](https://www.rust-lang.org/). Vigeu, kwa chaguo-msingi, ni thabiti. Hivi ndivyo tunavyofafanua thabiti za usanidi wa kimataifa. Hasa, `ACCOUNT_NUMBER` ni idadi ya akaunti tunazohifadhi.

Aina za data zilizoitwa `u<number>` ni idadi hiyo ya biti, ambazo hazijasainiwa. Aina pekee zinazotumika ni `u8`, `u16`, `u32`, `u64`, na `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Kigeu hiki kinatumika kwa heshi ya Pedersen ya akaunti, kama ilivyoelezwa hapa chini.

```
global MESSAGE_LENGTH : u32 = 100;
```

Kama ilivyoelezwa hapo juu, urefu wa ujumbe haubadiliki. Umebainishwa hapa.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[Sahihi za EIP-191](https://eips.ethereum.org/EIPS/eip-191) zinahitaji bafa yenye kiambishi awali cha baiti 26, ikifuatiwa na urefu wa ujumbe katika ASCII, na hatimaye ujumbe wenyewe.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Taarifa tunayohifadhi kuhusu akaunti. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) ni nambari, kwa kawaida hadi biti 253, inayoweza kutumika moja kwa moja katika [saketi ya hesabu](https://rareskills.io/post/arithmetic-circuit) inayotekeleza uthibitisho wa maarifa-sifuri. Hapa tunatumia `Field` kuhifadhi anwani ya Ethereum ya biti 160.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Taarifa tunayohifadhi kwa ajili ya muamala wa hamisho.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Ufafanuzi wa kazi. Kigezo ni taarifa ya `Account`. Matokeo ni safu ya vigeu vya `Field`, ambavyo urefu wake ni `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Thamani ya kwanza katika safu ni anwani ya akaunti. Ya pili inajumuisha salio na nonsi. Wito wa `.into()` hubadilisha nambari kuwa aina ya data inavyohitaji kuwa. `account.nonce` ni thamani ya `u32`, lakini ili kuiongeza kwenye `account.balance << 32`, thamani ya `u128`, inahitaji kuwa `u128`. Hiyo ndiyo `.into()` ya kwanza. Ya pili inabadilisha matokeo ya `u128` kuwa `Field` ili iingie kwenye safu.

```
    flat
}
```

Katika Noir, kazi zinaweza kurejesha thamani mwishoni pekee (hakuna urejeshaji wa mapema). Ili kubainisha thamani inayorejeshwa, unaitathmini kabla tu ya mabano ya kufunga ya kazi.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Kazi hii hubadilisha safu ya akaunti kuwa safu ya `Field`, ambayo inaweza kutumika kama ingizo kwa Heshi ya Petersen.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Hivi ndivyo unavyobainisha kigeu kinachoweza kubadilika, yaani, _sio_ thabiti. Vigeu katika Noir lazima viwe na thamani kila wakati, kwa hivyo tunaanzisha kigeu hiki kwa sifuri zote.

```
    for i in 0..ACCOUNT_NUMBER {
```

Hii ni kitanzi cha `for`. Kumbuka kwamba mipaka ni thabiti. Vitanzi vya Noir lazima viwe na mipaka inayojulikana wakati wa kukusanya. Sababu ni kwamba saketi za hesabu hazitumii udhibiti wa mtiririko. Wakati wa kuchakata kitanzi cha `for`, kikusanyaji huweka tu msimbo ndani yake mara nyingi, moja kwa kila mzunguko.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Hatimaye, tumefika kwenye kazi inayoheshisha safu ya akaunti.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Kazi hii inatafuta akaunti yenye anwani maalum. Kazi hii ingekuwa isiyofaa sana katika msimbo wa kawaida kwa sababu inazunguka akaunti zote, hata baada ya kupata anwani.

Hata hivyo, katika uthibitisho wa maarifa-sifuri, hakuna udhibiti wa mtiririko. Ikiwa tutawahi kuhitaji kuangalia sharti, lazima tuliangalie kila wakati.

Jambo kama hilo hutokea kwa kauli za `if`. Kauli ya `if` katika kitanzi hapo juu inatafsiriwa katika kauli hizi za hisabati.

_condition<sub>result</sub> = accounts[i].address == address_ // moja ikiwa zinalingana, sifuri vinginevyo

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

Kazi ya [`assert`](https://noir-lang.org/docs/language/assert) husababisha uthibitisho wa maarifa-sifuri kuacha kufanya kazi ikiwa dai ni la uongo. Katika kesi hii, ikiwa hatuwezi kupata akaunti yenye anwani husika. Ili kuripoti anwani, tunatumia [mfuatano wa muundo](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Kazi hii inatumia muamala wa hamisho na kurejesha safu mpya ya akaunti.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Hatuwezi kufikia vipengele vya muundo ndani ya mfuatano wa muundo katika Noir, kwa hivyo tunaunda nakala inayoweza kutumika.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

Haya ni masharti mawili yanayoweza kufanya muamala uwe batili.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Unda safu mpya ya akaunti kisha uirejeshe.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Kazi hii inasoma anwani kutoka kwenye ujumbe. 

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Anwani daima ina urefu wa baiti 20 (a.k.a. tarakimu 40 za heksadesimali), na huanza kwenye herufi #7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Soma kiasi na nonsi kutoka kwenye ujumbe. 

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Katika ujumbe, nambari ya kwanza baada ya anwani ni kiasi cha finney (a.k.a. elfu moja ya ETH) cha kuhamisha. Nambari ya pili ni nonsi. Maandishi yoyote kati yao hupuuzwa.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // Tumeipata tu
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Kurejesha [tapo](https://noir-lang.org/docs/noir/concepts/data_types/tuples) ni njia ya Noir kurejesha thamani nyingi kutoka kwenye kazi.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Kazi hii inabadilisha ujumbe kuwa baiti, kisha inabadilisha kiasi kuwa `TransferTxn`.

```rust
// Sawa na hashMessage ya Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Tuliweza kutumia Heshi ya Pedersen kwa akaunti kwa sababu zinaheshishwa tu ndani ya uthibitisho wa maarifa-sifuri. Hata hivyo, katika msimbo huu tunahitaji kuangalia sahihi ya ujumbe, ambayo inazalishwa na kivinjari. Kwa hilo, tunahitaji kufuata muundo wa kusaini wa Ethereum katika [EIP-191](https://eips.ethereum.org/EIPS/eip-191). Hii ina maana tunahitaji kuunda bafa iliyounganishwa na kiambishi awali cha kawaida, urefu wa ujumbe katika ASCII, na ujumbe wenyewe, na kutumia kiwango cha Ethereum cha keccak256 kukiheshisha.

```rust
    // Kiambishi awali cha ASCII
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Ili kuepuka matukio ambapo programu inamuomba mtumiaji kusaini ujumbe unaoweza kutumika kama muamala au kwa madhumuni mengine, EIP-191 inabainisha kwamba jumbe zote zilizosainiwa huanza na herufi 0x19 (sio herufi halali ya ASCII) ikifuatiwa na `Ethereum Signed Message:` na mstari mpya.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

Shughulikia urefu wa ujumbe hadi 999 na ushindwe ikiwa ni mkubwa zaidi. Niliongeza msimbo huu, ingawa urefu wa ujumbe ni thabiti, kwa sababu inafanya iwe rahisi kuubadilisha. Kwenye mfumo wa uzalishaji, labda ungedhani tu `MESSAGE_LENGTH` haibadiliki kwa ajili ya utendaji bora.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Tumia kazi ya kawaida ya Ethereum ya `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // anwani, baiti 16 za kwanza za heshi, baiti 16 za mwisho za heshi        
{
```

Kazi hii inahakiki sahihi, ambayo inahitaji heshi ya ujumbe. Kisha inatupatia anwani iliyoisaini na heshi ya ujumbe. Heshi ya ujumbe hutolewa katika thamani mbili za `Field` kwa sababu hizo ni rahisi kutumia katika sehemu iliyosalia ya programu kuliko safu ya baiti.

Tunahitaji kutumia thamani mbili za `Field` kwa sababu hesabu za uga hufanywa [modulo](https://en.wikipedia.org/wiki/Modulo) idadi kubwa, lakini nambari hiyo kwa kawaida ni chini ya biti 256 (vinginevyo ingekuwa vigumu kufanya hesabu hizo katika EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Bainisha `hash1` na `hash2` kama vigeu vinavyoweza kubadilika, na uandike heshi ndani yake baiti kwa baiti.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
Hii inafanana na [`ecrecover` ya Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), kukiwa na tofauti mbili muhimu:

- Ikiwa sahihi sio halali, wito unashindwa `assert` na programu inakatishwa.
- Ingawa ufunguo wa umma unaweza kurejeshwa kutoka kwenye sahihi na heshi, huu ni uchakataji unaoweza kufanywa nje na, kwa hivyo, haufai kufanywa ndani ya uthibitisho wa maarifa-sifuri. Ikiwa mtu atajaribu kutudanganya hapa, uhakiki wa sahihi utashindwa.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Heshi ya safu ya akaunti za zamani
        Field,  // Heshi ya safu ya akaunti mpya
        Field,  // Baiti 16 za kwanza za heshi ya ujumbe
        Field,  // Baiti 16 za mwisho za heshi ya ujumbe
    )
```

Hatimaye, tunafika kwenye kazi ya `main`. Tunahitaji kuthibitisha kwamba tuna muamala unaobadilisha heshi ya akaunti kwa uhalali kutoka thamani ya zamani hadi mpya. Tunahitaji pia kuthibitisha kwamba ina heshi hii maalum ya muamala ili mtu aliyeituma ajue muamala wake umechakatwa.

```rust
{
    let mut txn = readTransferTxn(message);
```

Tunahitaji `txn` iweze kubadilika kwa sababu hatusomi anwani ya kutoka kwenye ujumbe, tunaisoma kutoka kwenye sahihi. 

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Hatua ya 2 - Kuongeza seva {#stage-2}

Katika hatua ya pili, tunaongeza seva inayopokea na kutekeleza miamala ya hamisho kutoka kwenye kivinjari.

Ili kuiona ikifanya kazi:

1. Simamisha Vite ikiwa inafanya kazi.

2. Pakua tawi linalojumuisha seva na uhakikishe una moduli zote muhimu.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Hakuna haja ya kukusanya msimbo wa Noir, ni sawa na msimbo uliotumia kwa hatua ya 1.

3. Anzisha seva.

   ```sh
   npm run start
   ```

4. Katika dirisha tofauti la mstari wa amri, endesha Vite ili kuhudumia msimbo wa kivinjari.

   ```sh
   cd client
   npm run dev
   ```

5. Vinjari hadi kwenye msimbo wa mteja kwenye [http://localhost:5173](http://localhost:5173)

6. Kabla ya kutoa muamala, unahitaji kujua nonsi, pamoja na kiasi unachoweza kutuma. Ili kupata taarifa hii, bofya **Sasisha data ya akaunti** na usaini ujumbe.

   Tuna utata hapa. Kwa upande mmoja, hatutaki kusaini ujumbe unaoweza kutumika tena ([shambulio la kurudiwa](https://en.wikipedia.org/wiki/Replay_attack)), ndiyo maana tunataka nonsi hapo awali. Hata hivyo, hatuna nonsi bado. Suluhisho ni kuchagua nonsi inayoweza kutumika mara moja tu na ambayo tayari tunayo pande zote mbili, kama vile wakati wa sasa.

   Tatizo la suluhisho hili ni kwamba wakati unaweza usiwe uliosawazishwa kikamilifu. Kwa hivyo badala yake, tunasaini thamani inayobadilika kila dakika. Hii ina maana kwamba dirisha letu la kuathiriwa na mashambulizi ya kurudiwa ni angalau dakika moja. Kwa kuzingatia kwamba katika uzalishaji ombi lililosainiwa litalindwa na TLS, na kwamba upande mwingine wa handaki---seva---inaweza tayari kufichua salio na nonsi (inabidi izijue ili kufanya kazi), hii ni hatari inayokubalika.

7. Pindi kivinjari kinaporejesha salio na nonsi, kinaonyesha fomu ya hamisho. Chagua anwani ya mwisho na kiasi kisha ubofye **Hamisha**. Saini ombi hili.

8. Ili kuona hamisho, ama **Sasisha data ya akaunti** au angalia kwenye dirisha ambapo unaendesha seva. Seva inarekodi hali kila wakati inapobadilika.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Faili hili](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) lina mchakato wa seva, na huingiliana na msimbo wa Noir katika [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Hapa kuna maelezo ya sehemu za kuvutia.

```js
import { Noir } from '@noir-lang/noir_js'
```

Maktaba ya [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) huunganisha kati ya msimbo wa JavaScript na msimbo wa Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Pakia saketi ya hesabu---programu iliyokusanywa ya Noir tuliyounda katika hatua iliyopita---na uwe tayari kuitekeleza.

```js
// Tunatoa tu taarifa za akaunti kama majibu kwa ombi lililotiwa sahihi
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Ili kutoa taarifa za akaunti, tunahitaji tu sahihi. Sababu ni kwamba tayari tunajua ujumbe utakuwa nini, na kwa hivyo heshi ya ujumbe.

```js
const processMessage = async (message, signature) => {
```

Chakata ujumbe na utekeleze muamala unaousimba.

```js
    // Pata ufunguo wa umma
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Kwa kuwa sasa tunaendesha JavaScript kwenye seva, tunaweza kupata ufunguo wa umma hapo badala ya kwa mteja.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` inaendesha programu ya Noir. Vigezo ni sawa na vile vilivyotolewa katika [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Kumbuka kwamba thamani ndefu hutolewa kama safu ya mifuatano ya heksadesimali (`["0x60", "0xA7"]`), sio kama thamani moja ya heksadesimali (`0x60A7`), jinsi Viem inavyofanya.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Ikiwa kuna kosa, likamate kisha upitishe toleo lililorahisishwa kwa mteja.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Tumia muamala. Tayari tulifanya hivyo katika msimbo wa Noir, lakini ni rahisi kuifanya tena hapa badala ya kutoa matokeo kutoka hapo.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Muundo wa awali wa `Accounts`.

### Hatua ya 3 - Mikataba mahiri ya Ethereum {#stage-3}

1. Simamisha michakato ya seva na mteja.

2. Pakua tawi lenye mikataba mahiri na uhakikishe una moduli zote muhimu.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Endesha `anvil` katika dirisha tofauti la mstari wa amri.

4. Zalisha ufunguo wa uhakiki na mhakiki wa Solidity, kisha unakili msimbo wa mhakiki kwenye mradi wa Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Nenda kwenye mikataba mahiri na uweke vigeu vya mazingira ili kutumia mnyororo wa vitalu wa `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Sambaza `Verifier.sol` na uhifadhi anwani kwenye kigeu cha mazingira.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Sambaza mkataba wa `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Thamani ya `0x199..67b` ni heshi ya Pedersen ya hali ya awali ya `Accounts`. Ikiwa utarekebisha hali hii ya awali katika `server/index.mjs`, unaweza kuendesha muamala ili kuona heshi ya awali iliyoripotiwa na uthibitisho wa maarifa-sifuri.

8. Endesha seva.

   ```sh
   cd ../server
   npm run start
   ```

9. Endesha mteja katika dirisha tofauti la mstari wa amri.

   ```sh
   cd client
   npm run dev
   ```

10. Endesha baadhi ya miamala.

11. Ili kuhakiki kwamba hali imebadilika mnyororoni, washa upya mchakato wa seva. Angalia kwamba `ZkBank` haikubali tena miamala, kwa sababu thamani ya asili ya heshi katika miamala inatofautiana na thamani ya heshi iliyohifadhiwa mnyororoni.

    Hili ndilo aina ya kosa linalotarajiwa.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Mabadiliko katika faili hili yanahusiana zaidi na kuunda uthibitisho halisi na kuuwasilisha mnyororoni.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Tunahitaji kutumia [kifurushi cha Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) ili kuunda uthibitisho halisi wa kutuma mnyororoni. Tunaweza kutumia kifurushi hiki ama kwa kuendesha kiolesura cha mstari wa amri (`bb`) au kwa kutumia [maktaba ya JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Maktaba ya JavaScript ni polepole sana kuliko kuendesha msimbo kiasili, kwa hivyo tunatumia [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) hapa ili kutumia mstari wa amri.

Kumbuka kwamba ukiamua kutumia `bb.js`, unahitaji kutumia toleo linaloendana na toleo la Noir unalotumia. Wakati wa kuandika, toleo la sasa la Noir (1.0.0-beta.11) linatumia `bb.js` toleo la 0.87.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Anwani hapa ni ile unayopata unapoanza na `anvil` safi na kufuata maelekezo hapo juu.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Ufunguo huu wa siri ni mojawapo ya akaunti chaguomsingi zilizofadhiliwa mapema katika `anvil`. 

```js
const generateProof = async (witness, fileID) => {
```

Zalisha uthibitisho ukitumia faili inayoweza kutekelezwa ya `bb`.

```js 
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Andika Shahidi kwenye faili.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Unda uthibitisho halisi. Hatua hii pia inaunda faili lenye vigeu vya umma, lakini hatuhitaji hilo. Tayari tulipata vigeu hivyo kutoka kwenye `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Uthibitisho ni safu ya JSON ya thamani za `Field`, kila moja ikiwakilishwa kama thamani ya heksadesimali. Hata hivyo, tunahitaji kuituma katika muamala kama thamani moja ya `bytes`, ambayo Viem inaiwakilisha kwa mfuatano mkubwa wa heksadesimali. Hapa tunabadilisha muundo kwa kuunganisha thamani zote, kuondoa `0x` zote, na kisha kuongeza moja mwishoni.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Safisha na urejeshe uthibitisho.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Nyanja za umma zinahitaji kuwa safu ya thamani za baiti 32. Hata hivyo, kwa kuwa tulihitaji kugawanya heshi ya muamala kati ya thamani mbili za `Field`, inaonekana kama thamani ya baiti 16. Hapa tunaongeza sifuri ili Viem ielewe kuwa ni baiti 32.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Kila anwani hutumia kila nonsi mara moja tu ili tuweze kutumia mchanganyiko wa `fromAddress` na `nonce` kama kitambulisho cha kipekee kwa faili la Shahidi na saraka ya towe.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

Tuma muamala kwenye mnyororo.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Huu ni msimbo wa mnyororoni unaopokea muamala.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

Msimbo wa mnyororoni unahitaji kufuatilia vigeu viwili: mhakiki (mkataba tofauti unaoundwa na `nargo`) na heshi ya hali ya sasa.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Kila wakati hali inapobadilika, tunatoa tukio la `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Kazi hii inachakata miamala. Inapata uthibitisho (kama `bytes`) na maingizo ya umma (kama safu ya `bytes32`), katika muundo ambao mhakiki anahitaji (ili kupunguza uchakataji wa mnyororoni na kwa hivyo gharama za gesi).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

Uthibitisho wa maarifa-sifuri unahitaji kuwa kwamba muamala unabadilika kutoka heshi yetu ya sasa hadi mpya.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Piga simu kwa mkataba wa mhakiki ili kuhakiki uthibitisho wa maarifa-sifuri. Hatua hii hurejesha muamala ikiwa uthibitisho wa maarifa-sifuri ni mbaya.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Ikiwa kila kitu ni sawa, sasisha heshi ya hali kuwa thamani mpya na utoe tukio la `TransactionProcessed`.

## Unyanyasaji na kijenzi kilichowekwa kati {#abuses}

Usalama wa taarifa una sifa tatu:

- _Usiri_, watumiaji hawawezi kusoma taarifa ambazo hawajaidhinishwa kuzisoma.
- _Uadilifu_, taarifa haziwezi kubadilishwa isipokuwa na watumiaji walioidhinishwa kwa njia iliyoidhinishwa.
- _Upatikanaji_, watumiaji walioidhinishwa wanaweza kutumia mfumo.

Kwenye mfumo huu, uadilifu hutolewa kupitia uthibitisho wa maarifa-sifuri. Upatikanaji ni mgumu sana kuhakikisha, na usiri hauwezekani, kwa sababu benki inabidi ijue salio la kila akaunti na miamala yote. Hakuna njia ya kuzuia taasisi iliyo na taarifa kushiriki taarifa hiyo.

Inaweza kuwezekana kuunda benki ya siri kweli kwa kutumia [anwani za siri](https://vitalik.eth.limo/general/2023/01/20/stealth.html), lakini hilo liko nje ya upeo wa makala haya.

### Taarifa za uongo {#false-info}

Njia moja ambayo seva inaweza kukiuka uadilifu ni kutoa taarifa za uongo wakati [data inaombwa](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Ili kutatua hili, tunaweza kuandika programu ya pili ya Noir inayopokea akaunti kama ingizo la faragha na anwani ambayo taarifa yake inaombwa kama ingizo la umma. Towe ni salio na nonsi ya anwani hiyo, na heshi ya akaunti.

Bila shaka, uthibitisho huu hauwezi kuhakikiwa mnyororoni, kwa sababu hatutaki kuchapisha nonsi na salio mnyororoni. Hata hivyo, inaweza kuhakikiwa na msimbo wa mteja unaoendeshwa kwenye kivinjari.

### Miamala ya kulazimishwa {#forced-txns}

Utaratibu wa kawaida wa kuhakikisha upatikanaji na kuzuia udhibiti kwenye L2 ni [miamala ya kulazimishwa](https://docs.optimism.io/stack/transactions/forced-transaction). Lakini miamala ya kulazimishwa haiendani na uthibitisho wa maarifa-sifuri. Seva ndiyo taasisi pekee inayoweza kuhakiki miamala.

Tunaweza kurekebisha `smart-contracts/src/ZkBank.sol` ili kukubali miamala ya kulazimishwa na kuzuia seva kubadilisha hali hadi ichakatwe. Hata hivyo, hili linatufungua kwa shambulio rahisi la kunyimwa huduma. Je, ikiwa muamala wa kulazimishwa ni batili na kwa hivyo hauwezekani kuchakatwa?

Suluhisho ni kuwa na uthibitisho wa maarifa-sifuri kwamba muamala wa kulazimishwa ni batili. Hii inaipa seva chaguzi tatu:

- Kuchakata muamala wa kulazimishwa, kutoa uthibitisho wa maarifa-sifuri kwamba umechakatwa na heshi ya hali mpya.
- Kukataa muamala wa kulazimishwa, na kutoa uthibitisho wa maarifa-sifuri kwa mkataba kwamba muamala ni batili (anwani isiyojulikana, nonsi mbaya, au salio lisilotosha).
- Kupuuza muamala wa kulazimishwa. Hakuna njia ya kulazimisha seva kuchakata muamala, lakini inamaanisha mfumo mzima haupatikani.

#### Dhamana za upatikanaji {#avail-bonds}

Katika utekelezaji wa maisha halisi, labda kungekuwa na aina fulani ya nia ya faida kwa kuweka seva inafanya kazi. Tunaweza kuimarisha kichocheo hiki kwa kuwa na seva kuweka dhamana ya upatikanaji ambayo mtu yeyote anaweza kuiteketeza ikiwa muamala wa kulazimishwa hautachakatwa ndani ya kipindi fulani.

### Msimbo mbaya wa Noir {#bad-noir-code}

Kwa kawaida, ili kuwafanya watu waamini mkataba mahiri tunapakia msimbo wa chanzo kwenye [kichunguzi cha bloku](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Hata hivyo, katika kesi ya uthibitisho wa maarifa-sifuri, hiyo haitoshi.

`Verifier.sol` ina ufunguo wa uhakiki, ambao ni kazi ya programu ya Noir. Hata hivyo, ufunguo huo hautuambii programu ya Noir ilikuwa nini. Ili kuwa na suluhisho linaloaminika, unahitaji kupakia programu ya Noir (na toleo lililoiunda). Vinginevyo, uthibitisho wa maarifa-sifuri unaweza kuonyesha programu tofauti, yenye mlango wa nyuma.

Hadi vichunguzi vya bloku vianze kuturuhusu kupakia na kuhakiki programu za Noir, unapaswa kufanya hivyo mwenyewe (ikiwezekana kwa [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Kisha watumiaji mahiri wataweza kupakua msimbo wa chanzo, kuukusanya wenyewe, kuunda `Verifier.sol`, na kuhakiki kwamba inafanana na ile iliyo mnyororoni.

## Hitimisho {#conclusion}

Programu za aina ya Plasma zinahitaji kijenzi kilichowekwa kati kama hifadhi ya taarifa. Hili hufungua uwezekano wa udhaifu lakini, kwa malipo, huturuhusu kuhifadhi faragha kwa njia ambazo hazipatikani kwenye mnyororo wa vitalu wenyewe. Kwa uthibitisho wa maarifa-sifuri tunaweza kuhakikisha uadilifu na ikiwezekana kuifanya iwe na faida kiuchumi kwa yeyote anayeendesha kijenzi kilichowekwa kati kudumisha upatikanaji.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).

## Shukrani {#acknowledgements}

- Josh Crites alisoma rasimu ya makala haya na kunisaidia na suala gumu la Noir.

Makosa yoyote yaliyosalia ni jukumu langu.
