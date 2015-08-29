'use strict'
var cBase = '#feefdc'
var cOutline = '#303030'
var cText = '#fff'
var csPattern = [cBase, cBase, '#ffd7be', '#6fa5d4', '#5579ad', '#fead8f']
var random = new ParkMiller

function _makeCircle(canvas, sz, anticlockwise, start, end) {
    start = start || 0
    end = end || 2 * Math.PI
    canvas.arc(sz, sz, sz - 3, start, end, anticlockwise)
}

function _makeShading(canvas, size, lightAmount) {
    canvas.beginPath()
    canvas.moveTo(-lightAmount, -lightAmount)
    canvas.lineTo(size, -lightAmount)
    canvas.lineTo(size, size)
    canvas.lineTo(-lightAmount, size)
    canvas.lineTo(-lightAmount, -lightAmount)
}

function paintGround(canvas, name, size, lightAmount) {
    var sz = 0.5 * size
    var rRing = 3 * (sz - 3)
    var makeCircle = _makeCircle.bind(null, canvas, sz)
    var makeShading = _makeShading.bind(null, canvas, size, lightAmount)
    var i, j

    /* Base */
    canvas.beginPath()
    makeCircle()
    canvas.fillStyle = cBase
    canvas.fill()

    /* Rings */
    canvas.globalCompositeOperation = 'source-atop'

    for (i = 0; i < 66; ++i) {
        var color = csPattern[0|csPattern.length * random.uniform()]
        var pos = size * random.uniform()
        var width = 10 + 16 * random.uniform()

        canvas.beginPath()
        canvas.arc(sz, pos - rRing, rRing, 0, 2 * Math.PI)
        canvas.lineWidth = width
        canvas.strokeStyle = color
        canvas.stroke()
    }

    /* Shading */
    canvas.save()
    canvas.beginPath()
    makeCircle()
    canvas.clip()
    canvas.globalCompositeOperation = 'overlay'

    /* Shading: light */
    canvas.translate(lightAmount, lightAmount)
    makeShading()
    makeCircle(true)
    canvas.fillStyle = 'rgba(255,255,255,0.5)'
    canvas.fill()

    /* Shading: dark */
    canvas.translate(-lightAmount, -lightAmount)
    makeShading()
    canvas.translate(sz, sz)
    canvas.rotate(-0.25 * Math.PI)
    canvas.save()
    canvas.scale(1, 0.618) // TODO darkAmount
    canvas.translate(-sz, -sz)
    makeCircle(true, Math.PI)
    canvas.restore()
    canvas.translate(-sz, -sz)
    makeCircle(true, 0, Math.PI)
    canvas.fillStyle = 'rgba(0,0,0,0.5)'
    canvas.fill()
    canvas.restore()

    /* Outline */
    canvas.globalCompositeOperation = 'source-over'
    canvas.beginPath()
    makeCircle()
    canvas.lineWidth = 4
    canvas.strokeStyle = cOutline
    canvas.stroke()

    /* Title */
    canvas.textAlign = 'center'
    canvas.textBaseline = 'middle'
    canvas.font = "101px'Segoe UI','Helvetica Neue',sans-serif"
    canvas.fillStyle = cOutline

    for (i = -3; i < 4; ++i)
    for (j = -3; j < 4; ++j)
    {
        canvas.fillText(name, sz + i, sz + j)
    }

    canvas.fillStyle = cText
    canvas.fillText(name, sz, sz)

    /* Ground symbol */
    canvas.translate(sz + 0.5, sz + 90.5)
    canvas.beginPath()
    canvas.moveTo(-5, 0)
    canvas.lineTo(5, 0)
    canvas.lineTo(5, 55)
    canvas.lineTo(50, 55)
    canvas.lineTo(50, 65)
    canvas.lineTo(-50, 65)
    canvas.lineTo(-50, 55)
    canvas.lineTo(-5, 55)
    canvas.closePath()
    canvas.rect(-30, 80, 60, 10)
    canvas.rect(-10, 105, 20, 10)
    canvas.fillStyle = cText
    canvas.fill()
    canvas.lineWidth = 3
    canvas.strokeStyle = cOutline
    canvas.stroke()
}


var paint = document.getElementById('paint')
var size = paint.height = paint.width = 690
var canvas = paint.getContext('2d')

random.seed(944)
paintGround(canvas, 'Ground', size, 30)
