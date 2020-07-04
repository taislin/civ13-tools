import os
import sys
import shutil

icon_list = ["/icons/obj/clothing/glasses.dmi","/icons/obj/clothing/belts.dmi","/icons/obj/clothing/gloves.dmi","/icons/obj/clothing/shoes.dmi","/icons/obj/clothing/hats.dmi","/icons/obj/clothing/masks.dmi","/icons/obj/clothing/suits.dmi","/icons/obj/clothing/uniforms.dmi"]
worn_list = ["/icons/mob/eyes.dmi","/icons/mob/back.dmi","/icons/mob/belt.dmi","/icons/mob/hands.dmi","/icons/mob/feet.dmi","/icons/mob/head.dmi","/icons/mob/mask.dmi","/icons/mob/suit.dmi","/icons/mob/uniform.dmi"]
path1 = ''
path2 = ''

if (__name__ == "__main__"):
	masterdir = os.path.normpath(os.getcwd() + os.sep + os.pardir).replace("\\","/")
	dmi2pngdir = masterdir+"/dmi2png-ts/"
	currdir = os.getcwd()

	file = open("{}/config.txt".format(masterdir), 'r')
	lines = file.readlines()
	path1 = lines[1].replace("\\","/").replace("\n","") # civ folder
	path2 = lines[3].replace("\\","/").replace("\n","") # typespess folder
	file.close()

	if path1 == '' or path2 == '':
		print("Error! No configs found.")
		sys.exit()
	print ("Copying DMIs:")
	print("	icons...")
	for icl in icon_list:
		unipath = path1+icl
		shutil.copy(unipath, dmi2pngdir+"in/")
	print("	worn icons...")
	for wrl in worn_list:
		unipath = path1+wrl
		shutil.copy(unipath, dmi2pngdir+"in/")

	print ("Converting DMIs...")
	os.chdir(dmi2pngdir)
	os.system("python convert.py")

	new_icon_list = []
	for topng in icon_list:
		topng = topng.replace(".dmi",".dmi.dump.txt")
		topng = topng.replace("/icons/obj/clothing/","{}out/".format(dmi2pngdir))
		new_icon_list.append(topng)

	os.chdir(currdir)
	print("Objects:")
	for file2object in new_icon_list:
		unipath = file2object
		print ("	creating objects from {}...".format(unipath))
		os.system("python obj-parser.py {}".format(unipath))
		
	print("All done. The icon files (.png and .json) are in {} and the object .atom files are in {}.".format(dmi2pngdir+"in",currdir+"/atoms"))