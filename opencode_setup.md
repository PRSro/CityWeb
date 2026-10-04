# OpenCode Setup (no Claude, no custom agents)

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
    "opencode-snip",
    "@tarquinen/opencode-dcp",
    "opencode-ignore",
    "opencode-mem",
    "opencode-skills",
    "opencode-worktree",
    "opencode-roadmap",
    "opencode-notify"
  ],

  // ---------- Instructions (loaded every session, keep SHORT) ----------
  "instructions": [
    "AGENTS.md",
    ".opencode/rules/*.md"
  ],

  // ---------- Context and token control ----------
  "compaction": {
    "auto": true,
    "prune": true
  },

  "watcher": {
    "ignore": [
      "node_modules/**", "dist/**", "build/**", ".next/**",
      ".git/**", "coverage/**", "*.lock", "*.min.js", "*.map"
    ]
  },

  // ---------- MCP servers ----------
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "enabled": true
    }
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
      "rm -rf*": "deny"
    }
  },

  // ---------- Formatters ----------
  "formatter": {
    "prettier": {
      "command": ["npx", "prettier", "--write", "$FILE"],
      "extensions": [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".md"]
    }
  }
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

Plugin names come from community awesome-opencode lists and were not checked
against npm. Verify each name and pin a version before relying on it. Start
with the 8 enabled above, since every extra plugin adds prompt and tool
tokens. Other candidates: Honcho (alternative memory), Beads (task tracking),
OpenCode Swarm (multi-agent review, token-hungry), Opencode Hooks Plugin,
Opencode Sessions, OpenCode Adaptive Thinking, HTML to Markdown, Crawlberg,
Opencode Log Sanitizer, Opencode Quota, agenttrace, Oh My Opencode.
```
