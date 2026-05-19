// src/services/api.js
// Centralized client for the WordPress REST API hosted at nacoc.org.
// All page content (posts, events, pages, business directory) is fetched
// from the WordPress backend. There are no mock fallbacks — if WordPress
// returns an error or empty array, the UI shows the empty / not-found state.

const WP_ORIGIN = import.meta.env.VITE_WP_ORIGIN || 'https://cms.nacoc.org';
const BASE_URL = `${WP_ORIGIN}/wp-json/wp/v2`;
const TRIBE_URL = `${WP_ORIGIN}/wp-json/tribe/events/v1`;

const defaultHeaders = { Accept: 'application/json' };

async function request(url) {
  const res = await fetch(url, { headers: defaultHeaders, mode: 'cors' });
  if (!res.ok) {
    throw new Error(`WP request failed (${res.status}) for ${url}`);
  }
  return res.json();
}

export const api = {
  // ---------------------------------------------------------------------------
  // Posts (Blog / News) — wp/v2/posts
  // ---------------------------------------------------------------------------
  getPosts: async (page = 1, perPage = 9) => {
    try {
      return await request(`${BASE_URL}/posts?_embed&page=${page}&per_page=${perPage}`);
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  getPostById: async (id) => {
    try {
      return await request(`${BASE_URL}/posts/${id}?_embed`);
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  getPostBySlug: async (slug) => {
    try {
      const data = await request(`${BASE_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`);
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // ---------------------------------------------------------------------------
  // Pages — wp/v2/pages (used for static content like About, Programs, Resources)
  // ---------------------------------------------------------------------------
  getPageBySlug: async (slug) => {
    try {
      const data = await request(`${BASE_URL}/pages?slug=${encodeURIComponent(slug)}&_embed`);
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // ---------------------------------------------------------------------------
  // Events — Tribe Events Calendar REST API (tribe/events/v1)
  // ---------------------------------------------------------------------------
  getEvents: async (page = 1, perPage = 9) => {
    try {
      const url = `${TRIBE_URL}/events?page=${page}&per_page=${perPage}&start_date=2020-01-01`;
      const data = await request(url);
      return Array.isArray(data?.events) ? data.events : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  getUpcomingEvents: async (perPage = 3) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const url = `${TRIBE_URL}/events?per_page=${perPage}&start_date=${today}`;
      const data = await request(url);
      return Array.isArray(data?.events) ? data.events : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  // Accepts either a numeric Tribe event ID or a URL slug.
  // Tribe's REST API exposes two distinct endpoints:
  //   /events/{id}            → numeric post ID only
  //   /events/by-slug/{slug}  → URL slug
  // The React routes link with `event.slug || event.id`, so we have to
  // pick the right endpoint here or detail pages 404.
  getEventById: async (idOrSlug) => {
    if (idOrSlug === undefined || idOrSlug === null || idOrSlug === '') return null;
    const isNumeric = /^\d+$/.test(String(idOrSlug));
    const url = isNumeric
      ? `${TRIBE_URL}/events/${idOrSlug}`
      : `${TRIBE_URL}/events/by-slug/${encodeURIComponent(idOrSlug)}`;
    try {
      return await request(url);
    } catch (err) {
      // Fallback: if a numeric lookup fails, try slug, and vice-versa.
      try {
        const fallback = isNumeric
          ? `${TRIBE_URL}/events/by-slug/${encodeURIComponent(idOrSlug)}`
          : `${TRIBE_URL}/events/${idOrSlug}`;
        return await request(fallback);
      } catch (err2) {
        console.error(err, err2);
        return null;
      }
    }
  },

  // ---------------------------------------------------------------------------
  // Business Directory — WordPress custom post type "business"
  //
  // Requires a CPT named `business` exposed via REST on the WP backend
  // (`'show_in_rest' => true, 'rest_base' => 'businesses'`).
  // Custom fields (phone, website, address, etc.) should be exposed via ACF
  // or `register_rest_field`. The frontend reads them from `post.acf` first,
  // falling back to top-level keys.
  // ---------------------------------------------------------------------------
  getBusinesses: async (page = 1, perPage = 50) => {
    try {
      return await request(`${BASE_URL}/businesses?_embed&page=${page}&per_page=${perPage}`);
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  getBusinessBySlug: async (slug) => {
    try {
      const data = await request(`${BASE_URL}/businesses?slug=${encodeURIComponent(slug)}&_embed`);
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // ---------------------------------------------------------------------------
  // Form submissions — Contact Form 7 REST API
  //
  // Endpoint: POST /wp-json/contact-form-7/v1/contact-forms/{formId}/feedback
  //   - Accepts multipart/form-data
  //   - Field names must match what's defined in the CF7 form on the WP backend
  //   - No authentication required (CF7 handles its own spam/nonce protection)
  //
  // Response shape:
  //   { status: 'mail_sent' | 'validation_failed' | 'spam' | 'mail_failed', message: '...', invalid_fields?: [...] }
  // ---------------------------------------------------------------------------
  submitForm: async (formId, fields) => {
    if (!formId) {
      return { status: 'config_error', message: 'No Contact Form 7 form ID configured.' };
    }
    const url = `${WP_ORIGIN}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;
    const body = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach((v) => body.append(`${key}[]`, v));
      } else {
        body.append(key, value);
      }
    });
    try {
      const res = await fetch(url, { method: 'POST', body, mode: 'cors' });
      const data = await res.json();
      return data; // CF7 always returns 200 with a status field
    } catch (err) {
      console.error(err);
      return { status: 'network_error', message: 'Could not reach the server. Please try again.' };
    }
  },
};
