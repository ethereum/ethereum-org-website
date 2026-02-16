---
title: Uthibitisho wa kazi (PoW)
description: Maelezo ya itifaki ya makubaliano ya uthibitisho wa kazi na jukumu lake katika Ethereum.
lang: sw
---

Mtandao wa Ethereum ulianza kwa kutumia utaratibu wa makubaliano uliohusisha **[Uthibitishaji-wa-kazi (PoW)](/developers/docs/consensus-mechanisms/pow)**. Hii iliruhusu nodes za mtandao wa Ethereum kukubaliana juu ya hali ya taarifa zote zilizoandikwa kwenye kiambajengo cha Ethereum na kuzuia aina fulani za mashambulizi ya kiuchumi. Hata hivyo, Ethereum ilizima uthibitishaji-wa-kazi mnamo 2022 na kuanza kutumia [uthibitisho-wa-dau](/developers/docs/consensus-mechanisms/pos) badala yake.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Uthibitisho wa kazi sasa umeacha kutumika. Ethereum haitumii tena uthibitisho wa kazi kama sehemu ya utaratibu wake wa makubaliano. Badala yake, hutumia uthibitisho wa stake. Soma zaidi kuhusu [uthibitisho-wa-dau](/developers/docs/consensus-mechanisms/pos/) na [staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Mahitaji ya awali {#prerequisites}

Ili kuielewa ukurasa huu vizuri, tunapendekeza usome kwanza kuhusu [miamala](/developers/docs/transactions/), [bloku](/developers/docs/blocks/), na [taratibu za makubaliano](/developers/docs/consensus-mechanisms/).

## Uthibitisho wa kazi (PoW) ni nini? {#what-is-pow}

Makubaliano ya Nakamoto, ambayo hutumia uthibitishaji-wa-kazi, ni utaratibu ambao hapo awali uliruhusu mtandao wa Ethereum uliogatuliwa kufikia makubaliano (yaani, nodi zote zinakubali) kuhusu mambo kama vile salio za akaunti na utaratibu wa miamala. Hii ilizuia watumiaji kutoka "kutumia mara mbili" sarafu zao na kuhakikisha kuwa mnyororo wa Ethereum ulikuwa mgumu sana kushambulia au kudhibiti. Sifa hizi za usalama sasa zinatokana na uthibitisho-wa-dau badala yake kwa kutumia utaratibu wa makubaliano unaojulikana kama [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Uthibitishaji-wa-kazi na uchimbaji {#pow-and-mining}

Uthibitisho wa kazi ni algorithm ya msingi ambayo huweka ugumu na sheria kwa wachimbaji wa kazi kufanya kwenye viambajengo vya uthibitisho wa kazi. Uchimbaji madini ndio "kazi" yenyewe. Ni kitendo cha kuongeza kitalu halali kwenye mnyororo. Hii ni muhimu kwa sababu urefu wa mnyororo husaidia mtandao kufuata uma sahihi wa kiambajengo. "Kazi" zaidi inafanywa, mlolongo mrefu zaidi, na idadi ya juu ya kuzuia, mtandao unaweza kuwa na uhakika zaidi wa hali ya sasa ya mambo.

[Zaidi kuhusu uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/)

## Je, uthibitisho wa kazi wa Ethereum ulifanya kazi gani? {#how-it-works}

Shughuli za Ethereum zinachakatwa kuwa vitalu. Katika uthibitisho wa kazi ulioacha kutumika sasa wa Ethereum, kila kitalu kilikuwa na:

- ugumu wa kitalu - kwa mfano: 3,324,092,183,262,715
- mixHash – kwa mfano: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – kwa mfano: `0xd3ee432b4fb3d26b`

Data hii ya kitalu ilihusiana moja kwa moja na uthibitisho wa kazi.

### Kazi katika uthibitishaji-wa-kazi {#the-work}

Itifaki ya uthibitisho wa kazi, Ethash, ilihitaji wachimba migodi kupitia mbio kali ya majaribio na makosa ili kupata nonce kwa kitalu. Vitalu vilivyo na nonce halali pekee vinaweza kuongezwa kwenye mnyororo.

Wakati wa mbio za kuunda kitalu, mchimbaji aliweka seti ya data mara kwa mara, ambayo inaweza kupatikana tu kwa kupakua na kuendesha mlolongo kamili (kama mchimbaji anavyofanya), kupitia kazi ya hisabati. Seti ya data ilitumika kutengeneza mixHash chini ya lengo ambalo linaamuriwa na ugumu wa kitalu. Njia bora ya kufanya hivyo ni kupitia majaribio na makosa.

Ugumu uliamua lengo la hashi. Kadiri lengo linavyopungua, ndivyo seti ya hashi halali inavyopungua. Mara baada ya kuzalishwa, hii ilikuwa rahisi sana kwa wachimbaji madini wengine na wateja kuthibitisha. Hata kama muamala mmoja ungebadilika, hashi itakuwa tofauti kabisa, ikiashiria ulaghai.

Hashing hurahisisha ulaghai kubainika. Lakini uthibitisho wa kazi kama mchakato pia ulikuwa kizuizi kikubwa cha kushambulia mnyororo.

### Uthibitishaji-wa-kazi na usalama {#security}

Wachimbaji walihamasishwa kufanya kazi hii kwenye mlolongo mkuu wa Ethereum. Kulikuwa na motisha ndogo kwa kikundi kidogo cha wachimbaji kuanzisha mnyororo wao wenyewe-inadhoofisha mfumo. Viambajengo hutegemea kuwa na serikali moja kama chanzo cha ukweli.

Madhumuni ya uthibitisho wa kazi ilikuwa kupanua mnyororo. Mnyororo mrefu zaidi uliaminika zaidi kama ule halali kwa sababu ulikuwa na kazi ya kukokotoa zaidi kufanywa ili kuuzalisha. Ndani ya mfumo wa PoW wa Ethereum, ilikuwa karibu haiwezekani kuunda vizuizi vipya vinavyofuta miamala, kuunda bandia, au kudumisha mnyororo wa pili. Hiyo ni kwa sababu mchimbaji hasidi angehitaji kila wakati kusuluhisha kitalu haraka kuliko kila mtu mwingine.

Ili kuunda vitalu hasidi lakini halali, mchimbaji hasidi angehitaji zaidi ya 51% ya nguvu ya uchimbaji wa mtandao kushinda kila mtu. Kiasi hicho cha "kazi" kinahitaji nguvu nyingi za gharama kubwa za kompyuta na nishati inayotumika inaweza hata kuwa kubwa kuliko faida iliyopatikana katika shambulio.

### Uchumi wa uthibitishaji-wa-kazi {#economics}

Uthibitisho wa kazi pia ulikuwa na jukumu la kutoa sarafu mpya kwenye mfumo na kutoa motisha kwa wachimbaji kufanya kazi hiyo.

Tangu [sasisho la Constantinople](/ethereum-forks/#constantinople), wachimbaji waliofanikiwa kuunda bloku walituzwa ETH mbili zilizotolewa upya na sehemu ya ada za muamala. Vitalu vya Ommer pia vilifidia 1.75 ETH. Vitalu vya Ommer vilikuwa vitalu halali vilivyoundwa na mchimbaji kwa wakati mmoja kama mchimbaji mwingine aliunda kitalu cha canonical, ambacho hatimaye kiliamuliwa na mnyororo uliojengwa juu ya kwanza. Vizuizi vya Ommer kawaida hufanyika kwa sababu ya hali ya kusubiri ya mtandao.

## Mwisho {#finality}

Muamala una "mwisho" kwenye Ethereum wakati ni sehemu ya kitalu ambacho hakiwezi kubadilika.

Kwa sababu wachimbaji walifanya kazi kwa njia ya mfumo mfumo mtawanyo, vitalu viwili halali vinaweza kuchimbwa kwa wakati mmoja. Hii inaunda uma wa muda. Hatimaye, moja ya minyororo hii ikawa mnyororo uliokubalika baada ya vitalu vilivyofuata kuchimbwa na kuongezwa kwake, na kuifanya kuwa ndefu.

Hatimaye, moja ya minyororo hii ikawa mnyororo uliokubalika baada ya vitalu vilivyofuata kuchimbwa na kuongezwa kwake, na kuwa ndefu. Hii inamaanisha kuwa inaweza kubadilishwa. Kwa hivyo umaliziaji unarejelea wakati unaopaswa kusubiri kabla ya kuzingatia muamala usioweza kurudishwa. Chini ya Ethereum ya awali ya uthibitishaji-wa-kazi, kadiri bloku nyingi zilivyochimbwa juu ya bloku maalum `N`, ndivyo imani inavyokuwa kubwa kwamba miamala katika `N` ilifanikiwa na haitarejeshwa. Sasa, kwa uthibitisho wa dau, ukamilishaji ni mali ya wazi, badala ya uwezekano, ya kitalu.

## Matumizi ya nishati ya uthibitishaji-wa-kazi {#energy}

Lawama kuu ya uthibitisho wa kazi ni kiasi cha nishati inayohitajika ili kuweka mtandao salama. Ili kudumisha usalama na mfumo mtawanyo Ethereum juu ya uthibitisho wa kazi ilitumia kiasi kikubwa cha nishati. Muda mfupi kabla ya kubadili hadi uthibitisho-wa-dau, wachimbaji wa Ethereum walikuwa wakitumia kwa pamoja takriban 70 TWh/mwaka (takriban sawa na Jamhuri ya Cheki - kulingana na [digiconomist](https://digiconomist.net/) mnamo tarehe 18 Julai 2022).

## Faida na hasara {#pros-and-cons}

| Faida                                                                                                                                                                                                                                                                          | Hasara                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uthibitisho wa kazi hauegemei upande wowote. Huhitaji ETH ili kuanza na kuzuia zawadi hukuruhusu kutoka 0ETH hadi salio chanya. Kwa [uthibitisho-wa-dau](/developers/docs/consensus-mechanisms/pos/) unahitaji ETH ili kuanza. | Uthibitisho wa kazi hutumia nishati nyingi sana kwamba ni mbaya kwa mazingira.                                                                                            |
| Uthibitisho wa kazi ni utaratibu wa makubaliano uliojaribiwa na ambao umeweka Bitcoin na Ethereum salama na mfumo mtawanyo kwa miaka mingi.                                                                                                                    | Ikiwa unataka kuchimba, unahitaji vifaa maalum hivi kwamba ni uwekezaji mkubwa kuanza.                                                                                    |
| Ikilinganishwa na uthibitisho wa stake ni rahisi kutekeleza.                                                                                                                                                                                                   | Kwa sababu ya kuongezeka kwa ukokotoaji unaohitajika, mabwawa ya uchimbaji yanaweza kutawala mchezo wa uchimbaji, na hivyo kusababisha hatari za kuunganishwa na usalama. |

## Ukilinganisha na uthibitisho-wa-dau {#compared-to-pos}

Katika kiwango cha juu, uthibitisho wa stake una lengo sawa na uthibitisho wa kazi: kusaidia mtandao uliogawanyika kufikia makubaliano kwa usalama. Lakini ina tofauti fulani katika mchakato na wafanyikazi:

- Uthibitisho wa dau hubadilisha umuhimu wa nguvu ya hesabu kwa ETH iliyowekwa kwenye hisa.
- Uthibitisho wa dau hubadilisha wachimbaji na vithibitishaji. Vithibitishaji huweka hisa zao kwenye ETH ili kuwezesha uwezo wa kuunda vitalu vipya.
- Vithibitishaji havishindani ili kuunda vitalu, badala yake vinachaguliwa bila mpangilio na kanuni.
- Mwisho ni wazi zaidi: katika vituo fulani vya ukaguzi, ikiwa wathibitishaji 2/3 wanakubaliana juu ya hali ya kitalu inachukuliwa kuwa ya mwisho. Wahalalishaji lazima waweke dau lao zima kwenye hili, kwa hivyo wakijaribu kugongana, watapoteza hisa yao yote.

[Zaidi kuhusu uthibitisho-wa-dau](/developers/docs/consensus-mechanisms/pos/)

## Wewe ni mwanafunzi wa kuona zaidi? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Masomo zaidi {#further-reading}

- [Shambulio la walio wengi](https://en.bitcoin.it/wiki/Majority_attack)
- [Kuhusu mwisho wa malipo](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Video {#videos}

- [Maelezo ya kiufundi ya itifaki za uthibitishaji-wa-kazi](https://youtu.be/9V1bipPkCTU)

## Mada Husika {#related-topics}

- [Uchimbaji](/developers/docs/consensus-mechanisms/pow/mining/)
- [Uthibitisho wa rehani](/developers/docs/consensus-mechanisms/pos/)
- [Uthibitisho wa Mamlaka](/developers/docs/consensus-mechanisms/poa/)
