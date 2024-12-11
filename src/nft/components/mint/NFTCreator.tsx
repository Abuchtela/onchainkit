import { useOnchainKit } from '../../../core-react/useOnchainKit';
import { cn } from '../../../styles/theme';
import { Avatar, Badge, Identity, Name } from '../../../ui/react/identity';
import { useNFTContext } from '../NFTProvider';

type NFTCreatorReact = {
  className?: string;
};

export function NFTCreator({ className }: NFTCreatorReact) {
  const { schemaId } = useOnchainKit();
  const { creatorAddress } = useNFTContext();

  if (!creatorAddress) {
    return null;
  }

  return (
    <div className={cn('-my-1 flex justify-between', className)}>
      <Identity
        className="px-0 py-0 [&>div]:space-x-2"
        address={creatorAddress}
        schemaId={schemaId}
      >
        <Avatar className="h-4 w-4" />
        <Name>
          <Badge />
        </Name>
      </Identity>
    </div>
  );
}
