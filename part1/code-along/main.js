// "use strict";

console.log(this, module.export);

function func() {
    console.log(this == global);
}

func()
// const arto = {
//     name: 'Arto Hellas',
//     age: 35,
//     education: 'PhD',
//     greet() {
//         console.log('hello my name is ' + this.name)
//     },
//     doAddition: function(a, b) { console.log(a + b) },
// }

// const name="arto";
// arto.greet()       // "hello, my name is Arto Hellas" gets printed

// const referenceToGreet = arto.greet
// referenceToGreet() // prints "hello, my name is undefined"
