---
title: "create-eth-app ile dapp ön yüz geliştirmenize hızlı bir başlangıç yapın"
description: "create-eth-app'in nasıl kullanılacağına ve özelliklerine genel bir bakış"
author: "Markus Waas"
tags:
  ["ön yüz", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: tr
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Geçen sefer [Solidity'nin genel görünümüne](https://soliditydeveloper.com/solidity-overview-2020) bakmış ve [create-eth-app](https://github.com/PaulRBerg/create-eth-app)'ten bahsetmiştik. Şimdi onu nasıl kullanacağınızı, hangi özelliklerin entegre edildiğini ve onu nasıl genişletebileceğinize dair ek fikirleri öğreneceksiniz. [Sablier](https://sablier.com/)'in kurucusu Paul Razvan Berg tarafından başlatılan bu uygulama, ön yüz geliştirmenize hızlı bir başlangıç yapmanızı sağlayacak ve aralarından seçim yapabileceğiniz çeşitli isteğe bağlı entegrasyonlarla birlikte geliyor.

## Kurulum {#installation}

Kurulum, Yarn 0.25 veya daha üstü bir sürüm gerektirir (`npm install yarn --global`). Çalıştırmak şu kadar basittir:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Arka planda [create-react-app](https://github.com/facebook/create-react-app) kullanmaktadır. Uygulamanızı görmek için `http://localhost:3000/` adresini açın. Üretime dağıtmaya hazır olduğunuzda, yarn build ile küçültülmüş bir paket oluşturun. Bunu barındırmanın kolay bir yolu [Netlify](https://www.netlify.com/) olacaktır. Bir GitHub deposu oluşturabilir, bunu Netlify'a ekleyebilir, derleme komutunu ayarlayabilirsiniz ve işiniz biter! Uygulamanız barındırılacak ve herkes tarafından kullanılabilecektir. Üstelik tüm bunlar tamamen ücretsizdir.

## Özellikler {#features}

### React ve create-react-app {#react--create-react-app}

Öncelikle uygulamanın kalbi: React ve _create-react-app_ ile birlikte gelen tüm ek özellikler. Ethereum'u entegre etmek istemiyorsanız, sadece bunu kullanmak harika bir seçenektir. [React](https://react.dev/)'in kendisi, etkileşimli kullanıcı arayüzleri oluşturmayı gerçekten kolaylaştırır. [Vue](https://vuejs.org/) kadar başlangıç dostu olmayabilir, ancak yine de çoğunlukla kullanılmaktadır, daha fazla özelliğe sahiptir ve en önemlisi aralarından seçim yapabileceğiniz binlerce ek kütüphanesi vardır. _create-react-app_ de bununla başlamayı gerçekten kolaylaştırır ve şunları içerir:

- React, JSX, ES6, TypeScript, Flow sözdizimi desteği.
- Nesne yayma (object spread) operatörü gibi ES6 ötesi dil ekstraları.
- Otomatik ön ekli CSS, böylece -webkit- veya diğer ön eklere ihtiyacınız kalmaz.
- Kapsam raporlaması için yerleşik desteğe sahip hızlı ve etkileşimli bir birim testi çalıştırıcısı.
- Yaygın hatalar hakkında uyarı veren canlı bir geliştirme sunucusu.
- Üretim için JS, CSS ve görselleri hash'ler ve kaynak haritalarıyla (sourcemaps) paketleyen bir derleme betiği.

Özellikle _create-eth-app_, yeni [hook efektlerinden](https://legacy.reactjs.org/docs/hooks-effect.html) yararlanmaktadır. Güçlü, ancak çok küçük sözde işlevsel bileşenler yazmak için bir yöntem. _create-eth-app_ içinde nasıl kullanıldıklarını görmek için aşağıdaki Apollo ile ilgili bölüme bakın.

### Yarn Çalışma Alanları (Workspaces) {#yarn-workspaces}

[Yarn Çalışma Alanları](https://classic.yarnpkg.com/en/docs/workspaces/), birden fazla pakete sahip olmanıza, ancak hepsini kök klasörden yönetebilmenize ve `yarn install` kullanarak tümü için bağımlılıkları tek seferde yükleyebilmenize olanak tanır. Bu, özellikle akıllı sözleşme adresleri/ABI yönetimi (hangi akıllı sözleşmeleri nereye dağıttığınız ve onlarla nasıl iletişim kuracağınız hakkındaki bilgiler) veya her ikisi de `create-eth-app`'nin bir parçası olan The Graph entegrasyonu gibi daha küçük ek paketler için mantıklıdır.

### ethers.js {#ethersjs}

[Web3](https://docs.web3js.org/) hala çoğunlukla kullanılıyor olsa da, [ethers.js](https://docs.ethers.io/) son bir yılda bir alternatif olarak çok daha fazla ilgi görmeye başladı ve _create-eth-app_ içine entegre edilen de budur. Bununla çalışabilir, Web3 olarak değiştirebilir veya betadan çıkmak üzere olan [ethers.js v5](https://docs.ethers.org/v5/) sürümüne yükseltmeyi düşünebilirsiniz.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/), [Restful API](https://restfulapi.net/)'ye kıyasla verileri işlemek için alternatif bir yoldur. Özellikle merkeziyetsiz Blokzincir verileri için Restful API'lere göre çeşitli avantajları vardır. Bunun arkasındaki mantıkla ilgileniyorsanız, [GraphQL Merkeziyetsiz Web'e Güç Verecek](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a) makalesine bir göz atın.

Genellikle verileri doğrudan akıllı sözleşmenizden çekersiniz. En son işlemin zamanını okumak mı istiyorsunuz? Verileri bir Ethereum düğümünden merkeziyetsiz uygulamanıza (dapp) çeken `MyContract.methods.latestTradeTime().call()` işlevini çağırmanız yeterlidir. Peki ya yüzlerce farklı veri noktasına ihtiyacınız varsa? Bu, düğüme yüzlerce veri çekme isteğiyle sonuçlanır ve her seferinde bir [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) gerektirerek dapp'inizi yavaş ve verimsiz hale getirir. Geçici bir çözüm, sözleşmenizin içinde aynı anda birden fazla veri döndüren bir veri çekme çağrısı işlevi olabilir. Ancak bu her zaman ideal değildir.

Ayrıca geçmiş verilerle de ilgilenebilirsiniz. Sadece son işlem zamanını değil, kendi yaptığınız tüm işlemlerin zamanlarını da bilmek istersiniz. _create-eth-app_ alt grafik paketini kullanın, [belgeleri](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) okuyun ve kendi sözleşmelerinize uyarlayın. Popüler akıllı sözleşmeler arıyorsanız, halihazırda bir alt grafik bile olabilir. [Alt grafik gezginine](https://thegraph.com/explorer/) göz atın.

Bir alt grafiğe sahip olduğunuzda, dapp'inizde ihtiyacınız olan geçmiş veriler de dahil olmak üzere tüm önemli Blokzincir verilerini alan basit bir sorgu yazmanıza olanak tanır ve yalnızca tek bir veri çekme işlemi gerektirir.

### Apollo {#apollo}

[Apollo Boost](https://www.apollographql.com/docs/react/get-started/) entegrasyonu sayesinde The Graph'i React dapp'inize kolayca entegre edebilirsiniz. Özellikle [React hook'ları ve Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) kullanırken, veri çekmek bileşeninizde tek bir GraphQL sorgusu yazmak kadar basittir:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Şablonlar {#templates}

Bunun da ötesinde, birkaç farklı şablon arasından seçim yapabilirsiniz. Şu ana kadar bir Aave, Compound, Uniswap veya Sablier entegrasyonu kullanabilirsiniz. Hepsi, önceden hazırlanmış alt grafik entegrasyonlarıyla birlikte önemli hizmet akıllı sözleşme adreslerini ekler. Şablonu `yarn create eth-app my-eth-app --with-template aave` gibi oluşturma komutuna eklemeniz yeterlidir.

### Aave {#aave}

[Aave](https://aave.com/), merkeziyetsiz bir para borç verme piyasasıdır. Mevduat sahipleri pasif bir gelir elde etmek için piyasaya likidite sağlarken, borç alanlar teminat kullanarak borç alabilirler. Aave'nin benzersiz bir özelliği, krediyi tek bir işlem içinde iade ettiğiniz sürece herhangi bir teminat olmadan borç para almanıza olanak tanıyan [flaş kredilerdir](https://aave.com/docs/developers/flash-loans). Bu, örneğin arbitraj ticaretinde size ekstra nakit sağlamak için yararlı olabilir.

Size faiz kazandıran takas edilen token'lara _aTokens_ denir.

Aave'yi _create-eth-app_ ile entegre etmeyi seçtiğinizde, bir [alt grafik entegrasyonu](https://docs.aave.com/developers/getting-started/using-graphql) elde edeceksiniz. Aave, The Graph'i kullanır ve halihazırda [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) ve [Ana Ağ](https://thegraph.com/explorer/subgraph/aave/protocol) üzerinde [ham](https://thegraph.com/explorer/subgraph/aave/protocol-raw) veya [biçimlendirilmiş](https://thegraph.com/explorer/subgraph/aave/protocol) biçimde kullanıma hazır birkaç alt grafik sunar.

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/), Aave'ye benzer. Entegrasyon halihazırda yeni [Compound v2 Alt Grafiğini](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) içerir. Burada faiz kazandıran token'lar şaşırtıcı bir şekilde _cTokens_ olarak adlandırılır.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/), merkeziyetsiz bir borsadır (DEX). Likidite sağlayıcıları, bir işlemin her iki tarafı için gerekli token'ları veya Ether'i sağlayarak ücret kazanabilirler. Yaygın olarak kullanılmaktadır ve bu nedenle çok geniş bir token yelpazesi için en yüksek likiditelerden birine sahiptir. Örneğin, kullanıcıların ETH'lerini DAI ile takas etmelerine olanak tanımak için onu dapp'inize kolayca entegre edebilirsiniz.

Ne yazık ki, bu yazının yazıldığı sırada entegrasyon yalnızca Uniswap v1 içindir ve [yeni piyasaya sürülen v2](https://uniswap.org/blog/uniswap-v2/) için değildir.

### Sablier {#sablier}

[Sablier](https://sablier.com/), kullanıcıların sürekli para akışı şeklinde ödeme yapmasına olanak tanır. Tek bir maaş günü yerine, ilk kurulumdan sonra daha fazla yönetime gerek kalmadan paranızı sürekli olarak alırsınız. Entegrasyon, [kendi alt grafiğini](https://thegraph.com/explorer/subgraph/sablierhq/sablier) içerir.

## Sırada ne var? {#whats-next}

_create-eth-app_ hakkında sorularınız varsa, _create-eth-app_ yazarlarıyla iletişime geçebileceğiniz [Sablier topluluk sunucusuna](https://discord.gg/bsS8T47) gidin. İlk sonraki adımlar olarak [Material UI](https://mui.com/material-ui/) gibi bir kullanıcı arayüzü (UI) çerçevesini entegre etmek, gerçekten ihtiyacınız olan veriler için GraphQL sorguları yazmak ve dağıtımı ayarlamak isteyebilirsiniz.