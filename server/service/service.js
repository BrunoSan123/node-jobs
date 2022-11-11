const axios = require("axios");
const timeout = 1000 * 5;
const fs = require("fs");
const sendMailer = require("../mail_service/mailer");

const getDomains = () => {
  const domains =fs.readFileSync('./domain/domains.json')
  let blobDomain =JSON.parse(domains)
  let request = blobDomain[0].domains.map((target) => {
    return axios({
      method: "get",
      url: target.hosts,
      timeout: timeout,
    });
  });
  axios
    .all(request)
    .then(
      axios.spread((...responses) => {
        console.log("chegou aqui");
        const data = responses.map((target) => {
          return {
            status: "OK",
            response: {
              status: target.status,
              dominio: target.config.url,
              tempo: null,
            },
          };
        });
        console.log(data);
        console.log("antes de  gravar");
        fs.writeFile(
          "./logs/logs.json",
          JSON.stringify(data, null, 2),
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("log gravado");
            }
          }
        );
        console.log("depois de gravar");
      })
    )
    .catch((err) => {
      //console.log(err)
      console.error(err.hostname, err.errno, err.code);
      const buffer = fs.readFileSync("./logs/logs.json");
      let blob = JSON.parse(buffer);
      console.log(err.config.url)
      const status = blob.filter((e)=>(e.response.dominio==err.config.url)).map((f)=>(f.response.dominio))
      console.log(status)
     
      if(!status.length){
        let errorObject ={
          status:'BAD',
          response:{
            tempo: err.request._currentRequest.socket.timeout,
            errorCode:err.code,
            dominio:err.config.url
          }
        }
        blob.push(errorObject)
        console.log(blob)
        fs.writeFileSync("./logs/logs.json", JSON.stringify(blob, null, 2));

      }else{
      blob
        .filter((e) => e.response.dominio == err.config.url)
        .map(
          (f) => (
            f.response.dominio,
            (f.status = "BAD"),
            (f.response.tempo = err.request._currentRequest.socket.timeout),
            (f.response.errorCode = err.code)
          )
        );
      fs.writeFileSync("./logs/logs.json", JSON.stringify(blob, null, 2));
    }
      sendMailer(err);
    });
};

module.exports = { getDomains, timeout };