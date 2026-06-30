import os
import json

ROOT = "images"  # folder containing all 9 version subfolders

folders = sorted(os.listdir(ROOT))
print(f"Detected folders: {folders}\n")

# Use the first folder as reference for base names
ref_folder = folders[0]
base_names = sorted(
    os.path.splitext(f)[0].rsplit("_", 1)[0]
    for f in os.listdir(os.path.join(ROOT, ref_folder))
    if f.endswith(".png")
)

print(f"Found {len(base_names)} base images\n")

# Verify every base name exists in every folder
for folder in folders:
    existing = {os.path.splitext(f)[0] for f in os.listdir(os.path.join(ROOT, folder))}
    for base in base_names:
        assert f"{base}_{folder}" in existing, f"Missing in {folder}: {base}_{folder}.png"

print("✓ All folders verified\n")

print("const versions =", json.dumps(folders, indent=2) + ";\n")
print("const imageNames =", json.dumps(base_names, indent=2) + ";\n")