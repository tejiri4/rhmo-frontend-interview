import queryString from 'querystring';
/**
 * @class ApiService
 * @description Contains methods for making asynchronous Http requests
 * @exports ApiService
 */

 const BASE_URL = "https://pro-zone.herokuapp.com";

class ApiService {
  static ENDPOINTS = {
    providers: `${BASE_URL}/providers`,
    imageUpload: `${BASE_URL}/upload`

  }

  static headers = {
    'Authorization': 'Bearer ' + process.env.REACT_APP_AUTH_TOKEN
  }

  /**
   * @method get
   * @description makes a GET request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async get(url, data) {
    const response = await fetch(
      `${url}${data ? `?${queryString.stringify(data)}` : ''}`,
        { headers: ApiService.headers }
    );
    return response.json();
  }


  /**
   * @method post
   * @description makes a POST request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async post(url, data) {

    const response = await fetch(
      url, {
        method: 'POST',
        body: data,
          headers: ApiService.headers
      }
    );
    return response.json();
  }
}

export default ApiService;
