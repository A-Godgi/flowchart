# Test Task React Flowchart

A simple React project for creating and editing flowcharts.
The project was done as a test task for a vacancy.

## Demo
![ ](https://github.com/A-Godgi/flowchart/blob/master/demo.gif)
[https://a-godgi.github.io/flowchart/](https://a-godgi.github.io/flowchart/)

## Technologies

- React
- TypeScript
- HTML
- CSS

## Installation

1. Clone the repository: `git clone https://github.com/A-Godgi/flowchart.git`
2. Navigate to the project directory: `cd flowchart`
3. Install dependencies: `npm install`

## Usage 

Run the following command to start the project:

```bash
npm start
```

Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Project Structure

The project follows a standard React application structure:

```
├── public/                             <- Contains static assets like HTML files, images, and the favicon.
├── src/                                <- Contains the source code for the React application.
│   ├── assets/                         <- Holds project-specific assets.
│   │   ├── images                      <- Stores images used in the project.
│   │   └── scss                        <- Contains SCSS stylesheets.
│   │       ├── _base.scss              <- Contains base styling for the application.
│   │       ├── _canvas.scss            <- Styles for the Canvas component.
│   │       ├── _chart.scss             <- Styles for the Chart and ChartElementComponent component.
│   │       ├── _layout.scss            <- Styles for the Layout component.
│   │       ├── _utilities.scss         <- Common auxiliary styles
│   │       ├── _variables.scss         <- SCSS variables.
│   │       └── style.scss              <- Main SCSS file importing all other styles.
│   ├── components/                     <- Contains React components for the flowchart.
│   │   ├── Canvas.tsx                  <- React component contains the canvas.
│   │   ├── Chart.tsx                   <- React component containing chart elements and counting services.
│   │   ├── ChartElementComponent.tsx   <- Recursive react component that is a chart element.
│   │   └── Layout.tsx                  <- React component contains the canvas.
│   ├── types/                          <- Holds TypeScript type definitions.
│   │   └── index.ts                    <- Main file exporting general type definitions.
│   ├── App.tsx                         <- Main React component that integrates other components to create the app.
│   ├── custom.d.ts                     <- Custom TypeScript .svg declarations.
│   ├── index.tsx                       <- Entry point for the React app.
│   └── logo.svg                        <- SVG file for the project logo.
├── .gitignore                          <- Specifies files and directories that should be ignored by version control.
├── package.json                        <- Configuration file that includes project dependencies and scripts.
├── package-lock.json                   <- Auto-generated file describing the exact tree that was generated for the node_modules folder.
├── README.md                           <- Documentation file providing information about the project.
└── tsconfig.json                       <- TypeScript configuration file.
```

## Notes

Smooth navigation using touchpad gestures, providing an intuitive way to interact with the flowchart.