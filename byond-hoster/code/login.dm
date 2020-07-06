var/htmlfile = "<!DOCTYPE html><HTML><HEAD><TITLE>Game Window</TITLE><META http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"></HEAD> \
<BODY>test<iframe style=\"background: #000000\";src=\"[server]\"  style=\"position: absolute; height: 98%; width: 99%; border: none\"></iframe></BODY></HTML>"

proc/update_htmlfile()
	htmlfile = "<!DOCTYPE html><HTML><HEAD><TITLE>Game Window</TITLE><META http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"></HEAD> \
<BODY><iframe src=\"[server]\"  style=\"position: absolute; height: 98%; width: 99%; border: none\"></iframe></BODY></HTML>"

/client
	var/fullscreen = 0

/client/New()
	..()
	update_htmlfile()
	src << browse(htmlfile,"window=mainwindow")