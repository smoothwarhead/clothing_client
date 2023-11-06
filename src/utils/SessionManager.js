const SessionManager = {

    getToken(){
        const token = sessionStorage.getItem('token');
        if (token) return token;
        else return null;
    },

    getUser(){
        const user = sessionStorage.getItem('userId');
        if (user) return user;
        else return null;
    },

    getRole(){
        const user = sessionStorage.getItem('role');
        if (user) return user;
        else return null;
    },

    getAuth(){
        const logIn = sessionStorage.getItem('logIn');
        if (logIn) return logIn;
        else return null;
    },

    getUserName(){
        const userName = sessionStorage.getItem('userName');
        if (userName) return userName;
        else return null;
    },

    setUserSession(token, userId, isAuth, role, userName){
        // sessionStorage.setItem('firstName', firstName);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('logIn', isAuth);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('userName', userName);
       
    },

    removeUserSession(){
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('logIn');
        sessionStorage.removeItem('userName');
    }





}

export default SessionManager;