# fly-nodejs-ftp-server
* Fly NodeJS FTP Server
  
A simple FTP server on node JS for [Fly.io](https://fly.io) (based on [ftp-srv](https://www.npmjs.com/package/ftp-srv) npm package).

## Getting started
1. Install [flyctl](https://fly.io/docs/hands-on/install-flyctl/).
2. Install [NodeJS](https://nodejs.org/en/download/current) into your PC.
3. Install [Visual Studio Code](https://code.visualstudio.com/download) application into your PC.
4. In the VS Code application, select "Clone Git Repository", insert git url, and open the folder with clonned code.
    ```javascript
    https://github.com/rybonka/fly-nodejs-ftp-server.git
    ```
5. In the VS Code terminal, install the required Node.js modules and dependencies:

    ```javascript
    npm install express ftp-srv path && npm install uuid@latest
    ```

## Customise

### **fly.toml**

1. Edit the `name` in the `fly.toml` to one of your choice:

    ```toml
    app = "fly-nodejs-ftp-server"
    ```

2. Edit the `primary_region` and set the value of the closest [fly.io region](https://fly.io/docs/reference/regions/) to you:

    ```toml
    primary_region = "waw"
    ```

3. The `[env]` block has an `ADDRESS` value. Run the `fly info` command to get _your_ app's IPv4 address, and replace `213.188.xxx.xxx` with _your_ app's IPv4 address:

    ```toml
    ADDRESS = "213.188.xxx.xxx"
    ```

   Leave other configurations as they are until you understand what they mean and the effect of changing them.

### **server.js**

1. Edit the `pasv_url` in the `server.js`. Run `fly info` command to get _your_ app's IPv4 address, and replace `213.188.xxx.xxx` with _your_ app's IPv4 address:

    ```javascript
    pasv_url: "ftp://213.188.xxx.xxx"
    ```
2. Edit the `username` and `password` in the `server.js` with desired login credentials to your FTP folder.

    ```javascript
    username === 'user' && password === 'test'
    ```
This is a basic FTP server setup. Feel free to customize it according to your needs and requirements.

## Deploy
1. Run `flyctl launch --ha=false` in the VS code terminal.
    1. On the question "Would you like to copy its configuration to the new app? (y/N)", select yes.
    2. On the question "Do you want to tweak these settings before proceeding? (y/N)", select yes.
    3. In the opened "Fly Launch" window, check your app launch configurations, and set: `Port = 8080`, `VM Sizes = shared-cpu-1x`, `VM Memory = 256MB`, click     "Confirm Settings".
    4. On the question "Create .dockerignore from 1 .gitignore files? (y/N)", select no.
        ```
        $ flyctl launch --ha=false
        An existing fly.toml file was found for app fly-nodejs-ftp-server
        ? Would you like to copy its configuration to the new app? Yes
        ? Do you want to tweak these settings before proceeding? Yes
        ? Create .dockerignore from 1 .gitignore files? No
        Platform: machines
        ✓ Configuration is valid
        
        Now: run 'fly deploy' to deploy your NodeJS app.
        ```
2. Allocate dedicated IP addresses to your FTP server using the console.
    1. IPv6 address (free of charge): 
    ```javascript
    fly ips allocate-v6    
    ```
    2. Please decide whether you need a dedicated IPv4 (cost: $2 per month) or a shared IPv4 (free of charge, but you cannot connect to the FTP server via shared IPv4 unless your ISP supports IPv6). Run the appropriate command according to your choice, whether you need a dedicated or shared IPv4 (only 1 command):
      ```javascript
      fly ips allocate-v4
      ```
      ```javascript
      fly ips allocate-v4 --shared
      ```
3. Open `fly.toml` file in VS code, and set `internal_port = 8080` in the `[http_service]` block (it has changed to `3000` for some reason, so we need to restore the initial value `8080`).
4. Run `flyctl deploy --ha=false` to deploy your FTP server app.

    ```javascript
    $ flyctl deploy --ha=false
    ==> Verifying app config
    This deployment will:
    * create 1 "app" machine

    -------
    ✔ Machine e64df51a792744 [app] update finished: success
    ```
 5. If you need to adjust any settings in the code, make the edits, save changes, and deploy the changes by running `flyctl deploy --ha=false` to redeploy your FTP server's code.

## Usage
1. Open FTP client, e.g. [WinSCP](https://winscp.net/eng/downloads.php) (or any other FTP client) and
   1. in the Host Name, enter the name of your fly application defined in the `fly.toml` file plus _.fly.dev_ (e.g. `fly-nodejs-ftp-server.fly.dev`).
   2. Port: `21`
   3. User Name: `user` or new username defined in server.js file
   4. Password: `test` or new password defined in server.js file
   
## IPv6 note
If you deploy the code "as is" without modifying any data in the fly.toml or server.js files, access to the FTP folder will still be available from the client side, but only if your ISP has IPv6 support.

## License

Fly NodeJS FTP Server is licensed under the MIT License. See the [LICENSE](https://github.com/rybonka/fly-nodejs-ftp-server/blob/main/LICENSE) file for details. Feel free to copy and use it as you wish. 

## Contributing

If you encounter issues or wish to contribute to Fly NodeJS FTP Server application, please open an [issue](https://github.com/rybonka/fly-nodejs-ftp-server/issues) or submit a [pull request](https://github.com/rybonka/fly-nodejs-ftp-server/pulls). Thank you. 