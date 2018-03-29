
//let frontEndUrl = 'http://localhost:8083';
let frontEndUrl = 'https://dashboard.'+process.env.domainkey;

export default{
    // loginUrl : "http://ec2-54-88-11-110.compute-1.amazonaws.com/api/login",
    // ldapLoginUrl : "http://ec2-54-88-11-110.compute-1.amazonaws.com/api/ldapauth",
    loginUrl: "https://api."+process.env.domainkey+"/auth/api/login",
    ldapLoginUrl: "https://auth."+process.env.domainkey+"/api/ldapauth",
    // registrationUrl : "http://api."+process.env.domainkey+"/serverapi/register",
    registrationUrl : "https://auth."+process.env.domainkey+"/api/dashboardpass",
    feathersServiceBaseUrl :  "https://api."+process.env.domainkey+"/serverapi/",
    signupUrl : "https://api."+process.env.domainkey+"/auth/api/setup",


    facebookSuccessCallbackUrl: frontEndUrl,
    googleSuccessCallbackUrl: frontEndUrl,
    twitterSuccessCallbackUrl: frontEndUrl,
    githubSuccessCallbackUrl: frontEndUrl,
    linkedInSuccessCallbackUrl: frontEndUrl,




        loginWithFacebookUrl : 'https://auth.'+process.env.domainkey+'/auth/facebook',
        loginWithGoogleUrl : 'https://auth.'+process.env.domainkey+'/auth/google',
        loginWithTwitterUrl : 'https://auth.'+process.env.domainkey+'/auth/twitter',
        loginWithGithubUrl : 'https://auth.'+process.env.domainkey+'/auth/github',
        loginWithLinkedInUrl : 'https://auth.'+process.env.domainkey+'/auth/linkedin',


    userDetail:             "https://api."+process.env.domainkey+"/auth/api/userdetails",
    varifyEmailUrl :         "https://api."+process.env.domainkey+"/auth/api/verifyemail",
    forgotPasswordUrl :         "https://api."+process.env.domainkey+"/auth/api/forgetpassword",
    resetPasswordRedirectUrl :          "https://dashboard."+process.env.domainkey+"/reset-password",
    resetPasswordUrl :           "https://api."+process.env.domainkey+"/auth/api/resetpassword",

    getAllPermissionsUrl : "https://api."+process.env.domainkey+"/authldap/getallpermission/",
    setPermissionUrl : "https://api."+process.env.domainkey+"/authldap/setpermission",
    // getAllPermissionsUrl : "https://172.16.160.32:8000/authldap/getallpermission/",
    // setPermissionUrl : "https://172.16.160.32:8000/authldap/setpermission",
    subscriptionUrl: "https://api."+process.env.domainkey+"/subscription/"
}
