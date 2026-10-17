---
name: commit
description: Commit staged/working changes using this repo's commit message convention — "[taskid - ]Persian date time - short description" — and split unrelated changes into separate, grouped commits. Use whenever the user asks to commit changes in this repo, or invokes /commit.
---

# Commit message convention

Every commit message in this repo follows this shape:

```
[<taskid> - ]<persian-date> <time> - <short description>
```

- `<taskid>` is **optional**: include it only when the user gives one (or one is
  clearly implied by the conversation, e.g. a ticket/issue id). Omit the
  leading `<taskid> - ` segment entirely when there is no task id — do not
  invent one.
- `<persian-date> <time>` is the current local date/time rendered in the
  Jalali (Persian) calendar with Persian digits, e.g. `۱۴۰۵/۰۷/۲۵ ۲۳:۵۴`.
  Get it by running:
  ```
  python3 -I .claude/skills/commit/scripts/jalali_now.py
  ```
  Run it right before committing so the timestamp is accurate — don't reuse a
  stale value from earlier in the session.
- `<short description>` is a concise, user-visible summary of that commit's
  change (English, imperative/present tense), matching the style already in
  `git log` (see `AGENTS.md` commit guidance: focused on the user-visible
  change).

Examples from this repo's history:

- `۱۴۰۵/۰۵/۳۰ ۱۰:۱۹ - Improve account, checkout, and product flows` (no task id)
- `TASK-42 - ۱۴۰۵/۰۷/۲۵ ۲۳:۵۴ - Fix npm install failure from bogus git dependency` (with task id)

## Grouping rule

Never dump every change into one commit. Before committing:

1. Run `git status` and `git diff` to see everything that changed.
2. Cluster the changes by _similar work_ — the same feature, the same fix,
   the same refactor, the same file family. Unrelated changes (e.g. a build
   fix vs. a UI tweak vs. a docs update) go into **separate commits**, each
   with its own timestamp and description, even if they happened in the same
   session.
3. Stage each group explicitly (`git add <specific files>` — never a blanket
   `git add -A`/`git add .`) and commit it on its own before moving to the
   next group.
4. Re-run the Jalali timestamp script for each commit (time moves between
   commits) rather than reusing one value across the whole batch.

## Steps to commit

1. `git status` and `git diff` (staged + unstaged) to see what's there.
2. Group the changes as above.
3. For each group:
   - `git add <files for this group>`
   - Get a fresh timestamp: `python3 -I .claude/skills/commit/scripts/jalali_now.py`
   - `git commit -m "$(cat <<'EOF'
     [<taskid> - ]<persian-date> <time> - <short description>

     Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
     EOF
     )"`
     (keep whatever attribution footer the session's system reminder
     specifies; don't add one if none is specified)

4. `git status` after the final commit to confirm a clean tree.

Follow the repo's general git safety rules (no `--no-verify`, no force
operations, confirm before pushing) from the top-level agent instructions.
