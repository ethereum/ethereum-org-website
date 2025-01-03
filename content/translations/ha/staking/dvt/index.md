---
title: Fasaha na mai tabbartawa da aka rarraba
description: Fasaha na mai tabbatarwa da aka rarraba yana ba da damar rarraba aiki na mai tabbatarwa Ethereum ta ɓangarorin da yawa.
lang: ha
---

# Fasaha na mai tabbartawa da aka rarraba {#distributed-validator-technology}

Fasaha na mai tabbatarwa da aka rarraba (DVT) wata hanya ce ta tsaro mai tabbatarwa wacce ke shimfida mahimman gudanarwa da sanya hannu kan ayyuka a cikin ɓangarorin da yawa, don rage maki guda na gazawa, da ƙara ƙarfin mai tabbatarwa.

Na yin haka ta hanyar **raba maɓallin sirri**da ake amfani da shi don amintar da mai tabbatarwa**a cikin kwamfutoci da yawa**an tsara su zuwa "tari". Amfanin hakan shi ne, yana da wahala ga maharan su samu damar shiga makulli, domin ba a adana shi gaba ɗaya a kan na'ura ɗaya. Hakanan na ba da damar wasu cibiyar su zama ba a layi, saboda ana iya yin sa hannun da ya dace ta hanyar ƙungiyar na'urori a kowane tari. Wannan na rage maki guda na gazawa daga hanyar sadarwar kuma yana sa dukkanin tarin masu tabbatarwa mai ƙarfi fiye.

![Hoton da ke nuna yadda aka rarraba makullin mai tabbartawa guda ɗaya zuwa makullin hannun jari da rarraba zuwa kuɗaɗe da yawa tare da sassa daban-daban.](./dvt-cluster.png)

## Me yasa muke da buƙatar DVT? {#why-do-we-need-dvt}

### Tsaro {#security}

Masu tabbatarwa suna samar da makulli biyu, na jama'a-keɓaɓɓen: maɓallan masu tabbatarwa don shiga yarjejeniya da maɓallan cirewa don samun kuɗi. A lokacin da masu tabbatarwa za su iya amintar da maɓallan cirewa a cikin ma'ajin sanyi, dole sai maɓallan masu keɓaɓɓen na masu tabbatarwa kan layi 24/7. Idan an lalata makulli keɓaɓɓen mai tabbatarwa, maharin zai iya sarrafa mai tabbatarwa, mai yuwuwar haifar da hukunci ko asarar ETH na mai saka hannun jari. DVT na iya taimakawa rage wannan haɗari. Ga yadda zai yi:

Ta amfani da DVT, masu saka hannun jari za su iya shiga hannun jari yayin da suke adana maɓallin sirri na mai tabbatarwa a cikin ma'ajin sanyi. Ana samun wannan ta hanyar ɓoye na asalin, maɓalli mai tabbatarwa, sannan a raba shi zuwa muhimman kason. Muhimman kason na nanne akan intanet kuma ana rarraba su zuwa cibiyar da yawa wanda ke ba da damar rarraba aikin mai tabbatarwa. Wannan na yiwuwa saboda masu tabbatar da Ethereum suna amfani da sa hannun BLS wanda ke da ƙari, ma'ana za a iya sake gina cikakken maɓalli ta hanyar jimlar sassan su. Wannan na bawa mai saka hannun jari damar kiyaye cikakken makulli mai tabbatarwa na 'manyan' na asali ba a kan layi.

### Babu maki guda kan gazawa {#no-single-point-of-failure}

A lokacin da aka raba mai tabbatarwa a ninka ma'aikatu da injuna da yawa, zai iya jure faɗuwar kayan masarufi da manhaja ba tare da yin layi ba. Hakanan za'a iya rage haɗarin gazawa ta hanyar yin amfani da kayan aiki iri-iri da saitin manhaja a fadin cibiyar a cikin tari. Wannan juriyar ba ta samuwa ga saitin mai tabbatarwa cibiyar gudaɗaya - ya fito daga mataki DVT.

Idan ɗaya daga cikin abubuwan na'ura a cikin tari ya ɓaci (misali, idan akwai masu aiki guda huɗu a cikin tari mai tabbatarwa kuma ɗayan yana amfani da takamaiman abokin ciniki wanda ke da kuskure), sauran suna tabbatar da cewa mai tabbatarwa ya ci gaba da aiki.

### Rarrabuwa {#decentralization}

