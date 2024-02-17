# Yahtzee -- Team 22

## Introduction

We will be creating a virtual version of the game Yahtzee.

## Coding Style and Naming Conventions

### Language

This project will use TypeScript with React for the frontend, Next.js for the backend, and a MySQL database.

### Coding Style

We adhere to clean and readable code following common TypeScript conventions. Please make sure your code follows these conventions.

### Naming Conventions

1. **Variables**: Use meaningful and descriptive names for variables. Follow the camelCase naming convention.

    ```typescript
    // Good
    const userName = "JohnDoe";
    
    // Avoid
    const un = "JohnDoe";
    ```

2. **Functions/Methods**: Use verbs or verb phrases for function names. Follow the camelCase naming convention.

    ```typescript
    // Good
    function calculateTotal(price: number, quantity: number): number {
        return price * quantity;
    }
    
    // Avoid
    function total(p: number, q: number): number {
        return p * q;
    }
    ```

3. **Constants**: Use uppercase letters with underscores for constant variable names.

    ```typescript
    // Good
    const MAX_RETRIES = 3;
    
    // Avoid
    const maxRetries = 3;
    ```

