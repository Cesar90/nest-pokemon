import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from './../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter{

  private axios: AxiosInstance = axios

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>('https://pokeapi.co/api/v2/pokemon?limit=650')
      return data
    } catch (error) {
      throw new Error('This is an error - Check logs')
    }
  }
}