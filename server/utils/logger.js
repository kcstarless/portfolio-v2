const info = (...params) => {
    console.log(
        "\n#### info ####\n", 
        ...params, 
        "\n#### end ####\n"
    )
}

const error = (err) => {
    console.error(
        "\n#### ERROR ####",
        "\nName: ", err.name,
        "\nCode: ", err.code,
        "\nMessage: ", err.message,
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

export { info, error, test_log }