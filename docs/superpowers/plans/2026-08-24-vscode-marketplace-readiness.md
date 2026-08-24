# VS Code Marketplace Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `count-words` ready to package and discover in the VS Code Marketplace without publishing it or changing its counting rules.

**Architecture:** Keep the existing single extension entry point and status-bar update flow. Add Marketplace metadata and one contributed command in the manifest, then have that command call the same refresh function used by editor events. Add only static release/support assets; do not add a backend, settings store, telemetry, or CI.

**Tech Stack:** TypeScript 5, VS Code Extension API, webpack, npm, `@vscode/vsce`, VS Code integration tests.

## Global Constraints

- Do not publish to the Marketplace or create/manage publisher credentials.
- Do not change word/character counting semantics or internationalization rules.
- Use a PNG icon of at least 128×128; do not add an SVG icon.
- Keep source, tests, and development dependencies excluded from the VSIX through `.vscodeignore`.
- Do not upgrade dependencies or modify the lockfile for the audit warning.
- Keep new user-facing documentation accurate: the extension is prepared for publication, not already published.

---

### Task 1: Complete Marketplace metadata and release assets

**Files:**
- Modify: `package.json`
- Modify: `package.nls.json`
- Modify: `package.nls.pt-br.json`
- Create: `media/icon.png` (128×128 or larger PNG)
- Create: `SUPPORT.md`
- Modify: `README.md`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Produces a valid extension manifest with Marketplace fields: `displayName`, `description`, `publisher`, `repository`, `bugs`, `homepage`, `license`, `categories`, `keywords`, `icon`, `galleryBanner`, and one command contribution.
- Produces a support link that points to the repository issue tracker.

- [ ] **Step 1: Add the manifest metadata and command declaration**

Use the existing extension identity and add only discoverability fields. Keep `name`, `publisher`, version, engine range, entry point, and activation event compatible with the current package. Add: `categories: ["Productivity"]`, search terms including `word count`, `character count`, `writing`, `statistics`, `keywords`, repository issue/homepage links, `icon: "media/icon.png"`, and a neutral `galleryBanner` color with `theme: "vs-dark"`. Add the command contribution with id `word-and-character-count.refreshCount` and title `Word & Character Count: Refresh Count`.

- [ ] **Step 2: Add the PNG icon**

Create `media/icon.png` as a simple, original 128×128 PNG with a high-contrast document/count motif. Verify its dimensions and file type with Python before staging it.

- [ ] **Step 3: Add support documentation**

Create `SUPPORT.md` with issue-reporting guidance, reproduction details, environment/version information, and the GitHub Issues URL. Do not include secrets or personal data in examples.

- [ ] **Step 4: Align localized manifest strings**

Update `package.nls.json` and `package.nls.pt-br.json` so both descriptions accurately explain live word and character counts for a document or selection. Keep the package identifiers in English and visible prose concise.

- [ ] **Step 5: Correct release-facing documentation**

Update the README version badge from `0.0.2` to `0.0.3`, replace any statement that implies Marketplace publication already happened, document the Command Palette command, and link support to `SUPPORT.md`. Add an Unreleased changelog entry for Marketplace metadata, the command, icon, and support documentation without inventing a release date.

- [ ] **Step 6: Validate static metadata**

Run:

```bash
node -e "const p=require('./package.json'); for (const k of ['name','version','publisher','engines','icon','keywords','categories','contributes']) if (!(k in p)) throw new Error(k); if (p.icon !== 'media/icon.png') throw new Error('icon'); if (!p.contributes.commands.some(c => c.command === 'word-and-character-count.refreshCount')) throw new Error('command');"
python - <<'PY'
from pathlib import Path
data = Path('media/icon.png').read_bytes()
assert data[:8] == b'\x89PNG\r\n\x1a\n'
width = int.from_bytes(data[16:20], 'big')
height = int.from_bytes(data[20:24], 'big')
assert width >= 128 and height >= 128
PY
```

