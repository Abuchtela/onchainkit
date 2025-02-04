import type { EarnContextType } from '@/earn/types';
import type { Call } from '@/transaction/types';
import { render, screen } from '@testing-library/react';
import type { Address } from 'viem';
import { type Mock, describe, expect, it, vi } from 'vitest';
import { useAccount } from 'wagmi';
import { useConnect } from 'wagmi';
import { DepositButton } from './DepositButton';
import { useEarnContext } from './EarnProvider';

// Address required to avoid connect wallet prompt
const baseContext: EarnContextType & { address: Address } = {
  convertedBalance: '1000',
  setDepositAmount: vi.fn(),
  vaultAddress: '0x123' as Address,
  depositAmount: '0',
  depositedAmount: '0',
  withdrawAmount: '0',
  setWithdrawAmount: vi.fn(),
  depositCalls: [],
  withdrawCalls: [],
  address: '0x123' as Address,
};

vi.mock('./EarnProvider', () => ({
  useEarnContext: vi.fn(),
}));

vi.mock('wagmi', () => ({
  useAccount: vi.fn(),
  useConnect: vi.fn(),
  useConfig: vi.fn(),
  useCapabilities: vi.fn(),
}));

vi.mock('@/transaction', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@/transaction')>()),
    TransactionLifecycleStatus: vi.fn(),
    TransactionButton: ({
      text,
      disabled,
    }: { text: string; disabled: boolean }) => (
      <button type="button" disabled={disabled} data-testid="transactionButton">
        {text}
      </button>
    ),
    Transaction: ({
      onStatus,
      children,
      capabilities,
    }: {
      onStatus: (status: { statusName: string }) => void;
      children: React.ReactNode;
      capabilities: { paymasterService: { url: string } };
    }) => (
      <>
        <div data-testid="transaction">
          <button
            type="button"
            data-testid="transaction-button"
            onClick={() => onStatus({ statusName: 'transactionPending' })}
          >
            TransactionPending
          </button>
          <button
            type="button"
            data-testid="transaction-button"
            onClick={() =>
              onStatus({ statusName: 'transactionLegacyExecuted' })
            }
          >
            TransactionLegacyExecuted
          </button>
          <button
            type="button"
            data-testid="transaction-button"
            onClick={() => onStatus({ statusName: 'success' })}
          >
            Success
          </button>
          <button
            type="button"
            data-testid="transaction-button"
            onClick={() => onStatus({ statusName: 'error' })}
          >
            Error
          </button>
          <div>{capabilities?.paymasterService?.url}</div>
        </div>
        {children}
      </>
    ),
    TransactionSponsor: vi.fn(),
    TransactionStatus: vi.fn(),
    TransactionStatusAction: vi.fn(),
    TransactionStatusLabel: vi.fn(),
  };
});

vi.mock('@/internal/hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('DepositButton Component', () => {
  it('renders ConnectWallet if no account is connected', () => {
    vi.mocked(useEarnContext).mockReturnValue({
      ...baseContext,
      address: undefined,
    });

    vi.mocked(useAccount as Mock).mockReturnValue({
      address: '',
      status: 'disconnected',
    });

    vi.mocked(useConnect as Mock).mockReturnValue({
      connectors: [{ id: 'mockConnector' }],
      connect: vi.fn(),
      status: 'idle',
    });

    render(<DepositButton />);

    const connectWalletButton = screen.getByTestId(
      'ockConnectWallet_Container',
    );
    expect(connectWalletButton).toBeInTheDocument();
  });

  it('renders Transaction with depositCalls from EarnProvider', () => {
    const mockDepositCalls: Call[] = [{ to: '0x123', data: '0x456' }];
    vi.mocked(useEarnContext).mockReturnValue({
      ...baseContext,
      depositCalls: mockDepositCalls,
    });

    render(<DepositButton />);

    const transactionElement = screen.getByTestId('transaction');
    expect(transactionElement).toBeInTheDocument();
  });

  it('renders TransactionButton with the correct text', () => {
    vi.mocked(useEarnContext).mockReturnValue({
      ...baseContext,
      depositCalls: [],
    });

    const { container } = render(<DepositButton />);

    expect(container).toHaveTextContent('Deposit');
  });
});
