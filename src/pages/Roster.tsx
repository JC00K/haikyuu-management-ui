import React from 'react';
import { ThemeProvider } from '../theme/ThemeProvider';

type Player = {
  id: string;
  name: string;
  position: string;
  height?: number;
  school?: string;
  jersey?: string;
  imgUrl?: string;
};

// Mock roster pool (in real app, this would come from API)
const rosterPool: Player[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `p${i+1}`,
  name: ['Hinata','Kageyama','Nishinoya','Tsukishima','Yamaguchi','Tanaka','Suga',' Asahi'][i % 8] + ' ' + ((i%9)+1),
  position: ['S','MB','OH','L','OP'][i % 5],
  height: 170 + i,
  school: 'Karasuno',
  jersey: (i+1).toString(),
  imgUrl: '',
}));

type Slot = 'SETTER' | 'MB1' | 'MB2' | 'OH1' | 'OH2' | 'L';

const SLOT_ORDER: Slot[] = ['SETTER','MB1','MB2','OH1','OH2','L'];

export const Roster: React.FC = () => {
  // lineup state stores ids for 6 slots based on appearance order, initialized to first 6 from rosterPool
  const [lineup, setLineup] = React.useState<string[]>([]);
  // track selected lineup card for swap
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  // localStorage persistence key
  const storageKey = 'roster_lineup_default';

  React.useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as string[];
        if (parsed.length === SLOT_ORDER.length) {
          setLineup(parsed);
          return;
        }
      } catch {}
    }
    // default: first 6
    setLineup(rosterPool.slice(0, SLOT_ORDER.length).map(p => p.id));
  }, []);

  React.useEffect(() => {
    if (lineup.length === SLOT_ORDER.length) {
      localStorage.setItem(storageKey, JSON.stringify(lineup));
    }
  }, [lineup]);

  const byId = (id: string) => rosterPool.find(p => p.id === id)!;

  // swap two lineup indices
  const swapLineup = (i: number, j: number) => {
    setLineup((arr) => {
      const next = arr.slice();
      const tmp = next[i];
      next[i] = next[j];
      next[j] = tmp;
      return next;
    });
  };

  // handle click on lineup card
  const onCardClick = (idx: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(idx);
    } else if (selectedIndex === idx) {
      setSelectedIndex(null);
    } else {
      swapLineup(selectedIndex, idx);
      setSelectedIndex(null);
    }
  };

  // insert from pool into first available lineup slot
  const insertFromPool = (poolIndex: number) => {
    if (lineup.length !== SLOT_ORDER.length) return;
    const playerId = rosterPool[poolIndex].id;
    // find first empty slot – in this MVP lineup has fixed size; replace the last if needed
    const lastSlotIndex = SLOT_ORDER.length - 1;
    // If already in lineup, do nothing
    if (lineup.includes(playerId)) return;
    const next = lineup.slice();
    // replace last slot with this player
    next[lastSlotIndex] = playerId;
    setLineup(next);
  };

  const counts = {
    setter: lineup.filter((id) => byId(id as string).position === 'S').length,
    mb: lineup.filter((id) => byId(id).position === 'MB').length,
    oh: lineup.filter((id) => byId(id).position === 'OH').length,
  };

  return (
    <ThemeProvider>
      <div style={{ padding: 20 }} aria-label="Roster Page">
        <h2 style={{ marginBottom: 12 }}>Roster Lineup</h2>
        <div className="card" style={{ padding: 12, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Formation: 1 Setter • 2 MB • 2 OH • 1 L</div>
            <div style={{ fontSize: 12, color: '#ccc' }}>
              Setter: {counts.setter} / 1 • MBs: {counts.mb}/2 • OHs: {counts.oh}/2
            </div>
          </div>
        </div>

        {/* Court visualization */}
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, alignItems: 'center' }} aria-label="Lineup slots">
            {SLOT_ORDER.map((slot, idx) => {
              const pid = lineup[idx];
              const selected = selectedIndex === idx;
              return (
                <div key={idx} role="button" aria-label={`slot-${slot}`} tabIndex={0}
                  onClick={() => onCardClick(idx)}
                  style={{
                    height: 120,
                    borderRadius: 8,
                    border: `1px solid ${selected ? '#fff' : '#555'}`,
                    background: '#2a2a2a',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 6,
                    boxShadow: selected ? '0 0 0 3px rgba(255,255,255,0.15)' : 'none',
                  }}
                >
                  <div style={{ fontSize: 12, color: '#ccc' }}>{slot}</div>
                  {pid ? (
                    <div style={{ marginTop: 6, textAlign: 'center' }}>
                      <strong style={{ fontSize: 12 }}>{byId(pid).name.split(' ')[0]}</strong>
                      <div style={{ fontSize: 11, color: '#bbb' }}>{byId(pid).position} #{byId(pid).jersey}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 12, color: '#888' }}>Empty</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pool grid for quick swaps (MVP: click to insert or swap) */}
        <div className="section-title" style={{ marginTop: 8, marginBottom: 8 }}>Roster Pool</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {rosterPool.map((p, i) => (
            <div key={p.id} className="card" style={{ padding: 8, cursor: 'pointer' }} onClick={() => insertFromPool(i)}>
              <div style={{ height: 72, borderRadius: 6, background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>🏐</span>
              </div>
              <div style={{ marginTop: 6, fontSize: 12, textAlign: 'center' }}>{p.name.split(' ')[0]}</div>
              <div style={{ fontSize: 11, color: '#aaa', textAlign: 'center' }}>{p.position}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button className="btn" onClick={() => { localStorage.removeItem(storageKey); window.location.reload(); }}>Reset lineup</button>
          <button className="btn secondary" onClick={() => alert('Save is automatic on each change in MVP')}>Save lineup</button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Roster;
