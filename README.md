# sokoban-solver-20261121

Room-split push-optimal BFS Sokoban solver (Node 22, no dependencies).

Each level is a 1-wide hallway with 1–4 rooms off it; a box pushed into the
hallway can never return, so every room is an independent problem and the
level's push-optimal count is the sum of the rooms' optima. The solver splits
the level into rooms, solves each room with push-optimal breadth-first search
(state = player position + sorted box positions, cost = pushes) with simple
wall-corner deadlock pruning, then stitches the rooms together by walking the
player along the hallway between them.

Deterministic: the search is budgeted by a fixed expansion cap per room, never
by the clock, so two runs on the same set produce byte-identical outputs.

Built for make.fun's "Build the best Sokoban solver, 21 November 2026" bounty.
