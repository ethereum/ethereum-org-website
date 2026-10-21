# Lane: translation

No `/code-review`, and do not review translation quality line by line: the intl pipeline and its review own that.

Report only these red flags:

- Hand-edits to non-English files while the English source also changed in this PR (the pipeline propagates English changes; hand-propagation breaks its manifests).
- Edits targeting the wrong base branch.
