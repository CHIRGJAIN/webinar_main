## Workflow Checklist

- [x] Verify that `.github/copilot-instructions.md` exists.
- [x] Clarify project requirements (framework, language, stack) before coding.
- [x] Scaffold the project from the workspace root using `npx create-next-app@latest .` with the requested flags.
- [x] Customize the project per user specs before handing off.
- [x] Install only the dependencies required for the requested features (no extra extensions needed).
- [x] Compile and lint the project (`npm run lint`, `npm run build`).
- [ ] Create and run VS Code tasks only if explicitly required by the project (currently not needed).
- [ ] Launch the project only after user confirmation of debug/run settings.
- [x] Ensure README.md and this instructions file describe the current project state.

## Execution Guidelines
- Track progress with the workspace todo list tool when work spans multiple steps.
- Keep explanations concise; summarize command output instead of pasting everything.
- Use `.` as the working directory for all commands and avoid creating extra folders.
- Only install extensions or dependencies that were explicitly requested or provided by setup info.
- Prefer built-in tools (file creation, apply_patch, etc.) over manual editing via the terminal.
- Avoid adding external links or media unless requested; use placeholders only when clearly labeled.
- When features are ambiguous, ask the user for clarification before implementing assumptions.

## Completion Criteria
- Scaffolded Next.js project builds without errors and lint warnings are addressed.
- Mock auth, subscription logic, dashboards, and landing experience match the Global Academic Forum spec.
- Documentation (README + this file) reflects the current implementation.
- Provide clear instructions for running dev server, linting, and production build in the README or final reply.
