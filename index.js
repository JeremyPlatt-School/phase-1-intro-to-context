const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (employeeRecords => {
    const result = []
    for (const employee of employeeRecords) {
        result.push(createEmployeeRecord(employee));
    }
    return result
})


const createTimeInEvent = (record, timeStamp) => {
    const timeObj = {
        type: "TimeIn",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeInEvents.push(timeObj)
    return record
}

const createTimeOutEvent = (record, timeStamp) => {
    const timeObj = {
        type: "TimeOut",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeInEvents.push(timeObj)
    return record
}

const hoursWorkedOnDate = (record, date) => {
    return (record.timeOutEvents[0].hour - record.timeInEvents[0].hour);
}

const wagesEarnedOnDate = (record, date) => {
    let pay = 0
    const hours = hoursWorkedOnDate(record, date)
    pay += hours * record.payPerHour
    return pay
}

const allWagesFor = (record) => {
    let pay;

    for (let event of record.timeInEvents) {
        pay += wagesEarnedOnDate(record, event.date)
    }
    return pay
}
