$src_dir = "room 02"
$dst_dir = "images"

# Copy main image
Copy-Item "$src_dir/room02.jpeg" "$dst_dir/room-toit-1.jpg" -Force
Write-Output "Copied room02.jpeg as primary showcase image."

# Copy thumbnails
$i = 2
Get-ChildItem -Path $src_dir -Filter "*.jpeg" | Sort-Object Name | ForEach-Object {
    if ($_.Name -ne "room02.jpeg") {
        $dest = "$dst_dir/room-toit-$i.jpg"
        Copy-Item $_.FullName $dest -Force
        Write-Output "Copied $($_.Name) as thumbnail to $dest"
        $i++
    }
}
