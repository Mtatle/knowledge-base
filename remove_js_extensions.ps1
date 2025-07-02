$documentsPath = "C:\Users\Tatle\Desktop\Knowledge Base\knowledge-base\documents"

# Get all JavaScript files recursively
$jsFiles = Get-ChildItem -Path $documentsPath -Filter "*.js" -Recurse | Where-Object { $_.Name -ne "registry.js" }

foreach ($file in $jsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if the file contains registerDocument with .js extension
    if ($content -match "registerDocument\(.*\.js") {
        # Remove .js extension from registerDocument calls
        $updatedContent = $content -replace "(registerDocument\([^,]+, '[^']+', '[^']+'), '[^']*.js'", "`$1"
        $updatedContent = $updatedContent -replace "(registerDocument\([^,]+, '[^']+', '[^']+'), '[^']*.js'", "`$1"
        
        # Also handle cases without the third parameter
        $updatedContent = $updatedContent -replace "(registerDocument\([^,]+, '[^']+'), '[^']*.js'", "`$1"
        
        # Write the updated content back to the file if changes were made
        if ($updatedContent -ne $content) {
            Set-Content -Path $file.FullName -Value $updatedContent
            Write-Output "Fixed .js in: $($file.Name)"
        }
    }
}

Write-Output "All .js extensions in registerDocument calls have been fixed!"
