using UnityEngine;
using System.Collections.Generic;
using Sirenix.OdinInspector;

namespace SpatialReasoning
{
    public class UnityToJsonExporter : MonoBehaviour
    {
        [Title("Unity to JSON Spatial Exporter")]
        
        [BoxGroup("Export Settings")]
        public Transform parentToExport;
        
        [BoxGroup("Export Settings")]
        public string sceneName = "Exported Scene";
        
        [BoxGroup("Export Settings")]
        public string sceneDescription = "Scene exported from Unity";

        [BoxGroup("Output")]
        [TextArea(10, 20)]
        [ReadOnly]
        public string exportedJson;

        [BoxGroup("Testing Controls")]
        [Button("📤 Export Scene to JSON", ButtonSizes.Large)]
        [GUIColor(0.4f, 1f, 0.4f)]
        public void ExportToJson()
        {
            SceneData sceneData = CreateSceneData();
            exportedJson = JsonUtility.ToJson(sceneData, true);
            Debug.Log("✅ Scene exported to JSON successfully");
        }

        [BoxGroup("Testing Controls")]
        [Button("📤 Export Children Only", ButtonSizes.Medium)]
        [GUIColor(0.6f, 0.8f, 1f)]
        public void ExportChildrenOnly()
        {
            SceneData sceneData = new SceneData();
            
            sceneData.scene = new SceneInfo
            {
                name = sceneName,
                description = sceneDescription
            };

            sceneData.objects = new List<ObjectData>();
            ExtractChildrenRecursive(parentToExport, sceneData.objects);

            exportedJson = JsonUtility.ToJson(sceneData, true);
            Debug.Log($"✅ Exported {sceneData.objects.Count} children to JSON");
        }

        [BoxGroup("File Operations")]
        [Button("💾 Save JSON to StreamingAssets", ButtonSizes.Medium)]
        public void SaveToStreamingAssets()
        {
            if (string.IsNullOrEmpty(exportedJson))
            {
                Debug.LogWarning("⚠️ No JSON to save. Export first!");
                return;
            }

            string path = System.IO.Path.Combine(Application.streamingAssetsPath, "exported_scene.json");
            SaveJsonToFile(path);
        }

        [BoxGroup("File Operations")]
        [Button("📋 Copy JSON to Clipboard", ButtonSizes.Medium)]
        public void CopyToClipboard()
        {
            if (string.IsNullOrEmpty(exportedJson))
            {
                Debug.LogWarning("⚠️ No JSON to copy. Export first!");
                return;
            }

            GUIUtility.systemCopyBuffer = exportedJson;
            Debug.Log("📋 JSON copied to clipboard!");
        }

        void Start()
        {
            if (parentToExport == null)
                parentToExport = this.transform;
        }

        private SceneData CreateSceneData()
        {
            SceneData sceneData = new SceneData();
            
            sceneData.scene = new SceneInfo
            {
                name = sceneName,
                description = sceneDescription
            };

            sceneData.objects = new List<ObjectData>();

            foreach (Transform child in parentToExport)
            {
                ObjectData objData = ExtractObjectData(child.gameObject);
                if (objData != null)
                {
                    sceneData.objects.Add(objData);
                }
            }

            return sceneData;
        }

        private ObjectData ExtractObjectData(GameObject obj)
        {
            ObjectData objData = new ObjectData();

            objData.name = obj.name;
            objData.model = GetPrimitiveType(obj);
            
            objData.position = FromVector3(obj.transform.position);
            objData.rotation = FromVector3(obj.transform.rotation.eulerAngles);
            objData.scale = FromVector3(obj.transform.localScale);
            objData.bounds = objData.scale;
            
            objData.color = GetObjectColor(obj);
            objData.text = obj.name.ToUpper();

            return objData;
        }

        private string GetPrimitiveType(GameObject obj)
        {
            MeshFilter meshFilter = obj.GetComponent<MeshFilter>();
            if (meshFilter == null || meshFilter.sharedMesh == null)
                return "Cube";

            string meshName = meshFilter.sharedMesh.name.ToLower();

            if (meshName.Contains("cube"))
                return "Cube";
            else if (meshName.Contains("sphere"))
                return "Sphere";
            else if (meshName.Contains("capsule"))
                return "Capsule";
            else if (meshName.Contains("cylinder"))
                return "Cylinder";
            else if (meshName.Contains("plane"))
                return "Plane";
            else if (meshName.Contains("quad"))
                return "Quad";
            else
                return "Cube";
        }

        private string GetObjectColor(GameObject obj)
        {
            MeshRenderer renderer = obj.GetComponent<MeshRenderer>();
            if (renderer == null || renderer.material == null)
                return "#ffffff";

            Color color = renderer.material.color;
            return "#" + ColorUtility.ToHtmlStringRGB(color);
        }

        private Vector3Data FromVector3(Vector3 vector)
        {
            return new Vector3Data
            {
                x = vector.x,
                y = vector.y,
                z = vector.z
            };
        }

        public void SaveJsonToFile(string filePath)
        {
            if (string.IsNullOrEmpty(exportedJson))
            {
                ExportToJson();
            }
            
            try
            {
                string directory = System.IO.Path.GetDirectoryName(filePath);
                if (!System.IO.Directory.Exists(directory))
                {
                    System.IO.Directory.CreateDirectory(directory);
                }

                System.IO.File.WriteAllText(filePath, exportedJson);
                Debug.Log($"💾 JSON saved to: {filePath}");
            }
            catch (System.Exception e)
            {
                Debug.LogError($"❌ Failed to save JSON: {e.Message}");
            }
        }

        private void ExtractChildrenRecursive(Transform parent, List<ObjectData> objectList)
        {
            foreach (Transform child in parent)
            {
                if (child.GetComponent<UnityToJsonExporter>() != null)
                    continue;

                ObjectData objData = ExtractObjectData(child.gameObject);
                if (objData != null)
                {
                    objectList.Add(objData);
                }

                ExtractChildrenRecursive(child, objectList);
            }
        }
    }
} 