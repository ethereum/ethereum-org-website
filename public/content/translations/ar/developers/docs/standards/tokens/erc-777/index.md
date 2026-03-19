---
title: ERC-777 Token Standard
description: "تعرف على ERC-777، وهو معيار محسّن للرموز القابلة للاستبدال مع خطافات، على الرغم من أن ERC-20 يوصى به للأمان."
lang: ar
---

## تحذير {#warning}

**من الصعب تنفيذ ERC-777 بشكل صحيح، بسبب قابليته للتعرض لأشكال مختلفة من الهجوم (https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). من المستحسن استخدام [ERC-20](/developers/docs/standards/tokens/erc-20/) بدلاً من ذلك.** تظل هذه الصفحة بمثابة أرشيف تاريخي.

## مقدمة؟ {#introduction}

/developers/docs/standards/tokens/erc-20//developers/docs/standards/tokens/erc-20//developers/docs/standards/tokens/erc-20//developers/docs/standards/tokens/erc-20/

## المتطلبات الأساسية {#prerequisites}

ERC-777 هو معيار رمز قابل للاستبدال يعمل على تحسين المعيار [ERC-20](/developers/docs/standards/tokens/erc-20/) الحالي.

## ما التحسينات التي يقترحها ERC-777 مقارنة بـ ERC-20؟ {#-erc-777-vs-erc-20}

يوفر ERC-777 التحسينات التالية مقارنة بـ ERC-20.

### خطافات {#hooks}

الـ Hooks هي دالة موصوفة في كود العقد الذكي. يتم استدعاء الـ Hooks عند إرسال التوكنات أو استلامها من خلال العقد. يتيح ذلك للعقد الذكي الاستجابة للتوكنات الواردة أو الصادرة.

يتم تسجيل الخطافات واكتشافها باستخدام معيار [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### لماذا تعد الـ hooks رائعة؟ {#why-are-hooks-great}

1. تسمح الخطافات بإرسال الرموز إلى عقد وإخطار العقد في معاملة واحدة، على عكس [ERC-20](https://eips.ethereum.org/EIPS/eip-20)، والذي يتطلب مكالمة مزدوجة (`approve`/`transferFrom`) لتحقيق ذلك.
2. العقود التي لم تسجل hooks غير متوافقة مع ERC-777. سيقوم العقد المرسل بإلغاء المعاملة عندما لا يكون العقد المستلم قد سجل hook. هذا يمنع عمليات النقل العرضية إلى عقود ذكية لا تدعم ERC-777.
3. Hooks can reject transactions.

### الأعداد العشرية {#decimals}

يحل المعيار أيضًا الارتباك حول "الأعداد العشرية" الناجم عن ERC-20. This clarity improves the developer experience.

### التوافق مع ERC-20 {#backwards-compatibility-with-erc-20}

يمكن التفاعل مع عقود ERC-777 كما لو كانت عقود ERC-20.

## قراءة إضافية {#further-reading}

[EIP-777: معيار الرمز المميز](https://eips.ethereum.org/EIPS/eip-777)
