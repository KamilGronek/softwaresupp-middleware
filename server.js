const {URLSearchParams} = require('url');
const express = require("express");
const app = express();
const cors = require("cors");
const request = require("request");
const port = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

app.listen(port, function () {
  console.log("Listening! on port: " + port);
});

app.post("/api/project-board", function (req, res, next) {
  let body = req.body;
  if (!checkRequestData(body, res)) {
    return;
  }

  let loginToSoftwareSuppOptions = {
    username: body.username,
    password: body.password,
    res: res
  };

  loginToSoftwareSupp(loginToSoftwareSuppOptions, getProjectBoardPositionsFromSoftwareSupp)
});

const isEmpty = (value) => {
  return value.length === 0 || !value.trim();
};

const checkRequestData = (body, res) => {
  if (!body.hasOwnProperty("username") ||
    !body.hasOwnProperty("password") ||
    isEmpty(body.username) ||
    isEmpty(body.password)) {
    res.status(400);
    res.json("Error related with input data");
    return false;
  }
  return true;
}

const loginToSoftwareSupp = (options, callbackAfterLogin) => {
  let formDataToEncode = {
    scope: 'user',
    grant_type: 'password',
    username: options.username,
    password: options.password,
    client_id: '0930f6b1-e30a-4b49-9522-73977c8176ef'
  }

  let formData = new URLSearchParams(Object.entries(formDataToEncode)).toString();

  let loginOptions = {
    method: "POST",
    url: "https://flex-api.sharetribe.com/v1/auth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "accept": "application/json"
    },
    body: formData
  };

  request(loginOptions, (error, response, body) => {
    if (error != null || response.statusCode !== 200) {
      options.res.json("Internal server error");
    } else {
      let accessToken = JSON.parse(response.body).access_token;
      let callbackAfterLoginOptions = {
        accessToken: accessToken,
        res: options.res
      }
      callbackAfterLogin(callbackAfterLoginOptions, sendDataToWebHookZapier);
    }
    options.res.status(response.statusCode);
  });
}

const getProjectBoardPositionsFromSoftwareSupp = (options, callbackAfterGetData) => {
  let projectBoardPositions = {
    method: "GET",
    url: "https://flex-api.sharetribe.com/v1/api/own_listings/query",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json",
      "authorization": `Bearer ${options.accessToken}`
    }
  }
  request(projectBoardPositions, (error, response, body) => {
    callbackAfterGetData(body, options.res)
  });
}

const sendDataToWebHookZapier = (data, res) => {
  let webHookOptions = {
    method: "POST",
    url: "https://hooks.zapier.com/hooks/catch/10738793/buexd6o/",
    headers: {
      "Content-Type": "application/json",
    },
    body: data
  }
  request(webHookOptions,(error, response, body) => {
    if (error != null || response.statusCode !== 200) {
      res.json("Internal server error");
    } else {
      res.json("Process successful");
    }
    res.status(response.statusCode);
  });
};