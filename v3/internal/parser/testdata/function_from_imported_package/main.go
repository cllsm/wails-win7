package main

import (
	_ "embed"
	"github.com/cllsm/wails-win7/v3/internal/parser/testdata/variable_single_from_other_function/services"
	"log"

	"github.com/cllsm/wails-win7/v3/pkg/application"
)

// GreetService is great
type GreetService struct {
	SomeVariable int
	lowerCase    string
	target       *Person
}

type Person struct {
	Name    string
	Address *services.Address
}

// Greet does XYZ
func (*GreetService) Greet(name string) string {
	return "Hello " + name
}

// NewPerson creates a new person
func (*GreetService) NewPerson(name string) *Person {
	return &Person{Name: name}
}

func main() {
	app := application.New(application.Options{
		Bind: []interface{}{
			&GreetService{},
			services.NewOtherService(),
		},
	})

	app.NewWebviewWindow()

	err := app.Run()

	if err != nil {
		log.Fatal(err)
	}

}
