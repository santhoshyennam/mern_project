const Skyflow = require("skyflow-node");
//import Skyflow from "skyflow-node";
console.log(Skyflow);
 const skyflow = Skyflow.init({
    vaultID: "b359c43f1b844ff4bea0f098d2c09193",
    vaultURL: "https://sb1.area51.vault.skyflowapis.tech",
    getBearerToken: () => {
      return new Promise((resolve, reject) => {
        const Http = new XMLHttpRequest();

        Http.onreadystatechange = () => {
          if (Http.readyState == 4) {
            if (Http.status == 200) {
              const response = JSON.parse(Http.responseText);
              resolve(response.accessToken);
            } else {
              reject("Error occured");
            }
          }
        };

        Http.onerror = (error) => {
          reject("Error occured");
        };

        const url = "https://go-server.skyflow.dev/sa-token/b359c43f1b844ff4bea0f098d2c09193";
        Http.open("GET", url);
        Http.send();
      });
    },
  });



  const response = skyflow.insert({
    records: [
      {
        fields: {
            cvv: "234",
            card_number: "41111",
            fullname: "san",
            expiry_date: "11/22",
        },
        table: "cards",
      },
    ],
  });
  response
    .then(
      (res) => {
        
        console.log("insert result: "+res);
      },
      (err) => {
        console.log("insert error:"+err)
      }
    )
    .catch((err) => {
        console.log("insert exception: "+err)
    });