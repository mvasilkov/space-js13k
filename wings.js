/* Polandball Space Program
 * Copyright (c) 2015 Mark Vasilkov (https://github.com/mvasilkov)
 * License: MIT */

/* Based on 'Animated wings' snippet by Colin van Eenige */

var css = ''

for (var i = 0; i < 2; ++i) {
    var wing = document.createElement('div')
    wing.className = 'wing'
    document.body.appendChild(wing)

    for (var j = 0; j < 20; ++j) {
        var feather = document.createElement('div')
        feather.className = 'feather'
        wing.appendChild(feather)

        css += '.feather:nth-of-type(' + (j + 1) + '){'
        css += 'height:' + (5 * j + 100) + 'px;'
        css += 'margin-top:' + (-2 * j) + 'px;'
        css += '-webkit-transform:rotate(' + (5 * j) + 'grad);'
        css += '}'
    }
}

var style = document.createElement('style')
style.appendChild(document.createTextNode(css))
document.head.appendChild(style)
