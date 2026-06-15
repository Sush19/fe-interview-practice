/**
 * QUESTION REACT-1 — useFetch Hook (Medium)
 * ─────────────────────────────────────────────────────────
 * Implement a custom `useFetch(url)` hook.
 *
 * Returns: { data, loading, error }
 *
 * Requirements:
 *  - loading is true while the request is in-flight
 *  - data contains the parsed JSON on success
 *  - error contains the Error object on failure
 *  - Re-fetches automatically when `url` changes
 *  - Cancels the in-flight request if the component unmounts (use AbortController)
 *  - Does not update state after unmount
 *
 * Usage:
 *   function UserProfile({ userId }) {
 *     const { data, loading, error } = useFetch(`/api/users/${userId}`);
 *     if (loading) return <p>Loading...</p>;
 *     if (error) return <p>Error: {error.message}</p>;
 *     return <p>{data.name}</p>;
 *   }
 *
 * Your solution → solutions/react/01-use-fetch.jsx
 */

// Starter shell — copy to solutions/react/01-use-fetch.jsx
import { useState, useEffect } from 'react';

export function useFetch(url) {
  // YOUR CODE HERE
  return { data: null, loading: false, error: null };
}
