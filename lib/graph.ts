/**
 * Graph helpers for Piața - link-first traversal (Where/When/Who)
 * Everything connects through connections table
 */

export type ConnectionType = 
  | 'event_place'
  | 'person_event'
  | 'person_neighborhood'
  | 'job_place'
  | 'traffic_event'
  | 'poll_place'
  | 'business_place'
  | 'other'

export type NodeType = 'events' | 'places' | 'persons' | 'businesses' | 'job-ads' | 'traffic-disruptions' | 'polls' | 'neighborhoods'

export interface ConnectionEdge {
  id: string
  type: ConnectionType
  sourceType: NodeType
  source: any
  targetType: NodeType
  target: any
  weight: number
  metadata?: any
}

/**
 * Build graph query helpers - conceptual
 * Actual implementation depends on DB client
 */
export const GraphHelpers = {
  /**
   * Get all items connected to a source
   */
  getConnected: async (sourceId: string, sourceType: NodeType) => {
    // Implementation via connections table
    return []
  },
  
  /**
   * Get neighborhood connections for a person
   */
  getNeighborhoodForPerson: async (personId: string) => {
    return []
  },
  
  /**
   * Get events affecting by traffic disruption
   */
  getAffectedEvents: async (trafficId: string) => {
    return []
  },
}
