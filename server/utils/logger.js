const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log("\n#### info ####\n", ...params, "\n#### end ####")
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
        console.error("\n#### error ####\n", ...params, "\n#### end ####")
    }
}

const test_log = (...params) => {
    console.log("\n#### test response ####\n", ...params, '\n#### end ####')
}

export { info, error, test_log }