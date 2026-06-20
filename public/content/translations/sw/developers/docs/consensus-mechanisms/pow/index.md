---
title: Uthibitisho wa Kazi (PoW)
description: Maelezo ya itifaki ya mwafaka ya uthibitisho wa kazi na jukumu lake katika Ethereum.
lang: sw
---

Mtandao wa [Ethereum](/) ulianza kwa kutumia utaratibu wa makubaliano uliohusisha **[Uthibitisho wa Kazi (PoW)](/developers/docs/consensus-mechanisms/pow)**. Hii iliruhusu nodi za mtandao wa Ethereum kukubaliana juu ya hali ya taarifa zote zilizorekodiwa kwenye mnyororo wa vitalu wa Ethereum na kuzuia aina fulani za mashambulizi ya kiuchumi. Hata hivyo, Ethereum ilizima uthibitisho wa kazi mnamo 2022 na kuanza kutumia [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos) badala yake.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Uthibitisho wa kazi sasa umepitwa na wakati. Ethereum haitumii tena uthibitisho wa kazi kama sehemu ya utaratibu wake wa makubaliano. Badala yake, inatumia uthibitisho wa dau. Soma zaidi kuhusu [uthibitisho wa dau](/developers/docs/consensus-mechanisms/pos/) na [uwekaji dhamana](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Mahitaji ya Awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza kwanza usome kuhusu [miamala](/developers/docs/transactions/), [vitalu](/developers/docs/blocks/), na [taratibu za makubaliano](/developers/docs/consensus-mechanisms/).

## Uthibitisho wa Kazi (PoW) ni nini? {#what-is-pow}

Mwafaka wa Nakamoto, ambao unatumia uthibitisho wa kazi, ni utaratibu ambao uliwahi kuruhusu mtandao uliogatuliwa wa Ethereum kufikia mwafaka (yaani, nodi zote kukubaliana) juu ya mambo kama vile salio la akaunti na mpangilio wa miamala. Hii ilizuia watumiaji "kutumia mara mbili" sarafu zao na kuhakikisha kwamba mnyororo wa Ethereum ulikuwa mgumu sana kushambuliwa au kuchezewa. Sifa hizi za usalama sasa zinatokana na uthibitisho wa dau badala yake kwa kutumia utaratibu wa makubaliano unaojulikana kama [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Uthibitisho wa kazi na uchimbaji {#pow-and-mining}

Uthibitisho wa kazi ni algoriti ya msingi inayoweka ugumu na sheria za kazi wanayofanya wachimbaji kwenye minyororo ya vitalu ya uthibitisho wa kazi. Uchimbaji ndio "kazi" yenyewe. Ni kitendo cha kuongeza vitalu halali kwenye mnyororo. Hili ni muhimu kwa sababu urefu wa mnyororo husaidia mtandao kufuata mchepuo sahihi wa mnyororo wa vitalu. Kadiri "kazi" inavyofanywa zaidi, ndivyo mnyororo unavyokuwa mrefu, na kadiri nambari ya kitalu inavyokuwa kubwa, ndivyo mtandao unavyoweza kuwa na uhakika zaidi kuhusu hali ya sasa ya mambo.

[Zaidi kuhusu uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/)

## Uthibitisho wa kazi wa Ethereum ulifanyaje kazi? {#how-it-works}

Miamala ya Ethereum inachakatwa kuwa vitalu. Katika uthibitisho wa kazi wa Ethereum uliopitwa na wakati sasa, kila kitalu kilikuwa na:

- ugumu wa kitalu – kwa mfano: 3,324,092,183,262,715
- mixHash – kwa mfano: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonsi – kwa mfano: `0xd3ee432b4fb3d26b`

Data hii ya kitalu ilihusiana moja kwa moja na uthibitisho wa kazi.

### Kazi katika uthibitisho wa kazi {#the-work}

Itifaki ya uthibitisho wa kazi, Ethash, ilihitaji wachimbaji kupitia mbio kali za kujaribu na kukosea ili kupata nonsi ya kitalu. Ni vitalu tu vyenye nonsi halali ndivyo vingeweza kuongezwa kwenye mnyororo.

Wakati wa kushindana kuunda kitalu, mchimbaji aliweka mara kwa mara seti ya data, ambayo ingeweza kupatikana tu kwa kupakua na kuendesha mnyororo kamili (kama mchimbaji anavyofanya), kupitia fomula ya kihisabati. Seti ya data ilitumika kuzalisha mixHash chini ya lengo ambalo linaamriwa na ugumu wa kitalu. Njia bora ya kufanya hivi ni kupitia kujaribu na kukosea.

Ugumu uliamua lengo la heshi. Kadiri lengo linavyokuwa chini, ndivyo seti ya heshi halali inavyokuwa ndogo. Mara tu inapozalishwa, ilikuwa rahisi sana kwa wachimbaji wengine na wateja kuthibitisha. Hata kama muamala mmoja ungebadilika, heshi ingekuwa tofauti kabisa, kuashiria udanganyifu.

Uheshiji hufanya udanganyifu kuwa rahisi kuonekana. Lakini uthibitisho wa kazi kama mchakato pia ulikuwa kizuizi kikubwa cha kushambulia mnyororo.

### Uthibitisho wa kazi na usalama {#security}

Wachimbaji walipewa motisha ya kufanya kazi hii kwenye mnyororo mkuu wa Ethereum. Kulikuwa na motisha ndogo kwa kikundi kidogo cha wachimbaji kuanzisha mnyororo wao wenyewe—inadhoofisha mfumo. Minyororo ya vitalu inategemea kuwa na hali moja kama chanzo cha ukweli.

Lengo la uthibitisho wa kazi lilikuwa kurefusha mnyororo. Mnyororo mrefu zaidi uliaminika zaidi kama ule halali kwa sababu ulikuwa na kazi kubwa zaidi ya kikokotoo iliyofanywa kuuzalisha. Ndani ya mfumo wa PoW wa Ethereum, ilikuwa karibu haiwezekani kuunda vitalu vipya vinavyofuta miamala, kuunda feki, au kudumisha mnyororo wa pili. Hiyo ni kwa sababu mchimbaji mwenye nia mbaya angehitaji kila wakati kutatua nonsi ya kitalu haraka kuliko kila mtu mwingine.

Ili kuunda mara kwa mara vitalu vyenye nia mbaya lakini halali, mchimbaji mwenye nia mbaya angehitaji zaidi ya 51% ya nguvu ya uchimbaji ya mtandao ili kuwashinda wengine wote. Kiasi hicho cha "kazi" kinahitaji nguvu nyingi za gharama kubwa za kompyuta na nishati iliyotumika inaweza hata kuwa imezidi faida iliyopatikana katika shambulio.

### Uchumi wa uthibitisho wa kazi {#economics}

Uthibitisho wa kazi pia ulihusika na kutoa sarafu mpya kwenye mfumo na kuwapa motisha wachimbaji kufanya kazi hiyo.

Tangu [sasisho la Konstantinopoli](/ethereum-forks/#constantinople), wachimbaji ambao walifanikiwa kuunda kitalu walizawadiwa ETH mbili zilizotengenezwa hivi karibuni na sehemu ya ada za muamala. Vitalu vya Ommer pia vilifidia 1.75 ETH. Vitalu vya Ommer vilikuwa vitalu halali vilivyoundwa na mchimbaji karibu wakati uleule ambao mchimbaji mwingine aliunda kitalu kikuu, ambacho hatimaye kiliamuliwa na mnyororo upi ulijengwa juu yake kwanza. Vitalu vya Ommer kwa kawaida vilitokea kutokana na ucheleweshaji wa mtandao.

## Ukamilifu {#finality}

Muamala una "ukamilifu" kwenye Ethereum unapokuwa sehemu ya kitalu ambacho hakiwezi kubadilika.

Kwa sababu wachimbaji walifanya kazi kwa njia iliyogatuliwa, vitalu viwili halali vingeweza kuchimbwa kwa wakati mmoja. Hii inaunda mchepuo wa muda. Hatimaye, mmoja wa minyororo hii ukawa mnyororo uliokubaliwa baada ya vitalu vilivyofuata kuchimbwa na kuongezwa kwake, na kuufanya kuwa mrefu zaidi.

Ili kufanya mambo kuwa magumu zaidi, miamala iliyokataliwa kwenye mchepuo wa muda inaweza kuwa haikujumuishwa kwenye mnyororo uliokubaliwa. Hii inamaanisha inaweza kubadilishwa. Kwa hivyo ukamilifu unarejelea wakati unaopaswa kusubiri kabla ya kuzingatia muamala kuwa hauwezi kutenguliwa. Chini ya uthibitisho wa kazi wa awali wa Ethereum, kadiri vitalu vingi vilivyochimbwa juu ya kitalu maalum `N`, ndivyo ujasiri unavyokuwa mkubwa kwamba miamala katika `N` ilifanikiwa na isingetenguliwa. Sasa, kwa uthibitisho wa dau, ukamilishaji ni sifa ya wazi, badala ya uwezekano, ya kitalu.

## Matumizi ya nishati ya uthibitisho wa kazi {#energy}

Ukosoaji mkubwa wa uthibitisho wa kazi ni kiasi cha pato la nishati kinachohitajika kuweka mtandao salama. Ili kudumisha usalama na ugatuzi, Ethereum kwenye uthibitisho wa kazi ilitumia kiasi kikubwa cha nishati. Muda mfupi kabla ya kubadili uthibitisho wa dau, wachimbaji wa Ethereum kwa pamoja walikuwa wakitumia takriban 70 TWh/kwa mwaka (takriban sawa na Jamhuri ya Czech - kulingana na [digiconomist](https://digiconomist.net/) mnamo 18-Julai-2022).

## Faida na hasara {#pros-and-cons}

| Faida                                                                                                                                                                                                                         | Hasara                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Uthibitisho wa kazi haupendelei. Huhitaji ETH ili kuanza na zawadi za kitalu zinakuruhusu kutoka 0ETH hadi salio chanya. Kwa [uthibitisho wa dau](/developers/docs/consensus-mechanisms/pos/) unahitaji ETH ili kuanza. | Uthibitisho wa kazi unatumia nishati nyingi sana kiasi kwamba ni mbaya kwa mazingira.                                                                      |
| Uthibitisho wa kazi ni utaratibu wa makubaliano uliojaribiwa na kuthibitishwa ambao umeweka Bitcoin na Ethereum salama na iliyogatuliwa kwa miaka mingi.                                                                                          | Ikiwa unataka kuchimba, unahitaji vifaa maalum sana kiasi kwamba ni uwekezaji mkubwa kuanza.                                                |
| Ikilinganishwa na uthibitisho wa dau ni rahisi kiasi kutekeleza.                                                                                                                                                                | Kutokana na kuongezeka kwa ukokotoaji unaohitajika, mabwawa ya uchimbaji yanaweza kutawala mchezo wa uchimbaji, na kusababisha hatari za uwekaji kati na usalama. |

## Ikilinganishwa na uthibitisho wa dau {#compared-to-pos}

Kwa kiwango cha juu, uthibitisho wa dau una lengo sawa la mwisho kama uthibitisho wa kazi: kusaidia mtandao uliogatuliwa kufikia mwafaka kwa usalama. Lakini ina tofauti kadhaa katika mchakato na wafanyakazi:

- Uthibitisho wa dau unabadilisha umuhimu wa nguvu ya kompyuta kwa ETH iliyowekwa dhamana.
- Uthibitisho wa dau unachukua nafasi ya wachimbaji na wathibitishaji. Wathibitishaji wanaweka dhamana ETH yao ili kuwezesha uwezo wa kuunda vitalu vipya.
- Wathibitishaji hawashindani kuunda vitalu, badala yake wanachaguliwa kwa nasibu na algoriti.
- Ukamilifu uko wazi zaidi: katika vituo fulani vya ukaguzi, ikiwa 2/3 ya wathibitishaji wanakubaliana juu ya hali ya kitalu inachukuliwa kuwa ya mwisho. Wathibitishaji lazima waweke dhamana yao yote kwenye hili, kwa hivyo wakijaribu kula njama baadaye, watapoteza dhamana yao yote.

[Zaidi kuhusu uthibitisho wa dau](/developers/docs/consensus-mechanisms/pos/)

## Je, wewe ni mwanafunzi wa kuona zaidi? {#visual-learner}

<VideoWatch slug="proof-of-work-explained" />

## Usomaji Zaidi {#further-reading}

- [Shambulio la wengi](https://en.bitcoin.it/wiki/Majority_attack)
- [Kuhusu ukamilifu wa ukamilishaji](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Video {#videos}

- [Maelezo ya kiufundi ya itifaki za uthibitisho wa kazi](https://youtu.be/9V1bipPkCTU)

## Mada Zinazohusiana {#related-topics}

- [Uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/)
- [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Uthibitisho wa Mamlaka (PoA)](/developers/docs/consensus-mechanisms/poa/)