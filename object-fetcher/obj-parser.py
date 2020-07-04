import sys

if len(sys.argv) == 1:
	print("Not enough args provided.")
	sys.exit()

file2edit = sys.argv[1]
component_list = {"glasses":"Glasses","belts":"Belt","shoes":"FootItem","hats":"HeadItem","masks":"MaskItem","suits":"SuitItem","uniforms":"UniformItem"}

def create_obj(objname, otype):
	component = "Structure"
	component = component_list[otype]
	CSONstring = '{}:\n'.format(objname)
	CSONstring += '	components: ["{}"]\n'.format(component)
	CSONstring += '	vars:\n'
	CSONstring += '		components:\n'
	CSONstring += '			{}:\n'.format(component)
	CSONstring += '				worn_icon: "icons/mob/worn/{}.png"\n'.format(otype)
	CSONstring += '				worn_icon_state: "{}"\n'.format(objname)
	CSONstring += '				can_adjust: false\n'
	CSONstring += '			Examine:\n'
	CSONstring += '				desc: ""\n'
	CSONstring += '		name: "{}"\n'.format(objname.replace("_"," "))
	CSONstring += '		icon: "icons/mob/under/{}.png"\n'.format(otype)
	CSONstring += '		icon_state: "{}"\n'.format(objname)
	CSONstring += '	tree_paths: ["items/clothing/{}/{}"]\n'.format(otype,objname)
	return CSONstring

if (__name__ == "__main__"):
	lines = open(file2edit).readlines()
	otype = "structure" # default object type if we can't infer it from the path
	for i in ["glasses","belts","shoes","hats","masks","suits","uniforms"]:
		if file2edit.find(i):
			otype = i
	fullstring = ""
	for line in lines:
		if line.find("state = ") != -1:
			parsedline = line.split('state = ')
			objname = parsedline[1].replace('"','').replace("\n","")
			if (objname != ""):
				fullstring += create_obj(objname,otype)
	atom_file = open("atoms/{}.atom".format(otype), "w")
	atom_file.write(fullstring)
	atom_file.close()
	sys.exit()