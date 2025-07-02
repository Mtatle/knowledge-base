$documentsPath = "C:\Users\Tatle\Desktop\Knowledge Base\knowledge-base\documents"

# Get all JavaScript files recursively
$jsFiles = Get-ChildItem -Path $documentsPath -Filter "*.js" -Recurse | Where-Object { $_.Name -ne "registry.js" }

foreach ($file in $jsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Extract the variable name from the file
    $variableName = $content -match '(?<=const\s+)([a-zA-Z0-9]+)(?=\s*=)' | ForEach-Object { $matches[1] }
    
    if ($variableName) {
        # Determine the category, folder, and subfolder based on the file path
        $relativePath = $file.FullName.Replace($documentsPath, "").TrimStart("\")
        $pathParts = $relativePath.Split("\")
        
        $category = $pathParts[0] # admin or content
        $folder = if ($pathParts.Length -gt 1) { $pathParts[1] } else { "" }
        $subfolder = if ($pathParts.Length -gt 2) { $pathParts[2] } else { "" }
        
        # Convert folder names to camelCase for registry keys
        $folderKey = $folder
        $subfolderKey = $subfolder
        
        # Special case mappings
        if ($folder -eq "message-quality") { $folderKey = "messageQuality" }
        if ($folder -eq "event-quality") { $folderKey = "eventQuality" }
        if ($folder -eq "conversation-topics") { $folderKey = "conversationTopics" }
        if ($folder -eq "concierge-agent-101") { $folderKey = "conciergeAgent101" }
        if ($folder -eq "organization-structure") { $folderKey = "organizationStructure" }
        if ($folder -eq "code-of-conduct") { $folderKey = "codeOfConduct" }
        if ($folder -eq "agent-behaviors") { $folderKey = "agentBehaviors" }
        
        if ($subfolder -eq "pre-purchase") { $subfolderKey = "prePurchase" }
        if ($subfolder -eq "post-purchase") { $subfolderKey = "postPurchase" }
        
        # Create new registration code
        $newRegistration = "// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument($variableName, '$category', '$folderKey'"
        
        # Add subfolder parameter if necessary
        if ($subfolder) {
            $newRegistration += ", '$subfolderKey'"
        }
        
        $newRegistration += ");
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument($variableName, '$category', '$folderKey'"
            
        # Add subfolder parameter if necessary
        if ($subfolder) {
            $newRegistration += ", '$subfolderKey'"
        }
        
        $newRegistration += ");
        }
    });
}"
        
        # Find and replace the registration part - try different patterns to catch variations
        $pattern = "// Register with document registry[\s\S]*?}\s*}\s*\);"
        $updatedContent = $content -replace $pattern, $newRegistration
        
        # If no change was made, try another pattern
        if ($updatedContent -eq $content) {
            $pattern = "// Register with document registry[\s\S]*?}\s*\);"
            $updatedContent = $content -replace $pattern, $newRegistration
        }
        
        # If still no change, try another pattern
        if ($updatedContent -eq $content) {
            $pattern = "// Register with document registry[\s\S]*?}\s*}"
            $updatedContent = $content -replace $pattern, $newRegistration
        }
        
        # Remove any trailing stray closing braces after the registration section
        $updatedContent = $updatedContent -replace "}\s*}\s*$", "}"
        
        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $updatedContent
        
        Write-Host "Updated: $($file.Name)"
    } else {
        Write-Host "Skipped (no variable name found): $($file.Name)"
    }
}

Write-Output "Registration update complete!"
