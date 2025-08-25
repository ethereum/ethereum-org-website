---
title: Conarthaí cliste a thástáil
description: Forbhreathnú ar theicnící agus breithnithe chun conarthaí cliste Ethereum a thástáil.
lang: ga
---

Tá blocshlabhraí poiblí cosúil le Ethereum do-athraithe, rud a fhágann go bhfuil sé deacair cód conarthaí cliste a athrú tar éis imscaradh. Tá [patrúin uasghrádaithe conartha](/developers/docs/smart-contracts/upgrading/) ann chun "uasghráduithe fíorúla" a dhéanamh, ach is deacair iad seo a chur i bhfeidhm agus bíonn comhthoil shóisialta ag teastáil. Ina theannta sin, ní féidir le huasghrádú earráid a shocrú ach _tar éis_ é a fháil - má aimsíonn ionsaitheoir an leochaileacht ar dtús, tá do chonradh cliste i mbaol dúshaothraithe.

Ar na cúiseanna sin, tá sé ina íoscheanglas le haghaidh [imscaradh](/developers/docs/smart-contracts/deploying/) chuig Mainnet tástáil [slándála](/developers/docs/smart-contracts/security/) a dhéanamh ar chonarthaí cliste. Tá go leor teicnící ann chun conarthaí a thástáil agus chun cruinneas cód a mheas; braitheann an méid a roghnaíonn tú ar do chuid riachtanas. Mar sin féin, tá sraith tástála comhdhéanta d'uirlisí agus cineálacha cur chuige oiriúnacha éagsúla chun teacht ar mhionlochtanna agus ar mhórlochtanna slándála i gcód conartha.

## Réamhriachtanais {#prerequisites}

Míníonn an leathanach seo conas conarthaí cliste a thástáil roimh imscaradh ar líonra Ethereum. Glacann sé leis go bhfuil cur amach agat ar [chonarthaí cliste](/developers/docs/smart-contracts/).

## Cad is tástáil conartha cliste ann? {#what-is-smart-contract-testing}

Is é tástáil conartha cliste an próiseas chun a fhíorú go n-oibríonn cód conartha cliste mar a bhíothas ag súil leis. Tá tástáil úsáideach chun a sheiceáil an sásaíonn conradh cliste ar leith na ceanglais maidir le hiontaofacht, inúsáidteacht agus slándáil.

