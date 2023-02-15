const create = (req, res) => {

    console.log(req.body)
    return res.json("Create User")
}

module.exports = { create } 