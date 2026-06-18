// Employee class
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
}

// Create 5 Employee objects
const employees = [
    new Employee("Alice", 50000),
    new Employee("Bob", 75000),
    new Employee("Charlie", 60000),
    new Employee("David", 90000),
    new Employee("Eve", 70000)
];

// Sort employees by salary in descending order
employees.sort((e1, e2) => e2.salary - e1.salary);

// Print employee names in sorted order
console.log("Employees sorted by salary (Descending):");
employees.forEach(employee => {
    console.log(employee.name);
});