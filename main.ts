input.onButtonPressed(Button.A, function () {
    RingbitCar.freestyle(-10, 10)
})
input.onButtonPressed(Button.B, function () {
    RingbitCar.freestyle(0, 0)
})
radio.onReceivedValue(function (name, value) {
    if (name == "A") {
        RingbitCar.freestyle(-10, 10)
    } else if (name == "B") {
        RingbitCar.brake()
    }
})
let deltaC = 0
radio.setGroup(61)
RingbitCar.init_wheel(AnalogPin.P1, AnalogPin.P2)
let lastCs = 0
let CsCount = 0
loops.everyInterval(1000, function () {
    deltaC = lastCs / CsCount
    serial.writeValue("D", deltaC)
    radio.sendValue("D", deltaC)
    CsCount = 0
    lastCs = 0
})
loops.everyInterval(50, function () {
    CsCount += 1
    lastCs += input.compassHeading()
    radio.sendValue("C", input.compassHeading())
})
