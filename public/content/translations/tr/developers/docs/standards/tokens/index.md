---
title: Token Standartları
description:
lang: tr
incomplete: true
---

## Giriş {#introduction}

Birçok Ethereum geliştirme standardı, jeton arayüzlerine odaklanır. Bu standartlar akıllı sözleşmelerin birleştirilebilir kalmasını sağlamaya yardımcı olur: Örneğin yeni bir proje bir token çıkardığı zaman token'ın mevcut merkeziyetsiz borsalarla uyumlu kalması gibi.

## Ön Koşullar {#prerequisites}

- [Ethereum geliştirme standartları](/developers/docs/standards/)
- [Akıllı sözleşmeler](/developers/docs/smart-contracts/)

## Token standartları {#token-standards}

Bunlar Ethereum'daki en popüler token standartlarından bazılarıdır:

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Oylama token'ları, stake etme token'ları veya sanal para birimleri gibi değiştirilebilir (birbirinin yerine geçebilir) token'lar için standart bir arayüz.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Bir şarkı veya sanat eserinin telif hakkı gibi değiştirilemez token'lar için standart bir arayüz.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - ERC-777, gelişmiş işlem gizliliği için bir mikser sözleşmesi veya özel anahtarlarınızı kaybederseniz sizi kurtarmak için bir acil durum kurtarma işlevi gibi token'ların üzerine ek işlevler oluşturmasına olanak tanır.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - ERC-1155, daha verimli alım satımlara ve işlemlerin gruplandırılmasına olanak tanır: Böylece maliyetlerden tasarruf sağlar. Bu token standardı, hem yardımcı token'ların ($BNB veya $BAT gibi) hem de CryptoPunks gibi Değiştirilemez Token'ların oluşturulmasına izin verir.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Verim taşıyan kasaların teknik parametrelerini optimize etmek ve birleştirmek için tasarlanmış, tokenize edilmiş bir kasa standardı.

[ERC](https://eips.ethereum.org/erc) önerilerinin tam listesi.

## daha fazla okuma {#further-reading}

_Size yardımcı olan bir topluluk kaynağı biliyor musunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili öğreticiler {#related-tutorials}

- [Token entegrasyonu kontrol listesi](/developers/tutorials/token-integration-checklist/) _– Token'larla etkileşim kurarken göz önünde bulundurulması gerekenleri içeren bir kontrol listesi._
- [ERC20 token akıllı sözleşmesini anlayın](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– İlk akıllı sözleşmenizi bir Ethereum test ağında dağıtmaya giriş._
- [ERC20 token'larının bir Solidity akıllı sözleşmesinden transferleri ve onaylanması](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Solidity dilini kullanarak bir token'la etkileşim kurmak için bir akıllı sözleşme nasıl kullanılır?_
- [Bir ERC721 pazarının uygulanması [nasıl yapılır kılavuzu]](/developers/tutorials/how-to-implement-an-erc721-market/) _– Merkeziyetsiz bir ilan panosunda token'laştırılmış ürünler nasıl satışa sunulur?_
