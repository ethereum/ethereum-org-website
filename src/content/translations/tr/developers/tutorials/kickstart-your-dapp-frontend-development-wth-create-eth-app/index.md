---
title: create-eth-app ile dapp ön uç geliştirmenizi başlatın
description: Create-eth-app ve özelliklerinin nasıl kullanılacağına genel bakış
author: "Markus Waas"
tags:
  - "create-eth-app"
  - "ön uç"
  - "javascript"
  - "ethers.js"
  - "the graph"
  - "aave"
  - "compound"
  - "uniswap"
  - "sablier"
skill: beginner
lang: tr
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Geçen sefer [Solidity'nin büyük resmine baktık ve](https://soliditydeveloper.com/solidity-overview-2020) hâlihazırda [create-eth-app](https://github.com/PaulRBerg/create-eth-app)'den bahsettik. Şimdi onu nasıl kullanacağınızı, hangi özelliklerin entegre olduğunu ve nasıl genişleteceğinize dair ek fikirleri öğreneceksiniz. [Sablier](http://sablier.finance/)'in kurucusu Paul Razvan Berg tarafından başlatılan bu uygulama, ön uç geliştirmenizi başlatacak ve beraberinde aralarından seçim yapabileceğiniz çeşitli isteğe bağlı entegrasyonlar getiriyor.

## Kurulum {#installation}

Kurulum için Yarn 0.25 veya üstü gerekir (`npm install thread --global`). Şunları çalıştırmak kadar kolaydır:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Perde arkasında [create-react-app](https://github.com/facebook/create-react-app) kullanır. Uygulamanızı görmek için, `http://localhost:3000/` bağlantısını açın. Üretime dağıtmaya hazır olduğunuzda, yarn build ile küçültülmüş bir paket oluşturun. Bunu sunmanın kolay yollarından biri [Netlify](https://www.netlify.com/)'dır. Bir GitHub deposu oluşturmanız, Netlify'a eklemeniz ve build komutunu kurmanız yeterli olur! Uygulamanız barındırılacak ve herkes tarafından kullanılabilir olacak. Ve hepsi ücretsiz.

## Özellikler {#features}

### React ve create-react-app {#react--create-react-app}

Öncelikle uygulamanın kalbi: React ve _create-react-app_ ile gelen tüm ek özellikler. Sadece bunu kullanmak, Ethereum'u entegre etmek istemiyorsanız harika bir seçenektir. [React](https://reactjs.org/) kendi başına interaktif UI'lar yapmayı gerçekten kolaylaştırır. [Vue](https://vuejs.org/) kadar yeni başlayanlar için uygun olmayabilir, ancak yine de çoğunlukla kullanılmaktadır, daha fazla özelliğe sahiptir ve en önemlisi aralarından seçim yapabileceğiniz binlerce ek kütüphane vardır. _create-react-app_, onunla başlamayı gerçekten kolaylaştırır ve şunları içerir:

- React, JSX, ES6, TypeScript, Flow söz dizimi desteği.
- Nesne yayma operatörü gibi ES6'nın ötesinde dil ekstraları.
- Autoprefixer CSS, yani -webkit- veya diğer ön eklere ihtiyacınız yok.
- Kapsam raporlaması için yerleşik desteğe sahip hızlı etkileşimli birim test çalıştırıcısı.
- Yaygın hatalar hakkında uyaran canlı bir geliştirme sunucusu.
- Hash değerleri ve kaynak haritaları içeren, üretim için JS, CSS ve görüntüleri bir araya getirmeye yarayan bir derleme komut dosyası.

Özellikle _create-eth-app_, yeni [kanca efektlerini](https://reactjs.org/docs/hooks-effect.html) kullanır. Güçlü, ancak çok küçük sözde fonksiyonel bileşenler yazmak için bir yöntem. _create-eth-app_'de nasıl kullanıldığını öğrenmek için aşağıdaki Apollo hakkındaki bölüme bakın.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/), birden çok pakete sahip olmanızın yanı sıra kök klasörden hepsini aynı anda `yarn install` kullanarak yönetmenize izin verir. Bu, özellikle her ikisi de `create-eth-app`'in bir parçası olan akıllı sözleşme adresleri/ABI yönetimi (hangi akıllı sözleşmeleri nereye yerleştirdiğiniz ve bunlarla nasıl iletişim kuracağınızla ilgili bilgiler) veya grafik entegrasyonu gibi daha küçük ek paketler için mantıklıdır.

### ethers.js {#ethersjs}

[Web3](https://web3js.readthedocs.io/en/v1.2.7/) hâlâ çoğunlukla kullanılıyor olsa da, [ethers.js](https://docs.ethers.io/) son yıl içinde bir alternatif olarak büyük bir ivme kazanmıştır ve _create-eth-app_ içine entegre edilmiştir. Bununla çalışabilir, onu Web3 olarak değiştirebilir veya neredeyse beta sürümünden çıkmış olan [ethers.js v5](https://docs-beta.ethers.io/)'e yükseltmeyi düşünebilirsiniz.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/), [Restful API](https://restfulapi.net/)'ye kıyasla verileri işlemenin alternatif bir yoludur. Özellikle merkeziyetsiz blok zinciri verileri için Restful Api'lere göre çeşitli avantajları vardır. Eğer bunun ardındaki sebepler konusunda meraklıysanız, [GraphQL Merkeziyetsiz Ağı Güçlendirecek](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)'e bir göz atın.

Genellikle akıllı sözleşmenizden doğrudan veri alırsınız. En son işlemin gerçekleştiği zamanı okumak mı istiyorsunuz? Verileri Infura gibi bir Ethereum düğümünden Dapp'inize getiren `MyContract.methods.latestTradeTime().call()`'u çağırmanız yeterlidir. Peki ya yüzlerce farklı veri noktasına ihtiyacınız varsa? Bu, düğüme yüzlerce veri alınmasına yol açar ve bu alımların her biri bir [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) gerektirerek Dapp'inizi yavaş ve verimsiz hâle getirir. Bir geçici çözüm, sözleşmenizin içinde aynı anda birden çok veri döndüren bir alıcı çağrı işlevi olabilir. Ancak bu her zaman ideal değildir.

Tarihsel verilerle de ilgileniyor olabilirsiniz. Yalnızca son işlem zamanını değil, kendi yaptığınız tüm işlemlerin zamanlarını da bilmek istiyorsunuz. _create-eth-app_ alt grafik paketini kullanın, [belgeleri](https://thegraph.com/docs/define-a-subgraph) okuyun ve kendi sözleşmelerinize uyarlayın. Popüler akıllı sözleşmeler arıyorsanız, zaten bir alt grafik bile olabilir. [Alt grafik gezgini](https://thegraph.com/explorer/)'ne bir göz atın.

Bir alt grafiğiniz olduğunda, ihtiyacınız olan geçmiş veriler de dahil olmak üzere tüm önemli blok zinciri verilerini alan Dapp'inize basit bir sorgu yazmanıza olanak tanır, yalnızca tek bir getirme gerekir.

### Apollo {#apollo}

[Apollo Boost](https://www.apollographql.com/docs/react/get-started/) entegrasyonu sayesinde grafiği React Dapp'inizde kolayca entegre edebilirsiniz. Özellikle [React hooks ve Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks-676d116eeae2) kullanılırken, verileri almak, bileşeninize tek bir GraphQl sorgusu yazmak kadar basittir:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Şablonlar {#templates}

Üstte birkaç farklı şablon arasından seçim yapabilirsiniz. Bir Aave, Compound, UniSwap veya sablier entegrasyonu kullanabilirsiniz. Hepsi, önceden yapılmış alt grafik entegrasyonlarının yanı sıra önemli hizmet akıllı sözleşme adresleri ekler. Şablonu, oluşturma komutuna `yarn create eth-app my-eth-app --with-template aave` şeklinde eklemeniz yeterlidir.

### Aave {#aave}

[Aave](https://aave.com/) merkeziyetsiz bir borç verme piyasasıdır. Mevduat sahipleri pasif bir gelir elde etmek için piyasaya likidite sağlarken, borçlular teminat kullanarak borç alabilirler. Aave'nin benzersiz bir özelliği, krediyi tek işlemde iade ettiğiniz sürece herhangi bir teminat olmadan borç para almanıza olanak tanıyan [hızlı kredilerdir](https://docs.aave.com/developers/guides/flash-loans). Bu, örneğin arbitraj ticaretinde size ekstra nakit vermek için faydalı olabilir.

Size faiz kazandıran takas edilmiş token'lara _aTokens_ denir.

Aave'yi _create-eth-app_ ile entegre etmek istediğinizde, bir [alt grafik entegrasyonu](https://docs.aave.com/developers/getting-started/using-graphql) alacaksınız. Aave, The Graph'i kullanır ve size [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) ve [Mainnet'te](https://thegraph.com/explorer/subgraph/aave/protocol) [saf](https://thegraph.com/explorer/subgraph/aave/protocol-raw) veya [formatlanmış](https://thegraph.com/explorer/subgraph/aave/protocol) olarak birkaç kullanıma hazır alt grafik sağlar.

![Aave Hızlı Kredi meme'i - "Şey, hızlı kredimi 1 işlemden daha uzun süre tutabilseydim, bu müthiş olurdu"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/), Aave'ye benzer. Bu entegrasyon hâlihazırda yeni [Compound v2 Alt Grafiğini](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) kapsar. Burada faiz kazandıran token'lara şaşırtıcı bir şekilde _cTokens_ denir.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/), merkeziyetsiz bir borsadır (DEX). Likidite sağlayıcıları, bir ticaretin her iki tarafı için gerekli token'ları veya ether'ı sağlayarak ücret kazanabilir. Yaygın olarak kullanılır ve bu nedenle çok çeşitli token'lar için en yüksek likiditelerden birine sahiptir. Örneğin, kullanıcıların ETH'lerini DAI ile değiştirmelerine izin vermek için Dapp'inize kolayca entegre edebilirsiniz.

Ne yazık ki, bu yazının yazıldığı sırada entegrasyon yalnızca Uniswap v1 içindir ve [yeni yayınlanan v2](https://uniswap.org/blog/uniswap-v2/) için değildir.

### Sablier {#sablier}

[Sablier](https://sablier.finance/), kullanıcıların para ödemeleri akışına izin verir. Tek bir ödeme günü yerine, ilk kurulumdan sonra başka bir yönetim olmaksızın paranızı sürekli olarak alırsınız. Bu entegrasyon [kendi alt grafiğini](https://thegraph.com/explorer/subgraph/sablierhq/sablier) içerir.

## Sırada ne var? {#whats-next}

_create-eth-app_ hakkında sorularınız varsa, _create-eth-app_'in yazarlarıyla iletişim kurabileceğiniz [Sablier topluluk sunucusuna](https://discord.gg/bsS8T47) gidebilirsiniz. Bir sonraki adım olarak [Material UI](https://material-ui.com/) gibi bir UI çerçevesini entegre edebilir, ihtiyacınız olan veriler için GraphQL sorguları yazabilir ve dağıtımı kurabilirsiniz.
