/* Your Code Here */
function createEmployeeRecord(arr) {

    let employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    };

    return employeeRecord;
}

function createEmployeeRecords(arr) {

    let employeeRecords = [];

    arr.forEach(element => employeeRecords.push(createEmployeeRecord(element)))

    return employeeRecords;
}

function createTimeInEvent(timeStamp) {

    let [date, time] = timeStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })

    return this;
}

function createTimeOutEvent(timeStamp) {

    let [date, time] = timeStamp.split(" ");

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })
    
    return this;

}

function hoursWorkedOnDate(formDate) {

    let timeIn = this.timeInEvents.find(obj => obj.date === formDate);

    let timeOut = this.timeOutEvents.find(obj => obj.date === formDate);

    let hoursWorked = (timeOut.hour - timeIn.hour) * 0.01;

    return hoursWorked;
}

function wagesEarnedOnDate(formDate) {

    let wage = hoursWorkedOnDate.call(this, formDate) * this.payPerHour;

    return wage;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArr, firstName) {
    
    let foundEmployee = srcArr.find(record => record.firstName === firstName);

    return foundEmployee;
}

function calculatePayroll(recordsArr) {
    console.log(recordsArr);
    
    return recordsArr.reduce((previous, current) => previous + allWagesFor.call( current), 0)

}