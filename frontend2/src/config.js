const config = {
  gqlEndpoint: 'https://yub0gbdptg.execute-api.us-east-1.amazonaws.com/dev/graphql',
  // gqlEndpoint: 'http://localhost:3001/graphql',

  // AWS Amplify / Cognito.
  Auth: {
    identityPoolID: 'us-east-1:0bfc4202-3ee7-4601-9b1c-e9bed31808a8',
    region: 'us-east-1',
    userPoolId: 'us-east-1_qayWwJ35i',
    userPoolWebClientId: '62t05ai42nmqq3r1s62kht48ik',
    mandatorySignIn: true,
  },
  // API: {
  //   endpoints: [
  //     {
  //       name: 'graphQL',
  //       endpoint: 'https://yub0gbdptg.execute-api.us-east-1.amazonaws.com/dev/graphql'
  //     }
  //   ]
  // }

}

export default config
