<script lang="ts">
    import TodoItem from "./TodoItem.svelte";
    import { onMount } from "svelte";

    interface ITask {
        id: number,
        title: string,
        completed: boolean
    }

    let newTodoTitle = "";
    let currentFilter = "all";
    let todos: ITask[];

    onMount(async () => {
        const res = await fetch(`/data/tasks.json`);
        const data = await res.json();
        todos = data.tasks;
    });

    function addTodo(event: KeyboardEvent) {
        if (event.key !== "Enter" || newTodoTitle === "") {
            return;
        }

        todos = [
            ...todos,
            {
                id: todos.length + 1,
                title: newTodoTitle,
                completed: false,
            },
        ];

        newTodoTitle = "";
    }

    function checkAllTodos(event) {
        todos = todos.map((todo) => {
            todo.completed = event.target.checked;
            return todo;
        });
    }

    function updateFilter(newFilter: string) {
        currentFilter = newFilter;
    }

    function clearCompleted() {
        todos = todos.filter((todo) => !todo.completed);
    }

    function handleDeleteTodo(event) {
        todos = todos.filter((todo) => todo.id !== event.detail.id);
    }

    function handleToggleCompleted(event) {
        todos = todos.map((todo) => {
            if (todo.id === event.detail.id) {
                todo.completed = !todo.completed;
            }

            return todo;
        });
    }

    $: todosRemaining = filteredTodos.filter((todo) => !todo.completed).length;
    $: filteredTodos =
        currentFilter === "all"
            ? todos
            : currentFilter === "completed"
            ? todos.filter((todo) => todo.completed)
            : todos.filter((todo) => !todo.completed);
</script>

<style>
    .todo-input {
        width: 100%;
        padding: 10px, 20px;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .inner-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 15px;
        margin-bottom: 13px;
    }
    .inner-container-input {
        margin-right: 12px;
    }
    button {
        font-size: 14px;
        background-color: white;
        appearance: none;
        cursor: pointer;
    }
    button:hover {
        background: lightseagreen;
    }
    button:focus {
        outline: none;
    }
    .active {
        background: lightseagreen;
    }
</style>

<input
    type="text"
    class="todo-input"
    placeholder="Insert todo item ..."
    bind:value={newTodoTitle}
    on:keydown={addTodo} />
{#each filteredTodos as todo}
    <div class="todo-item">
        <TodoItem
            {...todo}
            on:deleteTodo={handleDeleteTodo}
            on:toggleCompleted={handleToggleCompleted} />
    </div>
{/each}
<div class="inner-container">
    <div>
        <label>
            <input
                class="inner-container-input"
                type="checkbox"
                on:change={checkAllTodos} />
            Check All</label>
    </div>
    <div>{todosRemaining} items left</div>
</div>
<div class="inner-container">
    <div>
        <button
            on:click={() => updateFilter('all')}
            class:active={currentFilter === 'all'}>All</button>
        <button
            on:click={() => updateFilter('active')}
            class:active={currentFilter === 'active'}>Active</button>
        <button
            on:click={() => updateFilter('completed')}
            class:active={currentFilter === 'completed'}>Completed</button>
    </div>
    <div><button on:click={clearCompleted}>Clear Completed</button></div>
</div>
