import { Injectable, Renderer2, RendererFactory2, ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef, Type } from '@angular/core';

@Injectable()
export class ModalService {
  private renderer: Renderer2;
  private modalElement!: any;
  public componentRef!: ComponentRef<any>;

  constructor(
    private rendererFactory: RendererFactory2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public openModal(component: Type<any>, data: any): ComponentRef<any> {
    this.modalElement = this.renderer.createElement('div');
    this.renderer.addClass(this.modalElement, 'container-modal');

    this.applyModalStartStyles();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    this.componentRef = componentFactory.create(this.injector, [], this.modalElement);
    this.appRef.attachView(this.componentRef.hostView);

    const instance = this.componentRef.instance;
    instance.data = data;

    this.renderer.appendChild(document.body, this.modalElement);

    return this.componentRef;
  }

  public closeModal(): void {
    if (this.modalElement) {
      this.renderer.removeChild(document.body, this.modalElement);
      this.componentRef.destroy();
      this.modalElement = null;
      document.body.style.overflow = 'auto';
    }
  }

  private applyModalStartStyles(): void {
      document.body.style.overflow = 'hidden';
      this.renderer.setStyle(this.modalElement, 'position', 'fixed');
      this.renderer.setStyle(this.modalElement, 'display', 'flex');
      this.renderer.setStyle(this.modalElement, 'justify-content', 'center');
      this.renderer.setStyle(this.modalElement, 'top', '0px');
      this.renderer.setStyle(this.modalElement, 'height', '100vh');
      this.renderer.setStyle(this.modalElement, 'width', '100vw');
      this.renderer.setStyle(this.modalElement, 'align-items', 'center');
  }
}
