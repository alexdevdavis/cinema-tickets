# Approaching the Task

## High-level intentions

- use TDD with coverage for each business rule.
- focus on happy path, then sad path for each business rule
- clean code: flatten layers of abstraction

## Incrementing Complexity

### Happy path

- [x] returns a success message string, summarising the total cost, number of tickets for each ticket type, and the number of allocated seats
- [x] handles single adult ticket in single request
- [x] handles multiple adult tickets in single request
- [x] handles multiple adult ticket requests
- [ ] handles multiple adult and child tickets
- [ ] handles multiple adult and infant tickets
- [ ] handles multiple adult, child, and infant tickets

### Sad path

- [ ] Expection for sans-adult request
- [ ] Exception for > 20 tickets purchased
- [ ] Exception for invalid accound id
