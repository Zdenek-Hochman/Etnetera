export class F {
	constructor() {

	}

	static GenerateEl(TagName, Attrs = null) {
		const NewEl = document.createElement(TagName);;

		if (Attrs !== null && typeof Attrs === "object") {
			this.SetAttributes(NewEl, Attrs);
		}
		return NewEl;
	}

	static SetStyles(Element, Styles) {
		Object.assign(Element.style, Styles);

		return Element;
	}

	static GetStyle(el, style, number = false) {
		if (el !== undefined) {
			const eln = (typeof el !== "object") ? this.StringToHTML(el) : el;

			return (number === true) ? parseInt(eln.style[style].replace(/([^0-9-])+/g, '')) || 0 : eln.style[style];
		}
		return false;
	}

	static SetAttributes(el, attrs) {
		for (let key in attrs) {
			el.setAttribute(key, attrs[key]);
		}
		return el;
	}

	static GetEl(string) {
		return document.querySelector(string);
	}

	static GetElAll(string) {
		return document.querySelectorAll(string);
	}

	static StringToHTML(String) {
		const Support = (function () {
			if (!window.DOMParser) return false;

			const Parser = new DOMParser();

			try { Parser.parseFromString('x', 'text/html'); } catch (err) { return false; }
			return true;
		})();

		if (Support) {
			const Parser = new DOMParser();
			const Doc = Parser.parseFromString(String, 'text/html');

			return Doc.body.firstChild;
		} else {
			const Dom = document.createElement('div');
			Dom.innerHTML = String;

			return Dom.body.firstChild;
		}
	};

	static FadeIn(Element, Duration = 500, Opacity = 1) {
		Element.style.opacity = 0;

		let Last = +new Date();

		const Tick = function () {
			Element.style.opacity = Math.round((+Element.style.opacity + (new Date() - Last) / Duration) * 100) / 100;
			Last = +new Date();

			if (+Element.style.opacity < Opacity)(window.requestAnimationFrame && requestAnimationFrame(Tick)) || setTimeout(Tick, 16);
		};
		Tick();
	}
}
