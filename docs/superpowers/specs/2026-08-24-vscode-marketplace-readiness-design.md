# VS Code Marketplace readiness

## Goal

Prepare `count-words` for publication and discovery in the VS Code Marketplace without publishing it or changing the core counting behavior.

## Approved approach

Use the recommended middle path: complete Marketplace metadata and documentation, expose one explicit Command Palette command, keep the extension lightweight, and verify the distributable package locally. Do not add CI or credentials as part of this change.

## Changes

- Complete `package.json` Marketplace metadata: human-facing description, `Productivity` category, search keywords, links, icon, gallery presentation, and a public command contribution.
- Add a PNG icon suitable for the Marketplace and a `SUPPORT.md` support entry point.
- Add a `Count Words: Refresh Count` command. It reuses the existing status-bar update path and does not alter counting rules.
- Keep activation scoped to the extension's actual use. The status bar updates for the active editor, selection changes, and document changes.
- Align README and changelog version references with `package.json` and describe the repository as ready to package rather than already published.

## Runtime flow

1. VS Code activates the extension when its contributed command is invoked or when an editor-related activation event is available.
2. `activate` creates the existing status bar item and registers listeners.
3. The command invokes the same update operation used by editor events.
4. The status bar displays counts for the selection, or the full document when there is no selection.

No new persistence, network call, setting, or external service is introduced.

## Error and edge handling

- No active editor: hide the status bar item; the manual command is a no-op.
- Empty selection: count the full document, preserving current behavior.
- Packaging must exclude source, tests, and development artifacts through `.vscodeignore`.
- Marketplace metadata must use a PNG icon; no SVG icon or local README image is introduced.

## Verification

- Run `npm ci`.
- Run `npm run lint`, `npm run compile-tests`, and `npm test`.
- Run `npx --yes @vscode/vsce package --no-dependencies` and inspect the VSIX contents.
- Confirm the working tree contains only intentional source and documentation changes.

## Out of scope

- Publishing to the Marketplace.
- Creating or managing a publisher account or token.
- Dependency upgrades or vulnerability remediation.
- New counting algorithms, settings, telemetry, or UI redesign.
