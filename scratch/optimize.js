const { execSync } = require('child_process');

const images = [
  { src: 'images/room-artisans.png', dst: 'images/room-artisans.jpg' },
  { src: 'images/blog-five-spices.png', dst: 'images/blog-five-spices.jpg' },
  { src: 'images/experience-tasting.png', dst: 'images/experience-tasting.jpg' },
  { src: 'images/experience-prep.png', dst: 'images/experience-prep.jpg' }
];

images.forEach(({ src, dst }) => {
  try {
    // Escape single quotes for PowerShell
    const cmd = `[Reflection.Assembly]::LoadWithPartialName('System.Drawing') | Out-Null; ` +
                `$src = [System.Drawing.Bitmap]::FromFile('${src}'); ` +
                `$codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders(); ` +
                `$jpegCodec = $codecs | Where-Object { $_.FormatDescription -eq 'JPEG' }; ` +
                `$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1); ` +
                `$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 80); ` +
                `$src.Save('${dst}', $jpegCodec, $encoderParams); ` +
                `$src.Dispose();`;
    
    execSync(`powershell -Command "${cmd}"`);
    console.log(`✓ Converted ${src} to ${dst}`);
  } catch (err) {
    console.error(`✗ Failed to convert ${src}:`, err.message);
  }
});
