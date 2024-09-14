package options

import (
	"github.com/cllsm/wails-win7/v2/pkg/menu"
)

// SystemTray contains options for the system tray
type SystemTray struct {
	LightModeIcon      *SystemTrayIcon
	DarkModeIcon       *SystemTrayIcon
	Title              string
	Tooltip            string
	StartHidden        bool
	Menu               *menu.Menu
	OnLeftClick        func()
	OnRightClick       func()
	OnLeftDoubleClick  func()
	OnRightDoubleClick func()
	OnMenuClose        func()
	OnMenuOpen         func()
}

// SystemTrayIcon represents a system tray icon
type SystemTrayIcon struct {
	Data []byte
}
