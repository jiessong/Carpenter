import http from "../http-common";

class WoodDataService {

  getWoodSize(){
    return http.get("/");
  }

  updateWoodSize(data){
    return http.put("/woodsize", data);
  }

  getCuttings(data){
    return http.post("/woodsize", data);
  }

}

export default new WoodDataService();