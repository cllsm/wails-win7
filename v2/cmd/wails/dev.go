package main

import (
	"github.com/pterm/pterm"
	"github.com/cllsm/wails-win7/v2/cmd/wails/flags"
	"github.com/cllsm/wails-win7/v2/cmd/wails/internal/dev"
	"github.com/cllsm/wails-win7/v2/internal/colour"
	"github.com/cllsm/wails-win7/v2/pkg/clilogger"
	"os"
)

func devApplication(f *flags.Dev) error {

	if f.NoColour {
		pterm.DisableColor()
		colour.ColourEnabled = false
	}

	quiet := f.Verbosity == flags.Quiet

	// Create logger
	logger := clilogger.New(os.Stdout)
	logger.Mute(quiet)

	if quiet {
		pterm.DisableOutput()
	} else {
		app.PrintBanner()
	}

	err := f.Process()
	if err != nil {
		return err
	}

	return dev.Application(f, logger)

}
