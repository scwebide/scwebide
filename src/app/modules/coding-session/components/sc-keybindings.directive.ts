import { Directive, OnChanges, HostListener, Input, Output, EventEmitter } from '@angular/core';
import {Range} from 'ace-builds'

@Directive({
  selector: '[ScKeybindings]'
})
export class ScKeybindingsDirective implements OnChanges{
  @Input() ScKeybindings: any;
  @Output()  interpret = new EventEmitter<string>()
  @Output()  clearPostWindow = new EventEmitter<void>()
  constructor() { }

  ace:any;

  ngOnChanges(changes){
    if(changes.ScKeybindings)
      this.setAce(this.ScKeybindings)
  }

  setAce(ace){
    this.ace = ace
    if(!this.ace) return
    this.ace.commands.addCommand({
      name: "help",
      bindKey: {win: "Ctrl-D", mac: "Cmd-D"},
      exec: ()=>this.showHelp()
    });
    this.ace.commands.addCommand({
      name: "execBlock",
      bindKey: {win: "Ctrl-Enter", mac: "Cmd-Enter"},
      exec: ()=>this.interpretCurrentBlock()
    });
    this.ace.commands.addCommand({
      name: "execLine",
      bindKey: {win: "Shift-Enter", mac: "Shift-Enter"},
      exec: ()=>this.interpretCurrentLine()
    });
    this.ace.commands.addCommand({
      name: "cmdPeriod",
      bindKey: {win: "Ctrl-.", mac: "Cmd-."},
      exec: ()=>this.interpret.emit("CmdPeriod.run")
    });
    this.ace.commands.addCommand({
      name: "queryTree",
      bindKey: {win: "Ctrl-T", mac: "Cmd-T"},
      exec: ()=>this.interpret.emit("s.queryAllNodes")
    });
    this.ace.commands.addCommand({
      name: "clearPost",
      bindKey: {win: "Ctrl-P", mac: "Cmd-P"},
      exec: ()=>this.clearPostWindow.emit()
    });

  }

  showHelp(){
    console.log("HJELP")
  }

  stopEvent(e){
    e.stopPropagation();
    e.preventDefault();
  }

  /*@HostListener("keydown", ['$event']) onKeyDown(e){
    console.log("KD", e)
    if(!(e.ctrlKey || e.metaKey || e.shiftKey)) return
    switch(e.key){
      case 'Enter':
        if(e.ctrlKey) this.interpretCurrentBlock()
        else if(e.shiftKey) this.interpretCurrentLine()
        this.stopEvent(e);
        break;
      case '.':
        this.interpret.emit("CmdPeriod.run");
        this.stopEvent(e)
        break;
      case 'p':
        if(e.altKey){
          this.clearPostWindow.emit()
          this.stopEvent(e)
        }
        break;
      case 't':
          if(e.altKey){
            this.interpret.emit("s.queryAllNodes");
            this.stopEvent(e)
          }
          break;

    }
  }*/

  interpretSelection(){
    const selText = this.ace.getCopyText();
    if(selText && selText != ''){
      this.flash(this.ace.getSelectionRange());
      this.interpret.emit(selText);
      return true
    }
    return false
  }


  interpretCurrentLine(){
    if(this.interpretSelection()) return
    const row = this.ace.getCursorPosition().row;
    const code = this.ace.getSession().getLine(row);
    this.flash(new Range(row,0,row,1));
    this.interpret.emit(code);
  }

  interpretCurrentBlock(){
    if(this.interpretSelection()) return
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

    const code = session.getLines(openRow+1,closeRow-1).join('');
    this.flash(new Range(openRow,0,closeRow,1));
    this.interpret.emit(code);
  }

  flash(range){
    // remove all markers
    document.querySelectorAll('.codeFlash').forEach(e=>this.ace.session.removeMarker(e));
    // add new marker
    const marker = this.ace.session.addMarker(range, "codeFlash", "fullLine");
    setTimeout(()=>this.ace.session.removeMarker(marker), 500);

  }

}
