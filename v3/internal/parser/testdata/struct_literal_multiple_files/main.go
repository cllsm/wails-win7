package main

import (
	_ "embed"
	"log"

	"github.com/cllsm/wails-win7/v3/pkg/application"
)

func main() {
	app := application.New(application.Options{
		Bind: []interface{}{
			&GreetService{},
			&OtherService{},
		},
	})

	app.NewWebviewWindow()

	err := app.Run()

	if err != nil {
		log.Fatal(err)
	}

}
