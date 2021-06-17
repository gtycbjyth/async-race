import CreateHTMLElement from './createHTMLElement';

class Button extends CreateHTMLElement {
  constructor(id: string, name?: string) {
    super('button', '', id, name);
    this.element.innerText = name;
    this.element.id = id;
  }
}

export default Button;
