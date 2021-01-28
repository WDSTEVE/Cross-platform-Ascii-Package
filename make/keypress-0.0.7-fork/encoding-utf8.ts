// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

/** A default TextEncoder instance */
export const encoder = new TextEncoder();

/** Shorthand for new TextEncoder().encode() */
export function encode(input?: string): Uint8Array {
  return encoder.encode(input);
}

/** Shorthand for new TextDecoder().decode() */
export function decode(input?: Uint8Array): string {
  const decoder = new TextDecoder();
  return decoder.decode(input);
}
