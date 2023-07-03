import * as dotenv from 'dotenv';
import { Config } from './types';

export function loadConfig():Config {
  dotenv.config();

  const baseUrl = process.env.MATRIX_SERVER_URL;
  const userId = process.env.USER_ID;
  const password = process.env.PASSWORD;
  const rooms = process.env.ROOMS?.split(',') ?? [];

  if (!!userId && !!password && !! baseUrl)
    return { baseUrl, userId, password, rooms };
  else 
    throw new Error("ERR: Configuration incomplete");

}