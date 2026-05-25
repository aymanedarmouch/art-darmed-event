import os
import shutil

src_dir = "room 02"
dst_dir = "images"

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

files = [f for f in os.listdir(src_dir) if f.lower().endswith('.jpeg')]
files.sort()  # Sort alphabetically so they match order

for i, f in enumerate(files, 1):
    src_path = os.path.join(src_dir, f)
    dst_path = os.path.join(dst_dir, f"room-toit-{i}.jpg")
    shutil.copy2(src_path, dst_path)
    print(f"Copied {src_path} -> {dst_path}")
