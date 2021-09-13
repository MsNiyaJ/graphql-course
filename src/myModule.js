// Named export - Has a name. Have as many as needed
// Default export - Has no name. You can only have one

const message = "Some message from myModule.js"
const name = 'Shaniya Malcolm'
const location = 'New York'     //This is the default export
const getGreeting = (name) => {
    return `Welcome to the course ${name}`;
}

export { message, name, getGreeting, location as default }