const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.error(...params)
    }
}

const test_log = (...params) => {
    console.log("\n#### test response ####\n", ...params, '\n#### response end ####\n')
}

export { info, error, test_log }