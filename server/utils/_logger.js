/** server/utils/_logger.js */

const info_log = (...params) => {
    console.log(
        "\n#### info ####\n", 
        ...params, 
        "\n#### end ####\n"
    )
}

const error_log = (err, src='') => {
    console.error(
        "\n#### ERROR ####",
        "\nName: ", err.name,
        "\nCode: ", err.code,
        "\nMessage: ", err.message,
        "\nTriggered from: ", src,
        "\n#### END ####\n"
    )
}

const test_log = (...params) => {
    console.log(
        "\n#### test response ####\n", 
        ...params, 
        '\n#### end ####'
    )
}

export { info_log, error_log, test_log }