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

2. If not already installed, install Yarn globally using npm:
    ```sh
    npm install -g yarn
    ```

3. Install the project dependencies:
    ```sh
    yarn install
    ```

## Usage<a name="usage"></a>

For development purposes, you can run the client in two modes:

- **Development Mode with Mock Backend**:
    ```sh
    yarn run dev
    ```
    This mode runs the client with mock backend interactions, suitable for UI development without requiring the actual backend.

- **Standard Development Mode**:
    ```sh
    yarn start
    ```
    This mode runs the client with calls to the actual backend enabled, suitable for full-stack development and testing.

## Folder Structure<a name="folder-structure"></a>

The client project is organized as follows:



```
src/
|____README.md
|____public
|____src
| |____index.tsx
| |____App.tsx
| |____types
| | |____transcriptionDataTypes.ts
| |____.DS_Store
| |____context
| | |____AudioContext.tsx
| | |____TranscriptionContext.tsx
| | |____EditorContext.tsx
| | |____TutorialContext.tsx
| |____utils
| | |____manualStyle.ts
| | |____backendCalls.ts
| | |____environment.ts
| | |____audioUtils.ts
| | |____axios.ts
| | |____draftJsStylingUtils.ts
| | |____interactiveTutorials.ts
| | |____htmlToJson.ts
| | |____standardTutorials.ts
| | |____transcriptionUtils.ts
| |____components
| | |____sidebar
| | | |____TranscriptionItem.tsx
| | | |____TranscriptionSideBar.tsx
| | |____AudioControls.tsx
| | |____component
| | | |____SelectInput.tsx
| | | |____SwitchButtonIcon.tsx
| | | |____ColorPickerInput.tsx
| | |____uploads
| | | |____UploadedFileInfo.tsx
| | | |____Progress.tsx
| | | |____FileUploadArea.tsx
| | |____Header.tsx
| | |____tutorials
| | | |____TutorialPopup.tsx
| | | |____AboutModal.tsx
| | |____views
| | | |____StandardTranscriptView.tsx
| | | |____InteractiveTranscript.tsx
| | |____DisplayTranscript.tsx
| |____theme
| | |____foundations
| | | |____colors.ts
| | | |____fonts.ts
| | | |____styles.ts
| | | |____shadows.ts
| | | |____borders.ts
| | | |____spacing.ts
| | |____components
| | | |____alert.ts
| | | |____Tab.ts
| | | |____popover.ts
| | | |____modal.ts
| | | |____input.ts
| | | |____Button.ts
| | | |____form.ts
| | | |____menu.ts
| | | |____heading.ts
| | | |____card.ts
| | | |____avatar.ts
| | | |____badge.ts
| | | |____tooltip.ts
| | | |____icon-button.ts
| | | |____form-label.ts
| | | |____skeleton.ts
| | | |____textarea.ts
| | |____theme.ts
| |____hooks
| | |____useUploader.ts
| | |____useTranscription.ts
| | |____useStyledHtmlExporter.ts
| | |____useDisplayTranscriptContext.ts
| | |____useAxios.ts
| | |____useEditor.ts
| |____modules
| |____assets
| | |____header_logo.svg
| | |____play_icon.png
| | |____upload_logo.svg
| | |____pause_icon.png
| |____pages
| | |____Transcript.tsx
| | |____Upload.tsx
| |____routes
| | |____protectedRoutes.tsx
```


- **components/**: Contains UI components that are reused across various parts of the application.
- **context/**: Houses React context providers for global state management.
- **hooks/**: Custom React hooks for encapsulating reusable logic.
- **pages/**: Components representing entire pages within the application.
- **theme/**: Theme settings for styling the application, including Chakra UI customizations.
- **types/**: TypeScript definitions and interfaces used throughout the application.
- **utils/**: Utility functions for tasks like formatting or data manipulation.

This structure is designed to facilitate easy navigation and maintenance of the codebase, promoting reusability and modularity.


