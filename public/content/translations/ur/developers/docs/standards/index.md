---
title: ایتھیریم ڈیولپمنٹ کے معیارات
description: ایتھیریم کے معیارات کے بارے میں جانیں جن میں ⁦EIPs⁩، ٹوکن کے معیارات جیسے ⁦ERC-20⁩ اور ⁦ERC-721⁩، اور ڈیولپمنٹ کی روایات شامل ہیں۔
lang: ur
incomplete: true
---

## معیارات کا جائزہ {#standards-overview}

ایتھیریم کمیونٹی نے بہت سے ایسے معیارات اپنائے ہیں جو پروجیکٹس (جیسے [ایتھیریم کلائنٹس](/developers/docs/nodes-and-clients/) اور والیٹس) کو مختلف نفاذات میں قابلِ باہمی عمل رکھنے میں مدد کرتے ہیں، اور اس بات کو یقینی بناتے ہیں کہ اسمارٹ کنٹریکٹس اور غیر مرکزی ایپلی کیشنز (dapps) قابلِ ترکیب رہیں۔

عام طور پر معیارات کو [ایتھیریم امپروومنٹ پروپوزلز](/eips/) (<span dir="ltr">EIPs</span>) کے طور پر متعارف کرایا جاتا ہے، جن پر کمیونٹی ممبران ایک [معیاری عمل](https://eips.ethereum.org/EIPS/eip-1) کے ذریعے تبادلہ خیال کرتے ہیں۔

- [<span dir="ltr">EIPs</span> کا تعارف](/eips/)
- [<span dir="ltr">EIPs</span> کی فہرست](https://eips.ethereum.org/)
- [<span dir="ltr">EIP GitHub</span> ریپو](https://github.com/ethereum/EIPs)
- [<span dir="ltr">EIP</span> ڈسکشن بورڈ](https://ethereum-magicians.org/c/eips)
- [ایتھیریم گورننس کا تعارف](/governance/)
- [ایتھیریم گورننس کا جائزہ](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 مارچ 2019 - بورس مان_
- [ایتھیریم پروٹوکول ڈیولپمنٹ گورننس اور نیٹ ورک اپ گریڈ کوآرڈینیشن](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 مارچ 2020 - ہڈسن جیمسن_
- [تمام ایتھیریم کور ڈیولپر میٹنگز کی پلے لسٹ](https://www.youtube.com/@EthereumProtocol) _(یوٹیوب پلے لسٹ)_

## معیارات کی اقسام {#types-of-standards}

<span dir="ltr">EIPs</span> کی 3 اقسام ہیں:

- اسٹینڈرڈز ٹریک: کسی بھی ایسی تبدیلی کو بیان کرتا ہے جو زیادہ تر یا تمام ایتھیریم نفاذات کو متاثر کرتی ہے۔
- [میٹا ٹریک](https://eips.ethereum.org/meta): ایتھیریم کے ارد گرد کسی عمل کو بیان کرتا ہے یا کسی عمل میں تبدیلی کی تجویز پیش کرتا ہے۔
- [انفارمیشنل ٹریک](https://eips.ethereum.org/informational): ایتھیریم کے ڈیزائن کے مسئلے کو بیان کرتا ہے یا ایتھیریم کمیونٹی کو عمومی ہدایات یا معلومات فراہم کرتا ہے۔

مزید برآں، اسٹینڈرڈ ٹریک کو 4 زمروں میں تقسیم کیا گیا ہے:

- [کور](https://eips.ethereum.org/core): ایسی بہتری جس کے لیے اتفاق رائے فورک کی ضرورت ہوتی ہے۔
- [نیٹ ورکنگ](https://eips.ethereum.org/networking): <span dir="ltr">devp2p</span> اور لائٹ ایتھیریم سب پروٹوکول کے حوالے سے بہتری، نیز وسپر اور سوارم کی نیٹ ورک پروٹوکول تصریحات میں مجوزہ بہتری۔
- [انٹرفیس](https://eips.ethereum.org/interface): کلائنٹ <span dir="ltr">API/RPC</span> تصریحات اور معیارات کے حوالے سے بہتری، اور زبان کی سطح کے کچھ معیارات جیسے طریقہ کار کے نام اور کنٹریکٹ <span dir="ltr">ABIs</span>۔
- [<span dir="ltr">ERC</span>](https://eips.ethereum.org/erc): ایپلیکیشن کی سطح کے معیارات اور روایات

ان مختلف اقسام اور زمروں کے بارے میں مزید تفصیلی معلومات [<span dir="ltr">EIP-1</span>](https://eips.ethereum.org/EIPS/eip-1#eip-types) میں مل سکتی ہیں۔

### ٹوکن کے معیارات {#token-standards}

- [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) - فنجیبل (قابل تبادلہ) ٹوکنز کے لیے ایک معیاری انٹرفیس، جیسے ووٹنگ ٹوکنز، اسٹیکنگ ٹوکنز یا ورچوئل کرنسیاں۔
  - [<span dir="ltr">ERC-223</span>](/developers/docs/standards/tokens/erc-223/) - ایک فنجیبل ٹوکنز کا معیار جو ٹوکنز کو ایتھر کی طرح برتاؤ کرنے کے قابل بناتا ہے اور وصول کنندگان کی طرف ٹوکن کی منتقلی کو سنبھالنے میں معاونت کرتا ہے۔
  - [<span dir="ltr">ERC-1363</span>](/developers/docs/standards/tokens/erc-1363/) - <span dir="ltr">ERC-20</span> ٹوکنز کے لیے ایک توسیعی انٹرفیس جو ایک ہی ٹرانزیکشن میں وصول کنندہ کنٹریکٹس پر کال بیک کو انجام دینے میں معاونت کرتا ہے۔
- [<span dir="ltr">ERC-721</span>](/developers/docs/standards/tokens/erc-721/) - نان فنجیبل ٹوکنز کے لیے ایک معیاری انٹرفیس، جیسے آرٹ ورک یا گانے کی ملکیت کی دستاویز۔
  - [<span dir="ltr">ERC-2309</span>](https://eips.ethereum.org/EIPS/eip-2309) - ایک معیاری ایونٹ جو لگاتار ٹوکن شناخت کنندگان کا استعمال کرتے ہوئے ایک یا کئی نان فنجیبل ٹوکنز بنانے/منتقل کرنے پر خارج ہوتا ہے۔
  - [<span dir="ltr">ERC-4400</span>](https://eips.ethereum.org/EIPS/eip-4400) - <span dir="ltr">EIP-721</span> کنزیومر رول کے لیے انٹرفیس کی توسیع۔
  - [<span dir="ltr">ERC-4907</span>](https://eips.ethereum.org/EIPS/eip-4907) - <span dir="ltr">ERC-721</span> ٹوکنز میں محدود اجازتوں کے ساتھ ایک وقتی محدود کردار شامل کریں۔
- [<span dir="ltr">ERC-777</span>](/developers/docs/standards/tokens/erc-777/) - **(تجویز کردہ نہیں)** ایک ٹوکن معیار جو <span dir="ltr">ERC-20</span> سے بہتر ہے۔
- [<span dir="ltr">ERC-1155</span>](/developers/docs/standards/tokens/erc-1155/) - ایک ٹوکن معیار جو فنجیبل اور نان فنجیبل دونوں اثاثوں پر مشتمل ہو سکتا ہے۔
- [<span dir="ltr">ERC-4626</span>](/developers/docs/standards/tokens/erc-4626/) - ایک ٹوکنائزڈ تجوری کا معیار جسے منافع بخش تجوریوں کے تکنیکی پیرامیٹرز کو بہتر اور یکجا کرنے کے لیے ڈیزائن کیا گیا ہے۔

[ٹوکن کے معیارات](/developers/docs/standards/tokens/) کے بارے میں مزید جانیں۔

## مزید مطالعہ {#further-reading}

- [ایتھیریم امپروومنٹ پروپوزلز (<span dir="ltr">EIPs</span>)](/eips/)

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_