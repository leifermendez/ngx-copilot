import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxCopilotService {
  @Output() template = new EventEmitter<any>();
  @Output() nextEmit = new EventEmitter<any>();
  private elementsDomActive: any;
  private elementsDom: any;

  constructor() {

  }

  private getParent = () => {
    try {
      const wrapper = document.querySelector(`.ngx-wrapper-overview`) as any;
      wrapper.style.display = 'block'
      const copilotsElement = document.querySelectorAll(`.ngx-copilot-init`);
      Array.from(copilotsElement).map(e => {
        const order = e.getAttribute('data-step');
        if (order) {
          this.find(order)
          const el = e.getBoundingClientRect();
          const single = document.querySelector(`.copilot-view-step-${order}`) as any;
          const {top, right, left, bottom, width} = el;
          single.style.marginLeft = `${width}px`;
          single.style.top = `${top}px`;
          single.style.right = `${right}px`;
          single.style.bottom = `${bottom}px`;
          single.style.left = `${left}px`;
        }
      })
    } catch (e) {
      return null;
    }
  }

  public getTemplates = () => {
    try {
      this.elementsDomActive = document.querySelectorAll(`.copilot-view.copilot-active`);
      this.elementsDom = document.querySelectorAll(`.copilot-view`);
      if (!(this.elementsDomActive.length)) {
        this.find(1);
      }
    } catch (e) {
      return null;
    }
  }

  public checkInit = () => {
    setTimeout(() => {
      this.getParent();
      this.getTemplates()
    }, 60)
  }

  public removeWrapper = () => {
    try {
      const body = document.querySelector(`body`) as any;
      const wrapper = document.querySelector(`.ngx-wrapper-overview`) as any;
      const list = document.querySelector(`.copilot-view`) as any;
      const listParent = document.querySelectorAll(`.ngx-copilot-init`) as any;
      Array.from(listParent).map((e: any) => {
        console.log(e)
        e.style.backgroundColor = 'initial'
      });
      Array.from(list).map((e: any) => {
        e.style.display = `none`;
      });
      body.classList.remove('ngx-copilot-active')
      wrapper.style.display = 'none'
    } catch (e) {
      return null;
    }
  }

  public find = (order = null) => {
    try {
      const wrapper = document.querySelector(`body`);
      Array.from(this.elementsDom).map((e: any) => {
        const o = e.getAttribute('step');
        const single = document.querySelector(`.ngx-copilot-init[data-step='${o}']`) as any;
        if (`${order}` === o) {
          single.style.backgroundColor = '#cfceff'
          single.classList.add('ngx-copilot-pulse')
          wrapper.classList.add('ngx-copilot-active')
          wrapper.classList.add(`ngx-copilot-active-step-${o}`)
          e.style.display = `block`;
        } else {
          wrapper.classList.remove(`ngx-copilot-active-step-${o}`)
          single.style.backgroundColor = 'initial'
          single.classList.remove('ngx-copilot-pulse')
          // wrapper.classList.remove('ngx-copilot-active')
          e.style.display = `none`;
        }

      })
    } catch (e) {
      return null
    }
  }

  public next = (data = null) => {
    this.nextEmit.emit(data)
  }

}
