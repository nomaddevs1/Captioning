# Transcribe Client

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Introduction<a name="introduction"></a>

Our client is developed using React and scaffolded with `create-react-app`. It provides the user interface for interacting with the transcription service, allowing users to upload audio files, view and edit transcriptions, and export the results.

## Installation<a name="installation"></a>

To set up the client for development or deployment, follow these steps:

1. Navigate to the `transcribe-client/` directory:
    ```sh
    cd transcribe-client/
    ```
    
2. Install the project dependencies:
    ```sh
    npm install
    ```

## Usage<a name="usage"></a>

For development purposes, you can run the client in two modes:

- **Development Mode with Mock Backend**:
    ```sh
    npm run dev
    ```
    This mode runs the client with mock backend interactions, suitable for UI development without requiring the actual backend.

- **Standard Development Mode**:
    ```sh
    npm start
    ```
    This mode runs the client with calls to the actual backend enabled, suitable for full-stack development and testing.

## Folder Structure<a name="folder-structure"></a>

The client project is organized as follows:



```
src/
├── assets/ # Static assets like images and logos
├── components/ # Reusable components
│ ├── sidebar/ # Sidebar-specific components
│ └── uploads/ # Components related to file upload functionality
├── context/ # React context providers
├── hooks/ # Custom React hooks
├── pages/ # Page components
├── theme/ # Theme configurations and overrides
│ ├── components/ # Theme overrides for specific components
│ └── foundations/ # Theme foundations like colors, fonts, etc.
├── types/ # TypeScript types and interfaces
├── utils/ # Utility functions
├── App.tsx # Main application component
└── index.tsx # Entry point for the React application
```


- **components/**: Contains UI components that are reused across various parts of the application.
- **context/**: Houses React context providers for global state management.
- **hooks/**: Custom React hooks for encapsulating reusable logic.
- **pages/**: Components representing entire pages within the application.
- **theme/**: Theme settings for styling the application, including Chakra UI customizations.
- **types/**: TypeScript definitions and interfaces used throughout the application.
- **utils/**: Utility functions for tasks like formatting or data manipulation.

This structure is designed to facilitate easy navigation and maintenance of the codebase, promoting reusability and modularity.


