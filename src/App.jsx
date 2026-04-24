import React, { useState, useEffect, useRef } from 'react';
import { Dumbbell, Play, Pause, RotateCcw, Check, ChevronRight, ChevronDown, TrendingUp, Calendar, Flame, Target, BarChart3, Clock, Zap, Award, Download, Upload, Shield } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WORKOUT_PLAN = {
  mon: {
    day: 'DAY 1',
    title: '팔 집중 A',
    subtitle: 'ARMS — BICEPS & TRICEPS',
    priority: 1,
    color: '#f97316',
    icon: '💪',
    cardio: '저녁 달리기 20-30분',
    exercises: [
      { id: 'd1-1', name: '클로즈그립 덤벨 프레스', sets: 4, reps: '8-10', muscle: '삼두', tip: '덤벨 두 개를 가슴 위에서 나란히 붙이고 팔꿈치 몸통에 붙인 채 수직으로 밀어올립니다. 삼두 장두 자극 + 웜업 겸용.' },
      { id: 'd1-2', name: '인클라인 덤벨 컬', sets: 4, reps: '10-12', muscle: '이두 장두', tip: '벤치 45-60도, 팔을 완전히 늘어뜨린 상태에서 컬. 이두 장두가 최대 신장되는 황금 자세, 반동 절대 금지.' },
      { id: 'd1-3', name: '라잉 트라이셉스 익스텐션', sets: 4, reps: '10-12', muscle: '삼두', tip: '플랫벤치 누워서 덤벨을 이마 뒤쪽으로 내림, 팔꿈치 위치 고정. 내릴 때 3초, 올릴 때 1초.' },
      { id: 'd1-4', name: '해머 컬', sets: 3, reps: '10-12', muscle: '상완근', tip: '손바닥이 서로 마주보게 잡고 컬. 상완근과 전완근 개입, 팔뚝 두께 키우는 핵심.' },
      { id: 'd1-5', name: '시티드 오버헤드 삼두 익스텐션', sets: 3, reps: '12-15', muscle: '삼두 장두', tip: '인클라인 벤치에 앉아 양손으로 덤벨 하나 잡고 머리 뒤로 내림. 삼두 장두 최대 신장, 팔꿈치 벌어지지 않게 귀 옆 고정.' },
      { id: 'd1-6', name: '컨센트레이션 컬', sets: 3, reps: '12-15', muscle: '이두 피크', tip: '벤치 끝에 앉아 팔꿈치를 허벅지 안쪽에 고정하고 컬. 이두 피크 집중 자극, 천천히.' },
      { id: 'd1-7', name: '덤벨 킥백', sets: 3, reps: '15', muscle: '삼두 외측', tip: '한 손으로 벤치 짚고 상체 수평, 팔꿈치를 몸통 높이로 고정하고 뒤로 폄. 가벼운 무게로 수축 집중.' },
    ],
  },
  tue: {
    day: 'DAY 2',
    title: '하체 + 복근',
    subtitle: 'LEGS & CORE',
    priority: 6,
    color: '#84cc16',
    icon: '🦵',
    cardio: null,
    exercises: [
      { id: 'd2-1', name: '고블릿 스쿼트', sets: 4, reps: '10', muscle: '대퇴사두', tip: '덤벨 하나를 가슴 앞에 수직으로 잡고 스쿼트. 상체 각도 유지 쉬움, 대퇴가 바닥과 평행 이하까지 내려가기.' },
      { id: 'd2-2', name: '불가리안 스플릿 스쿼트', sets: 4, reps: '10/side', muscle: '대퇴사두', tip: '뒷발을 벤치에 올리고 앞다리로만 스쿼트, 덤벨 양손. 허벅지 굵은 체형일수록 대퇴사두 직타, 무릎이 발끝 넘어가도 괜찮음.' },
      { id: 'd2-3', name: '덤벨 루마니안 데드리프트', sets: 4, reps: '10-12', muscle: '햄스트링', tip: '덤벨을 허벅지 앞에 잡고 무릎 살짝 굽힌 채 엉덩이 뒤로 빼며 하강. 햄스트링 당김 느낄 때까지, 허리 아치 유지.' },
      { id: 'd2-4', name: '워킹 런지', sets: 3, reps: '12/side', muscle: '대퇴/둔근', tip: '덤벨 양손, 앞으로 걸으며 런지. 무릎이 바닥 닿기 직전까지, 상체 직립.' },
      { id: 'd2-5', name: '덤벨 카프 레이즈', sets: 4, reps: '15-20', muscle: '종아리', tip: '덤벨 양손, 계단이나 플레이트 위에서 뒤꿈치 최대한 내렸다가 끝까지 올림. 정점에서 1초 정지.' },
      { id: 'd2-6', name: '디클라인 웨이티드 크런치', sets: 3, reps: '15', muscle: '상복부', tip: '벤치 각도 낮춰 발 걸고 덤벨 가슴에 안고 크런치. 상복부 집중.' },
      { id: 'd2-7', name: '러시안 트위스트', sets: 3, reps: '20', muscle: '복사근', tip: '벤치 끝 앉아 발 들고 덤벨 좌우로 회전. 복사근, 반동 말고 컨트롤.' },
    ],
  },
  wed: {
    day: 'DAY 3',
    title: '어깨 + 등',
    subtitle: 'SHOULDERS & BACK',
    priority: 2,
    color: '#06b6d4',
    icon: '🎯',
    cardio: null,
    exercises: [
      { id: 'd3-1', name: '시티드 덤벨 숄더프레스', sets: 4, reps: '8-10', muscle: '전면/측면 삼각', tip: '인클라인 벤치 등받이 85-90도, 덤벨을 귀 옆에서 수직으로 밀어올림. 전면+측면 삼각근 메인, 팔꿈치 완전히 잠그지 않기.' },
      { id: 'd3-2', name: '원암 덤벨 로우', sets: 4, reps: '10/side', muscle: '광배', tip: '한 손/한 무릎 벤치 위, 반대손으로 덤벨을 골반 방향으로 당김. 팔꿈치 몸통에 붙여 당기고 등으로 조이기.' },
      { id: 'd3-3', name: '사이드 래터럴 레이즈', sets: 4, reps: '12-15', muscle: '측면 삼각', tip: '팔꿈치 살짝 굽히고 양옆으로 어깨 높이까지. 새끼손가락이 살짝 위로 향하게, 무게는 가볍게.' },
      { id: 'd3-4', name: '인클라인 체스트 서포티드 로우', sets: 3, reps: '10-12', muscle: '광배/능형근', tip: '인클라인 벤치에 엎드려 덤벨 양손으로 당김. 반동 차단되어 광배/능형근에 순수 자극.' },
      { id: 'd3-5', name: '인클라인 리어 델트 플라이', sets: 4, reps: '12-15', muscle: '후면 삼각', tip: '인클라인에 엎드려 덤벨을 양옆으로 벌림. 후면삼각근 직타, 엄지 아래로 향하게.' },
      { id: 'd3-6', name: '덤벨 슈러그', sets: 3, reps: '12-15', muscle: '승모', tip: '덤벨 양손으로 들고 어깨만 귀 쪽으로 들어올림. 회전 금지, 상승+정점 1초.' },
      { id: 'd3-7', name: '사이드 레이즈 드롭셋', sets: 1, reps: 'to failure', muscle: '측면 삼각', tip: '무거운 무게로 실패까지 → 바로 가벼운 무게로 실패까지 → 한 번 더. 어깨 마무리 펌핑.' },
    ],
  },
  thu: {
    day: 'DAY 4',
    title: '팔 집중 B',
    subtitle: 'ARMS — VARIATION',
    priority: 1,
    color: '#f97316',
    icon: '💪',
    cardio: '저녁 달리기 20-30분',
    exercises: [
      { id: 'd4-1', name: '스컬크러셔', sets: 4, reps: '10-12', muscle: '삼두', tip: '플랫 누워 덤벨 양손, 팔꿈치 고정하고 이마 양옆으로 내림. Day 1 라잉 익스텐션과 각도 변주.' },
      { id: 'd4-2', name: '덤벨 컬 (스탠딩)', sets: 4, reps: '10-12', muscle: '이두', tip: '서서 양손 동시 컬, 팔꿈치 고정. 기본 빌더, 반동 없이 풀 가동범위.' },
      { id: 'd4-3', name: '클로즈그립 덤벨 프레스', sets: 3, reps: '10', muscle: '삼두', tip: 'Day 1과 동일, 볼륨 추가. 삼두 복합 자극.' },
      { id: 'd4-4', name: '스파이더 컬', sets: 3, reps: '12', muscle: '이두 단두', tip: '인클라인 벤치에 엎드려 팔을 아래로 늘어뜨리고 컬. 이두 단두 집중, 정점 수축 극대화.' },
      { id: 'd4-5', name: '덤벨 킥백', sets: 3, reps: '12-15', muscle: '삼두 외측', tip: 'Day 1과 동일, 삼두 외측두 마무리.' },
      { id: 'd4-6', name: '해머 컬', sets: 3, reps: '12', muscle: '상완근', tip: 'Day 1과 동일, 상완근 볼륨 확보.' },
      { id: 'd4-7', name: '오버헤드 삼두 익스텐션', sets: 3, reps: '15', muscle: '삼두 장두', tip: '시티드 버전, 고반복 펌핑으로 마무리.' },
    ],
  },
  fri: {
    day: 'DAY 5',
    title: '가슴 + 복근',
    subtitle: 'CHEST & CORE',
    priority: 5,
    color: '#ec4899',
    icon: '🔥',
    cardio: null,
    exercises: [
      { id: 'd5-1', name: '인클라인 덤벨 프레스', sets: 4, reps: '8-10', muscle: '상부 가슴', tip: '벤치 30도(45도 넘으면 어깨 개입 커짐), 덤벨을 가슴 상부 방향으로 밀어올림. 상부 가슴 메인.' },
      { id: 'd5-2', name: '플랫 덤벨 프레스', sets: 4, reps: '10', muscle: '중부 가슴', tip: '플랫에 누워 덤벨 수직으로 밀기. 중부 가슴, 내릴 때 가슴 바깥쪽까지 스트레치.' },
      { id: 'd5-3', name: '인클라인 덤벨 플라이', sets: 3, reps: '12', muscle: '상부 가슴', tip: '인클라인 누워 팔꿈치 살짝 굽힌 채 양옆으로 벌렸다 모음. 가슴 신장 자극, 무리한 하강 금지.' },
      { id: 'd5-4', name: '덤벨 풀오버', sets: 3, reps: '12', muscle: '가슴/광배', tip: '플랫에 어깨만 걸치고 덤벨 하나를 머리 뒤로 호를 그리며 내림. 가슴+광배+전거근 동시 자극.' },
      { id: 'd5-5', name: '프론트 레이즈', sets: 3, reps: '12', muscle: '전면 삼각', tip: '덤벨을 어깨 높이까지 앞으로 들어올림. 전면삼각근 보조, 가볍게.' },
      { id: 'd5-6', name: '벤치 레그레이즈', sets: 3, reps: '15', muscle: '하복부', tip: '플랫에 누워 손으로 벤치 끝 잡고 다리를 수직까지 들어올림. 하복부 집중, 허리 뜨지 않게.' },
      { id: 'd5-7', name: '덤벨 사이드 벤드', sets: 3, reps: '15/side', muscle: '복사근', tip: '한 손에 덤벨 잡고 옆구리 기울였다 복귀. 복사근, 한쪽씩.' },
    ],
  },
  sat: { day: 'REST', title: '선택적 LISS', subtitle: 'LIGHT CARDIO OR REST', priority: 0, color: '#64748b', icon: '🏃', cardio: '가벼운 LISS 달리기 30-40분 (선택)', exercises: [], rest: true },
  sun: { day: 'REST', title: '완전 휴식', subtitle: 'SABBATH', priority: 0, color: '#64748b', icon: '🙏', cardio: null, exercises: [], rest: true },
};

