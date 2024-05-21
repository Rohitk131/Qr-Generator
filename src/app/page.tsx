'use client'
import dynamic from 'next/dynamic';

const BackgroundBoxesDemo = dynamic(() => import('../Components/background'), { ssr: false });

export default function Home() {
  return (
      <div>
        <BackgroundBoxesDemo />
      </div>
  );
}