Cé go bhfuil éagsúlacht sa chur chuige, éilíonn an chuid is mó de na modhanna tástála conradh cliste a rith le sampla beag de na sonraí a bhfuiltear ag súil leis a láimhseáil. Má thugann an conradh torthaí cearta do shonraí samplacha, glactar leis go bhfuil sé ag feidhmiú i gceart. Soláthraíonn formhór na n-uirlisí tástála acmhainní chun [cásanna tástála](https://en.m.wikipedia.org/wiki/Test_case) a scríobh agus a chur i gcrích le seiceáil an dtagann rith conartha leis na torthaí ionchais.

### Cén fáth a bhfuil sé tábhachtach conarthaí cliste a thástáil? {#importance-of-testing-smart-contracts}

Toisc gur minic a bhainistíonn conarthaí cliste sócmhainní airgeadais ardluacha, is féidir le [caillteanais ollmhóra d’úsáideoirí](https://rekt.news/leaderboard/) a bheith mar thoradh ar mhionearráidí ríomhchlárúcháin. Is féidir le dianthástáil, áfach, cabhrú leat lochtanna agus fadhbanna a aimsiú go luath i gcód an chonartha chliste agus iad a shocrú sula seolfar ar Mainnet iad.

Cé gur féidir conradh a uasghrádú má aimsítear fabht, tá uasghrádú casta agus is féidir [ earráidí a bheith mar thoradh air](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) má láimhseáiltear go míchuí iad. Má dhéantar conradh a uasghrádú, déantar prionsabal na do-athraitheachta a dhiúltú tuilleadh agus cuirtear ualach ar úsáideoirí le boinn tuisceana iontaoibhe breise. Os a choinne sin, maolaíonn plean cuimsitheach chun do chonradh a thástáil rioscaí slándála conartha cliste agus laghdaítear an gá atá le huasghráduithe casta loighce a dhéanamh tar éis imscaradh.

## Modhanna chun conarthaí cliste a thástáil {#methods-for-testing-smart-contracts}

Tagann modhanna chun conarthaí cliste Ethereum a thástáil faoi dhá chatagóir leathana: **tástáil uathoibrithe** agus **tástáil láimhe**. Cuireann tástáil uathoibrithe agus tástáil láimhe buntáistí uathúla agus roghanna comhréitigh ar fáil, ach is féidir leat an dá cheann a chur le chéile chun plean láidir a chruthú chun do chonarthaí a anailísiú.

### Tástáil uathoibrithe {#automated-testing}

Úsáideann tástáil uathoibrithe uirlisí a sheiceálann go huathoibríoch cód conarthaí cliste le haghaidh earráidí i rith. Is é an buntáiste a bhaineann le tástáil uathoibrithe ná [scripteanna](https://www.techtarget.com/whatis/definition/script?amp=1) a úsáid chun meastóireacht ar fheidhmiúlachtaí conartha a threorú. Is féidir tástálacha scripte a rith arís agus arís eile le hidirghabháil íosta daonna, rud a fhágann go mbeidh tástáil uathoibrithe níos éifeachtaí ná cuir chuige láimhe i leith na tástála.

Tá tástáil uathoibrithe thar a bheith úsáideach nuair a bhíonn tástálacha atriallach agus fadálach; deacair a dhéanamh de láimh; so-ghabhálach i leith earráid dhaonna; nó nuair a bhíonn measúnú á dhéanamh ar fheidhmeanna conartha criticiúla. Ach d’fhéadfadh míbhuntáistí a bheith ag baint le huirlisí tástála uathoibrithe – seans go gcaillfidh siad fabhtanna áirithe agus go gcruthóidh siad go leor [bréagdheimhneach](https://www.contrastsecurity.com/glossary/false-positive). Mar sin, is fearr an tástáil uathoibrithe a chomhcheangal le tástáil láimhe le haghaidh conarthaí cliste.

### Tástáil láimhe {#manual-testing}

Tugtar cúnamh daonna don tástáil láimhe agus is éard atá i gceist léi gach cás tástála a dhéanamh i do shraith tástála ceann i ndiaidh a chéile nuair a dhéantar anailís ar chearta conarthaí cliste. Níl sé cosúil le tástáil uathoibrithe áit ar féidir leat tástálacha iolracha leithlisithe a reáchtáil ar chonradh ag an am céanna agus tuarascáil a fháil a thaispeánann gach tástáil a theipeann agus a n-éiríonn leo.

Is féidir le duine aonair tástáil láimhe a dhéanamh ag leanúint tástála scríofa a chlúdaíonn cásanna tástála éagsúla. D’fhéadfá freisin go mbeadh daoine aonair iolracha nó grúpaí ag idirghníomhú le conradh cliste thar thréimhse shonraithe mar chuid den tástáil láimhe. Déanfaidh tástálaithe iompraíocht iarbhír an chonartha a chur i gcomparáid leis an iompar a bhfuiltear ag súil leis, ag léiriú aon difríocht mar fhabht.

Teastaíonn acmhainní suntasacha ó thástáil láimhe éifeachtach (scil, am, airgead agus iarracht), agus is féidir - de bharr earráid dhaonna - earráidí áirithe a chailliúint agus tástálacha á ndéanamh. Ach is féidir le tástáil láimhe a bheith tairbheach freisin - mar shampla, féadfaidh tástálaí daonna (m.sh., iniúchóir) iomas a úsáid chun cásanna imeallacha a bhrath a chaillfeadh uirlis tástála uathoibrithe.

## Tástáil uathoibrithe le haghaidh conarthaí cliste {#automated-testing-for-smart-contracts}

### Tástáil aonad {#unit-testing-for-smart-contracts}

Déanann tástáil aonaid feidhmeanna conartha a mheas ar leithligh agus seiceálann sé go n-oibríonn gach comhpháirt i gceart. Ba chóir go mbeadh trialacha maithe aonaid simplí, tapa le rith agus ba cheart nod soiléir a thabhairt faoinar tharla má theipeann ar na tástálacha.

Tá tástálacha aonaid úsáideach chun a sheiceáil go dtugann feidhmeanna na luachanna ionchais ar ais agus go ndéantar stóras conartha a nuashonrú i gceart tar éis rith na feidhme. Ina theannta sin, trí thástálacha aonaid a rith tar éis athruithe a dhéanamh ar bhunachar cód conarthaí cinntítear nach dtugtar earráidí isteach má chuirtear loighic nua leis. Seo thíos roinnt treoirlínte chun tástálacha aonaid éifeachtacha a rith:

#### Treoirlínte le haghaidh aonad tástála conarthaí cliste {#unit-testing-guidelines}

##### 1. Tuiscint a fháil ar do chonarthaí loighic ghnó agus sreabhadh oibre

Sula scríobhtar tástálacha aonaid, cabhraíonn sé a bheith eolach faoi na feidhmiúlachtaí a thairgeann conradh cliste agus conas a dhéanfaidh úsáideoirí na feidhmeanna sin a rochtain agus a úsáid. Tá sé seo an-úsáideach chun [tástálacha cosán sona](https://en.m.wikipedia.org/wiki/Happy_path) a rith a chinneann an dtugann feidhmeanna i gconradh an t-toradh ceart ar ais ar ionchuir úsáideora bailí. Míneoimid an coincheap seo trí úsáid a bhaint as an sampla (giorraithe) seo de [chonradh ceant](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Is conradh ceant simplí é seo atá deartha chun tairiscintí a fháil le linn na tréimhse tairisceana. Má thagann méadú ar an `TairiscintisAirde`, faigheann an tairgeoir is airde roimhe sin a gcuid airgid; Nuair a bheidh an tréimhse tairisceana thart, cuireann an `tairbhí` an conradh chun a gcuid airgid a fháil.

Chlúdódh tástálacha aonaid le haghaidh conradh mar seo feidhmeanna éagsúla a d’fhéadfadh úsáideoir a ghlaoch agus é ag idirghníomhú leis an gconradh. Sampla is ea tástáil aonaid a sheiceálann an féidir le húsáideoir tairiscint a chur isteach agus an ceant ar siúl (i.e. go n-éiríonn le glaonna ar `thairiscint()`) nó ceann a sheiceálann an féidir le húsáideoir tairiscint níos airde a chur isteach. ná an `TairiscintisAirde` reatha.

Cuidíonn tuiscint ar shreabhadh oibre oibríochta conarthaí freisin le tástálacha aonaid a scríobh a sheiceáil an gcomhlíonann an rith na ceanglais. Mar shampla, sonraítear sa chonradh ceant nach féidir le húsáideoirí tairiscintí a chur isteach nuair a bhíonn an ceant críochnaithe (i.e., nuair a bhíonn `AmscoirCeant` níos ísle ná `stampaama.bloic`). Mar sin, d’fhéadfadh forbróir tástáil aonaid a rith a sheiceálann an n-éireoidh nó an dteipfidh ar ghlaonna chuig an bhfeidhm `tairiscint()` nuair a bhíonn an ceant thart (i.e. nuair a bheidh `AmscoirCeant` > `` `stampaama.bloic ``).

##### 2. Déan measúnú ar na boinn tuisceana go léir a bhaineann le rith conartha

Tá sé tábhachtach aon toimhde faoi rith conartha a dhoiciméadú agus tástálacha aonaid a scríobh chun bailíocht na mbonn tuisceana sin a fhíorú. Seachas cosaint a thairiscint i gcoinne rith gan choinne, cuireann tástáil dearbhuithe iallach ort smaoineamh ar oibríochtaí a d'fhéadfadh múnla slándála conarthaí cliste a bhriseadh. Leid úsáideach is ea dul níos faide ná “tástálacha úsáideora sásta” agus tástálacha diúltacha a scríobh a sheiceálann má theipeann ar fheidhm do na hionchuir mícheart.

Ligeann go leor creataí tástála aonad duit dearbhuithe a chruthú—ráitis shimplí a shonraíonn cad is féidir agus nach féidir le conradh a dhéanamh—agus tástálacha a reáchtáil féachaint an bhfuil na dearbhuithe sin á gcur i gcrích. D’fhéadfadh forbróir atá ag obair ar an gconradh ceant réamhráite na dearbhuithe seo a leanas a dhéanamh faoina iompraíocht roimh thástálacha diúltacha a rith:

- Ní féidir le húsáideoirí tairiscintí a chur isteach nuair a bhíonn an ceant thart nó nuair nach bhfuil sé tosaithe.

- Filleann an conradh ceant má tá tairiscint faoi bhun na tairsí inghlactha.

- Cuirtear a gcuid cistí chun sochair na n-úsáideoirí a dteipeann orthu an tairiscint a bhuachan

**Nóta**: Bealach eile chun toimhdí a thástáil is ea tástálacha a scríobh a spreagann [modhnóirí feidhmeanna](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) i gconradh, go háirithe ráitis `require`, `deimhniú`, agus `má…eilse`.

##### 3. Tomhais chumhdach an chóid

Is méadrach tástála é [Cumhdach cóid](https://en.m.wikipedia.org/wiki/Code_coverage) a rianaíonn líon na gcraobhacha, na línte agus na ráiteas i do chód a rinneadh le linn tástálacha. Ba cheart go mbeadh clúdach cód maith ag trialacha chun an riosca a bhaineann le leochaileachtaí neamhthástáilte a íoslaghdú. Gan cumhdach leordhóthanach, d'fhéadfá glacadh leis go bréagach go bhfuil do chonradh slán mar go n-éiríonn leis na tástálacha go léir, cé go bhfuil leochaileachtaí fós i gconair chóid neamhthástáilte. Nuair a dhéantar cumhdach ard chóid a thaifeadadh, áfach, tugtar dearbhú go ndearnadh tástáil leordhóthanach ar gach ráiteas/feidhm i gconradh cliste maidir le cruinneas.

##### 4. Úsáid creataí tástála dea-fhorbartha

Tá cáilíocht na n-uirlisí a úsáidtear chun tástálacha aonaid a reáchtáil do chonarthaí cliste ríthábhachtach. Is creat tástála idéalach é creat a chothabháiltear go rialta; soláthraíonn sé gnéithe úsáideacha (m.sh., cumais logáil agus tuairiscithe); agus caithfidh gur bhain forbróirí eile úsáid fhairsing agus grinnfhiosrúcháin as.

Tá creataí tástála aonaid le haghaidh conarthaí cliste Solidity ar fáil i dteangacha éagsúla (JavaScript, Python, agus Rust den chuid is mó). Féach ar chuid de na treoracha thíos chun faisnéis a fháil faoin gcaoi le tosú ag rith tástálacha aonaid le creataí tástála éagsúla:

- **[Ag rith tástálacha aonaid le Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Ag rith tástálacha aonaid le Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Ag rith tástálacha aonaid le Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Ag rith tástálacha aonad le Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ag rith tástálacha aonaid le Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Ag rith tástálacha aonaid le Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Ag rith tástálacha aonaid le Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Tástáil chomhtháthaithe {#integration-testing-for-smart-contracts}

Cé go bhfeidhmíonn an conradh dífhabhtaithe tástála aonaid ina n-aonar, déanann tástálacha comhtháthaithe meastóireacht ar chomhpháirteanna conartha cliste ina n-iomláine. Is féidir le tástáil chomhtháthaithe saincheisteanna a eascraíonn as glaonna traschonartha nó idirghníomhartha idir feidhmeanna éagsúla sa chonradh cliste céanna a bhrath. Mar shampla, is féidir le tástálacha comhtháthaithe cabhrú le seiceáil an n-oibríonn rudaí mar [oidhreacht](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) agus instealladh spleáchais i gceart.

Tá tástáil chomhtháthaithe úsáideach má ghlacann do chonradh ailtireacht mhodúlach nó má labhraíonn sé le conarthaí ar slabhra eile le linn reatha. Bealach amháin chun tástálacha comhtháthaithe a rith ná [forc a dhéanamh ar an mblocshlabhra](/glossary/#fork) ag airde ar leith (ag úsáid uirlis mar [Forge](https://book.getfoundry.sh/forge/fork-testing) nó [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) agus insamhail idirghníomhaíochtaí idir do chonradh agus conarthaí imlonnaithe.

Oibreoidh an blocshlabhra forcaithe ar nós Mainnet agus beidh cuntais aige le staideanna agus iarmhéideanna gaolmhara. Ach ní fheidhmíonn sé ach mar thimpeallacht forbartha áitiúil bosca gainimh, rud a chiallaíonn nach mbeidh ETH fíor ag teastáil uait le haghaidh idirbhearta, mar shampla, agus nach mbeidh tionchar ag d'athruithe ar phrótacal Ethereum fíor.

### Tástáil bunaithe ar airíonna {#property-based-testing-for-smart-contracts}

Is éard atá i gceist le tástáil bunaithe ar mhaoin ná an próiseas chun a sheiceáil go sásaíonn conradh cliste airí áirithe sainithe. Dearbhaíonn airíonna fíricí maidir le hiompar conartha a mheastar a bheidh fíor i gcásanna éagsúla - bheadh “Ní chuireann oibríochtaí uimhríochta sa chonradh thar maoil nó faoi shreabhadh riamh” ina shampla d'airí chonartha cliste.

Is dhá theicníc choitianta iad **anailís statach** agus **anailís dhinimiciúil** chun tástáil bunaithe ar airí a dhéanamh, agus is féidir leis an dá cheann a fhíorú go sásaíonn an cód le haghaidh clár (conradh cliste sa chás seo) roinnt airíonna réamhshainithe. Tagann roinnt uirlisí tástála atá bunaithe ar airí le rialacha réamhshainithe maidir le hairíonna conartha a bhfuiltear ag súil leo agus seiceálann siad an cód i gcoinne na rialacha sin, agus ceadaíonn cinn eile duit airíonna saincheaptha a chruthú le haghaidh conradh cliste.

#### Anailís statach {#static-analysis}

Glacann anailísí statach cód foinseach an chonartha chliste mar ionchur agus aschuireann sé torthaí lena ndearbhaítear an sásaíonn an conradh airí nó nach sásaíonn. Murab ionann agus anailís dhinimiciúil, ní bhaineann anailís statach le conradh a fhorghníomhú chun anailís a dhéanamh air maidir le cruinneas. Ina ionad sin, is cúis le hanailís statach na bealaí uile a d’fhéadfadh conradh cliste a ghabháil le linn é a rith (i.e., trí struchtúr an chóid foinseach a scrúdú chun a chinneadh cad a bheadh ​​i gceist leis d’oibríocht na gconarthaí ag am rite).

[Linting](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important) agus [tástáil statach](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) chun anailís statach ar chonarthaí a rith. Teastaíonn ón dá cheann acu anailís a dhéanamh ar léiriú ísealleibhéil ar rith conartha mar [crainn chomhréire teibí](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) agus [sreabhghraif rialaithe](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) aschur ag an tiomsaitheoir.

I bhformhór na gcásanna, tá anailís statach úsáideach chun saincheisteanna sábháilteachta a bhrath ar nós úsáid a bhaint as tógálacha neamhshábháilte, earráidí comhréire, nó sáruithe ar chaighdeáin códaithe i gcód conarthaí. Mar sin féin, is eol go bhfuil anailíseoirí statacha neamhfhónta go ginearálta maidir le leochaileachtaí níos doimhne a bhrath, agus d'fhéadfadh go gcruthódh siad ró-dearfach bréagach.

#### Anailís dhinimiciúil {#dynamic-analysis}

Gineann anailís dhinimiciúil ionchuir shiombalacha (m.sh., i [forghníomhú siombalach](https://en.m.wikipedia.org/wiki/Symbolic_execution)) nó ionchuir choincréite (m.sh., i [doiléiriú](https://owasp.org/www-community/Fuzzing)) go feidhmeanna conarthaí cliste féachaint an bhfuil aon rith ag sárú rian(eanna) airíonna sonracha. Tá an cineál seo tástála bunaithe ar airí difriúil ó thástálacha aonaid sa mhéid is go gcuimsíonn cásanna tástála cásanna iolracha agus go láimhseálann clár giniúint cásanna tástála.

Is sampla é [Doiléiriú](https://halborn.com/what-is-fuzz-testing-fuzzing/) de theicníc anailíse dhinimiciúil chun airíonna treallacha i gconarthaí cliste a fhíorú. Déanann doiléiriú feidhmeanna a agairt i gconradh sprice le héagsúlachtaí randamacha nó míchumtha de luach ionchuir sainithe. Má théann an conradh cliste i staid earráide (m.sh., staid ina dteipeann ar dhearbhú), cuirtear an fhadhb in iúl agus déantar ionchuir a thiomáineann an rith i dtreo na conaire leochaileacha a tháirgeadh i dtuarascáil.

Tá doiléiriú úsáideach chun meicníocht bhailíochtaithe ionchuir conarthaí cliste a mheas ós rud é go bhféadfadh forghníomhú neamhbheartaithe a bheith mar thoradh ar láimhseáil míchuí ionchuir gan choinne agus éifeachtaí contúirteacha a chruthú. Is féidir an cineál seo tástála bunaithe ar mhaoin a bheith oiriúnach ar go leor cúiseanna:

1. **Tá sé deacair cásanna tástála a scríobh chun go leor cásanna a chlúdach.** Ní éilíonn tástáil airíonna ach iompraíocht agus raon sonraí a shainiú chun an t-iompar a thástáil - gineann an clár cásanna tástála go huathoibríoch atá bunaithe ar an airí sainithe.

2. **Seans nach gclúdaíonn do shraith tástála gach cosán laistigh den chlár a dhóthain.** Fiú le clúdach 100%, is féidir cásanna imeallacha a fhágáil ar lár.

3. **Cruthaíonn tástálacha aonaid go bhfeidhmíonn conradh i gceart le haghaidh sonraí samplacha, ach ní fios cé acu an bhfeidhmíonn an conradh i gceart le haghaidh ionchuir lasmuigh den sampla.** Ritheann tástálacha airí conradh sprice le héagsúlachtaí iolracha a luach ionchuir tugtha chun rianta reatha a aimsiú a chruthaíonn teipeanna dearbhaithe. Mar sin, cuireann tástáil airí ráthaíochtaí breise ar fáil go bhfeidhmíonn conradh i gceart maidir le haicme leathan sonraí ionchuir.

### Treoirlínte maidir le tástáil bunaithe ar airí a rith le haghaidh conarthaí cliste {#running-property-based-tests}

Is gnách go gcuirtear tús le tástáil bunaithe ar airí le sainiú airí (m.sh., easpa [róshreabhadh slánuimhreach](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) nó bailiú airíonna ar mhaith leat a fhíorú i gconradh cliste. Seans go mbeidh ort freisin raon luachanna a shainiú mar ar féidir leis an gclár sonraí a ghiniúint le haghaidh ionchuir idirbhirt agus tástálacha maoine á scríobh.

Nuair a bheidh sé cumraithe i gceart, déanfaidh an uirlis tástála airí do chuid feidhmeanna conarthaí cliste a fhorghníomhú le hionchuir a ghintear go randamach. Má tá aon sáruithe dearbhaithe, ba cheart duit tuarascáil a fháil le sonraí ionchuir nithiúla a sháraíonn an airí atá á mheasúnú. Féach ar chuid de na treoracha thíos chun tús a chur le tástáil bunaithe ar airí a rith le huirlisí éagsúla:

- **[Anailís statach ar chonarthaí cliste le Slither](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither#slither)**
- **[Anailís statach ar chonarthaí cliste le Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Tástáil bunaithe ar airí le Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Conarthaí doiléirithe le Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Conarthaí doiléirithe le Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Conarthaí doiléirithe le Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Forghníomhú siombalach conarthaí cliste le Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Rith siombalach conarthaí cliste le Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Tástáil láimhe le haghaidh conarthaí cliste {#manual-testing-for-smart-contracts}

Is minic a thagann tástáil láimhe ar chonarthaí cliste níos déanaí sa timthriall forbartha tar éis tástálacha uathoibrithe a reáchtáil. Déanann an cineál tástála seo measúnú ar an gconradh cliste mar tháirge lán-chomhtháite amháin féachaint an bhfeidhmíonn sé mar atá sonraithe sna ceanglais theicniúla.

### Conarthaí a thástáil ar blocshlabhra áitiúil {#testing-on-local-blockchain}

Cé gur féidir le tástáil uathoibrithe a dhéantar i dtimpeallacht forbartha áitiúil faisnéis úsáideach dífhabhtaithe a sholáthar, beidh tú ag iarraidh a fháil amach conas a oibríonn do chonradh cliste i dtimpeallacht táirgthe. Mar sin féin, tabhaítear táillí gáis as imscaradh chuig príomhshlabhra Ethereum - gan trácht ar gur féidir leat féin nó d'úsáideoirí fíor-airgead a chailleadh má tá fabhtanna fós ar do chonradh cliste.

Is rogha mhalartach é do chonradh a thástáil ar bhlocshlabhra áitiúil (ar a dtugtar [líonra forbartha](/developers/docs/development-networks/)) ar thástáil ar Mainnet. Is éard atá i blocshlabhra áitiúil ná cóip den blocshlabhra Ethereum a ritheann go háitiúil ar do ríomhaire a ionsamhlaíonn iompar ciseal forghníomhaithe Ethereum. Mar sin, is féidir leat idirbhearta a ríomhchlárú chun idirghníomhú le conradh gan forchostas suntasach a thabhú.

D'fhéadfadh sé a bheith úsáideach conarthaí a reáchtáil ar blocshlabhra áitiúil mar chineál tástála comhtháthaithe láimhe. [Tá conarthaí cliste an-inchumtha](/developers/docs/smart-contracts/composability/), rud a ligeann duit comhtháthú le prótacail atá ann cheana féin - ach beidh ort fós a chinntiú go n-eascróidh na torthaí cearta as idirghníomhaíochtaí casta ar slabhra.

[Tuilleadh faoi líonraí forbartha.](/developers/docs/development-networks/)

### Conarthaí a thástáil ar Líonraí tástála {#testing-contracts-on-testnets}

Oibríonn líonra tástála nó testnet díreach cosúil le Ethereum Mainnet, ach amháin go n-úsáideann sé éitear (ETH) gan aon luach fíordhomhain. Má dhéantar do chonradh a imscaradh ar [Líonra tástála](/developers/docs/networks/#ethereum-testnets) is féidir le haon duine idirghníomhú leis (m.sh., trí aghaidh an dapp) gan cistí a chur i mbaol.

Tá an cineál tástála láimhe seo úsáideach chun sreabhadh d’fheidhmchlár ó cheann go ceann a mheas ó dhearcadh an úsáideora. Anseo, is féidir le tástálaithe béite trialacha a dhéanamh freisin agus aon saincheisteanna a bhaineann le loighic ghnó agus feidhmiúlacht fhoriomlán an chonartha a thuairisciú.

Tá sé iontach imscaradh ar líonra tástála tar éis tástáil a dhéanamh ar blocshlabhra áitiúil ós rud é go bhfuil an chéad cheann níos gaire d'iompar Meaisín Fíorúil Ethereum. Mar sin, tá sé coitianta go leor tionscadail Ethereum-dhúchasacha dapps a imscaradh ar testnets chun oibríocht conarthaí cliste a mheas faoi choinníollacha an domhain fíor.

[Tuilleadh faoi líonraí tástála Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Tástáil vs fíorú foirmiúil {#testing-vs-formal-verification}

Cé go gcuidíonn an tástáil le deimhniú go dtugann conradh na torthaí a bhfuiltear ag súil leo ar ais do roinnt ionchuir sonraí, ní féidir leis a chruthú go cinntitheach an rud céanna maidir le hionchuir nach n-úsáidtear le linn tástálacha. Mar sin, ní féidir "cruinneas feidhmiúil" a ráthú le conradh cliste a thástáil (i.e. ní féidir a thaispeáint go n-iompraíonn ríomhchlár mar is gá do _gach tacar_ de luachanna ionchuir).

Is éard atá i bhfíorú foirmiúil ná cur chuige chun cruinneas bogearraí a mheas trí sheiceáil an bhfuil samhail fhoirmiúil den chlár ag teacht leis an tsonraíocht fhoirmiúil. Is ionann samhail fhoirmiúil agus léiriú teibí matamaitice ar chlár, agus sainmhíníonn sonraíocht fhoirmiúil airíonna cláir (i.e. dearbhuithe loighciúla faoi fheidhmiú an chláir).

Toisc go bhfuil airíonna scríofa i dtéarmaí matamaitice, is féidir a fhíorú go sásaíonn samhail fhoirmiúil (matamaiticiúil) den chóras sonraíocht agus úsáid á baint as rialacha loighciúla tátail. Mar sin, deirtear go dtugann uirlisí fíoraithe foirmiúla ‘cruthúnas matamaitice’ ar chruinneas córais.

Murab ionann agus an tástáil, is féidir fíorú foirmiúil a úsáid chun a fhíorú go sásaíonn rith conarthaí cliste sonraíocht fhoirmiúil do _gach_ rith (i.e., níl aon fhabhtanna ann) gan gá a fhorghníomhú le sampla sonraí. Ní hamháin go laghdaítear an t-am a chaitear ar an iliomad tástálacha aonaid a rith, ach tá sé níos éifeachtaí freisin chun teacht ar leochaileachtaí ceilte. É sin ráite, luíonn teicnící foirmiúla fíoraithe ar speictream ag brath ar a ndeacracht le cur i bhfeidhm agus a n-úsáideacht.

[Tuilleadh faoi fhíorú foirmiúil do chonarthaí cliste.](/developers/docs/smart-contracts/formal-verification)

## Tástáil vs iniúchtaí agus deolchairí fabhtanna {#testing-vs-audits-bug-bounties}

Mar a luadh, is annamh a d’fhéadfadh tástáil dhian a ráthú nach mbíonn fabhtanna i gconradh; féadann cur chuige foirmiúla fíoraithe cinnteacht níos láidre a thabhairt maidir le cirte ach is deacair iad a úsáid faoi láthair agus tabhaítear costais shuntasacha orthu.

Fós féin, is féidir leat féidearthacht leochaileachtaí conartha a ghabháil a mhéadú trí athbhreithniú cóid neamhspleách a fháil. [Iniúchtaí conartha cliste](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) agus [deolchairí fabhtanna](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7): dhá bhealach chun daoine eile a spreagadh chun anailís a dhéanamh ar do chonarthaí.

Déanann iniúchóirí a bhfuil taithí acu ar chásanna lochtanna slándála agus deoch-chleachtais forbartha i gconarthaí cliste iniúchtaí. Áireofar le hiniúchadh tástáil (agus b’fhéidir fíorú foirmiúil) chomh maith le hathbhreithniú láimhe ar an mbunachar cód iomlán.

Os a choinne sin, is iondúil go mbíonn luach saothair airgeadais á thairiscint do dhuine aonair i gclár deolchaire fabhtanna (ar a dtugtar [haiceálaithe hata bána](https://en.wikipedia.org/wiki/White_hat_(computer_security))) a aimsíonn leochaileacht i gconradh cliste agus nochtann d’fhorbróirí iad. Tá deolchairí fabhtanna cosúil le hiniúchtaí ós rud é go mbaineann sé le iarraidh ar dhaoine eile cabhrú le lochtanna i gconarthaí cliste a aimsiú.

Is é an difríocht mhór ná go bhfuil cláir deolchaire fabhtanna oscailte don phobal forbróra/haiceálaithe níos leithne agus go meallann siad aicme leathan haiceálaithe eiticiúla agus gairmithe slándála neamhspleácha a bhfuil scileanna agus taithí uathúla acu. D’fhéadfadh sé seo a bheith ina bhuntáiste seachas iniúchtaí cliste conartha a bhíonn ag brath go príomha ar fhoirne a bhféadfadh saineolas teoranta nó cúng a bheith acu.

## Uirlisí tástála agus leabharlanna {#testing-tools-and-libraries}

### Uirlisí tástála aonad {#unit-testing-tools}

- **[cumhdach-daingne](https://github.com/sc-forks/solidity-coverage)** - _Uirlis cumhdaigh cód le haghaidh conarthaí cliste scríofa i Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Creat um fhorbairt agus tástáil ardchonarthaí cliste (bunaithe ar ethers.js)_.

- **[Tástálacha Remix](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Uirlis chun conarthaí cliste Solidity a thástáil. Oibríonn sé faoin mbreiseán "Tástáil Aonaid Solidity" Remix IDE a úsáidtear chun cásanna tástála ar chonradh a scríobh agus a rith._

- **[Cúntóirí Tástála OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _ Leabharlann dearbhaithe le haghaidh tástála conarthaí cliste Ethereum. Cinntigh go n-iompraíonn do chonarthaí mar a bhíothas ag súil leis!_

- **[Creat tástála aonaid Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**- _Úsáideann Brownie Pytest, creat tástála atá saibhir i ngnéithe a ligeann duit tástálacha beaga a scríobh le híosmhéid cód, a scálaíonn go maith do thionscadail mhóra, agus atá an-insínte._

- **[Tástálacha Foundry](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** -_ Tairgeann Foundry Forge, creat tástála Ethereum tapa agus solúbtha atá in ann tástálacha aonaid simplí, seiceálacha barrfheabhsaithe gáis, agus doiléiriú conartha a dhéanamh._

- **[Tástálacha Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Creat chun conarthaí cliste a thástáil bunaithe ar ethers.js, Mocha, agus Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Creat forbartha agus tástála bunaithe ar Python le haghaidh conarthaí cliste a dhíríonn ar Mheaisín Fíorúil Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Creat bunaithe ar Python le haghaidh tástála aonaid agus doiléiriú le cumais dhífhabhtaithe láidre agus tacaíocht tástála tras-slabhra, ag baint úsáide as pytest agus Anvil le haghaidh taithí agus feidhmíocht úsáideora is fearr._

### Uirlisí tástála airíonna-bhunaithe {#property-based-testing-tools}

#### Uirlisí anailíse statacha {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Python- bunaithe ar chreat anailíse statach Solidity chun leochaileachtaí a aimsiú, tuiscint cóid a fheabhsú, agus anailísí saincheaptha a scríobh do chonarthaí cliste._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _>Linter chun dea-chleachtais stíle agus slándála a fhorfheidhmiú don teanga ríomhchláraithe um chonarthaí cliste Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Anailíseoir statach Rust-bhunaithe, deartha go sonrach le haghaidh slándála agus forbairt conartha cliste Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Creat anailíse statach bunaithe ar Python le brathadóirí leochaileachta agus cáilíochta cód, printéirí chun faisnéis úsáideach a bhaint as an gcód agus tacaíocht chun fomhodúil saincheaptha a scríobh._

#### Uirlisí anailíse dinimiciúla {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Doiléiriú mear conartha chun leochaileachtaí i gconarthaí cliste a bhrath trí thástáil bunaithe ar airíonna._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _ Uirlis doiléirithe uathoibrithe atá úsáideach chun sáruithe airíonna i gcód conartha cliste a bhrath._

- **[>Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Creat feidhmithe siombalach dinimiciúil chun anailís a dhéanamh ar bheartchód EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _ Uirlis measúnaithe beartchóid EVM chun leochaileachtaí conartha a bhrath trí úsáid a bhaint as anailís smáil, anailís choncólach, agus seiceáil sreafa rialaithe._

- **[Scriobláil Díchill](https://consensys.net/diligence/scribble/)** - _ Is uirlis fíoraithe teanga sonraíochta agus ama rite é Scribble a ligeann duit conarthaí cliste a bhfuil airíonna acu a anótáil a ligeann duit na conarthaí a thástáil go huathoibríoch le huirlisí ar nós Diligence Fuzzing nó MythX._

## Ranganna teagaisc a bhaineann leo {#related-tutorials}

- [Forbhreathnú agus comparáid idir táirgí tástála éagsúla](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Conas Echidna a úsáid chun conarthaí cliste a thástáil](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Conas Manticore a úsáid chun fabhtanna conartha cliste a aimsiú](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Conas Slither a úsáid chun fabhtanna conartha cliste a aimsiú](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Conas conarthaí Dlúthpháirtíochta a bhréagnú le haghaidh tástála](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Conas tástálacha aonaid a rith i Solidity ag baint úsáide as Teilgcheárta](https://www.rareskills.io/post/foundry-testing-solidity)

## Tuilleadh léitheoireachta {#further-reading}

- [Treoir dhomhain maidir le conarthaí cliste Ethereum a thástáil](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Conas conarthaí cliste Ethereum a thástáil](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Treoir tástála aonaid MolochDAO d’fhorbróirí](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Conas conarthaí cliste cosúil le rockstar a thástáil](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
