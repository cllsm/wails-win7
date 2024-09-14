//go:build (linux || darwin) && !bindings

package app

import (
	"github.com/cllsm/wails-win7/v2/internal/logger"
	"github.com/cllsm/wails-win7/v2/pkg/options"
)

func PreflightChecks(_ *options.App, _ *logger.Logger) error {
	return nil
}
