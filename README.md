# Unity Scene Replica - JSON to Three.js

A web application that recreates Unity 3D object placement in Three.js from JSON schema. Provides 1:1 accurate positioning between Unity and web visualization.

## Features

- Unity-compatible coordinate system conversion
- Support for both Euler angles and quaternion rotations
- Real-time 3D scene visualization
- File drag-and-drop JSON loading
- Orbit camera controls
- Object color customization
- Floating text labels above objects
- **Unity-style coordinate gizmo** (top-right corner showing X/Y/Z axes)
- **World grid system** (major and minor grid lines for spatial reference)

## Usage

1. Open `index.html` in a web browser
2. Click "Choose File" and select a JSON scene file
3. Click "Load Scene" to visualize the objects
4. Use mouse to orbit around the scene (left-click drag, scroll to zoom)

## JSON Schema

The JSON format is Unity-compatible with the following structure:

```json
{
  "scene": {
    "name": "Scene Name",
    "version": "1.0"
  },
  "objects": [
    {
      "name": "Object Name",
      "position": { "x": 0, "y": 0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "scale": { "x": 1, "y": 1, "z": 1 },
      "bounds": { "x": 1, "y": 1, "z": 1 },
      "color": "#ff6600",
      "text": "LABEL"
    }
  ]
}
```

### Transform Properties

- **position**: Vector3 world position (Unity units)
- **rotation**: Euler angles in degrees OR quaternion (x,y,z,w)
- **scale**: Vector3 local scale multipliers
- **bounds**: Vector3 object dimensions (creates box geometry)
- **color**: (Optional) Object color - hex (#ff6600), named (red, blue), or RGB
- **text**: (Optional) Floating text label displayed above the object

### Rotation Formats

**Euler Angles (degrees):**
```json
"rotation": { "x": 45, "y": 90, "z": 0 }
```

**Quaternion:**
```json
"rotation": { "x": 0.146, "y": 0.354, "z": 0.146, "w": 0.923 }
```

### Color Formats

**Hex Colors:**
```json
"color": "#ff6600"
```

**Named Colors:**
```json
"color": "red"
"color": "blue"
"color": "green"
```

**RGB Colors:**
```json
"color": "rgb(255, 102, 0)"
```

### Text Labels

Floating text labels appear above objects and move with them:
```json
"text": "My Object Name"
```

- Labels automatically position above the object based on its bounds and scale
- Text is rendered on a semi-transparent background for readability
- Labels face the camera and scale appropriately

### Coordinate System & Navigation

**Unity-Style Gizmo:**
- Appears in the top-right corner of the viewport
- Red arrow: X-axis (right)
- Green arrow: Y-axis (up)  
- Blue arrow: Z-axis (forward in Unity)
- Rotates with your camera view to show current orientation

**World Grid:**
- Major grid lines every 10 units (darker)
- Minor grid lines every 2 units (lighter)
- Helps visualize object positioning and scale
- Grid is centered at world origin (0,0,0)

## Coordinate System Conversion

The system automatically converts between Unity and Three.js coordinate systems:
- Unity: Left-handed, Z-forward
- Three.js: Right-handed, Z-toward viewer
- Z-coordinate is automatically flipped for accurate placement

## Testing

1. Load `example-scene.json` to see a sample scene
2. Create your own JSON files using the schema above
3. Export transform data from Unity and format as JSON

## Unity Export Tips

To create compatible JSON from Unity:
1. Get `transform.position` for position
2. Get `transform.eulerAngles` or `transform.rotation` for rotation
3. Get `transform.localScale` for scale
4. Get collider or renderer bounds for bounds 