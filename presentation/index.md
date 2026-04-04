---
theme: default
_class: lead
color: white
paginate: true
marp: true
backgroundImage: url('./images/tiogars-background.svg')
---

# **Marp** - Markdown Presentation Ecosystem

<!-- Presenter notes: Introduce yourself and the topic of the presentation. Explain that Marp is a tool for creating presentations using Markdown, and that you'll be covering its features, usage, and tools. -->

---

## What is Marp?

Marp transforms Markdown into beautiful slide decks. It is open-source, fast, and supports modern presentation features.

<!-- Presenter notes: Explain that Marp is a powerful tool for creating presentations using Markdown. It allows you to focus on content while it takes care of the formatting and design. Mention that it's open-source, which means it's free to use and has a community of contributors. Highlight that it's fast and supports modern features like custom themes, speaker notes, and various export formats. -->

---

## Key Features

- **Write slides in Markdown**
- **Live preview**
- **Custom themes**
- **Export to PDF, PPTX, HTML, images**
- **Speaker notes**
- **Integrates with VS Code, CLI, and web**

<!-- Presenter notes: Highlight the key features of Marp. Emphasize the ease of writing slides in Markdown, the convenience of live preview, and the ability to customize themes. Mention the various export options and the support for speaker notes. Finally, point out that Marp integrates well with popular tools like VS Code and has a web version for easy access. -->

---

## Usage

1. **Install Marp CLI**: `npm install -g @marp-team/marp-cli`
2. **Write slides**: Create a `.md` file with Marp frontmatter (`marp: true`)
3. **Preview**: Use Marp for VS Code or the CLI for live preview
4. **Export**: Convert Markdown to PDF, PPTX, HTML, or images

<!-- Presenter notes: Walk through the basic usage of Marp. Start with installing the Marp CLI using npm. Then, explain how to write slides by creating a Markdown file and including the Marp frontmatter. Next, show how to preview the slides using either the VS Code extension or the CLI. Finally, demonstrate how to export the slides into different formats. -->

---

### Usage Example

```markdown
---
marp: true
title: My Presentation
---

# Slide 1

This is the first slide.

---

# Slide 2

This is the second slide.

```

---

## Tools

- **Marp CLI**: Command-line tool for conversion and export
- **Marp for VS Code**: Extension for live preview and export
- **Marp Web**: Online editor at [marp.app](https://marp.app/)

<!-- Presenter notes: Introduce the different tools available for working with Marp. The Marp CLI is a powerful command-line tool for converting Markdown to various formats. The Marp for VS Code extension provides a seamless experience for writing and previewing slides directly in the editor. Finally, the Marp Web editor allows you to create and edit presentations online without needing to install anything. -->

---

## Export Formats

- **PDF**: Print-ready slides
- **PPTX**: PowerPoint compatible
- **HTML**: Standalone web presentations
- **PNG/JPG**: Slide images

<!-- Presenter notes: Explain the different export formats supported by Marp. PDF is ideal for printing or sharing static slides. PPTX allows you to open and edit your presentation in Microsoft PowerPoint. HTML exports create standalone web presentations that can be viewed in any browser. Finally, PNG and JPG exports are useful for sharing individual slides as images. -->

---

## Learn More

- [Official Website](https://marp.app/)
- [Documentation](https://marp.app/docs/)
- [GitHub](https://github.com/marp-team/marp)
- [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)
- [Style directive](https://marpit.marp.app/directives)

<!-- Presenter notes:
To dive deeper into Marp, check out these resources:
- The official website and documentation provide comprehensive guides and examples.
- The GitHub repository is where you can find the source code and contribute.
- The VS Code extension page has installation instructions and reviews.
- The style directive documentation explains how to customize your slides even further.
Thank you for your attention! I'm happy to answer any questions.
-->
