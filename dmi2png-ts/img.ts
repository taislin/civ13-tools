var fs = require('fs');

//gives the real x and y of the sprite according to the file size and order
//example: on a 32x32 sprite size, with a 320x320 file size, the sprite nr 11
//will have a (x,y) value of (0,32). The sprite nr 6 will have a (x,y) value of (160,0).
function checkloc(num: number, parsedwidth: number, width: number, height: number) {
	let vlocx : number = (num-1)*width;
	let vlocy : number = 0;

	if (num > parsedwidth) {
		vlocx = Math.floor((num-1)%parsedwidth)*width;
		vlocy = Math.floor(((num-1)/parsedwidth))*height;
		}
	return [vlocx,vlocy];
};

if (process.argv.length >= 3) {ConvertProc ("./out/"+process.argv[2]+".dump.txt")}
else {console.error('Missing the file.');}

function ConvertProc (file: string) {
	if (file.search(".dump.txt") != -1) {
		var fulltext : string = fs.readFileSync(file, {encoding:'utf8', flag:'r'}); 
		var fwidth : number = 32
		var fheight : number = 32
		var width : number = 32 //the individual sprite's width
		var height : number = 32 //the individual sprite's width
		var fwfh = fulltext.split("||")[0];
		fwidth = Number(fwfh.split(";")[0]);
		fheight = Number(fwfh.split(";")[1]);

		fulltext = fulltext.replace(`${fwfh.split(";")[0]};${fwfh.split(";")[1]}||\n`,"")
		fulltext = fulltext.replace("# BEGIN DMI\n","")
		fulltext = fulltext.replace("version = 4.0\n","")
		fulltext = fulltext.replace("	width = ","")
		fulltext = fulltext.replace("	height = ","||")
		fulltext = fulltext.replace("# END DMI","")

		var parsedtext = fulltext.split("state = ")
		var wh : Array<string> = parsedtext[0].replace("\n","").split("||")
		width = Number(wh[0])
		height = Number(wh[1].replace("\n",""))

		var parsedwidth = fwidth/width //number of columns
		var parsedheight = fheight/height //number of lines

		var icounter : number = 1
		console.log(parsedtext.length+"> f-width: "+fwidth+"("+parsedwidth+"s)"+" | f-height: "+fheight+"("+parsedheight+"s)")
		var toexport = {};
		for(var i = 1; i<parsedtext.length;i++) {
			var icon_state_list : string[] = parsedtext[i].split("\n")
			var tobj = {name:icon_state_list[0], tile_size:Number(height), dir_count:Number(icon_state_list[1].replace("	dirs = ","")), frame_count: Number(icon_state_list[2].replace("	frames = ","")), frame_delay: [100]}
			if (icon_state_list.length>=4 && icon_state_list[3])
				var ilist : Array<string> = icon_state_list[3].replace("	delay = ","").split(",");
				var ilist_num : Array<number> = []
				for (var v1 in ilist)
					{ilist_num.push(Number(v1)*100);}
				tobj.frame_delay = ilist_num
			var dirlist1 = [0]; //the number to increment in the x,y coords
			var dirlist2 = [2]; //the dir number
			toexport[tobj.name] = {};
			toexport[tobj.name].dir_count = tobj.dir_count;
			toexport[tobj.name].width = width;
			toexport[tobj.name].height = height;
			if (tobj.dir_count == 1) {
				dirlist1 = [0];
				dirlist2 = [2];
				toexport[tobj.name].dirs = {2: {frames: []}};}
			else if (tobj.dir_count == 4) {
				dirlist1 = [1,0,2,3];
				dirlist2 = [1,2,4,8];
				toexport[tobj.name].dirs = {1: {frames: []}, 2: {frames: []}, 4: {frames: []}, 8: {frames: [],}};}
			else if (tobj.dir_count == 8) {
				dirlist1 = [1,0,2,6,4,3,7,5];
				dirlist2 = [1,2,4,5,6,8,9,10];
				toexport[tobj.name].dirs = {1: {frames: []}, 2: {frames: []}, 4: {frames: []}, 5: {frames: []}, 6: {frames: []}, 8: {frames: []}, 9: {frames: []}, 10: {frames: []}};}
			for (var index in dirlist2) {
				for (var frame_index = 0; frame_index < tobj.frame_count; frame_index += 1) {
					var tframe = {
						x: checkloc(icounter+dirlist1[index]+frame_index,parsedwidth,width,height)[0],
						y: checkloc(icounter+dirlist1[index]+frame_index,parsedwidth,width,height)[1],
						delay: tobj.frame_delay[frame_index]
					}
					if (!tframe.delay || tframe.delay == 0) {tframe.delay = 100}
					toexport[tobj.name].dirs[dirlist2[index]].frames.push(tframe);}
				}
			icounter += tobj.dir_count*tobj.frame_count;
			// console.log("Added object "+tobj.name)
		}

		var filene : string = file.replace(".dmi.dump.txt",".png");
		var filepng : string = filene.replace("out/","in/");
		filepng = filepng.replace("png","dmi");
		var finaltext : string = JSON.stringify(toexport, null, 2);
		finaltext = finaltext.replace(/\\"/g, "");
		fs.writeFile(`${filene}.json`, finaltext, (err: any) => {if (err) throw err;})
		fs.copyFile(filepng, `${filene}`, (err: any) => {if (err) throw err;});
		console.log("Finished converting "+file);
	}
}