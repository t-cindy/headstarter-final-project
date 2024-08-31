// Define a TypeScript interface for the JWT payload to ensure type safety
interface JwtPayload {
  email?: string; // Marking as optional since not all JWTs must contain an email
}

// Define an interface for the response expected from Google's sign-in process
interface GoogleSignInResponse {
  credential?: string;
}

// The callback function with explicit type for the response parameter
function JSCallback(response: GoogleSignInResponse): void {
  if (response.credential) {
      // Decode the JWT to extract user information
      const payload = decodeJwt(response.credential);

      // Check if the payload contains an email and retrieve it
      if (payload && payload.email) {
          const email = payload.email;
          // Extract the username by splitting the email at the '@' character and taking the first part
          const username = email.substring(0, email.indexOf('@'));

          // Log both the email and username
          console.log('Email:', email);
          console.log('Username:', username);

          // Display or process the email and username as required by your application
          // Uncomment and modify if you intend to display the email and username in HTML elements
          // document.getElementById('emailDisplay').innerText = email;
          // document.getElementById('usernameDisplay').innerText = username;
      } else {
          console.log('No email found in payload.');
      }
  } else {
      console.error('No user data available.');
  }
}

// Helper function to decode the JWT received from Google with the type for the token parameter
function decodeJwt(token: string): JwtPayload {
  try {
      // Split the JWT into parts and base64 decode the payload part
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c: string) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload) as JwtPayload;
  } catch (e) {
      console.error('Error decoding JWT', e);
      return {};
  }
}
