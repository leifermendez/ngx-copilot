import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxCopilotService {
  @Output() template = new EventEmitter<any>();
  @Output() nextEmit = new EventEmitter<any>();
  private elementsDomActive: any;
  private elementsDom: any;
  public tmpColor = null;

  constructor() {

  }

  /**
   * Private functions
   */

  private isInViewport = (el = null) => {
    const rect = el.getBoundingClientRect();
    return {
      view: (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)),
      axis: rect
    };
  };

  private scrollLocated = (element) => new Promise((resolve, reject) => {
    let countFlag = 0;
    const init = 100;
    const options = {block: 'start', behavior: 'smooth'};
    element.scrollIntoView(options);
    const id = setInterval(() => {
      countFlag++;
      const {top} = this.isInViewport(element).axis;
      const fullHeight = (window.innerHeight || document.documentElement.clientHeight);
      const percentaView = parseFloat(String(top * 100)) / fullHeight;
      if ((top < 1) || (countFlag > init)) {
        clearInterval(id);
        if (countFlag > init) {
          reject(false);
        } else {
          resolve(true);
        }
      } else {
        if (countFlag === 20) {
          element.scrollIntoView(options);
        } else if ((countFlag > 5) && (countFlag < 15)) {
          if ((percentaView > 10) && (percentaView < 80)) {
            clearInterval(id);
            resolve(true);
          }
        }
      }
    }, 100);
  });

  private getParent = () => {
    try {
      this.removeWrapper();
      const copilotsElement = document.querySelectorAll(`.ngx-copilot-init`) as any; //Elementos donde se debe hacer foco
      Array.from(copilotsElement).map((e: any) => {
        const order = e.getAttribute('data-step');
        if (order) {
          const el = e.getBoundingClientRect();
          const single = document.querySelector(`.copilot-view-step-${order}`) as any; // Ubicamos el template para ubicarlo donde foco
          const {top, right, left, bottom, width} = el;
          single.style.marginLeft = `${width}px`;
          single.style.top = `${top}px`;
          single.style.right = `${right}px`;
          single.style.bottom = `${bottom}px`;
          single.style.left = `${left}px`;
        }
      });
    } catch (e) {
      return null;
    }
  };

  public getTemplates = (o = '1') => {
    try {
      this.elementsDomActive = document.querySelectorAll(`.copilot-view.copilot-active`);
      this.elementsDom = document.querySelectorAll(`.copilot-view`);
      if (!(this.elementsDomActive.length)) {
        this.find(o);
      }
    } catch (e) {
      return null;
    }
  };

  public checkInit = (position = '1') => {
    // window.scrollTo({ top: 0});
    this.elementsDomActive = {};
    this.elementsDom = {};
    this.tmpColor = null;
    setTimeout(() => {
      this.getParent();
      this.getTemplates(position);
    }, 60);
  };

  public removeWrapper = () => {
    try {
      const body = document.querySelector(`body`);
      const html = document.querySelector(`html`);
      const wrapper = document.querySelector(`.ngx-wrapper-overview`) as any;
      const list = document.querySelector(`.copilot-view`) as any;
      const listParent = document.querySelectorAll(`.ngx-copilot-init`);

      Array.from(document.querySelectorAll(`.copilot-view`)).map((e: any) => {
        if (e && e.style) {
          e.style.display = 'none';
        }
      });
      Array.from(document.querySelectorAll(`.ngx-copilot-pulse`)).map((e) => {
        if (e) {
          e.classList.remove('ngx-copilot-pulse');
        }
      });
      Array.from(listParent).map((e: any) => {
        e.style.backgroundColor = 'initial';
      });
      Array.from(list).map((e: any) => {
        e.style.display = `none`;
      });

      body.classList.remove('ngx-copilot-active');
      wrapper.style.display = 'none';
      html.style.overflow = 'auto';
      body.style.overflow = 'auto';
    } catch (e) {
      return null;
    }
  };

  public find = (order = null) => {
    try {
      const wrapper = document.querySelector(`body`);
      Array.from(document.querySelectorAll(`.copilot-view`)).map((e: any) => {
        const step = e.getAttribute('step'); // Obtenemos el paso al que va el template
        const trace = `.ngx-copilot-init[data-step='${step}']`; // Buscamos el element hacer focus
        const single = document.querySelector(trace) as any;
        if (single) {
          if (`${order}` === step) { // Si el template con el paso y el focus son el mismo mostramos
            const {comode, overviewcolor} = single.dataset;
            single.style.backgroundColor = '#cfceff';
            single.classList.add('ngx-copilot-pulse');
            wrapper.classList.add('ngx-copilot-active');
            wrapper.classList.add(`ngx-copilot-active-step-${step}`);
            /**
             * Fix perfomance
             */
            const checkViewPort = this.isInViewport(single);
            if (checkViewPort.view) { // Yes in viewport
              this.setZone(trace, comode, overviewcolor);
              e.style.display = `block`;
            } else { //Must scrolled
              this.scrollLocated(single).then(() => {
                this.setZone(trace, comode, overviewcolor);
                e.style.display = `block`;
              });
            }
          } else {
            single.style.backgroundColor = 'initial';
            wrapper.classList.remove(`ngx-copilot-active-step-${step}`);
            single.classList.remove('ngx-copilot-pulse');
            wrapper.classList.remove('ngx-copilot-active');
            e.style.display = `none`;
          }
        } else {
        }
      });
    } catch (e) {
      return null;
    }
  };

  public setZone = (element = null, mode = 'vertical', overviewcolor = 'false') => {
    try {
      const html = document.querySelector(`html`) as any;
      const body = document.querySelector(`body`) as any;
      const wrapper = document.querySelector(`.ngx-wrapper-overview`) as any;
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      wrapper.style.display = 'block';
      element = document.querySelector(element);
      const root = document.documentElement;
      const bound = element.getBoundingClientRect();
      const {top, left, right, height, bottom, width} = bound;
      const centralPointHeight = parseFloat(String(bottom - top)) / 2;
      const centralPointWidth = parseFloat(String(right - left)) / 2;
      root.style.setProperty('--zoneY', parseFloat(left + centralPointWidth) + 'px');
      root.style.setProperty('--zoneX', parseFloat(top + centralPointHeight) + 'px');
      if (overviewcolor !== 'false') {
        root.style.setProperty('--zoneColor', overviewcolor);
      } else {
        this.tmpColor = (!this.tmpColor) ? getComputedStyle(root).getPropertyValue('--zoneColor') : this.tmpColor;
        root.style.setProperty('--zoneColor', this.tmpColor);
      }
      if (mode === 'vertical') {
        root.style.setProperty('--zoneSize', parseFloat(height) + parseFloat(String(height * 0.1)) + 'px');
      } else {
        root.style.setProperty('--zoneSize', parseFloat(width) - parseFloat(String(width * 0.5)) + 'px');
      }
    } catch (e) {
      return null;
    }
  };

  public next = (data = null) => {
    this.nextEmit.emit(data);
  };

}
