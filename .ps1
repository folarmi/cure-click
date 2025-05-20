$TOMCAT_DIR = 'C:\Program Files\Apache Software Foundation\Tomcat 11.0_Tomcat\webapps\ROOT'
$OUT_DIR = 'out'

if (-Not (Test-Path -Path $TOMCAT_DIR)) {
    Write-Host "Directory does not exist. Creating: $TOMCAT_DIR"
    New-Item -ItemType Directory -Path $TOMCAT_DIR -Force | Out-Null
} else {
    Write-Host "Directory already exists: $TOMCAT_DIR"
}

Write-Host "Removing existing files in $TOMCAT_DIR"
Remove-Item "$TOMCAT_DIR\*" -Recurse -Force

Write-Host "Copying files from $OUT_DIR to $TOMCAT_DIR"
Copy-Item "$OUT_DIR\*" -Destination $TOMCAT_DIR -Recurse

Write-Host "fan-farm folder in Tomcat replaced with new build files."