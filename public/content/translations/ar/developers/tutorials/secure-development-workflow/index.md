---
title: Smart contract security checklist
description: A suggested workflow for writing secure smart contracts
author: "طريق البتات"
tags: [ "العقود الذكيه ", "الأمن", "solidity" ]
skill: intermediate
lang: ar
published: 2020-09-07
source: عقود البناء الآمنة
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## قائمة مراجعة تطوير العقود الذكية {#smart-contract-development-checklist}

Here's a high-level process we recommend following while you write your smart contracts.

Check for known security issues:

- راجع عقودك باستخدام [Slither](https://github.com/crytic/slither). It has more than 40 built-in detectors for common vulnerabilities. Run it on every check-in with new code and ensure it gets a clean report (or use triage mode to silence certain issues).
- راجع عقودك باستخدام [Crytic](https://crytic.io/). It checks for 50 issues that Slither does not. Crytic can help your team stay on top of each other too, by easily surfacing security issues in Pull Requests on GitHub.

Consider special features of your contract:

- Are your contracts upgradeable؟ راجع النص البرمجي الخاص بقابلية الترقية بحثًا عن العيوب باستخدام [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) أو [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). We've documented 17 ways upgrades can go sideways.
- Do your contracts purport to conform to ERCs؟ تحقق منها باستخدام [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). This tool instantly identifies deviations from six common specs.
- Do you integrate with 3rd party tokens؟ راجع [قائمة مراجعة تكامل الرموز](/developers/tutorials/token-integration-checklist/) قبل الاعتماد على العقود الخارجية.

Visually inspect critical security features of your code:

- راجع طابعة [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) الخاصة بـ Slither. Avoid inadvertent shadowing and C3 linearization issues.
- راجع طابعة [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) الخاصة بـ Slither. It reports function visibility and access controls.
- راجع طابعة [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) الخاصة بـ Slither. It reports access controls on state variables.

Document critical security properties and use automated test generators to evaluate them:

- تعلم كيفية [توثيق خصائص الأمان للنص البرمجي الخاص بك](/developers/tutorials/guide-to-smart-contract-security-tools/). It's tough as first, but it's the single most important activity for achieving a good outcome. It's also a prerequisite for using any of the advanced techniques in this tutorial.
- حدد خصائص الأمان في سوليديتي، للاستخدام مع [Echidna](https://github.com/crytic/echidna) و [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Focus on your state machine, access controls, arithmetic operations, external interactions, and standards conformance.
- حدد خصائص الأمان باستخدام [واجهة برمجة تطبيقات Python الخاصة بـ Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Focus on inheritance, variable dependencies, access controls, and other structural issues.
- شغِّل اختبارات الخصائص الخاصة بك عند كل عملية إيداع باستخدام [Crytic](https://crytic.io). Crytic can consume and evaluate security property tests so everyone on your team can easily see that they pass on GitHub. Failing tests can block commits.

Finally, be mindful of issues that automated tools cannot easily find:

- Lack of privacy: everyone else can see your transactions while they're queued in the pool
- Front running transactions
- Cryptographic operations
- Risky interactions with external DeFi components

## اطلب المساعدة {#ask-for-help}

[ساعات العمل الرسمية لإيثريوم](https://calendly.com/dan-trailofbits/office-hours) تُعقد كل يوم ثلاثاء بعد الظهر. These 1-hour, 1-on-1 sessions are an opportunity to ask us any questions you have about security, troubleshoot using our tools, and get feedback from experts about your current approach. We will help you work through this guide.

انضم إلى مجموعتنا على Slack: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). We're always available in the #crytic and #ethereum channels if you have any questions.
