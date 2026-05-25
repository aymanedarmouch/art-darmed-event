[Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null

function Convert-PngToJpg {
    param(
        [string]$SrcPath,
        [string]$DstPath,
        [int]$Quality
    )
    try {
        $src = [System.Drawing.Bitmap]::FromFile($SrcPath)
        
        # Get the jpeg encoder
        $codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
        $jpegCodec = $codecs | Where-Object { $_.FormatDescription -eq "JPEG" }
        
        # Set quality parameter
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)
        
        $src.Save($DstPath, $jpegCodec, $encoderParams)
        $src.Dispose()
        Write-Host "✓ Successfully converted $SrcPath to $DstPath"
    }
    catch {
        Write-Error "Error converting $SrcPath"
    }
}

# Optimize the 4 large PNG files
Convert-PngToJpg -SrcPath "images/room-artisans.png" -DstPath "images/room-artisans.jpg" -Quality 80
Convert-PngToJpg -SrcPath "images/blog-five-spices.png" -DstPath "images/blog-five-spices.jpg" -Quality 80
Convert-PngToJpg -SrcPath "images/experience-tasting.png" -DstPath "images/experience-tasting.jpg" -Quality 80
Convert-PngToJpg -SrcPath "images/experience-prep.png" -DstPath "images/experience-prep.jpg" -Quality 80
