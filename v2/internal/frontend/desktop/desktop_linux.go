//go:build linux
// +build linux

package desktop

import (
	"context"
	"github.com/cllsm/wails-win7/v2/internal/binding"
	"github.com/cllsm/wails-win7/v2/internal/frontend"
	"github.com/cllsm/wails-win7/v2/internal/frontend/desktop/linux"
	"github.com/cllsm/wails-win7/v2/internal/logger"
	"github.com/cllsm/wails-win7/v2/pkg/options"
)

func NewFrontend(ctx context.Context, appoptions *options.App, logger *logger.Logger, appBindings *binding.Bindings, dispatcher frontend.Dispatcher) frontend.Frontend {
	return linux.NewFrontend(ctx, appoptions, logger, appBindings, dispatcher)
}
