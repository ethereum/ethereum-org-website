---
title: Andika Njozi maalum ya programu ambayo inahifadhi faragha
description: Katika mafunzo haya, tunaunda benki ya nusu-siri kwa ajili ya amana. Benki ni sehemu ya kati; inajua salio la kila mtumiaji. Hata hivyo, taarifa hii haihifadhiwi kwenye mnyororo. Badala yake, benki hutuma hashi ya hali. Kila mara muamala unapofanyika, benki hutuma hashi mpya, pamoja na uthibitisho wa zero-knowledge kwamba ina muamala uliosainiwa ambao hubadilisha hali ya hashi kuwa mpya. Baada ya kusoma mafunzo haya, utaelewa sio tu jinsi ya kutumia ithibati za zero-knowledge, lakini pia kwa nini unazitumia na jinsi ya kufanya hivyo kwa usalama.
author: Ori Pomerantz
tags: [ "zero-knowledge", "seva", "offchain", "faragha" ]
skill: advanced
lang: sw
published: 2025-10-15
---

## Utangulizi {#introduction}

Tofauti na [unda-mpya](/developers/docs/scaling/zk-rollups/), [njozi](/developers/docs/scaling/plasma) hutumia Mtandao Mkuu wa Ethereum kwa uadilifu, lakini si upatikanaji. Katika makala haya, tunaandika programu inayofanya kazi kama njozi, huku Ethereum ikihakikisha uadilifu (hakuna mabadiliko yasiyoidhinishwa) lakini si upatikanaji (sehemu ya kati inaweza kushuka na kuzima mfumo mzima).

Programu tunayoandika hapa ni benki inayohifadhi faragha. Anwani tofauti zina akaunti zenye salio, na zinaweza kutuma pesa (ETH) kwa akaunti zingine. Benki hutuma hashi za hali (akaunti na salio zake) na miamala, lakini huweka salio halisi nje ya mnyororo ambapo zinaweza kubaki za faragha.

## Ubunifu {#design}

Huu si mfumo ulio tayari kwa uzalishaji, bali ni zana ya kufundishia. Kwa hivyo, imeandikwa kwa mawazo kadhaa ya kurahisisha.

- Dimbwi la akaunti zisizobadilika. Kuna idadi maalum ya akaunti, na kila akaunti ni ya anwani iliyoamuliwa mapema. Hii hufanya mfumo kuwa rahisi zaidi kwa sababu ni vigumu kushughulikia miundo ya data ya ukubwa tofauti katika ithibati za zero-knowledge. Kwa mfumo ulio tayari kwa uzalishaji, tunaweza kutumia [mzizi wa Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) kama hashi ya hali na kutoa ithibati za Merkle kwa salio zinazohitajika.

- Hifadhi ya kumbukumbu. Kwenye mfumo wa uzalishaji, tunahitaji kuandika salio zote za akaunti kwenye diski ili kuzihifadhi iwapo kutakuwa na uanzishaji upya. Hapa, ni sawa ikiwa habari itapotea tu.

- Uhamisho pekee. Mfumo wa uzalishaji utahitaji njia ya kuweka mali kwenye benki na kuzitoa. Lakini madhumuni hapa ni kuonyesha tu dhana, kwa hivyo benki hii imepunguzwa kwa uhamisho.

### Ithibati za zero-knowledge {#zero-knowledge-proofs}

Katika kiwango cha msingi, uthibitisho wa zero-knowledge unaonyesha kwamba mthibitishaji anajua data fulani, _Data<sub>private</sub>_ kiasi kwamba kuna uhusiano _Relationship_ kati ya data fulani ya umma, _Data<sub>public</sub>_, na _Data<sub>private</sub>_. Mthibitishaji anajua _Uhusiano_ na _Data<sub>umma</sub>_.

