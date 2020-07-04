import os

def getListOfFiles(dirName):
	# create a list of file and sub directories 
	# names in the given directory 
	listOfFile = os.listdir(dirName)
	allFiles = list()
	# Iterate over all the entries
	for entry in listOfFile:
		# Create full path
		fullPath = entry
		# If entry is a directory then get the list of files in this directory 
		if os.path.isdir(fullPath):
			allFiles = allFiles + getListOfFiles(fullPath)
		else:
			if fullPath.find(".dmi"):
				allFiles.append(fullPath)
				
	return allFiles

if __name__ == "__main__":
	totlist = getListOfFiles("in/")
	for unipath in totlist:
		print ("Reading {}...".format(unipath))
		os.system("npx ts-node dump.ts {}".format(unipath))
		print ("Converting {}...".format(unipath))
		os.system("npx ts-node img.ts {}".format(unipath))
		print ("{} done.".format(unipath))

