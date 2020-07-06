var/locallink = "http://civ13.com"
var/localhtmlfile = "<!DOCTYPE html><HTML><HEAD><TITLE>Browser</TITLE><META http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"></HEAD> \
<BODY><iframe src=\"[locallink]\"  style=\"position: absolute; height: 98%; width: 99%; border: none\"></iframe></BODY></HTML>"

proc/update_localhtmlfile()
	localhtmlfile = "<!DOCTYPE html><HTML><HEAD><TITLE>Browser</TITLE><META http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"></HEAD> \
<BODY><iframe src=\"[locallink]\"  style=\"position: absolute; height: 98%; width: 99%; border: none\"></iframe></BODY></HTML>"

//Please use mob or src (not usr) in these procs. This way they can be called in the same fashion as procs.
/client/verb/website()
	set name = "website"
	set desc = "Visit the website"
	set hidden = 1

	locallink = website
	src << browse(localhtmlfile, "window=website;border=1;can_close=1;can_resize=1;can_minimize=1;titlebar=1;size=900x450")
	return

/client/verb/wiki()
	set name = "wiki"
	set desc = "Visit the wiki"
	set hidden = 1

	locallink = wiki
	update_localhtmlfile()
	src << browse(localhtmlfile, "window=wiki;border=1;can_close=1;can_resize=1;can_minimize=1;titlebar=1;size=800x450")
	return

/client/verb/donate()
	set name = "donate"
	set desc = "Support the server via patreon."
	set hidden = 1

	locallink = donate
	update_localhtmlfile()
	src << browse(localhtmlfile, "window=donate;border=1;can_close=1;can_resize=1;can_minimize=1;titlebar=1;size=900x450")
	return

/client/verb/github()
	set name = "Github"
	set desc = "Visit the Github"
	set hidden = 1

	locallink = github
	update_localhtmlfile()
	src << browse(localhtmlfile, "window=github;border=1;can_close=1;can_resize=1;can_minimize=1;titlebar=1;size=800x450")

	return

/client/verb/discord()
	set name = "discord"
	set desc = "Visit the discord"
	set hidden = 1

	locallink = discord
	update_localhtmlfile()
	src << browse(localhtmlfile, "window=discord;border=1;can_close=1;can_resize=1;can_minimize=1;titlebar=1;size=800x450")
	return

/client/verb/rules()
	set name = "Rules"
	set desc = "Show Server Rules"
	set hidden = 1

	locallink = rules
	update_localhtmlfile()
	src << browse(localhtmlfile, "window=rules;border=1;can_close=1;can_resize=1;can_minimize=1;titlebar=1;size=800x450")
	return

client/verb/updateFullscreen()
	set name = "updateFullscreen"
	set hidden = 1
	if (!fullscreen)
		winset(src, "mainwindow", "is-maximized=false;can-resize=false;titlebar=false;menu=")
		winset(src, "mainwindow", "is-maximized=true")
		fullscreen = 1
		return
	else
		winset(src, "mainwindow", "can-resize=true;titlebar=true;menu=menu")
		fullscreen = 0
		return