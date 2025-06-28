# 🌐 3D Spatial Reasoning Web System

A **standalone 3D web application** that renders Unity-equivalent spatial positioning and layouts using Three.js. Professional-grade 3D visualization that runs directly in your browser.

**🎯 No Unity required** - fully independent 3D system with pixel-perfect spatial accuracy.

![3D Scene Demo](https://img.shields.io/badge/Demo-Live%203D%20Scene-blue?style=for-the-badge)

## ✨ Key Features

- 🎮 **Unity-Equivalent Rendering** - Perfect coordinate system matching
- 📐 **Precise 3D Positioning** - Millimeter-accurate spatial placement  
- 🎯 **All Primitive Types** - Cube, Sphere, Capsule, Cylinder, Plane, Quad
- 📷 **Advanced Camera Controls** - Top/Front/Side view presets + orbit controls
- 🔄 **JSON Scene Format** - Simple, flexible 3D scene definition
- ⚡ **Instant Loading** - No installation, runs in any modern browser

## 🚀 Quick Start

1. **Open** `index.html` in your browser
2. **Click** "Load Sample Scene" to see it in action
3. **Navigate** with mouse controls or camera view buttons
4. **Load** your own JSON scenes or create new ones

```bash
# Clone and run
git clone <repo-url>
cd spatial-reasoning
open index.html
```

## 📊 JSON Scene Format

```json
{
  "scene": { "name": "My 3D Scene" },
  "objects": [
    {
      "name": "RedCube",
      "model": "Cube",
      "position": { "x": 0, "y": 1, "z": 0 },
      "rotation": { "x": 0, "y": 45, "z": 0 },
      "scale": { "x": 1, "y": 1, "z": 1 },
      "color": "#ff0000",
      "text": "CUBE"
    }
  ]
}
```

## 🎯 Use Cases

- **Spatial Planning** - Architectural layouts, object placement
- **Data Visualization** - 3D scatter plots, geographic data  
- **Game Development** - Level prototyping, coordinate validation
- **Education** - 3D coordinate system teaching, spatial reasoning

## 📱 Controls

| Action | Control |
|--------|---------|
| **Orbit** | Left-click + drag |
| **Pan** | Right-click + drag |
| **Zoom** | Scroll wheel |
| **Top View** | Top button |
| **Front View** | Front button |  
| **Side View** | Side button |

## 🔧 System Capabilities

✅ **Unity Coordinate System** - Y-up, Z-forward, exact unit conversion  
✅ **Perfect Pivot Points** - Center-based object positioning  
✅ **10x10 Plane Support** - Matches Unity's default plane scaling  
✅ **Euler & Quaternion** - Both rotation formats supported  
✅ **Real-time Performance** - 60fps smooth navigation  
✅ **Cross-platform** - Desktop, tablet, mobile browsers  

## 📁 Project Structure

```
├── index.html           # Main 3D web application
├── scene.js             # 3D engine and rendering logic
├── style.css            # Interface styling
├── field-scene.json     # Complex example scene
├── unity-c#-code/       # Optional Unity integration tools
└── INSTRUCTIONS.md      # Complete documentation
```

## 🔄 Optional Unity Integration

While the web system is fully standalone, optional Unity integration is available:

- **Export** Unity scenes to JSON format
- **Import** JSON scenes back into Unity
- **Round-trip workflow** for Unity users

*See `unity-c#-code/` folder and INSTRUCTIONS.md for details.*

## 📚 Documentation

- **[Complete Instructions](INSTRUCTIONS.md)** - Full system documentation
- **[Example Scene](field-scene.json)** - Simple 3D scene example
- **JSON Format** - Detailed schema in INSTRUCTIONS.md
