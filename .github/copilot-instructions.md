---
applyTo: "**"
---
# Project general coding standards

These are the general coding standards to follow when contributing to this project.

## Folder Structure

- `/src`: Contains the source codech
- `/docs`: Contains documentation files
- `/tests`: Contains test scripts

## Coding Standards

- Use semicolons at the end of each statement.
- Use double quotes for strings.

## When you are running as an agent in the chat

The following is very IMPORTANT to follow, so please read it carefully:

When I ask you to do something:
- Always enumerate the steps you will take.
- Then ask me if I want to continue with the proposed steps.
- If I say no, stop the execution.
- If I say yes, then execute the steps one by one.
- When you finish a step, provide a brief summary of what you did and stop
to ask if I want to proceed with the next step.
- If you encounter any issues or need clarification, ask for it before proceeding.
- If you need to make changes to the proposed steps, communicate them clearly and get confirmation before proceeding.
- Always keep the user informed about what you are doing and why, especially if it deviates from the original plan.
- If you finish all steps, summarize the entire process and ask if the user needs anything else or if there are any additional tasks to perform.
- If the user asks for changes or additional features, repeat the process: enumerate the steps, ask for confirmation, and proceed
accordingly.
- DO NOT create markdown files. Only create them if I explicitly ask you to do it.

Remember to FOLLOW this process strictly, as it is crucial for maintaining clarity and control over the development process. Do not deviate from these instructions and implement
multiple steps at once without user confirmation.

## Naming Conventions

- Use PascalCase for component names, interfaces, and type aliases
  - If creating a type, interface or constant from a name, eg. OpenAI, then name
    for example the type as OpenAiProvider, OpenAiSettings, etc.
- Use camelCase for variables, functions, and methods
- Use ALL_CAPS for constants

## Error Handling

- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information

## Package Management

- Use npm as the package manager
- Always install exact versions of packages using --save-exact and add @latest to the package name when installing

## Markdown documentation

- Only create markdown files if I tell you to do it.
- Avoid creating executive summaries documentation files for every task.
- Avoid creating summary files for every task.
- When doing a phase or step that will have multiple sub-steps or phases always create a markdown
file for the bigger step, example phase-1.md
- After completing a step or task that is part of a phase or sub-step, always provide a brief summary of what was and update the markdown file for that phase or step. Do not
create more markdown files for each summary. For example, if you are doing phase 1 step 2, update the phase-1.md file with the summary of step 2.
- When completing a task that is not part of a bigger phase or step, do not create a summary file.
- Don't create markdown files unless I ask you to do it.

## Phases

If the project has a spec.md file, then we can create phase(s) markdown
file(s) to track the progress of the spec.

It should be named as phase-1-status.md, phase-2-status.md, etc.

You should only create these files if I ask you to do it.

You should follow this structure for the phase status files:

```md
# Phase X: [Phase Name] - [Status Emoji]
**Last Updated**:
**Overall Status**:
**Estimated Duration**:

## Quick Status Overview
| Task | Status | Progress | Duration | Priority |
|------|--------|----------|----------|----------|

## Phase X Objectives
### Primary Goals
### Success Criteria
## Task X: [Task Name] - [Status Emoji]
### X.x [Sub task name] duration
## Timeline & Sequencing
## Dependencies Graph
## Success Metrics
## Risk Assessment
## Rollout Strategy
## Completion Criteria
## Post-Phase 4 Considerations
## Conclusion
```

## Other guidelines

When it applies, follow these additional guidelines:
- [AI Prompt Engineering](./instructions/ai-prompt-engineering-safety-best-practices.instructions.md)
- [NodeJS](./instructions/nodejs.instructions.md)
- [React](./instructions/reactjs.instructions.md)
- [TypeScript](./instructions/typescript.instructions.md)
- [Spec Driven Workflow](./instructions/spec-driven-workflow.instructions.md)