package logutils

import (
	"fmt"

	"github.com/cllsm/wails-win7/v2/internal/colour"
)

func LogGreen(message string, args ...interface{}) {
	if len(message) == 0 {
		return
	}
	text := fmt.Sprintf(message, args...)
	println(colour.Green(text))
}

func LogRed(message string, args ...interface{}) {
	if len(message) == 0 {
		return
	}
	text := fmt.Sprintf(message, args...)
	println(colour.Red(text))
}

func LogDarkYellow(message string, args ...interface{}) {
	if len(message) == 0 {
		return
	}
	text := fmt.Sprintf(message, args...)
	println(colour.DarkYellow(text))
}
