import axios from "axios";

interface ApiInterface {
  entity: string;
}
class Api implements ApiInterface {
  entity: string;

  constructor(entity: string) {
    this.entity = entity;
  }
}

class ApiGetter extends Api {
  getAll(params: object | null = null) {
    console.log(params);
    return axios({
      url: `http://localhost:3000/api/${this.entity}/getAll`,
      method: "GET",
      params: params
    });
  }
}

class ApiCreator extends Api {
  create(data: object) {
    return axios({
      url: `http://localhost:3000/api/${this.entity}/create`,
      method: "POST",
      data: data
    });
  }
}

class ApiUpdater extends Api {
  update(data: object) {
    return axios({
      // @ts-ignore
      url: `http://localhost:3000/api/${this.entity}/update/${data._id}`,
      method: "PUT",
      data: data
    });
  }
}

class ApiDeleter extends Api {
  delete(data: object) {
    return axios({
      url: `http://localhost:3000/api/${this.entity}/create`,
      method: "POST",
      data: data
    });
  }
}

export { Api, ApiGetter, ApiCreator, ApiUpdater, ApiDeleter };
