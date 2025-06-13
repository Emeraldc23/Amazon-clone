class Car {
  #brand;
  #model;
  #speed = 0;
  isTrunkOpen = false;
  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    /*  this.isTrunkOpen = isTrunkOpen; */
  }
  displayInfo() {
    const trunkStats = this.isTrunkOpen ? "Open" : "Closed";
    console.log(
      `${this.#brand} ${this.#model} ${this.#speed} km/h Stats: ${trunkStats}`
    );
  }

  go() {
    if (!this.isTrunkOpen) {
      this.#speed += 5;
    }
    // limit of speed is 200
    if (this.#speed > 200) {
      this.#speed = 0;
    }
  }
  brake() {
    this.#speed -= 5;
    if (this.#speed < 0) {
      this.#speed = 0;
    }
  }

  openTrunk() {
    if (this.#speed === 0) {
      this.isTrunkOpen = true;
    }
  }
  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car = new Car({ brand: "Toyota", model: "Corolla" });
const car2 = new Car({ brand: "Tesla", model: "Model 3" });
car.openTrunk();
car.go();
car.go();
car.closeTrunk();
car.go();
car.go();
car.displayInfo();
car2.openTrunk();
car2.go();
car2.displayInfo();

class RaceCar extends Car {
  acceleration;
  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if (this.speed > 300) {
      this.speed = 300;
    }
  }
  openTrunk() {
    console.log("No trunk to open");
  }
  closeTrunk() {
    console.log("No trunk to close");
  }
}
const raceCar = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20,
});
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.openTrunk();
raceCar.closeTrunk();
raceCar.displayInfo();
