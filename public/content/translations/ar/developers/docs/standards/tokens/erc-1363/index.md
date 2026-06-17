---
title: "معيار الرمز المميز القابل للدفع ⁦ERC-1363⁩"
description: "⁦ERC-1363⁩ هي واجهة امتداد للرموز المميزة ⁦ERC-20⁩ تدعم تنفيذ منطق مخصص على عقد المستلم بعد التحويلات، أو على عقد المنفق بعد الموافقات، كل ذلك ضمن معاملة واحدة."
lang: ar
---

## مقدمة {#introduction}

### ما هو <span dir="ltr">ERC-1363</span>؟ {#what-is-erc1363}

<span dir="ltr">ERC-1363</span> هي واجهة امتداد للرموز المميزة <span dir="ltr">ERC-20</span> تدعم تنفيذ منطق مخصص على عقد المستلم بعد التحويلات، أو على عقد المنفق بعد الموافقات، كل ذلك ضمن معاملة واحدة.

### الاختلافات عن <span dir="ltr">ERC-20</span> {#erc20-differences}

عمليات <span dir="ltr">ERC-20</span> القياسية مثل `transfer` و`transferFrom` و`approve`، لا تسمح بتنفيذ التعليمات البرمجية على عقد المستلم أو المنفق دون معاملة منفصلة.
يؤدي هذا إلى تعقيد في تطوير واجهة المستخدم واحتكاك في التبني لأن المستخدمين يجب أن ينتظروا تنفيذ المعاملة الأولى ثم إرسال المعاملة الثانية.
يجب عليهم أيضًا دفع رسوم الغاز مرتين.

يجعل <span dir="ltr">ERC-1363</span> الرموز المميزة القابلة للاستبدال قادرة على أداء الإجراءات بسهولة أكبر والعمل دون استخدام أي مستمع خارج السلسلة.
يسمح بإجراء استدعاء على عقد المستلم أو المنفق، بعد تحويل أو موافقة، في معاملة واحدة.

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصيك بقراءة ما يلي أولاً:

- [معايير الرموز المميزة](/developers/docs/standards/tokens/)
- [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)

## المحتوى {#body}

يقدم <span dir="ltr">ERC-1363</span> واجهة برمجة تطبيقات (<span dir="ltr">API</span>) قياسية للرموز المميزة <span dir="ltr">ERC-20</span> للتفاعل مع العقود الذكية بعد `transfer` أو `transferFrom` أو `approve`.

يوفر هذا المعيار وظائف أساسية لتحويل الرموز المميزة، بالإضافة إلى السماح بالموافقة على الرموز المميزة حتى يتمكن طرف ثالث على السلسلة من إنفاقها، ثم إجراء استدعاء على عقد المستلم أو المنفق.

هناك العديد من الاستخدامات المقترحة للعقود الذكية التي يمكنها قبول استدعاءات <span dir="ltr">ERC-20</span>.

من الأمثلة على ذلك:

- **مبيعات الحشود**: الرموز المميزة المرسلة تؤدي إلى تخصيص مكافأة فورية.
- **الخدمات**: الدفع ينشط الوصول إلى الخدمة في خطوة واحدة.
- **الفواتير**: الرموز المميزة تسوي الفواتير تلقائيًا.
- **الاشتراكات**: الموافقة على المعدل السنوي تنشط الاشتراك ضمن دفعة الشهر الأول.

لهذه الأسباب، سُمي في الأصل **"الرمز المميز القابل للدفع"**.

يوسع سلوك الاستدعاء من فائدته، مما يتيح تفاعلات سلسة مثل:

- **التخزين**: الرموز المميزة المحولة تؤدي إلى القفل التلقائي في عقد التخزين.
- **التصويت**: الرموز المميزة المستلمة تسجل الأصوات في نظام حوكمة.
- **المبادلة**: الموافقات على الرموز المميزة تنشط منطق المبادلة في خطوة واحدة.

يمكن استخدام الرموز المميزة <span dir="ltr">ERC-1363</span> لأدوات مساعدة محددة في جميع الحالات التي تتطلب تنفيذ استدعاء بعد تلقي تحويل أو موافقة.
يعد <span dir="ltr">ERC-1363</span> مفيدًا أيضًا لتجنب فقدان الرموز المميزة أو قفلها في العقود الذكية من خلال التحقق من قدرة المستلم على التعامل مع الرموز المميزة.

على عكس مقترحات امتداد <span dir="ltr">ERC-20</span> الأخرى، لا يتجاوز <span dir="ltr">ERC-1363</span> طرق `transfer` و`transferFrom` الخاصة بـ <span dir="ltr">ERC-20</span> ويحدد معرفات الواجهات التي سيتم تنفيذها مع الحفاظ على التوافق مع الإصدارات السابقة من <span dir="ltr">ERC-20</span>.

