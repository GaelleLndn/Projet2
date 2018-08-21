import { Log } from '../logs/log.model'


export interface Category {
    _id: string,
    label: string,
    logs: Log [],
    creator: string

}