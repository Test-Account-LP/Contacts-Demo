import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Clock, Trophy, MoreHorizontal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getTodaysPuzzle, loadResult, saveResult, formatTime, FRIEND_TIMES, type CrosswordResult } from '../utils/crosswordData';

interface Props { onBack: () => void; onPointsEarned: (pts: number) => void; }

type Tab = 'puzzle' | 'leaderboard';
type Dir = 'across' | 'down';

const BLACK = null;

export default function CrosswordScreen({ onBack, onPointsEarned }: Props) {
    const puzzle = getTodaysPuzzle();
    const existingResult = loadResult(puzzle.date);

    // Grid state: user's typed letters
    const [grid, setGrid] = useState<(string | null)[][]>(() => {
        if (existingResult?.completed) {
            return puzzle.solution.map(row => row.map(ans => ans === null ? null : ans));
        }
        return existingResult?.gridState || puzzle.solution.map(row => row.map(c => (c === null ? null : '')));
    });
    const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);
    const [dir, setDir] = useState<Dir>('across');
    const [errors, setErrors] = useState<boolean[][]>(() => puzzle.solution.map(row => row.map(() => false)));
    const [tab, setTab] = useState<Tab>('puzzle');
    const [completed, setCompleted] = useState(existingResult?.completed ?? false);
    const [solveMs, setSolveMs] = useState(existingResult?.solveMs ?? 0);
    const [elapsedMs, setElapsedMs] = useState(existingResult?.elapsedSaved ?? 0);
    const [hintsUsed, setHintsUsed] = useState(existingResult?.hintsUsed ?? 0);
    const [showMenu, setShowMenu] = useState(false);
    const leaderboardClicksRef = useRef(0);
    const startRef = useRef<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const isPlaying = startRef.current !== null || completed;

    const savePartialState = useCallback((newGrid: (string | null)[][], currentElapsed: number, currentHints: number = hintsUsed) => {
        if (!completed) {
            saveResult({
                date: puzzle.date,
                solveMs: 0,
                completed: false,
                startedAt: 0,
                gridState: newGrid,
                elapsedSaved: currentElapsed,
                hintsUsed: currentHints,
            });
        }
    }, [puzzle.date, completed, hintsUsed]);

    // Timer
    useEffect(() => {
        if (completed || !startRef.current) return;
        timerRef.current = setInterval(() => {
            if (startRef.current) setElapsedMs(Date.now() - startRef.current);
        }, 500);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [completed, isPlaying]);

    const startTimer = () => {
        if (!startRef.current) {
            startRef.current = Date.now() - elapsedMs;
            setElapsedMs(elapsedMs + 1); // Force immediate render for isPlaying
        }
    };

    const checkCompletion = useCallback((g: (string | null)[][]) => {
        const allFilledAndCorrect = puzzle.solution.every((row, r) =>
            row.every((ans, c) => ans === null || (g[r][c] && g[r][c]!.toUpperCase() === ans))
        );
        if (allFilledAndCorrect) {
            const elapsed = startRef.current ? Date.now() - startRef.current : 0;
            if (timerRef.current) clearInterval(timerRef.current);
            setSolveMs(elapsed);
            setCompleted(true);
            const result: CrosswordResult = { date: puzzle.date, solveMs: elapsed, completed: true, startedAt: startRef.current ?? Date.now(), hintsUsed };
            saveResult(result);
            onPointsEarned(50);
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.4 }, colors: ['#7c3aed', '#fbbf24', '#06b6d4'] });
        }
    }, [puzzle, onPointsEarned, hintsUsed]);

    const handleCheckPuzzle = () => {
        const errs: boolean[][] = puzzle.solution.map((row, r) =>
            row.map((ans, c) => {
                const val = grid[r][c];
                return ans !== null && val !== null && val !== '' && val.toUpperCase() !== ans;
            })
        );
        setErrors(errs);
        setShowMenu(false);
    };

    const handleRevealLetter = () => {
        if (!selected) return;
        const { r, c } = selected;
        const ans = puzzle.solution[r][c];
        if (!ans) return;
        const newG = grid.map(row => [...row]);
        newG[r][c] = ans;
        setGrid(newG);
        setHintsUsed(h => h + 1);
        savePartialState(newG, startRef.current ? Date.now() - startRef.current : elapsedMs, hintsUsed + 1);
        checkCompletion(newG);
        setShowMenu(false);
    };

    const handleGiveUp = () => {
        const solved = puzzle.solution.map(row => row.map(ans => ans === null ? null : ans));
        setGrid(solved);
        setErrors(solved.map(r => r.map(() => false)));
        if (timerRef.current) clearInterval(timerRef.current);
        const elapsed = startRef.current ? Date.now() - startRef.current : elapsedMs;
        setSolveMs(elapsed);
        setCompleted(true);
        saveResult({ date: puzzle.date, solveMs: elapsed, completed: true, startedAt: startRef.current ?? Date.now(), hintsUsed: hintsUsed + 1 });
        setShowMenu(false);
    };

    const handleCellClick = (r: number, c: number) => {
        if (puzzle.solution[r][c] === BLACK) return;
        startTimer();
        if (selected?.r === r && selected?.c === c) {
            setDir(d => d === 'across' ? 'down' : 'across');
        } else {
            setSelected({ r, c });
        }
    };

    const handleKey = useCallback((letter: string) => {
        if (!selected || completed) return;
        const { r, c } = selected;
        if (puzzle.solution[r][c] === BLACK) return;

        if (letter === 'BACK') {
            const newG = grid.map(row => [...row]);
            if (newG[r][c]) {
                newG[r][c] = '';
                setGrid(newG);
                if (errors[r][c]) {
                    const newE = errors.map(er => [...er]);
                    newE[r][c] = false;
                    setErrors(newE);
                }
                savePartialState(newG, startRef.current ? Date.now() - startRef.current : elapsedMs);
                return;
            }
            // move back
            if (dir === 'across' && c > 0 && puzzle.solution[r][c - 1] !== null) {
                setSelected({ r, c: c - 1 }); newG[r][c - 1] = ''; setGrid(newG);
                if (errors[r][c - 1]) {
                    const newE = errors.map(er => [...er]);
                    newE[r][c - 1] = false;
                    setErrors(newE);
                }
                savePartialState(newG, startRef.current ? Date.now() - startRef.current : elapsedMs);
            } else if (dir === 'down' && r > 0 && puzzle.solution[r - 1][c] !== null) {
                setSelected({ r: r - 1, c }); newG[r - 1][c] = ''; setGrid(newG);
                if (errors[r - 1][c]) {
                    const newE = errors.map(er => [...er]);
                    newE[r - 1][c] = false;
                    setErrors(newE);
                }
                savePartialState(newG, startRef.current ? Date.now() - startRef.current : elapsedMs);
            }
            return;
        }

        const newG = grid.map(row => [...row]);
        newG[r][c] = letter.toUpperCase();
        setGrid(newG);

        if (errors[r][c]) {
            const newE = errors.map(er => [...er]);
            newE[r][c] = false;
            setErrors(newE);
        }

        savePartialState(newG, startRef.current ? Date.now() - startRef.current : elapsedMs);

        checkCompletion(newG);
        advanceCursor(r, c, dir, newG);
    }, [selected, dir, grid, puzzle, completed, errors, checkCompletion, savePartialState, elapsedMs]);

    // Physical keyboard
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (/^[a-zA-Z]$/.test(e.key)) { e.preventDefault(); handleKey(e.key); }
            else if (e.key === 'Backspace') { e.preventDefault(); handleKey('BACK'); }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [handleKey]);

    const QWERTY_ROWS = [
        'QWERTYUIOP'.split(''),
        'ASDFGHJKL'.split(''),
        'ZXCVBNM'.split(''),
    ];

    // --- Smart cursor helpers ---
    // Return ordered list of word-start {r,c,dir} for the current direction
    const getWordOrder = (direction: Dir) => {
        return puzzle.clues
            .filter(cl => cl.dir === direction)
            .sort((a, b) => (a.row * 5 + a.col) - (b.row * 5 + b.col));
    };

    // Given a cell and direction, return the word (clue) it belongs to
    const getWordForCell = (r: number, c: number, direction: Dir) => {
        return puzzle.clues.find(cl => {
            if (cl.dir !== direction) return false;
            if (direction === 'across') {
                return cl.row === r && c >= cl.col && c < cl.col + cl.answer.length;
            } else {
                return cl.col === c && r >= cl.row && r < cl.row + cl.answer.length;
            }
        });
    };

    // Find first blank cell in a word after (or at) a given offset
    const firstBlankInWord = (cl: { row: number; col: number; answer: string; dir: Dir }, g: (string | null)[][], startOffset = 0) => {
        for (let i = startOffset; i < cl.answer.length; i++) {
            const r = cl.dir === 'across' ? cl.row : cl.row + i;
            const c = cl.dir === 'across' ? cl.col + i : cl.col;
            if (!g[r][c]) return { r, c };
        }
        return null;
    };

    // Find first unsolved (blank) cell in a direction across all words
    const firstUnsolvedInDir = (direction: Dir, g: (string | null)[][]) => {
        const words = getWordOrder(direction);
        for (const w of words) {
            const blank = firstBlankInWord(w, g);
            if (blank) return blank;
        }
        return null;
    };

    // Advance cursor after typing a letter
    const advanceCursor = (r: number, c: number, d: Dir, newG: (string | null)[][]) => {
        const curWord = getWordForCell(r, c, d);
        if (!curWord) return;

        // 1. Try to find next blank AFTER current cell within the same word
        const posInWord = d === 'across' ? c - curWord.col : r - curWord.row;
        const blank = firstBlankInWord(curWord, newG, posInWord + 1);
        if (blank) { setSelected(blank); return; }

        // 2. End of word — try next word in same direction
        const words = getWordOrder(d);
        const wIdx = words.findIndex(w => w.row === curWord.row && w.col === curWord.col);
        for (let i = wIdx + 1; i < words.length; i++) {
            const nb = firstBlankInWord(words[i], newG);
            if (nb) { setSelected(nb); return; }
        }

        // 3. Last word: find first unsolved in opposite direction
        const opp: Dir = d === 'across' ? 'down' : 'across';
        const oppBlank = firstUnsolvedInDir(opp, newG);
        if (oppBlank) { setDir(opp); setSelected(oppBlank); return; }

        // 4. Puzzle complete — stay put
    };

    const isCellHighlighted = (r: number, c: number) => {
        if (!selected) return false;
        if (dir === 'across' && r === selected.r) return true;
        if (dir === 'down' && c === selected.c) return true;
        return false;
    };

    // Build leaderboard with user + friends
    const allEntries = [
        ...(completed ? [{ name: 'You', time: solveMs }] : []),
        ...FRIEND_TIMES,
    ].sort((a, b) => a.time - b.time);

    const acrossClues = puzzle.clues.filter(c => c.dir === 'across');
    const downClues = puzzle.clues.filter(c => c.dir === 'down');

    const displayTime = completed ? formatTime(solveMs) : formatTime(elapsedMs);

    const handleClose = () => {
        if (!completed && startRef.current !== null) {
            const currentElapsed = Date.now() - startRef.current;
            savePartialState(grid, currentElapsed, hintsUsed);
        }
        onBack();
    };

    const handleLeaderboardClick = () => {
        setTab('leaderboard');
        leaderboardClicksRef.current += 1;
        if (leaderboardClicksRef.current >= 10) {
            // Secret logic: Restart puzzle
            try {
                const map = JSON.parse(localStorage.getItem('pera_crossword_results') || '{}');
                delete map[puzzle.date];
                localStorage.setItem('pera_crossword_results', JSON.stringify(map));
            } catch { }

            setCompleted(false);
            setGrid(puzzle.solution.map(row => row.map(ans => ans === null ? null : '')));
            setSolveMs(0);
            setElapsedMs(0);
            setHintsUsed(0);
            setErrors(puzzle.solution.map(row => row.map(() => false)));
            startRef.current = null;
            if (timerRef.current) clearInterval(timerRef.current);
            leaderboardClicksRef.current = 0;
        }
    };

    return (
        <div className="h-full w-full flex flex-col justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
            {/* Close button */}
            <button onClick={handleClose} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-10">
                <X size={20} className="text-slate-800" />
            </button>

            {/* Sheet */}
            <div className="bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '92%' }}>
                {/* Tabs */}
                <div className="flex px-5 pt-5 pb-2 gap-4 border-b border-slate-100">
                    <button onClick={() => setTab('puzzle')} className={`font-bold text-base ${tab === 'puzzle' ? 'text-violet-600 border-b-2 border-violet-600' : 'text-slate-400'}`}>Puzzle</button>
                    <button onClick={handleLeaderboardClick} className={`font-bold text-base flex items-center gap-1 ${tab === 'leaderboard' ? 'text-violet-600 border-b-2 border-violet-600' : 'text-slate-400'}`}><Trophy size={14} />Leaderboard</button>
                    <div className="ml-auto flex items-center gap-2 relative">
                        <div className="flex items-center gap-1.5 text-sm font-mono font-bold" style={{ color: completed ? '#16a34a' : '#7c3aed' }}>
                            <Clock size={14} />{displayTime}
                        </div>
                        {tab === 'puzzle' && isPlaying && !completed && (
                            <button onClick={() => setShowMenu(!showMenu)} className="p-1 rounded-md hover:bg-slate-100 active:bg-slate-200">
                                <MoreHorizontal size={18} className="text-slate-600" />
                            </button>
                        )}
                        {showMenu && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                                <div className="absolute top-full right-0 mt-2 py-1 bg-white border border-slate-200 shadow-xl rounded-xl z-50 overflow-hidden min-w-[140px]">
                                    <button onClick={handleCheckPuzzle} className="px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 active:bg-slate-100 w-full text-left transition-colors border-b border-slate-100">
                                        Check Puzzle
                                    </button>
                                    <button onClick={handleRevealLetter} className="px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 active:bg-slate-100 w-full text-left transition-colors border-b border-slate-100">
                                        Reveal Letter
                                    </button>
                                    <button onClick={handleGiveUp} className="px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 active:bg-slate-100 w-full text-left transition-colors">
                                        Give Up
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {tab === 'puzzle' ? (
                    <div className="flex flex-col relative flex-1 min-h-0">
                        <div className="flex flex-col overflow-y-auto flex-1">
                            {/* Completed banner */}
                            {completed && (
                                <div className="mx-4 mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-sm text-emerald-700 font-semibold flex flex-col items-center">
                                    <span>🎉 Solved in {formatTime(solveMs)}! +50 Pera Points earned</span>
                                    {hintsUsed > 0 && <span className="text-xs mt-0.5 text-emerald-600 font-medium">({hintsUsed} {hintsUsed === 1 ? 'hint' : 'hints'} used)</span>}
                                </div>
                            )}

                            {/* Grid */}
                            <div className="flex justify-center px-4 pt-4 pb-2 relative">
                                {!isPlaying && (
                                    <div className="absolute inset-x-8 inset-y-6 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-xl border-2 border-slate-200 shadow-lg" style={{ pointerEvents: 'auto' }}>
                                        <button
                                            onClick={startTimer}
                                            className="px-8 py-3 rounded-xl font-bold text-white shadow-md active:scale-95 transition-transform text-lg"
                                            style={{ background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)' }}
                                        >
                                            {elapsedMs > 0 ? "Resume" : "Start"}
                                        </button>
                                    </div>
                                )}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 3, width: 275, opacity: isPlaying ? 1 : 0.8 }}>
                                    {puzzle.solution.map((row, r) => row.map((ans, c) => {
                                        const isBlack = ans === null;
                                        const isSelected = selected?.r === r && selected?.c === c;
                                        const isHL = !isBlack && isCellHighlighted(r, c);
                                        const hasError = errors[r][c];
                                        const val = grid[r][c];
                                        // Number overlay (which clues start here)
                                        const clueNum = puzzle.clues.find(cl =>
                                            cl.row === r && cl.col === c
                                        )?.number;
                                        return (
                                            <div
                                                key={`${r}-${c}`}
                                                onClick={() => handleCellClick(r, c)}
                                                style={{
                                                    width: 51, height: 51,
                                                    backgroundColor: isBlack ? '#1e293b' : isSelected ? '#7c3aed' : isHL ? '#ede9fe' : '#f8fafc',
                                                    border: isBlack ? 'none' : `2px solid ${hasError ? '#ef4444' : isSelected ? '#7c3aed' : '#cbd5e1'}`,
                                                    borderRadius: 6,
                                                    position: 'relative',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    cursor: isBlack ? 'default' : 'pointer',
                                                    userSelect: 'none',
                                                }}
                                            >
                                                {!isBlack && clueNum && (
                                                    <span style={{ position: 'absolute', top: 2, left: 3, fontSize: 9, fontWeight: 700, color: isSelected ? 'white' : '#64748b' }}>{clueNum}</span>
                                                )}
                                                {!isBlack && (
                                                    <span style={{ fontSize: 18, fontWeight: 800, color: hasError ? '#ef4444' : isSelected ? 'white' : '#0f172a' }}>{val}</span>
                                                )}
                                            </div>
                                        );
                                    }))}
                                </div>
                            </div>

                            {/* Clues */}
                            <div className="px-4 pb-2 flex gap-3" style={{ visibility: isPlaying ? 'visible' : 'hidden' }}>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Across</div>
                                    {acrossClues.map(cl => (
                                        <div key={cl.number + cl.dir} className="flex gap-1 text-xs mb-1">
                                            <span className="font-bold text-violet-600 w-4 flex-shrink-0">{cl.number}</span>
                                            <span className="text-slate-600 leading-tight">{cl.clue}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Down</div>
                                    {downClues.map(cl => (
                                        <div key={cl.number + cl.dir} className="flex gap-1 text-xs mb-1">
                                            <span className="font-bold text-violet-600 w-4 flex-shrink-0">{cl.number}</span>
                                            <span className="text-slate-600 leading-tight">{cl.clue}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* On-screen keyboard — QWERTY layout */}
                            {!completed && (
                                <div className="px-1.5 pb-4 pt-3 border-t border-slate-100 mt-auto bg-white">
                                    {QWERTY_ROWS.map((row, rowIdx) => (
                                        <div key={rowIdx} className="flex justify-center gap-x-[3px] mb-[6px] w-full">
                                            {row.map((l: string) => (
                                                <button key={l} onClick={() => handleKey(l)}
                                                    className="h-11 rounded-md font-bold text-base bg-slate-100 text-slate-900 active:bg-slate-200 active:scale-95 transition-all flex-1 flex items-center justify-center max-w-[44px]"
                                                >{l}</button>
                                            ))}
                                            {rowIdx === 2 && (
                                                <button onClick={() => handleKey('BACK')}
                                                    className="h-11 rounded-md font-bold text-base bg-slate-300 text-slate-800 active:bg-slate-400 active:scale-95 transition-all flex-1 flex items-center justify-center max-w-[54px] ml-1"
                                                >⌫</button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Leaderboard tab
                    <div className="px-5 py-4 overflow-y-auto flex-1">
                        <h3 className="font-bold text-slate-900 mb-1">Today's Puzzle</h3>
                        <p className="text-xs text-slate-400 mb-4">Fastest solvers among your friends</p>
                        <div className="rounded-2xl overflow-hidden border border-slate-100">
                            {allEntries.map((e, i) => (
                                <div key={i} className={`flex items-center px-4 py-3 ${i > 0 ? 'border-t border-slate-50' : ''}`}>
                                    <span className="w-6 text-sm font-bold" style={{ color: i === 0 ? '#f59e0b' : '#94a3b8' }}>#{i + 1}</span>
                                    <span className="flex-1 text-sm font-semibold text-slate-800">{e.name}</span>
                                    <span className="font-mono text-sm font-bold text-violet-600">{formatTime(e.time)}</span>
                                </div>
                            ))}
                            {!completed && (
                                <div className="flex items-center px-4 py-3 border-t border-slate-50">
                                    <span className="w-6 text-sm font-bold text-slate-300">—</span>
                                    <span className="flex-1 text-sm font-semibold text-slate-400">You</span>
                                    <span className="font-mono text-sm text-slate-300">—:—</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
