import BaseController from './base-controller';
import * as elements from '../utils/elements';

export default class Toggle extends BaseController {
  constructor(legend, active = false, $container = false, callback = null) {
    super();

    this.type = 'toggle';
    this.legend = legend;
    this._active = active;

    super._applyOptionnalParameters($container, callback);
  }

  set active(bool) {
    this._active = bool;
    this._updateBtn();
  }

  get active() { return this._active; }

  _updateBtn() {
    var method = this.active ? 'add' : 'remove';
    this.$toggle.classList[method]('active');
  }

  render() {
    let content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        ${elements.toggle}
      </div>`;

    this.$el = super.render(this.type);
    this.$el.classList.add('align-small');
    this.$el.innerHTML = content;

    this.$toggle = this.$el.querySelector('.toggle-element');
    this.bindEvents();
    this.active = this._active; // initialize state

    return this.$el;
  }

  bindEvents() {
    this.$toggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.active = !this.active;
      this.emit('change', this.active);
    });
  }
}
