import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BIOS_BOOT_LINES, TERMINAL_COMMANDS } from '../content/content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface TerminalProps {
  onComplete: () => void;
  onNavigate: (scene: 'projects' | 'about' | 'contact') => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onComplete, onNavigate }) => {
  const prefersReduced = usePrefersReducedMotion();

  // BIOS lines state
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isBootFinished, setIsBootFinished] = useState(false);

  // Meaningful command state
  const targetCommand = 'open study';
  const [autoCommandTyped, setAutoCommandTyped] = useState('');

  // Interactive user state
  const [userHasControlled, setUserHasControlled] = useState(false);
  const [userInputValue, setUserInputValue] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Internal auto-scroll only (never scrolls the window)
  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [displayedLines, autoCommandTyped, terminalHistory, userInputValue, scrollToBottom]);

  // Command Execution Handler
  const executeCommand = useCallback((cmd: string) => {
    if (isNavigating) return;
    const trimmed = cmd.trim().toLowerCase();

    if (finishTimeoutRef.current) {
      clearTimeout(finishTimeoutRef.current);
      finishTimeoutRef.current = null;
    }

    if (trimmed === 'clear') {
      setTerminalHistory([]);
      setUserInputValue('');
      return;
    }

    if (trimmed === 'projects' || trimmed === 'about' || trimmed === 'contact') {
      setIsNavigating(true);
      setTerminalHistory(prev => [
        ...prev,
        `secbymorchid@study:~$ ${cmd}`,
        `[OK] Opening ${trimmed} case...`
      ]);
      setTimeout(() => {
        onNavigate(trimmed);
      }, 400);
      return;
    }

    // Default 'open study', 'enter', 'start', 'study', 'open' or empty Enter
    if (
      !trimmed ||
      trimmed === 'open study' ||
      trimmed === 'open-study' ||
      trimmed === 'enter' ||
      trimmed === 'start' ||
      trimmed === 'study' ||
      trimmed === 'open' ||
      trimmed === 'explore' ||
      trimmed === 'access'
    ) {
      setIsNavigating(true);
      setTerminalHistory(prev => [
        ...prev,
        `secbymorchid@study:~$ ${cmd || 'open study'}`,
        `[OK] Authentication verified. Unlocking Study Console...`,
        `Entering the study...`
      ]);
      setTimeout(() => {
        onComplete();
      }, 450);
      return;
    }

    if (TERMINAL_COMMANDS[trimmed]) {
      setTerminalHistory(prev => [
        ...prev,
        `secbymorchid@study:~$ ${cmd}`,
        TERMINAL_COMMANDS[trimmed]
      ]);
    } else {
      setTerminalHistory(prev => [
        ...prev,
        `secbymorchid@study:~$ ${cmd}`,
        `command not found: "${trimmed}". Type 'open study' or 'help'.`
      ]);
    }
    setUserInputValue('');
  }, [isNavigating, onComplete, onNavigate]);

  // Phase 1: Robust elapsed-time based BIOS Boot typewriter (immune to lag or timer throttling)
  useEffect(() => {
    if (prefersReduced) {
      setDisplayedLines(BIOS_BOOT_LINES);
      setIsBootFinished(true);
      return;
    }

    const startTime = Date.now();
    const CHAR_MS = 14;
    const LINE_PAUSE_MS = 50;

    // Precalculate start timestamp for each line
    let cumulativeMs = 0;
    const lineTimings = BIOS_BOOT_LINES.map(line => {
      const lineStart = cumulativeMs;
      const lineDuration = line.length * CHAR_MS;
      cumulativeMs += lineDuration + LINE_PAUSE_MS;
      return { line, lineStart, lineDuration };
    });
    const totalBootDuration = cumulativeMs;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= totalBootDuration) {
        setDisplayedLines(BIOS_BOOT_LINES);
        setIsBootFinished(true);
        clearInterval(interval);
        return;
      }

      // Calculate how many lines and characters should be visible
      const newLines: string[] = [];
      for (const item of lineTimings) {
        if (elapsed < item.lineStart) {
          break;
        }
        const lineElapsed = elapsed - item.lineStart;
        const visibleChars = Math.min(item.line.length, Math.floor(lineElapsed / CHAR_MS));
        newLines.push(item.line.slice(0, visibleChars));
      }

      setDisplayedLines(newLines);
    }, 16);

    return () => clearInterval(interval);
  }, [prefersReduced]);

  // Phase 2: Meaningful Command Typing ("open study")
  useEffect(() => {
    if (!isBootFinished || userHasControlled || isNavigating) return;

    const startTime = Date.now();
    const CHAR_MS = 40;
    const totalDuration = targetCommand.length * CHAR_MS;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= totalDuration) {
        setAutoCommandTyped(targetCommand);
        clearInterval(interval);

        // Hold for 350ms, then execute and transition to Study Hub
        finishTimeoutRef.current = setTimeout(() => {
          executeCommand('open study');
        }, 350);
        return;
      }

      const visibleChars = Math.min(targetCommand.length, Math.floor(elapsed / CHAR_MS));
      setAutoCommandTyped(targetCommand.slice(0, visibleChars));
    }, 20);

    return () => {
      clearInterval(interval);
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    };
  }, [isBootFinished, userHasControlled, isNavigating, executeCommand]);

  // User keyboard interaction
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setUserHasControlled(true);
    if (finishTimeoutRef.current) {
      clearTimeout(finishTimeoutRef.current);
      finishTimeoutRef.current = null;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(userInputValue);
    }
  };

  const handleManualTrigger = () => {
    setUserHasControlled(true);
    executeCommand(userInputValue || 'open study');
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 min-h-0 w-full p-4 sm:p-6 md:p-8 font-mono text-phosphor text-xs sm:text-sm md:text-base leading-relaxed overflow-y-auto select-none crt-scanlines"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1.5 crt-flicker-anim max-w-full break-words">
        {/* Boot Lines */}
        {displayedLines.map((line, idx) => (
          <div key={`boot-${idx}`} className="drop-shadow-[0_0_8px_rgba(51,255,102,0.7)]">
            {line}
          </div>
        ))}

        {/* History */}
        {terminalHistory.map((hist, idx) => (
          <div key={`hist-${idx}`} className="whitespace-pre-wrap text-phosphor/90 drop-shadow-[0_0_8px_rgba(51,255,102,0.6)]">
            {hist}
          </div>
        ))}

        {/* Command Line Prompt */}
        {isBootFinished && !isNavigating && (
          <div className="pt-2">
            <div className="flex items-center gap-2 text-phosphor drop-shadow-[0_0_8px_rgba(51,255,102,0.7)] flex-wrap">
              <span className="shrink-0 font-bold">secbymorchid@study:~$</span>

              {userHasControlled ? (
                <div className="flex-1 min-w-[120px] flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInputValue}
                    onChange={(e) => {
                      setUserHasControlled(true);
                      setUserInputValue(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="bg-transparent border-none outline-none text-phosphor font-mono w-full caret-phosphor text-xs sm:text-sm md:text-base"
                    aria-label="Terminal prompt"
                  />
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{autoCommandTyped}</span>
                  <span className="inline-block w-2.5 h-4 bg-phosphor animate-pulse ml-0.5" />
                </div>
              )}
            </div>

            {/* Quick interactive action pill for mobile/click */}
            <div className="mt-3 pt-2 border-t border-phosphor/20 flex items-center justify-between text-[11px] sm:text-xs text-phosphor/80">
              <button
                type="button"
                onClick={handleManualTrigger}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-phosphor/50 bg-phosphor/10 hover:bg-phosphor/20 text-phosphor font-mono tracking-wider transition-colors cursor-pointer"
              >
                <span>⏎ Press Enter or Click to Enter Study</span>
              </button>
              <span className="text-phosphor/60 hidden sm:inline">
                Command: <code className="text-phosphor">open study</code>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
