import { getCars } from '../api/garage';
import Button from '../model/class/button';
import CreateHTMLElement from '../model/class/createHTMLElement';
import ui from '../ui/ui';
import ControlPanel from './controlPanel';

class App {
  element: HTMLElement;

  header: HTMLElement;

  main: HTMLElement;

  constructor() {
    this.element = document.body;

    this.header = new CreateHTMLElement('header').element;
    this.header.append(
      new Button('garage', 'garage').element,
      new Button('winners', 'winners').element,
    );

    this.main = new CreateHTMLElement('main').element;
    this.element.append(this.header, this.main);
  }

  async render() {
    await getCars();
    await this.main.append(new ControlPanel().section);
    ui();
  }

  async reRender() {
    await getCars();
    this.main.innerHTML = '';
    await this.main.append(new ControlPanel().section);
    await ui();
  }
}

export default App;
//////////////////////////////////////////////////////
// import { getCars } from '../api/garage';
// import Button from '../model/class/button';
// import CreateHTMLElement from '../model/class/createHTMLElement';
// import ui from '../ui/ui';
// import ControlPanel from './controlPanel';

// class App {
//   element: HTMLElement;

//   header: HTMLElement;

//   main: HTMLElement;

//   constructor() {
//     this.element = document.body;

//     this.header = new CreateHTMLElement('header').element;
//     this.header.append(
//       new Button('garage', 'garage').element,
//       new Button('winners', 'winners').element,
//     );

//     this.main = new CreateHTMLElement('main').element;
//     this.element.append(this.header, this.main);
//   }

//   // async render(): void {
//   //   await getCars();
//   //   // const controlPanel = new ControlPanel()
//   //   await this.main.append(new ControlPanel().section);
//   //   ui();
//   // }

//   // async reRender() {
//   //   this.main.innerHTML = '';
//   //   this.render();
//   // }
//   async render(): void {
//     await getCars();
//     await this.main.append(new ControlPanel().section);
//     ui();
//   }

//   async reRender() {
//     await getCars();
//     this.main.innerHTML = '';
//     await this.main.append(new ControlPanel().section);
//     await ui();
//   }
// }

// export default App;
