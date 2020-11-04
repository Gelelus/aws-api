const getHeaders = () => {
    return {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "https://d1mv4b218fitsr.cloudfront.net",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }
};

const generateErrorResponse = (e, statusCode) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(
            { err: e.message }
        ),
        headers: getHeaders(),
    }
};

export {
    getHeaders,
    generateErrorResponse
}