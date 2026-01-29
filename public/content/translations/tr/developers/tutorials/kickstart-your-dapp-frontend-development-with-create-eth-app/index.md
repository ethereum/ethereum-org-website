---
title: "create-eth-app ile dapp ön uç geliştirmenizi başlatın"
description: "Create-eth-app ve özelliklerinin nasıl kullanılacağına genel bakış"
author: "Markus Waas"
tags:
  [
    "ön uç",
    "javascript",
    "ethers.js",
    "the graph",
    "defi"
  ]
skill: beginner
lang: tr
published: 27.04.2020
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Geçen sefer [Solidity'nin genel resmine](https://soliditydeveloper.com/solidity-overview-2020) göz atmış ve [create-eth-app]'ten (https://github.com/PaulRBerg/create-eth-app) zaten bahsetmiştik. Şimdi onu nasıl kullanacağınızı, hangi özelliklerin entegre olduğunu ve nasıl genişleteceğinize dair ek fikirleri öğreneceksiniz. [Sablier](http://sablier.com/)'in kurucusu Paul Razvan Berg tarafından başlatılan bu uygulama, ön uç geliştirmenizi başlatacak ve aralarından seçim yapabileceğiniz çeşitli isteğe bağlı entegrasyonlarla birlikte gelir.

## Kurulum {#installation}

Kurulum için Yarn 0.25 veya üzeri gereklidir (`npm install yarn --global`). Şunları çalıştırmak kadar basittir:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Arka planda [create-react-app](https://github.com/facebook/create-react-app) kullanır. Uygulamanızı görmek için `http://localhost:3000/` adresini açın. Üretime dağıtmaya hazır olduğunuzda, `yarn build` ile küçültülmüş bir paket oluşturun. Bunu barındırmanın kolay bir yolu [Netlify](https://www.netlify.com/)'dır. Bir GitHub deposu oluşturabilir, onu Netlify'a ekleyebilir, derleme komutunu ayarlayabilir ve işlem tamamdır! Uygulamanız barındırılacak ve herkes tarafından kullanılabilir olacak. Ve hepsi ücretsiz.

## Özellikler {#features}

### React ve create-react-app {#react--create-react-app}

Öncelikle uygulamanın kalbi: React ve _create-react-app_ ile gelen tüm ek özellikler. Sadece bunu kullanmak, Ethereum'u entegre etmek istemiyorsanız harika bir seçenektir. [React](https://react.dev/) kendi başına etkileşimli kullanıcı arayüzleri oluşturmayı gerçekten kolaylaştırır. [Vue](https://vuejs.org/) kadar başlangıç seviyesine uygun olmayabilir, ancak yine de çoğunlukla kullanılır, daha fazla özelliğe sahiptir ve en önemlisi aralarından seçim yapabileceğiniz binlerce ek kütüphanesi vardır. _create-react-app_ ile başlamak da gerçekten çok kolaydır ve şunları içerir:

- React, JSX, ES6, TypeScript, Flow söz dizimi desteği.
- Nesne yayma operatörü gibi ES6'nın ötesinde dil ekstraları.
- Otomatik olarak ön eklenen CSS, bu nedenle `-webkit-` veya diğer ön eklere ihtiyacınız olmaz.
- Kapsam raporlaması için yerleşik desteğe sahip hızlı etkileşimli birim test çalıştırıcısı.
- Yaygın hatalar hakkında uyaran canlı bir geliştirme sunucusu.
- Hash değerleri ve kaynak haritaları içeren, üretim için JS, CSS ve görüntüleri bir araya getirmeye yarayan bir derleme komut dosyası.

Özellikle _create-eth-app_ yeni [hook etkilerinden](https://legacy.reactjs.org/docs/hooks-effect.html) yararlanır. Güçlü, ancak çok küçük sözde fonksiyonel bileşenler yazmak için bir yöntem. _create-eth-app_ içinde nasıl kullanıldıklarını görmek için Apollo ile ilgili aşağıdaki bölüme bakın.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) birden fazla pakete sahip olmanıza olanak tanır, ancak hepsini kök klasörden yönetebilir ve `yarn install` kullanarak tüm bağımlılıkları tek seferde kurabilirsiniz. Bu, özellikle `create-eth-app`'in bir parçası olan, akıllı sözleşme adresleri/ABI yönetimi (hangi akıllı sözleşmeleri nereye dağıttığınız ve onlarla nasıl iletişim kuracağınız hakkındaki bilgiler) veya grafik entegrasyonu gibi daha küçük ek paketler için mantıklıdır.

### ethers.js {#ethersjs}

[Web3](https://docs.web3js.org/) hala çoğunlukla kullanılıyor olsa da, [ethers.js](https://docs.ethers.io/) son bir yılda bir alternatif olarak çok daha fazla ilgi gördü ve _create-eth-app_'e entegre edilen kütüphanedir. Bununla çalışabilir, Web3'e geçebilir veya neredeyse beta sürümünden çıkmış olan [ethers.js v5](https://docs.ethers.org/v5/)'e yükseltmeyi düşünebilirsiniz.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/), bir [Restful API](https://restfulapi.net/) ile karşılaştırıldığında verileri işlemek için alternatif bir yoldur. Özellikle merkeziyetsiz blokzincir verileri için Restful API'lere göre çeşitli avantajları vardır. Bunun arkasındaki mantığı merak ediyorsanız, [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a) makalesine göz atın.

Genellikle akıllı sözleşmenizden doğrudan veri alırsınız. En son işlemin gerçekleştiği zamanı okumak mı istiyorsunuz? Bir Ethereum düğümünden merkeziyetsiz uygulamanıza veri çeken `MyContract.methods.latestTradeTime().call()` fonksiyonunu çağırmanız yeterlidir. Peki ya yüzlerce farklı veri noktasına ihtiyacınız varsa? Bu durum, düğüme yüzlerce veri getirilmesine neden olur ve her seferinde bir [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) gerektirerek merkeziyetsiz uygulamanızı yavaş ve verimsiz hale getirir. Bir geçici çözüm, sözleşmenizin içinde aynı anda birden çok veri döndüren bir alıcı çağrı işlevi olabilir. Ancak bu her zaman ideal değildir.

Tarihsel verilerle de ilgileniyor olabilirsiniz. Yalnızca son işlem zamanını değil, kendi yaptığınız tüm işlemlerin zamanlarını da bilmek istiyorsunuz. _create-eth-app_ subgraph paketini kullanın, [dokümanları](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) okuyun ve kendi sözleşmelerinize uyarlayın. Popüler akıllı sözleşmeler arıyorsanız, zaten bir alt grafik bile olabilir. [Subgraph explorer](https://thegraph.com/explorer/)'a göz atın.

Bir alt grafiğiniz olduğunda, bu, ihtiyacınız olan geçmiş veriler de dahil olmak üzere tüm önemli blokzincir verilerini alan merkeziyetsiz uygulamanıza basit bir sorgu yazmanıza olanak tanır; bunun için yalnızca tek bir getirme işlemi gerekir.

### Apollo {#apollo}

[Apollo Boost](https://www.apollographql.com/docs/react/get-started/) entegrasyonu sayesinde grafiği React merkeziyetsiz uygulamanıza kolayca entegre edebilirsiniz. Özellikle [React hook'larını ve Apollo'yu](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) kullanırken, veri getirmek bileşeninize tek bir GraphQL sorgusu yazmak kadar basittir:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Şablonlar {#templates}

Ayrıca birkaç farklı şablon arasından seçim yapabilirsiniz. Şu ana kadar bir Aave, Compound, Uniswap veya Sablier entegrasyonu kullanabilirsiniz. Hepsi, önceden yapılmış alt grafik entegrasyonlarının yanı sıra önemli hizmet akıllı sözleşme adresleri ekler. Şablonu oluşturma komutuna `yarn create eth-app my-eth-app --with-template aave` gibi eklemeniz yeterlidir.

### Aave {#aave}

[Aave](https://aave.com/) merkeziyetsiz bir para borç verme piyasasıdır. Mevduat sahipleri pasif bir gelir elde etmek için piyasaya likidite sağlarken, borçlular teminat kullanarak borç alabilirler. Aave'nin benzersiz özelliklerinden biri, krediyi tek bir işlem içinde iade ettiğiniz sürece, herhangi bir teminat olmadan borç para almanıza olanak tanıyan [hızlı kredilerdir](https://aave.com/docs/developers/flash-loans). Bu, örneğin arbitraj ticaretinde size ekstra nakit vermek için faydalı olabilir.

Size faiz kazandıran işlem görmüş token'lara _aTokens_ denir.

_create-eth-app_ ile Aave'yi entegre etmeyi seçtiğinizde, bir [subgraph entegrasyonu](https://docs.aave.com/developers/getting-started/using-graphql) elde edersiniz. Aave, The Graph'i kullanır ve size [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) ve [Ana Ağ](https://thegraph.com/explorer/subgraph/aave/protocol) üzerinde [ham](https://thegraph.com/explorer/subgraph/aave/protocol-raw) veya [biçimlendirilmiş](https://thegraph.com/explorer/subgraph/aave/protocol) biçimde kullanıma hazır birkaç alt grafik sunar.

![Aave Hızlı Kredi mem'i – "Evet, hızlı kredimi 1 işlemden daha uzun süre tutabilseydim, harika olurdu"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/), Aave'ye benzer. Entegrasyon, yeni [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)'ı zaten içeriyor. Burada faiz kazandıran token'lara şaşırtıcı bir şekilde _cTokens_ denir.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) merkeziyetsiz bir borsadır (DEX). Likidite sağlayıcıları, bir işlemin her iki tarafı için gerekli token'ları veya ether'i sağlayarak ücret kazanabilir. Yaygın olarak kullanılır ve bu nedenle çok çeşitli token'lar için en yüksek likiditelerden birine sahiptir. Örneğin, kullanıcıların ETH'lerini DAI ile takas etmelerine olanak tanımak için merkeziyetsiz uygulamanıza kolayca entegre edebilirsiniz.

Ne yazık ki, bu yazı yazıldığı sırada entegrasyon yalnızca Uniswap v1 içindir, [yeni çıkan v2](https://uniswap.org/blog/uniswap-v2/) için değildir.

### Sablier {#sablier}

[Sablier](https://sablier.com/) kullanıcılara sürekli para ödemesi yapma olanağı tanır. Tek bir ödeme günü yerine, ilk kurulumdan sonra başka bir işleme gerek kalmadan paranızı sürekli olarak alırsınız. Entegrasyon, [kendi alt grafiğini](https://thegraph.com/explorer/subgraph/sablierhq/sablier) içerir.

## Sırada ne var? {#whats-next}

_create-eth-app_ hakkında sorularınız varsa, _create-eth-app_ yazarlarıyla iletişime geçebileceğiniz [Sablier topluluk sunucusuna](https://discord.gg/bsS8T47) gidin. Bir sonraki adım olarak [Material UI](https://mui.com/material-ui/) gibi bir kullanıcı arayüzü (UI) çerçevesi entegre edebilir, gerçekten ihtiyacınız olan veriler için GraphQL sorguları yazabilir ve dağıtımı kurabilirsiniz.
