/* Polandball Space Program
 * Copyright (c) 2015 Mark Vasilkov (https://github.com/mvasilkov)
 * License: MIT */

/* Park–Miller random number generator */

function ParkMiller() {
    this.a = 1
}

ParkMiller.prototype.seed = function seed(a) {
    if (a > 1) (this.a = a % 2147483647)
    else (this.a = 1)
    return this
}

ParkMiller.prototype.iuniform = function iuniform() {
    return (this.a = this.a * 48271 % 2147483647)
}

ParkMiller.prototype.uniform = function uniform() {
    return this.iuniform() / 2147483647
}


var iterations = 100000
var sum = 0
var prng = new ParkMiller
prng.seed(Date.now())

for (var i = 0; i < iterations; ++i) {
    sum += prng.uniform()
}

console.log(sum / iterations)
