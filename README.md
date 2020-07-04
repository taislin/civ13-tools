# Tools
Before using the tools, edit the `config.txt` file with your game's folders.

## unused-files-finder
This program indexes image and sound assets and then checks for mentions in the code, returning a list of orphaned files. It also lets you delete them automatically (altough you probably shouldn't)

## dmi2png-ts
Convert BYOND dmi's into a png and a json file with the metadata.

## object-fetcher
Grab civ13's DMI assets and convert them to png/json using the `unused-files-finder` tool. Then writes .atom files listing the objects it creates.