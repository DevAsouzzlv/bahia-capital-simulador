import React from 'react';
import { AtivoDetalhesClient } from '@/components/AtivoDetalhesClient';

export function generateStaticParams() {
  return [
    { ticker: 'PETR4' },
    { ticker: 'VALE3' },
    { ticker: 'ITUB4' },
    { ticker: 'WEGE3' },
    { ticker: 'BBAS3' },
    { ticker: 'BBDC4' },
    { ticker: 'BTC' },
    { ticker: 'ETH' },
    { ticker: 'SOL' },
    { ticker: 'ADA' },
  ];
}

export default function Page({ params }: { params: { ticker: string } }) {
  return <AtivoDetalhesClient ticker={params.ticker} />;
}
