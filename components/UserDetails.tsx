'use client';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';

type Props = {};

const UserDetails = (props: Props) => {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="py-1 flex flex-row gap-2">
        <div className="text-2xl">Loading...</div>
        <div className="flex flex-col text-sm gap-1 p-1">
          <div>{`tokens: ?`}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="py-1 flex flex-row gap-2">
      <div className="text-2xl">{user?.name}</div>
      <div className="flex flex-col text-[10px] gap-1 py-2">
        <div className="text-sm font-bold">{`tokens: ${user?.subscriptionTokens}`}</div>
        <div>{`GPT tokens: ${user?.subscriptionGptTokens}`}</div>
        <div>{`Model tokens: ${user?.subscriptionModelTokens}`}</div>
        <div>{`API Credit: ${user?.apiCredit}`}</div>
      </div>
    </div>
  );
};

export default UserDetails;
