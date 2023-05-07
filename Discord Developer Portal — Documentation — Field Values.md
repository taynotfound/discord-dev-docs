# Discord Developer Portal — Documentation — Field Values

## Predefined Field Values

Need help with Dispatch? Talk to us in the [Discord Developers Server](https://discord.gg/discord-developers)!

## Manifests

## Platform Values

| Platform |
| --- |
| macos |
| win32 |
| win64 |
| linux |

## Redistributable values

| Redistributable |
| --- |
| directx\_june\_2010 |
| vcredist\_2005\_x86 |
| vcredist\_2008\_sp1\_x86 |
| vcredist\_2010\_x64 |
| vcredist\_2010\_x86 |
| vcredist\_2012\_update\_4\_x64 |
| vcredist\_2012\_update\_4\_x86 |
| vcredist\_2013\_x64 |
| vcredist\_2013\_x86 |
| vcredist\_2015\_x64 |
| vcredist\_2015\_x86 |
| vcredist\_2017\_x64 |
| vcredist\_2017\_x86 |
| xnafx\_40 |

## Cloud Save Path Replacements

| value | Windows path | macOS path | linux path |
| --- | --- | --- | --- |
| ${HOME} | %USERPROFILE% | ~/ | ~/ |
| ${DOCUMENTS} | %USERPROFILE%\\Documents | ~/Documents | $XDG\_DOCUMENTS\_DIR |
| ${DATA} | %USERPROFILE%\\AppData\\Roaming | ~/Library/Application Support | $XDG\_DATA\_HOME |
| ${DATALOCAL} | %USERPROFILE%\\AppData\\Local | ~/Library/Application Support | $XDG\_DATA\_HOME |
| ${DATALOCALLOW} | %USERPROFILE%\\AppData\\LocalLow | ~/Library/Application Support | $XDG\_DATA\_HOME |
| ${SAVEDGAMES} | %USERPROFILE%\\Saved Games | (not supported) | (not supported) |
| ${INSTALLDIR} | the game's install directory | (same) | (same) |
| ${USERID} | the user's id - use within a path to define saves for multiple users | (same) | (same) |
| ${BRANCHID} | the id of the game branch - use within a path to define saves for multiple branches | (same) | (same) |

