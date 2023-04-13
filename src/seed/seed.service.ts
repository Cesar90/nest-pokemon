import { AxiosAdapter } from './../common/adapters/axios.adapter';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {  
  private readonly axios: AxiosInstance = axios

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ){

  }
  
  async executeSeed() {
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    await this.pokemonModel.deleteMany({})
    // const insertPromisesArray = [];
    // data.results.forEach(({name, url}) => {
    //   const segments = url.split('/')
    //   const no:number = +segments[ segments.length - 2 ]
    //   // const pokemon = await this.pokemonModel.create({ name, no })
    //   insertPromisesArray.push(
    //     this.pokemonModel.create({ name, no })
    //   )
    // })
    // await Promise.all( insertPromisesArray )
    const pokemonToInsert: { name: string, no: number }[] = []
    data.results.forEach(({name, url}) => {
      const segments = url.split('/')
      const no:number = +segments[ segments.length - 2 ]
      pokemonToInsert.push({name, no})
    })

    await this.pokemonModel.insertMany(pokemonToInsert)

    return 'Seed Executed'
  }
}
