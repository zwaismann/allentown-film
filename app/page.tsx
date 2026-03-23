'use client';

import { useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingSequence from '@/components/LoadingSequence';
import Header from '@/components/Header';
import AllentownSection from '@/components/AllentownSection';
import ContestSection from '@/components/ContestSection';
import ContestantsSection from '@/components/ContestantsSection';
import TimelineSection from '@/components/TimelineSection';
import FilmSection from '@/components/FilmSection';
import DirectorSection from '@/components/DirectorSection';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false);

  return (
    <SmoothScroll>
      <main>
        <Header visible={headerVisible} />
        <LoadingSequence onComplete={() => setHeaderVisible(true)} />
        <AllentownSection />
        <ContestSection />
        <ContestantsSection />
        <TimelineSection />
        <FilmSection />
        <DirectorSection />
        <TeamSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
