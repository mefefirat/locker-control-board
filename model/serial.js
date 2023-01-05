const SerialPort = require('serialport');

const comPort = "COM3";

const port = new SerialPort(comPort, {
    baudRate: 19200
});

const Serial = {}

Serial.unlockCase = (id, case_address) => {
    return new Promise((resolve, reject) => {


        let STX = 0x02;
        let ADR = +("0x" + case_address); //0x00;
        let CMD = 0x31;
        let ETX = 0x03;

        let SUM = STX + ADR + CMD + ETX;

        let address = [STX, ADR, CMD, ETX, SUM];
        //let address = [0x02, 0x00, 0x31, 0x03, 0x36];
        port.write(address, function(error) {
            if (error) {
                reject(error.message);
            }
            resolve({status: "success"});
        });



    });
};


Serial.checkCases = (module_address) => {
    return new Promise((resolve, reject) => {

        /* all cu lock status */
        /*
        let STX = 0x02;
        let ADR = 0xF0;
        let CMD = 0x32;
        let ETX = 0x03;

        /*single cu lock status */
        let STX = 0x02;
        let ADR = +("0x" + module_address); //0x00;
        let CMD = 0x30;
        let ETX = 0x03;

        let SUM = STX + ADR + CMD + ETX;

        let address = [STX, ADR, CMD, ETX, SUM];

        port.write(address, function(error) {
            if (error) {
                reject(error)
            }
        });

        port.once("data", async function (data) {
            console.log(data);
            resolve({cases: data});
        });

    })
};

module.exports = Serial;