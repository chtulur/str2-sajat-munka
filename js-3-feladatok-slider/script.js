const Person = function (nm, id) {
  this.name = nm;
  this.id = id;
};

Person.prototype.print = () => {
  return `${this.name} :: ${this.id}`;
};

let Pisti = new Person("Pisti", 687);
console.log(Pisti);

const Employee = function (nm, id, salary) {
  Person.call(this, nm, id);
  this.salary = salary;
};

Object.setPrototypeOf(Employee, Person.prototype);
Employee.prototype.info = () => {
  return `${this.name} :: ${this.id} :: ${this.salary}`;
};

let margaret = new Employee("marge", 156, 15619870);
console.log(margaret);

let Human = class {
  constructor(nm, id) {
    this.name = nm;
    this.id = id;
  }
  print() {
    return `${this.name} :: ${this.id}`;
  }
};
let Jani = new Human("Jani", 849);
console.log(Jani);

let GoodForNothing = class extends Human {
  constructor(nm, id, salary) {
    super(nm, id);
    this.salary = salary;
  }
  show() {
    return `${this.name} :: ${this.id} :: ${this.salary}`;
  }
};

let klau = new GoodForNothing("Klau", 67846, 150000);
console.log(klau);
