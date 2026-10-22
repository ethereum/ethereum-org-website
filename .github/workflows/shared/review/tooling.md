# Lane: tooling

Run `/code-review` at **medium** effort.

Then check these rules on the changed lines:

- GitHub workflows: no PR code checked out or run under `pull_request_target`; untrusted input (`github.event.*` titles, bodies, branch names) never interpolated straight into `run:`; permissions no wider than needed.
- gh-aw `.md` workflows: the matching `.lock.yml` is recompiled in the same PR.
- Secrets are never echoed or written to files or artifacts.
