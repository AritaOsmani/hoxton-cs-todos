import { describe, it, expect } from "vitest";
import { addTodo, App, removeTodo, Todo } from './App'
import { fireEvent, render, screen, within } from '@testing-library/react'


describe('addTodo', () => {
    it('add a new todo and return all todos', () => {
        const todos: Todo[] = [
            {
                id: 1,
                title: 'Cook dinner'
            },
            {
                id: 2,
                title: 'Learn testing'
            }
        ]
        const expectedResult: Todo[] = [
            {
                id: 1,
                title: 'Cook dinner'
            },
            {
                id: 2,
                title: 'Learn testing'
            },
            {
                id: 3,
                title: 'Go shopping'
            }
        ]
        const result = addTodo(todos, 'Go shopping')
        expect(result).toMatchObject(expectedResult)
    })
})

describe('removeTodo', () => {
    it('remove a todo and return the remaining todos', () => {
        const todos: Todo[] = [
            {
                id: 1,
                title: 'Cook dinner'
            },
            {
                id: 2,
                title: 'Learn testing'
            }
        ]

        const expectedResult: Todo[] = [
            {
                id: 1,
                title: 'Cook dinner'
            }
        ]

        const result = removeTodo(todos, 2)
        expect(result).toMatchObject(expectedResult)

    })

    it('return all the todos if the id does not match', () => {
        const todos: Todo[] = [
            {
                id: 1,
                title: 'Cook dinner'
            },
            {
                id: 2,
                title: 'Learn testing'
            }
        ]
        const expectedTodos = todos;

        const result = removeTodo(todos, 111)
        expect(result).toMatchObject(expectedTodos)
    })
})

describe('App', () => {
    it('displays a title when the app loads', () => {
        render(<App />)
        const displayTitle = screen.getByTestId('display-title')
        expect(displayTitle.textContent).toBe('Todo app')
    })

    it('when the add todo button is clicked, it shows the new todo', () => {
        render(<App />)
        const addTodoButton = screen.getByText('ADD TODO')
        fireEvent.click(addTodoButton)
        const newTodo = {
            id: 1,
            title: 'New todo, yay!'
        }

        const display = screen.getByTestId(`todo-${newTodo.id}`)
        expect(display.textContent).toBe('New todo, yay!X')


    })
    it('when the add todo button is clicked multiple times, it adds new todos', () => {
        render(<App />)
        const addTodoButton = screen.getByText('ADD TODO')
        fireEvent.click(addTodoButton)
        fireEvent.click(addTodoButton)
        const todos = [
            {
                id: 1,
                title: 'New todo, yay!'
            },
            {
                id: 2,
                title: 'New todo, yay!'
            }
        ]
        for (const todo of todos) {
            const display = screen.getByTestId(`todo-${todo.id}`)
            expect(display.textContent).toBe('New todo, yay!X')
        }
        it('when remove button is clicked, it removes the todo`', () => {
            render(<App />)
            const selectedTodo = screen.getByTestId('todo-1')
            const removeBtn = within(selectedTodo).getByText('X')
            fireEvent.click(removeBtn)

            const remaining = screen.getByTestId('todo-2')
            expect(remaining.textContent).toBe('New todo, yay!X')

        })

    })




})