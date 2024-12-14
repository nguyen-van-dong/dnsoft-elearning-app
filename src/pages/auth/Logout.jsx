function Logout({removeToken}) {
    removeToken('token')
    window.location.href = '/login'
    return;
}

export default Logout