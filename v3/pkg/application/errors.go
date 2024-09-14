package application

import (
	"fmt"
	"os"
)

func Fatal(message string, args ...interface{}) {
	println("*********************** FATAL ***********************")
	println("There has been a catastrophic failure in your application.")
	println("Please report this error at https://github.com/cllsm/wails-win7/issues")
	println("******************** Error Details ******************")
	println(fmt.Sprintf(message, args...))
	println("*********************** FATAL ***********************")
	os.Exit(1)
}
