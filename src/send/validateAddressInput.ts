import { isBasename } from '@/identity/utils/isBasename';
import { isEns } from '@/identity/utils/isEns';
import { getAddress } from '@/identity/utils/getAddress';
import { isAddress } from 'viem';
import { base } from 'viem/chains';

export async function validateAddressInput(input: string) {
  if (isBasename(input) || isEns(input)) {
    const address = await getAddress({ name: input, chain: base });
    if (address) {
      return address;
    }
  } else if (isAddress(input, { strict: false })) {
    return input;
  }
  return null;
}
