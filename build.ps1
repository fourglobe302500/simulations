Get-ChildItem -Directory | 
ForEach-Object { Push-Location $_; npm run build; Pop-Location }