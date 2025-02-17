function Logout({removeToken}) {
    removeToken('token')
    window.location.href = '/login'
}

export default Logout