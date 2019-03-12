// Javascript file to help with the authoristaion of users
import {google} from 'googleapis';

const authConfig= {
    clientId: '846834439906-1e1ljtapealdn5n4re5i5kaasrfvg646.apps.googleusercontent.com',
    clientSecret: 'gV6tz8yqrAUGqJKjVrPKa9Uo',
    redirect: 'https://aaronanthonybyrne.github.io/identiphone-app/'
};

//Google oauth obejct to enable to get googles apis

function connectToGoogle(){
    return new.google.auth.OAuth2(
        authConfig.clientId,
        authConfig.clientSecret,
        authConfig.redirect
    );
}
//tell google what information I want back from the request
const defaultScope = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email'];

//open the google sign in and request the information 
function getGoogleURL(authURL){
    return auth.generateAuthUrl({
        access_type: 'online', //online is the deafult but just to be sure
        prompt: 'consent',
        scope: defaultScope
    });
}

//create the url
function createGoogleURL(){
    const authURL = connectToGoogle();
    const url = getGoogleURL(authURL);
    return url;
}