Mafi kyawun yanayin Ethereum shine a sami yawancin masu tabbatar da inganci masu aiki da kansu idan ya yiwu. Koda yake, ƴan masu bayar da hannun jari sun zama shahararru kuma suna lissafin wani kaso mai tsoka na jimlar ETH da ke kan hanyar sadarwa. DVT na iya ƙyale waɗannan masu aiki su wanzu yayin da suke kare rarraba iko na hannun jari. Wannan saboda maɓuɗi na kowane mai tabbatarwa ana rarraba su a cikin injuna da yawa kuma zai ɗauki babban haɗa baki don mai tabbatarwa ya juya rashin gaskiya.

Ba tare da DVT ba, yana da sauƙi ga masu ba da saka hannun jari don tallafawa ɗaya ko biyu saitunan abokin ciniki don duk masu tabbatar da su, ƙara tasirin kuskure na abokin ciniki. Ana iya amfani da DVT don rarraba haɗarin a cikin saitunan abokin ciniki da yawa da kayan aiki daban-daban, ƙirƙirar juriya ta hanyar bambancin.

**DVT yana ba da wannan fa'idodin zuwa ga Ethereum:**

1. **Rarrabawa** na shaidar hannun jari yarjejeniya Ethereum
2. Tabbatar da cewa **rayuwa** na hanyar sadarwa
3. Kirƙira masu tabbatarwa **jurewar kuskure**
4. **Rage girman tsaro** aiki mai tabbatarwa
5. **Rage girman yin hukunci ** da kasada lokacin rashin aiki
6. **Inganta bambance** (abokin ciniki, cibiyar bayanai, wuri, tsarin tafiyarwa, da sauransu)
7. **Ingantacciyar tsaro** na sarrafa maɓudi mai tabbatarwa

## Ta ya DVT ke aiki? {#how-does-dvt-work}

Mafita na DVT ya ƙunshi abubuwa masu zuwa:

