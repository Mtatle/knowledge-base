$documentsPath = "C:\Users\Tatle\Desktop\Knowledge Base\knowledge-base\documents"

# Get all JavaScript files recursively
$jsFiles = Get-ChildItem -Path $documentsPath -Filter "*.js" -Recurse | Where-Object { $_.Name -ne "registry.js" }

foreach ($file in $jsFiles) {
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
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Get variable name
    if ($content -match "const\s+([a-zA-Z0-9]+)Content\s*=") {
        $varName = $matches[1] + "Content"
        
        # Create new registration code
        $newRegistration = "// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument($varName, '$category', '$folderKey'"
        
        # Add subfolder parameter if necessary
        if ($subfolder) {
            $newRegistration += ", '$subfolderKey'"
        }
        
        $newRegistration += ");
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument($varName, '$category', '$folderKey'"
            
        # Add subfolder parameter if necessary
        if ($subfolder) {
            $newRegistration += ", '$subfolderKey'"
        }
        
        $newRegistration += ");
        }
    });
}"
        
        # Replace any existing registration section
        if ($content -match "(// Register with document registry[\s\S]*?})") {
            $oldRegistration = $matches[1]
            $content = $content.Replace($oldRegistration, $newRegistration)
            
            # Write updated content back to file
            Set-Content -Path $file.FullName -Value $content
            Write-Output "Updated: $($file.Name)"
        }
    } else {
        Write-Output "Could not find variable name in: $($file.Name)"
    }
}

Write-Output "All document registrations have been updated!"
