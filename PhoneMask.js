class PhoneMask {
  mask
  result = ''
  caretPosition
  constructor(param) {
    this.mask = param.mask || '+7 (9xx) xxx xx xx'
    if (param.nodes)
      this.inputs = param.nodes
    else
      this.inputs = document.querySelectorAll(".k1-phone-input")

    this.init()
  }

  init() {
    for (let node of this.inputs) {
      let input = node
      if (node.type !== 'input') input = node.querySelector("input")
      const value = input.value

      input.value = this.mask.replace(/x/gi, "_")
      input.addEventListener("focus", function ({target}) {
        const value = target.value
        const caretPosition = value.indexOf("_")
        target.setSelectionRange(caretPosition, caretPosition)
      })
      input.addEventListener("input", this.setValue.bind(this))
    }
  }

  /**
   * main func
   * @param data
   * @param target
   */
  setValue({data, target}) {
    this.result = ''
    let value = target.value
    for (let i in this.mask) {
      if (this.mask[i] === 'x')
        if (value[i] && value[i].match(/\d/)) this.result += value[i]
        else this.result += "_"
      else this.result += this.mask[i]
    }
    target.value = this.result
    if (data) this.caretPosition = this.result.indexOf("_")
    else {
      const symbolsArray = this.result.match(/\d/g)
      const lastSymbol = symbolsArray[symbolsArray.length - 1]
      this.caretPosition = this.result.lastIndexOf(lastSymbol) + 1
    }
    target.setSelectionRange(this.caretPosition, this.caretPosition)
  }
}