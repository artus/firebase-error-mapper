import { FirebaseErrorMessagePair, authErrors } from "./errors"

export { FirebaseErrorMessagePair, authErrors };

/**
 * A FirebaseErrorMessageMapper keeps track of default and custom error message mappings for Firebase errors.
 */
export class FirebaseErrorMessageMapper {

  private static instance: FirebaseErrorMessageMapper;

  /**
   * Create a new FirebaseErrorMessageMapper.
   * 
   * @param customMappings An array of custom mappings to add to the default mappings.
   */
  constructor(public customMappings: FirebaseErrorMessagePair[] = []) {
  }

  /**
   * Get the FirebaseErrorMessageMapper instance.
   * 
   * @returns The FirebaseErrorMessageMapper instance.
   */
  public static getInstance(): FirebaseErrorMessageMapper {
    if (!this.instance) {
      this.instance = new FirebaseErrorMessageMapper();
    }

    return this.instance;
  }


  /**
   * Map a Firebase error message to a human readable message, based on the default and custom mappings.
   * 
   * @param message The Firebase error message to map.
   * @returns The mapped message.
   */
  map(message: string) {
    if (!message) return message;

    const extractedMessage = message.match(/\(([^)]+)\)/)?.[1] || message;

    for (const { key, value } of [...this.customMappings, ...authErrors]) {
      if (extractedMessage === key) return value
    }

    return message;
  }

  /**
   * Add a custom mapping to the FirebaseErrorMessageMapper.
   * 
   * @param key The Firebase error message key.
   * @param value The human readable error message.
   */
  addMapping(key: string, value: string) {
    this.customMappings.push({ key, value })
  }

  /**
   * Remove a custom mapping from the FirebaseErrorMessageMapper.
   * 
   * @param key The Firebase error message key.
   */
  removeMapping(key: string) {
    this.customMappings = this.customMappings.filter(mapping => mapping.key !== key)
  }
}