const AttachCookie = ({ res, token }) => {

    res.cookie('authorize', token, {
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
    })
}
const sendMail = async () => {

}

module.exports = { AttachCookie, sendMail }