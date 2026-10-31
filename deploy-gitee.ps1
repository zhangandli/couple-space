$ErrorActionPreference = "Stop"

$remote = "https://gitee.com/bsjdzpy/couple-space.git"

Write-Host "Checking Gitee repository..." -ForegroundColor Cyan
git ls-remote $remote *> $null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Repository does not exist yet." -ForegroundColor Yellow
    Write-Host "Create an empty public repository named 'couple-space' here:" -ForegroundColor Yellow
    Write-Host "  https://gitee.com/projects/new" -ForegroundColor White
    Write-Host ""
    Write-Host "Do not initialize it with a README. Then run this script again."
    Start-Process "https://gitee.com/projects/new"
    exit 1
}

git push -u origin master
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Pushed to https://gitee.com/bsjdzpy/couple-space" -ForegroundColor Green
}
