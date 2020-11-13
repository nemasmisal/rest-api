module.exports = function (req, res, next) {
    const msg = [
        "------------------------",
        "USER API POSSIBLE ROUTES",
        "/api/user/register should be send as a POST request including the user credentials as an JSON object => { 'username': 'myUserName', 'password': 'myPassword' }",
        "----------------------",
        "COURSE POSSIBLE ROUTES",
        "/api/course/create which required POST request with JSON object => { 'userId': 'myUserId', 'title': 'my course title name' }",
        "/api/course/edit/courseId wich required POST request with JSON object => { 'userId': 'myUserId', 'title': 'my EDITED course title name' }",
        "/api/course/remove/courseId which required DELETE request with JSON object => { 'userId': 'myUserId' }",
        "/api/course/all which required GET request with no credentials",
        "/api/course/courseId which required GET request with no credentials"

    ]

    res.status(404).send(msg)
}