const ecnryptId = (id) => {
    const random = Buffer.from(id).toString("base64")
    return random
}

const decryptId = (random) => {
    const id = Buffer.from(random, "base64").toString('utf-8')
    return id
}

module.exports = { ecnryptId, decryptId }