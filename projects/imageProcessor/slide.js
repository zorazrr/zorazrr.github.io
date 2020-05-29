export class Slide {

	constructor(name="slide",length=97,max=100,min=-100,stepSize=1,value=0, eventHandler){
		this.length = length;
		this.max = max;
		this.min = min;
		this.stepSize = stepSize;
		this.name = name;
		this.text = document.createElement('text');
		this.eventHandler = eventHandler || function() {};
		this.input = document.createElement('input');
		this.label = document.createElement('label');
	}

	move(changeEvent){
		this.label.innerText = this.input.value;
		this.eventHandler(parseFloat(this.input.value));
	}
	
	draw(element){
		this.text.innerText = this.name;
		this.input.setAttribute('type','range');
		this.input.setAttribute('max',this.max);
		this.input.setAttribute('min',this.min);
		this.input.setAttribute('stepSize',this.stepSize);
		this.input.setAttribute('value',this.value);
		this.input.style.width = this.length + '%';
		this.input.style.margin = '0px';
		this.label.innerText = this.input.value;
		element.appendChild(this.text);
		element.appendChild(this.label);
		element.appendChild(this.input);
		const self = this;
		this.input.addEventListener('change',(changeEvent)=>{
			self.move(changeEvent);
		});
	}
	
	
}
