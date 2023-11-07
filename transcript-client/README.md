# client

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Introduction<a name="introduction"></a>

Our client is written in React and scaffolded with Vite.

## Installation<a name="installation"></a>

1. `cd client/`
2. Install yarn, if not installed already `npm i -g yarn`
3. `npm install`
   

## Usage<a name="usage"></a>

`npm run dev`

## Folder Structure<a name="folder-structure"></a>

Here's an overview of the main directories:

```
src
├── components
├── modules
│   └── module-name
├── pages
│   └── page-name
├── theme
│   ├── components
│   └── foundations
├── types
└── utils
```

- `components`: Houses components that can be used across multiple parts of the application.
- `modules`: Modules can be thought of features grouped together. Each subdirectory `module-name` is a feature, with components related to that feature encapsulated.
- `pages`: Contains top-level page components that represent different pages or views of the application. Inside the pages directory, there are subdirectories for specific pages, such as `page-name`. Pages use `modules` to compose the UI.
- `theme`: Includes files related to ChakraUI theming/styling and overriding.
- `types`: Contains TypeScript interfaces and any type declarations used throughout the project.
- `utils`: Contains utility functions or helper modules that can be used throughout the project, providing reusable code for common tasks or operations.

