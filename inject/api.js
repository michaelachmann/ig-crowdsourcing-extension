// Init your Web SDK
const sdk = new Appwrite();

sdk
    .setEndpoint('http://api.digitalhumanities.io/v1') // Your Appwrite Endpoint
    .setProject('61f913c8612abf254673') // Your project ID
;

console.log(sdk)
console.log("Hello from api.js")

// Register User
appwrite
    .account.create('unique()', 'me@example.com', 'password', 'Jane Doe')
        .then(response => {
            console.log(response);
        }, error => {
            console.log(error);
        });