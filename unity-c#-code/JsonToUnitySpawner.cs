using UnityEngine;
using System.Collections.Generic;
using Sirenix.OdinInspector;

namespace SpatialReasoning
{
    [System.Serializable]
    public class SceneData
    {
        public SceneInfo scene;
        public List<ObjectData> objects;
    }

    [System.Serializable]
    public class SceneInfo
    {
        public string name;
        public string description;
    }

    [System.Serializable]
    public class ObjectData
    {
        public string name;
        public string model;
        public Vector3Data position;
        public Vector3Data rotation;
        public Vector3Data scale;
        public Vector3Data bounds;
        public string color;
        public string text;
    }

    [System.Serializable]
    public class Vector3Data
    {
        public float x;
        public float y;
        public float z;

        public Vector3 ToVector3()
        {
            return new Vector3(x, y, z);
        }
    }

    public class JsonToUnitySpawner : MonoBehaviour
    {
        [Title("JSON Spatial Importer")]
        
        [BoxGroup("JSON Input")]
        [TextArea(10, 20)]
        public string jsonInput;

        [BoxGroup("Spawn Settings")]
        public Transform parentTransform;

        [BoxGroup("Testing Controls")]
        [Button("🎮 Spawn Objects from JSON", ButtonSizes.Large)]
        [GUIColor(0.4f, 0.8f, 1f)]
        public void SpawnFromJson()
        {
            if (string.IsNullOrEmpty(jsonInput))
            {
                Debug.LogError("JSON input is empty");
                return;
            }

            try
            {
                SceneData sceneData = JsonUtility.FromJson<SceneData>(jsonInput);
                SpawnObjects(sceneData);
                Debug.Log($"✅ Successfully spawned {sceneData.objects.Count} objects");
            }
            catch (System.Exception e)
            {
                Debug.LogError($"❌ Failed to parse JSON: {e.Message}");
            }
        }

        [BoxGroup("Testing Controls")]
        [Button("🗑️ Clear All Objects", ButtonSizes.Medium)]
        [GUIColor(1f, 0.6f, 0.6f)]
        public void ClearObjects()
        {
            ClearExistingObjects();
            Debug.Log("🧹 Cleared all spawned objects");
        }

        [BoxGroup("File Operations")]
        [Button("📁 Load JSON from StreamingAssets", ButtonSizes.Medium)]
        public void LoadFromStreamingAssets()
        {
            string path = System.IO.Path.Combine(Application.streamingAssetsPath, "spatial_scene.json");
            LoadJsonFromFile(path);
        }

        void Start()
        {
            if (parentTransform == null)
                parentTransform = this.transform;
        }

        private void SpawnObjects(SceneData sceneData)
        {
            ClearExistingObjects();

            foreach (ObjectData objData in sceneData.objects)
            {
                GameObject spawnedObj = CreatePrimitive(objData);
                if (spawnedObj != null)
                {
                    ApplyTransform(spawnedObj, objData);
                    ApplyMaterial(spawnedObj, objData.color);
                    spawnedObj.name = objData.name;
                    spawnedObj.transform.SetParent(parentTransform);
                }
            }
        }

        private GameObject CreatePrimitive(ObjectData objData)
        {
            PrimitiveType primitiveType;

            switch (objData.model.ToLower())
            {
                case "cube":
                    primitiveType = PrimitiveType.Cube;
                    break;
                case "sphere":
                    primitiveType = PrimitiveType.Sphere;
                    break;
                case "capsule":
                    primitiveType = PrimitiveType.Capsule;
                    break;
                case "cylinder":
                    primitiveType = PrimitiveType.Cylinder;
                    break;
                case "plane":
                    primitiveType = PrimitiveType.Plane;
                    break;
                case "quad":
                    primitiveType = PrimitiveType.Quad;
                    break;
                default:
                    Debug.LogWarning($"Unknown model type: {objData.model}, using Cube");
                    primitiveType = PrimitiveType.Cube;
                    break;
            }

            return GameObject.CreatePrimitive(primitiveType);
        }

        private void ApplyTransform(GameObject obj, ObjectData objData)
        {
            obj.transform.position = objData.position.ToVector3();
            obj.transform.rotation = Quaternion.Euler(objData.rotation.ToVector3());
            obj.transform.localScale = objData.scale.ToVector3();
        }

        private void ApplyMaterial(GameObject obj, string colorHex)
        {
            MeshRenderer renderer = obj.GetComponent<MeshRenderer>();
            if (renderer == null) return;

            Material material = new Material(Shader.Find("Standard"));
            
            if (ColorUtility.TryParseHtmlString(colorHex, out Color color))
            {
                material.color = color;
            }
            else
            {
                Debug.LogWarning($"Invalid color format: {colorHex}");
                material.color = Color.white;
            }

            renderer.material = material;
        }

        private void ClearExistingObjects()
        {
            for (int i = parentTransform.childCount - 1; i >= 0; i--)
            {
                DestroyImmediate(parentTransform.GetChild(i).gameObject);
            }
        }

        public void LoadJsonFromFile(string filePath)
        {
            if (System.IO.File.Exists(filePath))
            {
                jsonInput = System.IO.File.ReadAllText(filePath);
                SpawnFromJson();
                Debug.Log($"📂 Loaded and spawned from: {filePath}");
            }
            else
            {
                Debug.LogError($"❌ File not found: {filePath}");
            }
        }
    }
}