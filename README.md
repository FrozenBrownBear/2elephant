# Fextify (Rewritten)

This repository now contains a fresh SvelteKit frontend bundled with Tauri v2.
The original codebase has been removed. The Tauri commands implemented match
those described in `COMMANDS_SPEC.md`.

An accompanying Node based CLI (`fextify`) mirrors the backend commands for
quick automation and testing.

## Development

```bash
cd app
npm install
npm run tauri dev
```

This starts the SvelteKit dev server and launches the Tauri app.

## CLI Usage

Install dependencies in the project root then invoke the CLI:

```bash
npm install
npx fextify new
```

Run `npx fextify` without arguments to see available commands.

## Installer

Run `./install.sh` to install dependencies for both the CLI and Tauri app and
build the desktop bundle in one step.

## Tests

Execute `npm test` from the repository root to verify the CLI logic.
