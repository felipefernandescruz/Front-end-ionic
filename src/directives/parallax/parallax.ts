import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[parallax]',
  host:{
    '(ionScroll)':'onCntscroll($event)',
  }

})
export class ParallaxDirective {
  header:any;
  main_cnt:any;
  ta:any;

  constructor(public elementref: ElementRef, public renderer:Renderer) {
  }
  
  ngOnInit(){
    let cnt = this.elementref.nativeElement.getElementsByClassName('scroll-content')[0];
    this.header = cnt.getElementsByClassName('bg')[0];
    this.main_cnt = cnt.getElementsByClassName('main-cnt')[0];

    this.renderer.setElementStyle(this.header,'webTransformOrigin','center bottom');
    this.renderer.setElementStyle(this.header,'background-size','cover');
    this.renderer.setElementStyle(this.main_cnt, 'position','absolute');
  }
  onCntscroll(ev){
    ev.domWrite(()=>{
      this.update(ev);
    });
  }
  update(ev){
    if(ev.scrollTop>0){
      this.ta = ev.scrollTop/2;
    }
    this.renderer.setElementStyle(this.header,'webkitTransform','translate3d(0,'+ this.ta +'px,0)scale(1,1)');
  }

}
