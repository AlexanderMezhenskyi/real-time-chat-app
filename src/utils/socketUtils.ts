import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

let rpcId = 0

export const socket: Socket = io('http://localhost:3000')

type JsonRpcRequest = {
  jsonrpc: '2.0'
  method: string
  params?: Record<string, unknown>
  id: string | number | null
}

type JsonRpcSuccessResponse = {
  jsonrpc: '2.0'
  result: unknown
  id: string | number | null
}

type JsonRpcError = {
  code: number
  message: string
}

type JsonRpcErrorResponse = {
  jsonrpc: '2.0'
  error: JsonRpcError
  id: string | number | null
}

type JsonRpcResponse = JsonRpcSuccessResponse | JsonRpcErrorResponse

export const sendRpc = <T = unknown>(
  method: string,
  params?: Record<string, unknown>,
): Promise<T> => {
  const id = rpcId++

  return new Promise((resolve, reject) => {
    const req: JsonRpcRequest = {
      jsonrpc: '2.0',
      method,
      params,
      id,
    }

    socket.emit('rpc', req)

    const handleResponse = (res: JsonRpcResponse) => {
      if (res.id !== id) return

      socket.off('rpc', handleResponse)

      if ('error' in res) {
        reject(new Error(`[${String(res.error.code)}] ${res.error.message}`))
      } else {
        resolve(res.result as T)
      }
    }

    socket.on('rpc', handleResponse)
  })
}
