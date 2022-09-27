---
title: JSON-RPC API
description: Ethereum istemcileri için durum bilgisi olmayan, hafif bir uzaktan prosedür çağrısı (RPC) protokolü.
lang: tr
---

Bir yazılım uygulamasının Ethereum blok zinciri ile etkileşime girebilmesi için (blok zinciri verilerini okuyarak ve/veya ağa işlemler göndererek), bir Ethereum düğümüne bağlanması gerekir.

Bu amaçla, her [Ethereum istemcisi](/developers/docs/nodes-and-clients/#execution-clients) bir [JSON-RPC şartnamesi uygular](http://www.jsonrpc.org/specification): Böylece uygulamaların güvenebileceği tek tip bir yöntem kümesi bulunur.

JSON-RPC, durum bilgisi olmayan, hafif bir uzaktan prosedür çağrısı (RPC) protokolüdür. Şartname öncelikli olarak çeşitli veri yapılarını ve bunların işlenmesiyle ilgili kuralları tanımlar. Kavramların aynı süreç içinde, soketler üzerinden, HTTP üzerinden veya birçok farklı mesaj geçiş ortamında kullanılabilir olması açısından aktarımdan bağımsızdır. Veri formatı olarak JSON (RFC 4627) kullanır.

## JSON-RPC kaynakları {#json-rpc-resources}

- [Ethereum JSON-RPC Şartnamesi](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema[appBar][ui:splitView]=true&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false)
- [Ethereum JSON-RPC Şartnamesi GitHub deposu](https://github.com/ethereum/eth1.0-apis)

## İstemci uygulamaları {#client-implementations}

Ethereum istemcilerinin her biri, JSON-RPC şartnamesini uygularken farklı programlama dilleri kullanabilir. Belirli programlama dilleriyle ilgili daha fazla ayrıntı için [istemci belgelerine](/developers/docs/nodes-and-clients/#execution-clients) bakın. En güncel API destek bilgileri için her istemcinin belgelerini kontrol etmenizi öneririz.

## Kolaylık Kütüphaneleri {#convenience-libraries}

JSON-RPC API aracılığıyla Ethereum istemcileriyle doğrudan etkileşim kurmayı seçebilseniz de, dapp geliştiricileri için genellikle daha kolay seçenekler vardır. JSON-RPC API'sinin üzerinde paketleyiciler sağlamak için birçok [JavaScript](/developers/docs/apis/javascript/#available-libraries) ve [arka uç API'si](/developers/docs/apis/backend/#available-libraries) kütüphanesi bulunur. Bu kütüphanelerle geliştiriciler, Ethereum ile etkileşime giren JSON RPC taleplerini (arka planda) başlatmak için tercih ettikleri programlama dilinde sezgisel ve tek satırlı yöntemler yazabilirler.

## İlgili konular {#related-topics}

- [Düğümler ve istemciler](/developers/docs/nodes-and-clients/)
- [JavaScript API'ları](/developers/docs/apis/javascript/)
- [Arka Uç API'ları](/developers/docs/apis/backend/)
