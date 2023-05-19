# Introduction:

The purpose of the application is "Analyzing the SoftwareSupp platform after the project management account and creating a service that would enable such synchronization. There is a tool that significantly facilitates this type of solution - Zapier (https://zapier.com/), it allows you to create various types of triggers, and acts as an intermediary between two entities, in our case, between the SoftwareSupp platform and the client tool.
It is mainly about enabling sending information about any changes in the project board to Zapier (REST API), and handling these queries in this tool so that the client has the ability to connect."

## Technologies:

-React: 17.0.2,
-Node: 12.16.1,

## Construction:

The node.js server provides one endpoint -project board. The goal of the endpoint is integration
with Software Supp project board, zapier (Web Hook). To integrate, Software Supp,
we use login endpoint to get access token. Then we fetch the data via
endpoint, which allows us to download items from the project board. As the last step, we send the obtained data to Zapier Web Hook.

## Overall flow:

The client sends a request to our Node.js application. The Node.js app then fetches data from the Softwaresupp app and then sends that data to Zapier Web Hook.
The Zapier Web Hook starts executing the user-configured steps. Individual steps such as saving data to Word and Excel. Finally, the files are edited
on google drive or are saved as new.
As a result, after going through the entire process, the client can go to google drive and download files filled with data from the SoftwareSupp application.

## Setting up the environment

### gmail data (google drive)

email: recruitment.appzapier@gmail.com
password: appzapier100

### Link to Zapier with ready flow:

generic: https://zapier.com/shared/c2a75e7577764aefcffe2e687ad56f662c3fa039

to flow: https://zapier.com/app/editor/130640598/nodes/130640598/sample

### The request it needs to send to the Node.js server:

url: localhost:80/api/project-board,
method: post,
headers:
Content-Type: application/json
Accept: application/json

body:
{
"username": "kamil.gronek@gmail.com",
"password": "test123456"
}

## Running the application:

After downloading the file for installation of the node.modules environment, enter the following in the terminal:

```bash
npm install
```

To run the application in the terminal in the main project path, enter:

```bash
nodeserver.js
```

## Attention:

After sending the request to the endpoint project board, in order to check the correct integration with all applications, log in to gmail, enter Google drive and check
content of completed files:
excel - "recruitment app zapier test excel",
word - "recruitment app zapier test word".
They will contain data from Software Supp.
