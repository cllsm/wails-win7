package runtime

import (
	"context"
	"github.com/cllsm/wails-win7/v2/pkg/menu"
)

func MenuSetApplicationMenu(ctx context.Context, menu *menu.Menu) {
	frontend := getFrontend(ctx)
	frontend.MenuSetApplicationMenu(menu)
}

func MenuUpdateApplicationMenu(ctx context.Context) {
	frontend := getFrontend(ctx)
	frontend.MenuUpdateApplicationMenu()
}
