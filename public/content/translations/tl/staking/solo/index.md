---
title: Home stake your ETH
description: An overview of how to get started home staking your ETH
lang: tl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Ang rhino na si Leslie na nasa sarili niyang computer chip.
sidebarDepth: 2
summaryPoints:
  - Direktang makatanggap ng maximum rewards mula sa protocol para sa pagpapatakbo nang maayos sa iyong validator at pagpapanatili ritong online
  - Patakbuhin ang home hardware at personal na magdagdag sa seguridad at decentralization ng Ethereum network
  - Iwasang umasa sa iba, at huwag ibigay sa iba ang kontrol ng mga key sa iyong mga pondo
---

## What is home staking? {#what-is-solo-staking}

Home staking is the act of [running an Ethereum node](/run-a-node/) connected to the internet and depositing 32 ETH to activate a [validator](#faq), giving you the ability to participate directly in network consensus.

**Home staking increases the decentralization of the Ethereum network**, making Ethereum more censorship-resistant and robust against attacks. Maaaring hindi makatulong sa network ang ibang paraan ng staking sa ganitong paraan. Home staking is the best staking option for securing Ethereum.

Ang isang Ethereum node ay binubuo ng execution layer (EL) client at consensus layer (CL) client. Ang mga client na ito ay mga software na nagtutulungan, kasama ang valid na set ng mga signing key, upang mag-verify ng mga transaksyon at mga block, patunayan ang tamang head ng chain, mag-aggregate ng mga attestation, at magmungkahi ng mga block.

Home stakers are responsible for operating the hardware needed to run these clients. Lubos na inirerekomendang gumamit ng nakalaang machine para dito na pinapatakbo mo sa tahanan–makakabuti ito para sa kalagayan ng network.

A home staker receives rewards directly from the protocol for keeping their validator properly functioning and online.

## Why stake home? {#why-stake-solo}

Home staking comes with more responsibility but provides you with maximum control over your funds and staking setup.

<CardGrid>
  <Card title="Kumita ng bagong ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Ganap na pagkontrol" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Seguridad ng network" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Considerations before home staking {#considerations-before-staking-solo}

As much as we wish that home staking was accessible and risk free to everyone, this is not reality. There are some practical and serious considerations to keep in mind before choosing to home stake your ETH.

<InfoGrid>
<ExpandableCard title="Kinakailangang basahin" eventCategory="SoloStaking" eventName="clicked required reading">
Kapag pinapatakbo mo ang sarili mong node, dapat kang maglaan ng oras para alamin kung paano gamitin ang napili mong software. Kasama dito ang pagbabasa ng mga kaugnay na dokumentasyon at pagiging updated sa mga komunikasyon ng mga dev team.

Kung mas nauunawaan mo ang software na iyong pinapatakbo at kung paano gumagana ang patunay ng stake, mas maliit ang panganib bilang staker, at mas madaling ayusin ang anumang problema na maaari mong kaharapin kalaunan bilang operator ng node.
</ExpandableCard>

<ExpandableCard title="Komportable sa paggamit ng mga computer" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Kung mas nauunawaan mo ang software na iyong pinapatakbo at kung paano gumagana ang patunay ng stake, mas maliit ang panganib bilang staker, at mas madaling ayusin ang anumang problema na maaari mong kaharapin kalaunan bilang operator ng node. Makakatulong kung nauunawaan ang command-line interface, pero hindi na ito lubos na kinakailangan.

Ito rin ay nangangailangan ng napaka-basic na hardware setup, at pag-unawa sa minimum na inirerekomendang specs.
</ExpandableCard>

<ExpandableCard title="Secure na pamamahala ng mga key" eventCategory="SoloStaking" eventName="clicked secure key management">
Tulad kung paano sine-secure ng mga pribadong key ang iyong Ethereum address, kakailanganin mong gumawa ng mga key na para mismo sa iyong validator. Dapat mong maunawaan kung paano panatilihing ligtas at secure ang anumang seed phrase o pribadong key.{' '}

<a href="/security/">Seguridad at pag-iwas sa scam ng Ethereum</a>
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
May mga pagkakataon na papalya ang hardware, magkakaroon ng error sa mga koneksyon sa network, at may mga pagkakataong kakailanganing i-upgrade ang software ng client. Ang pangangalaga sa node ay hindi maiiwasan at kakailanganin mo itong bigyan ng pansin paminsan-minsan. Kakailanganin mong tiyaking magiging updated ka sa anumang inaasahang upgrade sa network, o iba pang mahahalagang pag-upgrade sa client.
</ExpandableCard>

<ExpandableCard title="Maaasahang uptime" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Ang iyong mga reward ay nakabatay sa oras na online ang iyong validator at maayos ang pagpapatunay. Magpapataw ng multa para sa downtime na nakabatay sa bilang ng iba pang validator na offline sa parehong panahon, ngunit <a href="#faq">hindi ito magreresulta sa slashing</a>. Ang bandwidth ay mahalaga rin, dahil nababawasan ang mga reward para sa mga pag-attest na hindi natatanggap sa tamang oras. Ang kahilingan ay maaaring magbago, pero inirerekomenda ang hindi bababa sa 10 Mb/s na up at down.
</ExpandableCard>

<ExpandableCard title="Panganib ng slashing" eventCategory="SoloStaking" eventName="clicked slashing risk">
Naiiba sa mga penalty sa kawalan ng aktibidad na ipapataw dahil sa pagiging offline, ang <em>slashing</em> ay isang mas matinding penalty na ipinapataw para sa mga mapaminsalang pagkilos. Sa pamamagitan ng pagpapatakbo ng isang minority client nang naka-load ang iyong mga key sa iisang machine lang sa bawat pagkakataon, lumiliit ang panganib na makaranas ka ng slashing. Sa kabila nito, dapat alam ng lahat ng staker ang mga panganib ng slashing.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Iba pang detalye tungkol sa slashing at validator lifecycle</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Paano ito gumagana {#how-it-works}

<StakingHowSoloWorks />

Habang aktibo ka, magkakaroon ka ng mga ETH reward, na ide-deposito paminsan-minsan sa iyong withdrawal address.

Kung gusto mo, maaari kang umalis bilang validator, kung kaya, hindi mo na kailangang maging online at hindi mo na matatanggap ang anupamang reward. Ang iyong natitirang balanse ay iwi-withdraw sa withdrawal address na itatalaga mo sa panahon ng pag-set up.

[Iba pang detalye tungkol sa mga pag-withdraw sa staking](/staking/withdrawals/)

## Magsimula sa Staking Launchpad {#get-started-on-the-staking-launchpad}

Ang Staking Launchpad ay isang open source na application na tutulong sa iyong maging staker. Gagabayan ka nito sa pagpili ng iyong mga client, paggawa ng iyong mga key at pagdedeposito ng ETH mo sa staking deposit contract. May checklist na ibinibigay upang tiyakin na nagawa mo ang lahat para ligtas na ma-set up ang iyong validator.

<StakingLaunchpadWidget />

## Ano ang dapat isaalang-alang sa mga tool para sa node at client setup {#node-tool-considerations}

There are a growing number of tools and services to help you home stake your ETH, but each come with different risks and benefits.

Ang mga attribute indicator ay ginagamit sa ibaba upang ipahiwatig ang mga kapansin-pansing kalakasan o kahinaan ng isang nakalistang staking tool. Gamitin ang seksyong ito bilang sanggunian sa kung paano namin tinutukoy ang mga attribute na ito habang pumipili ka ng mga tool na tutulong sa iyong staking journey.

<StakingConsiderations page="solo" />

## Tingnan ang mga tool para sa pag-set up ng node at client {#node-and-client-tools}

May iba't ibang opsyon na available upang tulungan ka sa iyong pag-setup. Gamitin ang mga indicator sa itaas para magabayan ka sa mga tool sa ibaba.

<ProductDisclaimer />

### Mga tool para sa node

<StakingProductsCardGrid category="nodeTools" />

Tandaan ang kahalagahan ng pagpili ng [minority client](/developers/docs/nodes-and-clients/client-diversity/) dahil pinapaigting nito ang seguridad ng network, at nililimitahan nito ang iyong panganib. Ang mga tool na nagbibigay-daan sa iyong mag-set up ng minority client ay tinutukoy bilang <em style={{ textTransform: "uppercase" }}>"multi-client."</em>

### Mga Generator ng Key

Ang mga tool na ito ay maaaring gamitin bilang alternatibo sa [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) upang tumulong sa paggawa ng key.

<StakingProductsCardGrid category="keyGen" />

May mungkahi ka ba para sa staking tool na hindi namin nabanggit? Tingnan ang aming [patakaran sa product listing](/contributing/adding-staking-products/) para malaman kung ito ay angkop, at isumite ito para masuri.

## Explore home staking guides {#staking-guides}

<StakingGuides />

## Mga madalas itanong {#faq}

Ilan ito sa mga pinakakaraniwang tanong tungkol sa staking na mahalagang malaman.

<ExpandableCard title="Ano ang validator?">

Ang <em>validator</em> ay isang virtual entity sa Ethereum at nakikilahok sa consensus ng Ethereum protocol. Ang mga validator ay kinakatawan ng isang balanse, pampublikong key, at iba pang property. Ang <em>validator client</em> ang software na kumikilos para sa validator sa pamamagitan ng pangangasiwa at paggamit sa pribadong key nito. Maaaring mangasiwa ang isang validator client ng maraming pares ng key, na nagkokontrol ng maraming validator.

</ExpandableCard>

<ExpandableCard title="Maaari ba akong mag-deposit ng higit sa 32 ETH?">
Ang bawat key-pair na nauugnay sa isang validator ay nangangailangan ng eksaktong 32 ETH para ma-activate. Ang pagdedeposito ng mas maraming ETH sa isang set ng mga key ay hindi nagpapalaki sa posibildad na makakuha ng mga reward, dahil limitado ang bawat validator sa <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">epektibong balanse</a> na 32 ETH. Ibig sabihin nito, isinasagawa ang staking nang kada 32 ETH, kung saan may sariling set ng mga key at balanse ang bawat isa.

Huwag magdeposito ng mahigit 32 ETH para sa isang validator. Hindi nito mapaparami ang iyong mga reward. Kung mayroon nang itinakdang withdrawal address para sa validator, ang sobrang pondo na higit sa 32 ETH ay awtomatikong iwi-withdraw sa address na ito sa susunod na <a href="/staking/withdrawals/#validator-sweeping">validator sweep</a>.

If home staking seems too demanding for you, consider using a <a href="/staking/saas/">staking-as-a-service</a> provider, or if you're working with less than 32 ETH, check out the <a href="/staking/pools/">staking pools</a>.
</ExpandableCard>

<ExpandableCard title="Maaari ba akong ma-slash kung ako ay mag-offline? (tldr: No.)">
Ang pagiging offline kapag maayos na nagfa-finalize ang network ay HINDI magreresulta sa pag-slash. Magkakaroon ng maliliit na <em>multa para sa kawalan ng aktibidad</em> kung ang iyong validator ay hindi available na magpatunay para sa isang partikular na epoch (tumatagal nang 6.4 minuto ang bawat isa), ngunit labis itong naiiba sa <em>slashing</em>. Ang mga multang na ito ay bahagyang mas kaunti kaysa sa reward na maaari mo sanang makuha kung available para magpatunay ang validator, at mababawi ang mga pagkalugi sa pamamagitan ng halos katumbas na panahon ng pagiging online ulit.

Tandaan na ang mga penalty para sa kawalan ng aktibidad ay nakabatay sa bilang ng mga validator na offline sa parehong panahon. Sa mga sitwasyon kung saan sabay-sabay na offline ang malaking bahagi ng network, mas malaki ang ipapataw na penalty para sa bawat isa sa mga validator na ito kumpara kung isang validator lang ang hindi available.

Sa mga sukdulang sitwasyon, kung hihinto sa pag-finalize ang network dahil offline ang mahigit sa isang-tatlo ng mga validator, mapeperhuwisyo ang mga user ng <em>quadratic inactivity leak</em>, na labis na pagkaubos ng ETH mula sa mga offline na validator account. Binibigyang-daan nito ang network na ayusin ang sarili nito sa pamamagitan ng paggamit ng ETH ng mga hindi aktibong validator hanggang sa maging 16 ETH ang kanilang balanse, at sa puntong iyon, awtomatiko silang aalisin sa validator pool. Kalaunan, mapupunan ulit ng mga natitirang online na validator ang 2/3 ng network, na siyang sasapat sa supermajority na kinakailangan para maisapinal ulit ang chain.
</ExpandableCard>

<ExpandableCard title="Paano ko masisiguro na hindi ako ma-slash?">
Sa madaling salita, hindi ito ganap na masisigurado, ngunit kung kikilos ka nang walang masamang hangarin, magpapatakbo ka ng minority client at papanatilihin mo lang ang mga signing key mo sa isang machine sa bawat pagkakataon, halos zero ang tsansang ma-slash ka.

Mayroon lang ilang partikular na paraan na maaaring magresulta sa pag-slash ng validator at pagkatanggal nito sa network. Habang isinusulat ito, ang mga slashing na nangyari ay produkto lang ng mga redundant na hardware setup kung saan sino-store ang mga signing key sa dalawang magkahiwalay na machine sa bawat pagkakataon. Ito ay maaaring hindi sinasadyang magresulta sa isang <em>double vote</em> mula sa iyong mga key, na isang pagkakasalang ma-slash.

Ang pagpapatakbo ng isang supermajority client (anumang client na ginagamit ng mahigit 2/3 ng network) ay nagdadala rin ng panganib ng potensyal na pag-slash kung sakaling may bug ang client na ito na nagreresulta sa chain fork. Ito ay maaaring magdulot ng depektibong fork na maisapinal. Upang maibalik sa tamang chain, kinakailangang magsumite ng <em>surround vote</em> sa pamamagitan ng pagsusumikap na bawiin ang isang naisapinal na block. Ito rin ay isang slashable offense at maaari itong maiwasan sa pamamagitan ng pagpapatakbo na lang ng isang minority client.

Ang mga katumbas na bug sa isang <em>minority client ay hindi kailanman maisasapinal</em> at hindi kailanman magreresulta sa isang surround vote, at magdudulot lang ng mga penalty para sa kawalan ng aktibidad, <em>hindi sa slashing</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Magbasa pa tungkol sa kahalagahan ng pagpapatakbo ng isang minority client.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Magbasa pa tungkol sa pag-iwas sa pag-slash</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Aling client ang pinakamainam?">
Maaaring medyo magkakaiba ang performance at user interface ng mga indibidwal na client, dahil ginawa ang bawat isa sa mga ito ng iba't ibang team gamit ang iba't ibang programming language. Gayunpaman, wala sa mga ito ang "pinakamahusay." Ang lahat ng production client ay magagandang uri ng software na nagsasagawa ng mga pangunahing function na mag-sync at mag-interact sa blockchain.

Dahil ibinibigay ng lahat ng production client ang parehong basic functionality, napakahalaga na pumili ka ng <strong>minority client</strong>, ibig sabihin, anumang client na HINDI kasalukuyang ginagamit ng karamihan sa mga validator sa network. Maaaring hindi ito rasonable, pero ang pagpapatakbo ng majority o supermajority client ay maglalagay sa iyo sa mas malaking panganib ng slashing kung sakaling magkaroon ng bug sa client na iyon. Labis na nililimitahan ng pagpapatakbo ng minority client ang mga panganib na ito.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Magbasa pa tungkol sa kung bakit mahalaga ang iba't ibang client</a>
</ExpandableCard>

<ExpandableCard title="Maaari ko bang gamitin ang isang VPS (virtual private server)?">
Bagama't maaaring gumamit ng virtual private server (VPS) bilang pamalit sa home hardware, ang pisikal na access at lokasyon ng iyong validator client <em>ay mahalaga</em>. Sa tulong ng mga centralized cloud solution tulad ng Amazon Web Services o Digital Ocean, hindi na kailangang kumuha at magpatakbo ng hardware, ngunit ang kapalit nito ay pag-centralize sa network.

Kapag mas maraming validator client ang tumatakbo sa isang centralized cloud storage solution, mas magiging mapanganib ito para sa mga user na ito. Kapag nagkaroon ng anumang pangyayari na magpapa-offline sa mga provider na ito, isa mang atake, mga panregulatoryong demand, o simpleng pagkawala ng kuryente/internet, sabay-sabay na mag-o-offline ang bawat validator client na umaasa sa server na ito.

Ang mga penalty sa pagiging offline ay nakabatay sa bilang ng iba pang provider na offline sa parehong panahon. Kapag gumamit ng VPS, mas mapapalaki ang panganib na mas magiging matindi ang ipapataw na penalty sa pagiging offline, at mapapalaki nito ang posibilidad na makaranas ka ng quadratic leaking o slashing kung sakaling maging masyadong malaki ang outage. Upang mapaliit ang panganib para sa iyo at sa network, lubos na hinihikayat ang mga user na kumuha at magpatakbo ng sarili nilang hardware.
</ExpandableCard>

<ExpandableCard title="Paano ko ma-unlock ang aking mga reward o makuha ang aking ETH pabalik?">

Ang anumang uri ng withdrawal mula sa Beacon Chain ay nangangailangan ng pagtatakda ng mga kredensyal sa pag-withdraw.

Itinatakda ito ng mga bagong staker sa panahon ng paggawa ng key at deposito. Maaaring i-upgrade ng mga kasalukuyang staker na hindi pa nakapag-set nito ang kanilang mga key para masuportahan ang functionality na ito.

Kapag naitakda na ang mga kredensyal sa pag-withdraw, ang mga reward payment (nalikom na ETH matapos ang unang 32) ay pana-panahong awtomatikong ipapamahagi sa withdrawal address.

Upang ma-unlock at maibalik ang iyong buong balanse, dapat mo ring tapusin ang proseso ng pag-aalis ng iyong validator.

<ButtonLink href="/staking/withdrawals/">Iba pang detalye tungkol sa mga pag-withdraw sa staking</ButtonLink>
</ExpandableCard>

## Karagdagang pagbabasa {#further-reading}

- [Ang Ethereum Staking Directory](https://www.staking.directory/) - _Eridian at Spacesider_
- [Ang Problema ng Ethereum sa Client Diversity](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Pagtulong sa Client Diversity](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Client diversity sa consensus layer ng Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Paano Dapat Gawin: Bumili ng Hardware para sa Ethereum Validator](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Bawat Hakbang: Paano sumali sa Ethereum 2.0 Testnet](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [Mga Tip para sa Pag-iwas sa Slashing sa Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
