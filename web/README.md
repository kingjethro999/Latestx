# Latestx Web & Documentation Site

This is the Next.js web application and documentation site for [Latestx](https://github.com/King-Jethro/Latestx), the universal dependency intelligence and upgrade CLI.

## About Latestx

`latestx` works across ecosystems, languages, and frameworks. It detects your project's language and package manager, analyzes dependencies, evaluates upgrade paths, and safely updates packages with a strong emphasis on compatibility and developer control.

## Running the Website Locally

First, run the development server:

```bash
pnpm dev
# or npm run dev, yarn dev, bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CLI Commands Reference

Most commands will now auto-initialize the workspace and create a `latestx.yaml` if it is missing.

### Installation & Initialization
- **`npm install -g latestx`**: Install Latestx globally.
- **`latestx init`**: Scans your workspace to detect the primary language and package manager. Creates a `latestx.yaml` config file.

### Package Management
- **`latestx install <package> [-c, --compatible]`**: Fetches the latest version of a package from its registry and installs it using your native package manager. Use `-c` to let the AI analyze your project's current dependencies and install the safest compatible version.
- **`latestx uninstall <package>`**: Removes a package using your project's native package manager.
- **`latestx check [-c, --compatibility] [-n, --non-interactive]`**: Checks dependencies against remote registries and displays an interactive, color-coded selection UI.
- **`latestx update [-c, --compatibility]`**: Updates dependencies to their latest safe versions. Add `-c` or `--compatibility` to run the AI Compatibility Engine before updating.
- **`latestx list`**: List all installed packages from your ecosystem manifest natively.

### Analysis & Reports
- **`latestx outdated [-f, --format json|markdown]`**: Non-interactive report of outdated dependencies. Supports JSON and Markdown output for CI/CD pipelines.
- **`latestx doctor`**: Diagnoses your environment: checks `latestx.yaml`, package manager availability, registry connectivity, and AI key status.
- **`latestx ai [-a, --auth]`**: Latestx ships with a built-in AI key. Use `-a` or `--auth` to set your own Gemini API key for compatibility checks.

### Config & Maintenance
- **`latestx config edit`**: Interactively edit your configuration.
- **`latestx clean`**: Clean the package manager cache natively.
- **`latestx log [-l, --lines <number>]`**: View execution logs.
- **`latestx upgrade`**: Update latestx itself to the latest version.

---

Built by King Jethro.
