# 1.1.5 Technical Methodology

## Model-Driven Development

The solution must follow a model-driven development approach centered
on a `MyModel` domain boundary.

`MyModel` must define at least:

- services
- controllers
- repositories

## Component Folder Convention

Reusable UI components must follow this structure inside `src/components/MyComponent`:

```text
src/
  components/
    MyComponent/
      index.tsx
      MyComponent.types.ts
      MyComponent.stories.tsx
      MyComponent.css
      MyComponent.tests.tsx
```

The component convention must be applied consistently to dashboard
widgets, form dialogs, KPIs, header actions, footer actions, and
shared layout components.
