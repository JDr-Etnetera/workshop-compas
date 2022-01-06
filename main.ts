/**
 * radio.onReceivedValue(function (name, value) {
 * 
 * if (name == "A") {
 * 
 * RingbitCar.freestyle(-10, 10)
 * 
 * } else if (name == "B") {
 * 
 * RingbitCar.brake()
 * 
 * }
 * 
 * })
 */
bluetooth.onBluetoothConnected(function () {
    basic.showLeds(`
        . . # # .
        # . # . #
        . # # # .
        # . # . #
        . . # # .
        `)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.A, function () {
    RingbitCar.freestyle(-10, 10)
})
input.onButtonPressed(Button.B, function () {
    RingbitCar.freestyle(0, 0)
})
let CsCount = 0
let lastCs = 0
let deltaC = 0
// radio.setGroup(61)
RingbitCar.init_wheel(AnalogPin.P1, AnalogPin.P2)
loops.everyInterval(1000, function () {
    deltaC = lastCs / CsCount
    serial.writeValue("D", deltaC)
    bluetooth.uartWriteValue("D", deltaC)
    CsCount = 0
    lastCs = 0
})
loops.everyInterval(100, function () {
    CsCount += 1
    lastCs += input.compassHeading()
    bluetooth.uartWriteValue("C", input.compassHeading())
})
