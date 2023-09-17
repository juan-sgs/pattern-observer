class Subject {
  observers = [];
  title = "";
  idParent = "";

  constructor(idParent) {
    this.idParent = idParent;
  }

  registerObserver(observer) {
    console.log(observer.idParent);
    this.observers.push(observer);
    const idParent = observer.idParent;
    $(`#subscribe-${idParent}`).html("true");
  }

  removeObserver(idParent) {
    const index = this.observers.findIndex(
      (observer) => observer.idParent === idParent
    );

    $(`#subscribe-${idParent}`).html("false");
    this.observers.splice(index, 1);
  }

  addNewTitle(title) {
    this.title = title;
    this.notifyObservers();
  }

  notifyObservers() {
    this.observers.forEach((observer) => {
      observer.update(this.title);
    });
  }

  getProperty(property) {
    return this[property];
  }
}

class Observer {
  updates = [];
  idParent = "";
  constructor(idParent) {
    this.idParent = idParent;
  }
  update(title) {
    this.updates.push(title);
    console.log(this.updates);
    this.display();
  }

  display() {
    $(`#updates-${this.idParent}`).html(
      this.updates.map((update) => `<li>${update}</li>`).join("")
    );
  }

  getIdParent() {
    return this.idParent;
  }
}

$(function () {
  // setup the subject and observers
  let subject = new Subject("subject-container");
  let btnNewUpdate = $("#btn-add-update");
  let inputNewUpdate = $("#input-add-update");

  $(btnNewUpdate).on("click", function () {
    let title = $(inputNewUpdate).val();
    if (title.trim() === "") return;
    $(inputNewUpdate).val("");
    subject.addNewTitle(title);
  });

  $("[class*=btn-subscribe]").on("click", function () {
    let idParent = $(this).parent().attr("id");
    subject.registerObserver(new Observer(idParent));
  });

  $("[class*=btn-unsubscribe]").on("click", function () {
    let idParent = $(this).parent().attr("id");
    subject.removeObserver(idParent);
  });
});
