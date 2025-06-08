import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

let rpcId = 0
let socket: Socket

const socketUrl: string =
  import.meta.env.MODE === 'development'
    ? (import.meta.env.VITE_SOCKET_URL_DEV as string)
    : (import.meta.env.VITE_SOCKET_URL_PROD as string)

export const initSocket = (username: string): Socket => {
  socket = io(socketUrl, {
    auth: { username },
  })

  return socket
}

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error('Socket has not been initialized. Call initSocket first.')
  }
  return socket
}

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
  const s = getSocket()

  return new Promise((resolve, reject) => {
    const req: JsonRpcRequest = {
      jsonrpc: '2.0',
      method,
      params,
      id,
    }

    s.emit('rpc', req)

    const handleResponse = (res: JsonRpcResponse) => {
      if (res.id !== id) return

      s.off('rpc', handleResponse)

      if ('error' in res) {
        reject(new Error(`[${String(res.error.code)}] ${res.error.message}`))
      } else {
        resolve(res.result as T)
      }
    }

    s.on('rpc', handleResponse)
  })
}

export { socket }
