'use client'

import { useState, useEffect } from 'react'

interface FilterOptions {
  source_apps: string[]
  session_ids: string[]
  hook_event_types: string[]
}

export function useEventFilters() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFilterOptions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/events/filter-options`
      )
      
      if (!response.ok) {
        throw new Error(`Failed to fetch filter options: ${response.statusText}`)
      }
      
      const data = await response.json()
      setFilterOptions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch filter options')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchFilterOptions()

    // Set up interval for refreshing every 10 seconds
    const interval = setInterval(() => {
      fetchFilterOptions()
    }, 10000)

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval)
    }
  }, [])

  return {
    filterOptions,
    isLoading,
    error
  }
}