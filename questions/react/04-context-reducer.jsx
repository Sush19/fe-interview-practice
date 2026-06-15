/**
 * QUESTION REACT-4 — Context + useReducer State Management (Hard)
 * ─────────────────────────────────────────────────────────
 * Build a simple shopping cart using Context + useReducer.
 *
 * Requirements:
 *  - CartContext provides cart state to the entire tree
 *  - Actions: ADD_ITEM, REMOVE_ITEM, CLEAR_CART
 *  - useCart() hook to consume the context (throws if used outside provider)
 *  - ProductList component adds items to cart
 *  - CartSummary component shows items and total price
 *
 * State shape:
 *   { items: [{ id, name, price, qty }] }
 *
 * Your solution → solutions/react/04-context-reducer.jsx
 */
import { createContext, useContext, useReducer } from 'react';

// YOUR CODE HERE
