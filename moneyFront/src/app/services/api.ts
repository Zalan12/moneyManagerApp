import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/apiresponse';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class Api {
  SERVER = 'http://localhost:3000'
  constructor(){}
  async selectAll(table: string): Promise<ApiResponse> {
    try {
      const response = await axios.get(`${this.SERVER}/${table}`);
      return {
        status: response.status,
        data: response.data
      }

    }
    catch (err: any) {
      return {
        status: 500,
        message: "gaty"
      }


    }


  }
  async delete(table: string, id: number) {
    try {
      const response = await axios.delete(`${this.SERVER}/${table}/${id}`);
      return {
        status: response.status,
        data: response.data
      }
    }
    catch (err: any) {
      return {
        status: 500,
        data: "response.data"
      }

    }
  }
}
