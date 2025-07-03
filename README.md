# Pipeline Editor - DAG Visualization Tool

A modern, interactive pipeline editor for creating and visualizing Directed Acyclic Graphs (DAGs) built with React, TypeScript, and ReactFlow.



## ✨ Features

- **Interactive Node Creation**: Add custom nodes with descriptive names
- **Visual Edge Connections**: Drag and drop to create connections between nodes
- **Real-time DAG Validation**: Instant feedback on graph validity with detailed error messages
- **Auto Layout**: Intelligent automatic positioning using Dagre layout algorithm
- **Selection Management**: Multi-select nodes and edges with keyboard shortcuts
- **Responsive Design**: Clean, modern interface that works on all screen sizes
- **Production Ready**: Built with TypeScript for type safety and maintainability

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pipe-dream-architect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Creating Nodes
1. Click the **"Add Node"** button in the sidebar
2. Enter a descriptive name for your node
3. Click **"Create Node"** to add it to the canvas

### Connecting Nodes
1. Hover over a node to see connection handles (circles on left and right)
2. Drag from the right handle (source) to the left handle (target) of another node
3. Release to create the connection

### Managing Elements
- **Select**: Click on nodes or edges to select them
- **Multi-select**: Hold Ctrl/Cmd and click multiple elements
- **Delete**: Select elements and press Delete or Backspace key
- **Auto Layout**: Click the "Auto Layout" button to organize nodes automatically

### Validation
The editor provides real-time validation with the following rules:
- Minimum 2 nodes required for a valid DAG
- All nodes must be connected
- No cycles allowed (maintains DAG property)
- Hover over validation status for detailed error information

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **ReactFlow** - Powerful flow diagram library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Dagre** - Graph layout algorithm
- **Vite** - Fast build tool and development server

## 📁 Project Structure

```
src/
├── components/
│   ├── CustomNode.tsx          # Custom node component
│   ├── NodeCreationModal.tsx   # Modal for creating new nodes
│   ├── PipelineEditor.tsx      # Main editor component
│   └── ValidationStatus.tsx    # DAG validation display
├── utils/
│   ├── autoLayout.ts          # Dagre layout implementation
│   └── dagValidation.ts       # DAG validation logic
├── App.tsx                    # Root application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles
```

## 🎨 Key Components

### PipelineEditor
The main component that orchestrates the entire editor experience:
- Manages node and edge state
- Handles user interactions
- Provides toolbar and sidebar functionality

### CustomNode
Reusable node component with:
- Connection handles for creating edges
- Visual feedback for selection states
- Hover effects and smooth transitions

### ValidationStatus
Real-time DAG validation with:
- Visual status indicators
- Detailed error tooltips
- Color-coded feedback system

## ⌨️ Keyboard Shortcuts

- **Delete/Backspace**: Remove selected nodes and edges
- **Ctrl/Cmd + Click**: Multi-select elements

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 DAG Validation Rules

The editor enforces these rules for valid DAGs:

1. **Minimum Nodes**: At least 2 nodes required
2. **Connectivity**: All nodes must be connected via edges
3. **Acyclic**: No cycles allowed in the graph
4. **No Self-Loops**: Nodes cannot connect to themselves

## 🚀 Production Deployment

1. Build the project:
```bash
npm run build
```


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [ReactFlow](https://reactflow.dev/) for the excellent flow diagram library
- [Dagre](https://github.com/dagrejs/dagre) for graph layout algorithms
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

Built with ❤️ using modern web technologies
