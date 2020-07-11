
# Angular Copilot (ngx-copilot)

The most expected has arrived, a package for Angular that facilitates us to improve the experience of our users when guiding them in our interface

<img src="https://badgen.net/npm/dy/ngx-copilot" /> <img src="https://badgen.net/npm/v/ngx-copilot" />  <img src="https://img.shields.io/github/stars/leifermendez/ngx-copilot" /> <img src="https://img.shields.io/github/license/leifermendez/ngx-copilot" />

---

[Live demo](https://ngx-copilot.stackblitz.io/)

[Stackblitz](https://stackblitz.com/edit/ngx-copilot)

<p  align="center" style="display:flex;justify-content: space-between;width:100%;align-content: center;">
<b>Examples</b><br>
<img height="400" src="https://i.imgur.com/mMdMVjq.gif"  alt="Preview 1" />
<br>
<img height="400" src="https://i.imgur.com/HSWTgFq.gif"  alt="Preview 2" />	
</p>

### Install
`npm i ngx-copilot@latest --save`

`npm install animate.css --save`

### Import

__angular.json__

```json
"styles": [
  "./node_modules/animate.css/animate.min.css", 
  "./node_modules/ngx-copilot/src/lib/ngx-copilot.css",

],
```

__app.module.ts__

```typescript
import {BrowserModule} from '@angular/platform-browser';  
import {NgModule} from '@angular/core';  
import {AppComponent} from './app.component';  
/** IMPORT **/
import { NgxCopilotModule } from  'ngx-copilot'; 👈
  
@NgModule({  
  declarations: [  
    AppComponent  
  ],  
  imports: [  
    BrowserModule,  
	NgxCopilotModule 👈
  ],  
  providers: [],  
  bootstrap: [AppComponent]  
})  
export class AppModule {  
}
```
__app.component.html__
```html
<ngx-wrapper-copilot></ngx-wrapper-copilot>
```

### Use

Use in your component
```typescript
import  {Component,  OnInit}  from  '@angular/core'; 
import  {NgxCopilotService}  from  'ngx-copilot';

@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent implements  OnInit {  
	constructor(private  copilot:  NgxCopilotService){}
	
	ngOnInit() {
		this.copilot.checkInit();
	}
	
	/*Re initialize in specify step*/
	initPosition  = (stepNumber:any) =>  this.copilot.checkInit(stepNumber);
	
	/*Next Step*/
	nextStep = (stepNumber:any) =>  this.copilot.next(stepNumber);
	
	/*Finish*/
	done= () =>  this.copilot.removeWrapper();
}
```

### Template
```html
<div>  

	<!--********** TEMPLATE FOR STEP 1  **********-->
	<ng-template  #step1>
		<div  class="copilot-custom">
		<h3>Step 1</h3>
		<p>Hello !</p>
			<div  class="footer-btn">
				<button  (click)="nextStep(2)"  type="button">Next Step 2!</button>
				<button  (click)="done()"  type="button">Done!</button>
			</div>
		</div>
	</ng-template>

	<!--********** TEMPLATE FOR STEP 2  **********-->
	<ng-template  #step2>
		<div  class="copilot-custom">
		<h3>Step 2</h3>
		<p>Bye</p>
			<div  class="footer-btn">
				<button  (click)="nextStep(1)"  type="button">Back Step 1!</button>
				<button  (click)="done()"  type="button">Done!</button>
			</div>
		</div>
	</ng-template>

	<!--********** BODY  **********-->	
	<div copilot
	[copilot-template]="step1" [copilot-step]="1">
	 <button >Focus 1</button>
	</div>

	<div copilot
	[copilot-template]="step2" [copilot-step]="2">
	 <button >Focus 2</button>
	</div>

</div>
```
### Customize

When the `copilot` is active add a class in your body:

__ngx-copilot-active__: Is actived

__ngx-copilot-active-step-(NUMBER STEP)__: Is actived with number step

![](https://i.imgur.com/zqMXbE8.png)

If you want change of overlay color insert in your styles.css: 
```css
:root{
	--zoneColor:rgba(114, 113, 160, 0.5) !important
}
```
<a href="https://www.buymeacoffee.com/leifermendez" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
