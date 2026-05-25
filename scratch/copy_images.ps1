$i = 1
Get-ChildItem -Path "room 02" -Filter "*.jpeg" | Sort-Object Name | ForEach-Object {
    $dest = "images/room-toit-$i.jpg"
    Copy-Item $_.FullName $dest -Force
    Write-Output "Copied $($_.Name) to $dest"
    $i++
}
