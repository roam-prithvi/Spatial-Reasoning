# 🌐 3D Spatial Reasoning Web System

## Overview

A **standalone 3D web application** that renders Unity-equivalent spatial positioning and 3D world layouts using Three.js. This system provides pixel-perfect 3D visualization without requiring any Unity installation.

**🎯 Unity is NOT required** - this web system is fully capable of rendering and managing 3D spatial data independently.

## 🚀 Quick Start

1. **Open** `index.html` in any modern web browser
2. **Click** "Load Sample Scene" to see the 3D system in action
3. **Use camera controls** to navigate the 3D space
4. **Load your own JSON files** or create scenes programmatically

---

## 🌟 Core Features

### **Complete 3D Engine**
- ✅ **Unity-equivalent coordinate system** (Y-up, precise positioning)
- ✅ **All primitive types**: Cube, Sphere, Capsule, Cylinder, Plane, Quad
- ✅ **Perfect pivot point handling** (center-based like Unity)
- ✅ **10x10 plane scaling** (matches Unity's default plane size)
- ✅ **XZ plane orientation** (planes lay flat on ground)
- ✅ **Material colors and labeling**

### **Advanced Navigation**
- 📷 **Camera View Presets**: Top Down, Front, Side, Reset
- 🖱️ **Orbit Controls**: Left-click drag, scroll zoom, right-click pan
- 📐 **World Grid**: Visual spatial reference system
- 🧭 **Coordinate Gizmo**: Real-time orientation indicator

### **Flexible Input System**
- 📁 **File Loading**: Drag & drop JSON files
- 🔄 **Live Reloading**: Instant scene updates
- 🎮 **Sample Scenes**: Built-in examples
- 🧹 **Scene Management**: Clear and reload functionality

---

## 📱 Using the Web App

### Opening the Application
```
Open index.html → Instant 3D scene viewer ready to use
```

### Loading 3D Scenes

#### **Option A: Sample Scene**
- Click **"Load Sample Scene"** 
- Instantly see Unity-equivalent 3D positioning demo

#### **Option B: JSON File Upload**
1. Click **"Choose File"**
2. Select your `.json` scene file  
3. Click **"Load File"**
4. Scene renders immediately

### 📷 Camera Navigation

#### **View Preset Buttons**
```
[Top Down] [Front] [Side] [Reset]
```
- **Top Down**: Bird's eye view (architectural planning view)
- **Front**: Front elevation view  
- **Side**: Side elevation view
- **Reset**: Default isometric perspective

#### **Mouse Controls**
- **Left Drag**: Orbit around scene center
- **Right Drag**: Pan camera position
- **Scroll**: Zoom in/out
- **Middle Drag**: Alternative pan method

### 🎯 Spatial Features

#### **Coordinate System**
- **World Center**: (0,0,0) is the true center
- **Unity Equivalent**: Y-up, Z-forward coordinate system
- **Precise Positioning**: Exact unit measurements

#### **Visual Aids**
- **Grid System**: Major/minor grid lines for spatial reference
- **Object Labels**: Floating text above each object
- **Color Coding**: Material colors preserved from source data
- **Bounds Visualization**: Accurate object sizing

---

## 📋 JSON Scene Format

### **Basic Structure**
```json
{
  "scene": {
    "name": "My 3D Scene",
    "description": "Scene description"
  },
  "objects": [
    {
      "name": "ObjectName",
      "model": "Cube|Sphere|Capsule|Cylinder|Plane|Quad",
      "position": { "x": 0, "y": 0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "scale": { "x": 1, "y": 1, "z": 1 },
      "bounds": { "x": 1, "y": 1, "z": 1 },
      "color": "#ffffff",
      "text": "LABEL TEXT"
    }
  ]
}
```

### **Transform Properties**
- **position**: World coordinates (Unity units)
- **rotation**: Euler angles in degrees OR quaternion
- **scale**: Size multipliers (1.0 = default size)
- **bounds**: Object dimensions for geometry creation

### **Visual Properties**  
- **color**: Hex colors (#ff0000), named colors (red), or RGB
- **text**: Floating label displayed above object
- **model**: 3D primitive type

### **Rotation Formats**

**Euler Angles:**
```json
"rotation": { "x": 45, "y": 90, "z": 0 }
```

**Quaternion:**
```json  
"rotation": { "x": 0.146, "y": 0.354, "z": 0.146, "w": 0.923 }
```

---

## 🎨 Creating 3D Scenes

### **Method 1: Manual JSON Creation**
1. Use the JSON format above
2. Define object positions, rotations, scales
3. Set colors and labels
4. Load into web app

### **Method 2: Programmatic Generation**
- Modify `scene.js` SAMPLE_SCENE data
- Generate JSON from code/scripts
- Use mathematical positioning for complex layouts

### **Method 3: Data Conversion**
- Convert from other 3D formats
- Transform coordinate systems to Unity-equivalent
- Batch process multiple scenes

---

## 🔧 System Capabilities

### **3D Rendering Engine**
- **Three.js powered**: Industry-standard WebGL rendering
- **Unity parity**: Exact coordinate system matching
- **Real-time performance**: Smooth 60fps navigation
- **Cross-platform**: Works on desktop, tablet, mobile browsers

### **Spatial Accuracy**
- **Millimeter precision**: Exact Unity coordinate translation
- **Pivot point accuracy**: Center-based object positioning
- **Scale preservation**: 1:1 Unity unit conversion
- **Rotation fidelity**: Perfect euler/quaternion handling

### **File Management**
- **Instant loading**: No installation or setup required
- **Multiple formats**: JSON scene files
- **Drag & drop**: Simple file interface
- **Export ready**: Generate scenes for other tools

---

## 📁 Project Structure

```
Spatial Reasoning/
├── index.html              # Main 3D web application
├── scene.js                # 3D engine and scene logic  
├── style.css               # Interface styling
├── field-scene.json        # Complex example scene
├── unity-c#-code/          # Optional Unity bonus tools
└── INSTRUCTIONS.md         # This guide
```

---

## 🎯 Use Cases

### **Spatial Planning**
- Architectural layout visualization
- Object placement planning
- 3D coordinate system prototyping

### **Data Visualization**  
- 3D scatter plots with spatial meaning
- Geographic data representation
- Scientific spatial modeling

### **Game Development**
- Level layout prototyping  
- Object positioning testing
- Coordinate system validation

### **Education & Training**
- 3D coordinate system teaching
- Spatial reasoning exercises
- Interactive 3D demonstrations

---

## 🔄 Optional Unity Integration

**Note: Unity is completely optional** - the web system is fully independent.

For users who want Unity integration, the `unity-c#-code/` folder contains:
- **UnityToJsonExporter.cs**: Export Unity scenes to JSON
- **JsonToUnitySpawner.cs**: Import JSON back to Unity

This creates a **Unity ↔ Web** workflow for users who have Unity installed, but the web system works perfectly without it.

---

## 🚀 Getting Started Now

1. **Open** `index.html` in your browser
2. **Click** "Load Sample Scene" 
3. **Explore** with camera controls
4. **Load** `field-scene.json` for a complex example
5. **Create** your own JSON scenes

**The system is ready to use immediately** - no installation, setup, or additional software required!

This 3D web system provides professional-grade spatial visualization with Unity-equivalent accuracy, all running directly in your browser. 