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
import InvestorSection from '@/components/InvestorSection';
import InvestorModal from '@/components/InvestorModal';
import TeamModal from '@/components/TeamModal';

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [investorModalOpen, setInvestorModalOpen] = useState(false);
  const [teamMemberIndex, setTeamMemberIndex] = useState<number | null>(null);

  return (
    <SmoothScroll>
      <main>
        <Header
          visible={headerVisible}
          onInvestorClick={() => setInvestorModalOpen(true)}
        />
        <div style={{ position: 'relative', zIndex: 10, marginBottom: '-100vh' }}>
          <LoadingSequence onComplete={() => setHeaderVisible(true)} />
        </div>
        <div style={{ position: 'relative', zIndex: 2, marginBottom: '-100vh' }}>
          <AllentownSection />
        </div>
        <div style={{ position: 'relative', zIndex: 3, marginBottom: '-100vh' }}>
          <ContestSection />
        </div>
        <div style={{ position: 'relative', zIndex: 4, marginBottom: '-100vh' }}>
          <ContestantsSection />
        </div>
        <div style={{ position: 'relative', zIndex: 5, marginBottom: '-100vh' }}>
          <TimelineSection />
        </div>
        <div style={{ position: 'relative', zIndex: 6, marginBottom: '-100vh' }}>
          <FilmSection />
        </div>
        <div style={{ position: 'relative', zIndex: 7 }}>
          <DirectorSection />
        </div>
        <TeamSection onMemberClick={(i) => setTeamMemberIndex(i)} />
        <Footer />
        <InvestorSection />
      </main>
      <InvestorModal
        open={investorModalOpen}
        onClose={() => setInvestorModalOpen(false)}
      />
      <TeamModal
        memberIndex={teamMemberIndex}
        onClose={() => setTeamMemberIndex(null)}
      />
    </SmoothScroll>
  );
}
