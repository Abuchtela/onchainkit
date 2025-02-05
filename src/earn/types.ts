import type { Token } from '@/token';
import type { Call } from '@/transaction/types';
import type React from 'react';
import type { Address } from 'viem';

export type EarnReact = {
  children?: React.ReactNode;
  className?: string;
  vaultAddress: Address;
};

export type EarnProviderReact = {
  children: React.ReactNode;
  vaultAddress: Address;
};

export type EarnContextType = {
  // TODO: rename to recipientAddress for clarity
  address?: Address;
  apy?: number;
  convertedBalance?: string;
  vaultAddress: Address;
  vaultToken: Token | undefined;
  depositAmount: string;
  depositedAmount?: string;
  interest?: string;
  setDepositAmount: (amount: string) => void;
  setWithdrawAmount: (amount: string) => void;
  withdrawAmount: string;
  withdrawCalls: Call[];
  depositCalls: Call[];
  /** The address of the asset that is being deposited or withdrawn */
  assetAddress?: Address | undefined;
};

export type EarnAmountInputReact = {
  className?: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  'aria-label'?: string;
};

export type WithdrawAmountInputReact = {
  className?: string;
};

export type DepositAmountInputReact = {
  className?: string;
};
export type EarnBalanceReact = {
  className?: string;
  onActionPress: () => void;
  title: React.ReactNode;
  subtitle: string;
  showAction?: boolean;
};

export type DepositBalanceReact = {
  className?: string;
};

export type WithdrawBalanceReact = {
  className?: string;
};

export type EarnCardReact = {
  children: React.ReactNode;
  className?: string;
};

export type EarnDepositReact = {
  children?: React.ReactNode;
  className?: string;
};

export type EarnWithdrawReact = {
  children?: React.ReactNode;
  className?: string;
};

export type EarnDetailsReact = {
  className?: string;
  token?: Token;
  tag?: React.ReactNode;
  tagVariant?: 'default' | 'primary';
};

export type DepositDetailsReact = {
  className?: string;
};

export type WithdrawDetailsReact = {
  className?: string;
};

export type DepositButtonReact = {
  className?: string;
};

export type WithdrawButtonReact = {
  className?: string;
};
