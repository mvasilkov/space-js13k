/* Polandball Space Program
 * Copyright (c) 2015 Mark Vasilkov (https://github.com/mvasilkov)
 * License: MIT */

/* Based on 'Imperfect circles' method by Dan Gries */

function makePoints(number) {
    var points = {
        head: {
            x: 0,
            y: 1,
            next: {
                x: 1,
                y: 1
            }
        }
    }
    var ymin = 1, ymax = 1
    var point, next

    for (var unused = 0; unused < number; ++unused) {
        point = points.head
        while (next = point.next) {
            var x = (point.x + next.x) * 0.5
            var y = (point.y + next.y) * 0.5
            + (next.x - x) * (2 * Math.random() - 1)

            if (y < ymin)
                ymin = y
            else if (y > ymax)
                ymax = y

            var middle = {
                x: x,
                y: y,
                next: next
            }
            point.next = middle

            point = next
        }
    }

    if (ymin == ymax) {
        point = points.head
        while (point) {
            point.y = 1
            point = point.next
        }
    }
    else {
        var normalize = 1 / (ymax - ymin)

        point = points.head
        while (point) {
            point.y = normalize * (point.y - ymin)
            point = point.next
        }
    }

    return points
}

function paintCircle(canvas, x, y, r1, r2, rotation) {
    var points = makePoints(6)
    var point = points.head

    while (point) {
        var a = 2 * Math.PI * point.x + rotation
        var r = r1 + point.y * (r2 - r1)

        canvas.lineTo(
            x + r * Math.cos(a),
            y + r * Math.sin(a)
        )

        point = point.next
    }
}


var paint = document.getElementById('paint')
var size = paint.height = paint.width = 500
var canvas = paint.getContext('2d')

canvas.lineWidth = 5
canvas.strokeStyle = '#101010'

canvas.beginPath()
paintCircle(canvas, 250, 250, 100, 120, 0)
canvas.stroke()
