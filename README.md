# Cloudairy Text Editor

A modern WYSIWYG text editor built with React, TipTap, and Tailwind CSS. Features rich text editing capabilities with a clean and intuitive interface.

## Features

- Rich text formatting (Bold, Italic, Underline)
- Headings (H1, H2, H3)
- Lists (Ordered and Unordered)
- Code blocks
- Blockquotes
- Image upload and drag-n-drop
- Text alignment
- Link management
- Highlight text
- Undo/Redo functionality

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v10 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cloudairy_text_editor
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Build

To create a production build:

```bash
pnpm build
```

To preview the production build:

```bash
pnpm preview
```

## Tech Stack

- React 19
- TipTap Editor
- Tailwind CSS
- TypeScript
- Vite

## Project Structure

```
src/
├── components/
│   ├── editor/
│   │   ├── Editor.tsx
│   │   └── editor.css
│   ├── toolbar/
│   │   └── ToolBar.tsx
│   └── ui/
│       ├── textarea.tsx
│       └── toggle.tsx
├── lib/
│   └── utils.ts
├── App.tsx
└── main.tsx
```

