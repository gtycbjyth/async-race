class CreateHTMLElement {
  element: HTMLElement;

  constructor(teg: string, classes = '', id = '', text = '') {
    this.element = document.createElement(`${teg}`);

    if (classes !== '') {
      this.element.classList.add(classes);
    }
    if (id !== '') this.element.id = id;
    if (text !== '') this.element.innerText = text;
  }
}
export default CreateHTMLElement;
