$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
if (-not $env:DATA_GO_KR_KEY) { $key = Read-Host '공공데이터포털 API 키' -AsSecureString; $env:DATA_GO_KR_KEY = [System.Net.NetworkCredential]::new('', $key).Password }
if (-not $env:REB_API_KEY) { $key = Read-Host '한국부동산원 API 키' -AsSecureString; $env:REB_API_KEY = [System.Net.NetworkCredential]::new('', $key).Password }
Write-Host '브라우저에서 http://127.0.0.1:4173/index.html 을 여세요.'
node server.mjs