من [<span dir="ltr">EIP-1363</span>](https://eips.ethereum.org/EIPS/eip-1363):

### الطرق {#methods}

العقود الذكية التي تنفذ معيار <span dir="ltr">ERC-1363</span> **يجب** أن تنفذ جميع الوظائف في واجهة `ERC1363`، بالإضافة إلى واجهتي `ERC20` و`ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev واجهة امتداد لرموز ERC-20 المميزة تدعم تنفيذ التعليمات البرمجية على عقد المستلم
 * بعد `transfer` أو `transferFrom`، أو التعليمات البرمجية على عقد المنفق بعد `approve`، في معاملة واحدة.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * ملاحظة: معرف ERC-165 لهذه الواجهة هو 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev ينقل مقدار `value` من الرموز المميزة من حساب المتصل إلى `to`
   * ثم يستدعي `ERC1363Receiver::onTransferReceived` على `to`.
   * @param to العنوان الذي يتم تحويل الرموز المميزة إليه.
   * @param value مقدار الرموز المميزة المراد تحويلها.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح خطأ.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev ينقل مقدار `value` من الرموز المميزة من حساب المتصل إلى `to`
   * ثم يستدعي `ERC1363Receiver::onTransferReceived` على `to`.
   * @param to العنوان الذي يتم تحويل الرموز المميزة إليه.
   * @param value مقدار الرموز المميزة المراد تحويلها.
   * @param data بيانات إضافية بدون تنسيق محدد، يتم إرسالها في الاستدعاء إلى `to`.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح خطأ.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev ينقل مقدار `value` من الرموز المميزة من `from` إلى `to` باستخدام آلية السماحية
   * ثم يستدعي `ERC1363Receiver::onTransferReceived` على `to`.
   * @param from العنوان الذي سيتم إرسال الرموز المميزة منه.
   * @param to العنوان الذي يتم تحويل الرموز المميزة إليه.
   * @param value مقدار الرموز المميزة المراد تحويلها.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح خطأ.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev ينقل مقدار `value` من الرموز المميزة من `from` إلى `to` باستخدام آلية السماحية
   * ثم يستدعي `ERC1363Receiver::onTransferReceived` على `to`.
   * @param from العنوان الذي سيتم إرسال الرموز المميزة منه.
   * @param to العنوان الذي يتم تحويل الرموز المميزة إليه.
   * @param value مقدار الرموز المميزة المراد تحويلها.
   * @param data بيانات إضافية بدون تنسيق محدد، يتم إرسالها في الاستدعاء إلى `to`.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح خطأ.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev يعين مقدار `value` من الرموز المميزة كسماحية لـ `spender` على الرموز المميزة الخاصة بالمتصل
   * ثم يستدعي `ERC1363Spender::onApprovalReceived` على `spender`.
   * @param spender العنوان الذي سينفق الأموال.
   * @param value مقدار الرموز المميزة المراد إنفاقها.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح خطأ.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev يعين مقدار `value` من الرموز المميزة كسماحية لـ `spender` على الرموز المميزة الخاصة بالمتصل
   * ثم يستدعي `ERC1363Spender::onApprovalReceived` على `spender`.
   * @param spender العنوان الذي سينفق الأموال.
   * @param value مقدار الرموز المميزة المراد إنفاقها.
   * @param data بيانات إضافية بدون تنسيق محدد، يتم إرسالها في الاستدعاء إلى `spender`.
   * @return قيمة منطقية تشير إلى نجاح العملية ما لم يتم طرح خطأ.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

العقد الذكي الذي يريد قبول الرموز المميزة <span dir="ltr">ERC-1363</span> عبر `transferAndCall` أو `transferFromAndCall` **يجب** أن ينفذ واجهة `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev واجهة لأي عقد يريد دعم `transferAndCall` أو `transferFromAndCall` من عقود الرموز المميزة ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev كلما تم تحويل رموز ERC-1363 المميزة إلى هذا العقد عبر `ERC1363::transferAndCall` أو `ERC1363::transferFromAndCall`
   * بواسطة `operator` من `from`، يتم استدعاء هذه الدالة.
   *
   * ملاحظة: لقبول التحويل، يجب أن تُرجع هذه الدالة
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (أي 0x88a7ca5c، أو محدد الدالة الخاص بها).
   *
   * @param operator العنوان الذي استدعى دالة `transferAndCall` أو `transferFromAndCall`.
   * @param from العنوان الذي يتم تحويل الرموز المميزة منه.
   * @param value مقدار الرموز المميزة المحولة.
   * @param data بيانات إضافية بدون تنسيق محدد.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` إذا كان التحويل مسموحًا به ما لم يتم طرح خطأ.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

العقد الذكي الذي يريد قبول الرموز المميزة <span dir="ltr">ERC-1363</span> عبر `approveAndCall` **يجب** أن ينفذ واجهة `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev واجهة لأي عقد يريد دعم `approveAndCall` من عقود الرموز المميزة ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev كلما وافق `owner` لرموز ERC-1363 المميزة على هذا العقد عبر `ERC1363::approveAndCall`
   * لإنفاق رموزه المميزة، يتم استدعاء هذه الدالة.
   *
   * ملاحظة: لقبول الموافقة، يجب أن تُرجع هذه الدالة
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (أي 0x7b04a2d0، أو محدد الدالة الخاص بها).
   *
   * @param owner العنوان الذي استدعى دالة `approveAndCall` وكان يمتلك الرموز المميزة مسبقًا.
   * @param value مقدار الرموز المميزة المراد إنفاقها.
   * @param data بيانات إضافية بدون تنسيق محدد.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` إذا كانت الموافقة مسموحة ما لم يتم طرح خطأ.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## قراءة إضافية {#further-reading}

- [<span dir="ltr">ERC-1363</span>: معيار الرمز المميز القابل للدفع](https://eips.ethereum.org/EIPS/eip-1363)
- [<span dir="ltr">ERC-1363</span>: مستودع <span dir="ltr">GitHub</span>](https://github.com/vittominacori/erc1363-payable-token)