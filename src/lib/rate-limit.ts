import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  /**
   * Time window in milliseconds
   */
  windowMs: number;
  /**
   * Maximum number of requests per window
   */
  max: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limiter using in-memory store
 * For production, consider using Redis or similar
 */
export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<RateLimitResult> => {
    // Get identifier (IP address or user ID)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'anonymous';
    
    const key = `${ip}:${request.nextUrl.pathname}`;
    const now = Date.now();
    
    // Initialize or get existing entry
    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 0,
        resetTime: now + config.windowMs,
      };
    }
    
    // Increment counter
    store[key].count++;
    
    const remaining = Math.max(0, config.max - store[key].count);
    const success = store[key].count <= config.max;
    
    return {
      success,
      limit: config.max,
      remaining,
      reset: store[key].resetTime,
    };
  };
}

/**
 * Pre-configured rate limiters for different use cases
 */
export const rateLimiters = {
  // Strict: 10 requests per minute
  strict: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
  }),
  
  // Standard: 30 requests per minute
  standard: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30,
  }),
  
  // Lenient: 100 requests per minute
  lenient: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
  }),
  
  // API: 200 requests per 5 minutes
  api: rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 200,
  }),
};
