import { FirebaseErrorMessageMapper } from '../src/index'
import { authErrors } from '../src/errors'

describe('FirebaseErrorMessageMapper', () => {
  it('should map a Firebase error message to a human readable message, based on the default mappings.', () => {
    const mapper = new FirebaseErrorMessageMapper()
    for (const { key, value } of authErrors) {
      expect(mapper.map(key)).toEqual(value)
    }
  });

  it('Should map a Firebase error message to a human readable message, based on the custom mappings.', () => {
    const mapper = new FirebaseErrorMessageMapper()
    mapper.addMapping('auth/invalid-email', 'The email address is invalid.')
    for (const { key, value } of authErrors) {
      if (key === 'auth/invalid-email') {
        expect(mapper.map(key)).toEqual('The email address is invalid.')
      } else {
        expect(mapper.map(key)).toEqual(value)
      }
    }
  });

  it('Should remove a custom mapping.', () => {
    const mapper = new FirebaseErrorMessageMapper()
    mapper.addMapping('auth/invalid-email', 'The email address is invalid.')
    for (const { key, value } of authErrors) {
      if (key === 'auth/invalid-email') {
        expect(mapper.map(key)).toEqual('The email address is invalid.')
      } else {
        expect(mapper.map(key)).toEqual(value)
      }
    }
    mapper.removeMapping('auth/invalid-email')
    for (const { key, value } of authErrors) {
      expect(mapper.map(key)).toEqual(value)
    }
  });

  it('Should not throw an error when removing a mapping that does not exist.', () => {
    const mapper = new FirebaseErrorMessageMapper()
    mapper.removeMapping('auth/invalid-email')
  });

  it('Should not throw an error if no mapping was found.', () => {
    const mapper = new FirebaseErrorMessageMapper()
    expect(mapper.map('auth/non-existing-message')).toEqual('auth/non-existing-message');
  });

  it('Should extract the errorcode from between the firebase error parenthesis.', () => {
    const mapper = new FirebaseErrorMessageMapper()
    const expectedValue = authErrors.find(error => error.key === 'auth/invalid-email')?.value
    expect(mapper.map('Firebase: Error (auth/invalid-email)')).toEqual(expectedValue);
  });

  it('Should not throw when passing undefined.', () => {
    const mapper = new FirebaseErrorMessageMapper()
    expect(mapper.map(undefined as unknown as string)).toEqual(undefined);
  });

  it('Should not throw when passing null.', () => {
    const mapper = new FirebaseErrorMessageMapper()
    expect(mapper.map(null as unknown as string)).toEqual(null);
  });

  it ('Should not throw when passing an empty string.', () => {
    const mapper = new FirebaseErrorMessageMapper()
    expect(mapper.map('')).toEqual('');
  });

  it('Should not throw when passing a string without parenthesis.', () => {
    const mapper = new FirebaseErrorMessageMapper()
    expect(mapper.map('Firebase: Error')).toEqual('Firebase: Error');
  });

  it('Should support a singleton instance.', () => {
    const mapper = FirebaseErrorMessageMapper.getInstance()
    FirebaseErrorMessageMapper.getInstance().addMapping('custom-mapping', 'Custom mapping');
    expect(mapper.map('custom-mapping')).toEqual('Custom mapping');
  });
});