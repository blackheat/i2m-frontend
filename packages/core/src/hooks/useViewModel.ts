import { useRef } from 'react'

export const useViewModel = <TResult, TParams = any>(
  VmConstructor: new (params: TParams) => TResult,
  params?: TParams
) => {
  const vmRef = useRef<TResult>(null)

  if (!vmRef.current) {
    vmRef.current = new VmConstructor(params)
  }

  return vmRef.current
}
