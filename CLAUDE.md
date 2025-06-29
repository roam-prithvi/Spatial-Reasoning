# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **3D Spatial Reasoning Web System** - a standalone web application that provides Unity-equivalent 3D visualization using Three.js. It renders 3D scenes with precise spatial positioning matching Unity's coordinate system, without requiring Unity.

## Key Technologies

- **Three.js r128** - 3D rendering engine (loaded from CDN)
- **OrbitControls.js** - Camera navigation
- **Vanilla JavaScript** - No framework dependencies
- **HTML5 Canvas** - WebGL rendering
- **Optional Unity Integration** - C# scripts in `unity-c#-code/`

## Running the Application

This is a client-side web application with no build process:

```bash
# Option 1: Open directly
open index.html

# Option 2: Serve via HTTP
python -m http.server 8000
# Navigate to http://localhost:8000
```

No npm, build tools, or dependencies required - runs directly in browser.

## Core Architecture

### Main Entry Points
- **index.html** - Launches the 3D viewer
- **scene.js** - Core 3D engine (`UnitySceneRenderer` class)
- **style.css** - UI styling

### UnitySceneRenderer Class (scene.js)
The main class handles:
- Three.js scene initialization
- Unity coordinate system (Y-up, Z-forward)
- Primitive creation (Cube, Sphere, Capsule, Cylinder, Plane, Quad)
- Camera controls and preset views
- JSON scene loading/parsing
- Object text labels and grid system

### Key Methods in scene.js
- `loadScene(jsonData)` - Parses and renders JSON scenes
- `createPrimitive(objData)` - Creates 3D objects with Unity pivot points
- `setupCameraViews()` - Implements Top/Front/Side view presets
- `createTextLabel(text, position)` - Floating labels above objects

### JSON Scene Format
```json
{
  "scene": { "name": "Scene Name" },
  "objects": [{
    "name": "ObjectName",
    "model": "Cube|Sphere|Capsule|Cylinder|Plane|Quad",
    "position": { "x": 0, "y": 0, "z": 0 },
    "rotation": { "x": 0, "y": 0, "z": 0 },  // Euler or quaternion
    "scale": { "x": 1, "y": 1, "z": 1 },
    "color": "#ff0000",
    "text": "Label"
  }]
}
```

### Coordinate System Details
- Unity-equivalent: Y-up, Z-forward
- Planes lay flat on XZ (horizontal)
- 10x10 unit plane matches Unity default
- Center-based pivot points for all primitives
- Precise unit conversion (1:1 with Unity)

## Development Notes

### When Modifying 3D Rendering
- Maintain Unity coordinate system compatibility
- Preserve center-based pivot points
- Test with `field-scene.json` for complex scenes
- Ensure camera controls remain intuitive

### When Adding Features
- Keep the application standalone (no server dependencies)
- Maintain browser compatibility (modern browsers with WebGL)
- Follow existing patterns in `scene.js`
- Update sample scenes if adding new primitives

### File Structure
- Keep all web assets in root directory
- Unity integration code stays in `unity-c#-code/`
- JSON scene files use `.json` extension
- No build artifacts or node_modules

## Testing

Manual testing approach:
1. Load `index.html` in browser
2. Test "Load Sample Scene" button
3. Test camera view presets (Top/Front/Side/Reset)
4. Load `field-scene.json` for complex scene testing
5. Verify mouse controls (orbit/pan/zoom)
6. Check object labels and grid display