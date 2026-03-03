/**
 * Environment variable validation and type-safe access
 * Validates required env vars on app startup and provides type-safe access
 */

interface EnvVars {
  // Required
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;

  // Optional (payment providers)
  VITE_STRIPE_PUBLISHABLE_KEY?: string;
  VITE_SQUARE_APPLICATION_ID?: string;
  VITE_SQUARE_LOCATION_ID?: string;
}

class EnvValidator {
  private validated = false;
  private errors: string[] = [];

  /**
   * Validate required environment variables
   * Call this once at app startup (before rendering)
   */
  validate(): void {
    if (this.validated) return;

    this.errors = [];

    // Check required variables
    this.checkRequired('VITE_SUPABASE_URL');
    this.checkRequired('VITE_SUPABASE_ANON_KEY');

    // Validate URL formats
    this.validateUrl('VITE_SUPABASE_URL', 'https://');

    // If there are errors, show them
    if (this.errors.length > 0) {
      const errorMessage = [
        '❌ Environment Configuration Error',
        '',
        'Missing or invalid environment variables:',
        ...this.errors.map((err) => `  • ${err}`),
        '',
        'Please check your .env.local file and ensure all required variables are set.',
        'See .env.example for reference.',
      ].join('\n');

      console.error(errorMessage);

      // In development, show a helpful error screen
      if (import.meta.env.DEV) {
        document.body.innerHTML = `
          <div style="
            font-family: system-ui, sans-serif;
            padding: 2rem;
            max-width: 600px;
            margin: 2rem auto;
            background: #fef2f2;
            border: 2px solid #ef4444;
            border-radius: 8px;
          ">
            <h1 style="color: #dc2626; margin-bottom: 1rem;">⚠️ Configuration Error</h1>
            <p style="margin-bottom: 1rem;">Missing or invalid environment variables:</p>
            <ul style="margin-bottom: 1rem; padding-left: 1.5rem;">
              ${this.errors.map((err) => `<li>${err}</li>`).join('')}
            </ul>
            <p style="margin-bottom: 0.5rem;">
              <strong>To fix this:</strong>
            </p>
            <ol style="padding-left: 1.5rem; margin-bottom: 1rem;">
              <li>Copy <code>.env.example</code> to <code>.env.local</code></li>
              <li>Add your Supabase credentials</li>
              <li>Restart the dev server</li>
            </ol>
            <p style="font-size: 0.875rem; color: #6b7280;">
              See README.md for detailed setup instructions.
            </p>
          </div>
        `;
        throw new Error('Environment validation failed');
      }

      // In production, throw an error (should be caught by ErrorBoundary)
      throw new Error('Environment configuration error. Please check server logs.');
    }

    this.validated = true;
  }

  /**
   * Get environment variable with type safety
   */
  get<K extends keyof EnvVars>(key: K): EnvVars[K] {
    const value = import.meta.env[key];

    if (value === undefined || value === '') {
      // If we're here, validation was skipped or this is an optional var
      if (this.isRequired(key)) {
        throw new Error(`Required environment variable ${key} is not set`);
      }
      return undefined as EnvVars[K];
    }

    return value as EnvVars[K];
  }

  /**
   * Check if a variable is set
   */
  has(key: keyof EnvVars): boolean {
    const value = import.meta.env[key];
    return value !== undefined && value !== '';
  }

  private checkRequired(key: string): void {
    const value = import.meta.env[key];
    if (!value || value.trim() === '') {
      this.errors.push(`${key} is required but not set`);
    }
  }

  private validateUrl(key: string, expectedProtocol?: string): void {
    const value = import.meta.env[key];
    if (!value) return; // Already checked by checkRequired

    try {
      const url = new URL(value);
      if (expectedProtocol && !url.protocol.startsWith(expectedProtocol.replace('://', ''))) {
        this.errors.push(`${key} must use ${expectedProtocol} protocol`);
      }
    } catch {
      this.errors.push(`${key} is not a valid URL`);
    }
  }

  private isRequired(key: string): boolean {
    const required = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
    return required.includes(key);
  }
}

// Export singleton instance
export const env = new EnvValidator();

// Validate on import (startup)
env.validate();
