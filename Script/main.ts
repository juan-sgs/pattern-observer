interface ISubject {
  registerObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyObservers(): void;
}

interface IObserver {
  update(): void;
  name: string;
}

class Subject implements ISubject {
  private observers: IObserver[] = [];

  public registerObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: IObserver): void {
    const index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  }

  public notifyObservers(): void {
    for (let observer of this.observers) {
      observer.update();
    }
  }
}

class Observer implements IObserver {
  public name: string;
  private updates: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  public update(): void {
    this.updates++;
    console.log(
      `${this.name} has been updated | update number ${this.updates}`
    );
  }
}

const subject = new Subject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2 - test");

subject.registerObserver(observer1);
subject.registerObserver(observer2);
subject.notifyObservers();
