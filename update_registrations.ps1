$contentPath = "C:\Users\Tatle\Desktop\Knowledge Base\knowledge-base\documents"

# Get all JavaScript files recursively
$jsFiles = Get-ChildItem -Path $contentPath -Filter "*.js" -Recurse | Where-Object { $_.Name -ne "registry.js" }

foreach ($file in $jsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Determine the category, folder, and subfolder based on the file path
    $pathParts = $file.FullName.Replace($contentPath, "").Split("\")
    
    $category = $pathParts[1]
    $folder = if ($pathParts.Length -gt 2) { $pathParts[2] } else { "" }
    $subfolder = if ($pathParts.Length -gt 3) { $pathParts[3] } else { "" }
    
    # Convert folder names to camelCase
    if ($folder -match "-") {
        $folderParts = $folder -split "-"
        $folder = $folderParts[0]
        for ($i = 1; $i -lt $folderParts.Length; $i++) {
            $folder += (Get-Culture).TextInfo.ToTitleCase($folderParts[$i])
        }
    }
    
    if ($subfolder -match "-") {
        $subfolderParts = $subfolder -split "-"
        $subfolder = $subfolderParts[0]
        for ($i = 1; $i -lt $subfolderParts.Length; $i++) {
            $subfolder += (Get-Culture).TextInfo.ToTitleCase($subfolderParts[$i])
        }
    }
    
    # Adjust names for special folders
    if ($folder -eq "message-quality") { $folder = "messageQuality" }
    if ($folder -eq "event-quality") { $folder = "eventQuality" }
    if ($folder -eq "conversation-topics") { $folder = "conversationTopics" }
    if ($folder -eq "concierge-agent-101") { $folder = "conciergeAgent101" }
    if ($subfolder -eq "pre-purchase") { $subfolder = "prePurchase" }
    if ($subfolder -eq "post-purchase") { $subfolder = "postPurchase" }
    
    # Build the new registration line
    $variableName = $content -match '(?<=window\.)([a-zA-Z0-9]+)(?=\s*=)' | ForEach-Object { $matches[1] }
    
    if ($variableName) {
        $oldRegistration = [regex]::Escape("// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument($variableName);
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument($variableName);
        }
    });
}")

        $newRegistration = "// Register with document registry
if (window.documentRegistry) {"
        
        $newRegistration += "`n    window.documentRegistry.registerDocument($variableName"
        
        if ($category) {
            $newRegistration += ", '$category'"
            
            if ($folder) {
                $newRegistration += ", '$folder'"
                
                if ($subfolder) {
                    $newRegistration += ", '$subfolder'"
                }
            }
        }
        
        $newRegistration += ");"
        $newRegistration += "`n} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument($variableName"
            
        if ($category) {
            $newRegistration += ", '$category'"
            
            if ($folder) {
                $newRegistration += ", '$folder'"
                
                if ($subfolder) {
                    $newRegistration += ", '$subfolder'"
                }
            }
        }
            
        $newRegistration += ");
        }
    });
}"
        
        # Replace the registration part
        $newContent = $content -replace $oldRegistration, $newRegistration
        
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $newContent
        
        Write-Output "Updated: $($file.FullName)"
    } else {
        Write-Output "Skipped (no variable name found): $($file.FullName)"
    }
}

Write-Output "Registration update complete!"
