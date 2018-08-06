import {Category} from '../categories/category.model'


export interface Log {
    _id: String,
    title: String,
    date: Date,
    categories: Category[]
  }