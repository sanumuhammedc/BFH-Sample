import admin from "firebase-admin";
import express from "express";
import { join } from "path";
import { showTime } from "./showtime.js";
// Get the port number to be used for hosting defined in .env file.
const PORT = process.env.PORT || 5000;
// Read the service account credentials from downloaded file for now I just hardcoded it.
const serviceAccount = {
	"type": "service_account",
	"project_id": "bots-944",
	"private_key_id": "175422b96789a7d91f50b92cc10525bcc3b2f315",
	"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDtsAQiIcAj3HDa\nRJ+3zXvGl1tO1KYnMtfspH5PsJj0d8H0ao2XIEH5alfUXKne+vllY1KUy6TzWAe7\nSAyQaLFcMkLxAKiLAQnYK9aGwA/N7fmPxlZfhtR8+nztytH56XI1Mgy/kANeHeea\npEztLdiJVccdwd+WVjwnwmUN8REWjydCP041Xav6d+Ebp48EQjuqmX0x+kiFXlJC\n4m8bK0yw9+pNcATPyyRU+/J0f2vH0zPsH0lkE0zY6+5iu9gH2lH+fyJoXF7A6l6i\nfQJqk4slGZK1IE9giDEyA91xteY/c6ag4pqJvR6/fymEi3HlHUWsugVqmCUkFbvY\nBdATUhQZAgMBAAECggEAdZ4w5Wz7JiPLKo9j0/IYioTSl7dOAz67L+yUXr3earcq\nYNcrernpO9GeZcV3ABMEv+G+90ewuAR7SvdT1FAiWCO9EYKIZMTeSL0kuuimyXo2\nESoOCtZvJutTT96aOoeFTwKV4WOT7wpwVgtwz7tsmEU8s6KBEGVa/jfJhvUgRh8b\nmHdm7jSWJ6wKuAOor5aS8wi5xjXRglB/nRZVMZn6RHcRMCpC7IzaAvDJEqgqdbqg\nvxH80cvYfK4oihHoy77Bw1BoiS0KJeMkdo3OmXp+GPJP46U0Zr6UP6pk9rNHeyFE\n00nNZqiygyrBia4zYgZIIoc6P2prfrlo4llR2QReiwKBgQD7yuOlwAQaffrqSHaf\nEIdKx/scef0utBDNaykpKjGCWH8kXFRWTE/o4YZyvNeRAZPaP87ExpaO0lD0ZZ1/\nlPB9ncChzrNfNWPWGLBHxt6zOBo0Gt4vjYWqzwR4jTN1mJnEC2zhlm9wfMxSNLiF\nHOY8rzIE8oOMmxBYdE2dELamGwKBgQDxqMn/mefsHO2bDBYzDSh3mZuEj597iLAJ\nwQB4Gl6XZDwetbMjr8+QsKAvPZN81sbBwFfcMdeU+lJL6awsrjMLaLQlmInj37Xs\ny8IaUGcCjIEgD2/ncHCpzeT28myk0ZUOMFHJ0t74AGeBQw/MKL87ydoDJ+DKHXX5\nBsCp74Gh2wKBgQDJiBfzZ6AhMCpv8LX5FLqk8TGdFkq+YeN890OHrjzYTkrdaIUc\nWZIwHKqHFX0YlAGqUx4FQ8nn4JBpPRf1sNlYQbaYDCBnmQ0ipLobiSJgogvfHo4t\n04FkOLQkZSgF/LE+R8LLQKRLjafgOFBkQsBJXBSV/yGpncdUdSpWB7WZdwKBgFHe\n6EiDINKaXllH+AFltM8IKGr5qYNVpKY5T+pgrKlHmSKiVkWB26VeYXZ/uwbxULb1\nbg64iBv9zoHPcbhVcA+uclHGYvjjoqPNyD3X/X4ckeaFtFjJfDHbAnYzXWFda805\ny4u/uDB3GpntWV3GdDtSQF0PVpXC82PhyMYJ0XY/AoGAQG90T1d6ysiNn2LpbWmp\njfPNdTXIX5Nos9oLCpB/ikzLpk1xj2fsWmlOIK3cp5R06AWKPBA+2+2vKLIalwIP\n86jwfBEhITnUKY0ywIqdRdGE20SQmfCN+5r2FzolcvdhwZBJ+mx3UC09Dzpt1CF0\nYTRymtFAtUqydG1TqeTDhMk=\n-----END PRIVATE KEY-----\n",
	"client_email": "firebase-adminsdk-k8wbw@bots-944.iam.gserviceaccount.com",
	"client_id": "113221541939995533920",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k8wbw%40bots-944.iam.gserviceaccount.com"
};
//console.log(serviceAccount);
// Login to firebase server. 
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://bots-944.firebaseio.com"
});

// Exports the loggin instance so we can use it in other files.
export const app = admin;


// Use express to create static hosting.
express() // Set ./public as static folder.
	.use(express.static(join(process.cwd(), "public")))
	.get("/time", showTime) // Add a new route that just displays the time.
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));
