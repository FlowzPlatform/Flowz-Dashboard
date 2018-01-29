export default{
    // loginUrl : "http://ec2-54-88-11-110.compute-1.amazonaws.com/api/login",
    // ldapLoginUrl : "http://ec2-54-88-11-110.compute-1.amazonaws.com/api/ldapauth",
    loginUrl: "https://auth."+process.env.domainkey+"/api/login",
    ldapLoginUrl: "https://auth."+process.env.domainkey+"/api/ldapauth",
    // registrationUrl : "http://api."+process.env.domainkey+"/serverapi/register",
    registrationUrl : "https://auth."+process.env.domainkey+"/api/dashboardpass",
    feathersServiceBaseUrl :  "https://api."+process.env.domainkey+"/serverapi/",
    facebookSuccessCallbackUrl : "https://www.dashboard."+process.env.domainkey,
    // facebookSuccessCallbackUrl : "http://localhost:8082",
    loginWithFacebookUrl : "https://auth."+process.env.domainkey+"/auth/facebook",
    googleSuccessCallbackUrl : "https://www.dashboard."+process.env.domainkey,
    // googleSuccessCallbackUrl : "http://localhost:8082",
    loginWithGoogleUrl : "https://auth."+process.env.domainkey+"/auth/Gplus",
    getAllPermissionsUrl : "https://api."+process.env.domainkey+"/authldap/getallpermission/",
    setPermissionUrl : "https://api."+process.env.domainkey+"/authldap/setpermission",
    subscriptionUrl: "https://api."+process.env.domainkey+"/subscription/"
}
