import { type HttpResponse } from '../protocols'
import { ServerError } from '../errors'
import {NotFoundError} from "../errors/not-found-error";
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const notFoundError = (): HttpResponse => ({
  statusCode: 404,
  body: new NotFoundError()
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