Ili kuhifadhi faragha, tunahitaji hali na miamala iwe ya faragha. Lakini ili kuhakikisha uadilifu, tunahitaji [hashi ya kriptografia](https://en.wikipedia.org/wiki/Cryptographic_hash_function) ya hali iwe ya umma. Ili kuthibitisha kwa watu wanaowasilisha miamala kwamba miamala hiyo ilifanyika kweli, tunahitaji pia kuchapisha hashi za miamala.

Katika hali nyingi, _Data<sub>private</sub>_ ni ingizo kwa programu ya uthibitisho wa zero-knowledge, na _Data<sub>public</sub>_ ni tokeo.

Sehemu hizi katika _Data<sub>private</sub>_:

- _Hali<sub>n</sub>_, hali ya zamani
- _Hali<sub>n+1</sub>_, hali mpya
- _Muamala_, muamala unaobadilika kutoka hali ya zamani hadi hali mpya. Muamala huu unahitaji kujumuisha sehemu hizi:
  - _Anwani lengwa_ inayopokea uhamisho
  - _Kiasi_ kinachohamishwa
  - _Nonce_ ili kuhakikisha kila muamala unaweza kuchakatwa mara moja tu.
    Anwani ya chanzo haihitaji kuwa katika muamala, kwa sababu inaweza kupatikana kutoka kwa saini.
- _Sahihi_, sahihi iliyoidhinishwa kutekeleza muamala. Katika kesi yetu, anwani pekee iliyoidhinishwa kutekeleza muamala ni anwani ya chanzo. Kwa sababu mfumo wetu wa zero-knowledge hufanya kazi jinsi unavyofanya, tunahitaji pia ufunguo wa umma wa akaunti, pamoja na saini ya Ethereum.

Hizi ni sehemu katika _Data<sub>public</sub>_:

- _Hashi(Hali<sub>n</sub>)_ hashi ya hali ya zamani
- _Hashi(Hali<sub>n+1</sub>)_ hashi ya hali mpya
- _Hashi(Muamala)_ hashi ya muamala unaobadilisha hali kutoka _Hali<sub>n</sub>_ hadi _Hali<sub>n+1</sub>_.

Uhusiano huangalia hali kadhaa:

- Hashi za umma ni hashi sahihi za sehemu za faragha.
- Muamala, unapotumika kwa hali ya zamani, husababisha hali mpya.
- Sahihi hutoka kwa anwani chanzo ya muamala.

Kwa sababu ya sifa za vipengele vya hashi ya kriptografia, kuthibitisha masharti haya kunatosha kuhakikisha uadilifu.

### Miundo ya data {#data-structures}

Muundo mkuu wa data ni hali inayoshikiliwa na seva. Kwa kila akaunti, seva hufuatilia salio la akaunti na [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), inayotumika kuzuia [mashambulizi ya kurudia](https://en.wikipedia.org/wiki/Replay_attack).

### Vipengele {#components}

Mfumo huu unahitaji vipengele viwili:

- _Seva_ inayopokea miamala, kuichakata, na kuchapisha hashi kwenye mnyororo pamoja na ithibati za zero-knowledge.
- _Mkataba-erevu_ unaohifadhi hashi na kuthibitisha ithibati za zero-knowledge ili kuhakikisha mabadiliko ya hali ni halali.

### Mtiririko wa data na udhibiti {#flows}

Hizi ni njia ambazo vipengele mbalimbali huwasiliana ili kuhamisha kutoka akaunti moja hadi nyingine.

1. Kivinjari cha wavuti huwasilisha muamala uliosainiwa unaoomba uhamisho kutoka kwa akaunti ya mtia sahihi hadi akaunti tofauti.

2. Seva inathibitisha kuwa muamala ni halali:

   - Mtia sahihi ana akaunti katika benki yenye salio la kutosha.
   - Mpokeaji ana akaunti katika benki.

3. Seva hukokotoa hali mpya kwa kutoa kiasi kilichohamishwa kutoka kwa salio la mtia sahihi na kukiongeza kwenye salio la mpokeaji.

4. Seva hukokotoa uthibitisho wa zero-knowledge kwamba mabadiliko ya hali ni halali.

5. Seva huwasilisha muamala kwa Ethereum unaojumuisha:

   - Hashi mpya ya hali
   - Hashi ya muamala (ili mtumaji wa muamala aweze kujua kuwa imechakatwa)
   - Uthibitisho wa zero-knowledge unaothibitisha mpito kwa hali mpya ni halali

6. Mkataba-erevu huthibitisha uthibitisho wa zero-knowledge.

7. Ikiwa uthibitisho wa zero-knowledge umekubaliwa, mkataba-erevu hufanya vitendo hivi:
   - Sasisha hashi ya hali ya sasa hadi hashi mpya ya hali
   - Toa ingizo la kumbukumbu na hashi mpya ya hali na hashi ya muamala

### Zana {#tools}

Kwa msimbo wa upande wa mteja, tutatumia [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/), na [Wagmi](https://wagmi.sh/). Hizi ni zana za kawaida za tasnia; ikiwa huzifahamu, unaweza kutumia [mafunzo haya](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Sehemu kubwa ya seva imeandikwa kwa JavaScript kwa kutumia [Nodi](https://nodejs.org/en). Sehemu ya zero-knowledge imeandikwa katika [Noir](https://noir-lang.org/). Tunahitaji toleo la `1.0.0-beta.10`, kwa hivyo baada ya [kusakinisha Noir kama ilivyoelekezwa](https://noir-lang.org/docs/getting_started/quick_start), endesha:

```
noirup -v 1.0.0-beta.10
```

Mnyororo wa bloku tunaotumia ni `anvil`, mnyororo wa bloku wa majaribio wa ndani ambao ni sehemu ya [Foundry](https://getfoundry.sh/introduction/installation).

## Utekelezaji {#implementation}

Kwa sababu huu ni mfumo changamano, tutautekeleza kwa hatua.

### Hatua ya 1 - Zero knowledge ya mikono {#stage-1}

Kwa hatua ya kwanza, tutasaini muamala katika kivinjari na kisha kutoa habari kwa mikono kwa uthibitisho wa zero-knowledge. Msimbo wa zero-knowledge unatarajia kupata taarifa hiyo katika `server/noir/Prover.toml` (imeandikwa [hapa](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Ili kuiona ikifanya kazi:

1. Hakikisha umesakinisha [Nodi](https://nodejs.org/en/download) na [Noir](https://noir-lang.org/install). Ikiwezekana, zisakishe kwenye mfumo wa UNIX kama vile macOS, Linux, au [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Pakua msimbo wa hatua ya 1 na uanze seva ya wavuti ili kuhudumia msimbo wa mteja.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Sababu unahitaji seva ya wavuti hapa ni kwamba, ili kuzuia aina fulani za ulaghai, mikoba mingi (kama vile MetaMask) haikubali faili zinazotolewa moja kwa moja kutoka kwenye diski

3. Fungua kivinjari na mkoba.

4. Katika mkoba, weka nenosiri jipya. Kumbuka kuwa hii itafuta nenosiri lako lililopo, kwa hivyo _hakikisha una nakala rudufu_.

   Nenosiri ni `test test test test test test test test test test test junk`, nenosiri chaguo-msingi la majaribio la anvil.

5. Vinjari [msimbo wa upande wa mteja](http://localhost:5173/).

6. Unganisha kwenye mkoba na uchague akaunti yako lengwa na kiasi.

7. Bofya **Saini** na utie sahihi kwenye muamala.

8. Chini ya kichwa cha **Prover.toml**, utapata maandishi. Badilisha `server/noir/Prover.toml` na maandishi hayo.

9. Tekeleza uthibitisho wa zero-knowledge.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Tokeo linapaswa kuwa sawa na

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Linganisha thamani mbili za mwisho na hashi unayoona kwenye kivinjari cha wavuti ili kuona ikiwa ujumbe umehashiwa ipasavyo.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Faili hii](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) inaonyesha umbizo la maelezo linalotarajiwa na Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Ujumbe uko katika umbizo la maandishi, ambalo hurahisisha mtumiaji kuelewa (jambo ambalo ni muhimu wakati wa kusaini) na kwa msimbo wa Noir kuchanganua. Kiasi hicho kimetajwa katika finneys ili kuwezesha uhamisho wa sehemu kwa upande mmoja, na kusomeka kwa urahisi kwa upande mwingine. Nambari ya mwisho ni [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

Kamba ina urefu wa herufi 100. Ithibati za zero-knowledge hazishughulikii vizuri data ya ukubwa unaobadilika, kwa hivyo mara nyingi ni muhimu kuongeza data.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Vigezo hivi vitatu ni safu za baiti za ukubwa usiobadilika.

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

Hii ndiyo njia ya kubainisha safu ya miundo. Kwa kila ingizo, tunabainisha anwani, salio (katika milliETH a.k.a. [finney](https://cryptovalleyjournal.com/glossary/finney/)), na thamani inayofuata ya nonce.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Faili hii](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) hutekeleza uchakataji wa upande wa mteja na kutoa faili ya `server/noir/Prover.toml` (ile inayojumuisha vigezo vya zero-knowledge).

Hapa kuna maelezo ya sehemu za kuvutia zaidi.

```tsx
export default attrs =>  {
```

Kazi hii huunda kijenzi cha React cha `Transfer`, ambacho faili zingine zinaweza kuagiza.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Hizi ni anwani za akaunti, anwani zilizoundwa na `test ... test junk` passphrase. Ikiwa unataka kutumia anwani zako mwenyewe, rekebisha tu ufafanuzi huu.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

[Kulabu hizi za Wagmi](https://wagmi.sh/react/api/hooks) hutuwezesha kufikia maktaba ya [viem](https://viem.sh/) na mkoba.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Huu ni ujumbe, uliowekwa nafasi. Kila wakati moja ya vigezo vya [`useState`](https://react.dev/reference/react/useState) inapobadilika, kijenzi huchorwa upya na `message` husasishwa.

```tsx
  const sign = async () => {
```

Kazi hii inaitwa mtumiaji anapobofya kitufe cha **Saini**. Ujumbe husasishwa kiotomatiki, lakini saini inahitaji idhini ya mtumiaji katika mkoba, na hatutaki kuiomba isipokuwa inahitajika.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Uliza mkoba [kusaini ujumbe](https://viem.sh/docs/accounts/local/signMessage).

```tsx
    const hash = hashMessage(message)
```

Pata hashi ya ujumbe. Inasaidia kumpa mtumiaji kwa ajili ya utatuzi (wa msimbo wa Noir).

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

Weka vigezo vya hali. Kufanya hivi huchora upya kijenzi (baada ya kazi ya `sign` kuondoka) na huonyesha mtumiaji thamani zilizosasishwa.

```tsx
    let proverToml = `
```

Maandishi ya `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem inatupatia ufunguo wa umma kama kamba ya heksadesimali ya baiti 65. Baiti ya kwanza ni `0x04`, alama ya toleo. Hii inafuatiwa na baiti 32 za `x` ya ufunguo wa umma na kisha baiti 32 za `y` ya ufunguo wa umma.

Hata hivyo, Noir inatarajia kupata taarifa hii kama safu mbili za baiti, moja kwa `x` na moja kwa `y`. Ni rahisi zaidi kuichanganua hapa kwa mteja kuliko kama sehemu ya uthibitisho wa zero-knowledge.

Kumbuka kuwa hii ni mazoezi mazuri katika zero-knowledge kwa ujumla. Msimbo ndani ya uthibitisho wa zero-knowledge ni ghali, kwa hivyo uchakataji wowote unaoweza kufanywa nje ya uthibitisho wa zero-knowledge _unapaswa_ kufanywa nje ya uthibitisho wa zero-knowledge.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

Sahihi pia hutolewa kama kamba ya heksadesimali ya baiti 65. Hata hivyo, baiti ya mwisho ni muhimu tu ili kupata ufunguo wa umma. Kwa kuwa ufunguo wa umma utakuwa tayari umetolewa kwa msimbo wa Noir, hatuitaji ili kuthibitisha saini, na msimbo wa Noir hauihitaji.

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
        <h2>Uhamisho</h2>
```

Hii ni umbizo la HTML (kwa usahihi zaidi, [JSX](https://react.dev/learn/writing-markup-with-jsx)) la kijenzi.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Faili hii](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) ni msimbo halisi wa zero-knowledge.

```
use std::hash::pedersen_hash;
```

[Hashi ya Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) hutolewa na [maktaba ya kawaida ya Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Ithibati za zero-knowledge mara nyingi hutumia kipengele hiki cha hashi. Ni rahisi zaidi kukokotoa ndani ya [mizunguko ya hesabu](https://rareskills.io/post/arithmetic-circuit) ikilinganishwa na vipengele vya kawaida vya hashi.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Kazi hizi mbili ni maktaba za nje, zilizofafanuliwa katika [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Ni hasa kile wanachoitwa, kazi ambayo inakokotoa [hashi ya keccak256](https://emn178.github.io/online-tools/keccak_256.html) na kazi ambayo inathibitisha saini za Ethereum na kurejesha anwani ya Ethereum ya mtia saini.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir imechochewa na [Rust](https://www.rust-lang.org/). Vigezo, kwa chaguo-msingi, ni vidumu. Hivi ndivyo tunavyofafanua vidumu vya usanidi wa kimataifa. Hasa, `ACCOUNT_NUMBER` ni idadi ya akaunti tunazohifadhi.

Aina za data zilizoitwa `u<number>` ni idadi hiyo ya biti, zisizo na saini. Aina pekee zinazotumika ni `u8`, `u16`, `u32`, `u64`, na `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Kigezo hiki kinatumika kwa hashi ya Pedersen ya akaunti, kama ilivyoelezwa hapo chini.

```
global MESSAGE_LENGTH : u32 = 100;
```

Kama ilivyoelezwa hapo juu, urefu wa ujumbe umewekwa. Imebainishwa hapa.

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

Taarifa tunayohifadhi kuhusu akaunti. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) ni nambari, kwa kawaida hadi biti 253, ambayo inaweza kutumika moja kwa moja katika [mzunguko wa hesabu](https://rareskills.io/post/arithmetic-circuit) unaotekeleza uthibitisho wa zero-knowledge. Hapa tunatumia `Field` kuhifadhi anwani ya Ethereum ya biti 160.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Taarifa tunayohifadhi kwa muamala wa uhamisho.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Ufafanuzi wa kazi. Kigezo ni habari ya `Account`. Matokeo ni safu ya vigezo vya `Field`, ambavyo urefu wake ni `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Thamani ya kwanza katika safu ni anwani ya akaunti. Ya pili inajumuisha salio na nonce. Miito ya `.into()` hubadilisha nambari kuwa aina ya data inayohitajika. `account.nonce` ni thamani ya `u32`, lakini ili kuiongeza kwa `account.balance << 32`, thamani ya `u128`, inahitaji kuwa `u128`. Hiyo ndiyo `.into()` ya kwanza. Ya pili inabadilisha matokeo ya `u128` kuwa `Sehemu` ili itoshee kwenye safu.

```
    flat
}
```

Katika Noir, kazi zinaweza kurudisha thamani mwishoni tu (hakuna kurudi mapema). Ili kubainisha thamani ya kurudi, unaitathmini kabla tu ya mabano ya kufunga ya kazi.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Kazi hii hugeuza safu ya akaunti kuwa safu ya `Sehemu`, ambayo inaweza kutumika kama ingizo kwa Hashi ya Petersen.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Hivi ndivyo unavyobainisha kigezo kinachoweza kubadilishwa, yaani, _sio_ kidumu. Vigezo katika Noir lazima viwe na thamani kila wakati, kwa hivyo tunaanzisha kigezo hiki kwa sifuri zote.

```
    for i in 0..ACCOUNT_NUMBER {
```

Hii ni kitanzi cha `for`. Kumbuka kuwa mipaka ni vidumu. Vitanzi vya Noir lazima mipaka yao ijulikane wakati wa kukusanya. Sababu ni kwamba mizunguko ya hesabu haitumii udhibiti wa mtiririko. Wakati wa kuchakata kitanzi cha `for`, mkusanyaji huweka tu msimbo ndani yake mara nyingi, moja kwa kila mzunguko.

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

Mwishowe, tumefika kwenye kazi ambayo inahashi safu ya akaunti.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Kazi hii hupata akaunti yenye anwani maalum. Kazi hii haingekuwa na ufanisi katika msimbo wa kawaida kwa sababu inarudia akaunti zote, hata baada ya kupata anwani.

Hata hivyo, katika ithibati za zero-knowledge, hakuna udhibiti wa mtiririko. Ikiwa tutahitaji kuangalia hali, lazima tuiangalie kila wakati.

Jambo kama hilo hufanyika kwa taarifa za `if`. Taarifa ya `if` katika kitanzi hapo juu inatafsiriwa kuwa taarifa hizi za hisabati.

_condition<sub>result</sub> = accounts[i].address == address_ // moja ikiwa ni sawa, sifuri vinginevyo

_account<sub>new</sub> = condition<sub>result</sub>\*i + (1-condition<sub>result</sub>)\*account<sub>old</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

Kazi ya [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) husababisha uthibitisho wa zero-knowledge kuharibika ikiwa madai ni ya uongo. Katika kesi hii, ikiwa hatuwezi kupata akaunti yenye anwani husika. Ili kuripoti anwani, tunatumia [kamba ya umbizo](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Kazi hii hutumia muamala wa uhamisho na kurudisha safu mpya ya akaunti.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Hatuwezi kufikia vipengele vya muundo ndani ya kamba ya umbizo katika Noir, kwa hivyo tunaunda nakala inayoweza kutumika.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

Hizi ni hali mbili ambazo zinaweza kufanya muamala kuwa batili.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Unda safu mpya ya akaunti na kisha uirudishe.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Kazi hii inasoma anwani kutoka kwa ujumbe.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Anwani daima ni baiti 20 (a.k.a. Tarakimu 40 za heksadesimali) kwa urefu, na huanza kwa herufi #7.

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

Soma kiasi na nonce kutoka kwa ujumbe.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Katika ujumbe, nambari ya kwanza baada ya anwani ni kiasi cha finney (a.k.a. elfu ya ETH) ya kuhamisha. Nambari ya pili ni nonce. Maandishi yoyote kati yao yanapuuzwa.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
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

Kurudisha [tuple](https://noir-lang.org/docs/noir/concepts/data_types/tuples) ni njia ya Noir ya kurudisha thamani nyingi kutoka kwa kazi.

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

Kazi hii hubadilisha ujumbe kuwa baiti, kisha hubadilisha kiasi kuwa `TransferTxn`.

```rust
// The equivalent to Viem's hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Tuliweza kutumia Hashi ya Pedersen kwa akaunti kwa sababu zimehashiwa tu ndani ya uthibitisho wa zero-knowledge. Hata hivyo, katika msimbo huu tunahitaji kuangalia saini ya ujumbe, ambayo hutolewa na kivinjari. Kwa hilo, tunahitaji kufuata umbizo la kusaini la Ethereum katika [EIP 191](https://eips.ethereum.org/EIPS/eip-191). Hii ina maana tunahitaji kuunda bafa iliyounganishwa yenye kiambishi awali cha kawaida, urefu wa ujumbe katika ASCII, na ujumbe wenyewe, na kutumia keccak256 ya kawaida ya Ethereum kuihashi.

```rust
    // ASCII prefix
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

Ili kuepuka hali ambapo programu inamwomba mtumiaji kusaini ujumbe ambao unaweza kutumika kama muamala au kwa madhumuni mengine, EIP 191 inabainisha kuwa ujumbe wote uliosainiwa huanza na herufi 0x19 (sio herufi halali ya ASCII) ikifuatiwa na `Ethereum Signed Message:` na mstari mpya.

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

Shughulikia urefu wa ujumbe hadi 999 na ushindwe ikiwa ni mkubwa zaidi. Niliongeza msimbo huu, ingawa urefu wa ujumbe ni wa kudumu, kwa sababu inafanya iwe rahisi kuubadilisha. Kwenye mfumo wa uzalishaji, labda ungechukulia tu `MESSAGE_LENGTH` haibadiliki kwa ajili ya utendaji bora.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Tumia kazi ya kawaida ya Ethereum `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

Kazi hii inathibitisha saini, ambayo inahitaji hashi ya ujumbe. Kisha inatupatia anwani iliyoisaini na hashi ya ujumbe. Hashi ya ujumbe hutolewa katika thamani mbili za `Sehemu` kwa sababu hizo ni rahisi kutumia katika programu iliyobaki kuliko safu ya baiti.

Tunahitaji kutumia thamani mbili za `Sehemu` kwa sababu hesabu za sehemu hufanywa [modulo](https://en.wikipedia.org/wiki/Modulo) nambari kubwa, lakini nambari hiyo kwa kawaida ni chini ya biti 256 (vinginevyo ingekuwa vigumu kufanya hesabu hizo katika EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Bainisha `hash1` na `hash2` kama vigezo vinavyoweza kubadilishwa, na andika hashi ndani yao baiti kwa baiti.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

Hii ni sawa na [`ecrecover` ya Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), na tofauti mbili muhimu:

- Ikiwa saini si halali, simu inashindwa `kudai` na programu inasitishwa.
- Ingawa ufunguo wa umma unaweza kupatikana kutoka kwa saini na hashi, huu ni uchakataji unaoweza kufanywa nje na, kwa hivyo, haifai kufanya ndani ya uthibitisho wa zero-knowledge. Mtu akijaribu kutudanganya hapa, uthibitishaji wa saini utashindwa.

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
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

Mwishowe, tunafikia kazi ya `main`. Tunahitaji kuthibitisha kwamba tuna muamala unaobadilisha kihalali hashi ya akaunti kutoka thamani ya zamani hadi mpya. Tunahitaji pia kuthibitisha kwamba ina hashi hii maalum ya muamala ili mtu aliyeituma ajue muamala wake umeshachakatwa.

```rust
{
    let mut txn = readTransferTxn(message);
```

Tunahitaji `txn` iweze kubadilika kwa sababu hatusomi anwani ya kutoka kwenye ujumbe, tunaisoma kutoka kwenye saini.

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

Katika hatua ya pili, tunaongeza seva inayopokea na kutekeleza miamala ya uhamisho kutoka kwa kivinjari.

Ili kuiona ikifanya kazi:

1. Simamisha Vite ikiwa inaendeshwa.

2. Pakua tawi linalojumuisha seva na uhakikishe una moduli zote muhimu.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Hakuna haja ya kukusanya msimbo wa Noir, ni msimbo uleule uliotumia kwa hatua ya 1.

3. Anzisha seva.

   ```sh
   npm run start
   ```

4. Katika dirisha tofauti la mstari wa amri, endesha Vite ili kuhudumia msimbo wa kivinjari.

   ```sh
   cd client
   npm run dev
   ```

5. Vinjari msimbo wa mteja kwenye [http://localhost:5173](http://localhost:5173)

6. Kabla ya kutoa muamala, unahitaji kujua nonce, pamoja na kiasi unachoweza kutuma. Ili kupata habari hii, bofya **Sasisha data ya akaunti** na utie sahihi kwenye ujumbe.

   Tuna mtanziko hapa. Kwa upande mmoja, hatutaki kusaini ujumbe unaoweza kutumiwa tena ([shambulio la kurudia](https://en.wikipedia.org/wiki/Replay_attack)), ndiyo sababu tunataka nonce kwanza. Hata hivyo, bado hatuna nonce. Suluhisho ni kuchagua nonce ambayo inaweza kutumika mara moja tu na ambayo tayari tunayo pande zote mbili, kama vile wakati wa sasa.

   Tatizo na suluhisho hili ni kwamba wakati huenda usisawazishwe kikamilifu. Kwa hivyo badala yake, tunasaini thamani inayobadilika kila dakika. Hii inamaanisha kuwa dirisha letu la hatari kwa mashambulizi ya kurudia ni dakika moja tu. Kwa kuzingatia kwamba katika uzalishaji ombi lililosainiwa litalindwa na TLS, na kwamba upande mwingine wa handaki---seva---inaweza tayari kufichua salio na nonce (inabidi iwajue ili kufanya kazi), hii ni hatari inayokubalika.

7. Mara kivinjari kinapopata salio na nonce, kinaonyesha fomu ya uhamisho. Chagua anwani lengwa na kiasi na ubofye **Hamisha**. Saini ombi hili.

8. Ili kuona uhamisho, ama **Sasisha data ya akaunti** au angalia kwenye dirisha ambapo unaendesha seva. Seva huweka kumbukumbu ya hali kila inapobadilika.

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

[Faili hii](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) ina mchakato wa seva, na inaingiliana na msimbo wa Noir kwenye [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Hapa kuna maelezo ya sehemu za kuvutia.

```js
import { Noir } from '@noir-lang/noir_js'
```

Maktaba ya [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) inaunganisha kati ya msimbo wa JavaScript na msimbo wa Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Pakia mzunguko wa hesabu---programu ya Noir iliyokusanywa tuliyoiumba katika hatua ya awali---na andaa kuitekeleza.

```js
// We only provide account information in return to a signed request
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Ili kutoa maelezo ya akaunti, tunahitaji tu saini. Sababu ni kwamba tayari tunajua ujumbe utakuwa nini, na kwa hiyo hashi ya ujumbe.

```js
const processMessage = async (message, signature) => {
```

Chakata ujumbe na utekeleze muamala unaouweka.

```js
    // Get the public key
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Sasa kwa kuwa tunaendesha JavaScript kwenye seva, tunaweza kupata ufunguo wa umma hapo badala ya kwa mteja.

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

`noir.execute` huendesha programu ya Noir. Vigezo ni sawa na vile vilivyotolewa katika [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Kumbuka kuwa thamani ndefu hutolewa kama safu ya kamba za heksadesimali (`["0x60", "0xA7"]`), sio kama thamani moja ya heksadesimali (`0x60A7`), jinsi Viem inavyofanya.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Ikiwa kuna hitilafu, ikamate na kisha upeleke toleo lililorahisishwa kwa mteja.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Tekeleza muamala. Tayari tulifanya hivyo katika msimbo wa Noir, lakini ni rahisi kuifanya tena hapa badala ya kutoa matokeo kutoka hapo.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Muundo wa awali wa `Akaunti`.

### Hatua ya 3 - Mikataba-erevu ya Ethereum {#stage-3}

1. Simamisha michakato ya seva na mteja.

2. Pakua tawi lenye mikataba-erevu na uhakikishe una moduli zote muhimu.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Endesha `anvil` katika dirisha tofauti la mstari wa amri.

4. Tengeneza ufunguo wa uthibitishaji na kithibitishaji cha solidity, kisha nakili msimbo wa kithibitishaji kwenye mradi wa Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Nenda kwenye mikataba-erevu na weka vigezo vya mazingira ili kutumia mnyororo wa bloku wa `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Pakia `Verifier.sol` na uhifadhi anwani katika kigezo cha mazingira.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Pakia mkataba wa `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   Thamani ya `0x199..67b` ni hashi ya Pederson ya hali ya awali ya `Accounts`. Ukirekebisha hali hii ya awali katika `server/index.mjs`, unaweza kuendesha muamala ili kuona hashi ya awali iliyoripotiwa na uthibitisho wa zero-knowledge.

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

10. Endesha miamala kadhaa.

11. Ili kuthibitisha kuwa hali imebadilika kwenye mnyororo, anzisha upya mchakato wa seva. Angalia kuwa `ZkBank` haikubali tena miamala, kwa sababu thamani ya asili ya hashi katika miamala inatofautiana na thamani ya hashi iliyohifadhiwa kwenye mnyororo.

    Hili ni aina ya hitilafu inayotarajiwa.

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

Mabadiliko katika faili hili yanahusiana zaidi na kuunda uthibitisho halisi na kuiwasilisha kwenye mnyororo.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Tunahitaji kutumia [kifurushi cha Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) ili kuunda uthibitisho halisi wa kutuma kwenye mnyororo. Tunaweza kutumia kifurushi hiki ama kwa kuendesha kiolesura cha mstari wa amri (`bb`) au kwa kutumia [maktaba ya JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). Maktaba ya JavaScript ni polepole zaidi kuliko kuendesha msimbo asilia, kwa hivyo tunatumia [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) hapa kutumia mstari wa amri.

Kumbuka kwamba ukiamua kutumia `bb.js`, unahitaji kutumia toleo linaloendana na toleo la Noir unalotumia. Wakati wa kuandika, toleo la sasa la Noir (1.0.0-beta.11) linatumia toleo la `bb.js` 0.87.

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

Ufunguo huu wa faragha ni mojawapo ya akaunti chaguo-msingi zilizofadhiliwa awali katika `anvil`.

```js
const generateProof = async (witness, fileID) => {
```

Tengeneza uthibitisho kwa kutumia `bb` inayoweza kutekelezwa.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Andika shahidi kwenye faili.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Unda uthibitisho halisi. Hatua hii pia huunda faili na vigezo vya umma, lakini hatuhitaji hiyo. Tayari tulipata vigezo hivyo kutoka kwa `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Uthibitisho ni safu ya JSON ya thamani za `Sehemu`, kila moja ikiwakilishwa na thamani ya heksadesimali. Hata hivyo, tunahitaji kuituma katika muamala kama thamani moja ya `baiti`, ambayo Viem inaiwakilisha kwa kamba kubwa ya heksadesimali. Hapa tunabadilisha umbizo kwa kuunganisha thamani zote, kuondoa `0x` zote, na kisha kuongeza moja mwishoni.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Safisha na urudishe uthibitisho.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Sehemu za umma zinahitaji kuwa safu ya thamani za baiti 32. Hata hivyo, kwa kuwa tulihitaji kugawanya hashi ya muamala kati ya thamani mbili za `Sehemu`, inaonekana kama thamani ya baiti 16. Hapa tunaongeza sifuri ili Viem ielewe kuwa ni baiti 32 kweli.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Kila anwani hutumia kila nonce mara moja tu ili tuweze kutumia mchanganyiko wa `fromAddress` na `nonce` kama kitambulisho cha kipekee kwa faili ya shahidi na saraka ya tokeo.

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

Huu ni msimbo wa kwenye mnyororo unaopokea muamala.

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

Msimbo wa kwenye mnyororo unahitaji kufuatilia vigezo viwili: kithibitishaji (mkataba tofauti ulioundwa na `nargo`) na hashi ya hali ya sasa.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Kila hali inapobadilika, tunatoa tukio la `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Kazi hii inachakata miamala. Inapata uthibitisho (kama `baiti`) na pembejeo za umma (kama safu ya `bytes32`), katika umbizo ambalo kithibitishaji kinahitaji (ili kupunguza uchakataji wa kwenye mnyororo na hivyo gharama za gesi).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

Uthibitisho wa zero-knowledge unahitaji kuwa muamala unabadilika kutoka kwa hashi yetu ya sasa hadi mpya.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Ita mkataba wa kithibitishaji ili kuthibitisha uthibitisho wa zero-knowledge. Hatua hii inarudisha nyuma muamala ikiwa uthibitisho wa zero-knowledge si sahihi.

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

Ikiwa kila kitu kiko sawa, sasisha hashi ya hali kwa thamani mpya na utoe tukio la `TransactionProcessed`.

## Matumizi mabaya na sehemu ya kati {#abuses}

Usalama wa habari una sifa tatu:

- _Usiri_, watumiaji hawawezi kusoma habari wasizoruhusiwa kusoma.
- _Uadilifu_, habari haiwezi kubadilishwa isipokuwa na watumiaji walioidhinishwa kwa njia iliyoidhinishwa.
- _Upatikanaji_, watumiaji walioidhinishwa wanaweza kutumia mfumo.

Kwenye mfumo huu, uadilifu hutolewa kupitia ithibati za zero-knowledge. Upatikanaji ni vigumu zaidi kuhakikisha, na usiri hauwezekani, kwa sababu benki inapaswa kujua salio la kila akaunti na miamala yote. Hakuna njia ya kuzuia chombo ambacho kina habari kushiriki habari hiyo.

Inaweza kuwezekana kuunda benki ya siri kweli kwa kutumia [anwani za siri](https://vitalik.eth.limo/general/2023/01/20/stealth.html), lakini hilo liko nje ya upeo wa makala haya.

### Taarifa za uongo {#false-info}

Njia moja ambayo seva inaweza kukiuka uadilifu ni kutoa habari za uongo wakati [data inapoombwa](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Ili kutatua hili, tunaweza kuandika programu ya pili ya Noir inayopokea akaunti kama pembejeo la faragha na anwani ambayo habari inaombwa kama pembejeo la umma. Tokeo ni salio na nonce ya anwani hiyo, na hashi ya akaunti.

Bila shaka, uthibitisho huu hauwezi kuthibitishwa kwenye mnyororo, kwa sababu hatutaki kuchapisha nonces na salio kwenye mnyororo. Hata hivyo, inaweza kuthibitishwa na msimbo wa mteja unaoendeshwa kwenye kivinjari.

### Miamala ya kulazimishwa {#forced-txns}

Utaratibu wa kawaida wa kuhakikisha upatikanaji na kuzuia udhibiti kwenye L2 ni [miamala ya kulazimishwa](https://docs.optimism.io/stack/transactions/forced-transaction). Lakini miamala ya kulazimishwa haichanganyiki na ithibati za zero-knowledge. Seva ndicho chombo pekee kinachoweza kuthibitisha miamala.

Tunaweza kurekebisha `smart-contracts/src/ZkBank.sol` ili kukubali miamala ya kulazimishwa na kuzuia seva kubadilisha hali hadi itakapochakatwa. Hata hivyo, hii inatuweka wazi kwa shambulio rahisi la kunyimwa huduma. Je, ikiwa muamala wa kulazimishwa si halali na kwa hivyo hauwezekani kuchakatwa?

Suluhisho ni kuwa na uthibitisho wa zero-knowledge kwamba muamala wa kulazimishwa si halali. Hii inatoa seva chaguzi tatu:

- Chakata muamala wa kulazimishwa, ukitoa uthibitisho wa zero-knowledge kwamba umeshachakatwa na hashi mpya ya hali.
- Kataa muamala wa kulazimishwa, na utoe uthibitisho wa zero-knowledge kwa mkataba kwamba muamala si halali (anwani isiyojulikana, nonce mbaya, au salio lisilotosha).
- Puuza muamala wa kulazimishwa. Hakuna njia ya kulazimisha seva kuchakata muamala, lakini inamaanisha mfumo mzima haupatikani.

#### Dhamana za upatikanaji {#avail-bonds}

Katika utekelezaji wa maisha halisi, labda kungekuwa na aina fulani ya motisha ya faida kwa kuweka seva ikiendeshwa. Tunaweza kuimarisha motisha huu kwa kuwa na seva inayoweka dhamana ya upatikanaji ambayo mtu yeyote anaweza kuichoma ikiwa muamala wa kulazimishwa hauchakatwi ndani ya kipindi fulani.

### Msimbo mbaya wa Noir {#bad-noir-code}

Kwa kawaida, ili kuwafanya watu waamini mkataba-erevu tunapakia msimbo chanzo kwenye [kichunguzi cha bloku](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Hata hivyo, katika kesi ya ithibati za zero-knowledge, hiyo haitoshi.

`Verifier.sol` ina ufunguo wa uthibitishaji, ambao ni kazi ya programu ya Noir. Hata hivyo, ufunguo huo hautuambii programu ya Noir ilikuwa nini. Ili kuwa na suluhisho la kuaminika, unahitaji kupakia programu ya Noir (na toleo lililoiumba). Vinginevyo, ithibati za zero-knowledge zinaweza kuakisi programu tofauti, moja yenye mlango wa nyuma.

Hadi wachunguzi wa bloku waanze kuturuhusu kupakia na kuthibitisha programu za Noir, unapaswa kufanya hivyo mwenyewe (ikiwezekana kwa [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Kisha watumiaji wa hali ya juu wataweza kupakua msimbo chanzo, kuukusanya wenyewe, kuunda `Verifier.sol`, na kuthibitisha kuwa inafanana na ile iliyo kwenye mnyororo.

## Hitimisho {#conclusion}

Programu za aina ya Njozi zinahitaji sehemu ya kati kama hifadhi ya habari. Hii inafungua udhaifu unaowezekana lakini, kwa kurudi, inaturuhusu kuhifadhi faragha kwa njia zisizopatikana kwenye mnyororo wa bloku wenyewe. Kwa ithibati za zero-knowledge tunaweza kuhakikisha uadilifu na ikiwezekana kuifanya iwe na faida kiuchumi kwa yeyote anayeendesha sehemu ya kati ili kudumisha upatikanaji.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).

## Shukrani {#acknowledgements}

- Josh Crites alisoma rasimu ya makala haya na kunisaidia na suala gumu la Noir.

Makosa yoyote yaliyobaki ni jukumu langu.
