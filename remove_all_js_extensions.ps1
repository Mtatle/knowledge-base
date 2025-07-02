$documentsPath = "C:\Users\Tatle\Desktop\Knowledge Base\knowledge-base\documents"

# Get all JavaScript files recursively
$jsFiles = Get-ChildItem -Path $documentsPath -Filter "*.js" -Recurse | Where-Object { $_.Name -ne "registry.js" }

foreach ($file in $jsFiles) {
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if there's a .js extension in registerDocument calls
    if ($content -match "registerDocument\([^,]+, [^,]+, [^,]+, '.*\.js'") {
        # Get the filename without extension to use in matching
        $fileName = $file.Name.Replace(".js", "")
        
        # Replace the .js extension in registerDocument calls
        $updatedContent = $content -replace "(registerDocument\([^,]+, '[^']+', '[^']+'(?:, '[^']+')?)(?:, '[^']*\.js')", "`$1"
        
        # Write the updated content to the file
        Set-Content -Path $file.FullName -Value $updatedContent
        Write-Output "Fixed .js extension in: $($file.Name)"
    }
}

Write-Output "All .js extensions in registerDocument calls have been fixed!"
