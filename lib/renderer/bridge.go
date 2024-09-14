package renderer

import (
	bridge "github.com/cllsm/wails-win7/lib/renderer/bridge"
)

// NewBridge returns a new Bridge struct
func NewBridge() *bridge.Bridge {
	return &bridge.Bridge{}
}
