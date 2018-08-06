import { Log } from '../logs/log.model'


export interface Category {
    _id: String,
    label: String,
    logs: Log []
}