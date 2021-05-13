/*
    The function that handles /time route of our app.
    @param _req holds the http request from the client (browser).
    @param res An object that holds the functions to send response back. 
    @returns undefined
*/
export function showTime(_req, res)
{
	// Use res.end to end https conection by sending a string as result.
	res.end(new Date().toString()); // Here we get the current time and convert it to string.
}
