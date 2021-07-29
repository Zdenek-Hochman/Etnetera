import { F } from "./functions";


export class Graph {
	constructor({
		values = null,
		times = null,
		rules = [{
			rule: [],
			color: "black"
		}]
	} = {}) {
		this.valuesData = values;
		this.timesData = times;
		this.rulesData = rules

		this.#InitGraph();

		this.SetData({
			values: this.valuesData,
			times: this.timesData
		})

		document.querySelector(".graph-section").appendChild(this.#InsertParents());
	}

	SetData({
		values = [],
		times = [],
	}) {
		this.values = values;
		this.timeData = times;
	}

	SetRules(
		rules = [{
			rule: null,
			color: "black",
			label: "default"
		}]
	) {
		const init = this;
		const rulesArray = [];

		rules.forEach((rule) => {
			const ruleOption = rule.rule[0];
			const ruleValue = rule.rule[1];
			const ruleColor = rule.color;
			const ruleLabel = rule.label;

			init.values.forEach((item, index) => {
				if (ruleOption == "biggerThan") {
					const color = (item > ruleValue) ? rule.color : null;

					if (color !== null) {
						rulesArray[index] = color;
					}
				}
			})

			const label = F.GenerateEl("div", {
				class: "labels__label"
			});

			const labelColorSpan = F.GenerateEl("span", {
				class: "labels-color-span"
			});

			F.SetStyles(labelColorSpan, {
				background: ruleColor
			})

			label.innerHTML = ruleLabel;
			label.appendChild(labelColorSpan);
			init.labels.appendChild(label);
		})

		return rulesArray;
	}

	SetOptions({
		viewHoleTime = true,
	}) {

	}

	#CountGraphData() {
		return Math.max(...this.values);
	}

	#InsertParents() {
		const init = this;
		const graphData = this.#CountGraphData();
		const rules = this.SetRules(this.rulesData);

		this.graphHolder.appendChild(this.grapHeader);

		this.values.forEach((item, index) => {

			const size = (((item / graphData))) * 100;

			let column = F.GenerateEl("div", {
				class: "collums__collum",
			});

			column = F.SetStyles(column, {
				height: `${size}%`,
				background: `${rules[index]}`
			});

			init.collums.appendChild(column);
		})
		this.dataHolder.appendChild(this.collums);

		this.timeData.forEach((item) => {
			const time = F.GenerateEl("div", {
				class: "times__time"
			});

			time.innerHTML = item;

			init.times.appendChild(time);
		})
		this.dataHolder.appendChild(this.times);


		this.labelHolder.appendChild(this.labels);
		this.dataHolder.appendChild(this.labelHolder);
		this.graphHolder.appendChild(this.dataHolder);

