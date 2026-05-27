# AGENTS.md

## Add-on Structure

- Add-ons in this directory should be self-contained.
- Behavior packs belong under `behavior_packs`.
- Resource packs belong under `resource_packs`.
- Do not place behavior or resource pack files directly at the repository root.

## Development Rules

- Follow the Single Responsibility Principle.
- Keep modules, classes, and functions focused on one clear responsibility.
- Avoid mixing unrelated concerns in a single file.
- For script-based behavior packs, separate configuration, event registration, domain logic, UI, and utility helpers where practical.

## Python

- Run Python only inside the project's virtual environment.
- Prefer a project-local entrypoint such as `.venv/bin/python`, `.venv/bin/pip`, `uv run`, or an equivalent local environment command.
- If a virtual environment is not present, do not silently fall back to system Python.

## GitHub

- Before pushing work to GitHub, update this `agents.md` file when working-copy instructions change.
