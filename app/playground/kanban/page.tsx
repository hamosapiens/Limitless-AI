// pages/kanban.tsx

"use client";
import { useState, useRef } from "react";

type Task = { id: string; content: string };
type Column = { id: string; title: string; tasks: Task[] };

const initialColumns: Column[] = [
	{
		id: "backlog",
		title: "Backlog",
		tasks: [
			{ id: "task1", content: "Task 1" },
			{ id: "task2", content: "Task 2" },
		],
	},
	{ id: "todo", title: "To Do", tasks: [] },
	{ id: "inprogress", title: "In Progress", tasks: [] },
	{ id: "done", title: "Done", tasks: [] },
];

function KanbanTask({
	task,
	colId,
	columns,
	onDragStart,
	onDragEnd,
	moveTask,
}: {
	task: Task;
	colId: string;
	columns: Column[];
	onDragStart: (e: React.DragEvent, taskId: string, fromCol: string) => void;
	onDragEnd: () => void;
	moveTask: (taskId: string, fromCol: string, toCol: string) => void;
}) {
	return (
		<div
			key={task.id}
			className="kanban-task bg-white border border-gray-300 rounded px-4 py-2 shadow-sm cursor-grab focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity"
			draggable
			tabIndex={0}
			aria-grabbed="false"
			onDragStart={(e) => onDragStart(e, task.id, colId)}
			onDragEnd={onDragEnd}
			onKeyDown={(e) => {
				if (e.key === "ArrowRight") {
					const idx = columns.findIndex((c) => c.id === colId);
					if (idx < columns.length - 1)
						moveTask(task.id, colId, columns[idx + 1].id);
				}
				if (e.key === "ArrowLeft") {
					const idx = columns.findIndex((c) => c.id === colId);
					if (idx > 0) moveTask(task.id, colId, columns[idx - 1].id);
				}
			}}
			aria-label={task.content}
		>
			{task.content}
		</div>
	);
}

function KanbanColumn({
	col,
	columns,
	onDragOver,
	onDrop,
	onDragStart,
	onDragEnd,
	moveTask,
}: {
	col: Column;
	columns: Column[];
	onDragOver: (e: React.DragEvent) => void;
	onDrop: (e: React.DragEvent, toCol: string) => void;
	onDragStart: (e: React.DragEvent, taskId: string, fromCol: string) => void;
	onDragEnd: () => void;
	moveTask: (taskId: string, fromCol: string, toCol: string) => void;
}) {
	return (
		<div
			className="kanban-column flex-1 min-w-[220px] bg-gray-50 border border-gray-200 rounded-lg p-4"
			onDragOver={onDragOver}
			onDrop={(e) => onDrop(e, col.id)}
			aria-label={col.title}
		>
			<h2 className="text-lg font-bold mb-4 text-gray-700">{col.title}</h2>
			<div className="space-y-3 min-h-[40px]">
				{col.tasks.map((task) => (
					<KanbanTask
						key={task.id}
						task={task}
						colId={col.id}
						columns={columns}
						onDragStart={onDragStart}
						onDragEnd={onDragEnd}
						moveTask={moveTask}
					/>
				))}
			</div>
		</div>
	);
}

function KanbanBoard() {
	const [columns, setColumns] = useState(initialColumns);
	const draggingTask = useRef<{ id: string; fromCol: string } | null>(null);

	// Drag and Drop Handlers
	function onDragStart(e: React.DragEvent, taskId: string, fromCol: string) {
		draggingTask.current = { id: taskId, fromCol };
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", taskId);
	}

	function onDragEnd() {
		draggingTask.current = null;
	}

	function onDragOver(e: React.DragEvent) {
		e.preventDefault();
	}

	function onDrop(e: React.DragEvent, toCol: string) {
		e.preventDefault();
		const taskId = draggingTask.current?.id;
		const fromCol = draggingTask.current?.fromCol;
		if (!taskId || !fromCol || fromCol === toCol) return;

		setColumns((cols) => {
			const newCols = cols.map((col) => {
				if (col.id === fromCol) {
					return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
				}
				if (col.id === toCol) {
					const task = cols
						.find((c) => c.id === fromCol)
						?.tasks.find((t) => t.id === taskId);
					return task ? { ...col, tasks: [...col.tasks, task] } : col;
				}
				return col;
			});
			return newCols;
		});
		draggingTask.current = null;
	}

	// Keyboard move (accessibility)
	function moveTask(taskId: string, fromCol: string, toCol: string) {
		if (fromCol === toCol) return;
		setColumns((cols) => {
			const newCols = cols.map((col) => {
				if (col.id === fromCol) {
					return { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) };
				}
				if (col.id === toCol) {
					const task = cols
						.find((c) => c.id === fromCol)
						?.tasks.find((t) => t.id === taskId);
					return task ? { ...col, tasks: [...col.tasks, task] } : col;
				}
				return col;
			});
			return newCols;
		});
	}

	return (
		<section
			aria-label="Kanban Board"
			className="w-full max-w-6xl mx-auto py-10 px-2"
		>
			<div className="flex flex-col md:flex-row gap-4">
				{columns.map((col) => (
					<KanbanColumn
						key={col.id}
						col={col}
						columns={columns}
						onDragOver={onDragOver}
						onDrop={onDrop}
						onDragStart={onDragStart}
						onDragEnd={onDragEnd}
						moveTask={moveTask}
					/>
				))}
			</div>
			<style jsx>{`
				.kanban-task:active {
					opacity: 0.5;
				}
			`}</style>
		</section>
	);
}

export default function KanbanPage() {
	return (
		<main className="min-h-screen bg-gray-100 flex flex-col items-center">
			<h1 className="text-3xl font-bold mt-10 mb-6 text-gray-800">
				Kanban Board
			</h1>
			<KanbanBoard />
			<p className="mt-8 text-gray-500 text-sm">
				Drag tasks between columns or use left/right arrow keys when focused.
			</p>
		</main>
	);
}
