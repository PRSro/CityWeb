# OpenCode Setup (no Claude, no custom agents)

`opencode.jsonc` and `AGENTS.md` are untracked in git for this repo, so this
document is the tracked mirror of the live config. Keep the two in sync.

## 1. Config file

Save the block below as `opencode.jsonc` in your project root
(or `~/.config/opencode/opencode.jsonc` for a global config).

```jsonc
{
  "$schema": "https://opencode.ai/config.json",

  // ---------- Models ----------
  // Leave unset to use whatever you pick via /models after running /connect.
  // Or pin one, in the form "provider/model-id", e.g.:
  // "model": "openai/gpt-5",
  // "small_model": "openai/gpt-5-mini",

  "autoupdate": "notify",
  "share": "disabled",

  // ---------- Plugins ----------
  // VERIFY each npm package name and PIN a version before installing (e.g. "pkg@1.2.3").
  "plugin": [
    "@tarquinen/opencode-dcp",
    "opencode-mem",
    "cc-safety-net",
    "opencode-snip@1.6.1",
    "opencode-caveman",
    "oh-my-opencode-slim",
    "opencode-usage-plugin@0.0.1",
  ],

  // ---------- Instructions (loaded every session, keep SHORT) ----------
  "instructions": ["AGENTS.md", ".opencode/rules/*.md"],

  // ---------- Context and token control ----------
  "compaction": {
    "auto": true,
    "prune": true,
  },

  "watcher": {
    "ignore": [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".next/**",
      ".git/**",
      "coverage/**",
      "*.lock",
      "*.min.js",
      "*.map",
    ],
  },

  // ---------- MCP servers ----------
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "enabled": true,
    },
  },

  // ---------- Permissions ----------
  "permission": {
    "edit": "ask",
    "webfetch": "ask",
    "bash": {
      "*": "ask",
      "git status*": "allow",
      "git diff*": "allow",
      "git log*": "allow",
      "ls*": "allow",
      "cat *": "allow",
      "grep *": "allow",
      "rg *": "allow",
      "npm test*": "allow",
      "npm run lint*": "allow",
      "git push*": "deny",
      "rm -rf*": "deny",
    },
  },

  // ---------- Formatters ----------
  "formatter": {
    "prettier": {
      "command": ["npx", "prettier", "--write", "$FILE"],
      "extensions": [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".md"],
    },
  },
}
```

## 2. AGENTS.md (keeps scoping and planning behavior, works with any model)

Save as `AGENTS.md` in your project root. Keep it under about 100 lines,
because it loads on every session.

```md
## Workflow

- Planning: do not edit files. Output a numbered plan with files to touch,
  risks, tests to run, and an explicit OUT OF SCOPE list. Keep it under 400 words.
- Building: implement only the approved plan, with the smallest possible diff.
  If the plan is wrong, stop and report.
- Search with the fewest file reads. Never paste whole files into replies.

## Project

- Stack: <fill in>
- Test command: <fill in>
- Lint command: <fill in>
- Conventions: <fill in>
```

## 3. First-run steps

1. Run `opencode` in your project.
2. Run `/connect` and add your provider.
3. Run `/models` and pick a model.
4. Use Tab to switch between the built-in `plan` agent (read-only) and `build`.

## 4. Plugin notes

The 7 plugins enabled above were each verified to exist on npm:

| Plugin                        | Resolved | Note                                        |
| ----------------------------- | -------- | ------------------------------------------- |
| `@tarquinen/opencode-dcp`     | 3.2.0    | loads OK                                    |
| `opencode-mem`                | 2.28.3   | declares `opencode.plugin` hooks            |
| `cc-safety-net`               | 2.5.2    | loads OK                                    |
| `opencode-snip@1.6.1`         | 1.6.1    | pinned; see below                           |
| `opencode-caveman`            | 0.1.4    |                                             |
| `oh-my-opencode-slim`         | 3.0.2    |                                             |
| `opencode-usage-plugin@0.0.1` | 0.0.1    | pinned; 0.0.1 is the only published version |

`opencode-snip@1.6.1` exports a **function** as its default
(`export default SnipPlugin`, where `SnipPlugin` is `async ({ $ }) => ...`).
This build rejects function-shaped plugins: `Plugin must export a default
definition with an id and an effect or setup function`. Expect a
`failed to load plugin` warning for it; check the log before trusting it.

Every extra plugin adds prompt and tool tokens, so add new ones one at a time
and watch `~/.local/share/opencode/log/opencode.log` for
`failed to load plugin` entries. Known-bad names, removed from this config
after they failed here: `opencode-ignore`, `opencode-skills`,
`opencode-worktree` (no entrypoint), `opencode-roadmap` (404 on npm),
`opencode-notify`.
