# latestx 🚀

`latestx` is a universal dependency intelligence and upgrade CLI that works across ecosystems, languages, and frameworks. It detects your project’s language and package manager, analyzes dependencies, evaluates upgrade paths, and safely updates packages with a strong emphasis on compatibility and developer control.

## ✨ Features

- **Universal Support**: Works interchangeably on Node.js, Python, PHP, Rust, Go, Ruby, and Flutter workspaces.
- **Smart Detection**: Automatically detects your exact setup (e.g., `npm`, `pnpm`, `yarn`, `pip`, `poetry`, `cargo`, `composer`) without needing configuration.
- **Interactive Check**: View available updates color-coded by risk (Patch, Minor, Major) and interactively select which packages to update.
- **AI Compatibility Engine**: Leverages Google Gemini 2.5 Flash to intelligently analyze your entire dependency graph and block upgrades that introduce peer-dependency conflicts or framework incompatibilities.
- **Native Installs**: Seamlessly install new dependencies utilizing your project's specific package manager implicitly.

## 📦 Installation

Make sure you have Node.js installed, then install globally using `npm` (or `pnpm`/`yarn`):

```bash
npm install -g latestx
```

## 🚀 Usage

### `latestx init`
Scans your workspace to detect the primary language and package manager. It extracts your project's metadata and creates a `latestx.yaml` file in the root directory to cache your environment configuration.

```bash
latestx init
```

### `latestx install <package-name>`
Fetches the absolute latest version of a specific package from its remote registry and safely installs it using your workspace's native package manager (like `pnpm`, `cargo`, or `composer`).

```bash
latestx install next
```

### `latestx check`
Checks your current dependencies against remote registries and displays an interactive, color-coded UI. Arrow keys let you navigate and Spacebar lets you select the dependencies you'd like to update.

```bash
latestx check
```

### `latestx update [--compatibility]`
Updates selected or all outdated dependencies.
Add the `--compatibility` flag to invoke the local AI Compatibility Engine.

```bash
latestx update --compatibility
```

*Note: The `--compatibility` flag runs your dependency graph through Gemini AI to verify no updates will break peer dependencies or known framework constraints before executing actual system upgrades.*

### `latestx ai --auth`
By default, `latestx` comes with a built-in, locally-encrypted API key to enable AI features seamlessly. If you prefer to bring your own Gemini API key, use this command to securely encrypt and save your own key locally.

```bash
latestx ai --auth
```

## 🌐 Supported Ecosystems & Registries

| Language       | Package Managers          | Manifest Files                       | Registry Checked |
|----------------|---------------------------|--------------------------------------|------------------|
| **JavaScript** | npm, yarn, pnpm, bun      | `package.json`                       | npmjs.com        |
| **Python**     | pip, poetry               | `requirements.txt`, `pyproject.toml` | PyPI             |
| **Rust**       | cargo                     | `Cargo.toml`                         | crates.io        |
| **PHP**        | composer                  | `composer.json`                      | Packagist*       |
| **Go**         | go                        | `go.mod`                             | proxy.golang.org |
| **Ruby**       | bundler                   | `Gemfile`                            | RubyGems         |
| **Flutter**    | flutter                   | `pubspec.yaml`                       | pub.dev*         |

*\* Note: Some registry endpoints may have partial support depending on the version.*

## ⚙️ Configuration (`latestx.yaml`)

After running `latestx init`, you'll see a generated configuration file:
```yaml
version: 1
project:
  name: your-project-name
  detected_at: 2026-02-27T12:00:00.000Z
environment:
  primary_language: javascript
  primary_framework: nextjs
  manifest_path: package.json
preferences:
  allow_major_updates: false
  interactive_default: true
  enable_ai_compatibility: true
```

You can optionally commit this file to your repository to standardize update rules across your entire team.

## 📄 License

MIT
