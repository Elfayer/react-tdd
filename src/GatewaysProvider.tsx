import { createContext, useContext } from 'react'
import { ApiSessionGateway } from './Gateways/ApiSessionGateway'
import { FakeSessionGateway } from './Gateways/FakeSessionGateway'
import { SessionGateway } from './Gateways/SessionGateway'

export interface GatewaysContextData {
  sessionGateway: SessionGateway
}

const GatewaysContext = createContext<GatewaysContextData | undefined>(undefined)

interface GatewaysProviderProps {
  children: React.ReactNode
}

function GatewaysProvider({ children }: GatewaysProviderProps) {
  const data: GatewaysContextData = {
    sessionGateway: new ApiSessionGateway(),
  }
  return <GatewaysContext.Provider value={data}>{children}</GatewaysContext.Provider>
}

interface FakeGatewaysProviderProps {
  value?: Partial<GatewaysContextData>
  children: React.ReactNode
}

function FakeGatewaysProvider({ value = {}, children }: FakeGatewaysProviderProps) {
  const data: GatewaysContextData = {
    sessionGateway: new FakeSessionGateway(),
    ...value,
  }
  return <GatewaysContext.Provider value={data}>{children}</GatewaysContext.Provider>
}

function useGateways() {
  const context = useContext(GatewaysContext)

  if (context === undefined) {
    throw new Error('useGateways must be used within a GatewayProvider')
  }
  return context
}

export { GatewaysProvider, FakeGatewaysProvider, useGateways }
