import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    // constructor(private elementRef: ElementRef, private renderer: Renderer2){

    // }

    // @HostListener('mouseenter') onMouseEnter(){
    //     this.renderer.addClass(this.elementRef.nativeElement, 'open');
    // }

    // @HostListener('mouseleave') onMouseLeave(){
    //     this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    // }

    @HostBinding('class.open') isOpen = false;

    @HostListener('click') onClick(){
        this.isOpen = !this.isOpen;
    }
}