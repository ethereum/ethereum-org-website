---
title: "ایتھیریم ڈیولپمنٹ کے معیارات"
description: "ایتھیریم کے معیارات کے بارے میں جانیں جن میں EIPs، ٹوکن کے معیارات جیسے ERC-20 اور ERC-721، اور ڈیولپمنٹ کی روایات شامل ہیں۔"
lang: ur
incomplete: true
---

## معیارات کا جائزہ {#standards-overview}

ایتھیریم کمیونٹی نے بہت سے ایسے معیارات اپنائے ہیں جو پروجیکٹس (جیسے [ایتھیریم کلائنٹس](/developers/docs/nodes-and-clients/) اور والیٹس) کو مختلف امپلیمینٹیشنز کے درمیان انٹرآپریبل (interoperable) رکھنے میں مدد کرتے ہیں، اور اس بات کو یقینی بناتے ہیں کہ سمارٹ کانٹریکٹس اور ڈی ایپس (dapps) کمپوزایبل (composable) رہیں۔

عام طور پر معیارات کو [ایتھیریم امپروومنٹ پروپوزلز](/eips/) (EIPs) کے طور پر متعارف کرایا جاتا ہے، جن پر کمیونٹی ممبران ایک [معیاری عمل](https://eips.ethereum.org/EIPS/eip-1) کے ذریعے تبادلہ خیال کرتے ہیں۔

- [EIPs کا تعارف](/eips/)
- [EIPs کی فہرست](https://eips.ethereum.org/)
- [EIP گٹ ہب (GitHub) ریپو](https://github.com/ethereum/EIPs)
- [EIP ڈسکشن بورڈ](https://ethereum-magicians.org/c/eips)
- [ایتھیریم گورننس کا تعارف](/governance/)
- [ایتھیریم گورننس کا جائزہ](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 مارچ، 2019 - Boris Mann_
- [ایتھیریم پروٹوکول ڈیولپمنٹ گورننس اور نیٹ ورک اپ گریڈ کوآرڈینیشن](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 مارچ، 2020 - Hudson Jameson_
- [تمام ایتھیریم کور ڈیولپر میٹنگز کی پلے لسٹ](https://www.youtube.com/@EthereumProtocol) _(یوٹیوب پلے لسٹ)_

## معیارات کی اقسام {#types-of-standards}

EIPs کی 3 اقسام ہیں:

- سٹینڈرڈز ٹریک (Standards Track): کسی بھی ایسی تبدیلی کو بیان کرتا ہے جو زیادہ تر یا تمام ایتھیریم امپلیمینٹیشنز کو متاثر کرتی ہے
- [میٹا ٹریک (Meta Track)](https://eips.ethereum.org/meta): ایتھیریم کے ارد گرد کسی عمل کو بیان کرتا ہے یا کسی عمل میں تبدیلی کی تجویز پیش کرتا ہے
- [انفارمیشنل ٹریک (Informational Track)](https://eips.ethereum.org/informational): ایتھیریم کے ڈیزائن کے مسئلے کو بیان کرتا ہے یا ایتھیریم کمیونٹی کو عمومی ہدایات یا معلومات فراہم کرتا ہے

مزید برآں، سٹینڈرڈ ٹریک کو 4 زمروں میں تقسیم کیا گیا ہے:

- [کور (Core)](https://eips.ethereum.org/core): ایسی بہتری جس کے لیے کنسینسس فورک (consensus fork) کی ضرورت ہوتی ہے
- [نیٹ ورکنگ (Networking)](https://eips.ethereum.org/networking): devp2p اور لائٹ ایتھیریم سب پروٹوکول (Light Ethereum Subprotocol) کے ارد گرد بہتری، نیز وسپر (whisper) اور سوارم (swarm) کی نیٹ ورک پروٹوکول کی خصوصیات میں مجوزہ بہتری۔
- [انٹرفیس (Interface)](https://eips.ethereum.org/interface): کلائنٹ API/RPC کی خصوصیات اور معیارات کے ارد گرد بہتری، اور کچھ زبان کی سطح کے معیارات جیسے میتھڈ کے نام اور کانٹریکٹ ABIs۔
- [ERC](https://eips.ethereum.org/erc): ایپلیکیشن کی سطح کے معیارات اور روایات

ان مختلف اقسام اور زمروں کے بارے میں مزید تفصیلی معلومات [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types) میں مل سکتی ہیں۔

### ٹوکن کے معیارات {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - فنجیبل (قابل تبادلہ) ٹوکنز کے لیے ایک معیاری انٹرفیس، جیسے ووٹنگ ٹوکنز، سٹیکنگ ٹوکنز یا ورچوئل کرنسیاں۔
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - ایک فنجیبل ٹوکنز کا معیار جو ٹوکنز کو ایتھر (ether) کی طرح برتاؤ کرنے کے قابل بناتا ہے اور وصول کنندگان کی طرف ٹوکن کی منتقلی کو سنبھالنے میں مدد کرتا ہے۔
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - ERC-20 ٹوکنز کے لیے ایک ایکسٹینشن انٹرفیس جو ایک ہی ٹرانزیکشن میں وصول کنندہ کے کانٹریکٹس پر کال بیک (callback) کو انجام دینے میں مدد کرتا ہے۔
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - نان فنجیبل (non-fungible) ٹوکنز کے لیے ایک معیاری انٹرفیس، جیسے آرٹ ورک یا گانے کی ملکیت کی دستاویز۔
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - ایک معیاری ایونٹ جو لگاتار ٹوکن شناخت کنندگان کا استعمال کرتے ہوئے ایک یا کئی نان فنجیبل ٹوکنز بنانے/منتقل کرنے پر خارج (emit) ہوتا ہے۔
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - EIP-721 کنزیومر رول (consumer role) کے لیے انٹرفیس ایکسٹینشن۔
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - ERC-721 ٹوکنز میں محدود اجازتوں کے ساتھ ایک وقتی محدود کردار (time-limited role) شامل کریں۔
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(تجویز کردہ نہیں)** ایک ٹوکن کا معیار جو ERC-20 سے بہتر ہے۔
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - ایک ٹوکن کا معیار جس میں فنجیبل اور نان فنجیبل دونوں اثاثے شامل ہو سکتے ہیں۔
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - ایک ٹوکنائزڈ والٹ (tokenized vault) کا معیار جسے منافع بخش والٹس (yield-bearing vaults) کے تکنیکی پیرامیٹرز کو بہتر اور یکجا کرنے کے لیے ڈیزائن کیا گیا ہے۔

[ٹوکن کے معیارات](/developers/docs/standards/tokens/) کے بارے میں مزید جانیں۔

## مزید مطالعہ {#further-reading}

- [ایتھیریم امپروومنٹ پروپوزلز (EIPs)](/eips/)

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_