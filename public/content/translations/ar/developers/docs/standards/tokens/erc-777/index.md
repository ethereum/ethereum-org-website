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

## What improvements does ERC-777 propose over ERC-20؟ {#-erc-777-vs-erc-20}

The ERC-777 provides the following improvements over ERC-20.

### خطافات{#hooks}

Hooks are a function described in the code of a smart contract. Hooks get called when tokens are sent or received through the contract. This allows a smart contract to react to incoming or outgoing tokens.

يتم تسجيل الخطافات واكتشافها باستخدام معيار [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Why are hooks great؟ {#why-are-hooks-great}

1. تسمح الخطافات بإرسال الرموز إلى عقد وإخطار العقد في معاملة واحدة، على عكس [ERC-20](https://eips.ethereum.org/EIPS/eip-20)، والذي يتطلب مكالمة مزدوجة (`approve`/`transferFrom`) لتحقيق ذلك.
2. Contracts that have not registered hooks are incompatible with ERC-777. The sending contract will abort the transaction when the receiving contract has not registered a hook. This prevents accidental transfers to non-ERC-777 smart contracts.
3. Hooks can reject transactions.

### الأعداد العشرية {#decimals}

يحل المعيار أيضًا الارتباك حول "الأعداد العشرية" الناجم عن ERC-20. This clarity improves the developer experience.

### التوافق مع ERC-20 {#backwards-compatibility-with-erc-20}

ERC-777 contracts can be interacted with as if they were ERC-20 contracts.

## قراءة إضافية {#further-reading}

[EIP-777: معيار الرمز المميز](https://eips.ethereum.org/EIPS/eip-777)
