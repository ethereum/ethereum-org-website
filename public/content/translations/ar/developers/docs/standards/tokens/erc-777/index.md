---
title: "معيار الرمز المميز ⁦ERC-777⁩"
description: "تعرف على ⁦ERC-777⁩، وهو معيار محسن للرموز القابلة للاستبدال مع خطافات (hooks)، على الرغم من أنه يوصى باستخدام ⁦ERC-20⁩ لأسباب أمنية."
lang: ar
---

## تحذير {#warning}

**يصعب تنفيذ <span dir="ltr">ERC-777</span> بشكل صحيح، بسبب [قابليته لأشكال مختلفة من الهجمات](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). يوصى باستخدام [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) بدلاً من ذلك.** تبقى هذه الصفحة كأرشيف تاريخي.

## مقدمة؟ {#introduction}

<span dir="ltr">ERC-777</span> هو معيار رمز قابل للاستبدال يعمل على تحسين معيار [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) الحالي.

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصيك بقراءة المزيد حول [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) أولاً.

## ما هي التحسينات التي يقترحها <span dir="ltr">ERC-777</span> مقارنة بـ <span dir="ltr">ERC-20</span>؟ {#-erc-777-vs-erc-20}

يوفر <span dir="ltr">ERC-777</span> التحسينات التالية مقارنة بـ <span dir="ltr">ERC-20</span>.

### الخطافات (Hooks) {#hooks}

الخطافات (Hooks) هي دالة موصوفة في كود العقد الذكي. يتم استدعاء الخطافات عند إرسال أو استلام الرموز المميزة من خلال العقد. يتيح ذلك للعقد الذكي التفاعل مع الرموز المميزة الواردة أو الصادرة.

يتم تسجيل الخطافات واكتشافها باستخدام معيار [<span dir="ltr">ERC-1820</span>](https://eips.ethereum.org/EIPS/eip-1820).

#### لماذا تعتبر الخطافات رائعة؟ {#why-are-hooks-great}

1. تسمح الخطافات بإرسال الرموز المميزة إلى عقد وإشعار العقد في معاملة واحدة، على عكس [<span dir="ltr">ERC-20</span>](https://eips.ethereum.org/EIPS/eip-20)، الذي يتطلب استدعاءً مزدوجًا (`approve`/`transferFrom`) لتحقيق ذلك.
2. العقود التي لم تسجل خطافات غير متوافقة مع <span dir="ltr">ERC-777</span>. سيقوم العقد المرسل بإلغاء المعاملة عندما لا يكون العقد المستلم قد سجل خطافًا. هذا يمنع التحويلات العرضية إلى العقود الذكية غير المتوافقة مع <span dir="ltr">ERC-777</span>.
3. يمكن للخطافات رفض المعاملات.

### الخانات العشرية (Decimals) {#decimals}

يحل المعيار أيضًا الارتباك حول `decimals` الذي تسبب فيه <span dir="ltr">ERC-20</span>. هذا الوضوح يحسن تجربة المطور.

### التوافق مع الإصدارات السابقة لـ <span dir="ltr">ERC-20</span> {#backwards-compatibility-with-erc-20}

يمكن التفاعل مع عقود <span dir="ltr">ERC-777</span> كما لو كانت عقود <span dir="ltr">ERC-20</span>.

## قراءة إضافية {#further-reading}

[<span dir="ltr">EIP-777</span>: معيار الرمز المميز](https://eips.ethereum.org/EIPS/eip-777)