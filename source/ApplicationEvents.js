//* @protected
enyo.requiresWindow(function() {
	if (window.PalmSystem) {
		Mojo = window.Mojo || {};
		
		// LunaSysMgr calls this when the windows is maximized or opened.
		Mojo.stageActivated = function() {
			enyo.Signals.send("onactivate");
		};

		// LunaSysMgr calls this when the windows is minimized or closed.
		Mojo.stageDeactivated = function() {
			enyo.Signals.send("ondeactivate");
		};

		// LunaSysMgr calls this whenever an app is "launched;" 
		Mojo.relaunch = function() {
			var param = enyo.json.parse(PalmSystem.launchParams || "{}") || {};
			if(param["palm-command"] == "open-app-menu") {
				enyo.Signals.send("onmenubutton");
			} else {
				enyo.Signals.send("onrelaunch", param);
			}
			// Need to return true to tell sysmgr the relaunch succeeded.
			// otherwise, it'll try to focus the app, which will focus the first
			// opened window of an app with multiple windows.
			return true;
		};
	}
});
