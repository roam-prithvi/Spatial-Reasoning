// Embedded sample scene data (from sample-playground.json)
const SAMPLE_SCENE = {
  "scene": {
    "name": "Unity Playground Scene",
    "description": "Comprehensive test scene showcasing colors and text labels"
  },
  "objects": [
    {
      "name": "Ground_Platform",
      "position": { "x": 0, "y": 0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "scale": { "x": 15, "y": 0.2, "z": 15 },
      "bounds": { "x": 15, "y": 0.2, "z": 15 },
      "color": "#444444",
      "text": "GROUND"
    },
    {
      "name": "Red_Cube",
      "position": { "x": 10, "y": 0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "scale": { "x": 1, "y": 1, "z": 1 },
      "bounds": { "x": 1, "y": 1, "z": 1 },
      "color": "#ff6600",
      "text": "RED CUBE"
    },
    {
      "name": "Blue_Rectangle",
      "position": { "x": -10, "y": 0, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "scale": { "x": 1, "y": 1, "z": 1 },
      "bounds": { "x": 1, "y": 1, "z": 1 },
      "color": "#0066ff",
      "text": "BLUE RECT"
    },
    {
      "name": "X_Axis_Marker",
      "position": { "x": 5, "y": 1, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "scale": { "x": 0.5, "y": 0.5, "z": 0.5 },
      "bounds": { "x": 0.5, "y": 0.5, "z": 0.5 },
      "color": "#ff0000",
      "text": "X+ AXIS"
    },
    {
      "name": "Y_Axis_Marker",
      "position": { "x": 0, "y": 5, "z": 0 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "scale": { "x": 0.5, "y": 0.5, "z": 0.5 },
      "bounds": { "x": 0.5, "y": 0.5, "z": 0.5 },
      "color": "#00ff00",
      "text": "Y+ AXIS"
    },
    {
      "name": "Z_Axis_Marker",
      "position": { "x": 0, "y": 1, "z": 5 },
      "rotation": { "x": 0, "y": 0, "z": 0 },
      "scale": { "x": 0.5, "y": 0.5, "z": 0.5 },
      "bounds": { "x": 0.5, "y": 0.5, "z": 0.5 },
      "color": "#0066ff",
      "text": "Z+ AXIS"
    },
    {
      "name": "Origin_Marker",
      "position": { "x": 0, "y": 0.5, "z": 0 },
      "rotation": { "x": 0, "y": 45, "z": 0 },
      "scale": { "x": 0.8, "y": 1, "z": 0.8 },
      "bounds": { "x": 0.8, "y": 1, "z": 0.8 },
      "color": "#ffff00",
      "text": "ORIGIN"
    }
  ]
};

// Three.js Scene Manager for Unity Schema
class UnitySceneRenderer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.objects = [];
        
        this.init();
        this.setupEventListeners();
        this.loadSampleScene(); // Auto-load sample scene
    }
    
    init() {
        const canvas = document.getElementById('canvas');
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x222222);
        
        // Camera setup - Unity-like perspective
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(10, 10, 10);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.autoClear = false; // Manual clear for gizmo overlay
        
        // Controls setup
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;
        
        // Lighting - Unity-like setup
        this.setupLighting();
        
        // World grid setup
        this.setupWorldGrid();
        
        // Coordinate gizmo setup
        this.setupCoordinateGizmo();
        
        // Start render loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    setupLighting() {
        // Directional light (like Unity's main light)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
    }
    
    setupWorldGrid() {
        // Main grid (like Unity's grid)
        const gridHelper = new THREE.GridHelper(50, 50, 0x555555, 0x333333);
        gridHelper.position.y = 0;
        this.scene.add(gridHelper);
        
        // Secondary smaller grid for finer detail
        const smallGridHelper = new THREE.GridHelper(10, 20, 0x666666, 0x444444);
        smallGridHelper.position.y = 0.01; // Slightly above main grid
        this.scene.add(smallGridHelper);
    }
    
    setupCoordinateGizmo() {
        // Create separate scene and camera for gizmo overlay
        this.gizmoScene = new THREE.Scene();
        this.gizmoCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
        this.gizmoCamera.position.set(0, 0, 5);
        
        // Create axis arrows (Unity-style: X=Red, Y=Green, Z=Blue)
        const axisLength = 1;
        const axisGeometry = new THREE.CylinderGeometry(0.02, 0.02, axisLength, 8);
        const coneGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
        
        // X-axis (Red)
        const xAxisMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const xAxis = new THREE.Mesh(axisGeometry, xAxisMaterial);
        const xCone = new THREE.Mesh(coneGeometry, xAxisMaterial);
        xAxis.rotation.z = -Math.PI / 2;
        xAxis.position.x = axisLength / 2;
        xCone.rotation.z = -Math.PI / 2;
        xCone.position.x = axisLength + 0.1;
        
        // Y-axis (Green)
        const yAxisMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const yAxis = new THREE.Mesh(axisGeometry, yAxisMaterial);
        const yCone = new THREE.Mesh(coneGeometry, yAxisMaterial);
        yAxis.position.y = axisLength / 2;
        yCone.position.y = axisLength + 0.1;
        
        // Z-axis (Blue) - Unity's Z forward
        const zAxisMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const zAxis = new THREE.Mesh(axisGeometry, zAxisMaterial);
        const zCone = new THREE.Mesh(coneGeometry, zAxisMaterial);
        zAxis.rotation.x = Math.PI / 2;
        zAxis.position.z = axisLength / 2;
        zCone.rotation.x = Math.PI / 2;
        zCone.position.z = axisLength + 0.1;
        
        // Group all gizmo elements
        this.gizmoGroup = new THREE.Group();
        this.gizmoGroup.add(xAxis, xCone, yAxis, yCone, zAxis, zCone);
        this.gizmoScene.add(this.gizmoGroup);
        
        // Add labels
        this.addGizmoLabels();
    }
    
    addGizmoLabels() {
        // Create text sprites for axis labels
        const xLabel = this.createGizmoLabel('X', 0xff0000);
        xLabel.position.set(1.3, 0, 0);
        this.gizmoGroup.add(xLabel);
        
        const yLabel = this.createGizmoLabel('Y', 0x00ff00);
        yLabel.position.set(0, 1.3, 0);
        this.gizmoGroup.add(yLabel);
        
        const zLabel = this.createGizmoLabel('Z', 0x0000ff);
        zLabel.position.set(0, 0, 1.3);
        this.gizmoGroup.add(zLabel);
    }
    
    createGizmoLabel(text, color) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 64;
        
        context.font = 'Bold 32px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Draw text
        context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        context.fillText(text, 32, 32);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: texture,
            transparent: true 
        });
        
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.3, 0.3, 1);
        
        return sprite;
    }
    
    setupEventListeners() {
        document.getElementById('loadScene').addEventListener('click', () => {
            const fileInput = document.getElementById('jsonInput');
            if (fileInput.files.length > 0) {
                this.loadJsonFile(fileInput.files[0]);
            }
        });
        
        document.getElementById('loadSample').addEventListener('click', () => {
            this.loadSampleScene();
        });
        
        document.getElementById('clearScene').addEventListener('click', () => {
            this.clearScene();
        });
    }
    
    loadJsonFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                this.createSceneFromJson(jsonData);
            } catch (error) {
                alert('Error parsing JSON: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
    
    loadSampleScene() {
        this.createSceneFromJson(SAMPLE_SCENE);
    }
    
    createSceneFromJson(jsonData) {
        this.clearScene();
        
        if (!jsonData.objects || !Array.isArray(jsonData.objects)) {
            alert('Invalid JSON: Expected "objects" array');
            return;
        }
        
        jsonData.objects.forEach((objData, index) => {
            this.createObject(objData, index);
        });
        
        this.updateObjectCount();
    }
    
    createObject(objData, index) {
        // Parse Unity transform data
        const position = this.parseVector3(objData.position);
        const rotation = this.parseRotation(objData.rotation);
        const scale = this.parseVector3(objData.scale);
        const bounds = this.parseVector3(objData.bounds);
        const color = objData.color;
        const text = objData.text;
        
        // Create geometry based on bounds or default
        let geometry;
        if (bounds) {
            geometry = new THREE.BoxGeometry(bounds.x, bounds.y, bounds.z);
        } else {
            geometry = new THREE.BoxGeometry(1, 1, 1);
        }
        
        // Create material with specified color or random color
        let materialColor;
        if (color) {
            materialColor = new THREE.Color(color);
        } else {
            materialColor = new THREE.Color().setHSL(
                (index * 0.618033988749895) % 1, 
                0.7, 
                0.6
            );
        }
        
        const material = new THREE.MeshLambertMaterial({
            color: materialColor
        });
        
        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Apply Unity transforms (convert coordinate system)
        if (position) {
            mesh.position.set(position.x, position.y, -position.z); // Flip Z for Unity
        }
        
        if (rotation) {
            if (rotation.w !== undefined) {
                // Quaternion rotation
                mesh.quaternion.set(rotation.x, rotation.y, -rotation.z, rotation.w);
            } else {
                // Euler rotation (degrees to radians)
                mesh.rotation.set(
                    THREE.MathUtils.degToRad(rotation.x),
                    THREE.MathUtils.degToRad(rotation.y),
                    THREE.MathUtils.degToRad(-rotation.z)
                );
            }
        }
        
        if (scale) {
            mesh.scale.set(scale.x, scale.y, scale.z);
        }
        
        // Add name for debugging
        mesh.name = objData.name || `Object_${index}`;
        
        // Create text label if specified
        if (text) {
            const textSprite = this.createTextSprite(text, materialColor);
            const labelHeight = bounds ? bounds.y : 1;
            textSprite.position.set(0, labelHeight * scale.y + 0.5, 0);
            mesh.add(textSprite); // Attach to mesh so it moves with the object
        }
        
        this.scene.add(mesh);
        this.objects.push(mesh);
    }
    
    parseVector3(vectorData) {
        if (!vectorData) return null;
        return {
            x: vectorData.x || 0,
            y: vectorData.y || 0,
            z: vectorData.z || 0
        };
    }
    
    parseRotation(rotationData) {
        if (!rotationData) return null;
        
        // Check if it's a quaternion (has w component)
        if (rotationData.w !== undefined) {
            return {
                x: rotationData.x || 0,
                y: rotationData.y || 0,
                z: rotationData.z || 0,
                w: rotationData.w || 1
            };
        }
        
        // Assume Euler angles
        return {
            x: rotationData.x || 0,
            y: rotationData.y || 0,
            z: rotationData.z || 0
        };
    }
    
    createTextSprite(text, baseColor) {
        // Create canvas for text rendering
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Set canvas size and font
        canvas.width = 256;
        canvas.height = 64;
        context.font = 'Bold 20px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Create background with slight transparency
        context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add border
        context.strokeStyle = '#ffffff';
        context.lineWidth = 2;
        context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
        
        // Draw text
        context.fillStyle = '#ffffff';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        
        // Create texture and sprite
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: texture,
            transparent: true,
            alphaTest: 0.1
        });
        
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(2, 0.5, 1); // Adjust size as needed
        
        return sprite;
    }
    
    clearScene() {
        this.objects.forEach(obj => {
            this.scene.remove(obj);
            obj.geometry.dispose();
            obj.material.dispose();
        });
        this.objects = [];
        this.updateObjectCount();
    }
    
    updateObjectCount() {
        document.getElementById('objectCount').textContent = `Objects: ${this.objects.length}`;
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Gizmo camera doesn't need aspect ratio update (always square)
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        
        // Update gizmo to show world axes orientation (Unity-style)
        if (this.gizmoGroup) {
            // Use inverse of camera rotation to show world axes
            const inverseQuaternion = this.camera.quaternion.clone().invert();
            this.gizmoGroup.quaternion.copy(inverseQuaternion);
        }
        
        // Clear and render main scene
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
        
        // Render gizmo overlay in top-right corner
        if (this.gizmoScene) {
            const size = 120; // Gizmo size in pixels
            const margin = 20; // Margin from edges
            
            this.renderer.setViewport(
                window.innerWidth - size - margin, 
                window.innerHeight - size - margin, 
                size, 
                size
            );
            this.renderer.render(this.gizmoScene, this.gizmoCamera);
            
            // Reset viewport for next frame
            this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UnitySceneRenderer();
}); 