		return this.graphHolder;
	}

	#InitGraph() {
		this.graphHolder = F.GenerateEl("div", {
			class: "graph"
		});

		this.grapHeader = F.GenerateEl("p", {
			class: "graph__header"
		});

		this.dataHolder = F.GenerateEl("div", {
			class: "data-holder"
		});

		this.collums = F.GenerateEl("div", {
			class: "collums"
		});

		this.times = F.GenerateEl("div", {
			class: "times"
		});

		this.labelHolder = F.GenerateEl("div", {
			class: "label-holder"
		});

		this.labels = F.GenerateEl("div", {
			class: "labels"
		});
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const box = F.GetEl(".navigation");
	let expanded = false;

	F.GetEl(".hamburger").addEventListener('click', function () {
		if (expanded) {
			F.SetStyles(box, {
				"height": 0
			})
			expanded = false;
		} else {
			F.SetStyles(box, {
				"height": "100vh"
			})
			expanded = true;
		}
	});

	F.GetEl('.hamburger').addEventListener('click', function (event) {
		this.classList.toggle("active");
	});

	F.GetEl('.help').addEventListener('click', function (event) {

		if (event.target.getAttribute("class") !== "close-cross" && !this.classList.contains('active')) {
			F.SetStyles(F.GetEl(".help__window"), {
				"display": "block"
			});

			this.classList.add('active');

			F.FadeIn(F.GetEl(".help__window"), 700, 1);
		}
	});

	F.GetEl('.close-cross').addEventListener('click', function (event) {
		F.SetStyles(F.GetEl(".help__window"), {
			"display": "none"
		});

		F.GetEl(".help").classList.remove('active');
	});

	const carouselInstance = new Carousel("carousel");
	carouselInstance.InitCarousel();

	const GraphInit = new Graph({
		values: [50, 83, 82, 75, 20, 50, 70, 130, 125, 105, 69, 65, 61, 30, 40, 70, 59, 110, 91, 100, 100, 65, 65, 40, 96, 70, 60, 50, 30],
		times: ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"],
		rules: [
			{
				rule: ["biggerThan", 0],
				color: "#ffc59b",
				label: "bez fronty"
			},
			{
				rule: ["biggerThan", 60],
				color: "#f88c6c",
				label: "možnost fronty"
			},
			{
				rule: ["biggerThan", 90],
				color: "#e64e21",
				label: "pravděpodobné čekaní ve frontě"
			},
		]
	});
})


class Carousel {
	constructor(className) {
		this.itemClassName = className;
		this.items = F.GetElAll(`.${this.itemClassName}`);
		this.totalItems = this.items.length;
		this.slide = 0;
		this.moving = true;
	}

	SetInitialClasses() {
		this.items[this.totalItems - 1].classList.add("prev");
		this.items[0].classList.add("active");
		this.items[1].classList.add("next");
	}

	SetEventListeners() {
		const INIT = this;

		const next = F.GetEl('.carousel-holder__arrow-button--right');
		const prev = F.GetEl('.carousel-holder__arrow-button--left');

		next.addEventListener('click', function () {
			INIT.MoveNext();
		});

		prev.addEventListener('click', function () {
			INIT.MovePrev();
		});
	}

	DisableInteraction() {
		this.moving = true;

		setTimeout(() => {
			this.moving = false
		}, 500);
	};

	MoveCarouselTo(slide, totalItems) {

		if (!this.moving) {

			this.DisableInteraction();

			let newPrevious = slide - 1,
				newNext = slide + 1,
				oldPrevious = slide - 2,
				oldNext = slide + 2;

			if ((this.totalItems - 1) >= 3) {

				if (newPrevious <= 0) {
					oldPrevious = (this.totalItems - 1);
				} else if (newNext >= (this.totalItems - 1)) {
					oldNext = 0;
				}

				if (slide === 0) {
					newPrevious = (this.totalItems - 1);
					oldPrevious = (this.totalItems - 2);
					oldNext = (slide + 1);
				} else if (slide === (this.totalItems - 1)) {
					newPrevious = (slide - 1);
					newNext = 0;
					oldNext = 1;
				}

				this.items[oldPrevious].className = this.itemClassName;
				this.items[oldNext].className = this.itemClassName;

				this.items[newPrevious].className = this.itemClassName + " prev";
				this.items[slide].className = this.itemClassName + " active";
				this.items[newNext].className = this.itemClassName + " next";
			}
		}
	}

	MoveNext() {
		if (!this.moving) {
			if (this.slide === (this.totalItems - 1)) {
				this.slide = 0;
			} else {
				this.slide++;
			}

			this.MoveCarouselTo(this.slide, this.totalItems);
		}
	}

	MovePrev() {
		if (!this.moving) {

			if (this.slide === 0) {
				this.slide = (this.totalItems - 1);
			} else {
				this.slide--;
			}

			this.MoveCarouselTo(this.slide, this.totalItems);
		}
	}

	InitCarousel() {
		this.SetInitialClasses();
		this.SetEventListeners();

		this.moving = false;
	}
}
