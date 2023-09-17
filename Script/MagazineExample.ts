/* enable Quokka for get the results */

interface IMagazine {
  registerSubscriber(subscriber: ISubscriber): void;
  removeSubscriber(subscriber: ISubscriber): void;
  addNewPublish(title: string): void;
}

interface ISubscriber {
  name: string;
  magazineReceived: string[];
  update(publish: string): void;
}

class Magazine implements IMagazine {
  private subscribers: ISubscriber[] = [];
  private newEdition: string = "";

  public registerSubscriber(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber);
  }

  public removeSubscriber(subscriber: ISubscriber): void {
    const index = this.subscribers.indexOf(subscriber);
    this.subscribers.splice(index, 1);
  }

  public addNewPublish(title: string): void {
    this.newEdition = title;
    this.notifySubscribers();
  }

  private notifySubscribers(): void {
    for (let subscriber of this.subscribers) {
      subscriber.update(this.newEdition);
    }
  }
}

class Subscriber implements ISubscriber {
  public name: string = "";
  public magazineReceived: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public update(publish: string): void {
    this.magazineReceived.push(publish);
    console.log("New publish received: " + publish);
  }

  get getMagazineReceived(): string[] {
    return this.magazineReceived;
  }
}

// create Rolling Stones Magazine
const rollingStonesMagazine = new Magazine();

// create subscribers for Rolling Stones Magazine
const johnSubscriber = new Subscriber("John");
const marySubscriber = new Subscriber("Mary");

// register subscribers to Rolling Stones Magazine
rollingStonesMagazine.registerSubscriber(johnSubscriber);
rollingStonesMagazine.registerSubscriber(marySubscriber);

// uncomment per line to see the results
// rollingStonesMagazine.addNewPublish("The Beatles");
// rollingStonesMagazine.removeSubscriber(marySubscriber);
// rollingStonesMagazine.addNewPublish("The Rolling Stones");
// rollingStonesMagazine.registerSubscriber(marySubscriber);
// rollingStonesMagazine.addNewPublish("The Who");

// get magazines received by subscribers - compare the results between subscribers
console.log(johnSubscriber.getMagazineReceived);
console.log(marySubscriber.getMagazineReceived);