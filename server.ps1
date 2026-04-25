$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080/"
Write-Host "Press Ctrl+C to stop"

$root = "c:\Users\ayman\Desktop\app test"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $path = $request.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }

    $filePath = Join-Path $root ($path -replace "/", "\")

    if (Test-Path $filePath) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

        # Detect actual image type from magic bytes
        $contentType = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css; charset=utf-8" }
            ".js"   { "application/javascript; charset=utf-8" }
            ".png"  {
                # Check magic bytes: JPEG starts with FF D8 FF, PNG starts with 89 50 4E 47
                if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8 -and $bytes[2] -eq 0xFF) {
                    "image/jpeg"
                } else {
                    "image/png"
                }
            }
            ".jpg"  { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".svg"  { "image/svg+xml" }
            ".ico"  { "image/x-icon" }
            ".json" { "application/json" }
            ".webp" { "image/webp" }
            default { "application/octet-stream" }
        }

        $response.ContentType = $contentType
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "$($request.HttpMethod) $path -> 200 ($contentType)"
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.ContentLength64 = $msg.Length
        $response.OutputStream.Write($msg, 0, $msg.Length)
        Write-Host "$($request.HttpMethod) $path -> 404"
    }

    $response.OutputStream.Close()
}
