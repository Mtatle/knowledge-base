$documentsPath = "C:\Users\Tatle\Desktop\Knowledge Base\knowledge-base\documents"

# Get all JavaScript files recursively
$jsFiles = Get-ChildItem -Path $documentsPath -Filter "*.js" -Recurse | Where-Object { $_.Name -ne "registry.js" }

foreach ($file in $jsFiles) {
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if there's an extra closing brace at the end
    if ($content -match "\}\s*\}[\s\n\r]*$") {
        # Remove extra closing braces
        $updatedContent = $content -replace "\}\s*\}[\s\n\r]*$", "}"
        
        # Write updated content back to file
        Set-Content -Path $file.FullName -Value $updatedContent
        Write-Output "Fixed extra braces in: $($file.Name)"
    }
}

Write-Output "All extra braces have been fixed!"
