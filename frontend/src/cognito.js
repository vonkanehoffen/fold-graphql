import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from "amazon-cognito-identity-js"


const userPool = new CognitoUserPool({
  UserPoolId: 'us-east-1_RfJtclQOy', // TODO: Set environment vars in serverless.yml
  ClientId: '3h07oc3tf00rgud46ss713j40i',
})

/**
 * Sign up a new user
 *
 * @param email
 * @param password
 * @returns {Promise<any>}
 */
export function signUpUser(name, email, password) {
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'name',
      Value: name,
    }),
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
  ]
  return new Promise((resolve, reject) => {
    userPool.signUp(
      name,
      password,
      attributeList,
      null,
      (error, result) => {
        if(error) {
          reject(error)
        } else {
          resolve(result)
        }
        // const cognitoUser = result.user
        // console.log('user name is', cognitoUser.getUsername())
      }
    )
  })
}

/**
 * Confirm a new user account
 * Verification code will have been issued by email
 *
 * @param Username
 * @param verificationCode
 * @returns {Promise<any>}
 */
export function confirmUser(Username, verificationCode) {
  const cognitoUser = new CognitoUser({
    Username,
    Pool: userPool,
  })
  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(verificationCode, true, (error, result) => {
      if(error) { reject(error) } else { resolve(result) }
    })
  })
}

/**
 * Authenticate user
 * Logs in and stores tokens and info in local storage
 *
 * @param Username
 * @param Password
 * @returns {Promise<any>}
 */
export function authenticateUser(Username, Password) {
  const authenticationDetails = new AuthenticationDetails({
    Username, Password
  })
  const cognitoUser = new CognitoUser({
    Username,
    Pool: userPool,
  })
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken()
        console.log('ID token: ', idToken); // Which is enough to auth an API request.
        // Pass as `Authorization` header to eg.
        // POST https://kpylhsw11d.execute-api.us-east-1.amazonaws.com/dev/items
        const cognitoGetUser = userPool.getCurrentUser();
        if (cognitoGetUser !== null) {
          cognitoGetUser.getSession(function (error, result) {
            // This gives user ID, email etc. as well as the above JWT
            result ? resolve(result) : reject(error)
          })
        }
      },
      onFailure: (error) => {
        reject(error)
      }
    })
  })
}

/**
 * Sign Out
 * This just removes the tokens from local storage.
 */
export function signOut() {
  const user = userPool.getCurrentUser()
}

/**
 * Get Cognito User Session
 * This returns user ID, email etc. as well as the JWT required to auth requests.
 *
 */
export function getUserSession() {
  const cognitoGetUser = userPool.getCurrentUser();
  return new Promise((resolve, reject) => {
    if (cognitoGetUser !== null) {
      cognitoGetUser.getSession((error, result) => {
        result ? resolve(result) : reject(error)
      })
    } else {
      reject("No current user session")
    }
  })
}

/**
 * Perform a fetch with cognito JWT token added to request header
 * This is used by Apollo.
 *
 * @param uri
 * @param options
 * @returns {Promise<Response>}
 */
export async function authedFetch(uri, options) {
  try {
    const session = await getUserSession()
    options.headers.Authorization = session.idToken.jwtToken
  } catch(error) {
    console.error(error)
  }
  return fetch(uri, options)
}