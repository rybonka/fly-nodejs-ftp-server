const FtpSrv = require('ftp-srv');
const express = require('express');
const path = require('path');

const port = 21;
const ftpServer = new FtpSrv({
    url: "ftp://0.0.0.0:" + port, //0.0.0.0 listens on ALL available hosts for server and passive connections.
    pasv_url: "ftp://213.188.xxx.xxx", // set the FTP passive connection IPv4 address. Run "fly info" command and replace 213.188.xxx.xxx with the new IPv4 address.
    pasv_min: 21000, // starting port for passive connections
    pasv_max: 21005, // ending port for passive connections
    anonymous: false
});

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
    if (username === 'user' && password === 'test') { // change username and password
        const userRoot = path.join(__dirname, 'ftp_folder'); // set the user's home directory or desired starting directory
        return resolve({ root: userRoot });
    }
    return reject(new Error('Invalid username or password'));
});

ftpServer.listen().then(() => {
    console.log('FTP server is started');
});

// simple HTTP message in browser
const app = express();
app.get('/', (req, res) => {
    res.send('Hello from FTP server on Fly!');
});
app.listen(8080);