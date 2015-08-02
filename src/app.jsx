var React = require('react');
var Fluxxor = require('fluxxor');

var constants = {
  UPDATE_COUNTER: "UPDATE_COUNTER"
};

var CounterStore = Fluxxor.createStore({
  initialize: function() {
    this.counter = 0;
    // "UPDATE_COUNTER"Actionとカウンター更新のメソッドをbind
    this.bindActions(
      constants.UPDATE_COUNTER, this.onUpdateCounter
    );
  },
  onUpdateCounter: function(payload) {
    this.counter = this.counter + payload.value;
    // Storeを監視するViewに'change'イベントを送信
    this.emit('change');
  },
  getState: function() {
    return { counter: this.counter };
  }
});

var actions = {
  plusCounter: function() {
    // dispatchメソッドによって識別子とパラメータをDispatcherへ配送
    this.dispatch(constants.UPDATE_COUNTER, { value: 1 });
  },
  minusCounter: function() {
    this.dispatch(constants.UPDATE_COUNTER, { value: -1 });
  }
};

// Mixinを使用することでReactとFluxを繋ぐ
var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CounterApp = React.createClass({
  mixins: [ FluxMixin, StoreWatchMixin("CounterStore") ],

  getStateFromFlux: function() {
    // MixinしたことでStoreのデータを取り出せる
    return this.getFlux().store('CounterStore').getState();
  },
  render: function() {
    return <Counter value={this.state.counter} />;
  }
});

var Counter = React.createClass({
  mixins: [ FluxMixin ],
  propTypes: {
    value: React.PropTypes.number.isRequired,
  },
  onClickPlus: function() {
    return this.getFlux().actions.plusCounter();
  },
  onClickMinus: function() {
    return this.getFlux().actions.minusCounter();
  },
  render: function() {
    return (
      <div>
        <span>count: {this.props.value}</span>
        <div>
          <button onClick={this.onClickPlus}>+1</button>
          <button onClick={this.onClickMinus}>-1</button>
        </div>
      </div>
    );
  }
});

var stores = { CounterStore: new CounterStore() };
var flux = new Fluxxor.Flux(stores, actions);

React.render(
  <CounterApp flux={flux} />,
  document.getElementById('app-container')
);
