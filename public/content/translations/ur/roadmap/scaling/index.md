---
title: "ایتھریم کو اسکیل کرنے کے لئے"
description: "Rollups ٹرانزیکشنز کو آف چین ایک ساتھ بیچ کرتے ہیں، جس سے صارف کے لیے لاگت کم ہوتی ہے۔ تاہم، جس طرح سے rollups فی الحال ڈیٹا کا استعمال کرتے ہیں وہ بہت مہنگا ہے، جس سے یہ محدود ہو جاتا ہے کہ ٹرانزیکشنز کتنی سستی ہو سکتی ہیں۔ Proto-Danksharding اسے ٹھیک کرتا ہے۔"
lang: ur-in
image: /images/roadmap/roadmap-transactions.png
alt: "ایتھریم روڈ میپ"
template: roadmap
---

Ethereum کو [layer 2s](/layer-2/#rollups) (جسے rollups بھی کہا جاتا ہے) کا استعمال کرکے اسکیل کیا جاتا ہے، جو ٹرانزیکشنز کو ایک ساتھ بیچ کرتے ہیں اور آؤٹ پٹ کو Ethereum پر بھیجتے ہیں۔ اگرچہ rollups ایتھیریم مین نیٹ سے آٹھ گنا تک کم مہنگے ہیں، لیکن آخری صارفین کے لیے لاگت کو کم کرنے کے لیے rollups کو مزید بہتر بنانا ممکن ہے۔ Rollups کچھ مرکزی اجزاء پر بھی انحصار کرتے ہیں جنہیں ڈیولپرز rollups کے میچور ہونے پر ہٹا سکتے ہیں۔

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  ٹرانزیکشن کی لاگت
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>آج کے rollups ایتھیریم layer 1 سے <strong>~5-20x</strong> سستے ہیں</li>
    <li>ZK-rollups جلد ہی فیس کو <strong>~40-100x</strong> تک کم کر دیں گے</li>
    <li>Ethereum میں آنے والی تبدیلیاں اسکیلنگ میں مزید <strong>~100-1000x</strong> کا اضافہ فراہم کریں گی</li>
    <li style={{ marginBottom: 0 }}>صارفین کو <strong>$0.001 سے کم لاگت</strong> والے ٹرانزیکشنز سے فائدہ ہونا چاہئے</li>
  </ul>
</AlertContent>
</Alert>

## ڈیٹا کو سستا بنانا {#making-data-cheaper}

Rollups بڑی تعداد میں ٹرانزیکشنز جمع کرتے ہیں، انہیں انجام دیتے ہیں اور نتائج کو Ethereum پر جمع کرتے ہیں۔ اس سے بہت سارا ڈیٹا پیدا ہوتا ہے جسے کھلے عام دستیاب ہونے کی ضرورت ہے تاکہ کوئی بھی خود ٹرانزیکشنز کو انجام دے سکے اور تصدیق کر سکے کہ rollup آپریٹر ایماندار تھا۔ اگر کسی کو کوئی تضاد ملتا ہے، تو وہ ایک چیلنج اٹھا سکتا ہے۔

### پروٹو-ڈینک شارڈنگ {#proto-danksharding}

Rollup ڈیٹا تاریخی طور پر Ethereum پر مستقل طور پر ذخیرہ کیا جاتا رہا ہے، جو کہ مہنگا ہے۔ rollups پر صارفین کی طرف سے ادا کی جانے والی ٹرانزیکشن لاگت کا 90% سے زیادہ حصہ اس ڈیٹا storage کی وجہ سے ہے۔ ٹرانزیکشن لاگت کو کم کرنے کے لیے، ہم ڈیٹا کو ایک نئے عارضی 'blob' storage میں منتقل کر سکتے ہیں۔ Blobs سستے ہیں کیونکہ وہ مستقل نہیں ہیں؛ جب ان کی مزید ضرورت نہیں رہتی تو انہیں Ethereum سے حذف کر دیا جاتا ہے۔ rollup ڈیٹا کو طویل مدتی ذخیرہ کرنا ان لوگوں کی ذمہ داری بن جاتی ہے جنہیں اس کی ضرورت ہے، جیسے rollup آپریٹرز، exchanges، انڈیکسنگ سروسز وغیرہ۔ Ethereum میں blob ٹرانزیکشنز شامل کرنا "Proto-Danksharding" کے نام سے جانے والے ایک upgrade کا حصہ ہے۔

Proto-Danksharding کے ساتھ، Ethereum blocks میں بہت سے blobs شامل کرنا ممکن ہے۔ یہ Ethereum کے throughput میں ایک اور خاطر خواہ (>100x) اضافے اور ٹرانزیکشن لاگت میں کمی کو ممکن بناتا ہے۔

### ڈانک شارڈنگ {#danksharding}

blob ڈیٹا کو بڑھانے کا دوسرا مرحلہ پیچیدہ ہے کیونکہ اس کے لیے یہ جانچنے کے لیے نئے طریقوں کی ضرورت ہوتی ہے کہ rollup ڈیٹا network پر دستیاب ہے اور یہ [validators](/glossary/#validator) پر انحصار کرتا ہے جو اپنی [block](/glossary/#block) بنانے اور بلاک تجویز کرنے کی ذمہ داریوں کو الگ کرتے ہیں۔ اس کے لیے کرپٹوگرافک طور پر یہ ثابت کرنے کا ایک طریقہ بھی درکار ہے کہ validators نے blob ڈیٹا کے چھوٹے سب سیٹس کی تصدیق کی ہے۔

یہ دوسرا مرحلہ ["Danksharding"](/roadmap/danksharding/) کے نام سے جانا جاتا ہے۔ نفاذ کا کام جاری ہے، جس میں [بلاک بنانے اور بلاک کی تجویز کو الگ کرنے](/roadmap/pbs) جیسی شرائط پر پیش رفت ہو رہی ہے اور نئے network ڈیزائنز جو network کو ایک وقت میں چند kilobytes کا بے ترتیب نمونہ لے کر مؤثر طریقے سے اس بات کی تصدیق کرنے کے قابل بناتے ہیں کہ ڈیٹا دستیاب ہے، جسے [ڈیٹا دستیابی نمونہ (DAS)](/developers/docs/data-availability) کے نام سے جانا جاتا ہے۔

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Danksharding پر مزید</ButtonLink>

## rollups کو غیر مرکزی بنانا {#decentralizing-rollups}

[Rollups](/layer-2) پہلے ہی Ethereum کو اسکیل کر رہے ہیں۔ [rollup پروجیکٹس کا ایک بھرپور ایکو سسٹم](https://l2beat.com/scaling/tvs) صارفین کو تیزی سے اور سستے طریقے سے لین دین کرنے کے قابل بنا رہا ہے، جس میں کئی طرح کی سیکیورٹی گارنٹییں ہیں۔ تاہم، rollups کو مرکزی sequencers (کمپیوٹرز جو Ethereum میں جمع کرنے سے پہلے تمام ٹرانزیکشن پروسیسنگ اور aggregation کرتے ہیں) کا استعمال کرکے بوٹسٹریپ کیا گیا ہے۔ یہ سنسرشپ کے لیے کمزور ہے، کیونکہ sequencer آپریٹرز پر پابندی لگائی جا سکتی ہے، انہیں رشوت دی جا سکتی ہے یا کسی اور طرح سے سمجھوتہ کیا جا سکتا ہے۔ ساتھ ہی، [rollups vary](https://l2beat.com/scaling/summary) آنے والے ڈیٹا کی توثیق کرنے کے طریقے میں مختلف ہوتے ہیں۔ سب سے بہترین طریقہ یہ ہے کہ "provers" [fraud proofs](/glossary/#fraud-proof) یا ویلیڈیٹی پروف جمع کرائیں، لیکن ابھی تک تمام rollups وہاں نہیں ہیں۔ یہاں تک کہ وہ rollups جو ویلیڈیٹی/fraud proofs کا استعمال کرتے ہیں، وہ بھی معلوم پروورز کے ایک چھوٹے pool کا استعمال کرتے ہیں۔ لہذا، Ethereum کو اسکیل کرنے کا اگلا اہم قدم sequencers اور پروورز کو چلانے کی ذمہ داری کو زیادہ لوگوں میں تقسیم کرنا ہے۔

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">rollups پر مزید</ButtonLink>

## موجودہ پیشرفت {#current-progress}

Proto-Danksharding کو مارچ 2024 میں Cancun-Deneb ("Dencun") network upgrade کے حصے کے طور پر کامیابی سے نافذ کیا گیا تھا۔ اس کے نفاذ کے بعد سے، rollups نے blob storage کا استعمال شروع کر دیا ہے، جس کے نتیجے میں صارفین کے لیے ٹرانزیکشن کی لاگت میں کمی آئی ہے اور لاکھوں ٹرانزیکشنز blobs میں پراسیس ہوئے ہیں۔

مکمل Danksharding پر کام جاری ہے، جس میں اس کی شرائط جیسے PBS (Proposer-Builder Separation) اور DAS (Data Availability Sampling) پر پیش رفت ہو رہی ہے۔ rollup انفراسٹرکچر کو غیر مرکزی بنانا ایک بتدریج عمل ہے - بہت سے مختلف rollups ہیں جو قدرے مختلف نظام بنا رہے ہیں اور مختلف شرحوں پر مکمل طور پر غیر مرکزی ہوں گے۔

[Dencun network upgrade اور اس کے اثرات کے بارے میں مزید](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
