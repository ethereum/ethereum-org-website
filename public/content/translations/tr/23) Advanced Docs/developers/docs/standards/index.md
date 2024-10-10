---
title: Ethereum Geliştirme Standartları
description:
lang: tr
incomplete: true
---

## Standartlara genel bakış {#standards-overview}

Ethereum topluluğu, projelerin ([Ethereum istemcileri](/developers/docs/nodes-and-clients/) ve cüzdanlar gibi) uygulamalar arasında birlikte çalışabilir durumda kalmasına yardımcı olan ve akıllı sözleşmeler ve dapp'lerin birleştirilebilir kalmasını sağlayan birçok standardı benimsemiştir.

Genellikle standartlar, bir [standart süreci](https://eips.ethereum.org/EIPS/eip-1) aracılığıyla topluluk üyeleri tarafından tartışılan [Ethereum İyileştirme Önerileri](/eips/) (EIP'ler) olarak sunulur.

- [EIP'lere giriş](/eips/)
- [EIP listesi](https://eips.ethereum.org/)
- [EIP GitHub deposu](https://github.com/ethereum/EIPs)
- [EIP tartışma panosu](https://ethereum-magicians.org/c/eips)
- [Ethereum Yönetişimine Giriş](/governance/)
- [Ethereum Yönetişimine Genel Bakış](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 Mart 2019 - Boris Mann_
- [Ethereum Protokol Geliştirme Yönetişimi ve Ağ Yükseltme Koordinasyonu](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 Mart 2020 - Hudson Jameson_
- [Ethereum Çekirdek Geliştiricilerinin Bütün Toplantılarını İçeren Oynatma Listesi](https://www.youtube.com/@EthereumProtocol) _(YouTube Oynatma Listesi)_

## Standart türleri {#types-of-standards}

3 tür EIP vardır:

- Standart İzleme: Ethereum uygulamalarının çoğunu ya da tamamını etkileyen herhangi bir değişikliği açıklar
- [Meta İzleme](https://eips.ethereum.org/meta): Ethereum'u çevreleyen bir süreci açıklar ya da bir süreçte değişiklik önerir
- [Bilgi İzleme](https://eips.ethereum.org/informational): bir Ethereum tasarım sorununu açıklar ya da Ethereum topluluğuna genel yönergeler ya da bilgiler sağlar

Ayrıca, Standart İzleme 4 kategoriye ayrılmıştır:

- [Çekirdek](https://eips.ethereum.org/core): mutabakat çatalı gerektiren iyileştirmeler
- [Ağ Oluşturma](https://eips.ethereum.org/networking): devp2p ve Hafif Ethereum Alt Protokolü ile ilgili iyileştirmelerin yanı sıra whisper ve swarm ağ protokolü spesifikasyonlarına önerilen iyileştirmeler.
- [Arayüz](https://eips.ethereum.org/interface): istemci API/RPC spesifikasyonları ve standartları ile ilgili iyileştirmeler ve yöntem adları ile sözleşme ABI'leri gibi dil düzeyindeki belirli standartlar.
- [ERC](https://eips.ethereum.org/erc): uygulama seviyesindeki standartlar ve teamüller

Bu farklı türler ve kategoriler daha fazla bilgi [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types) içinde bulunabilir

### Token standartları {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Oylama token'ları, stake etme token'ları veya sanal para birimleri gibi değiştirilebilir (birbirinin yerine geçebilir) token'lar için standart bir arayüz.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Jetonların ether ile aynı şekilde davranmasını sağlayan ve alıcı tarafında jeton transferlerinin işlenmesini destekleyen bir değiştirilebilir jeton standardıdır.
  - [ERC-1363](https://eips.ethereum.org/EIPS/eip-1363) - ERC-20 jetonları için transfer veya transferFrom sonrası alıcı kodunun veya onaylandıktan sonra harcama kodunun yürütülmesini destekleyen bir jeton arayüzünü tanımlar.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Bir şarkı veya sanat eserinin telif hakkı gibi değiştirilemez token'lar için standart bir arayüz.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Ardışık jeton tanımlayıcıları kullanarak bir veya çok sayıda değiştirilemez jeton oluştururken/transfer ederken yayımlanan standartlaştırılmış bir olay.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - EIP-721 tüketici rolü için arayüz uzantısı.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - ERC-721 jetonlarına sınırlı izinlere sahip zaman sınırlı bir rol ekler.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(TAVSİYE EDİLMEZ)** ERC-20'yi geliştiren bir jeton standardı.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Hem değiştirilebilir hem de değiştirilemez varlıkları içerebilen bir jeton standardı.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Verim taşıyan kasaların teknik parametrelerini optimize etmek ve birleştirmek için tasarlanmış, tokenize edilmiş bir kasa standardı.

[Jeton standartları](/developers/docs/standards/tokens/) hakkında daha fazla bilgi edinin.

## Daha fazla bilgi {#further-reading}

- [Ethereum İyileştirme Önerileri (EIP'ler)](/eips/)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
