import { Directive, OnChanges, HostListener, Input, Output, EventEmitter } from '@angular/core';
import {Range} from 'ace-builds'

@Directive({
  selector: '[ScKeybindings]'
})
export class ScKeybindingsDirective implements OnChanges{
  @Input() ScKeybindings: any;
  @Output()  interpret = new EventEmitter<string>()
  constructor() { }

  ace:any;

  ngOnChanges(changes){
    if(changes.ScKeybindings)
      this.ace = this.ScKeybindings
  }

  @HostListener("keydown", ['$event']) onKeyDown(e){
    if(!(e.ctrlKey || e.shiftKey)) return
    switch(e.key){
      case 'Enter':
        if(e.ctrlKey) this.interpretCurrentBlock()
        else if(e.shiftKey) this.interpretCurrentLine()
        e.stopPropagation();
        e.preventDefault();
        break;
      case '.':
        this.interpret.emit("CmdPeriod.run");
        e.stopPropagation();
        e.preventDefault();
        break;

    }
    console.log("KD", e)
  }

  interpretCurrentLine(){
    const row = this.ace.getCursorPosition().row;
    const code = this.ace.getSession().getLine(row);
    this.flash(row,row);
    this.interpret.emit(code);
  }

  interpretCurrentBlock(){
    // find opening bracket
    const session = this.ace.getSession();
    let openRow = this.ace.getCursorPosition().row;
    while(openRow >= 0){
      const line = session.getLine(openRow);
      if(line == '(') break;
      openRow -= 1;
    }
    if(openRow < 0) return this.interpretCurrentLine()
    let closeRow = this.ace.getCursorPosition().row;
    let maxRows = session.getLength();
    while(closeRow <= maxRows){
      const line = session.getLine(closeRow);
      if(line == ')') break;
      closeRow += 1;
    }
    if(closeRow > maxRows) return this.interpretCurrentLine()

    const code = session.getLines(openRow,closeRow).join('');
    this.flash(openRow,closeRow);
    this.interpret.emit(code);
  }

  flash(rowStart,rowEnd){
    // remove all markers
    document.querySelectorAll('.codeFlash').forEach(e=>this.ace.session.removeMarker(e));
    // add new marker
    const marker = this.ace.session.addMarker(new Range(rowStart, 0, rowEnd, 1), "codeFlash", "fullLine");
    setTimeout(()=>          this.ace.session.removeMarker(marker), 500);


  }

}