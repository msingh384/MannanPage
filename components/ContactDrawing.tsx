"use client";

import { Pencil, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

type Cell = { x: number; y: number };

export default function ContactDrawing({ children }: { children: ReactNode }) {
  const [drawing, setDrawing] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const ink = useRef(new Map<string, Cell>());
  const grid = useRef({ spacing: 19, width: 0, height: 0 });
  const stroke = useRef<{ pointer: number; cell: Cell } | null>(null);
  const keyboardCell = useRef<Cell | null>(null);

  function paint(cell: Cell) {
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    const { spacing } = grid.current;
    context.fillStyle = "#fff";
    context.beginPath();
    context.arc((cell.x + .5) * spacing, (cell.y + .5) * spacing, 2.6, 0, 2 * Math.PI);
    context.fill();
  }

  function mark(cell: Cell) {
    const key = `${cell.x}:${cell.y}`;
    if (ink.current.has(key)) return;
    ink.current.set(key, cell);
    paint(cell);
  }

  useEffect(() => {
    const board = canvas.current;
    if (!board) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const spacing = parseFloat(getComputedStyle(board).getPropertyValue("--contact-dot-spacing")) || 19;
      grid.current = { width, height, spacing };
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      board.width = Math.round(width * scale);
      board.height = Math.round(height * scale);
      board.getContext("2d")?.setTransform(scale, 0, 0, scale, 0, 0);
      ink.current.forEach(paint);
    });
    observer.observe(board);
    return () => observer.disconnect();
  }, []);

  function cellAt(x: number, y: number): Cell {
    const { width, height, spacing } = grid.current;
    return {
      x: Math.max(0, Math.min(Math.ceil(width / spacing) - 1, Math.floor(x / spacing))),
      y: Math.max(0, Math.min(Math.ceil(height / spacing) - 1, Math.floor(y / spacing))),
    };
  }

  function pointerCell(event: PointerEvent<HTMLCanvasElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    return cellAt(event.clientX - bounds.left, event.clientY - bounds.top);
  }

  function begin(event: PointerEvent<HTMLCanvasElement>) {
    if (event.button !== 0 || stroke.current) return;
    const cell = pointerCell(event);
    event.currentTarget.setPointerCapture(event.pointerId);
    stroke.current = { pointer: event.pointerId, cell };
    mark(cell);
  }

  function move(event: PointerEvent<HTMLCanvasElement>) {
    const current = stroke.current;
    if (!current || current.pointer !== event.pointerId) return;
    const next = pointerCell(event);
    const dx = next.x - current.cell.x;
    const dy = next.y - current.cell.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));

    for (let step = 1; step <= steps; step += 1) {
      mark({
        x: current.cell.x + Math.round(dx * step / steps),
        y: current.cell.y + Math.round(dy * step / steps),
      });
    }
    current.cell = next;
  }

  function end(event: PointerEvent<HTMLCanvasElement>) {
    if (stroke.current?.pointer === event.pointerId) stroke.current = null;
  }

  function drawWithKeyboard(event: KeyboardEvent<HTMLCanvasElement>) {
    if (event.key === "Escape") {
      setDrawing(false);
      toggle.current?.focus();
      return;
    }
    const directions: Record<string, Cell> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      " ": { x: 0, y: 0 },
    };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    const { width, height, spacing } = grid.current;
    const current = keyboardCell.current ?? cellAt(width / 2, height / 2);
    const next = cellAt((current.x + direction.x + .5) * spacing, (current.y + direction.y + .5) * spacing);
    keyboardCell.current = next;
    mark(next);
  }

  function clear() {
    ink.current.clear();
    keyboardCell.current = null;
    const { width, height } = grid.current;
    canvas.current?.getContext("2d")?.clearRect(0, 0, width, height);
  }

  return (
    <div className="contact-drawing" data-drawing={drawing ? "" : undefined}>
      <div className="shell contact-inner">
        {children}
        <div className="drawing-controls">
          <button ref={toggle} type="button" aria-pressed={drawing} onClick={() => setDrawing(value => !value)}>
            <Pencil size={14} aria-hidden="true" /> {drawing ? "Done drawing" : "Draw on the grid"}
          </button>
          {drawing && <button type="button" onClick={clear}><RotateCcw size={14} aria-hidden="true" /> Clear</button>}
        </div>
      </div>
      <canvas
        ref={canvas}
        className="contact-canvas"
        aria-hidden={!drawing}
        aria-label="Drawing grid. Use the arrow keys to draw or Escape to exit."
        tabIndex={drawing ? 0 : -1}
        onPointerDown={begin}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        onLostPointerCapture={end}
        onKeyDown={drawWithKeyboard}
      />
    </div>
  );
}
