define('app',["exports", "aurelia-framework", "./graphData"], function (exports, _aureliaFramework, _graphData) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_graphData.GraphData), _dec(_class = function () {
        function App(graphData) {
            _classCallCheck(this, App);

            this.isDisplayed = false;

            this.graphData = graphData;
        }

        App.prototype.activate = function activate() {
            this.changeGraph(this.graphData.lineGraph);
        };

        App.prototype.changeGraph = function changeGraph(chartOptions) {
            this.chartOptions = chartOptions;
        };

        App.prototype.showChart = function showChart(chartOptions) {
            this.hiddenChartOptions = chartOptions;
            this.isDisplayed = true;
        };

        return App;
    }()) || _class);
});
define('chart',["exports", "aurelia-framework", "aurelia-task-queue", "jquery", "highcharts", "highcharts/modules/exporting"], function (exports, _aureliaFramework, _aureliaTaskQueue, _jquery, _highcharts, _exporting) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ChartCustomElement = undefined;

	var _jquery2 = _interopRequireDefault(_jquery);

	var _highcharts2 = _interopRequireDefault(_highcharts);

	var _exporting2 = _interopRequireDefault(_exporting);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}

	var _dec, _class, _desc, _value, _class2, _descriptor;

	var ChartCustomElement = exports.ChartCustomElement = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaTaskQueue.TaskQueue), _dec(_class = (_class2 = function () {
		function ChartCustomElement(element, taskQueue) {
			_classCallCheck(this, ChartCustomElement);

			this.chartDefaults = {
				exporting: {
					buttons: {
						contextButton: {
							menuItems: [{ textKey: 'printChart', onclick: function onclick() {
									this.print();
								} }, { separator: true }, { textKey: 'downloadPNG', onclick: function onclick() {
									this.exportChart();
								} }, { textKey: 'downloadJPEG', onclick: function onclick() {
									this.exportChart({ type: 'image/jpeg' });
								} }, { textKey: 'downloadSVG', onclick: function onclick() {
									this.exportChart({ type: 'image/svg+xml' });
								} }]
						}
					}
				}
			};

			_initDefineProp(this, "chartOptions", _descriptor, this);

			Highcharts.setOptions({
				global: {
					useUTC: false
				}
			});
			this.element = element;
			this.taskQueue = taskQueue;
		}

		ChartCustomElement.prototype.chartOptionsChanged = function chartOptionsChanged(value) {
			var _this = this;

			var newSettings = {};
			_jquery2.default.extend(true, newSettings, this.chartDefaults, value);
			this.taskQueue.queueMicroTask(function () {
				return (0, _jquery2.default)(_this.element).highcharts(newSettings);
			});
		};

		return ChartCustomElement;
	}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "chartOptions", [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	})), _class2)) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('graphData',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var GraphData = exports.GraphData = function GraphData() {
        _classCallCheck(this, GraphData);

        this.lineGraph = {
            title: {
                text: 'Monthly Average Temperature',
                x: -20 },
            subtitle: {
                text: 'Source: WorldClimate.com',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'New York',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: 'Berlin',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        };
        this.pieChart = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser market shares January, 2015 to May, 2015'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: "Brands",
                colorByPoint: true,
                data: [{
                    name: "Microsoft Internet Explorer",
                    y: 56.33
                }, {
                    name: "Chrome",
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: "Firefox",
                    y: 10.38
                }, {
                    name: "Safari",
                    y: 4.77
                }, {
                    name: "Opera",
                    y: 0.91
                }, {
                    name: "Proprietary or Undetectable",
                    y: 0.2
                }]
            }]
        };
    };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n\t<require from=\"bootstrap/css/bootstrap.css\"></require>\r\n\t<div class=\"container-fluid\">\r\n\t\t<div class=\"col-md-offset-4 col-md-4\">\r\n\t\t\t<h1>An Aurelia HighCharts Component</h1>\r\n\r\n\t\t\t<h2>Changing Chart Binding</h2>\r\n\t\t\t<p>\r\n\t\t\t\tThis simple test ensures the Chart control will\r\n\t\t\t\tchange graph when the data is swapped over. It \r\n\t\t\t\talso ensures the graph is drawn within the bounds\r\n\t\t\t\tof the element that contains it.\r\n\t\t\t</p>\r\n\r\n\t\t\t<p>\r\n\t\t\t\tChange the graph with the links below.\r\n\t\t\t</p>\r\n\r\n\t\t\t<p>\r\n\t\t\t\t<a href=\"#\" \r\n\t\t\t\t\tclick.trigger=\"changeGraph(graphData.lineGraph)\">\r\n\t\t\t\t\tLine Graph\r\n\t\t\t\t</a>\r\n\t\t\t</p>\r\n\r\n\t\t\t<p>\r\n\t\t\t\t<a href=\"#\" \r\n\t\t\t\t\tclick.trigger=\"changeGraph(graphData.pieChart)\">\r\n\t\t\t\t\tPie Chart\r\n\t\t\t\t</a>\r\n\t\t\t</p>\r\n\r\n\t\t\t<div class=\"well\">\r\n\t\t\t\t<require from=\"./chart\"></require>\r\n\t\t\t\t<chart chart-options.bind=\"chartOptions\"></chart>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<hr/>\r\n\r\n\t\t\t<h2>Showing Charts Using if.bind</h2>\r\n\t\t\t<p>\r\n\t\t\t\tThis test makes sure I'm using the correct events\r\n\t\t\t\tso that a chart this isn't even rendered yet and\r\n\t\t\t\tthen shown is bound correctly.\r\n\t\t\t</p>\r\n\t\t\t<p>\r\n\t\t\t\t<a href=\"#\" \r\n\t\t\t\t\tclick.trigger=\"showChart(graphData.lineGraph)\"\r\n\t\t\t\t\tif.bind=\"!isDisplayed\">\r\n\t\t\t\t\tShow Graph\r\n\t\t\t\t</a>\r\n\t\t\t</p>\r\n\t\t\t<div class=\"well\" if.bind=\"isDisplayed\">\r\n\t\t\t\t<require from=\"./chart\"></require>\r\n\t\t\t\t<chart chart-options.bind=\"hiddenChartOptions\"></chart>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t</div>\r\n</template>\r\n"; });
define('text!chart.css', ['module'], function(module) { module.exports = "chart {\r\n\tdisplay: block;\r\n}\r\n"; });
define('text!chart.html', ['module'], function(module) { module.exports = "<template>\t\r\n\t<require from=\"./chart.css\"></require>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map