const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_LABELS_KR = { mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토', sun: '일' };

const STORAGE_KEYS = {
  sessions: 'hicon-all-sessions',
  weights: 'hicon-last-weights',
  session: (d) => `hicon-session-${d}`,
};

const getTodayKey = () => {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[new Date().getDay()];
};
const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};
const getDateKey = (date = new Date()) => date.toISOString().split('T')[0];

// Safe localStorage wrapper
const storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
};

export default function App() {
  const [view, setView] = useState('today');
  const [selectedDay, setSelectedDay] = useState(getTodayKey());
  const [sessionData, setSessionData] = useState({});
  const [allSessions, setAllSessions] = useState({});
  const [lastWeights, setLastWeights] = useState({});
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState(90);
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [streak, setStreak] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const sessions = storage.get(STORAGE_KEYS.sessions) || {};
    setAllSessions(sessions);
    calculateStreak(sessions);
    const weights = storage.get(STORAGE_KEYS.weights) || {};
    setLastWeights(weights);
    const today = storage.get(STORAGE_KEYS.session(getDateKey())) || {};
    setSessionData(today);
  }, []);

  const calculateStreak = (sessions) => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = getDateKey(d);
      if (d.getDay() === 0) continue;
      if (sessions[key] && sessions[key].completed) count++;
      else if (i > 0) break;
    }
    setStreak(count);
  };

  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((s) => {
          if (s <= 1) {
            setTimerRunning(false);
            playBeep();
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [timerRunning, timerSeconds]);

  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const beep = (freq, delay) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
          osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5);
        }, delay);
      };
      beep(880, 0); beep(1200, 200);
    } catch {}
  };

  const startTimer = (s) => { setTimerSeconds(s); setTimerRunning(true); setTimerPreset(s); };
  const toggleTimer = () => setTimerRunning(!timerRunning);
  const resetTimer = () => { setTimerRunning(false); setTimerSeconds(timerPreset); };

  const updateSet = (exerciseId, setIndex, field, value) => {
    const newData = {
      ...sessionData,
      [exerciseId]: {
        ...sessionData[exerciseId],
        sets: {
          ...(sessionData[exerciseId]?.sets || {}),
          [setIndex]: { ...(sessionData[exerciseId]?.sets?.[setIndex] || {}), [field]: value },
        },
      },
    };
    setSessionData(newData);
    storage.set(STORAGE_KEYS.session(getDateKey()), newData);
  };

  const toggleSetComplete = (exerciseId, setIndex) => {
    const current = sessionData[exerciseId]?.sets?.[setIndex]?.done || false;
    updateSet(exerciseId, setIndex, 'done', !current);
    if (!current) {
      startTimer(timerPreset);
      const weight = sessionData[exerciseId]?.sets?.[setIndex]?.weight;
      if (weight) {
        const newLastWeights = { ...lastWeights, [exerciseId]: weight };
        setLastWeights(newLastWeights);
        storage.set(STORAGE_KEYS.weights, newLastWeights);
      }
    }
  };

  const completeWorkout = () => {
    const todayKey = getDateKey();
    const today = new Date();
    const dayKey = getTodayKey();
    const plan = WORKOUT_PLAN[dayKey];
    if (plan.rest) return;
    const totalVolume = calculateSessionVolume(sessionData, plan);
    const completedSets = countCompletedSets(sessionData);
    const newAllSessions = {
      ...allSessions,
      [todayKey]: {
        completed: true, dayKey, date: todayKey,
        volume: totalVolume, sets: completedSets, data: sessionData,
        week: getWeekNumber(today), year: today.getFullYear(),
      },
    };
    setAllSessions(newAllSessions);
    storage.set(STORAGE_KEYS.sessions, newAllSessions);
    calculateStreak(newAllSessions);
    setShowCompletionModal(true);
  };

  const calculateSessionVolume = (data, plan) => {
    let total = 0;
    plan.exercises.forEach((ex) => {
      const setData = data[ex.id]?.sets || {};
      Object.values(setData).forEach((s) => {
        if (s.done && s.weight && s.reps) total += parseFloat(s.weight) * parseInt(s.reps);
      });
    });
    return total;
  };

  const countCompletedSets = (data) => {
    let count = 0;
    Object.values(data).forEach((ex) => {
      if (ex.sets) Object.values(ex.sets).forEach((s) => { if (s.done) count++; });
    });
    return count;
  };

  const getWeeklyVolumeData = () => {
    const weeks = {};
    Object.values(allSessions).forEach((s) => {
      if (s.completed) {
        const k = `W${s.week}`;
        if (!weeks[k]) weeks[k] = { week: k, volume: 0, sessions: 0 };
        weeks[k].volume += s.volume; weeks[k].sessions += 1;
      }
    });
    return Object.values(weeks).slice(-8);
  };

  const getMuscleGroupVolume = () => {
    const groups = { '팔': 0, '어깨': 0, '가슴': 0, '등': 0, '하체': 0, '복근': 0 };
    const groupMap = { mon: '팔', thu: '팔', wed: '어깨', fri: '가슴', tue: '하체' };
    Object.values(allSessions).forEach((s) => {
      if (s.completed && groupMap[s.dayKey]) groups[groupMap[s.dayKey]] += s.volume;
    });
    return Object.entries(groups).map(([name, volume]) => ({ name, volume: Math.round(volume) }));
  };

  const getArmProgressData = () => {
    return Object.values(allSessions)
      .filter(s => s.completed && (s.dayKey === 'mon' || s.dayKey === 'thu'))
      .sort((a, b) => a.date.localeCompare(b.date)).slice(-12)
      .map(s => ({ date: s.date.slice(5), volume: Math.round(s.volume), day: s.dayKey === 'mon' ? 'A' : 'B' }));
  };

  const exportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      version: 1,
      sessions: allSessions,
      lastWeights: lastWeights,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hicon-workout-backup-${getDateKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.sessions) { setAllSessions(data.sessions); storage.set(STORAGE_KEYS.sessions, data.sessions); calculateStreak(data.sessions); }
        if (data.lastWeights) { setLastWeights(data.lastWeights); storage.set(STORAGE_KEYS.weights, data.lastWeights); }
        alert('백업 복원 완료');
      } catch { alert('파일을 읽을 수 없습니다'); }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (!confirm('모든 운동 기록을 삭제하시겠습니까? 되돌릴 수 없습니다.')) return;
    Object.keys(localStorage).filter(k => k.startsWith('hicon-')).forEach(k => localStorage.removeItem(k));
    setAllSessions({}); setLastWeights({}); setSessionData({}); setStreak(0);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const plan = WORKOUT_PLAN[selectedDay];
  const isToday = selectedDay === getTodayKey();
  const todayPlan = WORKOUT_PLAN[getTodayKey()];
  const totalSets = plan.exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSetsCount = plan.exercises.reduce((sum, ex) => {
    const sets = sessionData[ex.id]?.sets || {};
    return sum + Object.values(sets).filter(s => s.done).length;
  }, 0);
  const progressPct = totalSets > 0 ? (completedSetsCount / totalSets) * 100 : 0;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}>
      <header className="border-b-2 border-stone-800 bg-stone-950 sticky top-0 z-40 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-500 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-stone-950" strokeWidth={3} />
            </div>
            <div>
              <div className="text-xs text-stone-500 tracking-widest">HICON BOY</div>
              <div className="text-sm font-bold tracking-wider">WORKOUT.OS</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-2 text-stone-400">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-bold text-orange-500">{streak}</span>
              <span className="text-stone-500">STREAK</span>
            </div>
            <div className="text-stone-500 tracking-wider">
              {new Date().toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short' })}
            </div>
            <button onClick={() => setShowSettings(true)} className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-orange-500">
              <Shield className="w-4 h-4" />
            </button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-4 flex">
          {[
            { id: 'today', label: 'TODAY', icon: Target },
            { id: 'week', label: 'WEEK', icon: Calendar },
            { id: 'stats', label: 'STATS', icon: BarChart3 },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setView(id); if (id === 'today') setSelectedDay(getTodayKey()); }}
              className={`flex items-center gap-2 px-4 py-2 text-xs tracking-widest transition-all border-b-2 ${view === id ? 'text-orange-500 border-orange-500' : 'text-stone-500 border-transparent hover:text-stone-300'}`}>
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 pb-40">
        {view === 'today' && (
          <div className="space-y-4">
            <div className="border-2 border-stone-800 bg-gradient-to-br from-stone-900 to-stone-950 p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ background: `radial-gradient(circle, ${plan.color}, transparent)` }} />
              <div className="flex items-start justify-between relative">
                <div>
                  <div className="flex items-center gap-2 text-xs tracking-widest text-stone-500 mb-2">
                    <span style={{ color: plan.color }}>● {plan.day}</span>
                    {plan.priority > 0 && <span>· PRIORITY {plan.priority}</span>}
                  </div>
                  <h1 className="text-3xl font-black tracking-tight mb-1">{plan.title}</h1>
                  <div className="text-xs text-stone-500 tracking-widest">{plan.subtitle}</div>
                  {plan.cardio && (
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-stone-400 border border-stone-800 px-2 py-1">
                      <Zap className="w-3 h-3 text-lime-500" />{plan.cardio}
                    </div>
                  )}
                </div>
                <div className="text-5xl opacity-50">{plan.icon}</div>
              </div>
              {!plan.rest && (
                <>
                  <div className="mt-5 flex items-center gap-3 text-xs">
                    <div className="flex-1 h-2 bg-stone-800 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 transition-all" style={{ width: `${progressPct}%`, background: plan.color }} />
                    </div>
                    <div className="font-bold tabular-nums">{completedSetsCount}<span className="text-stone-500">/{totalSets}</span></div>
                  </div>
                  {progressPct === 100 && !allSessions[getDateKey()]?.completed && isToday && (
                    <button onClick={completeWorkout} className="mt-4 w-full bg-orange-500 text-stone-950 py-3 font-bold tracking-widest text-sm hover:bg-orange-400 flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" strokeWidth={3} />FINISH WORKOUT
                    </button>
                  )}
                  {allSessions[getDateKey()]?.completed && isToday && (
                    <div className="mt-4 border border-lime-500/30 bg-lime-500/5 py-3 text-center text-lime-500 text-xs tracking-widest font-bold flex items-center justify-center gap-2">
                      <Award className="w-4 h-4" />COMPLETED · VOL {Math.round(allSessions[getDateKey()].volume)}kg
                    </div>
                  )}
                </>
              )}
            </div>

            {plan.rest && (
              <div className="border-2 border-stone-800 p-8 text-center">
                <div className="text-6xl mb-3">{plan.icon}</div>
                <div className="text-stone-400 text-sm tracking-wider mb-1">{plan.title}</div>
                {plan.cardio && <div className="text-xs text-stone-500 mt-2">{plan.cardio}</div>}
                <div className="text-xs text-stone-600 mt-4 italic">
                  {selectedDay === 'sun' ? '"수고했으니 안식하리라" — 주일은 완전한 회복' : '회복도 훈련의 일부'}
                </div>
              </div>
            )}

            {!plan.rest && plan.exercises.map((ex, idx) => {
              const setData = sessionData[ex.id]?.sets || {};
              const doneCount = Object.values(setData).filter(s => s.done).length;
              const isExpanded = expandedExercise === ex.id;
              const lastWeight = lastWeights[ex.id];
              return (
                <div key={ex.id} className={`border-2 transition-all ${doneCount === ex.sets ? 'border-lime-500/30 bg-lime-500/5' : 'border-stone-800 bg-stone-900/50'}`}>
                  <button onClick={() => setExpandedExercise(isExpanded ? null : ex.id)} className="w-full p-4 flex items-center gap-3 text-left">
                    <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold tabular-nums flex-shrink-0 ${doneCount === ex.sets ? 'bg-lime-500 text-stone-950' : 'bg-stone-800 text-stone-400'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <div className="font-bold text-sm">{ex.name}</div>
                        <div className="text-xs text-stone-500">[{ex.muscle}]</div>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5 tabular-nums">
                        {ex.sets} × {ex.reps}
                        {lastWeight && <span className="ml-2 text-orange-500/70">· last {lastWeight}kg</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-xs tabular-nums text-stone-400">{doneCount}/{ex.sets}</div>
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="border-t border-stone-800 p-4 space-y-3">
                      <div className="text-xs text-stone-400 bg-stone-900 border-l-2 border-orange-500 pl-3 py-2 leading-relaxed">
                        <span className="text-orange-500 font-bold mr-1">TIP</span>{ex.tip}
                      </div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 text-[10px] text-stone-500 tracking-widest px-1">
                          <div className="w-8">SET</div><div>WEIGHT (kg)</div><div>REPS</div><div className="w-10 text-center">DONE</div>
                        </div>
                        {Array.from({ length: ex.sets }).map((_, setIdx) => {
                          const set = setData[setIdx] || {};
                          return (
                            <div key={setIdx} className={`grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center ${set.done ? 'opacity-60' : ''}`}>
                              <div className="w-8 text-xs font-bold text-stone-400 tabular-nums">{setIdx + 1}</div>
                              <input type="number" inputMode="decimal" step="0.5" value={set.weight || ''} onChange={(e) => updateSet(ex.id, setIdx, 'weight', e.target.value)} placeholder={lastWeight ? String(lastWeight) : '0'} className="bg-stone-900 border border-stone-800 px-2 py-1.5 text-sm font-bold tabular-nums focus:border-orange-500 focus:outline-none" />
                              <input type="number" inputMode="numeric" value={set.reps || ''} onChange={(e) => updateSet(ex.id, setIdx, 'reps', e.target.value)} placeholder="0" className="bg-stone-900 border border-stone-800 px-2 py-1.5 text-sm font-bold tabular-nums focus:border-orange-500 focus:outline-none" />
                              <button onClick={() => toggleSetComplete(ex.id, setIdx)} className={`w-10 h-9 flex items-center justify-center transition-all ${set.done ? 'bg-lime-500 text-stone-950' : 'bg-stone-800 text-stone-600 hover:bg-stone-700'}`}>
                                {set.done ? <Check className="w-4 h-4" strokeWidth={3} /> : <div className="w-3 h-3 border-2 border-current rounded-full" />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => startTimer(60)} className="flex-1 text-xs py-2 bg-stone-800 hover:bg-stone-700 tracking-wider">REST 1:00</button>
                        <button onClick={() => startTimer(90)} className="flex-1 text-xs py-2 bg-stone-800 hover:bg-stone-700 tracking-wider">REST 1:30</button>
                        <button onClick={() => startTimer(120)} className="flex-1 text-xs py-2 bg-stone-800 hover:bg-stone-700 tracking-wider">REST 2:00</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {view === 'week' && (
          <div className="space-y-3">
            <div className="text-xs text-stone-500 tracking-widest mb-4">WEEKLY SPLIT — 주5일 + 토요일 선택 + 주일 안식</div>
            {DAY_KEYS.map((key) => {
              const p = WORKOUT_PLAN[key];
              const isActiveToday = key === getTodayKey();
              return (
                <button key={key} onClick={() => { setSelectedDay(key); setView('today'); }} className={`w-full border-2 p-4 text-left transition-all ${isActiveToday ? 'border-orange-500' : 'border-stone-800 hover:border-stone-700'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 text-center">
                      <div className="text-2xl font-black" style={{ color: p.color }}>{DAY_LABELS_KR[key]}</div>
                      {isActiveToday && <div className="text-[9px] text-orange-500 tracking-widest">TODAY</div>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-stone-500 tracking-widest mb-1">
                        <span>{p.day}</span>{p.priority > 0 && <span>· P{p.priority}</span>}
                      </div>
                      <div className="font-bold">{p.title}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{p.subtitle}</div>
                      {p.cardio && <div className="text-xs text-lime-500/70 mt-1">+ {p.cardio}</div>}
                    </div>
                    <div className="text-2xl opacity-50">{p.icon}</div>
                  </div>
                </button>
              );
            })}
            <div className="mt-6 border-2 border-stone-800 p-5">
              <div className="text-xs tracking-widest text-orange-500 mb-3">KEY PRINCIPLES</div>
              <ul className="text-xs text-stone-400 space-y-2 leading-relaxed">
                <li>▸ 팔 주 2회 (월/목) · 사이 48시간 이상 확보</li>
                <li>▸ 본세트 전 웜업 50-60% 무게로 12-15회 1세트</li>
                <li>▸ 세트당 1-2 RIR · 실패 직전 1-2회 남기고 마무리</li>
                <li>▸ 복합운동 휴식 90-120초 · 단관절 60-75초</li>
                <li>▸ GLP-1 감량기 → 근량 보존 위해 무게보단 볼륨 유지</li>
                <li>▸ 클라이밍 일정과 충돌 시 웨이트 먼저, 최소 4시간 간격</li>
              </ul>
            </div>
          </div>
        )}

        {view === 'stats' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="border-2 border-stone-800 p-4">
                <div className="text-[10px] text-stone-500 tracking-widest mb-1">STREAK</div>
                <div className="text-2xl font-black text-orange-500 tabular-nums">{streak}</div>
                <div className="text-[10px] text-stone-600">days</div>
              </div>
              <div className="border-2 border-stone-800 p-4">
                <div className="text-[10px] text-stone-500 tracking-widest mb-1">SESSIONS</div>
                <div className="text-2xl font-black tabular-nums">{Object.values(allSessions).filter(s => s.completed).length}</div>
                <div className="text-[10px] text-stone-600">total</div>
              </div>
              <div className="border-2 border-stone-800 p-4">
                <div className="text-[10px] text-stone-500 tracking-widest mb-1">VOLUME</div>
                <div className="text-2xl font-black text-lime-500 tabular-nums">
                  {Math.round(Object.values(allSessions).filter(s => s.completed).reduce((s, x) => s + x.volume, 0) / 1000)}
                </div>
                <div className="text-[10px] text-stone-600">ton · kg×reps</div>
              </div>
            </div>
            <div className="border-2 border-stone-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs tracking-widest text-stone-400">WEEKLY VOLUME</div>
                <TrendingUp className="w-4 h-4 text-orange-500" />
              </div>
              {getWeeklyVolumeData().length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={getWeeklyVolumeData()}>
                    <CartesianGrid strokeDasharray="2 2" stroke="#292524" vertical={false} />
                    <XAxis dataKey="week" stroke="#78716c" style={{ fontSize: '10px' }} />
                    <YAxis stroke="#78716c" style={{ fontSize: '10px' }} />
                    <Tooltip contentStyle={{ background: '#0c0a09', border: '2px solid #292524', fontSize: '11px' }} />
                    <Bar dataKey="volume" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              ) : <div className="py-10 text-center text-xs text-stone-600 tracking-wider">데이터 수집 중...</div>}
            </div>
            <div className="border-2 border-stone-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs tracking-widest text-stone-400">ARM PROGRESSION (PRIORITY 1)</div>
                <div className="text-[10px] text-orange-500 tracking-widest">월/목</div>
              </div>
              {getArmProgressData().length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={getArmProgressData()}>
                    <CartesianGrid strokeDasharray="2 2" stroke="#292524" vertical={false} />
                    <XAxis dataKey="date" stroke="#78716c" style={{ fontSize: '10px' }} />
                    <YAxis stroke="#78716c" style={{ fontSize: '10px' }} />
                    <Tooltip contentStyle={{ background: '#0c0a09', border: '2px solid #292524', fontSize: '11px' }} />
                    <Line type="monotone" dataKey="volume" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : <div className="py-10 text-center text-xs text-stone-600 tracking-wider">팔 운동 기록 없음</div>}
            </div>
            <div className="border-2 border-stone-800 p-4">
              <div className="text-xs tracking-widest text-stone-400 mb-3">MUSCLE GROUP DISTRIBUTION</div>
              <div className="space-y-2">
                {getMuscleGroupVolume().map((g) => {
                  const max = Math.max(...getMuscleGroupVolume().map(x => x.volume), 1);
                  const pct = (g.volume / max) * 100;
                  return (
                    <div key={g.name} className="flex items-center gap-3">
                      <div className="w-12 text-xs text-stone-400">{g.name}</div>
                      <div className="flex-1 h-5 bg-stone-900 relative">
                        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-orange-400" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="w-16 text-xs text-right tabular-nums text-stone-400">{g.volume}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border-2 border-stone-800 p-4">
              <div className="text-xs tracking-widest text-stone-400 mb-3">RECENT SESSIONS</div>
              <div className="space-y-2">
                {Object.values(allSessions).filter(s => s.completed).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8).map((s) => {
                  const p = WORKOUT_PLAN[s.dayKey];
                  return (
                    <div key={s.date} className="flex items-center gap-3 text-xs border-l-2 pl-3 py-1" style={{ borderColor: p.color }}>
                      <div className="text-stone-500 tabular-nums">{s.date.slice(5)}</div>
                      <div className="flex-1 font-bold">{p.title}</div>
                      <div className="tabular-nums text-stone-400">{s.sets} sets</div>
                      <div className="tabular-nums text-orange-500">{Math.round(s.volume)}kg</div>
                    </div>
                  );
                })}
                {Object.values(allSessions).filter(s => s.completed).length === 0 && (
                  <div className="py-6 text-center text-xs text-stone-600">첫 세션을 완료해보세요</div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating timer */}
      <div className="fixed bottom-0 left-0 right-0 border-t-2 border-stone-800 bg-stone-950/95 backdrop-blur z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${timerRunning ? 'text-orange-500 animate-pulse' : 'text-stone-500'}`} />
              <div className={`text-2xl font-black tabular-nums ${timerSeconds > 0 && timerSeconds <= 10 ? 'text-red-500' : timerRunning ? 'text-orange-500' : 'text-stone-400'}`}>
                {formatTime(timerSeconds)}
              </div>
            </div>
            <div className="flex gap-1 flex-1 justify-center">
              {[60, 90, 120, 180].map(s => (
                <button key={s} onClick={() => startTimer(s)} className={`px-2 py-1 text-[10px] tracking-widest transition-all ${timerPreset === s ? 'bg-orange-500 text-stone-950' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'}`}>
                  {s < 60 ? `${s}s` : `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button onClick={toggleTimer} disabled={timerSeconds === 0} className="w-9 h-9 bg-orange-500 text-stone-950 flex items-center justify-center disabled:opacity-30 disabled:bg-stone-800 disabled:text-stone-600">
                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button onClick={resetTimer} className="w-9 h-9 bg-stone-800 text-stone-400 flex items-center justify-center hover:bg-stone-700">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings / Privacy modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-stone-950/90 backdrop-blur flex items-center justify-center z-[60] p-4" onClick={() => setShowSettings(false)}>
          <div className="border-2 border-stone-700 bg-stone-950 p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-500" />
                <div className="text-xs tracking-widest text-stone-400">PRIVACY & DATA</div>
              </div>
              <button onClick={() => setShowSettings(false)} className="text-stone-500 hover:text-stone-300 text-xl">×</button>
            </div>
            <div className="text-xs text-stone-400 leading-relaxed mb-5 bg-stone-900 border-l-2 border-lime-500 pl-3 py-2">
              모든 데이터는 이 폰의 브라우저에만 저장됩니다. 외부 서버로 전송되지 않으며, 결제·로그인·계정 정보를 일절 요구하지 않습니다.
            </div>
            <div className="space-y-2">
              <button onClick={exportData} className="w-full flex items-center gap-3 p-3 border border-stone-800 hover:border-orange-500 transition-colors text-left">
                <Download className="w-4 h-4 text-orange-500" />
                <div className="flex-1">
                  <div className="text-sm font-bold">백업 내보내기</div>
                  <div className="text-[10px] text-stone-500">JSON 파일로 다운로드</div>
                </div>
              </button>
              <label className="w-full flex items-center gap-3 p-3 border border-stone-800 hover:border-orange-500 transition-colors text-left cursor-pointer">
                <Upload className="w-4 h-4 text-orange-500" />
                <div className="flex-1">
                  <div className="text-sm font-bold">백업 복원</div>
                  <div className="text-[10px] text-stone-500">JSON 파일에서 불러오기</div>
                </div>
                <input type="file" accept="application/json" onChange={importData} className="hidden" />
              </label>
              <button onClick={clearAllData} className="w-full flex items-center gap-3 p-3 border border-red-900/50 hover:border-red-500 transition-colors text-left">
                <div className="w-4 h-4 flex items-center justify-center text-red-500">⚠</div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-red-500">모든 기록 삭제</div>
                  <div className="text-[10px] text-stone-500">되돌릴 수 없음</div>
                </div>
              </button>
            </div>
            <div className="mt-5 text-[10px] text-stone-600 leading-relaxed">
              ▸ 데이터 저장 위치: 이 브라우저의 localStorage<br/>
              ▸ 외부 통신: 없음 (오프라인 작동)<br/>
              ▸ 계정·결제: 요구하지 않음<br/>
              ▸ 백업 권장: 월 1회 JSON 내보내기
            </div>
          </div>
        </div>
      )}

      {showCompletionModal && (
        <div className="fixed inset-0 bg-stone-950/90 backdrop-blur flex items-center justify-center z-[60] p-4" onClick={() => setShowCompletionModal(false)}>
          <div className="border-2 border-orange-500 bg-stone-950 p-8 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-6xl mb-4">🔥</div>
            <div className="text-xs tracking-widest text-orange-500 mb-2">WORKOUT COMPLETE</div>
            <div className="text-2xl font-black mb-1">{todayPlan.title}</div>
            <div className="text-xs text-stone-500 mb-6">충성된 자가 많은 것을 맡으리라</div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border border-stone-800 p-3">
                <div className="text-[10px] text-stone-500 tracking-widest">SETS</div>
                <div className="text-xl font-black tabular-nums">{countCompletedSets(sessionData)}</div>
              </div>
              <div className="border border-stone-800 p-3">
                <div className="text-[10px] text-stone-500 tracking-widest">VOLUME</div>
                <div className="text-xl font-black tabular-nums text-orange-500">{Math.round(calculateSessionVolume(sessionData, todayPlan))}</div>
              </div>
            </div>
            <button onClick={() => setShowCompletionModal(false)} className="w-full bg-orange-500 text-stone-950 py-3 font-bold tracking-widest text-sm">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
