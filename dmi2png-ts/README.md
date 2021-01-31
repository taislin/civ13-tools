# dmi2png-ts
Convert BYOND dmi's into a png and file.

## installing
You will need to have Node.Js and python in order to run the program.
Run `npm install` to install all the javascript dependencies. The Python program has no specific dependencies.
You will also need typescript installed.

## running
Place the dmi files that you want to convert in the in/ folder. Run the program with `python convert.py`. The png and json files will be created in the out/ folder.

## known issues
Animated sprites are out of order. Static ones will be fine.