- **[Rabawa sirri na Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Amfani na mai tabbatarwa [BLS mabudi](https://en.wikipedia.org/wiki/BLS_digital_signature). Mutum ɗaya BLS "muhimman kason" ("muhimman kason") ana iya haɗa shi zuwa makulli gudaɗaya (sa hannu). A cikin DVT, makulli keɓaɓɓen na mai tabbatarwa shine haɗewar sa hannun BLS na kowane mai aiki a cikin tari.
- **[Tsarin sa hannu na iyaka](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Na ƙayyade yawan muhimman kason na mutum guda wanda ake bukata don sanya hannun ayyuka, misali, 3 daga cikin 4.
- **[Ƙirƙirar makulli ta hanyar rarrabawa (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Tsarin na ɓoye wanda ke haifar da muhimman kason kuma ana amfani da shi don rabba Hakkokin hannun jari wanda Da ake da shi ko sabon mabuli mai tabbatarwa ga cibiyar a cikin tari.
- **[Lissafin Jam'iyyu da yawa (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - Ana haifar a sirri a cikakken makullin mai tabbatarwa ta amfani da Lissafin Jam'iyyu da yawa. Ba a taɓa sanin cikakken makulli ga kowane mai aiki ba - kawai sun taɓa sanin ɓangaren nasu ("hannun jari" nasu).
- **Ka'ida yarjejeniya** - Ka'ida yarjejeniya ta zaɓi cibiya ɗaya don zama mai ba da shawara na ɓangare. Suna raba ɓangare tare da sauran cibiyar dake cikin tari, waɗanda ke ƙara muhimman kason zuwa sa hannun jimlar. Lokacin da aka tara isassun jimlar muhimmai na kason, ana ba da shawarar ɓangare akan Ethereum.

Rarraba masu tabbatarwa na da jurewan kuskure da aka gina ciki kuma suna iya ci gaba da aiki ko idan wasu daga cikin cibiyar ɗin sun rasa haɗi da intanet. Wannan yana nufin cewa tarin yana da juriya ko da wasu daga cikin cibiyar da ke cikinsa sun zama na damfara ko malalaci.

## Matsalolin amfani da DVT {#dvt-use-cases}

DVT na da tasiri mai mahimmanci ga manyan masana'antu saka hannun jari:

### Mai saka hannun jari guda {#solo-stakers}

DVT na ba da damar tsaka hannun jarin da Babu kulawa ta ba ku damar rarraba maɓallin mai tabbatarwa ku a cikin cibiyar masu nisa yayin da ke kiyaye cikakken maɓalli gabaɗaya ba a kan yanar gizo ba. Wannan na nufin masu saka hannun jari na gida ba lallai ba ne su kashe kuɗi fitar da kayan aiki, yayin rarraba mabudin Hakkokin hannun jari na iya taimaka musu wajen ƙarfafa su daga yiwuwar hare-hare.

### Saka sabis a (SaaS) {#saas}

Masu aiwatarwa (kamar tafkin saka hannun jari da masu saka hannun jar na hukuma) sarrafa masu tabbatarwa da yawa na iya amfani da DVT don rage haɗarinsu. Ta hanyar rarraba tsarin aiki su, za su iya ƙara Ƙarin abu ga ayyukansu da kuma bambanta nau'ikan kayan aikin da suke yin amfani da su.

DVT na rabba alhaƙin maɓalli gudanarwa a cikin cibiyar da yawa, wannan yana nufin kuɗin aiki na iya zama na raba. Hakanan DVT na iya rage haɗarin aiki da farashin inshora ga masu samar saka hannun jari.

### Haɗakar sakawa {#staking-pools}

Saboda daidaitattun saitin mai tabbatarwa, tafkin saka hannun jari da masu samar saka hannun jarin mai karfi ana tilasta su samun bambance-bambancen matakan amana-mai-aiki ɗaya tun lokacin da aka haɓaka riba da asara na hulɗar zamantakewa a cikin tafkin. Hakananma sun dogara ga masu aiki don kiyaye maɓallan sa hannu saboda, har yanzu, babu wani zaɓi gare su.

Ko da yake a al'adance ana yin ƙoƙari don yada za a shimfiɗa haɗari ta hanyar rarraba hannun jari a tsakanin masu aiki da yawa, kowane ma'aikaci har yanzu yana kula da wani muhimmin hannun jari da kansa. Dogaro ga ma'aikaci guda ɗaya yana haifar da babban haɗari idan sun Kasa wajen cika tsammanin, sun gamu da Lokacin hutu, yi tasiri, ko suka yi aikin mugunta.

Ta hanyar yin amfani da DVT, tsaron da ake buƙata daga masu aiki yana raguwa sosai. **Tafkin na iya baiwa masu aiki damar saka hannun jari ba tare da buƙatar tsare maɓallan masu tabbatarwa ba**(kamar yadda ake amfani da muhimman kason). Hakanan na ba da damar rarraba hannun jarin da aka sarrafa tsakanin ƙarin masu aiki (misali, maimakon samun ma'aikaci ɗaya wanda ke sarrafa masu tabbatarwa guda 1000, DVT na ba wa waɗannan masu tabbatarwa damar aiki tare da masu aiki da yawa gabaɗaya). Tsarukan masu aiki iri-iri zai tabbatar da cewa idan ɗaya mai aiki ya sauka, sauran za su iya yin shaida. Wannan na haifar da ƙarin abu da rarrabuwa wanda ke haifar da kyakkyawan aiki da juriya, yayin da yake yin amfani da mafi girma lada.

Wani fa'ida domin rage tsaron mai aiki gudaɗaya ita ce tafkunan saka hannun jari na iya ba da damar ƙarin buɗewa da shigar da masu aiki ba tare da izini ba. Ta yin wannan, ayyuka za su iya rage haɗarin su kuma su goya bayan rarraba goyon bayan Ethereum ta hanyar Amfani da duka tari na masu aiki da aka zaɓaɓɓe da waɗanda ba a buƙatar izini ba, ga misali, ta hanyar haɗa gida ko ƙarami masu saka hannun jari tare da manyan.

## Abubuwan da za su iya haifar da yin amfani da DVT {#potential-drawbacks-of-using-dvt}

- **Ƙarin wasu ɓangarorin** - gabatar da cibiyar DVT yana ƙara wani ɓangaren da zai iya zama mara kyau ko mara ƙarfi. Hanya domin rage wannan ita ce ƙoƙari don aiwatarwa da yawa na cibiyar DVT, ma'ana abokan ciniki na DVT da yawa (kamar yadda akwai abokan ciniki da yawa don yarjejeniya da matakai aiwatarwa).
- ** Farashi yin aiki**- kamar yadda DVT ke rarraba mai tabbartawa tsakanin ɓangarorin da yawa, akwai ƙarin cibiyar da ake buƙata don aiki maimakon cibiyar ɗaya kawai, wanda ke gabatar da ƙarin farashin aiki.
- **Haɓaka lokacin jinkiri mai yuwuwar**- tunda DVT tana amfani da ƙa'idar yarjejeniya don cimma yarjejeniya tsakanin cibiyar masu yawa waɗanda ke aiki da tabbartawa, yana iya gabatar Haɓaka lokacin jinkiri Mai yuwuwar.

## Further Reading {#further-reading}

- [Rarrabawan mai tabbartawa takamamman bayanan Ethereum (babban mataki)](https://github.com/ethereum/distributed-validator-specs)
- [Rarrabawan mai tabbartawa fasaha na takamamman bayanan Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Manhaja na raba misalan sirri na Shamir](https://iancoleman.io/shamir/)
