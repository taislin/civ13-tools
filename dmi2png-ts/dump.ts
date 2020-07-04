var fs = require('fs');
const pngitxt = require('png-itxt');
const sizeOf = require('image-size');

if (process.argv.length >= 3) {
  fs.createReadStream("./in/"+process.argv[2]).pipe(
	pngitxt.get(function(err, data) {
	  if (!err && data) {
		var dimensions = sizeOf("./in/"+process.argv[2])
		const fwidth = dimensions.width; //the file width
		const fheight = dimensions.height; //the file height
		var fulltext = data.value
		fulltext = `${fwidth};${fheight}||\n`+data.value
		fs.writeFile(`./out/${process.argv[2]}.dump.txt`, fulltext, (err: any) => {if (err) throw err;})
	  }
	})
  );
} else {
  console.error('File not found.');
}