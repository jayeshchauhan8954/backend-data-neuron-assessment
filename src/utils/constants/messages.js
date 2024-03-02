module.exports = {
    _response_message: {
        emailSend: (key) => `${key || 'Query'} mail sent successfully.`,
        notFound: (key) => `${key || "record"} not found.`,
        found: (key) => `${key || "record"} found successfully.`,
        updated: (key) => `${key || "record"} updated successfully.`,
        created: (key) => `${key || "record"} created successfully.`,
        alreadyExist: (key) => `${key || "record"} already exist.`,
    }
}