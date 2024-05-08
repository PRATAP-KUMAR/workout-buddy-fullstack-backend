const test = async (req, res) => {
    res.status(200).json({ message: 'db connected' })
}

module.exports = { test };