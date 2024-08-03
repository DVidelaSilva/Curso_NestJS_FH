import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';




@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}

  async executeSeed(){

    await this.pokemonModel.deleteMany({})

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=600')
    
    // Primera opcion - todos los registros se iran insertando de a uno . insert en bd
    /* const insertPromisesArray = [];

    // obetenr el id que viene en el url
    data.results.forEach(({name, url}) => {

      const segments = url.split('/')
      const no = +segments[ segments.length - 2]

      //const pokemon = await this.pokemonModel.create({name, no})

      insertPromisesArray.push(
        this.pokemonModel.create({name, no})
      ) */

      // Segunda opcion - todos los registros en una sola inserccion.  insert en bd
      const pokemonToInsert: {name: string, no: number}[] = []

      // obetenr el id que viene en el url
      data.results.forEach(({name, url}) => {
  
        const segments = url.split('/')
        const no = +segments[ segments.length - 2]
  
        pokemonToInsert.push({name, no})
        
    })

    await this.pokemonModel.insertMany(pokemonToInsert)


    return 'Seed Executed'
  }
}
