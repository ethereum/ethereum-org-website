import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

// Mock @supabase/supabase-js
const mockSupabaseClient = {
  from: vi.fn(),
}

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => mockSupabaseClient),
}))

describe("Supabase Client", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset module state to clear cached client
    vi.resetModules()
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co"
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key"
  })

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  })

  describe("storeSupabase", () => {
    it("should store data successfully", async () => {
      const { storeSupabase } = await import("../supabaseClient")
      const mockUpsert = vi.fn().mockResolvedValue({ error: null })
      mockSupabaseClient.from.mockReturnValue({
        upsert: mockUpsert,
      })

      const testData = { value: 3000, timestamp: Date.now() }
      const result = await storeSupabase("testKey", testData)

      expect(result).toBe(true)
      expect(mockSupabaseClient.from).toHaveBeenCalledWith("external_data")
      expect(mockUpsert).toHaveBeenCalledWith(
        {
          key: "external-data:testKey",
          value: testData,
          updated_at: expect.any(String),
        },
        { onConflict: "key" }
      )
    })

    it("should return false when Supabase client is not available", async () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      // Re-import to get fresh module state without client
      vi.resetModules()
      const { storeSupabase: storeSupabaseFresh } = await import(
        "../supabaseClient"
      )

      const testData = { value: 3000, timestamp: Date.now() }
      const result = await storeSupabaseFresh("testKey", testData)

      expect(result).toBe(false)
    })

    it("should handle storage errors", async () => {
      const { storeSupabase } = await import("../supabaseClient")
      const mockUpsert = vi.fn().mockResolvedValue({
        error: new Error("Supabase error"),
      })
      mockSupabaseClient.from.mockReturnValue({
        upsert: mockUpsert,
      })

      const testData = { value: 3000, timestamp: Date.now() }
      const result = await storeSupabase("testKey", testData)

      expect(result).toBe(false)
    })
  })

  describe("getSupabaseData", () => {
    it("should retrieve data successfully", async () => {
      const { getSupabaseData } = await import("../supabaseClient")
      const testData = { value: 3000, timestamp: Date.now() }
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { value: testData },
            error: null,
          }),
        }),
      })
      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
      })

      const result = await getSupabaseData<typeof testData>("testKey")

      expect(result).toEqual(testData)
      expect(mockSupabaseClient.from).toHaveBeenCalledWith("external_data")
      expect(mockSelect).toHaveBeenCalledWith("value")
    })

    it("should return null when key does not exist", async () => {
      const { getSupabaseData } = await import("../supabaseClient")
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { code: "PGRST116" },
          }),
        }),
      })
      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
      })

      const result = await getSupabaseData("nonexistent")

      expect(result).toBeNull()
    })

    it("should return null when Supabase client is not available", async () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      vi.resetModules()
      const { getSupabaseData: getSupabaseDataFresh } = await import(
        "../supabaseClient"
      )

      const result = await getSupabaseDataFresh("testKey")

      expect(result).toBeNull()
    })

    it("should handle retrieval errors", async () => {
      const { getSupabaseData } = await import("../supabaseClient")
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockRejectedValue(new Error("Supabase error")),
        }),
      })
      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
      })

      const result = await getSupabaseData("testKey")

      expect(result).toBeNull()
    })
  })
})
