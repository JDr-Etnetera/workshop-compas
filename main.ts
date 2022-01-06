loops.everyInterval(1000, function () {
    serial.writeValue("C", input.compassHeading())
    radio.sendValue("c", input.compassHeading())
})
basic.forever(function () {
	
})
