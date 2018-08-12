import {Category} from '../categories/category.model'


export interface Log {
    _id: string,
    title: string,
    date: Date,
    categories: Category[]
  }