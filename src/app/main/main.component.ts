import { Component } from '@angular/core';

import { NUMBERS, SYMBOLS } from './buttons.data';
import { Numbers, Symbols } from './buttons.interface';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  public numbersAll: Numbers[] = NUMBERS
  public symbolsAll: Symbols[] = SYMBOLS
  public selectedFirstNumber: string = '0'
  public selectedSecondNumber: string = ''
  public selectedSymbol: string = ''
  public result!: number | string
  public currentSymbol!: string
  public complexFirstNumber: string = ''
  public complexSecondNumber: string = ''
  public currentIteration: string = ''
  private arr = ['+', '-', ':', '*']

  onSelectNumber(number: Numbers): void {
    if (!this.selectedSymbol) {
      this.selectedFirstNumber = number.value
      this.complexFirstNumber += this.selectedFirstNumber
      this.selectedFirstNumber = this.complexFirstNumber
    }
    if (this.selectedSymbol) {
      this.selectedSecondNumber = number.value
      this.complexSecondNumber += this.selectedSecondNumber
      this.selectedSecondNumber = this.complexSecondNumber
    }
    if (this.selectedFirstNumber.length >= 14 || this.selectedSecondNumber.length >= 13) {
      this.selectedFirstNumber = this.selectedFirstNumber.substr(0, 14)
      this.selectedSecondNumber = this.selectedSecondNumber.substr(0, 12)
    }
  }

  onSelectSymbol(symbols: Symbols): void {
    this.selectedSymbol = symbols.value
    this.arr.map((i) => { if (this.selectedSymbol === i) this.currentSymbol = i })

    if (this.selectedSymbol === "AC") {
      this.selectedFirstNumber = '0'
      this.selectedSecondNumber = ''
      this.selectedSymbol = ''
      this.currentIteration = ''
      this.complexFirstNumber = ''
      this.complexSecondNumber = ''
    }
    if (this.selectedSymbol === "=") {
      if (this.currentSymbol === "-") this.result = Number(this.selectedFirstNumber) - Number(this.selectedSecondNumber)
      if (this.currentSymbol === "+") this.result = Number(this.selectedFirstNumber) + Number(this.selectedSecondNumber)
      if (this.currentSymbol === "*") this.result = Number(this.selectedFirstNumber) * Number(this.selectedSecondNumber)
      if (this.currentSymbol === ":") this.result = Number(this.selectedFirstNumber) / Number(this.selectedSecondNumber)
      if (this.currentSymbol === ":" && this.selectedFirstNumber === "0") this.result = "0"
      if (this.selectedFirstNumber && this.currentSymbol && this.selectedSecondNumber) {
        this.currentIteration = `${this.selectedFirstNumber} ${this.currentSymbol} ${this.selectedSecondNumber} = ${this.result}`
      }
      this.selectedFirstNumber = String(this.result).substr(0, 14)
      this.result = ''
      this.selectedSecondNumber = ''
      this.selectedSymbol = ''
      this.complexFirstNumber = ''
      this.complexSecondNumber = ''
    }
    if (this.currentSymbol === "AC") this.result = 0
  }
}
