
/**
 * Entry point for match services
 */

// Re-export all match-related functions
export * from './availableMatches';
export * from './predefinedMatches';

// Re-export from ticketFormatter for backward compatibility
export { matchToTicket } from '../tickets/ticketFormatter';
