import axios from 'axios';
import { environment } from '../environment';

export const groceryClient = axios.create({
    baseURL: environment.context,
    withCredentials: true
});