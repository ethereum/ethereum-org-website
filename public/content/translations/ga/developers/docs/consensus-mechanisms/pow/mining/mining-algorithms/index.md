---
title: Algartaim mianadóireachta
description: Súil mhionsonraithe ar na halgartaim a úsáidtear do mhianadóireacht Ethereum.
lang: ga
---

<Alert variant="update">
<AlertEmoji text=":wave:" />
<AlertContent>
<AlertDescription>
Níl cruthúnas-oibre mar bhunús le meicníocht chomhdhearcaidh Ethereum a thuilleadh, rud a chiallaíonn go bhfuil an mhianadóireacht múchta. Ina áit sin, tá Ethereum urraithe ag bailíochtóirí a bhfuil ETH i ngeall acu. Is féidir leat tosú ag geallchur do chuid ETH inniu. Léigh tuilleadh ar <a href='/roadmap/merge/'>An Cumasc</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>cruthúnas-gill</a>, agus <a href='/staking/'>geallchur</a>. Leathanach le spéis stairiúil é seo.
</AlertDescription>
</AlertContent>
</Alert>

Bhain mianadóireacht Ethereum úsáid as algartam ar a dtugtar Ethash. Is é bun-smaoineamh an algartam go ndéanann mianadóir iarracht ionchur nonce a aimsiú trí úsáid a bhaint as ríomh lántrialach ionas go mbeidh an hais a eascraíonn as níos lú ná an tairseach a chinneann an deacracht ríofa. Is féidir an leibhéal deacrachta seo a choigeartú go dinimiciúil, rud a fhágann gur féidir bloctháirgeadh a dhéanamh go tráthrialta.

## Réamhriachtanais {#prerequisites}

Chun an leathanach seo a thuiscint níos fearr, molaimid duit léamh ar dtús faoi [chomhdhearcadh cruthúnas-oibre](/developers/docs/consensus-mechanisms/pow) agus [mianadóireacht](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Ba algartam taighde réamhtheachtaithe é Dagger Hashimoto do mhianadóireacht Ethereum a tháinig in ionad Ethash. Cónascadh a bhí ann de dhá algartam éagsúla: Dagger agus Hashimoto. Ní raibh ann riamh ach cur i bhfeidhm taighde agus tháinig Ethash ina ionad faoin am a seoladh Ethereum Mainnet.

Baineann [Dagger](http://www.hashcash.org/papers/dagger.html) le giniúint [>Graf Neamhchioglach Dírithe](https://en.wikipedia.org/wiki/Directed_acyclic_graph), a ndéantar slisní randamacha de a ghreamú le chéile. Is é an bunphrionsabal ná nach n-éilíonn gach nonce ach cuid bheag de chrann mór sonraí iomlán. Tá sé ródhaor don mhianadóireacht an fochrainn a athríomh do gach nonce - mar sin is gá an crann a stóráil - ach tá ceart go leor le haghaidh fíorú aonuaire. Ceapadh Dagger mar mhalairt ar algartaim atá ann cheana féin cosúil le Scrypt, atá crua ar chuimhne ach deacair a fhíorú nuair a mhéadaíonn a gcruas chuimhne go leibhéil atá slán i ndáiríre. Mar sin féin, bhí Dagger i mbaol luasghéarú crua-earraí cuimhne roinnte agus thit sé i bhfabhar bealaí eile taighde.

Is algartam é [Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) a chuireann friotaíocht ASIC leis trí bheith faoi cheangal I/O (i.e. léann an chuimhne an fachtóir teorannaithe sa phróiseas mianadóireachta). Is é an teoiric go bhfuil RAM ar fáil níos mó ná ríomh; tá imscrúdú déanta cheana ar RAM a bharrfheabhsú do chásanna úsáide éagsúla ar chostas na mbilliún dollar de thaighde, a mbíonn patrúin rochtana gar-randamach i gceist leo go minic (mar sin “cuimhne rochtana randamach”). Mar thoradh air sin, is dócha go mbeidh an RAM atá ann cheana féin measartha gar don bharrmhaith chun an algartam a mheas. Úsáideann Hashimoto an blocshlabhra mar fhoinse sonraí, ag sásamh (1) agus (3) thuas ag an am céanna.

D'úsáid Dagger-Hashimoto leaganacha leasaithe de na halgartaim Dagger agus Hashimoto. Is é an difríocht idir Dagger Hashimoto agus Hashimoto ná, in ionad an blocshlabhra a úsáid mar fhoinse sonraí, úsáideann Dagger Hashimoto tacar sonraí saincheaptha-ghinte, a thugann cothrom le dáta bunaithe ar shonraí bloc gach N bloic. Gintear an tacar sonraí trí úsáid a bhaint as algartam Dagger, a cheadaíonn fo-thacar a bhaineann go sonrach le gach nonce don algartam fíoraithe cliant éadrom a ríomh go héifeachtach. Is é an difríocht idir Dagger Hashimoto agus Dagger ná, murab ionann agus an Dagger bunaidh, go bhfuil an tacar sonraí a úsáidtear chun an bloc a fhiosrú leathbhuan, agus nach ndéantar é a nuashonrú ach ó am go ham (m.sh. uair sa tseachtain). Ciallaíonn sé seo go bhfuil an chuid den iarracht chun an tacar sonraí a ghiniúint gar do nialas, agus mar sin bíonn argóintí Sergio Lerner maidir le luasanna cuimhne roinnte diomaibhseach.

Tuilleadh ar[Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ba é Ethash an t-algartam mianadóireachta a úsáideadh i ndáiríre ar an Ethereum Mainnet fíor faoin ailtireacht cruthúnas-oibre atá dímheasta anois. Ba ainm nua é Ethash i ndáiríre a tugadh ar leagan sonrach de Dagger-Hashimoto tar éis don algartam nuashonrú suntasach a fháil, agus bunphrionsabail a réamhtheachtaí fós aige le hoidhreacht. Níor úsáideadh ach Ethash riamh ar Ethereum Mainnet – leagan T&F den algartam mianadóireachta ab ea Dagger Hashimoto, a cuireadh as feidhm sula raibh mianadóireacht tosaithe ar Ethereum Mainnet.

[Tuilleadh ar Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Tuilleadh léitheoireachta {#further-reading}

_Ar eolas agat ar acmhainn pobail a chabhraigh leat? Cuir an leathanach seo in eagar agus cuir leis!_
