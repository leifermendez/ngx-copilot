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

  public getTemplates = (o = 1) => {
    try {
      this.elementsDomActive = document.querySelectorAll(`.copilot-view.copilot-active`);
      this.elementsDom = document.querySelectorAll(`.copilot-view`);
      if (!(this.elementsDomActive.length)) {
        this.find(o);
      }
    } catch (e) {
      return null;
    }
  }

  public checkInit = (position = 1) => {
    setTimeout(() => {
      this.getParent();
      this.getTemplates(position)
    }, 60)
  }

  public removeWrapper = () => {
    try {
      const body = document.querySelector(`body`) as any;
      const wrapper = document.querySelector(`.ngx-wrapper-overview`) as any;
      const list = document.querySelector(`.copilot-view`) as any;
      const listParent = document.querySelectorAll(`.ngx-copilot-init`) as any;
      Array.from(listParent).map((e: any) => {
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
          const singleZone = single.getBoundingClientRect();
          single.style.backgroundColor = '#cfceff'
          single.classList.add('ngx-copilot-pulse')
          wrapper.classList.add('ngx-copilot-active')
          wrapper.classList.add(`ngx-copilot-active-step-${o}`)
          e.style.display = `block`;
          this.setZone(singleZone)
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

  public setZone = (element = null) => {
    try {
      const {top, left,right, height, bottom} = element
      const centralPointHeight = parseFloat(String(bottom - top)) / 2;
      const centralPointWidth = parseFloat(String(right - left)) / 2;
      let root = document.documentElement;
      root.style.setProperty('--zoneY', parseFloat(left + centralPointWidth) + "px");
      root.style.setProperty('--zoneX', parseFloat(top + centralPointHeight) + "px");
      root.style.setProperty('--zoneSize', parseFloat(height)+ parseFloat(String(height * 0.1)) + "px");
    } catch (e) {
      return null;
    }
  }

  public next = (data = null) => {
    this.nextEmit.emit(data)
  }

}
