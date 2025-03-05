import axios from "axios";
import { API_BASE_URL } from "../constants/index"

export default class TagService {
  static accessToken = String(sessionStorage.getItem('access_token'));


  static async getTags() {
    let response = await fetch(`${API_BASE_URL}/user/getTags`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        },
        withCredentials: true,
      }
    );

    return await response.json()
  }

  static async getTag(tagId) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/tags/get?tagId=` + tagId,
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      },
      withCredentials: true,
      data: ''
    };

    const response = axios.request(config)

    return (await response).data
  }

  static async getAllTags(tagsId) {
    try {
      let data = JSON.stringify({
        "tags": tagsId.map(id => String(id))
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/tags/getAll`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.accessToken
        },
        withCredentials: true,
        data: data
      }

      const response = axios.request(config)

      return (await response).data
    } catch (error) {
      return []
    }

  }

  static async updateTag(tadId, name, color) {
    try {
      let data = JSON.stringify({
        "tagId": tadId,
        "name": name,
        "color": color
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/tags/update`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.accessToken
        },
        withCredentials: true,
        data: data
      }

      const response = axios.request(config)

      return (await response).data

    } catch (error) {
      return []
    }
  }

  static async addTag(name, color) {
    let data = JSON.stringify({
      "name": name,
      "color": color
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/user/addTag`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      },
      withCredentials: true,
      data: data
    }

    const response = axios.request(config)

    return (await response).data

  }

  static async deleteTag(tagId) {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/user/deleteTag?tagId=` + tagId,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      },
      withCredentials: true,
      data: ''
    }

    const response = axios.request(config)

    return (await response).data
  }
}