Expected: both commands exit 0.

- [ ] **Step 7: Commit the metadata slice**

```bash
git add package.json package.nls.json package.nls.pt-br.json media/icon.png SUPPORT.md README.md CHANGELOG.md
git diff --cached
git commit -m "feat: prepare extension metadata for Marketplace discovery"
```

### Task 2: Expose the manual refresh command through the existing update flow

**Files:**
- Modify: `src/extension.ts`
- Modify: `src/test/extension.test.ts`

**Interfaces:**
- Consumes the contributed command id `word-and-character-count.refreshCount`.
- Produces a registered command that refreshes the existing status bar item and safely does nothing when no editor is active.

- [ ] **Step 1: Add a failing integration test for command registration**

Add an async VS Code integration test with a comment explaining that it protects the Marketplace-contributed command from becoming metadata-only. The test should execute `word-and-character-count.refreshCount` and await its completion; this fails before the command is registered and proves the runtime contribution is usable.

- [ ] **Step 2: Run the focused test and confirm the baseline result**

Run:

```bash
npm test -- --grep "refresh command"
```

Expected: FAIL with an unregistered-command error before implementation; record the actual output rather than weakening an existing test.

- [ ] **Step 3: Refactor the update function into a reusable refresh operation**

In `activate`, keep the existing counting and display behavior but make the update function a named local function that accepts no arguments and returns after hiding the item when there is no active editor. Register:

```ts
context.subscriptions.push(
  vscode.commands.registerCommand('word-and-character-count.refreshCount', updateStatusBar)
);
```

Register it alongside the existing event subscriptions. Do not change the regular-expression word-count rule, i18n calls, status-bar alignment, or selection fallback.

- [ ] **Step 4: Run the focused test and confirm it passes**

Run the same `npm test -- --grep "refresh command"` command. Expected: the command registration test passes.

- [ ] **Step 5: Run the full test suite and lint**

```bash
npm run lint
npm run compile-tests
npm test
```

Expected: exit code 0 and no test failures.

- [ ] **Step 6: Commit the runtime slice**

```bash
git add src/extension.ts src/test/extension.test.ts
git diff --cached
git commit -m "feat: add refresh command to extension"
```

### Task 3: Package and inspect the distributable

**Files:**
- Modify: `.vscodeignore` only if package inspection identifies an unintended tracked artifact

**Interfaces:**
- Produces a `.vsix` that contains the compiled extension, manifest, README, CHANGELOG, LICENSE, SUPPORT, and icon, but not TypeScript source, tests, `node_modules`, or development configuration.

- [ ] **Step 1: Install the existing lockfile dependencies**

```bash
npm ci
```

Record the existing audit warning but do not change `package-lock.json`.

- [ ] **Step 2: Run the complete verification commands**

```bash
npm run lint
npm run compile-tests
npm test
npx --yes @vscode/vsce package --no-dependencies --out /tmp/count-words-marketplace.vsix
```

Expected: all commands exit 0.

- [ ] **Step 3: Inspect the VSIX contents**

```bash
unzip -l /tmp/count-words-marketplace.vsix
```

Confirm that `extension/package.json`, `extension/dist/extension.js`, `extension/README.md`, `extension/CHANGELOG.md`, `extension/LICENSE`, `extension/SUPPORT.md`, and `extension/media/icon.png` exist, while `extension/src/`, `extension/out/`, and `extension/node_modules/` do not.

- [ ] **Step 4: Review the final diff and status**

```bash
git diff main...HEAD --stat
git status --short
git log --oneline --decorate -4
```

Expected: only the design, plan, Marketplace metadata/assets, and command/test changes are present; no generated build artifacts are tracked.

- [ ] **Step 5: Commit any narrowly required packaging exclusion fix**

Only if inspection finds an unintended artifact, update `.vscodeignore`, rerun packaging, and commit:

```bash
git add .vscodeignore
git diff --cached
git commit -m "fix: exclude development artifacts from extension package"
```
