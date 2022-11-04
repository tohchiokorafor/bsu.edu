; /* /bitrix/js/main/core/core_tooltip.js?164242071015458*/
; /* /bitrix/js/main/rating_like.js?164242071033339*/
; /* /bitrix/js/main/core/core_autosave.js?16424207109741*/
; /* /bitrix/js/main/core/core_dd.js?16424207103613*/
; /* /bitrix/js/main/core/core_timer.js?16424207106316*/
; /* /bitrix/js/main/dd.js?164242070714809*/
; /* /bitrix/js/main/pageobject/pageobject.js?1642420709864*/
; /* /bitrix/js/main/core/core_window.js?164242071098371*/
; /* /bitrix/js/main/date/main.date.js?164242071034530*/
; /* /bitrix/js/main/core/core_date.js?164242071036080*/
; /* /bitrix/js/main/utils.js?164242071029279*/
; /* /bitrix/js/main/session.js?16653973153701*/
; /* /bitrix/js/main/core/core_fx.js?164242071016888*/

; /* Start:"a:4:{s:4:"full";s:47:"/bitrix/js/main/core/core_fx.js?164242071016888";s:6:"source";s:31:"/bitrix/js/main/core/core_fx.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
;(function(window){

var defaultOptions = {
	time: 1.0,
	step: 0.05,
	type: 'linear',

	allowFloat: false
}

/*
options: {
	start: start value or {param: value, param: value}
	finish: finish value or {param: value, param: value}
	time: time to transform in seconds
	type: linear|accelerated|decelerated|custom func name
	callback,
	callback_start,
	callback_complete,

	step: time between steps in seconds
	allowFloat: false|true
}
*/
BX.fx = function(options)
{
	this.options = options;

	if (null != this.options.time)
		this.options.originalTime = this.options.time;
	if (null != this.options.step)
		this.options.originalStep = this.options.step;

	if (!this.__checkOptions())
		return false;

	this.__go = BX.delegate(this.go, this);

	this.PARAMS = {};
}

BX.fx.prototype.__checkOptions = function()
{
	if (typeof this.options.start != typeof this.options.finish)
		return false;

	if (null == this.options.time) this.options.time = defaultOptions.time;
	if (null == this.options.step) this.options.step = defaultOptions.step;
	if (null == this.options.type) this.options.type = defaultOptions.type;
	if (null == this.options.allowFloat) this.options.allowFloat = defaultOptions.allowFloat;

	this.options.time *= 1000;
	this.options.step *= 1000;

	if (typeof this.options.start != 'object')
	{
		this.options.start = {_param: this.options.start};
		this.options.finish = {_param: this.options.finish};
	}

	var i;
	for (i in this.options.start)
	{
		if (null == this.options.finish[i])
		{
			this.options.start[i] = null;
			delete this.options.start[i];
		}
	}

	if (!BX.type.isFunction(this.options.type))
	{
		if (BX.type.isFunction(window[this.options.type]))
			this.options.type = window[this.options.type];
		else if (BX.type.isFunction(BX.fx.RULES[this.options.type]))
			this.options.type = BX.fx.RULES[this.options.type];
		else
			this.options.type = BX.fx.RULES[defaultOptions.type];
	}

	return true;
}

BX.fx.prototype.go = function()
{
	var timeCurrent = new Date().valueOf();
	if (timeCurrent < this.PARAMS.timeFinish)
	{
		for (var i in this.PARAMS.current)
		{
			this.PARAMS.current[i][0] = this.options.type.apply(this, [{
				start_value: this.PARAMS.start[i][0],
				finish_value: this.PARAMS.finish[i][0],
				current_value: this.PARAMS.current[i][0],
				current_time: timeCurrent - this.PARAMS.timeStart,
				total_time: this.options.time
			}]);
		}

		this._callback(this.options.callback);

		if (!this.paused)
			this.PARAMS.timer = setTimeout(this.__go, this.options.step);
	}
	else
	{
		this.stop();
	}
}

BX.fx.prototype._callback = function(cb)
{
	var tmp = {};

	cb = cb || this.options.callback;

	for (var i in this.PARAMS.current)
	{
		tmp[i] = (this.options.allowFloat ? this.PARAMS.current[i][0] : Math.round(this.PARAMS.current[i][0])) + this.PARAMS.current[i][1];
	}

	return cb.apply(this, [null != tmp['_param'] ? tmp._param : tmp]);
}

BX.fx.prototype.start = function()
{
	var i,value, unit;

	this.PARAMS.start = {};
	this.PARAMS.current = {};
	this.PARAMS.finish = {};

	for (i in this.options.start)
	{
		value = +this.options.start[i];
		unit = (this.options.start[i]+'').substring((value+'').length);
		this.PARAMS.start[i] = [value, unit];
		this.PARAMS.current[i] = [value, unit];
		this.PARAMS.finish[i] = [+this.options.finish[i], unit];
	}

	this._callback(this.options.callback_start);
	this._callback(this.options.callback);

	this.PARAMS.timeStart = new Date().valueOf();
	this.PARAMS.timeFinish = this.PARAMS.timeStart + this.options.time;
	this.PARAMS.timer = setTimeout(BX.delegate(this.go, this), this.options.step);

	return this;
}

BX.fx.prototype.pause = function()
{
	if (this.paused)
	{
		this.PARAMS.timer = setTimeout(this.__go, this.options.step);
		this.paused = false;
	}
	else
	{
		clearTimeout(this.PARAMS.timer);
		this.paused = true;
	}
}

BX.fx.prototype.stop = function(silent)
{
	silent = !!silent;
	if (this.PARAMS.timer)
		clearTimeout(this.PARAMS.timer);

	if (null != this.options.originalTime)
		this.options.time = this.options.originalTime;
	if (null != this.options.originalStep)
		this.options.step = this.options.originalStep;

	this.PARAMS.current = this.PARAMS.finish;
	if (!silent) {
		this._callback(this.options.callback);
		this._callback(this.options.callback_complete);
	}
}

/*
type rules of animation
 - linear - simple linear animation
 - accelerated
 - decelerated
*/

/*
	params: {
		start_value, finish_value, current_time, total_time
	}
*/
BX.fx.RULES =
{
	linear: function(params)
	{
		return params.start_value + (params.current_time/params.total_time) * (params.finish_value - params.start_value);
	},

	decelerated: function(params)
	{
		return params.start_value + Math.sqrt(params.current_time/params.total_time) * (params.finish_value - params.start_value);
	},

	accelerated: function(params)
	{
		var q = params.current_time/params.total_time;
		return params.start_value + q * q * (params.finish_value - params.start_value);
	}
}

/****************** effects realizaion ************************/

/*
	type = 'fade' || 'scroll' || 'scale' || 'fold'
*/

BX.fx.hide = function(el, type, opts)
{
	el = BX(el);

	if (typeof type == 'object' && null == opts)
	{
		opts = type;
		type = opts.type
	}

	if (!opts) opts = {};

	if (!BX.type.isNotEmptyString(type))
	{
		el.style.display = 'none';
		return;
	}

	var fxOptions = BX.fx.EFFECTS[type](el, opts, 0);
	fxOptions.callback_complete = function () {
		if (opts.hide !== false)
			el.style.display = 'none';

		if (opts.callback_complete)
			opts.callback_complete.apply(this, arguments);
	}

	return (new BX.fx(fxOptions)).start();
}

BX.fx.show = function(el, type, opts)
{
	el = BX(el);

	if (typeof type == 'object' && null == opts)
	{
		opts = type;
		type = opts.type
	}

	if (!opts) opts = {};

	if (!BX.type.isNotEmptyString(type))
	{
		el.style.display = 'block';
		return;
	}

	var fxOptions = BX.fx.EFFECTS[type](el, opts, 1);

	fxOptions.callback_complete = function () {
		if (opts.show !== false)
			el.style.display = 'block';

		if (opts.callback_complete)
			opts.callback_complete.apply(this, arguments);
	}

	return (new BX.fx(fxOptions)).start();
}

BX.fx.EFFECTS = {
	scroll: function(el, opts, action)
	{
		if (!opts.direction) opts.direction = 'vertical';

		var param = opts.direction == 'horizontal' ? 'width' : 'height';

		var val = parseInt(BX.style(el, param));
		if (isNaN(val))
		{
			val = BX.pos(el)[param];
		}

		if (action == 0)
			var start = val, finish = opts.min_height ? parseInt(opts.min_height) : 0;
		else
			var finish = val, start = opts.min_height ? parseInt(opts.min_height) : 0;

		return {
			'start': start,
			'finish': finish,
			'time': opts.time || defaultOptions.time,
			'type': 'linear',
			callback_start: function () {
				if (BX.style(el, 'position') == 'static')
					el.style.position = 'relative';

				el.style.overflow = 'hidden';
				el.style[param] = start + 'px';
				el.style.display = 'block';
			},
			callback: function (val) {el.style[param] = val + 'px';}
		}
	},

	fade: function(el, opts, action)
	{
		var fadeOpts = {
			'time': opts.time || defaultOptions.time,
			'type': action == 0 ? 'decelerated' : 'linear',
			'start': action == 0 ? 1 : 0,
			'finish': action == 0 ? 0 : 1,
			'allowFloat': true
		};

		if (BX.browser.IsIE() && !BX.browser.IsIE9())
		{
			fadeOpts.start *= 100; fadeOpts.finish *= 100; fadeOpts.allowFloat = false;

			fadeOpts.callback_start = function() {
				el.style.display = 'block';
				el.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=" + fadeOpts.start + ")";
			};

			fadeOpts.callback = function (val) {
				(el.filters['DXImageTransform.Microsoft.alpha']||el.filters.alpha).opacity = val;
			}
		}
		else
		{
			fadeOpts.callback_start = function () {
				el.style.display = 'block';
			}

			fadeOpts.callback = function (val) {
				el.style.opacity = el.style.KhtmlOpacity = el.style.MozOpacity = val;
			};
		}

		return fadeOpts;
	},

	fold: function (el, opts, action) // 'fold' is a combination of two consequential 'scroll' hidings.
	{
		if (action != 0) return;

		var pos = BX.pos(el);
		var coef = pos.height / (pos.width + pos.height);
		var old_opts = {time: opts.time || defaultOptions.time, callback_complete: opts.callback_complete, hide: opts.hide};

		opts.type = 'scroll';
		opts.direction = 'vertical';
		opts.min_height = opts.min_height || 10;
		opts.hide = false;
		opts.time = coef * old_opts.time;
		opts.callback_complete = function()
		{
			el.style.whiteSpace = 'nowrap';

			opts.direction = 'horizontal';
			opts.min_height = null;

			opts.time = old_opts.time - opts.time;
			opts.hide = old_opts.hide;
			opts.callback_complete = old_opts.callback_complete;

			BX.fx.hide(el, opts);
		}

		return BX.fx.EFFECTS.scroll(el, opts, action);
	},

	scale: function (el, opts, action)
	{
		var val = {width: parseInt(BX.style(el, 'width')), height: parseInt(BX.style(el, 'height'))};
		if (isNaN(val.width) || isNaN(val.height))
		{
			var pos = BX.pos(el)
			val = {width: pos.width, height: pos.height};
		}

		if (action == 0)
			var start = val, finish = {width: 0, height: 0};
		else
			var finish = val, start = {width: 0, height: 0};

		return {
			'start': start,
			'finish': finish,
			'time': opts.time || defaultOptions.time,
			'type': 'linear',
			callback_start: function () {
				el.style.position = 'relative';
				el.style.overflow = 'hidden';
				el.style.display = 'block';
				el.style.height = start.height + 'px';
				el.style.width = start.width + 'px';
			},
			callback: function (val) {
				el.style.height = val.height + 'px';
				el.style.width = val.width + 'px';
			}
		}
	}
}

// Color animation
//
// Set animation rule
// BX.fx.colorAnimate.addRule('animationRule1',"#FFF","#faeeb4", "background-color", 100, 1, true);
// BX.fx.colorAnimate.addRule('animationRule2',"#fc8282","#ff0000", "color", 100, 1, true);
// Params: 1 - animation name, 2 - start color, 3 - end color, 4 - count step, 5 - delay each step, 6 - return color on end animation
//
// Animate color for element
// BX.fx.colorAnimate(BX('element'), 'animationRule1,animationRule2');

var defaultOptionsColorAnimation = {
	arStack: {},
	arRules: {},
	globalAnimationId: 0
}

BX.fx.colorAnimate = function(element, rule, back)
{
	if (element == null)
		return;

	animationId = element.getAttribute('data-animation-id');
	if (animationId == null)
	{
		animationId = defaultOptionsColorAnimation.globalAnimationId;
		element.setAttribute('data-animation-id', defaultOptionsColorAnimation.globalAnimationId++);
	}
	var aRuleList = rule.split(/\s*,\s*/);

	for (var j	= 0; j < aRuleList.length; j++)
	{
		rule = aRuleList[j];

		if (!defaultOptionsColorAnimation.arRules[rule]) continue;

		var i=0;

		if (!defaultOptionsColorAnimation.arStack[animationId])
		{
			defaultOptionsColorAnimation.arStack[animationId] = {};
		}
		else if (defaultOptionsColorAnimation.arStack[animationId][rule])
		{
			i = defaultOptionsColorAnimation.arStack[animationId][rule].i;
			clearInterval(defaultOptionsColorAnimation.arStack[animationId][rule].tId);
		}

		if ((i==0 && back) || (i==defaultOptionsColorAnimation.arRules[rule][3] && !back)) continue;

		defaultOptionsColorAnimation.arStack[animationId][rule] = {'i':i, 'element': element, 'tId':setInterval('BX.fx.colorAnimate.run("'+animationId+'","'+rule+'")', defaultOptionsColorAnimation.arRules[rule][4]),'back':Boolean(back)};
	}
}

BX.fx.colorAnimate.addRule = function (rule, startColor, finishColor, cssProp, step, delay, back)
{
	defaultOptionsColorAnimation.arRules[rule] = [
		BX.util.hex2rgb(startColor),
		BX.util.hex2rgb(finishColor),
		cssProp.replace(/\-(.)/g,function(){return arguments[1].toUpperCase();}),
		step,
		delay || 1,
		back || false
	];
};

BX.fx.colorAnimate.run = function(animationId, rule)
{
	element = defaultOptionsColorAnimation.arStack[animationId][rule].element;

    defaultOptionsColorAnimation.arStack[animationId][rule].i += defaultOptionsColorAnimation.arStack[animationId][rule].back?-1:1;
 	var finishPercent = defaultOptionsColorAnimation.arStack[animationId][rule].i/defaultOptionsColorAnimation.arRules[rule][3];
	var startPercent = 1 - finishPercent;

	var aRGBStart = defaultOptionsColorAnimation.arRules[rule][0];
	var aRGBFinish = defaultOptionsColorAnimation.arRules[rule][1];

	element.style[defaultOptionsColorAnimation.arRules[rule][2]] = 'rgb('+
	Math.floor( aRGBStart['r'] * startPercent + aRGBFinish['r'] * finishPercent ) + ','+
	Math.floor( aRGBStart['g'] * startPercent + aRGBFinish['g'] * finishPercent ) + ','+
	Math.floor( aRGBStart['b'] * startPercent + aRGBFinish['b'] * finishPercent ) +')';

	if ( defaultOptionsColorAnimation.arStack[animationId][rule].i == defaultOptionsColorAnimation.arRules[rule][3] || defaultOptionsColorAnimation.arStack[animationId][rule].i ==0)
	{
		clearInterval(defaultOptionsColorAnimation.arStack[animationId][rule].tId);
		if (defaultOptionsColorAnimation.arRules[rule][5])
			BX.fx.colorAnimate(defaultOptionsColorAnimation.arStack[animationId][rule].element, rule, true);
	}
}


/*
options = {
	delay: 100,
	duration : 3000,
	start : { scroll : document.body.scrollTop, left : 0, opacity :  100 },
	finish : { scroll : document.body.scrollHeight, left : 500, opacity : 10 },
	transition : BitrixAnimation.makeEaseOut(BitrixAnimation.transitions.quart),

	step : function(state)
	{
		document.body.scrollTop = state.scroll;
		button.style.left =  state.left + "px";
		button.style.opacity =  state.opacity / 100;
	},
	complete : function()
	{
		button.style.background = "green";
	}
}

options =
{
	delay : 20,
	duration : 4000,
	transition : BXAnimation.makeEaseOut(BXAnimation.transitions.quart),
	progress : function(progress)
	{
		document.body.scrollTop = Math.round(topMax * progress);
		button.style.left =  Math.round(leftMax * progress) + "px";
		button.style.opacity =  (100 + Math.round((opacityMin - 100) * progress)) / 100;

	},
	complete : function()
	{
		button.style.background = "green";
	}
}
*/

BX.easing = function(options)
{
	this.options = options;
	this.timer = null;
};

BX.easing.prototype.animate = function()
{
	if (!this.options || !this.options.start || !this.options.finish ||
		typeof(this.options.start) != "object" || typeof(this.options.finish) != "object"
		)
		return null;

	for (var propName in this.options.start)
	{
		if (typeof(this.options.finish[propName]) == "undefined")
		{
			delete this.options.start[propName];
		}
	}

	this.options.progress = function(progress) {
		var state = {};
		for (var propName in this.start)
			state[propName] = Math.round(this.start[propName] + (this.finish[propName] - this.start[propName]) * progress);

		if (this.step)
		{
			this.step(state);
		}
	};

	this.animateProgress();
};

BX.easing.prototype.stop = function(completed)
{
	if (this.timer)
	{
		cancelAnimationFrame(this.timer);
		this.timer = null;
		if (completed)
		{
			this.options.complete && this.options.complete();
		}
	}
};

BX.easing.prototype.animateProgress = function()
{
	if (!window.requestAnimationFrame)
	{
		//For old browsers we skip animation
		this.options.progress(1);
		this.options.complete && this.options.complete();
		return;
	}

	var start = null;
	var delta = this.options.transition || BX.easing.transitions.linear;
	var duration = this.options.duration || 1000;
	var animation = BX.proxy(function(time) {

		if (start === null)
		{
			start = time;
		}

		var progress = (time - start) / duration;
		if (progress > 1)
		{
			progress = 1;
		}

		this.options.progress(delta(progress));

		if (progress == 1)
		{
			this.stop(true);
		}
		else
		{
			this.timer = requestAnimationFrame(animation);
		}

	}, this);

	this.timer = requestAnimationFrame(animation);
};

BX.easing.makeEaseInOut = function(delta)
{
	return function(progress) {
		if (progress < 0.5)
			return delta( 2 * progress ) / 2;
		else
			return (2 - delta( 2 * (1-progress) ) ) / 2;
	}
};

BX.easing.makeEaseOut = function(delta)
{
	return function(progress) {
		return 1 - delta(1 - progress);
	};
};

BX.easing.transitions = {

	linear : function(progress)
	{
		return progress;
	},

	quad : function(progress)
	{
		return Math.pow(progress, 2);
	},

	cubic : function(progress) {
		return Math.pow(progress, 3);
	},

	quart : function(progress)
	{
		return Math.pow(progress, 4);
	},

	quint : function(progress)
	{
		return Math.pow(progress, 5);
	},

	circ : function(progress)
	{
		return 1 - Math.sin(Math.acos(progress));
	},

	back : function(progress)
	{
		return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5);
	},

	elastic: function(progress)
	{
		return Math.pow(2, 10 * (progress-1)) * Math.cos(20 * Math.PI * 1.5/3 * progress);
	},

	bounce : function(progress)
	{
		for(var a = 0, b = 1; 1; a += b, b /= 2) {
			if (progress >= (7 - 4 * a) / 11) {
				return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
			}
		}
	}};


})(window);


/* End */
;
; /* Start:"a:4:{s:4:"full";s:41:"/bitrix/js/main/session.js?16653973153701";s:6:"source";s:26:"/bitrix/js/main/session.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function CBXSession()
{
	var _this = this;
	this.dateInput = new Date();
	this.dateCheck = new Date();
	this.dateHit = new Date();
	this.notifier = null;
	this.checkInterval = 60;
	this.checkImmediately = false;

	this.Expand = function(key)
	{
		this.key = key;

		BX.ready(function(){
			BX.bind(document, "keypress", _this.OnUserInput);
			BX.bind(document.body, "mousemove", _this.OnUserInput);
			BX.bind(document.body, "click", _this.OnUserInput);

			//check the state once in a minute
			setInterval(_this.CheckSession, _this.checkInterval*1000);
		})
	};

	this.OnUserInput = function()
	{
		var currentDate = new Date();
		_this.dateInput.setTime(currentDate.valueOf());

		if ((currentDate - _this.dateHit)/1000 > (_this.checkInterval + 5) && _this.checkImmediately === false)
		{
			// last hit was long time ago, need to recheck immediately
			_this.checkImmediately = true;
			_this.CheckSession();
		}
	};

	this.CheckSession = function()
	{
		var currentDate = new Date();

		if((currentDate - _this.dateCheck)/1000 < (_this.checkInterval - 1) && _this.checkImmediately === false)
		{
			//storm protection, e.g. after PC wake-up
			return;
		}

		_this.dateCheck.setTime(currentDate.valueOf());

		if(_this.dateInput > _this.dateHit)
		{
			//there was input after the last hit, expand/check the session
			var config = {
				'method': 'GET',
				'headers': [
					{'name': 'X-Bitrix-Csrf-Token', 'value': BX.bitrix_sessid()}
				],
				'dataType': 'html',
				'url': '/bitrix/tools/public_session.php?k='+_this.key,
				'data':  '',
				'onsuccess': function(data){_this.CheckResult(data)},
				'lsId': 'sess_expand', //caching the result in the local storage for multiple tabs
				'lsTimeout': _this.checkInterval - 5 //some delta for response time
			};
			BX.ajax(config);
		}
	};

	this.CheckResult = function(data)
	{
		var currentDate = new Date();
		_this.dateHit.setTime(currentDate.valueOf());
		_this.checkImmediately = false;

		if(data == 'SESSION_EXPIRED')
		{
			if(BX.message("SessExpired"))
			{
				if(!_this.notifier)
				{
					_this.notifier = document.body.appendChild(BX.create('DIV', {
						props: {className: 'bx-session-message'},
						style: {
							top: '0',
							backgroundColor: '#FFEB41',
							border: '1px solid #EDDA3C',
							width: '630px',
							fontFamily: 'Arial,Helvetica,sans-serif',
							fontSize: '13px',
							fontWeight: 'bold',
							textAlign: 'center',
							color: 'black',
							position: 'absolute',
							zIndex: '10000',
							padding: '10px'
						},
						html: '<a class="bx-session-message-close" ' +
							'style="display:block; width:12px; height:12px; background:url(bitrix/js/main/core/images/close.gif) center no-repeat; float:right;" ' +
							'href="javascript:bxSession.Close()"></a>' +
							BX.message("SessExpired")
					}));

					BX.ZIndexManager.register(_this.notifier);
					BX.ZIndexManager.bringToFront(_this.notifier);

					var windowScroll = BX.GetWindowScrollPos();
					var windowSize = BX.GetWindowInnerSize();

					_this.notifier.style.left = parseInt(windowScroll.scrollLeft + (windowSize.innerWidth / 2) - (parseInt(_this.notifier.clientWidth) / 2)) + 'px';

					if(BX.browser.IsIE())
					{
						_this.notifier.style.top = windowScroll.scrollTop + 'px';

						BX.bind(window, 'scroll', function()
						{
							var windowScroll = BX.GetWindowScrollPos();
							_this.notifier.style.top = windowScroll.scrollTop + 'px';
						});
					}
					else
					{
						_this.notifier.style.position='fixed';
					}
				}

				_this.notifier.style.display = '';
			}
		}
	};

	this.Close = function()
	{
		this.notifier.style.display = 'none';
	}
}

var bxSession = new CBXSession();

/* End */
;
; /* Start:"a:4:{s:4:"full";s:54:"/bitrix/js/main/pageobject/pageobject.js?1642420709864";s:6:"source";s:40:"/bitrix/js/main/pageobject/pageobject.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
window.BX = BX || {};

BX.PageObject = {
	getRootWindow: function()
	{
		return BX.PageObject.getTopWindowOfCurrentHost(window);
	},

	isCrossOriginObject: function(currentWindow)
	{
		try
		{
			void currentWindow.location.host;
		}
		catch (e)
		{
			// cross-origin object
			return true;
		}

		return false;
	},

	getTopWindowOfCurrentHost: function(currentWindow)
	{
		if (
			!BX.PageObject.isCrossOriginObject(currentWindow.parent)
			&& currentWindow.parent !== currentWindow
			&& currentWindow.parent.location.host === currentWindow.location.host
		)
		{
			return BX.PageObject.getTopWindowOfCurrentHost(currentWindow.parent);
		}

		return currentWindow;
	},

	getParentWindowOfCurrentHost: function(currentWindow)
	{
		if (BX.PageObject.isCrossOriginObject(currentWindow.parent))
		{
			return currentWindow;
		}

		return currentWindow.parent;
	}
};
/* End */
;
; /* Start:"a:4:{s:4:"full";s:51:"/bitrix/js/main/core/core_window.js?164242071098371";s:6:"source";s:35:"/bitrix/js/main/core/core_window.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
;(function(window) {
if (BX.WindowManager) return;

/* windows manager */
BX.WindowManager = {
	_stack: [],
	_runtime_resize: {},
	_delta: 2,
	_delta_start: 1000,
	currently_loaded: null,

	settings_category: 'BX.WindowManager.9.5',

	register: function (w)
	{
		this.currently_loaded = null;

		w.WM_REG_INDEX = this._stack.length;
		this._stack.push(w);

		if (this._stack.length < 2)
		{
			BX.bind(document, 'keyup', BX.proxy(this.__checkKeyPress, this));
		}
	},

	unregister: function (w)
	{
		if (null == w.WM_REG_INDEX)
			return null;

		var _current;
		if (this._stack.length > 0)
		{
			while ((_current = this.__pop_stack()) != w)
			{
				if (!_current)
				{
					_current = null;
					break;
				}
			}

			if (this._stack.length <= 0)
			{
				this.enableKeyCheck();
			}

			return _current;
		}
		else
		{
			return null;
		}
	},

	__pop_stack: function(clean)
	{
		if (this._stack.length > 0)
		{
			var _current = this._stack.pop();
			_current.WM_REG_INDEX = null;
			BX.onCustomEvent(_current, 'onWindowUnRegister', [clean === true]);

			return _current;
		}
		else
			return null;
	},

	clean: function()
	{
		while (this.__pop_stack(true)){}
		this._stack = null;
		this.disableKeyCheck();
	},

	Get: function()
	{
		if (this.currently_loaded)
			return this.currently_loaded;
		else if (this._stack.length > 0)
			return this._stack[this._stack.length-1];
		else
			return null;
	},

	setStartZIndex: function(value)
	{
		this._delta_start = value;
	},

	restoreStartZIndex: function()
	{
		this._delta_start = 1000;
	},

	GetZIndex: function()
	{
		var _current;
		return (null != (_current = this._stack[this._stack.length-1])
			? parseInt(_current.Get().style.zIndex) + this._delta
			: this._delta_start
		);
	},

	__get_check_url: function(url)
	{
		var pos = url.indexOf('?');
		return pos == -1 ? url : url.substring(0, pos);
	},

	saveWindowSize: function(url, params)
	{
		var check_url = this.__get_check_url(url);
		if (BX.userOptions)
		{
			BX.userOptions.save(this.settings_category, 'size_' + check_url, 'width', params.width);
			BX.userOptions.save(this.settings_category, 'size_' + check_url, 'height', params.height);
		}

		this._runtime_resize[check_url] = params;
	},

	saveWindowOptions: function(wnd_id, opts)
	{
		if (BX.userOptions)
		{
			for (var i in opts)
			{
				if(opts.hasOwnProperty(i))
				{
					BX.userOptions.save(this.settings_category, 'options_' + wnd_id, i, opts[i]);
				}
			}
		}
	},

	getRuntimeWindowSize: function(url)
	{
		return this._runtime_resize[this.__get_check_url(url)];
	},

	disableKeyCheck: function()
	{
		BX.unbind(document, 'keyup', BX.proxy(this.__checkKeyPress, this));
	},

	enableKeyCheck: function()
	{
		BX.bind(document, 'keyup', BX.proxy(this.__checkKeyPress, this));
	},

	__checkKeyPress: function(e)
	{
		if (null == e)
			e = window.event;

		if (e.keyCode == 27)
		{
			var wnd = BX.WindowManager.Get();
			if (wnd && !wnd.unclosable) wnd.Close();
		}
	}
};

BX.garbage(BX.WindowManager.clean, BX.WindowManager);

/* base button class */
BX.CWindowButton = function(params)
{
	if (params.btn)
	{
		this.btn = params.btn;
		this.parentWindow = params.parentWindow;

		if (/save|apply/i.test(this.btn.name))
		{
			BX.bind(this.btn, 'click', BX.delegate(this.disableUntilError, this));
		}
	}
	else
	{
		this.title = params.title; // html value attr
		this.hint = params.hint; // html title attr
		this.id = params.id; // html name and id attrs
		this.name = params.name; // html name or value attrs when id and title 're absent
		this.className = params.className; // className for button input

		this.action = params.action;
		this.onclick = params.onclick;

		// you can override button creation method
		if (params.Button && BX.type.isFunction(params.Button))
			this.Button = params.Button;

		this.btn = null;
	}
};

BX.CWindowButton.prototype.disable = function()
{
	if (this.btn)
		this.parentWindow.showWait(this.btn);
};
BX.CWindowButton.prototype.enable = function(){
	if (this.btn)
		this.parentWindow.closeWait(this.btn);
};

BX.CWindowButton.prototype.emulate = function()
{
	if (this.btn && this.btn.disabled)
		return;

	var act =
		this.action
		? BX.delegate(this.action, this)
		: (
			this.onclick
			? this.onclick
			: (
				this.btn
				? this.btn.getAttribute('onclick')
				: ''
			)
		);

	if (act)
	{
		setTimeout(act, 50);
		if (this.btn && /save|apply/i.test(this.btn.name) && !this.action)
		{
			this.disableUntilError();
		}
	}
};

BX.CWindowButton.prototype.Button = function(parentWindow)
{
	this.parentWindow = parentWindow;

	var btn = {
		props: {
			'type': 'button',
			'name': this.id ? this.id : this.name,
			'value': this.title ? this.title : this.name,
			'id': this.id
		}
	};

	if (this.hint)
		btn.props.title = this.hint;
	if (!!this.className)
		btn.props.className = this.className;

	if (this.action)
	{
		btn.events = {
			'click': BX.delegate(this.action, this)
		};
	}
	else if (this.onclick)
	{
		if (BX.browser.IsIE())
		{
			btn.events = {
				'click': BX.delegate(function() {eval(this.onclick)}, this)
			};
		}
		else
		{
			btn.attrs = {
				'onclick': this.onclick
			};
		}
	}

	this.btn = BX.create('INPUT', btn);

	return this.btn;
};

BX.CWindowButton.prototype.disableUntilError = function() {
	this.disable();
	if (!this.__window_error_handler_set)
	{
		BX.addCustomEvent(this.parentWindow, 'onWindowError', BX.delegate(this.enable, this));
		this.__window_error_handler_set = true;
	}
};

/* base window class */
BX.CWindow = function(div, type)
{
	this.DIV = div || document.createElement('DIV');

	this.SETTINGS = {
		resizable: false,
		min_height: 0,
		min_width: 0,
		top: 0,
		left: 0,
		draggable: false,
		drag_restrict: true,
		resize_restrict: true
	};

	this.ELEMENTS = {
		draggable: [],
		resizer: [],
		close: []
	};

	this.type = type == 'float' ? 'float' : 'dialog';

	BX.adjust(this.DIV, {
		props: {
			className: 'bx-core-window'
		},
		style: {
			'zIndex': 0,
			'position': 'absolute',
			'display': 'none',
			'top': this.SETTINGS.top + 'px',
			'left': this.SETTINGS.left + 'px',
			'height': '100px',
			'width': '100px'
		}
	});

	this.isOpen = false;

	BX.addCustomEvent(this, 'onWindowRegister', BX.delegate(this.onRegister, this));
	BX.addCustomEvent(this, 'onWindowUnRegister', BX.delegate(this.onUnRegister, this));

	this.MOUSEOVER = null;
	BX.bind(this.DIV, 'mouseover', BX.delegate(this.__set_msover, this));
	BX.bind(this.DIV, 'mouseout', BX.delegate(this.__unset_msover, this));

	BX.ready(BX.delegate(function() {
		document.body.appendChild(this.DIV);
		BX.ZIndexManager.register(this.DIV);
	}, this));
};

BX.CWindow.prototype.Get = function () {return this.DIV};
BX.CWindow.prototype.visible = function() {return this.isOpen;};

BX.CWindow.prototype.Show = function(bNotRegister)
{
	this.DIV.style.display = 'block';

	if (!bNotRegister)
	{
		BX.WindowManager.register(this);
		BX.onCustomEvent(this, 'onWindowRegister');
	}

	BX.ZIndexManager.bringToFront(this.DIV);
};

BX.CWindow.prototype.Hide = function()
{
	BX.WindowManager.unregister(this);
	this.DIV.style.display = 'none';
};

BX.CWindow.prototype.onRegister = function()
{
	this.isOpen = true;
};

BX.CWindow.prototype.onUnRegister = function(clean)
{
	this.isOpen = false;

	if (clean || (this.PARAMS && this.PARAMS.content_url))
	{
		if (clean) {BX.onCustomEvent(this, 'onWindowClose', [this, true]);}

		if (this.DIV.parentNode)
			this.DIV.parentNode.removeChild(this.DIV);
	}
	else
	{
		this.DIV.style.display = 'none';
	}
};

BX.CWindow.prototype.CloseDialog = // compatibility
BX.CWindow.prototype.Close = function(bImmediately)
{
	BX.onCustomEvent(this, 'onBeforeWindowClose', [this]);
	if (bImmediately !== true)
	{
		if (this.denyClose)
			return false;
	}

	BX.onCustomEvent(this, 'onWindowClose', [this]);

	//this crashes vis editor in ie via onWindowResizeExt event handler
	//if (this.bExpanded) this.__expand();
	// alternative version:
	if (this.bExpanded)
	{
		var pDocElement = BX.GetDocElement();
		BX.unbind(window, 'resize', BX.proxy(this.__expand_onresize, this));
		pDocElement.style.overflow = this.__expand_settings.overflow;
	}

	BX.WindowManager.unregister(this);

	return true;
};

BX.CWindow.prototype.SetResize = function(elem)
{
	elem.style.cursor = 'se-resize';
	BX.bind(elem, 'mousedown', BX.proxy(this.__startResize, this));

	this.ELEMENTS.resizer.push(elem);
	this.SETTINGS.resizable = true;
};

BX.CWindow.prototype.SetExpand = function(elem, event_name)
{
	event_name = event_name || 'click';
	BX.bind(elem, event_name, BX.proxy(this.__expand, this));
};

BX.CWindow.prototype.__expand_onresize = function()
{
	var windowSize = BX.GetWindowInnerSize();
	this.DIV.style.width = windowSize.innerWidth + "px";
	this.DIV.style.height = windowSize.innerHeight + "px";

	BX.onCustomEvent(this, 'onWindowResize');
};

BX.CWindow.prototype.__expand = function()
{
	var pDocElement = BX.GetDocElement();

	if (!this.bExpanded)
	{
		var wndScroll = BX.GetWindowScrollPos(),
			wndSize = BX.GetWindowInnerSize();

		this.__expand_settings = {
			resizable: this.SETTINGS.resizable,
			draggable: this.SETTINGS.draggable,
			width: this.DIV.style.width,
			height: this.DIV.style.height,
			left: this.DIV.style.left,
			top: this.DIV.style.top,
			scrollTop: wndScroll.scrollTop,
			scrollLeft: wndScroll.scrollLeft,
			overflow: BX.style(pDocElement, 'overflow')
		};

		this.SETTINGS.resizable = false;
		this.SETTINGS.draggable = false;

		window.scrollTo(0,0);
		pDocElement.style.overflow = 'hidden';

		this.DIV.style.top = '0px';
		this.DIV.style.left = '0px';

		this.DIV.style.width = wndSize.innerWidth + 'px';
		this.DIV.style.height = wndSize.innerHeight + 'px';

		this.bExpanded = true;

		BX.onCustomEvent(this, 'onWindowExpand');
		BX.onCustomEvent(this, 'onWindowResize');

		BX.bind(window, 'resize', BX.proxy(this.__expand_onresize, this));
	}
	else
	{
		BX.unbind(window, 'resize', BX.proxy(this.__expand_onresize, this));

		this.SETTINGS.resizable = this.__expand_settings.resizable;
		this.SETTINGS.draggable = this.__expand_settings.draggable;

		pDocElement.style.overflow = this.__expand_settings.overflow;

		this.DIV.style.top = this.__expand_settings.top;
		this.DIV.style.left = this.__expand_settings.left;
		this.DIV.style.width = this.__expand_settings.width;
		this.DIV.style.height = this.__expand_settings.height;

		window.scrollTo(this.__expand_settings.scrollLeft, this.__expand_settings.scrollTop);

		this.bExpanded = false;

		BX.onCustomEvent(this, 'onWindowNarrow');
		BX.onCustomEvent(this, 'onWindowResize');

	}
};

BX.CWindow.prototype.Resize = function(x, y)
{
	var new_width = Math.max(x - this.pos.left + this.dx, this.SETTINGS.min_width);
	var new_height = Math.max(y - this.pos.top + this.dy, this.SETTINGS.min_height);

	if (this.SETTINGS.resize_restrict)
	{
		var scrollSize = BX.GetWindowScrollSize();

		if (this.pos.left + new_width > scrollSize.scrollWidth - this.dw)
			new_width = scrollSize.scrollWidth - this.pos.left - this.dw;
	}

	this.DIV.style.width = new_width + 'px';
	this.DIV.style.height = new_height + 'px';

	BX.onCustomEvent(this, 'onWindowResize');
};

BX.CWindow.prototype.__startResize = function(e)
{
	if (!this.SETTINGS.resizable)
		return false;

	if(!e) e = window.event;

	this.wndSize = BX.GetWindowScrollPos();
	this.wndSize.innerWidth = BX.GetWindowInnerSize().innerWidth;

	this.pos = BX.pos(this.DIV);

	this.x = e.clientX + this.wndSize.scrollLeft;
	this.y = e.clientY + this.wndSize.scrollTop;

	this.dx = this.pos.left + this.pos.width - this.x;
	this.dy = this.pos.top + this.pos.height - this.y;
	this.dw = this.pos.width - parseInt(this.DIV.style.width);

	BX.bind(document, "mousemove", BX.proxy(this.__moveResize, this));
	BX.bind(document, "mouseup", BX.proxy(this.__stopResize, this));

	if(document.body.setCapture)
		document.body.setCapture();

	document.onmousedown = BX.False;

	var b = document.body;
	b.ondrag = b.onselectstart = BX.False;
	b.style.MozUserSelect = this.DIV.style.MozUserSelect = 'none';
	b.style.cursor = 'se-resize';

	BX.onCustomEvent(this, 'onWindowResizeStart');

	return true;
};

BX.CWindow.prototype.__moveResize = function(e)
{
	if(!e) e = window.event;

	var windowScroll = BX.GetWindowScrollPos();

	var x = e.clientX + windowScroll.scrollLeft;
	var y = e.clientY + windowScroll.scrollTop;

	if(this.x == x && this.y == y)
		return;

	this.Resize(x, y);

	this.x = x;
	this.y = y;
};

BX.CWindow.prototype.__stopResize = function()
{
	if(document.body.releaseCapture)
		document.body.releaseCapture();

	BX.unbind(document, "mousemove", BX.proxy(this.__moveResize, this));
	BX.unbind(document, "mouseup", BX.proxy(this.__stopResize, this));

	document.onmousedown = null;

	var b = document.body;
	b.ondrag = b.onselectstart = null;
	b.style.MozUserSelect = this.DIV.style.MozUserSelect = '';
	b.style.cursor = '';

	BX.onCustomEvent(this, 'onWindowResizeFinished')
};

BX.CWindow.prototype.SetClose = function(elem)
{
	BX.bind(elem, 'click', BX.proxy(this.Close, this));
	this.ELEMENTS.close.push(elem);
};

BX.CWindow.prototype.SetDraggable = function(elem)
{
	BX.bind(elem, 'mousedown', BX.proxy(this.__startDrag, this));

	elem.style.cursor = 'move';

	this.ELEMENTS.draggable.push(elem);
	this.SETTINGS.draggable = true;
};

BX.CWindow.prototype.Move = function(x, y)
{
	var dxShadow = 1; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	var left = parseInt(this.DIV.style.left)+x;
	var top = parseInt(this.DIV.style.top)+y;

	if (this.SETTINGS.drag_restrict)
	{
		//Left side
		if (left < 0)
			left = 0;

		//Right side
		var scrollSize = BX.GetWindowScrollSize();
		var floatWidth = this.DIV.offsetWidth;
		var floatHeight = this.DIV.offsetHeight;

		if (left > (scrollSize.scrollWidth - floatWidth - dxShadow))
			left = scrollSize.scrollWidth - floatWidth - dxShadow;

		var scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight,
			scrollSize.scrollHeight
		);

		if (top > (scrollHeight - floatHeight - dxShadow))
			top = scrollHeight - floatHeight - dxShadow;

		//Top side
		if (top < 0)
			top = 0;
	}

	this.DIV.style.left = left+'px';
	this.DIV.style.top = top+'px';

	//this.AdjustShadow(div);
};

BX.CWindow.prototype.__startDrag = function(e)
{
	if (!this.SETTINGS.draggable)
		return false;

	if(!e) e = window.event;

	this.x = e.clientX + document.body.scrollLeft;
	this.y = e.clientY + document.body.scrollTop;

	this.__bWasDragged = false;
	BX.bind(document, "mousemove", BX.proxy(this.__moveDrag, this));
	BX.bind(document, "mouseup", BX.proxy(this.__stopDrag, this));

	if(document.body.setCapture)
		document.body.setCapture();

	document.onmousedown = BX.False;

	var b = document.body;
	b.ondrag = b.onselectstart = BX.False;
	b.style.MozUserSelect = this.DIV.style.MozUserSelect = 'none';
	b.style.cursor = 'move';
	return BX.PreventDefault(e);
};

BX.CWindow.prototype.__moveDrag = function(e)
{
	if(!e) e = window.event;

	var x = e.clientX + document.body.scrollLeft;
	var y = e.clientY + document.body.scrollTop;

	if(this.x == x && this.y == y)
		return;

	this.Move((x - this.x), (y - this.y));
	this.x = x;
	this.y = y;

	if (!this.__bWasDragged)
	{
		BX.onCustomEvent(this, 'onWindowDragStart');
		this.__bWasDragged = true;
		BX.bind(BX.proxy_context, "click", BX.PreventDefault);
	}

	BX.onCustomEvent(this, 'onWindowDrag');
};

BX.CWindow.prototype.__stopDrag = function(e)
{
	if(document.body.releaseCapture)
		document.body.releaseCapture();

	BX.unbind(document, "mousemove", BX.proxy(this.__moveDrag, this));
	BX.unbind(document, "mouseup", BX.proxy(this.__stopDrag, this));

	document.onmousedown = null;

	var b = document.body;
	b.ondrag = b.onselectstart = null;
	b.style.MozUserSelect = this.DIV.style.MozUserSelect = '';
	b.style.cursor = '';

	if (this.__bWasDragged)
	{
		BX.onCustomEvent(this, 'onWindowDragFinished');
		var _proxy_context = BX.proxy_context;
		setTimeout(function(){BX.unbind(_proxy_context, "click", BX.PreventDefault)}, 100);
		this.__bWasDragged = false;
	}
	return BX.PreventDefault(e);
};

BX.CWindow.prototype.DenyClose = function()
{
	this.denyClose = true;
};

BX.CWindow.prototype.AllowClose = function()
{
	this.denyClose = false;
};

BX.CWindow.prototype.ShowError = function(str)
{
	BX.onCustomEvent(this, 'onWindowError', [str]);

	if (this._wait)
		BX.closeWait(this._wait);

	window.alert(str);
};

BX.CWindow.prototype.__set_msover = function() {this.MOUSEOVER = true;};
BX.CWindow.prototype.__unset_msover = function() {this.MOUSEOVER = false;};

/* dialog window class extends window class */
BX.CWindowDialog = function() {
	var a = arguments;
	a[1] = 'dialog';
	BX.CWindowDialog.superclass.constructor.apply(this, a);

	this.DIV.style.top = '10px';
	this.OVERLAY = null;
};
BX.extend(BX.CWindowDialog, BX.CWindow);

BX.CWindowDialog.prototype.__resizeOverlay = function()
{
	var windowSize = BX.GetWindowScrollSize();
	this.OVERLAY.style.width = windowSize.scrollWidth + "px";
};

BX.CWindowDialog.prototype.CreateOverlay = function(zIndex)
{
	if (null == this.OVERLAY)
	{
		var windowSize = BX.GetWindowScrollSize();

		// scrollHeight in BX.GetWindowScrollSize may be incorrect
		var scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight,
			windowSize.scrollHeight
		);

		this.OVERLAY = document.body.appendChild(BX.create("DIV", {
			style: {
				position: 'absolute',
				top: '0px',
				left: '0px',
				zIndex: zIndex || (parseInt(this.DIV.style.zIndex)-2),
				width: windowSize.scrollWidth + "px",
				height: scrollHeight + "px"
			}
		}));

		var component = BX.ZIndexManager.getComponent(this.DIV);
		if (component)
		{
			component.setOverlay(this.OVERLAY);
		}
	}

	return this.OVERLAY;
};

BX.CWindowDialog.prototype.Show = function()
{
	BX.CWindowDialog.superclass.Show.apply(this, arguments);

	this.CreateOverlay();

	this.OVERLAY.style.display = 'block';

	BX.unbind(window, 'resize', BX.proxy(this.__resizeOverlay, this));
	BX.bind(window, 'resize', BX.proxy(this.__resizeOverlay, this));
};

BX.CWindowDialog.prototype.onUnRegister = function(clean)
{
	BX.CWindowDialog.superclass.onUnRegister.apply(this, arguments);

	if (this.clean)
	{
		if (this.OVERLAY.parentNode)
			this.OVERLAY.parentNode.removeChild(this.OVERLAY);
	}
	else
	{
		this.OVERLAY.style.display = 'none';
	}

	BX.unbind(window, 'resize', BX.proxy(this.__resizeOverlay, this));
};

/* standard bitrix dialog extends BX.CWindowDialog */
/*
	arParams = {
		(
			title: 'dialog title',
			head: 'head block html',
			content: 'dialog content',
			icon: 'head icon classname or filename',

			resize_id: 'some id to save resize information'// useless if resizable = false
		)
		or
		(
			content_url: url to content load
				loaded content scripts can use BX.WindowManager.Get() to get access to the current window object
		)

		height: window_height_in_pixels,
		width: window_width_in_pixels,

		draggable: true|false,
		resizable: true|false,

		min_height: min_window_height_in_pixels, // useless if resizable = false
		min_width: min_window_width_in_pixels, // useless if resizable = false

		buttons: [
			'html_code',
			BX.CDialog.btnSave, BX.CDialog.btnCancel, BX.CDialog.btnClose
		]
	}
*/
BX.CDialog = function(arParams)
{
	BX.CDialog.superclass.constructor.apply(this);

	this._sender = 'core_window_cdialog';

	this.PARAMS = arParams || {};

	for (var i in this.defaultParams)
	{
		if (typeof this.PARAMS[i] == 'undefined')
			this.PARAMS[i] = this.defaultParams[i];
	}

	this.PARAMS.width = (!isNaN(parseInt(this.PARAMS.width)))
		? this.PARAMS.width
		: this.defaultParams['width'];
	this.PARAMS.height = (!isNaN(parseInt(this.PARAMS.height)))
		? this.PARAMS.height
		: this.defaultParams['height'];

	if (this.PARAMS.resize_id || this.PARAMS.content_url)
	{
		var arSize = BX.WindowManager.getRuntimeWindowSize(this.PARAMS.resize_id || this.PARAMS.content_url);
		if (arSize)
		{
			this.PARAMS.width = arSize.width;
			this.PARAMS.height = arSize.height;
		}
	}

	BX.addClass(this.DIV, 'bx-core-adm-dialog');
	this.DIV.id = 'bx-admin-prefix';

	this.PARTS = {};

	this.DIV.style.height = null;
	this.DIV.style.width = null;

	this.PARTS.TITLEBAR = this.DIV.appendChild(BX.create('DIV', {props: {
			className: 'bx-core-adm-dialog-head'
		}
	}));

	this.PARTS.TITLE_CONTAINER = this.PARTS.TITLEBAR.appendChild(BX.create('SPAN', {
		props: {className: 'bx-core-adm-dialog-head-inner'},
		text: this.PARAMS.title
	}));

	this.PARTS.TITLEBAR_ICONS = this.PARTS.TITLEBAR.appendChild(BX.create('DIV', {
		props: {
			className: 'bx-core-adm-dialog-head-icons'
		},
		children: (this.PARAMS.resizable ? [
			BX.create('SPAN', {props: {className: 'bx-core-adm-icon-expand', title: BX.message('JS_CORE_WINDOW_EXPAND')}}),
			BX.create('SPAN', {props: {className: 'bx-core-adm-icon-close', title: BX.message('JS_CORE_WINDOW_CLOSE')}})
		] : [
			BX.create('SPAN', {props: {className: 'bx-core-adm-icon-close', title: BX.message('JS_CORE_WINDOW_CLOSE')}})
		])
	}));


	this.PARTS.CONTENT = this.DIV.appendChild(BX.create('DIV', {
		props: {className: 'bx-core-adm-dialog-content-wrap adm-workarea'}
	}));

	this.PARTS.CONTENT_DATA = this.PARTS.CONTENT.appendChild(BX.create('DIV', {
		props: {className: 'bx-core-adm-dialog-content'},
		style: {
			height: this.PARAMS.height + 'px',
			width: this.PARAMS.width + 'px'
		}
	}));

	this.PARTS.HEAD = this.PARTS.CONTENT_DATA.appendChild(BX.create('DIV', {
		props: {
			className: 'bx-core-adm-dialog-head-block' + (this.PARAMS.icon ? ' ' + this.PARAMS.icon : '')
		}
	}));

	this.SetHead(this.PARAMS.head);
	this.SetContent(this.PARAMS.content);
	this.SetTitle(this.PARAMS.title);
	this.SetClose(this.PARTS.TITLEBAR_ICONS.lastChild);

	if (this.PARAMS.resizable)
	{
		this.SetExpand(this.PARTS.TITLEBAR_ICONS.firstChild);
		this.SetExpand(this.PARTS.TITLEBAR, 'dblclick');

		BX.addCustomEvent(this, 'onWindowExpand', BX.proxy(this.__onexpand, this));
		BX.addCustomEvent(this, 'onWindowNarrow', BX.proxy(this.__onexpand, this));
	}

	this.PARTS.FOOT = this.PARTS.BUTTONS_CONTAINER = this.PARTS.CONTENT.appendChild(BX.create('DIV', {
			props: {
				className: 'bx-core-adm-dialog-buttons'
			},
			//events: {
			//	'click': BX.delegateEvent({property:{type: /button|submit/}}, BX.delegate(function() {this.showWait(BX.proxy_context)}, this))
			//},
			children: this.ShowButtons()
		}
	));

	if (this.PARAMS.draggable)
		this.SetDraggable(this.PARTS.TITLEBAR);

	if (this.PARAMS.resizable)
	{
		this.PARTS.RESIZER = this.DIV.appendChild(BX.create('DIV', {
			props: {className: 'bx-core-resizer'}
		}));

		this.SetResize(this.PARTS.RESIZER);

		this.SETTINGS.min_width = this.PARAMS.min_width;
		this.SETTINGS.min_height = this.PARAMS.min_height;
	}

	this.auth_callback = BX.delegate(function(){
		this.PARAMS.content = '';
		this.hideNotify();
		this.Show();
	}, this)
};
BX.extend(BX.CDialog, BX.CWindowDialog);

BX.CDialog.prototype.defaultParams = {
	width: 700,
	height: 400,
	min_width: 500,
	min_height: 300,

	resizable: true,
	draggable: true,

	title: '',
	icon: ''
};

BX.CDialog.prototype.showWait = function(el)
{
	if (BX.type.isElementNode(el) && (el.type == 'button' || el.type == 'submit'))
	{
		BX.defer(function(){el.disabled = true})();

		var bSave = (BX.hasClass(el, 'adm-btn-save') || BX.hasClass(el, 'adm-btn-save')),
			pos = BX.pos(el, true);

		el.bxwaiter = this.PARTS.FOOT.appendChild(BX.create('DIV', {
			props: {className: 'adm-btn-load-img' + (bSave ? '-green' : '')},
			style: {
				top: parseInt((pos.bottom + pos.top)/2 - 10) + 'px',
				left: parseInt((pos.right + pos.left)/2 - 10) + 'px'
			}
		}));

		BX.addClass(el, 'adm-btn-load');

		this.lastWaitElement = el;

		return el.bxwaiter;
	}
	return null;
};

BX.CDialog.prototype.closeWait = function(el)
{
	el = el || this.lastWaitElement;

	if (BX.type.isElementNode(el))
	{
		if (el.bxwaiter)
		{
			if(el.bxwaiter.parentNode)
			{
				el.bxwaiter.parentNode.removeChild(el.bxwaiter);
			}

			el.bxwaiter = null;
		}

		el.disabled = false;
		BX.removeClass(el, 'adm-btn-load');

		if (this.lastWaitElement == el)
			this.lastWaitElement = null;
	}
};

BX.CDialog.prototype.Authorize = function(arAuthResult)
{
	this.bSkipReplaceContent = true;
	this.ShowError(BX.message('JSADM_AUTH_REQ'));

	BX.onCustomEvent(this, 'onWindowError', []);

	BX.closeWait();

	(new BX.CAuthDialog({
		content_url: this.PARAMS.content_url,
		auth_result: arAuthResult,
		callback: BX.delegate(function(){
			if (this.auth_callback)
				this.auth_callback()
		}, this)
	})).Show();
};

BX.CDialog.prototype.ShowError = function(str)
{
	BX.onCustomEvent(this, 'onWindowError', [str]);

	this.closeWait();

	if (this._wait)
		BX.closeWait(this._wait);

	this.Notify(str, true);
};


BX.CDialog.prototype.__expandGetSize = function()
{
	var pDocElement = BX.GetDocElement();
	pDocElement.style.overflow = 'hidden';

	var wndSize = BX.GetWindowInnerSize();

	pDocElement.scrollTop = 0;

	this.DIV.style.top = '-' + this.dxShadow + 'px';
	this.DIV.style.left = '-' + this.dxShadow + 'px';

	return {
		width: (wndSize.innerWidth - parseInt(BX.style(this.PARTS.CONTENT, 'padding-right')) - parseInt(BX.style(this.PARTS.CONTENT, 'padding-left'))) + this.dxShadow,
		height: (wndSize.innerHeight - this.PARTS.TITLEBAR.offsetHeight - this.PARTS.FOOT.offsetHeight - parseInt(BX.style(this.PARTS.CONTENT, 'padding-top')) - parseInt(BX.style(this.PARTS.CONTENT, 'padding-bottom'))) + this.dxShadow
	};
};

BX.CDialog.prototype.__expand = function()
{
	var pDocElement = BX.GetDocElement();
	this.dxShadow = 2;

	if (!this.bExpanded)
	{
		var wndScroll = BX.GetWindowScrollPos();

		this.__expand_settings = {
			resizable: this.SETTINGS.resizable,
			draggable: this.SETTINGS.draggable,
			width: this.PARTS.CONTENT_DATA.style.width,
			height: this.PARTS.CONTENT_DATA.style.height,
			left: this.DIV.style.left,
			top: this.DIV.style.top,
			scrollTop: wndScroll.scrollTop,
			scrollLeft: wndScroll.scrollLeft,
			overflow: BX.style(pDocElement, 'overflow')
		};

		this.SETTINGS.resizable = false;
		this.SETTINGS.draggable = false;

		var pos = this.__expandGetSize();

		this.PARTS.CONTENT_DATA.style.width = pos.width + 'px';
		this.PARTS.CONTENT_DATA.style.height = pos.height + 'px';

		window.scrollTo(0,0);
		pDocElement.style.overflow = 'hidden';

		this.bExpanded = true;

		BX.onCustomEvent(this, 'onWindowExpand');
		BX.onCustomEvent(this, 'onWindowResize');
		BX.onCustomEvent(this, 'onWindowResizeExt', [{'width': pos.width, 'height': pos.height}]);

		BX.bind(window, 'resize', BX.proxy(this.__expand_onresize, this));
	}
	else
	{
		BX.unbind(window, 'resize', BX.proxy(this.__expand_onresize, this));

		this.SETTINGS.resizable = this.__expand_settings.resizable;
		this.SETTINGS.draggable = this.__expand_settings.draggable;

		pDocElement.style.overflow = this.__expand_settings.overflow;

		this.DIV.style.top = this.__expand_settings.top;
		this.DIV.style.left = this.__expand_settings.left;
		this.PARTS.CONTENT_DATA.style.width = this.__expand_settings.width;
		this.PARTS.CONTENT_DATA.style.height = this.__expand_settings.height;
		window.scrollTo(this.__expand_settings.scrollLeft, this.__expand_settings.scrollTop);
		this.bExpanded = false;

		BX.onCustomEvent(this, 'onWindowNarrow');
		BX.onCustomEvent(this, 'onWindowResize');
		BX.onCustomEvent(this, 'onWindowResizeExt', [{'width': parseInt(this.__expand_settings.width), 'height': parseInt(this.__expand_settings.height)}]);
	}
};

BX.CDialog.prototype.__expand_onresize = function()
{
	var pos = this.__expandGetSize();

	this.PARTS.CONTENT_DATA.style.width = pos.width + 'px';
	this.PARTS.CONTENT_DATA.style.height = pos.height + 'px';

	BX.onCustomEvent(this, 'onWindowResize');
	BX.onCustomEvent(this, 'onWindowResizeExt', [pos]);
};

BX.CDialog.prototype.__onexpand = function()
{
	var ob = this.PARTS.TITLEBAR_ICONS.firstChild;
	ob.className = BX.toggle(ob.className, ['bx-core-adm-icon-expand', 'bx-core-adm-icon-narrow']);
	ob.title = BX.toggle(ob.title, [BX.message('JS_CORE_WINDOW_EXPAND'), BX.message('JS_CORE_WINDOW_NARROW')]);

	if (this.PARTS.RESIZER)
	{
		this.PARTS.RESIZER.style.display = this.bExpanded ? 'none' : 'block';
	}
};


BX.CDialog.prototype.__startResize = function(e)
{
	if (!this.SETTINGS.resizable)
		return false;

	if(!e) e = window.event;

	this.wndSize = BX.GetWindowScrollPos();
	this.wndSize.innerWidth = BX.GetWindowInnerSize().innerWidth;

	this.pos = BX.pos(this.PARTS.CONTENT_DATA);

	this.x = e.clientX + this.wndSize.scrollLeft;
	this.y = e.clientY + this.wndSize.scrollTop;

	this.dx = this.pos.left + this.pos.width - this.x;
	this.dy = this.pos.top + this.pos.height - this.y;


	// TODO: suspicious
	this.dw = this.pos.width - parseInt(this.PARTS.CONTENT_DATA.style.width) + parseInt(BX.style(this.PARTS.CONTENT, 'padding-right'));

	BX.bind(document, "mousemove", BX.proxy(this.__moveResize, this));
	BX.bind(document, "mouseup", BX.proxy(this.__stopResize, this));

	if(document.body.setCapture)
		document.body.setCapture();

	document.onmousedown = BX.False;

	var b = document.body;
	b.ondrag = b.onselectstart = BX.False;
	b.style.MozUserSelect = this.DIV.style.MozUserSelect = 'none';
	b.style.cursor = 'se-resize';

	BX.onCustomEvent(this, 'onWindowResizeStart');

	return true;
};

BX.CDialog.prototype.Resize = function(x, y)
{
	var new_width = Math.max(x - this.pos.left + this.dx, this.SETTINGS.min_width);
	var new_height = Math.max(y - this.pos.top + this.dy, this.SETTINGS.min_height);

	if (this.SETTINGS.resize_restrict)
	{
		var scrollSize = BX.GetWindowScrollSize();

		if (this.pos.left + new_width > scrollSize.scrollWidth - this.dw)
			new_width = scrollSize.scrollWidth - this.pos.left - this.dw;
	}

	this.PARTS.CONTENT_DATA.style.width = new_width + 'px';
	this.PARTS.CONTENT_DATA.style.height = new_height + 'px';

	BX.onCustomEvent(this, 'onWindowResize');
	BX.onCustomEvent(this, 'onWindowResizeExt', [{'height': new_height, 'width': new_width}]);
};

BX.CDialog.prototype.SetSize = function(obSize)
{
	this.PARTS.CONTENT_DATA.style.width = obSize.width + 'px';
	this.PARTS.CONTENT_DATA.style.height = obSize.height + 'px';

	BX.onCustomEvent(this, 'onWindowResize');
	BX.onCustomEvent(this, 'onWindowResizeExt', [obSize]);
};

BX.CDialog.prototype.GetParameters = function(form_name)
{
	var form = this.GetForm();

	if(!form)
		return "";

	var i, s = "";
	var n = form.elements.length;

	var delim = '';
	for(i=0; i<n; i++)
	{
		if (s != '') delim = '&';
		var el = form.elements[i];
		if (el.disabled)
			continue;

		switch(el.type.toLowerCase())
		{
			case 'text':
			case 'textarea':
			case 'password':
			case 'hidden':
				if (null == form_name && el.name.substr(el.name.length-4) == '_alt' && form.elements[el.name.substr(0, el.name.length-4)])
					break;
				s += delim + el.name + '=' + BX.util.urlencode(el.value);
				break;
			case 'radio':
				if(el.checked)
					s += delim + el.name + '=' + BX.util.urlencode(el.value);
				break;
			case 'checkbox':
				s += delim + el.name + '=' + BX.util.urlencode(el.checked ? 'Y':'N');
				break;
			case 'select-one':
				var val = "";
				if (null == form_name && form.elements[el.name + '_alt'] && el.selectedIndex == 0)
					val = form.elements[el.name+'_alt'].value;
				else
					val = el.value;
				s += delim + el.name + '=' + BX.util.urlencode(val);
				break;
			case 'select-multiple':
				var j, bAdded = false;
				var l = el.options.length;
				for (j=0; j<l; j++)
				{
					if (el.options[j].selected)
					{
						s += delim + el.name + '=' + BX.util.urlencode(el.options[j].value);
						bAdded = true;
					}
				}
				if (!bAdded)
					s += delim + el.name + '=';
				break;
			default:
				break;
		}
	}

	return s;
};

BX.CDialog.prototype.PostParameters = function(params)
{
	var url = this.PARAMS.content_url;

	if (null == params)
		params = "";

	params += (params == "" ? "" : "&") + "bxsender=" + this._sender;

	var index = url.indexOf('?');
	if (index == -1)
		url += '?' + params;
	else
		url = url.substring(0, index) + '?' + params + "&" + url.substring(index+1);

	BX.showWait();

	this.auth_callback = BX.delegate(function(){
		this.hideNotify();
		this.PostParameters(params);
	}, this);

	BX.ajax.Setup({skipAuthCheck:true},true);
	BX.ajax.post(url, this.GetParameters(), BX.delegate(function(result) {
		BX.closeWait();
		if (!this.bSkipReplaceContent)
		{
			this.ClearButtons(); // buttons are appended during form reload, so we should clear footer
			this.SetContent(result);
			this.Show(true);
		}

		this.bSkipReplaceContent = false;
	}, this));
};

BX.CDialog.prototype.Submit = function(params, url)
{
	var FORM = this.GetForm();
	if (FORM)
	{
		FORM.onsubmit = null;

		FORM.method = 'POST';
		if (!FORM.action || url)
		{
			url = url || this.PARAMS.content_url;
			if (null != params)
			{
				var index = url.indexOf('?');
				if (index == -1)
					url += '?' + params;
				else
					url = url.substring(0, index) + '?' + params + "&" + url.substring(index+1);
			}

			FORM.action = url;
		}

		if (!FORM._bxsender)
		{
			FORM._bxsender = FORM.appendChild(BX.create('INPUT', {
				attrs: {
					type: 'hidden',
					name: 'bxsender',
					value: this._sender
				}
			}));
		}

		this._wait = BX.showWait();

		this.auth_callback = BX.delegate(function(){
			this.hideNotify();
			this.Submit(params);
		}, this);

		BX.ajax.submit(FORM, BX.delegate(function(){this.closeWait()}, this));
	}
	else
	{
		window.alert('no form registered!');
	}
};

BX.CDialog.prototype.GetForm = function()
{
	if (null == this.__form)
	{
		var forms = this.PARTS.CONTENT_DATA.getElementsByTagName('FORM');
		this.__form = forms[0] ? forms[0] : null;
	}

	return this.__form;
};

BX.CDialog.prototype.GetRealForm = function()
{
	if (null == this.__rform)
	{
		var forms = this.PARTS.CONTENT_DATA.getElementsByTagName('FORM');
		this.__rform = forms[1] ? forms[1] : (forms[0] ? forms[0] : null);
	}

	return this.__rform;
};

BX.CDialog.prototype._checkButton = function(btn)
{
	var arCustomButtons = ['btnSave', 'btnCancel', 'btnClose'];

	for (var i = 0; i < arCustomButtons.length; i++)
	{
		if (this[arCustomButtons[i]] && (btn == this[arCustomButtons[i]]))
			return arCustomButtons[i];
	}

	return false;
};

BX.CDialog.prototype.ShowButtons = function()
{
	var result = [];
	if (this.PARAMS.buttons)
	{
		if (this.PARAMS.buttons.title) this.PARAMS.buttons = [this.PARAMS.buttons];

		for (var i=0, len=this.PARAMS.buttons.length; i<len; i++)
		{
			if (BX.type.isNotEmptyString(this.PARAMS.buttons[i]))
			{
				result.push(this.PARAMS.buttons[i]);
			}
			else if (BX.type.isElementNode(this.PARAMS.buttons[i]))
			{
				result.push(this.PARAMS.buttons[i]);
			}
			else if (this.PARAMS.buttons[i])
			{
				//if (!(this.PARAMS.buttons[i] instanceof BX.CWindowButton))
				if (!BX.is_subclass_of(this.PARAMS.buttons[i], BX.CWindowButton))
				{
					var b = this._checkButton(this.PARAMS.buttons[i]); // hack to set links to real CWindowButton object in btnSave etc;
					this.PARAMS.buttons[i] = new BX.CWindowButton(this.PARAMS.buttons[i]);
					if (b) this[b] = this.PARAMS.buttons[i];
				}

				result.push(this.PARAMS.buttons[i].Button(this));
			}
		}
	}

	return result;
};

BX.CDialog.prototype.setAutosave = function () {
	if (!this.bSetAutosaveDelay)
	{
		this.bSetAutosaveDelay = true;
		setTimeout(BX.proxy(this.setAutosave, this), 10);
	}
};

BX.CDialog.prototype.SetTitle = function(title)
{
	this.PARAMS.title = title;
	BX.cleanNode(this.PARTS.TITLE_CONTAINER).appendChild(document.createTextNode(this.PARAMS.title));
};

BX.CDialog.prototype.SetHead = function(head)
{
	this.PARAMS.head = BX.util.trim(head);
	this.PARTS.HEAD.innerHTML = this.PARAMS.head || "&nbsp;";
	this.PARTS.HEAD.style.display = this.PARAMS.head ? 'block' : 'none';
	this.adjustSize();
};

BX.CDialog.prototype.Notify = function(note, bError, html)
{
	if (!this.PARTS.NOTIFY)
	{
		this.PARTS.NOTIFY = this.DIV.insertBefore(BX.create('DIV', {
			props: {className: 'adm-warning-block'},
			children: [
				BX.create('SPAN', {
					props: {className: 'adm-warning-text'}
				}),
				BX.create('SPAN', {
					props: {className: 'adm-warning-icon'}
				}),
				BX.create('SPAN', {
					props: {className: 'adm-warning-close'},
					events: {click: BX.proxy(this.hideNotify, this)}
				})
			]
		}), this.DIV.firstChild);
	}

	if (bError)
		BX.addClass(this.PARTS.NOTIFY, 'adm-warning-block-red');
	else
		BX.removeClass(this.PARTS.NOTIFY, 'adm-warning-block-red');

	if(html !== true)
	{
		note = BX.util.htmlspecialchars(note);
	}

	this.PARTS.NOTIFY.firstChild.innerHTML = note || '&nbsp;';
	this.PARTS.NOTIFY.firstChild.style.width = (this.PARAMS.width-50) + 'px';
	BX.removeClass(this.PARTS.NOTIFY, 'adm-warning-animate');
};

BX.CDialog.prototype.hideNotify = function()
{
	BX.addClass(this.PARTS.NOTIFY, 'adm-warning-animate');
};

BX.CDialog.prototype.__adjustHeadToIcon = function()
{
	if (!this.PARTS.HEAD.offsetHeight)
	{
		setTimeout(BX.delegate(this.__adjustHeadToIcon, this), 50);
	}
	else
	{
		if (this.icon_image && this.icon_image.height && this.icon_image.height > this.PARTS.HEAD.offsetHeight - 5)
		{
			this.PARTS.HEAD.style.height = this.icon_image.height + 5 + 'px';
			this.adjustSize();
		}

		this.icon_image.onload = null;
		this.icon_image = null;
	}
};

BX.CDialog.prototype.SetIcon = function(icon_class)
{
	if (this.PARAMS.icon != icon_class)
	{
		if (this.PARAMS.icon)
			BX.removeClass(this.PARTS.HEAD, this.PARAMS.icon);

		this.PARAMS.icon = icon_class;

		if (this.PARAMS.icon)
		{
			BX.addClass(this.PARTS.HEAD, this.PARAMS.icon);

			var icon_file = (BX.style(this.PARTS.HEAD, 'background-image') || BX.style(this.PARTS.HEAD, 'backgroundImage'));
			if (BX.type.isNotEmptyString(icon_file) && icon_file != 'none')
			{
				var match = icon_file.match(new RegExp('url\\s*\\(\\s*(\'|"|)(.+?)(\\1)\\s*\\)'));
				if(match)
				{
					icon_file = match[2];
					if (BX.type.isNotEmptyString(icon_file))
					{
						this.icon_image = new Image();
						this.icon_image.onload = BX.delegate(this.__adjustHeadToIcon, this);
						this.icon_image.src = icon_file;
					}
				}
			}
		}
	}
	this.adjustSize();
};

BX.CDialog.prototype.SetIconFile = function(icon_file)
{
	this.icon_image = new Image();
	this.icon_image.onload = BX.delegate(this.__adjustHeadToIcon, this);
	this.icon_image.src = icon_file;

	BX.adjust(this.PARTS.HEAD, {style: {backgroundImage: 'url(' + icon_file + ')', backgroundPosition: 'right 9px'/*'99% center'*/}});
	this.adjustSize();
};

/*
BUTTON: {
	title: 'title',
	'action': function executed in window object context
}
BX.CDialog.btnSave || BX.CDialog.btnCancel - standard buttons
*/

BX.CDialog.prototype.SetButtons = function(a)
{
	if (BX.type.isString(a))
	{
		if (a.length > 0)
		{
			this.PARTS.BUTTONS_CONTAINER.innerHTML += a;

			var btns = this.PARTS.BUTTONS_CONTAINER.getElementsByTagName('INPUT');
			if (btns.length > 0)
			{
				this.PARAMS.buttons = [];
				for (var i = 0; i < btns.length; i++)
				{
					this.PARAMS.buttons.push(new BX.CWindowButton({btn: btns[i], parentWindow: this}));
				}
			}
		}
	}
	else
	{
		this.PARAMS.buttons = a;
		BX.adjust(this.PARTS.BUTTONS_CONTAINER, {
			children: this.ShowButtons()
		});
	}
	this.adjustSize();
};

BX.CDialog.prototype.ClearButtons = function()
{
	BX.cleanNode(this.PARTS.BUTTONS_CONTAINER);
	this.adjustSize();
};

BX.CDialog.prototype.SetContent = function(html)
{
	this.__form = null;

	if (BX.type.isElementNode(html))
	{
		if (html.parentNode)
			html.parentNode.removeChild(html);
	}
	else if (BX.type.isString(html))
	{
		html = BX.create('DIV', {html: html});
	}

	this.PARAMS.content = html;
	BX.cleanNode(this.PARTS.CONTENT_DATA);

	BX.adjust(this.PARTS.CONTENT_DATA, {
		children: [
			this.PARTS.HEAD,
			BX.create('DIV', {
				props: {
					className: 'bx-core-adm-dialog-content-wrap-inner'
				},
				children: [this.PARAMS.content]
			})
		]
	});

	if (this.PARAMS.content_url && this.GetForm())
	{
		this.__form.submitbtn = this.__form.appendChild(BX.create('INPUT', {props:{type:'submit'},style:{display:'none'}}));
		this.__form.onsubmit = BX.delegate(this.__submit, this);
	}
};

BX.CDialog.prototype.__submit = function(e)
{
	for (var i=0,len=this.PARAMS.buttons.length; i<len; i++)
	{
		if (
			this.PARAMS.buttons[i]
			&& (
				this.PARAMS.buttons[i].name && /save|apply/i.test(this.PARAMS.buttons[i].name)
				||
				this.PARAMS.buttons[i].btn && this.PARAMS.buttons[i].btn.name && /save|apply/i.test(this.PARAMS.buttons[i].btn.name)
			)
		)
		{
			this.PARAMS.buttons[i].emulate();
			break;
		}
	}

	return BX.PreventDefault(e);
};

BX.CDialog.prototype.SwapContent = function(cont)
{
	cont = BX(cont);

	BX.cleanNode(this.PARTS.CONTENT_DATA);
	cont.parentNode.removeChild(cont);
	this.PARTS.CONTENT_DATA.appendChild(cont);
	cont.style.display = 'block';
	this.SetContent(cont.innerHTML);
};

// this method deprecated
BX.CDialog.prototype.adjustSize = function()
{
};

// this method deprecated
BX.CDialog.prototype.__adjustSize = function()
{
};

BX.CDialog.prototype.adjustSizeEx = function()
{
	BX.defer(this.__adjustSizeEx, this)();
};

BX.CDialog.prototype.__adjustSizeEx = function()
{
	var ob = this.PARTS.CONTENT_DATA.firstChild,
		new_height = 0,
		marginTop,
		marginBottom;

	while (ob)
	{
		if (BX.type.isElementNode(ob))
		{
			marginTop = parseInt(BX.style(ob, 'margin-top'), 10);
			if (isNaN(marginTop))
				marginTop = 0;
			marginBottom = parseInt(BX.style(ob, 'margin-bottom'), 10);
			if (isNaN(marginBottom))
				marginBottom = 0;
			new_height += ob.offsetHeight + marginTop + marginBottom;
		}
		ob = BX.nextSibling(ob);
	}

	if (new_height)
		this.PARTS.CONTENT_DATA.style.height = new_height + 'px';
};


BX.CDialog.prototype.__onResizeFinished = function()
{
	BX.WindowManager.saveWindowSize(
		this.PARAMS.resize_id || this.PARAMS.content_url, {height: parseInt(this.PARTS.CONTENT_DATA.style.height), width: parseInt(this.PARTS.CONTENT_DATA.style.width)}
	);
};

BX.CDialog.prototype.Show = function(bNotRegister)
{
	if ((!this.PARAMS.content) && this.PARAMS.content_url && BX.ajax && !bNotRegister)
	{
		var wait = BX.showWait();

		BX.WindowManager.currently_loaded = this;

		this.CreateOverlay();
		this.OVERLAY.style.display = 'block';
		this.OVERLAY.className = 'bx-core-dialog-overlay';

		var post_data = '', method = 'GET';
		if (this.PARAMS.content_post)
		{
			post_data = this.PARAMS.content_post;
			method = 'POST';
		}

		var url = this.PARAMS.content_url
			+ (this.PARAMS.content_url.indexOf('?')<0?'?':'&')+'bxsender=' + this._sender;

		this.auth_callback = BX.delegate(function(){
			this.PARAMS.content = '';
			this.hideNotify();
			this.Show();
		}, this);

		BX.ajax({
			method: method,
			dataType: 'html',
			url: url,
			data: post_data,
			skipAuthCheck: true,
			onsuccess: BX.delegate(function(data) {
				BX.closeWait(null, wait);

				this.SetContent(data || '&nbsp;');
				this.Show();
			}, this)
		});
	}
	else
	{
		BX.WindowManager.currently_loaded = null;
		BX.CDialog.superclass.Show.apply(this, arguments);

		this.adjustPos();

		this.OVERLAY.className = 'bx-core-dialog-overlay';

		this.__adjustSize();

		BX.removeCustomEvent(this, 'onWindowResize', BX.proxy(this.__adjustSize, this));
		BX.addCustomEvent(this, 'onWindowResize', BX.proxy(this.__adjustSize, this));

		if (this.PARAMS.resizable && (this.PARAMS.content_url || this.PARAMS.resize_id))
		{
			BX.removeCustomEvent(this, 'onWindowResizeFinished', BX.proxy(this.__onResizeFinished, this));
			BX.addCustomEvent(this, 'onWindowResizeFinished', BX.proxy(this.__onResizeFinished, this));
		}
	}
};

BX.CDialog.prototype.GetInnerPos = function()
{
	return {'width': parseInt(this.PARTS.CONTENT_DATA.style.width), 'height': parseInt(this.PARTS.CONTENT_DATA.style.height)};
};

BX.CDialog.prototype.adjustPos = function()
{
	if (!this.bExpanded)
	{
		var currentWindow = window;
		var topWindow = BX.PageObject.getRootWindow();
		if (topWindow.BX.SidePanel && topWindow.BX.SidePanel.Instance && topWindow.BX.SidePanel.Instance.getTopSlider())
		{
			currentWindow = topWindow.BX.SidePanel.Instance.getTopSlider().getWindow();
		}
		var windowSize = currentWindow.BX.GetWindowInnerSize();
		var windowScroll = currentWindow.BX.GetWindowScrollPos();

		var style = {
			left: parseInt(windowScroll.scrollLeft + windowSize.innerWidth / 2 - parseInt(this.DIV.offsetWidth) / 2) + 'px',
			top: Math.max(parseInt(windowScroll.scrollTop + windowSize.innerHeight / 2 - parseInt(this.DIV.offsetHeight) / 2), 0) + 'px'
		};

		BX.adjust(this.DIV, {
			style: style
		});
	}
};

BX.CDialog.prototype.GetContent = function () {return this.PARTS.CONTENT_DATA};

BX.CDialog.prototype.btnSave = BX.CDialog.btnSave = {
	title: BX.message('JS_CORE_WINDOW_SAVE'),
	id: 'savebtn',
	name: 'savebtn',
	className: BX.browser.IsIE() && BX.browser.IsDoctype() && !BX.browser.IsIE10() ? '' : 'adm-btn-save',
	action: function () {
		this.disableUntilError();
		this.parentWindow.PostParameters();
	}
};

BX.CDialog.prototype.btnCancel = BX.CDialog.btnCancel = {
	title: BX.message('JS_CORE_WINDOW_CANCEL'),
	id: 'cancel',
	name: 'cancel',
	action: function () {
		this.parentWindow.Close();
	}
};

BX.CDialog.prototype.btnClose = BX.CDialog.btnClose = {
	title: BX.message('JS_CORE_WINDOW_CLOSE'),
	id: 'close',
	name: 'close',
	action: function () {
		this.parentWindow.Close();
	}
};

/* special child for admin forms loaded into public page */
BX.CAdminDialog = function(arParams)
{
	BX.CAdminDialog.superclass.constructor.apply(this, arguments);

	this._sender = 'core_window_cadmindialog';

	BX.addClass(this.DIV, 'bx-core-adm-admin-dialog');

	this.PARTS.CONTENT.insertBefore(this.PARTS.HEAD, this.PARTS.CONTENT.firstChild);
	this.PARTS.HEAD.className = 'bx-core-adm-dialog-tabs';
};
BX.extend(BX.CAdminDialog, BX.CDialog);

BX.CAdminDialog.prototype.SetHead = function()
{
	BX.CAdminDialog.superclass.SetHead.apply(this, arguments);

	if (this.PARTS.HEAD.firstChild && BX.type.isElementNode(this.PARTS.HEAD.firstChild))
	{
		var ob = this.PARTS.HEAD.firstChild, new_width = 0, marginLeft = 0, marginRight = 0;

		while (ob)
		{
			if (BX.type.isElementNode(ob))
			{
				marginLeft = parseInt(BX.style(ob, 'margin-left'), 10);
				if (isNaN(marginLeft))
					marginLeft = 0;
				marginRight = parseInt(BX.style(ob, 'margin-right'), 10);
				if (isNaN(marginRight))
					marginRight = 0;
				new_width += ob.offsetWidth + marginLeft + marginRight;
			}
			ob = BX.nextSibling(ob);
		}

		this.SETTINGS.min_width = Math.max(new_width, this.SETTINGS.min_width) - 2;
		if (this.PARAMS.width < this.SETTINGS.min_width)
		{
			BX.adjust(this.PARTS.CONTENT_DATA, {
				style: {
					width: this.SETTINGS.min_width + 'px'
				}
			});
		}
	}
};

BX.CAdminDialog.prototype.SetContent = function(html)
{
	this.__form = null;

	if (BX.type.isElementNode(html))
	{
		if (html.parentNode)
			html.parentNode.removeChild(html);
	}

	this.PARAMS.content = html;
	BX.cleanNode(this.PARTS.CONTENT_DATA);

	BX.adjust(this.PARTS.CONTENT_DATA, {
		children: [
			this.PARAMS.content || '&nbsp;'
		]
	});

	if (this.PARAMS.content_url && this.GetForm())
	{
		this.__form.appendChild(BX.create('INPUT', {props:{type:'submit'},style:{display:'none'}}));
		this.__form.onsubmit = BX.delegate(this.__submit, this);
	}
};

BX.CAdminDialog.prototype.__expandGetSize = function()
{
	var res = BX.CAdminDialog.superclass.__expandGetSize.apply(this, arguments);

	res.width -= parseInt(BX.style(this.PARTS.CONTENT_DATA, 'padding-right')) + parseInt(BX.style(this.PARTS.CONTENT_DATA, 'padding-left'));
	res.height -= parseInt(BX.style(this.PARTS.CONTENT_DATA, 'padding-top')) + parseInt(BX.style(this.PARTS.CONTENT_DATA, 'padding-bottom'));

	res.height -= this.PARTS.HEAD.offsetHeight;

	return res;
};

BX.CAdminDialog.prototype.Submit = function()
{
	var FORM = this.GetForm();
	if (FORM && !FORM['bxpublic'] && !/bxpublic=/.test(FORM.action))
	{
		FORM.appendChild(BX.create('INPUT', {
			props: {
				type: 'hidden',
				name: 'bxpublic',
				value: 'Y'
			}
		}));
	}

	return BX.CAdminDialog.superclass.Submit.apply(this, arguments);
};

BX.CAdminDialog.prototype.btnSave = BX.CAdminDialog.btnSave = {
	title: BX.message('JS_CORE_WINDOW_SAVE'),
	id: 'savebtn',
	name: 'savebtn',
	className: 'adm-btn-save',
	action: function () {
		this.disableUntilError();
		this.parentWindow.Submit();
	}
};

BX.CAdminDialog.btnCancel = BX.CAdminDialog.superclass.btnCancel;
BX.CAdminDialog.btnClose = BX.CAdminDialog.superclass.btnClose;

BX.CDebugDialog = function(arParams)
{
	BX.CDebugDialog.superclass.constructor.apply(this, arguments);
};
BX.extend(BX.CDebugDialog, BX.CDialog);

BX.CDebugDialog.prototype.ShowDetails = function(div_id)
{
	var div = BX(div_id);
	if (div)
	{
		if (this.div_detail_current)
			this.div_detail_current.style.display = 'none';

		div.style.display = 'block';
		this.div_detail_current = div;
	}
};

BX.CDebugDialog.prototype.SetContent = function(html)
{
	if (!html)
		return;

	var arHtml = html.split('#DIVIDER#');
	if (arHtml.length > 1)
	{
		this.PARAMS.content = arHtml[1];

		this.PARTS.CONTENT_DATA.style.overflow = 'hidden';

		BX.CDebugDialog.superclass.SetContent.apply(this, [arHtml[1]]);

		this.PARTS.CONTENT_INNER = this.PARTS.CONTENT_DATA.firstChild.nextSibling;
		this.PARTS.CONTENT_TOP = this.PARTS.CONTENT_DATA.insertBefore(BX.create('DIV', {
			props: {
				className: 'bx-debug-content-top'
			},
			html: arHtml[0]
		}), this.PARTS.CONTENT_INNER);
		this.PARTS.CONTENT_INNER.style.overflow = 'auto';
	}
	else
	{
		BX.CDebugDialog.superclass.SetContent.apply(this, arguments);
	}
};

BX.CDebugDialog.prototype.__adjustSize = function()
{
	BX.CDebugDialog.superclass.__adjustSize.apply(this, arguments);

	if (this.PARTS.CONTENT_TOP)
	{
		var new_height = this.PARTS.CONTENT_DATA.offsetHeight - this.PARTS.HEAD.offsetHeight - this.PARTS.CONTENT_TOP.offsetHeight - 38;

		if (new_height > 0)
		{
			this.PARTS.CONTENT_INNER.style.height = new_height + 'px';
		}
	}
};


/* class for dialog window with editors */

BX.CEditorDialog = function(arParams)
{
	BX.CEditorDialog.superclass.constructor.apply(this, arguments);

	BX.removeClass(this.PARTS.CONTENT, 'bx-core-adm-dialog-content-wrap');
	BX.removeClass(this.PARTS.CONTENT_DATA, 'bx-core-adm-dialog-content');

	BX.removeClass(this.PARTS.CONTENT_DATA.lastChild, 'bx-core-adm-dialog-content-wrap-inner');
	BX.removeClass(this.PARTS.BUTTONS_CONTAINER, 'bx-core-adm-dialog-buttons');

	BX.addClass(this.PARTS.CONTENT, 'bx-core-editor-dialog-content-wrap');
	BX.addClass(this.PARTS.CONTENT_DATA, 'bx-core-editor-dialog-content');
	BX.addClass(this.PARTS.BUTTONS_CONTAINER, 'bx-core-editor-dialog-buttons');
};
BX.extend(BX.CEditorDialog, BX.CDialog);

BX.CEditorDialog.prototype.SetContent  = function()
{
	BX.CEditorDialog.superclass.SetContent.apply(this, arguments);

	BX.removeClass(this.PARTS.CONTENT_DATA.lastChild, 'bx-core-adm-dialog-content-wrap-inner');
};

/* class for wizards in admin section */
BX.CWizardDialog = function(arParams)
{
	BX.CWizardDialog.superclass.constructor.apply(this, arguments);

	BX.removeClass(this.PARTS.CONTENT, 'bx-core-adm-dialog-content-wrap');
	BX.removeClass(this.PARTS.CONTENT_DATA, 'bx-core-adm-dialog-content');
	BX.removeClass(this.PARTS.CONTENT_DATA.lastChild, 'bx-core-adm-dialog-content-wrap-inner');
	BX.removeClass(this.PARTS.BUTTONS_CONTAINER, 'bx-core-adm-dialog-buttons');

	BX.addClass(this.PARTS.CONTENT, 'bx-core-wizard-dialog-content-wrap');
};

BX.extend(BX.CWizardDialog, BX.CDialog);

/* class for auth dialog */
BX.CAuthDialog = function(arParams)
{
	arParams.resizable = false;
	arParams.width = 350;
	arParams.height = 200;

	arParams.buttons = [this.btnSave];

	BX.CAuthDialog.superclass.constructor.apply(this, arguments);
	this._sender = 'core_window_cauthdialog';

	BX.addClass(this.DIV, 'bx-core-auth-dialog');

	BX.AUTHAGENT = this;
};
BX.extend(BX.CAuthDialog, BX.CDialog);

BX.CAuthDialog.prototype.btnSave = BX.CAuthDialog.btnSave = {
	title: BX.message('JS_CORE_WINDOW_AUTH'),
	id: 'savebtn',
	name: 'savebtn',
	className: 'adm-btn-save',
	action: function () {
		this.disableUntilError();
		this.parentWindow.Submit('', this.parentWindow.PARAMS.content_url);
	}
};

BX.CAuthDialog.prototype.SetError = function(error)
{
	BX.closeWait();

	if (!!error)
		this.ShowError(error.MESSAGE || error);
};

BX.CAuthDialog.prototype.setAuthResult = function(result)
{
	BX.closeWait();

	if (result === false)
	{
		this.Close();
		if (this.PARAMS.callback)
			this.PARAMS.callback();
	}
	else
	{
		this.SetError(result);
	}
};

/* MENU CLASSES */

BX.CWindowFloat = function(node)
{
	BX.CWindowFloat.superclass.constructor.apply(this, [node, 'float']);

	this.SETTINGS.resizable = false;
};
BX.extend(BX.CWindowFloat, BX.CWindow);

BX.CWindowFloat.prototype.adjustPos = function()
{
	if (this.PARAMS.parent)
		this.adjustToNode();
	else if (this.PARAMS.x && this.PARAMS.y)
		this.adjustToPos([this.PARAMS.x, this.PARAMS.y]);
};

BX.CWindowFloat.prototype.adjustToPos = function(pos)
{
	this.DIV.style.left = parseInt(pos[0]) + 'px';
	this.DIV.style.top = parseInt(pos[1]) + 'px';
};

BX.CWindowFloat.prototype.adjustToNodeGetPos = function()
{
	return BX.pos(this.PARAMS.parent);
};

BX.CWindowFloat.prototype.adjustToNode = function(el)
{
	el = el || this.PARAMS.parent;

	this.PARAMS.parent = BX(el);

	if (this.PARAMS.parent)
	{
		var pos = this.adjustToNodeGetPos();

		this.DIV.style.top = pos.top + 'px';//(pos.top - 26) + 'px';
		this.DIV.style.left = pos.left + 'px';

		this.PARAMS.parent.OPENER = this;
	}
};

BX.CWindowFloat.prototype.Show = function()
{
	this.adjustToPos([-1000, -1000]);
	BX.CWindowFloat.superclass.Show.apply(this, arguments);
	this.adjustPos();
};

/* menu opener class */
/*
{
	DOMNode DIV,
	BX.CMenu or Array MENU,
	TYPE = 'hover' | 'click',
	TIMEOUT: 1000
	ATTACH_MODE: 'top' | 'right'
	ACTIVE_CLASS: className for opener element when menu is opened
}
*/
BX.COpener = function(arParams)
{
	this.PARAMS = arParams || {};

	this.MENU = arParams.MENU || [];

	this.DIV = arParams.DIV;
	this.ATTACH = arParams.ATTACH || arParams.DIV;
	this.ATTACH_MODE = arParams.ATTACH_MODE || 'bottom';

	this.ACTIVE_CLASS = arParams.ACTIVE_CLASS || '';
	this.PUBLIC_FRAME = arParams.PUBLIC_FRAME || 0;
	this.LEVEL = arParams.LEVEL || 0;

	this.CLOSE_ON_CLICK = typeof arParams.CLOSE_ON_CLICK != 'undefined' ? !!arParams.CLOSE_ON_CLICK : true;
	this.ADJUST_ON_CLICK = typeof arParams.ADJUST_ON_CLICK != 'undefined' ? !!arParams.ADJUST_ON_CLICK : true;

	this.TYPE = this.PARAMS.TYPE == 'hover' ? 'hover' : 'click';

	this._openTimeout = null;

	if (this.PARAMS.TYPE == 'hover' && arParams.TIMEOUT !== 0)
		this.TIMEOUT = arParams.TIMEOUT || 1000;
	else
		this.TIMEOUT = 0;

	this.bMenuInit = false;

	if (!!this.PARAMS.MENU_URL)
	{
		this.bMenuLoaded = false;
		this.bMenuLoading = false;

		this.MENU = [{
			TEXT: BX.message('JS_CORE_LOADING'),
			CLOSE_ON_CLICK: false
		}];

		if (this.PARAMS.MENU_PRELOAD)
		{
			BX.defer(this.Load, this)();
		}
	}

	BX.ready(BX.defer(this.Init, this));
};

BX.COpener.prototype.Init = function()
{
	this.DIV = BX(this.DIV);

	switch (this.TYPE)
	{
		case 'hover':
			BX.bind(this.DIV, 'mouseover', BX.proxy(this.Open, this));
			BX.bind(this.DIV, 'click', BX.proxy(this.Toggle, this));
		break;

		case 'click':
			BX.bind(this.DIV, 'click', BX.proxy(this.Toggle, this));
		break;
	}

	//BX.bind(window, 'scroll', BX.delegate(this.__close_immediately, this));

	//this.bMenuInit = false;
};

BX.COpener.prototype.Load = function()
{
	if (this.PARAMS.MENU_URL && !this.bMenuLoaded)
	{
		if (!this.bMenuLoading)
		{
			var url = this.PARAMS.MENU_URL;
			if (url.indexOf('sessid=') <= 0)
				url += (url.indexOf('?') > 0 ? '&' : '?') + 'sessid=' + BX.bitrix_sessid();

			this.bMenuLoading = true;
			BX.ajax.loadJSON(url, BX.proxy(this.SetMenu, this), BX.proxy(this.LoadFailed, this));
		}
	}
};

BX.COpener.prototype.SetMenu = function(menu)
{
	this.bMenuLoaded = true;
	this.bMenuLoading = false;
	if (this.bMenuInit)
	{
		this.MENU.setItems(menu);
	}
	else
	{
		this.MENU = menu;
	}
};

BX.COpener.prototype.LoadFailed = function(type, error)
{
	this.bMenuLoading = false;
	this.SetMenu([{
		TEXT: BX.message('JS_CORE_NO_DATA'),
		CLOSE_ON_CLICK: true
	}]);
	BX.debug(arguments);
};

BX.COpener.prototype.checkAdminMenu = function()
{
	if (document.documentElement.id == 'bx-admin-prefix')
		return true;

	return !!BX.findParent(this.DIV, {property: {id: 'bx-admin-prefix'}});
};

BX.COpener.prototype.Toggle = function(e)
{
	this.__clear_timeout();

	if (!this.bMenuInit || !this.MENU.visible())
	{
		var t = this.TIMEOUT;
		this.TIMEOUT = 0;
		this.Open(e);
		this.TIMEOUT = t;
	}
	else
	{
		this.MENU.Close();
	}

	return !!(e||window.event) && BX.PreventDefault(e);
};

BX.COpener.prototype.GetMenu = function()
{
	if (!this.bMenuInit)
	{
		if (BX.type.isArray(this.MENU))
		{
			this.MENU = new BX.CMenu({
				ITEMS: this.MENU,
				ATTACH_MODE: this.ATTACH_MODE,
				SET_ID: this.checkAdminMenu() ? 'bx-admin-prefix' : '',
				CLOSE_ON_CLICK: !!this.CLOSE_ON_CLICK,
				ADJUST_ON_CLICK: !!this.ADJUST_ON_CLICK,
				PUBLIC_FRAME: !!this.PUBLIC_FRAME,
				LEVEL: this.LEVEL,
				parent: BX(this.DIV),
				parent_attach: BX(this.ATTACH)
			});

			if (this.LEVEL > 0)
			{
				BX.bind(this.MENU.DIV, 'mouseover', BX.proxy(this._on_menu_hover, this));
				BX.bind(this.MENU.DIV, 'mouseout', BX.proxy(this._on_menu_hout, this));
			}
		}

		BX.addCustomEvent(this.MENU, 'onMenuOpen', BX.proxy(this.handler_onopen, this));
		BX.addCustomEvent(this.MENU, 'onMenuClose', BX.proxy(this.handler_onclose, this));

		BX.addCustomEvent('onMenuItemHover', BX.proxy(this.handler_onover, this));

		this.bMenuInit = true;
	}

	return this.MENU;
};

BX.COpener.prototype.Open = function()
{
	this.GetMenu();

	this.bOpen = true;

	this.__clear_timeout();

	if (this.TIMEOUT > 0)
	{
		BX.bind(this.DIV, 'mouseout', BX.proxy(this.__clear_timeout, this));
		this._openTimeout = setTimeout(BX.proxy(this.__open, this), this.TIMEOUT);
	}
	else
	{
		this.__open();
	}

	if (!!this.PARAMS.MENU_URL && !this.bMenuLoaded)
	{
		this._loadTimeout = setTimeout(BX.proxy(this.Load, this), parseInt(this.TIMEOUT/2));
	}

	return true;
};

BX.COpener.prototype.__clear_timeout = function()
{
	if (!!this._openTimeout)
		clearTimeout(this._openTimeout);
	if (!!this._loadTimeout)
		clearTimeout(this._loadTimeout);

	BX.unbind(this.DIV, 'mouseout', BX.proxy(this.__clear_timeout, this));
};

BX.COpener.prototype._on_menu_hover = function()
{
	this.bMenuHover = true;

	this.__clear_timeout();

	if (this.ACTIVE_CLASS)
		BX.addClass(this.DIV, this.ACTIVE_CLASS);

};

BX.COpener.prototype._on_menu_hout = function()
{
	this.bMenuHover = false;
};

BX.COpener.prototype.handler_onover = function(level, opener)
{
	if (this.bMenuHover)
		return;

	if (opener != this && level == this.LEVEL-1 && this.ACTIVE_CLASS)
	{
		BX.removeClass(this.DIV, this.ACTIVE_CLASS);
	}

	if (this.bMenuInit && level <= this.LEVEL-1 && this.MENU.visible())
	{
		if (opener != this)
		{
			this.__clear_timeout();
			this._openTimeout = setTimeout(BX.proxy(this.Close, this), this.TIMEOUT);
		}
	}
};

BX.COpener.prototype.handler_onopen = function()
{
	this.bOpen = true;

	if (this.ACTIVE_CLASS)
		BX.addClass(this.DIV, this.ACTIVE_CLASS);

	BX.defer(function() {
		BX.onCustomEvent(this, 'onOpenerMenuOpen');
	}, this)();
};

BX.COpener.prototype.handler_onclose = function()
{
	this.bOpen = false;
	BX.onCustomEvent(this, 'onOpenerMenuClose');

	if (this.ACTIVE_CLASS)
		BX.removeClass(this.DIV, this.ACTIVE_CLASS);
};

BX.COpener.prototype.Close = function()
{
	if (!this.bMenuInit)
		return;

	if (!!this._openTimeout)
		clearTimeout(this._openTimeout);

	this.bOpen = false;

	this.__close();
};

BX.COpener.prototype.__open = function()
{
	this.__clear_timeout();

	if (this.bMenuInit && this.bOpen && !this.MENU.visible())
		this.MENU.Show();
};

BX.COpener.prototype.__close = function()
{
	if (this.bMenuInit && !this.bOpen && this.MENU.visible())
		this.MENU.Hide();
};

BX.COpener.prototype.__close_immediately = function() {
	this.bOpen = false; this.__close();
};

BX.COpener.prototype.isMenuVisible = function() {
	return null != this.MENU.visible && this.MENU.visible()
};

/* common menu class */

BX.CMenu = function(arParams)
{
	BX.CMenu.superclass.constructor.apply(this);

	this.DIV.style.width = 'auto';//this.DIV.firstChild.offsetWidth + 'px';
	this.DIV.style.height = 'auto';//this.DIV.firstChild.offsetHeight + 'px';

	this.PARAMS = arParams || {};
	this.PARTS = {};

	this.PARAMS.ATTACH_MODE = this.PARAMS.ATTACH_MODE || 'bottom';
	this.PARAMS.CLOSE_ON_CLICK = typeof this.PARAMS.CLOSE_ON_CLICK == 'undefined' ? true : this.PARAMS.CLOSE_ON_CLICK;
	this.PARAMS.ADJUST_ON_CLICK = typeof this.PARAMS.ADJUST_ON_CLICK == 'undefined' ? true : this.PARAMS.ADJUST_ON_CLICK;
	this.PARAMS.PUBLIC_FRAME = typeof this.PARAMS.PUBLIC_FRAME == 'undefined' ? false : this.PARAMS.PUBLIC_FRAME;
	this.PARAMS.LEVEL = this.PARAMS.LEVEL || 0;

	this.DIV.className = 'bx-core-popup-menu bx-core-popup-menu-' + this.PARAMS.ATTACH_MODE + ' bx-core-popup-menu-level' + this.PARAMS.LEVEL + (typeof this.PARAMS.ADDITIONAL_CLASS != 'undefined' ? ' ' + this.PARAMS.ADDITIONAL_CLASS : '');
	if (!!this.PARAMS.SET_ID)
		this.DIV.id = this.PARAMS.SET_ID;

	if (this.PARAMS.LEVEL == 0)
	{
		this.ARROW = this.DIV.appendChild(BX.create('SPAN', {props: {className: 'bx-core-popup-menu-angle'}, style: {left:'15px'}}));
	}

	if (!!this.PARAMS.CLASS_NAME)
		this.DIV.className += ' ' + this.PARAMS.CLASS_NAME;

	BX.bind(this.DIV, 'click', BX.eventCancelBubble);

	this.ITEMS = [];

	this.setItems(this.PARAMS.ITEMS);

	BX.addCustomEvent('onMenuOpen', BX.proxy(this._onMenuOpen, this));
	BX.addCustomEvent('onMenuItemSelected', BX.proxy(this.Hide, this));
};
BX.extend(BX.CMenu, BX.CWindowFloat);

BX.CMenu.broadcastCloseEvent = function()
{
	BX.onCustomEvent("onMenuItemSelected");
};

BX.CMenu._toggleChecked = function()
{
	BX.toggleClass(this, 'bx-core-popup-menu-item-checked');
};

BX.CMenu._itemDblClick = function()
{
	window.location.href = this.href;
};

BX.CMenu.prototype.toggleArrow = function(v)
{
	if (!!this.ARROW)
	{
		if (typeof v == 'undefined')
		{
			v = this.ARROW.style.visibility == 'hidden';
		}

		this.ARROW.style.visibility = !!v ? 'visible' : 'hidden';
	}
};

BX.CMenu.prototype.visible = function()
{
	return this.DIV.style.display !== 'none';
};

BX.CMenu.prototype._onMenuOpen = function(menu, menu_level)
{
	if (this.visible())
	{
		if (menu_level == this.PARAMS.LEVEL && menu != this)
		{
			this.Hide();
		}
	}
};

BX.CMenu.prototype.onUnRegister = function()
{
	if (!this.visible())
		return;

	this.Hide();
};

BX.CMenu.prototype.setItems = function(items)
{
	this.PARAMS.ITEMS = items;

	BX.cleanNode(this.DIV);

	if (!!this.ARROW)
		this.DIV.appendChild(this.ARROW);

	if (this.PARAMS.ITEMS)
	{
		this.PARAMS.ITEMS = BX.util.array_values(this.PARAMS.ITEMS);

		var bIcons = false;
		var cnt = 0;
		for (var i = 0, len = this.PARAMS.ITEMS.length; i < len; i++)
		{
			if ((i == 0 || i == len-1) && this.PARAMS.ITEMS[i].SEPARATOR)
				continue;

			cnt++;

			if (!bIcons)
				bIcons = !!this.PARAMS.ITEMS[i].GLOBAL_ICON;

			this.addItem(this.PARAMS.ITEMS[i], i);
		}

		// Occam turning in his grave
		if (cnt === 1)
			BX.addClass(this.DIV, 'bx-core-popup-menu-single-item');
		else
			BX.removeClass(this.DIV, 'bx-core-popup-menu-single-item');

		if (!bIcons)
			BX.addClass(this.DIV, 'bx-core-popup-menu-no-icons');
		else
			BX.removeClass(this.DIV, 'bx-core-popup-menu-no-icons');

	}
};

BX.CMenu.prototype.addItem = function(item)
{
	this.ITEMS.push(item);

	if (item.SEPARATOR)
	{
		item.NODE = BX.create(
			'DIV', {props: {className: 'bx-core-popup-menu-separator'}}
		);
	}
	else
	{
		var bHasMenu = (!!item.MENU
			&& (
				(BX.type.isArray(item.MENU) && item.MENU.length > 0)
				|| item.MENU instanceof BX.CMenu
			) || !!item.MENU_URL
		);

		if (item.DISABLED)
		{
			item.CLOSE_ON_CLICK = false;
			item.LINK = null;
			item.ONCLICK = null;
			item.ACTION = null;
		}

		var attrs = {};
		if (!!item.LINK || BX.browser.IsIE() && !BX.browser.IsDoctype())
		{
			attrs.href = item.LINK || 'javascript:void(0)';
		}
		if (this.PARAMS.PUBLIC_FRAME)
		{
			attrs.target = '_top';
		}

		item.NODE = BX.create(!!item.LINK || BX.browser.IsIE() && !BX.browser.IsDoctype() ? 'A' : 'SPAN', {
			props: {
				className: 'bx-core-popup-menu-item'
					+ (bHasMenu ? ' bx-core-popup-menu-item-opener' : '')
					+ (!!item.DEFAULT ? ' bx-core-popup-menu-item-default' : '')
					+ (!!item.DISABLED ? ' bx-core-popup-menu-item-disabled' : '')
					+ (!!item.CHECKED ? ' bx-core-popup-menu-item-checked' : ''),
					title: !!BX.message['MENU_ENABLE_TOOLTIP'] || !!item.SHOW_TITLE ? item.TITLE || '' : '',
				BXMENULEVEL: this.PARAMS.LEVEL
			},
			attrs: attrs,
			events: {
				mouseover: function()
				{
					BX.onCustomEvent('onMenuItemHover', [this.BXMENULEVEL, this.OPENER])
				}
			},
			html: '<span class="bx-core-popup-menu-item-icon' + (item.GLOBAL_ICON ? ' '+item.GLOBAL_ICON : '') + '"></span><span class="bx-core-popup-menu-item-text">'+(item.HTML||(item.TEXT? BX.util.htmlspecialchars(item.TEXT) : ''))+'</span>'
		});

		if (bHasMenu && !item.DISABLED)
		{
			item.NODE.OPENER = new BX.COpener({
				DIV: item.NODE,
				ACTIVE_CLASS: 'bx-core-popup-menu-item-opened',
				TYPE: 'hover',
				MENU: item.MENU,
				MENU_URL: item.MENU_URL,
				MENU_PRELOAD: !!item.MENU_PRELOAD,
				LEVEL: this.PARAMS.LEVEL + 1,
				ATTACH_MODE:'right',
				TIMEOUT: 500
			});
		}
		else if (this.PARAMS.CLOSE_ON_CLICK && (typeof item.CLOSE_ON_CLICK == 'undefined' || !!item.CLOSE_ON_CLICK))
		{
			BX.bind(item.NODE, 'click', BX.CMenu.broadcastCloseEvent);
		}
		else if (this.PARAMS.ADJUST_ON_CLICK && (typeof item.ADJUST_ON_CLICK == 'undefined' || !!item.ADJUST_ON_CLICK))
		{
			BX.bind(item.NODE, 'click', BX.defer(this.adjustPos, this));
		}

		if (bHasMenu && !!item.LINK)
		{
			BX.bind(item.NODE, 'dblclick', BX.CMenu._itemDblClick);
		}

		if (typeof item.CHECKED != 'undefined')
		{
			BX.bind(item.NODE, 'click', BX.CMenu._toggleChecked);
		}

		item.ONCLICK = item.ACTION || item.ONCLICK;
		if (!!item.ONCLICK)
		{
			if (BX.type.isString(item.ONCLICK))
			{
				item.ONCLICK = new Function("event", item.ONCLICK);
			}

			BX.bind(item.NODE, 'click', item.ONCLICK);
		}
	}

	this.DIV.appendChild(item.NODE);
};

BX.CMenu.prototype._documentClickBind = function()
{
	this._documentClickUnBind();
	BX.bind(document, 'click', BX.proxy(this._documentClick, this));
};

BX.CMenu.prototype._documentClickUnBind = function()
{
	BX.unbind(document, 'click', BX.proxy(this._documentClick, this));
};

BX.CMenu.prototype._documentClick = function(e)
{
	e = e||window.event;
	if(!!e && !(BX.getEventButton(e) & BX.MSLEFT))
		return;

	this.Close();
};

BX.CMenu.prototype.Show = function()
{
	BX.onCustomEvent(this, 'onMenuOpen', [this, this.PARAMS.LEVEL]);
	BX.CMenu.superclass.Show.apply(this, []);

	this.bCloseEventFired = false;

	BX.addCustomEvent(this.PARAMS.parent_attach, 'onChangeNodePosition', BX.proxy(this.adjustToNode, this));

	(BX.defer(this._documentClickBind, this))();
};

BX.CMenu.prototype.Close = // we shouldn't 'Close' window - only hide
BX.CMenu.prototype.Hide = function()
{
	if (!this.visible())
		return;

	BX.removeCustomEvent(this.PARAMS.parent_attach, 'onChangeNodePosition', BX.proxy(this.adjustToNode, this));

	this._documentClickUnBind();

	if (!this.bCloseEventFired)
	{
		BX.onCustomEvent(this, 'onMenuClose', [this, this.PARAMS.LEVEL]);
		this.bCloseEventFired = true;
	}
	BX.CMenu.superclass.Hide.apply(this, arguments);


//	this.DIV.onclick = null;
	//this.PARAMS.parent.onclick = null;
};

BX.CMenu.prototype.__adjustMenuToNode = function()
{
	var pos = BX.pos(this.PARAMS.parent_attach),
		bFixed = !!BX.findParent(this.PARAMS.parent_attach, BX.is_fixed);

	if (bFixed)
		this.DIV.style.position = 'fixed';
	else
		this.DIV.style.position = 'absolute';

	if (!pos.top)
	{
		this.DIV.style.top = '-1000px';
		this.DIV.style.left = '-1000px';
	}

	if (this.bTimeoutSet) return;

	var floatWidth = this.DIV.offsetWidth, floatHeight = this.DIV.offsetHeight;
	if (!floatWidth)
	{
		setTimeout(BX.delegate(function(){
			this.bTimeoutSet = false; this.__adjustMenuToNode();
		}, this), 100);

		this.bTimeoutSet = true;
		return;
	}

	var menu_pos = {},
		wndSize = BX.GetWindowSize();

/*
	if (BX.browser.IsIE() && !BX.browser.IsDoctype())
	{
		pos.top -= 4; pos.bottom -= 4;
		pos.left -= 2; pos.right -= 2;
	}
*/

	switch (this.PARAMS.ATTACH_MODE)
	{
		case 'bottom':
			menu_pos.top = pos.bottom + 9;
			menu_pos.left = pos.left;

			var arrowPos = 0;
			if (!!this.ARROW)
			{
				if (pos.width > floatWidth)
					arrowPos = parseInt(floatWidth/2 - 7);
				else
					arrowPos = parseInt(Math.min(floatWidth, pos.width)/2 - 7);

				if (arrowPos < 7)
				{
					menu_pos.left -= 15;
					arrowPos += 15;
				}
			}

			if (menu_pos.left > wndSize.scrollWidth - floatWidth - 10)
			{
				var orig_menu_pos = menu_pos.left;
				menu_pos.left = wndSize.scrollWidth - floatWidth - 10;

				if (!!this.ARROW)
					arrowPos += orig_menu_pos - menu_pos.left;
			}

			if (bFixed)
			{
				menu_pos.left -= wndSize.scrollLeft;
			}

			if (!!this.ARROW)
				this.ARROW.style.left = arrowPos + 'px';
		break;
		case 'right':
			menu_pos.top = pos.top-1;
			menu_pos.left = pos.right;

			if (menu_pos.left > wndSize.scrollWidth - floatWidth - 10)
			{
				menu_pos.left = pos.left - floatWidth - 1;
			}
		break;
	}

	if (bFixed)
	{
		menu_pos.top -= wndSize.scrollTop;
	}

	if (!!this.ARROW)
		this.ARROW.className = 'bx-core-popup-menu-angle';

	if((menu_pos.top + floatHeight > wndSize.scrollTop + wndSize.innerHeight)
		|| (menu_pos.top + floatHeight > wndSize.scrollHeight))
	{
		var new_top = this.PARAMS.ATTACH_MODE == 'bottom'
			? pos.top - floatHeight - 9
			: pos.bottom - floatHeight + 1;

		if((new_top > wndSize.scrollTop)
			|| (menu_pos.top + floatHeight > wndSize.scrollHeight))
		{
			if ((menu_pos.top + floatHeight > wndSize.scrollHeight))
			{
				menu_pos.top = Math.max(0, wndSize.scrollHeight-floatHeight);
				this.toggleArrow(false);
			}
			else
			{
				menu_pos.top = new_top;

				if (!!this.ARROW)
					this.ARROW.className = 'bx-core-popup-menu-angle-bottom';
			}
		}
	}

	if (menu_pos.top + menu_pos.left == 0)
	{
		this.Hide();
	}
	else
	{
		this.DIV.style.top = menu_pos.top + 'px';
		this.DIV.style.left = menu_pos.left + 'px';
	}
};

BX.CMenu.prototype.adjustToNode = function(el)
{
	this.PARAMS.parent_attach = BX(el) || this.PARAMS.parent_attach || this.PARAMS.parent;
	this.__adjustMenuToNode();
};


/* components toolbar class */

BX.CMenuOpener = function(arParams)
{
	BX.CMenuOpener.superclass.constructor.apply(this);

	this.PARAMS = arParams || {};
	this.setParent(this.PARAMS.parent);
	this.PARTS = {};

	this.SETTINGS.drag_restrict = true;

	this.defaultAction = null;

	this.timeout = 500;

	this.DIV.className = 'bx-component-opener';
	this.DIV.ondblclick = BX.PreventDefault;

	if (this.PARAMS.component_id)
	{
		this.PARAMS.transform = !!this.PARAMS.transform;
	}

	this.OPENERS = [];

	this.DIV.appendChild(BX.create('SPAN', {
		props: {className: 'bx-context-toolbar' + (this.PARAMS.transform ? ' bx-context-toolbar-vertical-mode' : '')}
	}));

	//set internal structure and register draggable element
	this.PARTS.INNER = this.DIV.firstChild.appendChild(BX.create('SPAN', {
		props: {className: 'bx-context-toolbar-inner'},
		html: '<span class="bx-context-toolbar-drag-icon"></span><span class="bx-context-toolbar-vertical-line"></span><br>'
	}));

	this.EXTRA_BUTTONS = {};

	var btnCount = 0;
	for (var i = 0, len = this.PARAMS.menu.length; i < len; i++)
	{
		var item = this.addItem(this.PARAMS.menu[i]);
		if (null != item)
		{
			btnCount++;
			this.PARTS.INNER.appendChild(item);
			this.PARTS.INNER.appendChild(BX.create('BR'));
		}
	}
	var bHasButtons = btnCount > 0;

	//menu items will be attached here

	this.PARTS.ICONS = this.PARTS.INNER.appendChild(BX.create('SPAN', {
		props: {className: 'bx-context-toolbar-icons'}
	}));

	if (this.PARAMS.component_id)
	{
		this.PARAMS.pin = !!this.PARAMS.pin;

		if (bHasButtons)
			this.PARTS.ICONS.appendChild(BX.create('SPAN', {props: {className: 'bx-context-toolbar-separator'}}));

		this.PARTS.ICON_PIN = this.PARTS.ICONS.appendChild(BX.create('A', {
			attrs: {
				href: 'javascript:void(0)'
			},
			props: {
				className: this.PARAMS.pin
							? 'bx-context-toolbar-pin-fixed'
							: 'bx-context-toolbar-pin'
			},
			events: {
				click: BX.delegate(this.__pin_btn_clicked, this)
			}
		}));
	}


	if (this.EXTRA_BUTTONS['components2_props'])
	{
		var btn = this.EXTRA_BUTTONS['components2_props'] || {URL: 'javascript:void(0)'};
		if (null == this.defaultAction)
		{
			this.defaultAction = btn.ONCLICK;
			this.defaultActionTitle = btn.TITLE || btn.TEXT;
		}

		btn.URL = 'javascript:' + BX.util.urlencode(btn.ONCLICK);

		this.ATTACH = this.PARTS.ICONS.appendChild(BX.create('SPAN', {
			props: {className: 'bx-context-toolbar-button bx-context-toolbar-button-settings' },
			children:
			[
				BX.create('SPAN',
				{
					props:{className: 'bx-context-toolbar-button-inner'},
					children:
					[
						BX.create('A', {
							attrs: {href: btn.URL},
							events: {
								mouseover: BX.proxy(this.__msover_text, this),
								mouseout: BX.proxy(this.__msout_text, this),
								mousedown: BX.proxy(this.__msdown_text, this)
							},
							html: '<span class="bx-context-toolbar-button-icon bx-context-toolbar-settings-icon"></span>'
						}),
						BX.create('A', {
							attrs: {href: 'javascript: void(0)'},
							props: {className: 'bx-context-toolbar-button-arrow'},
							events: {
								mouseover: BX.proxy(this.__msover_arrow, this),
								mouseout: BX.proxy(this.__msout_arrow, this),
								mousedown: BX.proxy(this.__msdown_arrow, this)
							},
							html: '<span class="bx-context-toolbar-button-arrow"></span>'
						})
					]
				})
			]
		}));

		this.OPENER = this.ATTACH.firstChild.lastChild;

		var opener = this.attachMenu(this.EXTRA_BUTTONS['components2_submenu']['MENU']);

		BX.addCustomEvent(opener, 'onOpenerMenuOpen', BX.proxy(this.__menu_open, this));
		BX.addCustomEvent(opener, 'onOpenerMenuClose', BX.proxy(this.__menu_close, this));
	}

	if (btnCount > 1)
	{
		this.PARTS.ICONS.appendChild(BX.create('span', { props: {className: 'bx-context-toolbar-separator bx-context-toolbar-separator-switcher'}}));

		this.ICON_TRANSFORM = this.PARTS.ICONS.appendChild(BX.create('A', {
			attrs: {href: 'javascript: void(0)'},
			props: {className: 'bx-context-toolbar-switcher'},
			events: {
				click: BX.delegate(this.__trf_btn_clicked, this)
			}
		}));
	}

	if (this.PARAMS.HINT)
	{
		this.DIV.BXHINT = this.HINT = new BX.CHint({
			parent: this.DIV,
			hint:this.PARAMS.HINT.TEXT || '',
			title: this.PARAMS.HINT.TITLE || '',
			hide_timeout: this.timeout/2,
			preventHide: false
		});
	}

	BX.addCustomEvent(this, 'onWindowDragFinished', BX.delegate(this.__onMoveFinished, this));
	BX.addCustomEvent('onDynamicModeChange', BX.delegate(this.__onDynamicModeChange, this));
	BX.addCustomEvent('onTopPanelCollapse', BX.delegate(this.__onPanelCollapse, this));

	BX.addCustomEvent('onMenuOpenerMoved', BX.delegate(this.checkPosition, this));
	BX.addCustomEvent('onMenuOpenerUnhide', BX.delegate(this.checkPosition, this));

	if (this.OPENERS)
	{
		for (i=0,len=this.OPENERS.length; i<len; i++)
		{
			BX.addCustomEvent(this.OPENERS[i], 'onOpenerMenuOpen', BX.proxy(this.__hide_hint, this));
		}
	}
};
BX.extend(BX.CMenuOpener, BX.CWindowFloat);

BX.CMenuOpener.prototype.setParent = function(new_parent)
{
	new_parent = BX(new_parent);
	if(new_parent.OPENER && new_parent.OPENER != this)
	{
		new_parent.OPENER.Close();
		new_parent.OPENER.clearHoverHoutEvents();
	}

	if(this.PARAMS.parent && this.PARAMS.parent != new_parent)
	{
		this.clearHoverHoutEvents();
		this.PARAMS.parent.OPENER = null;
	}

	this.PARAMS.parent = new_parent;
	this.PARAMS.parent.OPENER = this;
};

BX.CMenuOpener.prototype.setHoverHoutEvents = function(hover, hout)
{
	if(!this.__opener_events_set)
	{
		BX.bind(this.Get(), 'mouseover', hover);
		BX.bind(this.Get(), 'mouseout', hout);
		this.__opener_events_set = true;
	}
};

BX.CMenuOpener.prototype.clearHoverHoutEvents = function()
{
	if(this.Get())
	{
		BX.unbindAll(this.Get());
		this.__opener_events_set = false;
	}
};


BX.CMenuOpener.prototype.unclosable = true;

BX.CMenuOpener.prototype.__check_intersection = function(pos_self, pos_other)
{
	return !(pos_other.right <= pos_self.left || pos_other.left >= pos_self.right
			|| pos_other.bottom <= pos_self.top || pos_other.top >= pos_self.bottom);
};


BX.CMenuOpener.prototype.__msover_text = function() {
	this.bx_hover = true;
	if (!this._menu_open)
		BX.addClass(this.ATTACH, 'bx-context-toolbar-button-text-hover');
};

BX.CMenuOpener.prototype.__msout_text = function() {
	this.bx_hover = false;
	if (!this._menu_open)
		BX.removeClass(this.ATTACH, 'bx-context-toolbar-button-text-hover bx-context-toolbar-button-text-active');
};

BX.CMenuOpener.prototype.__msover_arrow = function() {
	this.bx_hover = true;
	if (!this._menu_open)
		BX.addClass(this.ATTACH, 'bx-context-toolbar-button-arrow-hover');
};

BX.CMenuOpener.prototype.__msout_arrow = function() {
	this.bx_hover = false;
	if (!this._menu_open)
		BX.removeClass(this.ATTACH, 'bx-context-toolbar-button-arrow-hover bx-context-toolbar-button-arrow-active');
};

BX.CMenuOpener.prototype.__msdown_text = function() {
	this.bx_active = true;
	if (!this._menu_open)
		BX.addClass(this.ATTACH, 'bx-context-toolbar-button-text-active');
};

BX.CMenuOpener.prototype.__msdown_arrow = function() {
	this.bx_active = true;
	if (!this._menu_open)
		BX.addClass(this.ATTACH, 'bx-context-toolbar-button-arrow-active');
};

BX.CMenuOpener.prototype.__menu_close = function() {
	this._menu_open = false;
	this.bx_active = false;
	BX.removeClass(this.ATTACH, 'bx-context-toolbar-button-active bx-context-toolbar-button-text-active bx-context-toolbar-button-arrow-active');
	if (!this.bx_hover)
	{
		BX.removeClass(this.ATTACH, 'bx-context-toolbar-button-hover bx-context-toolbar-button-text-hover bx-context-toolbar-button-arrow-hover');
		this.bx_hover = false;
	}
};

BX.CMenuOpener.prototype.__menu_open = function() {
	this._menu_open = true;
};

BX.CMenuOpener.prototype.checkPosition = function()
{
	if (this.isMenuVisible() || this.DIV.style.display == 'none'
		|| this == BX.proxy_context || BX.proxy_context.zIndex > this.zIndex)
		return;

	this.correctPosition(BX.proxy_context);
};

BX.CMenuOpener.prototype.correctPosition = function(opener)
{
	var pos_self = BX.pos(this.DIV), pos_other = BX.pos(opener.Get());
	if (this.__check_intersection(pos_self, pos_other))
	{
		var new_top = pos_other.top - pos_self.height;
		if (new_top < 0)
			new_top = pos_other.bottom;

		this.DIV.style.top = new_top + 'px';

		BX.addCustomEvent(opener, 'onMenuOpenerHide', BX.proxy(this.restorePosition, this));
		BX.onCustomEvent(this, 'onMenuOpenerMoved');
	}
};

BX.CMenuOpener.prototype.restorePosition = function()
{
	if (!this.MOUSEOVER && !this.isMenuVisible())
	{
		if (this.originalPos)
			this.DIV.style.top = this.originalPos.top + 'px';

		BX.removeCustomEvent(BX.proxy_context, 'onMenuOpenerHide', BX.proxy(this.restorePosition, this));
		if (this.restore_pos_timeout) clearTimeout(this.restore_pos_timeout);
	}
	else
	{
		this.restore_pos_timeout = setTimeout(BX.proxy(this.restorePosition, this), this.timeout);
	}
};


BX.CMenuOpener.prototype.Show = function()
{
	BX.CMenuOpener.superclass.Show.apply(this, arguments);

	this.SetDraggable(this.PARTS.INNER.firstChild);

	this.DIV.style.width = 'auto';
	this.DIV.style.height = 'auto';

	if (!this.PARAMS.pin)
	{
		this.DIV.style.left = '-1000px';
		this.DIV.style.top = '-1000px';

		this.Hide();
	}
	else
	{
		this.bPosAdjusted = true;
		this.bMoved = true;

		if (this.PARAMS.top) this.DIV.style.top = this.PARAMS.top + 'px';
		if (this.PARAMS.left) this.DIV.style.left = this.PARAMS.left + 'px';

		this.DIV.style.display = (!BX.admin.dynamic_mode || BX.admin.dynamic_mode_show_borders) ? 'block' : 'none';

		if (this.DIV.style.display == 'block')
		{
			setTimeout(BX.delegate(function() {BX.onCustomEvent(this, 'onMenuOpenerUnhide')}, this), 50);
		}
	}
};

BX.CMenuOpener.prototype.executeDefaultAction = function()
{
	if (this.defaultAction)
	{
		if (BX.type.isFunction(this.defaultAction))
			this.defaultAction();
		else if(BX.type.isString(this.defaultAction))
			BX.evalGlobal(this.defaultAction);
	}
};

BX.CMenuOpener.prototype.__onDynamicModeChange = function(val)
{
	this.DIV.style.display = val ? 'block' : 'none';
};

BX.CMenuOpener.prototype.__onPanelCollapse = function(bCollapsed, dy)
{
	this.DIV.style.top = (parseInt(this.DIV.style.top) + dy) + 'px';
	if (this.PARAMS.pin)
	{
		this.__savePosition();
	}
};

BX.CMenuOpener.prototype.__onMoveFinished = function()
{
	BX.onCustomEvent(this, 'onMenuOpenerMoved');

	this.bMoved = true;

	if (this.PARAMS.pin)
		this.__savePosition();
};

BX.CMenuOpener.prototype.__savePosition = function()
{
	var arOpts = {};

	arOpts.pin = this.PARAMS.pin;
	if (!this.PARAMS.pin)
	{
		arOpts.top = false; arOpts.left = false; arOpts.transform = false;
	}
	else
	{
		arOpts.transform = this.PARAMS.transform;
		if (this.bMoved)
		{
			arOpts.left = parseInt(this.DIV.style.left);
			arOpts.top = parseInt(this.DIV.style.top);
		}
	}

	BX.WindowManager.saveWindowOptions(this.PARAMS.component_id, arOpts);
};

BX.CMenuOpener.prototype.__pin_btn_clicked = function() {this.Pin()};
BX.CMenuOpener.prototype.Pin = function(val)
{
	if (null == val)
		this.PARAMS.pin = !this.PARAMS.pin;
	else
		this.PARAMS.pin = !!val;

	this.PARTS.ICON_PIN.className = (this.PARAMS.pin ? 'bx-context-toolbar-pin-fixed' : 'bx-context-toolbar-pin');

	this.__savePosition();
};

BX.CMenuOpener.prototype.__trf_btn_clicked = function() {this.Transform()};
BX.CMenuOpener.prototype.Transform = function(val)
{
	var pos = {};

	if (null == val)
		this.PARAMS.transform = !this.PARAMS.transform;
	else
		this.PARAMS.transform = !!val;

	if (this.bMoved)
	{
		pos = BX.pos(this.DIV);
	}

	if (this.PARAMS.transform)
		BX.addClass(this.DIV.firstChild, 'bx-context-toolbar-vertical-mode');
	else
		BX.removeClass(this.DIV.firstChild, 'bx-context-toolbar-vertical-mode');

	if (!this.bMoved)
	{
		this.adjustPos();
	}
	else
	{
		this.DIV.style.left = (pos.right - this.DIV.offsetWidth - (BX.browser.IsIE() && !BX.browser.IsDoctype() ? 2 : 0)) + 'px';
	}

	this.__savePosition();
};

BX.CMenuOpener.prototype.adjustToNodeGetPos = function()
{
	var pos = BX.pos(this.PARAMS.parent/*, true*/);

	var scrollSize = BX.GetWindowScrollSize();
	var floatWidth = this.DIV.offsetWidth;

	pos.left -= BX.admin.__border_dx;
	pos.top -= BX.admin.__border_dx;

	if (true || !this.PARAMS.transform)
	{
		pos.top -= 45;
	}

	if (pos.left > scrollSize.scrollWidth - floatWidth)
	{
		pos.left = scrollSize.scrollWidth - floatWidth;
	}

	return pos;
};

BX.CMenuOpener.prototype.addItem = function(item)
{
	if (item.TYPE)
	{
		this.EXTRA_BUTTONS[item.TYPE] = item;
		return null;
	}
	else
	{
		var q = new BX.CMenuOpenerItem(item);
		if (null == this.defaultAction)
		{
			if (q.item.ONCLICK)
			{
				this.defaultAction = item.ONCLICK;
			}
			else if (q.item.MENU)
			{
				this.defaultAction = BX.delegate(function() {this.Open()}, q.item.OPENER);
			}

			this.defaultActionTitle = item.TITLE || item.TEXT;

			BX.addClass(q.Get(), 'bx-content-toolbar-default');
		}
		if (q.item.OPENER) this.OPENERS[this.OPENERS.length] = q.item.OPENER;
		return q.Get();
	}
};

BX.CMenuOpener.prototype.attachMenu = function(menu)
{
	var opener = new BX.COpener({
		'DIV':  this.OPENER,
		'ATTACH': this.ATTACH,
		'MENU': menu,
		'TYPE': 'click'
	});

	this.OPENERS[this.OPENERS.length] = opener;

	return opener;
};

BX.CMenuOpener.prototype.__hide_hint = function()
{
	if (this.HINT) this.HINT.__hide_immediately();
};

BX.CMenuOpener.prototype.isMenuVisible = function()
{
	for (var i=0,len=this.OPENERS.length; i<len; i++)
	{
		if (this.OPENERS[i].isMenuVisible())
			return true;
	}

	return false;
};

BX.CMenuOpener.prototype.Hide = function()
{
	if (!this.PARAMS.pin)
	{
		this.DIV.style.display = 'none';
		BX.onCustomEvent(this, 'onMenuOpenerHide');
	}
};
BX.CMenuOpener.prototype.UnHide = function()
{
	this.DIV.style.display = 'block';
	if (!this.bPosAdjusted && !this.PARAMS.pin)
	{
		this.adjustPos();
		this.bPosAdjusted = true;
	}

	if (null == this.originalPos && !this.bMoved)
	{
		this.originalPos = BX.pos(this.DIV);
	}

	BX.onCustomEvent(this, 'onMenuOpenerUnhide');
};

BX.CMenuOpenerItem = function(item)
{
	this.item = item;

	if (this.item.ACTION && !this.item.ONCLICK)
	{
		this.item.ONCLICK = this.item.ACTION;
	}

	this.DIV = BX.create('SPAN');
	this.DIV.appendChild(BX.create('SPAN', {props: {className: 'bx-context-toolbar-button-underlay'}}));

	this.WRAPPER = this.DIV.appendChild(BX.create('SPAN', {
		props: {className: 'bx-context-toolbar-button-wrapper'},
		children: [
			BX.create('SPAN', {
				props: {className: 'bx-context-toolbar-button', title: item.TITLE},
				children: [
					BX.create('SPAN', {
						props: {className: 'bx-context-toolbar-button-inner'}
					})
				]
			})
		]
	}));

	var btn_icon = BX.create('SPAN', {
		props: {className: 'bx-context-toolbar-button-icon' + (this.item.ICON || this.item.ICONCLASS ? ' ' + (this.item.ICON || this.item.ICONCLASS) : '')},
		attrs: (
				!(this.item.ICON || this.item.ICONCLASS)
				&&
				(this.item.SRC || this.item.IMAGE)
			)
			? {
				style: 'background: scroll transparent url(' + (this.item.SRC || this.item.IMAGE) + ') no-repeat center center !important;'
			}
			: {}
	}), btn_text = BX.create('SPAN', {
		props: {className: 'bx-context-toolbar-button-text'},
		text: this.item.TEXT
	});

	if (this.item.ACTION && !this.item.ONCLICK)
	{
		this.item.ONCLICK = this.item.ACTION;
	}

	this.bHasMenu = !!this.item.MENU;
	this.bHasAction = !!this.item.ONCLICK;

	if (this.bHasAction)
	{
		this.LINK = this.WRAPPER.firstChild.firstChild.appendChild(BX.create('A', {
			attrs: {
				'href': 'javascript: void(0)'
			},
			events: {
				mouseover: this.bHasMenu ? BX.proxy(this.__msover_text, this) : BX.proxy(this.__msover, this),
				mouseout: this.bHasMenu ? BX.proxy(this.__msout_text, this) : BX.proxy(this.__msout, this),
				mousedown: this.bHasMenu ? BX.proxy(this.__msdown_text, this) : BX.proxy(this.__msdown, this)
			},
			children: [btn_icon, btn_text]
		}));

		if (this.bHasMenu)
		{
			this.LINK_MENU = this.WRAPPER.firstChild.firstChild.appendChild(BX.create('A', {
				props: {className: 'bx-context-toolbar-button-arrow'},
				attrs: {
					'href': 'javascript: void(0)'
				},
				events: {
					mouseover: BX.proxy(this.__msover_arrow, this),
					mouseout: BX.proxy(this.__msout_arrow, this),
					mousedown: BX.proxy(this.__msdown_arrow, this)
				},
				children: [
					BX.create('SPAN', {props: {className: 'bx-context-toolbar-button-arrow'}})
				]
			}));
		}

	}
	else if (this.bHasMenu)
	{
		this.item.ONCLICK = null;

		this.LINK = this.LINK_MENU = this.WRAPPER.firstChild.firstChild.appendChild(BX.create('A', {
			attrs: {
				'href': 'javascript: void(0)'
			},
			events: {
				mouseover: BX.proxy(this.__msover, this),
				mouseout: BX.proxy(this.__msout, this),
				mousedown: BX.proxy(this.__msdown, this)
			},
			children: [
				btn_icon,
				btn_text
			]
		}));

		this.LINK.appendChild(BX.create('SPAN', {props: {className: 'bx-context-toolbar-single-button-arrow'}}));

	}

	if (this.bHasMenu)
	{
		this.item.SUBMENU = new BX.CMenu({
			ATTACH_MODE:'bottom',
			ITEMS:this.item['MENU'],
			//PARENT_MENU:this.parentMenu,
			parent: this.LINK_MENU,
			parent_attach: this.WRAPPER.firstChild
		});

		this.item.OPENER = new BX.COpener({
			DIV: this.LINK_MENU,
			TYPE: 'click',
			MENU: this.item.SUBMENU
		});

		BX.addCustomEvent(this.item.OPENER, 'onOpenerMenuOpen', BX.proxy(this.__menu_open, this));
		BX.addCustomEvent(this.item.OPENER, 'onOpenerMenuClose', BX.proxy(this.__menu_close, this));
	}

	if (this.bHasAction)
	{
		BX.bind(this.LINK, 'click', BX.delegate(this.__click, this));
	}
};

BX.CMenuOpenerItem.prototype.Get = function() {return this.DIV;};
BX.CMenuOpenerItem.prototype.__msover = function() {
	this.bx_hover = true;
	if (!this._menu_open)
		BX.addClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-hover');
};
BX.CMenuOpenerItem.prototype.__msout = function() {
	this.bx_hover = false;
	if (!this._menu_open)
		BX.removeClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-hover bx-context-toolbar-button-active');
};
BX.CMenuOpenerItem.prototype.__msover_text = function() {
	this.bx_hover = true;
	if (!this._menu_open)
		BX.addClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-text-hover');
};
BX.CMenuOpenerItem.prototype.__msout_text = function() {
	this.bx_hover = false;
	if (!this._menu_open)
		BX.removeClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-text-hover bx-context-toolbar-button-text-active');
};
BX.CMenuOpenerItem.prototype.__msover_arrow = function() {
	this.bx_hover = true;
	if (!this._menu_open)
		BX.addClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-arrow-hover');
};
BX.CMenuOpenerItem.prototype.__msout_arrow = function() {
	this.bx_hover = false;
	if (!this._menu_open)
		BX.removeClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-arrow-hover bx-context-toolbar-button-arrow-active');
};
BX.CMenuOpenerItem.prototype.__msdown = function() {
	this.bx_active = true;
	if (!this._menu_open)
		BX.addClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-active');
};
BX.CMenuOpenerItem.prototype.__msdown_text = function() {
	this.bx_active = true;
	if (!this._menu_open)
		BX.addClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-text-active');
};
BX.CMenuOpenerItem.prototype.__msdown_arrow = function() {
	this.bx_active = true;
	if (!this._menu_open)
		BX.addClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-arrow-active');
};
BX.CMenuOpenerItem.prototype.__menu_close = function() {

	this._menu_open = false;
	this.bx_active = false;
	BX.removeClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-active bx-context-toolbar-button-text-active bx-context-toolbar-button-arrow-active');
	if (!this.bx_hover)
	{
		BX.removeClass(this.LINK.parentNode.parentNode, 'bx-context-toolbar-button-hover bx-context-toolbar-button-text-hover bx-context-toolbar-button-arrow-hover');
		this.bx_hover = false;
	}
};
BX.CMenuOpenerItem.prototype.__menu_open = function() {
	this._menu_open = true;
};

BX.CMenuOpenerItem.prototype.__click = function() {BX.evalGlobal(this.item.ONCLICK)};

/* global page opener class */
BX.CPageOpener = function(arParams)
{
	//if (null == arParams.pin) arParams.pin = true;
	BX.CPageOpener.superclass.constructor.apply(this, arguments);

	this.timeout = 505;

	window.PAGE_EDIT_CONTROL = this;
};
BX.extend(BX.CPageOpener, BX.CMenuOpener);

BX.CPageOpener.prototype.checkPosition = function()
{
	if (/*this.isMenuVisible() || this.DIV.style.display == 'none' || */this == BX.proxy_context)
		return;

	this.correctPosition(BX.proxy_context);
};

BX.CPageOpener.prototype.correctPosition = function(opener)
{
	if (this.bPosCorrected) return;
	var pos_self;
	if (this.DIV.style.display == 'none')
	{
		pos_self = this.adjustToNodeGetPos();
		pos_self.bottom = pos_self.top + 30;
		pos_self.right = pos_self.left + 300;
	}
	else
	{
		pos_self = BX.pos(this.DIV);
	}

	var pos_other = BX.pos(opener.Get());
	if (this.__check_intersection(pos_self, pos_other))
	{
		this.DIV.style.display = 'none';
		BX.addCustomEvent(opener, 'onMenuOpenerHide', BX.proxy(this.restorePosition, this));

		this.bPosCorrected = true;
	}
};

BX.CPageOpener.prototype.restorePosition = function()
{
	if (BX.proxy_context && BX.proxy_context.Get().style.display == 'none')
	{
		this.bPosCorrected = false;

		if (this.PARAMS.parent.bx_over || this.PARAMS.pin)
			this.UnHide();

		BX.removeCustomEvent('onMenuOpenerHide', BX.proxy(this.restorePosition, this));
	}
};

BX.CPageOpener.prototype.UnHide = function()
{
	if (!this.bPosCorrected)
		BX.CPageOpener.superclass.UnHide.apply(this, arguments);
};

BX.CPageOpener.prototype.Remove = function()
{
	BX.admin.removeComponentBorder(this.PARAMS.parent);
	BX.userOptions.save('global', 'settings', 'page_edit_control_enable', 'N');
	this.DIV.style.display = 'none';
};

/******* HINT ***************/
BX.CHintSimple = function()
{
	BX.CHintSimple.superclass.constructor.apply(this, arguments);
};
BX.extend(BX.CHintSimple, BX.CHint);

BX.CHintSimple.prototype.Init = function()
{
	this.DIV = document.body.appendChild(BX.create('DIV', {props: {className: 'bx-tooltip-simple'}, style: {display: 'none'}, children: [(this.CONTENT = BX.create('DIV'))]}));

	BX.ZIndexManager.register(this.DIV);

	if (this.HINT_TITLE)
		this.CONTENT.appendChild(BX.create('B', {text: this.HINT_TITLE}));

	if (this.HINT)
		this.CONTENT_TEXT = this.CONTENT.appendChild(BX.create('DIV')).appendChild(BX.create('SPAN', {html: this.HINT}));

	if (this.PARAMS.preventHide)
	{
		BX.bind(this.DIV, 'mouseout', BX.proxy(this.Hide, this));
		BX.bind(this.DIV, 'mouseover', BX.proxy(this.Show, this));
	}

	this.bInited = true;
};

/*************************** admin informer **********************************/
BX.adminInformer = {

	itemsShow: 3,

	Init: function (itemsShow)
	{
		if(itemsShow)
			BX.adminInformer.itemsShow = itemsShow;

		var informer = BX("admin-informer");

		if(informer)
		{
			document.body.appendChild(informer);
			BX.ZIndexManager.register(informer);
		}

		BX.addCustomEvent("onTopPanelCollapse", BX.proxy(BX.adminInformer.Close, BX.adminInformer));
	},

	Toggle: function(notifyBlock)
	{
		var informer = BX("admin-informer");

		if(!informer)
			return false;

		var pos = BX.pos(notifyBlock);

		informer.style.top = (parseInt(pos.top)+parseInt(pos.height)+7)+'px';
		informer.style.left = pos.left+'px';

		if(!BX.hasClass(informer, "adm-informer-active"))
			BX.adminInformer.Show(informer);
		else
			BX.adminInformer.Hide(informer);

		return false;
	},

	Close: function()
	{
		BX.adminInformer.Hide(BX("admin-informer"));
	},

	OnInnerClick: function(event)
	{
		var target = event.target || event.srcElement;

		if(target.nodeName.toLowerCase() != 'a' || BX.hasClass(target,"adm-informer-footer"))
		{
			return BX.PreventDefault(event);
		}

		return true;
	},

	ToggleExtra : function()
	{
		var footerLink = BX("adm-informer-footer");

		if (BX.hasClass(footerLink, "adm-informer-footer-collapsed"))
			this.ShowAll();
		else
			this.HideExtra();

		return false;
	},

	ShowAll: function()
	{
		var informer = BX("admin-informer");
		for(var i=0; i<informer.children.length; i++)

			if(BX.hasClass(informer.children[i], "adm-informer-item") && informer.children[i].style.display == "none") {
				informer.children[i].style.display = "block";
			}

		var footerLink = BX("adm-informer-footer");

		if(footerLink.textContent !== undefined)
			footerLink.textContent = BX.message('JSADM_AI_HIDE_EXTRA');
		else
			footerLink.innerText = BX.message('JSADM_AI_HIDE_EXTRA');

		BX.removeClass(footerLink, "adm-informer-footer-collapsed");

		return false;
	},

	HideExtra: function()
	{
		var informer = BX("admin-informer");
		var hided = 0;

		for(var i=BX.adminInformer.itemsShow+1; i<informer.children.length; i++)
		{
			if (BX.hasClass(informer.children[i], "adm-informer-item") && informer.children[i].style.display == "block") {
				informer.children[i].style.display = "none";
				hided++;
			}
		}

		var footerLink = BX("adm-informer-footer");

		var linkText = BX.message('JSADM_AI_ALL_NOTIF')+" ("+(BX.adminInformer.itemsShow+parseInt(hided))+")";

		if(footerLink.textContent !== undefined)
			footerLink.textContent = linkText;
		else
			footerLink.innerText = linkText;

		BX.addClass(footerLink, "adm-informer-footer-collapsed");

		return false;
	},

	Show: function(informer)
	{
		var notifButton = BX("adm-header-notif-block");
		if (notifButton)
			BX.addClass(notifButton, "adm-header-notif-block-active");

		BX.onCustomEvent(informer, 'onBeforeAdminInformerShow');
		setTimeout(
			BX.proxy(function() {
					BX.bind(document, "click", BX.proxy(BX.adminInformer.Close, BX.adminInformer));
				},
				BX.adminInformer
			),0
		);
		BX.addClass(informer, "adm-informer-active");

		BX.ZIndexManager.bringToFront(informer);

		setTimeout(function() {BX.addClass(informer, "adm-informer-animate");},0);
	},

	Hide: function(informer)
	{
		var notifButton = BX("adm-header-notif-block");
		if (notifButton)
			BX.removeClass(notifButton, "adm-header-notif-block-active");

		BX.unbind(document, "click", BX.proxy(BX.adminInformer.Close, BX.adminInformer));

		BX.removeClass(informer, "adm-informer-animate");

		if (this.IsAnimationSupported())
			setTimeout(function() {BX.removeClass(informer, "adm-informer-active");}, 300);
		else
			BX.removeClass(informer, "adm-informer-active");

		BX.onCustomEvent(informer, 'onAdminInformerHide');
		//setTimeout(function() {BX.adminInformer.HideExtra();},500);
	},

	IsAnimationSupported : function()
	{
		var d = document.body || document.documentElement;
		if (typeof(d.style.transition) == "string")
			return true;
		else if (typeof(d.style.MozTransition) == "string")
			return true;
		else if (typeof(d.style.OTransition) == "string")
			return true;
		else if (typeof(d.style.WebkitTransition) == "string")
			return true;
		else if (typeof(d.style.msTransition) == "string")
			return true;

		return false;
	},


	SetItemHtml: function(itemIdx, html)
	{
		var itemHtmlDiv = BX("adm-informer-item-html-"+itemIdx);

		if(!itemHtmlDiv)
			return false;

		itemHtmlDiv.innerHTML = html;

		return true;
	},

	SetItemFooter: function(itemIdx, html)
	{
		var itemFooterDiv = BX("adm-informer-item-footer-"+itemIdx);

		if(!itemFooterDiv)
			return false;

		itemFooterDiv.innerHTML = html;

		if(html)
			itemFooterDiv.style.display = "block";
		else
			itemFooterDiv.style.display = "none";

		return true;
	}

};

})(window);


/* End */
;
; /* Start:"a:4:{s:4:"full";s:49:"/bitrix/js/main/date/main.date.js?164242071034530";s:6:"source";s:33:"/bitrix/js/main/date/main.date.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
;(function(window)
{
	/****************** ATTENTION *******************************
	 * Please do not use Bitrix CoreJS in this class.
	 * This class can be called on page without Bitrix Framework
	*************************************************************/

	if (!window.BX)
	{
		window.BX = {};
	}

	if (!window.BX.Main)
	{
		window.BX.Main = {};
	}
	else if (window.BX.Main.Date)
	{
		return;
	}

	var BX = window.BX;

	BX.Main.Date = {

		AM_PM_MODE: {
			UPPER: 1,
			LOWER: 2,
			NONE: false
		},

		format: function(format, timestamp, now, utc)
		{
			var _this = this;

			/*
			PHP to Javascript:
				time() = new Date()
				mktime(...) = new Date(...)
				gmmktime(...) = new Date(Date.UTC(...))
				mktime(0,0,0, 1, 1, 1970) != 0          new Date(1970,0,1).getTime() != 0
				gmmktime(0,0,0, 1, 1, 1970) == 0        new Date(Date.UTC(1970,0,1)).getTime() == 0
				date("d.m.Y H:i:s") = BX.Main.Date.format("d.m.Y H:i:s")
				gmdate("d.m.Y H:i:s") = BX.Main.Date.format("d.m.Y H:i:s", null, null, true);
			*/
			var date = Utils.isDate(timestamp) ? new Date(timestamp.getTime()) : Utils.isNumber(timestamp) ? new Date(timestamp * 1000) : new Date();
			var nowDate = Utils.isDate(now) ? new Date(now.getTime()) : Utils.isNumber(now) ? new Date(now * 1000) : new Date();
			var isUTC = !!utc;

			if (Utils.isArray(format))
				return _formatDateInterval(format, date, nowDate, isUTC);
			else if (!Utils.isNotEmptyString(format))
				return "";

			var replaceMap = (format.match(/{{([^{}]*)}}/g) || []).map(function(x) { return (x.match(/[^{}]+/) || [''])[0]; });
			if (replaceMap.length > 0)
			{
				replaceMap.forEach(function(element, index) {
					format = format.replace("{{"+element+"}}", "{{"+index+"}}");
				});
			}

			var formatRegex = /\\?(sago|iago|isago|Hago|dago|mago|Yago|sdiff|idiff|Hdiff|ddiff|mdiff|Ydiff|sshort|ishort|Hshort|dshort|mhort|Yshort|yesterday|today|tommorow|tomorrow|[a-z])/gi;

			var dateFormats = {
				d : function() {
					// Day of the month 01 to 31
					return Utils.strPadLeft(getDate(date).toString(), 2, "0");
				},

				D : function() {
					//Mon through Sun
					return _this._getMessage("DOW_" + getDay(date));
				},

				j : function() {
					//Day of the month 1 to 31
					return getDate(date);
				},

				l : function() {
					//Sunday through Saturday
					return _this._getMessage("DAY_OF_WEEK_" + getDay(date));
				},

				N : function() {
					//1 (for Monday) through 7 (for Sunday)
					return getDay(date) || 7;
				},

				S : function() {
					//st, nd, rd or th. Works well with j
					if (getDate(date) % 10 == 1 && getDate(date) != 11)
						return "st";
					else if (getDate(date) % 10 == 2 && getDate(date) != 12)
						return "nd";
					else if (getDate(date) % 10 == 3 && getDate(date) != 13)
						return "rd";
					else
						return "th";
				},

				w : function() {
					//0 (for Sunday) through 6 (for Saturday)
					return getDay(date);
				},

				z : function() {
					//0 through 365
					var firstDay = new Date(getFullYear(date), 0, 1);
					var currentDay = new Date(getFullYear(date), getMonth(date), getDate(date));
					return Math.ceil( (currentDay - firstDay) / (24 * 3600 * 1000) );
				},

				W : function() {
					//ISO-8601 week number of year
					var newDate  = new Date(date.getTime());
					var dayNumber   = (getDay(date) + 6) % 7;
					setDate(newDate, getDate(newDate) - dayNumber + 3);
					var firstThursday = newDate.getTime();
					setMonth(newDate, 0, 1);
					if (getDay(newDate) != 4)
						setMonth(newDate, 0, 1 + ((4 - getDay(newDate)) + 7) % 7);
					var weekNumber = 1 + Math.ceil((firstThursday - newDate) / (7 * 24 * 3600 * 1000));
					return Utils.strPadLeft(weekNumber.toString(), 2, "0");
				},

				F : function() {
					//January through December
					return _this._getMessage("MONTH_" + (getMonth(date) + 1) + "_S");
				},

				f : function() {
					//January through December
					return _this._getMessage("MONTH_" + (getMonth(date) + 1));
				},

				m : function() {
					//Numeric representation of a month 01 through 12
					return Utils.strPadLeft((getMonth(date) + 1).toString(), 2, "0");
				},

				M : function() {
					//A short textual representation of a month, three letters Jan through Dec
					return _this._getMessage("MON_" + (getMonth(date) + 1));
				},

				n : function() {
					//Numeric representation of a month 1 through 12
					return getMonth(date) + 1;
				},

				t : function() {
					//Number of days in the given month 28 through 31
					var lastMonthDay = isUTC ? new Date(Date.UTC(getFullYear(date), getMonth(date) + 1, 0)) : new Date(getFullYear(date), getMonth(date) + 1, 0);
					return getDate(lastMonthDay);
				},

				L : function() {
					//1 if it is a leap year, 0 otherwise.
					var year = getFullYear(date);
					return (year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 1 : 0);
				},

				o : function() {
					//ISO-8601 year number
					var correctDate  = new Date(date.getTime());
					setDate(correctDate, getDate(correctDate) - ((getDay(date) + 6) % 7) + 3);
					return getFullYear(correctDate);
				},

				Y : function() {
					//A full numeric representation of a year, 4 digits
					return getFullYear(date);
				},

				y : function() {
					//A two digit representation of a year
					return getFullYear(date).toString().slice(2);
				},

				a : function() {
					//am or pm
					return getHours(date) > 11 ? "pm" : "am";
				},

				A : function() {
					//AM or PM
					return getHours(date) > 11 ? "PM" : "AM";
				},

				B : function() {
					//000 through 999
					var swatch = ((date.getUTCHours() + 1) % 24) + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
					return Utils.strPadLeft(Math.floor(swatch * 1000 / 24).toString(), 3, "0");
				},

				g : function() {
					//12-hour format of an hour without leading zeros 1 through 12
					return getHours(date) % 12 || 12;
				},

				G : function() {
					//24-hour format of an hour without leading zeros 0 through 23
					return getHours(date);
				},

				h : function() {
					//12-hour format of an hour with leading zeros 01 through 12
					return Utils.strPadLeft((getHours(date) % 12 || 12).toString(), 2, "0");
				},

				H : function() {
					//24-hour format of an hour with leading zeros 00 through 23
					return Utils.strPadLeft(getHours(date).toString(), 2, "0");
				},

				i : function() {
					//Minutes with leading zeros 00 to 59
					return Utils.strPadLeft(getMinutes(date).toString(), 2, "0");
				},

				s : function() {
					//Seconds, with leading zeros 00 through 59
					return Utils.strPadLeft(getSeconds(date).toString(), 2, "0");
				},

				u : function() {
					//Microseconds
					return Utils.strPadLeft((getMilliseconds(date) * 1000).toString(), 6, "0");
				},

				e : function() {
					if (isUTC)
						return "UTC";
					return "";
				},

				I : function() {
					if (isUTC)
						return 0;

					//Whether or not the date is in daylight saving time 1 if Daylight Saving Time, 0 otherwise
					var firstJanuary = new Date(getFullYear(date), 0, 1);
					var firstJanuaryUTC = Date.UTC(getFullYear(date), 0, 1);
					var firstJuly = new Date(getFullYear(date), 6, 0);
					var firstJulyUTC = Date.UTC(getFullYear(date), 6, 0);
					return 0 + ((firstJanuary - firstJanuaryUTC) !== (firstJuly - firstJulyUTC));
				},

				O : function() {
					if (isUTC)
						return "+0000";

					//Difference to Greenwich time (GMT) in hours +0200
					var timezoneOffset = date.getTimezoneOffset();
					var timezoneOffsetAbs = Math.abs(timezoneOffset);
					return (timezoneOffset > 0 ? "-" : "+") + Utils.strPadLeft((Math.floor(timezoneOffsetAbs / 60) * 100 + timezoneOffsetAbs % 60).toString(), 4, "0");
				},

				P : function() {
					if (isUTC)
						return "+00:00";

					//Difference to Greenwich time (GMT) with colon between hours and minutes +02:00
					var difference = this.O();
					return difference.substr(0, 3) + ":" + difference.substr(3);
				},

				Z : function() {
					if (isUTC)
						return 0;
					//Timezone offset in seconds. The offset for timezones west of UTC is always negative,
					//and for those east of UTC is always positive.
					return -date.getTimezoneOffset() * 60;
				},

				c : function() {
					//ISO 8601 date
					return "Y-m-d\\TH:i:sP".replace(formatRegex, _replaceDateFormat);
				},

				r : function() {
					//RFC 2822 formatted date
					return "D, d M Y H:i:s O".replace(formatRegex, _replaceDateFormat);
				},

				U : function() {
					//Seconds since the Unix Epoch
					return Math.floor(date.getTime() / 1000);
				},

				sago : function() {
					return _formatDateMessage(intval((nowDate - date) / 1000), {
						"0" : "FD_SECOND_AGO_0",
						"1" : "FD_SECOND_AGO_1",
						"10_20" : "FD_SECOND_AGO_10_20",
						"MOD_1" : "FD_SECOND_AGO_MOD_1",
						"MOD_2_4" : "FD_SECOND_AGO_MOD_2_4",
						"MOD_OTHER" : "FD_SECOND_AGO_MOD_OTHER"
					});
				},

				sdiff : function() {
					return _formatDateMessage(intval((nowDate - date) / 1000), {
						"0" : "FD_SECOND_DIFF_0",
						"1" : "FD_SECOND_DIFF_1",
						"10_20" : "FD_SECOND_DIFF_10_20",
						"MOD_1" : "FD_SECOND_DIFF_MOD_1",
						"MOD_2_4" : "FD_SECOND_DIFF_MOD_2_4",
						"MOD_OTHER" : "FD_SECOND_DIFF_MOD_OTHER"
					});
				},

				sshort : function() {
					return _this._getMessage("FD_SECOND_SHORT").replace(/#VALUE#/g, intval((nowDate - date) / 1000));
				},

				iago : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 1000), {
						"0" : "FD_MINUTE_AGO_0",
						"1" : "FD_MINUTE_AGO_1",
						"10_20" : "FD_MINUTE_AGO_10_20",
						"MOD_1" : "FD_MINUTE_AGO_MOD_1",
						"MOD_2_4" : "FD_MINUTE_AGO_MOD_2_4",
						"MOD_OTHER" : "FD_MINUTE_AGO_MOD_OTHER"
					});
				},

				idiff : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 1000), {
						"0" : "FD_MINUTE_DIFF_0",
						"1" : "FD_MINUTE_DIFF_1",
						"10_20" : "FD_MINUTE_DIFF_10_20",
						"MOD_1" : "FD_MINUTE_DIFF_MOD_1",
						"MOD_2_4" : "FD_MINUTE_DIFF_MOD_2_4",
						"MOD_OTHER" : "FD_MINUTE_DIFF_MOD_OTHER"
					});
				},

				isago : function() {
					var minutesAgo = intval((nowDate - date) / 60 / 1000);
					var result = _formatDateMessage(minutesAgo, {
						"0" : "FD_MINUTE_0",
						"1" : "FD_MINUTE_1",
						"10_20" : "FD_MINUTE_10_20",
						"MOD_1" : "FD_MINUTE_MOD_1",
						"MOD_2_4" : "FD_MINUTE_MOD_2_4",
						"MOD_OTHER" : "FD_MINUTE_MOD_OTHER"
					});

					result += " ";

					var secondsAgo = intval((nowDate - date) / 1000) - (minutesAgo * 60);
					result += _formatDateMessage(secondsAgo, {
						"0" : "FD_SECOND_AGO_0",
						"1" : "FD_SECOND_AGO_1",
						"10_20" : "FD_SECOND_AGO_10_20",
						"MOD_1" : "FD_SECOND_AGO_MOD_1",
						"MOD_2_4" : "FD_SECOND_AGO_MOD_2_4",
						"MOD_OTHER" : "FD_SECOND_AGO_MOD_OTHER"
					});
					return result;
				},

				ishort : function() {
					return _this._getMessage("FD_MINUTE_SHORT").replace(/#VALUE#/g, intval((nowDate - date) / 60 / 1000));
				},

				Hago : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 60 / 1000), {
						"0" : "FD_HOUR_AGO_0",
						"1" : "FD_HOUR_AGO_1",
						"10_20" : "FD_HOUR_AGO_10_20",
						"MOD_1" : "FD_HOUR_AGO_MOD_1",
						"MOD_2_4" : "FD_HOUR_AGO_MOD_2_4",
						"MOD_OTHER" : "FD_HOUR_AGO_MOD_OTHER"
					});
				},

				Hdiff : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 60 / 1000), {
						"0" : "FD_HOUR_DIFF_0",
						"1" : "FD_HOUR_DIFF_1",
						"10_20" : "FD_HOUR_DIFF_10_20",
						"MOD_1" : "FD_HOUR_DIFF_MOD_1",
						"MOD_2_4" : "FD_HOUR_DIFF_MOD_2_4",
						"MOD_OTHER" : "FD_HOUR_DIFF_MOD_OTHER"
					});
				},

				Hshort : function() {
					return _this._getMessage("FD_HOUR_SHORT").replace(/#VALUE#/g, intval((nowDate - date) / 60 / 60 / 1000));
				},

				yesterday : function() {
					return _this._getMessage("FD_YESTERDAY");
				},

				today : function() {
					return _this._getMessage("FD_TODAY");
				},

				tommorow : function() {
					return _this._getMessage("FD_TOMORROW");
				},

				tomorrow : function() {
					return _this._getMessage("FD_TOMORROW");
				},

				dago : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 60 / 24 / 1000), {
						"0" : "FD_DAY_AGO_0",
						"1" : "FD_DAY_AGO_1",
						"10_20" : "FD_DAY_AGO_10_20",
						"MOD_1" : "FD_DAY_AGO_MOD_1",
						"MOD_2_4" : "FD_DAY_AGO_MOD_2_4",
						"MOD_OTHER" : "FD_DAY_AGO_MOD_OTHER"
					});
				},

				ddiff : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 60 / 24 / 1000), {
						"0" : "FD_DAY_DIFF_0",
						"1" : "FD_DAY_DIFF_1",
						"10_20" : "FD_DAY_DIFF_10_20",
						"MOD_1" : "FD_DAY_DIFF_MOD_1",
						"MOD_2_4" : "FD_DAY_DIFF_MOD_2_4",
						"MOD_OTHER" : "FD_DAY_DIFF_MOD_OTHER"
					});
				},

				dshort : function() {
					return _this._getMessage("FD_DAY_SHORT").replace(/#VALUE#/g, intval((nowDate - date) / 60 / 60 / 24 / 1000));
				},

				mago : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 60 / 24 / 31 / 1000), {
						"0" : "FD_MONTH_AGO_0",
						"1" : "FD_MONTH_AGO_1",
						"10_20" : "FD_MONTH_AGO_10_20",
						"MOD_1" : "FD_MONTH_AGO_MOD_1",
						"MOD_2_4" : "FD_MONTH_AGO_MOD_2_4",
						"MOD_OTHER" : "FD_MONTH_AGO_MOD_OTHER"
					});
				},

				mdiff : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 60 / 24 / 31 / 1000), {
						"0" : "FD_MONTH_DIFF_0",
						"1" : "FD_MONTH_DIFF_1",
						"10_20" : "FD_MONTH_DIFF_10_20",
						"MOD_1" : "FD_MONTH_DIFF_MOD_1",
						"MOD_2_4" : "FD_MONTH_DIFF_MOD_2_4",
						"MOD_OTHER" : "FD_MONTH_DIFF_MOD_OTHER"
					});
				},

				mshort : function() {
					return _this._getMessage("FD_MONTH_SHORT").replace(/#VALUE#/g, intval((nowDate - date) / 60 / 60 / 24 / 31 / 1000));
				},

				Yago : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 60 / 24 / 365 / 1000), {
						"0" : "FD_YEARS_AGO_0",
						"1" : "FD_YEARS_AGO_1",
						"10_20" : "FD_YEARS_AGO_10_20",
						"MOD_1" : "FD_YEARS_AGO_MOD_1",
						"MOD_2_4" : "FD_YEARS_AGO_MOD_2_4",
						"MOD_OTHER" : "FD_YEARS_AGO_MOD_OTHER"
					});
				},

				Ydiff : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 60 / 24 / 365 / 1000), {
						"0" : "FD_YEARS_DIFF_0",
						"1" : "FD_YEARS_DIFF_1",
						"10_20" : "FD_YEARS_DIFF_10_20",
						"MOD_1" : "FD_YEARS_DIFF_MOD_1",
						"MOD_2_4" : "FD_YEARS_DIFF_MOD_2_4",
						"MOD_OTHER" : "FD_YEARS_DIFF_MOD_OTHER"
					});
				},

				Yshort : function() {
					return _formatDateMessage(intval((nowDate - date) / 60 / 60 / 24 / 365 / 1000), {
						"0" : "FD_YEARS_SHORT_0",
						"1" : "FD_YEARS_SHORT_1",
						"10_20" : "FD_YEARS_SHORT_10_20",
						"MOD_1" : "FD_YEARS_SHORT_MOD_1",
						"MOD_2_4" : "FD_YEARS_SHORT_MOD_2_4",
						"MOD_OTHER" : "FD_YEARS_SHORT_MOD_OTHER"
					});
				},

				x : function() {
					var ampm = _this.isAmPmMode(true);
					var timeFormat = (ampm === _this.AM_PM_MODE.LOWER? "g:i a" : (ampm === _this.AM_PM_MODE.UPPER? "g:i A" : "H:i"));

					return _this.format([
						["tomorrow", "tomorrow, "+timeFormat],
						["-", _this.convertBitrixFormat(_this._getMessage("FORMAT_DATETIME")).replace(/:s/g, "")],
						["s", "sago"],
						["i", "iago"],
						["today", "today, "+timeFormat],
						["yesterday", "yesterday, "+timeFormat],
						["", _this.convertBitrixFormat(_this._getMessage("FORMAT_DATETIME")).replace(/:s/g, "")]
					], date, nowDate, isUTC);
				},

				X : function() {

					var ampm = _this.isAmPmMode(true);
					var timeFormat = (ampm === _this.AM_PM_MODE.LOWER? "g:i a" : (ampm === _this.AM_PM_MODE.UPPER? "g:i A" : "H:i"));

					var day = _this.format([
						["tomorrow", "tomorrow"],
						["-", _this.convertBitrixFormat(_this._getMessage("FORMAT_DATE"))],
						["today", "today"],
						["yesterday", "yesterday"],
						["", _this.convertBitrixFormat(_this._getMessage("FORMAT_DATE"))]
					], date, nowDate, isUTC);

					var time = _this.format([
						["tomorrow", timeFormat],
						["today", timeFormat],
						["yesterday", timeFormat],
						["", ""]
					], date, nowDate, isUTC);

					if (time.length > 0)
						return _this._getMessage("FD_DAY_AT_TIME").replace(/#DAY#/g, day).replace(/#TIME#/g, time);
					else
						return day;
				},

				Q : function() {
					var daysAgo = intval((nowDate - date) / 60 / 60 / 24 / 1000);
					if(daysAgo == 0)
						return _this._getMessage("FD_DAY_DIFF_1").replace(/#VALUE#/g, 1);
					else
						return _this.format([ ["d", "ddiff"], ["m", "mdiff"], ["", "Ydiff"] ], date, nowDate);
				}
			};

			var cutZeroTime = false;
			if (format[0] && format[0] == "^")
			{
				cutZeroTime = true;
				format = format.substr(1);
			}

			var result = format.replace(formatRegex, _replaceDateFormat);

			if (cutZeroTime)
			{
				/* 	15.04.12 13:00:00 => 15.04.12 13:00
					00:01:00 => 00:01
					4 may 00:00:00 => 4 may
					01-01-12 00:00 => 01-01-12
				*/

				result = result.replace(/\s*00:00:00\s*/g, "").
								replace(/(\d\d:\d\d)(:00)/g, "$1").
								replace(/(\s*00:00\s*)(?!:)/g, "");
			}

			if (replaceMap.length > 0)
			{
				replaceMap.forEach(function(element, index) {
					result = result.replace("{{"+index+"}}", element);
				});
			}

			return result;

			function _formatDateInterval(formats, date, nowDate, isUTC)
			{
				var secondsAgo = intval((nowDate - date) / 1000);
				for (var i = 0; i < formats.length; i++)
				{
					var formatInterval = formats[i][0];
					var formatValue = formats[i][1];
					var match = null;
					if (formatInterval == "s")
					{
						if (secondsAgo < 60)
							return _this.format(formatValue, date, nowDate, isUTC);
					}
					else if ((match = /^s(\d+)\>?(\d+)?/.exec(formatInterval)) != null)
					{
						if (match[1] && match[2])
						{
							if (
								secondsAgo < match[1]
								&& secondsAgo > match[2]
							)
							{
								return _this.format(formatValue, date, nowDate, isUTC);
							}
						}
						else if (secondsAgo < match[1])
						{
							return _this.format(formatValue, date, nowDate, isUTC);
						}
					}
					else if (formatInterval == "i")
					{
						if (secondsAgo < 60 * 60)
							return _this.format(formatValue, date, nowDate, isUTC);
					}
					else if ((match = /^i(\d+)\>?(\d+)?/.exec(formatInterval)) != null)
					{
						if (match[1] && match[2])
						{
							if (
								secondsAgo < match[1] * 60
								&& secondsAgo > match[2] * 60
							)
							{
								return _this.format(formatValue, date, nowDate, isUTC);
							}
						}
						else if (secondsAgo < match[1] * 60)
						{
							return _this.format(formatValue, date, nowDate, isUTC);
						}
					}
					else if (formatInterval == "H")
					{
						if (secondsAgo < 24 * 60 * 60)
							return _this.format(formatValue, date, nowDate, isUTC);
					}
					else if ((match = /^H(\d+)\>?(\d+)?/.exec(formatInterval)) != null)
					{
						if (match[1] && match[2])
						{
							if (
								secondsAgo < match[1] * 60 * 60
								&& secondsAgo > match[2] * 60 * 60
							)
							{
								return _this.format(formatValue, date, nowDate, isUTC);
							}
						}
						else if (secondsAgo < match[1] * 60 * 60)
						{
							return _this.format(formatValue, date, nowDate, isUTC);
						}
					}
					else if (formatInterval == "d")
					{
						if (secondsAgo < 31 *24 * 60 * 60)
							return _this.format(formatValue, date, nowDate, isUTC);
					}
					else if ((match = /^d(\d+)\>?(\d+)?/.exec(formatInterval)) != null)
					{
						if (match[1] && match[2])
						{
							if (
								secondsAgo < match[1] * 24 * 60 * 60
								&& secondsAgo > match[2] * 24 * 60 * 60
							)
							{
								return _this.format(formatValue, date, nowDate, isUTC);
							}
						}
						else if (secondsAgo < match[1] * 24 * 60 * 60)
						{
							return _this.format(formatValue, date, nowDate, isUTC);
						}
					}
					else if (formatInterval == "m")
					{
						if (secondsAgo < 365 * 24 * 60 * 60)
							return _this.format(formatValue, date, nowDate, isUTC);
					}
					else if ((match = /^m(\d+)\>?(\d+)?/.exec(formatInterval)) != null)
					{
						if (match[1] && match[2])
						{
							if (
								secondsAgo < match[1] * 31 * 24 * 60 * 60
								&& secondsAgo > match[2] * 31 * 24 * 60 * 60
							)
							{
								return _this.format(formatValue, date, nowDate, isUTC);
							}
						}
						else if (secondsAgo < match[1] * 31 * 24 * 60 * 60)
						{
							return _this.format(formatValue, date, nowDate, isUTC);
						}
					}
					else if (formatInterval == "now")
					{
						if (date.getTime() == nowDate.getTime())
						{
							return _this.format(formatValue, date, nowDate, isUTC);
						}
					}
					else if (formatInterval == "today")
					{
						var year = getFullYear(nowDate), month = getMonth(nowDate), day = getDate(nowDate);
						var todayStart = isUTC ? new Date(Date.UTC(year, month, day, 0, 0, 0, 0)) : new Date(year, month, day, 0, 0, 0, 0);
						var todayEnd = isUTC ? new Date(Date.UTC(year, month, day+1, 0, 0, 0, 0)) : new Date(year, month, day+1, 0, 0, 0, 0);
						if (date >= todayStart && date < todayEnd)
							return _this.format(formatValue, date, nowDate, isUTC);
					}
					else if (formatInterval == "todayFuture")
					{
						var year = getFullYear(nowDate), month = getMonth(nowDate), day = getDate(nowDate);
						var todayStart = nowDate.getTime();
						var todayEnd = isUTC ? new Date(Date.UTC(year, month, day+1, 0, 0, 0, 0)) : new Date(year, month, day+1, 0, 0, 0, 0);
						if (date >= todayStart && date < todayEnd)
							return _this.format(formatValue, date, nowDate, isUTC);
					}
					else if (formatInterval == "yesterday")
					{
						year = getFullYear(nowDate); month = getMonth(nowDate); day = getDate(nowDate);
						var yesterdayStart = isUTC ? new Date(Date.UTC(year, month, day-1, 0, 0, 0, 0)) : new Date(year, month, day-1, 0, 0, 0, 0);
						var yesterdayEnd = isUTC ? new Date(Date.UTC(year, month, day, 0, 0, 0, 0)) : new Date(year, month, day, 0, 0, 0, 0);
						if (date >= yesterdayStart && date < yesterdayEnd)
							return _this.format(formatValue, date, nowDate, isUTC);
					}
					else if (formatInterval == "tommorow" || formatInterval == "tomorrow")
					{
						year = getFullYear(nowDate); month = getMonth(nowDate); day = getDate(nowDate);
						var tomorrowStart = isUTC ? new Date(Date.UTC(year, month, day+1, 0, 0, 0, 0)) : new Date(year, month, day+1, 0, 0, 0, 0);
						var tomorrowEnd = isUTC ? new Date(Date.UTC(year, month, day+2, 0, 0, 0, 0)) : new Date(year, month, day+2, 0, 0, 0, 0);
						if (date >= tomorrowStart && date < tomorrowEnd)
							return _this.format(formatValue, date, nowDate, isUTC);
					}
					else if (formatInterval == "-")
					{
						if (secondsAgo < 0)
							return _this.format(formatValue, date, nowDate, isUTC);
					}
				}

				//return formats.length > 0 ? _this.format(formats.pop()[1], date, nowDate, isUTC) : "";
				return formats.length > 0 ? _this.format(formats[formats.length - 1][1], date, nowDate, isUTC) : "";
			}

			function getFullYear(date) { return isUTC ? date.getUTCFullYear() : date.getFullYear(); }
			function getDate(date) { return isUTC ? date.getUTCDate() : date.getDate(); }
			function getMonth(date) { return isUTC ? date.getUTCMonth() : date.getMonth(); }
			function getHours(date) { return isUTC ? date.getUTCHours() : date.getHours(); }
			function getMinutes(date) { return isUTC ? date.getUTCMinutes() : date.getMinutes(); }
			function getSeconds(date) { return isUTC ? date.getUTCSeconds() : date.getSeconds(); }
			function getMilliseconds(date) { return isUTC ? date.getUTCMilliseconds() : date.getMilliseconds(); }
			function getDay(date) { return isUTC ? date.getUTCDay() : date.getDay(); }
			function setDate(date, dayValue) { return isUTC ? date.setUTCDate(dayValue) : date.setDate(dayValue); }
			function setMonth(date, monthValue, dayValue) { return isUTC ? date.setUTCMonth(monthValue, dayValue) : date.setMonth(monthValue, dayValue); }

			function _formatDateMessage(value, messages)
			{
				var val = value < 100 ? Math.abs(value) : Math.abs(value % 100);
				var dec = val % 10;
				var message = "";

				if(val == 0)
					message = _this._getMessage(messages["0"]);
				else if (val == 1)
					message = _this._getMessage(messages["1"]);
				else if (val >= 10 && val <= 20)
					message = _this._getMessage(messages["10_20"]);
				else if (dec == 1)
					message = _this._getMessage(messages["MOD_1"]);
				else if (2 <= dec && dec <= 4)
					message = _this._getMessage(messages["MOD_2_4"]);
				else
					message = _this._getMessage(messages["MOD_OTHER"]);

				return message.replace(/#VALUE#/g, value);
			}

			function _replaceDateFormat(match, matchFull)
			{
				if (dateFormats[match])
					return dateFormats[match]();
				else
					return matchFull;
			}

			function intval(number)
			{
				return number >= 0 ? Math.floor(number) : Math.ceil(number);
			}
		},

		convertBitrixFormat: function(format)
		{
			if (!Utils.isNotEmptyString(format))
				return "";

			return format.replace("YYYY", "Y")	// 1999
						 .replace("MMMM", "F")	// January - December
						 .replace("MM", "m")	// 01 - 12
						 .replace("M", "M")	// Jan - Dec
						 .replace("DD", "d")	// 01 - 31
						 .replace("G", "g")	//  1 - 12
						 .replace(/GG/i, "G")	//  0 - 23
						 .replace("H", "h")	// 01 - 12
						 .replace(/HH/i, "H")	// 00 - 24
						 .replace("MI", "i")	// 00 - 59
						 .replace("SS", "s")	// 00 - 59
						 .replace("TT", "A")	// AM - PM
						 .replace("T", "a");	// am - pm
		},

		convertToUTC: function(date)
		{
			if (!Utils.isDate(date))
				return null;

			return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
		},

		/**
		 * Function creates and returns Javascript Date() object from server timestamp regardless of local browser (system) timezone.
		 * For example can be used to convert timestamp from some exact date on server to the JS Date object with the same value.
		 *
		 * @param timestamp - timestamp in seconds
		 * @returns {Date}
		 */
		getNewDate: function(timestamp)
		{
			return new Date(this.getBrowserTimestamp(timestamp));
		},

		/**
		 * Function transforms server timestamp (in sec) to javascript timestamp (calculated depend on local browser timezone offset). Returns timestamp in milliseconds.
		 * Also see BX.Main.Date.getNewDate description.
		 *
		 * @param timestamp - timestamp in seconds
		 * @returns {number}
		 */
		getBrowserTimestamp: function(timestamp)
		{
			timestamp = parseInt(timestamp, 10);
			var browserOffset = new Date(timestamp * 1000).getTimezoneOffset() * 60;
			return (parseInt(timestamp, 10) + parseInt(this._getMessage('SERVER_TZ_OFFSET')) + browserOffset) * 1000;
		},

		/**
		 * Function transforms local browser timestamp (in ms) to server timestamp (calculated depend on local browser timezone offset). Returns timestamp in seconds.
		 *
		 * @param timestamp - timestamp in milliseconds
		 * @returns {number}
		 */
		getServerTimestamp: function(timestamp)
		{
			timestamp = parseInt(timestamp, 10);
			var browserOffset = new Date(timestamp).getTimezoneOffset() * 60;
			return Math.round(timestamp / 1000 - (parseInt(this._getMessage('SERVER_TZ_OFFSET'), 10) + parseInt(browserOffset, 10)));
		},

		formatLastActivityDate: function(timestamp, now, utc)
		{
			var ampm = this.isAmPmMode(true);
			var timeFormat = (ampm === this.AM_PM_MODE.LOWER? "g:i a" : (ampm === this.AM_PM_MODE.UPPER? "g:i A" : "H:i"));

			var format = [
			   ["tomorrow", "#01#"+timeFormat],
			   ["now" , "#02#"],
			   ["todayFuture", "#03#"+timeFormat],
			   ["yesterday", "#04#"+timeFormat],
			   ["-", this.convertBitrixFormat(this._getMessage("FORMAT_DATETIME")).replace(/:s/g, "")],
			   ["s60", "sago"],
			   ["i60", "iago"],
			   ["H5", "Hago"],
			   ["H24", "#03#"+timeFormat],
			   ["d31", "dago"],
			   ["m12>1", "mago"],
			   ["m12>0", "dago"],
			   ["", "#05#"]
			];
			var formattedDate = this.format(format, timestamp, now, utc);
			var match = null;
			if ((match = /^#(\d+)#(.*)/.exec(formattedDate)) != null)
			{
				switch (match[1])
				{
					case "01":
						formattedDate = this._getMessage('FD_LAST_SEEN_TOMORROW').replace("#TIME#", match[2]);
					break;
					case "02":
						formattedDate = this._getMessage('FD_LAST_SEEN_NOW');
					break;
					case "03":
						formattedDate = this._getMessage('FD_LAST_SEEN_TODAY').replace("#TIME#", match[2]);
					break;
					case "04":
						formattedDate = this._getMessage('FD_LAST_SEEN_YESTERDAY').replace("#TIME#", match[2]);
					break;
					case "05":
						formattedDate = this._getMessage('FD_LAST_SEEN_MORE_YEAR');
					break;
					default:
						formattedDate = match[2];
					break;
				}
			}

			return formattedDate;
		},

		isAmPmMode: function(returnConst)
		{
			if (returnConst === true)
			{
				return this._getMessage('AMPM_MODE');
			}

			return this._getMessage('AMPM_MODE') !== false;
		},

		/**
		 * The method is designed to replace the localization storage on sites without Bitrix Framework.
		 *
		 * @param message
		 * @returns {*}
		 * @private
		 */
		_getMessage: function(message)
		{
			return BX.message(message);
		},

		/**
		 * The method used to parse date from string by given format.
		 *
		 * @param {string} str - date in given format
		 * @param {boolean} isUTC - is date in UTC
		 * @param {string} formatDate - format of the date without time
		 * @param {string} formatDatetime - format of the date with time
		 * @returns {Date|null} - returns Date object if string was parsed or null
		 */
		parse: function(str, isUTC, formatDate, formatDatetime)
		{
			if (Utils.isNotEmptyString(str))
			{
				if (!formatDate)
					formatDate = this._getMessage('FORMAT_DATE');
				if (!formatDatetime)
					formatDatetime = this._getMessage('FORMAT_DATETIME');

				var regMonths = '';
				for (i = 1; i <= 12; i++)
				{
					regMonths = regMonths + '|' + this._getMessage('MON_'+i);
				}

				var
					expr = new RegExp('([0-9]+|[a-z]+' + regMonths + ')', 'ig'),
					aDate = str.match(expr),
					aFormat = formatDate.match(/(DD|MI|MMMM|MM|M|YYYY)/ig),
					i, cnt,
					aDateArgs=[], aFormatArgs=[],
					aResult={};

				if (!aDate)
				{
					return null;
				}

				if(aDate.length > aFormat.length)
				{
					aFormat = formatDatetime.match(/(DD|MI|MMMM|MM|M|YYYY|HH|H|SS|TT|T|GG|G)/ig);
				}

				for(i = 0, cnt = aDate.length; i < cnt; i++)
				{
					if(aDate[i].trim() !== '')
					{
						aDateArgs[aDateArgs.length] = aDate[i];
					}
				}

				for(i = 0, cnt = aFormat.length; i < cnt; i++)
				{
					if(aFormat[i].trim() !== '')
					{
						aFormatArgs[aFormatArgs.length] = aFormat[i];
					}
				}

				var m = Utils.array_search('MMMM', aFormatArgs);
				if (m > 0)
				{
					aDateArgs[m] = this.getMonthIndex(aDateArgs[m]);
					aFormatArgs[m] = "MM";
				}
				else
				{
					m = Utils.array_search('M', aFormatArgs);
					if (m > 0)
					{
						aDateArgs[m] = this.getMonthIndex(aDateArgs[m]);
						aFormatArgs[m] = "MM";
					}
				}

				for(i = 0, cnt = aFormatArgs.length; i < cnt; i++)
				{
					var k = aFormatArgs[i].toUpperCase();
					aResult[k] = k === 'T' || k === 'TT' ? aDateArgs[i] : parseInt(aDateArgs[i], 10);
				}

				if(aResult['DD'] > 0 && aResult['MM'] > 0 && aResult['YYYY'] > 0)
				{
					var d = new Date();

					if(isUTC)
					{
						d.setUTCDate(1);
						d.setUTCFullYear(aResult['YYYY']);
						d.setUTCMonth(aResult['MM'] - 1);
						d.setUTCDate(aResult['DD']);
						d.setUTCHours(0, 0, 0, 0);
					}
					else
					{
						d.setDate(1);
						d.setFullYear(aResult['YYYY']);
						d.setMonth(aResult['MM'] - 1);
						d.setDate(aResult['DD']);
						d.setHours(0, 0, 0, 0);
					}

					if(
						(!isNaN(aResult['HH']) || !isNaN(aResult['GG']) || !isNaN(aResult['H']) || !isNaN(aResult['G']))
						&& !isNaN(aResult['MI'])
					)
					{
						if (!isNaN(aResult['H']) || !isNaN(aResult['G']))
						{
							var
								bPM = (aResult['T']||aResult['TT']||'am').toUpperCase() === 'PM',
								h = parseInt(aResult['H']||aResult['G']||0, 10);

							if(bPM)
							{
								aResult['HH'] = h + (h === 12 ? 0 : 12);
							}
							else
							{
								aResult['HH'] = h < 12 ? h : 0;
							}
						}
						else
						{
							aResult['HH'] = parseInt(aResult['HH']||aResult['GG']||0, 10);
						}

						if (isNaN(aResult['SS']))
							aResult['SS'] = 0;

						if(isUTC)
						{
							d.setUTCHours(aResult['HH'], aResult['MI'], aResult['SS']);
						}
						else
						{
							d.setHours(aResult['HH'], aResult['MI'], aResult['SS']);
						}
					}

					return d;
				}
			}

			return null;
		},

		getMonthIndex: function(month)
		{
			var
				i,
				q = month.toUpperCase(),
				wordMonthCut = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
				wordMonth = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

			for (i = 1; i <= 12; i++)
			{
				if (q === this._getMessage('MON_'+i).toUpperCase()
					|| q === this._getMessage('MONTH_'+i).toUpperCase()
					|| q === wordMonthCut[i-1].toUpperCase()
					|| q === wordMonth[i-1].toUpperCase())
				{
					return i;
				}
			}
			return month;
		}
	};

	/**
	 * @private
	 */
	var Utils = {
		isDate: function(item) {
			return item && Object.prototype.toString.call(item) == "[object Date]";
		},
		isNumber: function(item) {
			return item === 0 ? true : (item ? (typeof (item) == "number" || item instanceof Number) : false);
		},
		isArray: function(item) {
			return item && Object.prototype.toString.call(item) == "[object Array]";
		},
		isString: function(item) {
			return item === '' ? true : (item ? (typeof (item) == "string" || item instanceof String) : false);
		},
		isNotEmptyString: function(item) {
			return this.isString(item) ? item.length > 0 : false;
		},
		strPadLeft: function(input, padLength, padString)
		{
			var i = input.length, q=padString.length;
			if (i >= padLength) return input;

			for(;i<padLength;i+=q)
				input = padString + input;

			return input;
		},
		/**
		 * @deprecated
		 * @use myArr.findIndex(item => item === needle);
		 */
		array_search: function(needle, haystack)
		{
			for(var i = 0; i < haystack.length; i++)
			{
				if(haystack[i] == needle)
					return i;
			}
			return -1;
		},
	};

})(window);

/* End */
;
; /* Start:"a:4:{s:4:"full";s:49:"/bitrix/js/main/core/core_date.js?164242071036080";s:6:"source";s:33:"/bitrix/js/main/core/core_date.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
;(function(){

if (BX.date)
	return;

BX.date = BX.Main.Date;

/************************************** calendar class **********************************/

var obCalendarSingleton = null;

/*
params: {
	node: bind element || document.body

	value - start value in site format (using 'field' param if 'value' does not exist)
	callback - date check handler. can return false to prevent calendar closing.
	callback_after - another handler, called after date picking

	field - field to read/write data

	bTime = true - whether to enable time control
	bHideTime = false - whether to hide time control by default

	currentTime - current UTC time()

}
*/


BX.calendar = function(params)
{
	return BX.calendar.get().Show(params);
};

BX.calendar.get = function()
{
	if (!obCalendarSingleton)
		obCalendarSingleton = new BX.JCCalendar();

	return obCalendarSingleton;
};

// simple func for compatibility with the oldies
BX.calendar.InsertDaysBack = function(input, days)
{
	if (days != '')
	{
		var d = new Date();
		if(days > 0)
		{
			d.setTime(d.valueOf() - days*86400000);
		}

		input.value = BX.date.format(BX.date.convertBitrixFormat(BX.message('FORMAT_DATE')), d, null);
	}
	else
	{
		input.value = '';
	}
};

BX.calendar.ValueToString = function(value, bTime, bUTC)
{
	return BX.date.format(
		BX.date.convertBitrixFormat(BX.message(bTime ? 'FORMAT_DATETIME' : 'FORMAT_DATE')),
		value,
		null,
		!!bUTC
	);
};

BX.calendar.ValueToStringFormat = function(value, bitrixFormat, bUTC)
{
	return BX.date.format(
		BX.date.convertBitrixFormat(bitrixFormat),
		value,
		null,
		!!bUTC
	);
};


BX.CalendarPeriod =
{
	Init: function(inputFrom, inputTo, selPeriod)
	{
		if((inputFrom.value != "" || inputTo.value != "") && selPeriod.value == "")
			selPeriod.value = "interval";

		selPeriod.onchange();
	},

	ChangeDirectOpts: function(peroidValue, selPParent) // "week" || "others"
	{
		var selDirect = BX.findChild(selPParent, {'className':'adm-select adm-calendar-direction'}, true);

		if(peroidValue == "week")
		{
			selDirect.options[0].text = BX.message('JSADM_CALEND_PREV_WEEK');
			selDirect.options[1].text = BX.message('JSADM_CALEND_CURR_WEEK');
			selDirect.options[2].text = BX.message('JSADM_CALEND_NEXT_WEEK');
		}
		else
		{
			selDirect.options[0].text = BX.message('JSADM_CALEND_PREV');
			selDirect.options[1].text = BX.message('JSADM_CALEND_CURR');
			selDirect.options[2].text = BX.message('JSADM_CALEND_NEXT');
		}
	},

	SaveAndClearInput: function(oInput)
	{
		if(!window.SavedPeriodValues)
			window.SavedPeriodValues = {};

		window.SavedPeriodValues[oInput.id] = oInput.value;
		oInput.value="";
	},

	RestoreInput: function(oInput)
	{
		if(!window.SavedPeriodValues || !window.SavedPeriodValues[oInput.id])
			return;

		oInput.value = window.SavedPeriodValues[oInput.id];
		delete(window.SavedPeriodValues[oInput.id]);
	},

	OnChangeP: function(sel)
	{
		var selPParent = sel.parentNode.parentNode;
		var bShowFrom, bShowTo, bShowDirect, bShowSeparate;
		bShowFrom = bShowTo = bShowDirect = bShowSeparate = false;

		var inputFromWrap = BX.findChild(selPParent, {'className':'adm-input-wrap adm-calendar-inp adm-calendar-first'});
		var inputToWrap = BX.findChild(selPParent, {'className':'adm-input-wrap adm-calendar-second'});
		var selDirectWrap = BX.findChild(selPParent, {'className':'adm-select-wrap adm-calendar-direction'});
		var separator = BX.findChild(selPParent, {'className':'adm-calendar-separate'});
		var inputFrom = BX.findChild(selPParent, {'className':'adm-input adm-calendar-from'},true);
		var inputTo = BX.findChild(selPParent, {'className':'adm-input adm-calendar-to'},true);

		// define who must be shown
		switch (sel.value)
		{
			case "day":
			case "week":
			case "month":
			case "quarter":
			case "year":
				bShowDirect=true;
				BX.CalendarPeriod.OnChangeD(selDirectWrap.children[0]);
				break;

			case "before":
				bShowTo = true;
				break;

			case "after":
				bShowFrom = true;
				break;

			case "exact":
				bShowFrom= true;
				break;

			case "interval":
				bShowFrom = bShowTo = bShowSeparate = true;
				BX.CalendarPeriod.RestoreInput(inputFrom);
				BX.CalendarPeriod.RestoreInput(inputTo);

				break;

			case "":
				BX.CalendarPeriod.SaveAndClearInput(inputFrom);
				BX.CalendarPeriod.SaveAndClearInput(inputTo);
				break;

			default:
				break;

		}

		BX.CalendarPeriod.ChangeDirectOpts(sel.value, selPParent);

		inputFromWrap.style.display = (bShowFrom? 'inline-block':'none');
		inputToWrap.style.display = (bShowTo? 'inline-block':'none');
		selDirectWrap.style.display = (bShowDirect? 'inline-block':'none');
		separator.style.display = (bShowSeparate? 'inline-block':'none');
	},


	OnChangeD: function(sel)
	{
		var selPParent = sel.parentNode.parentNode;
		var inputFrom = BX.findChild(selPParent, {'className':'adm-input adm-calendar-from'},true);
		var inputTo = BX.findChild(selPParent, {'className':'adm-input adm-calendar-to'},true);
		var selPeriod = BX.findChild(selPParent, {'className':'adm-select adm-calendar-period'},true);

		var offset=0;

		switch (sel.value)
		{
			case "previous":
				offset = -1;
				break;

			case "next":
				offset = 1;
				break;

			case "current":
			default:
				break;

		}

		var from = false;
		var to = false;

		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth();
		var day = today.getDate();
		var dayW = today.getDay();

		if (dayW == 0)
				dayW = 7;

		switch (selPeriod.value)
		{
			case "day":
				from = new Date(year, month, day+offset, 0, 0, 0);
				to = new Date(year, month, day+offset, 23, 59, 59);
				break;

			case "week":
				from = new Date(year, month, day-dayW+1+offset*7, 0, 0, 0);
				to = new Date(year, month, day+(7-dayW)+offset*7, 23, 59, 59);
				break;

			case "month":
				from = new Date(year, month+offset, 1, 0, 0, 0);
				to = new Date(year, month+1+offset, 0, 23, 59, 59);
				break;

			case "quarter":
				var quarterNum = Math.floor((month/3))+offset;
				from = new Date(year, 3*(quarterNum), 1, 0, 0, 0);
				to = new Date(year, 3*(quarterNum+1), 0, 23, 59, 59);
				break;

			case "year":
				from = new Date(year+offset, 0, 1, 0, 0, 0);
				to = new Date(year+1+offset, 0, 0, 23, 59, 59);
				break;

			default:
				break;
		}

		var format = window[inputFrom.name+"_bTime"] ? BX.message('FORMAT_DATETIME') : BX.message('FORMAT_DATE');

		if(from)
		{
			inputFrom.value = BX.formatDate(from, format);
			BX.addClass(inputFrom,"adm-calendar-inp-setted");
		}

		if(to)
		{
			inputTo.value = BX.formatDate(to, format);
			BX.addClass(inputTo,"adm-calendar-inp-setted");
		}
	}
};


BX.JCCalendar = function()
{
	this.params = {};

	this.bAmPm = BX.isAmPmMode();

	this.popup = null;
	this.popup_month = null;
	this.popup_year = null;
	this.month_popup_classname = '';
	this.year_popup_classname = '';
	this.value = null;
	this._layers = {};
	this._current_layer = null;

	this.DIV = null;
	this.PARTS = {};

	this.weekStart = 0;
	this.numRows = 6;

	this._create = function(params)
	{
		this.popup = new BX.PopupWindow('calendar_popup_' + Math.random(), params.node, {
			closeByEsc: true,
			autoHide: false,
			content: this._get_content(),
			bindOptions: {forceBindPosition: true}
		});

		BX.bind(this.popup.popupContainer, 'click', function(event) {
			event.stopPropagation();
		});
	};

	this._auto_hide_disable = function()
	{
		BX.unbind(document, 'click', BX.proxy(this._auto_hide, this));
	};

	this._auto_hide_enable = function()
	{
		BX.bind(document, 'click', BX.proxy(this._auto_hide, this));
	};

	this._auto_hide = function(e)
	{
		this._auto_hide_disable();
		this.popup.close();
	};

	this._get_content = function()
	{
		var _layer_onclick = BX.delegate(function(e) {
			e = e||window.event;
			this.SetDate(
				new Date(parseInt(BX.proxy_context.getAttribute('data-date'))),
				(e.type === 'dblclick' || (this.params.bCompatibility && !this.params.bTimeVisibility))
			)
		}, this);

		this.DIV = BX.create('DIV', {
			props: {className: 'bx-calendar'},
			children: [
				BX.create('DIV', {
					props: {
						className: 'bx-calendar-header'
					},
					children: [
						BX.create('A', {
							attrs: {href: 'javascript:void(0)'},
							props: {className: 'bx-calendar-left-arrow'},
							events: {click: BX.proxy(this._prev, this)}
						}),

						BX.create('SPAN', {
							props: {className: 'bx-calendar-header-content'},
							children: [
								(this.PARTS.MONTH = BX.create('A', {
									attrs: {href: 'javascript:void(0)'},
									props: {className: 'bx-calendar-top-month'},
									events: {click: BX.proxy(this._menu_month, this)}
								})),

								(this.PARTS.YEAR = BX.create('A', {
									attrs: {href: 'javascript:void(0)'},
									props: {className: 'bx-calendar-top-year'},
									events: {click: BX.proxy(this._menu_year, this)}
								}))
							]
						}),

						BX.create('A', {
							attrs: {href: 'javascript:void(0)'},
							props: {className: 'bx-calendar-right-arrow'},
							events: {click: BX.proxy(this._next, this)}
						})
					]
				}),

				(this.PARTS.WEEK = BX.create('DIV', {
					props: {
						className: 'bx-calendar-name-day-wrap'
					}
				})),

				(this.PARTS.LAYERS = BX.create('DIV', {
					props: {
						className: 'bx-calendar-cell-block'
					},
					events: {
						click: BX.delegateEvent({className: 'bx-calendar-cell'}, _layer_onclick),
						dblclick: BX.delegateEvent({className: 'bx-calendar-cell'}, _layer_onclick)
					}
				})),

				(this.PARTS.TIME = BX.create('DIV', {
					props: {
						className: 'bx-calendar-set-time-wrap'
					},
					events: {
						click: BX.delegateEvent(
							{attr: 'data-action'},
							BX.delegate(this._time_actions, this)
						)
					},
					html: '<a href="javascript:void(0)" data-action="time_show" class="bx-calendar-set-time"><i></i>'+BX.message('CAL_TIME_SET')+'</a><div class="bx-calendar-form-block"><span class="bx-calendar-form-text">'+BX.message('CAL_TIME')+'</span><span class="bx-calendar-form"><input type="text" class="bx-calendar-form-input" maxwidth="2" onkeyup="BX.calendar.get()._check_time()" /><span class="bx-calendar-form-separator"></span><input type="text" class="bx-calendar-form-input" maxwidth="2" onkeyup="BX.calendar.get()._check_time()" />'+(this.bAmPm?'<span class="bx-calendar-AM-PM-block"><span class="bx-calendar-AM-PM-text" data-action="time_ampm"></span><span class="bx-calendar-form-arrow-r"><a href="javascript:void(0)" class="bx-calendar-form-arrow-top" data-action="time_ampm_up"><i></i></a><a href="javascript:void(0)" class="bx-calendar-form-arrow-bottom" data-action="time_ampm_down"><i></i></a></span></span>':'')+'</span><a href="javascript:void(0)" data-action="time_hide" class="bx-calendar-form-close"><i></i></a></div>'
				})),

				(this.PARTS.BUTTONS = BX.create('DIV', {
					props: {className: 'bx-calendar-button-block'},
					events: {
						click: BX.delegateEvent(
							{attr: 'data-action'},
							BX.delegate(this._button_actions, this)
						)
					},
					html: '<a href="javascript:void(0)" class="bx-calendar-button bx-calendar-button-select" data-action="submit"><span class="bx-calendar-button-left"></span><span class="bx-calendar-button-text">'+BX.message('CAL_BUTTON')+'</span><span class="bx-calendar-button-right"></span></a><a href="javascript:void(0)" class="bx-calendar-button bx-calendar-button-cancel" data-action="cancel"><span class="bx-calendar-button-left"></span><span class="bx-calendar-button-text">'+BX.message('JS_CORE_WINDOW_CLOSE')+'</span><span class="bx-calendar-button-right"></span></a>'
				}))
			]
		});

		this.PARTS.TIME_INPUT_H = BX.findChild(this.PARTS.TIME, {tag: 'INPUT'}, true);
		this.PARTS.TIME_INPUT_M = this.PARTS.TIME_INPUT_H.nextSibling.nextSibling;

		if (this.bAmPm)
			this.PARTS.TIME_AMPM = this.PARTS.TIME_INPUT_M.nextSibling.firstChild;

		var spinner = (new BX.JCSpinner({
			input: this.PARTS.TIME_INPUT_H,
			callback_change: BX.proxy(this._check_time, this),
			bSaveValue: false
		})).Show();
		spinner.className = 'bx-calendar-form-arrow-l';
		this.PARTS.TIME_INPUT_H.parentNode.insertBefore(spinner, this.PARTS.TIME_INPUT_H);

		spinner = (new BX.JCSpinner({
			input: this.PARTS.TIME_INPUT_M,
			callback_change: BX.proxy(this._check_time, this),
			bSaveValue: true
		})).Show();
		spinner.className = 'bx-calendar-form-arrow-r';
		if (!this.PARTS.TIME_INPUT_M.nextSibling)
			this.PARTS.TIME_INPUT_M.parentNode.appendChild(spinner);
		else
			this.PARTS.TIME_INPUT_M.parentNode.insertBefore(spinner, this.PARTS.TIME_INPUT_M.nextSibling);

		for (var i = 0; i < 7; i++)
		{
			this.PARTS.WEEK.appendChild(BX.create('SPAN', {
				props: {
					className: 'bx-calendar-name-day'
				},
				text: BX.message('DOW_' + ((i + this.weekStart) % 7))
			}));
		}

		return this.DIV;
	};

	this._time_actions = function()
	{
		switch (BX.proxy_context.getAttribute('data-action'))
		{
			case 'time_show':
				BX.addClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
				if (this.params.bCompatibility)
				{
					BX.removeClass(this.PARTS.BUTTONS, 'bx-calendar-buttons-disabled');
				}
				this.popup.adjustPosition();
			break;
			case 'time_hide':
				BX.removeClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
				if (this.params.bCompatibility)
				{
					this._saveChoice('hide');
					BX.addClass(this.PARTS.BUTTONS, 'bx-calendar-buttons-disabled');
				}
				this.popup.adjustPosition();
			break;
			case 'time_ampm':
				this.PARTS.TIME_AMPM.innerHTML = this.PARTS.TIME_AMPM.innerHTML == 'AM' ? 'PM' : 'AM';
			break;
			case 'time_ampm_up':
				this._check_time({bSaveValue: false}, null, 12);
				return;
			break;
			case 'time_ampm_down':
				this._check_time({bSaveValue: false}, null, -12);
				return;
			break;
		}

		this._check_time();
	};

	this._button_actions = function()
	{
		switch (BX.proxy_context.getAttribute('data-action'))
		{
			case 'submit':
				if (this.params.bCompatibility)
				{
					this._saveChoice('show');
				}
				this.SaveValue();
			break;
			case 'cancel':
				this.Close();
			break;
		}
	};

	this._saveChoice = function(state)
	{
		if (this.params.bCategoryTimeVisibilityOption)
		{
			BX.userOptions.save(
				this.params.bCategoryTimeVisibilityOption,
				this.params.bNameTimeVisibilityOption,
				'visibility',
				(state === 'show' ? 'Y' : 'N')
			);
		}

		this._bTimeVisibility = (state === 'show');
		this.params.bTimeVisibility = this._bTimeVisibility;
	};

	this._check_time = function(params, value, direction)
	{
		var h = parseInt(this.PARTS.TIME_INPUT_H.value.substring(0,5),10)||0,
			m = parseInt(this.PARTS.TIME_INPUT_M.value.substring(0,5),10)||0,
			bChanged = false;

		if (!!params && !params.bSaveValue)
		{
			this.value.setUTCHours(this.value.getUTCHours() + direction);
		}
		else if (!isNaN(h))
		{
			if (this.bAmPm)
			{
				if (h != 12 && this.PARTS.TIME_AMPM.innerHTML == 'PM')
				{
					h += 12;
				}
			}

			bChanged = true;
			this.value.setUTCHours(h % 24);
		}

		if (!isNaN(m))
		{
			bChanged = true;
			this.value.setUTCMinutes(m % 60);
		}

		if (bChanged)
		{
			this.SetValue(this.value);
		}
	};

	this._set_layer = function()
	{
		var layerId = parseInt(this.value.getUTCFullYear() + '' + BX.util.str_pad_left(this.value.getUTCMonth()+'', 2, "0"));

		if (!this._layers[layerId])
		{
			this._layers[layerId] = this._create_layer();
			this._layers[layerId].BXLAYERID = layerId;
		}

		if (this._current_layer)
		{
			var v = new Date(this.value.valueOf());
			v.setUTCHours(0); v.setUTCMinutes(0);

			var cur_value = BX.findChild(this._layers[layerId], {
					tag: 'A',
					className: 'bx-calendar-active'
				}, true),
				new_value = BX.findChild(this._layers[layerId], {
					tag: 'A',
					attr: {
						'data-date' : v.valueOf() + ''
					}
				}, true);

			if (cur_value)
			{
				BX.removeClass(cur_value, 'bx-calendar-active');
			}

			if (new_value)
			{
				BX.addClass(new_value, 'bx-calendar-active');
			}

			this._replace_layer(this._current_layer, this._layers[layerId]);
		}
		else
		{
			this.PARTS.LAYERS.appendChild(this._layers[layerId]);
		}

		this._current_layer = this._layers[layerId];
	};

	this._replace_layer = function(old_layer, new_layer)
	{
		if (old_layer != new_layer)
		{
			if (!BX.browser.IsIE() || BX.browser.IsDoctype())
			{
				var dir = old_layer.BXLAYERID > new_layer.BXLAYERID ? 1 : -1;

				var old_top = 0;
				var new_top = -dir * old_layer.offsetHeight;

				old_layer.style.position = 'relative';
				old_layer.style.top = "0px";
				old_layer.style.zIndex = 5;

				new_layer.style.position = 'absolute';
				new_layer.style.top = new_top + 'px';
				new_layer.style.zIndex = 6;

				this.PARTS.LAYERS.appendChild(new_layer);

				var delta = 15;

				var f;
				(f = function() {
					new_top += dir * delta;
					old_top += dir * delta;

					if (dir * new_top < 0)
					{
						old_layer.style.top = old_top + 'px';
						new_layer.style.top = new_top + 'px';
						setTimeout(f, 10);
					}
					else
					{
						old_layer.parentNode.removeChild(old_layer);

						new_layer.style.top = "0px";
						new_layer.style.position = 'static';
						new_layer.style.zIndex = 0;
					}
				})();
			}
			else
			{
				this.PARTS.LAYERS.replaceChild(new_layer, old_layer);
			}
		}
	};

	this._create_layer = function()
	{
		var l = BX.create('DIV', {
			props: {
				className: 'bx-calendar-layer'
			}
		});

		var month_start = new Date(this.value);
		month_start.setUTCHours(0);
		month_start.setUTCMinutes(0);

		month_start.setUTCDate(1);

		if (month_start.getUTCDay() != this.weekStart)
		{
			var d = month_start.getUTCDay() - this.weekStart;
			d += d < 0 ? 7 : 0;
			month_start.setUTCDate(month_start.getUTCDate()-d);
		}

		var cur_month = this.value.getUTCMonth(),
			cur_day = this.value.getUTCDate(),
			s = '';
		for (var i = 0; i < this.numRows; i++)
		{
			s += '<div class="bx-calendar-range'
				+(i == this.numRows-1 ? ' bx-calendar-range-noline' : '')
				+'">';

			for (var j = 0; j < 7; j++)
			{
				d = month_start.getUTCDate();
				var wd = month_start.getUTCDay();
				var className = 'bx-calendar-cell';

				if (cur_month != month_start.getUTCMonth())
					className += ' bx-calendar-date-hidden';
				else if (cur_day == d)
					className += ' bx-calendar-active';


				if (wd == 0 || wd == 6)
					className += ' bx-calendar-weekend';

				s += '<a href="javascript:void(0)" class="'+className+'" data-date="' + month_start.valueOf() + '">' + d + '</a>';

				month_start.setUTCDate(month_start.getUTCDate()+1);
			}
			s += '</div>';
		}

		l.innerHTML = s;

		return l;
	};

	this._prev = function()
	{
		this.SetMonth(this.value.getUTCMonth()-1);
	};

	this._next = function()
	{
		this.SetMonth(this.value.getUTCMonth()+1);
	};

	this._menu_month_content = function()
	{
		var months = '', cur_month = this.value.getMonth(), i;
		for (i = 0; i < 12; i++)
		{
			months += '<span class="bx-calendar-month'+(i == cur_month ? ' bx-calendar-month-active' : '')+'" data-bx-month="' + i + '">' + BX.message('MONTH_' + (i + 1)) + '</span>';
		}

		return '<div class="bx-calendar-month-popup"><div class="bx-calendar-month-title" data-bx-month="' + this.value.getUTCMonth() + '">' + BX.message('MONTH_' + (this.value.getUTCMonth() + 1)) + '</div><div class="bx-calendar-month-content">' + months + '</div></div>';
	};

	this._menu_month = function()
	{
		if (!this.popup_month)
		{
			this.popup_month = new BX.PopupWindow(
				'calendar_popup_month_' + Math.random(), this.PARTS.MONTH,
				{
					content: this._menu_month_content(),
					closeByEsc: true,
					autoHide: true,
					offsetTop: -29,
					offsetLeft: -1,
					className: this.month_popup_classname,
					events: {
						onPopupShow: BX.delegate(function() {
							if (this.popup_year)
							{
								this.popup_year.close();
							}
						}, this)
					}
				}
			);

			BX.bind(this.popup_month.popupContainer, 'click', BX.proxy(this.month_popup_click, this));
			this.popup_month.BXMONTH = this.value.getUTCMonth();
		}
		else if (this.popup_month.BXMONTH != this.value.getUTCMonth())
		{
			this.popup_month.setContent(this._menu_month_content());
			this.popup_month.BXMONTH = this.value.getUTCMonth();
		}

		this.popup_month.show();
	};

	this.month_popup_click = function(e)
	{
		var target = e.target || e.srcElement;
		if (target && target.getAttribute && target.getAttribute('data-bx-month'))
		{
			this.SetMonth(parseInt(target.getAttribute('data-bx-month')));
			this.popup_month.close();
		}
	};

	this._menu_year_content = function()
	{
		var s = '<div class="bx-calendar-year-popup"><div class="bx-calendar-year-title" data-bx-year="' + this.value.getUTCFullYear() + '">' + this.value.getUTCFullYear() + '</div><div class="bx-calendar-year-content" id="bx-calendar-year-content">';

		for (var i=-3; i <= 3; i++)
		{
			s += '<span class="bx-calendar-year-number' + (i == 0?' bx-calendar-year-active' : '') + '" data-bx-year="' + (this.value.getUTCFullYear() - i) + '">' + (this.value.getUTCFullYear() - i)+'</span>';
		}

		s += '</div><input data-bx-year-input="Y" type="text" class="bx-calendar-year-input" maxlength="4" /></div>';

		return s;
	};

	this._menu_year = function()
	{
		if (!this.popup_year)
		{
			this.popup_year = new BX.PopupWindow(
				'calendar_popup_year_' + Math.random(), this.PARTS.YEAR,
				{
					content: this._menu_year_content(),
					closeByEsc: true,
					autoHide: true,
					offsetTop: -29,
					offsetLeft: -1,
					className: this.year_popup_classname,
					events: {
						onPopupShow: BX.delegate(function() {
							if (this.popup_month)
							{
								this.popup_month.close();
							}
						}, this)
					}
				}
			);

			BX.bind(this.popup_year.popupContainer, 'click', BX.proxy(this.year_popup_click, this));
			BX.bind(this.popup_year.popupContainer, 'keyup', BX.proxy(this.year_popup_keyup, this));
			this.popup_year.BXYEAR = this.value.getUTCFullYear();
		}
		else if (this.popup_year.BXYEAR != this.value.getUTCFullYear())
		{
			this.popup_year.setContent(this._menu_year_content());
			this.popup_year.BXYEAR = this.value.getUTCFullYear();
		}

		this.popup_year.show();
	};

	this.year_popup_click = function(e)
	{
		var target = e.target || e.srcElement;
		if (target && target.getAttribute && target.getAttribute('data-bx-year'))
		{
			this.SetYear(parseInt(target.getAttribute('data-bx-year')));
			this.popup_year.close();
		}
	};
	this.year_popup_keyup = function(e)
	{
		var target = e.target || e.srcElement;
		if (target && target.getAttribute && target.getAttribute('data-bx-year-input') == 'Y')
		{
			var value = parseInt(target.value);
			if(value >= 1900 && value <= 2100)
			{
				this.SetYear(value);
				this.popup_year.close();
			}
		}
	};

	this._check_date = function(v)
	{
		var res = v;

		if (BX.type.isString(v))
		{
			res = BX.parseDate(v, true);
		}

		if (!BX.type.isDate(res) || isNaN(res.valueOf()))
		{
			res = BX.date.convertToUTC(new Date());
			if (this.params.bHideTime)
			{
				res.setUTCHours(0);
				res.setUTCMinutes(0);
			}
		}

		res.setUTCMilliseconds(0);
		res.setUTCSeconds(0);

		res.BXCHECKED = true;

		return res;
	};
};

BX.JCCalendar.prototype.Show = function(params)
{
	if (!BX.isReady)
	{
		BX.ready(BX.delegate(function() {this.Show(params)}, this));
		return;
	}

	params.node = params.node||document.body;

	if (BX.type.isNotEmptyString(params.node))
	{
		var n = BX(params.node);
		if (!n)
		{
			n = document.getElementsByName(params.node);
			if (n && n.length > 0)
			{
				n = n[0]
			}
		}
		params.node = n;
	}

	if (!params.node)
		return;

	if (!!params.field)
	{
		if (BX.type.isString(params.field))
		{
			n = BX(params.field);
			if (!!n)
			{
				params.field = n;
			}
			else
			{
				if (params.form)
				{
					if (BX.type.isString(params.form))
					{
						params.form = document.forms[params.form];
					}
				}

				if (BX.type.isDomNode(params.form) && !!params.form[params.field])
				{
					params.field = params.form[params.field];
				}
				else
				{
					n = document.getElementsByName(params.field);
					if (n && n.length > 0)
					{
						n = n[0];
						params.field = n;
					}
				}
			}

			if (BX.type.isString(params.field))
			{
				params.field = BX(params.field);
			}
		}
	}

	var bShow = !this.popup || !this.popup.isShown() || this.params.node != params.node;

	this.params = params;

	this.params.bCompatibility = (typeof this.params.bCompatibility == 'undefined' ? false : this.params.bCompatibility);
	this.params.bTimeVisibility = (typeof this.params.bTimeVisibility == 'undefined' ? !this.params.bCompatibility : this.params.bTimeVisibility);
	if (this.params.bCompatibility)
	{
		this.params.bCategoryTimeVisibilityOption = (
			this.params.bCategoryTimeVisibilityOption ? this.params.bCategoryTimeVisibilityOption : ''
		);
		this.params.bNameTimeVisibilityOption = (
			this.params.bNameTimeVisibilityOption ? this.params.bNameTimeVisibilityOption : 'time_visibility'
		);

		if (typeof this._bTimeVisibility !== 'undefined')
		{
			this.params.bTimeVisibility = this._bTimeVisibility;
		}
	}

	this.params.bTime = typeof this.params.bTime == 'undefined' ? true : !!this.params.bTime;
	this.params.bHideTime = typeof this.params.bHideTime == 'undefined' ? true : !!this.params.bHideTime;
	this.params.bUseSecond = typeof this.params.bUseSecond == 'undefined' ? true : !!this.params.bUseSecond;

	this.weekStart = parseInt(this.params.weekStart || this.params.weekStart || BX.message('WEEK_START'));
	if (isNaN(this.weekStart))
		this.weekStart = 1;

	if (!this.popup)
	{
		this._create(this.params);
	}
	else
	{
		this.popup.setBindElement(this.params.node);
	}

	var bHideTime = !!this.params.bHideTime;
	if (this.params.value)
	{
		this.SetValue(this.params.value);
		bHideTime = this.value.getUTCHours() <= 0 && this.value.getUTCMinutes() <= 0;
	}
	else if (this.params.field)
	{
		this.SetValue(this.params.field.value);
		bHideTime = this.value.getUTCHours() <= 0 && this.value.getUTCMinutes() <= 0;
	}
	else if (!!this.params.currentTime)
	{
		this.SetValue(this.params.currentTime);
	}
	else
	{
		this.SetValue();
	}

	if (!!this.params.bTime)
	{
		this.activateTimeStyle(bHideTime);
	}
	else
	{
		this.activateDateStyle(bHideTime);
	}

	if (bShow)
	{
		this._auto_hide_disable();
		this.popup.show();
		setTimeout(BX.proxy(this._auto_hide_enable, this), 0);
	}

	this.params.bSetFocus = typeof this.params.bSetFocus == 'undefined' ? true : !!this.params.bSetFocus;
	if(this.params.bSetFocus)
	{
		params.node.blur();
	}
	else
	{
		BX.bind(params.node, 'keyup', BX.defer(function(){
			this.SetValue(params.node.value);
			if(!!this.params.bTime)
			{
				if(this.value.getUTCHours() <= 0 && this.value.getUTCMinutes() <= 0)
					BX.removeClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
				else
					BX.addClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
			}
		}, this));
	}

	return this;
};

BX.JCCalendar.prototype.activateDateStyle = function(bHideTime)
{
	BX.addClass(this.DIV, 'bx-calendar-time-disabled');

	if (!!bHideTime)
		BX.removeClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
	else
		BX.addClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
};

BX.JCCalendar.prototype.activateTimeStyle = function(bHideTime)
{
	if (this.params.bCompatibility && !this.params.bTimeVisibility)
	{
		BX.addClass(this.PARTS.BUTTONS, 'bx-calendar-buttons-disabled');
		BX.addClass(this.PARTS.TIME, 'bx-calendar-set-time-wrap-simple');
		BX.removeClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
	}
	else
	{
		BX.removeClass(this.DIV, 'bx-calendar-time-disabled');

		if (!!bHideTime)
			BX.removeClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
		else
			BX.addClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');
	}
};

BX.JCCalendar.prototype.SetDay = function(d)
{
	this.value.setUTCDate(d);
	return this.SetValue(this.value);
};

BX.JCCalendar.prototype.SetMonth = function(m)
{
	if (this.popup_month)
		this.popup_month.close();

	this.value.setUTCMonth(m);

	if(m < 0)
		m += 12;
	else if (m >= 12)
		m -= 12;

	while(this.value.getUTCMonth() > m)
	{
		this.value.setUTCDate(this.value.getUTCDate()-1);
	}

	return this.SetValue(this.value);
};

BX.JCCalendar.prototype.SetYear = function(y)
{
	if (this.popup_year)
		this.popup_year.close();
	this.value.setUTCFullYear(y);
	return this.SetValue(this.value);
};

BX.JCCalendar.prototype.SetDate = function(v, bSet)
{
	v = this._check_date(v);
	v.setUTCHours(this.value.getUTCHours());
	v.setUTCMinutes(this.value.getUTCMinutes());
	v.setUTCSeconds(this.value.getUTCSeconds());

	if (this.params.bTime && !bSet)
	{
		return this.SetValue(v);
	}
	else
	{
		this.SetValue(v);
		this.SaveValue();
	}
};

BX.JCCalendar.prototype.SetValue = function(v)
{
	this.value = (v && v.BXCHECKED) ? v : this._check_date(v);

	this.PARTS.MONTH.innerHTML = BX.message('MONTH_' + (this.value.getUTCMonth()+1));
	this.PARTS.YEAR.innerHTML = this.value.getUTCFullYear();

	if (!!this.params.bTime)
	{
		var h = this.value.getUTCHours();
		if (this.bAmPm)
		{
			if (h >= 12)
			{
				this.PARTS.TIME_AMPM.innerHTML = 'PM';

				if (h != 12)
					h -= 12;
			}
			else
			{
				this.PARTS.TIME_AMPM.innerHTML = 'AM';

				if (h == 0)
					h = 12;
			}
		}

		this.PARTS.TIME_INPUT_H.value = BX.util.str_pad_left(h.toString(), 2, "0");
		this.PARTS.TIME_INPUT_M.value = BX.util.str_pad_left(this.value.getUTCMinutes().toString(), 2, "0");
	}

	this._set_layer();

	return this;
};

BX.JCCalendar.prototype.SaveValue = function()
{
	if (this.popup_month)
		this.popup_month.close();
	if (this.popup_year)
		this.popup_year.close();

	var bSetValue = true;
	if (!!this.params.callback)
	{
		var res = this.params.callback.apply(this, [new Date(this.value.valueOf()+this.value.getTimezoneOffset()*60000)]);
		if (res === false)
			bSetValue = false;
	}

	if (bSetValue)
	{
		var bTime = !!this.params.bTime && BX.hasClass(this.PARTS.TIME, 'bx-calendar-set-time-opened');

		if (this.params.field)
		{
			var format = BX.message(bTime ? 'FORMAT_DATETIME' : 'FORMAT_DATE');

			if(bTime && !this.params.bUseSecond)
			{
				format = format.replace(':SS', '');
			}

			this.params.field.value = BX.calendar.ValueToStringFormat(this.value, format, true);
			BX.fireEvent(this.params.field, 'change');
		}

		this.popup.close();

		if (!!this.params.callback_after)
		{
			this.params.callback_after.apply(this, [new Date(this.value.valueOf()+this.value.getTimezoneOffset()*60000), bTime]);
		}
	}

	return this;
};

BX.JCCalendar.prototype.Close = function()
{
	if (!!this.popup)
		this.popup.close();

	return this;
};

BX.JCSpinner = function(params)
{
	params = params || {};
	this.params = {
		input: params.input || null,

		delta: params.delta || 1,

		timeout_start: params.timeout_start || 1000,
		timeout_cont: params.timeout_cont || 150,

		callback_start: params.callback_start || null,
		callback_change: params.callback_change || null,
		callback_finish: params.callback_finish || null,

		bSaveValue: typeof params.bSaveValue == 'undefined' ? !!params.input : !!params.bSaveValue
	};

	this.mousedown = false;
	this.direction = 1;
};

BX.JCSpinner.prototype.Show = function()
{
	this.node = BX.create('span', {
		events: {
			mousedown: BX.delegateEvent(
				{attr: 'data-dir'},
				BX.delegate(this.Start, this)
			)
		},
		html: '<a href="javascript:void(0)" class="bx-calendar-form-arrow bx-calendar-form-arrow-top" data-dir="1"><i></i></a><a href="javascript:void(0)" class="bx-calendar-form-arrow bx-calendar-form-arrow-bottom" data-dir="-1"><i></i></a>'
	});
	return this.node;
};

BX.JCSpinner.prototype.Start = function()
{
	this.mousedown = true;
	this.direction = BX.proxy_context.getAttribute('data-dir') > 0 ? 1 : -1;
	BX.bind(document, "mouseup", BX.proxy(this.MouseUp, this));
	this.ChangeValue(true);
};

BX.JCSpinner.prototype.ChangeValue = function(bFirst)
{
	if(!this.mousedown)
		return;

	if (this.params.input)
	{
		var v = parseInt(this.params.input.value, 10) + this.params.delta * this.direction;

		if (this.params.bSaveValue)
			this.params.input.value = v;

		if (!!bFirst && this.params.callback_start)
			this.params.callback_start(this.params, v, this.direction);

		if (this.params.callback_change)
			this.params.callback_change(this.params, v, this.direction);

		setTimeout(
			BX.proxy(this.ChangeValue, this),
			!!bFirst ? this.params.timeout_start : this.params.timeout_cont
		);
	}
};

BX.JCSpinner.prototype.MouseUp = function()
{
	this.mousedown = false;
	BX.unbind(document, "mouseup", BX.proxy(this.MouseUp, this));

	if (this.params.callback_finish)
		this.params.callback_finish(this.params, this.params.input.value);
};

/**************** compatibility hacks ***************************/

window.jsCalendar = {
	Show: function(obj, field, fieldFrom, fieldTo, bTime, serverTime, form_name, bHideTimebar)
	{
		return BX.calendar({
			node: obj, field: field, form: form_name, bTime: !!bTime, currentTime: serverTime, bHideTimebar: !!bHideTimebar
		});
	},

	ValueToString: BX.calendar.ValueToString
};


/************ clock popup transferred from timeman **************/

BX.CClockSelector = function(params)
{
	this.params = params;

	this.params.popup_buttons = this.params.popup_buttons || [
		new BX.PopupWindowButton({
			text : BX.message('CAL_BUTTON'),
			className : "popup-window-button-create",
			events : {click : BX.proxy(this.setValue, this)}
		})
	];

	this.isReady = false;

	this.WND = new BX.PopupWindow(
		this.params.popup_id || 'clock_selector_popup',
		this.params.node,
		this.params.popup_config || {
			titleBar: BX.message('CAL_TIME'),
			offsetLeft: -45,
			offsetTop: -135,
			autoHide: true,
			closeIcon: true,
			closeByEsc: true
		}
	);

	this.SHOW = false;
	BX.addCustomEvent(this.WND, "onPopupClose", BX.delegate(this.onPopupClose, this));

	this.obClocks = {};
	this.CLOCK_ID = this.params.clock_id || 'clock_selector';
};

BX.CClockSelector.prototype.Show = function()
{
	if (!this.isReady)
	{
		//BX.timeman.showWait(this.parent.DIV);

		BX.addCustomEvent('onClockRegister', BX.proxy(this.onClockRegister, this));
		return BX.ajax.get('/bitrix/tools/clock_selector.php', {start_time: this.params.start_time, clock_id: this.CLOCK_ID, sessid: BX.bitrix_sessid()}, BX.delegate(this.Ready, this));
	}

	this.WND.setButtons(this.params.popup_buttons);
	this.WND.show();

	this.SHOW = true;

	if (window['bxClock_' + this.obClocks[this.CLOCK_ID]])
	{
		setTimeout("window['bxClock_" + this.obClocks[this.CLOCK_ID] + "'].CalculateCoordinates()", 40);
	}

	return true;
};

BX.CClockSelector.prototype.onClockRegister = function(obClocks)
{
	if (obClocks[this.CLOCK_ID])
	{
		this.obClocks[this.CLOCK_ID] = obClocks[this.CLOCK_ID];
		BX.removeCustomEvent('onClockRegister', BX.proxy(this.onClockRegister, this));
	}
};

BX.CClockSelector.prototype.Ready = function(data)
{
	this.content = this.CreateContent(data);
	this.WND.setContent(this.content);

	this.isReady = true;
	//BX.timeman.closeWait();

	setTimeout(BX.proxy(this.Show, this), 30);
};

BX.CClockSelector.prototype.CreateContent = function(data)
{
	return BX.create('DIV', {
		events: {click: BX.PreventDefault},
		html:
			'<div class="bx-tm-popup-clock">' + data + '</div>'
	});
};

BX.CClockSelector.prototype.setValue = function(e)
{
	if (this.params.callback)
	{
		var input = BX.findChild(this.content, {tagName: 'INPUT'}, true);
		this.params.callback.apply(this.params.node, [input.value]);
	}

	return BX.PreventDefault(e);
};

BX.CClockSelector.prototype.closeWnd = function(e)
{
	this.WND.close();
	return (e || window.event) ? BX.PreventDefault(e) : true;
};

BX.CClockSelector.prototype.setNode = function(node)
{
	this.WND.setBindElement(node);
};

BX.CClockSelector.prototype.setTime = function(timestamp)
{
	this.params.start_time = timestamp;
	if (window['bxClock_' + this.obClocks[this.CLOCK_ID]])
	{
		window['bxClock_' +  this.obClocks[this.CLOCK_ID]].SetTime(parseInt(timestamp/3600), parseInt((timestamp%3600)/60));
	}
};

BX.CClockSelector.prototype.setCallback = function(cb)
{
	this.params.callback = cb;
};

BX.CClockSelector.prototype.onPopupClose = function()
{
	this.SHOW = false;
};

})();

/* End */
;
; /* Start:"a:4:{s:4:"full";s:40:"/bitrix/js/main/utils.js?164242071029279";s:6:"source";s:24:"/bitrix/js/main/utils.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
var phpVars;
if(!phpVars)
{
	phpVars = {
		ADMIN_THEME_ID: '.default',
		LANGUAGE_ID: 'en',
		FORMAT_DATE: 'DD.MM.YYYY',
		FORMAT_DATETIME: 'DD.MM.YYYY HH:MI:SS',
		opt_context_ctrl: false,
		cookiePrefix: 'BITRIX_SM',
		titlePrefix: '',
		bitrix_sessid: '',
		messHideMenu: '',
		messShowMenu: '',
		messHideButtons: '',
		messShowButtons: '',
		messFilterInactive: '',
		messFilterActive: '',
		messFilterLess: '',
		messLoading: 'Loading...',
		messMenuLoading: '',
		messMenuLoadingTitle: '',
		messNoData: '',
		messExpandTabs: '',
		messCollapseTabs: '',
		messPanelFixOn: '',
		messPanelFixOff: '',
		messPanelCollapse: '',
		messPanelExpand: ''
	};
}

var jsUtils =
{
	arEvents: Array(),

	addEvent: function(el, evname, func, capture)
	{
		if(el.attachEvent) // IE
			el.attachEvent("on" + evname, func);
		else if(el.addEventListener) // Gecko / W3C
			el.addEventListener(evname, func, false);
		else
			el["on" + evname] = func;
		this.arEvents[this.arEvents.length] = {'element': el, 'event': evname, 'fn': func};
	},

	removeEvent: function(el, evname, func)
	{
		if(el.detachEvent) // IE
			el.detachEvent("on" + evname, func);
		else if(el.removeEventListener) // Gecko / W3C
			el.removeEventListener(evname, func, false);
		else
			el["on" + evname] = null;
	},

	removeAllEvents: function(el)
	{
		var i;
		for(i=0; i<this.arEvents.length; i++)
		{
			if(this.arEvents[i] && (el==false || el==this.arEvents[i].element))
			{
				jsUtils.removeEvent(this.arEvents[i].element, this.arEvents[i].event, this.arEvents[i].fn);
				this.arEvents[i] = null;
			}
		}
		if(el==false)
			this.arEvents.length = 0;
	},

	IsDoctype: function()
	{
		if (document.compatMode)
			return (document.compatMode == "CSS1Compat");

		if (document.documentElement && document.documentElement.clientHeight)
			return true;

		return false;
	},

	GetRealPos: function(el)
	{
		if(window.BX)
			return BX.pos(el);

		if(!el || !el.offsetParent)
			return false;

		var res = Array();
		res["left"] = el.offsetLeft;
		res["top"] = el.offsetTop;
		var objParent = el.offsetParent;

		while(objParent && objParent.tagName != "BODY")
		{
			res["left"] += objParent.offsetLeft;
			res["top"] += objParent.offsetTop;
			objParent = objParent.offsetParent;
		}
		res["right"] = res["left"] + el.offsetWidth;
		res["bottom"] = res["top"] + el.offsetHeight;

		return res;
	},

	FindChildObject: function(obj, tag_name, class_name, recursive)
	{
		if(!obj)
			return null;
		var tag = tag_name.toUpperCase();
		var cl = (class_name? class_name.toLowerCase() : null);
		var n = obj.childNodes.length;
		for(var j=0; j<n; j++)
		{
			var child = obj.childNodes[j];
			if(child.tagName && child.tagName.toUpperCase() == tag)
				if(!class_name || child.className.toLowerCase() == cl)
					return child;
			if(recursive == true)
			{
				var deepChild;
				if((deepChild = jsUtils.FindChildObject(child, tag_name, class_name, true)))
					return deepChild;
			}
		}
		return null;
	},

	FindParentObject: function(obj, tag_name, class_name)
	{
		if(!obj)
			return null;
		var o = obj;
		var tag = tag_name.toUpperCase();
		var cl = (class_name? class_name.toLowerCase() : null);
		while(o.parentNode)
		{
			var parent = o.parentNode;
			if(parent.tagName && parent.tagName.toUpperCase() == tag)
				if(!class_name || parent.className.toLowerCase() == cl)
					return parent;
			o = parent;
		}
		return null;
	},

	FindNextSibling: function(obj, tag_name)
	{
		if(!obj)
			return null;
		var o = obj;
		var tag = tag_name.toUpperCase();
		while(o.nextSibling)
		{
			var sibling = o.nextSibling;
			if(sibling.tagName && sibling.tagName.toUpperCase() == tag)
				return sibling;
			o = sibling;
		}
		return null;
	},

	FindPreviousSibling: function(obj, tag_name)
	{
		if(!obj)
			return null;
		var o = obj;
		var tag = tag_name.toUpperCase();
		while(o.previousSibling)
		{
			var sibling = o.previousSibling;
			if(sibling.tagName && sibling.tagName.toUpperCase() == tag)
				return sibling;
			o = sibling;
		}
		return null;
	},

	bOpera : navigator.userAgent.toLowerCase().indexOf('opera') != -1,
	bIsIE : document.attachEvent && navigator.userAgent.toLowerCase().indexOf('opera') == -1,

	IsIE: function()
	{
		return this.bIsIE;
	},

	IsOpera: function()
	{
		return this.bOpera;
	},

	IsSafari: function()
	{
		var userAgent = navigator.userAgent.toLowerCase();
		return (/webkit/.test(userAgent));
	},

	IsEditor: function()
	{
		var userAgent = navigator.userAgent.toLowerCase();
		var version = (userAgent.match( /.+(msie)[\/: ]([\d.]+)/ ) || [])[2];
		var safari = /webkit/.test(userAgent);

		if (this.IsOpera() || (document.all && !document.compatMode && version < 6) || safari)
			return false;

		return true;
	},

	ToggleDiv: function(div)
	{
		var style = document.getElementById(div).style;
		if(style.display!="none")
			style.display = "none";
		else
			style.display = "block";
		return (style.display != "none");
	},

	urlencode: function(s)
	{
		return escape(s).replace(new RegExp('\\+','g'), '%2B');
	},

	OpenWindow: function(url, width, height)
	{
		var w = screen.width, h = screen.height;
		if(this.IsOpera())
		{
			w = document.body.offsetWidth;
			h = document.body.offsetHeight;
		}
		window.open(url, '', 'status=no,scrollbars=yes,resizable=yes,width='+width+',height='+height+',top='+Math.floor((h - height)/2-14)+',left='+Math.floor((w - width)/2-5));
	},

	SetPageTitle: function(s)
	{
		document.title = phpVars.titlePrefix+s;
		var h1 = document.getElementsByTagName("H1");
		if(h1)
			h1[0].innerHTML = s;
	},

	LoadPageToDiv: function(url, div_id)
	{
		var div = document.getElementById(div_id);
		if(!div)
			return;
		CHttpRequest.Action = function(result)
		{
			CloseWaitWindow();
			document.getElementById(div_id).innerHTML = result;
		}
		ShowWaitWindow();
		CHttpRequest.Send(url);
	},

	trim: function(s)
	{
		if (typeof s == 'string' || typeof s == 'object' && s.constructor == String)
		{
			var r, re;

			re = /^[\s\r\n]+/g;
			r = s.replace(re, "");
			re = /[\s\r\n]+$/g;
			r = r.replace(re, "");
			return r;
		}
		else
			return s;
	},

	Redirect: function(args, url)
	{
		var e = null, bShift = false;
		if(args && args.length > 0)
			e = args[0];
		if(!e)
			e = window.event;
		if(e)
			bShift = e.shiftKey;

		if(bShift)
			window.open(url);
		else
		{
			window.location.href=url;
		}
	},

	False: function(){return false;},

	AlignToPos: function(pos, w, h)
	{
		var x = pos["left"], y = pos["bottom"];

		var scroll = jsUtils.GetWindowScrollPos();
		var size = jsUtils.GetWindowInnerSize();

		if((size.innerWidth + scroll.scrollLeft) - (pos["left"] + w) < 0)
		{
			if(pos["right"] - w >= 0 )
				x = pos["right"] - w;
			else
				x = scroll.scrollLeft;
		}

		if((size.innerHeight + scroll.scrollTop) - (pos["bottom"] + h) < 0)
		{
			if(pos["top"] - h >= 0)
				y = pos["top"] - h;
			else
				y = scroll.scrollTop;
		}

		return {'left':x, 'top':y};
	},

	// evaluate js string in window scope
	EvalGlobal: function(script)
	{
		try {
		if (window.execScript)
			window.execScript(script, 'javascript');
		else if (jsUtils.IsSafari())
			window.setTimeout(script, 0);
		else
			window.eval(script);
		} catch (e) {/*alert("Error! jsUtils.EvalGlobal");*/}
	},

	GetStyleValue: function(el, styleProp)
	{
		var res;
		if(el.currentStyle)
			res = el.currentStyle[styleProp];
		else if(window.getComputedStyle)
			res = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
		if(!res)
			res = '';
		return res;
	},

	GetWindowInnerSize: function(pDoc)
	{
		var width, height;
		if (!pDoc)
			pDoc = document;

		if (self.innerHeight) // all except Explorer
		{
			width = self.innerWidth;
			height = self.innerHeight;
		}
		else if (pDoc.documentElement && (pDoc.documentElement.clientHeight || pDoc.documentElement.clientWidth)) // Explorer 6 Strict Mode
		{
			width = pDoc.documentElement.clientWidth;
			height = pDoc.documentElement.clientHeight;
		}
		else if (pDoc.body) // other Explorers
		{
			width = pDoc.body.clientWidth;
			height = pDoc.body.clientHeight;
		}
		return {innerWidth : width, innerHeight : height};
	},

	GetWindowScrollPos: function(pDoc)
	{
		var left, top;
		if (!pDoc)
			pDoc = document;

		if (self.pageYOffset) // all except Explorer
		{
			left = self.pageXOffset;
			top = self.pageYOffset;
		}
		else if (pDoc.documentElement && (pDoc.documentElement.scrollTop || pDoc.documentElement.scrollLeft)) // Explorer 6 Strict
		{
			left = document.documentElement.scrollLeft;
			top = document.documentElement.scrollTop;
		}
		else if (pDoc.body) // all other Explorers
		{
			left = pDoc.body.scrollLeft;
			top = pDoc.body.scrollTop;
		}
		return {scrollLeft : left, scrollTop : top};
	},

	GetWindowScrollSize: function(pDoc)
	{
		var width, height;
		if (!pDoc)
			pDoc = document;

		if ( (pDoc.compatMode && pDoc.compatMode == "CSS1Compat"))
		{
			width = pDoc.documentElement.scrollWidth;
			height = pDoc.documentElement.scrollHeight;
		}
		else
		{
			if (pDoc.body.scrollHeight > pDoc.body.offsetHeight)
				height = pDoc.body.scrollHeight;
			else
				height = pDoc.body.offsetHeight;

			if (pDoc.body.scrollWidth > pDoc.body.offsetWidth ||
				(pDoc.compatMode && pDoc.compatMode == "BackCompat") ||
				(pDoc.documentElement && !pDoc.documentElement.clientWidth)
			)
				width = pDoc.body.scrollWidth;
			else
				width = pDoc.body.offsetWidth;
		}
		return {scrollWidth : width, scrollHeight : height};
	},

	GetWindowSize: function()
	{
		var innerSize = jsUtils.GetWindowInnerSize();
		var scrollPos = jsUtils.GetWindowScrollPos();
		var scrollSize = jsUtils.GetWindowScrollSize();

		return  {
			innerWidth : innerSize.innerWidth, innerHeight : innerSize.innerHeight,
			scrollLeft : scrollPos.scrollLeft, scrollTop : scrollPos.scrollTop,
			scrollWidth : scrollSize.scrollWidth, scrollHeight : scrollSize.scrollHeight
		};
	},


	arCustomEvents: {},

	addCustomEvent: function(eventName, eventHandler, arParams, handlerContextObject)
	{
		if (!this.arCustomEvents[eventName])
			this.arCustomEvents[eventName] = [];

		if (!arParams)
			arParams = [];
		if (!handlerContextObject)
			handlerContextObject = false;

		this.arCustomEvents[eventName].push(
			{
				handler: eventHandler,
				arParams: arParams,
				obj: handlerContextObject
			}
		);
	},

	removeCustomEvent: function(eventName, eventHandler)
	{
		if (!this.arCustomEvents[eventName])
			return;

		var l = this.arCustomEvents[eventName].length;
		if (l == 1)
		{
			delete this.arCustomEvents[eventName];
			return;
		}

		for (var i = 0; i < l; i++)
		{
			if (!this.arCustomEvents[eventName][i])
				continue;
			if (this.arCustomEvents[eventName][i].handler == eventHandler)
			{
				delete this.arCustomEvents[eventName][i];
				return;
			}
		}
	},

	onCustomEvent: function(eventName, arEventParams)
	{
		if (!this.arCustomEvents[eventName])
			return;

		if (!arEventParams)
			arEventParams = [];

		var h;
		for (var i = 0, l = this.arCustomEvents[eventName].length; i < l; i++)
		{
			h = this.arCustomEvents[eventName][i];
			if (!h || !h.handler)
				continue;

			if (h.obj)
				h.handler.call(h.obj, h.arParams, arEventParams);
			else
				h.handler(h.arParams, arEventParams);
		}
	},

	loadJSFile: function(arJs, oCallBack, pDoc)
	{
		if (!pDoc)
			pDoc = document;
		if (typeof arJs == 'string')
			arJs = [arJs];
		var callback = function()
		{
			if (!oCallBack)
				return;
			if (typeof oCallBack == 'function')
				return oCallBack();
			if (typeof oCallBack != 'object' || !oCallBack.func)
				return;
			var p = oCallBack.params || {};
			if (oCallBack.obj)
				oCallBack.func.apply(oCallBack.obj, p);
			else
				oCallBack.func(p);
		};
		var load_js = function(ind)
		{
			if (ind >= arJs.length)
				return callback();
			var oSript = pDoc.body.appendChild(pDoc.createElement('script'));
			oSript.src = arJs[ind];
			var bLoaded = false;
			oSript.onload = oSript.onreadystatechange = function()
			{
				if (!bLoaded && (!oSript.readyState || oSript.readyState == "loaded" || oSript.readyState == "complete"))
				{
					bLoaded = true;
					setTimeout(function (){load_js(++ind);}, 50);
				}
			};
		};
		load_js(0);
	},

	loadCSSFile: function(arCSS, pDoc, pWin)
	{
		if (typeof arCSS == 'string')
		{
			var bSingle = true;
			arCSS = [arCSS];
		}
		var i, l = arCSS.length, pLnk = [];
		if (l == 0)
			return;
		if (!pDoc)
			pDoc = document;
		if (!pWin)
			pWin = window;
		if (!pWin.bxhead)
		{
			var heads = pDoc.getElementsByTagName('HEAD');
			pWin.bxhead = heads[0];
		}
		if (!pWin.bxhead)
			return;
		for (i = 0; i < l; i++)
		{
			var lnk = document.createElement('LINK');
			lnk.href = arCSS[i];
			lnk.rel = 'stylesheet';
			lnk.type = 'text/css';
			pWin.bxhead.appendChild(lnk);
			pLnk.push(lnk);
		}
		if (bSingle)
			return lnk;
		return pLnk;
	},

	appendBXHint : function(node, html)
	{
		if (!node || !node.parentNode || !html)
			return;
		var oBXHint = new BXHint(html);
		node.parentNode.insertBefore(oBXHint.oIcon, node);
		node.parentNode.removeChild(node);
		oBXHint.oIcon.style.marginLeft = "5px";
	},

	PreventDefault : function(e)
	{
		if(!e) e = window.event;
		if(e.stopPropagation)
		{
			e.preventDefault();
			e.stopPropagation();
		}
		else
		{
			e.cancelBubble = true;
			e.returnValue = false;
		}
		return false;
	},

	CreateElement: function(tag, arAttr, arStyles, pDoc)
	{
		if (!pDoc)
			pDoc = document;
		var pEl = pDoc.createElement(tag), p;
		if(arAttr)
		{
			for(p in arAttr)
			{
				if(p == 'className' || p == 'class')
				{
					pEl.setAttribute('class', arAttr[p]);
					if (jsUtils.IsIE())
						pEl.setAttribute('className', arAttr[p]);
					continue;
				}

				if (arAttr[p] != undefined && arAttr[p] != null)
					pEl.setAttribute(p, arAttr[p]);
			}
		}
		if(arStyles)
		{
			for(p in arStyles)
				pEl.style[p] = arStyles[p];
		}
		return pEl;
	},

	in_array: function(needle, haystack)
	{
		for(var i=0; i<haystack.length; i++)
		{
			if(haystack[i] == needle)
				return true;
		}
		return false;
	},

	htmlspecialchars: function(str)
	{
		if(!str.replace)
			return str;

		return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}
}

/************************************************/

function JCFloatDiv()
{
	var _this = this;
	this.floatDiv = null;
	this.x = this.y = 0;

	this.Create = function(arParams)
	{
		var div = document.body.appendChild(document.createElement("DIV"));
		div.id = arParams.id;
		div.style.position = 'absolute';
		div.style.left = '-10000px';
		div.style.top = '-10000px';
		if(arParams.className)
			div.className = arParams.className;
		if(arParams.zIndex)
			div.style.zIndex = arParams.zIndex;
		if(arParams.width)
			div.style.width = arParams.width+'px';
		if(arParams.height)
			div.style.height = arParams.height+'px';
		return div;
	}

	this.Show = function(div, left, top, dxShadow, restrictDrag)
	{
		var component = BX.ZIndexManager.getComponent(div);
		if (!component)
		{
			BX.ZIndexManager.register(div);
		}

		BX.ZIndexManager.bringToFront(div);

		if (left < 0)
			left = 0;

		if (top < 0)
			top = 0;

		div.style.left = parseInt(left) + "px";
		div.style.top = parseInt(top) + "px";

		/*Restrict drag*/
		div.restrictDrag = restrictDrag || false;

		/*shadow*/
		if(isNaN(dxShadow))
			dxShadow = 5;

		div.dxShadow = dxShadow;
	}

	this.Close = function(div)
	{
		if(!div)
			return;
		var sh = document.getElementById(div.id+"_shadow");
		if(sh)
			sh.style.visibility = 'hidden';

		var frame = document.getElementById(div.id+"_frame");
		if(frame)
			frame.style.visibility = 'hidden';
	}

	this.Move = function(div, x, y)
	{
		if(!div)
			return;

		var dxShadow = div.dxShadow;
		var left = parseInt(div.style.left)+x;
		var top = parseInt(div.style.top)+y;

		if (div.restrictDrag)
		{
			//Left side
			if (left < 0)
				left = 0;

			//Right side
			if ( (document.compatMode && document.compatMode == "CSS1Compat"))
				windowWidth = document.documentElement.scrollWidth;
			else
			{
				if (document.body.scrollWidth > document.body.offsetWidth ||
					(document.compatMode && document.compatMode == "BackCompat") ||
					(document.documentElement && !document.documentElement.clientWidth)
				)
					windowWidth = document.body.scrollWidth;
				else
					windowWidth = document.body.offsetWidth;
			}

			var floatWidth = div.offsetWidth;
			if (left > (windowWidth - floatWidth - dxShadow))
				left = windowWidth - floatWidth - dxShadow;

			//Top side
			if (top < 0)
				top = 0;
		}

		div.style.left = left+'px';
		div.style.top = top+'px';

		this.AdjustShadow(div);
	}

	this.HideShadow = function(div)
	{
		var sh = document.getElementById(div.id + "_shadow");
		sh.style.visibility = 'hidden';
	}

	this.UnhideShadow = function(div)
	{
		var sh = document.getElementById(div.id + "_shadow");
		sh.style.visibility = 'visible';
	}

	this.AdjustShadow = function(div)
	{
		var sh = document.getElementById(div.id + "_shadow");
		if(sh && sh.style.visibility != 'hidden')
		{
			var dxShadow = div.dxShadow;

			sh.style.width = div.offsetWidth+'px';
			sh.style.height = div.offsetHeight+'px';
			sh.style.left = parseInt(div.style.left)+dxShadow+'px';
			sh.style.top = parseInt(div.style.top)+dxShadow+'px';
		}

		var frame = document.getElementById(div.id+"_frame");
		if(frame)
		{
			frame.style.width = div.offsetWidth + "px";
			frame.style.height = div.offsetHeight + "px";
			frame.style.left = div.style.left;
			frame.style.top = div.style.top;
		}
	}

	this.StartDrag = function(e, div)
	{
		if(!e)
			e = window.event;
		this.x = e.clientX + document.body.scrollLeft;
		this.y = e.clientY + document.body.scrollTop;
		this.floatDiv = div;

		jsUtils.addEvent(document, "mousemove", this.MoveDrag);
		document.onmouseup = this.StopDrag;
		if(document.body.setCapture)
			document.body.setCapture();

		document.onmousedown = jsUtils.False;
		var b = document.body;
		b.ondrag = jsUtils.False;
		b.onselectstart = jsUtils.False;
		b.style.MozUserSelect = _this.floatDiv.style.MozUserSelect = 'none';
		b.style.cursor = 'move';
	}

	this.StopDrag = function(e)
	{
		if(document.body.releaseCapture)
			document.body.releaseCapture();

		jsUtils.removeEvent(document, "mousemove", _this.MoveDrag);
		document.onmouseup = null;

		this.floatDiv = null;

		document.onmousedown = null;
		var b = document.body;
		b.ondrag = null;
		b.onselectstart = null;
		b.style.MozUserSelect = _this.floatDiv.style.MozUserSelect = '';
		b.style.cursor = '';
	}

	this.MoveDrag = function(e)
	{
		var x = e.clientX + document.body.scrollLeft;
		var y = e.clientY + document.body.scrollTop;

		if(_this.x == x && _this.y == y)
			return;

		_this.Move(_this.floatDiv, (x - _this.x), (y - _this.y));
		_this.x = x;
		_this.y = y;
	}
}
var jsFloatDiv = new JCFloatDiv();

/************************************************/

var BXHint = function(innerHTML, element, addParams)
{
	this.oDivOver = false;
	this.timeOutID = null;
	this.oIcon = null;
	this.freeze = false;
	this.x = 0;
	this.y = 0;
	this.time = 700;

	if (!innerHTML)
		innerHTML = "";
	this.Create(innerHTML, element, addParams);
}

BXHint.prototype.Create = function(innerHTML, element, addParams)
{
	var
		_this = this,
		width = 0,
		height = 0,
		className = null,
		type = "icon";
	this.bWidth = true;

	if (addParams)
	{
		if (addParams.width === false)
			this.bWidth = false;
		else if (addParams.width)
			width = addParams.width;

		if (addParams.height)
			height = addParams.height;

		if (addParams.className)
			className = addParams.className;

		if (addParams.type && (addParams.type == "link" || addParams.type == "icon"))
			type = addParams.type;
		if (addParams.time > 0)
			this.time = addParams.time;
	}

	if (element)
		type = "element";

	if (type == "icon")
	{
		var element = document.createElement("IMG");
		element.src = (addParams && addParams.iconSrc) ? addParams.iconSrc : "/bitrix/themes/"+phpVars.ADMIN_THEME_ID+"/public/popup/hint.gif";
		element.ondrag = jsUtils.False;
	}
	else if (type == "link")
	{
		var element = document.createElement("A");
		element.href = "";
		element.onclick = function(e){return false;}
		element.innerHTML = "[?]";
	}

	this.element = element;
	if (type == "element")
	{
		if(addParams && addParams.show_on_click)
		{
			jsUtils.addEvent(
				element,
				"click",
				function (event)
				{
					if (!event)
						event = window.event;
					_this.GetMouseXY(event);
					_this.timeOutID = setTimeout(function () {_this.Show(innerHTML,width,height,className) }, 10);
				}
			);
		}
		else
		{
			jsUtils.addEvent(
				element,
				"mouseover",
				function (event)
				{
					if (!event)
						event = window.event;
					_this.GetMouseXY(event);
					_this.timeOutID = setTimeout(function () {_this.Show(innerHTML,width,height,className) }, 750);
				}
			);
		}

		jsUtils.addEvent(
			element,
			"mouseout",
			function(event)
			{
				if (_this.timeOutID)
					clearTimeout(_this.timeOutID);
				_this.SmartHide(_this);
			}
		);
	}
	else
	{
		this.oIcon = element;
		element.onmouseover = function(event) {if (!event) event = window.event; _this.GetMouseXY(event); _this.Show(innerHTML,width,height,className)};
		element.onmouseout = function() {_this.SmartHide(_this);};
	}
}

BXHint.prototype.IsFrozen = function()
{
	return this.freeze;
}

BXHint.prototype.Freeze = function()
{
	this.freeze = true;
	this.Hide();
}

BXHint.prototype.UnFreeze = function()
{
	this.freeze = false;
}

BXHint.prototype.GetMouseXY = function(event)
{
	if (event.pageX || event.pageY)
	{
		this.x = event.pageX;
		this.y = event.pageY;
	}
	else if (event.clientX || event.clientY)
	{
		this.x = event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
		this.y = event.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
	}
}

BXHint.prototype.Show = function(innerHTML, width, height, className)
{
	//Delete previous hint
	var old = document.getElementById("__BXHint_div");
	if (old)
		this.Hide();

	if (this.freeze)
		return;

	var _this = this;
	var oDiv = document.body.appendChild(document.createElement("DIV"));
	oDiv.onmouseover = function(){_this.oDivOver = true};
	oDiv.onmouseout = function(){_this.oDivOver = false; _this.SmartHide(_this);}
	oDiv.id = "__BXHint_div";
	oDiv.className = (className) ? className : "bxhint";
	oDiv.style.position = 'absolute';
	if (width && this.bWidth)
		oDiv.style.width = width + "px";

	if (height)
		oDiv.style.height = height + "px";
	oDiv.innerHTML = innerHTML;

	var w = oDiv.offsetWidth;
	var h = oDiv.offsetHeight;
	if (this.bWidth)
	{
		if (!width && w>200)
			w = Math.round(Math.sqrt(1.618*w*h));
		oDiv.style.width = w + "px";
		h = oDiv.offsetHeight;
	}

	var pos = {left : this.x + 10, right : this.x + w, top : this.y, bottom : this.y + h};

	pos = this.AlignToPos(pos, w, h);

	jsFloatDiv.Show(oDiv, pos.left, pos.top,3);

//	oDiv.ondrag = jsUtils.False;
//	oDiv.onselectstart = jsUtils.False;
//	oDiv.style.MozUserSelect = 'none';
	oDiv = null;
}

BXHint.prototype.AlignToPos = function(pos, w, h)
{
	var body = document.body;
	if((body.clientWidth + body.scrollLeft) < (pos.left + w))
		pos.left = (pos.left - w >= 0) ? (pos.left - w) : body.scrollLeft;

	if((body.clientHeight + body.scrollTop) - (pos["bottom"]) < 0)
		pos.top = (pos.top - h >= 0) ? (pos.top - h) : body.scrollTop;

	return pos;
}

BXHint.prototype.Hide = function()
{
	var oDiv = document.getElementById("__BXHint_div");

	if (!oDiv)
		return;

	BX.ZIndexManager.unregister(oDiv);

	jsFloatDiv.Close(oDiv);
	oDiv.parentNode.removeChild(oDiv);
	oDiv = null;
}

BXHint.prototype.SmartHide = function(_this)
{
	setTimeout(function ()
		{
			if (!_this.oDivOver)
				_this.Hide();
		}, 100
	);
}

/************************************************/

function WaitOnKeyPress(e)
{
	if(!e) e = window.event
	if(!e) return;
	if(e.keyCode == 27)
		CloseWaitWindow();
}

function ShowWaitWindow()
{
	CloseWaitWindow();

	var obWndSize = jsUtils.GetWindowSize();

	var div = document.body.appendChild(document.createElement("DIV"));
	div.id = "wait_window_div";
	div.innerHTML = phpVars.messLoading;
	div.className = "waitwindow";
	//div.style.left = obWndSize.scrollLeft + (obWndSize.innerWidth - div.offsetWidth) - (jsUtils.IsIE() ? 5 : 20) + "px";
	div.style.right = (5 - obWndSize.scrollLeft) + 'px';
	div.style.top = obWndSize.scrollTop + 5 + "px";

	if(jsUtils.IsIE())
	{
		var frame = document.createElement("IFRAME");
		frame.src = "javascript:''";
		frame.id = "wait_window_frame";
		frame.className = "waitwindow";
		frame.style.width = div.offsetWidth + "px";
		frame.style.height = div.offsetHeight + "px";
		frame.style.right = div.style.right;
		frame.style.top = div.style.top;
		document.body.appendChild(frame);
	}
	jsUtils.addEvent(document, "keypress", WaitOnKeyPress);
}

function CloseWaitWindow()
{
	jsUtils.removeEvent(document, "keypress", WaitOnKeyPress);

	var frame = document.getElementById("wait_window_frame");
	if(frame)
		frame.parentNode.removeChild(frame);

	var div = document.getElementById("wait_window_div");
	if(div)
		div.parentNode.removeChild(div);
}

/************************************************/

var jsSelectUtils =
{
	addNewOption: function(select_id, opt_value, opt_name, do_sort, check_unique)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			var n = oSelect.length;
			if(check_unique !== false)
			{
				for(var i=0;i<n;i++)
					if(oSelect[i].value==opt_value)
						return;
			}
			var newoption = new Option(opt_name, opt_value, false, false);
			oSelect.options[n]=newoption;
		}
		if(do_sort === true)
			this.sortSelect(select_id);
	},

	deleteOption: function(select_id, opt_value)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			for(var i=0;i<oSelect.length;i++)
				if(oSelect[i].value==opt_value)
				{
					oSelect.remove(i);
					break;
				}
		}
	},

	deleteSelectedOptions: function(select_id)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			var i=0;
			while(i<oSelect.length)
				if(oSelect[i].selected)
				{
					oSelect[i].selected=false;
					oSelect.remove(i);
				}
				else
					i++;
		}
	},

	deleteAllOptions: function(oSelect)
	{
		if(oSelect)
		{
			for(var i=oSelect.length-1; i>=0; i--)
				oSelect.remove(i);
		}
	},

	optionCompare: function(record1, record2)
	{
		var value1 = record1.optText.toLowerCase();
		var value2 = record2.optText.toLowerCase();
		if (value1 > value2) return(1);
		if (value1 < value2) return(-1);
		return(0);
	},

	sortSelect: function(select_id)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			var myOptions = [];
			var n = oSelect.options.length;
			for (var i=0;i<n;i++)
			{
				myOptions[i] = {
					optText:oSelect[i].text,
					optValue:oSelect[i].value
				};
			}
			myOptions.sort(this.optionCompare);
			oSelect.length=0;
			n = myOptions.length;
			for(var i=0;i<n;i++)
			{
				var newoption = new Option(myOptions[i].optText, myOptions[i].optValue, false, false);
				oSelect[i]=newoption;
			}
		}
	},

	selectAllOptions: function(select_id)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			var n = oSelect.length;
			for(var i=0;i<n;i++)
				oSelect[i].selected=true;
		}
	},

	selectOption: function(select_id, opt_value)
	{
		var oSelect = (typeof(select_id) == 'string' || select_id instanceof String? document.getElementById(select_id) : select_id);
		if(oSelect)
		{
			var n = oSelect.length;
			for(var i=0;i<n;i++)
				oSelect[i].selected = (oSelect[i].value == opt_value);
		}
	},

	addSelectedOptions: function(oSelect, to_select_id, check_unique, do_sort)
	{
		if(!oSelect)
			return;
		var n = oSelect.length;
		for(var i=0; i<n; i++)
			if(oSelect[i].selected)
				this.addNewOption(to_select_id, oSelect[i].value, oSelect[i].text, do_sort, check_unique);
	},

	moveOptionsUp: function(oSelect)
	{
		if(!oSelect)
			return;
		var n = oSelect.length;
		for(var i=0; i<n; i++)
		{
			if(oSelect[i].selected && i>0 && oSelect[i-1].selected == false)
			{
				var option1 = new Option(oSelect[i].text, oSelect[i].value);
				var option2 = new Option(oSelect[i-1].text, oSelect[i-1].value);
				oSelect[i] = option2;
				oSelect[i].selected = false;
				oSelect[i-1] = option1;
				oSelect[i-1].selected = true;
			}
		}
	},

	moveOptionsDown: function(oSelect)
	{
		if(!oSelect)
			return;
		var n = oSelect.length;
		for(var i=n-1; i>=0; i--)
		{
			if(oSelect[i].selected && i<n-1 && oSelect[i+1].selected == false)
			{
				var option1 = new Option(oSelect[i].text, oSelect[i].value);
				var option2 = new Option(oSelect[i+1].text, oSelect[i+1].value);
				oSelect[i] = option2;
				oSelect[i].selected = false;
				oSelect[i+1] = option1;
				oSelect[i+1].selected = true;
			}
		}
	}

}

/************************************************/

/* End */
;
; /* Start:"a:4:{s:4:"full";s:46:"/bitrix/js/main/rating_like.js?164242071033339";s:6:"source";s:30:"/bitrix/js/main/rating_like.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
if (!BXRL)
{
	var BXRL = {};
	var BXRLW = null;
	var lastVoteRepo = {};
	var lastReactionRepo = {};
	var BXRLParams = {
		pathToUserProfile: null
	};
}

RatingLike = function(likeId, entityTypeId, entityId, available, userId, localize, template, pathToUserProfile, pathToAjax)
{
	var key = entityTypeId+'_'+entityId;

	this.enabled = true;
	this.likeId = likeId;
	this.entityTypeId = entityTypeId;
	this.entityId = entityId;
	this.available = (available == 'Y');
	this.userId = userId;
	this.localize = localize;
	this.template = template;
	this.pathToUserProfile = pathToUserProfile;
	this.pathToAjax = (
		BX.type.isNotEmptyString(pathToAjax)
			? pathToAjax
			: '/bitrix/components/bitrix/rating.vote/vote.ajax.php'
	);

	this.box = BX('bx-ilike-button-'+likeId);
	if (this.box === null)
	{
		this.enabled = false;
		return false;
	}

	this.button = BX.findChild(this.box, { className: 'bx-ilike-left-wrap' }, true, false);
	this.buttonText = BX.findChild(this.button, { className: 'bx-ilike-text' }, true, false);
	this.count = BX.findChild(this.box,  { tagName: 'span', className: 'bx-ilike-right-wrap' }, true, false);
	if (!this.count)
	{
		this.count = BX('bx-ilike-count-' + likeId);
	}
	this.countText = BX.findChild(this.count, { className: 'bx-ilike-right' }, true, false);
	this.topPanelContainer = BX('feed-post-emoji-top-panel-container-' + likeId);
	this.topPanel = BX('feed-post-emoji-top-panel-' + likeId);
	this.topUsersText = BX('bx-ilike-top-users-' + likeId);
	this.topUsersDataNode = BX('bx-ilike-top-users-data-' + likeId);
	this.userReactionNode = BX('bx-ilike-user-reaction-' + likeId);
	this.reactionsNode = BX('feed-post-emoji-icons-' + likeId);
	this.popup = null;
	this.popupId = null;
	this.popupTimeoutIdShow = null;
	this.popupTimeoutIdList = null;
	this.popupContent = BX.findChild(BX('bx-ilike-popup-cont-' + likeId), {tagName:'span', className:'bx-ilike-popup'}, true, false);
	this.popupContentPage = 1;
	this.popupTimeout = false;
	this.likeTimeout = false;
	this.mouseOverHandler = null;
	this.version = (BXRL.render && this.topPanel ? 2 : 1);
	this.mouseInShowPopupNode = {};
	this.listXHR = null;

	if (typeof lastVoteRepo[key] != 'undefined')
	{
		this.lastVote = lastVoteRepo[key];
		var ratingNode = (template == 'standart' ? this.button: this.count);
		if (this.lastVote == 'plus')
		{
			BX.addClass(ratingNode, 'bx-you-like');
		}
		else
		{
			BX.removeClass(ratingNode, 'bx-you-like');
		}
	}
	else
	{
		this.lastVote = BX.hasClass(template == 'standart'? this.button: this.count, 'bx-you-like')? 'plus': 'cancel';
		lastVoteRepo[key] = this.lastVote;
	}

	if (typeof lastReactionRepo[key] != 'undefined')
	{
		this.lastReaction = lastReactionRepo[key];
		this.count.setAttribute('data-myreaction', this.lastReaction);
	}
	else
	{
		var lastReaction = this.count.getAttribute('data-myreaction');
		this.lastReaction = (BX.type.isNotEmptyString(lastReaction) ? lastReaction : 'like');
		lastReactionRepo[key] = this.lastReaction;
	}

	if (
		this.topPanelContainer
		&& typeof BXRL.manager != 'undefined'
	)
	{
		BXRL.manager.addEntity(key, this);
	}
};

RatingLike.Draw = function(likeId, params)
{
	var i = likeId;

	var element = BXRL[i];
	element.countText.innerHTML = parseInt(params.TOTAL_POSITIVE_VOTES);

	if (
		typeof params.TYPE != 'undefined'
		&& typeof params.USER_ID != 'undefined'
		&& parseInt(params.USER_ID) > 0
		&& typeof params.USER_DATA != 'undefined'
		&& typeof params.USER_DATA.WEIGHT != 'undefined'
	)
	{
		var userWeight = parseFloat(params.USER_DATA.WEIGHT);

		var usersData = (
			BXRL[i].topUsersDataNode
				? JSON.parse(BXRL[i].topUsersDataNode.getAttribute('data-users'))
				: false
		);

		if (
			params.TYPE != 'CHANGE'
			&& BX.type.isPlainObject(usersData)
		)
		{
			usersData.TOP = Object.values(usersData.TOP);
			var recalcNeeded = (usersData.TOP.length < 2);

			for(var k in usersData.TOP)
			{
				if (recalcNeeded)
				{
					break;
				}

				if (!usersData.TOP.hasOwnProperty(k))
				{
					continue;
				}

				if (
					(
						params.TYPE == 'ADD'
						&& userWeight > usersData.TOP[k].WEIGHT
					)
					|| (
						params.TYPE == 'CANCEL'
						&& params.USER_ID == usersData.TOP[k].ID
					)
				)
				{
					recalcNeeded = true;
				}
			}

			if (recalcNeeded)
			{
				if (
					params.TYPE == 'ADD'
					&& params.USER_ID != BX.message('USER_ID')
				)
				{
					if (!usersData.TOP.find(function(a) {
						return a.ID == params.USER_ID
					}))
					{
						usersData.TOP.push({
							ID: parseInt(params.USER_ID),
							NAME_FORMATTED: params.USER_DATA.NAME_FORMATTED,
							WEIGHT: parseFloat(params.USER_DATA.WEIGHT)
						});
					}
				}
				else if (params.TYPE == 'CANCEL')
				{
					usersData.TOP = usersData.TOP.filter(function(a) {
						return a.ID != params.USER_ID
					});
				}

				usersData.TOP.sort(function(a, b) {
					if (a.WEIGHT == b.WEIGHT) { return 0; } return (a.WEIGHT > b.WEIGHT) ? -1 : 1;
				});

				if (
					usersData.TOP.length > 2
					&& params.TYPE == 'ADD'
				)
				{
					usersData.TOP.pop();
					usersData.MORE++;
				}
			}
			else
			{
				if (params.TYPE == 'ADD')
				{
					usersData.MORE = (
						typeof usersData.MORE != 'undefined'
							? parseInt(usersData.MORE) + 1
							: 1
					);
				}
				else if (params.TYPE == 'CANCEL')
				{
					usersData.MORE = (
						typeof usersData.MORE != 'undefined'
						&& parseInt(usersData.MORE) > 0
							? parseInt(usersData.MORE) - 1
							: 0
					);
				}
			}

			BXRL[i].topUsersDataNode.setAttribute('data-users', JSON.stringify(usersData));

			if (BXRL[i].topUsersText)
			{
				BXRL[i].topUsersText.innerHTML = BXRL.render.getTopUsersText({
					you: (
						params.USER_ID == BX.message('USER_ID')
							? params.TYPE != 'CANCEL'
							: BX.hasClass(BXRL[i].count, 'bx-you-like')
					),
					top: usersData.TOP,
					more: usersData.MORE
				});
			}
		}

		if (
			BX.type.isNotEmptyString(params.REACTION)
			&& BX.type.isNotEmptyString(params.REACTION_OLD)
			&& params.TYPE == 'CHANGE'
		)
		{
			BXRL.render.setReaction({
				likeId: i,
				rating: BXRL[i],
				action: 'change',
				userReaction: params.REACTION,
				userReactionOld: params.REACTION_OLD,
				totalCount: params.TOTAL_POSITIVE_VOTES,
				userId: params.USER_ID
			});
		}
		else if (
			BX.type.isNotEmptyString(params.REACTION)
			&& BX.util.in_array(params.TYPE, ['ADD', 'CANCEL'])
		)
		{
			BXRL.render.setReaction({
				likeId: i,
				rating: BXRL[i],
				userReaction: params.REACTION,
				action: (params.TYPE == 'ADD' ? 'add' : 'cancel'),
				totalCount: params.TOTAL_POSITIVE_VOTES,
				userId: params.USER_ID
			});
		}
	}

	if (BXRL[i].topPanel)
	{
		BXRL[i].topPanel.setAttribute('data-popup', 'N');
	}

	if (!BXRL[i].userReactionNode)
	{
		element.count.insertBefore(
			BX.create("span", { props : { className : "bx-ilike-plus-one" }, style: {width: (element.countText.clientWidth-8)+'px', height: (element.countText.clientHeight-8)+'px'}, html: (params.TYPE == 'ADD'? '+1': '-1')})
			, element.count.firstChild);
	}

	if (element.popup)
	{
		element.popup.close();
		element.popupContentPage = 1;
	}
};

RatingLike.LiveUpdate = function(params)
{
	if (params.USER_ID == BX.message('USER_ID'))
	{
		return false;
	}

	for(var i in BXRL)
	{
		if (!BXRL.hasOwnProperty(i))
		{
			continue;
		}

		if (
			BXRL[i].entityTypeId == params.ENTITY_TYPE_ID
			&& BXRL[i].entityId == params.ENTITY_ID
		)
		{
			RatingLike.Draw(i, params);
		}
	}

	if (typeof BXRL.manager != 'undefined')
	{
		BXRL.manager.live(params);
	}
};

RatingLike.Set = function(likeId, entityTypeId, entityId, available, userId, localize, template, pathToUserProfile, pathToAjax, mobile)
{
	mobile = !!mobile;

	if (template === undefined)
		template = 'standart';

	if (BXRLParams.pathToUserProfile)
	{
		pathToUserProfile = BXRLParams.pathToUserProfile;
	}

	if (!BXRL[likeId] || BXRL[likeId].tryToSet <= 5)
	{
		var tryToSend = BXRL[likeId] && BXRL[likeId].tryToSet? BXRL[likeId].tryToSet: 1;
		BXRL[likeId] = new RatingLike(likeId, entityTypeId, entityId, available, userId, localize, template, pathToUserProfile, pathToAjax);
		if (BXRL[likeId].enabled)
		{
			RatingLike.Init(likeId, {
				mobile: mobile
			});
		}
		else
		{
			setTimeout(function(){
				BXRL[likeId].tryToSet = tryToSend+1;
				RatingLike.Set(likeId, entityTypeId, entityId, available, userId, localize, template, pathToUserProfile, pathToAjax, mobile);
			}, 500);
		}
	}
};

RatingLike.ClickVote = function(likeId, userReaction, forceAdd)
{
	var
		cont = null,
		likeNode = null,
		likeThumbNode = null;

	if (typeof userReaction == 'undefined')
	{
		userReaction = 'like';
	}

	if (
		BXRL[likeId].version == 2
		&& BXRL[likeId].userReactionNode
	)
	{
		BXRL.render.hideReactionsPopup({
			likeId: likeId
		});
		BXRL.render.blockReactionsPopup();
		BX.unbind(document, 'mousemove', BXRL.render.reactionsPopupMouseOutHandler);
	}

	clearTimeout(BXRL[likeId].likeTimeout);

	var active = (
		BX.hasClass(
			(BXRL[likeId].template == 'standart' ? this : BXRL[likeId].count),
			'bx-you-like'
		)
	);

	forceAdd = !!forceAdd;
	var
		change = false,
		userReactionOld = false;

	if (active && !forceAdd)
	{
		userReaction = (
			BXRL[likeId].version == 2
				? BXRL.render.getUserReaction({
					userReactionNode: BXRL[likeId].userReactionNode
				})
				: false
		);

		BXRL[likeId].buttonText.innerHTML = BXRL[likeId].localize['LIKE_N'];
		BXRL[likeId].countText.innerHTML = parseInt(BXRL[likeId].countText.innerHTML)-1;
		BX.removeClass(BXRL[likeId].template == 'standart'? this: BXRL[likeId].count, 'bx-you-like');
		BX.removeClass(BXRL[likeId].button, 'bx-you-like-button');
		if (userReaction)
		{
			BX.removeClass(BXRL[likeId].button, 'bx-you-like-button-' + userReaction);
		}

		BXRL[likeId].likeTimeout = setTimeout(function() {
			if (BXRL[likeId].lastVote != 'cancel')
			{
				RatingLike.Vote(likeId, 'cancel', userReaction);
			}
		}, 1000);
	}
	else if (active && forceAdd)
	{
		change = true;
		userReactionOld = (
			BXRL[likeId].version == 2
				? BXRL.render.getUserReaction({
					userReactionNode: BXRL[likeId].userReactionNode
				})
				: false
		);

		if (userReaction != userReactionOld)
		{
			if (userReactionOld)
			{
				BX.removeClass(BXRL[likeId].button, 'bx-you-like-button-' + userReactionOld);
			}
			BX.addClass(BXRL[likeId].button, 'bx-you-like-button-' + userReaction);

			BXRL[likeId].likeTimeout = setTimeout(function(){
				RatingLike.Vote(likeId, 'change', userReaction, userReactionOld);
			}, 1000);
		}
	}
	else if (!active)
	{
		BXRL[likeId].buttonText.innerHTML = BXRL[likeId].localize['LIKE_Y'];
		BXRL[likeId].countText.innerHTML = parseInt(BXRL[likeId].countText.innerHTML) + 1;
		BX.addClass(BXRL[likeId].template == 'standart'? this: BXRL[likeId].count, 'bx-you-like');

		BX.addClass(BXRL[likeId].button, 'bx-you-like-button');
		BX.addClass(BXRL[likeId].button, 'bx-you-like-button-' + userReaction);

		BXRL[likeId].likeTimeout = setTimeout(function(){
			if (BXRL[likeId].lastVote != 'plus')
			{
				RatingLike.Vote(likeId, 'plus', userReaction);
			}
			else if (userReaction != BXRL[likeId].lastReaction) // http://jabber.bx/view.php?id=99339
			{
				RatingLike.Vote(likeId, 'change', userReaction, BXRL[likeId].lastReaction);
			}
		}, 1000);
	}

	if (BXRL[likeId].version == 2)
	{
		if (change)
		{
			BXRL.render.setReaction({
				likeId: likeId,
				rating: BXRL[likeId],
				action: 'change',
				userReaction: userReaction,
				userReactionOld: userReactionOld,
				totalCount: parseInt(BXRL[likeId].countText.innerHTML)
			});
		}
		else
		{
			BXRL.render.setReaction({
				likeId: likeId,
				rating: BXRL[likeId],
				action: (active ? 'cancel' : 'add'),
				userReaction: userReaction,
				totalCount: parseInt(BXRL[likeId].countText.innerHTML)
			});
		}
	}

	if (
		!change
		&& BXRL[likeId].version == 2
	)
	{
		var dataUsers = (
			BXRL[likeId].topUsersDataNode
				? JSON.parse(BXRL[likeId].topUsersDataNode.getAttribute('data-users'))
				: false
		);

		if (dataUsers)
		{
			dataUsers.TOP = Object.values(dataUsers.TOP);

			BXRL[likeId].topUsersText.innerHTML = BXRL.render.getTopUsersText({
				you: !active,
				top: dataUsers.TOP,
				more: dataUsers.MORE
			});
		}
	}

	if (
		BXRL[likeId].template == 'light'
		&& !BXRL[likeId].userReactionNode
	)
	{
		cont = BXRL[likeId].box;
		likeNode = cont.cloneNode(true);
		likeNode.id = 'like_anim'; // to not dublicate original id

		var type = 'normal';
		if (BX.findParent(cont, { 'className': 'feed-com-informers-bottom' }))
		{
			type = 'comment';
		}
		else if (BX.findParent(cont, { 'className': 'feed-post-informers' }))
		{
			type = 'post';
		}

		BX.removeClass(likeNode, 'bx-ilike-button-hover');
		BX.addClass(likeNode, 'bx-like-anim');

		BX.adjust(cont.parentNode, { style: { position: 'relative' } });

		BX.adjust(likeNode, {
			style: {
				position: 'absolute',
				whiteSpace: 'nowrap',
				top: (type == 'post' ? '1px' : (type == 'comment' ? '0' : ''))
			}
		});

		BX.adjust(cont, { style: { visibility: 'hidden' } });
		BX.prepend(likeNode, cont.parentNode);

		new BX.easing({
			duration: 140,
			start: { scale: 100 },
			finish: { scale: (type == 'comment' ? 110 : 115) },
			transition : BX.easing.transitions.quad,
			step: function(state) {
				likeNode.style.transform = "scale(" + state.scale / 100 + ")";
			},
			complete: function() {
				likeThumbNode = BX.create('SPAN', {
					props: {
						className: (active ? 'bx-ilike-icon' : 'bx-ilike-icon bx-ilike-icon-orange')
					}
				});

				BX.adjust(likeThumbNode, {
					style: {
						position: 'absolute',
						whiteSpace: 'nowrap'
					}
				});

				BX.prepend(likeThumbNode, cont.parentNode);

				new BX.easing({
					duration: 140,
					start: { scale: (type == 'comment' ? 110 : 115) },
					finish: { scale: 100 },
					transition : BX.easing.transitions.quad,
					step: function(state) {
						likeNode.style.transform = "scale(" + state.scale / 100 + ")";
					},
					complete: function() {
					}
				}).animate();

				var propsStart = { opacity: 100, scale: (type == 'comment' ? 110 : 115), top: 0 };
				var propsFinish = { opacity: 0, scale: 200, top: (type == 'comment' ? -3 : -2) };

				if (type != 'comment')
				{
					propsStart.left = -5;
					propsFinish.left = -13;
				}

				new BX.easing({
					duration: 200,
					start: propsStart,
					finish: propsFinish,
					transition : BX.easing.transitions.linear,
					step: function(state) {
						likeThumbNode.style.transform = "scale(" + state.scale / 100 + ")";
						likeThumbNode.style.opacity = state.opacity / 100;
						if (type != 'comment')
						{
							likeThumbNode.style.left = state.left + 'px';
						}
						likeThumbNode.style.top = state.top + 'px';
					},
					complete: function() {
						likeNode.parentNode.removeChild(likeNode);
						likeThumbNode.parentNode.removeChild(likeThumbNode);

						BX.adjust(cont.parentNode, { style: { position: 'static' } });
						BX.adjust(cont, { style: { visibility: 'visible' } });
					}
				}).animate();

			}
		}).animate();
	}

	BX.removeClass(this.box, 'bx-ilike-button-hover');
};

RatingLike.Init = function(likeId, params)
{
	if (typeof params == 'undefined')
	{
		params = {};
	}

	if (typeof BXRL.manager != 'undefined')
	{
		BXRL.manager.init(params);
	}

	// like/unlike button
	if (BXRL[likeId].available)
	{
		var eventNode = (
			BXRL[likeId].template == 'standart'
				? BXRL[likeId].button
				: BXRL[likeId].buttonText
		);

		if (
			BXRL[likeId].version >= 2
			&& BXRL.manager.mobile
		)
		{
			BX.bind(
				eventNode,
				'touchstart',
				BX.delegate(function(e) {
					BXRL.manager.startScrollTop = (
						(
							document.documentElement
							&& document.documentElement.scrollTop
						)
						|| document.body.scrollTop
					);
				})
			);
		}

		var eventName = (
			typeof BXRL.manager != 'undefined'
			&& BXRL.manager.mobile
				? 'touchend'
				: 'click'
		);

		BX.bind(
			eventNode,
			eventName,
			BX.delegate(function(e) {

				if (
					BXRL[likeId].version >= 2
					&& BXRL.manager.mobile
					&& BXRL.render.blockTouchEndByScroll
				)
				{
					BXRL.render.blockTouchEndByScroll = false;
					return;
				}

				if (
					BXRL[likeId].version < 2
					|| !BXRL.manager.mobile
					|| !BXRL.render.reactionsPopupLikeId
				)
				{
					if (
						BXRL[likeId].version >= 2
						&& BXRL.manager.mobile
					)
					{
						var currentScrollTop = (
							(
								document.documentElement
								&& document.documentElement.scrollTop
							)
							|| document.body.scrollTop
						);

						if (Math.abs(currentScrollTop - BXRL.manager.startScrollTop) > 2)
						{
							return;
						}
					}

					RatingLike.ClickVote(likeId);
				}

				if (BXRL[likeId].version == 2)
				{
					BXRL.render.afterClick({
						likeId: likeId
					});
				}

				e.preventDefault();
			}, this)
		);

		if (
			typeof BXRL.manager == 'undefined'
			|| !BXRL.manager.mobile
		)
		{
			// Hover/unHover like-button
			BX.bind(BXRL[likeId].box, 'mouseover', function() {BX.addClass(this, 'bx-ilike-button-hover')});
			BX.bind(BXRL[likeId].box, 'mouseout', function() {BX.removeClass(this, 'bx-ilike-button-hover')});
		}
		else
		{
			BXRL[likeId].pathToAjax = BX.message('SITE_DIR') + 'mobile/ajax.php?mobile_action=like';
			BX.bind(BXRL[likeId].topPanel, 'click', function(e) {
				BXRL.render.openMobileReactionsPage({
					entityTypeId: BXRL[likeId].entityTypeId,
					entityId: BXRL[likeId].entityId
				});
				e.stopPropagation();
			});
		}
	}
	else if (BXRL[likeId].buttonText != undefined)
	{
		BXRL[likeId].buttonText.innerHTML = BXRL[likeId].localize['LIKE_D'];
		BXRL[likeId].buttonText.classList.add('bx-ilike-text-unavailable');
	}
	// get like-user-list

	var clickShowPopupNode = (
		BXRL[likeId].topUsersText
			? BXRL[likeId].topUsersText
			: BXRL[likeId].count
	);

	if (
		typeof BXRL.manager == 'undefined'
		|| !BXRL.manager.mobile
	)
	{
		BX.bind(clickShowPopupNode, 'mouseenter', function(e)
		{
			RatingLike.onResultMouseEnter({
				likeId: likeId,
				event: e,
				nodeId: e.currentTarget.id
			});
		});

		BX.bind(clickShowPopupNode, 'mouseleave', BX.proxy(function()
		{
			RatingLike.onResultMouseLeave({
				likeId: likeId
			});
		}, { likeId: likeId }));
	}


	if (
		typeof BXRL.manager == 'undefined'
		|| !BXRL.manager.mobile
	)
	{
		BX.bind(clickShowPopupNode, 'click' , function(e)
		{
			RatingLike.onResultClick({
				likeId: likeId,
				event: e,
				nodeId: e.currentTarget.id
			});
		});
	}

	if (
		BXRL[likeId].version == 2
		&& BXRL[likeId].available
		&& BXRL[likeId].userReactionNode
	)
	{
		BXRL.render.bindReactionsPopup({
			likeId: likeId
		});
	}
};

RatingLike.onResultClick = function(params)
{
	var
		likeId = (BX.type.isNotEmptyString(params.likeId) ? params.likeId : false),
		clickEvent = (typeof params.event != 'undefined' ? params.event : null),
		reaction = (BX.type.isNotEmptyString(params.reaction) ? params.reaction : '');

	if (BXRL[likeId].resultPopupAnimation)
	{
		return;
	}

	if (
		BXRL[likeId].popup
		&& BXRL[likeId].popup.isShown()
	)
	{
		BXRL[likeId].popup.close();
	}
	else
	{
		clearTimeout(BXRL[likeId].popupTimeoutIdList);
		clearTimeout(BXRL[likeId].popupTimeoutIdShow);

		if (
			BXRL[likeId].popupContentPage == 1
			&& (
				clickEvent.currentTarget.getAttribute('data-popup') != 'Y'
				|| BXRL[likeId].popupCurrentReaction != reaction
			)
		)
		{
			RatingLike.List(likeId, 1, reaction, true);
		}
		RatingLike.OpenWindow(
			likeId,
			(clickEvent.currentTarget == BXRL[likeId].count ? null : clickEvent),
			clickEvent.currentTarget,
			clickEvent.currentTarget.id
		);
	}
};

RatingLike.onResultMouseEnter = function(params)
{
	var
		likeId = (BX.type.isNotEmptyString(params.likeId) ? params.likeId : false),
		mouseEnterEvent = (typeof params.event != 'undefined' ? params.event : null),
		reaction = (BX.type.isNotEmptyString(params.reaction) ? params.reaction : ''),
		nodeId = (mouseEnterEvent && BX.type.isNotEmptyString(mouseEnterEvent.currentTarget.id) ? mouseEnterEvent.currentTarget.id : '');

	BXRL[likeId].mouseInShowPopupNode[reaction] = true;

	clearTimeout(BXRL[likeId].popupTimeoutIdList);
	clearTimeout(BXRL[likeId].popupTimeoutIdShow);

	BXRL[likeId].popupTimeoutIdList = setTimeout(BX.proxy(function() {

		if (BXRLW == this.likeId)
		{
			return false;
		}

		if (
			BXRL[this.likeId].popupContentPage == 1
			&& this.target.getAttribute('data-popup') != 'Y'
		)
		{
			RatingLike.List(this.likeId, 1, this.reaction, true);
		}

		BXRL[this.likeId].popupTimeoutIdShow = setTimeout(BX.proxy(function() {

			BXRL[this._likeId].resultPopupAnimation = true;

			var _likeId = this._likeId;
			setTimeout(function() {
				BXRL[_likeId].resultPopupAnimation = false;
			}, 500);

			if (BXRL[this._likeId].mouseInShowPopupNode[this._reaction])
			{
				RatingLike.OpenWindow(
					this._likeId,
					null,
					this._target,
					this._nodeId
				);
			}
		}, {
			_likeId: this.likeId,
			_reaction: this.reaction,
			_target: this.target,
			_nodeId: this.nodeId
		}), 100);
	}, {
		likeId: likeId,
		target: mouseEnterEvent.currentTarget,
		reaction: reaction,
		nodeId: nodeId
	}), 300);
};

RatingLike.onResultMouseLeave = function(params) {

	var
		likeId = (BX.type.isNotEmptyString(params.likeId) ? params.likeId : false),
		reaction = (BX.type.isNotEmptyString(params.reaction) ? params.reaction : '');

	BXRL[likeId].mouseInShowPopupNode[reaction] = false;
	BXRL[likeId].resultPopupAnimation = false;
};

RatingLike.OpenWindow = function(likeId, clickEvent, target, targetId)
{
	if (parseInt(BXRL[likeId].countText.innerHTML) == 0)
	{
		return;
	}

	var bindNode = (
		BXRL[likeId].template == 'standart'
			? BXRL[likeId].count
			: (
				BXRL[likeId].version == 2
					? (
						BX(target)
						? BX(target)
						: (BX.type.isNotEmptyString(targetId) && BX(targetId) ? BX(targetId): null)
					)
					: BXRL[likeId].box
			)
	);

	if (!BX(bindNode))
	{
		return;
	}

	if (BXRL[likeId].popup == null)
	{
		var globalZIndex = RatingLike.getGlobalIndex(BX(bindNode));
		BXRL[likeId].popup = new BX.PopupWindow('ilike-popup-'+likeId, bindNode, {
			lightShadow : true,
			offsetTop: 0,
			offsetLeft: (
				typeof clickEvent != 'undefined'
				&& clickEvent != null
				&& typeof clickEvent.offsetX != 'undefined'
					? (clickEvent.offsetX - 100)
					: (BXRL[likeId].version == 2 ? -30 : 5)
			),
			autoHide: true,
			closeByEsc: true,
			zIndexAbsolute: (globalZIndex > 1000 ? globalZIndex + 1 : 1000),
			bindOptions: { position: "top" },
			animation: "fading-slide",
			events : {
				onPopupClose : function() { BXRLW = null; },
				onPopupDestroy : function() {  }
			},
			content : BX('bx-ilike-popup-cont-'+likeId),
			className: (BXRL[likeId].topPanel ? 'bx-ilike-wrap-block-react-wrap' : '') + (typeof BXRL.manager != 'undefined' && BXRL.manager.mobile ? ' bx-ilike-mobile-wrap' : '')
		});

		if (
			!BXRL[likeId].topPanel
			&& (
				typeof BXRL.manager == 'undefined'
				|| !BXRL.manager.mobile
			)
		)
		{
			BXRL[likeId].popup.setAngle({});

			BX.bind(BX('ilike-popup-'+likeId), 'mouseout' , function() {
				clearTimeout(BXRL[likeId].popupTimeout);
				BXRL[likeId].popupTimeout = setTimeout(function(){
					BXRL[likeId].popup.close();
				}, 1000);
			});

			BX.bind(BX('ilike-popup-'+likeId), 'mouseover' , function() {
				clearTimeout(BXRL[likeId].popupTimeout);
			});
		}
	}
	else
	{
		if (
			typeof clickEvent != 'undefined'
			&& clickEvent != null
			&& typeof clickEvent.offsetX != 'undefined'
		)
		{
			BXRL[likeId].popup.offsetLeft = (clickEvent.offsetX - 100);
		}

		if (BX(bindNode))
		{
			BXRL[likeId].popup.setBindElement(bindNode);
		}
	}


	if (
		BXRLW != null
		&& BXRLW != likeId
	)
	{
		BXRL[BXRLW].popup.close();
	}

	BXRLW = likeId;

	BXRL[likeId].popup.show();

	if (
		typeof BX.SidePanel != 'undefined'
		&& BX.SidePanel.Instance.getTopSlider()
	)
	{
		BX.addCustomEvent(
			BX.SidePanel.Instance.getTopSlider().getWindow(),
			"SidePanel.Slider:onClose",
			function removeOnCloseHandler()
			{
				BX.removeCustomEvent(BX.SidePanel.Instance.getTopSlider().getWindow(), "SidePanel.Slider:onClose", removeOnCloseHandler);
				if (typeof BXRL[BXRLW] != 'undefined')
				{
					BXRL[BXRLW].popup.close();
				}
			}
		);
	}

	RatingLike.AdjustWindow(likeId);
};

RatingLike.getGlobalIndex = function(element)
{
	var index = 0,
		propertyValue = "";

	do
	{
		propertyValue = BX.style(element, "z-index");
		if (propertyValue !== "auto")
		{
			index = BX.type.stringToInt(propertyValue);
		}
		element = element.offsetParent;
	}
	while (
		element && element.tagName !== "BODY"
	);

	return index;
};

RatingLike.Vote = function(likeId, voteAction, voteReaction, voteReactionOld)
{
	if (!BX.type.isNotEmptyString(voteReaction))
	{
		voteReaction = 'like';
	}

	var BMAjaxWrapper = null;

	if (
		typeof BXRL.manager != 'undefined'
		&& BXRL.manager.mobile
	)
	{
		BMAjaxWrapper = new MobileAjaxWrapper;
	}

	var
		f = (BMAjaxWrapper ? BX.proxy(BMAjaxWrapper.Wrap, BMAjaxWrapper) : BX.ajax),
		callbackSuccessName = (BMAjaxWrapper ? 'callback' : 'onsuccess'),
		callbackFailureName = (BMAjaxWrapper ? 'callback_failure' : 'onfailure');

	var actionUrl = BXRL[likeId].pathToAjax;
	actionUrl = BX.util.add_url_param(actionUrl, {
		b24statAction: 'addLike'
	});

	if (
		BXRL[likeId].version >= 2
		&& BXRL.manager.mobile
	)
	{
		actionUrl = BX.util.add_url_param(actionUrl, {
			b24statContext: 'mobile'
		});
	}

	var ajaxProperties = {
		url: actionUrl,
		method: 'POST',
		dataType: 'json',
		type: 'json',
		data: {
			RATING_VOTE : 'Y',
			RATING_VOTE_TYPE_ID : BXRL[likeId].entityTypeId,
			RATING_VOTE_ENTITY_ID : BXRL[likeId].entityId,
			RATING_VOTE_ACTION : voteAction,
			RATING_VOTE_REACTION : voteReaction,
			sessid: BX.bitrix_sessid()
		}
	};

	ajaxProperties[callbackSuccessName] = function(data) {
		BXRL[likeId].lastVote = data.action;
		BXRL[likeId].lastReaction = voteReaction;

		lastVoteRepo[BXRL[likeId].entityTypeId + '_' + BXRL[likeId].entityId] = data.action;
		lastReactionRepo[BXRL[likeId].entityTypeId + '_' + BXRL[likeId].entityId] = data.voteReaction;

		BXRL[likeId].countText.innerHTML = data.items_all;
		BXRL[likeId].popupContentPage = 1;

		BXRL[likeId].popupContent.innerHTML = '';
		spanTag0 = document.createElement("span");
		spanTag0.className = "bx-ilike-wait";
		BXRL[likeId].popupContent.appendChild(spanTag0);

		if (BXRL[likeId].topPanel)
		{
			BXRL[likeId].topPanel.setAttribute('data-popup', 'N');
		}

		RatingLike.AdjustWindow(likeId);

		if(
			BX('ilike-popup-'+likeId)
			&& BX('ilike-popup-'+likeId).style.display == "block"
		)
		{
			RatingLike.List(likeId, null, '', true);
		}

		if (
			BXRL[likeId].version >= 2
			&& BXRL.manager.mobile
		)
		{
			BXMobileApp.onCustomEvent('onRatingLike', {
				action: data.action,
				ratingId: likeId,
				entityTypeId : BXRL[likeId].entityTypeId,
				entityId: BXRL[likeId].entityId,
				voteAction: voteAction,
				voteReaction: voteReaction,
				voteReactionOld: voteReactionOld,
				userId: BX.message('USER_ID'),
				userData: (typeof data.user_data != 'undefined' ? data.user_data : null),
				itemsAll: data.items_all
			}, true);
		}
	};

	ajaxProperties[callbackFailureName] = function(data) {

		var dataUsers = ((BXRL[likeId].topUsersDataNode)
				? JSON.parse(BXRL[likeId].topUsersDataNode.getAttribute('data-users'))
				: false
		);

		if (BXRL[likeId].version == 2)
		{
			if (voteAction == 'change')
			{
				BXRL.render.setReaction({
					likeId: likeId,
					rating: BXRL[likeId],
					action: voteAction,
					userReaction: voteReaction,
					userReactionOld: voteReactionOld,
					totalCount: parseInt(BXRL[likeId].countText.innerHTML)
				});
			}
			else
			{
				BXRL.render.setReaction({
					likeId: likeId,
					rating: BXRL[likeId],
					action: (voteAction == 'cancel' ? 'add' : 'cancel'),
					userReaction: voteReaction,
					totalCount: (
						voteAction == 'cancel'
							? parseInt(BXRL[likeId].countText.innerHTML) + 1
							: parseInt(BXRL[likeId].countText.innerHTML) - 1
					)
				});
			}

			if (BXRL[likeId].buttonText)
			{
				if (voteAction == 'add')
				{
					BXRL[likeId].buttonText.innerHTML = BX.message('RATING_LIKE_EMOTION_LIKE_CALC');
				}
				else if (voteAction == 'change')
				{
					BXRL[likeId].buttonText.innerHTML = BX.message('RATING_LIKE_EMOTION_' + voteReactionOld.toUpperCase() + '_CALC');
				}
				else
				{
					BXRL[likeId].buttonText.innerHTML = BX.message('RATING_LIKE_EMOTION_' + voteReaction.toUpperCase() + '_CALC');
				}
			}
		}

		if (
			dataUsers
			&& voteAction != 'change'
			&& BXRL[likeId].version == 2
		)
		{
			dataUsers.TOP = Object.values(dataUsers.TOP);

			BXRL[likeId].topUsersText.innerHTML = BXRL.render.getTopUsersText({
				you: (voteAction == 'cancel'), // negative
				top: dataUsers.TOP,
				more: dataUsers.MORE
			});
		}
	};

	f(ajaxProperties);

	return false;
};

RatingLike.List = function(likeId, page, reaction, clear)
{
	if (parseInt(BXRL[likeId].countText.innerHTML) == 0)
	{
		return false;
	}

	reaction = (BX.type.isNotEmptyString(reaction) ? reaction : '');

	if (page == null)
	{
		page = (
			BXRL[likeId].version == 2
				? (typeof BXRL.render.popupPagesList[reaction] != 'undefined' ? BXRL.render.popupPagesList[reaction] : 1)
				: BXRL[likeId].popupContentPage
		);
	}

	if (
		clear
		&& page == 1
		&& BXRL[likeId].version == 2
	)
	{
		BXRL.render.clearPopupContent({
			likeId: likeId
		});
	}

	if (BXRL[likeId].listXHR)
	{
		BXRL[likeId].listXHR.abort();
	}

	BXRL[likeId].listXHR = BX.ajax({
		url: BXRL[likeId].pathToAjax,
		method: 'POST',
		dataType: 'json',
		data: {
			RATING_VOTE_LIST : 'Y',
			RATING_VOTE_TYPE_ID : BXRL[likeId].entityTypeId,
			RATING_VOTE_ENTITY_ID : BXRL[likeId].entityId,
			RATING_VOTE_LIST_PAGE : page,
			RATING_VOTE_REACTION : (reaction == 'all' ? '' : reaction),
			PATH_TO_USER_PROFILE : BXRL[likeId].pathToUserProfile,
			sessid: BX.bitrix_sessid()
		},
		onsuccess: function(data)
		{
			if (!data)
			{
				return false;
			}

			BXRL[likeId].countText.innerHTML = data.items_all;

			if (parseInt(data.items_page) == 0)
			{
				return false;
			}

			if (BXRL[likeId].version == 2)
			{
				BXRL.render.buildPopupContent({
					likeId: likeId,
					reaction: reaction,
					rating: BXRL[likeId],
					page: page,
					data: data,
					clear: clear
				});
				BXRL[likeId].topPanel.setAttribute('data-popup', 'Y');
			}
			else
			{
				if (page == 1)
				{
					BXRL[likeId].popupContent.innerHTML = '';
					spanTag0 = document.createElement("span");
					spanTag0.className = "bx-ilike-bottom_scroll";
					BXRL[likeId].popupContent.appendChild(spanTag0);
				}
				BXRL[likeId].popupContentPage += 1;

				var avatarNode = null;

				for (var i = 0; i < data.items.length; i++)
				{
					if (data.items[i]['PHOTO_SRC'].length > 0)
					{
						avatarNode = BX.create("IMG", {
							attrs: {src: data.items[i]['PHOTO_SRC']},
							props: {className: "bx-ilike-popup-avatar-img"}
						});
					}
					else
					{
						avatarNode = BX.create("IMG", {
							attrs: {src: 'bitrix/images/main/blank.gif'},
							props: {className: "bx-ilike-popup-avatar-img bx-ilike-popup-avatar-img-default"}
						});
					}

					BXRL[likeId].popupContent.appendChild(
						BX.create("A", {
							attrs: {
								href: data.items[i]['URL'],
								target: '_blank'
							},
							props: {
								className: "bx-ilike-popup-img" + (!!data.items[i]['USER_TYPE'] ? " bx-ilike-popup-img-" + data.items[i]['USER_TYPE'] : "")
							},
							children: [
								BX.create("SPAN", {
									props: {
										className: "bx-ilike-popup-avatar-new"
									},
									children: [
										avatarNode,
										BX.create("SPAN", {
											props: {className: "bx-ilike-popup-avatar-status-icon"}
										})
									]
								}),
								BX.create("SPAN", {
									props: {
										className: "bx-ilike-popup-name-new"
									},
									html: data.items[i]['FULL_NAME']
								})
							]
						})
					);
				}
			}

			RatingLike.AdjustWindow(likeId);
			RatingLike.PopupScroll(likeId);
		},
		onfailure: function(data) {}
	});
	return false;
};

RatingLike.AdjustWindow = function(likeId)
{
	if (BXRL[likeId].popup != null)
	{
		BXRL[likeId].popup.bindOptions.forceBindPosition = true;
		BXRL[likeId].popup.adjustPosition();
		BXRL[likeId].popup.bindOptions.forceBindPosition = false;
	}
};

RatingLike.PopupScroll = function(likeId)
{
	var contentContainerNodeList = BX.findChildren(BXRL[likeId].popupContent, { className: 'bx-ilike-popup-content' }, true); // reactions
	if (contentContainerNodeList.length <= 0)
	{
		contentContainerNodeList = [ BXRL[likeId].popupContent ];
	}

	var contentContainerNode = null;

	for (var i = 0; i < contentContainerNodeList.length; i++)
	{
		contentContainerNode = contentContainerNodeList[i];

		BX.bind(contentContainerNode, 'scroll' , function() {
			if (this.scrollTop > (this.scrollHeight - this.offsetHeight) / 1.5)
			{
				RatingLike.List(likeId, null, (BXRL[likeId].version == 2 ? BXRL.render.popupCurrentReaction : false));
				BX.unbindAll(this);
			}
		});
	}
};

RatingLike.setParams = function(params)
{
	if (typeof params != 'undefined')
	{
		if (typeof params.pathToUserProfile != 'undefined')
		{
			BXRLParams.pathToUserProfile = params.pathToUserProfile;
		}
	}
};


/* End */
;
; /* Start:"a:4:{s:4:"full";s:52:"/bitrix/js/main/core/core_autosave.js?16424207109741";s:6:"source";s:37:"/bitrix/js/main/core/core_autosave.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(window){
	var topWindow = BX.PageObject.getRootWindow();
if (BX.CAutoSave && topWindow.BX.CAutoSave) return;
/******************************* AUTOSAVE *********************************/

BX.CAutoSave = function(params)
{
	this.FORM_NAME = params.form;
	this.FORM_MARKER = params.form_marker;
	this.FORM_ID = params.form_id;

	this.PERIOD = params.period || [4001, 20990];

	this.RESTORE_DATA = null;
	this.TIMERS = [null, null];

	this.bInited = false;
	this.bRestoreInProgress = false;

	this.DISABLE_STANDARD_NOTIFY = params.DISABLE_STANDARD_NOTIFY;
	this.NOTIFY_CONTEXT = null;

	BX.ready(BX.defer(this.Prepare, this));
	BX.garbage(BX.delegate(this.Clear, this));

	if (
		BX.type.isNotEmptyString(this.FORM_MARKER)
		&& BX(this.FORM_MARKER)
	)
	{
		var formMarker = BX(this.FORM_MARKER);
		if (
			BX(formMarker.form)
			&& BX.type.isNotEmptyString(formMarker.form.name)
		)
		{
			BX.addCustomEvent(topWindow, 'onExtAutoSaveReset_' + formMarker.form.name, BX.proxy(this.Reset, this));
		}
	}
};

BX.CAutoSave.prototype.Prepare = function()
{
	var i;

	if (this.FORM_NAME && BX.type.isString(this.FORM_NAME))
		this.FORM = document.forms[this.FORM_NAME];
	else if (this.FORM_MARKER && BX.type.isString(this.FORM_MARKER))
		this.FORM = (BX(this.FORM_MARKER)||{form:null}).form;

	if (!BX.type.isDomNode(this.FORM))
		return;

	this.FORM.BXAUTOSAVE = this;
	BX.bind(this.FORM, 'submit', BX.proxy(this.ClearTimers, this));

	for (i=0; i<this.FORM.elements.length; i++)
	{
		this.RegisterInput(this.FORM.elements[i]);
	}

	setTimeout(BX.delegate(this._PrepareAfter, this), 10);
};

BX.CAutoSave.prototype.RegisterInput = function(inp)
{
	if (BX.type.isString(inp))
	{
		setTimeout(BX.delegate(function(){this.RegisterInput(this.FORM[inp] || BX(inp))}, this), 10);
	}
	else if (BX.type.isDomNode(inp))
	{
		if (
			inp.type != 'button'
			&& inp.type != 'submit'
			&& inp.type != 'reset'
			&& inp.type != 'image'
			&& inp.type != 'hidden'
		)
		{
			BX.bind(inp, 'change', BX.proxy(this.Init, this));

			if (inp.type == 'text' || inp.type == 'textarea')
			{
				BX.bind(inp, 'keyup', BX.proxy(this.Init, this));
			}

			if (inp.type == 'checkbox' || inp.type == 'radio')
			{
				BX.bind(inp, 'click', BX.proxy(this.Init, this));
			}
		}
	}
};

BX.CAutoSave.prototype.UnRegisterInput = function(inp)
{
	if (BX.type.isString(inp))
		inp = this.FORM[inp] || BX(inp);
	if (BX.type.isDomNode(inp))
	{
		BX.unbind(inp, 'change', BX.proxy(this.Init, this));
		BX.unbind(inp, 'keyup', BX.proxy(this.Init, this));
		BX.unbind(inp, 'click', BX.proxy(this.Init, this));
	}
};

BX.CAutoSave.prototype._PrepareAfter = function()
{
	// we can set other "target events" here
	BX.onCustomEvent(this.FORM, 'onAutoSavePrepare', [this, BX.proxy(this.Init, this)]);

	if (this.RESTORE_DATA)
	{
		var id = this.FORM.name || Math.random();
		BX.removeCustomEvent('onExtAutoSaveRestoreClick_' + id, BX.proxy(this.Restore, this));
		BX.addCustomEvent('onExtAutoSaveRestoreClick_' + id, BX.proxy(this.Restore, this));

		var o = this._NotifyContext();
		if (o)
		{
			o.Notify(
				BX.message('AUTOSAVE') + ' <a href="javascript:void(0)" onclick="BX.CAutoSave.Restore(\'' + BX.util.urlencode(id) + '\', this); return false;">' +	BX.message('AUTOSAVE_R') + '</a>',
				false,
				true
			);
		}

		// may be useful sometimes
		BX.onCustomEvent(this.FORM, 'onAutoSaveRestoreFound', [this, this.RESTORE_DATA]);
	}
};

BX.CAutoSave.prototype.Init = function()
{
	// if (this.bRestoreInProgress)
		// return;

	if (this.TIMERS[0])
	{
		clearTimeout(this.TIMERS[0]);
		this.TIMERS[0] = null;
	}

	this.TIMERS[0] = setTimeout(BX.proxy(this.TimerHandler, this), this.PERIOD[0]);

	if (!this.TIMERS[1])
	{
		this.TIMERS[1] = setInterval(BX.proxy(this.Save, this), this.PERIOD[1]);
	}

	// may also be useful
	BX.onCustomEvent(this.FORM, 'onAutoSaveInit', [this]);

	return true;
};

BX.CAutoSave.prototype.TimerHandler = function()
{
	if (this.TIMERS[1])
	{
		clearInterval(this.TIMERS[1]);
		this.TIMERS[1] = null;
	}
	this.Save();
};

BX.CAutoSave.prototype.Save = function()
{
	if (this.FORM && BX.isNodeInDom(this.FORM))
	{
		var i, j, el, data = {autosave_id: this.FORM_ID, form_data: {}};

		for (i=0; i<this.FORM.elements.length; i++)
		{
			el = this.FORM.elements[i];

			if (el.name && el.name != 'sessid' && el.name != 'lang' && el.name != 'autosave_id')
			{
				var n = el.name, v = '', t = el.type.toLowerCase();

				switch (t)
				{
					case 'button':
					case 'submit':
					case 'reset':
					case 'image':
					case 'file':
					case 'password':
						break;

					case 'radio':
					case 'checkbox':
						if (el.checked)
							v = el.value || 'on';
					break;

					case 'select-multiple':
						n = n.substring(0, n.length-2);
						v = [];
						for (j=0;j<el.options.length;j++)
						{
							if (el.options[j].selected)
							{
								v.push(el.options[j].value);
							}
						}
					break;

					default:
						v = el.value;
				}

				if (n.indexOf('[]') > 0)
				{
					n = _encodeName(n);
					if (typeof(data.form_data[n]) == 'undefined')
						data.form_data[n] = [v];
					else
						data.form_data[n].push(v);
				}
				else
					data.form_data[_encodeName(n)] = v;
			}
		}

		// we can adjust form_data before autosaving
		BX.onCustomEvent(this.FORM, 'onAutoSave', [this, data.form_data]);
		BX.ajax.post(
			'/bitrix/tools/autosave.php?bxsender=core_autosave&sessid=' + BX.bitrix_sessid(), data, BX.proxy(this._Save, this)
		);
	}
	else
	{
		this.Clear();
	}
};

BX.CAutoSave.prototype.Reset = function()
{
	if (this.FORM && BX.isNodeInDom(this.FORM))
	{
		BX.ajax.post(
			'/bitrix/tools/autosave.php?bxsender=core_autosave&action=reset&sessid=' + BX.bitrix_sessid(), {autosave_id: this.FORM_ID }, null
		);
	}
};

BX.CAutoSave.prototype._Save = function(data)
{
	BX.onCustomEvent(this.FORM, 'onAutoSaveFinished', [this, data]);
};

BX.CAutoSave.prototype.Restore = function(data, clicker)
{
	if (data)
	{
		this.RESTORE_DATA = _decodeData(data);
	}
	else if (this.FORM && this.RESTORE_DATA)
	{
		// we can change restore data or make some unusual actions here
		BX.onCustomEvent(this.FORM, 'onAutoSaveRestore', [this, this.RESTORE_DATA]);

		this.bRestoreInProgress = true;

		for (var i=0; i<this.FORM.elements.length; i++)
		{
			var el = this.FORM.elements[i];
			if (el && BX.type.isDomNode(el) && el.name)
			{
				var value = undefined, n = el.name;

				if (el.type == 'select-multiple')
					n = el.name.substring(0, el.name.length-2);

				value = this.RESTORE_DATA[n];

				if (n.indexOf('[]') > 0 && BX.type.isArray(value))
					value = this.RESTORE_DATA[n].shift();

				if (el.type != 'checkbox' && typeof value == 'undefined')
					continue;

				var bChange = false;

				switch(el.type)
				{
					case 'radio':
						if (!el.checked && !!(value == el.value))
						{
							bChange = true;
							BX.fireEvent(el, 'click');
						}
					break;
					case 'checkbox':
						if (el.checked != !!(value == el.value))
						{
							bChange = true;
							BX.fireEvent(el, 'click');
						}
					break;

					case 'select-one':
						for (var j = 0; j < el.options.length; j++)
						{
							var q = el.options[j].selected;
							el.options[j].selected = !!(value == el.options[j].value);
							bChange |= el.options[j].selected != q;
						}

						break;

					case 'select-multiple':
						value = this.RESTORE_DATA[el.name.substring(0, el.name.length-2)];
						for (j = 0; j < el.options.length; j++)
						{
							q = el.options[j].selected;
							el.options[j].selected = !!(BX.type.isArray(value) && BX.util.in_array(el.options[j].value, value));
							bChange |= el.options[j].selected != q;
						}
						break;

					case 'file':
					case 'button':
					case 'image':
					case 'submit':
					case 'reset':
					case 'password':
						break;

					default:
						bChange = value != el.value;
						el.value = value;
				}

				if (bChange)
					BX.fireEvent(el, 'change');
			}
		}

		var o = this._NotifyContext();
		if (o)
			o.hideNotify(clicker.parentNode.parentNode);

		this.bRestoreInProgress = false;

		BX.onCustomEvent(this.FORM, 'onAutoSaveRestoreFinished', [this, this.RESTORE_DATA]);
	}
};

BX.CAutoSave.prototype._NotifyContext = function()
{
	var o = null;

	if (!this.DISABLE_STANDARD_NOTIFY)
	{
		if (this.NOTIFY_CONTEXT)
			o = this.NOTIFY_CONTEXT;
		else if (BX.WindowManager && BX.WindowManager.Get())
			o = BX.WindowManager.Get();
		else if (BX.adminPanel)
			o = BX.adminPanel;
		else if (BX.admin && BX.admin.panel)
			o = BX.admin.panel;

		this.NOTIFY_CONTEXT = o;
	}

	return o;
};

BX.CAutoSave.prototype.ClearTimers = function()
{
	if (this.TIMERS)
	{
		clearTimeout(this.TIMERS[0]);
		clearInterval(this.TIMERS[1]);
	}
};

BX.CAutoSave.prototype.Clear = function()
{
	if (this.FORM)
	{
		this.FORM.BXAUTOSAVE = null;

		for (var i=0; i<this.FORM.elements.length; i++)
		{
			this.UnRegisterInput(this.FORM.elements[i]);
		}
	}

	this.ClearTimers();

	// we should unset any additional "target events" here
	BX.onCustomEvent(this.FORM, 'onAutoSaveClear', [this]);

	this.FORM = null;
	this.TIMERS = null;
};

BX.CAutoSave.Restore = function(id, el)
{
	BX.onCustomEvent('onExtAutoSaveRestoreClick_' + id, [null, el]);
};

function _encodeName(n)
{
	var q;
	while (q = /[^a-zA-Z0-9_\-]/.exec(n))
	{
		n = n.replace(q[0], 'X' + BX.util.str_pad_left(q[0].charCodeAt(0).toString(), 6, '0') + 'X');
	}
	return n;
}

function _decodeName(n)
{
	var q;
	while (q = /X[\d]{6}X/.exec(n))
	{
		n = n.replace(q[0], String.fromCharCode(parseInt(q[0].replace(/(^X[0]*)|(X$)/g, ''))))
	}
	return n;
}

function _decodeData(data)
{
	var d = {};
	for (var i in data)
	{
		d[_decodeName(i)] = data[i];
	}
	return d;
}
	topWindow.BX.CAutoSave = BX.CAutoSave;
})(window);


/* End */
;
; /* Start:"a:4:{s:4:"full";s:46:"/bitrix/js/main/core/core_dd.js?16424207103613";s:6:"source";s:31:"/bitrix/js/main/core/core_dd.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(window){
BX.DD = function(params)
{
	return new BX.DD.dragdrop(params);
}

BX.DD.allowSelection = function()
{
	document.onmousedown = null;
	var b = document.body;
	b.ondrag = null;
	b.onselectstart = null;
	b.style.MozUserSelect = '';
	
	// if (jsDD.current_node)
	// {
		// jsDD.current_node.ondrag = null;
		// jsDD.current_node.onselectstart = null;
		// jsDD.current_node.style.MozUserSelect = '';
	// }
}
	
BX.DD.denySelection = function()
{
	document.onmousedown = BX.False;
	var b = document.body;
	b.ondrag = BX.False;
	b.onselectstart = BX.False;
	b.style.MozUserSelect = 'none';
	// if (jsDD.current_node) 
	// {
		// jsDD.current_node.ondrag = jsUtils.False;
		// jsDD.current_node.onselectstart = jsUtils.False;
		// jsDD.current_node.style.MozUserSelect = 'none';
	// }
}

BX.DD.dragdrop = function(params)
{


}

/*
 * BX.DD.dropFiles - for html5 drag and drop files
 *
 * example:
 *
 * BX(function() {
 *	  var dropBoxNode = BX('WebDAV23');
 *    var dropbox = new BX.DD.dropFiles(dropBoxNode);
 *    if (dropbox && dropbox.supported())
 *    {
 *        BX.addCustomEvent(dropbox, 'dropFiles', function(files) { WDUploadDroppedFiles(files);});
 *        BX.addCustomEvent(dropbox, 'dragEnter', function() {BX.addClass( dropBoxNode, 'droptarget');});
 *        BX.addCustomEvent(dropbox, 'dragLeave', function() {BX.removeClass( dropBoxNode, 'droptarget');});
 *    }
 * });
 *
 * to save files use BX.ajax.FormData
 */
BX.DD.dropFiles = function(div)
{
	if (BX.type.isElementNode(div)
		&& this.supported())
	{
		div.setAttribute('dropzone', 'copy f:*/*');
		this.DIV = div;
		this._timer = null;
		this._initEvents();

		this._cancelLeave = function()
		{
			if (this._timer != null)
			{
				clearTimeout(this._timer);
				this._timer = null;
			}
		}
		this._prepareLeave = function()
		{
			this._cancelLeave();
			this._timer = setTimeout( BX.delegate(function() {
				BX.onCustomEvent(this, 'dragLeave')
			}, this), 100);
		}

		return this;
	}
	return false;
}

BX.DD.dropFiles.prototype._initEvents = function()
{
	BX.bind(this.DIV, 'dragover', BX.proxy(this._dragOver, this));
	BX.bind(this.DIV, 'dragenter', BX.proxy(this._dragEnter, this));
	BX.bind(this.DIV, 'dragleave', BX.proxy(this._dragLeave, this));
	BX.bind(this.DIV, 'dragexit', BX.proxy(this._dragExit, this));
	BX.bind(this.DIV, 'drop', BX.proxy(this._drop, this));
}

BX.DD.dropFiles.prototype._dragEnter = function(e)
{
	BX.PreventDefault(e);
	this._cancelLeave();
	BX.onCustomEvent(this, 'dragEnter', [e]);
	return true;
}

BX.DD.dropFiles.prototype._dragExit = function(e)
{
	BX.PreventDefault(e);
	this._prepareLeave();
	return false;
}


BX.DD.dropFiles.prototype._dragLeave = function(e)
{
	BX.PreventDefault(e);
	this._prepareLeave();
	return false;
}

BX.DD.dropFiles.prototype._dragOver = function(e)
{
	BX.PreventDefault(e);
	this._cancelLeave();
	return true;
}

BX.DD.dropFiles.prototype._drop = function(e)
{
	BX.PreventDefault(e);
	var dt = e.dataTransfer;
	var files = dt.files;
	BX.onCustomEvent(this, 'dropFiles', [files, e]);
	BX.onCustomEvent(this, 'dragLeave')
	return false;
}

BX.DD.dropFiles.prototype.isEventSupported = function(event)
{
	var div = BX.create('DIV');
	var eventName = 'on'+event;
	var result = (eventName in div);
	
	if (!result && div.setAttribute && div.removeAttribute)
	{
		div.setAttribute(eventName, '');
		result = (typeof div[eventName] === 'function');
	}

	div = null;
	return result;
}

BX.DD.dropFiles.prototype.supported = function()
{
	return ( (!!window.FileReader) && this.isEventSupported('dragstart') && this.isEventSupported('drop') );
}

})(window)


/* End */
;
; /* Start:"a:4:{s:4:"full";s:49:"/bitrix/js/main/core/core_timer.js?16424207106316";s:6:"source";s:34:"/bitrix/js/main/core/core_timer.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(window){
if (window.BX.timer) return;

var timers = [],
	timeout = 200,
	obTimer = null,
	last_index = 0;

BX.timer = function(container, params)
{
	params = params || {};
	if (BX.type.isString(container) || BX.type.isElementNode(container))
		params.container = container;
	else if (typeof (container) == "object")
		params = container;

	if (!params.container)
		return false;

	var ob = new BX.CTimer(params);
	BX.timer.start(ob);

	if (null == obTimer)
	{
		obTimer = setInterval(_RunTimer, timeout);
		BX.garbage(BX.timer.clear);
	}

	return ob;
}

BX.timer.stop = function(timer)
{
	timers[timer.TIMER_INDEX] = null;
}

BX.timer.start = function(timer)
{
	timer.TIMER_INDEX = last_index;
	timers[last_index++] = timer;
}

BX.timer.clock = function(cont, dt)
{
	return BX.timer({container: cont, dt: dt});
}

BX.timer.clear = function()
{
	clearInterval(obTimer);
	timers = null;
}

BX.timer.registerFormat = function(format_name, format_handler)
{
	BX.CTimer.prototype.formatValueHandlers[format_name] = format_handler
}

BX.timer.getHandler = function(format_name)
{
	return BX.CTimer.prototype.formatValueHandlers[format_name];
}

BX.CTimer = function(params, index)
{
	this.container = params.container;
	this.from = params.from ? parseInt(params.from.valueOf()) : null;
	this.to = params.to ? parseInt(params.to.valueOf()) : null;
	this.index = index;

	this.dt = parseInt(params.dt);
	if (isNaN(this.dt))
		this.dt = 0;

	this.display = params.display || (BX.isAmPmMode() ? 'clock_am_pm' : 'clock'); // other variants - 'simple', 'worktime'

	this.accuracy = params.accuracy || 60; // default timing acccuracy is 1 minute

	// if (this.from)
		// this.from = new Date(parseInt(this.from.valueOf() / this.accuracy) * this.accuracy);
	// if (this.to)
		// this.to = new Date(parseInt(this.to.valueOf() / this.accuracy) * this.accuracy);

	this.callback = this.from ? this._callback_from : (this.to ? this._callback_to : this._callback);
	this.callback_finish = params.callback_finish;

	this.formatValue = this.formatValueHandlers.clock;

	this.bInited = false;
	BX.ready(BX.delegate(this.Init, this));
}

BX.CTimer.prototype.Init = function()
{
	if (this.bInited)
		return;

	this.container = BX(this.container);
	this.container_value_fld = this.container.tagName.toUpperCase() == 'INPUT' ? 'value' : 'innerHTML';
	if (this.container_value_fld == 'value' && (this.display == 'clock' || this.display == 'clock_am_pm'))
	{
		if (this.display == 'clock')
		{
			this.display = 'simple';
		}
		else if (this.display == 'clock_am_pm')
		{
			this.display = 'simple_am_pm';
		}
	}

	this.formatValue = this.formatValueHandlers[this.display] ? this.formatValueHandlers[this.display] : this.formatValueHandlers.clock;

	this.bInited = true;
}

BX.CTimer.prototype.setFrom = function(from)
{
	if (!this.from) return;
	this.from = from;
}

BX.CTimer.prototype.setTo = function(to)
{
	if (!this.to) return;
	this.to = to;
}

BX.CTimer.prototype._callback = function(date)
{
	if (this.dt !== 0)
		var date = new Date(date.valueOf() + this.dt);

	this.setValue(this.formatValue(date.getHours(), date.getMinutes(), date.getSeconds()));
}

BX.CTimer.prototype._callback_from = function(date)
{
	var diff = (date.valueOf() - this.from.valueOf() + this.dt)/1000;
	this.setValue(
		this.formatValue(
			parseInt(diff / 3600),
			parseInt((diff % 3600) / 60),
			parseInt(diff % 60)
		)
	);
}

BX.CTimer.prototype._callback_to = function(date)
{
	var diff = (this.to.valueOf() - date.valueOf())/1000;
	if (diff > 0)
	{
		this.setValue(
			this.formatValue(
				parseInt(diff / 3600),
				parseInt((diff % 3600) / 60),
				parseInt(diff % 60)
			)
		);
	}
	else
	{
		this.Finish();
	}
}

BX.CTimer.prototype.formatValueHandlers = {
	clock: function(h, m, s)
	{
		var d = '<span class="bx-timer-semicolon">:</span>';

		return BX.util.str_pad(h, 2, '0', 'left')
			+ d
			+ (this.accuracy >= 3600
				? '00'
				: BX.util.str_pad(m, 2, '0', 'left'))
			+ (this.accuracy >= 60
				? ''
				:
				(d + BX.util.str_pad(s, 2, '0', 'left'))
			);
	},
	clock_am_pm: function(h, m, s)
	{
		var mt = 'am';
		var d = '<span class="bx-timer-semicolon">:</span>';

		if (h > 12)
		{
			h = h - 12;
			mt = 'pm';
		}
		else if (h == 0)
		{
			h = 12;
			mt = 'am';
		}
		else if (h == 12)
		{
			mt = 'pm';
		}

		return h
			+ d
			+ (this.accuracy >= 3600
				? '00'
				: BX.util.str_pad(m, 2, '0', 'left'))
			+ (this.accuracy >= 60
				? ''
				:
				(d + BX.util.str_pad(s, 2, '0', 'left'))
			)
			+ ' ' + mt;
	},
	simple: function(h, m, s)
	{
		return BX.util.str_pad(h, 2, '0', 'left')
			+ ':'
			+ (this.accuracy >= 3600
				? '00'
				: BX.util.str_pad(m, 2, '0', 'left'))

			+ (this.accuracy >= 60
				? ''
				:
				(':' + BX.util.str_pad(s, 2, '0', 'left'))
			);
	},
	simple_am_pm: function(h, m, s)
	{
		var mt = 'am';

		if (h > 12)
		{
			h = h - 12;
			mt = 'pm';
		}
		else if (h == 0)
		{
			h = 12;
			mt = 'am';
		}
		else if (h == 12)
		{
			mt = 'pm';
		}
		return h
			+ ':'
			+ (this.accuracy >= 3600
				? '00'
				: BX.util.str_pad(m, 2, '0', 'left'))

			+ (this.accuracy >= 60
				? ''
				:
				(':' + BX.util.str_pad(s, 2, '0', 'left'))
			) + ' ' + mt;
	},
	worktime: function(h, m, s)
	{
		return h + BX.message('JS_CORE_H') + ' '
			+ (this.accuracy >= 3600
				? ''
				: m + BX.message('JS_CORE_M')
					+ (this.accuracy >= 60
						? ''
						: ' ' + s + BX.message('JS_CORE_S')
					)
				);
	},
	worktime_short: function(h, m, s)
	{
		return BX.util.rtrim((h > 0 ? h + BX.message('JS_CORE_H') + ' ' : '')
			+ (m > 0 && this.accuracy < 3600 ? m + BX.message('JS_CORE_M') + ' ' : '')
			+ (this.accuracy >= 60
				? ''
				: (s > 0 ? s + BX.message('JS_CORE_S') : '')
			));
	}
}

BX.CTimer.prototype.setValue = function(value)
{
	if (this.bInited)
	{
		if (value != this._last_value)
			this.container[this.container_value_fld] = value;

		this._last_value = value;
	}
}

BX.CTimer.prototype.Finish = function()
{
	BX.timer.stop(this);

	if (this.callback_finish)
		this.callback_finish.apply(this);

	BX.cleanNode(this.container.parentNode);
}

function _RunTimer()
{
	var current_moment = new Date();

	for (var i=0,len=last_index;i<len;i++)
	{
		if (timers[i] && timers[i].callback)
			timers[i].callback.apply(timers[i], [current_moment]);
	}

	current_moment = null;
}
})(window)

/* End */
;
; /* Start:"a:4:{s:4:"full";s:37:"/bitrix/js/main/dd.js?164242070714809";s:6:"source";s:21:"/bitrix/js/main/dd.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
;(function(){

if (window.jsDD)
	return;

jsDD = {
	arObjects: [],
	arDestinations: [],
	arDestinationsPriority: [],

	arContainers: [],
	arContainersPos: [],

	current_dest_index: false,
	current_node: null,

	wndSize: null,

	bStarted: false,
	bDisable: false,
	bDisableDestRefresh: false,

	bEscPressed: false,

	bScrollWindow: false,
	scrollViewTimer: null,
	scrollViewConfig: {
		checkerTimeout: 30,
		scrollZone: 25,
		scrollBy: 25,
		scrollContainer: null,
		bScrollH: true,
		bScrollV: true,
		pos: null
	},

	setScrollWindow: function(val)
	{
		jsDD.bScrollWindow = !!val;
		if (BX.type.isDomNode(val))
		{
			jsDD.scrollViewConfig.scrollContainer = val;
			jsDD.scrollViewConfig.pos = BX.pos(val);

			var s = BX.style(val, 'overflow') || 'visible',
				s1 = BX.style(val, 'overflow-x') || 'visible',
				s2 = BX.style(val, 'overflow-y') || 'visible';

			jsDD.scrollViewConfig.bScrollH = s != 'visible' || s1 != 'visible';
			jsDD.scrollViewConfig.bScrollV = s != 'visible' || s2 != 'visible';
		}
	},

	Reset: function()
	{
		jsDD.arObjects = [];
		jsDD.arDestinations = [];
		jsDD.arDestinationsPriority = [];
		jsDD.bStarted = false;
		jsDD.current_node = null;
		jsDD.current_dest_index = false;
		jsDD.bDisableDestRefresh = false;
		jsDD.bDisable = false;
		jsDD.x = null;
		jsDD.y = null;
		jsDD.start_x = null;
		jsDD.start_y = null;
		jsDD.wndSize = null;

		jsDD.bEscPressed = false;

		clearInterval(jsDD.scrollViewTimer)
		jsDD.bScrollWindow = false;
		jsDD.scrollViewTimer = null;
		jsDD.scrollViewConfig.scrollContainer = null;
	},

	registerObject: function (obNode)
	{
		BX.bind(obNode, 'mousedown', jsDD.startDrag);
		BX.Event.bind(obNode, 'touchstart', jsDD.startDrag, { passive: true });

		obNode.__bxddid = jsDD.arObjects.length;

		jsDD.arObjects[obNode.__bxddid] = obNode;
	},
	unregisterObject: function(obNode)
	{
		if(typeof(obNode["__bxddid"]) === "undefined")
		{
			return;
		}

		delete jsDD.arObjects[obNode.__bxddid];
		delete obNode.__bxddid;
		BX.unbind(obNode, 'mousedown', jsDD.startDrag);
		BX.unbind(obNode, 'touchstart', jsDD.startDrag);
	},
	registerDest: function (obDest, priority)
	{
		if (!priority)
			priority = 100;

		obDest.__bxddeid = jsDD.arDestinations.length;
		obDest.__bxddpriority = priority;

		jsDD.arDestinations[obDest.__bxddeid] = obDest;
		if (!jsDD.arDestinationsPriority[priority])
			jsDD.arDestinationsPriority[priority] = [obDest.__bxddeid]
		else
			jsDD.arDestinationsPriority[priority].push(obDest.__bxddeid);

		jsDD.refreshDestArea(obDest.__bxddeid);
	},
	unregisterDest: function(obDest)
	{
		if(typeof(obDest["__bxddeid"]) === "undefined")
		{
			return;
		}

		delete jsDD.arDestinations[obDest.__bxddeid];
		delete obDest.__bxddeid;
		delete obDest.__bxddpriority;

		jsDD.refreshDestArea();
	},
	disableDest: function(obDest)
	{
		if (typeof(obDest.__bxddeid) !== "undefined")
		{
			obDest.__bxdddisabled = true;
		}
	},

	enableDest: function(obDest)
	{
		if (typeof(obDest.__bxddeid) !== "undefined")
		{
			obDest.__bxdddisabled = false;
		}
	},

	registerContainer: function (obCont)
	{
		jsDD.arContainers[jsDD.arContainers.length] = obCont;
	},

	getContainersScrollPos: function(x, y)
	{
		var pos = {'left':0, 'top':0};
		for(var i=0, n=jsDD.arContainers.length; i<n; i++)
		{
			if(jsDD.arContainers[i] && x >= jsDD.arContainersPos[i]["left"] && x <= jsDD.arContainersPos[i]["right"] && y >= jsDD.arContainersPos[i]["top"] && y <= jsDD.arContainersPos[i]["bottom"])
			{
				pos.left = jsDD.arContainers[i].scrollLeft;
				pos.top = jsDD.arContainers[i].scrollTop;
			}
		}
		return pos;
	},

	setContainersPos: function()
	{
		for(var i=0, n=jsDD.arContainers.length; i<n; i++)
		{
			if(jsDD.arContainers[i])
				jsDD.arContainersPos[i] = BX.pos(jsDD.arContainers[i]);
		}
	},

	refreshDestArea: function(id)
	{
		if (id && typeof (id) == "object" && typeof (id.__bxddeid) != 'undefined')
		{
			id = id.__bxddeid;
		}

		if (typeof id == 'undefined')
		{
			for (var i = 0, cnt = jsDD.arDestinations.length; i < cnt; i++)
			{
				jsDD.refreshDestArea(i);
			}
		}
		else
		{
			if (null == jsDD.arDestinations[id])
				return;

			var arPos = BX.pos(jsDD.arDestinations[id]);
			jsDD.arDestinations[id].__bxpos = [arPos.left, arPos.top, arPos.right, arPos.bottom];
		}
	},

	_checkEsc: function(e)
	{
		e = e||window.event;
		if (jsDD.bStarted && e.keyCode == 27)
		{
			jsDD.stopCurrentDrag();
		}
	},

	stopCurrentDrag: function()
	{
		if (jsDD.bStarted)
		{
			jsDD.bEscPressed = true;
			jsDD.stopDrag();
		}
	},

	/* scroll checkers */

	_onscroll: function() {
		jsDD.wndSize = BX.GetWindowSize();
	},

	_checkScroll: function()
	{
		if (jsDD.bScrollWindow)
		{
			var pseudo_e = {
					clientX: jsDD.x - jsDD.wndSize.scrollLeft,
					clientY: jsDD.y - jsDD.wndSize.scrollTop
				},
				bChange = false,
				d = jsDD.scrollViewConfig.scrollZone;

			// check whether window scroll needed
			if (pseudo_e.clientY < d && jsDD.wndSize.scrollTop > 0)
			{
				window.scrollBy(0, -jsDD.scrollViewConfig.scrollBy);
				bChange = true;
			}

			if (pseudo_e.clientY > jsDD.wndSize.innerHeight - d && jsDD.wndSize.scrollTop < jsDD.wndSize.scrollHeight - jsDD.wndSize.innerHeight)
			{
				window.scrollBy(0, jsDD.scrollViewConfig.scrollBy);
				bChange = true;
			}

			if (pseudo_e.clientX < d && jsDD.wndSize.scrollLeft > 0)
			{
				window.scrollBy(-jsDD.scrollViewConfig.scrollBy, 0);
				bChange = true;
			}

			if (pseudo_e.clientX > jsDD.wndSize.innerWidth - d && jsDD.wndSize.scrollLeft < jsDD.wndSize.scrollWidth - jsDD.wndSize.innerWidth)
			{
				window.scrollBy(jsDD.scrollViewConfig.scrollBy, 0);
				bChange = true;
			}

			// check whether container scroll needed

			if (jsDD.scrollViewConfig.scrollContainer)
			{
				var c = jsDD.scrollViewConfig.scrollContainer;

				if (jsDD.scrollViewConfig.bScrollH)
				{
					if (pseudo_e.clientX + jsDD.wndSize.scrollLeft < jsDD.scrollViewConfig.pos.left + d && c.scrollLeft > 0)
					{
						c.scrollLeft -= jsDD.scrollViewConfig.scrollBy;
						bChange = true;
					}

					if (pseudo_e.clientX + jsDD.wndSize.scrollLeft > jsDD.scrollViewConfig.pos.right - d
						&& c.scrollLeft < c.scrollWidth - c.offsetWidth)
					{
						c.scrollLeft += jsDD.scrollViewConfig.scrollBy;
						bChange = true;
					}
				}

				if (jsDD.scrollViewConfig.bScrollV)
				{
					if (pseudo_e.clientY + jsDD.wndSize.scrollTop < jsDD.scrollViewConfig.pos.top + d && c.scrollTop > 0)
					{
						c.scrollTop -= jsDD.scrollViewConfig.scrollBy;
						bChange = true;
					}

					if (pseudo_e.clientY + jsDD.wndSize.scrollTop > jsDD.scrollViewConfig.pos.bottom - d
						&& c.scrollTop < c.scrollHeight - c.offsetHeight)
					{
						c.scrollTop += jsDD.scrollViewConfig.scrollBy;
						bChange = true;
					}
				}
			}

			if (bChange)
			{
				jsDD._onscroll();
				jsDD.drag(pseudo_e);
			}
		}
	},

	/* DD process */

	startDrag: function(e)
	{
		if (jsDD.bDisable)
			return true;

		e = e || window.event;

		if (!(BX.getEventButton(e)&BX.MSLEFT))
			return true;

		jsDD.current_node = null;
		if (e.currentTarget)
		{
			jsDD.current_node = e.currentTarget;
			if (null == jsDD.current_node || null == jsDD.current_node.__bxddid)
			{
				jsDD.current_node = null;
				return;
			}
		}
		else
		{
			jsDD.current_node = e.srcElement;
			if (null == jsDD.current_node)
				return;

			while (null == jsDD.current_node.__bxddid)
			{
				jsDD.current_node = jsDD.current_node.parentNode;
				if (jsDD.current_node.tagName == 'BODY')
					return;
			}
		}

		jsDD.bStarted = false;
		jsDD.bPreStarted = true;

		jsDD.wndSize = BX.GetWindowSize();

		jsDD.start_x = e.clientX + jsDD.wndSize.scrollLeft;
		jsDD.start_y = e.clientY + jsDD.wndSize.scrollTop;

		BX.bind(document, "mouseup", jsDD.stopDrag);
		BX.bind(document, "touchend", jsDD.stopDrag);
		BX.bind(document, "mousemove", jsDD.drag);
		BX.bind(document, "touchmove", jsDD.drag);
		BX.bind(window, 'scroll', jsDD._onscroll);

		if(document.body.setCapture)
			document.body.setCapture();

		if (!jsDD.bDisableDestRefresh)
			jsDD.refreshDestArea();

		jsDD.setContainersPos();

		if(e.type !== "touchstart")
		{
			jsDD.denySelection();
			return BX.PreventDefault(e);
		}
		else
		{
			return true;
		}
	},

	start: function()
	{
		if (jsDD.bDisable)
			return true;

		document.body.style.cursor = 'move';

		if (jsDD.current_node.onbxdragstart)
			jsDD.current_node.onbxdragstart();

		for (var i = 0, cnt = jsDD.arDestinations.length; i < cnt; i++)
		{
			if (jsDD.arDestinations[i] && jsDD.arDestinations[i].onbxdestdragstart)
				jsDD.arDestinations[i].onbxdestdragstart(jsDD.current_node);
		}

		jsDD.bStarted = true;
		jsDD.bPreStarted = false;

		if (jsDD.bScrollWindow)
		{
			if (jsDD.scrollViewTimer)
				clearInterval(jsDD.scrollViewTimer);

			jsDD.scrollViewTimer = setInterval(jsDD._checkScroll, jsDD.scrollViewConfig.checkerTimeout);
		}

		BX.bind(document, 'keypress', this._checkEsc);
	},

	drag: function(e)
	{
		if (jsDD.bDisable)
			return true;

		e = e || window.event;

		jsDD.x = e.clientX + jsDD.wndSize.scrollLeft;
		jsDD.y = e.clientY + jsDD.wndSize.scrollTop;

		if (!jsDD.bStarted)
		{
			var delta = 5;
			if(jsDD.x >= jsDD.start_x-delta && jsDD.x <= jsDD.start_x+delta && jsDD.y >= jsDD.start_y-delta && jsDD.y <= jsDD.start_y+delta)
				return true;

			jsDD.start();
		}

		if (jsDD.current_node.onbxdrag)
		{
			jsDD.current_node.onbxdrag(jsDD.x, jsDD.y, e);
		}

		var containersScroll = jsDD.getContainersScrollPos(jsDD.x, jsDD.y);
		var current_dest_index = jsDD.searchDest(jsDD.x+containersScroll.left, jsDD.y+containersScroll.top);

		if (current_dest_index !== jsDD.current_dest_index)
		{
			if (jsDD.current_dest_index !== false)
			{
				if (jsDD.current_node.onbxdraghout)
					jsDD.current_node.onbxdraghout(jsDD.arDestinations[jsDD.current_dest_index], jsDD.x, jsDD.y);

				if (jsDD.arDestinations[jsDD.current_dest_index].onbxdestdraghout)
					jsDD.arDestinations[jsDD.current_dest_index].onbxdestdraghout(jsDD.current_node, jsDD.x, jsDD.y);
			}

			if (current_dest_index !== false)
			{
				if (jsDD.current_node.onbxdraghover)
					jsDD.current_node.onbxdraghover(jsDD.arDestinations[current_dest_index], jsDD.x, jsDD.y);

				if (jsDD.arDestinations[current_dest_index].onbxdestdraghover)
					jsDD.arDestinations[current_dest_index].onbxdestdraghover(jsDD.current_node, jsDD.x, jsDD.y);
			}
		}

		jsDD.current_dest_index = current_dest_index;
	},

	stopDrag: function(e)
	{
		BX.unbind(document, 'keypress', jsDD._checkEsc);

		e = e || window.event;

		jsDD.bPreStarted = false;

		if (jsDD.bStarted)
		{
			if (!jsDD.bEscPressed)
			{
				jsDD.x = e.clientX + jsDD.wndSize.scrollLeft;
				jsDD.y = e.clientY + jsDD.wndSize.scrollTop;
			}

			if (null != jsDD.current_node.onbxdragstop)
				jsDD.current_node.onbxdragstop(jsDD.x, jsDD.y, e);

			var containersScroll = jsDD.getContainersScrollPos(jsDD.x, jsDD.y);
			var dest_index = jsDD.searchDest(jsDD.x+containersScroll.left, jsDD.y+containersScroll.top);

			if (false !== dest_index)
			{
				if (jsDD.bEscPressed)
				{
					if (null != jsDD.arDestinations[dest_index].onbxdestdraghout)
					{
						if (!jsDD.arDestinations[dest_index].onbxdestdraghout(jsDD.current_node, jsDD.x, jsDD.y))
							dest_index = false;
						else
						{
							if (null != jsDD.current_node.onbxdragfinish)
								jsDD.current_node.onbxdragfinish(jsDD.arDestinations[dest_index], jsDD.x, jsDD.y);
						}
					}

				}
				else
				{
					if (null != jsDD.arDestinations[dest_index].onbxdestdragfinish)
					{
						if (!jsDD.arDestinations[dest_index].onbxdestdragfinish(jsDD.current_node, jsDD.x, jsDD.y, e))
							dest_index = false;
						else
						{
							if (null != jsDD.current_node.onbxdragfinish)
								jsDD.current_node.onbxdragfinish(jsDD.arDestinations[dest_index], jsDD.x, jsDD.y);
						}
					}
				}
			}

			if (false === dest_index)
			{
				if (null != jsDD.current_node.onbxdragrelease)
					jsDD.current_node.onbxdragrelease(jsDD.x, jsDD.y);
			}
			else
			{
				for (var i = 0, cnt = jsDD.arDestinations.length; i < cnt; i++)
				{
					if (i != dest_index && jsDD.arDestinations[i] && null != jsDD.arDestinations[i].onbxdestdragrelease)
						jsDD.arDestinations[i].onbxdestdragrelease(jsDD.current_node, jsDD.x, jsDD.y);
				}
			}

			for (var i = 0, cnt = jsDD.arDestinations.length; i < cnt; i++)
			{
				if (jsDD.arDestinations[i] && null != jsDD.arDestinations[i].onbxdestdragstop)
					jsDD.arDestinations[i].onbxdestdragstop(jsDD.current_node, jsDD.x, jsDD.y);
			}
		}

		if(document.body.releaseCapture)
			document.body.releaseCapture();

		BX.unbind(window, 'scroll', jsDD._onscroll);
		BX.unbind(document, "mousemove", jsDD.drag);
		BX.unbind(document, "touchmove", jsDD.drag);
		BX.unbind(document, "keypress", jsDD._checkEsc);
		BX.unbind(document, "mouseup", jsDD.stopDrag);
		BX.unbind(document, "touchend", jsDD.stopDrag);

		jsDD.allowSelection();
		document.body.style.cursor = '';

		jsDD.current_node = null;
		jsDD.current_dest_index = false;

		if (jsDD.bScrollWindow)
		{
			if (jsDD.scrollViewTimer)
				clearInterval(jsDD.scrollViewTimer);
		}

		if (jsDD.bStarted && !jsDD.bDisableDestRefresh)
			jsDD.refreshDestArea();

		jsDD.bStarted = false;
		jsDD.bEscPressed = false;
	},

	searchDest: function(x, y)
	{
		var p, len, p1, len1, i;
		for (p = 0, len = jsDD.arDestinationsPriority.length; p < len; p++)
		{
			if (jsDD.arDestinationsPriority[p] && BX.type.isArray(jsDD.arDestinationsPriority[p]))
			{
				for (p1 = 0, len1 = jsDD.arDestinationsPriority[p].length; p1 < len1; p1++)
				{
					i = jsDD.arDestinationsPriority[p][p1];
					if (jsDD.arDestinations[i] && !jsDD.arDestinations[i].__bxdddisabled)
					{
						if (
							jsDD.arDestinations[i].__bxpos[0] <= x &&
							jsDD.arDestinations[i].__bxpos[2] >= x &&

							jsDD.arDestinations[i].__bxpos[1] <= y &&
							jsDD.arDestinations[i].__bxpos[3] >= y
							)
						{
							return i;
						}
					}
				}
			}
		}

		return false;
	},

	allowSelection: function()
	{
		document.onmousedown = document.ontouchstart = null;
		var b = document.body;
		b.ondrag = null;
		b.onselectstart = null;
		b.style.MozUserSelect = '';

		if (jsDD.current_node)
		{
			jsDD.current_node.ondrag = null;
			jsDD.current_node.onselectstart = null;
			jsDD.current_node.style.MozUserSelect = '';
		}
	},

	denySelection: function()
	{
		document.onmousedown = document.ontouchstart = BX.False;
		var b = document.body;
		b.ondrag = BX.False;
		b.onselectstart = BX.False;
		b.style.MozUserSelect = 'none';
		if (jsDD.current_node)
		{
			jsDD.current_node.ondrag = BX.False;
			jsDD.current_node.onselectstart = BX.False;
			jsDD.current_node.style.MozUserSelect = 'none';
		}
	},

	Disable: function() {jsDD.bDisable = true;},
	Enable: function() {jsDD.bDisable = false;}
}

})();

/* End */
;
; /* Start:"a:4:{s:4:"full";s:52:"/bitrix/js/main/core/core_tooltip.js?164242071015458";s:6:"source";s:36:"/bitrix/js/main/core/core_tooltip.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
(function(window) {
if (BX.tooltip) return;

var arTooltipIndex = {},
	bDisable = false;

BX.tooltip = function(user_id, anchor_name, loader, rootClassName, bForceUseLoader, params)
{
	if (BX.message('TOOLTIP_ENABLED') != "Y")
	{
		return;
	}

	if (
		BX.browser.IsAndroid()
		|| BX.browser.IsIOS()
	)
	{
		return;
	}

	BX.ready(function() {
		var anchor = BX(anchor_name);
		if (null == anchor)
		{
			return;
		}

		var tooltipId = user_id;
		if(bForceUseLoader && BX.type.isNotEmptyString(loader))
		{
			// prepare tooltip ID from custom loader
			var loaderHash = 0;
			for(var i = 0, len = loader.length; i < len; i++)
			{
				loaderHash = (31 * loaderHash + loader.charCodeAt(i)) << 0;
			}

			tooltipId = loaderHash + user_id;
		}

		if (null == arTooltipIndex[tooltipId])
		{
			arTooltipIndex[tooltipId] = new BX.CTooltip(user_id, anchor, loader, rootClassName, bForceUseLoader, params);
		}
		else
		{
			arTooltipIndex[tooltipId].ANCHOR = anchor;
			arTooltipIndex[tooltipId].rootClassName = rootClassName;
			arTooltipIndex[tooltipId].LOADER = (
				bForceUseLoader
				&& BX.type.isNotEmptyString(loader)
					? loader
					: '/bitrix/tools/tooltip.php'
			);
			arTooltipIndex[tooltipId].params = params;
			arTooltipIndex[tooltipId].Create();
		}
	});
};

BX.tooltip.disable = function(){ bDisable = true; };
BX.tooltip.enable = function(){ bDisable = false; };

BX.tooltip.hide = function(userId) {
	if (BX('user_info_' + userId))
	{
		BX('user_info_' + userId).style.display = 'none';
	}
};

BX.tooltip.openIM = function(userId) {
	if (top.BXIM)
	{
		top.BXIM.openMessenger(userId);
		BX.tooltip.hide(userId);
	}
	else if (BX('MULSonetMessageChatTemplate'))
	{
		window.open(BX('MULSonetMessageChatTemplate').replace('#user_id#', userId).replace('#USER_ID#', userId).replace('#ID#', userId), '', 'location=yes,status=no,scrollbars=yes,resizable=yes,width=700,height=550,top='+Math.floor((screen.height - 550)/2-14)+',left='+Math.floor((screen.width - 700)/2-5));
		BX.tooltip.hide(userId);
	}
	return false;
};


BX.tooltip.openCallTo = function(userId) {
	if (top.BXIM)
	{
		top.BXIM.callTo(userId);
		BX.tooltip.hide(userId);
	}
	return false;
};

BX.tooltip.checkCallTo = function(nodeId) {
	if (
		!top.BXIM
		|| !top.BXIM.checkCallSupport()
	)
	{
		BX.remove(nodeId);
	}
};

BX.tooltip.openVideoCall = function(userId) {
	if (BX('MULVideoCallTemplate'))
	{
		window.open(BX('MULVideoCallTemplate').replace('#user_id#', userId).replace('#USER_ID#', userId).replace('#ID#', userId), '', 'location=yes,status=no,scrollbars=yes,resizable=yes,width=1000,height=600,top='+Math.floor((screen.height - 600)/2-14)+',left='+Math.floor((screen.width - 1000)/2-5));
		BX.tooltip.hide(userId);
	}
	return false;
};

BX.CTooltip = function(user_id, anchor, loader, rootClassName, bForceUseLoader, params)
{
	this.LOADER = (
		bForceUseLoader
		&& BX.type.isNotEmptyString(loader)
			? loader
			: '/bitrix/tools/tooltip.php'
	);
	this.USER_ID = user_id;
	this.ANCHOR = anchor;
	this.rootClassName = '';
	this.params = (typeof params != 'undefined' ? params : {});

	if (
		rootClassName != 'undefined'
		&& rootClassName != null
		&& rootClassName.length > 0
	)
	{
		this.rootClassName = rootClassName;
	}

	var old = document.getElementById('user_info_' + this.USER_ID);
	if (null != old)
	{
		if (null != old.parentNode)
			old.parentNode.removeChild(old);

		old = null;
	}

	var _this = this;

	this.INFO = null;

	this.width = 393;
	this.height = 302;

	this.RealAnchor = null;
	this.CoordsLeft = 0;
	this.CoordsTop = 0;
	this.AnchorRight = 0;
	this.AnchorBottom = 0;

	this.DIV = null;
	this.ROOT_DIV = null;

	if (BX.browser.IsIE())
	{
		this.IFRAME = null;
	}

	this.v_delta = 0;
	this.classNameAnim = false;
	this.classNameFixed = false;

	this.left = 0;
	this.top = 0;

	this.tracking = false;
	this.active = false;
	this.showed = false;

	this.Create = function()
	{
		_this.ANCHOR.onmouseover = function() {
			if (!bDisable)
			{
				_this.StartTrackMouse(this);
			}
		};

		_this.ANCHOR.onmouseout = function() {
			_this.StopTrackMouse(this);
		}
	};

	this.Create();

	this.TrackMouse = function(e)
	{
		if(!_this.tracking)
			return;

		var current;
		if(e && e.pageX)
			current = {x: e.pageX, y: e.pageY};
		else
			current = {x: e.clientX + document.body.scrollLeft, y: e.clientY + document.body.scrollTop};

		if(current.x < 0)
			current.x = 0;
		if(current.y < 0)
			current.y = 0;

		current.time = _this.tracking;

		if(!_this.active)
			_this.active = current;
		else
		{
			if(
				_this.active.x >= (current.x - 1) && _this.active.x <= (current.x + 1)
				&& _this.active.y >= (current.y - 1) && _this.active.y <= (current.y + 1)
			)
			{
				if((_this.active.time + 20/*2sec*/) <= current.time)
					_this.ShowTooltip();
			}
			else
				_this.active = current;
		}
	};

	this.ShowTooltip = function()
	{
		var old = document.getElementById('user_info_' + _this.USER_ID);
		if(bDisable || old && old.style.display == 'block')
			return;

		var bIE = (BX.browser.IsIE() && !BX.browser.IsIE10());

		if (!BX.type.isPlainObject(this.params))
		{
			this.params = {};
		}

		if (null == _this.DIV && null == _this.ROOT_DIV)
		{
			_this.ROOT_DIV = document.body.appendChild(document.createElement('DIV'));
			_this.ROOT_DIV.style.position = 'absolute';

			BX.ZIndexManager.register(_this.ROOT_DIV);

			_this.DIV = _this.ROOT_DIV.appendChild(document.createElement('DIV'));
			if (bIE)
				_this.DIV.className = 'bx-user-info-shadow-ie';
			else
				_this.DIV.className = 'bx-user-info-shadow';

			_this.DIV.style.width = _this.width + 'px';
			_this.DIV.style.height = _this.height + 'px';
		}

		var left = _this.CoordsLeft;
		var top = _this.CoordsTop + 30;
		var arScroll = BX.GetWindowScrollPos();
		var body = document.body;

		var h_mirror = false;
		var v_mirror = false;

		if((body.clientWidth + arScroll.scrollLeft) < (left + _this.width))
		{
			left = _this.AnchorRight - _this.width;
			h_mirror = true;
		}

		if((top - arScroll.scrollTop) < 0)
		{
			top = _this.AnchorBottom - 5;
			v_mirror = true;
			_this.v_delta = 40;
		}
		else
			_this.v_delta = 0;

		_this.ROOT_DIV.style.left = parseInt(left) + "px";
		_this.ROOT_DIV.style.top = parseInt(top) + "px";

		BX.ZIndexManager.bringToFront(_this.ROOT_DIV);

		BX.bind(BX(_this.ROOT_DIV), "click", BX.eventCancelBubble);

		if (
			this.rootClassName != 'undefined'
			&& this.rootClassName != null
			&& this.rootClassName.length > 0
		)
			_this.ROOT_DIV.className = this.rootClassName;

		if ('' == _this.DIV.innerHTML)
		{
			var url = _this.LOADER +
				(_this.LOADER.indexOf('?') >= 0 ? '&' : '?') +
				'MUL_MODE=INFO&USER_ID=' + _this.USER_ID +
				'&site=' + (BX.message('SITE_ID') || '') +
				(
					typeof _this.params != 'undefined'
					&& typeof _this.params.entityType != 'undefined'
					&& _this.params.entityType.length > 0
						? '&entityType=' + _this.params.entityType
						: ''
				) +
				(
					typeof _this.params != 'undefined'
					&& typeof _this.params.entityId != 'undefined'
					&& parseInt(_this.params.entityId) > 0
						? '&entityId=' + parseInt(_this.params.entityId)
						: ''
				);

			BX.ajax.get(url, _this.InsertData);
			_this.DIV.id = 'user_info_' + _this.USER_ID;

			_this.DIV.innerHTML = '<div class="bx-user-info-wrap">'
				+ '<div class="bx-user-info-leftcolumn">'
					+ '<div class="bx-user-photo" id="user-info-photo-' + _this.USER_ID + '"><div class="bx-user-info-data-loading">' + BX.message('JS_CORE_LOADING') + '</div></div>'
					+ '<div class="bx-user-tb-control bx-user-tb-control-left" id="user-info-toolbar-' + _this.USER_ID + '"></div>'
				+ '</div>'
				+ '<div class="bx-user-info-data">'
					+ '<div id="user-info-data-card-' + _this.USER_ID + '"></div>'
					+ '<div class="bx-user-info-data-tools">'
						+ '<div class="bx-user-tb-control bx-user-tb-control-right" id="user-info-toolbar2-' + _this.USER_ID + '"></div>'
						+ '<div class="bx-user-info-data-clear"></div>'
					+ '</div>'
				+ '</div>'
				+ '</div><div class="bx-user-info-bottomarea"></div>';
		}

		if (bIE)
		{
			_this.DIV.className = 'bx-user-info-shadow-ie';
			_this.classNameAnim = 'bx-user-info-shadow-anim-ie';
			_this.classNameFixed = 'bx-user-info-shadow-ie';
		}
		else
		{
			_this.DIV.className = 'bx-user-info-shadow';
			_this.classNameAnim = 'bx-user-info-shadow-anim';
			_this.classNameFixed = 'bx-user-info-shadow';
		}

		_this.filterFixed = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='bitrix/components/bitrix/main.user.link/templates/.default/images/cloud-left-top.png', sizingMethod = 'crop' );";

		if (h_mirror && v_mirror)
		{
			if (BX.browser.IsIE6())
			{
				_this.DIV.className = 'bx-user-info-shadow-hv-ie6';
				_this.classNameAnim = 'bx-user-info-shadow-hv-anim-ie6';
				_this.classNameFixed = 'bx-user-info-shadow-hv-ie6';
			}
			else if (bIE)
			{
				_this.DIV.className = 'bx-user-info-shadow-hv-ie';
				_this.classNameAnim = 'bx-user-info-shadow-hv-anim-ie';
				_this.classNameFixed = 'bx-user-info-shadow-hv-ie';
			}
			else
			{
				_this.DIV.className = 'bx-user-info-shadow-hv';
				_this.classNameAnim = 'bx-user-info-shadow-hv-anim';
				_this.classNameFixed = 'bx-user-info-shadow-hv';
			}

			_this.filterFixed = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='bitrix/components/bitrix/main.user.link/templates/.default/images/cloud-right-bottom.png', sizingMethod = 'crop' );";
		}
		else
		{
			if (h_mirror)
			{
				if (bIE)
				{
					_this.DIV.className = 'bx-user-info-shadow-h-ie';
					_this.classNameAnim = 'bx-user-info-shadow-h-anim-ie';
					_this.classNameFixed = 'bx-user-info-shadow-h-ie';
				}
				else
				{
					_this.DIV.className = 'bx-user-info-shadow-h';
					_this.classNameAnim = 'bx-user-info-shadow-h-anim';
					_this.classNameFixed = 'bx-user-info-shadow-h';
				}

				_this.filterFixed = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='bitrix/components/bitrix/main.user.link/templates/.default/images/cloud-right-top.png', sizingMethod = 'crop' );";
			}

			if (v_mirror)
			{
				if (BX.browser.IsIE6())
				{
					_this.DIV.className = 'bx-user-info-shadow-v-ie6';
					_this.classNameAnim = 'bx-user-info-shadow-v-anim-ie6';
					_this.classNameFixed = 'bx-user-info-shadow-v-ie6';
				}
				else if (bIE)
				{
					_this.DIV.className = 'bx-user-info-shadow-v-ie';
					_this.classNameAnim = 'bx-user-info-shadow-v-anim-ie';
					_this.classNameFixed = 'bx-user-info-shadow-v-ie';
				}
				else
				{
					_this.DIV.className = 'bx-user-info-shadow-v';
					_this.classNameAnim = 'bx-user-info-shadow-v-anim';
					_this.classNameFixed = 'bx-user-info-shadow-v';
				}

				_this.filterFixed = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='bitrix/components/bitrix/main.user.link/templates/.default/images/cloud-left-bottom.png', sizingMethod = 'crop' );";
			}
		}


		if (BX.browser.IsIE() && null == _this.IFRAME)
		{
			_this.IFRAME = document.body.appendChild(document.createElement('IFRAME'));
			_this.IFRAME.id = _this.DIV.id + "_frame";
			_this.IFRAME.style.position = 'absolute';
			_this.IFRAME.style.width = (_this.width - 60) + 'px';
			_this.IFRAME.style.height = (_this.height - 100) + 'px';
			_this.IFRAME.style.borderStyle = 'solid';
			_this.IFRAME.style.borderWidth = '0px';
			_this.IFRAME.style.zIndex = 550;
			_this.IFRAME.style.display = 'none';
		}
		if (BX.browser.IsIE())
		{
			_this.IFRAME.style.left = (parseInt(left) + 25) + "px";
			_this.IFRAME.style.top = (parseInt(top) + 30 + _this.v_delta) + "px";
		}

		_this.DIV.style.display = 'none';
		_this.ShowOpacityEffect({func: _this.SetVisible, obj: _this.DIV, arParams: []}, 0);

		document.getElementById('user_info_' + _this.USER_ID).onmouseover = function() {
			_this.StartTrackMouse(this);
		};

		document.getElementById('user_info_' + _this.USER_ID).onmouseout = function() {
			_this.StopTrackMouse(this);
		};

		BX.onCustomEvent('onTooltipShow', [this]);
	};

	this.InsertData = function(data)
	{
		if (null != data && data.length > 0)
		{
			eval('_this.INFO = ' + data);

			var cardEl = document.getElementById('user-info-data-card-' + _this.USER_ID);
			cardEl.innerHTML = _this.INFO.RESULT.Card;

			var photoEl = document.getElementById('user-info-photo-' + _this.USER_ID);
			photoEl.innerHTML = _this.INFO.RESULT.Photo;

			var toolbarEl = document.getElementById('user-info-toolbar-' + _this.USER_ID);
			toolbarEl.innerHTML = _this.INFO.RESULT.Toolbar;

			var toolbar2El = document.getElementById('user-info-toolbar2-' + _this.USER_ID);
			toolbar2El.innerHTML = _this.INFO.RESULT.Toolbar2;

			if(BX.type.isArray(_this.INFO.RESULT.Scripts))
			{
				for(var i = 0; i < _this.INFO.RESULT.Scripts.length; i++)
				{
					eval(_this.INFO.RESULT.Scripts[i]);
				}
			}

			BX.onCustomEvent('onTooltipInsertData', [_this]);
		}
	}

};
BX.CTooltip.prototype.StartTrackMouse = function(ob)
{
	var _this = this;

	if(!this.tracking)
	{
		var elCoords = BX.pos(ob);
		this.RealAnchor = ob;
		this.CoordsLeft = elCoords.left + 0;
		this.CoordsTop = elCoords.top - 325;
		this.AnchorRight = elCoords.right;
		this.AnchorBottom = elCoords.bottom;

		this.tracking = 1;
		BX.bind(document, "mousemove", _this.TrackMouse);

		setTimeout(function() {_this.tickTimer()}, 500);
	}
};

BX.CTooltip.prototype.StopTrackMouse = function()
{
	var _this = this;
	if(this.tracking)
	{
		BX.unbind(document, "mousemove", _this.TrackMouse);
		this.active = false;
		setTimeout(function() {_this.HideTooltip()}, 500);
		this.tracking = false;
	}
};

BX.CTooltip.prototype.tickTimer = function()
{
	var _this = this;

	if(this.tracking)
	{
		this.tracking++;
		if(this.active)
		{
			if( (this.active.time + 5/*0.5sec*/)  <= this.tracking)
				this.ShowTooltip();
		}
		setTimeout(function() {_this.tickTimer()}, 100);
	}
};

BX.CTooltip.prototype.HideTooltip = function()
{
	if(!this.tracking)
		this.ShowOpacityEffect({func: this.SetInVisible, obj: this.DIV, arParams: []}, 1);
};

BX.CTooltip.prototype.ShowOpacityEffect = function(oCallback, bFade)
{
	var steps = 3;
	var period = 1;
	var delta = 1 / steps;
	var i = 0, op, _this = this;

	if(BX.browser.IsIE() && _this.DIV)
		_this.DIV.className = _this.classNameAnim;

	var show = function()
	{
		i++;
		if (i > steps)
		{
			clearInterval(intId);
			if (!oCallback.arParams)
				oCallback.arParams = [];
			if (oCallback.func && oCallback.obj)
				oCallback.func.apply(oCallback.obj, oCallback.arParams);
			return;
		}
		op = bFade ? 1 - i * delta : i * delta;

		if (_this.DIV != null)
		{
			try{
				_this.DIV.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + (op * 100) + ')';
				_this.DIV.style.opacity = op;
				_this.DIV.style.MozOpacity = op;
				_this.DIV.style.KhtmlOpacity = op;
			}
			catch(e){
			}
			finally{
				if (!bFade && i == 1)
					_this.DIV.style.display = 'block';

				if (bFade && i == steps && _this.DIV)
					_this.DIV.style.display = 'none';


				if (BX.browser.IsIE() && i == 1 && bFade && _this.IFRAME)
					_this.IFRAME.style.display = 'none';


				if (BX.browser.IsIE() && i == steps && _this.DIV)
				{
					if (!bFade)
						_this.IFRAME.style.display = 'block';

					_this.DIV.style.filter = _this.filterFixed;
					_this.DIV.className = _this.classNameFixed;
					_this.DIV.innerHTML = ''+_this.DIV.innerHTML;
				}

				if(bFade)
				{
					BX.onCustomEvent('onTooltipHide', [_this]);
				}
			}
		}

	};
	var intId = setInterval(show, period);

}

})(window);

/* End */
;