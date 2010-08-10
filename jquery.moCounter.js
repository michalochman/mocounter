/*!
 * jQuery Counter v0.1
 * http://www.scur.pl
 *
 * Copyright 2010, Michał Ochman
 * 
 */
(function($){

	$.fn.counter = function (options) {

		config = {
			'at': 0
		};

		$.extend(config, options);

		this.initCounter(config);

		return this;
	};

	$.fn.initCounter = function (options) {
		var digits = new Array();
		digits.push(options.at%10)
		for (var i = 1; i < Number(options.at).toString().length; i++)
		{
			digits.push(Math.floor(options.at/Math.pow(10,i))%10);
		}
		digits.push(0, 0);

		var id = $(this).attr('id');
		$(digits).each(function(i, item){
			if (i != 0 && i%3 == 0) $('<div>').attr('class', 'sep').text(',').prependTo('#'+id+' .digits');
			var $digit = $('<div class="wrap"><div class="top">'+(item+1)%10+'</div><div class="bot">'+item+'</div></div>');
			$('<div>').attr('class', 'digit').html($digit).prependTo('#'+id+' .digits');
		});
		$('<div>').attr('class', 'clr').appendTo('#'+id+' .digits');

		$.data($(this)[0], 'at', options.at);
		$.data($(this)[0], 'digits', digits);
	};

	$.fn._incr = function(duration) {
		$.data($(this)[0], 'int_cnt_i', $.data($(this)[0], 'int_cnt_i')+1);
		if ($.data($(this)[0], 'int_cnt_i') == $.data($(this)[0], 'int_cnt_times')) {
			$.data($(this)[0], 'int_cnt_i', 0);
			clearInterval($.data($(this)[0], 'int_cnt'));
		}

		var $digits = $(this).find('.digit');
		var len = 1;
		for (var j = $digits.length-1; j >= 0; j--)
		{
			var top = new Number($digits.eq(j).find('.top').text());
			if (top != 0) break;
			len++;
		}
	
		this.animateIncrement(len, duration);
	}

	$.fn.doIncrement = function(by, duration) {
		if (by == 0) return;

		$.data($(this)[0], 'int_cnt_i', 0);
		$.data($(this)[0], 'int_cnt_times', by);
		$.data($(this)[0], 'int_cnt_flag', false);
		$.data($(this)[0], 'int_cnt', '');

		if (!$.data($(this)[0], 'int_cnt_flag'))
		{
			var that = this;
			var incr = function(){that._incr(duration);}
			$.data($(this)[0], 'int_cnt', setInterval(incr, duration+25));
			$.data($(this)[0], 'int_cnt_flag', true);
		}
	};

	$.fn.animateIncrement = function (len, duration) {
		var $digits = $(this).find('.digit');

		for (var i = 1; i <= len; i++)
		{
			$digit = $digits.eq($digits.length-i);

			$digit.find('.top').animate(
				{'margin-top':'0px'},
				{
					'duration':i*duration,
					'easing':'linear',
					'complete':function(){
						$top = $(this);
						$bot = $(this).parent().find('.bot');
						$bot.text($top.text());
						$top.css({'margin-top':'-25px'}).text((parseInt($bot.text())+1)%10);
					}
				}
			);
		}
	};

})(jQuery);
