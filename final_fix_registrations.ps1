$documentsPath = "C:\Users\Tatle\Desktop\Knowledge Base\knowledge-base\documents"

# Get all JavaScript files recursively
$jsFiles = Get-ChildItem -Path $documentsPath -Filter "*.js" -Recurse | Where-Object { $_.Name -ne "registry.js" }

foreach ($file in $jsFiles) {
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
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw
    
    # Extract the content variable name
    if ($content -match "const\s+(\w+Content)\s*=") {
        $varName = $matches[1]
        
        # Completely rewrite the registration code
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
        
        # Get the position of the registration section
        $registrationStart = $content.IndexOf("// Register with document registry")
        
        # If registration section found, replace it
        if ($registrationStart -gt 0) {
            # Keep the content before registration
            $beforeRegistration = $content.Substring(0, $registrationStart)
            
            # Create the new content
            $newContent = $beforeRegistration + $newRegistration
            
            # Write the new content to the file
            Set-Content -Path $file.FullName -Value $newContent
            Write-Output "Fixed registration in: $($file.Name)"
        } else {
            Write-Output "Could not find registration section in: $($file.Name)"
        }
    } else {
        # Handle the special case for blocklist-unsubscribe.js
        if ($file.Name -eq "blocklist-unsubscribe.js" -and $content -match "const\s+(\w+_\w+_\w+)\s*=") {
            $varName = $matches[1]
            
            # Completely rewrite the registration code
            $newRegistration = "// Register with document registry
if (window.documentRegistry) {
    window.documentRegistry.registerDocument($varName, '$category', '$folderKey');
} else {
    window.addEventListener('load', () => {
        if (window.documentRegistry) {
            window.documentRegistry.registerDocument($varName, '$category', '$folderKey');
        }
    });
}"
            
            # Get the position of the registration section
            $registrationStart = $content.IndexOf("// Register with document registry")
            
            # If registration section found, replace it
            if ($registrationStart -gt 0) {
                # Keep the content before registration
                $beforeRegistration = $content.Substring(0, $registrationStart)
                
                # Create the new content
                $newContent = $beforeRegistration + $newRegistration
                
                # Write the new content to the file
                Set-Content -Path $file.FullName -Value $newContent
                Write-Output "Fixed registration in: $($file.Name) (special case)"
            }
        } else {
            Write-Output "Could not extract variable name from: $($file.Name)"
        }
    }
}

Write-Output "All registrations have been fixed!"
